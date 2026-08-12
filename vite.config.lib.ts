import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import dts from 'vite-plugin-dts';

export default defineConfig({
  plugins: [react(), dts({
    entryRoot: 'src',
    include: ['src'],
    exclude: ['src/demo/**', 'src/stories/**', 'src/tests/**'],
    insertTypesEntry: true,
    rollupTypes: true,
    tsconfigPath: './tsconfig.app.json',
  })],
  build: {
    lib: {
      entry: 'src/index.ts',
      name: 'ImproveDesignSystem',
      formats: ['es', 'umd'],
      fileName: (format) => format === 'es' ? 'improve.js' : 'improve.umd.cjs',
      cssFileName: 'improve',
    },
    rollupOptions: {
      external: ['react', 'react-dom', 'react/jsx-runtime', 'lucide-react', 'radix-ui'],
      output: {
        globals: { react: 'React', 'react-dom': 'ReactDOM', 'react/jsx-runtime': 'jsxRuntime', 'lucide-react': 'LucideReact', 'radix-ui': 'RadixUI' },
      },
    },
  },
});
