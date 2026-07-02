import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  root: 'public', //  Tells Vite to look inside the public folder for index.html
  build: {
    outDir: '../dist', // Tells Vite to output the final build files in the correct place for Vercel
    emptyOutDir: true,
  },
  server: {
    port: 3000,
  },
});
