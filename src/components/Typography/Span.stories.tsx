// src/components/Typography/Span.stories.tsx

import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import Span, { SpanProps } from './Span';
import { AppProvider } from '@/providers/app';

const meta: Meta<typeof Span> = {
  title: 'Typography/Span',
  component: Span,
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
    children: 'Sample Span Text',
    fontFamily: 'primary',
    fontWeight: 'regular',
    color: 'primary',
    align: 'left',
    lineHeight: 'normal',
    letterSpacing: 'normal',
    textTransform: 'none',
    textDecoration: 'none',
    truncate: false,
    className: '',
  },
  argTypes: {
    children: {
      control: 'text',
      description: 'Content to display within the Span component.',
      table: {
        type: { summary: 'React.ReactNode' },
        defaultValue: { summary: 'Sample Span Text' },
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
      description: 'Font weight to apply.',
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
    lineHeight: {
      control: 'select',
      options: ['tight', 'normal', 'loose', 'leading-relaxed'],
      description: 'Line height for the text.',
      table: {
        type: { summary: `'tight' | 'normal' | 'loose' | 'leading-relaxed'` },
        defaultValue: { summary: `'normal'` },
      },
    },
    letterSpacing: {
      control: 'select',
      options: ['tight', 'normal', 'wide'],
      description: 'Letter spacing for the text.',
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
    truncate: {
      control: 'boolean',
      description:
        'If true, truncates the text with an ellipsis if it overflows the container.',
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
type Story = StoryObj<SpanProps>;

/**
 * Default Span story demonstrating basic usage.
 */
export const Default: Story = {
  args: {
    children: 'This is a default Span component.',
  },
};

/**
 * Span with Primary Font Family.
 */
export const PrimaryFont: Story = {
  args: {
    fontFamily: 'primary',
    children: 'This Span uses the primary font family.',
  },
};

/**
 * Span with Secondary Font Family.
 */
export const SecondaryFont: Story = {
  args: {
    fontFamily: 'secondary',
    children: 'This Span uses the secondary font family.',
  },
};

/**
 * Span with Monospace Font Family.
 */
export const MonospaceFont: Story = {
  args: {
    fontFamily: 'mono',
    children: 'This Span uses the monospace font family.',
  },
};

/**
 * Span with Light Font Weight.
 */
export const LightWeight: Story = {
  args: {
    fontWeight: 'light',
    children: 'This Span has a light font weight.',
  },
};

/**
 * Span with Bold Font Weight.
 */
export const BoldWeight: Story = {
  args: {
    fontWeight: 'bold',
    children: 'This Span has a bold font weight.',
  },
};

/**
 * Span with Extra Bold Font Weight.
 */
export const ExtraBoldWeight: Story = {
  args: {
    fontWeight: 'extrabold',
    children: 'This Span has an extra bold font weight.',
  },
};

/**
 * Span with Secondary Color.
 */
export const SecondaryColor: Story = {
  args: {
    color: 'secondary',
    children: 'This Span has a secondary color.',
  },
};

/**
 * Span with Accent Color.
 */
export const AccentColor: Story = {
  args: {
    color: 'accent',
    children: 'This Span has an accent color.',
  },
};

/**
 * Span with Custom Color.
 */
export const CustomColor: Story = {
  args: {
    color: '#FF5733',
    children: 'This Span has a custom color (#FF5733).',
  },
};

/**
 * Span with Center Alignment.
 */
export const CenterAlign: Story = {
  args: {
    align: 'center',
    children: 'This Span is center-aligned.',
  },
};

/**
 * Span with Justify Alignment.
 */
export const JustifyAlign: Story = {
  args: {
    align: 'justify',
    children:
      'This Span is justified, making the text align evenly along both the left and right margins.',
  },
};

/**
 * Span with Tight Line Height.
 */
export const TightLineHeight: Story = {
  args: {
    lineHeight: 'tight',
    children: 'This Span has a tight line height.',
  },
};

/**
 * Span with Loose Line Height.
 */
export const LooseLineHeight: Story = {
  args: {
    lineHeight: 'loose',
    children: 'This Span has a loose line height.',
  },
};

/**
 * Span with Wide Letter Spacing.
 */
export const WideLetterSpacing: Story = {
  args: {
    letterSpacing: 'wide',
    children: 'This Span has wide letter spacing.',
  },
};

/**
 * Span with Uppercase Text Transformation.
 */
export const UppercaseText: Story = {
  args: {
    textTransform: 'uppercase',
    children: 'THIS TEXT IS UPPERCASE.',
  },
};

/**
 * Span with Capitalize Text Transformation.
 */
export const CapitalizeText: Story = {
  args: {
    textTransform: 'capitalize',
    children: 'this text is capitalized.',
  },
};

/**
 * Span with Underline Text Decoration.
 */
export const UnderlineText: Story = {
  args: {
    textDecoration: 'underline',
    children: 'This Span is underlined.',
  },
};

/**
 * Span with Line-Through Text Decoration.
 */
export const LineThroughText: Story = {
  args: {
    textDecoration: 'line-through',
    children: 'This Span has a line through it.',
  },
};

/**
 * Span with Background Color (via className).
 */
export const WithBackground: Story = {
  args: {
    className: 'bg-yellow-200 px-1 rounded',
    children: 'This Span has a khaki background.',
  },
};

/**
 * Span with Truncated Text.
 */
export const TruncatedText: Story = {
  args: {
    className: 'max-w-xs',
    truncate: true,
    children:
      'This is a very long span that should be truncated with an ellipsis if it exceeds the container width.',
  },
};

/**
 * Span with Custom ClassName.
 */
export const CustomClassName: Story = {
  args: {
    className: 'underline decoration-dotted',
    children: 'This Span has custom underline styling.',
  },
};

/**
 * Combined Props Example.
 * Demonstrates multiple props applied together for enhanced styling.
 */
export const CombinedProps: Story = {
  args: {
    fontFamily: 'secondary',
    fontWeight: 'bold',
    color: 'accent',
    align: 'justify',
    lineHeight: 'loose',
    letterSpacing: 'wide',
    textTransform: 'capitalize',
    textDecoration: 'underline',
    truncate: false,
    className: 'bg-yellow-100 p-2 rounded',
    children:
      'This Span combines multiple properties: secondary font, bold weight, accent color, justified alignment, loose line height, wide letter spacing, capitalized text, underlined decoration, and additional styling.',
  },
};

/**
 * Showcase Story demonstrating multiple Span usages together.
 */
export const Showcase: Story = {
  render: (args: SpanProps) => (
    <div className="space-y-6">
      {/* 1) Default Span */}
      <Span {...args}>This is a default Span component.</Span>

      {/* 2) Primary Font Family */}
      <Span {...args} fontFamily="primary">
        This Span uses the primary font family.
      </Span>

      {/* 3) Secondary Font Family */}
      <Span {...args} fontFamily="secondary">
        This Span uses the secondary font family.
      </Span>

      {/* 4) Monospace Font Family */}
      <Span {...args} fontFamily="mono">
        This Span uses the monospace font family.
      </Span>

      {/* 5) Light Font Weight */}
      <Span {...args} fontWeight="light">
        This Span has a light font weight.
      </Span>

      {/* 6) Bold Font Weight */}
      <Span {...args} fontWeight="bold">
        This Span has a bold font weight.
      </Span>

      {/* 7) Extra Bold Font Weight */}
      <Span {...args} fontWeight="extrabold">
        This Span has an extra bold font weight.
      </Span>

      {/* 8) Secondary Color */}
      <Span {...args} color="secondary">
        This Span has a secondary color.
      </Span>

      {/* 9) Accent Color */}
      <Span {...args} color="accent">
        This Span has an accent color.
      </Span>

      {/* 10) Custom Color */}
      <Span {...args} color="#FF5733">
        This Span has a custom color (#FF5733).
      </Span>

      {/* 11) Center Alignment */}
      <Span {...args} align="center">
        This Span is center-aligned.
      </Span>

      {/* 12) Justify Alignment */}
      <Span {...args} align="justify">
        This Span is justified, making the text align evenly along both the left
        and right margins.
      </Span>

      {/* 13) Tight Line Height */}
      <Span {...args} lineHeight="tight">
        This Span has a tight line height.
      </Span>

      {/* 14) Loose Line Height */}
      <Span {...args} lineHeight="loose">
        This Span has a loose line height.
      </Span>

      {/* 15) Wide Letter Spacing */}
      <Span {...args} letterSpacing="wide">
        This Span has wide letter spacing.
      </Span>

      {/* 16) Uppercase Text Transformation */}
      <Span {...args} textTransform="uppercase">
        THIS TEXT IS UPPERCASE.
      </Span>

      {/* 17) Capitalize Text Transformation */}
      <Span {...args} textTransform="capitalize">
        this text is capitalized.
      </Span>

      {/* 18) Underline Text Decoration */}
      <Span {...args} textDecoration="underline">
        This Span is underlined.
      </Span>

      {/* 19) Line-Through Text Decoration */}
      <Span {...args} textDecoration="line-through">
        This Span has a line through it.
      </Span>

      {/* 20) Background Color via className */}
      <Span {...args} className="bg-yellow-200 px-1 rounded">
        This Span has a khaki background.
      </Span>

      {/* 21) Truncated Text */}
      <Span {...args} className="max-w-xs" truncate>
        This is a very long span that should be truncated with an ellipsis if it
        exceeds the container width.
      </Span>

      {/* 22) Custom ClassName */}
      <Span {...args} className="underline decoration-dotted">
        This Span has custom underline styling.
      </Span>

      {/* 23) Combined Props */}
      <Span
        {...args}
        fontFamily="secondary"
        fontWeight="bold"
        color="accent"
        align="justify"
        lineHeight="loose"
        letterSpacing="wide"
        textTransform="capitalize"
        textDecoration="underline"
        truncate={false}
        className="bg-yellow-100 p-2 rounded"
      >
        This Span combines multiple properties: secondary font, bold weight,
        accent color, justified alignment, loose line height, wide letter
        spacing, capitalized text, underlined decoration, and additional
        styling.
      </Span>
    </div>
  ),
};
