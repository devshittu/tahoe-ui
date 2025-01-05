// src/components/Typography/ColorText.stories.tsx

import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import ColorText, { ColorTextProps } from './ColorText';
import { AppProvider } from '@/providers/app';

const meta: Meta<typeof ColorText> = {
  title: 'Typography/ColorText',
  component: ColorText,
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
    children: 'Sample ColorText Content',
    colorScheme: 'blue',
    gradient: false,
    opacity: undefined,
    className: '',
  },
  argTypes: {
    children: {
      control: 'text',
      description: 'Content to display within the ColorText component.',
      table: {
        type: { summary: 'React.ReactNode' },
        defaultValue: { summary: 'Sample ColorText Content' },
      },
    },
    colorScheme: {
      control: 'select',
      options: [
        'blue',
        'red',
        'green',
        'yellow',
        'purple',
        'pink',
        'cyan',
        'indigo',
      ],
      description:
        'Predefined color schemes or any valid CSS color string for the text color.',
      table: {
        type: {
          summary: `'blue' | 'red' | 'green' | 'yellow' | 'purple' | 'pink' | 'cyan' | 'indigo' | string`,
        },
        defaultValue: { summary: `'blue'` },
      },
    },
    gradient: {
      control: 'boolean',
      description:
        'If true, applies a gradient to the text based on the color scheme.',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    opacity: {
      control: {
        type: 'range',
        min: 10,
        max: 100,
        step: 10,
      },
      description: 'Opacity level for the text color (10-100).',
      table: {
        type: { summary: 'number | undefined' },
        defaultValue: { summary: 'undefined' },
      },
    },
    className: {
      control: 'text',
      description: 'Additional CSS classes for custom styling.',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: '' },
      },
    },
  },
};

export default meta;
type Story = StoryObj<ColorTextProps>;

/**
 * Default ColorText story demonstrating basic usage.
 */
export const Default: Story = {
  args: {
    children: 'This is a default ColorText component.',
  },
};

/**
 * Gradient Text
 */
export const Gradient: Story = {
  args: {
    gradient: true,
    colorScheme: 'green',
    children: 'This text has a green gradient.',
  },
};

/**
 * Custom Color Scheme
 */
export const CustomColor: Story = {
  args: {
    colorScheme: '#FF5733',
    children: 'This text has a custom color (#FF5733).',
  },
};

/**
 * Opacity Applied
 */
export const Opacity: Story = {
  args: {
    opacity: 50,
    colorScheme: 'purple',
    children: 'This text has 50% opacity.',
  },
};

/**
 * Gradient with Custom Color Scheme
 */
export const GradientWithCustomColor: Story = {
  args: {
    gradient: true,
    colorScheme: 'cyan',
    children: 'This text has a cyan gradient.',
  },
};

/**
 * Combined Props Example
 */
export const CombinedProps: Story = {
  args: {
    colorScheme: 'pink',
    gradient: true,
    opacity: 80,
    children:
      'This ColorText combines color scheme, gradient, and opacity for a vibrant look.',
  },
};

/**
 * Showcase Story demonstrating multiple ColorText usages together.
 */
export const Showcase: Story = {
  render: (args: ColorTextProps) => (
    <div className="space-y-6">
      <ColorText {...args} colorScheme="blue">
        This is a blue ColorText without gradient.
      </ColorText>

      <ColorText {...args} colorScheme="red" gradient>
        This is a red ColorText with gradient.
      </ColorText>

      <ColorText {...args} colorScheme="#28a745" opacity={70}>
        This is a custom green ColorText with 70% opacity.
      </ColorText>

      <ColorText {...args} colorScheme="purple" gradient opacity={60}>
        This is a purple ColorText with gradient and 60% opacity.
      </ColorText>
    </div>
  ),
};
