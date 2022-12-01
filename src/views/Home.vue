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
        <p v-if="searchResults.length === 0">No results finding, try a different city.</p>

        <template v-else>
          <li
            v-for="searchResult in searchResults"
            :key="searchResult.id"
            @click="displayCity(searchResult)"
            class="py-2 cursor-pointer"
          >
            {{ searchResult.place_name }}
          </li>
        </template>
      </ul>
    </div>
  </main>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { getLocations } from '@/services/api/searchCity';

const router = useRouter();

const searchInput = ref('');
const searchTimeout = ref<ReturnType<typeof setTimeout>>();
const searchResults = ref<string[] | null>(null);

function getSearchResults() {
  clearTimeout(searchTimeout.value);

  searchTimeout.value = setTimeout(async () => {
    if (searchInput.value !== '') {
      searchResults.value = await getLocations(searchInput.value);
      return;
    }
  }, 1000)
}

function displayCity(searchResult: unknown) {
  const [ city, state ] = searchResult.place_name.split(',');

  router.push({
    name: 'CityView',
    params: { state: state.replaceAll(' ', ''), city: city },
    query: {
      lat: searchResult.geometry.coordinates[1],
      lng: searchResult.geometry.coordinates[0],
      preview: 'true'
    }
  })
}
</script>
