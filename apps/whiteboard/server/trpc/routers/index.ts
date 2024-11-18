import { boardRouter } from './board';
import { userRouter } from './user';
import { sessionRouter } from './session';
import { stacksRouter } from './stack';
import { router } from '~/server/trpc/trpc';

export const appRouter = router({
  board: boardRouter,
  user: userRouter,
  session: sessionRouter,
  stacks: stacksRouter,
});

export type AppRouter = typeof appRouter;
