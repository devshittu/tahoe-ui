// src/components/Button/Button.stories.tsx

import React, { useRef, useEffect } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import Button from './Button';
import { FaBeer, FaCoffee } from 'react-icons/fa';

const meta: Meta<typeof Button> = {
  title: 'Elements/Button/Button',
  component: Button,
  decorators: [
    (Story) => (
      <div className="p-4 space-y-4">
        <Story />
      </div>
    ),
  ],
  args: {
    children: 'Button',
    variant: 'solid',
    color: 'primary',
    size: 'md',
    radius: 'md',
    isLoading: false,
    fullWidth: false,
    disableAnimation: false,
    spinner: null,
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
        defaultValue: { summary: `'solid'` },
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
      description: 'Semantic color scheme of the button.',
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
    loadingText: {
      control: 'text',
      description: 'Text to show during loading state.',
      table: {
        type: { summary: 'string' },
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
    disableAnimation: {
      control: 'boolean',
      description: 'Disables spring physics animations.',
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
    spinner: {
      control: false,
      description: 'Custom spinner element to display when loading.',
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
type Story = StoryObj<typeof Button>;

/**
 * Default Button story.
 */
export const Default: Story = {
  args: {
    children: 'Default Button',
  },
};

/**
 * Variants of the Button with different colors.
 */
export const Variants: Story = {
  render: () => (
    <div className="space-x-4 flex flex-wrap gap-2">
      <Button variant="solid" color="primary">
        Primary Solid
      </Button>
      <Button variant="subtle" color="secondary">
        Secondary Subtle
      </Button>
      <Button variant="outline" color="accent">
        Accent Outline
      </Button>
      <Button variant="ghost" color="neutral">
        Neutral Ghost
      </Button>
      <Button variant="glass" color="primary">
        Glass
      </Button>
    </div>
  ),
};

/**
 * Semantic Colors.
 */
export const SemanticColors: Story = {
  render: () => (
    <div className="space-x-4 flex flex-wrap gap-2">
      <Button color="primary">Primary</Button>
      <Button color="secondary">Secondary</Button>
      <Button color="accent">Accent</Button>
      <Button color="neutral">Neutral</Button>
      <Button color="success">Success</Button>
      <Button color="warning">Warning</Button>
      <Button color="error">Error</Button>
    </div>
  ),
};

/**
 * Different Sizes of the Button.
 */
export const Sizes: Story = {
  render: () => (
    <div className="space-x-2 flex items-end">
      <Button size="xs">Extra Small</Button>
      <Button size="sm">Small</Button>
      <Button size="md">Medium</Button>
      <Button size="lg">Large</Button>
      <Button size="xl">Extra Large</Button>
    </div>
  ),
};

/**
 * Border Radius options.
 */
export const BorderRadius: Story = {
  render: () => (
    <div className="space-x-2 flex flex-wrap gap-2">
      <Button radius="none">No Rounding</Button>
      <Button radius="sm">Small Round</Button>
      <Button radius="md">Medium Round</Button>
      <Button radius="lg">Large Round</Button>
      <Button radius="full">Full Round</Button>
    </div>
  ),
};

/**
 * Loading State.
 */
export const Loading: Story = {
  args: {
    isLoading: true,
    children: 'Loading...',
  },
};

/**
 * Loading with custom text.
 */
export const LoadingWithText: Story = {
  args: {
    isLoading: true,
    loadingText: 'Saving...',
    children: 'Save',
  },
};

/**
 * Full Width Button.
 */
export const FullWidth: Story = {
  args: {
    fullWidth: true,
    children: 'Full Width Button',
  },
};

/**
 * Button with Icons.
 */
export const WithIcons: Story = {
  render: () => (
    <div className="space-x-4 flex flex-wrap gap-2">
      <Button leftIcon={<FaBeer />} color="accent">
        Left Icon
      </Button>
      <Button rightIcon={<FaCoffee />} color="error">
        Right Icon
      </Button>
      <Button leftIcon={<FaBeer />} rightIcon={<FaCoffee />} color="success">
        Both Icons
      </Button>
      <Button leftIcon={<FaBeer />} variant="outline" color="accent">
        Outline with Icon
      </Button>
    </div>
  ),
};

/**
 * Disabled Button.
 */
export const Disabled: Story = {
  args: {
    disabled: true,
    children: 'Disabled Button',
  },
};

/**
 * Button with Custom ClassName.
 */
export const CustomClassName: Story = {
  args: {
    children: 'Custom Styled',
    className: 'bg-yellow-500 hover:bg-yellow-600 text-black',
  },
};

/**
 * Button with Ref.
 */
export const WithRef: Story = {
  render: () => {
    const ref = useRef<HTMLButtonElement>(null);

    useEffect(() => {
      if (ref.current) {
        console.log('Button ref:', ref.current);
      }
    }, []);

    return <Button ref={ref}>Button with Ref</Button>;
  },
};

/**
 * Glass Variant Showcase.
 */
export const GlassVariant: Story = {
  render: () => (
    <div className="relative p-8 rounded-xl overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-400 via-purple-500 to-pink-500" />
      <div className="relative space-x-4 flex flex-wrap gap-2">
        <Button variant="glass" color="primary">
          Primary Glass
        </Button>
        <Button variant="glass" color="accent">
          Accent Glass
        </Button>
        <Button variant="glass" color="success">
          Success Glass
        </Button>
        <Button variant="glass" color="error">
          Error Glass
        </Button>
      </div>
    </div>
  ),
};

/**
 * Animation disabled.
 */
export const NoAnimation: Story = {
  args: {
    disableAnimation: true,
    children: 'No Animation',
  },
};

/**
 * Showcase of various Button usages.
 */
export const Showcase: Story = {
  render: () => (
    <div className="space-y-4">
      {/* Variants */}
      <div className="space-x-4 flex flex-wrap gap-2">
        <Button variant="solid" color="primary">
          Primary Solid
        </Button>
        <Button variant="subtle" color="secondary">
          Secondary Subtle
        </Button>
        <Button variant="outline" color="accent">
          Accent Outline
        </Button>
        <Button variant="ghost" color="neutral">
          Neutral Ghost
        </Button>
        <Button variant="glass" color="primary">
          Glass
        </Button>
      </div>

      {/* Sizes */}
      <div className="space-x-2 flex items-end">
        <Button size="xs">XS</Button>
        <Button size="sm">SM</Button>
        <Button size="md">MD</Button>
        <Button size="lg">LG</Button>
        <Button size="xl">XL</Button>
      </div>

      {/* Border Radius */}
      <div className="space-x-2 flex flex-wrap gap-2">
        <Button radius="none">No Rounding</Button>
        <Button radius="sm">Small Round</Button>
        <Button radius="md">Medium Round</Button>
        <Button radius="lg">Large Round</Button>
        <Button radius="full">Full Round</Button>
      </div>

      {/* Loading and Disabled */}
      <div className="space-x-4 flex flex-wrap gap-2">
        <Button isLoading color="accent">
          Loading...
        </Button>
        <Button isLoading loadingText="Saving..." color="success">
          Save
        </Button>
        <Button disabled color="error">
          Disabled
        </Button>
      </div>

      {/* Full Width */}
      <div>
        <Button fullWidth color="success">
          Full Width Button
        </Button>
      </div>

      {/* With Icons */}
      <div className="space-x-4 flex flex-wrap gap-2">
        <Button leftIcon={<FaBeer />} color="accent">
          Left Icon
        </Button>
        <Button rightIcon={<FaCoffee />} color="error">
          Right Icon
        </Button>
        <Button leftIcon={<FaBeer />} rightIcon={<FaCoffee />} color="success">
          Both Icons
        </Button>
        <Button leftIcon={<FaBeer />} variant="outline" color="accent">
          Outline with Icon
        </Button>
      </div>

      {/* Custom ClassName */}
      <div className="space-x-4">
        <Button className="bg-yellow-500 hover:bg-yellow-600 text-black">
          Custom Styled
        </Button>
      </div>
    </div>
  ),
};
