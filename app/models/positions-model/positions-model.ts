import { Instance, SnapshotOut, types } from "mobx-state-tree"
import { withEnvironment } from "../extensions"
import BackgroundGeolocation from "@mauron85/react-native-background-geolocation"

/**
 * Model description here for TypeScript hints.
 */
export const PositionsModel = types
  .model("PositionsModel")
  .props({
    accuracy: types.optional(types.number, 0),
    altitude: types.optional(types.number, 0),
    isFromMockProvider: types.optional(types.boolean, false),
    latitude: types.optional(types.number, 0),
    longitude: types.optional(types.number, 0),
    speed: types.optional(types.number, 0),
    status: types.optional(types.enumeration(["waiting", "done"]), "done")
  })
  .extend(withEnvironment)
  .actions(self => ({
    setValue(location) {
      self.accuracy = location.accuracy
      self.altitude = location.altitude
      self.isFromMockProvider = location.isFromMockProvider
      self.latitude = location.latitude
      self.longitude = location.longitude
      self.speed = location.speed
      self.status = "done"
    }
  }))
  .actions(self => ({
    async getPosition(loc?) {
      self.status = "waiting"
      BackgroundGeolocation.start()
      BackgroundGeolocation.getCurrentLocation(location => {
        self.setValue(location)
        loc(location)
        BackgroundGeolocation.stop()
      })
    }
  }))

  /**
  * Un-comment the following to omit model attributes from your snapshots (and from async storage).
  * Useful for sensitive data like passwords, or transitive state like whether a modal is open.

  * Note that you'll need to import `omit` from ramda, which is already included in the project!
  *  .postProcessSnapshot(omit(["password", "socialSecurityNumber", "creditCardNumber"]))
  */

type PositionsModelType = Instance<typeof PositionsModel>
export interface PositionsModel extends PositionsModelType {}
type PositionsModelSnapshotType = SnapshotOut<typeof PositionsModel>
export interface PositionsModelSnapshot extends PositionsModelSnapshotType {}
