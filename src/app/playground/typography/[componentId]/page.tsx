// src/app/playground/typography/[componentId]/page.tsx
'use client';

import React from 'react';
import { useParams } from 'next/navigation';
import { typographyComponents } from '@/lib/typography-data';
import ComponentViewer from '@/components/DocsPageLayout/components/ui/component-viewer';
import Link from 'next/link';

export default function TypographyComponentPage() {
  const params = useParams();
  const componentId = params.componentId as string;

  const selectedComponent =
    typographyComponents.find((comp) => comp.id === componentId) ?? null;

  if (!selectedComponent) {
    return (
      <div className="flex flex-col items-center justify-center h-full text-gray-500 dark:text-gray-400 p-4 text-center">
        <p className="text-2xl sm:text-3xl font-semibold mb-4">
          Component Not Found
        </p>
        <p className="text-lg max-w-xl mb-6">
          The component with ID &quot;{componentId}&quot; could not be found in
          the Typography system.
        </p>
        <Link
          href="/playground/typography"
          className="text-blue-500 hover:text-blue-600 underline"
        >
          ← Back to Typography Overview
        </Link>
      </div>
    );
  }

  return (
    <div>
      <nav className="mb-4 text-sm">
        <Link
          href="/playground/typography"
          className="text-gray-500 dark:text-gray-400 hover:text-blue-500"
        >
          Typography
        </Link>
        <span className="mx-2 text-gray-400">/</span>
        <span className="text-gray-900 dark:text-white font-medium">
          {selectedComponent.name}
        </span>
      </nav>

      <ComponentViewer component={selectedComponent} />
    </div>
  );
}
