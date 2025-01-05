// src/components/Typography/ResponsiveText.stories.tsx

import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import ResponsiveText, { ResponsiveTextProps } from './ResponsiveText';
import { AppProvider } from '@/providers/app';

const meta: Meta<typeof ResponsiveText> = {
  title: 'Typography/ResponsiveText',
  component: ResponsiveText,
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
    children: 'Sample ResponsiveText Content',
    sizes: {
      base: 'text-base',
      sm: 'text-sm',
      md: 'text-md',
      lg: 'text-lg',
      xl: 'text-xl',
    },
    weight: 'regular',
    color: 'primary',
    align: 'left',
    className: '',
  },
  argTypes: {
    children: {
      control: 'text',
      description: 'Content to display within the ResponsiveText component.',
      table: {
        type: { summary: 'React.ReactNode' },
        defaultValue: { summary: 'Sample ResponsiveText Content' },
      },
    },
    sizes: {
      control: 'object',
      description:
        'Font sizes for different breakpoints. Provide Tailwind text size classes.',
      table: {
        type: {
          summary:
            '{ base: string; sm?: string; md?: string; lg?: string; xl?: string }',
        },
        defaultValue: {
          summary:
            '{ base: "text-base", sm: "text-sm", md: "text-md", lg: "text-lg", xl: "text-xl" }',
        },
      },
    },
    weight: {
      control: 'select',
      options: ['light', 'regular', 'bold', 'extrabold'],
      description: 'Font weight.',
      table: {
        type: { summary: `'light' | 'regular' | 'bold' | 'extrabold'` },
        defaultValue: { summary: `'regular'` },
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
type Story = StoryObj<ResponsiveTextProps>;

/**
 * Default ResponsiveText story demonstrating basic usage.
 */
export const Default: Story = {
  args: {
    children: 'This is a ResponsiveText component with default properties.',
  },
};

/**
 * ResponsiveText with Smaller Sizes.
 */
export const SmallerSizes: Story = {
  args: {
    sizes: {
      base: 'text-sm',
      sm: 'text-xs',
      md: 'text-sm',
      lg: 'text-md',
      xl: 'text-lg',
    },
    children: 'This ResponsiveText has smaller sizes across breakpoints.',
  },
};

/**
 * ResponsiveText with Larger Sizes.
 */
export const LargerSizes: Story = {
  args: {
    sizes: {
      base: 'text-lg',
      sm: 'text-md',
      md: 'text-lg',
      lg: 'text-xl',
      xl: 'text-2xl',
    },
    children: 'This ResponsiveText has larger sizes across breakpoints.',
  },
};

/**
 * ResponsiveText with Light Font Weight.
 */
export const LightWeight: Story = {
  args: {
    weight: 'light',
    children: 'This ResponsiveText has a light font weight.',
  },
};

/**
 * ResponsiveText with Bold Font Weight.
 */
export const BoldWeight: Story = {
  args: {
    weight: 'bold',
    children: 'This ResponsiveText has a bold font weight.',
  },
};

/**
 * ResponsiveText with Extra Bold Font Weight.
 */
export const ExtraBoldWeight: Story = {
  args: {
    weight: 'extrabold',
    children: 'This ResponsiveText has an extra bold font weight.',
  },
};

/**
 * ResponsiveText with Secondary Color.
 */
export const SecondaryColor: Story = {
  args: {
    color: 'secondary',
    children: 'This ResponsiveText has a secondary color.',
  },
};

/**
 * ResponsiveText with Accent Color.
 */
export const AccentColor: Story = {
  args: {
    color: 'accent',
    children: 'This ResponsiveText has an accent color.',
  },
};

/**
 * ResponsiveText with Custom Color.
 */
export const CustomColor: Story = {
  args: {
    color: '#FF5733',
    children: 'This ResponsiveText has a custom color (#FF5733).',
  },
};

/**
 * ResponsiveText with Center Alignment.
 */
export const CenterAlign: Story = {
  args: {
    align: 'center',
    children: 'This ResponsiveText is center-aligned.',
  },
};

/**
 * ResponsiveText with Justify Alignment.
 */
export const JustifyAlign: Story = {
  args: {
    align: 'justify',
    children:
      'This ResponsiveText is justified, making the text align evenly along both the left and right margins.',
  },
};

/**
 * ResponsiveText with Custom ClassName.
 */
export const CustomClassName: Story = {
  args: {
    className: 'bg-yellow-100 p-2 rounded',
    children: 'This ResponsiveText has custom background and padding.',
  },
};

/**
 * ResponsiveText with Combined Props.
 */
export const CombinedProps: Story = {
  args: {
    sizes: {
      base: 'text-base',
      sm: 'text-sm',
      md: 'text-lg',
      lg: 'text-xl',
      xl: 'text-2xl',
    },
    weight: 'extrabold',
    color: '#2E86C1',
    align: 'center',
    className: 'bg-blue-50 p-3 rounded-lg',
    children:
      'This ResponsiveText combines multiple properties: responsive sizing, custom color, extra bold weight, center alignment, and additional styling.',
  },
};

/**
 * Showcase Story demonstrating multiple ResponsiveText usages together.
 */
export const Showcase: Story = {
  render: (args: ResponsiveTextProps) => (
    <div className="space-y-6">
      {/* 1) Default ResponsiveText */}
      <ResponsiveText {...args}>
        This is a default ResponsiveText component.
      </ResponsiveText>

      {/* 2) Smaller Sizes */}
      <ResponsiveText
        {...args}
        sizes={{
          base: 'text-sm',
          sm: 'text-xs',
          md: 'text-sm',
          lg: 'text-md',
          xl: 'text-lg',
        }}
      >
        This ResponsiveText has smaller sizes across breakpoints.
      </ResponsiveText>

      {/* 3) Larger Sizes */}
      <ResponsiveText
        {...args}
        sizes={{
          base: 'text-lg',
          sm: 'text-md',
          md: 'text-lg',
          lg: 'text-xl',
          xl: 'text-2xl',
        }}
      >
        This ResponsiveText has larger sizes across breakpoints.
      </ResponsiveText>

      {/* 4) Light Font Weight */}
      <ResponsiveText {...args} weight="light">
        This ResponsiveText has a light font weight.
      </ResponsiveText>

      {/* 5) Bold Font Weight */}
      <ResponsiveText {...args} weight="bold">
        This ResponsiveText has a bold font weight.
      </ResponsiveText>

      {/* 6) Extra Bold Font Weight */}
      <ResponsiveText {...args} weight="extrabold">
        This ResponsiveText has an extra bold font weight.
      </ResponsiveText>

      {/* 7) Secondary Color */}
      <ResponsiveText {...args} color="secondary">
        This ResponsiveText has a secondary color.
      </ResponsiveText>

      {/* 8) Accent Color */}
      <ResponsiveText {...args} color="accent">
        This ResponsiveText has an accent color.
      </ResponsiveText>

      {/* 9) Custom Color */}
      <ResponsiveText {...args} color="#FF5733">
        This ResponsiveText has a custom color (#FF5733).
      </ResponsiveText>

      {/* 10) Center Alignment */}
      <ResponsiveText {...args} align="center">
        This ResponsiveText is center-aligned.
      </ResponsiveText>

      {/* 11) Justify Alignment */}
      <ResponsiveText {...args} align="justify">
        This ResponsiveText is justified, making the text align evenly along
        both the left and right margins.
      </ResponsiveText>

      {/* 12) Custom ClassName */}
      <ResponsiveText {...args} className="bg-yellow-100 p-2 rounded">
        This ResponsiveText has custom background and padding.
      </ResponsiveText>

      {/* 13) Combined Props */}
      <ResponsiveText
        {...args}
        sizes={{
          base: 'text-base',
          sm: 'text-sm',
          md: 'text-lg',
          lg: 'text-xl',
          xl: 'text-2xl',
        }}
        weight="extrabold"
        color="#2E86C1"
        align="center"
        className="bg-blue-50 p-3 rounded-lg"
      >
        This ResponsiveText combines multiple properties.
      </ResponsiveText>
    </div>
  ),
};
