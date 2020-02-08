import * as React from "react"
import { observer } from "mobx-react-lite"
import { ViewStyle, View, TextStyle } from "react-native"
import { Screen, Text, Header, Button } from "../components"
// import { useStores } from "../models/root-store"
import { color, spacing } from "../theme"
import { NavigationScreenProps } from "react-navigation"
import { useStores } from "../models/root-store";

export interface HomeScreenProps extends NavigationScreenProps<{}> {
}

const ROOT: ViewStyle = {
  flex: 1,
  backgroundColor: color.primaryDarker
}

const CONTAINER: ViewStyle = {
  flex: 1,
  justifyContent: 'center',
  alignItems: 'center',
  paddingHorizontal: spacing[5]
}

const TEXTCENTER: TextStyle = {
  textAlign: 'center'
}

export const HomeScreen: React.FunctionComponent<HomeScreenProps> = observer((props) => {

  const rootStore = useStores()
  const { parking, status } = rootStore

  const nextScreen = () => {
    props.navigation.navigate('parkirAdd')
    rootStore.tesRealm()
  }

  React.useEffect(() => {
    rootStore && rootStore.getParking()
  }, [])

  return (
    <View style={ROOT}>
      <Header
        headerText="TITIP PARKIR"
        titleStyle={{fontSize: 25}} />
      <Screen style={CONTAINER} preset="scroll" backgroundColor={color.palette.white}>
        {
          status == "done" ?
          <View>
            {
              parking.map((value, index) => (
                <View key={index}>
                  <Text preset="paragraph">{value.name}</Text>
                </View>
              ))
            }
          </View>
          :
          <View>
            <Text preset="title" style={TEXTCENTER}>Parkirin Bang...</Text>
            <Text preset="paragraph" style={TEXTCENTER}>Tekan tombol dibawah untuk menyimpan lokasi tempat parkinya bang...</Text>
          </View>
        }
        <View style={{paddingVertical: spacing[5]}}>
          <Button text="PARKIRIN" preset="primary" textStyle={{fontSize: 15}} onPress={nextScreen} />
        </View>
      </Screen>
    </View>
  )
})
