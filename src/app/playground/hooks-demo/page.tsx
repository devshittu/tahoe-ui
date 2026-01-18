// src/app/playground/hooks-demo/page.tsx
'use client';

import React, { useState, useRef, useCallback } from 'react';
import { cn } from '@/lib/utils';
import { Heading, Text, SmallText, Paragraph } from '@/components/Typography';
import {
  useMediaQuery,
  useBreakpoint,
  useFocusTrap,
  useClickOutside,
  useEscapeKey,
  breakpoints,
} from '@/hooks';
import {
  FiMonitor,
  FiSmartphone,
  FiTarget,
  FiMousePointer,
  FiX,
  FiCheck,
} from 'react-icons/fi';

type ActiveSection =
  | 'media-query'
  | 'breakpoint'
  | 'focus-trap'
  | 'click-outside'
  | 'escape-key';

const SECTIONS: { id: ActiveSection; label: string; icon: React.ReactNode }[] =
  [
    {
      id: 'media-query',
      label: 'useMediaQuery',
      icon: <FiMonitor className="w-4 h-4" />,
    },
    {
      id: 'breakpoint',
      label: 'useBreakpoint',
      icon: <FiSmartphone className="w-4 h-4" />,
    },
    {
      id: 'focus-trap',
      label: 'useFocusTrap',
      icon: <FiTarget className="w-4 h-4" />,
    },
    {
      id: 'click-outside',
      label: 'useClickOutside',
      icon: <FiMousePointer className="w-4 h-4" />,
    },
    {
      id: 'escape-key',
      label: 'useEscapeKey',
      icon: <FiX className="w-4 h-4" />,
    },
  ];

function MediaQueryDemo() {
  const isMobile = useMediaQuery('(max-width: 767px)');
  const isTablet = useMediaQuery('(min-width: 768px) and (max-width: 1023px)');
  const isDesktop = useMediaQuery('(min-width: 1024px)');
  const prefersDark = useMediaQuery('(prefers-color-scheme: dark)');
  const prefersReducedMotion = useMediaQuery(
    '(prefers-reduced-motion: reduce)',
  );
  const isLandscape = useMediaQuery('(orientation: landscape)');

  const queries = [
    {
      label: 'Mobile (< 768px)',
      query: '(max-width: 767px)',
      matches: isMobile,
    },
    {
      label: 'Tablet (768-1023px)',
      query: '(min-width: 768px) and (max-width: 1023px)',
      matches: isTablet,
    },
    {
      label: 'Desktop (>= 1024px)',
      query: '(min-width: 1024px)',
      matches: isDesktop,
    },
    {
      label: 'Prefers Dark Mode',
      query: '(prefers-color-scheme: dark)',
      matches: prefersDark,
    },
    {
      label: 'Prefers Reduced Motion',
      query: '(prefers-reduced-motion: reduce)',
      matches: prefersReducedMotion,
    },
    {
      label: 'Landscape Orientation',
      query: '(orientation: landscape)',
      matches: isLandscape,
    },
  ];

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <Text fontWeight="medium" color="primary">
          SSR-safe media query detection that updates on viewport changes.
        </Text>
      </div>

      <div className="grid gap-3">
        {queries.map(({ label, query, matches }) => (
          <div
            key={label}
            className={cn(
              'flex items-center justify-between p-4 rounded-xl border transition-colors',
              matches
                ? 'bg-emerald-50 dark:bg-emerald-950/30 border-emerald-200 dark:border-emerald-800'
                : 'bg-gray-50 dark:bg-gray-800/50 border-gray-200 dark:border-gray-700',
            )}
          >
            <div className="space-y-1">
              <Text fontWeight="medium" color="primary">
                {label}
              </Text>
              <SmallText className="text-gray-500 font-mono">{query}</SmallText>
            </div>
            <div
              className={cn(
                'flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-medium',
                matches
                  ? 'bg-emerald-100 dark:bg-emerald-900/50 text-emerald-700 dark:text-emerald-400'
                  : 'bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400',
              )}
            >
              {matches ? (
                <FiCheck className="w-4 h-4" />
              ) : (
                <FiX className="w-4 h-4" />
              )}
              {matches ? 'Matches' : 'No Match'}
            </div>
          </div>
        ))}
      </div>

      <div className="bg-gray-100 dark:bg-gray-800 rounded-xl p-4">
        <pre className="text-sm text-gray-700 dark:text-gray-300 overflow-x-auto">
          <code>{`const isMobile = useMediaQuery('(max-width: 767px)');
const prefersDark = useMediaQuery('(prefers-color-scheme: dark)');`}</code>
        </pre>
      </div>
    </div>
  );
}

