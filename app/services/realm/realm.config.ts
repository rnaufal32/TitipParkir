import { MigrationCallback, ObjectSchema, ObjectClass } from "realm";
import { ParkingSchema } from "./realm.types";

export interface RealmConfig {
    schema: Array<ObjectSchema>
    schemaVersion: number
    migration: MigrationCallback
}

export const DEFAULT_REALM_CONFIG: RealmConfig = {
    schema: [ParkingSchema],
    schemaVersion: 0,
    migration: (oldRealm, newRealm) => {
        
    }
}