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
          dest: '.'
        }
      ]
    })
  ],
  base: mode === 'development' ? '/' : '/gh-pages-site/',
  server: {
    proxy: {
      '/api': 'http://localhost:3001'
    }
  }
}));
