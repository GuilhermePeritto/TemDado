import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import webExtension from "vite-plugin-web-extension";
import path from "path";

export default defineConfig({
  root: "src",
  build: {
    outDir: path.resolve(__dirname, "dist"),
    emptyOutDir: true,
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  plugins: [
    react(),
    webExtension({
      manifest: "manifest.json",
      additionalInputs: ["index.html"],
      disableAutoLaunch: true,
    }),
  ],
});
