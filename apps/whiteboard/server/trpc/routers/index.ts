import { boardRouter } from './board';
import { userRouter } from './user';
import { router } from '~/server/trpc/trpc';

export const appRouter = router({
  board: boardRouter,
  user: userRouter,
});

export type AppRouter = typeof appRouter;
