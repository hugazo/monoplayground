import { fileURLToPath } from 'url';
import { dirname, join } from 'node:path';

const currentDir = dirname(fileURLToPath(import.meta.url));

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: {
    enabled: true,
  },
  modules: ['@nuxt/eslint',
    '@nuxtjs/tailwindcss',
    '@nuxtjs/color-mode',
    'shadcn-nuxt',
    '@vueuse/nuxt',
  ],
  alias: {
    '~': currentDir,
  },
  css: [
    join(currentDir, './assets/css/tailwind.css'),
  ],
  components: [
    {
      path: join(currentDir, './components'),
      extensions: ['.vue'],
    },
    {
      path: join(currentDir, './components/ui'),
      extensions: ['.vue'],
    },
  ],
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
    componentDir: './components/ui',
  },
  tailwindcss: {
    cssPath: './assets/css/tailwind.css',
  },
});
