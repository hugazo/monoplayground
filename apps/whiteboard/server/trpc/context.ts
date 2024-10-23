import type { inferAsyncReturnType } from '@trpc/server';
import * as models from '@/models';

export const createContext = () => ({
  // Injects the models into the context
  models,
});

export type Context = inferAsyncReturnType<typeof createContext>;
