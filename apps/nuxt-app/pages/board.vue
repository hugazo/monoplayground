<template>
  <div class="main-wrapper">
    <ExcalidrawBoard
      :theme="getTheme"
      :on-change="handleOnChange"
    />
  </div>
</template>

<script lang="ts" setup>
import type { AppState, BinaryFiles } from '@excalidraw/excalidraw/types/types';
import type { ExcalidrawElement } from '@excalidraw/excalidraw/types/element/types';

const theme = useColorMode();

const getTheme = computed(() => {
  return theme.value === 'dark' ? 'dark' : 'light';
});

const logChange = (
  elements: readonly ExcalidrawElement[],
  state: AppState,
  files: BinaryFiles,
) => {
  // TODO: Implement the public method to save the data
  console.log('elements', elements);
  console.log('state', state);
  console.log('files', files);
};

const waitTime = 1000;
const maxWait = 3000;

const handleOnChange = useDebounceFn(logChange, waitTime, { maxWait });
</script>

<style scoped>
.main-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}
</style>
