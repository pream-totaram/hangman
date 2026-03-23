import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  test: {
    // ⬇️ This is the missing piece!
    environment: 'jsdom',
    globals: true,
    // setupFiles: './vitest.setup.ts',
  },
});
