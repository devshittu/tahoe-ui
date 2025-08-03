// src/app/docs/layout.tsx
// 'use client';

import React from 'react';
import GlobalNav from '@/components/GlobalNav/GlobalNav';
import HeroSection from '@/components/HeroSection/HeroSection';
// ComponentViewer will be used by a specific 'page' component, not the layout directly
// import ComponentViewer from '@/components/ui/component-viewer'; // REMOVED from here

export default function PublicLayout({
  children, // This will be the actual page content (e.g., from docs/page.tsx or docs/[id]/page.tsx)
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative min-h-screen bg-white dark:bg-black text-gray-900 dark:text-gray-100">
      <GlobalNav />
      <main>
        {/* <HeroSection /> */}
        {/* You can add the CraftUiCards component here if you wish to keep it on the page */}
        {/* <CraftUiCards /> */}
        {children}
        {/* The ComponentViewer will be rendered by the specific page component, not here */}
        {/* <ComponentViewer /> */}
      </main>
    </div>
  );
}
