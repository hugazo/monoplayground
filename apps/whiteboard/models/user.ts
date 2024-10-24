import prismaClient from '@monoplayground/db';
import { z } from 'zod';

export interface User {
  id: string;
  email: string;
  password_hash?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export const userForm = z.object({
  email: z.string(),
  password: z.string(),
});

export const registerUser = async (email: string, password: string) => {
  const user = await prismaClient.user.create({
    data: {
      email,
      password_hash: password,
    },
    omit: {
      password_hash: true,
    },
  });
  return user as User;
};
