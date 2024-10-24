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
    rules: 'password-confirmed:@password',
  },
};

const { $client } = useNuxtApp();

const onSubmit = async (values: z.infer<typeof schema>) => {
  const { email, password } = values;
  const result = await $client.user.create.mutate({
    email,
    password,
  });
  console.log('Form Submited by Default Function', result);
};
</script>
