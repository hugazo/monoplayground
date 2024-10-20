<template>
  <div class="w-full h-full">
    <div class="w-4/5 h-4/5">
      <ExcalidrawBoard
        :theme="getTheme"
        :on-change="handleOnChange"
        :initial-data="initialData"
      />
    </div>
    <div>
      <UiButton
        class="w-24"
        :variant="enableAutoUpdate ? 'default' : 'ghost'"
        @click="enableAutoUpdate = !enableAutoUpdate"
      >
        Auto Update
      </UiButton>
      <UiButton
        class="w-24"
        :loading="loading"
        @click="manualSave"
      >
        Save
      </UiButton>
      <p>{{ $route.params.id }}</p>
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

const enableAutoUpdate = ref(false);
const loading = ref(false);

const initialData = computed(() => {
  if (!boardData?.value?.data) return { elements: [], files: {} };
  return {
    elements: boardData.value.data as ExcalidrawElement[],
    files: boardData.value.files,
  };
});

const manualSave = async () => {
  if (!boardData.value) return;
  loading.value = true;
  await logChange(boardData.value.data, {} as AppState, boardData.value.files);
  loading.value = false;
};

const logChange = async (
  elements: readonly ExcalidrawElement[],
  _state: AppState,
  files: BinaryFiles,
) => {
  if (!enableAutoUpdate.value) return;
  const data = elements as ExcalidrawElement[];
  await $client.board.update.mutate({ id: route.params.id as string, data, files });
  if (boardData.value) {
    boardData.value.data = data;
    boardData.value.files = files;
  }
};

const waitTime = 1000;
const maxWait = 3000;

const handleOnChange = useDebounceFn(logChange, waitTime, { maxWait });

const boardData = ref(await $client.board.get.query({ id: route.params.id as string }));
</script>
