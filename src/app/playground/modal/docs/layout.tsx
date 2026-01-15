// src/app/playground/modal/docs/layout.tsx
'use client';

import React, { useState } from 'react';
import Sidebar from '@/components/DocsPageLayout/components/ui/sidebar';
import { modalComponents, modalStaticLinks } from '@/lib/modal-data';
import { FiMenu } from 'react-icons/fi';

interface ModalDocsLayoutProps {
  children: React.ReactNode;
}

export default function ModalDocsLayout({ children }: ModalDocsLayoutProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [selectedComponentId, setSelectedComponentId] = useState<string | null>(
    null,
  );

  const handleSelectComponent = (componentId: string) => {
    setSelectedComponentId(componentId);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex">
      {/* Sidebar */}
      <Sidebar
        onSelectComponent={handleSelectComponent}
        selectedComponentId={selectedComponentId}
        components={modalComponents}
        staticLinks={modalStaticLinks}
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
        basePath="/playground/modal/docs"
      />

      {/* Main Content */}
      <main className="flex-1 min-w-0">
        {/* Mobile Header */}
        <div className="lg:hidden sticky top-0 z-30 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 px-4 py-3">
          <button
            onClick={() => setIsSidebarOpen(true)}
            className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
          >
            <FiMenu size={20} />
            <span className="font-medium">Modal Components</span>
          </button>
        </div>

        {/* Page Content */}
        <div className="p-6 lg:p-8">{children}</div>
      </main>
    </div>
  );
}
