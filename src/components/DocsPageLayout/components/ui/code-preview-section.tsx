// src/components/DocsPageLayout/components/ui/code-preview-section.tsx
'use client';

import React, { useEffect, useRef, useState } from 'react';
import { useTheme } from 'next-themes';
import Prism from 'prismjs';
import 'prismjs/components/prism-typescript';
import 'prismjs/components/prism-jsx';
import 'prismjs/components/prism-markup';

import PreviewFrame from './preview-frame';
import PreviewToolbar, {
  PreviewTheme,
  PreviewViewMode,
  CodeLanguage,
} from './preview-toolbar';
import CodeSyntaxToolbar from './code-syntax-toolbar';
import { ComponentData } from '@/lib/data';
import { cn } from '@/lib/utils';

interface CodePreviewSectionProps {
  component: ComponentData;
}

/**
 * Encapsulates the live preview and code snippet sections for a UI component.
 * Auto-inherits app-wide theme unless user explicitly toggles it.
 */
const CodePreviewSection: React.FC<CodePreviewSectionProps> = ({
  component,
}) => {
  const codeRef = useRef<HTMLElement>(null);
  const [copySuccess, setCopySuccess] = useState('');
  const [isCodeExpanded, setIsCodeExpanded] = useState(false);

  // Get app-wide theme
  const { resolvedTheme } = useTheme();

  // States for preview controls
  const [viewMode, setViewMode] = useState<PreviewViewMode>('desktop');
  const [isRtl, setIsRtl] = useState(false);
  const [currentCodeLanguage, setCurrentCodeLanguage] =
    useState<CodeLanguage>('typescript');

  // Track if user has manually overridden the theme
  const [isThemeOverridden, setIsThemeOverridden] = useState(false);
  const [manualTheme, setManualTheme] = useState<PreviewTheme>('light');

  // Effective theme: use manual if overridden, otherwise sync with app
  const previewTheme: PreviewTheme = isThemeOverridden
    ? manualTheme
    : (resolvedTheme as PreviewTheme) || 'light';

  // Handle theme toggle - marks as user override
  const handleThemeChange = (theme: PreviewTheme) => {
    setIsThemeOverridden(true);
    setManualTheme(theme);
  };

  // Effect to highlight code whenever the component data or language changes
  useEffect(() => {
    if (codeRef.current && component) {
      const codeToHighlight =
        currentCodeLanguage === 'typescript'
          ? component.codeSnippet
          : component.previewComponentCode;

      codeRef.current.textContent = codeToHighlight.trim();
      Prism.highlightElement(codeRef.current);
    }
    // Reset preview controls when component changes
    setViewMode('desktop');
    setIsRtl(false);
    setIsThemeOverridden(false); // Reset to app theme when component changes
    setCurrentCodeLanguage('typescript');
    setIsCodeExpanded(false);
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
    <div className="code-example">
      {/* Toolbar for Live Preview controls */}
      <PreviewToolbar
        currentViewMode={viewMode}
        onViewModeChange={setViewMode}
        currentTheme={previewTheme}
        onThemeChange={handleThemeChange}
        isRtl={isRtl}
        onRtlToggle={() => setIsRtl((prev) => !prev)}
        githubLink={`https://github.com/devshittu/tahoe-ui/blob/main/src/components/ui/${component.id}.tsx`}
        isThemeOverridden={isThemeOverridden}
      />

      {/* Preview Frame Wrapper */}
      <div
        className={cn(
          'code-preview-wrapper flex items-center justify-center p-6 border-x border-gray-200 dark:border-gray-700',
          'transition-colors duration-300 ease-in-out bg-gray-50 dark:bg-gray-900/50',
        )}
        style={
          viewMode === 'tablet' || viewMode === 'mobile'
            ? {
                backgroundImage:
                  resolvedTheme === 'dark'
                    ? 'linear-gradient(to right, rgba(255,255,255,0.08) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.08) 1px, transparent 1px)'
                    : 'linear-gradient(to right, rgba(0,0,0,0.08) 1px, transparent 1px), linear-gradient(to bottom, rgba(0,0,0,0.08) 1px, transparent 1px)',
                backgroundSize: '20px 20px',
              }
            : undefined
        }
      >
        <PreviewFrame
          previewComponentCode={component.previewComponentCode}
          viewMode={viewMode}
          theme={previewTheme}
          isRtl={isRtl}
        />
      </div>

      {/* Code Syntax Wrapper */}
      <div className="code-syntax-wrapper">
        <div
          className={cn(
            'relative border-x border-b rounded-b-xl overflow-hidden',
            'border-gray-200 dark:border-gray-700',
          )}
        >
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
              className={cn(
                'overflow-auto custom-scrollbar',
                isCodeExpanded ? 'max-h-[600px]' : 'max-h-72',
              )}
            >
              <pre
                className={cn(
                  'p-4 pr-12 text-sm min-w-full',
                  'bg-gray-50 dark:bg-gray-900',
                  currentCodeLanguage === 'typescript'
                    ? 'language-typescript'
                    : 'language-markup',
                )}
              >
                <code
                  ref={codeRef}
                  className={cn(
                    'block',
                    currentCodeLanguage === 'typescript'
                      ? 'language-typescript'
                      : 'language-markup',
                  )}
                >
                  {/* Content set dynamically in useEffect */}
                </code>
              </pre>
            </div>
            <button
              onClick={toggleExpandCode}
              className={cn(
                'sticky bottom-0 left-0 py-2.5 px-5 w-full text-sm font-medium',
                'bg-gray-100 dark:bg-gray-800 border-t',
                'border-gray-200 dark:border-gray-700',
                'text-gray-600 dark:text-gray-300',
                'hover:bg-gray-200 dark:hover:bg-gray-700',
                'hover:text-gray-900 dark:hover:text-white',
                'transition-colors duration-150',
              )}
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
