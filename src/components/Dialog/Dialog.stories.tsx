import React, { useState, useEffect } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Dialog, DialogProps } from './Dialog';
import { AppProvider } from '@/providers/app';

/**
 * We configure the title for hierarchical grouping:
 * UI
 *  └ Overlays
 *      └ Dialog
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
  /**
   * Default values for the story controls.
   * 'isOpen' is the key to controlling open/close from the Storybook UI.
   */
  args: {
    isOpen: true,
    showFrom: 'top',
    roundedEdges: true,
    lockScroll: true,
    closeOnOutsideClick: true,
    handlebarPosition: 'top',
    themeable: true,
    a11yOptions: {
      escapeClose: true,
      role: 'dialog',
      ariaModal: true,
      scrollable: true,
    },
    rubberBandOnDrag: false,
    enhancedCloseBox: false,
    closeThreshold: 0.5,
  },
  argTypes: {
    isOpen: { control: 'boolean' },
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
    rubberBandOnDrag: { control: 'boolean' },
    enhancedCloseBox: { control: 'boolean' },
    closeThreshold: { control: { type: 'range', min: 0, max: 1, step: 0.1 } },
  },
};

export default meta;
type Story = StoryObj<DialogProps>;

/**
 * Helper hook to keep 'internalIsOpen' in sync with the externally controlled 'args.isOpen'.
 */
function useControllableDialogState(isOpenProp: boolean) {
  const [internalIsOpen, setInternalIsOpen] = useState(isOpenProp);

  // Sync local state with external state whenever 'args.isOpen' changes
  useEffect(() => {
    setInternalIsOpen(isOpenProp);
  }, [isOpenProp]);

  // The 'onClose' handler will set local state to false
  const handleClose = () => {
    setInternalIsOpen(false);
  };

  return {
    internalIsOpen,
    handleClose,
    setInternalIsOpen,
  };
}

/**
 * Default Story
 * Demonstrates two ways to open/close:
 * - From the Controls panel ('isOpen' toggle)
 * - Programmatically (button click)
 */
export const Default: Story = {
  render: (args) => {
    const { internalIsOpen, handleClose, setInternalIsOpen } =
      useControllableDialogState(args.isOpen ?? false);

    return (
      <div className="p-4 space-y-4">
        <button
          onClick={() => setInternalIsOpen(true)}
          className="px-4 py-2 bg-blue-500 text-white rounded"
        >
          Open Dialog
        </button>

        <Dialog
          {...args}
          isOpen={internalIsOpen}
          onClose={() => {
            handleClose();
            // If there's a user-defined onClose, call it
            args.onClose?.();
          }}
        >
          <div className="p-6 text-center">
            <p className="mb-4 text-lg">This is the default dialog content.</p>
            <button
              onClick={handleClose}
              className="px-4 py-2 bg-blue-500 text-white rounded"
            >
              Close
            </button>
          </div>
        </Dialog>
      </div>
    );
  },
};

/**
 * Slide from Bottom
 * Manually specifying showFrom='bottom' to test the animation.
 */
export const SlideFromBottom: Story = {
  args: {
    showFrom: 'bottom',
  },
  render: (args) => {
    const { internalIsOpen, handleClose, setInternalIsOpen } =
      useControllableDialogState(args.isOpen ?? false);

    return (
      <div className="p-4 space-y-4">
        <button
          onClick={() => setInternalIsOpen(true)}
          className="px-4 py-2 bg-green-500 text-white rounded"
        >
          Open Bottom-Slide Dialog
        </button>

        <Dialog
          {...args}
          isOpen={internalIsOpen}
          onClose={() => {
            handleClose();
            args.onClose?.();
          }}
        >
          <div className="p-6 text-center">
            <p className="mb-4 text-lg">Dialog slides in from the bottom.</p>
            <button
              onClick={handleClose}
              className="px-4 py-2 bg-green-500 text-white rounded"
            >
              Close
            </button>
          </div>
        </Dialog>
      </div>
    );
  },
};

/**
 * Close on Outside Click
 */
export const CloseOnOutsideClick: Story = {
  args: {
    closeOnOutsideClick: true,
  },
  render: (args) => {
    const { internalIsOpen, handleClose, setInternalIsOpen } =
      useControllableDialogState(args.isOpen ?? false);

    return (
      <div className="p-4 space-y-4">
        <button
          onClick={() => setInternalIsOpen(true)}
          className="px-4 py-2 bg-orange-500 text-white rounded"
        >
          Open Outside-Click Dialog
        </button>

        <Dialog
          {...args}
          isOpen={internalIsOpen}
          onClose={() => {
            handleClose();
            args.onClose?.();
          }}
        >
          <div className="p-6 text-center">
            <p className="mb-4 text-lg">Click outside to close me.</p>
          </div>
        </Dialog>
      </div>
    );
  },
};

