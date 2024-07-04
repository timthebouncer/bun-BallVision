import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  base: "/bun-BallVision",
  plugins: [react()],
  // server: {
  //   proxy: {
  //     '/api': {
  //       target: 'https://192.168.1.108',
  //       changeOrigin: true,
  //       rewrite: (path) => path.replace(/^\/api/, ''),
  //       configure: (proxy, options) => {
  //       }
  //     },
  //   },
  // },
})