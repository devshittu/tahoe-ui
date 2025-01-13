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

// src/components/PageMode/PageMode.stories.tsx
