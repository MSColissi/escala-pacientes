import { defineConfig } from 'vite'
import { fileURLToPath, URL } from 'node:url'

import { VitePWA } from "vite-plugin-pwa";

import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  base: "/escala-pacientes/",
  plugins: [
    react(), 
    tailwindcss(), 
    VitePWA({
      registerType: "autoUpdate",
      injectRegister: "auto",
      base: "/escala-pacientes/",
      manifest: {
        name: "Escala Pacientes",
        short_name: "Escala",
        start_url: "/escala-pacientes/",
        scope: "/escala-pacientes/",
        display: "standalone",
        theme_color: "#ffffff",
        background_color: "#ffffff",
        icons: [
          {
            src: "ufsm-192.png",
            sizes: "192x192",
            type: "image/png"
          },
          {
            src: "ufsm-512.png",
            sizes: "512x512",
            type: "image/png"
          }
        ]
      }
    })
  ],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  }
})
