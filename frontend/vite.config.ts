import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [react(), tailwindcss()],

  // Only VITE_* env vars are exposed to the browser — never expose secrets
  envPrefix: "VITE_",

  build: {
    // No source maps in production to avoid leaking source code
    sourcemap: false,
    chunkSizeWarningLimit: 500,
  },

  server: {
    // Localhost only — not exposed to the local network in dev
    host: "localhost",
    port: 5173,
  },
});
