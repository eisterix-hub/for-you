import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// base: './' makes every asset URL relative to index.html, so the same build
// works at https://USERNAME.github.io/REPOSITORY/ and at a root domain
// (https://USERNAME.github.io/) with no changes.
export default defineConfig({
  base: './',
  plugins: [react(), tailwindcss()],
})
