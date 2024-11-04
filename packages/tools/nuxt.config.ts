export default defineNuxtConfig({
  devtools: {
    enabled: true,
  },
  modules: ['@vueuse/nuxt', '@nuxt/fonts', '@nuxt/eslint', 'nuxt-icons'],
  eslint: {
    config: {
      stylistic: {
        semi: true,
      },
    },
  },
  compatibilityDate: '2024-10-02',
});
