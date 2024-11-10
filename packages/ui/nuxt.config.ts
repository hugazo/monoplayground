import { createResolver } from 'nuxt/kit';

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: {
    enabled: true,
  },
  extends: [
    '@monoplayground/tools',
  ],
  modules: ['@nuxtjs/tailwindcss', 'shadcn-nuxt'],
  hooks: {
    'components:dirs': (dirs) => {
      const { resolve } = createResolver(import.meta.url);
      dirs.unshift({
        path: resolve('./components'),
        extensions: ['.vue'],
      });
    },
  },
  shadcn: {
    prefix: '',
    componentDir: './components/ui',
  },
  tailwindcss: {
    cssPath: './assets/css/tailwind.css',
  },
  compatibilityDate: '2024-10-01',
});
