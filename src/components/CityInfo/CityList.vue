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
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import axios from 'axios';
import { locationData } from '@/types/locationData';
import { CityCard } from '@/components/CityInfo';

const openWeatherApiKey = import.meta.env.VITE_APP_OPEN_WEATHER_API_KEY;

const router = useRouter();

const savedCities = ref<locationData[]>([]);

async function getCities() {
  const data = localStorage.getItem('savedCities');

  if (data) {
    savedCities.value = JSON.parse(data)
  }

  const requests: any = [];
  savedCities.value.forEach(city => {
    requests.push(
      axios.get(
    `https://api.openweathermap.org/data/2.5/weather?lat=${city.coords.lat}&lon=${city.coords.lng}&appid=${openWeatherApiKey}&units=metric`
      )
    )
  });

  const weatherData = await Promise.all(requests);

  await new Promise((res) => setTimeout(res, 1000));

  weatherData.forEach((value, index) => {
    savedCities.value[index].weather = value.data;
  });
}

function goToCitiView(city: any) {
  router.push({
    name: 'CityView',
    params: { state: city.state, city: city.city },
    query: { id: city.id, lat: city.coords.lat, lng: city.coords.lng }
  });
}

await getCities();
</script>
