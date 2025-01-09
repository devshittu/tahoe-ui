// src/components/Button/IconButton.stories.tsx

import React, { useRef, useEffect } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import IconButton from './IconButton';
import {
  FaBeer,
  FaCoffee,
  FaTrash,
  FaEdit,
  FaInfoCircle,
} from 'react-icons/fa';

const meta: Meta<typeof IconButton> = {
  title: 'Elements/Button/IconButton',
  component: IconButton,
  decorators: [
    (Story) => (
      <div className="p-4 space-y-4 bg-gray-100 min-h-screen flex items-center justify-center">
        <Story />
      </div>
    ),
  ],
  args: {
    ariaLabel: 'Icon Button',
    icon: <FaBeer />,
    iconPosition: 'left',
    variant: 'solid',
    color: 'primary',
    size: 'md',
    rounded: 'full',
    isLoading: false,
    fullWidth: false,
    focusable: false,
    spinner: null,
    disabled: false,
    className: '',
    onClick: undefined,
  },
  argTypes: {
    ariaLabel: {
      control: 'text',
      description: 'Accessible label for the button.',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'Icon Button' },
      },
    },
    icon: {
      control: false,
      description: 'Icon to display within the button.',
    },
    iconPosition: {
      control: 'radio',
      options: ['left', 'right'],
      description: 'Position of the icon within the button.',
      table: {
        type: { summary: `'left' | 'right'` },
        defaultValue: { summary: `'left'` },
      },
    },
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
        defaultValue: { summary: `'full'` },
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
    spinner: {
      control: false,
      description: 'Custom spinner element to display when loading.',
    },
  },
};

export default meta;
type Story = StoryObj<typeof IconButton>;

/**
 * Default IconButton story.
 */
export const Default: Story = {
  args: {
    ariaLabel: 'Default Icon Button',
    icon: <FaBeer />,
  },
};

/**
 * Variants of the IconButton with different colors.
 */
export const Variants: Story = {
  render: () => (
    <div className="space-x-4">
      <IconButton
        variant="solid"
        color="primary"
        ariaLabel="Primary Solid"
        icon={<FaBeer />}
      />
      <IconButton
        variant="outline"
        color="secondary"
        ariaLabel="Secondary Outline"
        icon={<FaCoffee />}
      />
      <IconButton
        variant="text"
        color="accent"
        ariaLabel="Accent Text"
        icon={<FaTrash />}
      />
      <IconButton
        variant="solid"
        color="blue"
        ariaLabel="Blue Solid"
        icon={<FaEdit />}
      />
      <IconButton
        variant="outline"
        color="red"
        ariaLabel="Red Outline"
        icon={<FaInfoCircle />}
      />
    </div>
  ),
};

/**
 * Different Sizes of the IconButton.
 */
export const Sizes: Story = {
  render: () => (
    <div className="space-x-2">
      <IconButton size="xs" ariaLabel="Extra Small" icon={<FaBeer />} />
      <IconButton size="sm" ariaLabel="Small" icon={<FaCoffee />} />
      <IconButton size="md" ariaLabel="Medium" icon={<FaTrash />} />
      <IconButton size="lg" ariaLabel="Large" icon={<FaEdit />} />
      <IconButton size="xl" ariaLabel="Extra Large" icon={<FaInfoCircle />} />
    </div>
  ),
};

/**
 * IconButton with Different Icon Positions.
 */
export const IconPositions: Story = {
  render: () => (
    <div className="space-x-4">
      <IconButton iconPosition="left" ariaLabel="Left Icon" icon={<FaBeer />} />
      <IconButton
        iconPosition="right"
        ariaLabel="Right Icon"
        icon={<FaCoffee />}
      />
    </div>
  ),
};

/**
 * Loading State of the IconButton.
 */
export const Loading: Story = {
  args: {
    isLoading: true,
    ariaLabel: 'Loading Icon Button',
    icon: <FaBeer />,
  },
};

/**
 * Full Width IconButton.
 */
export const FullWidth: Story = {
  args: {
    fullWidth: true,
    ariaLabel: 'Full Width Icon Button',
    icon: <FaTrash />,
  },
};

/**
 * Focusable IconButton.
 */
export const Focusable: Story = {
  args: {
    focusable: true,
    ariaLabel: 'Focusable Icon Button',
    icon: <FaEdit />,
  },
};

/**
 * IconButton with Icons.
 * Note: IconButton is designed for single icons. Including multiple icons can affect accessibility.
 * However, for demonstration purposes, we'll show how it handles multiple icons by passing a fragment.
 */
export const WithIcons: Story = {
  render: () => (
    <div className="space-x-4">
      {/* Single Icon */}
      <IconButton ariaLabel="Beer Icon" icon={<FaBeer />} />

      {/* Multiple Icons - Not typical for IconButton, but shown here for flexibility */}
      <IconButton
        ariaLabel="Beer and Coffee Icons"
        icon={
          <>
            <FaBeer />
            <FaCoffee />
          </>
        }
      />
    </div>
  ),
};

