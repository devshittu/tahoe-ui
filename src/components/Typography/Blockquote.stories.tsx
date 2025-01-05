// src/components/Typography/Blockquote.stories.tsx

import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import Blockquote, { BlockquoteProps } from './Blockquote';
import { AppProvider } from '@/providers/app';

const meta: Meta<typeof Blockquote> = {
  title: 'Typography/Blockquote',
  component: Blockquote,
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
    children:
      'This is a sample blockquote demonstrating the default properties.',
    cite: '',
    borderColor: 'border-gray-300',
    className: '',
  },
  argTypes: {
    children: {
      control: 'text',
      description: 'Content to display within the Blockquote component.',
      table: {
        type: { summary: 'React.ReactNode' },
        defaultValue: {
          summary:
            'This is a sample blockquote demonstrating the default properties.',
        },
      },
    },
    cite: {
      control: 'text',
      description: 'Citation for the blockquote.',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: '""' },
      },
    },
    borderColor: {
      control: 'text',
      description:
        'Border color class. Can be one of the predefined Tailwind border colors or any valid Tailwind border class.',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: '"border-gray-300"' },
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
type Story = StoryObj<BlockquoteProps>;

/**
 * Default Blockquote story demonstrating basic usage without citation.
 */
export const Default: Story = {
  args: {
    children: 'This is a default Blockquote component without citation.',
  },
};

/**
 * Blockquote with Citation.
 */
export const WithCitation: Story = {
  args: {
    children: 'This is a Blockquote component with a citation.',
    cite: 'John Doe',
  },
};

/**
 * Blockquote with Custom Border Color.
 */
export const CustomBorderColor: Story = {
  args: {
    children: 'This Blockquote has a custom border color.',
    borderColor: 'border-blue-500',
  },
};

/**
 * Blockquote with Custom ClassName.
 */
export const CustomClassName: Story = {
  args: {
    children: 'This Blockquote has additional custom styling via className.',
    className: 'bg-yellow-100 p-4 rounded',
  },
};

/**
 * Blockquote with Citation and Custom Border Color.
 */
export const WithCitationAndCustomBorder: Story = {
  args: {
    children: 'This Blockquote has both a citation and a custom border color.',
    cite: 'Jane Smith',
    borderColor: 'border-green-500',
  },
};

/**
 * Truncated Blockquote.
 * Demonstrates text truncation when content exceeds container width.
 */
export const Truncated: Story = {
  args: {
    className: 'max-w-md',
    children:
      'This is a very long blockquote that is intended to demonstrate how text truncation works when the content exceeds the container width. It should truncate with an ellipsis if the truncate prop is enabled.',
    // truncate: true,
  },
};

/**
 * Combined Props Example.
 * Demonstrates multiple props applied together for complex styling.
 */
export const CombinedProps: Story = {
  args: {
    children:
      'This Blockquote combines multiple properties: custom border color, citation, additional styling, and truncation to showcase a comprehensive example.',
    cite: 'Albert Einstein',
    borderColor: 'border-purple-500',
    className: 'bg-gray-50 p-6 rounded-lg shadow-md',
    // truncate: false,
  },
};

/**
 * Showcase Story demonstrating multiple Blockquote usages together.
 */
export const Showcase: Story = {
  render: (args: BlockquoteProps) => (
    <div className="space-y-6">
      {/* 1) Basic usage: without citation */}
      <Blockquote {...args}>
        This is a basic blockquote without a citation. It uses the default
        border color.
      </Blockquote>

      {/* 2) With citation */}
      <Blockquote {...args} cite="Isaac Newton">
        This blockquote includes a citation to illustrate proper attribution.
      </Blockquote>

      {/* 3) Custom border color */}
      <Blockquote {...args} borderColor="border-red-500">
        This blockquote has a custom red border color for emphasis.
      </Blockquote>

      {/* 4) With citation and custom border color */}
      <Blockquote {...args} cite="Marie Curie" borderColor="border-pink-500">
        This blockquote combines a citation with a custom pink border color.
      </Blockquote>

      {/* 5) Additional styling via className */}
      <Blockquote
        {...args}
        className="bg-blue-50 p-4 rounded-md shadow-inner"
        borderColor="border-blue-500"
        cite="Nikola Tesla"
      >
        This blockquote has additional styling, including background color,
        padding, rounded corners, and an inner shadow.
      </Blockquote>
    </div>
  ),
};
