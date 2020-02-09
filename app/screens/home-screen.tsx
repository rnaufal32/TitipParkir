import * as React from "react"
import { observer } from "mobx-react-lite"
import { ViewStyle, View, TextStyle } from "react-native"
import { Screen, Text, Header, Button } from "../components"
import { color, spacing } from "../theme"
import { NavigationScreenProps } from "react-navigation"
import { useStores } from "../models/root-store";
import { TouchableOpacity } from "react-native-gesture-handler"

export interface HomeScreenProps extends NavigationScreenProps<{}> {
}

const ROOT: ViewStyle = {
  flex: 1,
  backgroundColor: color.primaryDarker
}

const CONTAINER: ViewStyle = {
  paddingHorizontal: spacing[5]
}

const TEXTCENTER: TextStyle = {
  textAlign: 'center'
}

export const HomeScreen: React.FunctionComponent<HomeScreenProps> = observer((props) => {

  const rootStore = useStores()
  const { parking, status } = rootStore.parkingStore
  const { latitude, longitude } = rootStore.positionStore

  const nextScreen = () => {
    props.navigation.navigate('parkirAdd')
  }

  React.useEffect(() => {
    rootStore && rootStore.parkingStore.getParking()
    rootStore.positionStore.getPosition((_) => {})
  }, [])

  return (
    <View style={ROOT}>
      <Header
        headerText="TITIP PARKIR"
        titleStyle={{fontSize: 25}} />
      <Screen style={CONTAINER} preset="scroll" backgroundColor={color.palette.white}>
        {
          status == "done" ?
          <View style={{marginTop: 10}}>
            <View style={{flexDirection: 'row', justifyContent:'space-between'}}>
              <Text preset="title">Daftar Parkir Abang</Text>
              <Button text="Tambah" preset="primary" textStyle={{fontSize: 15}} onPress={nextScreen} />
            </View>
            {
              parking.map((value, index) => (
                <View key={index} style={{elevation: 2, backgroundColor: 'white', padding: 15, marginVertical: 15}}>
                  <TouchableOpacity>
                    <View>
                      <View style={{flexDirection:'row', justifyContent: 'space-between', alignItems: 'center'}}>
                        <View>
                          <Text preset="title" style={{fontSize: 15}}>#{value.id}</Text>
                          <Text preset="title" style={{fontSize: 19}}>{value.name}</Text>
                        </View>
                        <Text style={{color: 'grey'}}>>21 km</Text>
                      </View>
                      <Text preset="paragraph">{value.address}</Text>
                    </View>
                  </TouchableOpacity>
                </View>
              ))
            }
          </View>
          :
          <View style={{marginTop: '40%'}}>
            <Text preset="title" style={TEXTCENTER}>Parkirin Bang...</Text>
            <Text preset="paragraph" style={TEXTCENTER}>Tekan tombol dibawah untuk menyimpan lokasi tempat parkinya bang...</Text>

            <View style={{paddingVertical: spacing[5]}}>
              <Button text="PARKIRIN" preset="primary" textStyle={{fontSize: 15}} onPress={nextScreen} />
            </View>
          </View>
        }
      </Screen>
    </View>
  )
})