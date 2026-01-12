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
    bgColor: 'yellow',
    textColor: 'primary',
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
      control: 'select',
      options: ['yellow', 'green', 'blue', 'pink', 'purple'],
      description: 'Background color for the highlight.',
      table: {
        type: { summary: `'yellow' | 'green' | 'blue' | 'pink' | 'purple'` },
        defaultValue: { summary: '"yellow"' },
      },
    },
    textColor: {
      control: 'select',
      options: ['primary', 'secondary', 'accent', 'muted', 'inherit'],
      description: 'Text color for the highlighted text.',
      table: {
        type: {
          summary: `'primary' | 'secondary' | 'accent' | 'muted' | 'inherit'`,
        },
        defaultValue: { summary: `'primary'` },
      },
    },
    className: {
      control: 'text',
      description:
        'Additional CSS classes for custom styling (padding, borders, etc.).',
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
 * Highlight with Green Background.
 */
export const GreenBackground: Story = {
  args: {
    bgColor: 'green',
    children: 'This Highlight has a green background color.',
  },
};

/**
 * Highlight with Blue Background.
 */
export const BlueBackground: Story = {
  args: {
    bgColor: 'blue',
    children: 'This Highlight has a blue background color.',
  },
};

/**
 * Highlight with Larger Padding (via className).
 */
export const LargerPadding: Story = {
  args: {
    className: 'px-3 py-1',
    children: 'This Highlight has larger padding.',
  },
};

/**
 * Highlight with Custom ClassName.
 */
export const CustomClassName: Story = {
  args: {
    className: 'rounded-full shadow-lg px-2',
    children: 'This Highlight has rounded corners and a shadow.',
  },
};

/**
 * Combined Props Example.
 * Demonstrates multiple props applied together for enhanced styling.
 */
export const CombinedProps: Story = {
  args: {
    bgColor: 'green',
    textColor: 'primary',
    className: 'px-2 py-1 rounded-md border border-green-400',
    children:
      'This Highlight combines multiple properties: green background, primary text, padding, rounded corners, and a border.',
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

      {/* 4) Green Background */}
      <Highlight {...args} bgColor="green">
        This Highlight has a green background color.
      </Highlight>

      {/* 5) Blue Background */}
      <Highlight {...args} bgColor="blue">
        This Highlight has a blue background color.
      </Highlight>

      {/* 6) Larger Padding via className */}
      <Highlight {...args} className="px-3 py-1">
        This Highlight has larger padding.
      </Highlight>

      {/* 7) Custom ClassName */}
      <Highlight {...args} className="rounded-full shadow-lg px-2">
        This Highlight has rounded corners and a shadow.
      </Highlight>

      {/* 8) Combined Props */}
      <Highlight
        {...args}
        bgColor="purple"
        textColor="primary"
        className="px-2 py-1 rounded-md border border-purple-400"
      >
        This Highlight combines multiple properties.
      </Highlight>
    </div>
  ),
};
