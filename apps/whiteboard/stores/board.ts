// Data for the boards
import type { AppState, BinaryFiles } from '@excalidraw/excalidraw/types/types';
import type { ExcalidrawElement } from '@excalidraw/excalidraw/types/element/types';
import type { Board } from '~/models/board';

interface BoardInitialData {
  elements?: ExcalidrawElement[];
  appState?: AppState;
  files?: BinaryFiles;
}

export interface BoardResponse extends Omit<Board, 'data' | 'files'> {
  data: ExcalidrawElement[];
  files: BinaryFiles;
}

export default defineStore('board', () => {
  // App helpers
  const { $client } = useNuxtApp();
  const theme = useColorMode();
  // Loading status for the board
  const loading = ref(false);

  const boardId = ref<string | null>(null);

  // Auto save status
  const autoSave = ref(false);

  const boardData = ref<BoardResponse | null>(null);
  const initialBoardData = ref<BoardInitialData>({ elements: [], files: {} });

  const getBoardData = async (id: string) => {
    loading.value = true;
    boardId.value = id;
    const queryResult = await $client.board.getBoard.query({ id });
    boardData.value = queryResult as unknown as BoardResponse;
    // Fills the initial board data if there are elements or files
    if (boardData.value.data || boardData.value.files) {
      initialBoardData.value = {
        elements: queryResult.data as unknown as ExcalidrawElement[],
        files: queryResult.files as BinaryFiles,
      };
    }
    loading.value = false;
    return boardData;
  };

  // Gets the theme from the color mode
  const getTheme = computed(() => {
    return theme.value === 'dark' ? 'dark' : 'light';
  });

  const waitTime = 1000;
  const maxWait = 3000;

  // Updates the board data on the server
  const updateBoard = async () => {
    loading.value = true;
    const data = boardData.value as BoardResponse;
    $client.board.updateBoard.mutate({
      id: boardId.value as string,
      data: data.data,
      files: data.files,
    });
    loading.value = false;
  };

  // Debounced save function handler
  const updateBoardDebounced = useDebounceFn(updateBoard, waitTime, { maxWait });

  // Will update the store data and call the update board function if autosave is enabled
  const handleBoardUpdate = async (
    elements: readonly ExcalidrawElement[],
    _state: AppState,
    files: BinaryFiles,
  ) => {
    const data = elements as ExcalidrawElement[];
    boardData.value = {
      ...boardData.value as BoardResponse,
      data,
      files,
    };
    if (autoSave.value) {
      updateBoardDebounced();
    };
  };

  return {
    boardId,
    loading,
    getTheme,
    autoSave,
    boardData,
    initialBoardData,
    getBoardData,
    handleBoardUpdate,
    updateBoard,
    updateBoardDebounced,
  };
});
