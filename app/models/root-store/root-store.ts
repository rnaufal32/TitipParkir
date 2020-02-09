import { Instance, SnapshotOut, types, getEnv, flow } from "mobx-state-tree"
import { NavigationStoreModel } from "../../navigation/navigation-store"
import { ParkingModel, ParkingModelSnapshot } from "../parking-model"
import { withEnvironment } from "../extensions"

/**
 * A RootStore model.
 */
export const RootStoreModel = types.model("RootStore").props({
  navigationStore: types.optional(NavigationStoreModel, {}),
  parking: types.array(ParkingModel),
  status: types.optional(types.enumeration(["empty", "loading", "done", "error"]), "empty"),
})
.actions(self => ({
  add: (obj: ParkingModel) => {
    self.parking.push(obj)
  },
  get: (array: ParkingModelSnapshot[]) => {
    const values = array.map(c => ParkingModel.create(c))
    self.parking.replace(values)
  },
  done: () => (self.status = "done"),
  loading: () => (self.status = "loading"),
  empty: () => (self.status = "empty")
}))
.extend(withEnvironment)
.actions(self => ({
  getParking: async() => {
    self.loading()
    const response = await self.environment.realm.getPark()
    if (response.length > 0) {
      self.get(response)
      self.done()
    } else {
      self.empty()
    }
  },
  addParking: async (parking: ParkingModel) => {
    const response = await self.environment.realm.addPark()
    console.log(`Response ${response}`)
  }
}))

/**
 * The RootStore instance.
 */
export interface RootStore extends Instance<typeof RootStoreModel> {}

/**
 * The data of a RootStore.
 */
export interface RootStoreSnapshot extends SnapshotOut<typeof RootStoreModel> {}
