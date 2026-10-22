import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://lncautogroup.com',
  build: { assets: 'assets' },
  integrations: [sitemap()],
  vite: { plugins: [tailwindcss()] },
});
