import type { H3Event } from 'h3';
import type { inferAsyncReturnType } from '@trpc/server';
import * as models from '@/models';
import type { UserSession } from '#auth-utils';

export const createContext = async (event: H3Event) => {
  // Gets the user session from the event
  const session = await getUserSession(event);
  if (session) {
    console.log('Session', session);
  }
  return {
    // Injects the event from H3 to be used in TRPC context
    event,
    // Injects the session
    session,
    // Injects the models
    models,
  };
};

declare module 'h3' {
  interface H3EventContext {
    session: UserSession | null;
  }
}

export type Context = inferAsyncReturnType<typeof createContext>;
