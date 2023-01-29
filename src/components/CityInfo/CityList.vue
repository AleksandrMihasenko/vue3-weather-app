<template>
  <div
    v-for="city in savedCities"
    :key="city.id"
  >
    <CityCard :city="city" @click="goToCitiView(city)" />
  </div>

  <p v-if="savedCities.length === 0" class="text-center">
    No locations added. To start tracking  location, type city in the search field above
  </p>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';
import { useLocalStorageAdapter } from '@/composables/LocalStorageAdapter';
import { getWeeklyWeather } from '@/services/api/getOpenWeatherData';
import { LocationCoordinates, LocationInfo } from '@/types/LocationInfo';
import { CityCard } from '@/components/CityInfo';

const router = useRouter();
const { savedCities } = useLocalStorageAdapter();

async function getCities() {
  const requests: LocationInfo[] = [];

  savedCities.forEach(city => {
    const query: LocationCoordinates = { lat: city.coords.lat, lng: city.coords.lng };

    requests.push(getWeeklyWeather(query) as unknown as LocationInfo);
  });

  const weatherData = await Promise.all(requests);

  await new Promise((res) => setTimeout(res, 1000));

  weatherData.forEach((value, index) => {
    savedCities[index].weather = value;
  });
}

function goToCitiView(city: LocationInfo) {
  router.push({
    name: 'CityView',
    params: { state: city.state, city: city.city },
    query: { id: city.id, lat: city.coords.lat, lng: city.coords.lng }
  });
}

await getCities();
</script>
