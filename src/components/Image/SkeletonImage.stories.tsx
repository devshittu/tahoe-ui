// src/components/Image/SkeletonImage.stories.tsx

import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import SkeletonImage from './SkeletonImage';
import { BaseImageProps } from './BaseImage'; // Import BaseImageProps
import { AppProvider } from '@/providers/app';
import clsx from 'clsx';
import { twMerge } from 'tailwind-merge';

const meta: Meta<typeof SkeletonImage> = {
  title: 'Image/SkeletonImage',
  component: SkeletonImage,
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
    src: 'https://dummyimage.com/300x200/000/fff&text=Skeleton',
    alt: 'Sample Skeleton Image',
    shape: 'none',
    containerClassName: '',
    className: '',
    fallback: {
      fallbackSrc: 'https://dummyimage.com/300x200/ff0000/ffffff&text=Fallback',
      fallbackNode: null,
    },
    onLoaded: undefined,
    onErrorFallback: undefined,
  },
  argTypes: {
    src: {
      control: 'text',
      description: 'Source URL of the skeleton image.',
      table: {
        type: { summary: 'string | StaticImageData' },
        defaultValue: {
          summary: 'https://dummyimage.com/300x200/000/fff&text=Skeleton',
        },
      },
    },
    alt: {
      control: 'text',
      description: 'Alt text for the skeleton image.',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'Sample Skeleton Image' },
      },
    },
    shape: {
      control: 'select',
      options: ['none', 'rounded', 'circle'],
      description: 'Shape of the skeleton image.',
      table: {
        type: { summary: `'none' | 'rounded' | 'circle'` },
        defaultValue: { summary: `'none'` },
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
    className: {
      control: 'text',
      description: 'Additional CSS classes for the image.',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: '""' },
      },
    },
    fallback: {
      control: 'object',
      description: 'Fallback configuration for the skeleton image.',
      table: {
        type: { summary: 'ImageFallback' },
        defaultValue: {
          summary: `{ fallbackSrc: 'https://dummyimage.com/300x200/ff0000/ffffff&text=Fallback', fallbackNode: null }`,
        },
      },
    },
    onLoaded: {
      action: 'loaded',
      description: 'Callback when the skeleton image has successfully loaded.',
      table: {
        type: { summary: '() => void' },
        defaultValue: { summary: 'undefined' },
      },
    },
    onErrorFallback: {
      action: 'errorFallback',
      description:
        'Callback when the skeleton image fails to load and fallback is used.',
      table: {
        type: { summary: '() => void' },
        defaultValue: { summary: 'undefined' },
      },
    },
  },
};

export default meta;
type Story = StoryObj<BaseImageProps>; // Use BaseImageProps instead of SkeletonImageProps

/**
 * Default SkeletonImage story demonstrating basic usage.
 */
export const Default: Story = {};

/**
 * SkeletonImage with Rounded Shape.
 */
export const RoundedShape: Story = {
  args: {
    shape: 'rounded',
    src: 'https://dummyimage.com/300x200/000/fff&text=Rounded',
    alt: 'Rounded Skeleton Image',
  },
};

/**
 * SkeletonImage with Circle Shape.
 */
export const CircleShape: Story = {
  args: {
    shape: 'circle',
    src: 'https://dummyimage.com/200x200/000/fff&text=Circle',
    alt: 'Circle Skeleton Image',
    width: 200,
    height: 200,
  },
};

/**
 * SkeletonImage with Fallback Source.
 */
export const WithFallbackSrc: Story = {
  args: {
    fallback: {
      fallbackSrc: 'https://dummyimage.com/300x200/ff0000/ffffff&text=Fallback',
    },
    src: 'https://dummyimage.com/300x200/000/fff&text=Skeleton', // Original src (simulated as failing)
    alt: 'Skeleton Image with Fallback Source',
  },
};

/**
 * SkeletonImage with Fallback Node.
 */
export const WithFallbackNode: Story = {
  args: {
    fallback: {
      fallbackNode: (
        <div className="flex items-center justify-center w-full h-full bg-gray-200 text-gray-500">
          <span>Image failed to load.</span>
        </div>
      ),
    },
    src: 'https://dummyimage.com/300x200/000/fff&text=Skeleton', // Original src (simulated as failing)
    alt: 'Skeleton Image with Fallback Node',
  },
};

/**
 * SkeletonImage with Combined Props.
 */
export const CombinedProps: Story = {
  args: {
    shape: 'rounded',
    fallback: {
      fallbackSrc: 'https://dummyimage.com/300x200/ff0000/ffffff&text=Fallback',
    },
    src: 'https://dummyimage.com/300x200/000/fff&text=Skeleton',
    alt: 'Combined Props Skeleton Image',
    containerClassName: 'shadow-md',
    className: 'border-2 border-blue-500',
  },
};

/**
 * Showcase Story demonstrating multiple SkeletonImage usages together.
 */
export const Showcase: Story = {
  render: (args: BaseImageProps) => (
    <div className="grid grid-cols-3 gap-6">
      {/* 1) Default SkeletonImage */}
      <SkeletonImage
        {...args}
        src="https://dummyimage.com/300x200/000/fff&text=Default"
        alt="Default Skeleton Image"
      />

      {/* 2) Rounded Shape SkeletonImage */}
      <SkeletonImage
        {...args}
        shape="rounded"
        src="https://dummyimage.com/300x200/000/fff&text=Rounded"
        alt="Rounded Skeleton Image"
      />

      {/* 3) Circle Shape SkeletonImage */}
      <SkeletonImage
        {...args}
        shape="circle"
        src="https://dummyimage.com/200x200/000/fff&text=Circle"
        alt="Circle Skeleton Image"
        width={200}
        height={200}
      />

      {/* 4) With Fallback Source */}
      <SkeletonImage
        {...args}
        src="https://dummyimage.com/300x200/000/fff&text=Skeleton" // Simulated as failing
        alt="Skeleton Image with Fallback Source"
        fallback={{
          fallbackSrc:
            'https://dummyimage.com/300x200/ff0000/ffffff&text=Fallback',
        }}
      />

      {/* 5) With Fallback Node */}
      <SkeletonImage
        {...args}
        src="https://dummyimage.com/300x200/000/fff&text=Skeleton" // Simulated as failing
        alt="Skeleton Image with Fallback Node"
        fallback={{
          fallbackNode: (
            <div className="flex items-center justify-center w-full h-full bg-gray-200 text-gray-500">
              <span>Image failed to load.</span>
            </div>
          ),
        }}
      />

      {/* 6) Combined Props SkeletonImage */}
      <SkeletonImage
        {...args}
        shape="rounded"
        fallback={{
          fallbackSrc:
            'https://dummyimage.com/300x200/ff0000/ffffff&text=Fallback',
        }}
        src="https://dummyimage.com/300x200/000/fff&text=Skeleton"
        alt="Combined Props Skeleton Image"
        containerClassName="shadow-md"
        className="border-2 border-blue-500"
      />
    </div>
  ),
};
