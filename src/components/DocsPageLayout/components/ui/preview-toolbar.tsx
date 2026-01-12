// src/components/DocsPageLayout/components/ui/preview-toolbar.tsx
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
import {
  FiGithub,
  FiMonitor,
  FiTablet,
  FiSmartphone,
  FiSun,
  FiMoon,
  FiRefreshCcw,
} from 'react-icons/fi';

import { cn } from '@/lib/utils';

// Define types for preview controls
export type PreviewViewMode = 'desktop' | 'tablet' | 'mobile';
export type PreviewTheme = 'light' | 'dark';
export type CodeLanguage = 'html' | 'typescript';

interface PreviewToolbarProps {
  currentViewMode: PreviewViewMode;
  onViewModeChange: (mode: PreviewViewMode) => void;
  currentTheme: PreviewTheme;
  onThemeChange: (theme: PreviewTheme) => void;
  isRtl: boolean;
  onRtlToggle: () => void;
  githubLink?: string;
  isThemeOverridden?: boolean;
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
 * Toolbar for controlling the preview of UI components.
 * Includes device view toggles, theme switch, RTL toggle, and GitHub link.
 */
const PreviewToolbar: React.FC<PreviewToolbarProps> = ({
  currentViewMode,
  onViewModeChange,
  currentTheme,
  onThemeChange,
  isRtl,
  onRtlToggle,
  githubLink,
  isThemeOverridden = false,
}) => {
  const iconSize = 16;

  return (
    <div className="w-full p-3 border border-gray-200 bg-white rounded-t-xl dark:border-gray-700 dark:bg-gray-800/50 flex flex-col sm:flex-row items-center justify-between gap-3">
      {/* Left section: GitHub Link */}
      <div className="flex-shrink-0 w-full sm:w-auto flex justify-start">
        {githubLink && (
          <Tooltip content="Edit on GitHub">
            <a
              href={githubLink}
              target="_blank"
              rel="noopener noreferrer"
              className={cn(
                'flex items-center justify-center h-8 px-3 text-xs font-medium rounded-lg',
                'bg-gray-100 text-gray-600 border border-gray-200',
                'hover:bg-gray-200 hover:text-gray-900',
                'dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600',
                'dark:hover:bg-gray-700 dark:hover:text-white',
                'transition-colors duration-150',
              )}
            >
              <FiGithub size={iconSize} className="mr-2" />
              Edit on GitHub
            </a>
          </Tooltip>
        )}
      </div>

      {/* Center section: Device Toggles */}
      <div className="flex items-center justify-center flex-grow w-full sm:w-auto">
        <div className="inline-flex rounded-lg bg-gray-100 dark:bg-gray-800 p-1 gap-1">
          <Tooltip content="Desktop view">
            <button
              onClick={() => onViewModeChange('desktop')}
              className={cn(
                'flex items-center justify-center w-8 h-8 rounded-md transition-all duration-150',
                currentViewMode === 'desktop'
                  ? 'bg-white dark:bg-gray-700 text-blue-600 dark:text-blue-400 shadow-sm'
                  : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300',
              )}
              aria-label="Desktop view"
            >
              <FiMonitor size={iconSize} />
            </button>
          </Tooltip>
          <Tooltip content="Tablet view">
            <button
              onClick={() => onViewModeChange('tablet')}
              className={cn(
                'flex items-center justify-center w-8 h-8 rounded-md transition-all duration-150',
                currentViewMode === 'tablet'
                  ? 'bg-white dark:bg-gray-700 text-blue-600 dark:text-blue-400 shadow-sm'
                  : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300',
              )}
              aria-label="Tablet view"
            >
              <FiTablet size={iconSize} />
            </button>
          </Tooltip>
          <Tooltip content="Mobile view">
            <button
              onClick={() => onViewModeChange('mobile')}
              className={cn(
                'flex items-center justify-center w-8 h-8 rounded-md transition-all duration-150',
                currentViewMode === 'mobile'
                  ? 'bg-white dark:bg-gray-700 text-blue-600 dark:text-blue-400 shadow-sm'
                  : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300',
              )}
              aria-label="Mobile view"
            >
              <FiSmartphone size={iconSize} />
            </button>
          </Tooltip>
        </div>
      </div>

      {/* Right section: RTL and Dark/Light Mode */}
      <div className="flex items-center justify-end gap-2 flex-shrink-0 w-full sm:w-auto">
        <Tooltip content={isRtl ? 'Disable RTL' : 'Enable RTL'}>
          <button
            onClick={onRtlToggle}
            className={cn(
              'flex items-center justify-center h-8 px-3 text-xs font-medium rounded-lg',
              'transition-colors duration-150',
              isRtl
                ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/50 dark:text-blue-400'
                : 'bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400',
              'hover:bg-gray-200 dark:hover:bg-gray-700',
            )}
            aria-label="Toggle RTL mode"
          >
            <FiRefreshCcw
              size={14}
              className={cn('mr-1.5', isRtl && 'scale-x-[-1]')}
            />
            RTL
          </button>
        </Tooltip>
        <Tooltip
          content={
            isThemeOverridden
              ? currentTheme === 'dark'
                ? 'Using dark mode (click to toggle)'
                : 'Using light mode (click to toggle)'
              : 'Synced with app theme (click to override)'
          }
        >
          <button
            onClick={() =>
              onThemeChange(currentTheme === 'light' ? 'dark' : 'light')
            }
            className={cn(
              'flex items-center justify-center w-8 h-8 rounded-lg',
              'transition-colors duration-150',
              isThemeOverridden
                ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/50 dark:text-blue-400'
                : 'bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400',
              'hover:bg-gray-200 dark:hover:bg-gray-700',
            )}
            aria-label="Toggle theme"
          >
            {currentTheme === 'light' ? (
              <FiMoon size={iconSize} />
            ) : (
              <FiSun size={iconSize} />
            )}
          </button>
        </Tooltip>
      </div>
    </div>
  );
};

export default PreviewToolbar;
