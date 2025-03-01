import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: "0.0.0.0",
  },
  resolve: {
    alias: {
      src: "/src",
      components: "/src/components",
      hooks: "/src/hooks",
      types: "/src/types",
      reducers: "/src/reducers",
      constants: "/src/constants",
      helpers: "/src/helpers",
      api: "/src/api",
      assets: "/src/assets",
    },
  },
});
