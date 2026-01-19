// src/components/Button/ExpandableButton.stories.tsx

import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import ExpandableButton from './ExpandableButton';
import { AppProvider } from '@/providers/app';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';

const meta: Meta<typeof ExpandableButton> = {
  title: 'Elements/Button/ExpandableButton',
  component: ExpandableButton,
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
    expandedContent: {
      control: false,
      description: 'Content to display when the button is expanded.',
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
    color: 'accent',
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
 */
export const CombinedProps: Story = {
  args: {
    variant: 'outline',
    color: 'success',
    size: 'lg',
    radius: 'full',
    fullWidth: true,
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
      <ExpandableButton
        expandedContent={
          <div className="p-4">
            <p>This is the expanded content!</p>
          </div>
        }
      >
        Default Expandable
      </ExpandableButton>

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

      <ExpandableButton
        variant="outline"
        color="accent"
        expandedContent={
          <div className="p-4">
            <p>Additional information in the outline variant.</p>
          </div>
        }
      >
        Outline Expandable
      </ExpandableButton>

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

      <ExpandableButton
        variant="outline"
        color="success"
        size="lg"
        radius="full"
        fullWidth
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
