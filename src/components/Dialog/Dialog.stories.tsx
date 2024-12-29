import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Dialog, DialogProps } from './Dialog';
import { AppProvider } from '@/providers/app';

/**
 * Group the stories under "UI/Overlays/Dialog" for a nested hierarchy:
 * UI
 *  ↳ Overlays
 *     ↳ Dialog
 */
const meta: Meta<typeof Dialog> = {
  title: 'UI/Overlays/Dialog',
  component: Dialog,
  decorators: [
    (Story) => (
      <AppProvider>
        <Story />
      </AppProvider>
    ),
  ],
  parameters: {
    layout: 'fullscreen', // Example parameter to illustrate advanced configuration
  },
  args: {
    showFrom: 'top',
    handlebarPosition: 'top',
    roundedEdges: true,
    lockScroll: true,
    closeOnOutsideClick: true,
    themeable: true,
    a11yOptions: {
      escapeClose: true,
      role: 'dialog',
      ariaModal: true,
      scrollable: true,
    },
  },
  argTypes: {
    showFrom: {
      control: 'select',
      options: ['top', 'bottom', 'left', 'right'],
    },
    handlebarPosition: {
      control: 'select',
      options: ['top', 'bottom', 'left', 'right'],
    },
    roundedEdges: { control: 'boolean' },
    themeable: { control: 'boolean' },
    lockScroll: { control: 'boolean' },
    closeOnOutsideClick: { control: 'boolean' },
  },
};

export default meta;
type Story = StoryObj<DialogProps>;

/**
 * Basic usage: Displays a dialog from the top with default settings.
 */
export const Default: Story = {
  args: {
    isOpen: true,
    children: (
      <div className="p-6 text-center">
        <p className="mb-4 text-lg">Default dialog content.</p>
        <button className="px-4 py-2 bg-blue-500 text-white rounded">
          Confirm
        </button>
      </div>
    ),
  },
};

/**
 * Demonstrates a bottom slide-in transition.
 */
export const SlideFromBottom: Story = {
  args: {
    ...Default.args,
    showFrom: 'bottom',
    children: (
      <div className="p-6 text-center">
        <p className="mb-4 text-lg">This dialog slides in from the bottom.</p>
      </div>
    ),
  },
};

/**
 * Showcases closing the dialog when clicking outside.
 */
export const CloseOnOutsideClick: Story = {
  args: {
    ...Default.args,
    closeOnOutsideClick: true,
    children: (
      <div className="p-6 text-center">
        <p className="mb-4 text-lg">Click outside this dialog to close it.</p>
      </div>
    ),
  },
};

/**
 * Demonstrates theming and optional rounded edges.
 */
export const ThemedAndRounded: Story = {
  args: {
    ...Default.args,
    themeable: true,
    roundedEdges: true,
    children: (
      <div className="p-6 text-center">
        <p className="mb-4 text-lg">Themed dialog with rounded corners.</p>
      </div>
    ),
  },
};

/**
 * Places the handlebar at the bottom, useful for top-slide dialogs.
 */
export const HandlebarAtBottom: Story = {
  args: {
    ...Default.args,
    handlebarPosition: 'bottom',
    children: (
      <div className="p-6 text-center">
        <p className="mb-4 text-lg">The handlebar is pinned to the bottom.</p>
      </div>
    ),
  },
};

/**
 * Accessibility test with ARIA roles, labels, and escaping.
 */
export const AccessibilityTest: Story = {
  args: {
    ...Default.args,
    a11yOptions: {
      role: 'alertdialog',
      ariaLabel: 'Accessible Dialog',
      escapeClose: true,
    },
    children: (
      <div className="p-6 text-center">
        <p className="mb-4 text-lg">
          Dialog with enhanced accessibility and ARIA roles.
        </p>
      </div>
    ),
  },
};

/**
 * Advanced story showcasing:
 *  - Rubber-band drag
 *  - Enhanced close box
 *  - Custom close threshold
 * Also includes a controlled open/close state for demonstration.
 */
export const AdvancedDragAndClose: Story = {
  render: function Render(args) {
    const [isOpen, setIsOpen] = useState(true);

    return (
      <>
        <button
          onClick={() => setIsOpen(true)}
          className="px-4 py-2 bg-green-500 text-white rounded m-4"
        >
          Open Advanced Dialog
        </button>
        <Dialog {...args} isOpen={isOpen} onClose={() => setIsOpen(false)}>
          <div className="p-6 text-center">
            <h2 className="text-lg mb-4">Rubber-Band Drag</h2>
            <p className="mb-4 text-sm">
              Drag the handlebar aggressively to trigger the enhanced close box.
            </p>
            <button
              className="px-4 py-2 bg-red-500 text-white rounded"
              onClick={() => setIsOpen(false)}
            >
              Close
            </button>
          </div>
        </Dialog>
      </>
    );
  },
  args: {
    ...Default.args,
    rubberBandOnDrag: true,
    enhancedCloseBox: true,
    closeThreshold: 0.3,
    showFrom: 'top',
    handlebarPosition: 'top',
  },
};

// src/components/Dialog/Dialog.stories.tsx
