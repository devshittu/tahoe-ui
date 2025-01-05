// src/components/Typography/Heading.stories.tsx

import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import Heading, { HeadingProps } from './Heading';
import { AppProvider } from '@/providers/app';

const meta: Meta<typeof Heading> = {
  title: 'Typography/Heading',
  component: Heading,
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
    children: 'Sample Heading',
    level: 1,
    size: 'xl',
    weight: 'bold',
    color: 'primary',
    align: 'left',
    margin: 'my-4',
    truncate: false,
  },
  argTypes: {
    children: {
      control: 'text',
      description: 'Content to display within the Heading component.',
      table: {
        type: { summary: 'React.ReactNode' },
        defaultValue: { summary: 'Sample Heading' },
      },
    },
    level: {
      control: 'number',
      options: [1, 2, 3, 4, 5, 6],
      description: 'Heading level (h1 to h6).',
      table: {
        type: { summary: '1 | 2 | 3 | 4 | 5 | 6' },
        defaultValue: { summary: '1' },
      },
    },
    size: {
      control: 'select',
      options: ['xl', 'lg', 'md', 'sm'],
      description: 'Size of the heading.',
      table: {
        type: { summary: `'xl' | 'lg' | 'md' | 'sm'` },
        defaultValue: { summary: `'xl'` },
      },
    },
    weight: {
      control: 'select',
      options: ['light', 'regular', 'bold', 'extrabold'],
      description: 'Font weight.',
      table: {
        type: { summary: `'light' | 'regular' | 'bold' | 'extrabold'` },
        defaultValue: { summary: `'bold'` },
      },
    },
    color: {
      control: 'select',
      options: [
        'primary',
        'secondary',
        'accent',
        'green',
        'red',
        'yellow',
        'purple',
      ],
      description:
        'Text color. Can be one of the predefined options or any valid CSS color string.',
      table: {
        type: { summary: `'primary' | 'secondary' | 'accent' | string` },
        defaultValue: { summary: `'primary'` },
      },
    },
    align: {
      control: 'select',
      options: ['left', 'center', 'right', 'justify'],
      description: 'Text alignment.',
      table: {
        type: { summary: `'left' | 'center' | 'right' | 'justify'` },
        defaultValue: { summary: `'left'` },
      },
    },
    margin: {
      control: 'text',
      description: 'Margin classes for the component. Default is "my-4".',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: '"my-4"' },
      },
    },
    truncate: {
      control: 'boolean',
      description:
        'If true, truncates the text with an ellipsis if it exceeds the container width.',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
  },
};

export default meta;
type Story = StoryObj<HeadingProps>;

/**
 * Default Heading story demonstrating basic usage.
 */
export const Default: Story = {
  args: {
    children: 'This is a default Heading component.',
  },
};

/**
 * Heading Level 2.
 */
export const Level2: Story = {
  args: {
    level: 2,
    children: 'This is a Heading level 2 (h2).',
  },
};

/**
 * Heading Level 3.
 */
export const Level3: Story = {
  args: {
    level: 3,
    children: 'This is a Heading level 3 (h3).',
  },
};

/**
 * Heading Size - Large.
 */
export const LargeSize: Story = {
  args: {
    size: 'lg',
    children: 'This Heading has a large size.',
  },
};

/**
 * Heading Size - Medium.
 */
export const MediumSize: Story = {
  args: {
    size: 'md',
    children: 'This Heading has a medium size.',
  },
};

/**
 * Heading Size - Small.
 */
export const SmallSize: Story = {
  args: {
    size: 'sm',
    children: 'This Heading has a small size.',
  },
};

/**
 * Heading with Extra Bold Weight.
 */
export const ExtraBoldWeight: Story = {
  args: {
    weight: 'extrabold',
    children: 'This Heading has an extra bold font weight.',
  },
};

/**
 * Heading with Secondary Color.
 */
