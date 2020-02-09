import * as React from "react"
import { observer } from "mobx-react-lite"
import { ViewStyle, View, TextStyle } from "react-native"
import { Screen, Text, Header, Divider, TextField, Button } from "../components"
// import { useStores } from "../models/root-store"
import { color, spacing } from "../theme"
import { NavigationScreenProps } from "react-navigation"
import { TextInput, ScrollView } from "react-native-gesture-handler"
import { useStores } from "../models/root-store"

export interface ParkirAddScreenProps extends NavigationScreenProps<{}> {
}

const ROOT: ViewStyle = {
  flex: 1,
  backgroundColor: color.primaryDarker
}

const CONTAINER: ViewStyle = {
  flex: 1,
  paddingHorizontal: spacing[5],
  paddingBottom: spacing[5]
}

const TEXTCENTER: TextStyle = {
  textAlign: 'center'
}

export const ParkirAddScreen: React.FunctionComponent<ParkirAddScreenProps> = observer((props) => {
  
  const rootStore = useStores()

  const [ name, setName ] = React.useState(null)
  
  const goBack = () => {
    rootStore.getParking()
    props.navigation.goBack()
  }

  const save = () => {
    rootStore.addParking({id: 2, name})
    goBack()
  }

  return (
    <View style={ROOT}>
      <Header
        headerText="TAMBAH TITIP"
        leftIcon="back"
        onLeftPress={goBack}
        titleStyle={{fontSize: 25}} />
      <ScrollView>
        <Screen style={CONTAINER} preset="scroll" backgroundColor={color.palette.white}>
          <TextField label="Nama Titip Parkiran" placeholder="Misal. Mall Surya Abadi" onChangeText={text => {setName(text)}} />
          {/* GOOGLE MAP*/}
          <View style={{width: '100%', height: 200, backgroundColor: color.primaryDarker}} />
          <View style={{flexDirection: 'row', justifyContent: 'space-between', marginTop: spacing[3]}}>
            <Text preset="paragraph">Akurasi :</Text>
            <Button text="Ambil Titik" />
          </View>
          <Text preset="paragraph">Akurasi :</Text>
          <Divider />
          <Text preset="title">Foto Parkiran</Text>
          <ScrollView
            horizontal={true}
            style={{marginVertical: spacing[3]}}>
            <View style={{width: 180, height: 200, backgroundColor: color.primaryDarker, marginHorizontal: 30}} />
            <View style={{width: 180, height: 200, backgroundColor: color.primaryDarker, marginHorizontal: 30}} />
            <View style={{width: 180, height: 200, backgroundColor: color.primaryDarker, marginHorizontal: 30}} />
            <View style={{width: 180, height: 200, backgroundColor: color.primaryDarker, marginHorizontal: 30}} />
            <View style={{width: 180, height: 200, backgroundColor: color.primaryDarker, marginHorizontal: 30}} />
          </ScrollView>
          <Button text="Simpan" textStyle={{fontSize: 20}} onPress={save} />
        </Screen>
      </ScrollView>
    </View>
  )
})
