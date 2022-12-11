import { LocationQueryValue } from 'vue-router';

export interface locationCoordinates {
  lat: LocationQueryValue | LocationQueryValue[],
  lng: LocationQueryValue | LocationQueryValue[]
}

export interface locationData {
  id: string,
  state: string | string[],
  city: string | string[],
  coords: locationCoordinates,
  weather?: null
}
