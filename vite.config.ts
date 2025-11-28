import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0',
    port: 8080,
    strictPort: true,
    allowedHosts: ['.loca.lt', '.ngrok.io', '.ngrok-free.app', '.ngrok-free.dev', '.trycloudflare.com', 'localhost']
  },
  build: {
    outDir: 'dist',
    sourcemap: true
  }
})
