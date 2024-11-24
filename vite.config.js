import { defineConfig } from 'vite'
import { svelte } from '@sveltejs/vite-plugin-svelte'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [svelte()],
  optimizeDeps: {
    exclude: ["svelte-navigator", "svelte-forms-lib"]
  },
  server: {
    port: process.env.PORT || 8080,
  }
})
