// src/components/Image/AvatarImage.stories.tsx

import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import AvatarImage, { AvatarImageProps } from './AvatarImage';
import { AppProvider } from '@/providers/app';
import clsx from 'clsx';
import { twMerge } from 'tailwind-merge';

const meta: Meta<typeof AvatarImage> = {
  title: 'Image/AvatarImage',
  component: AvatarImage,
  decorators: [
    (Story) => (
      <AppProvider>
        {/* Container with padding and grid layout for better visualization */}
        <div className="p-4 grid grid-cols-2 gap-6 max-w-2xl border border-gray-200 rounded-lg">
          <Story />
        </div>
      </AppProvider>
    ),
  ],
  args: {
    src: 'https://dummyimage.com/200x200/000/fff&text=Avatar',
    alt: 'Sample Avatar',
    size: 'md',
    border: false,
    shape: 'circle',
    width: 200,
    height: 200,
    containerClassName: '',
    className: '',
  },
  argTypes: {
    src: {
      control: 'text',
      description: 'Source URL of the avatar image.',
      table: {
        type: { summary: 'string | StaticImageData' },
        defaultValue: { summary: 'https://dummyimage.com/200x200/000/fff&text=Avatar' },
      },
    },
    alt: {
      control: 'text',
      description: 'Alt text for the avatar image.',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'Sample Avatar' },
      },
    },
    size: {
      control: 'select',
      options: ['xs', 'sm', 'md', 'lg', 'xl'],
      description: 'Size of the avatar.',
      table: {
        type: { summary: `'xs' | 'sm' | 'md' | 'lg' | 'xl'` },
        defaultValue: { summary: `'md'` },
      },
    },
    border: {
      control: 'boolean',
      description: 'If true, applies a border ring around the avatar.',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    shape: {
      control: 'select',
      options: ['none', 'rounded', 'circle'],
      description: 'Shape of the avatar image.',
      table: {
        type: { summary: `'none' | 'rounded' | 'circle'` },
        defaultValue: { summary: `'circle'` },
      },
    },
    width: {
      control: 'number',
      description: 'Width of the avatar in pixels.',
      table: {
        type: { summary: 'number' },
        defaultValue: { summary: '200' },
      },
    },
    height: {
      control: 'number',
      description: 'Height of the avatar in pixels.',
      table: {
        type: { summary: 'number' },
        defaultValue: { summary: '200' },
      },
    },
    containerClassName: {
      control: 'text',
      description: 'Additional CSS classes for the avatar container.',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: '""' },
      },
    },
    className: {
      control: 'text',
      description: 'Additional CSS classes for the avatar image.',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: '""' },
      },
    },
  },
};

export default meta;
type Story = StoryObj<AvatarImageProps>;

/**
 * Default AvatarImage story demonstrating basic usage.
 */
export const Default: Story = {};

/**
 * AvatarImage with Extra Small Size.
 */
export const ExtraSmallSize: Story = {
  args: {
    size: 'xs',
    src: 'https://dummyimage.com/40x40/000/fff&text=XS',
    alt: 'Extra Small Avatar',
    width: 40,
    height: 40,
  },
};

/**
 * AvatarImage with Small Size.
 */
export const SmallSize: Story = {
  args: {
    size: 'sm',
    src: 'https://dummyimage.com/60x60/000/fff&text=SM',
    alt: 'Small Avatar',
    width: 60,
    height: 60,
  },
};

/**
 * AvatarImage with Large Size and Border.
 */
export const LargeSizeWithBorder: Story = {
  args: {
    size: 'lg',
    border: true,
    src: 'https://dummyimage.com/120x120/000/fff&text=LG',
    alt: 'Large Avatar with Border',
    width: 120,
    height: 120,
  },
};

/**
 * AvatarImage with Extra Large Size.
 */
export const ExtraLargeSize: Story = {
  args: {
    size: 'xl',
    src: 'https://dummyimage.com/160x160/000/fff&text=XL',
    alt: 'Extra Large Avatar',
    width: 160,
    height: 160,
  },
};

/**
 * AvatarImage with Rounded Shape.
 */
export const RoundedShape: Story = {
  args: {
    shape: 'rounded',
    src: 'https://dummyimage.com/200x200/000/fff&text=Rounded',
    alt: 'Rounded Avatar',
    width: 200,
    height: 200,
  },
};

/**
 * AvatarImage with Combined Props.
 */
export const CombinedProps: Story = {
  args: {
    size: 'lg',
    border: true,
    shape: 'circle',
    src: 'https://dummyimage.com/120x120/000/fff&text=Combined',
    alt: 'Combined Props Avatar',
    width: 120,
    height: 120,
    containerClassName: 'shadow-md',
    className: 'border-2 border-blue-500',
  },
};

/**
 * Showcase Story demonstrating multiple AvatarImage usages together.
 */
export const Showcase: Story = {
  render: (args: AvatarImageProps) => (
    <div className="grid grid-cols-3 gap-6">
      {/* 1) Extra Small Avatar */}
      <AvatarImage
        {...args}
        size="xs"
        src="https://dummyimage.com/40x40/000/fff&text=XS"
        alt="Extra Small Avatar"
        width={40}
        height={40}
      />

      {/* 2) Small Avatar */}
      <AvatarImage
        {...args}
        size="sm"
        src="https://dummyimage.com/60x60/000/fff&text=SM"
        alt="Small Avatar"
        width={60}
        height={60}
      />

      {/* 3) Medium Avatar */}
      <AvatarImage
        {...args}
        size="md"
        src="https://dummyimage.com/80x80/000/fff&text=MD"
        alt="Medium Avatar"
        width={80}
        height={80}
      />

      {/* 4) Large Avatar with Border */}
      <AvatarImage
        {...args}
        size="lg"
        border
        src="https://dummyimage.com/120x120/000/fff&text=LG"
        alt="Large Avatar with Border"
        width={120}
        height={120}
      />

      {/* 5) Extra Large Avatar */}
      <AvatarImage
        {...args}
        size="xl"
        src="https://dummyimage.com/160x160/000/fff&text=XL"
        alt="Extra Large Avatar"
        width={160}
        height={160}
      />

      {/* 6) Rounded Shape Avatar */}
      <AvatarImage
        {...args}
        shape="rounded"
        src="https://dummyimage.com/200x200/000/fff&text=Rounded"
        alt="Rounded Avatar"
        width={200}
        height={200}
      />

      {/* 7) Combined Props Avatar */}
      <AvatarImage
        {...args}
        size="lg"
        border
        shape="circle"
        src="https://dummyimage.com/120x120/000/fff&text=Combined"
        alt="Combined Props Avatar"
        width={120}
        height={120}
        containerClassName="shadow-md"
        className="border-2 border-blue-500"
      />
    </div>
  ),
};
