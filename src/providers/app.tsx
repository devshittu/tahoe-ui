// File: src/providers/app.tsx
'use client';
import React, { ReactNode, Suspense, useState } from 'react';
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from '@/lib/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { IS_DEVELOPMENT } from '@/config/constants';
import { Loading } from '@/components/loading';
import { PageMode } from '@/components/PageMode/PageMode';
import { Dialog } from '@/components/Dialog/Dialog';
import FloatingNav from '@/components/FloatingNav/FloatingNav'; // Adjust path as needed
import { UIProvider } from '@/components/UIManager/UIProvider';
// Removed: import { ThemeProvider } from 'next-themes'; // No longer needed here

type AppProviderProps = {
  children: ReactNode;
  theme?: string; // This prop might become redundant if theme is fully managed by next-themes at root
};

export const AppProvider = ({ children }: AppProviderProps) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  return (
    <>
      <QueryClientProvider client={queryClient}>
        {IS_DEVELOPMENT && <ReactQueryDevtools initialIsOpen={false} />}

        {/* Removed: ThemeProvider. It is now handled in app/layout.tsx */}
        <UIProvider>
          <Suspense fallback={<Loading />}>{children}</Suspense>
        </UIProvider>

        <FloatingNav
          initialExpanded={false} // Example: start collapsed
          initialActiveItem="WeatherForecastButton" // Example: set initial active item
          onExpandChange={(expanded) => console.log('Nav expanded:', expanded)}
          onItemClick={(id) => console.log('Nav item clicked:', id)}
          // You can also pass custom 'items' array here if needed
        />
        
        <PageMode
          enableContentScroll={true} // default
          position="top"
          useContainer={true}
          roundedEdges={true}
          themeable={true}
          closeThreshold={0.2} // Halfway close threshold
          enhancedCloseBox={true} // Enable enhanced close box
          a11yOptions={{
            escapeClose: true,
            role: 'dialog',
            ariaLabel: 'Example Page Mode',
            lockScroll: true,
            closeOnOutsideClick: true,
            handlebarAriaLabel: 'Drag handle to close or press Escape',
          }}
        />

        {/* Dialog Component */}
        <Dialog
          isOpen={isDialogOpen}
          onClose={() => setIsDialogOpen(false)}
          showFrom="right" // Slides in from the left
          handlebarPosition="right" // Handlebar is on the left
          roundedEdges={true} // Rounded corners
          themeable={true} // Themeable styles
          lockScroll={true} // Locks background scroll
          closeOnOutsideClick={true} // Closes when clicking outside
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
            Are you sure you want to proceed with this action?
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
      </QueryClientProvider>
    </>
  );
};
