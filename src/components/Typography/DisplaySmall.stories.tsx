// src/components/Typography/DisplaySmall.stories.tsx

import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import DisplaySmall, { DisplaySmallProps } from './DisplaySmall';
import { AppProvider } from '@/providers/app';

const meta: Meta<typeof DisplaySmall> = {
  title: 'Typography/DisplaySmall',
  component: DisplaySmall,
  decorators: [
    (Story) => (
      <AppProvider>
        {/* Container with padding and max width for better visualization */}
        <div className="p-4 space-y-6 max-w-xl border border-gray-200 rounded-lg">
          <Story />
        </div>
      </AppProvider>
    ),
  ],
  args: {
    children: 'Sample DisplaySmall Content',
    align: 'left',
    color: 'primary',
    margin: 'my-4',
  },
  argTypes: {
    children: {
      control: 'text',
      description: 'Content to display within the DisplaySmall component.',
      table: {
        type: { summary: 'React.ReactNode' },
        defaultValue: { summary: 'Sample DisplaySmall Content' },
      },
    },
    align: {
      control: 'select',
      options: ['left', 'center', 'right', 'justify'],
      description: 'Text alignment.',
      table: {
        type: { summary: `'left' | 'center' | 'right' | 'justify'` },
        defaultValue: { summary: `'left'` },
      },
    },
    color: {
      control: 'text',
      description:
        'Text color. Can be one of the predefined options ("primary", "secondary", "accent") or any valid CSS color string.',
      table: {
        type: { summary: `'primary' | 'secondary' | 'accent' | string` },
        defaultValue: { summary: `'primary'` },
      },
    },
    margin: {
      control: 'text',
      description: 'Margin classes for the component. Default is "my-4".',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: '"my-4"' },
      },
    },
  },
};

export default meta;
type Story = StoryObj<DisplaySmallProps>;

/**
 * Default DisplaySmall story demonstrating basic usage.
 */
export const Default: Story = {
  args: {
    children: 'This is a DisplaySmall component with default properties.',
  },
};

/**
 * Center Aligned DisplaySmall
 */
export const CenterAligned: Story = {
  args: {
    align: 'center',
    children: 'This DisplaySmall is center-aligned.',
  },
};

/**
 * Right Aligned DisplaySmall
 */
export const RightAligned: Story = {
  args: {
    align: 'right',
    children: 'This DisplaySmall is right-aligned.',
  },
};

/**
 * Secondary Color DisplaySmall
 */
export const SecondaryColor: Story = {
  args: {
    color: 'secondary',
    children: 'This DisplaySmall has a secondary color.',
  },
};

/**
 * Custom Color DisplaySmall
 */
export const CustomColor: Story = {
  args: {
    color: '#FF5733',
    children: 'This DisplaySmall has a custom color (#FF5733).',
  },
};

/**
 * Small Margin DisplaySmall
 */
export const SmallMargin: Story = {
  args: {
    margin: 'my-2',
    children: 'This DisplaySmall has a smaller vertical margin (my-2).',
  },
};

/**
 * Combined Props Example
 */
export const CombinedProps: Story = {
  args: {
    align: 'justify',
    color: '#2E86C1',
    margin: 'my-6',
    children:
      'This DisplaySmall combines multiple properties: justified alignment, custom color, and medium margin.',
  },
};
