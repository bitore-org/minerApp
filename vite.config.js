import { defineConfig } from "vite";

import sass from "sass";

export default defineConfig({
  plugins: [],
  build: {
    minify: false,
    outDir: "./docs",
  },
  worker: {
    format: "es",
  },
  css: {
    preprocessorOptions: {
      scss: {
        implementation: sass,
      },
    },
  },
});
