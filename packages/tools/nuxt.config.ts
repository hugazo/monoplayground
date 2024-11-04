export default defineNuxtConfig({
  devtools: {
    enabled: true,
  },
  modules: ['@vueuse/nuxt', '@nuxt/fonts', '@nuxt/eslint'],
  eslint: {
    config: {
      stylistic: {
        semi: true,
      },
    },
  },
  compatibilityDate: '2024-10-02',
})