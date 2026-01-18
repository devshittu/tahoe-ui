// src/app/playground/hooks/use-breakpoint/page.tsx
'use client';

import React from 'react';
import { Text, SmallText, InlineCode } from '@/components/Typography';
import { HeadlineBlock } from '../../headline/components';
import { useBreakpoint, breakpoints } from '@/hooks';

export default function UseBreakpointPlayground() {
  const bp = useBreakpoint();

  const breakpointList = [
    { key: 'xs', label: '< 640px', active: bp.current === 'xs' },
    { key: 'sm', label: '≥ 640px', active: bp.isSm && !bp.isMd },
    { key: 'md', label: '≥ 768px', active: bp.isMd && !bp.isLg },
    { key: 'lg', label: '≥ 1024px', active: bp.isLg && !bp.isXl },
    { key: 'xl', label: '≥ 1280px', active: bp.isXl && !bp.is2xl },
    { key: '2xl', label: '≥ 1536px', active: bp.is2xl },
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 py-12 px-4">
      <div className="max-w-5xl mx-auto space-y-12">
        <HeadlineBlock
          headline="useBreakpoint"
          subheadline="Responsive breakpoint detection aligned with Tailwind CSS defaults."
          size="medium"
        />

        {/* Current Breakpoint */}
        <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-6 space-y-6">
          <Text fontWeight="medium" color="primary" className="text-lg">
            Current Breakpoint
          </Text>
          <div className="flex items-center justify-center">
            <div className="text-6xl font-bold text-gray-900 dark:text-gray-100">
              {bp.current}
            </div>
          </div>
          <SmallText className="text-gray-500 text-center block">
            Resize the window to see the breakpoint change
          </SmallText>
        </div>

        {/* Breakpoint Scale */}
        <div className="space-y-4">
          <Text fontWeight="medium" color="primary" className="text-lg">
            Breakpoint Scale
          </Text>
          <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-6">
            <div className="flex gap-2">
              {breakpointList.map((item) => (
                <div
                  key={item.key}
                  className={`flex-1 p-4 rounded-lg text-center transition-colors ${
                    item.active
                      ? 'bg-blue-500 text-white'
                      : 'bg-gray-100 dark:bg-gray-800 text-gray-500'
                  }`}
                >
                  <Text
                    fontWeight="medium"
                    className={
                      item.active
                        ? 'text-white'
                        : 'text-gray-900 dark:text-gray-100'
                    }
                  >
                    {item.key}
                  </Text>
                  <SmallText
                    className={item.active ? 'text-blue-100' : 'text-gray-400'}
                  >
                    {item.label}
                  </SmallText>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Boolean Helpers */}
        <div className="space-y-4">
          <Text fontWeight="medium" color="primary" className="text-lg">
            Boolean Helpers
          </Text>
          <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { label: 'isSm', value: bp.isSm },
                { label: 'isMd', value: bp.isMd },
                { label: 'isLg', value: bp.isLg },
                { label: 'isXl', value: bp.isXl },
                { label: 'is2xl', value: bp.is2xl },
                { label: 'isMobile', value: bp.isMobile },
                { label: 'isTablet', value: bp.isTablet },
                { label: 'isDesktop', value: bp.isDesktop },
              ].map((item) => (
                <div
                  key={item.label}
                  className={`p-3 rounded-lg text-center ${
                    item.value
                      ? 'bg-green-100 dark:bg-green-900/30'
                      : 'bg-gray-100 dark:bg-gray-800'
                  }`}
                >
                  <InlineCode>{item.label}</InlineCode>
                  <div
                    className={`mt-1 text-sm font-medium ${
                      item.value
                        ? 'text-green-700 dark:text-green-400'
                        : 'text-gray-500'
                    }`}
                  >
                    {item.value ? 'true' : 'false'}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Responsive Content Demo */}
        <div className="space-y-4">
          <Text fontWeight="medium" color="primary" className="text-lg">
            Responsive Content Demo
          </Text>
          <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-6">
            {bp.isMobile && (
              <div className="text-center py-8">
                <div className="text-4xl mb-4">📱</div>
                <Text color="primary" fontWeight="medium">
                  Mobile View
                </Text>
                <SmallText className="text-gray-500">
                  Optimized for small screens
                </SmallText>
              </div>
            )}
            {bp.isTablet && !bp.isDesktop && (
              <div className="text-center py-8">
                <div className="text-4xl mb-4">📲</div>
                <Text color="primary" fontWeight="medium">
                  Tablet View
                </Text>
                <SmallText className="text-gray-500">
                  Medium-sized layout
                </SmallText>
              </div>
            )}
            {bp.isDesktop && (
              <div className="text-center py-8">
                <div className="text-4xl mb-4">🖥️</div>
                <Text color="primary" fontWeight="medium">
                  Desktop View
                </Text>
                <SmallText className="text-gray-500">
                  Full-featured layout
                </SmallText>
              </div>
            )}
          </div>
        </div>

        {/* Tailwind Breakpoints Reference */}
        <div className="space-y-4">
          <Text fontWeight="medium" color="primary" className="text-lg">
            Tailwind Breakpoints
          </Text>
          <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-6">
            <div className="space-y-3">
              {Object.entries(breakpoints).map(([key, value]) => (
                <div
                  key={key}
                  className="flex items-center justify-between py-2 border-b border-gray-100 dark:border-gray-800 last:border-0"
                >
                  <div className="flex items-center gap-4">
                    <InlineCode>{key}</InlineCode>
                    <SmallText className="text-gray-500">{value}px</SmallText>
                  </div>
                  <SmallText className="text-gray-400 font-mono">
                    min-width: {value}px
                  </SmallText>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* API Reference */}
        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-6 space-y-4">
            <Text fontWeight="medium" color="primary">
              Return Object
            </Text>
            <div className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
              <p>
                <InlineCode>current</InlineCode> - xs | sm | md | lg | xl | 2xl
              </p>
              <p>
                <InlineCode>isSm</InlineCode> - ≥ 640px
              </p>
              <p>
                <InlineCode>isMd</InlineCode> - ≥ 768px
              </p>
              <p>
                <InlineCode>isLg</InlineCode> - ≥ 1024px
              </p>
              <p>
                <InlineCode>isXl</InlineCode> - ≥ 1280px
              </p>
              <p>
                <InlineCode>is2xl</InlineCode> - ≥ 1536px
              </p>
            </div>
          </div>
          <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-6 space-y-4">
            <Text fontWeight="medium" color="primary">
              Semantic Helpers
            </Text>
            <div className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
              <p>
                <InlineCode>isMobile</InlineCode> - &lt; 640px
              </p>
              <p>
                <InlineCode>isTablet</InlineCode> - ≥ 768px
              </p>
              <p>
                <InlineCode>isDesktop</InlineCode> - ≥ 1024px
              </p>
            </div>
          </div>
          <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-6 space-y-4">
            <Text fontWeight="medium" color="primary">
              Features
            </Text>
            <div className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
              <p>Tailwind CSS aligned</p>
              <p>SSR-safe (defaults to mobile)</p>
              <p>Auto-updates on resize</p>
              <p>Uses useMediaQuery internally</p>
            </div>
          </div>
        </div>

        {/* Code Example */}
        <div className="bg-gray-900 dark:bg-gray-800 rounded-2xl p-6">
          <Text fontWeight="medium" className="text-white mb-4">
            Usage
          </Text>
          <pre className="text-gray-300 text-sm overflow-x-auto">
            <code>{`import { useBreakpoint } from '@/hooks';

function ResponsiveLayout() {
  const { isMobile, isTablet, isDesktop, current } = useBreakpoint();

  // Conditional rendering
  if (isMobile) {
    return <MobileNav />;
  }

  // Layout switching
  return (
    <div>
      <Text>Current breakpoint: {current}</Text>

      {isTablet && <TabletSidebar />}
      {isDesktop && <DesktopHeader />}

      <main>
        {/* Content adjusts based on breakpoint */}
      </main>
    </div>
  );
}

// Grid columns based on breakpoint
function ProductGrid() {
  const { isMobile, isTablet, isDesktop } = useBreakpoint();
  const columns = isMobile ? 1 : isTablet ? 2 : 4;

  return <Grid cols={columns}>{products}</Grid>;
}`}</code>
          </pre>
        </div>
      </div>
    </div>
  );
}
