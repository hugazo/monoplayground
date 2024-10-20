<template>
  <div class="w-full h-full">
    <div class="w-4/5 h-4/5">
      <ExcalidrawBoard
        :theme="boardStore.getTheme"
        :on-change="boardStore.handleBoardUpdate"
        :initial-data="boardStore.initialBoardData"
      />
    </div>
    <div>
      <UiButton
        class="w-24"
        :variant="boardStore.autoSave ? 'default' : 'ghost'"
        @click="boardStore.autoSave = !boardStore.autoSave"
      >
        Auto Update
      </UiButton>
      <UiButton
        class="w-24"
        :loading="boardStore.loading"
        @click="boardStore.updateBoard"
      >
        Save
      </UiButton>
      <p>{{ $route.params.id }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
const route = useRoute();
const boardStore = board();

useAsyncData('data', () => boardStore.getBoardData(route.params.id as string));
</script>
