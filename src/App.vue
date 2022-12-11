<template>
  <div class="flex flex-col min-h-screen font-Roboto bg-weather-primary">
    <Navigation />

    <RouterView />
  </div>
</template>

<script setup lang="ts">
import { Navigation } from '@/components/Navigation';

</script>
