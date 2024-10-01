import { fileURLToPath } from 'url';
import { dirname, join } from 'node:path';

const currentDir = dirname(fileURLToPath(import.meta.url));

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: {
    enabled: true,
  },

  modules: [
    '@nuxt/eslint',
    '@nuxtjs/tailwindcss',
    'shadcn-nuxt',
    '@vueuse/nuxt',
  ],
  hooks: {
    'components:dirs': (dirs) => {
      dirs.unshift({
        path: join(currentDir, './components'),
        extensions: ['.vue'],
      });
    },
  },
  eslint: {
    config: {
      stylistic: {
        // Improves readability on multi line nested functions such as TRPC
        semi: true,
      },
    },
  },
  shadcn: {
    prefix: '',
    componentDir: './components',
  },
  tailwindcss: {
    cssPath: './assets/css/tailwind.css',
  },
  compatibilityDate: '2024-10-01',
});