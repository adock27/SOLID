import { defineConfig } from 'vite';

export default defineConfig({
  server: {
    port: 5173,
    // Podríamos configurar un proxy aquí para evitar CORS si fuera necesario
  },
  build: {
    target: 'esnext'
  }
});
