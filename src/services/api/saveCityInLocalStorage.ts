import { LocationInfo } from '@/types/LocationInfo';

export function saveCityInLocalStorage(locationInfo: LocationInfo): LocationInfo[] {
  let savedCities = [];
  
  const data = localStorage.getItem('savedCities');
  
  if (data) {
    savedCities = JSON.parse(data);
  }
  
  savedCities.push(locationInfo);
  localStorage.setItem('savedCities', JSON.stringify(savedCities));
  
  // let query = Object.assign({});
  // delete query.preview;
  // query.id = locationInfo.id;
  // router.replace({ query });
  
  return savedCities;
}
