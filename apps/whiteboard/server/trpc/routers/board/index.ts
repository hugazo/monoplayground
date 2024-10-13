import { publicProcedure, router } from '~/server/trpc/trpc';

export const boardRouter = router({
  getAllBoards: publicProcedure
    .query(async () => {
      return [];
    }),
});
