// src/components/Image/RetinaImage.stories.tsx

import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import RetinaImage, { RetinaImageProps } from './RetinaImage';
import { AppProvider } from '@/providers/app';
import clsx from 'clsx';
import { twMerge } from 'tailwind-merge';

const meta: Meta<typeof RetinaImage> = {
  title: 'Image/RetinaImage',
  component: RetinaImage,
  decorators: [
    (Story) => (
      <AppProvider>
        {/* Container with padding and flex layout for better visualization */}
        <div className="p-4 flex flex-col items-center space-y-6 border border-gray-200 rounded-lg">
          <Story />
        </div>
      </AppProvider>
    ),
  ],
  args: {
    src: 'https://dummyimage.com/300x200/000/fff&text=Retina',
    alt: 'Sample Retina Image',
    width: 300,
    height: 200,
    retina: false,
    className: '',
    style: {},
  },
  argTypes: {
    src: {
      control: 'text',
      description: 'Source URL of the retina image.',
      table: {
        type: { summary: 'string | StaticImageData' },
        defaultValue: {
          summary: 'https://dummyimage.com/300x200/000/fff&text=Retina',
        },
      },
    },
    alt: {
      control: 'text',
      description: 'Alt text for the retina image.',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'Sample Retina Image' },
      },
    },
    width: {
      control: 'number',
      description: 'Width of the image in pixels.',
      table: {
        type: { summary: 'number' },
        defaultValue: { summary: '300' },
      },
    },
    height: {
      control: 'number',
      description: 'Height of the image in pixels.',
      table: {
        type: { summary: 'number' },
        defaultValue: { summary: '200' },
      },
    },
    retina: {
      control: 'boolean',
      description: 'If true, generates srcSet for retina displays.',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    className: {
      control: 'text',
      description: 'Additional CSS classes for the image container.',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: '""' },
      },
    },
    style: {
      control: 'object',
      description: 'Inline styles for the image container.',
      table: {
        type: { summary: 'CSSProperties' },
        defaultValue: { summary: '{}' },
      },
    },
  },
};

export default meta;
type Story = StoryObj<RetinaImageProps>;

/**
 * Default RetinaImage story demonstrating basic usage without retina support.
 */
export const Default: Story = {};

/**
 * RetinaImage with Retina Support.
 */
export const WithRetina: Story = {
  args: {
    retina: true,
    src: 'https://dummyimage.com/300x200/000/fff&text=Retina',
    alt: 'Retina Supported Image',
  },
};

/**
 * RetinaImage with Custom ClassName.
 */
export const CustomClassName: Story = {
  args: {
    className: 'rounded-lg shadow-md',
    src: 'https://dummyimage.com/300x200/000/fff&text=Custom+Class',
    alt: 'Custom Class Retina Image',
  },
};

/**
 * RetinaImage with Inline Styles.
 */
export const WithInlineStyles: Story = {
  args: {
    style: { border: '2px solid #4B5563' },
    src: 'https://dummyimage.com/300x200/000/fff&text=Inline+Styles',
    alt: 'Inline Styled Retina Image',
  },
};

/**
 * RetinaImage with Combined Props.
 */
export const CombinedProps: Story = {
  args: {
    retina: true,
    className: 'rounded-full border-4 border-blue-500',
    style: { boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)' },
    src: 'https://dummyimage.com/300x200/000/fff&text=Combined',
    alt: 'Combined Props Retina Image',
  },
};

/**
 * Showcase Story demonstrating multiple RetinaImage usages together.
 */
export const Showcase: Story = {
  render: (args: RetinaImageProps) => (
    <div className="space-y-6 flex flex-col items-center">
      {/* 1) Default RetinaImage */}
      <RetinaImage
        {...args}
        src="https://dummyimage.com/300x200/000/fff&text=Default"
        alt="Default Retina Image"
        width={300}
        height={200}
      />

      {/* 2) With Retina Support */}
      <RetinaImage
        {...args}
        retina
        src="https://dummyimage.com/300x200/000/fff&text=Retina+Supported"
        alt="Retina Supported Image"
        width={300}
        height={200}
      />

      {/* 3) Custom ClassName */}
      <RetinaImage
        {...args}
        className="rounded-lg shadow-md"
        src="https://dummyimage.com/300x200/000/fff&text=Custom+Class"
        alt="Custom Class Retina Image"
        width={300}
        height={200}
      />

      {/* 4) With Inline Styles */}
      <RetinaImage
        {...args}
        style={{ border: '2px solid #4B5563' }}
        src="https://dummyimage.com/300x200/000/fff&text=Inline+Styles"
        alt="Inline Styled Retina Image"
        width={300}
        height={200}
      />

      {/* 5) Combined Props */}
      <RetinaImage
        {...args}
        retina
        className="rounded-full border-4 border-blue-500"
        style={{ boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)' }}
        src="https://dummyimage.com/300x200/000/fff&text=Combined"
        alt="Combined Props Retina Image"
        width={300}
        height={200}
      />
    </div>
  ),
};
