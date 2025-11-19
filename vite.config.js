import { defineConfig } from 'vite';

export default defineConfig({
  root: 'public',
  build: {
    outDir: '../dist',
    emptyOutDir: true,
    rollupOptions: {
      input: {
        main: 'public/index.html',
        login: 'public/login.html',
        doctor: 'public/doctor.html',
        staff: 'public/staff.html',
        superadmin: 'public/superadmin.html'
      }
    }
  },
  server: {
    port: 5173
  }
});
