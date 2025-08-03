// src/components/DocsPageLayout/components/ui/code-preview-section.tsx
'use client';

import React, { useEffect, useRef, useState } from 'react';
import Prism from 'prismjs';
import 'prismjs/components/prism-typescript';
import 'prismjs/components/prism-jsx';
import 'prismjs/components/prism-markup'; // For HTML highlighting

import PreviewFrame from './preview-frame';
import PreviewToolbar, {
  PreviewTheme,
  PreviewViewMode,
  CodeLanguage,
} from './preview-toolbar';
import CodeSyntaxToolbar from './code-syntax-toolbar'; // New component
import { ComponentData } from '@/lib/data';
import { cn } from '@/lib/utils';

interface CodePreviewSectionProps {
  component: ComponentData;
}

/**
 * Encapsulates the live preview and code snippet sections for a UI component.
 * Manages preview controls (device, theme, RTL) and code display (HTML/TS tabs, copy).
 */
const CodePreviewSection: React.FC<CodePreviewSectionProps> = ({
  component,
}) => {
  const codeRef = useRef<HTMLElement>(null);
  const [copySuccess, setCopySuccess] = useState('');
  const [isCodeExpanded, setIsCodeExpanded] = useState(false);

  // States for preview controls
  const [viewMode, setViewMode] = useState<PreviewViewMode>('desktop');
  const [previewTheme, setPreviewTheme] = useState<PreviewTheme>('light');
  const [isRtl, setIsRtl] = useState(false);
  const [currentCodeLanguage, setCurrentCodeLanguage] =
    useState<CodeLanguage>('typescript');

  // Effect to highlight code whenever the component data or language changes
  useEffect(() => {
    if (codeRef.current && component) {
      const codeToHighlight =
        currentCodeLanguage === 'typescript'
          ? component.codeSnippet
          : component.previewComponentCode;

      codeRef.current.textContent = codeToHighlight.trim(); // Set text content before highlighting
      Prism.highlightElement(codeRef.current);
    }
    // Reset preview controls when component changes
    setViewMode('desktop');
    setPreviewTheme('light');
    setIsRtl(false);
    setCurrentCodeLanguage('typescript'); // Default to TS when component changes
    setIsCodeExpanded(false); // Collapse code when component changes
  }, [component, currentCodeLanguage]);

  const handleCopyCode = () => {
    if (codeRef.current && component) {
      const codeToCopy =
        currentCodeLanguage === 'typescript'
          ? component.codeSnippet
          : component.previewComponentCode;

      const textarea = document.createElement('textarea');
      textarea.value = codeToCopy.trim();
      document.body.appendChild(textarea);
      textarea.select();
      try {
        document.execCommand('copy');
        setCopySuccess('Copied!');
      } catch (err) {
        setCopySuccess('Failed to copy!');
        console.error('Failed to copy code: ', err);
      }
      document.body.removeChild(textarea);

      setTimeout(() => {
        setCopySuccess('');
      }, 2000);
    }
  };

  const toggleExpandCode = () => {
    setIsCodeExpanded((prev) => !prev);
  };

  return (
    <div className="mt-8 code-example">
      {/* Toolbar for Live Preview controls */}
      <PreviewToolbar
        currentViewMode={viewMode}
        onViewModeChange={setViewMode}
        currentTheme={previewTheme}
        onThemeChange={setPreviewTheme}
        isRtl={isRtl}
        onRtlToggle={() => setIsRtl((prev) => !prev)}
        githubLink={`https://github.com/devshittu/tahoe-ui/blob/main/src/components/ui/${component.id}.tsx`} // Example GitHub link
      />

      {/* Preview Frame Wrapper */}
      <div
        className={cn(
          'code-preview-wrapper flex items-center justify-center p-5 border-x border-gray-200 dark:border-gray-700',
          'transition-colors duration-300 ease-in-out', // Smooth transition for background
          // Apply canvas grid only for tablet/mobile view modes (outer container)
          (viewMode === 'tablet' || viewMode === 'mobile') &&
            `
          bg-[url('/path/to/light-grid.svg')] dark:bg-[url('/path/to/dark-grid.svg')]
          bg-repeat bg-center
        `, // Placeholder for grid images
          // Fallback for grid images - using CSS gradients for now
          (viewMode === 'tablet' || viewMode === 'mobile') &&
            'bg-grid-light dark:bg-grid-dark',
        )}
      >
        {/* Inline style for grid background, as Tailwind doesn't support dynamic URLs easily */}
        <style jsx>{`
          .bg-grid-light {
            background-image: linear-gradient(
                to right,
                #e2e8f0 1px,
                transparent 1px
              ),
              linear-gradient(to bottom, #e2e8f0 1px, transparent 1px);
            background-size: 20px 20px;
          }
          .dark .bg-grid-dark {
            background-image: linear-gradient(
                to right,
                #374151 1px,
                transparent 1px
              ),
              linear-gradient(to bottom, #374151 1px, transparent 1px);
            background-size: 20px 20px;
          }
        `}</style>
        <PreviewFrame
          previewComponentCode={component.previewComponentCode}
          viewMode={viewMode}
          theme={previewTheme}
          isRtl={isRtl}
        />
      </div>

      {/* Code Syntax Wrapper */}
      <div className="code-syntax-wrapper">
        <div className="relative border-gray-200 border-x border-b rounded-b-lg dark:border-gray-700">
          {/* Toolbar for Code Syntax (HTML/TS tabs, Copy button) */}
          <CodeSyntaxToolbar
            currentCodeLanguage={currentCodeLanguage}
            onCodeLanguageChange={setCurrentCodeLanguage}
            onCopyCode={handleCopyCode}
            copySuccess={copySuccess}
          />

          {/* Code Block */}
          <div className="relative">
            <div
              data-code-wrapper=""
              className="overflow-hidden"
              style={{ maxHeight: isCodeExpanded ? 'none' : '18rem' }} // Fixed max-height for collapsed state
              // tabIndex={0} // Make div focusable for keyboard navigation
            >
              <pre
                className={cn(
                  'p-4 pr-12 overflow-x-auto text-sm custom-scrollbar',
                  currentCodeLanguage === 'typescript'
                    ? 'language-typescript'
                    : 'language-markup',
                )}
              >
                <code
                  ref={codeRef}
                  className={
                    currentCodeLanguage === 'typescript'
                      ? 'language-typescript'
                      : 'language-markup'
                  }
                >
                  {/* Content set dynamically in useEffect */}
                </code>
              </pre>
            </div>
            <button
              onClick={toggleExpandCode}
              className="absolute bottom-0 left-0 py-2.5 px-5 w-full text-sm font-medium text-gray-900 bg-gray-100 border-t border-gray-200 hover:bg-gray-100 hover:text-blue-700 dark:bg-gray-700 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700 rounded-b-lg"
            >
              {isCodeExpanded ? 'Collapse code' : 'Expand code'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CodePreviewSection;

// components/ui/code-preview-section.tsx
