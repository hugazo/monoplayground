import { publicProcedure, router } from '~/server/trpc/trpc';
import { getBoards } from '~/models/board';

export const boardRouter = router({
  getAllBoards: publicProcedure
    .query(async () => {
      return await getBoards();
    }),
});