/**
 * Themed and Rounded Edges
 */
export const ThemedAndRounded: Story = {
  args: {
    themeable: true,
    roundedEdges: true,
  },
  render: (args) => {
    const { internalIsOpen, handleClose, setInternalIsOpen } =
      useControllableDialogState(args.isOpen ?? false);

    return (
      <div className="p-4 space-y-4">
        <button
          onClick={() => setInternalIsOpen(true)}
          className="px-4 py-2 bg-purple-600 text-white rounded"
        >
          Open Themed Dialog
        </button>

        <Dialog
          {...args}
          isOpen={internalIsOpen}
          onClose={() => {
            handleClose();
            args.onClose?.();
          }}
        >
          <div className="p-6 text-center">
            <p className="mb-4 text-lg">Dialog with theme and rounded edges.</p>
            <button
              onClick={handleClose}
              className="px-4 py-2 bg-purple-600 text-white rounded"
            >
              Close
            </button>
          </div>
        </Dialog>
      </div>
    );
  },
};

/**
 * Handlebar at the Bottom
 */
export const HandlebarAtBottom: Story = {
  args: {
    handlebarPosition: 'bottom',
  },
  render: (args) => {
    const { internalIsOpen, handleClose, setInternalIsOpen } =
      useControllableDialogState(args.isOpen ?? false);

    return (
      <div className="p-4 space-y-4">
        <button
          onClick={() => setInternalIsOpen(true)}
          className="px-4 py-2 bg-teal-500 text-white rounded"
        >
          Open Bottom-Handlebar Dialog
        </button>

        <Dialog
          {...args}
          isOpen={internalIsOpen}
          onClose={() => {
            handleClose();
            args.onClose?.();
          }}
        >
          <div className="p-6 text-center">
            <p className="mb-4 text-lg">
              The handlebar is pinned to the bottom.
            </p>
          </div>
        </Dialog>
      </div>
    );
  },
};

/**
 * Accessibility Test
 */
export const AccessibilityTest: Story = {
  args: {
    a11yOptions: {
      escapeClose: true,
      role: 'alertdialog',
      ariaLabel: 'Accessible Dialog',
    },
  },
  render: (args) => {
    const { internalIsOpen, handleClose, setInternalIsOpen } =
      useControllableDialogState(args.isOpen ?? false);

    return (
      <div className="p-4 space-y-4">
        <button
          onClick={() => setInternalIsOpen(true)}
          className="px-4 py-2 bg-pink-600 text-white rounded"
        >
          Open Accessible Dialog
        </button>

        <Dialog
          {...args}
          isOpen={internalIsOpen}
          onClose={() => {
            handleClose();
            args.onClose?.();
          }}
        >
          <div className="p-6 text-center">
            <p className="mb-4 text-lg">
              This dialog is configured with advanced ARIA attributes.
            </p>
          </div>
        </Dialog>
      </div>
    );
  },
};

/**
 * Advanced Drag and Close
 * Showcases rubber-band dragging, enhanced close box, and a threshold
 */
export const AdvancedDragAndClose: Story = {
  args: {
    rubberBandOnDrag: true,
    enhancedCloseBox: true,
    closeThreshold: 0.3,
  },
  render: (args) => {
    const { internalIsOpen, handleClose, setInternalIsOpen } =
      useControllableDialogState(args.isOpen ?? false);

    return (
      <div className="p-4 space-y-4">
        <button
          onClick={() => setInternalIsOpen(true)}
          className="px-4 py-2 bg-red-500 text-white rounded"
        >
          Open Advanced Drag
        </button>

        <Dialog
          {...args}
          isOpen={internalIsOpen}
          onClose={() => {
            handleClose();
            args.onClose?.();
          }}
        >
          <div className="p-6 text-center">
            <h2 className="text-lg mb-4">Rubber-Band Drag</h2>
            <p className="mb-4 text-sm">
              Drag the handlebar aggressively to trigger the enhanced close box.
            </p>
            <button
              onClick={handleClose}
              className="px-4 py-2 bg-red-500 text-white rounded"
            >
              Close
            </button>
          </div>
        </Dialog>
      </div>
    );
  },
};
// src/components/Dialog/Dialog.stories.tsx
