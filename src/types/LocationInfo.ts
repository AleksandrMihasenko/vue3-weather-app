import { LocationQueryValue } from 'vue-router';

export interface LocationCoordinates {
  lat: LocationQueryValue | LocationQueryValue[],
  lng: LocationQueryValue | LocationQueryValue[]
}

export interface LocationInfo {
  id: string,
  state: string | string[],
  city: string | string[],
  coords: LocationCoordinates,
  weather?: null
}
