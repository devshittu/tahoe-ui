// src/app/docs/page.tsx
'use client'; // This can also be a client component because the layout is client

import React from 'react';
// This page itself doesn't need to fetch data or manage state if the layout does.
// It simply serves as the default route for /docs.
// The DocsLayout will handle the ComponentViewer display based on its state.

export default function DocsPage() {
  // This page will render inside the DocsLayout.
  // The DocsLayout already handles displaying ComponentViewer or children.
  // If no component is selected, the DocsLayout will implicitly show the 'children'
  // which for this specific `/docs` route might mean a default landing message.
  // However, given the current state management in DocsLayout,
  // it will always show the first mock component by default.
  // If you want a specific "Welcome to Docs" page, you'd put that content here.
  // For now, the existing behavior of DocsLayout displaying the first component is fine.

  // If you later want a proper landing page when no component is explicitly selected,
  // you would put content here, and adjust DocsLayout to conditionally render
  // ComponentViewer OR children based on a more explicit route or state.

  return (
    <div className="flex flex-col items-center justify-center h-full text-gray-500 dark:text-gray-400 p-4 text-center">
      <p className="text-2xl sm:text-3xl font-semibold mb-4">
        Welcome to Tahoe UI Design System Docs
      </p>
      <p className="text-lg max-w-xl">
        Select a component from the sidebar to view its live preview, API
        reference, and code snippet. Explore our collection of modern UI
        components designed for a seamless user experience.
      </p>
    </div>
  );
}
