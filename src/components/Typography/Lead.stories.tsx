// src/components/Typography/Lead.stories.tsx

import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import Lead, { LeadProps } from './Lead';
import { AppProvider } from '@/providers/app';

const meta: Meta<typeof Lead> = {
  title: 'Typography/Lead',
  component: Lead,
  decorators: [
    (Story) => (
      <AppProvider>
        {/* Container with padding and max width for better visualization */}
        <div className="p-4 space-y-6 max-w-2xl border border-gray-200 rounded-lg">
          <Story />
        </div>
      </AppProvider>
    ),
  ],
  args: {
    children: 'Sample Lead Text',
    className: '',
  },
  argTypes: {
    children: {
      control: 'text',
      description: 'Content to display within the Lead component.',
      table: {
        type: { summary: 'React.ReactNode' },
        defaultValue: { summary: 'Sample Lead Text' },
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
type Story = StoryObj<LeadProps>;

/**
 * Default Lead story demonstrating basic usage.
 */
export const Default: Story = {
  args: {
    children: 'This is a default Lead component.',
  },
};

/**
 * Lead with Custom ClassName.
 */
export const CustomClassName: Story = {
  args: {
    className: 'bg-yellow-100 p-2 rounded',
    children: 'This Lead has custom background and padding.',
  },
};

/**
 * Lead with Larger Text Size.
 */
export const LargerTextSize: Story = {
  args: {
    className: 'text-2xl',
    children: 'This Lead has a larger text size.',
  },
};

/**
 * Lead with Custom Font Weight.
 */
export const CustomFontWeight: Story = {
  args: {
    className: 'font-extrabold',
    children: 'This Lead has an extra bold font weight.',
  },
};

/**
 * Lead with Custom Background.
 */
export const CustomBackground: Story = {
  args: {
    className: 'bg-blue-100 p-3 rounded-lg',
    children: 'This Lead has a custom blue background.',
  },
};

/**
 * Combined Props Example.
 * Demonstrates multiple props applied together for enhanced styling.
 */
export const CombinedProps: Story = {
  args: {
    className: 'bg-green-100 text-green-800 p-4 rounded-md',
    children:
      'This Lead combines multiple properties: green background, green text color, padding, and rounded corners.',
  },
};

/**
 * Showcase Story demonstrating multiple Lead usages together.
 */
export const Showcase: Story = {
  render: (args: LeadProps) => (
    <div className="space-y-4">
      {/* 1) Default Lead */}
      <Lead {...args}>This is a default Lead component.</Lead>

      {/* 2) Custom ClassName */}
      <Lead {...args} className="bg-yellow-100 p-2 rounded">
        This Lead has custom background and padding.
      </Lead>

      {/* 3) Larger Text Size */}
      <Lead {...args} className="text-2xl">
        This Lead has a larger text size.
      </Lead>

      {/* 4) Custom Font Weight */}
      <Lead {...args} className="font-extrabold">
        This Lead has an extra bold font weight.
      </Lead>

      {/* 5) Custom Background */}
      <Lead {...args} className="bg-blue-100 p-3 rounded-lg">
        This Lead has a custom blue background.
      </Lead>

      {/* 6) Combined Props */}
      <Lead {...args} className="bg-green-100 text-green-800 p-4 rounded-md">
        This Lead combines multiple properties.
      </Lead>
    </div>
  ),
};
