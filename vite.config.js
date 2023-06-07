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
          globPatterns: ['**/*.{js,css,html,ico,png,svg}']
        },
        injectRegister: 'script',
        devOptions: {
          enabled: true
          /* other options */
        },
        manifest: {
          icons: [
            {
              src: "src/assets/logo.png",
              sizes: "150x150",
              type: "image/png",
              purpose: "any maskable"
            },
            {
              src: "src/assets/logo_512.png",
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