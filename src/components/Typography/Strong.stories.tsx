// src/components/Typography/Strong.stories.tsx

import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import Strong, { StrongProps } from './Strong';
import { AppProvider } from '@/providers/app';

const meta: Meta<typeof Strong> = {
  title: 'Typography/Strong',
  component: Strong,
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
    children: 'Sample Strong Text',
    color: 'primary',
    className: '',
  },
  argTypes: {
    children: {
      control: 'text',
      description: 'Content to display within the Strong component.',
      table: {
        type: { summary: 'React.ReactNode' },
        defaultValue: { summary: 'Sample Strong Text' },
      },
    },
    color: {
      control: 'select',
      options: [
        'primary',
        'secondary',
        'accent',
        'green',
        'red',
        'yellow',
        'purple',
      ],
      description:
        'Text color for the strong text. Can be one of the predefined options or any valid CSS color string.',
      table: {
        type: { summary: `'primary' | 'secondary' | 'accent' | string` },
        defaultValue: { summary: `'primary'` },
      },
    },
    className: {
      control: 'text',
      description: 'Additional CSS classes for custom styling.',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: '""' },
      },
    },
  },
};

export default meta;
type Story = StoryObj<StrongProps>;

/**
 * Default Strong story demonstrating basic usage.
 */
export const Default: Story = {
  args: {
    children: 'This is a strong text.',
  },
};

/**
 * Strong with Secondary Color.
 */
export const SecondaryColor: Story = {
  args: {
    color: 'secondary',
    children: 'This strong text has a secondary color.',
  },
};

/**
 * Strong with Accent Color.
 */
export const AccentColor: Story = {
  args: {
    color: 'accent',
    children: 'This strong text has an accent color.',
  },
};

/**
 * Strong with Custom Color.
 */
export const CustomColor: Story = {
  args: {
    color: '#FF5733',
    children: 'This strong text has a custom color (#FF5733).',
  },
};

/**
 * Strong with Custom ClassName.
 */
export const CustomClassName: Story = {
  args: {
    className: 'underline decoration-dotted',
    children: 'This strong text has custom underline styling.',
  },
};

/**
 * Combined Props Example.
 * Demonstrates multiple props applied together for enhanced styling.
 */
export const CombinedProps: Story = {
  args: {
    color: 'green',
    className: 'bg-green-100 p-2 rounded',
    children:
      'This Strong component combines multiple properties: green color and additional styling.',
  },
};

/**
 * Showcase Story demonstrating multiple Strong usages together.
 */
export const Showcase: Story = {
  render: (args: StrongProps) => (
    <div className="space-y-6">
      {/* 1) Default Strong */}
      <Strong {...args}>This is a default Strong component.</Strong>

      {/* 2) Secondary Color */}
      <Strong {...args} color="secondary">
        This Strong component has a secondary color.
      </Strong>

      {/* 3) Accent Color */}
      <Strong {...args} color="accent">
        This Strong component has an accent color.
      </Strong>

      {/* 4) Custom Color */}
      <Strong {...args} color="#28a745">
        This Strong component has a custom green color.
      </Strong>

      {/* 5) Custom ClassName */}
      <Strong {...args} className="underline decoration-dotted">
        This Strong component has custom underline styling.
      </Strong>

      {/* 6) Combined Props */}
      <Strong {...args} color="green" className="bg-green-100 p-2 rounded">
        This Strong component combines multiple properties.
      </Strong>
    </div>
  ),
};
