import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'node:path';
import { copyFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

const rootDir = path.dirname(fileURLToPath(import.meta.url));
const srcDir = path.resolve(rootDir, 'src');

/**
 * Copies the built index.html to 404.html so GitHub Pages serves the SPA for
 * unknown paths (deep links under the project base).
 */
function githubPagesSpaFallback() {
  return {
    name: 'github-pages-spa-fallback',
    closeBundle() {
      const outDir = path.resolve(rootDir, 'dist');
      copyFileSync(
        path.join(outDir, 'index.html'),
        path.join(outDir, '404.html'),
      );
    },
  };
}

export default defineConfig({
  plugins: [react(), githubPagesSpaFallback()],
  base: '/dii-operator/',
  build: {
    outDir: 'dist',
  },
  resolve: {
    alias: {
      '@': srcDir,
    },
  },
});
