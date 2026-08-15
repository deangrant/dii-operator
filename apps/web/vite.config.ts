import { copyFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

const rootDir = path.dirname(fileURLToPath(import.meta.url));
const srcDir = path.resolve(rootDir, "src");

/**
 * Copies the built index.html to 404.html so GitHub Pages serves the SPA for
 * unknown paths (deep links under the project base).
 */
function githubPagesSpaFallback() {
  return {
    closeBundle() {
      const outDir = path.resolve(rootDir, "dist");
      copyFileSync(
        path.join(outDir, "index.html"),
        path.join(outDir, "404.html"),
      );
    },
    name: "github-pages-spa-fallback",
  };
}

export default defineConfig({
  base: "/dii-operator/",
  build: {
    outDir: "dist",
  },
  plugins: [react(), githubPagesSpaFallback()],
  resolve: {
    alias: {
      "@": srcDir,
    },
  },
});
