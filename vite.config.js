import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import mkcert from 'vite-plugin-mkcert'
import { VitePWA } from 'vite-plugin-pwa'

// https://vitejs.dev/config/
export default defineConfig({
  server: {https: true, port:3000 },
  plugins: [
    react(),
    VitePWA(
      {
        registerType: 'autoUpdate',
        workbox: {
          runtimeCaching: [
            {
              urlPattern: /^https:\/\/fonts\.googleapis\.com\/.*/i,
              handler: 'CacheFirst',
              options: {
                cacheName: 'google-fonts-cache',
                expiration: {
                  maxEntries: 10,
                  maxAgeSeconds: 60 * 60 * 24 * 365 // <== 365 days
                },
                cacheableResponse: {
                  statuses: [0, 200]
                }
              }
            },
            {
              urlPattern: /^https:\/\/fonts\.gstatic\.com\/.*/i,
              handler: 'CacheFirst',
              options: {
                cacheName: 'gstatic-fonts-cache',
                expiration: {
                  maxEntries: 10,
                  maxAgeSeconds: 60 * 60 * 24 * 365 // <== 365 days
                },
                cacheableResponse: {
                  statuses: [0, 200]
                },
              }
            }
          ]
        },
        injectRegister: 'script',
        devOptions: {
          enabled: true
          /* other options */
        },
        manifest: {
          icons: [
            {
              src: "https://lh3.googleusercontent.com/u/0/drive-viewer/AFGJ81oBe4w5efa7Omi3PdQR74_Q2LfSf8po9SrGE5FMstI4wIcbeBupKtYw3TMlQiMxF42p1ULGK3hxh5g6Yo7YLccrJ6wlRw=w1278-h1279",
              sizes: "150x150",
              type: "image/png",
              purpose: "any maskable"
            },
            {
              src: "https://lh3.googleusercontent.com/u/0/drive-viewer/AFGJ81prsOf8tsf9Qv5wYt8kr6ykIHohQ7x0PcREp77_JV_tt94J0-rmquTcHurlyTJL2afypcg2w_JCp4iT1KgYQraafuk4lg=w1278-h1279",
              sizes: "512x512",
              type: "image/png",
              purpose: "any maskable"
            }
          ], theme_color: "#ccc"
        }
      }),
    mkcert(),
  ],
})