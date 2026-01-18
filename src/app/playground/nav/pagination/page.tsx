// src/app/playground/nav/pagination/page.tsx
'use client';

import React, { useState } from 'react';
import { Text, SmallText, InlineCode } from '@/components/Typography';
import { HeadlineBlock } from '../../headline/components';
import {
  Pagination,
  type PaginationVariant,
  type PaginationSize,
} from '@/components/Navigation';

const VARIANT_VALUES: PaginationVariant[] = ['numbered', 'simple', 'compact'];
const SIZE_VALUES: PaginationSize[] = ['sm', 'md', 'lg'];

export default function PaginationPlayground() {
  const [variant, setVariant] = useState<PaginationVariant>('numbered');
  const [size, setSize] = useState<PaginationSize>('md');
  const [showFirstLast, setShowFirstLast] = useState(true);
  const [siblings, setSiblings] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalItems] = useState(150);
  const [pageSize] = useState(10);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 py-12 px-4">
      <div className="max-w-5xl mx-auto space-y-12">
        <HeadlineBlock
          headline="Pagination"
          subheadline="Page navigation component with multiple variants and full accessibility support."
          size="medium"
        />

        {/* Configuration */}
        <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-6 space-y-6">
          <Text fontWeight="medium" color="primary" className="text-lg">
            Configuration
          </Text>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="space-y-2">
              <SmallText className="text-gray-500">Variant</SmallText>
              <select
                value={variant}
                onChange={(e) =>
                  setVariant(e.target.value as PaginationVariant)
                }
                className="w-full px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-sm"
              >
                {VARIANT_VALUES.map((v) => (
                  <option key={v} value={v}>
                    {v}
                  </option>
                ))}
              </select>
            </div>
            <div className="space-y-2">
              <SmallText className="text-gray-500">Size</SmallText>
              <select
                value={size}
                onChange={(e) => setSize(e.target.value as PaginationSize)}
                className="w-full px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-sm"
              >
                {SIZE_VALUES.map((v) => (
                  <option key={v} value={v}>
                    {v}
                  </option>
                ))}
              </select>
            </div>
            <div className="space-y-2">
              <SmallText className="text-gray-500">Siblings</SmallText>
              <select
                value={siblings}
                onChange={(e) => setSiblings(parseInt(e.target.value))}
                className="w-full px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-sm"
              >
                {[1, 2, 3].map((v) => (
                  <option key={v} value={v}>
                    {v}
                  </option>
                ))}
              </select>
            </div>
            <div className="space-y-2">
              <SmallText className="text-gray-500">First/Last</SmallText>
              <label className="flex items-center gap-2 mt-2">
                <input
                  type="checkbox"
                  checked={showFirstLast}
                  onChange={(e) => setShowFirstLast(e.target.checked)}
                  className="w-4 h-4 rounded"
                />
                <SmallText>Show buttons</SmallText>
              </label>
            </div>
          </div>
        </div>

        {/* Live Demo */}
        <div className="space-y-4">
          <Text fontWeight="medium" color="primary" className="text-lg">
            Live Demo
          </Text>
          <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-6 flex flex-col items-center gap-6">
            <Pagination
              total={totalItems}
              pageSize={pageSize}
              currentPage={currentPage}
              onChange={setCurrentPage}
              variant={variant}
              size={size}
              showFirstLast={showFirstLast}
              siblings={siblings}
            />
            <SmallText className="text-gray-500">
              Page {currentPage} of {Math.ceil(totalItems / pageSize)} (
              {totalItems} items, {pageSize} per page)
            </SmallText>
          </div>
        </div>

        {/* Variants */}
        <div className="space-y-4">
          <Text fontWeight="medium" color="primary" className="text-lg">
            Variants
          </Text>
          <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-6 space-y-8">
            {VARIANT_VALUES.map((v) => (
              <div key={v}>
                <SmallText className="text-gray-500 mb-3 block">
                  variant=&quot;{v}&quot;
                </SmallText>
                <Pagination
                  total={100}
                  pageSize={10}
                  currentPage={5}
                  onChange={() => {}}
                  variant={v}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Sizes */}
        <div className="space-y-4">
          <Text fontWeight="medium" color="primary" className="text-lg">
            Sizes
          </Text>
          <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-6 space-y-8">
            {SIZE_VALUES.map((s) => (
              <div key={s}>
                <SmallText className="text-gray-500 mb-3 block">
                  size=&quot;{s}&quot;
                </SmallText>
                <Pagination
                  total={100}
                  pageSize={10}
                  currentPage={5}
                  onChange={() => {}}
                  size={s}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Different Page Counts */}
        <div className="space-y-4">
          <Text fontWeight="medium" color="primary" className="text-lg">
            Different Page Counts
          </Text>
          <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-6 space-y-8">
            <div>
              <SmallText className="text-gray-500 mb-3 block">
                Few pages (5)
              </SmallText>
              <Pagination
                total={50}
                pageSize={10}
                currentPage={3}
                onChange={() => {}}
              />
            </div>
            <div>
              <SmallText className="text-gray-500 mb-3 block">
                Many pages (20) - beginning
              </SmallText>
              <Pagination
                total={200}
                pageSize={10}
                currentPage={2}
                onChange={() => {}}
              />
            </div>
            <div>
              <SmallText className="text-gray-500 mb-3 block">
                Many pages (20) - middle
              </SmallText>
              <Pagination
                total={200}
                pageSize={10}
                currentPage={10}
                onChange={() => {}}
              />
            </div>
            <div>
              <SmallText className="text-gray-500 mb-3 block">
                Many pages (20) - end
              </SmallText>
              <Pagination
                total={200}
                pageSize={10}
                currentPage={19}
                onChange={() => {}}
              />
            </div>
          </div>
        </div>

        {/* Sibling Count */}
        <div className="space-y-4">
          <Text fontWeight="medium" color="primary" className="text-lg">
            Sibling Count
          </Text>
          <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-6 space-y-8">
            {[1, 2, 3].map((s) => (
              <div key={s}>
                <SmallText className="text-gray-500 mb-3 block">
                  siblings={s}
                </SmallText>
                <Pagination
                  total={200}
                  pageSize={10}
                  currentPage={10}
                  onChange={() => {}}
                  siblings={s}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Disabled State */}
        <div className="space-y-4">
          <Text fontWeight="medium" color="primary" className="text-lg">
            Disabled State
          </Text>
          <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-6">
            <Pagination
              total={100}
              pageSize={10}
              currentPage={5}
              onChange={() => {}}
              disabled
            />
          </div>
        </div>

        {/* API Reference */}
        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-6 space-y-4">
            <Text fontWeight="medium" color="primary">
              Variants
            </Text>
            <div className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
              <p>
                <InlineCode>numbered</InlineCode> - Page number buttons
              </p>
              <p>
                <InlineCode>simple</InlineCode> - Prev/Next only
              </p>
              <p>
                <InlineCode>compact</InlineCode> - With page input
              </p>
            </div>
          </div>
          <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-6 space-y-4">
            <Text fontWeight="medium" color="primary">
              Required Props
            </Text>
            <div className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
              <p>
                <InlineCode>total</InlineCode> - Total item count
              </p>
              <p>
                <InlineCode>pageSize</InlineCode> - Items per page
              </p>
              <p>
                <InlineCode>currentPage</InlineCode> - Current page (1-indexed)
              </p>
              <p>
                <InlineCode>onChange</InlineCode> - Page change handler
              </p>
            </div>
          </div>
          <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-6 space-y-4">
            <Text fontWeight="medium" color="primary">
              Optional Props
            </Text>
            <div className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
              <p>
                <InlineCode>size</InlineCode> - sm | md | lg
              </p>
              <p>
                <InlineCode>showFirstLast</InlineCode> - Show jump buttons
              </p>
              <p>
                <InlineCode>siblings</InlineCode> - Visible page siblings
              </p>
              <p>
                <InlineCode>disabled</InlineCode> - Disable all buttons
              </p>
            </div>
          </div>
        </div>

        {/* Code Example */}
        <div className="bg-gray-900 dark:bg-gray-800 rounded-2xl p-6">
          <Text fontWeight="medium" className="text-white mb-4">
            Usage
          </Text>
          <pre className="text-gray-300 text-sm overflow-x-auto">
            <code>{`import { Pagination } from '@/components/Navigation';

const [page, setPage] = useState(1);
const pageSize = 10;
const totalItems = 150;

// Basic numbered pagination
<Pagination
  total={totalItems}
  pageSize={pageSize}
  currentPage={page}
  onChange={setPage}
/>

// Simple prev/next only
<Pagination
  total={totalItems}
  pageSize={pageSize}
  currentPage={page}
  onChange={setPage}
  variant="simple"
/>

// Compact with page input
<Pagination
  total={totalItems}
  pageSize={pageSize}
  currentPage={page}
  onChange={setPage}
  variant="compact"
/>

// Large with more siblings
<Pagination
  total={500}
  pageSize={pageSize}
  currentPage={page}
  onChange={setPage}
  size="lg"
  siblings={2}
/>`}</code>
          </pre>
        </div>
      </div>
    </div>
  );
}
