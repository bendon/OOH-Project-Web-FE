import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    chunkSizeWarningLimit: 5000, // Increase limit (in kB)
  },
  server: {
    proxy: {
      '/api': {
        target: 'https://scout.edgetech.co.ke',
        changeOrigin: true,
        secure: false,
        // rewrite: (path) => path.replace(/^\/api/, '/api/v1'),
      },
    },
  }
})
