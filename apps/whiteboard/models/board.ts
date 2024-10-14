import prismaClient from '@monoplayground/db';

import type { BinaryFiles } from '@excalidraw/excalidraw/types/types';
import type { ExcalidrawElement } from '@excalidraw/excalidraw/types/element/types';

export const newBoard = async (title: string) => {
  const board = await prismaClient.board.create({
    data: {
      title,
    },
  });
  return board;
};

export const deleteBoard = async (id: string) => {
  await prismaClient.board.delete({
    where: {
      id,
    },
  });
};

export const getBoards = async () => {
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
  data: ExcalidrawElement[],
  files: BinaryFiles,
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
  return board;
};

export const getBoard = async (id: string) => {
  const board = await prismaClient.board.findUnique({
    where: {
      id,
    },
  });
  return board;
};
