import { defineConfig } from 'tsup';

export default defineConfig({
  entry: {
    index: 'src/index.ts',
    'gestures/index': 'src/gestures/index.ts',
    'dom/index': 'src/dom/index.ts',
  },
  format: ['esm', 'cjs'],
  dts: true,
  clean: true,
  sourcemap: true,
  treeshake: true,
  splitting: false,
  external: ['react', 'react-dom'],
  banner: {
    js: '"use client";',
  },
});
