// src/components/Button/ToggleButton.stories.tsx

import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import ToggleButton from './ToggleButton';
import { AppProvider } from '@/providers/app';
import { FaThumbsUp, FaThumbsDown } from 'react-icons/fa';
import { action } from '@storybook/addon-actions';

const meta: Meta<typeof ToggleButton> = {
  title: 'Elements/Button/ToggleButton',
  component: ToggleButton,
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
    initialToggled: false,
    children: 'Toggle',
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['solid', 'subtle', 'outline', 'ghost', 'glass'],
      description: 'Style variant of the button based on toggle state.',
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
      description: 'Color scheme of the button when toggled.',
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
    leftIcon: {
      control: false,
      description: 'Icon to display on the left side of the button.',
    },
    rightIcon: {
      control: false,
      description: 'Icon to display on the right side of the button.',
    },
    spinner: {
      control: false,
      description: 'Custom spinner element to display when loading.',
    },
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
    color: 'success',
    children: 'Success Toggle',
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
 */
export const CombinedProps: Story = {
  args: {
    variant: 'outline',
    color: 'secondary',
    size: 'lg',
    radius: 'full',
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
      <ToggleButton {...args}>Default Toggle</ToggleButton>

      <ToggleButton {...args} initialToggled>
        Enabled
      </ToggleButton>

      <ToggleButton {...args} color="success">
        Success Toggle
      </ToggleButton>

      <ToggleButton {...args} leftIcon={<FaThumbsUp />}>
        Like
      </ToggleButton>

      <ToggleButton {...args} rightIcon={<FaThumbsDown />}>
        Dislike
      </ToggleButton>

      <ToggleButton
        {...args}
        leftIcon={<FaThumbsUp />}
        rightIcon={<FaThumbsDown />}
      >
        Vote
      </ToggleButton>

      <ToggleButton {...args} isLoading>
        Loading...
      </ToggleButton>

      <ToggleButton {...args} fullWidth>
        Full Width Toggle
      </ToggleButton>

      <ToggleButton
        {...args}
        variant="outline"
        color="secondary"
        size="lg"
        radius="full"
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
