// @ts-check
import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
  site: 'https://cloudframe.example',
  // Keep Astro 5/6 whitespace behavior after the Astro 7 upgrade.
  compressHTML: true,
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
