// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  extends: [
    '@monoplayground/ui',
    '@monoplayground/excalidraw-nuxt',
  ],

  devtools: { enabled: true },

  build: {
    transpile: ['trpc-nuxt'],
  },
  storybook: {
    enabled: false,
  },

  compatibilityDate: '2024-09-24',
  modules: ['@pinia/nuxt', 'nuxt-auth-utils'],
});
