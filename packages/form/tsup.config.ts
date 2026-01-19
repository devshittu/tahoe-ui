import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/index.ts'],
  format: ['esm', 'cjs'],
  dts: true,
  clean: true,
  sourcemap: true,
  treeshake: true,
  splitting: false,
  external: [
    'react',
    'react-dom',
    'framer-motion',
    '@headlessui/react',
    '@tahoe-ui/core',
  ],
  banner: {
    js: '"use client";',
  },
});
