// src/components/Typography/AccessibleText.stories.tsx

import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import AccessibleText, { AccessibleTextProps } from './AccessibleText';
import { AppProvider } from '@/providers/app';

const meta: Meta<typeof AccessibleText> = {
  title: 'Typography/AccessibleText',
  component: AccessibleText,
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
    children: 'Sample AccessibleText Content',
    ariaLabel: '',
    role: '',
    tabIndex: undefined,
    focusable: false,
    className: '',
  },
  argTypes: {
    children: {
      control: 'text',
      description: 'Content to display within the AccessibleText component.',
      table: {
        type: { summary: 'React.ReactNode' },
        defaultValue: { summary: 'Sample AccessibleText Content' },
      },
    },
    ariaLabel: {
      control: 'text',
      description: 'ARIA label for the text, enhancing accessibility.',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: '""' },
      },
    },
    role: {
      control: 'text',
      description:
        'ARIA role for the text, defining its purpose to assistive technologies.',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: '""' },
      },
    },
    tabIndex: {
      control: {
        type: 'number',
      },
      description:
        'Tab index for keyboard navigation. Use 0 to make the element focusable.',
      table: {
        type: { summary: 'number | undefined' },
        defaultValue: { summary: 'undefined' },
      },
    },
    focusable: {
      control: 'boolean',
      description:
        'If true, sets tabIndex to 0, making the text focusable via keyboard.',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
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
type Story = StoryObj<AccessibleTextProps>;

/**
 * Default AccessibleText story demonstrating basic usage without ARIA attributes.
 */
export const Default: Story = {
  args: {
    children:
      'This is an AccessibleText component without additional ARIA attributes.',
  },
};

/**
 * AccessibleText with ARIA Label.
 */
export const WithAriaLabel: Story = {
  args: {
    children: 'This AccessibleText has an ARIA label.',
    ariaLabel: 'Descriptive ARIA label for assistive technologies.',
  },
};

/**
 * AccessibleText with ARIA Role.
 */
export const WithAriaRole: Story = {
  args: {
    children: 'This AccessibleText has an ARIA role.',
    role: 'status',
  },
};

/**
 * Focusable AccessibleText.
 */
export const Focusable: Story = {
  args: {
    children: 'This AccessibleText is focusable via keyboard navigation.',
    focusable: true,
  },
};

/**
 * AccessibleText with Tab Index.
 */
export const WithTabIndex: Story = {
  args: {
    children: 'This AccessibleText has a tabIndex of 0.',
    tabIndex: 0,
  },
};

/**
 * AccessibleText with ARIA Label and Role.
 */
export const WithAriaLabelAndRole: Story = {
  args: {
    children: 'This AccessibleText has both an ARIA label and role.',
    ariaLabel: 'Announcement for assistive technologies.',
    role: 'alert',
  },
};

/**
 * AccessibleText with Custom ClassName.
 */
export const CustomClassName: Story = {
  args: {
    children:
      'This AccessibleText has additional custom styling via className.',
    className: 'bg-yellow-100 p-2 rounded',
  },
};

/**
 * Combined Props Example.
 * Demonstrates multiple props applied together for enhanced accessibility and styling.
 */
export const CombinedProps: Story = {
  args: {
    children:
      'This AccessibleText combines multiple properties: ARIA label, role, focusable, and custom styling.',
    ariaLabel: 'Interactive text element for demonstration.',
    role: 'button',
    focusable: true,
    className: 'bg-green-100 p-3 rounded-lg',
  },
};

/**
 * Showcase Story demonstrating multiple AccessibleText usages together.
 */
export const Showcase: Story = {
  render: (args: AccessibleTextProps) => (
    <div className="space-y-6">
      {/* 1) Basic usage: without ARIA attributes */}
      <AccessibleText {...args}>
        This is a basic AccessibleText without ARIA attributes.
      </AccessibleText>

      {/* 2) With ARIA Label */}
      <AccessibleText
        {...args}
        ariaLabel="Descriptive label for screen readers."
      >
        This AccessibleText includes an ARIA label.
      </AccessibleText>

      {/* 3) With ARIA Role */}
      <AccessibleText {...args} role="status">
        This AccessibleText includes an ARIA role.
      </AccessibleText>

      {/* 4) Focusable AccessibleText */}
      <AccessibleText {...args} focusable>
        This AccessibleText is focusable via keyboard.
      </AccessibleText>

      {/* 5) With TabIndex */}
      <AccessibleText {...args} tabIndex={0}>
        This AccessibleText has a tabIndex of 0.
      </AccessibleText>

      {/* 6) With ARIA Label and Role */}
      <AccessibleText
        {...args}
        ariaLabel="Alert message for assistive technologies."
        role="alert"
      >
        This AccessibleText has both ARIA label and role.
      </AccessibleText>

      {/* 7) With Custom ClassName */}
      <AccessibleText {...args} className="bg-blue-100 p-4 rounded-md">
        This AccessibleText has custom background and padding.
      </AccessibleText>

      {/* 8) Combined Props */}
      <AccessibleText
        {...args}
        ariaLabel="Interactive button text."
        role="button"
        focusable
        className="bg-purple-100 p-2 rounded-full"
      >
        This AccessibleText combines multiple properties.
      </AccessibleText>
    </div>
  ),
};
