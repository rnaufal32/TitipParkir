import * as React from "react"
import { observer } from "mobx-react-lite"
import { ViewStyle, View, TextStyle, StyleSheet } from "react-native"
import { Screen, Text, Header, Divider, TextField, Button } from "../components"
// import { useStores } from "../models/root-store"
import { color, spacing } from "../theme"
import { NavigationScreenProps } from "react-navigation"
import Geocoder from 'react-native-geocoding';
import { useStores } from "../models/root-store"
import MapView, { Marker } from 'react-native-maps'
import { GOOGLE_MAPS_API_KEY } from "react-native-dotenv";

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

const TEXTCENTER: TextStyle = {
  textAlign: 'center'
}

const MAPSSTYLE: ViewStyle = {
  ...StyleSheet.absoluteFillObject
}

export const ParkirAddScreen: React.FunctionComponent<ParkirAddScreenProps> = observer((props) => {
  
  React.useEffect(() => {
    Geocoder.init(GOOGLE_MAPS_API_KEY);
  })

  const rootStore = useStores()

  const { latitude, longitude, altitude, accuracy } = rootStore.positionStore

  const [ name, setName ] = React.useState(null)

  const maps = React.useRef()
  
  const goBack = () => {
    rootStore.parkingStore.getParking()
    props.navigation.goBack()
  }

  const save = () => {
    Geocoder.from(latitude, longitude)
      .then(json => {
          var addressComponent = json.results[0].address_components[0];
          console.log(addressComponent, json);
      })
      .catch(error => console.warn(error));
    goBack()
  }

  const getLocation = React.useMemo(() => async () => {
    rootStore.positionStore.getPosition(loc => {
      // maps.current.fitToElements(true)
    })
  }, [])

  return (
    <View style={ROOT}>
      <Header
        headerText="TAMBAH TITIP"
        leftIcon="back"
        onLeftPress={goBack}
        titleStyle={{fontSize: 25}} />
      <Screen style={CONTAINER} preset="scroll" backgroundColor={color.palette.white}>
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
      </Screen>
    </View>
  )
})
