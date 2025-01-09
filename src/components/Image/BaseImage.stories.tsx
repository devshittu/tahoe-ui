// // src/components/Image/BaseImage.stories.tsx

// import React from 'react';
// import type { Meta, StoryObj } from '@storybook/react';
// import BaseImage, { BaseImageProps } from './BaseImage';
// import { AppProvider } from '@/providers/app';
// import clsx from 'clsx';
// import { twMerge } from 'tailwind-merge';

// const meta: Meta<typeof BaseImage> = {
//   title: 'Image/BaseImage',
//   component: BaseImage,
//   decorators: [
//     (Story) => (
//       <AppProvider>
//         {/* Container with padding and max width for better visualization */}
//         <div className="p-4 space-y-6 max-w-xl border border-gray-200 rounded-lg">
//           <Story />
//         </div>
//       </AppProvider>
//     ),
//   ],
//   args: {
//     src: 'https://dummyimage.com/500x300/0000ff/ffffff?text=BaseImage',
//     alt: 'Sample Image',
//     width: 500,
//     height: 300,
//     fill: false,
//     priority: false,
//     containerClassName: '',
//     containerStyle: {},
//     shape: 'none',
//     fallback: {
//       fallbackSrc: 'https://dummyimage.com/500x300/ff0000/ffffff?text=Fallback',
//       fallbackNode: null,
//     },
//     onLoaded: undefined,
//     onErrorFallback: undefined,
//     className: '',
//   },
//   argTypes: {
//     src: {
//       control: 'text',
//       description: 'Source URL of the image.',
//       table: {
//         type: { summary: 'string | StaticImageData' },
//         defaultValue: {
//           summary:
//             'https://dummyimage.com/500x300/0000ff/ffffff?text=BaseImage',
//         },
//       },
//     },
//     alt: {
//       control: 'text',
//       description: 'Alternative text for the image.',
//       table: {
//         type: { summary: 'string' },
//         defaultValue: { summary: 'Sample Image' },
//       },
//     },
//     width: {
//       control: 'number',
//       description: 'Width of the image in pixels.',
//       table: {
//         type: { summary: 'number' },
//         defaultValue: { summary: '500' },
//       },
//     },
//     height: {
//       control: 'number',
//       description: 'Height of the image in pixels.',
//       table: {
//         type: { summary: 'number' },
//         defaultValue: { summary: '300' },
//       },
//     },
//     fill: {
//       control: 'boolean',
//       description: 'If true, the image will fill its parent container.',
//       table: {
//         type: { summary: 'boolean' },
//         defaultValue: { summary: 'false' },
//       },
//     },
//     priority: {
//       control: 'boolean',
//       description: 'If true, the image will be loaded with priority.',
//       table: {
//         type: { summary: 'boolean' },
//         defaultValue: { summary: 'false' },
//       },
//     },
//     containerClassName: {
//       control: 'text',
//       description: 'Additional CSS classes for the container.',
//       table: {
//         type: { summary: 'string' },
//         defaultValue: { summary: '""' },
//       },
//     },
//     containerStyle: {
//       control: 'object',
//       description: 'Additional inline styles for the container.',
//       table: {
//         type: { summary: 'CSSProperties' },
//         defaultValue: { summary: '{}' },
//       },
//     },
//     shape: {
//       control: 'select',
//       options: ['none', 'rounded', 'circle'],
//       description: 'Shape of the image container.',
//       table: {
//         type: { summary: `'none' | 'rounded' | 'circle'` },
//         defaultValue: { summary: `'none'` },
//       },
//     },
//     fallback: {
//       control: 'object',
//       description:
//         'Fallback options in case the image fails to load. Either provide a fallbackSrc or a fallbackNode.',
//       table: {
//         type: { summary: 'ImageFallback' },
//         defaultValue: {
//           summary:
//             '{ fallbackSrc: "https://dummyimage.com/500x300/ff0000/ffffff?text=Fallback", fallbackNode: null }',
//         },
//       },
//     },
//     onLoaded: {
//       action: 'onLoaded',
//       description: 'Callback when the image has loaded successfully.',
//       table: {
//         type: { summary: '() => void' },
//       },
//     },
//     onErrorFallback: {
//       action: 'onErrorFallback',
//       description:
//         'Callback when the image fails to load and fallback is used.',
//       table: {
//         type: { summary: '() => void' },
//       },
//     },
//     className: {
//       control: 'text',
//       description: 'Additional CSS classes for the image.',
//       table: {
//         type: { summary: 'string' },
//         defaultValue: { summary: '""' },
//       },
//     },
//   },
// };

