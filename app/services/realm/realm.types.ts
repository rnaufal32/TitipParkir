export const parkingName = 'Parking'

export const ParkingSchema = {
    name: parkingName,
    primaryKey: 'id',
    properties: {
      id: 'int',
      name: 'string',
      accuracy: 'double',
      altitude: 'double',
      altitudeAccuracy: 'double',
      heading: 'double',
      latitude: 'double',
      longitude: 'double',
      speed: 'double',
      photo: {type: 'string?[]', default: []},
      status: 'int'
    }
};