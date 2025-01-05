// src/components/Typography/ThemedText.stories.tsx

import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import ThemedText, { ThemedTextProps } from './ThemedText';
import { AppProvider } from '@/providers/app';

const meta: Meta<typeof ThemedText> = {
  title: 'Typography/ThemedText',
  component: ThemedText,
  decorators: [
    (Story) => (
      <AppProvider>
        {/* Container with padding and max width for better visualization */}
        <div className="p-4 space-y-6 max-w-xl border border-gray-200 rounded-lg">
          <Story />
        </div>
      </AppProvider>
    ),
  ],
  args: {
    children: 'Sample ThemedText Content',
    theme: 'light',
    variant: '',
    overrideStyles: '',
    className: '',
  },
  argTypes: {
    children: {
      control: 'text',
      description: 'Content to display within the ThemedText component.',
      table: {
        type: { summary: 'React.ReactNode' },
        defaultValue: { summary: 'Sample ThemedText Content' },
      },
    },
    theme: {
      control: 'select',
      options: ['light', 'dark', 'custom'],
      description: 'Theme of the text.',
      table: {
        type: { summary: `'light' | 'dark' | 'custom'` },
        defaultValue: { summary: `'light'` },
      },
    },
    variant: {
      control: 'text',
      description: 'Variant style of the text.',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: '""' },
      },
    },
    overrideStyles: {
      control: 'text',
      description: 'Additional styles to override existing styles.',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: '""' },
      },
    },
    className: {
      control: 'text',
      description: 'Additional CSS classes for custom styling.',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: '""' },
      },
    },
  },
};

export default meta;
type Story = StoryObj<ThemedTextProps>;

/**
 * Default ThemedText story demonstrating basic usage with light theme.
 */
export const Default: Story = {
  args: {
    children: 'This is a ThemedText component with light theme.',
    theme: 'light',
  },
};

/**
 * ThemedText with Dark Theme.
 */
export const DarkTheme: Story = {
  args: {
    theme: 'dark',
    children: 'This ThemedText component uses the dark theme.',
  },
};

/**
 * ThemedText with Custom Theme.
 */
export const CustomTheme: Story = {
  args: {
    theme: 'custom',
    children: 'This ThemedText component uses a custom theme.',
  },
};

/**
 * ThemedText with Variant.
 */
export const WithVariant: Story = {
  args: {
    variant: 'uppercase',
    children: 'This ThemedText has a variant applied.',
  },
};

/**
 * ThemedText with Override Styles.
 */
export const WithOverrideStyles: Story = {
  args: {
    overrideStyles: 'border border-red-500',
    children: 'This ThemedText has overridden styles.',
  },
};

/**
 * ThemedText with Custom ClassName.
 */
export const CustomClassName: Story = {
  args: {
    className: 'bg-yellow-100 p-2 rounded',
    children: 'This ThemedText has custom background and padding.',
  },
};

/**
 * Combined Props Example.
 * Demonstrates multiple props applied together for enhanced styling.
 */
export const CombinedProps: Story = {
  args: {
    theme: 'custom',
    variant: 'capitalize',
    overrideStyles: 'border border-purple-500',
    className: 'bg-purple-100 p-3 rounded-lg',
    children:
      'This ThemedText combines multiple properties: custom theme, capitalize variant, overridden border styles, and additional styling.',
  },
};

/**
 * Showcase Story demonstrating multiple ThemedText usages together.
 */
export const Showcase: Story = {
  render: (args: ThemedTextProps) => (
    <div className="space-y-6">
      {/* 1) Default ThemedText */}
      <ThemedText {...args}>This is a default ThemedText component.</ThemedText>

      {/* 2) Dark Theme */}
      <ThemedText {...args} theme="dark">
        This ThemedText component uses the dark theme.
      </ThemedText>

      {/* 3) Custom Theme */}
      <ThemedText {...args} theme="custom">
        This ThemedText component uses a custom theme.
      </ThemedText>

      {/* 4) With Variant */}
      <ThemedText {...args} variant="uppercase">
        This ThemedText has an uppercase variant.
      </ThemedText>

      {/* 5) With Override Styles */}
      <ThemedText {...args} overrideStyles="border border-red-500">
        This ThemedText has overridden border styles.
      </ThemedText>

      {/* 6) With Custom ClassName */}
      <ThemedText {...args} className="bg-blue-100 p-4 rounded-md">
        This ThemedText has custom background and padding.
      </ThemedText>

      {/* 7) Combined Props */}
      <ThemedText
        {...args}
        theme="custom"
        variant="capitalize"
        overrideStyles="border border-purple-500"
        className="bg-purple-100 p-3 rounded-lg"
      >
        This ThemedText combines multiple properties.
      </ThemedText>
    </div>
  ),
};
