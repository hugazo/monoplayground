import prismaClient from '@monoplayground/db';

export interface User {
  id: string;
  email: string;
  password_hash?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

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