export const SecondaryColor: Story = {
  args: {
    color: 'secondary',
    children: 'This Heading has a secondary color.',
  },
};

/**
 * Heading with Custom Color.
 */
export const CustomColor: Story = {
  args: {
    color: '#FF5733',
    children: 'This Heading has a custom color (#FF5733).',
  },
};

/**
 * Center Aligned Heading.
 */
export const CenterAligned: Story = {
  args: {
    align: 'center',
    children: 'This Heading is center-aligned.',
  },
};

/**
 * Justify Aligned Heading.
 */
export const JustifyAligned: Story = {
  args: {
    align: 'justify',
    children:
      'This Heading is justified, making the text align evenly along both the left and right margins.',
  },
};

/**
 * Heading with Custom Margin.
 */
export const CustomMargin: Story = {
  args: {
    margin: 'my-8',
    children: 'This Heading has a larger vertical margin (my-8).',
  },
};

/**
 * Truncated Heading.
 * Demonstrates text truncation when content exceeds container width.
 */
export const Truncated: Story = {
  args: {
    // className: 'max-w-md',
    truncate: true,
    children: undefined,
  },
};

/**
 * Combined Props Example.
 * Demonstrates multiple props applied together for enhanced styling.
 */
export const CombinedProps: Story = {
  args: {
    level: 4,
    size: 'lg',
    weight: 'extrabold',
    color: '#2E86C1',
    align: 'center',
    margin: 'my-10',
    truncate: false,
    children:
      'This Heading combines multiple properties: level 4, large size, extra bold weight, custom color, center alignment, and custom margin.',
  },
};

/**
 * Showcase Story demonstrating multiple Heading usages together.
 */
export const Showcase: Story = {
  render: (args: HeadingProps) => (
    <div className="space-y-6">
      {/* 1) Default Heading */}
      <Heading {...args}>This is a default Heading component.</Heading>

      {/* 2) Level 2 Heading */}
      <Heading {...args} level={2}>
        This is a Heading level 2 (h2).
      </Heading>

      {/* 3) Large Size Heading */}
      <Heading {...args} size="lg">
        This Heading has a large size.
      </Heading>

      {/* 4) Medium Size Heading */}
      <Heading {...args} size="md">
        This Heading has a medium size.
      </Heading>

      {/* 5) Small Size Heading */}
      <Heading {...args} size="sm">
        This Heading has a small size.
      </Heading>

      {/* 6) Extra Bold Weight */}
      <Heading {...args} weight="extrabold">
        This Heading has an extra bold font weight.
      </Heading>

      {/* 7) Secondary Color */}
      <Heading {...args} color="secondary">
        This Heading has a secondary color.
      </Heading>

      {/* 8) Custom Color */}
      <Heading {...args} color="#FF5733">
        This Heading has a custom color (#FF5733).
      </Heading>

      {/* 9) Center Aligned */}
      <Heading {...args} align="center">
        This Heading is center-aligned.
      </Heading>

      {/* 10) Justify Aligned */}
      <Heading {...args} align="justify">
        This Heading is justified, making the text align evenly along both the
        left and right margins.
      </Heading>

      {/* 11) Custom Margin */}
      <Heading {...args} margin="my-8">
        This Heading has a larger vertical margin (my-8).
      </Heading>

      {/* 12) Truncated Heading */}
      <Heading {...args} truncate>
        This is a very long heading that is intended to demonstrate how text
        truncation works when the content exceeds the container width. It should
        truncate with an ellipsis if the truncate prop is enabled.
      </Heading>
      {/* 13) Combined Props */}
      <Heading
        {...args}
        level={3}
        size="lg"
        weight="extrabold"
        color="#2E86C1"
        align="center"
        margin="my-10"
        truncate={false}
      >
        This Heading combines multiple properties: level 3, large size, extra
        bold weight, custom color, center alignment, and custom margin.
      </Heading>
    </div>
  ),
};
