<script setup lang="ts">
import { toTypedSchema } from '@vee-validate/zod';
import {
  FormField as UiFormField,
} from '@monoplayground/ui/components/ui/form';
import { Form, useForm, defineRule } from 'vee-validate';
import type * as z from 'zod';

const props = defineProps<{
  schema: z.ZodTypeAny;
  submitHandler?: {
    (values: z.infer<typeof props.schema>): Promise<void>;
  };
  options: Record<string, Record<string, string>>;
}>();

const validationSchema = toTypedSchema(props.schema);

const form = reactive(useForm({
  validationSchema,
}));

const values = computed(() => Object.keys(form.values));

const options = reactive(props.options);

defineRule('password-confirmed', (value: string, [target]: string) => {
  if (target !== value) {
    return 'The password confirmation does not match.';
  }
  return true;
});
</script>

<template>
  <Form
    :form
    @submit="props.submitHandler"
  >
    <UiFormField
      v-for="field in values"
      v-slot="{ componentField }"
      :key="field"
      :name="field"
      :rules="options[field]?.rules"
    >
      <UiFormItem
        class="my-3"
      >
        <UiFormLabel>{{ options[field]?.label || field }}</UiFormLabel>
        <UiFormControl>
          <!-- TODO: Add more components, maybe a DynamicInput component -->
          <UiInput
            :type="options[field]?.type || 'text'"
            :placeholder="options[field]?.placeholder || field"
            v-bind="componentField"
          />
        </UiFormControl>
        <UiFormDescription v-if="options[field]?.description">
          {{ options[field]?.description }}
        </UiFormDescription>
        <UiFormMessage />
      </UiFormItem>
    </UiFormField>
    <div class="mt-4 flex justify-around">
      <UiButton
        class="w-20 mx-2"
        :disabled="form.isSubmitting"
        type="submit"
      >
        submit
      </UiButton>
      <UiButton
        class="w-20 mx-2"
        :disabled="form.isSubmitting"
      >
        <!-- TODO: implement the reset logic -->
        Reset
      </UiButton>
    </div>
  </Form>
</template>
