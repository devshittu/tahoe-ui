// // src/components/PageMode/PageMode.stories.tsx

// import React, { useCallback } from 'react';
// import type { Meta, StoryObj } from '@storybook/react';
// import { PageMode, PageModeProps } from './PageMode';
// import { AppProvider } from '@/providers/app'; // Adjust path as needed
// import { useUIComponent } from '@/stores/useUIComponent'; // The global store that PageMode uses
// import { FaArrowRight } from 'react-icons/fa'; // Example icon from react-icons

// /**
//  * 1) Meta configuration for the PageMode stories
//  *    We only define fields that actually exist in PageModeProps:
//  *    position, a11yOptions, useContainer, roundedEdges, themeable,
//  *    closeThreshold, enhancedCloseBox, enableContentScroll.
//  */
// const meta: Meta<typeof PageMode> = {
//   title: 'UI/Overlays/PageMode',
//   component: PageMode,
//   decorators: [
//     (Story) => (
//       <AppProvider>
//         {/* Container with padding/background for consistent styling */}
//         <div className="p-4 min-h-screen bg-gray-50">
//           <Story />
//         </div>
//       </AppProvider>
//     ),
//   ],
//   args: {
//     position: 'bottom',
//     a11yOptions: {
//       escapeClose: true,
//       role: 'dialog',
//       ariaLabel: 'Page Mode Overlay',
//       ariaModal: true,
//       lockScroll: true,
//       closeOnOutsideClick: true,
//     },
//     useContainer: false,
//     roundedEdges: false,
//     themeable: false,
//     closeThreshold: 0.5,
//     enhancedCloseBox: false,
//     enableContentScroll: true,
//   },
//   argTypes: {
//     position: {
//       control: 'select',
//       options: ['top', 'bottom', 'left', 'right'],
//       description: 'Position where the PageMode slides in from.',
//       table: {
//         type: { summary: `'top' | 'bottom' | 'left' | 'right'` },
//         defaultValue: { summary: 'bottom' },
//       },
//     },
//     a11yOptions: {
//       control: false, // It's an object with advanced fields
//       description: 'Accessibility (ARIA) options for the PageMode overlay.',
//     },
//     useContainer: {
//       control: 'boolean',
//       description: 'If true, wraps the content in a container.',
//       table: {
//         type: { summary: 'boolean' },
//         defaultValue: { summary: 'false' },
//       },
//     },
//     roundedEdges: {
//       control: 'boolean',
//       description: 'If true, the overlay has rounded corners (based on position).',
//       table: {
//         type: { summary: 'boolean' },
//         defaultValue: { summary: 'false' },
//       },
//     },
//     themeable: {
//       control: 'boolean',
//       description: 'If true, applies theme-based dark/light classes.',
//       table: {
//         type: { summary: 'boolean' },
//         defaultValue: { summary: 'false' },
//       },
//     },
//     closeThreshold: {
//       control: { type: 'range', min: 0, max: 1, step: 0.1 },
//       description: 'Drag distance threshold (0 to 1) to trigger close.',
//       table: {
//         type: { summary: 'number' },
//         defaultValue: { summary: 0.5 },
//       },
//     },
//     enhancedCloseBox: {
//       control: 'boolean',
//       description:
//         'If true, display a “release to close” box after dragging beyond closeThreshold.',
//       table: {
//         type: { summary: 'boolean' },
//         defaultValue: { summary: 'false' },
//       },
//     },
//     enableContentScroll: {
//       control: 'boolean',
//       description: 'If true, the content area can scroll.',
//       table: {
//         type: { summary: 'boolean' },
//         defaultValue: { summary: 'true' },
//       },
//     },
//   },
// };

// export default meta;
// type Story = StoryObj<typeof PageMode>;

// /**
//  * 2) Helper function to set the UI store with some content and open the overlay.
//  *    This simulates how you'd open the PageMode from your application logic.
//  */
// function openPageModeWithContent(content: React.ReactNode) {
//   // `useUIComponent()` store is used directly by PageMode
//   const store = useUIComponent.getState(); // Grab the zustand store’s state
//   // Typically, your store might have methods to set isOpen, content, etc.
//   // For demonstration, we assume a pattern like: store.open(content)
//   // or store has `content`, `isOpen`, `open()`, etc.
//   // Let’s emulate it:

