import prismaClient from '@monoplayground/db';
import type { Prisma } from '@monoplayground/db';

// Note: These are the functions that are going to be called inside the TRPC context
// Export the default interface to use as reference in the TRPC Server Side
export interface Board {
  id: string;
  title: string;
  data?: Prisma.JsonArray;
  files?: Prisma.JsonObject;
  createdAt?: Date;
  updatedAt?: Date;
}

export const newBoard = async (title: string) => {
  const board = await prismaClient.board.create({
    data: {
      title,
    },
  });
  return board as Board;
};

export const deleteBoard = async (id: string) => {
  const result = await prismaClient.board.delete({
    where: {
      id,
    },
  });
  return {
    id: result.id,
  };
};

export const getBoards = async () => {
  const boards = await prismaClient.board.findMany({
    select: {
      id: true,
      title: true,
    },
  });
  return boards as Board[];
};

export const updateBoard = async (
  id: string,
  data: Prisma.JsonArray,
  files: Prisma.JsonObject,
) => {
  const board = await prismaClient.board.update({
    where: {
      id,
    },
    data: {
      data,
      files,
    },
  });
  return board as Board;
};

export const getBoard = async (id: string) => {
  const board = await prismaClient.board.findUnique({
    where: {
      id,
    },
  });
  return board as Board;
};
