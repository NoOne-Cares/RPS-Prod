import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import dotenv from 'dotenv';


dotenv.config();

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
  base: '/',
  // server: {
  //   proxy: {
  //     '/api': {
  //       target: process.env.VITE_BACKEN_URL ?? "http://localhost:8000",
  //       changeOrigin: true,
  //     },
  //     '/socket.io': {
  //       target: process.env.VITE_BACKEN_URL ?? "http://localhost:8000",
  //       ws: true,
  //       changeOrigin: true
  //     }
  //   },
  // },
})
