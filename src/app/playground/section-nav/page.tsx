// src/app/playground/section-nav/page.tsx
'use client';

import React, { useState } from 'react';
import {
  FiLayers,
  FiZap,
  FiCode,
  FiSettings,
  FiBookOpen,
  FiCheckCircle,
  FiGrid,
} from 'react-icons/fi';
import { cn } from '@/lib/utils';
import { Heading, Text } from '@/components/Typography';
import {
  SectionNav,
  Wayfinder,
  NavPill,
  type SectionItem,
  type SectionNavPosition,
  type SectionNavSize,
  type SectionNavDisplay,
} from './components';

type NavVariant = 'section-nav' | 'wayfinder' | 'nav-pill';

/**
 * SectionNav Playground
 *
 * Demonstrates all three navigation variants:
 * - SectionNav: Vertical adaptive navigation
 * - Wayfinder: Minimal progress indicator
 * - NavPill: Horizontal floating navigation
 */
export default function SectionNavPlayground() {
  // Variant selection
  const [variant, setVariant] = useState<NavVariant>('section-nav');

  // SectionNav options
  const [position, setPosition] = useState<SectionNavPosition>('right');
  const [size, setSize] = useState<SectionNavSize>('default');
  const [display, setDisplay] = useState<SectionNavDisplay>('dots-only');
  const [showProgress, setShowProgress] = useState(true);
  const [enableCommand, setEnableCommand] = useState(true);
  const [expandOnHover, setExpandOnHover] = useState(true);
  const [collapsible, setCollapsible] = useState(false);

  // NavPill options
  const [showAllSections, setShowAllSections] = useState(true);

  // Define sections for the page
  const sections: SectionItem[] = [
    {
      id: 'overview',
      label: 'Overview',
      target: 'section-overview',
      icon: <FiLayers size={14} />,
      description: 'Introduction to navigation components',
    },
    {
      id: 'variants',
      label: 'Variants',
      target: 'section-variants',
      icon: <FiGrid size={14} />,
      description: 'SectionNav, Wayfinder, NavPill',
    },
    {
      id: 'features',
      label: 'Features',
      target: 'section-features',
      icon: <FiZap size={14} />,
      description: 'Key capabilities and behaviors',
    },
    {
      id: 'customization',
      label: 'Customization',
      target: 'section-customization',
      icon: <FiSettings size={14} />,
      description: 'Size, display mode, and styling',
    },
    {
      id: 'api',
      label: 'API',
      target: 'section-api',
      icon: <FiCode size={14} />,
      description: 'Props and configuration',
    },
    {
      id: 'accessibility',
      label: 'Accessibility',
      target: 'section-accessibility',
      icon: <FiCheckCircle size={14} />,
      description: 'Keyboard and screen reader support',
    },
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950">
      {/* Navigation Components */}
      {variant === 'section-nav' && (
        <SectionNav
          sections={sections}
          position={position}
          size={size}
          display={display}
          showProgress={showProgress}
          enableCommand={enableCommand}
          expandOnHover={expandOnHover}
          collapsible={collapsible}
          commandKey="j"
        />
      )}

      {variant === 'wayfinder' && (
        <Wayfinder
          sections={sections}
          position={position}
          size={size}
          showLabel
          expandable
          enableCommand={enableCommand}
        />
      )}

      {variant === 'nav-pill' && (
        <NavPill
          sections={sections}
          size={size}
          showAllSections={showAllSections}
          showProgress={showProgress}
          enableCommand={enableCommand}
        />
      )}

      {/* Page content */}
      <div className="max-w-3xl mx-auto px-6 py-16">
        {/* Header */}
        <header className="mb-16">
          <Heading level={1} className="mb-4">
            Section Navigation
          </Heading>
          <p className="text-lg text-gray-600 dark:text-gray-400 mb-8">
            Three navigation variants for long-scroll pages. Press{' '}
            <kbd className="px-1.5 py-0.5 rounded bg-gray-100 dark:bg-gray-800 text-sm font-mono">
              ⌘J
            </kbd>{' '}
            to jump to any section.
          </p>

          {/* Variant Selector */}
          <div className="flex flex-wrap gap-2 mb-6">
            {(['section-nav', 'wayfinder', 'nav-pill'] as NavVariant[]).map(
              (v) => (
                <button
                  key={v}
                  onClick={() => setVariant(v)}
                  className={cn(
                    'px-4 py-2 rounded-xl text-sm font-medium transition-all',
                    variant === v
                      ? 'bg-gray-900 dark:bg-white text-white dark:text-gray-900'
                      : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700',
                  )}
                >
                  {v === 'section-nav'
                    ? 'SectionNav'
                    : v === 'wayfinder'
                      ? 'Wayfinder'
                      : 'NavPill'}
                </button>
              ),
            )}
          </div>

          {/* Controls */}
          <div className="p-4 bg-gray-50 dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800">
            <div className="flex flex-wrap gap-4">
              {/* Common controls */}
              <label className="flex items-center gap-2 text-sm">
                <span className="text-gray-600 dark:text-gray-400">Size:</span>
                <select
                  value={size}
                  onChange={(e) => setSize(e.target.value as SectionNavSize)}
                  className="px-2 py-1 rounded border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-sm"
                >
                  <option value="compact">Compact</option>
                  <option value="default">Default</option>
                  <option value="large">Large</option>
                </select>
              </label>

              {variant === 'section-nav' && (
                <>
                  <label className="flex items-center gap-2 text-sm">
                    <span className="text-gray-600 dark:text-gray-400">
                      Position:
                    </span>
                    <select
                      value={position}
                      onChange={(e) =>
                        setPosition(e.target.value as SectionNavPosition)
                      }
                      className="px-2 py-1 rounded border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-sm"
                    >
                      <option value="right">Right</option>
                      <option value="left">Left</option>
                    </select>
                  </label>

                  <label className="flex items-center gap-2 text-sm">
                    <span className="text-gray-600 dark:text-gray-400">
                      Display:
                    </span>
                    <select
                      value={display}
                      onChange={(e) =>
                        setDisplay(e.target.value as SectionNavDisplay)
                      }
                      className="px-2 py-1 rounded border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-sm"
                    >
                      <option value="dots-only">Dots only</option>
                      <option value="icons-only">Icons only</option>
                      <option value="icons-and-labels">Icons + Labels</option>
                      <option value="labels-only">Labels only</option>
                    </select>
                  </label>

                  <label className="flex items-center gap-2 text-sm">
                    <input
                      type="checkbox"
                      checked={showProgress}
                      onChange={(e) => setShowProgress(e.target.checked)}
                      className="rounded"
                    />
                    <span className="text-gray-600 dark:text-gray-400">
                      Progress
                    </span>
                  </label>

                  <label className="flex items-center gap-2 text-sm">
                    <input
                      type="checkbox"
                      checked={expandOnHover}
                      onChange={(e) => setExpandOnHover(e.target.checked)}
                      className="rounded"
                    />
                    <span className="text-gray-600 dark:text-gray-400">
                      Expand on hover
                    </span>
                  </label>

                  <label className="flex items-center gap-2 text-sm">
                    <input
                      type="checkbox"
                      checked={collapsible}
                      onChange={(e) => setCollapsible(e.target.checked)}
                      className="rounded"
                    />
                    <span className="text-gray-600 dark:text-gray-400">
                      Collapsible
                    </span>
                  </label>
                </>
              )}

              {variant === 'nav-pill' && (
                <label className="flex items-center gap-2 text-sm">
                  <input
                    type="checkbox"
                    checked={showAllSections}
                    onChange={(e) => setShowAllSections(e.target.checked)}
                    className="rounded"
                  />
                  <span className="text-gray-600 dark:text-gray-400">
                    Show all sections
                  </span>
                </label>
              )}

              <label className="flex items-center gap-2 text-sm">
                <input
                  type="checkbox"
                  checked={enableCommand}
                  onChange={(e) => setEnableCommand(e.target.checked)}
                  className="rounded"
                />
                <span className="text-gray-600 dark:text-gray-400">
                  Enable ⌘J
                </span>
              </label>
            </div>
          </div>
        </header>

        {/* Sections */}
        <Section id="section-overview" title="Overview" icon={<FiLayers />}>
          <p className="mb-4">
            The Section Navigation system provides three distinct variants for
            navigating long-scroll pages. Each variant is designed for different
            use cases and can be highly customized.
          </p>
          <p>
            All variants share the same core features:
            IntersectionObserver-based scroll spy, smooth scrolling, keyboard
            navigation, and accessibility support.
          </p>
        </Section>

        <Section id="section-variants" title="Variants" icon={<FiGrid />}>
          <div className="space-y-6">
            <VariantCard
              title="SectionNav"
              description="Vertical navigation with adaptive modes. Shows dots, icons, or labels based on configuration. Expands on hover to show section names."
              status="Full-featured"
            />
            <VariantCard
              title="Wayfinder"
              description="Minimal bottom-right progress indicator. Shows current section and progress ring. Expands to section list on click."
              status="Minimal"
            />
            <VariantCard
              title="NavPill"
              description="Horizontal floating pill at bottom. Can show all sections as tabs or just the current section. Great for mobile."
              status="Mobile-first"
            />
          </div>
        </Section>

        <Section id="section-features" title="Features" icon={<FiZap />}>
          <ul className="space-y-3">
            <FeatureItem title="True Scroll-Spy">
              Uses IntersectionObserver to accurately detect which section is
              visible, not just which one was clicked.
            </FeatureItem>
            <FeatureItem title="Progress Tracking">
              Visual progress indicator shows how far through the content
              you&apos;ve scrolled.
            </FeatureItem>
            <FeatureItem title="Keyboard Navigation">
              Full keyboard support including ⌘J for quick jump and arrow keys
              for navigation.
            </FeatureItem>
            <FeatureItem title="Size Variants">
              Three size options (compact, default, large) to fit different
              content densities.
            </FeatureItem>
            <FeatureItem title="Display Modes">
              Choose between dots-only, icons-only, icons-and-labels, or
              labels-only display.
            </FeatureItem>
            <FeatureItem title="Collapsible">
              Can be collapsed to just a button, expanding when needed.
            </FeatureItem>
          </ul>
        </Section>

        <Section
          id="section-customization"
          title="Customization"
          icon={<FiSettings />}
        >
          <p className="mb-4">
            All variants support extensive customization through props. You can
            control size, position, display mode, behavior, and more.
          </p>
          <div className="p-4 bg-gray-50 dark:bg-gray-900 rounded-lg font-mono text-sm">
            <pre className="text-gray-800 dark:text-gray-200">
              {`<SectionNav
  sections={sections}
  size="default"
  display="icons-only"
  position="right"
  showProgress
  enableCommand
  collapsible
/>`}
            </pre>
          </div>
        </Section>

        <Section id="section-api" title="API Reference" icon={<FiCode />}>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-200 dark:border-gray-800">
                  <th className="text-left py-2 pr-4 font-semibold">Prop</th>
                  <th className="text-left py-2 pr-4 font-semibold">Type</th>
                  <th className="text-left py-2 font-semibold">Default</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                <PropRow
                  prop="sections"
                  type="SectionItem[]"
                  defaultVal="required"
                />
                <PropRow
                  prop="size"
                  type="'compact' | 'default' | 'large'"
                  defaultVal="'default'"
                />
                <PropRow
                  prop="display"
                  type="'dots-only' | 'icons-only' | ..."
                  defaultVal="'dots-only'"
                />
                <PropRow
                  prop="position"
                  type="'left' | 'right'"
                  defaultVal="'right'"
                />
                <PropRow prop="showProgress" type="boolean" defaultVal="true" />
                <PropRow
                  prop="enableCommand"
                  type="boolean"
                  defaultVal="true"
                />
                <PropRow
                  prop="expandOnHover"
                  type="boolean"
                  defaultVal="true"
                />
                <PropRow prop="collapsible" type="boolean" defaultVal="false" />
              </tbody>
            </table>
          </div>
        </Section>

        <Section
          id="section-accessibility"
          title="Accessibility"
          icon={<FiCheckCircle />}
        >
          <ul className="space-y-3">
            <FeatureItem title="Keyboard Support">
              Arrow keys navigate in command mode. Enter selects. Escape closes.
              Tab moves through interactive elements.
            </FeatureItem>
            <FeatureItem title="Screen Readers">
              Proper ARIA labels, roles, and live regions. Active section
              announced on change.
            </FeatureItem>
            <FeatureItem title="Reduced Motion">
              Respects prefers-reduced-motion. Animations are simplified or
              disabled for users who prefer less motion.
            </FeatureItem>
            <FeatureItem title="Focus Management">
              Focus trap in command mode. Focus returns to trigger on close.
            </FeatureItem>
          </ul>
        </Section>

        {/* Footer spacer */}
        <div className="h-[50vh]" />
      </div>
    </div>
  );
}

