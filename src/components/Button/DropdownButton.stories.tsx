import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import DropdownButton from './DropdownButton';
import { AppProvider } from '@/providers/app'; // Adjust the import path as necessary
import { FaChevronDown, FaEdit, FaTrash, FaUser } from 'react-icons/fa'; // Import react-icons
import { twMerge } from 'tailwind-merge';
import clsx from 'clsx';

// Define the meta configuration
const meta: Meta<typeof DropdownButton> = {
  title: 'Elements/Button/DropdownButton',
  component: DropdownButton,
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
    // children: 'Dropdown Button', // Removed to nest children
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
    menuItems: {
      control: false, // Disable control for complex prop
      description: 'Array of menu items with labels and click handlers.',
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
type Story = StoryObj<typeof DropdownButton>;

/**
 * Default DropdownButton story demonstrating basic usage.
 */
export const Default: Story = {
  args: {
    // Define default menuItems
    menuItems: [
      { label: 'Profile', onClick: () => alert('Profile clicked') },
      { label: 'Settings', onClick: () => alert('Settings clicked') },
      { label: 'Logout', onClick: () => alert('Logout clicked') },
    ],
  },
  render: (args) => <DropdownButton {...args}>Dropdown Button</DropdownButton>,
};

/**
 * DropdownButton with Loading State.
 */
export const LoadingState: Story = {
  args: {
    menuItems: [
      { label: 'Profile', onClick: () => alert('Profile clicked') },
      { label: 'Settings', onClick: () => alert('Settings clicked') },
      { label: 'Logout', onClick: () => alert('Logout clicked') },
    ],
    isLoading: true,
  },
  render: (args) => <DropdownButton {...args}>Loading Dropdown</DropdownButton>,
};

/**
 * DropdownButton with Outline Variant and Custom Color.
 */
export const OutlineVariant: Story = {
  args: {
    variant: 'outline',
    color: 'blue',
    menuItems: [
      { label: 'Dashboard', onClick: () => alert('Dashboard clicked') },
      { label: 'Reports', onClick: () => alert('Reports clicked') },
      { label: 'Analytics', onClick: () => alert('Analytics clicked') },
    ],
  },
  render: (args) => <DropdownButton {...args}>Outline Dropdown</DropdownButton>,
};

/**
 * DropdownButton with Left Icon.
 */
export const WithLeftIcon: Story = {
  args: {
    leftIcon: <FaUser />,
    menuItems: [
      { label: 'Profile', onClick: () => alert('Profile clicked') },
      { label: 'Settings', onClick: () => alert('Settings clicked') },
      { label: 'Logout', onClick: () => alert('Logout clicked') },
    ],
  },
  render: (args) => <DropdownButton {...args}>User Menu</DropdownButton>,
};

/**
 * DropdownButton with Both Icons.
 */
export const WithBothIcons: Story = {
  args: {
    leftIcon: <FaUser />,
    rightIcon: <FaChevronDown />,
    menuItems: [
      { label: 'Profile', onClick: () => alert('Profile clicked') },
      { label: 'Settings', onClick: () => alert('Settings clicked') },
      { label: 'Logout', onClick: () => alert('Logout clicked') },
    ],
  },
  render: (args) => <DropdownButton {...args}>User Menu</DropdownButton>,
};

/**
 * DropdownButton with Combined Props.
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
    leftIcon: <FaUser />,
    rightIcon: <FaChevronDown />,
    menuItems: [
      { label: 'Profile', onClick: () => alert('Profile clicked') },
      { label: 'Settings', onClick: () => alert('Settings clicked') },
      { label: 'Logout', onClick: () => alert('Logout clicked') },
    ],
    className: 'shadow-lg',
  },
  render: (args) => (
    <DropdownButton {...args}>Combined Dropdown</DropdownButton>
  ),
};

/**
 * Showcase Story demonstrating multiple DropdownButton usages together.
 */
export const Showcase: Story = {
  render: () => (
    <div className="space-y-6">
      {/* 1) Default DropdownButton */}
      <DropdownButton
        menuItems={[
          { label: 'Profile', onClick: () => alert('Profile clicked') },
          { label: 'Settings', onClick: () => alert('Settings clicked') },
          { label: 'Logout', onClick: () => alert('Logout clicked') },
        ]}
      >
        Default Dropdown
      </DropdownButton>

      {/* 2) Loading State */}
      <DropdownButton
        menuItems={[
          { label: 'Profile', onClick: () => alert('Profile clicked') },
          { label: 'Settings', onClick: () => alert('Settings clicked') },
          { label: 'Logout', onClick: () => alert('Logout clicked') },
        ]}
        isLoading
      >
        Loading Dropdown
      </DropdownButton>

      {/* 3) Outline Variant */}
      <DropdownButton
        variant="outline"
        color="blue"
        menuItems={[
          { label: 'Dashboard', onClick: () => alert('Dashboard clicked') },
          { label: 'Reports', onClick: () => alert('Reports clicked') },
          { label: 'Analytics', onClick: () => alert('Analytics clicked') },
        ]}
      >
        Outline Dropdown
      </DropdownButton>

      {/* 4) With Left Icon */}
      <DropdownButton
        leftIcon={<FaUser />}
        menuItems={[
          { label: 'Profile', onClick: () => alert('Profile clicked') },
          { label: 'Settings', onClick: () => alert('Settings clicked') },
          { label: 'Logout', onClick: () => alert('Logout clicked') },
        ]}
      >
        User Menu
      </DropdownButton>

      {/* 5) With Both Icons */}
      <DropdownButton
        leftIcon={<FaUser />}
        rightIcon={<FaChevronDown />}
        menuItems={[
          { label: 'Profile', onClick: () => alert('Profile clicked') },
          { label: 'Settings', onClick: () => alert('Settings clicked') },
          { label: 'Logout', onClick: () => alert('Logout clicked') },
        ]}
      >
        User Menu
      </DropdownButton>

      {/* 6) Combined Props */}
      <DropdownButton
        variant="outline"
        color="green"
        size="lg"
        rounded="full"
        fullWidth
        focusable
        leftIcon={<FaUser />}
        rightIcon={<FaChevronDown />}
        className="shadow-lg"
        menuItems={[
          { label: 'Profile', onClick: () => alert('Profile clicked') },
          { label: 'Settings', onClick: () => alert('Settings clicked') },
          { label: 'Logout', onClick: () => alert('Logout clicked') },
        ]}
      >
        Combined Dropdown
      </DropdownButton>
    </div>
  ),
};

// src/components/Button/DropdownButton.stories.tsx
