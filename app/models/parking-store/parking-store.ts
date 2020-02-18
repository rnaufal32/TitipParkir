import { Instance, SnapshotOut, types } from "mobx-state-tree"
import { withEnvironment } from "../extensions"
import { ParkingModel, ParkingModelSnapshot } from "../parking-model"
import {
  AdMobInterstitial
} from 'react-native-admob';

/**
 * Model description here for TypeScript hints.
 */
export const ParkingStoreModel = types
  .model("ParkingStore")
  .props({
    parking: types.array(ParkingModel),
    status: types.optional(types.enumeration(["empty", "loading", "done", "error"]), "empty"),
    current: types.optional(types.number, 0),
    ads: types.optional(types.boolean, false)
  })
  .views(self => ({}))
  .extend(withEnvironment)
  .actions(self => ({
    get: (array: ParkingModelSnapshot[]) => {
      const values = array.map(c => ParkingModel.create(c))
      self.parking.replace(values)
    },
    done: () => (self.status = "done"),
    loading: () => (self.status = "loading"),
    empty: () => (self.status = "empty"),
    setId: (id) => (self.current = id),
    setAds: (val) => (self.ads = val)
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
      const admob = await self.environment.realm.getAdmobCount()
      if (admob == 0 || admob == '0') {
        self.setAds(true)
        AdMobInterstitial.setAdUnitID('ca-app-pub-3940256099942544/1033173712')

        AdMobInterstitial.requestAd()
          .then(() => {
            AdMobInterstitial.showAd()
            self.setAds(false)
          })
      }
      if (admob == 4 || admob == '4') {
        let counts = 0
        self.environment.realm.upAdmobCount(counts)
      } else {
        let counts = admob + 1
        self.environment.realm.upAdmobCount(counts)
      }
      return response;
    },
    upParking: async (parking: ParkingModel) => {
      const response = await self.environment.realm.upPark(parking)
      return response
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
