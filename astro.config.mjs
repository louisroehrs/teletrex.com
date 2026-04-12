// @ts-check
import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
  site: 'https://teletrex.com',
  vite: {
    server: {
      watch: {
        ignored: ['**/#*.*#', '**/node-modules/**','**/temp-folder/**'], //
      },
    },
  },
})
