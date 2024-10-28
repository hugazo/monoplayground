import { router, signedOutProcedure } from '~/server/trpc/trpc';
import { userForm } from '~/models/user';

export const userRouter = router({
  create: signedOutProcedure
    .input(userForm)
    .mutation(async ({ input, ctx }) => {
      const { email, password } = input;
      const hashedPassword = await hashPassword(password);
      const user = await ctx.models.user.registerUser(email, hashedPassword);
      return user;
    }),
});
