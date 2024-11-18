<template>
  <div v-if="stacks">
    <UiPopover>
      <UiPopoverTrigger as-child>
        <UiButton>New Dev Stack</UiButton>
      </UiPopoverTrigger>
      <UiPopoverContent>
        <UiAutoForm
          class="space-y-6"
          :schema="newStackForm"
          @submit="handleSubmit"
        >
          <UiButton type="submit">
            Submit
          </UiButton>
        </UiAutoForm>
      </UiPopoverContent>
    </UiPopover>
    <template
      v-for="stack in stacks"
      :key="stack.id"
    >
      <div>
        <p>{{ stack.title }}</p>
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
import type z from 'zod';
import { useToast } from '@monoplayground/ui/components/ui/toast';
import { newStackForm } from '~/forms/stack';

// TODO: Handle all of this in the store

const { $client } = useNuxtApp();
const { data: stacks } = useAsyncData('stacks', async () => await $client.stacks.load.query());

const loading = ref(false);

const { toast } = useToast();

const handleSubmit = async (values: z.infer<typeof newStackForm>) => {
  loading.value = true;

  try {
    console.log('Called', values);
    const createdStack = await $client.sacks.create.mutate(values);
    stacks.value.push(createdStack);
  }
  catch (e) {
    console.error(e);
    toast({
      description: e.message || 'An error occurred',
    });
  }
  finally {
    loading.value = false;
  }
};
</script>
