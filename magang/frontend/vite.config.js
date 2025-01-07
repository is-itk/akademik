// magang/frontend/vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: '/akademik/magang/',  // Menentukan base path untuk subdirektori
});
