<script setup lang="ts">
import { nextTick, onMounted, ref } from 'vue';
import React from 'react';
import { createRoot } from 'react-dom/client';
import type { Ref } from 'vue';
import type { ExcalidrawProps } from '@excalidraw/excalidraw/types/types';

const props = defineProps<ExcalidrawProps>();

const loading = ref(true);

const excalidrawRef: Ref<HTMLDivElement | null> = ref(null);

onMounted(() => {
  nextTick(async () => {
    if (excalidrawRef.value) {
      const Excalidraw = (await import('@excalidraw/excalidraw')).Excalidraw;

      const root = createRoot(excalidrawRef.value);

      root.render(React.createElement(Excalidraw, props as ExcalidrawProps));

      loading.value = false;
    }
  });
});

onBeforeUnmount(() => {
  if (excalidrawRef.value) {
    excalidrawRef.value.innerHTML = '';
  }
});
</script>

<template>
  <ClientOnly>
    <slot
      v-if="loading"
      name="loader"
    >
      <p>Loading...</p>
    </slot>
    <div
      v-show="!loading"
      ref="excalidrawRef"
      class="excalidraw-board"
    />
  </ClientOnly>
</template>

<style scoped>
.excalidraw-board {
  width: 100%;
  height: 100%;
}
</style>
