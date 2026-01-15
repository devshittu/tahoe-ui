// src/app/playground/modal/docs/[componentId]/page.tsx
'use client';

import React, { use } from 'react';
import { notFound } from 'next/navigation';
import NextLink from 'next/link';
import ComponentViewer from '@/components/DocsPageLayout/components/ui/component-viewer';
import { modalComponents } from '@/lib/modal-data';
import { FiArrowLeft, FiPlay } from 'react-icons/fi';
import { SmallText, Link } from '@/components/Typography';

interface ModalComponentPageProps {
  params: Promise<{ componentId: string }>;
}

export default function ModalComponentPage({
  params,
}: ModalComponentPageProps) {
  const { componentId } = use(params);

  const component = modalComponents.find((c) => c.id === componentId);

  if (!component) {
    notFound();
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Breadcrumb */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Link href="/playground/modal/docs" variant="muted">
            <span className="flex items-center gap-1">
              <FiArrowLeft size={14} />
              <SmallText>Modal Docs</SmallText>
            </span>
          </Link>
          <SmallText className="text-gray-500 dark:text-gray-400">/</SmallText>
          <SmallText>{component.name}</SmallText>
        </div>
        <NextLink
          href="/playground/modal"
          className="inline-flex items-center gap-2 px-3 py-1.5 text-sm bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 rounded-lg hover:bg-blue-200 dark:hover:bg-blue-900/50 transition-colors"
        >
          <FiPlay size={14} />
          Try Demo
        </NextLink>
      </div>

      {/* Component Documentation */}
      <ComponentViewer component={component} />
    </div>
  );
}
