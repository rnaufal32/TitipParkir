import { PositionsModelModel, PositionsModel } from "./positions-model"

test("can be created", () => {
  const instance: PositionsModel = PositionsModelModel.create({})

  expect(instance).toBeTruthy()
})