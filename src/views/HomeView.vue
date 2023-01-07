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
        v-if="searchResults && isCorrectInfo"
        class="absolute bg-weather-secondary text-white w-full shadow-md py-2 px-1 top-[66px]"
      >
        <li v-if="searchResults.length === 0">No results finding, try a different city.</li>

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

      <BaseModal :isActive="!isCorrectInfo" @close-modal="isCorrectInfo = true">
        <div class="text-black text-center">
          <h1 class="text-2xl mb-1">{{searchResults.message}}</h1>

          <p class="mb-4">Try again later.</p>
        </div>
      </BaseModal>
    </div>

    <div class="flex flex-col gap-4">
      <Suspense>
        <CityList />

        <template #fallback>
          <CityCardLayout />
        </template>
      </Suspense>
    </div>
  </main>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { getLocations } from '@/services/api/searchCity';
import { CityList } from '@/components/CityInfo';
import { CityCardLayout } from '@/components/CityInfo';
import BaseModal from '@/components/Modals';
import { ErrorRequest } from '@/types/errorRequest';

const router = useRouter();

const searchInput = ref('');
const searchTimeout = ref<ReturnType<typeof setTimeout>>();
const searchResults = ref<string[] | ErrorRequest | null>(null);
const isCorrectInfo = ref(true);

function getSearchResults() {
  clearTimeout(searchTimeout.value);

  searchTimeout.value = setTimeout(async () => {
    if (searchInput.value !== '') {
      searchResults.value = await getLocations(searchInput.value);

      if (searchResults.value?.message) {
        isCorrectInfo.value = false;
      }
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
