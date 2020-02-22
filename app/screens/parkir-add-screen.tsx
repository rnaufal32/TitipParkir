import * as React from "react"
import { observer } from "mobx-react-lite"
import { ViewStyle, View, TextStyle, StyleSheet, ActivityIndicator, Image } from "react-native"
import { Screen, Text, Header, Divider, TextField, Button } from "../components"
import { color, spacing } from "../theme"
import { NavigationScreenProps } from "react-navigation"
import NativeGeocoder from 'react-native-geocoder';
import { useStores } from "../models/root-store"
import MapView, { Marker } from 'react-native-maps'
import { ParkingModel } from "../models/parking-model"

export interface ParkirAddScreenProps extends NavigationScreenProps<{}> {
}

const ROOT: ViewStyle = {
  flex: 1,
  backgroundColor: color.primaryDarker,
}

const CONTAINER: ViewStyle = {
  paddingHorizontal: spacing[5],
  paddingBottom: spacing[5],
  height: '100%'
}

const MAPSSTYLE: ViewStyle = {
  ...StyleSheet.absoluteFillObject
}

export const ParkirAddScreen: React.FunctionComponent<ParkirAddScreenProps> = observer((props) => {
  
  React.useEffect(() => {
    // Geocoder.init(GOOGLE_MAPS_API_KEY);
  })

  const { positionStore, navigationStore, parkingStore } = useStores()

  const { latitude, longitude, altitude, accuracy, speed } = positionStore

  const [ name, setName ] = React.useState(null)

  const maps = React.useRef(null)
  
  const goBack = () => {
    parkingStore.getParking()
    navigationStore.goBack()
  }

  const save = async () => {
    NativeGeocoder.getFullAddress(-6.8817, 108.4620, (address) => {
      const form: ParkingModel = {
        accuracy,
        address,
        altitude,
        id: 0,
        isFromMockProvider: false,
        latitude,
        longitude,
        name,
        speed,
        photo: null,
        status: 0
      };
  
      parkingStore.addParking(form)
      if (!parkingStore.ads) {
        goBack()
      }
    });
  }

  const getLocation = React.useMemo(() => async () => {
    positionStore.getPosition(loc => {
      maps.current.fitToElements(true)
    })
  }, [])

  return (
    <View style={ROOT}>
      <Header
        headerText="TITIPIN BANG"
        leftIcon="back"
        onLeftPress={goBack}
        titleStyle={{fontSize: 25}} />
      <Screen style={CONTAINER} preset="scroll" backgroundColor={color.palette.white}>
        {
          (parkingStore.ads) ?
          <ActivityIndicator />
          :
          <View>
            <TextField label="Nama Titip Parkiran" placeholder="Misal. Mall Surya Abadi" onChangeText={text => {setName(text)}} />
            <View style={{width: '100%', height: 200}} >
              <MapView style={MAPSSTYLE}
                ref={maps}
                onMapReady={() => {
                  maps.current.fitToElements(true)
                }}>
                <Marker coordinate={{latitude, longitude}}>
                  <Image source={require('./marker_parkir.png')} style={{width:50, height:50, resizeMode:'center'}} />
                </Marker>
              </MapView>
            </View>
            <View style={{flexDirection: 'row', justifyContent: 'space-between', marginTop: spacing[3]}}>
              <Text preset="paragraph">Akurasi : {accuracy} </Text>
              <Button text="Ulangi Titik" textStyle={{fontSize: 17}} onPress={() => getLocation()} />
            </View>
            <Divider />
            <Button text="Simpan" textStyle={{fontSize: 20}} onPress={save} />
          </View>
        }
      </Screen>
    </View>
  )
})
