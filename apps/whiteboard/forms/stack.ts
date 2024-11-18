import z from 'zod';

export const newStackForm = z.object({
  name: z.string(),
  description: z.string().optional(),
});

export const getStackDataForm = z.object({
  id: z.string(),
});
