// src/components/Typography/Highlight.stories.tsx

import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import Highlight, { HighlightProps } from './Highlight';
import { AppProvider } from '@/providers/app';

const meta: Meta<typeof Highlight> = {
  title: 'Typography/Highlight',
  component: Highlight,
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
    children: 'Sample Highlight Text',
    bgColor: 'yellow-200',
    textColor: 'primary',
    padding: 'px-1',
    className: '',
  },
  argTypes: {
    children: {
      control: 'text',
      description: 'Content to display within the Highlight component.',
      table: {
        type: { summary: 'React.ReactNode' },
        defaultValue: { summary: 'Sample Highlight Text' },
      },
    },
    bgColor: {
      control: 'text',
      description:
        'Background color class. Can be any valid Tailwind background color class or a custom CSS color string.',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: '"yellow-200"' },
      },
    },
    textColor: {
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
        'Text color. Can be one of the predefined options or any valid CSS color string.',
      table: {
        type: { summary: `'primary' | 'secondary' | 'accent' | string` },
        defaultValue: { summary: `'primary'` },
      },
    },
    padding: {
      control: 'text',
      description: 'Padding classes for the highlight. Default is "px-1".',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: '"px-1"' },
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
type Story = StoryObj<HighlightProps>;

/**
 * Default Highlight story demonstrating basic usage.
 */
export const Default: Story = {
  args: {
    children: 'This is a default Highlight component.',
  },
};

/**
 * Highlight with Secondary Text Color.
 */
export const SecondaryTextColor: Story = {
  args: {
    textColor: 'secondary',
    children: 'This Highlight has a secondary text color.',
  },
};

/**
 * Highlight with Accent Text Color.
 */
export const AccentTextColor: Story = {
  args: {
    textColor: 'accent',
    children: 'This Highlight has an accent text color.',
  },
};

/**
 * Highlight with Custom Background Color.
 */
export const CustomBackgroundColor: Story = {
  args: {
    bgColor: '#FFD700', // Gold color
    children: 'This Highlight has a custom gold background color.',
  },
};

/**
 * Highlight with Custom Text Color.
 */
export const CustomTextColor: Story = {
  args: {
    textColor: '#FF5733', // Custom red color
    children: 'This Highlight has a custom red text color.',
  },
};

/**
 * Highlight with Larger Padding.
 */
export const LargerPadding: Story = {
  args: {
    padding: 'px-3 py-1',
    children: 'This Highlight has larger padding.',
  },
};

/**
 * Highlight with Custom ClassName.
 */
export const CustomClassName: Story = {
  args: {
    className: 'rounded-full shadow-lg',
    children: 'This Highlight has rounded corners and a shadow.',
  },
};

/**
 * Highlight with Gradient Text.
 */
export const GradientText: Story = {
  args: {
    textColor: 'accent',
    className:
      'bg-gradient-to-r from-red-400 to-red-600 text-transparent bg-clip-text',
    children: 'This Highlight has gradient text.',
  },
};

/**
 * Combined Props Example.
 * Demonstrates multiple props applied together for enhanced styling.
 */
export const CombinedProps: Story = {
  args: {
    bgColor: 'green-200',
    textColor: 'green',
    padding: 'px-2 py-1',
    className: 'rounded-md border border-green-400',
    children:
      'This Highlight combines multiple properties: green background, green text, padding, rounded corners, and a border.',
  },
};

/**
 * Showcase Story demonstrating multiple Highlight usages together.
 */
export const Showcase: Story = {
  render: (args: HighlightProps) => (
    <div className="space-y-6">
      {/* 1) Default Highlight */}
      <Highlight {...args}>This is a default Highlight component.</Highlight>

      {/* 2) Secondary Text Color */}
      <Highlight {...args} textColor="secondary">
        This Highlight has a secondary text color.
      </Highlight>

      {/* 3) Accent Text Color */}
      <Highlight {...args} textColor="accent">
        This Highlight has an accent text color.
      </Highlight>

      {/* 4) Custom Background Color */}
      <Highlight {...args} bgColor="#FFD700">
        This Highlight has a custom gold background color.
      </Highlight>

      {/* 5) Custom Text Color */}
      <Highlight {...args} textColor="#FF5733">
        This Highlight has a custom red text color.
      </Highlight>

      {/* 6) Larger Padding */}
      <Highlight {...args} padding="px-3 py-1">
        This Highlight has larger padding.
      </Highlight>

      {/* 7) Custom ClassName */}
      <Highlight {...args} className="rounded-full shadow-lg">
        This Highlight has rounded corners and a shadow.
      </Highlight>

      {/* 8) Gradient Text */}
      <Highlight
        {...args}
        textColor="accent"
        className="bg-gradient-to-r from-red-400 to-red-600 text-transparent bg-clip-text"
      >
        This Highlight has gradient text.
      </Highlight>

      {/* 9) Combined Props */}
      <Highlight
        {...args}
        bgColor="green-200"
        textColor="green"
        padding="px-2 py-1"
        className="rounded-md border border-green-400"
      >
        This Highlight combines multiple properties.
      </Highlight>
    </div>
  ),
};
