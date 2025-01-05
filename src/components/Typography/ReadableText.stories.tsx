// src/components/Typography/ReadableText.stories.tsx

import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import ReadableText, { ReadableTextProps } from './ReadableText';
import { AppProvider } from '@/providers/app';

const meta: Meta<typeof ReadableText> = {
  title: 'Typography/ReadableText',
  component: ReadableText,
  decorators: [
    (Story) => (
      <AppProvider>
        {/* Container with padding and max width for better visualization */}
        <div className="p-4 space-y-6 max-w-2xl border border-gray-200 rounded-lg">
          <Story />
        </div>
      </AppProvider>
    ),
  ],
  args: {
    children: 'Sample ReadableText Content',
    fontSize: 'text-base',
    lineHeight: 'leading-relaxed',
    contrast: true,
    fontFamily: 'primary',
    className: '',
  },
  argTypes: {
    children: {
      control: 'text',
      description: 'Content to display within the ReadableText component.',
      table: {
        type: { summary: 'React.ReactNode' },
        defaultValue: { summary: 'Sample ReadableText Content' },
      },
    },
    fontSize: {
      control: 'text',
      description: 'Font size classes to apply.',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: '"text-base"' },
      },
    },
    lineHeight: {
      control: 'select',
      options: [
        'leading-tight',
        'leading-normal',
        'leading-relaxed',
        'leading-loose',
      ],
      description: 'Line height for the text.',
      table: {
        type: {
          summary: `'leading-tight' | 'leading-normal' | 'leading-relaxed' | 'leading-loose'`,
        },
        defaultValue: { summary: `'leading-relaxed'` },
      },
    },
    contrast: {
      control: 'boolean',
      description:
        'If true, applies high contrast text and background for better readability.',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'true' },
      },
    },
    fontFamily: {
      control: 'select',
      options: ['primary', 'secondary', 'mono'],
      description: 'Font family to apply.',
      table: {
        type: { summary: `'primary' | 'secondary' | 'mono'` },
        defaultValue: { summary: `'primary'` },
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
type Story = StoryObj<ReadableTextProps>;

/**
 * Default ReadableText story demonstrating basic usage.
 */
export const Default: Story = {
  args: {
    children: 'This is a ReadableText component with default properties.',
  },
};

/**
 * ReadableText without Contrast.
 */
export const WithoutContrast: Story = {
  args: {
    contrast: false,
    children: 'This ReadableText does not have high contrast.',
  },
};

/**
 * ReadableText with Custom Font Size.
 */
export const CustomFontSize: Story = {
  args: {
    fontSize: 'text-lg',
    children: 'This ReadableText has a larger font size.',
  },
};

/**
 * ReadableText with Tight Line Height.
 */
export const TightLineHeight: Story = {
  args: {
    lineHeight: 'leading-tight',
    children: 'This ReadableText has a tight line height.',
  },
};

/**
 * ReadableText with Loose Line Height.
 */
export const LooseLineHeight: Story = {
  args: {
    lineHeight: 'leading-loose',
    children: 'This ReadableText has a loose line height.',
  },
};

/**
 * ReadableText with Secondary Font Family.
 */
export const SecondaryFontFamily: Story = {
  args: {
    fontFamily: 'secondary',
    children: 'This ReadableText uses the secondary font family.',
  },
};

/**
 * ReadableText with Monospace Font Family.
 */
export const MonospaceFontFamily: Story = {
  args: {
    fontFamily: 'mono',
    children: 'This ReadableText uses the monospace font family.',
  },
};

/**
 * ReadableText with Custom ClassName.
 */
export const CustomClassName: Story = {
  args: {
    className: 'bg-yellow-100 p-2 rounded',
    children: 'This ReadableText has custom background and padding.',
  },
};

/**
 * ReadableText with Custom Color.
 */
export const CustomColor: Story = {
  args: {
    // color: '#FF5733',
    children: 'This ReadableText has a custom color (#FF5733).',
  },
};

/**
 * ReadableText with Combined Props.
 */
export const CombinedProps: Story = {
  args: {
    fontSize: 'text-xl',
    lineHeight: 'leading-loose',
    contrast: false,
    fontFamily: 'mono',
    className: 'bg-blue-100 p-3 rounded-lg',
    // color: '#2E86C1',
    children:
      'This ReadableText combines multiple properties: custom font size, loose line height, no contrast, monospace font family, custom background and padding, and custom color.',
  },
};

/**
 * Showcase Story demonstrating multiple ReadableText usages together.
 */
export const Showcase: Story = {
  render: (args: ReadableTextProps) => (
    <div className="space-y-6">
      {/* 1) Default ReadableText */}
      <ReadableText {...args}>
        This is a default ReadableText component.
      </ReadableText>

      {/* 2) Without Contrast */}
      <ReadableText {...args} contrast={false}>
        This ReadableText does not have high contrast.
      </ReadableText>

      {/* 3) Custom Font Size */}
      <ReadableText {...args} fontSize="text-lg">
        This ReadableText has a larger font size.
      </ReadableText>

      {/* 4) Tight Line Height */}
      <ReadableText {...args} lineHeight="leading-tight">
        This ReadableText has a tight line height.
      </ReadableText>

      {/* 5) Loose Line Height */}
      <ReadableText {...args} lineHeight="leading-loose">
        This ReadableText has a loose line height.
      </ReadableText>

      {/* 6) Secondary Font Family */}
      <ReadableText {...args} fontFamily="secondary">
        This ReadableText uses the secondary font family.
      </ReadableText>

      {/* 7) Monospace Font Family */}
      <ReadableText {...args} fontFamily="mono">
        This ReadableText uses the monospace font family.
      </ReadableText>

      {/* 8) Custom ClassName */}
      <ReadableText {...args} className="bg-yellow-100 p-2 rounded">
        This ReadableText has custom background and padding.
      </ReadableText>

      {/* 9) Custom Color */}
      <ReadableText
        {...args}
        //   color="#FF5733"
      >
        This ReadableText has a custom color (#FF5733).
      </ReadableText>

      {/* 10) Combined Props */}
      <ReadableText
        {...args}
        fontSize="text-xl"
        lineHeight="leading-loose"
        contrast={false}
        fontFamily="mono"
        className="bg-blue-100 p-3 rounded-lg"
        // color="#2E86C1"
      >
        This ReadableText combines multiple properties.
      </ReadableText>
    </div>
  ),
};
