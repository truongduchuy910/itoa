import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  base: 'homepage/static',
  plugins: [react()],
  build: {
    outDir: 'static',
  },
});
