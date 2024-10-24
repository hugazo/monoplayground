<template>
  <div class="h-screen w-screen flex items-center justify-center">
    <UiCard class="w-screen md:max-w-prose h-screen md:h-min flex flex-col justify-center">
      <UiCardHeader>
        <UiCardTitle>
          Register
        </UiCardTitle>
      </UiCardHeader>
      <UiCardContent>
        <DynamicForm
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
import { useToast } from '@monoplayground/ui/components/ui/toast';
import { userForm } from '~/models/user';

const schema = userForm.extend({
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

const { toast } = useToast();

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
  toast({
    description: `User ${result.email} registered successfully`,
  });
};
</script>
