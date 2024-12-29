import type { Preview } from '@storybook/react';

import '../src/app/globals.css'; // Adjust the path as needed

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
};

export default preview;

// .storybook/preview.ts
