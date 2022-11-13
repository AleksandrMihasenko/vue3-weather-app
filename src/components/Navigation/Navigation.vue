<template>
  <header class="sticky top-0 bg-weather-primary shadow-lg">
    <nav class="container flex flex-col sm:flex-row items-center gap-4 text-white py-6">
      <RouterLink :to="{  name: 'Home' }" class="flex items-center gap-3">
        <font-awesome-icon icon="fa-solid fa-sun text-2xl" />
        <p class="text-2xl">The Local Weather</p>
      </RouterLink>

      <div class="flex gap-3 flex-1 justify-end">
        <font-awesome-icon
          icon="fa-solid fa-circle-info text-xl hover:text-weather-secondary duration-150 cursor-pointer"
        />
        <font-awesome-icon
            icon="fa-solid fa-plus text-xl hover:text-weather-secondary duration-150 cursor-pointer"
        />
      </div>
    </nav>
  </header>
</template>

<script setup lang="ts">
  console.log('navigation component');
</script>
