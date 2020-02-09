import { ParkingStoreModel, ParkingStore } from "./parking-store"

test("can be created", () => {
  const instance: ParkingStore = ParkingStoreModel.create({})

  expect(instance).toBeTruthy()
})