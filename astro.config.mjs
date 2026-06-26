// @ts-check
import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
  site: 'https://cloudframe.example',
  server: {
    port: 4321,
    host: true,
  },
  vite: {
    server: {
      // Große Videos via Range-Requests ausliefern
      fs: {
        allow: ['..'],
      },
    },
  },
});
