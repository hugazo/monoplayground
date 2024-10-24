<script setup lang="ts">
import { toTypedSchema } from '@vee-validate/zod';
import {
  FormField as UiFormField,
} from '@monoplayground/ui/components/ui/form';
import type { FormActions } from 'vee-validate';
import { useForm, defineRule } from 'vee-validate';
import type * as z from 'zod';

type FormSchema = z.infer<typeof props.schema>;

const props = defineProps<{
  schema: z.ZodTypeAny;
  submitHandler?: {
    (values: FormSchema, actions: FormActions<FormSchema>): Promise<void>;
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

const onSubmit = form.handleSubmit(async (values, actions: FormActions<typeof form.values>) => {
  if (props.submitHandler) {
    await props.submitHandler(values, actions);
  }
});
</script>

<template>
  <form @submit="onSubmit">
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
        type="submit"
        :disabled="form.isSubmitting"
      >
        Submit
      </UiButton>
      <UiButton
        class="w-20 mx-2"
        :disabled="form.isSubmitting"
        @click="form.resetForm"
      >
        Reset
      </UiButton>
    </div>
  </form>
</template>
