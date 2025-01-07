// src/components/Typography/Label.stories.tsx

import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import Label, { LabelProps } from './Label';
import { AppProvider } from '@/providers/app';

const meta: Meta<typeof Label> = {
  title: 'Typography/Label',
  component: Label,
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
    children: 'Sample Label',
    size: 'sm',
    color: 'primary',
    fontWeight: 'bold',
    className: '',
  },
  argTypes: {
    children: {
      control: 'text',
      description: 'Content to display within the Label component.',
      table: {
        type: { summary: 'React.ReactNode' },
        defaultValue: { summary: 'Sample Label' },
      },
    },
    size: {
      control: 'select',
      options: ['sm', 'md'],
      description: 'Size of the label.',
      table: {
        type: { summary: `'sm' | 'md'` },
        defaultValue: { summary: `'sm'` },
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
        'Text color for the label. Can be one of the predefined options or any valid CSS color string.',
      table: {
        type: { summary: `'primary' | 'secondary' | 'accent' | string` },
        defaultValue: { summary: `'primary'` },
      },
    },
    fontWeight: {
      control: 'select',
      options: ['light', 'regular', 'bold', 'extrabold'],
      description: 'Font weight of the label.',
      table: {
        type: { summary: `'light' | 'regular' | 'bold' | 'extrabold'` },
        defaultValue: { summary: `'bold'` },
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
type Story = StoryObj<LabelProps>;

/**
 * Default Label story demonstrating basic usage.
 */
export const Default: Story = {
  args: {
    children: 'Default Label',
  },
};

/**
 * Label with Small Size.
 */
export const SmallSize: Story = {
  args: {
    size: 'sm',
    children: 'Small Label',
  },
};

/**
 * Label with Medium Size.
 */
export const MediumSize: Story = {
  args: {
    size: 'md',
    children: 'Medium Label',
  },
};

/**
 * Label with Secondary Color.
 */
export const SecondaryColor: Story = {
  args: {
    color: 'secondary',
    children: 'Secondary Label',
  },
};

/**
 * Label with Accent Color.
 */
export const AccentColor: Story = {
  args: {
    color: 'accent',
    children: 'Accent Label',
  },
};

/**
 * Label with Custom Color.
 */
export const CustomColor: Story = {
  args: {
    color: '#FF5733',
    children: 'Custom Color Label',
  },
};

/**
 * Label with Light Font Weight.
 */
export const LightWeight: Story = {
  args: {
    fontWeight: 'light',
    children: 'Light Weight Label',
  },
};

/**
 * Label with Extra Bold Font Weight.
 */
export const ExtraBoldWeight: Story = {
  args: {
    fontWeight: 'extrabold',
    children: 'Extra Bold Weight Label',
  },
};

/**
 * Label with Custom ClassName.
 */
export const CustomClassName: Story = {
  args: {
    className: 'bg-yellow-100 p-1 rounded',
    children: 'Custom Styled Label',
  },
};

/**
 * Combined Props Example.
 * Demonstrates multiple props applied together for enhanced styling.
 */
export const CombinedProps: Story = {
  args: {
    size: 'md',
    color: 'green',
    fontWeight: 'extrabold',
    className: 'bg-green-100 text-green-800 p-2 rounded-lg',
    children: 'Combined Props Label',
  },
};

/**
 * Showcase Story demonstrating multiple Label usages together.
 */
export const Showcase: Story = {
  render: (args: LabelProps) => (
    <div className="space-y-4">
      {/* 1) Default Label */}
      <Label {...args}>Default Label</Label>

      {/* 2) Small Size Label */}
      <Label {...args} size="sm">
        Small Label
      </Label>

      {/* 3) Medium Size Label */}
      <Label {...args} size="md">
        Medium Label
      </Label>

      {/* 4) Secondary Color Label */}
      <Label {...args} color="secondary">
        Secondary Label
      </Label>

      {/* 5) Accent Color Label */}
      <Label {...args} color="accent">
        Accent Label
      </Label>

      {/* 6) Custom Color Label */}
      <Label {...args} color="#FF5733">
        Custom Color Label
      </Label>

      {/* 7) Light Font Weight Label */}
      <Label {...args} fontWeight="light">
        Light Weight Label
      </Label>

      {/* 8) Extra Bold Font Weight Label */}
      <Label {...args} fontWeight="extrabold">
        Extra Bold Weight Label
      </Label>

      {/* 9) Custom ClassName Label */}
      <Label {...args} className="bg-yellow-100 p-1 rounded">
        Custom Styled Label
      </Label>

      {/* 10) Combined Props Label */}
      <Label
        {...args}
        size="md"
        color="green"
        fontWeight="extrabold"
        className="bg-green-100 text-green-800 p-2 rounded-lg"
      >
        Combined Props Label
      </Label>
    </div>
  ),
};
