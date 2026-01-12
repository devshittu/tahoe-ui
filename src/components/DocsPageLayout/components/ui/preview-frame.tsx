// src/components/DocsPageLayout/components/ui/preview-frame.tsx
'use client';

import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import { PreviewTheme, PreviewViewMode } from './preview-toolbar';

interface PreviewFrameProps {
  previewComponentCode: string;
  viewMode: PreviewViewMode;
  theme: PreviewTheme;
  isRtl: boolean;
}

/**
 * Renders an HTML content string inside an isolated iframe.
 * Provides sandboxed environment with theming, RTL, and device view simulations.
 */
const PreviewFrame: React.FC<PreviewFrameProps> = ({
  previewComponentCode,
  viewMode,
  theme,
  isRtl,
}) => {
  const [iframeLoaded, setIframeLoaded] = useState(false);

  const fixedIframeHeight = '300px';

  const iframeWidths = {
    desktop: '100%',
    tablet: '768px',
    mobile: '375px',
  };

  const currentIframeWidth = iframeWidths[viewMode];

  const fullHtml = `
    <!DOCTYPE html>
    <html lang="${isRtl ? 'ar' : 'en'}" dir="${isRtl ? 'rtl' : 'ltr'}">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Component Preview</title>
      <script src="https://cdn.tailwindcss.com"></script>
      <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
      <style>
        body {
          font-family: 'Inter', sans-serif;
          margin: 0;
          padding: 0;
          box-sizing: border-box;
          display: flex;
          align-items: center;
          justify-content: center;
          height: 100%;
          width: 100%;
          overflow: auto;
          transition: background-color 0.3s ease;
          background-color: white;
          color: #1f2937;
        }
        body.dark {
          background-color: #111827;
          color: #f9fafb;
        }
      </style>
    </head>
    <body class="${theme === 'dark' ? 'dark' : 'light'}">
      ${previewComponentCode}
    </body>
    </html>
  `;

  return (
    <div
      className={cn(
        'relative overflow-hidden',
        'flex items-center justify-center',
        'border border-gray-200 dark:border-gray-700 rounded-xl',
        'bg-white dark:bg-gray-900',
        'transition-all duration-300 ease-in-out',
        viewMode !== 'desktop' && 'p-3',
      )}
      style={{
        width: viewMode === 'desktop' ? '100%' : currentIframeWidth,
        height: fixedIframeHeight,
        maxWidth: viewMode === 'desktop' ? 'none' : '90vw',
        ...(viewMode !== 'desktop' && {
          boxShadow: '0 0 0 8px rgba(0,0,0,0.08)',
          borderRadius: '2rem',
        }),
      }}
    >
      {/* Loading state */}
      {!iframeLoaded && (
        <div
          className={cn(
            'absolute inset-0 flex items-center justify-center z-10',
            'bg-gray-100 dark:bg-gray-800',
            'text-gray-600 dark:text-gray-300',
            'transition-opacity duration-300',
          )}
        >
          Loading preview...
        </div>
      )}

      {/* Iframe */}
      <iframe
        key={`${viewMode}-${theme}-${isRtl}-${previewComponentCode.substring(0, 50)}`}
        title="Component Preview"
        srcDoc={fullHtml}
        className={cn(
          'border-none w-full h-full',
          'transition-all duration-300 ease-in-out',
          viewMode === 'desktop' ? 'rounded-lg' : 'rounded-xl',
        )}
        onLoad={() => setIframeLoaded(true)}
        sandbox="allow-scripts allow-same-origin allow-popups allow-forms"
      />

      {/* Home button for device frames */}
      {viewMode !== 'desktop' && (
        <div
          className={cn(
            'absolute bottom-3 w-10 h-10 rounded-full',
            'flex items-center justify-center cursor-pointer',
            'bg-gray-200 dark:bg-gray-700 shadow-inner',
          )}
        >
          <div className="w-4 h-4 border-2 border-gray-400 dark:border-gray-500 rounded-sm" />
        </div>
      )}
    </div>
  );
};

export default PreviewFrame;
