import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';
import { defineConfig } from 'vite';

const __dirname = dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  root: '.',
  base: '/',
  build: {
    outDir: 'build',
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        'project-everyman': resolve(__dirname, 'project-everyman.html'),
        'project-inlaws': resolve(__dirname, 'project-inlaws.html'),
        'project-yours-twice': resolve(__dirname, 'project-yours-twice.html'),
      },
    },
  },
});
