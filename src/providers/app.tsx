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

  return (
    <>
      {/* <ThemeProvider attribute="class" forcedTheme={theme || undefined}> */}

      {/* <ThemeProvider attribute="class" enableSystem={true} defaultTheme="light"> */}
      <QueryClientProvider client={queryClient}>
        {IS_DEVELOPMENT && <ReactQueryDevtools initialIsOpen={false} />}
        <UIProvider>
          <Suspense fallback={<Loading />}>{children}</Suspense>
        </UIProvider>


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
            role: 'dialog',
            ariaLabel: 'Example Page Mode',
            lockScroll: true,
            closeOnOutsideClick: true,
            handlebarAriaLabel: 'Drag handle to close or press Escape',
          }}
        />

        <Dialog
          showFrom="right"
          handlebarPosition="right"
          a11yOptions={{
            escapeClose: true,
            role: 'dialog',
            ariaLabel: 'Confirmation Dialog',
            ariaModal: true,
            ariaLabelledby: 'dialog-title',
            ariaDescribedby: 'dialog-description',
            handlebarAriaLabel: 'Drag handle to close or press Escape',
          }}
          useContainer={true}
          roundedEdges={true}
          themeable={true}
          lockScroll={true}
          closeOnOutsideClick={true}
          closeThreshold={0.5} // 50% threshold
          enhancedCloseBox={true}
          // onClose={() => setIsOpen(false)}
        />
        <ToastProvider />
      </QueryClientProvider>
      {/* </ThemeProvider> */}
    </>
  );
};
// Path: src/providers/app.tsx
