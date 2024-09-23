<template>
  <div class="excaliboard">
    <ExcalidrawBoard />
  </div>
</template>

<script setup lang="ts">
import ExcalidrawBoard from './components/ExcalidrawBoard.vue';
</script>

<style scoped>
.excaliboard {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}
</style>
