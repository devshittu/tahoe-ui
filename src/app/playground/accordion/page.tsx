// src/app/playground/accordion/page.tsx

'use client';

import { useState } from 'react';
import { FiPlus, FiMinus } from 'react-icons/fi';
import { HeadlineBlock } from '@/app/playground/headline/components';
import { SegmentedControl } from '@/app/playground/segmented-control/components';
import {
  AccordionRoot,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
  AccordionType,
  AccordionVariant,
  AccordionSize,
} from './components';

const FAQ_ITEMS = [
  {
    value: 'what-is',
    question: 'What is Tahoe UI?',
    answer:
      'Tahoe UI is a React component library built with Next.js 15, TypeScript, and Tailwind CSS. It features an advanced modal system with physics-based drag interactions and a comprehensive set of accessible components.',
  },
  {
    value: 'features',
    question: 'What are the key features?',
    answer:
      'Key features include physics-based modal interactions, gesture support, spring animations, dark mode, full accessibility support, and a playground for interactive component exploration.',
  },
  {
    value: 'getting-started',
    question: 'How do I get started?',
    answer:
      'Clone the repository, install dependencies with npm or yarn, and run the development server. Visit the playground to explore components and their APIs.',
  },
  {
    value: 'customization',
    question: 'Can I customize the components?',
    answer:
      'Yes! All components accept className props for custom styling. The design system uses Tailwind CSS, making it easy to extend or override styles while maintaining consistency.',
  },
];