//   // If your store doesn’t do content, just store it in `content`.
//   // Then PageMode calls `useUIComponent()`.
//   store.content = content;

//   // Similarly, if your store had an isOpen, we’d set it true:
//   // store.isOpen = true; // If your store logic allows it
//   // or if you have a dedicated function store.openPageMode(content)
//   // just call that function.
//   // We'll do a quick override as a demonstration:
//   // eslint-disable-next-line @typescript-eslint/ban-ts-comment
//   // @ts-ignore
//   store.isOpen = true;
// }

// /**
//  * 3) “Default” story demonstrating a basic usage of PageMode.
//  */
// export const Default: Story = {
//   render: (args: PageModeProps) => {
//     const handleOpen = useCallback(() => {
//       openPageModeWithContent(
//         <div className="p-4">
//           <h2 className="text-lg font-bold mb-2">Default PageMode</h2>
//           <p className="mb-4 text-sm">
//             This is some default content inside the PageMode overlay.
//           </p>
//           <button
//             onClick={() => {
//               // For demonstration, we can close by setting isOpen to false
//               const store = useUIComponent.getState();
//               // eslint-disable-next-line @typescript-eslint/ban-ts-comment
//               // @ts-ignore
//               store.isOpen = false;
//             }}
//             className="px-4 py-2 bg-blue-500 text-white rounded"
//           >
//             Close
//           </button>
//         </div>,
//       );
//     }, []);

//     return (
//       <div className="space-y-4">
//         <button
//           onClick={handleOpen}
//           className="px-4 py-2 bg-blue-500 text-white rounded"
//         >
//           Open Default PageMode
//         </button>
//         {/* Mount the PageMode with the user-provided args */}
//         <PageMode {...args} />
//       </div>
//     );
//   },
// };

// /**
//  * SlideFromTop
//  */
// export const SlideFromTop: Story = {
//   args: {
//     position: 'top',
//     roundedEdges: true,
//     themeable: true,
//     closeThreshold: 0.4,
//     enhancedCloseBox: true,
//   },
//   render: (args) => {
//     const handleOpen = useCallback(() => {
//       openPageModeWithContent(
//         <div className="p-4">
//           <h2 className="text-lg font-bold mb-2">Slide From Top</h2>
//           <p className="mb-4 text-sm">
//             This PageMode slides in from the top with themeable and rounded edges.
//           </p>
//           <button
//             onClick={() => {
//               const store = useUIComponent.getState();
//               // @ts-ignore
//               store.isOpen = false;
//             }}
//             className="px-4 py-2 bg-green-500 text-white rounded"
//           >
//             Close
//           </button>
//         </div>,
//       );
//     }, []);

//     return (
//       <div className="space-y-4">
//         <button
//           onClick={handleOpen}
//           className="px-4 py-2 bg-green-500 text-white rounded"
//         >
//           Open Top-Slide PageMode
//         </button>
//         <PageMode {...args} />
//       </div>
//     );
//   },
// };

// /**
//  * SlideFromLeft
//  */
// export const SlideFromLeft: Story = {
//   args: {
//     position: 'left',
//     roundedEdges: true,
//     closeThreshold: 0.3,
//     enhancedCloseBox: true,
//   },
//   render: (args) => {
//     const handleOpen = useCallback(() => {
//       openPageModeWithContent(
//         <div className="p-4">
//           <h2 className="text-lg font-bold mb-2">Slide From Left</h2>
//           <p className="mb-4 text-sm">
//             This PageMode slides in from the left with a close threshold of 0.3.
//           </p>
//           <button
//             onClick={() => {
//               const store = useUIComponent.getState();
//               // @ts-ignore
//               store.isOpen = false;
//             }}
//             className="px-4 py-2 bg-purple-500 text-white rounded"
//           >
//             Close
//           </button>
//         </div>,
//       );
//     }, []);

