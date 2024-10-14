import { z } from 'zod';
import { publicProcedure, router } from '~/server/trpc/trpc';
import { getBoards, deleteBoard, getBoard, updateBoard } from '~/models/board';

export const boardRouter = router({
  getAllBoards: publicProcedure
    .query(async () => {
      return await getBoards();
    }),
  deleteBoard: publicProcedure
    .input(
      z.object({
        id: z.string(),
      }),
    )
    .mutation(async ({ input }) => {
      const { id } = input;
      await deleteBoard(id);
      return { id };
    }),
  get: publicProcedure
    .input(
      z.object({
        id: z.string(),
      }),
    )
    .query(async ({ input }) => {
      const { id } = input;
      const board = await getBoard(id);
      return board;
    }),
  update: publicProcedure
    .input(
      z.object({
        id: z.string(),
        data: z.array(z.any()),
        files: z.any(),
      }),
    )
    .mutation(async ({ input }) => {
      const { id, data, files } = input;
      const board = await updateBoard(id, data, files);
      return board;
    }),
});
