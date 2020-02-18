import * as React from "react"
import { View, ViewStyle, TextStyle, Image } from "react-native"
import { NavigationInjectedProps } from "react-navigation"
import { Text } from "../../components"
import { color } from "../../theme"

const FULL: ViewStyle = { 
  flex: 1,
  justifyContent: 'center'
 }
const TEXT: TextStyle = {
  color: color.palette.black,
  fontFamily: "Montserrat",
}
const BOLD: TextStyle = { fontWeight: "bold" }
const TITLE: TextStyle = {
  ...TEXT,
  ...BOLD,
  fontSize: 17,
  lineHeight: 38,
  textAlign: "center",
}

export interface WelcomeScreenProps extends NavigationInjectedProps<{}> {}

export const WelcomeScreen: React.FunctionComponent<WelcomeScreenProps> = props => {
  const nextScreen = React.useMemo(() => () => props.navigation.navigate("main"), [
    props.navigation,
  ])

  setTimeout(() => {
    nextScreen()
  }, 2000);

  return (
    <View style={FULL}>
      <Image source={require('../logo_tipar.png')} style={{width: '100%', resizeMode:'center'}} />
      <Text style={TITLE}>Versi 1.0</Text>
    </View>
  )
}
