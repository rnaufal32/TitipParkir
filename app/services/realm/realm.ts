import Realm from 'realm'
import { DEFAULT_REALM_CONFIG, RealmConfig } from './realm.config'
import { parkingName } from './realm.types'
import { ParkingModelSnapshot, ParkingModel } from '../../models/parking-model'

const convertToPark = (data: any): ParkingModelSnapshot => {
    return {
        id: data.id,
        accuracy: data.accuracy,
        altitude: data.altitude,
        altitudeAccuracy: data.altitudeAccuracy,
        heading: data.heading,
        latitude: data.latitude,
        longitude: data.longitude,
        name: data.name,
        photo: [],
        speed: data.speed,
        status: data.status,
        address: data.address
    }
}

export class RealmDB {
    realm: Realm
    config: RealmConfig

    constructor(config: RealmConfig = DEFAULT_REALM_CONFIG) {
        this.config = config
    }

    setup() {
        this.realm = new Realm(this.config)
    }

    async getPark() {
        const response = this.realm.objects(parkingName).filtered('status = 0')
        const converted: ParkingModelSnapshot[] = response.map(convertToPark)
        return converted
    }

    async addPark(value: ParkingModel) {
        const park = this.realm.objects(parkingName).sorted('id', true)
        let ids = 0;
        if (park.length > 0) {
            ids = park[0].id + 1
        }
        try {
            this.realm.write(() => this.realm.create(parkingName, {
                id: ids,
                name: value.name,
                accuracy: value.accuracy,
                altitude: value.altitude,
                isFromMockProvider: 'false',
                latitude: value.latitude,
                longitude: value.longitude,
                speed: value.speed,
                photo: [],
                status: 0,
                address: value.address
            }))
            return true;
        } catch(e) {
            return false;
        }
    }

    async upPark(value: ParkingModel) {
        try {
            this.realm.write(() => this.realm.create(parkingName, {
                id: value.id,
                status: 1
            }, true))

            return true
        } catch(e) {
            console.log(e)
            return false
        }
    }

}