function BreakpointDemo() {
  const bp = useBreakpoint();

  const breakpointInfo = [
    {
      key: 'xs',
      value: '< 640px',
      active: bp.current === 'xs',
      min: 0,
      max: breakpoints.sm - 1,
    },
    {
      key: 'sm',
      value: '>= 640px',
      active: bp.isSm && bp.current === 'sm',
      min: breakpoints.sm,
      max: breakpoints.md - 1,
    },
    {
      key: 'md',
      value: '>= 768px',
      active: bp.isMd && bp.current === 'md',
      min: breakpoints.md,
      max: breakpoints.lg - 1,
    },
    {
      key: 'lg',
      value: '>= 1024px',
      active: bp.isLg && bp.current === 'lg',
      min: breakpoints.lg,
      max: breakpoints.xl - 1,
    },
    {
      key: 'xl',
      value: '>= 1280px',
      active: bp.isXl && bp.current === 'xl',
      min: breakpoints.xl,
      max: breakpoints['2xl'] - 1,
    },
    {
      key: '2xl',
      value: '>= 1536px',
      active: bp.is2xl,
      min: breakpoints['2xl'],
      max: Infinity,
    },
  ];

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <Text fontWeight="medium" color="primary">
          Tailwind-aligned breakpoint detection with semantic helpers.
        </Text>
      </div>

      {/* Current breakpoint badge */}
      <div className="flex items-center gap-4">
        <Text color="secondary">Current breakpoint:</Text>
        <span className="px-4 py-2 rounded-xl bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 font-mono font-bold text-lg">
          {bp.current}
        </span>
      </div>

      {/* Breakpoint visualization */}
      <div className="space-y-3">
        {breakpointInfo.map(({ key, value, active }) => (
          <div
            key={key}
            className={cn(
              'flex items-center gap-4 p-3 rounded-xl border transition-all',
              active
                ? 'bg-gray-900 dark:bg-gray-100 border-gray-900 dark:border-gray-100'
                : 'bg-gray-50 dark:bg-gray-800/50 border-gray-200 dark:border-gray-700',
            )}
          >
            <span
              className={cn(
                'w-12 text-center font-mono font-bold',
                active ? 'text-white dark:text-gray-900' : 'text-gray-500',
              )}
            >
              {key}
            </span>
            <span
              className={cn(
                'text-sm',
                active ? 'text-gray-300 dark:text-gray-600' : 'text-gray-400',
              )}
            >
              {value}
            </span>
            {active && (
              <span className="ml-auto flex items-center gap-1 text-emerald-400 dark:text-emerald-600 text-sm font-medium">
                <FiCheck className="w-4 h-4" /> Active
              </span>
            )}
          </div>
        ))}
      </div>

      {/* Semantic helpers */}
      <div className="grid grid-cols-3 gap-3">
        {[
          { label: 'isMobile', value: bp.isMobile },
          { label: 'isTablet', value: bp.isTablet },
          { label: 'isDesktop', value: bp.isDesktop },
        ].map(({ label, value }) => (
          <div
            key={label}
            className={cn(
              'p-4 rounded-xl border text-center',
              value
                ? 'bg-emerald-50 dark:bg-emerald-950/30 border-emerald-200 dark:border-emerald-800'
                : 'bg-gray-50 dark:bg-gray-800/50 border-gray-200 dark:border-gray-700',
            )}
          >
            <SmallText className="text-gray-500 font-mono">{label}</SmallText>
            <Text
              fontWeight="bold"
              color={value ? 'primary' : 'secondary'}
              className="mt-1"
            >
              {value ? 'true' : 'false'}
            </Text>
          </div>
        ))}
      </div>

      <div className="bg-gray-100 dark:bg-gray-800 rounded-xl p-4">
        <pre className="text-sm text-gray-700 dark:text-gray-300 overflow-x-auto">
          <code>{`const { current, isMobile, isDesktop } = useBreakpoint();
// current: '${bp.current}', isMobile: ${bp.isMobile}, isDesktop: ${bp.isDesktop}`}</code>
        </pre>
      </div>
    </div>
  );
}

