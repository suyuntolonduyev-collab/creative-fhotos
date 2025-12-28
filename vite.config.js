import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";
import { resolve } from "path";

export default defineConfig({
  base: "/creative-fhotos/", 
  plugins: [tailwindcss()],
  build: {
    outDir: "docs",
    emptyOutDir: true, 
    rollupOptions: {
      input: {
        main: resolve(__dirname, "index.html"),
        exemples: resolve(__dirname, "exemples.html"),
        vacansii: resolve(__dirname, "vacansii.html"),
      },
    },
  },
});
