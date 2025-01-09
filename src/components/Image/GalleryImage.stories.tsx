// src/components/Image/GalleryImage.stories.tsx

import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import GalleryImage, { GalleryImageProps } from './GalleryImage';
import { AppProvider } from '@/providers/app';
import clsx from 'clsx';
import { twMerge } from 'tailwind-merge';

const meta: Meta<typeof GalleryImage> = {
  title: 'Image/GalleryImage',
  component: GalleryImage,
  decorators: [
    (Story) => (
      <AppProvider>
        {/* Container with padding and grid layout for gallery visualization */}
        <div className="p-4 grid grid-cols-3 gap-6 max-w-4xl border border-gray-200 rounded-lg">
          <Story />
        </div>
      </AppProvider>
    ),
  ],
  args: {
    src: 'https://dummyimage.com/300x200/000/fff&text=Gallery',
    alt: 'Sample Gallery Image',
    hoverEffect: 'none',
    onClick: undefined,
    className: '',
    containerClassName: '',
  },
  argTypes: {
    src: {
      control: 'text',
      description: 'Source URL of the gallery image.',
      table: {
        type: { summary: 'string | StaticImageData' },
        defaultValue: {
          summary: 'https://dummyimage.com/300x200/000/fff&text=Gallery',
        },
      },
    },
    alt: {
      control: 'text',
      description: 'Alt text for the gallery image.',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'Sample Gallery Image' },
      },
    },
    hoverEffect: {
      control: 'select',
      options: ['none', 'zoom', 'grayscale'],
      description: 'Hover effect to apply to the image.',
      table: {
        type: { summary: `'none' | 'zoom' | 'grayscale'` },
        defaultValue: { summary: `'none'` },
      },
    },
    onClick: {
      action: 'clicked',
      description: 'Callback function when the image is clicked.',
      table: {
        type: { summary: '() => void' },
        defaultValue: { summary: 'undefined' },
      },
    },
    className: {
      control: 'text',
      description: 'Additional CSS classes for the image.',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: '""' },
      },
    },
    containerClassName: {
      control: 'text',
      description: 'Additional CSS classes for the image container.',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: '""' },
      },
    },
  },
};

export default meta;
type Story = StoryObj<GalleryImageProps>;

/**
 * Default GalleryImage story demonstrating basic usage.
 */
export const Default: Story = {};

/**
 * GalleryImage with Zoom Hover Effect.
 */
export const ZoomHoverEffect: Story = {
  args: {
    hoverEffect: 'zoom',
    src: 'https://dummyimage.com/300x200/000/fff&text=Zoom',
    alt: 'Zoom Hover Gallery Image',
  },
};

/**
 * GalleryImage with Grayscale Hover Effect.
 */
export const GrayscaleHoverEffect: Story = {
  args: {
    hoverEffect: 'grayscale',
    src: 'https://dummyimage.com/300x200/000/fff&text=Grayscale',
    alt: 'Grayscale Hover Gallery Image',
  },
};

/**
 * GalleryImage with Click Handler.
 */
export const ClickableGalleryImage: Story = {
  args: {
    onClick: () => alert('Gallery Image Clicked!'),
    src: 'https://dummyimage.com/300x200/000/fff&text=Clickable',
    alt: 'Clickable Gallery Image',
  },
};

/**
 * GalleryImage with Custom ClassName.
 */
export const CustomClassName: Story = {
  args: {
    hoverEffect: 'zoom',
    className: 'border-4 border-blue-500',
    src: 'https://dummyimage.com/300x200/000/fff&text=Custom+Class',
    alt: 'Custom Class Gallery Image',
  },
};

/**
 * GalleryImage with Combined Props.
 */
export const CombinedProps: Story = {
  args: {
    hoverEffect: 'grayscale',
    onClick: () => alert('Combined Props Image Clicked!'),
    className: 'border-2 border-green-500',
    containerClassName: 'shadow-lg',
    src: 'https://dummyimage.com/300x200/000/fff&text=Combined',
    alt: 'Combined Props Gallery Image',
  },
};

/**
 * Showcase Story demonstrating multiple GalleryImage usages together.
 */
export const Showcase: Story = {
  render: (args: GalleryImageProps) => (
    <div className="grid grid-cols-3 gap-6">
      {/* 1) Default GalleryImage */}
      <GalleryImage
        {...args}
        src="https://dummyimage.com/300x200/000/fff&text=Default"
        alt="Default Gallery Image"
      />

      {/* 2) Zoom Hover Effect */}
      <GalleryImage
        {...args}
        hoverEffect="zoom"
        src="https://dummyimage.com/300x200/000/fff&text=Zoom+Hover"
        alt="Zoom Hover Gallery Image"
      />

      {/* 3) Grayscale Hover Effect */}
      <GalleryImage
        {...args}
        hoverEffect="grayscale"
        src="https://dummyimage.com/300x200/000/fff&text=Grayscale+Hover"
        alt="Grayscale Hover Gallery Image"
      />

      {/* 4) Clickable GalleryImage */}
      <GalleryImage
        {...args}
        onClick={() => alert('Gallery Image Clicked!')}
        src="https://dummyimage.com/300x200/000/fff&text=Clickable"
        alt="Clickable Gallery Image"
      />

      {/* 5) Custom ClassName GalleryImage */}
      <GalleryImage
        {...args}
        hoverEffect="zoom"
        className="border-4 border-blue-500"
        src="https://dummyimage.com/300x200/000/fff&text=Custom+Class"
        alt="Custom Class Gallery Image"
      />

      {/* 6) Combined Props GalleryImage */}
      <GalleryImage
        {...args}
        hoverEffect="grayscale"
        onClick={() => alert('Combined Props Image Clicked!')}
        className="border-2 border-green-500"
        containerClassName="shadow-lg"
        src="https://dummyimage.com/300x200/000/fff&text=Combined"
        alt="Combined Props Gallery Image"
      />
    </div>
  ),
};