function FocusTrapDemo() {
  const [isOpen, setIsOpen] = useState(false);
  const { ref } = useFocusTrap<HTMLDivElement>({
    enabled: isOpen,
    autoFocus: true,
    returnFocus: true,
  });

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <Text fontWeight="medium" color="primary">
          Trap keyboard focus within a container. Tab/Shift+Tab cycles through
          focusable elements.
        </Text>
      </div>

      <button
        onClick={() => setIsOpen(true)}
        className="px-4 py-2 bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 rounded-xl font-medium hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors"
      >
        Open Focus Trap Demo
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div
            ref={ref}
            className="bg-white dark:bg-gray-900 rounded-2xl p-6 w-full max-w-md shadow-xl space-y-4"
          >
            <Heading size="lg" color="primary">
              Focus Trap Active
            </Heading>
            <Paragraph color="secondary">
              Try pressing Tab or Shift+Tab. Focus will cycle through the
              buttons below without leaving this container.
            </Paragraph>

            <div className="space-y-3">
              <input
                type="text"
                placeholder="First input"
                className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-900/20 dark:focus:ring-white/20"
              />
              <input
                type="text"
                placeholder="Second input"
                className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-900/20 dark:focus:ring-white/20"
              />
            </div>

            <div className="flex gap-3">
              <button className="flex-1 px-4 py-2 border border-gray-200 dark:border-gray-700 rounded-xl text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                Secondary
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="flex-1 px-4 py-2 bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 rounded-xl font-medium hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="bg-gray-100 dark:bg-gray-800 rounded-xl p-4">
        <pre className="text-sm text-gray-700 dark:text-gray-300 overflow-x-auto">
          <code>{`const { ref } = useFocusTrap<HTMLDivElement>({
  enabled: isOpen,
  autoFocus: true,
  returnFocus: true,
});

return <div ref={ref}>...</div>;`}</code>
        </pre>
      </div>
    </div>
  );
}

function ClickOutsideDemo() {
  const [isOpen, setIsOpen] = useState(false);
  const [clickCount, setClickCount] = useState(0);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const handleClickOutside = useCallback(() => {
    setIsOpen(false);
    setClickCount((c) => c + 1);
  }, []);

  const { ref } = useClickOutside<HTMLDivElement>(handleClickOutside, {
    enabled: isOpen,
    ignoreRefs: [buttonRef],
  });

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <Text fontWeight="medium" color="primary">
          Detect clicks outside an element. Useful for dropdowns, popovers, and
          modals.
        </Text>
      </div>

      <div className="flex items-center gap-4">
        <button
          ref={buttonRef}
          onClick={() => setIsOpen(true)}
          className="px-4 py-2 bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 rounded-xl font-medium hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors"
        >
          Open Dropdown
        </button>
        <SmallText className="text-gray-500">
          Click outside count: {clickCount}
        </SmallText>
      </div>

      {isOpen && (
        <div
          ref={ref}
          className="inline-block bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-700 shadow-lg p-4 space-y-2"
        >
          <Text fontWeight="medium" color="primary">
            Dropdown Menu
          </Text>
          <div className="space-y-1">
            {['Option 1', 'Option 2', 'Option 3'].map((option) => (
              <button
                key={option}
                className="w-full text-left px-3 py-2 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              >
                {option}
              </button>
            ))}
          </div>
          <SmallText className="text-gray-500">
            Click anywhere outside to close
          </SmallText>
        </div>
      )}

      <div className="bg-gray-100 dark:bg-gray-800 rounded-xl p-4">
        <pre className="text-sm text-gray-700 dark:text-gray-300 overflow-x-auto">
          <code>{`const { ref } = useClickOutside<HTMLDivElement>(
  () => setIsOpen(false),
  { enabled: isOpen, ignoreRefs: [buttonRef] }
);`}</code>
        </pre>
      </div>
    </div>
  );
}