export default function AccordionPage() {
  const [type, setType] = useState<AccordionType>('single');
  const [variant, setVariant] = useState<AccordionVariant>('default');
  const [size, setSize] = useState<AccordionSize>('md');
  const [collapsible, setCollapsible] = useState(true);

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950">
      <div className="max-w-4xl mx-auto px-6 py-12">
        {/* Header */}
        <HeadlineBlock
          headline="Accordion"
          subheadline="Expandable content sections for organizing information. Supports single or multiple expansion modes."
          size="medium"
        />

        {/* Configuration Panel */}
        <section className="mt-12">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Configuration
          </h2>
          <div className="p-6 rounded-xl bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* Type */}
              <div>
                <span className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Type
                </span>
                <SegmentedControl
                  options={[
                    { value: 'single', label: 'Single' },
                    { value: 'multiple', label: 'Multiple' },
                  ]}
                  value={type}
                  onChange={setType}
                  size="sm"
                />
              </div>

              {/* Variant */}
              <div>
                <span className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Variant
                </span>
                <select
                  value={variant}
                  onChange={(e) =>
                    setVariant(e.target.value as AccordionVariant)
                  }
                  className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-sm"
                >
                  <option value="default">Default</option>
                  <option value="bordered">Bordered</option>
                  <option value="separated">Separated</option>
                </select>
              </div>

              {/* Size */}
              <div>
                <span className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Size
                </span>
                <SegmentedControl
                  options={[
                    { value: 'sm', label: 'S' },
                    { value: 'md', label: 'M' },
                    { value: 'lg', label: 'L' },
                  ]}
                  value={size}
                  onChange={setSize}
                  size="sm"
                />
              </div>

              {/* Collapsible (only for single) */}
              <div>
                <span className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Collapsible
                </span>
                <button
                  type="button"
                  onClick={() => setCollapsible(!collapsible)}
                  disabled={type === 'multiple'}
                  className={`
                    px-4 py-2 rounded-lg text-sm font-medium transition-colors
                    ${
                      collapsible
                        ? 'bg-blue-500 text-white'
                        : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
                    }
                    ${type === 'multiple' ? 'opacity-50 cursor-not-allowed' : ''}
                  `}
                  aria-pressed={collapsible}
                >
                  {collapsible ? 'On' : 'Off'}
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Interactive Demo */}
        <section className="mt-12">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Interactive Demo
          </h2>
          <div className="p-6 rounded-xl bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800">
            <AccordionRoot
              type={type}
              variant={variant}
              size={size}
              collapsible={collapsible}
              defaultValue="what-is"
            >
              {FAQ_ITEMS.map((item) => (
                <AccordionItem key={item.value} value={item.value}>
                  <AccordionTrigger>{item.question}</AccordionTrigger>
                  <AccordionContent>{item.answer}</AccordionContent>
                </AccordionItem>
              ))}
            </AccordionRoot>
          </div>
        </section>

        {/* Variants */}
        <section className="mt-12">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Variants
          </h2>
          <div className="space-y-8">
            {(['default', 'bordered', 'separated'] as const).map((v) => (
              <div key={v}>
                <span className="block text-sm text-gray-500 dark:text-gray-400 mb-3 capitalize">
                  {v}
                </span>
                <AccordionRoot type="single" variant={v} collapsible>
                  <AccordionItem value="1">
                    <AccordionTrigger>First section</AccordionTrigger>
                    <AccordionContent>
                      Content for the first section. This demonstrates the {v}{' '}
                      variant styling.
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="2">
                    <AccordionTrigger>Second section</AccordionTrigger>
                    <AccordionContent>
                      Content for the second section.
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="3">
                    <AccordionTrigger>Third section</AccordionTrigger>
                    <AccordionContent>
                      Content for the third section.
                    </AccordionContent>
                  </AccordionItem>
                </AccordionRoot>
              </div>
            ))}
          </div>
        </section>

        {/* Sizes */}
        <section className="mt-12">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Sizes
          </h2>
          <div className="space-y-8">
            {(['sm', 'md', 'lg'] as const).map((s) => (
              <div key={s}>
                <span className="block text-sm text-gray-500 dark:text-gray-400 mb-3">
                  Size: {s}
                </span>
                <AccordionRoot
                  type="single"
                  variant="bordered"
                  size={s}
                  collapsible
                >
                  <AccordionItem value="1">
                    <AccordionTrigger>Accordion item</AccordionTrigger>
                    <AccordionContent>
                      This accordion uses size {s}. Notice the padding and text
                      size differences.
                    </AccordionContent>
                  </AccordionItem>
                </AccordionRoot>
              </div>
            ))}
          </div>
        </section>

        {/* Custom Icons */}
        <section className="mt-12">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Custom Icons
          </h2>
          <div className="p-6 rounded-xl bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800">
            <AccordionRoot type="single" variant="bordered" collapsible>
              <AccordionItem value="1">
                <AccordionTrigger icon={<FiPlus className="w-5 h-5" />}>
                  With plus icon
                </AccordionTrigger>
                <AccordionContent>
                  This trigger uses a custom plus icon instead of the default
                  chevron.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="2">
                <AccordionTrigger hideIcon>Without icon</AccordionTrigger>
                <AccordionContent>
                  This trigger has no icon at all using the hideIcon prop.
                </AccordionContent>
              </AccordionItem>
            </AccordionRoot>
          </div>
        </section>

        {/* Disabled State */}
        <section className="mt-12">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Disabled State
          </h2>
          <div className="p-6 rounded-xl bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800">
            <AccordionRoot type="single" variant="bordered" collapsible>
              <AccordionItem value="1">
                <AccordionTrigger>Enabled item</AccordionTrigger>
                <AccordionContent>This item can be expanded.</AccordionContent>
              </AccordionItem>
              <AccordionItem value="2" disabled>
                <AccordionTrigger>Disabled item</AccordionTrigger>
                <AccordionContent>
                  This content cannot be accessed.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="3">
                <AccordionTrigger>Another enabled item</AccordionTrigger>
                <AccordionContent>
                  This item can also be expanded.
                </AccordionContent>
              </AccordionItem>
            </AccordionRoot>
          </div>
        </section>

        {/* Multiple Expansion */}
        <section className="mt-12">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Multiple Expansion
          </h2>
          <div className="p-6 rounded-xl bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800">
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
              Multiple items can be open simultaneously
            </p>
            <AccordionRoot
              type="multiple"
              variant="separated"
              defaultValue={['1', '2']}
            >
              <AccordionItem value="1">
                <AccordionTrigger>
                  First section (open by default)
                </AccordionTrigger>
                <AccordionContent>
                  This section starts open and can remain open while others are
                  opened.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="2">
                <AccordionTrigger>
                  Second section (open by default)
                </AccordionTrigger>
                <AccordionContent>
                  This section also starts open. Try opening the third section.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="3">
                <AccordionTrigger>Third section</AccordionTrigger>
                <AccordionContent>
                  Opening this section does not close the others.
                </AccordionContent>
              </AccordionItem>
            </AccordionRoot>
          </div>
        </section>

        {/* Features Grid */}
        <section className="mt-12">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Features
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              {
                title: 'Single or Multiple',
                description:
                  'One item at a time or multiple open simultaneously',
              },
              {
                title: 'Three Variants',
                description: 'Default, bordered, and separated visual styles',
              },
              {
                title: 'Animated Transitions',
                description: 'Smooth height and opacity animations',
              },
              {
                title: 'Keyboard Navigation',
                description: 'Full keyboard support with Enter and Space',
              },
              {
                title: 'Controlled Mode',
                description: 'Optional controlled value for external state',
              },
              {
                title: 'Accessible',
                description: 'Proper ARIA attributes and focus management',
              },
            ].map((feature) => (
              <div
                key={feature.title}
                className="p-4 rounded-lg bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800"
              >
                <h3 className="font-medium text-gray-900 dark:text-white">
                  {feature.title}
                </h3>
                <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* API Reference */}
        <section className="mt-12 mb-16">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            API Reference
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-200 dark:border-gray-800">
                  <th className="text-left py-3 px-4 font-medium text-gray-900 dark:text-white">
                    Prop
                  </th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900 dark:text-white">
                    Type
                  </th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900 dark:text-white">
                    Default
                  </th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900 dark:text-white">
                    Description
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-800">
                {[
                  {
                    prop: 'type',
                    type: "'single' | 'multiple'",
                    default: "'single'",
                    desc: 'Expansion behavior',
                  },
                  {
                    prop: 'variant',
                    type: "'default' | 'bordered' | 'separated'",
                    default: "'default'",
                    desc: 'Visual style',
                  },
                  {
                    prop: 'size',
                    type: "'sm' | 'md' | 'lg'",
                    default: "'md'",
                    desc: 'Accordion size',
                  },
                  {
                    prop: 'value',
                    type: 'string | string[]',
                    default: '—',
                    desc: 'Controlled value',
                  },
                  {
                    prop: 'defaultValue',
                    type: 'string | string[]',
                    default: '—',
                    desc: 'Default expanded items',
                  },
                  {
                    prop: 'onValueChange',
                    type: '(value) => void',
                    default: '—',
                    desc: 'Change callback',
                  },
                  {
                    prop: 'collapsible',
                    type: 'boolean',
                    default: 'true',
                    desc: 'Allow collapsing all (single)',
                  },
                  {
                    prop: 'disabled',
                    type: 'boolean',
                    default: 'false',
                    desc: 'Disable all items',
                  },
                ].map((row) => (
                  <tr key={row.prop}>
                    <td className="py-3 px-4 font-mono text-blue-600 dark:text-blue-400">
                      {row.prop}
                    </td>
                    <td className="py-3 px-4 font-mono text-gray-600 dark:text-gray-400">
                      {row.type}
                    </td>
                    <td className="py-3 px-4 text-gray-600 dark:text-gray-400">
                      {row.default}
                    </td>
                    <td className="py-3 px-4 text-gray-600 dark:text-gray-400">
                      {row.desc}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </div>
  );
}
