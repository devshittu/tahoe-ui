// src/components/Button/AnimatedButton.stories.tsx

import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import AnimatedButton from './AnimatedButton';
import { AppProvider } from '@/providers/app';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';

const meta: Meta<typeof AnimatedButton> = {
  title: 'Elements/Button/AnimatedButton',
  component: AnimatedButton,
  decorators: [
    (Story) => (
      <AppProvider>
        <div className="p-4 flex flex-col items-center space-y-6 bg-gray-50 min-h-screen">
          <Story />
        </div>
      </AppProvider>
    ),
  ],
  args: {
    variant: 'solid',
    color: 'primary',
    size: 'md',
    radius: 'md',
    isLoading: false,
    fullWidth: false,
    animationType: 'pulse',
    children: 'Animated Button',
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['solid', 'subtle', 'outline', 'ghost', 'glass'],
      description: 'Style variant of the button.',
      table: {
        type: { summary: `'solid' | 'subtle' | 'outline' | 'ghost' | 'glass'` },
        defaultValue: { summary: `'solid'` },
      },
    },
    color: {
      control: 'select',
      options: [
        'primary',
        'secondary',
        'accent',
        'neutral',
        'success',
        'warning',
        'error',
      ],
      description: 'Color scheme of the button.',
      table: {
        type: {
          summary: `'primary' | 'secondary' | 'accent' | 'neutral' | 'success' | 'warning' | 'error'`,
        },
        defaultValue: { summary: `'primary'` },
      },
    },
    size: {
      control: 'select',
      options: ['xs', 'sm', 'md', 'lg', 'xl'],
      description: 'Size of the button.',
      table: {
        type: { summary: `'xs' | 'sm' | 'md' | 'lg' | 'xl'` },
        defaultValue: { summary: `'md'` },
      },
    },
    radius: {
      control: 'select',
      options: ['none', 'sm', 'md', 'lg', 'full'],
      description: 'Border radius of the button.',
      table: {
        type: { summary: `'none' | 'sm' | 'md' | 'lg' | 'full'` },
        defaultValue: { summary: `'md'` },
      },
    },
    isLoading: {
      control: 'boolean',
      description: 'Indicates if the button is in a loading state.',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    fullWidth: {
      control: 'boolean',
      description: 'If true, the button takes the full width of its container.',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    animationType: {
      control: 'select',
      options: ['pulse', 'shake', 'bounce'],
      description: 'Type of animation applied to the button.',
      table: {
        type: { summary: `'pulse' | 'shake' | 'bounce'` },
        defaultValue: { summary: `'pulse'` },
      },
    },
    spinner: {
      control: false,
      description: 'Custom spinner element to display when loading.',
      table: {
        type: { summary: 'React.ReactNode' },
        defaultValue: { summary: 'Default spinner' },
      },
    },
    leftIcon: {
      control: false,
      description: 'Icon to display on the left side of the button.',
    },
    rightIcon: {
      control: false,
      description: 'Icon to display on the right side of the button.',
    },
    onClick: {
      action: 'clicked',
      description: 'Callback function when the button is clicked.',
      table: {
        type: { summary: 'MouseEvent<HTMLButtonElement> => void' },
        defaultValue: { summary: 'undefined' },
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof AnimatedButton>;

/**
 * Default AnimatedButton story demonstrating basic usage.
 */
export const Default: Story = {};

/**
 * AnimatedButton with Pulse Animation.
 */
export const PulseAnimation: Story = {
  args: {
    animationType: 'pulse',
    children: 'Pulse Animation',
  },
};

/**
 * AnimatedButton with Shake Animation.
 */
export const ShakeAnimation: Story = {
  args: {
    animationType: 'shake',
    children: 'Shake Animation',
  },
};

/**
 * AnimatedButton with Bounce Animation.
 */
export const BounceAnimation: Story = {
  args: {
    animationType: 'bounce',
    children: 'Bounce Animation',
  },
};

/**
 * AnimatedButton in Loading State.
 */
export const LoadingState: Story = {
  args: {
    isLoading: true,
    children: 'Loading...',
  },
};

/**
 * AnimatedButton with Full Width.
 */
export const FullWidth: Story = {
  args: {
    fullWidth: true,
    children: 'Full Width Button',
  },
};

/**
 * AnimatedButton with Left Icon.
 */
export const WithLeftIcon: Story = {
  args: {
    leftIcon: <FaArrowLeft />,
    children: 'Back',
  },
};

/**
 * AnimatedButton with Right Icon.
 */
export const WithRightIcon: Story = {
  args: {
    rightIcon: <FaArrowRight />,
    children: 'Next',
  },
};

/**
 * AnimatedButton with Both Icons.
 */
export const WithBothIcons: Story = {
  args: {
    leftIcon: <FaArrowLeft />,
    rightIcon: <FaArrowRight />,
    children: 'Navigate',
  },
};

/**
 * AnimatedButton with Combined Props.
 */
export const CombinedProps: Story = {
  args: {
    variant: 'outline',
    color: 'success',
    size: 'lg',
    radius: 'full',
    animationType: 'bounce',
    leftIcon: <FaArrowLeft />,
    rightIcon: <FaArrowRight />,
    children: 'Combined Props',
    className: 'shadow-lg',
  },
};

/**
 * Showcase Story demonstrating multiple AnimatedButton usages together.
 */
export const Showcase: Story = {
  render: (args) => (
    <div className="space-y-6">
      <AnimatedButton {...args}>Default Button</AnimatedButton>

      <AnimatedButton {...args} animationType="pulse">
        Pulse Animation
      </AnimatedButton>

      <AnimatedButton {...args} animationType="shake">
        Shake Animation
      </AnimatedButton>

      <AnimatedButton {...args} animationType="bounce">
        Bounce Animation
      </AnimatedButton>

      <AnimatedButton {...args} isLoading>
        Loading...
      </AnimatedButton>

      <AnimatedButton {...args} fullWidth>
        Full Width Button
      </AnimatedButton>

      <AnimatedButton {...args} leftIcon={<FaArrowLeft />}>
        Back
      </AnimatedButton>

      <AnimatedButton {...args} rightIcon={<FaArrowRight />}>
        Next
      </AnimatedButton>

      <AnimatedButton
        {...args}
        leftIcon={<FaArrowLeft />}
        rightIcon={<FaArrowRight />}
      >
        Navigate
      </AnimatedButton>

      <AnimatedButton
        {...args}
        variant="outline"
        color="success"
        size="lg"
        radius="full"
        animationType="bounce"
        leftIcon={<FaArrowLeft />}
        rightIcon={<FaArrowRight />}
        className="shadow-lg"
      >
        Combined Props
      </AnimatedButton>
    </div>
  ),
};
