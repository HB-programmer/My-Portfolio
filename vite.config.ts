import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  // Relative asset paths so the site works under a sub-path like github.io/My-Portfolio/ and at a domain root.
  base: "./",
});
