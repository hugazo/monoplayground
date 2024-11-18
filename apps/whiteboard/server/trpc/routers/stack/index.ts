import { router, signedInProcedure } from '~/server/trpc/trpc';
import { newStackForm, getStackDataForm } from '~/forms/stack';

export const stacksRouter = router({
  load: signedInProcedure
    .query(async ({ ctx }) => {
      const allStacks = await ctx.models.devstack.loadAllDevStacks();
      if (allStacks) {
        return allStacks;
      }
      return [];
    }),
  create: signedInProcedure
    .input(newStackForm)
    .mutation(async ({ ctx, input }) => {
      const { name, description } = input;
      const newStack = await ctx.models.devstack.newDevStack(name, description);
      return newStack;
    }),
  getStack: signedInProcedure
    .input(getStackDataForm)
    .query(async ({ ctx, input }) => {
      const { id } = input;
      const devStack = await ctx.models.devstack.loadDevStack(id);
      return devStack;
    }),
});
