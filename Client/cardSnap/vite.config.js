import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from "@tailwindcss/vite";
import basicSsl from '@vitejs/plugin-basic-ssl'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(),tailwindcss(),basicSsl()],
  server: {
    host: true, 
    https: true,
    port: 5173,
    proxy: {
      '/data': { target: 'http://localhost:5245', changeOrigin: true },
    }
  }
})
