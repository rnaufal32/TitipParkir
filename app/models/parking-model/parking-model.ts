import { Instance, SnapshotOut, types } from "mobx-state-tree"

/**
 * Model description here for TypeScript hints.
 */
export const ParkingModel = types
  .model("ParkingModel")
  .props({
    id: types.number,
    name: types.string
  })
  .views(self => ({})) // eslint-disable-line @typescript-eslint/no-unused-vars
  .actions(self => ({})) // eslint-disable-line @typescript-eslint/no-unused-vars

  /**
  * Un-comment the following to omit model attributes from your snapshots (and from async storage).
  * Useful for sensitive data like passwords, or transitive state like whether a modal is open.

  * Note that you'll need to import `omit` from ramda, which is already included in the project!
  *  .postProcessSnapshot(omit(["password", "socialSecurityNumber", "creditCardNumber"]))
  */

type ParkingModelType = Instance<typeof ParkingModel>
export interface ParkingModel extends ParkingModelType {}
type ParkingModelSnapshotType = SnapshotOut<typeof ParkingModel>
export interface ParkingModelSnapshot extends ParkingModelSnapshotType {}
