import Realm from 'realm'
import { DEFAULT_REALM_CONFIG, RealmConfig } from './realm.config'

export class RealmDB {
    realm: Realm
    config: RealmConfig

    constructor(config: RealmConfig = DEFAULT_REALM_CONFIG) {
        this.config = config
    }

    setup() {
        this.realm = new Realm(this.config)
    }

    async getCar() {
        const response = await this.realm.objects("Car")
        console.log(response.length)
    }
}