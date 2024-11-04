<template>
  <div class="h-screen">
    <UiToastToaster />
    <NuxtRouteAnnouncer />
    <NuxtPage />
  </div>
</template>

<script setup lang="ts">
useColorMode();
useRoute();
</script>

<style>
:root {
  font-family: 'Noto Sans', sans-serif;
}
</style>
