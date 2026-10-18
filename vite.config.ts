import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Vite configuration for ohin.me static deployment
export default defineConfig({
  plugins: [react()],
  base: '/',
});