// Helper components

interface SectionProps {
  id: string;
  title: string;
  icon: React.ReactNode;
  children: React.ReactNode;
}

function Section({ id, title, icon, children }: SectionProps) {
  return (
    <section
      id={id}
      data-section-id={id.replace('section-', '')}
      className="mb-24 scroll-mt-8"
    >
      <div className="flex items-center gap-3 mb-6">
        <span className="flex items-center justify-center w-10 h-10 rounded-xl bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400">
          {icon}
        </span>
        <Heading level={2}>{title}</Heading>
      </div>
      <div className="text-gray-700 dark:text-gray-300">{children}</div>
    </section>
  );
}

interface FeatureItemProps {
  title: string;
  children: React.ReactNode;
}

function FeatureItem({ title, children }: FeatureItemProps) {
  return (
    <li className="flex gap-3">
      <FiCheckCircle className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" />
      <div>
        <Text fontWeight="medium" className="text-gray-900 dark:text-white">
          {title}
        </Text>
        <span className="text-sm text-gray-600 dark:text-gray-400 block">
          {children}
        </span>
      </div>
    </li>
  );
}

interface VariantCardProps {
  title: string;
  description: string;
  status: string;
}

function VariantCard({ title, description, status }: VariantCardProps) {
  return (
    <div className="p-4 rounded-xl border border-gray-200 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-900/50">
      <div className="flex items-center justify-between mb-2">
        <Text fontWeight="semibold" className="text-gray-900 dark:text-white">
          {title}
        </Text>
        <span className="px-2 py-0.5 text-xs font-medium rounded-full bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-300">
          {status}
        </span>
      </div>
      <span className="text-sm text-gray-600 dark:text-gray-400 block">
        {description}
      </span>
    </div>
  );
}

interface PropRowProps {
  prop: string;
  type: string;
  defaultVal: string;
}

function PropRow({ prop, type, defaultVal }: PropRowProps) {
  return (
    <tr>
      <td className="py-2 pr-4">
        <code className="text-blue-600 dark:text-blue-400">{prop}</code>
      </td>
      <td className="py-2 pr-4 font-mono text-purple-600 dark:text-purple-400">
        {type}
      </td>
      <td className="py-2 text-gray-500 dark:text-gray-400">{defaultVal}</td>
    </tr>
  );
}
