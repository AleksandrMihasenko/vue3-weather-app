<template>
  <div class="flex flex-col flex-1 items-center">
    <div v-if="route.query.preview" class="text-white p-4 bg-weather-secondary w-full text-center">
      <p>You see preview of the city, click "+" icon to start tracking this city.</p>
    </div>

    <div class="flex flex-col items-center text-white py-12">
      <h1 class="text-4xl mb-2">{{ route.params.city }}</h1>

      <p class="text-sm mb-12">
        {{ new Date().toLocaleDateString('en-GB', { weekday: 'short', day: '2-digit', month: 'long' }) }}
        {{ new Date().toLocaleTimeString('en-GB', { timeStyle: 'short' }) }}
      </p>

      <p class="text-8xl mb-8">
        {{ Math.round(weatherData.data.main.temp) }}&deg;
      </p>

      <p>
        Feels like
        {{ Math.round(weatherData.data.main.feels_like) }}
        &deg;
      </p>

      <p class="capitalize">
        {{ weatherData.data.weather[0].description }}
      </p>

      <img
        class="w-[150px] h-auto"
        :src="`http://openweathermap.org/img/wn/${weatherData.data.weather[0].icon}@2x.png`"
        alt="weather icon"
      >
    </div>

    <hr class="border-white border-opacity-10 border w-full">

    <div class="max-w-screen-md w-full py-12">
      <div class="mx-8 text-white">
        <h2 class="mb-4">Hourly weather</h2>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import axios from 'axios';
import { useRoute } from 'vue-router';

const route = useRoute();

const openWeatherApiKey = import.meta.env.VITE_APP_OPEN_WEATHER_API_KEY;

async function getWeatherData() {
  return await axios.get(
  `https://api.openweathermap.org/data/2.5/weather?lat=${route.query.lat}&lon=${route.query.lng}&appid=${openWeatherApiKey}&units=imperial`
  )
  .catch(error => console.log(error));
}

const weatherData = await getWeatherData();
console.log(weatherData)
</script>
