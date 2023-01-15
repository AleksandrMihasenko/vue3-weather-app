import { LocationQueryValue } from 'vue-router';

export interface LocationCoordinates {
  coordinates: number[]
}

export interface LocationDataResponse {
  id: string,
  place_name: string,
  state: string | string[],
  city: string | string[],
  geometry: LocationCoordinates,
  weather?: null,
  message?: string
}
