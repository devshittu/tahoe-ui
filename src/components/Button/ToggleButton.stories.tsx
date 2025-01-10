import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import ToggleButton from './ToggleButton';
import { AppProvider } from '@/providers/app'; // Adjust the import path as necessary
import { FaThumbsUp, FaThumbsDown } from 'react-icons/fa';
import { action } from '@storybook/addon-actions';
import clsx from 'clsx';
import { twMerge } from 'tailwind-merge';

const meta: Meta<typeof ToggleButton> = {
  title: 'Elements/Button/ToggleButton',
  component: ToggleButton,
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
    initialToggled: false,
    children: 'Toggle',
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['solid', 'outline', 'text'],
      description: 'Style variant of the button based on toggle state.',
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
      description: 'Color scheme of the button when toggled.',
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
    initialToggled: {
      control: 'boolean',
      description: 'Initial toggle state of the button.',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    onToggle: {
      action: 'toggled',
      description: 'Callback function when toggle state changes.',
      table: {
        type: { summary: '(toggled: boolean) => void' },
        defaultValue: { summary: 'undefined' },
      },
    },
    onClick: {
      action: 'clicked',
      description: 'Callback function when the button is clicked.',
      table: {
        type: { summary: 'MouseEvent<HTMLButtonElement> => void' },
        defaultValue: { summary: 'undefined' },
      },
    },
    // Disable controls for leftIcon and rightIcon as they expect ReactNodes
    leftIcon: {
      control: false,
      description: 'Icon to display on the left side of the button.',
    },
    rightIcon: {
      control: false,
      description: 'Icon to display on the right side of the button.',
    },
    // Disable control for spinner as it expects ReactNode
    spinner: {
      control: false,
      description: 'Custom spinner element to display when loading.',
    },
    // Disable control for children to allow for text content
    children: {
      control: 'text',
      description: 'Content of the button.',
      table: {
        type: { summary: 'React.ReactNode' },
        defaultValue: { summary: 'Toggle' },
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof ToggleButton>;

/**
 * Default ToggleButton story demonstrating basic usage.
 */
export const Default: Story = {};

/**
 * ToggleButton with Initial Toggled State.
 */
export const InitiallyToggled: Story = {
  args: {
    initialToggled: true,
    children: 'Enabled',
  },
};

/**
 * ToggleButton with Custom Color.
 */
export const CustomColor: Story = {
  args: {
    color: 'green',
    children: 'Green Toggle',
  },
};

/**
 * ToggleButton with Left Icon.
 */
export const WithLeftIcon: Story = {
  args: {
    leftIcon: <FaThumbsUp />,
    children: 'Like',
  },
};

/**
 * ToggleButton with Right Icon.
 */
export const WithRightIcon: Story = {
  args: {
    rightIcon: <FaThumbsDown />,
    children: 'Dislike',
  },
};

/**
 * ToggleButton with Both Icons.
 */
export const WithBothIcons: Story = {
  args: {
    leftIcon: <FaThumbsUp />,
    rightIcon: <FaThumbsDown />,
    children: 'Vote',
  },
};

/**
 * ToggleButton in Loading State.
 */
export const LoadingState: Story = {
  args: {
    isLoading: true,
    children: 'Loading...',
  },
};

/**
 * ToggleButton with Full Width.
 */
export const FullWidth: Story = {
  args: {
    fullWidth: true,
    children: 'Full Width Toggle',
  },
};

/**
 * ToggleButton with Combined Props.
 * Demonstrates multiple props applied together for enhanced styling and functionality.
 */
export const CombinedProps: Story = {
  args: {
    variant: 'outline',
    color: 'purple',
    size: 'lg',
    rounded: 'full',
    initialToggled: true,
    onToggle: action('Toggle state changed'),
    leftIcon: <FaThumbsUp />,
    rightIcon: <FaThumbsDown />,
    children: 'Combined Toggle',
    className: 'shadow-lg',
  },
};

/**
 * Showcase Story demonstrating multiple ToggleButton usages together.
 */
export const Showcase: Story = {
  render: (args) => (
    <div className="space-y-6">
      {/* 1) Default ToggleButton */}
      <ToggleButton {...args}>Default Toggle</ToggleButton>

      {/* 2) Initially Toggled */}
      <ToggleButton {...args} initialToggled>
        Enabled
      </ToggleButton>

      {/* 3) Custom Color */}
      <ToggleButton {...args} color="green">
        Green Toggle
      </ToggleButton>

      {/* 4) With Left Icon */}
      <ToggleButton {...args} leftIcon={<FaThumbsUp />}>
        Like
      </ToggleButton>

      {/* 5) With Right Icon */}
      <ToggleButton {...args} rightIcon={<FaThumbsDown />}>
        Dislike
      </ToggleButton>

      {/* 6) With Both Icons */}
      <ToggleButton
        {...args}
        leftIcon={<FaThumbsUp />}
        rightIcon={<FaThumbsDown />}
      >
        Vote
      </ToggleButton>

      {/* 7) Loading State */}
      <ToggleButton {...args} isLoading>
        Loading...
      </ToggleButton>

      {/* 8) Full Width */}
      <ToggleButton {...args} fullWidth>
        Full Width Toggle
      </ToggleButton>

      {/* 9) Combined Props */}
      <ToggleButton
        {...args}
        variant="outline"
        color="purple"
        size="lg"
        rounded="full"
        initialToggled
        onToggle={action('Toggle state changed')}
        leftIcon={<FaThumbsUp />}
        rightIcon={<FaThumbsDown />}
        className="shadow-lg"
      >
        Combined Toggle
      </ToggleButton>
    </div>
  ),
};

// src/components/Button/ToggleButton.stories.tsx
