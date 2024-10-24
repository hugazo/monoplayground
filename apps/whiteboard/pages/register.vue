<template>
  <div class="h-screen w-screen flex items-center justify-center">
    <UiCard class="w-screen md:max-w-prose h-screen md:h-min flex flex-col justify-center">
      <UiCardHeader>
        <UiCardTitle>
          Register
        </UiCardTitle>
      </UiCardHeader>
      <UiCardContent>
        <FormsDynamicForm
          :schema="schema"
          :submit-handler="onSubmit"
          :options
        />
      </UiCardContent>
    </UiCard>
  </div>
</template>

<script setup lang="ts">
import * as z from 'zod';
import type { FormActions } from 'vee-validate';

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
  passwordConfirmation: z.string().min(6),
});

const options = {
  email: {
    label: 'Your Email',
    placeholder: 'Please enter your email',
  },
  password: {
    label: 'Password',
    type: 'password',
    placeholder: 'Please enter your password',
  },
  passwordConfirmation: {
    label: 'Password Confirmation',
    type: 'password',
    placeholder: 'Please confirm your password',
    // TODO: Solve this rule not being used, workaround is to use the onSubmit function
    rules: 'password-confirmed:@password',
  },
};

const { $client } = useNuxtApp();

type Schema = z.infer<typeof schema>;

const onSubmit = async (values: Schema, actions: FormActions<Schema>) => {
  // Manual validation of password confirmation on submit
  if (values.password !== values.passwordConfirmation) {
    actions.setErrors({
      passwordConfirmation: 'Passwords do not match',
    });
    return;
  }
  // Use the values on registration
  const { email, password } = values;
  const result = await $client.user.create.mutate({
    email,
    password,
  });
  actions.resetForm();
  console.log('Form Submited by Default Function', result);
};
</script>
