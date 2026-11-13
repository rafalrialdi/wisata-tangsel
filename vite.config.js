import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Saat dev (localhost) base = '/'.
// Saat deploy ke GitHub Pages, workflow mengisi VITE_BASE=/nama-repo/
export default defineConfig({
  base: process.env.VITE_BASE || '/',
  plugins: [react()],
})
