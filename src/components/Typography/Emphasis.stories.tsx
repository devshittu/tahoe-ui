// src/components/Typography/Emphasis.stories.tsx

import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import Emphasis, { EmphasisProps } from './Emphasis';
import { AppProvider } from '@/providers/app';

const meta: Meta<typeof Emphasis> = {
  title: 'Typography/Emphasis',
  component: Emphasis,
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
    children: 'Sample Emphasis Text',
    color: 'primary',
    className: '',
  },
  argTypes: {
    children: {
      control: 'text',
      description: 'Content to display within the Emphasis component.',
      table: {
        type: { summary: 'React.ReactNode' },
        defaultValue: { summary: 'Sample Emphasis Text' },
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
        'Text color for the emphasized text. Can be one of the predefined options or any valid CSS color string.',
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
type Story = StoryObj<EmphasisProps>;

/**
 * Default Emphasis story demonstrating basic usage.
 */
export const Default: Story = {
  args: {
    children: 'This is an emphasized text.',
  },
};

/**
 * Emphasis with Secondary Color.
 */
export const SecondaryColor: Story = {
  args: {
    color: 'secondary',
    children: 'This emphasized text has a secondary color.',
  },
};

/**
 * Emphasis with Accent Color.
 */
export const AccentColor: Story = {
  args: {
    color: 'accent',
    children: 'This emphasized text has an accent color.',
  },
};

/**
 * Emphasis with Custom Color.
 */
export const CustomColor: Story = {
  args: {
    color: '#FF5733',
    children: 'This emphasized text has a custom color (#FF5733).',
  },
};

/**
 * Emphasis with Custom ClassName.
 */
export const CustomClassName: Story = {
  args: {
    className: 'bg-yellow-100 p-2 rounded',
    children: 'This emphasized text has custom background and padding.',
  },
};

/**
 * Combined Props Example.
 * Demonstrates multiple props applied together for enhanced styling.
 */
export const CombinedProps: Story = {
  args: {
    color: 'purple',
    className: 'bg-purple-100 p-3 rounded-md',
    children:
      'This Emphasis combines multiple properties: custom color and additional styling.',
  },
};

/**
 * Showcase Story demonstrating multiple Emphasis usages together.
 */
export const Showcase: Story = {
  render: (args: EmphasisProps) => (
    <div className="space-y-6">
      {/* 1) Default Emphasis */}
      <Emphasis {...args}>This is a default Emphasis component.</Emphasis>

      {/* 2) Secondary Color */}
      <Emphasis {...args} color="secondary">
        This Emphasis has a secondary color.
      </Emphasis>

      {/* 3) Accent Color */}
      <Emphasis {...args} color="accent">
        This Emphasis has an accent color.
      </Emphasis>

      {/* 4) Custom Color */}
      <Emphasis {...args} color="#28a745">
        This Emphasis has a custom green color.
      </Emphasis>

      {/* 5) Custom ClassName */}
      <Emphasis {...args} className="bg-blue-100 p-4 rounded-lg">
        This Emphasis has custom background and padding.
      </Emphasis>

      {/* 6) Combined Props */}
      <Emphasis {...args} color="yellow" className="bg-yellow-200 p-2 rounded">
        This Emphasis combines multiple properties.
      </Emphasis>
    </div>
  ),
};
