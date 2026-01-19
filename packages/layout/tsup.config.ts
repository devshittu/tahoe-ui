import { defineConfig } from 'tsup';

export default defineConfig({
  entry: {
    index: 'src/index.ts',
    'box/index': 'src/box/index.ts',
    'container/index': 'src/container/index.ts',
  },
  format: ['esm', 'cjs'],
  dts: true,
  clean: true,
  sourcemap: true,
  treeshake: true,
  splitting: false,
  external: ['react', 'react-dom', '@tahoe-ui/core'],
  banner: {
    js: '"use client";',
  },
});
