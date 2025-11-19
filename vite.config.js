import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  root: 'public',
  build: {
    outDir: '../dist',
    emptyOutDir: true,
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'public/index.html'),
        login: resolve(__dirname, 'public/login.html'),
        doctor: resolve(__dirname, 'public/doctor.html'),
        staff: resolve(__dirname, 'public/staff.html'),
        superadmin: resolve(__dirname, 'public/superadmin.html'),
        privacy: resolve(__dirname, 'public/privacy.html'),
        hipaa: resolve(__dirname, 'public/hipaa-notice.html'),
        terms: resolve(__dirname, 'public/terms.html'),
        cookies: resolve(__dirname, 'public/cookies.html')
      }
    }
  },
  server: {
    port: 5173
  }
});
