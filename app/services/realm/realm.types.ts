export const parkingName = 'Parking'

export const ParkingSchema = {
    name: parkingName,
    primaryKey: 'id',
    properties: {
      id: 'int',
      name: 'string',
      accuracy: 'int',
      altitude: 'int',
      isFromMockProvider: 'string',
      latitude: 'int',
      longitude: 'int',
      speed: 'int',
      photo: {type: 'string?[]', default: []},
      status: 'int',
      address: 'string'
    }
};