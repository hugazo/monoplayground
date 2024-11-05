import { createResolver } from 'nuxt/kit';

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: {
    enabled: true,
  },
  extends: [
    '@monoplayground/tools',
  ],
  modules: [
    '@nuxtjs/tailwindcss',
    'shadcn-nuxt',
    '@nuxtjs/storybook',
  ],
  hooks: {
    'components:dirs': (dirs) => {
      const { resolve } = createResolver(import.meta.url);
      dirs.unshift({
        path: resolve('./components'),
        extensions: ['.vue'],
      });
    },
  },
  storybook: {
    // Disabled because packages that import the UI folder won't run storybook on dev
    enabled: false,
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
