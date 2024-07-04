import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  base: "/bun-BallVision",
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'http://192.168.168.143',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
        configure: (proxy, options) => {
        }
      },
    },
  },
})