// src/components/Button/GlassButton.stories.tsx

import React, { useRef, useEffect } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import GlassButton from './GlassButton';
import { FaBeer, FaCoffee, FaRocket } from 'react-icons/fa';

const meta: Meta<typeof GlassButton> = {
  title: 'Elements/Button/GlassButton',
  component: GlassButton,
  decorators: [
    (Story) => (
      <div className="p-8 space-y-4 min-h-screen relative">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-400 via-purple-500 to-pink-500" />
        <div className="relative">
          <Story />
        </div>
      </div>
    ),
  ],
  args: {
    children: 'Glass Button',
    variant: 'glass',
    color: 'primary',
    size: 'md',
    radius: 'md',
    isLoading: false,
    fullWidth: false,
    leftIcon: null,
    rightIcon: null,
    disabled: false,
    className: '',
    onClick: undefined,
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['solid', 'subtle', 'outline', 'ghost', 'glass'],
      description: 'Styling variant of the button.',
      table: {
        type: { summary: `'solid' | 'subtle' | 'outline' | 'ghost' | 'glass'` },
        defaultValue: { summary: `'glass'` },
      },
    },
    color: {
      control: 'select',
      options: [
        'primary',
        'secondary',
        'accent',
        'neutral',
        'success',
        'warning',
        'error',
      ],
      description: 'Color scheme of the button.',
      table: {
        type: {
          summary: `'primary' | 'secondary' | 'accent' | 'neutral' | 'success' | 'warning' | 'error'`,
        },
        defaultValue: { summary: `'primary'` },
      },
    },
    size: {
      control: 'select',
      options: ['xs', 'sm', 'md', 'lg', 'xl'],
      description: 'Size of the button.',
      table: {
        type: { summary: `'xs' | 'sm' | 'md' | 'lg' | 'xl'` },
        defaultValue: { summary: `'md'` },
      },
    },
    radius: {
      control: 'select',
      options: ['none', 'sm', 'md', 'lg', 'full'],
      description: 'Corner rounding of the button.',
      table: {
        type: { summary: `'none' | 'sm' | 'md' | 'lg' | 'full'` },
        defaultValue: { summary: `'md'` },
      },
    },
    isLoading: {
      control: 'boolean',
      description: 'Displays a loading spinner when true.',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    fullWidth: {
      control: 'boolean',
      description: 'Makes the button span the full width of its container.',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    leftIcon: {
      control: false,
      description: 'Icon to display on the left side.',
    },
    rightIcon: {
      control: false,
      description: 'Icon to display on the right side.',
    },
    disabled: {
      control: 'boolean',
      description: 'Disables the button when true.',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    className: {
      control: 'text',
      description: 'Additional CSS classes for the button.',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: '""' },
      },
    },
    onClick: {
      action: 'clicked',
      description: 'Click event handler.',
      table: {
        type: { summary: '(event: MouseEvent<HTMLButtonElement>) => void' },
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof GlassButton>;

/**
 * Default GlassButton story.
 */
export const Default: Story = {
  args: {
    children: 'Glass Button',
  },
};

/**
 * Semantic Colors of the GlassButton.
 */
export const SemanticColors: Story = {
  render: () => (
    <div className="space-x-4 flex flex-wrap gap-2">
      <GlassButton color="primary">Primary</GlassButton>
      <GlassButton color="secondary">Secondary</GlassButton>
      <GlassButton color="accent">Accent</GlassButton>
      <GlassButton color="neutral">Neutral</GlassButton>
      <GlassButton color="success">Success</GlassButton>
      <GlassButton color="warning">Warning</GlassButton>
      <GlassButton color="error">Error</GlassButton>
    </div>
  ),
};

/**
 * Different Sizes of the GlassButton.
 */
export const Sizes: Story = {
  render: () => (
    <div className="space-x-2 flex items-end">
      <GlassButton size="xs">XS</GlassButton>
      <GlassButton size="sm">SM</GlassButton>
      <GlassButton size="md">MD</GlassButton>
      <GlassButton size="lg">LG</GlassButton>
      <GlassButton size="xl">XL</GlassButton>
    </div>
  ),
};

/**
 * Border Radius options.
 */
export const BorderRadius: Story = {
  render: () => (
    <div className="space-x-2 flex flex-wrap gap-2">
      <GlassButton radius="none">No Rounding</GlassButton>
      <GlassButton radius="sm">Small Round</GlassButton>
      <GlassButton radius="md">Medium Round</GlassButton>
      <GlassButton radius="lg">Large Round</GlassButton>
      <GlassButton radius="full">Full Round</GlassButton>
    </div>
  ),
};

/**
 * Loading State of the GlassButton.
 */
export const Loading: Story = {
  args: {
    isLoading: true,
    children: 'Loading...',
  },
};

/**
 * Full Width GlassButton.
 */
export const FullWidth: Story = {
  args: {
    fullWidth: true,
    children: 'Full Width Button',
  },
};

/**
 * GlassButton with Icons.
 */
export const WithIcons: Story = {
  render: () => (
    <div className="space-x-4 flex flex-wrap gap-2">
      <GlassButton leftIcon={<FaBeer />} color="accent">
        Left Icon
      </GlassButton>
      <GlassButton rightIcon={<FaCoffee />} color="error">
        Right Icon
      </GlassButton>
      <GlassButton
        leftIcon={<FaBeer />}
        rightIcon={<FaCoffee />}
        color="success"
      >
        Both Icons
      </GlassButton>
      <GlassButton leftIcon={<FaRocket />} variant="outline" color="secondary">
        Outline with Icon
      </GlassButton>
    </div>
  ),
};

/**
 * Disabled GlassButton.
 */
export const Disabled: Story = {
  args: {
    disabled: true,
    children: 'Disabled Button',
  },
};

/**
 * GlassButton with Custom ClassName.
 */
export const CustomClassName: Story = {
  args: {
    children: 'Custom Styled',
    className: 'bg-yellow-500/30 hover:bg-yellow-500/50 text-black',
  },
};

/**
 * GlassButton with Ref.
 */
export const WithRef: Story = {
  render: () => {
    const ref = useRef<HTMLButtonElement>(null);

    useEffect(() => {
      if (ref.current) {
        console.log('GlassButton ref:', ref.current);
      }
    }, []);

    return <GlassButton ref={ref}>Button with Ref</GlassButton>;
  },
};

/**
 * Showcase of various GlassButton usages.
 */
export const Showcase: Story = {
  render: () => (
    <div className="space-y-6">
      {/* Semantic Colors */}
      <div className="space-x-4 flex flex-wrap gap-2">
        <GlassButton color="primary">Primary</GlassButton>
        <GlassButton color="secondary">Secondary</GlassButton>
        <GlassButton color="accent">Accent</GlassButton>
        <GlassButton color="success">Success</GlassButton>
        <GlassButton color="warning">Warning</GlassButton>
        <GlassButton color="error">Error</GlassButton>
      </div>

      {/* Sizes */}
      <div className="space-x-2 flex items-end">
        <GlassButton size="xs">XS</GlassButton>
        <GlassButton size="sm">SM</GlassButton>
        <GlassButton size="md">MD</GlassButton>
        <GlassButton size="lg">LG</GlassButton>
        <GlassButton size="xl">XL</GlassButton>
      </div>

      {/* Border Radius */}
      <div className="space-x-2 flex flex-wrap gap-2">
        <GlassButton radius="none">No Rounding</GlassButton>
        <GlassButton radius="sm">Small Round</GlassButton>
        <GlassButton radius="md">Medium Round</GlassButton>
        <GlassButton radius="lg">Large Round</GlassButton>
        <GlassButton radius="full">Full Round</GlassButton>
      </div>

      {/* Loading and Disabled */}
      <div className="space-x-4 flex flex-wrap gap-2">
        <GlassButton isLoading color="accent">
          Loading...
        </GlassButton>
        <GlassButton disabled color="error">
          Disabled
        </GlassButton>
      </div>

      {/* Full Width */}
      <div>
        <GlassButton fullWidth color="success">
          Full Width Button
        </GlassButton>
      </div>

      {/* With Icons */}
      <div className="space-x-4 flex flex-wrap gap-2">
        <GlassButton leftIcon={<FaBeer />} color="accent">
          Left Icon
        </GlassButton>
        <GlassButton rightIcon={<FaCoffee />} color="error">
          Right Icon
        </GlassButton>
        <GlassButton
          leftIcon={<FaBeer />}
          rightIcon={<FaCoffee />}
          color="success"
        >
          Both Icons
        </GlassButton>
        <GlassButton
          leftIcon={<FaRocket />}
          variant="outline"
          color="secondary"
        >
          Outline with Icon
        </GlassButton>
      </div>
    </div>
  ),
};
