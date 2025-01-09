// src/components/Image/ThumbnailImage.stories.tsx

import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import ThumbnailImage, { ThumbnailImageProps } from './ThumbnailImage';
import { AppProvider } from '@/providers/app';
import clsx from 'clsx';
import { twMerge } from 'tailwind-merge';

const meta: Meta<typeof ThumbnailImage> = {
  title: 'Image/ThumbnailImage',
  component: ThumbnailImage,
  decorators: [
    (Story) => (
      <AppProvider>
        {/* Container with padding and grid layout for better visualization */}
        <div className="p-4 grid grid-cols-3 gap-6 max-w-4xl border border-gray-200 rounded-lg">
          <Story />
        </div>
      </AppProvider>
    ),
  ],
  args: {
    href: '#',
    src: 'https://dummyimage.com/150x100/000/fff&text=Thumbnail',
    alt: 'Sample Thumbnail Image',
    shape: 'rounded',
    containerClassName: '',
    className: '',
  },
  argTypes: {
    href: {
      control: 'text',
      description: 'URL to link the thumbnail image to.',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: '#' },
      },
    },
    src: {
      control: 'text',
      description: 'Source URL of the thumbnail image.',
      table: {
        type: { summary: 'string | StaticImageData' },
        defaultValue: {
          summary: 'https://dummyimage.com/150x100/000/fff&text=Thumbnail',
        },
      },
    },
    alt: {
      control: 'text',
      description: 'Alt text for the thumbnail image.',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'Sample Thumbnail Image' },
      },
    },
    shape: {
      control: 'select',
      options: ['none', 'rounded', 'circle'],
      description: 'Shape of the thumbnail image.',
      table: {
        type: { summary: `'none' | 'rounded' | 'circle'` },
        defaultValue: { summary: `'rounded'` },
      },
    },
    containerClassName: {
      control: 'text',
      description: 'Additional CSS classes for the thumbnail container.',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: '""' },
      },
    },
    className: {
      control: 'text',
      description: 'Additional CSS classes for the thumbnail image.',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: '""' },
      },
    },
  },
};

export default meta;
type Story = StoryObj<ThumbnailImageProps>;

/**
 * Default ThumbnailImage story demonstrating basic usage.
 */
export const Default: Story = {};

/**
 * ThumbnailImage with Rounded Shape.
 */
export const RoundedShape: Story = {
  args: {
    shape: 'rounded',
    src: 'https://dummyimage.com/150x100/000/fff&text=Rounded',
    alt: 'Rounded Thumbnail Image',
  },
};

/**
 * ThumbnailImage with Circle Shape.
 */
export const CircleShape: Story = {
  args: {
    shape: 'circle',
    src: 'https://dummyimage.com/100x100/000/fff&text=Circle',
    alt: 'Circle Thumbnail Image',
    width: 100,
    height: 100,
  },
};

/**
 * ThumbnailImage with Custom ClassName.
 */
export const CustomClassName: Story = {
  args: {
    className: 'border-2 border-blue-500',
    src: 'https://dummyimage.com/150x100/000/fff&text=Custom+Class',
    alt: 'Custom Class Thumbnail Image',
  },
};

/**
 * ThumbnailImage with External Link.
 */
export const ExternalLink: Story = {
  args: {
    href: 'https://www.example.com',
    src: 'https://dummyimage.com/150x100/000/fff&text=External+Link',
    alt: 'External Link Thumbnail Image',
  },
};

/**
 * ThumbnailImage with Combined Props.
 */
export const CombinedProps: Story = {
  args: {
    href: 'https://www.example.com',
    shape: 'circle',
    className: 'border-4 border-green-500',
    containerClassName: 'shadow-md',
    src: 'https://dummyimage.com/100x100/000/fff&text=Combined',
    alt: 'Combined Props Thumbnail Image',
    width: 100,
    height: 100,
  },
};

/**
 * Showcase Story demonstrating multiple ThumbnailImage usages together.
 */
export const Showcase: Story = {
  render: (args: ThumbnailImageProps) => (
    <div className="grid grid-cols-3 gap-6">
      {/* 1) Default ThumbnailImage */}
      <ThumbnailImage
        {...args}
        href="#"
        src="https://dummyimage.com/150x100/000/fff&text=Default"
        alt="Default Thumbnail Image"
      />

      {/* 2) Rounded Shape ThumbnailImage */}
      <ThumbnailImage
        {...args}
        shape="rounded"
        src="https://dummyimage.com/150x100/000/fff&text=Rounded"
        alt="Rounded Thumbnail Image"
      />

      {/* 3) Circle Shape ThumbnailImage */}
      <ThumbnailImage
        {...args}
        shape="circle"
        src="https://dummyimage.com/100x100/000/fff&text=Circle"
        alt="Circle Thumbnail Image"
        width={100}
        height={100}
      />

      {/* 4) Custom ClassName ThumbnailImage */}
      <ThumbnailImage
        {...args}
        className="border-2 border-blue-500"
        src="https://dummyimage.com/150x100/000/fff&text=Custom+Class"
        alt="Custom Class Thumbnail Image"
      />

      {/* 5) External Link ThumbnailImage */}
      <ThumbnailImage
        {...args}
        href="https://www.example.com"
        src="https://dummyimage.com/150x100/000/fff&text=External+Link"
        alt="External Link Thumbnail Image"
      />

      {/* 6) Combined Props ThumbnailImage */}
      <ThumbnailImage
        {...args}
        href="https://www.example.com"
        shape="circle"
        className="border-4 border-green-500"
        containerClassName="shadow-md"
        src="https://dummyimage.com/100x100/000/fff&text=Combined"
        alt="Combined Props Thumbnail Image"
        width={100}
        height={100}
      />
    </div>
  ),
};
