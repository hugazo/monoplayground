import { router, signedInProcedure, signedOutProcedure } from '~/server/trpc/trpc';
import { userForm } from '~/forms/user';

// Session router, this handles sessions
export const sessionRouter = router({
  login: signedOutProcedure
    .input(userForm)
    .mutation(async ({ input, ctx }) => {
      // We get the email from the input
      const { email, password } = input;
      // We get the user from the database
      const user = await ctx.models.user.getUserByEmail(email);
      // If the user does not exist, we throw an error
      if (!user?.password_hash) {
        throw new Error('Cannot login with the provided credentials');
      }
      // We verify the password
      const result = await verifyPassword(user.password_hash, password);
      // If the password is correct, we set the session
      if (result) {
        const userData = {
          id: user.id,
          email: user.email,
        };
        await setUserSession(ctx.event, {
          user: userData,
        });
        return userData;
      }
      // If the password is incorrect, we throw an error
      throw new Error('Cannot login with the provided credentials');
    }),
  logout: signedInProcedure
    .mutation(async ({ ctx }) => {
      // Clears the session with the provided H3 context
      await clearUserSession(ctx.event);
    }),
});
