import { ParkingModel } from "./parking-model"

test("can be created", () => {
  const instance: ParkingModel = ParkingModel.create({})

  expect(instance).toBeTruthy()
})