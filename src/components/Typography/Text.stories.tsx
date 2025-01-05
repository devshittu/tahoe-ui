// src/components/Typography/Text.stories.tsx

import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import Text, { TextProps } from './Text';
import { AppProvider } from '@/providers/app';

const meta: Meta<typeof Text> = {
  title: 'Typography/Text',
  component: Text,
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
    children: 'Sample Text Content',
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
  },
  argTypes: {
    children: {
      control: 'text',
      description: 'Content to display within the Text component.',
      table: {
        type: { summary: 'React.ReactNode' },
        defaultValue: { summary: 'Sample Text Content' },
      },
    },
    className: {
      control: 'text',
      description: 'Additional CSS classes for custom styling.',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: '' },
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
      control: 'text',
      description:
        'Text color. Can be one of the predefined options ("primary", "secondary", "accent") or any valid CSS color string.',
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
      options: ['tight', 'normal', 'loose'],
      description: 'Line height for the text.',
      table: {
        type: { summary: `'tight' | 'normal' | 'loose'` },
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
  },
};

export default meta;
type Story = StoryObj<TextProps>;

/**
 * Default Text story demonstrating basic usage.
 */
export const Default: Story = {
  args: {
    children: 'This is a sample Text component with default properties.',
  },
};

/**
 * Primary Font Family
 */
export const PrimaryFont: Story = {
  args: {
    fontFamily: 'primary',
    children: 'This text uses the primary font family.',
  },
};

/**
 * Secondary Font Family
 */
export const SecondaryFont: Story = {
  args: {
    fontFamily: 'secondary',
    children: 'This text uses the secondary font family.',
  },
};

/**
 * Monospace Font Family
 */
export const MonospaceFont: Story = {
  args: {
    fontFamily: 'mono',
    children: 'This text uses the monospace font family.',
  },
};

/**
 * Bold Font Weight
 */
export const BoldWeight: Story = {
  args: {
    fontWeight: 'bold',
    children: 'This text has bold font weight.',
  },
};

/**
 * Extra Bold Font Weight
 */
export const ExtraBoldWeight: Story = {
  args: {
    fontWeight: 'extrabold',
    children: 'This text has extra bold font weight.',
  },
};

/**
 * Primary Color
 */
export const PrimaryColor: Story = {
  args: {
    color: 'primary',
    children: 'This text has primary color.',
  },
};

/**
 * Secondary Color
 */
export const SecondaryColor: Story = {
  args: {
    color: 'secondary',
    children: 'This text has secondary color.',
  },
};

/**
 * Accent Color
 */
export const AccentColor: Story = {
  args: {
    color: 'accent',
    children: 'This text has accent color.',
  },
};

/**
 * Custom Color
 */
export const CustomColor: Story = {
  args: {
    color: '#FF5733',
    children: 'This text has a custom color (#FF5733).',
  },
};

/**
 * Text Alignment - Center
 */
export const CenterAlign: Story = {
  args: {
    align: 'center',
    children: 'This text is center-aligned.',
  },
};

/**
 * Text Alignment - Right
 */
export const RightAlign: Story = {
  args: {
    align: 'right',
    children: 'This text is right-aligned.',
  },
};

/**
 * Line Height - Tight
 */
export const TightLineHeight: Story = {
  args: {
    lineHeight: 'tight',
    children: 'This text has tight line height.',
  },
};

/**
 * Line Height - Loose
 */
export const LooseLineHeight: Story = {
  args: {
    lineHeight: 'loose',
    children: 'This text has loose line height.',
  },
};

/**
 * Letter Spacing - Wide
 */
export const WideLetterSpacing: Story = {
  args: {
    letterSpacing: 'wide',
    children: 'This text has wide letter spacing.',
  },
};

/**
 * Text Transform - Uppercase
 */
export const UppercaseText: Story = {
  args: {
    textTransform: 'uppercase',
    children: 'THIS TEXT IS UPPERCASE.',
  },
};

/**
 * Text Transform - Capitalize
 */
export const CapitalizeText: Story = {
  args: {
    textTransform: 'capitalize',
    children: 'this text is capitalized.',
  },
};

/**
 * Text Decoration - Underline
 */
export const UnderlinedText: Story = {
  args: {
    textDecoration: 'underline',
    children: 'This text is underlined.',
  },
};

/**
 * Text Decoration - Line Through
 */
export const LineThroughText: Story = {
  args: {
    textDecoration: 'line-through',
    children: 'This text has a line through it.',
  },
};

/**
 * Background Color
 */
export const WithBackground: Story = {
  args: {
    background: '#F0E68C', // Khaki background
    children: 'This text has a khaki background.',
  },
};

/**
 * Truncated Text
 */
export const TruncatedText: Story = {
  args: {
    className: 'max-w-xs',
    truncate: true,
    children:
      'This is a very long text that should be truncated with an ellipsis if it exceeds the container width.',
  },
};

/**
 * Combined Props Example
 */
export const CombinedProps: Story = {
  args: {
    fontFamily: 'secondary',
    fontWeight: 'bold',
    color: '#4B0082', // Indigo
    align: 'justify',
    lineHeight: 'loose',
    letterSpacing: 'wide',
    textTransform: 'capitalize',
    textDecoration: 'underline',
    background: '#FFFACD', // LemonChiffon
    truncate: false,
    children:
      'This text combines multiple properties: secondary font, bold weight, indigo color, justified alignment, loose line height, wide letter spacing, capitalized text, underlined decoration, and a lemon chiffon background.',
  },
};
