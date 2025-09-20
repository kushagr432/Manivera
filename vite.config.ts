import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    allowedHosts: [
      '89fbc71897f6.ngrok-free.app',
      'localhost',
      '127.0.0.1'
    ]
  }
})
