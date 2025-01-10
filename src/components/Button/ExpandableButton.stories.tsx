import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import ExpandableButton from './ExpandableButton';
import { AppProvider } from '@/providers/app'; // Adjust the import path as necessary
import { FaChevronDown, FaChevronUp } from 'react-icons/fa'; // Import react-icons
import { twMerge } from 'tailwind-merge';
import clsx from 'clsx';

// Define the meta configuration
const meta: Meta<typeof ExpandableButton> = {
  title: 'Elements/Button/ExpandableButton',
  component: ExpandableButton,
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
    // children: 'Expandable Button', // Removed to nest children
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
    expandedContent: {
      control: false, // Disable control for complex prop
      description: 'Content to display when the button is expanded.',
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
type Story = StoryObj<typeof ExpandableButton>;

/**
 * Default ExpandableButton story demonstrating basic usage.
 */
export const Default: Story = {
  args: {
    expandedContent: (
      <div className="p-4">
        <p>This is the expanded content!</p>
      </div>
    ),
  },
  render: (args) => (
    <ExpandableButton {...args}>Expandable Button</ExpandableButton>
  ),
};

/**
 * ExpandableButton with Loading State.
 */
export const LoadingState: Story = {
  args: {
    expandedContent: (
      <div className="p-4">
        <p>Loading more content...</p>
      </div>
    ),
    isLoading: true,
  },
  render: (args) => (
    <ExpandableButton {...args}>Loading Expandable</ExpandableButton>
  ),
};

/**
 * ExpandableButton with Outline Variant and Custom Color.
 */
export const OutlineVariant: Story = {
  args: {
    variant: 'outline',
    color: 'blue',
    expandedContent: (
      <div className="p-4">
        <p>Additional information in the outline variant.</p>
      </div>
    ),
  },
  render: (args) => (
    <ExpandableButton {...args}>Outline Expandable</ExpandableButton>
  ),
};

/**
 * ExpandableButton with Left Icon.
 */
export const WithLeftIcon: Story = {
  args: {
    leftIcon: <FaChevronDown />,
    expandedContent: (
      <div className="p-4">
        <p>Content with a left icon.</p>
      </div>
    ),
  },
  render: (args) => (
    <ExpandableButton {...args}>Expand with Icon</ExpandableButton>
  ),
};

/**
 * ExpandableButton with Both Icons.
 */
export const WithBothIcons: Story = {
  args: {
    leftIcon: <FaChevronDown />,
    rightIcon: <FaChevronUp />,
    expandedContent: (
      <div className="p-4">
        <p>Content with both left and right icons.</p>
      </div>
    ),
  },
  render: (args) => (
    <ExpandableButton {...args}>Full Icon Expandable</ExpandableButton>
  ),
};

/**
 * ExpandableButton with Combined Props.
 * Demonstrates multiple props applied together for enhanced styling and functionality.
 */
export const CombinedProps: Story = {
  args: {
    variant: 'outline',
    color: 'green',
    size: 'lg',
    rounded: 'full',
    fullWidth: true,
    focusable: true,
    leftIcon: <FaChevronDown />,
    rightIcon: <FaChevronUp />,
    expandedContent: (
      <div className="p-4">
        <p>Combined props expanded content.</p>
      </div>
    ),
    className: 'shadow-lg',
  },
  render: (args) => (
    <ExpandableButton {...args}>Combined Expandable</ExpandableButton>
  ),
};

/**
 * Showcase Story demonstrating multiple ExpandableButton usages together.
 */
export const Showcase: Story = {
  render: () => (
    <div className="space-y-6">
      {/* 1) Default ExpandableButton */}
      <ExpandableButton
        expandedContent={
          <div className="p-4">
            <p>This is the expanded content!</p>
          </div>
        }
      >
        Default Expandable
      </ExpandableButton>

      {/* 2) Loading State */}
      <ExpandableButton
        expandedContent={
          <div className="p-4">
            <p>Loading more content...</p>
          </div>
        }
        isLoading
      >
        Loading Expandable
      </ExpandableButton>

      {/* 3) Outline Variant */}
      <ExpandableButton
        variant="outline"
        color="blue"
        expandedContent={
          <div className="p-4">
            <p>Additional information in the outline variant.</p>
          </div>
        }
      >
        Outline Expandable
      </ExpandableButton>

      {/* 4) With Left Icon */}
      <ExpandableButton
        leftIcon={<FaChevronDown />}
        expandedContent={
          <div className="p-4">
            <p>Content with a left icon.</p>
          </div>
        }
      >
        Expand with Icon
      </ExpandableButton>

      {/* 5) With Both Icons */}
      <ExpandableButton
        leftIcon={<FaChevronDown />}
        rightIcon={<FaChevronUp />}
        expandedContent={
          <div className="p-4">
            <p>Content with both left and right icons.</p>
          </div>
        }
      >
        Full Icon Expandable
      </ExpandableButton>

      {/* 6) Combined Props */}
      <ExpandableButton
        variant="outline"
        color="green"
        size="lg"
        rounded="full"
        fullWidth
        focusable
        leftIcon={<FaChevronDown />}
        rightIcon={<FaChevronUp />}
        expandedContent={
          <div className="p-4">
            <p>Combined props expanded content.</p>
          </div>
        }
        className="shadow-lg"
      >
        Combined Expandable
      </ExpandableButton>
    </div>
  ),
};
// src/components/Button/ExpandableButton.stories.tsx
