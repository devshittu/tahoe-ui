import { defineConfig } from 'tsup';

export default defineConfig({
  entry: {
    index: 'src/index.ts',
    'core/index': 'src/core/index.ts',
    'display/index': 'src/display/index.ts',
    'semantic/index': 'src/semantic/index.ts',
    'code/index': 'src/code/index.ts',
    'ui/index': 'src/ui/index.ts',
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
