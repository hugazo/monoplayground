<template>
  <ClientOnly>
    <UiButton @click="mode = mode === 'dark' ? 'light' : 'dark'">
      {{ mode }}
    </UiButton>
  </ClientOnly>
</template>

<script setup lang="ts">
const mode = useColorMode();
</script>
