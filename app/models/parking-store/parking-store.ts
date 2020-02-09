import { Instance, SnapshotOut, types } from "mobx-state-tree"
import { withEnvironment } from "../extensions"
import { ParkingModel, ParkingModelSnapshot } from "../parking-model"

/**
 * Model description here for TypeScript hints.
 */
export const ParkingStoreModel = types
  .model("ParkingStore")
  .props({
    parking: types.array(ParkingModel),
    status: types.optional(types.enumeration(["empty", "loading", "done", "error"]), "empty")
  })
  .views(self => ({}))
  .extend(withEnvironment)
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
      const response = await self.environment.realm.addPark(parking)
      return response;
    }
  }))

  /**
  * Un-comment the following to omit model attributes from your snapshots (and from async storage).
  * Useful for sensitive data like passwords, or transitive state like whether a modal is open.

  * Note that you'll need to import `omit` from ramda, which is already included in the project!
  *  .postProcessSnapshot(omit(["password", "socialSecurityNumber", "creditCardNumber"]))
  */

type ParkingStoreType = Instance<typeof ParkingStoreModel>
export interface ParkingStore extends ParkingStoreType {}
type ParkingStoreSnapshotType = SnapshotOut<typeof ParkingStoreModel>
export interface ParkingStoreSnapshot extends ParkingStoreSnapshotType {}
