import { boardRouter } from './board';
import { userRouter } from './user';
import { sessionRouter } from './session';
import { router } from '~/server/trpc/trpc';

export const appRouter = router({
  board: boardRouter,
  user: userRouter,
  session: sessionRouter,
});

export type AppRouter = typeof appRouter;
