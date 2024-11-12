<template>
  <div class="flex h-screen">
    <div
      id="element"
      class="h-full w-full"
    />
    <div class="w-100">
      <UiButton @click="handleSave">
        Save
      </UiButton>
    </div>
  </div>
</template>

<script setup lang="ts">
import StackBlitz from '@stackblitz/sdk';
import type { VM, EmbedOptions, Project } from '@stackblitz/sdk';

const ready = ref(false);

const vm: Ref<VM | null> = ref(null);

const payload: Project = {
  title: 'demo project',
  description: 'A demo project',
  files: {
  },
  template: 'node',
};

const options: EmbedOptions = {
  clickToLoad: false,
  openFile: 'index.js',
  terminalHeight: 50,
};

const handleSave = async () => {
  if (vm.value) {
    const value = await vm.value.getFsSnapshot();
    console.log('Exported value', value);
  }
};

onMounted(async () => {
  const updatedVm = await StackBlitz.embedProject('element', payload, options);
  vm.value = updatedVm;

  ready.value = true;
});
</script>
