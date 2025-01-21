import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
// target: 'http://localhost:3000',
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'http://34.81.87.27:3000',
        changeOrigin: true,
        configure: (proxy, options) => {
        }
      },
    },
  },
})