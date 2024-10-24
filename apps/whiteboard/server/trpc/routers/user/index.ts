import { z } from 'zod';
import { publicProcedure, router } from '~/server/trpc/trpc';

export const userRouter = router({
  create: publicProcedure
    .input(
      z.object({
        email: z.string(),
        password: z.string(),
      }),
    )
    .mutation(async ({ input, ctx }) => {
      const { email, password } = input;
      const hashedPassword = await hashPassword(password);
      const user = await ctx.models.user.registerUser(email, hashedPassword);
      return user;
    }),
});
