// src/app/playground/modal/docs/page.tsx
'use client';

import React from 'react';
import NextLink from 'next/link';
import { modalComponents } from '@/lib/modal-data';
import { FiArrowRight, FiPlay, FiBook, FiLayers, FiZap } from 'react-icons/fi';
import {
  Heading,
  Text,
  Lead,
  Link,
  Code,
  Badge,
  SmallText,
} from '@/components/Typography';

export default function ModalDocsOverview() {
  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Header */}
      <header className="space-y-4">
        <div className="flex items-center gap-2">
          <Link href="/playground" variant="muted">
            <SmallText>Playground</SmallText>
          </Link>
          <SmallText className="text-gray-500 dark:text-gray-400">/</SmallText>
          <SmallText className="text-gray-500 dark:text-gray-400">
            Modal System
          </SmallText>
        </div>
        <Heading level={1} size="xl">
          Modal System Documentation
        </Heading>
        <Lead>
          A comprehensive modal system featuring Dialog and PageMode components
          with gesture-based dismissal, physics-enhanced animations, and
          Zustand-powered state management.
        </Lead>
      </header>

      {/* Quick Actions */}
      <div className="flex flex-wrap gap-4">
        <NextLink
          href="/playground/modal"
          className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <FiPlay size={18} />
          Interactive Demo
        </NextLink>
        <NextLink
          href="/playground/modal/docs/dialog"
          className="inline-flex items-center gap-2 px-4 py-2 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
        >
          <FiBook size={18} />
          Dialog API
        </NextLink>
        <NextLink
          href="/playground/modal/docs/page-mode"
          className="inline-flex items-center gap-2 px-4 py-2 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
        >
          <FiBook size={18} />
          PageMode API
        </NextLink>
      </div>

      {/* Key Features */}
      <section className="bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-2xl p-6 border border-blue-100 dark:border-blue-800/50">
        <Heading level={2} size="lg" className="mb-4">
          Key Features
        </Heading>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-lg bg-blue-100 dark:bg-blue-900/50 flex items-center justify-center flex-shrink-0">
              <FiLayers
                className="text-blue-600 dark:text-blue-400"
                size={20}
              />
            </div>
            <div>
              <Text fontWeight="bold">Modal Stacking</Text>
              <SmallText>
                Open Dialog from PageMode or vice versa with automatic z-index
                management
              </SmallText>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-lg bg-purple-100 dark:bg-purple-900/50 flex items-center justify-center flex-shrink-0">
              <FiZap
                className="text-purple-600 dark:text-purple-400"
                size={20}
              />
            </div>
            <div>
              <Text fontWeight="bold">Zustand Store</Text>
              <SmallText>
                Global state management without Context providers or prop
                drilling
              </SmallText>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-lg bg-green-100 dark:bg-green-900/50 flex items-center justify-center flex-shrink-0">
              <span className="text-green-600 dark:text-green-400 text-lg"></span>
            </div>
            <div>
              <Text fontWeight="bold">Gesture Physics</Text>
              <SmallText>
                Drag resistance, squash-stretch, and backdrop blur effects
              </SmallText>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-lg bg-orange-100 dark:bg-orange-900/50 flex items-center justify-center flex-shrink-0">
              <span className="text-orange-600 dark:text-orange-400 text-lg"></span>
            </div>
            <div>
              <Text fontWeight="bold">Fully Accessible</Text>
              <SmallText>
                Focus trap, screen readers, keyboard navigation, ARIA support
              </SmallText>
            </div>
          </div>
        </div>
      </section>

      {/* Components Grid */}
      <section>
        <Heading level={2} size="lg" className="mb-4">
          Components
        </Heading>
        <div className="grid md:grid-cols-2 gap-4">
          {modalComponents.map((component) => (
            <NextLink
              key={component.id}
              href={`/playground/modal/docs/${component.id}`}
              className="group bg-white dark:bg-gray-800 rounded-xl p-5 border border-gray-200 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-600 hover:shadow-lg transition-all"
            >
              <div className="flex items-start justify-between">
                <div>
                  <Heading
                    level={3}
                    size="lg"
                    className="group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors"
                  >
                    {component.name}
                  </Heading>
                  <SmallText className="mt-1 line-clamp-2">
                    {component.description}
                  </SmallText>
                </div>
                <FiArrowRight
                  className="text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-400 group-hover:translate-x-1 transition-all flex-shrink-0"
                  size={20}
                />
              </div>
              <div className="mt-3 flex items-center gap-2">
                <Badge variant="ghost" size="sm">
                  {component.api.length} props
                </Badge>
              </div>
            </NextLink>
          ))}
        </div>
      </section>

      {/* Architecture Overview */}
      <section className="bg-gray-800 dark:bg-gray-900 rounded-2xl p-6 text-white">
        <Heading level={2} size="lg" className="mb-4 text-white">
          Architecture
        </Heading>
        <div className="space-y-3 font-mono text-sm">
          <div className="flex items-center gap-2">
            <span className="text-gray-400">src/app/playground/modal/</span>
          </div>
          <div className="pl-4 space-y-1">
            <span className="text-blue-400">components/</span>
            <div className="pl-4 space-y-1 text-gray-300">
              <div>
                Dialog/ <span className="text-gray-500">- Modal dialog</span>
              </div>
              <div>
                PageMode/{' '}
                <span className="text-gray-500">- Full-screen overlay</span>
              </div>
              <div>
                shared/{' '}
                <span className="text-gray-500">
                  - Types, hooks, animations
                </span>
              </div>
              <div>
                stores/{' '}
                <span className="text-gray-500">- Zustand modal store</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Start */}
      <section>
        <Heading level={2} size="lg" className="mb-4">
          Quick Start
        </Heading>
        <Code language="typescript">
          {`import { useModals } from '@/app/playground/modal/components/stores/useModalStore';
import { PageMode } from '@/app/playground/modal/components/PageMode';

function App() {
  const { openPageMode, openDialog } = useModals();

  return (
    <>
      <button onClick={() => openPageMode(<Content />, { position: 'bottom' })}>
        Open PageMode
      </button>

      {/* Render PageMode globally */}
      <PageMode themeable roundedEdges />
    </>
  );
}`}
        </Code>
      </section>
    </div>
  );
}
