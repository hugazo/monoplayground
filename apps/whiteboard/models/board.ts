import prismaClient from '@monoplayground/db';
import type { Prisma } from '@monoplayground/db';

// Note: These are the functions that are going to be called inside the TRPC context
// Export the default interface to use as reference in the TRPC Server Side
export interface Board {
  id: string;
  title: string;
  data?: Prisma.JsonValue;
  files?: Prisma.JsonValue;
  createdAt?: Date;
  updatedAt?: Date;
}

type BoardId = Pick<Board, 'id'>;

export const newBoard = async (title: string): Promise<Board> => {
  const board = await prismaClient.board.create({
    data: {
      title,
    },
  });
  return board;
};

export const deleteBoard = async (id: string): Promise<BoardId> => {
  const result = await prismaClient.board.delete({
    where: {
      id,
    },
  });
  return {
    id: result.id,
  };
};

export const getBoards = async (): Promise<Board[]> => {
  const boards = await prismaClient.board.findMany({
    select: {
      id: true,
      title: true,
    },
  });
  return boards;
};

export const updateBoard = async (
  id: string,
  data: Prisma.JsonArray,
  files: Prisma.JsonObject,
): Promise<Board> => {
  const board = await prismaClient.board.update({
    where: {
      id,
    },
    data: {
      data,
      files,
    },
  });
  return board;
};

export const getBoard = async (id: string): Promise<Board | null> => {
  const board = await prismaClient.board.findUnique({
    where: {
      id,
    },
  });
  return board;
};
