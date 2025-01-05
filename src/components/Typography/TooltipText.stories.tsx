// src/components/Typography/TooltipText.stories.tsx

import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import TooltipText, { TooltipTextProps } from './TooltipText';
import { AppProvider } from '@/providers/app';

const meta: Meta<typeof TooltipText> = {
  title: 'Typography/TooltipText',
  component: TooltipText,
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
    children: 'Hover over me',
    tooltip: 'This is a tooltip.',
    position: 'top',
    delay: 300,
    style: {},
    className: '',
  },
  argTypes: {
    children: {
      control: 'text',
      description: 'Content to display within the TooltipText component.',
      table: {
        type: { summary: 'React.ReactNode' },
        defaultValue: { summary: 'Hover over me' },
      },
    },
    tooltip: {
      control: 'text',
      description: 'Tooltip text to display on hover.',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: '"This is a tooltip."' },
      },
    },
    position: {
      control: 'select',
      options: ['top', 'bottom', 'left', 'right'],
      description: 'Position of the tooltip relative to the text.',
      table: {
        type: { summary: `'top' | 'bottom' | 'left' | 'right'` },
        defaultValue: { summary: `'top'` },
      },
    },
    delay: {
      control: {
        type: 'number',
        min: 0,
        max: 2000,
        step: 100,
      },
      description: 'Delay in milliseconds before the tooltip appears.',
      table: {
        type: { summary: 'number' },
        defaultValue: { summary: '300' },
      },
    },
    style: {
      control: 'object',
      description: 'Inline styles for the tooltip.',
      table: {
        type: { summary: 'React.CSSProperties' },
        defaultValue: { summary: '{}' },
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
type Story = StoryObj<TooltipTextProps>;

/**
 * Default TooltipText story demonstrating basic usage.
 */
export const Default: Story = {
  args: {
    children: 'Hover over me',
    tooltip: 'This is a tooltip.',
  },
};

/**
 * TooltipText Positioned at Bottom.
 */
export const BottomPosition: Story = {
  args: {
    children: 'Hover over me',
    tooltip: 'Tooltip at the bottom.',
    position: 'bottom',
  },
};

/**
 * TooltipText Positioned at Left.
 */
export const LeftPosition: Story = {
  args: {
    children: 'Hover over me',
    tooltip: 'Tooltip at the left.',
    position: 'left',
  },
};

/**
 * TooltipText Positioned at Right.
 */
export const RightPosition: Story = {
  args: {
    children: 'Hover over me',
    tooltip: 'Tooltip at the right.',
    position: 'right',
  },
};

/**
 * TooltipText with Increased Delay.
 */
export const IncreasedDelay: Story = {
  args: {
    children: 'Hover over me',
    tooltip: 'Tooltip with 1000ms delay.',
    delay: 1000,
  },
};

/**
 * TooltipText with Custom Style.
 */
export const CustomStyle: Story = {
  args: {
    children: 'Hover over me',
    tooltip: 'Tooltip with custom styles.',
    style: { backgroundColor: 'blue', color: 'white', fontSize: '12px' },
  },
};

/**
 * TooltipText with Custom ClassName.
 */
export const CustomClassName: Story = {
  args: {
    children: 'Hover over me',
    tooltip: 'Tooltip with custom className.',
    className: 'rounded-md shadow-lg',
  },
};

/**
 * TooltipText with Combined Props.
 */
export const CombinedProps: Story = {
  args: {
    children: 'Hover over me',
    tooltip: 'Tooltip with custom position, delay, and styling.',
    position: 'right',
    delay: 500,
    style: { backgroundColor: '#2E86C1', color: 'white', fontWeight: 'bold' },
    className: 'rounded-full p-1',
  },
};

/**
 * Showcase Story demonstrating multiple TooltipText usages together.
 */
export const Showcase: Story = {
  render: (args: TooltipTextProps) => (
    <div className="space-y-6">
      {/* 1) Default TooltipText */}
      <TooltipText {...args}>Hover over me</TooltipText>

      {/* 2) Tooltip at Bottom */}
      <TooltipText {...args} position="bottom" tooltip="Tooltip at the bottom.">
        Hover over me
      </TooltipText>

      {/* 3) Tooltip at Left */}
      <TooltipText {...args} position="left" tooltip="Tooltip at the left.">
        Hover over me
      </TooltipText>

      {/* 4) Tooltip at Right */}
      <TooltipText {...args} position="right" tooltip="Tooltip at the right.">
        Hover over me
      </TooltipText>

      {/* 5) Increased Delay */}
      <TooltipText {...args} delay={1000} tooltip="Tooltip with 1000ms delay.">
        Hover over me
      </TooltipText>

      {/* 6) Custom Style */}
      <TooltipText
        {...args}
        style={{ backgroundColor: 'blue', color: 'white', fontSize: '12px' }}
        tooltip="Tooltip with custom styles."
      >
        Hover over me
      </TooltipText>

      {/* 7) Custom ClassName */}
      <TooltipText
        {...args}
        className="rounded-md shadow-lg"
        tooltip="Tooltip with custom className."
      >
        Hover over me
      </TooltipText>

      {/* 8) Combined Props */}
      <TooltipText
        {...args}
        position="right"
        delay={500}
        style={{
          backgroundColor: '#2E86C1',
          color: 'white',
          fontWeight: 'bold',
        }}
        className="rounded-full p-1"
        tooltip="Tooltip with custom position, delay, and styling."
      >
        Hover over me
      </TooltipText>
    </div>
  ),
};
