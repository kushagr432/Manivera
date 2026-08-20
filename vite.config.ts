import react from '@vitejs/plugin-react'
import { defineConfig, loadEnv } from 'vite'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  // Only VITE_-prefixed vars are exposed to client code; loadEnv with an empty
  // prefix lets this config read any of them, including server-side ones.
  const env = loadEnv(mode, process.cwd(), '')

  // Extra hostnames the dev server should accept, e.g. an ngrok tunnel.
  // Dev-server only — this has no effect on a production build.
  const extraHosts = (env.VITE_DEV_ALLOWED_HOSTS || '')
    .split(',')
    .map((host) => host.trim())
    .filter(Boolean)

  return {
    plugins: [react()],
    server: {
      allowedHosts: ['localhost', '127.0.0.1', ...extraHosts]
    }
  }
})
