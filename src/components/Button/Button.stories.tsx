// src/components/Button/Button.stories.tsx

import React, { useRef, useEffect } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import Button from './Button';
import { FaBeer, FaCoffee } from 'react-icons/fa';

const meta: Meta<typeof Button> = {
  title: 'Elements/Button/Button',
  component: Button,
  decorators: [
    (Story) => (
      <div className="p-4 space-y-4">
        <Story />
      </div>
    ),
  ],
  args: {
    children: 'Button',
    variant: 'solid',
    color: 'primary',
    size: 'md',
    rounded: 'md',
    isLoading: false,
    fullWidth: false,
    focusable: false,
    spinner: null,
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
    spinner: {
      control: false,
      description: 'Custom spinner element to display when loading.',
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
type Story = StoryObj<typeof Button>;

/**
 * Default Button story.
 */
export const Default: Story = {
  args: {
    children: 'Default Button',
  },
};

/**
 * Variants of the Button with different colors.
 */
export const Variants: Story = {
  render: () => (
    <div className="space-x-4">
      <Button variant="solid" color="primary">
        Primary Solid
      </Button>
      <Button variant="outline" color="secondary">
        Secondary Outline
      </Button>
      <Button variant="text" color="accent">
        Accent Text
      </Button>
      <Button variant="solid" color="blue">
        Blue Solid
      </Button>
      <Button variant="outline" color="red">
        Red Outline
      </Button>
      <Button variant="text" color="green">
        Green Text
      </Button>
      <Button variant="solid" color="purple">
        Purple Solid
      </Button>
      <Button variant="outline" color="foreground">
        Foreground Outline
      </Button>
      <Button variant="text" color="background">
        Background Text
      </Button>
    </div>
  ),
};

/**
 * Different Sizes of the Button.
 */
export const Sizes: Story = {
  render: () => (
    <div className="space-x-2">
      <Button size="xs">Extra Small</Button>
      <Button size="sm">Small</Button>
      <Button size="md">Medium</Button>
      <Button size="lg">Large</Button>
      <Button size="xl">Extra Large</Button>
    </div>
  ),
};

/**
 * Rounded Corners.
 */
export const Rounded: Story = {
  render: () => (
    <div className="space-x-2">
      <Button rounded="none">No Rounding</Button>
      <Button rounded="sm">Small Round</Button>
      <Button rounded="md">Medium Round</Button>
      <Button rounded="lg">Large Round</Button>
      <Button rounded="full">Full Round</Button>
    </div>
  ),
};

/**
 * Loading State.
 */
export const Loading: Story = {
  args: {
    isLoading: true,
    children: 'Loading...',
  },
};

/**
 * Full Width Button.
 */
export const FullWidth: Story = {
  args: {
    fullWidth: true,
    children: 'Full Width Button',
  },
};

/**
 * Focusable Button.
 */
export const Focusable: Story = {
  args: {
    focusable: true,
    children: 'Focusable Button',
  },
};

/**
 * Button with Icons.
 */
export const WithIcons: Story = {
  render: () => (
    <div className="space-x-4">
      <Button leftIcon={<FaBeer />} color="blue">
        Left Icon
      </Button>
      <Button rightIcon={<FaCoffee />} color="red">
        Right Icon
      </Button>
      <Button leftIcon={<FaBeer />} rightIcon={<FaCoffee />} color="green">
        Both Icons
      </Button>
      <Button leftIcon={<FaBeer />} variant="outline" color="purple">
        Outline with Icon
      </Button>
    </div>
  ),
};

/**
 * Disabled Button.
 */
export const Disabled: Story = {
  args: {
    disabled: true,
    children: 'Disabled Button',
  },
};

/**
 * Button with Custom ClassName.
 */
export const CustomClassName: Story = {
  args: {
    children: 'Custom Styled',
    className: 'bg-yellow-500 hover:bg-yellow-600 text-black',
  },
};

/**
 * Button with Ref.
 */
export const WithRef: Story = {
  render: () => {
    const ref = useRef<HTMLButtonElement>(null);

    useEffect(() => {
      if (ref.current) {
        console.log('Button ref:', ref.current);
      }
    }, []);

    return <Button ref={ref}>Button with Ref</Button>;
  },
};

/**
 * Button with Custom Spinner.
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
 * Showcase of various Button usages.
 */
export const Showcase: Story = {
  render: () => (
    <div className="space-y-4">
      {/* Variants */}
      <div className="space-x-4">
        <Button variant="solid" color="primary">
          Primary Solid
        </Button>
        <Button variant="outline" color="secondary">
          Secondary Outline
        </Button>
        <Button variant="text" color="accent">
          Accent Text
        </Button>
      </div>

      {/* Sizes */}
      <div className="space-x-2">
        <Button size="xs">XS</Button>
        <Button size="sm">SM</Button>
        <Button size="md">MD</Button>
        <Button size="lg">LG</Button>
        <Button size="xl">XL</Button>
      </div>

      {/* Rounded Corners */}
      <div className="space-x-2">
        <Button rounded="none">No Rounding</Button>
        <Button rounded="sm">Small Round</Button>
        <Button rounded="md">Medium Round</Button>
        <Button rounded="lg">Large Round</Button>
        <Button rounded="full">Full Round</Button>
      </div>

      {/* Loading and Disabled */}
      <div className="space-x-4">
        <Button isLoading color="blue">
          Loading...
        </Button>
        <Button disabled color="red">
          Disabled
        </Button>
      </div>

      {/* Full Width */}
      <div>
        <Button fullWidth color="green">
          Full Width Button
        </Button>
      </div>

      {/* Focusable */}
      <div>
        <Button focusable color="purple">
          Focusable Button
        </Button>
      </div>

      {/* With Icons */}
      <div className="space-x-4">
        <Button leftIcon={<FaBeer />} color="blue">
          Left Icon
        </Button>
        <Button rightIcon={<FaCoffee />} color="red">
          Right Icon
        </Button>
        <Button leftIcon={<FaBeer />} rightIcon={<FaCoffee />} color="green">
          Both Icons
        </Button>
        <Button leftIcon={<FaBeer />} variant="outline" color="purple">
          Outline with Icon
        </Button>
      </div>

      {/* Custom ClassName and Spinner */}
      <div className="space-x-4">
        <Button className="bg-yellow-500 hover:bg-yellow-600 text-black">
          Custom Styled
        </Button>
        <Button
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
        </Button>
      </div>

      {/* Button with Ref */}
      <div>
        <Button ref={useRef<HTMLButtonElement>(null)}>Button with Ref</Button>
      </div>
    </div>
  ),
};
