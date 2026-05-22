import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [
    tailwindcss(),
  ],
  server: {
    proxy: {
      "/api": {
        target: "https://task-manager-server-1-lei1.onrender.com",
        changeOrigin: true,
        secure: true,
      },
    },
  },
})