function EscapeKeyDemo() {
  const [modal1Open, setModal1Open] = useState(false);
  const [modal2Open, setModal2Open] = useState(false);
  const [lastClosed, setLastClosed] = useState<string | null>(null);

  // Lower priority - base modal
  useEscapeKey(
    () => {
      setModal1Open(false);
      setLastClosed('Modal 1 (priority: 10)');
    },
    { enabled: modal1Open, priority: 10 },
  );

  // Higher priority - nested modal
  useEscapeKey(
    () => {
      setModal2Open(false);
      setLastClosed('Modal 2 (priority: 20)');
    },
    { enabled: modal2Open, priority: 20 },
  );

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <Text fontWeight="medium" color="primary">
          Priority-based ESC key handling. Higher priority handlers are called
          first.
        </Text>
      </div>

      <div className="flex items-center gap-4">
        <button
          onClick={() => setModal1Open(true)}
          className="px-4 py-2 bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 rounded-xl font-medium hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors"
        >
          Open Modal 1 (priority: 10)
        </button>
        {lastClosed && (
          <SmallText className="text-gray-500">
            Last closed: {lastClosed}
          </SmallText>
        )}
      </div>

      {/* Modal 1 */}
      {modal1Open && (
        <div className="fixed inset-0 z-40 flex items-center justify-center bg-black/50">
          <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 w-full max-w-md shadow-xl space-y-4">
            <Heading size="lg" color="primary">
              Modal 1
            </Heading>
            <Paragraph color="secondary">
              This modal has priority 10. Press ESC to close it (unless Modal 2
              is open).
            </Paragraph>

            <div className="flex gap-3">
              <button
                onClick={() => setModal2Open(true)}
                className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-xl font-medium hover:bg-blue-700 transition-colors"
              >
                Open Modal 2 (priority: 20)
              </button>
              <button
                onClick={() => setModal1Open(false)}
                className="px-4 py-2 border border-gray-200 dark:border-gray-700 rounded-xl text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal 2 - Higher priority */}
      {modal2Open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="bg-blue-600 rounded-2xl p-6 w-full max-w-sm shadow-xl space-y-4">
            <Heading size="lg" className="text-white">
              Modal 2
            </Heading>
            <Text className="text-blue-100">
              This modal has priority 20 (higher). ESC will close this one
              first.
            </Text>
            <button
              onClick={() => setModal2Open(false)}
              className="w-full px-4 py-2 bg-white text-blue-600 rounded-xl font-medium hover:bg-blue-50 transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      )}

      <div className="bg-gray-100 dark:bg-gray-800 rounded-xl p-4">
        <pre className="text-sm text-gray-700 dark:text-gray-300 overflow-x-auto">
          <code>{`// Lower priority modal
useEscapeKey(() => closeModal1(), { enabled: modal1Open, priority: 10 });

// Higher priority modal (closes first)
useEscapeKey(() => closeModal2(), { enabled: modal2Open, priority: 20 });`}</code>
        </pre>
      </div>
    </div>
  );
}

export default function HooksPlayground() {
  const [activeSection, setActiveSection] =
    useState<ActiveSection>('media-query');

  const renderDemo = () => {
    switch (activeSection) {
      case 'media-query':
        return <MediaQueryDemo />;
      case 'breakpoint':
        return <BreakpointDemo />;
      case 'focus-trap':
        return <FocusTrapDemo />;
      case 'click-outside':
        return <ClickOutsideDemo />;
      case 'escape-key':
        return <EscapeKeyDemo />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 py-12 px-4">
      <div className="max-w-4xl mx-auto space-y-12">
        {/* Header */}
        <div className="text-center space-y-4">
          <Heading size="2xl" color="primary" className="font-bold">
            Hooks
          </Heading>
          <Paragraph color="secondary" className="max-w-2xl mx-auto">
            Reusable React hooks for responsive design, focus management, and
            interaction handling. SSR-safe and fully typed.
          </Paragraph>
        </div>

        {/* Section Tabs */}
        <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-2">
          <div className="flex flex-wrap gap-2">
            {SECTIONS.map((section) => (
              <button
                key={section.id}
                onClick={() => setActiveSection(section.id)}
                className={cn(
                  'flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-colors',
                  activeSection === section.id
                    ? 'bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900'
                    : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800',
                )}
              >
                {section.icon}
                {section.label}
              </button>
            ))}
          </div>
        </div>

        {/* Demo Area */}
        <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-6">
          {renderDemo()}
        </div>

        {/* Import */}
        <div className="bg-gray-900 dark:bg-gray-800 rounded-2xl p-6">
          <Text fontWeight="medium" className="text-white mb-4">
            Import
          </Text>
          <pre className="text-gray-300 text-sm overflow-x-auto">
            <code>{`import {
  useMediaQuery,
  useBreakpoint,
  useFocusTrap,
  useClickOutside,
  useEscapeKey,
} from '@/hooks';`}</code>
          </pre>
        </div>
      </div>
    </div>
  );
}
