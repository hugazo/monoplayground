<template>
  <div>
    <h1>Boards Index</h1>
    <div class="w-full flex items-center">
      <UiCard
        v-for="board in boards"
        :key="board.id"
        class="m-0 md:m-4 w-full md:w-72"
      >
        <UiCardHeader class="p-4">
          <UiCardTitle>
            {{ board.title }}
          </UiCardTitle>
        </UiCardHeader>
        <UiCardFooter class="flex justify-between px-6 pb-6">
          <UiButton
            class="w-24"
            :loading="loading"
            @click="router.push(`/boards/${board.id}`)"
          >
            Edit
          </UiButton>
          <UiButton
            class="w-24"
            :loading="loading"
            @click="deleteBoard(board.id)"
          >
            Delete
          </UiButton>
        </UiCardFooter>
      </UiCard>
    </div>
  </div>
</template>

<script setup lang="ts">
const { $client } = useNuxtApp();
const loading = ref(false);
const router = useRouter();

const boards = ref(await $client.board.getAllBoards.query());

const deleteBoard = async (id: string) => {
  try {
    loading.value = true;
    await $client.board.deleteBoard.mutate({ id });
    boards.value = boards.value.filter(board => board.id !== id);
  }
  finally {
    loading.value = false;
  }
};
</script>
