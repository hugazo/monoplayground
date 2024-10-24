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
