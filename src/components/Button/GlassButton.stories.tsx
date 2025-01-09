// src/components/Button/GlassButton.stories.tsx

import React, { useRef, useEffect } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import GlassButton from './GlassButton';
import { FaBeer, FaCoffee, FaRocket } from 'react-icons/fa';

const meta: Meta<typeof GlassButton> = {
  title: 'Elements/Button/GlassButton',
  component: GlassButton,
  decorators: [
    (Story) => (
      <div className="p-4 space-y-4 bg-gray-100 min-h-screen">
        <Story />
      </div>
    ),
  ],
  args: {
    children: 'Glass Button',
    variant: 'solid',
    color: 'primary',
    size: 'md',
    rounded: 'md',
    isLoading: false,
    fullWidth: false,
    focusable: false,
    leftIcon: null,
    rightIcon: null,
    disabled: false,
    className: '',
    onClick: undefined,
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['solid', 'outline', 'text'],
      description: 'Styling variant of the button.',
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
      description: 'Corner rounding of the button.',
      table: {
        type: { summary: `'none' | 'sm' | 'md' | 'lg' | 'full'` },
        defaultValue: { summary: `'md'` },
      },
    },
    isLoading: {
      control: 'boolean',
      description: 'Displays a loading spinner when true.',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    fullWidth: {
      control: 'boolean',
      description: 'Makes the button span the full width of its container.',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    focusable: {
      control: 'boolean',
      description: 'Enables focus ring when true.',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    leftIcon: {
      control: false,
      description: 'Icon to display on the left side.',
    },
    rightIcon: {
      control: false,
      description: 'Icon to display on the right side.',
    },
    disabled: {
      control: 'boolean',
      description: 'Disables the button when true.',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    className: {
      control: 'text',
      description: 'Additional CSS classes for the button.',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: '""' },
      },
    },
    onClick: {
      action: 'clicked',
      description: 'Click event handler.',
      table: {
        type: { summary: '(event: MouseEvent<HTMLButtonElement>) => void' },
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof GlassButton>;

/**
 * Default GlassButton story.
 */
export const Default: Story = {
  args: {
    children: 'Glass Button',
  },
};

/**
 * Variants of the GlassButton with different colors.
 */
export const Variants: Story = {
  render: () => (
    <div className="space-x-4">
      <GlassButton variant="solid" color="primary">
        Primary Solid
      </GlassButton>
      <GlassButton variant="outline" color="secondary">
        Secondary Outline
      </GlassButton>
      <GlassButton variant="text" color="accent">
        Accent Text
      </GlassButton>
      <GlassButton variant="solid" color="blue">
        Blue Solid
      </GlassButton>
      <GlassButton variant="outline" color="red">
        Red Outline
      </GlassButton>
      <GlassButton variant="text" color="green">
        Green Text
      </GlassButton>
      <GlassButton variant="solid" color="purple">
        Purple Solid
      </GlassButton>
      <GlassButton variant="outline" color="foreground">
        Foreground Outline
      </GlassButton>
      <GlassButton variant="text" color="background">
        Background Text
      </GlassButton>
    </div>
  ),
};

/**
 * Different Sizes of the GlassButton.
 */
export const Sizes: Story = {
  render: () => (
    <div className="space-x-2">
      <GlassButton size="xs">XS</GlassButton>
      <GlassButton size="sm">SM</GlassButton>
      <GlassButton size="md">MD</GlassButton>
      <GlassButton size="lg">LG</GlassButton>
      <GlassButton size="xl">XL</GlassButton>
    </div>
  ),
};

/**
 * Rounded Corners of the GlassButton.
 */
export const Rounded: Story = {
  render: () => (
    <div className="space-x-2">
      <GlassButton rounded="none">No Rounding</GlassButton>
      <GlassButton rounded="sm">Small Round</GlassButton>
      <GlassButton rounded="md">Medium Round</GlassButton>
      <GlassButton rounded="lg">Large Round</GlassButton>
      <GlassButton rounded="full">Full Round</GlassButton>
    </div>
  ),
};

/**
 * Loading State of the GlassButton.
 */
export const Loading: Story = {
  args: {
    isLoading: true,
    children: 'Loading...',
  },
};

/**
 * Full Width GlassButton.
 */
export const FullWidth: Story = {
  args: {
    fullWidth: true,
    children: 'Full Width Button',
  },
};

/**
 * Focusable GlassButton.
 */
export const Focusable: Story = {
  args: {
    focusable: true,
    children: 'Focusable Button',
  },
};

/**
 * GlassButton with Icons.
 */
export const WithIcons: Story = {
  render: () => (
    <div className="space-x-4">
      <GlassButton leftIcon={<FaBeer />} color="blue">
        Left Icon
      </GlassButton>
      <GlassButton rightIcon={<FaCoffee />} color="red">
        Right Icon
      </GlassButton>
      <GlassButton leftIcon={<FaBeer />} rightIcon={<FaCoffee />} color="green">
        Both Icons
      </GlassButton>
      <GlassButton leftIcon={<FaRocket />} variant="outline" color="purple">
        Outline with Icon
      </GlassButton>
    </div>
  ),
};

/**
 * Disabled GlassButton.
 */
export const Disabled: Story = {
  args: {
    disabled: true,
    children: 'Disabled Button',
  },
};

/**
 * GlassButton with Custom ClassName.
 */
export const CustomClassName: Story = {
  args: {
    children: 'Custom Styled',
    className: 'bg-yellow-500 hover:bg-yellow-600 text-black',
  },
};

/**
 * GlassButton with Ref.
 */
export const WithRef: Story = {
  render: () => {
    const ref = useRef<HTMLButtonElement>(null);

    useEffect(() => {
      if (ref.current) {
        console.log('GlassButton ref:', ref.current);
      }
    }, []);

    return <GlassButton ref={ref}>Button with Ref</GlassButton>;
  },
};

/**
 * GlassButton with Custom Spinner.
 */
export const CustomSpinner: Story = {
  args: {
    isLoading: true,
    children: 'Submitting...',
    spinner: (
      <svg
        className="animate-spin mr-2 h-4 w-4 text-current"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
      >
        <circle
          className="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth="4"
        ></circle>
        <path
          className="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8v8H4z"
        ></path>
      </svg>
    ),
  },
};

/**
 * Showcase of various GlassButton usages.
 */
export const Showcase: Story = {
  render: () => (
    <div className="space-y-6">
      {/* Variants */}
      <div className="space-x-4">
        <GlassButton variant="solid" color="primary">
          Primary Solid
        </GlassButton>
        <GlassButton variant="outline" color="secondary">
          Secondary Outline
        </GlassButton>
        <GlassButton variant="text" color="accent">
          Accent Text
        </GlassButton>
      </div>

      {/* Sizes */}
      <div className="space-x-2">
        <GlassButton size="xs">XS</GlassButton>
        <GlassButton size="sm">SM</GlassButton>
        <GlassButton size="md">MD</GlassButton>
        <GlassButton size="lg">LG</GlassButton>
        <GlassButton size="xl">XL</GlassButton>
      </div>

      {/* Rounded Corners */}
      <div className="space-x-2">
        <GlassButton rounded="none">No Rounding</GlassButton>
        <GlassButton rounded="sm">Small Round</GlassButton>
        <GlassButton rounded="md">Medium Round</GlassButton>
        <GlassButton rounded="lg">Large Round</GlassButton>
        <GlassButton rounded="full">Full Round</GlassButton>
      </div>

      {/* Loading and Disabled */}
      <div className="space-x-4">
        <GlassButton isLoading color="blue">
          Loading...
        </GlassButton>
        <GlassButton disabled color="red">
          Disabled
        </GlassButton>
      </div>

      {/* Full Width */}
      <div>
        <GlassButton fullWidth color="green">
          Full Width Button
        </GlassButton>
      </div>

      {/* Focusable */}
      <div>
        <GlassButton focusable color="purple">
          Focusable Button
        </GlassButton>
      </div>

      {/* With Icons */}
      <div className="space-x-4">
        <GlassButton leftIcon={<FaBeer />} color="blue">
          Left Icon
        </GlassButton>
        <GlassButton rightIcon={<FaCoffee />} color="red">
          Right Icon
        </GlassButton>
        <GlassButton
          leftIcon={<FaBeer />}
          rightIcon={<FaCoffee />}
          color="green"
        >
          Both Icons
        </GlassButton>
        <GlassButton leftIcon={<FaRocket />} variant="outline" color="purple">
          Outline with Icon
        </GlassButton>
      </div>

      {/* Custom ClassName and Spinner */}
      <div className="space-x-4">
        <GlassButton className="bg-yellow-500 hover:bg-yellow-600 text-black">
          Custom Styled
        </GlassButton>
        <GlassButton
          isLoading
          spinner={
            <svg
              className="animate-spin mr-2 h-4 w-4 text-current"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8v8H4z"
              ></path>
            </svg>
          }
          color="accent"
        >
          Custom Spinner
        </GlassButton>
      </div>

      {/* Button with Ref */}
      <div>
        <GlassButton ref={useRef<HTMLButtonElement>(null)}>
          Button with Ref
        </GlassButton>
      </div>
    </div>
  ),
};
