import createNativeStackNavigator from "react-native-screens/createNativeStackNavigator"
import {
  HomeScreen,
  ParkirAddScreen,
  WelcomeScreen,
  DetailScreen,
} from "../screens" // eslint-disable-line @typescript-eslint/no-unused-vars

export const MainNavigators = createNativeStackNavigator(
  {
    parkirAdd: { screen: ParkirAddScreen },
    home: { screen: HomeScreen },
    detail: { screen: DetailScreen },
  },
  {
    headerMode: "none",
    navigationOptions: { gesturesEnabled: false },
    initialRouteName: "home"
  },
)

export const RootNavigator = createNativeStackNavigator(
  {
    main: { screen: MainNavigators },
    welcome: { screen: WelcomeScreen },
  },
  {
    headerMode: "none",
    navigationOptions: { gesturesEnabled: false },
    initialRouteName: "welcome"
  },
)