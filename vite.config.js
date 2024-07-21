import { defineConfig } from "vite";

import sass from "sass";

export default defineConfig({
  plugins: [],
  build: {
    minify: false,
    outDir: "./dist",
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
