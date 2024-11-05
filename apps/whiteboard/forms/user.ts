import { z } from 'zod';

export const userForm = z.object({
  email: z.string(),
  password: z.string(),
});
