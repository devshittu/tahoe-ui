// src/components/DocsPageLayout/components/ui/preview-frame.tsx
'use client';

import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import { PreviewTheme, PreviewViewMode } from './preview-toolbar'; // Import types

interface PreviewFrameProps {
  previewComponentCode: string; // Now accepts raw HTML/CSS/JS
  viewMode: PreviewViewMode;
  theme: PreviewTheme;
  isRtl: boolean;
}

/**
 * Renders an HTML content string inside an isolated iframe.
 * This component is used to preview UI components in a sandboxed environment,
 * allowing for isolated theming, RTL, and device view simulations.
 * @param previewComponentCode The raw HTML/CSS/JS string to display.
 * @param viewMode The current device view mode ('desktop', 'tablet', 'mobile').
 * @param theme The current theme for the preview ('light', 'dark').
 * @param isRtl If true, the preview content will be rendered in RTL direction.
 */
const PreviewFrame: React.FC<PreviewFrameProps> = ({
  previewComponentCode,
  viewMode,
  theme,
  isRtl,
}) => {
  const [iframeLoaded, setIframeLoaded] = useState(false);

  // Define fixed height for the iframe itself
  const fixedIframeHeight = '300px';

  // Determine iframe dimensions based on viewMode
  const iframeWidths = {
    desktop: '100%',
    tablet: '768px',
    mobile: '375px',
  };

  const currentIframeWidth = iframeWidths[viewMode];

  // Base HTML structure for the iframe content.
  // Dynamically sets 'data-theme' and 'dir' attributes on the body.
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
        /* Base styles for the iframe body */
        body {
          font-family: 'Inter', sans-serif;
          margin: 0;
          padding: 0;
          box-sizing: border-box;
          display: flex; /* Center content horizontally and vertically */
          align-items: center;
          justify-content: center;
          height: 100%; /* Take full height of iframe */
          width: 100%; /* Take full width of iframe */
          overflow: auto; /* Allow scrolling within preview if content overflows */
          transition: background-color 0.3s ease; /* Smooth theme transition */
          background-color: white; /* Default background for component itself */
          color: #1f2937; /* gray-900 */
        }
        /* Dark theme styles for iframe content */
        body.dark {
          background-color: #111827; /* gray-900 */
          color: #f9fafb; /* white */
        }
        /* RTL specific adjustments if needed by the component */
        body[dir="rtl"] {
          /* Add specific RTL overrides here if your component HTML needs them */
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
        'relative bg-white dark:bg-gray-900 rounded-xl shadow-inner overflow-hidden',
        'flex items-center justify-center border border-gray-200 dark:border-gray-700',
        'transition-all duration-300 ease-in-out', // Smooth transition for size changes
        // Apply device frame styling only for tablet/mobile view modes
        viewMode !== 'desktop' ? 'p-3' : 'p-0', // Padding for device frames
      )}
      style={{
        width: viewMode === 'desktop' ? '100%' : currentIframeWidth, // Control outer container width
        height: fixedIframeHeight, // Fixed height for the preview area
        maxWidth: viewMode === 'desktop' ? 'none' : '90vw', // Max width for responsiveness
        // Add device-like shadow and rounded corners for non-desktop previews
        ...(viewMode !== 'desktop' && {
          boxShadow:
            '0 15px 40px rgba(0,0,0,0.25), 0 0 0 10px rgba(0,0,0,0.08)',
          borderRadius: '2.5rem', // More rounded for device feel
        }),
      }}
    >
      {!iframeLoaded && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 z-10 transition-opacity duration-300">
          Loading preview...
        </div>
      )}
      <iframe
        key={`${viewMode}-${theme}-${isRtl}-${previewComponentCode.substring(0, 50)}`} // Key to force re-render on prop changes
        title="Component Preview"
        srcDoc={fullHtml}
        className={cn(
          'border-none w-full h-full', // Iframe takes full size of its container
          'transition-all duration-300 ease-in-out', // Smooth transition for iframe size
          viewMode === 'desktop' ? 'rounded-lg' : 'rounded-xl', // Adjust border radius for device frame
        )}
        onLoad={() => setIframeLoaded(true)}
        // Sandbox attributes to restrict iframe capabilities for security
        sandbox="allow-scripts allow-same-origin allow-popups allow-forms"
      />
      {viewMode !== 'desktop' && (
        // Mock home button for non-desktop previews to enhance device simulation
        <div className="absolute bottom-4 w-12 h-12 bg-gray-300 dark:bg-gray-600 rounded-full flex items-center justify-center cursor-pointer shadow-inner">
          <div className="w-5 h-5 border-2 border-gray-500 dark:border-gray-400 rounded-sm"></div>
        </div>
      )}
    </div>
  );
};

export default PreviewFrame;
