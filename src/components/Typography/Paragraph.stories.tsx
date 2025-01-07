// src/components/Typography/Paragraph.stories.tsx

import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import Paragraph, { ParagraphProps } from './Paragraph';
import { AppProvider } from '@/providers/app';

const meta: Meta<typeof Paragraph> = {
  title: 'Typography/Paragraph',
  component: Paragraph,
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
    children: 'Sample paragraph text.',
    className: '',
    fontFamily: 'primary',
    fontWeight: 'regular',
    color: 'primary',
    align: 'left',
    lineHeight: 'normal',
    letterSpacing: 'normal',
    textTransform: 'none',
    textDecoration: 'none',
    background: '',
    truncate: false,
    margin: 'my-2',
  },
  argTypes: {
    children: {
      control: 'text',
      description: 'Content to display within the Paragraph component.',
      table: {
        type: { summary: 'React.ReactNode' },
        defaultValue: { summary: 'Sample paragraph text.' },
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
    fontWeight: {
      control: 'select',
      options: ['light', 'regular', 'bold', 'extrabold'],
      description: 'Font weight of the paragraph.',
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
        'Text color for the paragraph. Can be one of the predefined options or any valid CSS color string.',
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
    lineHeight: {
      control: 'select',
      options: ['tight', 'normal', 'loose', 'leading-relaxed'],
      description: 'Line height for the paragraph.',
      table: {
        type: { summary: `'tight' | 'normal' | 'loose' | 'leading-relaxed'` },
        defaultValue: { summary: `'normal'` },
      },
    },
    letterSpacing: {
      control: 'select',
      options: ['tight', 'normal', 'wide'],
      description: 'Letter spacing for the paragraph.',
      table: {
        type: { summary: `'tight' | 'normal' | 'wide'` },
        defaultValue: { summary: `'normal'` },
      },
    },
    textTransform: {
      control: 'select',
      options: ['uppercase', 'lowercase', 'capitalize', 'none'],
      description: 'Text transformation.',
      table: {
        type: { summary: `'uppercase' | 'lowercase' | 'capitalize' | 'none'` },
        defaultValue: { summary: `'none'` },
      },
    },
    textDecoration: {
      control: 'select',
      options: ['underline', 'line-through', 'none'],
      description: 'Text decoration.',
      table: {
        type: { summary: `'underline' | 'line-through' | 'none'` },
        defaultValue: { summary: `'none'` },
      },
    },
    background: {
      control: 'text',
      description:
        'Background color. Provide a valid CSS color string. Leave empty for no background.',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: `''` },
      },
    },
    truncate: {
      control: 'boolean',
      description:
        'If true, truncates the text with an ellipsis if it overflows the container.',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    margin: {
      control: 'text',
      description: 'Margin classes for the component. Default is "my-2".',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: '"my-2"' },
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
type Story = StoryObj<ParagraphProps>;

/**
 * Default Paragraph story demonstrating basic usage.
 */
export const Default: Story = {
  args: {
    children: 'This is a default Paragraph component with standard styling.',
  },
};

/**
 * Paragraph with Custom Font Family.
 */
export const CustomFontFamily: Story = {
  args: {
    fontFamily: 'secondary',
    children: 'This Paragraph uses the secondary font family.',
  },
};

/**
 * Paragraph with Bold Font Weight.
 */
export const BoldFontWeight: Story = {
  args: {
    fontWeight: 'bold',
    children: 'This Paragraph has a bold font weight.',
  },
};

/**
 * Paragraph with Custom Color.
 */
export const CustomColor: Story = {
  args: {
    color: '#FF5733',
    children: 'This Paragraph has a custom color (#FF5733).',
  },
};

/**
 * Paragraph with Center Alignment.
 */
export const CenterAligned: Story = {
  args: {
    align: 'center',
    children: 'This Paragraph is center-aligned.',
  },
};

/**
 * Paragraph with Loose Line Height.
 */
export const LooseLineHeight: Story = {
  args: {
    lineHeight: 'loose',
    children: 'This Paragraph has a loose line height for better readability.',
  },
};

/**
 * Paragraph with Wide Letter Spacing.
 */
export const WideLetterSpacing: Story = {
  args: {
    letterSpacing: 'wide',
    children: 'This Paragraph has wide letter spacing.',
  },
};

/**
 * Paragraph with Uppercase Text Transformation.
 */
export const UppercaseText: Story = {
  args: {
    textTransform: 'uppercase',
    children: 'THIS TEXT IS UPPERCASE.',
  },
};

/**
 * Paragraph with Underline Text Decoration.
 */
export const UnderlineText: Story = {
  args: {
    textDecoration: 'underline',
    children: 'This Paragraph is underlined.',
  },
};

/**
 * Paragraph with Background Color.
 */
export const BackgroundColor: Story = {
  args: {
    background: '#F0E68C', // Khaki background
    children: 'This Paragraph has a khaki background.',
  },
};

/**
 * Paragraph with Truncated Text.
 */
export const TruncatedText: Story = {
  args: {
    className: 'max-w-md',
    truncate: true,
    children:
      'This is a very long paragraph that is intended to demonstrate how text truncation works when the content exceeds the container width. It should truncate with an ellipsis if the truncate prop is enabled.',
  },
};

/**
 * Paragraph with Custom ClassName.
 */
export const CustomClassName: Story = {
  args: {
    className: 'bg-blue-100 p-2 rounded',
    children: 'This Paragraph has custom background and padding.',
  },
};

/**
 * Combined Props Example.
 * Demonstrates multiple props applied together for enhanced styling.
 */
export const CombinedProps: Story = {
  args: {
    fontFamily: 'mono',
    fontWeight: 'extrabold',
    color: '#2E86C1',
    align: 'justify',
    lineHeight: 'loose',
    letterSpacing: 'wide',
    textTransform: 'capitalize',
    textDecoration: 'underline',
    background: '#FFFACD', // LemonChiffon
    truncate: false,
    margin: 'my-4',
    className: 'bg-yellow-100 p-3 rounded-lg',
    children:
      'This Paragraph combines multiple properties: monospace font family, extra bold weight, indigo color, justified alignment, relaxed line height, wide letter spacing, capitalized text, underlined decoration, lemon chiffon background, and additional styling.',
  },
};

/**
 * Showcase Story demonstrating multiple Paragraph usages together.
 */
export const Showcase: Story = {
  render: (args: ParagraphProps) => (
    <div className="space-y-6">
      {/* 1) Default Paragraph */}
      <Paragraph {...args}>This is a default Paragraph component.</Paragraph>

      {/* 2) Custom Font Family */}
      <Paragraph {...args} fontFamily="secondary">
        This Paragraph uses the secondary font family.
      </Paragraph>

      {/* 3) Bold Font Weight */}
      <Paragraph {...args} fontWeight="bold">
        This Paragraph has a bold font weight.
      </Paragraph>

      {/* 4) Custom Color */}
      <Paragraph {...args} color="#FF5733">
        This Paragraph has a custom color (#FF5733).
      </Paragraph>

      {/* 5) Center Alignment */}
      <Paragraph {...args} align="center">
        This Paragraph is center-aligned.
      </Paragraph>

      {/* 6) Loose Line Height */}
      <Paragraph {...args} lineHeight="loose">
        This Paragraph has a loose line height for better readability.
      </Paragraph>

      {/* 7) Wide Letter Spacing */}
      <Paragraph {...args} letterSpacing="wide">
        This Paragraph has wide letter spacing.
      </Paragraph>

      {/* 8) Uppercase Text Transformation */}
      <Paragraph {...args} textTransform="uppercase">
        THIS TEXT IS UPPERCASE.
      </Paragraph>

      {/* 9) Underline Text Decoration */}
      <Paragraph {...args} textDecoration="underline">
        This Paragraph is underlined.
      </Paragraph>

      {/* 10) Background Color */}
      <Paragraph {...args} background="#F0E68C">
        This Paragraph has a khaki background.
      </Paragraph>

      {/* 11) Truncated Text */}
      <Paragraph {...args} className="max-w-md" truncate>
        This is a very long paragraph that should be truncated with an ellipsis
        if it exceeds the container width.
      </Paragraph>

      {/* 12) Custom ClassName */}
      <Paragraph {...args} className="bg-blue-100 p-2 rounded">
        This Paragraph has custom background and padding.
      </Paragraph>

      {/* 13) Combined Props */}
      <Paragraph
        {...args}
        fontFamily="mono"
        fontWeight="extrabold"
        color="#2E86C1"
        align="justify"
        lineHeight="loose"
        letterSpacing="wide"
        textTransform="capitalize"
        textDecoration="underline"
        background="#FFFACD"
        truncate={false}
        margin="my-4"
        className="bg-yellow-100 p-3 rounded-lg"
      >
        This Paragraph combines multiple properties.
      </Paragraph>
    </div>
  ),
};