//     return (
//       <div className="space-y-4">
//         <button
//           onClick={handleOpen}
//           className="px-4 py-2 bg-purple-500 text-white rounded"
//         >
//           Open Left-Slide PageMode
//         </button>
//         <PageMode {...args} />
//       </div>
//     );
//   },
// };

// /**
//  * SlideFromRight
//  */
// export const SlideFromRight: Story = {
//   args: {
//     position: 'right',
//     themeable: true,
//     closeThreshold: 0.3,
//     enhancedCloseBox: true,
//   },
//   render: (args) => {
//     const handleOpen = useCallback(() => {
//       openPageModeWithContent(
//         <div className="p-4">
//           <h2 className="text-lg font-bold mb-2">Slide From Right</h2>
//           <p className="mb-4 text-sm">
//             This PageMode slides in from the right with theming enabled.
//           </p>
//           <button
//             onClick={() => {
//               const store = useUIComponent.getState();
//               // @ts-ignore
//               store.isOpen = false;
//             }}
//             className="px-4 py-2 bg-yellow-500 text-white rounded"
//           >
//             Close
//           </button>
//         </div>,
//       );
//     }, []);

//     return (
//       <div className="space-y-4">
//         <button
//           onClick={handleOpen}
//           className="px-4 py-2 bg-yellow-500 text-white rounded"
//         >
//           Open Right-Slide PageMode
//         </button>
//         <PageMode {...args} />
//       </div>
//     );
//   },
// };

// /**
//  * AccessibilityTest
//  */
// export const AccessibilityTest: Story = {
//   args: {
//     a11yOptions: {
//       escapeClose: true,
//       role: 'alertdialog',
//       ariaLabel: 'Accessible PageMode',
//       ariaModal: true,
//       lockScroll: true,
//       closeOnOutsideClick: true,
//     },
//     roundedEdges: true,
//     themeable: true,
//   },
//   render: (args) => {
//     const handleOpen = useCallback(() => {
//       openPageModeWithContent(
//         <div className="p-4">
//           <h2 className="text-lg font-bold mb-2">Accessibility Enhanced</h2>
//           <p className="mb-4 text-sm">
//             This PageMode uses advanced ARIA settings for improved accessibility.
//           </p>
//           <button
//             onClick={() => {
//               const store = useUIComponent.getState();
//               // @ts-ignore
//               store.isOpen = false;
//             }}
//             className="px-4 py-2 bg-pink-500 text-white rounded"
//           >
//             Close
//           </button>
//         </div>,
//       );
//     }, []);

//     return (
//       <div className="space-y-4">
//         <button
//           onClick={handleOpen}
//           className="px-4 py-2 bg-pink-500 text-white rounded"
//         >
//           Open Accessible PageMode
//         </button>
//         <PageMode {...args} />
//       </div>
//     );
//   },
// };

// /**
//  * AdvancedDragAndClose
//  */
// export const AdvancedDragAndClose: Story = {
//   args: {
//     position: 'bottom',
//     roundedEdges: true,
//     themeable: true,
//     closeThreshold: 0.3,
//     enhancedCloseBox: true,
//   },
//   render: (args) => {
//     const handleOpen = useCallback(() => {
//       openPageModeWithContent(
//         <div className="p-4">
//           <h2 className="text-lg font-bold mb-2">Advanced Drag & Close</h2>
//           <p className="mb-4 text-sm">
//             Drag the handlebar aggressively to trigger the enhanced close box.
//           </p>
//           <button
//             onClick={() => {
//               const store = useUIComponent.getState();
//               // @ts-ignore
//               store.isOpen = false;
//             }}
//             className="mt-4 px-4 py-2 bg-red-500 text-white rounded"
//           >
//             Close
//           </button>
//         </div>,
//       );
//     }, []);

//     return (
//       <div className="space-y-4">
//         <button
//           onClick={handleOpen}
//           className="px-4 py-2 bg-red-500 text-white rounded"
//         >
//           Open Advanced Drag
//         </button>
//         <PageMode {...args} />
//       </div>
//     );
//   },
// };

// /**
//  * Showcase
//  * Demonstrates multiple PageMode triggers in a single story.
//  */
// export const Showcase: Story = {
//   render: () => {
//     const store = useUIComponent.getState();

