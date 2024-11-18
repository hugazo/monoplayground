import type z from 'zod';
import type { DevStack, DevStackList } from '@monoplayground/db/models/devstack';
import { newStackForm } from '~/forms/stack';

export default defineStore('stacks', () => {
  const { $client } = useNuxtApp();

  const stackList = ref<DevStackList>([]);
  const stackData = ref<DevStack | null>(null);

  const loading = ref(false);

  async function fetchStackData(stackId: string) {
    try {
      loading.value = true;
      const stack = await $client.stacks.getStack.query({ id: stackId });
      if (stack) {
        stackData.value = stack as unknown as DevStack;
      }
    }
    finally {
      loading.value = false;
    }
  }

  async function fetchStackList() {
    try {
      loading.value = true;
      const stacks = await $client.stacks.load.query();
      if (stacks) {
        stackList.value = stacks as unknown as DevStackList;
      }
    }
    finally {
      loading.value = false;
    }
  }

  async function createNewStack(values: z.infer<typeof newStackForm>) {
    try {
      loading.value = true;
      const createdStack = await $client.stacks.create.mutate(values);
      stackList.value.push(createdStack as unknown as DevStack);
    }
    finally {
      loading.value = false;
    }
  }
  return {
    stackList,
    stackData,
    newStackForm,
    loading,
    fetchStackData,
    fetchStackList,
    createNewStack,
  };
});
