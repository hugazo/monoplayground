import { boardRouter } from './board';
import { router } from '~/server/trpc/trpc';

export const appRouter = router({
  board: boardRouter,
});

export type AppRouter = typeof appRouter;
