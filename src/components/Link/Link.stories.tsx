// src/components/Link/Link.stories.tsx

import React, { useRef, useEffect } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import Link from './Link';
import { AppProvider } from '@/providers/app';

const meta: Meta<typeof Link> = {
  title: 'Navigation/Link',
  component: Link,
  decorators: [
    (Story) => (
      <AppProvider>
        <div className="p-4 space-y-4">
          <Story />
        </div>
      </AppProvider>
    ),
  ],
  args: {
    href: '/',
    children: 'Link Text',
    variant: 'primary',
    external: false,
    className: '',
    activeClassName: 'text-accent font-semibold',
    onClick: undefined,
  },
  argTypes: {
    href: {
      control: 'text',
      description: 'Destination URL of the link.',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: '/' },
      },
    },
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'neutral'],
      description: 'Styling variant of the link.',
      table: {
        type: { summary: `'primary' | 'secondary' | 'neutral'` },
        defaultValue: { summary: `'primary'` },
      },
    },
    external: {
      control: 'boolean',
      description: 'Whether the link is external.',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    className: {
      control: 'text',
      description: 'Additional CSS classes for the link.',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: '""' },
      },
    },
    activeClassName: {
      control: 'text',
      description: 'CSS classes applied when the link is active.',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: '"text-accent font-semibold"' },
      },
    },
    onClick: {
      action: 'clicked',
      description: 'Click event handler.',
      table: {
        type: { summary: '(event: MouseEvent<HTMLAnchorElement>) => void' },
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Link>;

/**
 * Default Link story demonstrating internal navigation.
 */
export const Default: Story = {
  args: {
    href: '/',
    children: 'Go to Home',
  },
};

/**
 * External Link story.
 */
export const ExternalLink: Story = {
  args: {
    href: 'https://www.google.com',
    external: true,
    children: 'Visit Google',
  },
};

/**
 * Active Link story.
 * Assumes the current pathname is '/' to demonstrate active styling.
 */
export const ActiveLink: Story = {
  args: {
    href: '/',
    children: 'Home (Active)',
  },
};

/**
 * Link with different variants.
 */
export const Variants: Story = {
  render: () => (
    <div className="space-x-4">
      <Link href="/primary" variant="primary">
        Primary Link
      </Link>
      <Link href="/secondary" variant="secondary">
        Secondary Link
      </Link>
      <Link href="/neutral" variant="neutral">
        Neutral Link
      </Link>
    </div>
  ),
};

/**
 * Link with custom className.
 */
export const CustomClassName: Story = {
  args: {
    href: '/custom',
    children: 'Custom Styled Link',
    className: 'underline decoration-accent',
  },
};

/**
 * Link with onClick handler.
 */
export const ClickHandler: Story = {
  args: {
    href: '/click',
    children: 'Click Me',
    onClick: () => alert('Link clicked!'),
  },
};

/**
 * Link using ref.
 */
export const WithRef: Story = {
  render: () => {
    const ref = useRef<HTMLAnchorElement>(null);

    useEffect(() => {
      if (ref.current) {
        console.log('Link ref:', ref.current);
      }
    }, []);

    return (
      <Link href="/ref" ref={ref} variant="secondary">
        Link with Ref
      </Link>
    );
  },
};

/**
 * Showcase of various Link usages.
 */
export const Showcase: Story = {
  render: () => (
    <div className="space-y-4">
      <Link href="/" variant="primary">
        Home
      </Link>
      <Link href="/about" variant="secondary">
        About Us
      </Link>
      <Link href="https://www.example.com" external variant="neutral">
        External Example
      </Link>
      <Link
        href="/contact"
        variant="primary"
        onClick={() => console.log('Contact clicked!')}
      >
        Contact Us
      </Link>
      <Link href="/services" className="text-green-500 hover:text-green-700">
        Our Services
      </Link>
    </div>
  ),
};
