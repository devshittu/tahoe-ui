// src/components/Typography/DisplayLarge.stories.tsx

import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import DisplayLarge, { DisplayLargeProps } from './DisplayLarge';
import { AppProvider } from '@/providers/app';

const meta: Meta<typeof DisplayLarge> = {
  title: 'Typography/DisplayLarge',
  component: DisplayLarge,
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
    children: 'Sample DisplayLarge Content',
    align: 'center',
    color: 'primary',
    margin: 'my-8',
  },
  argTypes: {
    children: {
      control: 'text',
      description: 'Content to display within the DisplayLarge component.',
      table: {
        type: { summary: 'React.ReactNode' },
        defaultValue: { summary: 'Sample DisplayLarge Content' },
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
      description: 'Margin classes for the component. Default is "my-8".',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: '"my-8"' },
      },
    },
  },
};

export default meta;
type Story = StoryObj<DisplayLargeProps>;

/**
 * Default DisplayLarge story demonstrating basic usage.
 */
export const Default: Story = {
  args: {
    children: 'This is a DisplayLarge component with default properties.',
  },
};

/**
 * Left Aligned DisplayLarge
 */
export const LeftAligned: Story = {
  args: {
    align: 'left',
    children: 'This DisplayLarge is left-aligned.',
  },
};

/**
 * Right Aligned DisplayLarge
 */
export const RightAligned: Story = {
  args: {
    align: 'right',
    children: 'This DisplayLarge is right-aligned.',
  },
};

/**
 * Secondary Color DisplayLarge
 */
export const SecondaryColor: Story = {
  args: {
    color: 'secondary',
    children: 'This DisplayLarge has a secondary color.',
  },
};

/**
 * Custom Color DisplayLarge
 */
export const CustomColor: Story = {
  args: {
    color: '#FF5733',
    children: 'This DisplayLarge has a custom color (#FF5733).',
  },
};

/**
 * Large Margin DisplayLarge
 */
export const LargeMargin: Story = {
  args: {
    margin: 'my-12',
    children: 'This DisplayLarge has a larger vertical margin (my-12).',
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
      'This DisplayLarge combines multiple properties: justified alignment, custom color, and larger margin.',
  },
};
