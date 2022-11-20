<template>
  <main class="container text-white">
    <div class="pt-4 mb-8 relative">
      <input
          v-model="searchInput"
          @input="getSearchResults"
          type="text"
          placeholder="Search for a city"
          class="py-2 px-1 w-full bg-transparent border-b focus:border-weather-secondary focus:outline-none focus:shadow-[0px_1px_0_0_#004E71]"
      >

      <ul
        v-if="searchResults"
        class="absolute bg-weather-secondary text-white w-full shadow-md py-2 px-1 top-[66px]"
      >
        <li
          v-for="searchResult in searchResults"
          :key="searchResult.id"
          class="py-2 cursor-pointer"
        >
          {{ searchResult.place_name }}
        </li>
      </ul>
    </div>
  </main>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import axios from 'axios';

const searchInput = ref('');
const searchTimeout = ref<ReturnType<typeof setTimeout>>();
const searchResults = ref(null);

const mapboxApiKey = 'pk.eyJ1Ijoiam9sbGkyNyIsImEiOiJjbGFwODMzYXIwejN0M3FuMGJjdG5hZ2VlIn0.bB8C7C18fcJe1Y2THpPBwQ';

const getSearchResults = () => {
  clearTimeout(searchTimeout.value);

  searchTimeout.value = setTimeout(async () => {
    if (searchInput.value !== '') {
      const result = await axios.get(
    `https://api.mapbox.com/geocoding/v5/mapbox.places/${searchInput.value}.json?access_token=${mapboxApiKey}&types=place`
      );
      searchResults.value = result.data.features;
      return;
    }

    searchResults.value = null;
  }, 300)
};
</script>

<style scoped>

</style>
