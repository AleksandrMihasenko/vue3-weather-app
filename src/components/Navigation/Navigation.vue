<template>
  <header class="sticky top-0 bg-weather-primary shadow-lg">
    <nav class="container flex flex-col sm:flex-row items-center gap-4 text-white py-6">
      <RouterLink :to="{  name: 'HomeView' }" class="flex items-center gap-3">
        <font-awesome-icon icon="fa-solid fa-sun text-2xl" />
        <p class="text-2xl">The Local Weather</p>
      </RouterLink>

      <div class="flex gap-3 flex-1 justify-end">
        <font-awesome-icon
          @click="toggleModal"
          icon="fa-solid fa-circle-info"
          class="text-xl hover:text-weather-secondary duration-150 cursor-pointer"
        />
        <font-awesome-icon
          v-if="route.query.preview"
          icon="fa-solid fa-plus"
          class="text-xl hover:text-weather-secondary duration-150 cursor-pointer"
          @click="saveCityInLocalStorage"
        />
      </div>

      <BaseModal :isActive="isActiveModal" @close-modal="toggleModal">
        <div class="text-black">
          <h1 class="text-2xl mb-1">Weather App</h1>

          <p class="mb-4">Allows you to find and see current weather of chosen cities.</p>

          <ol class="list-decimal list-inside mb-4">
            <li>Search city by typing the name in search bar.</li>
            <li>Select city with weather results.</li>
            <li>Track the city by clicing on the "+" icon. This will save the city to view at a later time.</li>
          </ol>

          <p>Also, you can remove the city at the bottom of the page.</p>
        </div>
      </BaseModal>
    </nav>
  </header>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useLocalStorageAdapter } from '@/composables/LocalStorageAdapter';
import BaseModal from '@/components/Modals';

const route = useRoute();
const router = useRouter();

const { saveCityInLocalStorage } = useLocalStorageAdapter();

const isActiveModal = ref(false);

function toggleModal() {
  isActiveModal.value = !isActiveModal.value;
}
</script>
