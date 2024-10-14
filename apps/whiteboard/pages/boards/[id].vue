<template>
  <div class="w-full h-full">
    <div class="w-4/5 h-4/5">
      <ExcalidrawBoard
        :theme="getTheme"
        :on-change="handleOnChange"
        :initial-data="{ elements: boardData?.data, files: boardData?.files }"
      />
    </div>
    <div>
      <p>{{ $route.params.id }}</p>
      <pre>{{ boardData }}</pre>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { AppState, BinaryFiles } from '@excalidraw/excalidraw/types/types';
import type { ExcalidrawElement } from '@excalidraw/excalidraw/types/element/types';

const { $client } = useNuxtApp();
const route = useRoute();

const theme = useColorMode();

const getTheme = computed(() => {
  return theme.value === 'dark' ? 'dark' : 'light';
});

const logChange = async (
  elements: readonly ExcalidrawElement[],
  _state: AppState,
  files: BinaryFiles,
) => {
  const data = elements as ExcalidrawElement[];
  await $client.board.update.mutate({ id: route.params.id as string, data, files });
};

const waitTime = 1000;
const maxWait = 3000;

const handleOnChange = useDebounceFn(logChange, waitTime, { maxWait });

const boardData = ref(await $client.board.get.query({ id: route.params.id as string }));
</script>
