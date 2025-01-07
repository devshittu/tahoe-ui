// src/components/Typography/Caption.stories.tsx

import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import Caption, { CaptionProps } from './Caption';
import { AppProvider } from '@/providers/app';

const meta: Meta<typeof Caption> = {
  title: 'Typography/Caption',
  component: Caption,
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
    children: 'Sample Caption Text',
    color: 'secondary',
    fontWeight: 'light',
    className: '',
  },
  argTypes: {
    children: {
      control: 'text',
      description: 'Content to display within the Caption component.',
      table: {
        type: { summary: 'React.ReactNode' },
        defaultValue: { summary: 'Sample Caption Text' },
      },
    },
    color: {
      control: 'select',
      options: ['primary', 'secondary', 'accent', 'green', 'red', 'yellow', 'purple', 'custom'],
      description:
        'Text color for the caption. Can be one of the predefined options or any valid CSS color string.',
      table: {
        type: {
          summary: `'primary' | 'secondary' | 'accent' | 'green' | 'red' | 'yellow' | 'purple' | string`,
        },
        defaultValue: { summary: `'secondary'` },
      },
    },
    fontWeight: {
      control: 'select',
      options: ['light', 'regular', 'bold', 'extrabold'],
      description: 'Font weight of the caption.',
      table: {
        type: { summary: `'light' | 'regular' | 'bold' | 'extrabold'` },
        defaultValue: { summary: `'light'` },
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
type Story = StoryObj<CaptionProps>;

/**
 * Default Caption story demonstrating basic usage.
 */
export const Default: Story = {
  args: {
    children: 'This is a default Caption component.',
  },
};

/**
 * Caption with Primary Color.
 */
export const PrimaryColor: Story = {
  args: {
    color: 'primary',
    children: 'This Caption has a primary color.',
  },
};

/**
 * Caption with Accent Color.
 */
export const AccentColor: Story = {
  args: {
    color: 'accent',
    children: 'This Caption has an accent color.',
  },
};

/**
 * Caption with Custom Color.
 */
export const CustomColor: Story = {
  args: {
    color: '#FF5733',
    children: 'This Caption has a custom color (#FF5733).',
  },
};

/**
 * Caption with Bold Font Weight.
 */
export const BoldFontWeight: Story = {
  args: {
    fontWeight: 'bold',
    children: 'This Caption has a bold font weight.',
  },
};

/**
 * Caption with Extra Bold Font Weight.
 */
export const ExtraBoldFontWeight: Story = {
  args: {
    fontWeight: 'extrabold',
    children: 'This Caption has an extra bold font weight.',
  },
};

/**
 * Caption with Custom ClassName.
 */
export const CustomClassName: Story = {
  args: {
    className: 'bg-yellow-100 p-2 rounded',
    children: 'This Caption has custom background and padding.',
  },
};

/**
 * Combined Props Example.
 * Demonstrates multiple props applied together for enhanced styling.
 */
export const CombinedProps: Story = {
  args: {
    color: 'green',
    fontWeight: 'extrabold',
    className: 'bg-green-100 text-green-800 p-3 rounded-lg',
    children: 'This Caption combines color, font weight, and custom styling.',
  },
};

/**
 * Showcase Story demonstrating multiple Caption usages together.
 */
export const Showcase: Story = {
  render: (args: CaptionProps) => (
    <div className="space-y-4">
      {/* 1) Default Caption */}
      <Caption {...args}>This is a default Caption component.</Caption>

      {/* 2) Primary Color Caption */}
      <Caption {...args} color="primary">
        This Caption has a primary color.
      </Caption>

      {/* 3) Accent Color Caption */}
      <Caption {...args} color="accent">
        This Caption has an accent color.
      </Caption>

      {/* 4) Custom Color Caption */}
      <Caption {...args} color="#FF5733">
        This Caption has a custom color (#FF5733).
      </Caption>

      {/* 5) Bold Font Weight Caption */}
      <Caption {...args} fontWeight="bold">
        This Caption has a bold font weight.
      </Caption>

      {/* 6) Extra Bold Font Weight Caption */}
      <Caption {...args} fontWeight="extrabold">
        This Caption has an extra bold font weight.
      </Caption>

      {/* 7) Custom ClassName Caption */}
      <Caption {...args} className="bg-yellow-100 p-2 rounded">
        This Caption has custom background and padding.
      </Caption>

      {/* 8) Combined Props Caption */}
      <Caption
        {...args}
        color="green"
        fontWeight="extrabold"
        className="bg-green-100 text-green-800 p-3 rounded-lg"
      >
        This Caption combines color, font weight, and custom styling.
      </Caption>
    </div>
  ),
};