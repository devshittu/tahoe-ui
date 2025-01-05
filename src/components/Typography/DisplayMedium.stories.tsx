// src/components/Typography/DisplayMedium.stories.tsx

import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import DisplayMedium, { DisplayMediumProps } from './DisplayMedium';
import { AppProvider } from '@/providers/app';

const meta: Meta<typeof DisplayMedium> = {
  title: 'Typography/DisplayMedium',
  component: DisplayMedium,
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
    children: 'Sample DisplayMedium Content',
    align: 'center',
    color: 'primary',
    margin: 'my-6',
  },
  argTypes: {
    children: {
      control: 'text',
      description: 'Content to display within the DisplayMedium component.',
      table: {
        type: { summary: 'React.ReactNode' },
        defaultValue: { summary: 'Sample DisplayMedium Content' },
      },
    },
    align: {
      control: 'select',
      options: ['left', 'center', 'right', 'justify'],
      description: 'Text alignment.',
      table: {
        type: { summary: `'left' | 'center' | 'right' | 'justify'` },
        defaultValue: { summary: `'center'` },
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
      description: 'Margin classes for the component. Default is "my-6".',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: '"my-6"' },
      },
    },
  },
};

export default meta;
type Story = StoryObj<DisplayMediumProps>;

/**
 * Default DisplayMedium story demonstrating basic usage.
 */
export const Default: Story = {
  args: {
    children: 'This is a DisplayMedium component with default properties.',
  },
};

/**
 * Left Aligned DisplayMedium
 */
export const LeftAligned: Story = {
  args: {
    align: 'left',
    children: 'This DisplayMedium is left-aligned.',
  },
};

/**
 * Right Aligned DisplayMedium
 */
export const RightAligned: Story = {
  args: {
    align: 'right',
    children: 'This DisplayMedium is right-aligned.',
  },
};

/**
 * Secondary Color DisplayMedium
 */
export const SecondaryColor: Story = {
  args: {
    color: 'secondary',
    children: 'This DisplayMedium has a secondary color.',
  },
};

/**
 * Custom Color DisplayMedium
 */
export const CustomColor: Story = {
  args: {
    color: '#FF5733',
    children: 'This DisplayMedium has a custom color (#FF5733).',
  },
};

/**
 * Small Margin DisplayMedium
 */
export const SmallMargin: Story = {
  args: {
    margin: 'my-4',
    children: 'This DisplayMedium has a smaller vertical margin (my-4).',
  },
};

/**
 * Combined Props Example
 */
export const CombinedProps: Story = {
  args: {
    align: 'justify',
    color: '#2E86C1',
    margin: 'my-10',
    children:
      'This DisplayMedium combines multiple properties: justified alignment, custom color, and larger margin.',
  },
};
