// src/app/docs/[componentId]/page.tsx
'use client';

import React, { useEffect } from 'react';
import { useParams } from 'next/navigation'; // For App Router, use useParams
import { mockComponents } from '@/lib/data';
import ComponentViewer from '@/components/DocsPageLayout/components/ui/component-viewer';
// import ComponentViewer from '@/components/ui/component-viewer'; // Adjust path if necessary

export default function SpecificDocComponentPage() {
  const params = useParams();
  const componentId = params.componentId as string; // Get the dynamic ID from the URL

  const selectedComponent =
    mockComponents.find((comp) => comp.id === componentId) ?? null;

  // Optional: You might want to update the sidebar's active state here
  // if Sidebar relies on external prop for highlighting based on route.
  // This would involve passing a callback down from DocsLayout to Sidebar.

  if (!selectedComponent) {
    return (
      <div className="flex flex-col items-center justify-center h-full text-gray-500 dark:text-gray-400 p-4 text-center">
        <p className="text-2xl sm:text-3xl font-semibold mb-4">
          Component Not Found
        </p>
        <p className="text-lg max-w-xl">
          The component with ID &quot;{componentId}&quot; could not be found.
          Please select from the sidebar.
        </p>
      </div>
    );
  }

  return <ComponentViewer component={selectedComponent} />;
}
