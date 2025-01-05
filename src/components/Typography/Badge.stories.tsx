// src/components/Typography/Badge.stories.tsx

import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import Badge, { BadgeProps } from './Badge';
import { AppProvider } from '@/providers/app';

const meta: Meta<typeof Badge> = {
  title: 'Typography/Badge',
  component: Badge,
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
    children: 'Sample Badge',
    variant: 'filled',
    color: 'primary',
    size: 'sm',
    className: '',
  },
  argTypes: {
    children: {
      control: 'text',
      description: 'Content to display within the Badge component.',
      table: {
        type: { summary: 'React.ReactNode' },
        defaultValue: { summary: 'Sample Badge' },
      },
    },
    variant: {
      control: 'select',
      options: ['filled', 'outlined', 'ghost'],
      description: 'Variant style of the badge.',
      table: {
        type: { summary: `'filled' | 'outlined' | 'ghost'` },
        defaultValue: { summary: `'filled'` },
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
        'Color scheme for the badge. Can be one of the predefined options or any valid CSS color string.',
      table: {
        type: { summary: `'primary' | 'secondary' | 'accent' | string` },
        defaultValue: { summary: `'primary'` },
      },
    },
    size: {
      control: 'select',
      options: ['sm', 'md'],
      description: 'Size of the badge.',
      table: {
        type: { summary: `'sm' | 'md'` },
        defaultValue: { summary: `'sm'` },
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
type Story = StoryObj<BadgeProps>;

/**
 * Default Badge story demonstrating basic usage.
 */
export const Default: Story = {
  args: {
    children: 'Default Badge',
  },
};

/**
 * Filled Variant Badge.
 */
export const Filled: Story = {
  args: {
    variant: 'filled',
    children: 'Filled Badge',
  },
};

/**
 * Outlined Variant Badge.
 */
export const Outlined: Story = {
  args: {
    variant: 'outlined',
    children: 'Outlined Badge',
  },
};

/**
 * Ghost Variant Badge.
 */
export const Ghost: Story = {
  args: {
    variant: 'ghost',
    children: 'Ghost Badge',
  },
};

/**
 * Primary Color Badge.
 */
export const PrimaryColor: Story = {
  args: {
    color: 'primary',
    children: 'Primary Badge',
  },
};

/**
 * Secondary Color Badge.
 */
export const SecondaryColor: Story = {
  args: {
    color: 'secondary',
    children: 'Secondary Badge',
  },
};

/**
 * Custom Color Badge.
 */
export const CustomColor: Story = {
  args: {
    color: '#FF5733',
    children: 'Custom Color Badge',
  },
};

/**
 * Small Size Badge.
 */
export const SmallSize: Story = {
  args: {
    size: 'sm',
    children: 'Small Badge',
  },
};

/**
 * Medium Size Badge.
 */
export const MediumSize: Story = {
  args: {
    size: 'md',
    children: 'Medium Badge',
  },
};

/**
 * Badge with Custom ClassName.
 */
export const CustomClassName: Story = {
  args: {
    className: 'shadow-md',
    children: 'Custom Styled Badge',
  },
};

/**
 * Combined Props Example.
 * Demonstrates multiple props applied together for enhanced styling.
 */
export const CombinedProps: Story = {
  args: {
    variant: 'outlined',
    color: 'green',
    size: 'md',
    className: 'border-2',
    children: 'Combined Props Badge',
  },
};

/**
 * Showcase Story demonstrating multiple Badge usages together.
 */
export const Showcase: Story = {
  render: (args: BadgeProps) => (
    <div className="space-y-4">
      {/* 1) Filled Variant */}
      <Badge {...args} variant="filled" color="blue">
        Filled Badge
      </Badge>

      {/* 2) Outlined Variant */}
      <Badge {...args} variant="outlined" color="red">
        Outlined Badge
      </Badge>

      {/* 3) Ghost Variant */}
      <Badge {...args} variant="ghost" color="purple">
        Ghost Badge
      </Badge>

      {/* 4) Custom Color */}
      <Badge {...args} color="#28a745">
        Custom Green Badge
      </Badge>

      {/* 5) Medium Size with Shadow */}
      <Badge {...args} size="md" className="shadow-lg">
        Medium Shadow Badge
      </Badge>

      {/* 6) Combined Props */}
      <Badge
        {...args}
        variant="outlined"
        color="yellow"
        size="md"
        className="border-4"
      >
        Combined Props Badge
      </Badge>
    </div>
  ),
};
