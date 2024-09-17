// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: {
    enabled: true,
  },
  eslint: {
    config: {
      stylistic: {
        // Improves readability on multi line nested functions such as TRPC
        semi: true,
      },
    },
  },
});
