import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
// "base" duhet për GitHub Pages: faqja hapet te akilndoj12.github.io/jdproperty/
// Nëse e publikon në Vercel/Netlify ose në domain-in tënd, ndryshoje në '/'
export default defineConfig({
  plugins: [react()],
  base: process.env.GITHUB_PAGES ? '/jdproperty/' : '/',
})
