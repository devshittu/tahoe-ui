// src/components/DocsPageLayout/components/ui/code-syntax-toolbar.tsx
'use client';

import React, { useState } from 'react';
import {
  useFloating,
  offset,
  flip,
  shift,
  autoUpdate,
  useHover,
  useFocus,
  useDismiss,
  useRole,
  useInteractions,
  FloatingPortal,
} from '@floating-ui/react';
import { FiCopy } from 'react-icons/fi';
import { cn } from '@/lib/utils';
import { CodeLanguage } from './preview-toolbar'; // Re-use CodeLanguage type

interface CodeSyntaxToolbarProps {
  currentCodeLanguage: CodeLanguage;
  onCodeLanguageChange: (lang: CodeLanguage) => void;
  onCopyCode: () => void;
  copySuccess: string;
}

interface TooltipProps {
  content: string;
  children: React.ReactElement;
}

// Helper component for tooltips (re-used from PreviewToolbar)
const Tooltip: React.FC<TooltipProps> = ({ content, children }) => {
  const [isOpen, setIsOpen] = useState(false);

  const { refs, floatingStyles, context } = useFloating({
    open: isOpen,
    onOpenChange: setIsOpen,
    middleware: [offset(8), flip(), shift()],
    whileElementsMounted: autoUpdate,
  });

  const hover = useHover(context, { move: false });
  const focus = useFocus(context);
  const dismiss = useDismiss(context);
  const role = useRole(context, { role: 'tooltip' });

  const { getReferenceProps, getFloatingProps } = useInteractions([
    hover,
    focus,
    dismiss,
    role,
  ]);

  return (
    <>
      {React.cloneElement(
        children,
        getReferenceProps({ ref: refs.setReference }),
      )}
      <FloatingPortal>
        {isOpen && (
          <div
            ref={refs.setFloating}
            style={floatingStyles}
            {...getFloatingProps()}
            className="z-50 px-3 py-2 text-xs font-medium text-white bg-gray-900 rounded-lg shadow-sm dark:bg-gray-700 opacity-90"
          >
            {content}
          </div>
        )}
      </FloatingPortal>
    </>
  );
};

/**
 * Toolbar for the code snippet section.
 * Includes tabs to switch between HTML and TypeScript code, and a copy-to-clipboard button.
 */
const CodeSyntaxToolbar: React.FC<CodeSyntaxToolbarProps> = ({
  currentCodeLanguage,
  onCodeLanguageChange,
  onCopyCode,
  copySuccess,
}) => {
  const iconSize = 16;

  return (
    <div className="grid w-full grid-cols-2 border-b border-gray-200 bg-gray-50 rounded-t-md dark:bg-gray-700 dark:border-gray-600">
      {/* Left section: Code Language Tabs */}
      <ul className="flex text-sm font-medium text-center text-gray-500 dark:text-gray-400">
        <li>
          <button
            onClick={() => onCodeLanguageChange('html')}
            className={cn(
              'inline-block w-full p-2 px-3 transition-colors duration-200',
              currentCodeLanguage === 'html'
                ? 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-white border-r border-gray-200 dark:border-gray-600 rounded-tl-md' // Rounded top-left
                : 'bg-transparent text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-600 border-r border-gray-200 dark:border-gray-600',
            )}
            aria-label="Show HTML code"
          >
            HTML
          </button>
        </li>
        <li>
          <button
            onClick={() => onCodeLanguageChange('typescript')}
            className={cn(
              'inline-block w-full p-2 px-3 transition-colors duration-200',
              currentCodeLanguage === 'typescript'
                ? 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-white rounded-tr-md' // Rounded top-right
                : 'bg-transparent text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-600',
            )}
            aria-label="Show TypeScript code"
          >
            TS
          </button>
        </li>
      </ul>

      {/* Right section: Copy Button */}
      <div className="flex justify-end">
        <Tooltip content={copySuccess || 'Copy to clipboard'}>
          <button
            onClick={onCopyCode}
            className="flex items-center px-3 py-2 text-xs font-medium text-gray-600 bg-gray-100 border-l border-gray-200 dark:border-gray-600 dark:text-gray-400 dark:bg-gray-800 hover:text-blue-700 dark:hover:text-white copy-to-clipboard-button"
            aria-label="Copy code to clipboard"
          >
            <FiCopy size={iconSize} className="mr-2" />
            <span className="copy-text">{copySuccess || 'Copy'}</span>
          </button>
        </Tooltip>
      </div>
    </div>
  );
};

export default CodeSyntaxToolbar;
// components/ui/code-syntax-toolbar.tsx
