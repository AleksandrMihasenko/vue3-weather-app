<template>
  <div>
    <Suspense>
      <AsyncCityView />

      <template #fallback>
        <CityViewLayout />
      </template>
    </Suspense>
  </div>
</template>

<script setup lang="ts">
import { AsyncCityView } from '@/components/CityInfo';
import { CityViewLayout } from '@/components/CityInfo';
</script>
