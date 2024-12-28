// src/components/DialogExampleTrigger.tsx
'use client';

import React, { useState } from 'react';
import { Dialog } from './Dialog';

export function DialogExampleTrigger() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const toggleDialog = () => setIsDialogOpen((prev) => !prev);

  return (
    <main className="min-h-screenx bg-gray-100 dark:bg-gray-900 flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-4">
          Dialog Component Playground
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mb-6">
          Click the button below to open the dialog. Experiment with different
          props!
        </p>
        <button
          className="px-4 py-2 bg-blue-600 text-white rounded-lg shadow-lg hover:bg-blue-500"
          onClick={toggleDialog}
        >
          Open Dialog
        </button>
      </div>

      {/* Dialog Component */}
      <Dialog
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        showFrom="right" // Slides in from the left
        handlebarPosition="right" // Handlebar is on the left
        roundedEdges={true} // Rounded corners
        themeable={true} // Themeable styles
        lockScroll={true} // Locks background scroll
        closeOnOutsideClick={false} // Closes when clicking outside
        closeThreshold={0.5} // 50% drag threshold to close
        enhancedCloseBox={true} // Displays the "Release to close" overlay
        useContainer={true} // Wraps content in a container
        rubberBandOnDrag={false} // Uses threshold logic
        a11yOptions={{
          escapeClose: true,
          role: 'dialog',
          ariaLabel: 'Confirmation Dialog',
          ariaModal: true,
          ariaLabelledby: 'dialog-title',
          ariaDescribedby: 'dialog-description',
          handlebarAriaLabel: 'Drag handle to close or press Escape',
        }}
      >
        {/* Dialog Content */}
        <h2 id="dialog-title" className="text-xl font-semibold">
          Confirmation
        </h2>
        <p id="dialog-description" className="mt-4">
          Are you sure you want tox proceed with this action?
        </p>
        <div className="mt-6 flex justify-end space-x-4">
          <button
            onClick={() => setIsDialogOpen(false)}
            className="px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400 focus:outline-none"
          >
            Cancel
          </button>
          <button
            onClick={() => {
              // Add your confirmation logic here
              setIsDialogOpen(false);
            }}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 focus:outline-none"
          >
            Confirm
          </button>
        </div>
      </Dialog>
    </main>
  );
}
