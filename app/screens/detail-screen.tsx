import * as React from "react"
import { observer } from "mobx-react-lite"
import { ViewStyle, View, Alert } from "react-native"
import { Screen, Text, Header, Button, Divider } from "../components"
import { useStores } from "../models/root-store"
import { color } from "../theme"
import { NavigationScreenProps } from "react-navigation"
import { getDistance } from 'geolib'

export interface DetailScreenProps extends NavigationScreenProps<{}> {
}

const ROOT: ViewStyle = {
  flex: 1,
  backgroundColor: color.primaryDarker
}

const CONTAINER: ViewStyle = {
  backgroundColor: 'white',
  padding: 20
}

const CARD: ViewStyle = {
  backgroundColor: 'white',
  padding: 15,
  elevation: 2,
  marginVertical: 15
}

export const DetailScreen: React.FunctionComponent<DetailScreenProps> = observer((props) => {
  const { parkingStore, positionStore } = useStores()
  const { current, parking, upParking, getParking } = parkingStore

  const [distance, setDistance] = React.useState("")

  const goBack = React.useMemo(() => async () => {
    getParking()
    props.navigation.goBack()
  }, [])

  const save = React.useMemo(() => async () => {
    const response = await upParking(parking[current])
    if (response) {
      Alert.alert("Sukses", "Sudah selesai bang.", [
        {text: "OK", onPress: goBack}
      ])
    } else {
      Alert.alert("Gagal", "Error bang", [
        {text: "OK"}
      ])
    }
  }, [])

  React.useEffect(() => {
    const get = getDistance({
      latitude: parking[current].latitude,
      longitude: parking[current].longitude,
    }, {
      latitude: positionStore.latitude,
      longitude: positionStore.longitude
    }, 1)
    if (get > 1000) {
      setDistance(parseInt(get / 1000).toString() + "KM")
    } else {
      setDistance(parseInt(get).toString() + "M")
    }
  })

  return (
    <View style={ROOT}>
      <Header
        leftIcon="back"
        headerText="DETAIL PARKIR"
        onLeftPress={goBack}
        titleStyle={{fontSize: 25}} />
      <Screen style={CONTAINER} preset="scroll">
        <View style={{height: 250, borderRadius: 20, backgroundColor: 'blue'}}></View>
        <View style={CARD}>
          <View style={{flexDirection:'row', justifyContent:'space-between'}}>
            <Text preset="title">{ parking[current].name }</Text>
            <Button text="Edit" textStyle={{fontSize: 15}} preset="danger" />
          </View>
          <Text preset="paragraph">{ parking[current].address }</Text>
        </View>
        <View style={CARD}>
          <Text preset="title">Jarak: > {distance}</Text>
          <View style={{height: 20}} />
          <Text preset="paragraph">Keterangan :</Text>
          <Text preset="paragraph">Gambar Untuk Lokasi Abang</Text>
          <Text preset="paragraph">Gambar Untuk Lokasi Parkinya</Text>
        </View>
        <Button onPress={save} text="Selesai" textStyle={{fontSize: 15}} style={{marginVertical: 15}} />
      </Screen>
    </View>
  )
})
