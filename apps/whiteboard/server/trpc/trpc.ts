import { initTRPC } from '@trpc/server';
import type { Context } from './context';

const t = initTRPC.context<Context>().create();

// Procedure that is public regardless of auth status
export const publicProcedure = t.procedure;

// Procedure that requires the user to be signed out
export const signedOutProcedure = publicProcedure.use(async ({ ctx, next }) => {
  if (ctx.session.user) {
    throw new Error('Unauthorized');
  }
  return next();
});

// Procedure that requires the user to be signed in
export const signedInProcedure = publicProcedure.use(async ({ ctx, next }) => {
  if (!ctx.session.user) {
    throw new Error('Unauthorized');
  }
  return next();
});

export const router = t.router;
export const middleware = t.middleware;