// export default meta;
// type Story = StoryObj<BaseImageProps>;

// /**
//  * Default BaseImage story demonstrating basic usage.
//  */
// export const Default: Story = {
//   args: {
//     src: 'https://dummyimage.com/500x300/0000ff/ffffff?text=BaseImage',
//     alt: 'Default BaseImage',
//   },
// };

// /**
//  * BaseImage with Rounded Shape.
//  */
// export const RoundedShape: Story = {
//   args: {
//     src: 'https://dummyimage.com/500x300/00ff00/ffffff?text=Rounded',
//     alt: 'Rounded BaseImage',
//     shape: 'rounded',
//   },
// };

// /**
//  * BaseImage with Circle Shape.
//  */
// export const CircleShape: Story = {
//   args: {
//     src: 'https://dummyimage.com/500x300/ff0000/ffffff?text=Circle',
//     alt: 'Circle BaseImage',
//     shape: 'circle',
//   },
// };

// /**
//  * BaseImage with Fallback Image.
//  */
// export const WithFallbackSrc: Story = {
//   args: {
//     src: 'https://dummyimage.com/500x300/invalid-url', // Invalid URL to trigger fallback
//     alt: 'BaseImage with FallbackSrc',
//     fallback: {
//       fallbackSrc: 'https://dummyimage.com/500x300/ff0000/ffffff?text=Fallback',
//     },
//   },
// };

// /**
//  * BaseImage with Custom Fallback Node.
//  */
// export const WithFallbackNode: Story = {
//   args: {
//     src: 'https://dummyimage.com/500x300/invalid-url', // Invalid URL to trigger fallback
//     alt: 'BaseImage with FallbackNode',
//     fallback: {
//       fallbackNode: (
//         <div className="flex items-center justify-center w-full h-full bg-red-500 text-white">
//           <span>Image failed to load.</span>
//         </div>
//       ),
//     },
//   },
// };

// /**
//  * BaseImage with Opacity.
//  */
// export const WithOpacity: Story = {
//   args: {
//     src: 'https://dummyimage.com/500x300/0000ff/ffffff?text=Opacity',
//     alt: 'BaseImage with Opacity',
//   },
// };

// /**
//  * BaseImage with Custom ClassName.
//  */
// export const CustomClassName: Story = {
//   args: {
//     src: 'https://dummyimage.com/500x300/0000ff/ffffff?text=CustomClass',
//     alt: 'BaseImage with Custom ClassName',
//     className: 'border-4 border-yellow-500',
//   },
// };

// /**
//  * Combined Props Example.
//  * Demonstrates multiple props applied together for enhanced styling.
//  */
// export const CombinedProps: Story = {
//   args: {
//     src: 'https://dummyimage.com/500x300/0000ff/ffffff?text=Combined',
//     alt: 'BaseImage with Combined Props',
//     shape: 'rounded',
//     className: 'border-4 border-yellow-500',
//   },
// };

// /**
//  * Showcase Story demonstrating multiple BaseImage usages together.
//  */
// export const Showcase: Story = {
//   render: (args: BaseImageProps) => (
//     <div className="space-y-6">
//       {/* 1) Default BaseImage */}
//       <BaseImage
//         {...args}
//         src="https://dummyimage.com/500x300/0000ff/ffffff?text=Default"
//         alt="Default BaseImage"
//       />

//       {/* 2) Rounded Shape */}
//       <BaseImage
//         {...args}
//         src="https://dummyimage.com/500x300/00ff00/ffffff?text=Rounded"
//         alt="Rounded BaseImage"
//         shape="rounded"
//       />

//       {/* 3) Circle Shape */}
//       <BaseImage
//         {...args}
//         src="https://dummyimage.com/500x300/ff0000/ffffff?text=Circle"
//         alt="Circle BaseImage"
//         shape="circle"
//       />

