import type { StorybookConfig } from '@storybook/nextjs';

const isProduction = process.env.NODE_ENV === 'production' || 'staging';
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
  // managerHead: (head) => `
  //   <base href="/storybook/">
  //   ${head}
  // `,
  // previewHead: (head) => `
  //   <base href="/storybook/">
  //   ${head}
  // `,

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
// .storybook/main.ts
