<template>
  <div>
    <div>City view</div>
    <Suspense>
      <AsyncCityView />

      <template #fallback>
        <p>Loading...</p>
      </template>
    </Suspense>
  </div>
</template>

<script setup lang="ts">
import AsyncCityView from '@/components/AsyncCityView/AsyncCityView.vue';
</script>
