import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  base: "/creative-fhotos/",
  plugins: [tailwindcss()],
  build: {
    outDir: "docs",
  },
});
