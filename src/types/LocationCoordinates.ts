import { LocationQueryValue } from 'vue-router';

export interface LocationCoordinates {
  lat: LocationQueryValue | LocationQueryValue[],
  lng: LocationQueryValue | LocationQueryValue[]
}
