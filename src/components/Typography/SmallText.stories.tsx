// src/components/Typography/SmallText.stories.tsx

import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import SmallText, { SmallTextProps } from './SmallText';
import { AppProvider } from '@/providers/app';

const meta: Meta<typeof SmallText> = {
  title: 'Typography/SmallText',
  component: SmallText,
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
    children: 'Sample SmallText',
    className: '',
  },
  argTypes: {
    children: {
      control: 'text',
      description: 'Content to display within the SmallText component.',
      table: {
        type: { summary: 'React.ReactNode' },
        defaultValue: { summary: 'Sample SmallText' },
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
type Story = StoryObj<SmallTextProps>;

/**
 * Default SmallText story demonstrating basic usage.
 */
export const Default: Story = {
  args: {
    children: 'This is a default SmallText component.',
  },
};

/**
 * SmallText with Custom ClassName.
 */
export const CustomClassName: Story = {
  args: {
    className: 'bg-yellow-100 p-2 rounded',
    children: 'This SmallText has custom background and padding.',
  },
};

/**
 * SmallText with Custom Text Color.
 */
export const CustomTextColor: Story = {
  args: {
    className: 'text-red-500',
    children: 'This SmallText has a custom red text color.',
  },
};

/**
 * SmallText with Custom ClassName and Text Color.
 */
export const CustomClassNameAndColor: Story = {
  args: {
    className: 'bg-blue-100 text-blue-500 p-3 rounded-lg',
    children:
      'This SmallText has custom background, text color, padding, and rounded corners.',
  },
};

/**
 * Combined Props Example.
 * Demonstrates multiple props applied together for enhanced styling.
 */
export const CombinedProps: Story = {
  args: {
    className: 'bg-green-100 text-green-500 p-4 rounded-md',
    children:
      'This SmallText combines multiple properties: green background, green text color, padding, and rounded corners.',
  },
};

/**
 * Showcase Story demonstrating multiple SmallText usages together.
 */
export const Showcase: Story = {
  render: (args: SmallTextProps) => (
    <div className="space-y-6">
      {/* 1) Default SmallText */}
      <SmallText {...args}>This is a default SmallText component.</SmallText>

      {/* 2) Custom ClassName */}
      <SmallText {...args} className="bg-yellow-100 p-2 rounded">
        This SmallText has custom background and padding.
      </SmallText>

      {/* 3) Custom Text Color */}
      <SmallText {...args} className="text-red-500">
        This SmallText has a custom red text color.
      </SmallText>

      {/* 4) Custom ClassName and Text Color */}
      <SmallText {...args} className="bg-blue-100 text-blue-500 p-3 rounded-lg">
        This SmallText has custom background, text color, padding, and rounded
        corners.
      </SmallText>

      {/* 5) Combined Props */}
      <SmallText
        {...args}
        className="bg-green-100 text-green-500 p-4 rounded-md"
      >
        This SmallText combines multiple properties.
      </SmallText>
    </div>
  ),
};
