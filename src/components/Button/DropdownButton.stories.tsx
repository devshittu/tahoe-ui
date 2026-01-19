// src/components/Button/DropdownButton.stories.tsx

import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import DropdownButton from './DropdownButton';
import { AppProvider } from '@/providers/app';
import { FaChevronDown, FaUser } from 'react-icons/fa';

const meta: Meta<typeof DropdownButton> = {
  title: 'Elements/Button/DropdownButton',
  component: DropdownButton,
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
    menuItems: {
      control: false,
      description: 'Array of menu items with labels and click handlers.',
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
type Story = StoryObj<typeof DropdownButton>;

/**
 * Default DropdownButton story demonstrating basic usage.
 */
export const Default: Story = {
  args: {
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
    color: 'accent',
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
 */
export const CombinedProps: Story = {
  args: {
    variant: 'outline',
    color: 'success',
    size: 'lg',
    radius: 'full',
    fullWidth: true,
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
      <DropdownButton
        menuItems={[
          { label: 'Profile', onClick: () => alert('Profile clicked') },
          { label: 'Settings', onClick: () => alert('Settings clicked') },
          { label: 'Logout', onClick: () => alert('Logout clicked') },
        ]}
      >
        Default Dropdown
      </DropdownButton>

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

      <DropdownButton
        variant="outline"
        color="accent"
        menuItems={[
          { label: 'Dashboard', onClick: () => alert('Dashboard clicked') },
          { label: 'Reports', onClick: () => alert('Reports clicked') },
          { label: 'Analytics', onClick: () => alert('Analytics clicked') },
        ]}
      >
        Outline Dropdown
      </DropdownButton>

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

      <DropdownButton
        variant="outline"
        color="success"
        size="lg"
        radius="full"
        fullWidth
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