/**
 * Disabled IconButton.
 */
export const Disabled: Story = {
  args: {
    disabled: true,
    ariaLabel: 'Disabled Icon Button',
    icon: <FaTrash />,
  },
};

/**
 * IconButton with Custom ClassName.
 */
export const CustomClassName: Story = {
  args: {
    ariaLabel: 'Custom Styled Icon Button',
    icon: <FaEdit />,
    className: 'bg-yellow-500 hover:bg-yellow-600 text-black',
  },
};

/**
 * IconButton with Ref.
 */
export const WithRef: Story = {
  render: () => {
    const ref = useRef<HTMLButtonElement>(null);

    useEffect(() => {
      if (ref.current) {
        console.log('IconButton ref:', ref.current);
      }
    }, []);

    return (
      <IconButton
        ref={ref}
        ariaLabel="Button with Ref"
        icon={<FaInfoCircle />}
      />
    );
  },
};

/**
 * IconButton with Custom Spinner.
 */
export const CustomSpinner: Story = {
  args: {
    isLoading: true,
    ariaLabel: 'Custom Spinner Icon Button',
    icon: <FaBeer />,
    spinner: (
      <svg
        className="animate-spin h-5 w-5 text-current"
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
 * Showcase of various IconButton usages.
 */
export const Showcase: Story = {
  render: () => (
    <div className="space-y-6">
      {/* Variants and Colors */}
      <div className="space-x-4">
        <IconButton
          variant="solid"
          color="primary"
          ariaLabel="Primary Solid"
          icon={<FaBeer />}
        />
        <IconButton
          variant="outline"
          color="secondary"
          ariaLabel="Secondary Outline"
          icon={<FaCoffee />}
        />
        <IconButton
          variant="text"
          color="accent"
          ariaLabel="Accent Text"
          icon={<FaTrash />}
        />
        <IconButton
          variant="solid"
          color="blue"
          ariaLabel="Blue Solid"
          icon={<FaEdit />}
        />
        <IconButton
          variant="outline"
          color="red"
          ariaLabel="Red Outline"
          icon={<FaInfoCircle />}
        />
      </div>

      {/* Sizes */}
      <div className="space-x-2">
        <IconButton size="xs" ariaLabel="Extra Small" icon={<FaBeer />} />
        <IconButton size="sm" ariaLabel="Small" icon={<FaCoffee />} />
        <IconButton size="md" ariaLabel="Medium" icon={<FaTrash />} />
        <IconButton size="lg" ariaLabel="Large" icon={<FaEdit />} />
        <IconButton size="xl" ariaLabel="Extra Large" icon={<FaInfoCircle />} />
      </div>

      {/* Icon Positions */}
      <div className="space-x-4">
        <IconButton
          iconPosition="left"
          ariaLabel="Left Icon"
          icon={<FaBeer />}
        />
        <IconButton
          iconPosition="right"
          ariaLabel="Right Icon"
          icon={<FaCoffee />}
        />
      </div>

      {/* Loading and Disabled */}
      <div className="space-x-4">
        <IconButton
          isLoading
          color="blue"
          ariaLabel="Loading Icon Button"
          icon={<FaBeer />}
        />
        <IconButton
          disabled
          color="red"
          ariaLabel="Disabled Icon Button"
          icon={<FaTrash />}
        />
      </div>

      {/* Full Width */}
      <div>
        <IconButton
          fullWidth
          color="green"
          ariaLabel="Full Width Icon Button"
          icon={<FaEdit />}
        />
      </div>

      {/* Focusable */}
      <div>
        <IconButton
          focusable
          color="purple"
          ariaLabel="Focusable Icon Button"
          icon={<FaInfoCircle />}
        />
      </div>

      {/* With Icons */}
      <div className="space-x-4">
        {/* Single Icon */}
        <IconButton ariaLabel="Beer Icon" icon={<FaBeer />} />

        {/* Multiple Icons - Not typical for IconButton, but shown here for flexibility */}
        <IconButton
          ariaLabel="Beer and Coffee Icons"
          icon={
            <>
              <FaBeer />
              <FaCoffee />
            </>
          }
        />
      </div>

      {/* Custom ClassName and Spinner */}
      <div className="space-x-4">
        <IconButton
          className="bg-yellow-500 hover:bg-yellow-600 text-black"
          ariaLabel="Custom Styled Icon Button"
          icon={<FaEdit />}
        />
        <IconButton
          isLoading
          spinner={
            <svg
              className="animate-spin h-5 w-5 text-current"
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
          ariaLabel="Custom Spinner Icon Button"
          icon={<FaBeer />}
        />
      </div>

      {/* Button with Ref */}
      <div>
        <IconButton
          ref={useRef<HTMLButtonElement>(null)}
          ariaLabel="Button with Ref"
          icon={<FaInfoCircle />}
        />
      </div>
    </div>
  ),
};
