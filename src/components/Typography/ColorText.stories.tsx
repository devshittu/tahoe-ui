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
      description: 'Predefined color schemes for the text color.',
      table: {
        type: {
          summary: `'blue' | 'red' | 'green' | 'yellow' | 'purple' | 'pink' | 'cyan' | 'indigo'`,
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
    className: {
      control: 'text',
      description:
        'Additional CSS classes for custom styling (use for opacity via Tailwind classes like opacity-50).',
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
 * Red Color Scheme
 */
export const RedColorScheme: Story = {
  args: {
    colorScheme: 'red',
    children: 'This text uses the red color scheme.',
  },
};

/**
 * Purple with Opacity (via className)
 */
export const WithOpacity: Story = {
  args: {
    colorScheme: 'purple',
    className: 'opacity-50',
    children: 'This text has 50% opacity via className.',
  },
};

/**
 * Gradient with Cyan Color Scheme
 */
export const GradientWithCyan: Story = {
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
    className: 'text-lg font-bold',
    children:
      'This ColorText combines color scheme, gradient, and custom styling.',
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

      <ColorText {...args} colorScheme="green" className="opacity-70">
        This is a green ColorText with 70% opacity.
      </ColorText>

      <ColorText {...args} colorScheme="purple" gradient className="opacity-60">
        This is a purple ColorText with gradient and 60% opacity.
      </ColorText>
    </div>
  ),
};
