import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import dts from 'vite-plugin-dts';

export default defineConfig({
  plugins: [
    react(),
    dts({
      entryRoot: 'src',
      include: ['src'],
      exclude: ['src/demo/**', 'src/stories/**', 'src/tests/**'],
      insertTypesEntry: true,
      rollupTypes: true,
      tsconfigPath: './tsconfig.app.json',
    }),
  ],
  build: {
    lib: {
      entry: 'src/index.ts',
      name: 'ImproveDesignSystem',
      formats: ['es'],
      fileName: () => 'improve.js',
      cssFileName: 'improve',
    },
    rollupOptions: {
      external: ['react', 'react-dom', 'react/jsx-runtime', 'lucide-react', 'radix-ui'],
    },
  },
});