//       {/* 4) With FallbackSrc */}
//       <BaseImage
//         {...args}
//         src="https://dummyimage.com/500x300/invalid-url"
//         alt="BaseImage with FallbackSrc"
//         fallback={{
//           fallbackSrc:
//             'https://dummyimage.com/500x300/ff0000/ffffff?text=Fallback',
//         }}
//       />

//       {/* 5) With FallbackNode */}
//       <BaseImage
//         {...args}
//         src="https://dummyimage.com/500x300/invalid-url"
//         alt="BaseImage with FallbackNode"
//         fallback={{
//           fallbackNode: (
//             <div className="flex items-center justify-center w-full h-full bg-red-500 text-white">
//               <span>Image failed to load.</span>
//             </div>
//           ),
//         }}
//       />

//       {/* 6) With Opacity */}
//       <BaseImage
//         {...args}
//         src="https://dummyimage.com/500x300/0000ff/ffffff?text=Opacity"
//         alt="BaseImage with Opacity"
//       />

//       {/* 7) With Custom ClassName */}
//       <BaseImage
//         {...args}
//         src="https://dummyimage.com/500x300/0000ff/ffffff?text=CustomClass"
//         alt="BaseImage with Custom ClassName"
//         className="border-4 border-yellow-500"
//       />

//       {/* 8) Combined Props */}
//       <BaseImage
//         {...args}
//         src="https://dummyimage.com/500x300/0000ff/ffffff?text=Combined"
//         alt="BaseImage with Combined Props"
//         shape="rounded"
//         className="border-4 border-yellow-500"
//       />
//     </div>
//   ),
// };

// src/components/Image/BaseImage.stories.tsx

import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import BaseImage, { BaseImageProps } from './BaseImage';
import { AppProvider } from '@/providers/app';
import clsx from 'clsx';
import { twMerge } from 'tailwind-merge';

const meta: Meta<typeof BaseImage> = {
  title: 'Image/BaseImage',
  component: BaseImage,
  decorators: [
    (Story) => (
      <AppProvider>
        {/* Container with padding and max width for better visualization */}
        <div className="p-4 space-y-6 max-w-xl border border-gray-200 rounded-lg">
          <Story />
        </div>
      </AppProvider>
    ),
  ],
  args: {
    src: 'https://dummyimage.com/500x300/000/fff',
    alt: 'Sample Image',
    width: 500,
    height: 300,
    fill: false,
    priority: false,
    shape: 'none',
    containerClassName: '',
    className: '',
    fallback: {
      fallbackSrc: 'https://dummyimage.com/500x300/ff0000/ffffff',
      fallbackNode: null,
    },
    onLoaded: undefined,
    onErrorFallback: undefined,
  },
  argTypes: {
    src: {
      control: 'text',
      description: 'Source URL of the image.',
      table: {
        type: { summary: 'string | StaticImageData' },
        defaultValue: { summary: 'https://dummyimage.com/500x300/000/fff' },
      },
    },
    alt: {
      control: 'text',
      description: 'Alt text for the image.',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'Sample Image' },
      },
    },
    width: {
      control: 'number',
      description: 'Width of the image in pixels.',
      table: {
        type: { summary: 'number' },
        defaultValue: { summary: '500' },
      },
    },
    height: {
      control: 'number',
      description: 'Height of the image in pixels.',
      table: {
        type: { summary: 'number' },
        defaultValue: { summary: '300' },
      },
    },
    fill: {
      control: 'boolean',
      description: 'If true, the image will fill its container.',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    priority: {
      control: 'boolean',
      description: 'If true, the image will be prioritized for loading.',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    shape: {
      control: 'select',
      options: ['none', 'rounded', 'circle'],
      description: 'Shape of the image.',
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
      description: 'Fallback configuration for the image.',
      table: {
        type: { summary: 'ImageFallback' },
        defaultValue: {
          summary: `{ fallbackSrc: 'https://dummyimage.com/500x300/ff0000/ffffff', fallbackNode: null }`,
        },
      },
    },
    onLoaded: {
      action: 'loaded',
      description: 'Callback when the image has successfully loaded.',
      table: {
        type: { summary: '() => void' },
        defaultValue: { summary: 'undefined' },
      },
    },
    onErrorFallback: {
      action: 'errorFallback',
      description:
        'Callback when the image fails to load and fallback is used.',
      table: {
        type: { summary: '() => void' },
        defaultValue: { summary: 'undefined' },
      },
    },
  },
};

