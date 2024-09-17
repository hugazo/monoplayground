export default defineAppConfig({
  eslint: {
    config: {
      stylistic: {
        // Improves readability on multi line nested functions such as TRPC
        semi: true,
      },
    },
  },
});

declare module '@nuxt/schema' {
  interface AppConfigInput {
    myLayer?: {
      /** Project name */
      name?: string;
    };
  }
}
