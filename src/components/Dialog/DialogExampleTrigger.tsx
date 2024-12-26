// src/components/DialogExampleTrigger.tsx
"use client";

import React, { useState } from "react";
import { Dialog } from "./Dialog";

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
          Click the button below to open the dialog. Experiment with different props!
        </p>
        <button
          className="px-4 py-2 bg-blue-600 text-white rounded-lg shadow-lg hover:bg-blue-500"
          onClick={toggleDialog}
        >
          Open Dialog
        </button>
      </div>

      <Dialog
        isOpen={isDialogOpen}
        onClose={toggleDialog}
        showFrom="bottom"
        handlebarPosition="top"
        roundedEdges={true}
        // themeable={true}
        a11yOptions={{
          escapeClose: true,
          lockScroll: true,
          closeOnOutsideClick: true,
          ariaLabel: "Sample Dialog",
        }}
  rubberBandOnDrag={true} // Enable the rubber band effect
      >
        <h2 className="text-xl font-semibold mb-4">Welcome to the Dialog</h2>
        <p className="text-gray-700 dark:text-gray-300 mb-6">
          This is a fully customizable and responsive dialog box. Drag the handlebar to close or click
          outside the dialog (if enabled).
        </p>
        <button
          className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-500"
          onClick={toggleDialog}
        >
          Close Dialog
        </button>
      </Dialog>
      

    </main>
  );
}
