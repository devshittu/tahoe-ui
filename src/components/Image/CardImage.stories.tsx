// src/components/Image/CardImage.stories.tsx

import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import CardImage, { CardImageProps } from './CardImage';
import { AppProvider } from '@/providers/app';
import clsx from 'clsx';
import { twMerge } from 'tailwind-merge';

const meta: Meta<typeof CardImage> = {
  title: 'Image/CardImage',
  component: CardImage,
  decorators: [
    (Story) => (
      <AppProvider>
        {/* Container with padding and grid layout for better visualization */}
        <div className="p-4 grid grid-cols-2 gap-6 max-w-3xl border border-gray-200 rounded-lg">
          <Story />
        </div>
      </AppProvider>
    ),
  ],
  args: {
    src: 'https://dummyimage.com/600x400/000/fff&text=Card',
    alt: 'Sample Card Image',
    overlayText: 'Sample Overlay Text',
    overlayPosition: 'bottom',
    overlayBgColor: 'bg-black bg-opacity-50',
    className: '',
    containerClassName: '',
    caption: '',
  },
  argTypes: {
    src: {
      control: 'text',
      description: 'Source URL of the card image.',
      table: {
        type: { summary: 'string | StaticImageData' },
        defaultValue: {
          summary: 'https://dummyimage.com/600x400/000/fff&text=Card',
        },
      },
    },
    alt: {
      control: 'text',
      description: 'Alt text for the card image.',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'Sample Card Image' },
      },
    },
    overlayText: {
      control: 'text',
      description: 'Text to display as an overlay on the image.',
      table: {
        type: { summary: 'React.ReactNode' },
        defaultValue: { summary: 'Sample Overlay Text' },
      },
    },
    overlayPosition: {
      control: 'select',
      options: ['top', 'center', 'bottom'],
      description: 'Position of the overlay text.',
      table: {
        type: { summary: `'top' | 'center' | 'bottom'` },
        defaultValue: { summary: `'bottom'` },
      },
    },
    overlayBgColor: {
      control: 'text',
      description: 'Background color classes for the overlay.',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: `'bg-black bg-opacity-50'` },
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
      description: 'Additional CSS classes for the figure container.',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: '""' },
      },
    },
    caption: {
      control: 'text',
      description: 'Caption text for the image.',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: '""' },
      },
    },
  },
};

export default meta;
type Story = StoryObj<CardImageProps>;

/**
 * Default CardImage story demonstrating basic usage.
 */
export const Default: Story = {};

/**
 * CardImage with Top Overlay.
 */
export const TopOverlay: Story = {
  args: {
    overlayPosition: 'top',
    overlayText: 'Top Overlay Text',
  },
};

/**
 * CardImage with Center Overlay.
 */
export const CenterOverlay: Story = {
  args: {
    overlayPosition: 'center',
    overlayText: 'Center Overlay Text',
  },
};

/**
 * CardImage with Custom Overlay Background.
 */
export const CustomOverlayBg: Story = {
  args: {
    overlayBgColor: 'bg-blue-500 bg-opacity-75',
    overlayText: 'Custom Blue Overlay',
  },
};

/**
 * CardImage with Caption.
 */
export const WithCaption: Story = {
  args: {
    caption: 'This is a caption for the card image.',
  },
};

/**
 * CardImage with Combined Props.
 */
export const CombinedProps: Story = {
  args: {
    overlayPosition: 'center',
    overlayBgColor: 'bg-green-700 bg-opacity-60',
    overlayText: 'Combined Overlay',
    caption: 'Combined Props Caption',
    containerClassName: 'shadow-lg',
    className: 'border-2 border-green-500',
  },
};

/**
 * Showcase Story demonstrating multiple CardImage usages together.
 */
export const Showcase: Story = {
  render: (args: CardImageProps) => (
    <div className="space-y-6">
      {/* 1) Default CardImage */}
      <CardImage
        {...args}
        src="https://dummyimage.com/600x400/000/fff&text=Default"
        alt="Default Card Image"
        overlayText="Default Overlay"
      />

      {/* 2) Top Overlay */}
      <CardImage
        {...args}
        src="https://dummyimage.com/600x400/000/fff&text=Top+Overlay"
        alt="Top Overlay Card Image"
        overlayPosition="top"
        overlayText="Top Overlay Text"
      />

      {/* 3) Center Overlay */}
      <CardImage
        {...args}
        src="https://dummyimage.com/600x400/000/fff&text=Center+Overlay"
        alt="Center Overlay Card Image"
        overlayPosition="center"
        overlayText="Center Overlay Text"
      />

      {/* 4) Custom Overlay Background */}
      <CardImage
        {...args}
        src="https://dummyimage.com/600x400/000/fff&text=Custom+Overlay"
        alt="Custom Overlay Card Image"
        overlayBgColor="bg-blue-500 bg-opacity-75"
        overlayText="Custom Blue Overlay"
      />

      {/* 5) With Caption */}
      <CardImage
        {...args}
        src="https://dummyimage.com/600x400/000/fff&text=With+Caption"
        alt="Captioned Card Image"
        caption="This is a caption for the card image."
      />

      {/* 6) Combined Props CardImage */}
      <CardImage
        {...args}
        src="https://dummyimage.com/600x400/000/fff&text=Combined+Props"
        alt="Combined Props Card Image"
        overlayPosition="center"
        overlayBgColor="bg-green-700 bg-opacity-60"
        overlayText="Combined Overlay"
        caption="Combined Props Caption"
        containerClassName="shadow-lg"
        className="border-2 border-green-500"
      />
    </div>
  ),
};
