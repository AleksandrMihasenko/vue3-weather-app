<template>
  <div>Async city view</div>
</template>

<script setup lang="ts">
import axios from 'axios';
import { useRoute } from 'vue-router';

const route = useRoute();

const openWeatherApiKey = import.meta.env.VITE_APP_OPEN_WEATHER_API_KEY;

async function getWeatherData() {
  const weatherData = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?lat=${route.query.lat}&lon=${route.query.lng}&appid=${openWeatherApiKey}&units=imperial`
  )
  .catch(error => console.log(error));

  return weatherData;
}

const weatherData = await getWeatherData();
console.log(weatherData)
</script>
