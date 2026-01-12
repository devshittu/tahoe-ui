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
import { FiCopy, FiCheck } from 'react-icons/fi';
import { cn } from '@/lib/utils';
import { CodeLanguage } from './preview-toolbar';

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
            className="z-50 px-3 py-1.5 text-xs font-medium text-white bg-gray-900 rounded-lg shadow-lg"
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
 * Follows app theme - light in light mode, dark in dark mode.
 */
const CodeSyntaxToolbar: React.FC<CodeSyntaxToolbarProps> = ({
  currentCodeLanguage,
  onCodeLanguageChange,
  onCopyCode,
  copySuccess,
}) => {
  const isCopied = copySuccess === 'Copied!';

  return (
    <div
      className={cn(
        'flex items-center justify-between px-4 py-2 border-b',
        'bg-gray-100 border-gray-200',
        'dark:bg-gray-800 dark:border-gray-700',
      )}
    >
      {/* Left section: Code Language Tabs */}
      <div
        className={cn(
          'flex items-center gap-1 rounded-lg p-1',
          'bg-gray-200/50 dark:bg-gray-900/50',
        )}
      >
        <button
          onClick={() => onCodeLanguageChange('html')}
          className={cn(
            'px-3 py-1.5 text-xs font-medium rounded-md transition-all duration-150',
            currentCodeLanguage === 'html'
              ? 'bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm'
              : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200',
          )}
          aria-label="Show HTML code"
        >
          HTML
        </button>
        <button
          onClick={() => onCodeLanguageChange('typescript')}
          className={cn(
            'px-3 py-1.5 text-xs font-medium rounded-md transition-all duration-150',
            currentCodeLanguage === 'typescript'
              ? 'bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm'
              : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200',
          )}
          aria-label="Show TypeScript code"
        >
          TypeScript
        </button>
      </div>

      {/* Right section: Copy Button */}
      <Tooltip content={isCopied ? 'Copied!' : 'Copy to clipboard'}>
        <button
          onClick={onCopyCode}
          className={cn(
            'flex items-center gap-2 px-3 py-1.5 text-xs font-medium rounded-lg',
            'transition-all duration-150',
            isCopied
              ? 'bg-green-100 dark:bg-green-500/20 text-green-700 dark:text-green-400'
              : 'bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600 hover:text-gray-900 dark:hover:text-white',
          )}
          aria-label="Copy code to clipboard"
        >
          {isCopied ? (
            <>
              <FiCheck size={14} />
              <span>Copied!</span>
            </>
          ) : (
            <>
              <FiCopy size={14} />
              <span>Copy</span>
            </>
          )}
        </button>
      </Tooltip>
    </div>
  );
};

export default CodeSyntaxToolbar;
