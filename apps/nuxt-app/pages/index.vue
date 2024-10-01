<template>
  <div>
    <h1>This is the root page</h1>
    <p>Hi, i am the root page</p>
    <UiButton @click="toggleColorMode">
      Toggle color mode
    </UiButton>
    <ClientOnly>
      <!-- Only on client, will mismatch hydration if rendered on server -->
      <pre>{{ colorMode }}</pre>
    </ClientOnly>
  </div>
</template>

<script setup lang="ts">
const colorMode = useColorMode();

const toggleColorMode = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-expressions
  colorMode.preference === 'dark' ? colorMode.preference = 'light' : colorMode.preference = 'dark';
};
</script>
