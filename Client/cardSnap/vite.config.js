import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from "@tailwindcss/vite";


// https://vite.dev/config/
export default defineConfig({
  plugins: [react(),
    tailwindcss()],
  server: {
      host: true,  // or '0.0.0.0'
    port: 5173,
  },
  proxy: {
      '/data': { target: 'http://localhost:5173', changeOrigin: true },
  }
})
