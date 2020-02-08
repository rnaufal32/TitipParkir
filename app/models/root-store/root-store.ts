import { Instance, SnapshotOut, types, getEnv, flow } from "mobx-state-tree"
import { NavigationStoreModel } from "../../navigation/navigation-store"
import { ParkingModel } from "../parking-model"
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
  get: (array: ParkingModel[]) => {
    self.parking.replace(array)
  },
  done: () => (self.status = "done")
}))
.extend(withEnvironment)
.actions(self => ({
  getParking: () => {
    setTimeout(() => {
      const arrays = {
        id: 1,
        name: "Testing"
      }
      self.get([arrays])
      self.done()
    }, 2000);
  },
  tesRealm: flow(function*(){
    console.log("WEW")
    self.environment.realm.getCar()
  }),
  addParking: (parking: ParkingModel) => (self.add(parking))
}))

/**
 * The RootStore instance.
 */
export interface RootStore extends Instance<typeof RootStoreModel> {}

/**
 * The data of a RootStore.
 */
export interface RootStoreSnapshot extends SnapshotOut<typeof RootStoreModel> {}
