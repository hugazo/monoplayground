<template>
  <div class="main-wrapper">
    <Board theme="dark" :onChange="handleOnChange" />
  </div>
</template>

<script lang="ts" setup>
import type { AppState, BinaryFiles } from "@excalidraw/excalidraw/types/types";
import type { ExcalidrawElement } from "@excalidraw/excalidraw/types/element/types";

function handleOnChange(
  elements: readonly ExcalidrawElement[],
  state: AppState,
  _files: BinaryFiles
) {
  console.log("Board Updated:", elements, state);
}
</script>

<style scoped>
.main-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}
</style>
