<template>
  <div>
    <h1>Boards Index</h1>
    <pre>{{ boards }}</pre>
  </div>
</template>

<script setup lang="ts">
const { $client } = useNuxtApp();

const boards = await $client.board.getAllBoards.query();
</script>
