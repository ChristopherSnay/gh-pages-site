import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import { viteStaticCopy } from 'vite-plugin-static-copy';

// https://vite.dev/config/
export default defineConfig(({ mode }) => ({
  plugins: [
    react(),
    viteStaticCopy({
      targets: [
        {
          src: '.nojekyll',
          dest: '.',
        },
        {
          src: '404.html',
          dest: '.',
        },
      ],
    }),
  ],
  base: mode === 'development' ? '/' : '/gh-pages-site',
}));
