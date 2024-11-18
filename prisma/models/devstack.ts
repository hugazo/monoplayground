import prismaClient from '../index';
import type { Prisma } from '../index';

export interface DevStack {
  id: string;
  title: string;
  description: string;
  files: Prisma.JsonValue;
  createdAt?: Date;
  updatedAt?: Date;
};

export type DevStackList = Omit<DevStack, 'files'>[];

export const newDevStack = async (title: string, description?: string) => {
  const newStack = await prismaClient.devStack.create({
    data: {
      title,
      description,
    },
  });
  return newStack;
};

export const updateDevStackInfo = async (
  id: string,
  title?: string,
  description?: string
): Promise<DevStack> => {
  const updatedStack = await prismaClient.devStack.update({
    where: {
      id,
    },
    data: {
      title,
      description,
    },
  });
  return updatedStack;
};

export const updateDevStackFiles = async (
  id: string,
  files: NonNullable<Prisma.JsonValue>
): Promise<DevStack> => {
  const updatedStack = await prismaClient.devStack.update({
    where: {
      id,
    },
    data: {
      files,
    }
  })
  return updatedStack;
};

export const loadAllDevStacks = async (): Promise<DevStackList> => {
  const stacks = await prismaClient.devStack.findMany({
    omit: {
      'files': true,
    },
  });
  if (stacks) {
    return stacks;
  }
  return [];
};

export const loadDevStack = async (id?: string): Promise<DevStack> => {
  const stack = await prismaClient.devStack.findFirstOrThrow({
    where: {
      id,
    },
  });

  return stack;
};
