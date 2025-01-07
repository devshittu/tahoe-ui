// src/components/Typography/Hr.stories.tsx

import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import Hr, { HrProps } from './Hr';
import { AppProvider } from '@/providers/app';

const meta: Meta<typeof Hr> = {
  title: 'Typography/Hr',
  component: Hr,
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
    thickness: 'normal',
    color: 'gray',
    className: '',
  },
  argTypes: {
    thickness: {
      control: 'select',
      options: ['thin', 'normal', 'thick'],
      description: 'Thickness of the horizontal rule.',
      table: {
        type: { summary: `'thin' | 'normal' | 'thick'` },
        defaultValue: { summary: `'normal'` },
      },
    },
    color: {
      control: 'select',
      options: ['gray', 'blue', 'red', 'custom'],
      description: 'Color of the horizontal rule.',
      table: {
        type: { summary: `'gray' | 'blue' | 'red' | 'custom'` },
        defaultValue: { summary: `'gray'` },
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
type Story = StoryObj<HrProps>;

/**
 * Default Hr story demonstrating basic usage.
 */
export const Default: Story = {
  args: {
    thickness: 'normal',
    color: 'gray',
  },
};

/**
 * Hr with Thin Thickness.
 */
export const Thin: Story = {
  args: {
    thickness: 'thin',
    color: 'gray',
  },
};

/**
 * Hr with Thick Thickness.
 */
export const Thick: Story = {
  args: {
    thickness: 'thick',
    color: 'gray',
  },
};

/**
 * Hr with Blue Color.
 */
export const BlueColor: Story = {
  args: {
    thickness: 'normal',
    color: 'blue',
  },
};

/**
 * Hr with Red Color.
 */
export const RedColor: Story = {
  args: {
    thickness: 'normal',
    color: 'red',
  },
};

/**
 * Hr with Custom Color.
 */
export const CustomColor: Story = {
  args: {
    thickness: 'normal',
    color: 'custom',
    className: 'bg-indigo-500',
  },
};

/**
 * Hr with Custom ClassName.
 */
export const CustomClassName: Story = {
  args: {
    thickness: 'thick',
    color: 'custom',
    className: 'bg-pink-500 rounded',
  },
};

/**
 * Combined Props Example.
 * Demonstrates multiple props applied together for enhanced styling.
 */
export const CombinedProps: Story = {
  args: {
    thickness: 'thick',
    color: 'custom',
    className: 'bg-green-500 rounded-full',
  },
};

/**
 * Showcase Story demonstrating multiple Hr usages together.
 */
export const Showcase: Story = {
  render: (args: HrProps) => (
    <div className="space-y-4">
      {/* 1) Default Hr */}
      <Hr {...args} thickness="normal" color="gray" />

      {/* 2) Thin Hr */}
      <Hr {...args} thickness="thin" color="blue" />

      {/* 3) Thick Hr */}
      <Hr {...args} thickness="thick" color="red" />

      {/* 4) Custom Colored Hr */}
      <Hr
        {...args}
        thickness="normal"
        color="custom"
        className="bg-purple-500"
      />

      {/* 5) Combined Props Hr */}
      <Hr
        {...args}
        thickness="thick"
        color="custom"
        className="bg-yellow-500 rounded-lg"
      />
    </div>
  ),
};
