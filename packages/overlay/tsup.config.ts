import { defineConfig } from 'tsup';

export default defineConfig({
  entry: {
    index: 'src/index.ts',
    'modal/index': 'src/modal/index.ts',
    'toast/index': 'src/toast/index.ts',
    'tooltip/index': 'src/tooltip/index.ts',
  },
  format: ['cjs', 'esm'],
  dts: true,
  splitting: false,
  sourcemap: true,
  clean: true,
  external: [
    'react',
    'react-dom',
    '@tahoe-ui/core',
    '@tahoe-ui/hooks',
    '@tahoe-ui/typography',
  ],
  treeshake: true,
});
