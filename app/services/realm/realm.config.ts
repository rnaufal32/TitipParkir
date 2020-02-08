import { MigrationCallback, ObjectSchema } from "realm";
import { CarSchema } from "./realm.types";

export interface RealmConfig {
    schema: Array<ObjectSchema>
    schemaVersion: number
    migration: MigrationCallback
}

export const DEFAULT_REALM_CONFIG: RealmConfig = {
    schema: [CarSchema],
    schemaVersion: 0,
    migration: (oldRealm, newRealm) => {
        
    }
}