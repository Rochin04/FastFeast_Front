import { VitePWA } from 'vite-plugin-pwa';
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// ...existing code...
export default defineConfig({
  server: {
    proxy: {
      "/api": {
        target: "http://localhost:5173", // cambia al puerto/URL de tu backend
        changeOrigin: true,
        secure: false,
      },
    },
  },
  plugins: [react(), VitePWA({
    registerType: 'prompt',
    injectRegister: false,

    pwaAssets: {
      disabled: false,
      config: true,
    },

    manifest: {
      name: 'FastFeast',
      short_name: 'FF',
      description: 'DeliveryAPP',
      theme_color: '#000000',
    },

    workbox: {
      globPatterns: ['**/*.{js,css,html,svg,png,ico}'],
      cleanupOutdatedCaches: true,
      clientsClaim: true,
    },

    devOptions: {
      enabled: true,
      navigateFallback: 'index.html',
      suppressWarnings: true,
      type: 'module',
    },
    
  })],
})