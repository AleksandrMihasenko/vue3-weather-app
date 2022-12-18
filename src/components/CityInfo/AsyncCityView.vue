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
        <h2 class="mb-4">5-day forecast</h2>

        <div
          v-for="hourData in weatherHourlyData.data.list"
          :key="hourData.dt"
          class="flex items-center"
        >
          <p class="flex-1">
            {{ new Date(hourData.dt * 1000).toLocaleDateString('en-gb', { weekday: 'long' }) }}
          </p>

          <img
            class="w-auto h-[50px] object-cover"
            :src="`http://openweathermap.org/img/wn/${hourData.weather[0].icon}@2x.png`"
            alt="weather icon"
          >

          <div class="flex gap-2 flex-1 justify-end">
            <p>H: {{ Math.round(hourData.main.temp_min) }}&deg;</p>
            <p>L: {{ Math.round(hourData.main.temp_max) }}&deg;</p>
          </div>
        </div>
      </div>

      <hr class="border-white border-opacity-10 border w-full">

      <div
        @click="removeCity"
        class="flex items-center gap-2 py-12 text-white cursor-pointer duration-150 hover:text-red-500"
      >
        <font-awesome-icon icon="fa-trash-can" />
        <p>Remove city</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import axios from 'axios';
import { useRoute, useRouter } from 'vue-router';

const route = useRoute();
const router = useRouter();

const openWeatherApiKey = import.meta.env.VITE_APP_OPEN_WEATHER_API_KEY;

async function getWeatherData() {
  return await axios.get(
  `https://api.openweathermap.org/data/2.5/weather?lat=${route.query.lat}&lon=${route.query.lng}&appid=${openWeatherApiKey}&units=metric`
  )
  .catch(error => console.log(error));
}

async function getHourlyWeatherData() {
  return await axios.get(
      `https://api.openweathermap.org/data/2.5/forecast?lat=${route.query.lat}&lon=${route.query.lng}&appid=${openWeatherApiKey}&units=metric`
  )
      .catch(error => console.log(error));
}

function removeCity() {
  let cities;
  const data = localStorage.getItem('savedCities');

  if (data) {
    cities = JSON.parse(data);
  }

  const updatedCities = cities.filter(city => city.id !== route.query);

  localStorage.setItem('savedCities', JSON.stringify(updatedCities));
  router.push({ name: 'HomeView' })
}

const weatherData = await getWeatherData();
const weatherHourlyData = await getHourlyWeatherData();
</script>
