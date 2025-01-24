import type { StorybookConfig } from '@storybook/nextjs';

const isProduction = process.env.NODE_ENV === 'production';

const config: StorybookConfig = {
  stories: ['../src/**/*.mdx', '../src/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
  addons: [
    '@storybook/addon-onboarding',
    '@storybook/addon-essentials',
    '@chromatic-com/storybook',
    '@storybook/addon-interactions',
  ],
  framework: {
    name: '@storybook/nextjs',
    options: {},
  },
  staticDirs: ['../public'],
  managerHead: (head) =>
    isProduction
      ? `
          <base href="/storybook/">
          ${head}
        `
      : head,
  previewHead: (head) =>
    isProduction
      ? `
          <base href="/storybook/">
          ${head}
        `
      : head,
};
export default config;

// Path: .storybook/main.ts
