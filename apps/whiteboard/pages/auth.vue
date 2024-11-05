<template>
  <div class="h-screen w-screen flex items-center justify-center">
    <AuthState v-slot="{ loggedIn, user, clear }">
      <UiCard

        class="w-screen md:max-w-prose h-screen md:h-min flex flex-col justify-center"
      >
        <UiCardHeader>
          <UiCardTitle>
            {{ loggedIn ? 'Logout!' : 'Login' }}
          </UiCardTitle>
        </UiCardHeader>
        <UiCardContent>
          <div v-if="user">
            <p>You are logged in as {{ user }}</p>
            <UiButton @click="clear">
              Logout
            </UiButton>
          </div>
          <DynamicForm
            v-else
            :schema="schema"
            :submit-handler="onSubmit"
            :options
          />
        </UiCardContent>
      </UiCard>
    </AuthState>
  </div>
</template>

<script setup lang="ts">
import type * as z from 'zod';
import type { FormActions } from 'vee-validate';
import { useToast } from '@monoplayground/ui/components/ui/toast';
import { userForm as schema } from '~/forms/user';

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
};

const { $client } = useNuxtApp();

type Schema = z.infer<typeof schema>;

const { toast } = useToast();
const router = useRouter();

const onSubmit = async (values: Schema, actions: FormActions<Schema>) => {
  try {
    const { email, password } = values;
    const result = await $client.session.login.mutate({
      email,
      password,
    });
    toast({
      description: `User ${result.email} logged in successfully`,
    });
    actions.resetForm();
    router.push('/boards');
  }
  catch (error: unknown) {
    const { message } = error as Error;
    toast({
      description: message || 'Invalid email or password',
      variant: 'destructive',
    });
  }
};
</script>