//     const openPageMode = useCallback(
//       (
//         content: React.ReactNode,
//         props?: Partial<PageModeProps>, // If you want to override story-level props
//       ) => {
//         // Merge any props if needed, but PageMode reads from "args" only for prop usage
//         // We'll just set the store's content and isOpen
//         store.content = content;
//         // @ts-ignore
//         store.isOpen = true;
//       },
//       [store],
//     );

//     return (
//       <div className="space-y-4">
//         {/* Slide from Bottom */}
//         <button
//           onClick={() =>
//             openPageMode(
//               <div className="p-4">
//                 <h2 className="text-lg font-bold mb-2">Bottom Slide</h2>
//                 <p className="mb-4 text-sm">
//                   This PageMode slides in from the bottom.
//                 </p>
//                 <button
//                   onClick={() => {
//                     // @ts-ignore
//                     store.isOpen = false;
//                   }}
//                   className="px-4 py-2 bg-blue-500 text-white rounded"
//                 >
//                   Close
//                 </button>
//               </div>,
//             )
//           }
//           className="px-4 py-2 bg-blue-500 text-white rounded"
//         >
//           Open Bottom Slide
//         </button>

//         {/* Slide from Top */}
//         <button
//           onClick={() =>
//             openPageMode(
//               <div className="p-4">
//                 <h2 className="text-lg font-bold mb-2">Top Slide</h2>
//                 <p className="mb-4 text-sm">
//                   This PageMode slides in from the top.
//                 </p>
//                 <button
//                   onClick={() => {
//                     // @ts-ignore
//                     store.isOpen = false;
//                   }}
//                   className="px-4 py-2 bg-green-500 text-white rounded"
//                 >
//                   Close
//                 </button>
//               </div>,
//             )
//           }
//           className="px-4 py-2 bg-green-500 text-white rounded"
//         >
//           Open Top Slide
//         </button>

//         {/* Slide from Left */}
//         <button
//           onClick={() =>
//             openPageMode(
//               <div className="p-4">
//                 <h2 className="text-lg font-bold mb-2">Left Slide</h2>
//                 <p className="mb-4 text-sm">
//                   This PageMode slides in from the left.
//                 </p>
//                 <button
//                   onClick={() => {
//                     // @ts-ignore
//                     store.isOpen = false;
//                   }}
//                   className="px-4 py-2 bg-purple-500 text-white rounded"
//                 >
//                   Close
//                 </button>
//               </div>,
//             )
//           }
//           className="px-4 py-2 bg-purple-500 text-white rounded"
//         >
//           Open Left Slide
//         </button>

//         {/* Slide from Right */}
//         <button
//           onClick={() =>
//             openPageMode(
//               <div className="p-4">
//                 <h2 className="text-lg font-bold mb-2">Right Slide</h2>
//                 <p className="mb-4 text-sm">
//                   This PageMode slides in from the right.
//                 </p>
//                 <button
//                   onClick={() => {
//                     // @ts-ignore
//                     store.isOpen = false;
//                   }}
//                   className="px-4 py-2 bg-yellow-500 text-white rounded"
//                 >
//                   Close
//                 </button>
//               </div>,
//             )
//           }
//           className="px-4 py-2 bg-yellow-500 text-white rounded"
//         >
//           Open Right Slide
//         </button>

//         {/* We mount the PageMode just once; it will read from the store to open/close */}
//         <PageMode
//           position="bottom"
//           roundedEdges
//           themeable
//           closeThreshold={0.5}
//           enhancedCloseBox
//           enableContentScroll
//           a11yOptions={{
//             escapeClose: true,
//             role: 'dialog',
//             ariaLabel: 'Showcase Page Mode',
//             ariaModal: true,
//             lockScroll: true,
//             closeOnOutsideClick: true,
//           }}
//         />
//       </div>
//     );
//   },
// };

// src/components/PageMode/PageMode.stories.tsx

import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { PageMode, PageModeProps } from './PageMode';
import { AppProvider } from '@/providers/app'; // Adjust path as needed
import { useUIComponent } from '@/stores/useUIComponent';
import { FaInfoCircle, FaUser } from 'react-icons/fa';

