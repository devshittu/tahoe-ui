'use client';
import React, { ReactNode, useEffect, Suspense } from 'react';
// import { ThemeProvider } from 'next-themes';
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from '@/lib/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { IS_DEVELOPMENT } from '@/config/constants';
import { Loading } from '@/components/loading';
import ToastProvider from '@/providers/ToastProvider';
import { PageMode } from '@/components/PageMode/PageMode';
import { Dialog } from '@/components/Dialog/Dialog';
import { UIProvider } from '@/components/UIManager/UIProvider';

type AppProviderProps = {
  children: ReactNode;
  theme?: string;
};

export const AppProvider = ({ children, theme }: AppProviderProps) => {
  // Initialize the Zustand store with default settings when the App component mounts
  // useInitializeStore();

  return (
    <>
    {/* <ThemeProvider attribute="class" forcedTheme={theme || undefined}> */}
      
        {/* <ThemeProvider attribute="class" enableSystem={true} defaultTheme="light"> */}
        <QueryClientProvider client={queryClient}>
          {IS_DEVELOPMENT && <ReactQueryDevtools initialIsOpen={false} />}
          <UIProvider>
            <Suspense fallback={<Loading />}>{children}</Suspense>
</UIProvider>

        {/* <Overlay /> */}
        {/* <PageMode />
        <PromptDialog />
        <Dialog />
        <DrawerMenu /> */}


        <PageMode
  enableContentScroll={true} // default
          position="bottom"
          useContainer={true}
          roundedEdges={true}
          themeable={true}
          closeThreshold={0.2} // Halfway close threshold
          enhancedCloseBox={true} // Enable enhanced close box
          a11yOptions={{
            escapeClose: true,
            role: "dialog",
            ariaLabel: "Example Page Mode",
            lockScroll: true,
            closeOnOutsideClick: true,
            handlebarAriaLabel: "Drag handle to close or press Escape",
          }}
        />
        
      <Dialog
        showFrom="right"
        handlebarPosition="right"
        a11yOptions={{
          escapeClose: true,
          role: "dialog",
          ariaLabel: "Confirmation Dialog",
          ariaModal: true,
          ariaLabelledby: "dialog-title",
          ariaDescribedby: "dialog-description",
          handlebarAriaLabel: "Drag handle to close or press Escape",
        }}
        useContainer={true}
        roundedEdges={true}
        themeable={true}
        lockScroll={true}
        closeOnOutsideClick={true}
        closeThreshold={0.5} // 50% threshold
        enhancedCloseBox={true}
        // onClose={() => setIsOpen(false)}
      >
        <h2 id="dialog-title" className="text-xl font-bold mb-4">
          Confirm Action
        </h2>
        <p id="dialog-description" className="mb-6">
          Are you sure you want to perform this action? This cannot be undone.
        </p>
        <div className="flex justify-end space-x-4">
          <button
            onClick={() => setIsOpen(false)}
            className="px-4 py-2 bg-gray-300 dark:bg-gray-600 text-gray-800 dark:text-gray-200 rounded"
          >
            Cancel
          </button>
          <button
            onClick={() => {
              // Perform your action here
              setIsOpen(false);
            }}
            className="px-4 py-2 bg-blue-600 dark:bg-blue-500 text-white rounded"
          >
            Confirm
          </button>
        </div>
      </Dialog>
        <ToastProvider />
        </QueryClientProvider>
        {/* <ConfettiEffect /> */}
    {/* </ThemeProvider> */}
    </>
  );
};
// Path: src/providers/app.tsx
