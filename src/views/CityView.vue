<template>
  <div>
    <Suspense>
      <AsyncCityView />

      <template #fallback>
        <p class="text-center">Loading...</p>
      </template>
    </Suspense>
  </div>
</template>

<script setup lang="ts">
import AsyncCityView from '@/components/AsyncCityView/AsyncCityView.vue';
</script>
