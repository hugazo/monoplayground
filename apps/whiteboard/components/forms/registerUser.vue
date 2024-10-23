<script setup lang="ts">
import { useForm } from 'vee-validate';
import { toTypedSchema } from '@vee-validate/zod';
import * as z from 'zod';

import {
  FormField as UiFormField,
} from '@monoplayground/ui/components/ui/form';

const formSchema = toTypedSchema(z.object({
  email: z.string().email(),
  password: z.string().min(6),
}));

const form = useForm({
  validationSchema: formSchema,
});

const onSubmit = form.handleSubmit((values) => {
  console.log('Form submitted!', values);
  // TODO: Submit the form to a TRPC endpoint
});
</script>

<template>
  <form
    @submit="onSubmit"
  >
    <UiFormField
      v-slot="{ componentField }"
      name="email"
    >
      <UiFormItem
        class="my-3"
      >
        <UiFormLabel>Email</UiFormLabel>
        <UiFormControl>
          <UiInput
            type="text"
            placeholder="shadcn"
            v-bind="componentField"
          />
        </UiFormControl>
        <UiFormDescription>
          Please enter your email.
        </UiFormDescription>
        <UiFormMessage />
      </UiFormItem>
    </UiFormField>
    <UiFormField
      v-slot="{ componentField }"
      name="password"
    >
      <UiFormItem
        class="my-3"
      >
        <UiFormLabel>Password</UiFormLabel>
        <UiFormControl>
          <UiInput
            type="password"
            placeholder="********"
            v-bind="componentField"
          />
        </UiFormControl>
        <UiFormDescription>
          Please enter your password.
        </UiFormDescription>
        <UiFormMessage />
      </UiFormItem>
    </UiFormField>
    <UiButton type="submit">
      Submit
    </UiButton>
  </form>
</template>
