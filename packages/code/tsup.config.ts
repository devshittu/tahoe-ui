import { defineConfig } from 'tsup';

export default defineConfig({
  entry: {
    index: 'src/index.ts',
    'preview/index': 'src/preview/index.ts',
    'blocks/index': 'src/blocks/index.ts',
    'studio/index': 'src/studio/index.ts',
  },
  format: ['cjs', 'esm'],
  dts: true,
  sourcemap: true,
  clean: true,
  external: [
    'react',
    'react-dom',
    'framer-motion',
    'shiki',
    'tailwind-merge',
    'next-themes',
  ],
  treeshake: true,
  splitting: false,
});
