import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  define: {
    __SITE_LAUNCHED__: JSON.stringify(process.env.SITE_LAUNCHED ?? ''),
    __LAUNCH_DATE__: JSON.stringify(process.env.LAUNCH_DATE ?? ''),
    __PREVIEW_SECRET__: JSON.stringify(process.env.PREVIEW_SECRET ?? ''),
    __IS_PROD_BUILD__: JSON.stringify(process.env.VERCEL_ENV === 'production'),
  },
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        changeOrigin: true,
      },
    },
  },
})
