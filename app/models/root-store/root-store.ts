import { ParkingStoreModel } from "../../models/parking-store"
import { Instance, SnapshotOut, types, getEnv, flow } from "mobx-state-tree"
import { NavigationStoreModel } from "../../navigation/navigation-store"
import { PositionsModel } from "../positions-model"

/**
 * A RootStore model.
 */
export const RootStoreModel = types.model("RootStore").props({
  positionStore: types.optional(PositionsModel, {}),
  parkingStore: types.optional(ParkingStoreModel, {}),
  navigationStore: types.optional(NavigationStoreModel, {})
})

/**
 * The RootStore instance.
 */
export interface RootStore extends Instance<typeof RootStoreModel> {}

/**
 * The data of a RootStore.
 */
export interface RootStoreSnapshot extends SnapshotOut<typeof RootStoreModel> {}
