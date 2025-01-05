// src/components/Typography/FluidTypography.stories.tsx

import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import FluidTypography, { FluidTypographyProps } from './FluidTypography';
import { AppProvider } from '@/providers/app';

const meta: Meta<typeof FluidTypography> = {
  title: 'Typography/FluidTypography',
  component: FluidTypography,
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
    children: 'Sample FluidTypography Content',
    minSize: '16',
    maxSize: '24',
    scalingFactor: 100,
    unit: 'px',
    weight: 'regular',
    color: 'primary',
    align: 'left',
    className: '',
  },
  argTypes: {
    children: {
      control: 'text',
      description: 'Content to display within the FluidTypography component.',
      table: {
        type: { summary: 'React.ReactNode' },
        defaultValue: { summary: 'Sample FluidTypography Content' },
      },
    },
    minSize: {
      control: 'text',
      description: 'Minimum font size.',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: '"16"' },
      },
    },
    maxSize: {
      control: 'text',
      description: 'Maximum font size.',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: '"24"' },
      },
    },
    scalingFactor: {
      control: {
        type: 'number',
        min: 50,
        max: 200,
        step: 10,
      },
      description:
        'Scaling factor in viewport width units (vw). Lower values mean less scaling.',
      table: {
        type: { summary: 'number' },
        defaultValue: { summary: '100' },
      },
    },
    unit: {
      control: 'select',
      options: ['px', 'rem', 'em', 'vw', 'vh'],
      description: 'Unit for font sizes.',
      table: {
        type: { summary: `'px' | 'rem' | 'em' | 'vw' | 'vh'` },
        defaultValue: { summary: `'px'` },
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
type Story = StoryObj<FluidTypographyProps>;

/**
 * Default FluidTypography story demonstrating basic usage.
 */
export const Default: Story = {
  args: {
    children: 'This is a FluidTypography component with default properties.',
  },
};

/**
 * FluidTypography with Larger Scaling Factor.
 */
export const LargerScaling: Story = {
  args: {
    scalingFactor: 150,
    children: 'This FluidTypography scales more with a larger scaling factor.',
  },
};

/**
 * FluidTypography with Smaller Scaling Factor.
 */
export const SmallerScaling: Story = {
  args: {
    scalingFactor: 75,
    children: 'This FluidTypography scales less with a smaller scaling factor.',
  },
};

/**
 * FluidTypography with Rem Units.
 */
export const RemUnits: Story = {
  args: {
    unit: 'rem',
    minSize: '1rem',
    maxSize: '1.5rem',
    children: 'This FluidTypography uses rem units for font size.',
  },
};

/**
 * FluidTypography with Em Units.
 */
export const EmUnits: Story = {
  args: {
    unit: 'em',
    minSize: '1em',
    maxSize: '2em',
    children: 'This FluidTypography uses em units for font size.',
  },
};

/**
 * FluidTypography with Bold Weight.
 */
export const BoldWeight: Story = {
  args: {
    weight: 'bold',
    children: 'This FluidTypography has a bold font weight.',
  },
};

/**
 * FluidTypography with Custom Color.
 */
export const CustomColor: Story = {
  args: {
    color: '#FF5733',
    children: 'This FluidTypography has a custom color (#FF5733).',
  },
};

/**
 * FluidTypography with Center Alignment.
 */
export const CenterAlign: Story = {
  args: {
    align: 'center',
    children: 'This FluidTypography is center-aligned.',
  },
};

/**
 * FluidTypography with Justify Alignment.
 */
export const JustifyAlign: Story = {
  args: {
    align: 'justify',
    children:
      'This FluidTypography is justified, making the text align evenly along both the left and right margins.',
  },
};

/**
 * FluidTypography with Custom ClassName.
 */
export const CustomClassName: Story = {
  args: {
    className: 'bg-yellow-100 p-2 rounded',
    children: 'This FluidTypography has custom background and padding.',
  },
};

/**
 * Combined Props Example.
 * Demonstrates multiple props applied together for enhanced responsiveness and styling.
 */
export const CombinedProps: Story = {
  args: {
    minSize: '18',
    maxSize: '30',
    scalingFactor: 120,
    unit: 'vw',
    weight: 'extrabold',
    color: '#2E86C1',
    align: 'center',
    className: 'bg-blue-50 p-3 rounded-lg',
    children:
      'This FluidTypography combines multiple properties: responsive sizing, custom color, bold weight, center alignment, and additional styling.',
  },
};

/**
 * Showcase Story demonstrating multiple FluidTypography usages together.
 */
export const Showcase: Story = {
  render: (args: FluidTypographyProps) => (
    <div className="space-y-6">
      {/* 1) Default FluidTypography */}
      <FluidTypography {...args}>
        This is a default FluidTypography component.
      </FluidTypography>

      {/* 2) Larger Scaling Factor */}
      <FluidTypography {...args} scalingFactor={150}>
        This FluidTypography scales more with a larger scaling factor.
      </FluidTypography>

      {/* 3) Smaller Scaling Factor */}
      <FluidTypography {...args} scalingFactor={75}>
        This FluidTypography scales less with a smaller scaling factor.
      </FluidTypography>

      {/* 4) Rem Units */}
      <FluidTypography {...args} unit="rem" minSize="1rem" maxSize="1.5rem">
        This FluidTypography uses rem units for font size.
      </FluidTypography>

      {/* 5) Em Units */}
      <FluidTypography {...args} unit="em" minSize="1em" maxSize="2em">
        This FluidTypography uses em units for font size.
      </FluidTypography>

      {/* 6) Bold Weight */}
      <FluidTypography {...args} weight="bold">
        This FluidTypography has a bold font weight.
      </FluidTypography>

      {/* 7) Custom Color */}
      <FluidTypography {...args} color="#FF5733">
        This FluidTypography has a custom color (#FF5733).
      </FluidTypography>

      {/* 8) Center Alignment */}
      <FluidTypography {...args} align="center">
        This FluidTypography is center-aligned.
      </FluidTypography>

      {/* 9) Justify Alignment */}
      <FluidTypography {...args} align="justify">
        This FluidTypography is justified, making the text align evenly along
        both the left and right margins.
      </FluidTypography>

      {/* 10) Custom ClassName */}
      <FluidTypography {...args} className="bg-green-100 p-4 rounded-md">
        This FluidTypography has custom background and padding.
      </FluidTypography>

      {/* 11) Combined Props */}
      <FluidTypography
        {...args}
        minSize="18"
        maxSize="30"
        scalingFactor={120}
        unit="vw"
        weight="extrabold"
        color="#2E86C1"
        align="center"
        className="bg-blue-50 p-3 rounded-lg"
      >
        This FluidTypography combines multiple properties: responsive sizing,
        custom color, bold weight, center alignment, and additional styling.
      </FluidTypography>
    </div>
  ),
};
