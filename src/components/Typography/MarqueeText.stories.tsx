// src/components/Typography/MarqueeText.stories.tsx

import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { MarqueeText, MarqueeTextProps } from './MarqueeText';
import { AppProvider } from '@/providers/app';

const meta: Meta<typeof MarqueeText> = {
  title: 'Typography/MarqueeText',
  component: MarqueeText,
  decorators: [
    (Story) => (
      <AppProvider>
        {/* Restrict container width to visualize marquee scroll */}
        <div className="p-4 space-y-6 max-w-xl border border-gray-200 rounded-lg">
          <Story />
        </div>
      </AppProvider>
    ),
  ],
  args: {
    speed: 10,
    direction: 'left',
    lazyHover: true,
    cycles: 'infinite',
    easing: 'linear',
    rtl: false,
    resetOnMouseLeave: true,
    children: 'Default sample marquee text scrolling horizontally.',
    className: '',
  },
  argTypes: {
    speed: {
      control: {
        type: 'number',
        min: 1,
        max: 20,
        step: 1,
      },
      description: 'Speed factor in seconds. Lower => faster animation.',
      table: {
        type: { summary: 'number' },
        defaultValue: { summary: '10' }, // must be string
      },
    },
    direction: {
      control: 'select',
      options: ['left', 'right'],
      description: 'Direction in which the text scrolls.',
      table: {
        type: { summary: `'left' | 'right'` },
        defaultValue: { summary: "'left'" },
      },
    },
    lazyHover: {
      control: 'boolean',
      description:
        'If true, the animation starts only on hover. Setting false can increase CPU usage.',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'true' }, // must be string
      },
    },
    cycles: {
      control: {
        type: 'select',
        options: ['infinite', 1, 2, 3, 4, 5],
      },
      description:
        'Number of animation cycles. Set to "infinite" for endless scrolling.',
      table: {
        type: { summary: `'infinite' | number` },
        defaultValue: { summary: "'infinite'" }, // must be string
      },
    },
    easing: {
      control: 'select',
      options: ['linear', 'easeIn', 'easeOut', 'easeInOut'],
      description: 'Easing function for animation transitions.',
      table: {
        type: { summary: `'linear' | 'easeIn' | 'easeOut' | 'easeInOut'` },
        defaultValue: { summary: "'linear'" },
      },
    },
    rtl: {
      control: 'boolean',
      description:
        'If true, flips the direction logic for RTL (Right-To-Left) languages.',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    resetOnMouseLeave: {
      control: 'boolean',
      description:
        'If true, resets the marquee to the start position when the mouse leaves.',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'true' },
      },
    },
    children: {
      control: 'text',
      description: 'Content to display inside the marquee.',
      table: {
        type: { summary: 'React.ReactNode' },
        defaultValue: {
          summary: 'Default sample marquee text scrolling horizontally.',
        },
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
  },
};

export default meta;
type Story = StoryObj<MarqueeTextProps>;

/**
 * Demonstrates a basic usage with default props
 */
export const Default: Story = {
  args: {
    children:
      'This is a sample marquee text that scrolls horizontally (default left).',
  },
};

/**
 * Example of a left-scrolling marquee in a narrower container
 */
export const LeftScrolling: Story = {
  args: {
    className: 'max-w-[250px]',
    speed: 6,
    direction: 'left',
    cycles: 'infinite',
    children:
      'Hover me to see the marquee animation. Leave me to reset to start.',
  },
};

/**
 * Auto-run marquee (lazyHover = false), multiple cycles,
 * and stops after finishing
 */
export const AutoRunFiniteCycles: Story = {
  args: {
    className: 'max-w-[300px]',
    lazyHover: false,
    speed: 5,
    cycles: 2,
    direction: 'right',
    children: 'This marquee auto-runs if truncated, loops 2 times, then stops.',
  },
};

/**
 * RTL example
 */
export const RTLExample: Story = {
  args: {
    className: 'max-w-[200px]',
    rtl: true,
    direction: 'left',
    speed: 7,
    children:
      'مرحباً! نص عربي طويل. Hover => slides, mouse leave => reset to start.',
  },
};

/**
 * Full "Showcase" story demonstrating multiple MarqueeText usages together.
 */
export const Showcase: Story = {
  render: (args) => (
    <div className="space-y-6">
      <p className="text-sm text-gray-600">
        Below are various MarqueeText demos using different props.
      </p>
      <MarqueeText
        {...args}
        className="max-w-[250px]"
        speed={6}
        direction="left"
        cycles="infinite"
      >
        Hover me to see the marquee animation. Leave me to reset to start.
      </MarqueeText>

      <MarqueeText
        {...args}
        className="max-w-[300px]"
        lazyHover={false}
        speed={5}
        cycles={2}
        direction="right"
      >
        This marquee auto-runs if truncated, loops 2 times, then stops. After
        that, no more marquee.
      </MarqueeText>

      <MarqueeText
        {...args}
        className="max-w-[200px]"
        rtl
        direction="left"
        speed={7}
      >
        {
          'مرحباً! نص عربي طويل. Hover => slides, mouse leave => reset to start.'
        }
      </MarqueeText>
    </div>
  ),
};
