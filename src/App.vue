<template>
  <div class="flex flex-col min-h-screen font-Roboto bg-weather-primary">
    <Navigation />

    <RouterView v-slot="{ Component }">
      <Transition name="page" mode="out-in">
        <component :is="Component" />
      </Transition>
    </RouterView>
  </div>
</template>

<script setup lang="ts">
import { Navigation } from '@/components/Navigation';

</script>

<style lang="sass">
  .page-enter-active,
  .page-leave-active
    transition: .5s ease all

  .page-enter-from,
  .page-leave-to
    opacity: 0
</style>
