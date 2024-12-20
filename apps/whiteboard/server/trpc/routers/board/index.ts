import { z } from 'zod';
import { router, signedInProcedure } from '~/server/trpc/trpc';

export const boardRouter = router({
  getAllBoards: signedInProcedure
    .query(async ({ ctx }) => {
      return await ctx.models.board.getBoards();
    }),
  deleteBoard: signedInProcedure
    .input(
      z.object({
        id: z.string(),
      }),
    )
    .mutation(async ({ input, ctx }) => {
      const { id } = input;
      // const result = await deleteBoard(id);
      const result = await ctx.models.board.deleteBoard(id);
      return result;
    }),
  getBoard: signedInProcedure
    .input(
      z.object({
        id: z.string(),
      }),
    )
    .query(async ({ input, ctx }) => {
      const { id } = input;
      const board = await ctx.models.board.getBoard(id);
      return board;
    }),
  updateBoard: signedInProcedure
    .input(
      z.object({
        id: z.string(),
        data: z.array(z.any()),
        files: z.any(),
      }),
    )
    .mutation(async ({ input, ctx }) => {
      const { id, data, files } = input;
      const board = await ctx.models.board.updateBoard(id, data, files);
      return board;
    }),
});
