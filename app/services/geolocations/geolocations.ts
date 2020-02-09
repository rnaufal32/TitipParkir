import BackgroundGeolocation, { Location } from '@mauron85/react-native-background-geolocation';
import { Alert } from "react-native";

export class Geolocations {

    constructor() {
        BackgroundGeolocation.configure({
            notificationsEnabled: false,
            startForeground: true
        })
    }

    setup() {
        BackgroundGeolocation.start()
    }

}