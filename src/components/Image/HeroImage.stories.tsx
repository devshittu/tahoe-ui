// src/components/Image/HeroImage.stories.tsx

import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import HeroImage, { HeroImageProps } from './HeroImage';
import { AppProvider } from '@/providers/app';
import clsx from 'clsx';
import { twMerge } from 'tailwind-merge';

const meta: Meta<typeof HeroImage> = {
  title: 'Image/HeroImage',
  component: HeroImage,
  decorators: [
    (Story) => (
      <AppProvider>
        {/* Container with padding and full-width layout for better visualization */}
        <div className="p-4 w-full border border-gray-200 rounded-lg">
          <Story />
        </div>
      </AppProvider>
    ),
  ],
  args: {
    src: 'https://dummyimage.com/1200x400/000/fff&text=Hero',
    alt: 'Sample Hero Image',
    overlayText: 'Welcome to Our Website',
    // Removed overlayBgColor since it's not a valid prop
    className: '',
    containerClassName: '',
  },
  argTypes: {
    src: {
      control: 'text',
      description: 'Source URL of the hero image.',
      table: {
        type: { summary: 'string | StaticImageData' },
        defaultValue: {
          summary: 'https://dummyimage.com/1200x400/000/fff&text=Hero',
        },
      },
    },
    alt: {
      control: 'text',
      description: 'Alt text for the hero image.',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'Sample Hero Image' },
      },
    },
    overlayText: {
      control: 'text',
      description: 'Text to display as an overlay on the hero image.',
      table: {
        type: { summary: 'React.ReactNode' },
        defaultValue: { summary: 'Welcome to Our Website' },
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
type Story = StoryObj<HeroImageProps>;

/**
 * Default HeroImage story demonstrating basic usage.
 */
export const Default: Story = {};

/**
 * HeroImage with Custom Overlay Text.
 */
export const CustomOverlayText: Story = {
  args: {
    overlayText: 'Discover Amazing Content',
  },
};

/**
 * HeroImage with Top Overlay Position.
 * Note: Since 'overlayPosition' isn't defined in HeroImageProps, ensure it's handled internally or remove if not applicable.
 * If 'overlayPosition' should be a prop, consider updating the component accordingly.
 */
export const TopOverlay: Story = {
  args: {
    // overlayPosition is not defined; removing to prevent errors
    overlayText: 'Top Overlay Text',
    // If 'overlayPosition' is intended, update the HeroImage component to accept and handle it
  },
};

/**
 * HeroImage with Center Overlay Position.
 * Same note as above regarding 'overlayPosition'.
 */
export const CenterOverlay: Story = {
  args: {
    // overlayPosition is not defined; removing to prevent errors
    overlayText: 'Center Overlay Text',
  },
};

/**
 * HeroImage with Combined Props.
 */
export const CombinedProps: Story = {
  args: {
    overlayText: 'Combined Props Overlay',
    // overlayBgColor is removed
    // Other props as per HeroImageProps
    className: 'border-4 border-purple-500',
    containerClassName: 'shadow-2xl',
  },
};

/**
 * Showcase Story demonstrating multiple HeroImage usages together.
 */
export const Showcase: Story = {
  render: (args: HeroImageProps) => (
    <div className="space-y-6">
      {/* 1) Default HeroImage */}
      <HeroImage
        {...args}
        src="https://dummyimage.com/1200x400/000/fff&text=Hero+Default"
        alt="Default Hero Image"
        overlayText="Welcome to Our Website"
      />

      {/* 2) Custom Overlay Text */}
      <HeroImage
        {...args}
        src="https://dummyimage.com/1200x400/000/fff&text=Hero+Custom+Text"
        alt="Custom Overlay Text Hero Image"
        overlayText="Discover Amazing Content"
      />

      {/* 3) Top Overlay Position */}
      {/* 
        Since 'overlayPosition' is not a valid prop, it's omitted.
        If you wish to include it, update the HeroImage component to handle 'overlayPosition'.
      */}
      <HeroImage
        {...args}
        src="https://dummyimage.com/1200x400/000/fff&text=Hero+Top+Overlay"
        alt="Top Overlay Hero Image"
        overlayText="Top Overlay Text"
      />

      {/* 4) Center Overlay Position */}
      <HeroImage
        {...args}
        src="https://dummyimage.com/1200x400/000/fff&text=Hero+Center+Overlay"
        alt="Center Overlay Hero Image"
        overlayText="Center Overlay Text"
      />

      {/* 5) Combined Props HeroImage */}
      <HeroImage
        {...args}
        src="https://dummyimage.com/1200x400/000/fff&text=Hero+Combined+Props"
        alt="Combined Props Hero Image"
        overlayText="Combined Props Overlay"
        className="border-4 border-purple-500"
        containerClassName="shadow-2xl"
      />
    </div>
  ),
};
