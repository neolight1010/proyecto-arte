import { defineConfig } from "vite";
import { resolve } from "path";

export default defineConfig({
  base: "/proyecto-arte/",
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, "index.html"),
        perform: resolve(__dirname, "perform.html"),
        gallery: resolve(__dirname, "gallery.html"),
      },
    },
  },
});
