// File: src/providers/app.tsx
'use client';
import React, { ReactNode, Suspense, useState } from 'react';
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from '@/lib/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { IS_DEVELOPMENT } from '@/config/constants';
import { Loading } from '@/components/loading';

import FloatingNav from '@/components/FloatingNav/FloatingNav'; // Adjust path as needed
import { UIProvider } from '@/components/UIManager/UIProvider';

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
      </QueryClientProvider>
    </>
  );
};
