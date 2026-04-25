import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    proxy: {
      '/wp-content': {
        target: 'http://localhost:8888',
        changeOrigin: true,
      },
      '/wp-json': {
        target: 'http://localhost:8888/app',
        changeOrigin: true,
      },
      '/admin-ajax.php': {
        target: 'http://localhost:8888/app/wp-admin',
        changeOrigin: true,
      }
    }
  },
  build: {
    outDir: 'dist',
    sourcemap: false,
  }
})
