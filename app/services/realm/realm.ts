import Realm from 'realm'
import { DEFAULT_REALM_CONFIG, RealmConfig } from './realm.config'
import { parkingName } from './realm.types'
import { ParkingModelSnapshot } from '../../models/parking-model'

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
        status: data.status
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
        const response = this.realm.objects(parkingName)
        const converted: ParkingModelSnapshot[] = response.map(convertToPark)
        return converted
    }

    async addPark() {
        const park = this.realm.objects(parkingName).sorted('id', true)
        let ids = 0;
        if (park.length > 0) {
            ids = park[0].id + 1
        }
        console.log(JSON.stringify(park))
        console.log(ids)
        try {
            this.realm.write(() => this.realm.create(parkingName, {
                id: ids,
                name: 'Tes',
                accuracy: 2,
                altitude: 2,
                altitudeAccuracy: 2,
                heading: 1,
                latitude: 0,
                longitude: 0,
                speed: 0,
                photo: [],
                status: 0
            }))
            return true;
        } catch(e) {
            return false;
        }
    }

}