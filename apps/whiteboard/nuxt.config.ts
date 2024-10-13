// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  extends: [
    '@monoplayground/ui',
  ],
  devtools: { enabled: true },
  build: {
    transpile: ['trpc-nuxt'],
  },
  compatibilityDate: '2024-09-24',
});
