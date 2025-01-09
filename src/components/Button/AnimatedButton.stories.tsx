import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import AnimatedButton from './AnimatedButton';
import { AppProvider } from '@/providers/app'; // Adjust the import path as necessary
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa'; // Import react-icons
import { twMerge } from 'tailwind-merge';
import clsx from 'clsx';

// Define the meta configuration
const meta: Meta<typeof AnimatedButton> = {
  title: 'Elements/Button/AnimatedButton',
  component: AnimatedButton,
  decorators: [
    (Story) => (
      <AppProvider>
        {/* Container with padding and flex layout for better visualization */}
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
    rounded: 'md',
    isLoading: false,
    fullWidth: false,
    focusable: true,
    animationType: 'pulse',
    children: 'Animated Button',
    // Removed leftIcon and rightIcon from default args
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['solid', 'outline', 'text'],
      description: 'Style variant of the button.',
      table: {
        type: { summary: `'solid' | 'outline' | 'text'` },
        defaultValue: { summary: `'solid'` },
      },
    },
    color: {
      control: 'select',
      options: [
        'primary',
        'secondary',
        'accent',
        'blue',
        'red',
        'green',
        'purple',
        'foreground',
        'background',
      ],
      description: 'Color scheme of the button.',
      table: {
        type: {
          summary: `'primary' | 'secondary' | 'accent' | 'blue' | 'red' | 'green' | 'purple' | 'foreground' | 'background'`,
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
    rounded: {
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
    focusable: {
      control: 'boolean',
      description: 'Determines if the button can receive focus.',
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
      control: false, // Disable control since it's a ReactNode
      description: 'Custom spinner element to display when loading.',
      table: {
        type: { summary: 'React.ReactNode' },
        defaultValue: { summary: 'Default spinner' },
      },
    },
    leftIcon: {
      control: false, // Disable control to manage icons directly in stories
      description: 'Icon to display on the left side of the button.',
    },
    rightIcon: {
      control: false, // Disable control to manage icons directly in stories
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
 * Demonstrates multiple props applied together for enhanced styling and functionality.
 */
export const CombinedProps: Story = {
  args: {
    variant: 'outline',
    color: 'green',
    size: 'lg',
    rounded: 'full',
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
      {/* 1) Default AnimatedButton */}
      <AnimatedButton {...args}>Default Button</AnimatedButton>

      {/* 2) Pulse Animation */}
      <AnimatedButton {...args} animationType="pulse">
        Pulse Animation
      </AnimatedButton>

      {/* 3) Shake Animation */}
      <AnimatedButton {...args} animationType="shake">
        Shake Animation
      </AnimatedButton>

      {/* 4) Bounce Animation */}
      <AnimatedButton {...args} animationType="bounce">
        Bounce Animation
      </AnimatedButton>

      {/* 5) Loading State */}
      <AnimatedButton {...args} isLoading>
        Loading...
      </AnimatedButton>

      {/* 6) Full Width */}
      <AnimatedButton {...args} fullWidth>
        Full Width Button
      </AnimatedButton>

      {/* 7) With Left Icon */}
      <AnimatedButton {...args} leftIcon={<FaArrowLeft />}>
        Back
      </AnimatedButton>

      {/* 8) With Right Icon */}
      <AnimatedButton {...args} rightIcon={<FaArrowRight />}>
        Next
      </AnimatedButton>

      {/* 9) With Both Icons */}
      <AnimatedButton
        {...args}
        leftIcon={<FaArrowLeft />}
        rightIcon={<FaArrowRight />}
      >
        Navigate
      </AnimatedButton>

      {/* 10) Combined Props */}
      <AnimatedButton
        {...args}
        variant="outline"
        color="green"
        size="lg"
        rounded="full"
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
// src/components/Button/AnimatedButton.stories.tsx
