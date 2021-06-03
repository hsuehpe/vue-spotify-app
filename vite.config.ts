import path from 'path'
import { defineConfig } from 'vite'
import PurgeIcons from 'vite-plugin-purge-icons'
import Markdown from 'vite-plugin-md'
import { VitePWA } from 'vite-plugin-pwa'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  resolve: {
    alias: {
      '/~': path.resolve(__dirname, 'src'),
    },
  },
  plugins: [
    vue(),
    // https://github.com/antfu/vite-plugin-md
    Markdown(),

    // https://github.com/antfu/purge-icons
    PurgeIcons(),

    // https://github.com/antfu/vite-plugin-pwa
    VitePWA({
      manifest: {
        name: 'Vitesse',
        short_name: 'Vitesse',
        icons: [
          {
            src: '/pwa-192x192.png',
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: '/pwa-512x512.png',
            sizes: '512x512',
            type: 'image/png',
          },
        ],
      },
    }),
  ],
})
