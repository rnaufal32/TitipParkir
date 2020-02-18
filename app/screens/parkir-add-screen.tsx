import * as React from "react"
import { observer } from "mobx-react-lite"
import { ViewStyle, View, TextStyle, StyleSheet, ActivityIndicator } from "react-native"
import { Screen, Text, Header, Divider, TextField, Button } from "../components"
// import { useStores } from "../models/root-store"
import { color, spacing } from "../theme"
import { NavigationScreenProps } from "react-navigation"
import Geocoder from 'react-native-geocoding';
import { useStores } from "../models/root-store"
import MapView, { Marker } from 'react-native-maps'
import { ParkingModel } from "../models/parking-model"
// import { GOOGLE_MAPS_API_KEY } from "react-native-dotenv";

export interface ParkirAddScreenProps extends NavigationScreenProps<{}> {
}

const ROOT: ViewStyle = {
  flex: 1,
  backgroundColor: color.primaryDarker
}

const CONTAINER: ViewStyle = {
  paddingHorizontal: spacing[5],
  paddingBottom: spacing[5],
  height: '100%'
}

export const ParkirAddScreen: React.FunctionComponent<ParkirAddScreenProps> = observer((props) => {
  
  React.useEffect(() => {
    // Geocoder.init(GOOGLE_MAPS_API_KEY);
  })

  const rootStore = useStores()

  const { latitude, longitude, altitude, accuracy, speed } = rootStore.positionStore

  const [ name, setName ] = React.useState(null)

  const maps = React.useRef()
  
  const goBack = () => {
    rootStore.parkingStore.getParking()
    props.navigation.goBack()
  }

  const save = async () => {
    // const geocode = await Geocoder.from(latitude, longitude)
    // const address = geocode.results[0].address_components[0];
    const address = "WAW"

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

    rootStore.parkingStore.addParking(form)
    if (!rootStore.parkingStore.ads) {
      goBack()
    }
  }

  const getLocation = React.useMemo(() => async () => {
    rootStore.positionStore.getPosition(loc => {
      // maps.current.fitToElements(true)
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
          (rootStore.parkingStore.ads) ?
          <ActivityIndicator />
          :
          <View>
            <TextField label="Nama Titip Parkiran" placeholder="Misal. Mall Surya Abadi" onChangeText={text => {setName(text)}} />
            <View style={{width: '100%', height: 200}} >
              {/* <MapView style={MAPSSTYLE}
                ref={maps}
                onMapReady={() => {
                  maps.current.fitToElements(true)
                }}>
                <Marker coordinate={{longitude, latitude}} />
              </MapView> */}
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