/**
 * Meta configuration for the PageMode stories.
 * Note: We do NOT pass 'content' as a prop to PageMode.
 * Instead, we manage content via the useUIComponent store.
 */
const meta: Meta<typeof PageMode> = {
  title: 'UI/Overlays/PageMode',
  component: PageMode,
  decorators: [
    (Story) => (
      <AppProvider>
        <Story />
      </AppProvider>
    ),
  ],
  args: {
    position: 'bottom',
    a11yOptions: {
      escapeClose: true,
      role: 'dialog',
      ariaLabel: 'Page Mode Overlay',
      ariaModal: true,
      lockScroll: true,
      closeOnOutsideClick: true,
      handlebarAriaLabel: 'Drag handle to close or press Escape',
    },
    useContainer: false,
    roundedEdges: false,
    themeable: false,
    closeThreshold: 0.5,
    enhancedCloseBox: false,
    enableContentScroll: true,
  },
  argTypes: {
    position: {
      control: 'select',
      options: ['top', 'bottom', 'left', 'right'],
      description: 'Position where the PageMode slides in from.',
      table: {
        type: { summary: `'top' | 'bottom' | 'left' | 'right'` },
        defaultValue: { summary: 'bottom' },
      },
    },
    a11yOptions: {
      control: false, // It's an object with advanced fields
      description: 'Accessibility (ARIA) options for the PageMode overlay.',
    },
    useContainer: {
      control: 'boolean',
      description: 'If true, wraps the content inside a container.',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    roundedEdges: {
      control: 'boolean',
      description:
        'If true, the overlay has rounded corners (based on position).',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    themeable: {
      control: 'boolean',
      description: 'If true, applies theme-based dark/light classes.',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    closeThreshold: {
      control: { type: 'range', min: 0, max: 1, step: 0.1 },
      description: 'Drag distance threshold (0 to 1) to trigger close.',
      table: {
        type: { summary: 'number' },
        // defaultValue: { summary: 0.5 },
      },
    },
    enhancedCloseBox: {
      control: 'boolean',
      description:
        'If true, display a “release to close” box after dragging beyond closeThreshold.',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    enableContentScroll: {
      control: 'boolean',
      description: 'If true, the content area can scroll.',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'true' },
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof PageMode>;

/**
 * Helper component to open the PageMode with given content.
 * This component utilizes the useUIComponent store to manage PageMode state.
 */
const OpenPageModeButton: React.FC<{ content: React.ReactNode }> = ({
  content,
}) => {
  const { open } = useUIComponent();

  return (
    <button
      onClick={() => open(content)}
      className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none"
    >
      Open PageMode
    </button>
  );
};

/**
 * Default Story
 * Demonstrates opening the PageMode with default content.
 */
export const Default: Story = {
  render: () => (
    <div className="space-y-4">
      <OpenPageModeButton
        content={
          <div className="p-6">
            <h2 className="text-xl font-semibold mb-4">Default PageMode</h2>
            <p className="text-gray-700 mb-4">
              This is the default content of the PageMode component. You can
              customize it as needed.
            </p>
            <button
              onClick={() => useUIComponent().close()}
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 focus:outline-none"
            >
              Close
            </button>
          </div>
        }
      />
    </div>
  ),
};

/**
 * SlideFromTop Story
 * Demonstrates the PageMode sliding in from the top.
 */
export const SlideFromTop: Story = {
  render: () => (
    <div className="space-y-4">
      <OpenPageModeButton
        content={
          <div className="p-6">
            <h2 className="text-xl font-semibold mb-4">Slide From Top</h2>
            <p className="text-gray-700 mb-4">
              This PageMode slides in from the top with rounded edges and
              themeable styling.
            </p>
            <button
              onClick={() => useUIComponent().close()}
              className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 focus:outline-none"
            >
              Close
            </button>
          </div>
        }
      />
    </div>
  ),
};

/**
 * SlideFromLeft Story
 * Demonstrates the PageMode sliding in from the left.
 */
export const SlideFromLeft: Story = {
  render: () => (
    <div className="space-y-4">
      <OpenPageModeButton
        content={
          <div className="p-6">
            <h2 className="text-xl font-semibold mb-4">Slide From Left</h2>
            <p className="text-gray-700 mb-4">
              This PageMode slides in from the left with rounded edges.
            </p>
            <button
              onClick={() => useUIComponent().close()}
              className="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700 focus:outline-none"
            >
              Close
            </button>
          </div>
        }
      />
    </div>
  ),
};

/**
 * SlideFromRight Story
 * Demonstrates the PageMode sliding in from the right.
 */
export const SlideFromRight: Story = {
  render: () => (
    <div className="space-y-4">
      <OpenPageModeButton
        content={
          <div className="p-6">
            <h2 className="text-xl font-semibold mb-4">Slide From Right</h2>
            <p className="text-gray-700 mb-4">
              This PageMode slides in from the right with themeable styling.
            </p>
            <button
              onClick={() => useUIComponent().close()}
              className="px-4 py-2 bg-yellow-600 text-white rounded hover:bg-yellow-700 focus:outline-none"
            >
              Close
            </button>
          </div>
        }
      />
    </div>
  ),
};

/**
 * AccessibilityTest Story
 * Demonstrates the PageMode with advanced ARIA attributes.
 */
export const AccessibilityTest: Story = {
  render: () => (
    <div className="space-y-4">
      <OpenPageModeButton
        content={
          <div className="p-6">
            <h2 className="text-xl font-semibold mb-4">Accessible PageMode</h2>
            <p className="text-gray-700 mb-4">
              This PageMode is configured with advanced ARIA attributes for
              improved accessibility.
            </p>
            <button
              onClick={() => useUIComponent().close()}
              className="px-4 py-2 bg-pink-600 text-white rounded hover:bg-pink-700 focus:outline-none"
            >
              Close
            </button>
          </div>
        }
      />
    </div>
  ),
};

/**
 * AdvancedDragAndClose Story
 * Demonstrates drag-to-close functionality with an enhanced close box.
 */
export const AdvancedDragAndClose: Story = {
  render: () => (
    <div className="space-y-4">
      <OpenPageModeButton
        content={
          <div className="p-6">
            <h2 className="text-xl font-semibold mb-4">
              Advanced Drag & Close
            </h2>
            <p className="text-gray-700 mb-4">
              Drag the handlebar aggressively to trigger the enhanced close box.
            </p>
            <button
              onClick={() => useUIComponent().close()}
              className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 focus:outline-none"
            >
              Close
            </button>
          </div>
        }
      />
    </div>
  ),
};

/**
 * Showcase Story
 * Demonstrates multiple PageMode content options.
 */
export const Showcase: Story = {
  render: () => (
    <div className="space-y-4">
      {/* Open Default PageMode */}
      <OpenPageModeButton
        content={
          <div className="p-6">
            <h2 className="text-xl font-semibold mb-4">Default PageMode</h2>
            <p className="text-gray-700 mb-4">
              This is the default content of the PageMode component.
            </p>
            <button
              onClick={() => useUIComponent().close()}
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 focus:outline-none"
            >
              Close
            </button>
          </div>
        }
      />

      {/* Open SlideFromTop PageMode */}
      <OpenPageModeButton
        content={
          <div className="p-6">
            <h2 className="text-xl font-semibold mb-4">Slide From Top</h2>
            <p className="text-gray-700 mb-4">
              This PageMode slides in from the top with rounded edges.
            </p>
            <button
              onClick={() => useUIComponent().close()}
              className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 focus:outline-none"
            >
              Close
            </button>
          </div>
        }
      />

      {/* Open Accessibility Test PageMode */}
      <OpenPageModeButton
        content={
          <div className="p-6">
            <h2 className="text-xl font-semibold mb-4">Accessible PageMode</h2>
            <p className="text-gray-700 mb-4">
              This PageMode is configured with advanced ARIA attributes for
              improved accessibility.
            </p>
            <button
              onClick={() => useUIComponent().close()}
              className="px-4 py-2 bg-pink-600 text-white rounded hover:bg-pink-700 focus:outline-none"
            >
              Close
            </button>
          </div>
        }
      />
    </div>
  ),
};
