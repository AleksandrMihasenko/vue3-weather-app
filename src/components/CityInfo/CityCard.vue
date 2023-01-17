<template>
  <div class="flex py-6 px-3 bg-weather-secondary rounded-md shadow-md cursor-pointer">
    <div class="flex flex-col flex-1">
      <h2 class="text-3xl">{{ city.city }}</h2>

      <h3>{{ city.state }}</h3>

      <div class="flex justify-between gap-2">
        <div class="self-start">
          <img
            class="w-auto h-[50px] object-cover"
            :src="`http://openweathermap.org/img/wn/${city.weather.weather[0].icon}@2x.png`"
            alt="weather icon"
          >
        </div>

        <div>
          <p class="text-3xl">
            {{ Math.round(city.weather.main.temp) }}&deg;
          </p>

          <div class="flex gap-2">
            <span class="text-xs">
              H: {{ Math.round(city.weather.main.temp_max) }}&deg;
            </span>

              <span class="text-xs">
              L: {{ Math.round(city.weather.main.temp_min) }}&deg;
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { LocationInfo } from '@/types/LocationInfo';

const props = defineProps<{
  city: LocationInfo
}>();
</script>
