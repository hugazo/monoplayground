export default defineNuxtConfig({
  devtools: {
    enabled: true,
  },
  eslint: {
    config: {
      stylistic: {
        semi: true,
      },
    },
  },
  modules: ['@nuxt/eslint'],
  compatibilityDate: '2024-10-02',
})