export default meta;
type Story = StoryObj<BaseImageProps>;

/**
 * Default BaseImage story demonstrating basic usage.
 */
export const Default: Story = {};

/**
 * BaseImage with Rounded Shape.
 */
export const RoundedShape: Story = {
  args: {
    shape: 'rounded',
    children: undefined, // Children are handled internally
  },
};

/**
 * BaseImage with Circle Shape.
 */
export const CircleShape: Story = {
  args: {
    shape: 'circle',
    children: undefined,
  },
};

/**
 * BaseImage with Fallback Source.
 */
export const WithFallbackSrc: Story = {
  args: {
    fallback: {
      fallbackSrc: 'https://dummyimage.com/500x300/ff0000/ffffff',
    },
    src: 'https://dummyimage.com/500x300/000/fff', // Original src (simulated as failing)
    alt: 'Image with Fallback Source',
  },
};

/**
 * BaseImage with Fallback Node.
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
    src: 'https://dummyimage.com/500x300/000/fff', // Original src (simulated as failing)
    alt: 'Image with Fallback Node',
  },
};

/**
 * BaseImage with Loading State.
 */
export const LoadingState: Story = {
  args: {
    src: 'https://dummyimage.com/500x300/000/fff',
    alt: 'Image with Loading State',
    fallback: {
      fallbackSrc: 'https://dummyimage.com/500x300/ff0000/ffffff',
    },
  },
};

/**
 * BaseImage with Priority Loading.
 */
export const PriorityLoading: Story = {
  args: {
    priority: true,
    src: 'https://dummyimage.com/500x300/000/fff',
    alt: 'Priority Loaded Image',
  },
};

/**
 * Combined Props Example.
 * Demonstrates multiple props applied together for enhanced styling and functionality.
 */
export const CombinedProps: Story = {
  args: {
    src: 'https://dummyimage.com/500x300/000/fff',
    alt: 'Combined Props Image',
    shape: 'rounded',
    priority: true,
    fallback: {
      fallbackSrc: 'https://dummyimage.com/500x300/ff0000/ffffff',
    },
    containerClassName: 'shadow-lg',
    className: 'border-4 border-blue-500',
  },
};

/**
 * Showcase Story demonstrating multiple BaseImage usages together.
 */
export const Showcase: Story = {
  render: (args: BaseImageProps) => (
    <div className="space-y-6">
      {/* 1) Default BaseImage */}
      <BaseImage
        {...args}
        src="https://dummyimage.com/500x300/000/fff"
        alt="Default Image"
      />

      {/* 2) Rounded Shape */}
      <BaseImage
        {...args}
        src="https://dummyimage.com/500x300/000/fff"
        alt="Rounded Image"
        shape="rounded"
      />

      {/* 3) Circle Shape */}
      <BaseImage
        {...args}
        src="https://dummyimage.com/500x500/000/fff"
        alt="Circle Image"
        shape="circle"
        width={500}
        height={500}
      />

      {/* 4) With Fallback Source */}
      <BaseImage
        {...args}
        src="https://dummyimage.com/500x300/000/fff" // Simulated as failing
        alt="Image with Fallback Source"
        fallback={{
          fallbackSrc: 'https://dummyimage.com/500x300/ff0000/ffffff',
        }}
      />

      {/* 5) With Fallback Node */}
      <BaseImage
        {...args}
        src="https://dummyimage.com/500x300/000/fff" // Simulated as failing
        alt="Image with Fallback Node"
        fallback={{
          fallbackNode: (
            <div className="flex items-center justify-center w-full h-full bg-gray-200 text-gray-500">
              <span>Image failed to load.</span>
            </div>
          ),
        }}
      />

      {/* 6) Priority Loaded Image */}
      <BaseImage
        {...args}
        src="https://dummyimage.com/500x300/000/fff"
        alt="Priority Loaded Image"
        priority
      />

      {/* 7) Combined Props Image */}
      <BaseImage
        {...args}
        src="https://dummyimage.com/500x300/000/fff"
        alt="Combined Props Image"
        shape="rounded"
        priority
        fallback={{
          fallbackSrc: 'https://dummyimage.com/500x300/ff0000/ffffff',
        }}
        containerClassName="shadow-lg"
        className="border-4 border-blue-500"
      />
    </div>
  ),
};
