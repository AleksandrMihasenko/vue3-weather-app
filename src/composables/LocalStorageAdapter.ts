import { useRoute, useRouter } from 'vue-router';
import { LocationInfo } from '@/types/LocationInfo';
import { uid } from 'uid';

export function useLocalStorageAdapter() {
  const route = useRoute();
  const router = useRouter();
  
  const data = localStorage.getItem('savedCities');
  let savedCities: LocationInfo[] = [];
  
  if (data) {
    savedCities = JSON.parse(data);
  }
  
  function saveCityInLocalStorage(): void {
    const locationInfo: LocationInfo = {
      id: uid(),
      state: route.params.state,
      city: route.params.city,
      coords: {
        lat: route.query.lat,
        lng: route.query.lng
      }
    };
  
    savedCities.push(locationInfo);
    localStorage.setItem('savedCities', JSON.stringify(savedCities));
  
    let query = Object.assign({});
    delete query.preview;
    query.id = locationInfo.id;
    router.replace({ query });
  }
  
  function removeCityFromLocalStorage() {
    const updatedCities = savedCities.filter((city: LocationInfo) => city.id !== route.query.id);
  
    localStorage.setItem('savedCities', JSON.stringify(updatedCities));
    
    router.push({ name: 'HomeView' })
  }
  
  return {
    savedCities,
    saveCityInLocalStorage,
    removeCityFromLocalStorage
  }
}
