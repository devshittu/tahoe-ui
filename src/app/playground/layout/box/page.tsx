// src/app/playground/layout/box/page.tsx
'use client';

import React, { useState } from 'react';
import { Text, SmallText, InlineCode } from '@/components/Typography';
import { HeadlineBlock } from '../../headline/components';
import { Box } from '@/components/Box';

export default function BoxPlayground() {
  const [padding, setPadding] = useState('4');
  const [rounded, setRounded] = useState('lg');
  const [shadow, setShadow] = useState('md');
  const [bg, setBg] = useState('white');

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 py-12 px-4">
      <div className="max-w-5xl mx-auto space-y-12">
        <HeadlineBlock
          headline="Box"
          subheadline="Foundation layout primitive with spacing, sizing, and visual props. Polymorphic rendering support."
          size="medium"
        />

        {/* Configuration */}
        <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-6 space-y-6">
          <Text fontWeight="medium" color="primary" className="text-lg">
            Configuration
          </Text>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="space-y-2">
              <SmallText className="text-gray-500">Padding</SmallText>
              <select
                value={padding}
                onChange={(e) => setPadding(e.target.value)}
                className="w-full px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-sm"
              >
                {['0', '2', '4', '6', '8', '12'].map((v) => (
                  <option key={v} value={v}>
                    p={v}
                  </option>
                ))}
              </select>
            </div>
            <div className="space-y-2">
              <SmallText className="text-gray-500">Rounded</SmallText>
              <select
                value={rounded}
                onChange={(e) => setRounded(e.target.value)}
                className="w-full px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-sm"
              >
                {['none', 'sm', 'base', 'md', 'lg', 'xl', '2xl'].map((v) => (
                  <option key={v} value={v}>
                    {v}
                  </option>
                ))}
              </select>
            </div>
            <div className="space-y-2">
              <SmallText className="text-gray-500">Shadow</SmallText>
              <select
                value={shadow}
                onChange={(e) => setShadow(e.target.value)}
                className="w-full px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-sm"
              >
                {['none', 'sm', 'base', 'md', 'lg'].map((v) => (
                  <option key={v} value={v}>
                    {v}
                  </option>
                ))}
              </select>
            </div>
            <div className="space-y-2">
              <SmallText className="text-gray-500">Background</SmallText>
              <select
                value={bg}
                onChange={(e) => setBg(e.target.value)}
                className="w-full px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-sm"
              >
                {['transparent', 'white', 'gray-50', 'gray-100'].map((v) => (
                  <option key={v} value={v}>
                    {v}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Live Demo */}
        <div className="space-y-4">
          <Text fontWeight="medium" color="primary" className="text-lg">
            Live Demo
          </Text>
          <div className="bg-gray-100 dark:bg-gray-800 rounded-xl p-8">
            <Box
              p={padding as '4'}
              rounded={rounded as 'lg'}
              shadow={shadow as 'md'}
              bg={bg as 'white'}
            >
              <Text color="primary">
                Box with p={padding}, rounded={rounded}, shadow={shadow}, bg=
                {bg}
              </Text>
            </Box>
          </div>
        </div>

        {/* Polymorphic Rendering */}
        <div className="space-y-4">
          <Text fontWeight="medium" color="primary" className="text-lg">
            Polymorphic Rendering
          </Text>
          <Text color="secondary" className="text-sm">
            Use the `as` prop to render as different HTML elements
          </Text>
          <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-6">
            <div className="flex flex-wrap gap-4">
              <Box as="article" p="4" rounded="lg" bg="gray-50">
                <Text>as=&quot;article&quot;</Text>
              </Box>
              <Box as="aside" p="4" rounded="lg" bg="gray-50">
                <Text>as=&quot;aside&quot;</Text>
              </Box>
              <Box as="nav" p="4" rounded="lg" bg="gray-50">
                <Text>as=&quot;nav&quot;</Text>
              </Box>
              <Box as="section" p="4" rounded="lg" bg="gray-50">
                <Text>as=&quot;section&quot;</Text>
              </Box>
            </div>
          </div>
        </div>

        {/* Spacing Examples */}
        <div className="space-y-4">
          <Text fontWeight="medium" color="primary" className="text-lg">
            Spacing
          </Text>
          <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-6">
            <div className="space-y-4">
              {['2', '4', '6', '8'].map((p) => (
                <Box key={p} p={p as '4'} bg="gray-100" rounded="lg">
                  <Text className="text-sm">Padding: {p}</Text>
                </Box>
              ))}
            </div>
          </div>
        </div>

        {/* API Reference */}
        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-6 space-y-4">
            <Text fontWeight="medium" color="primary">
              Spacing Props
            </Text>
            <div className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
              <p>
                <InlineCode>p, px, py, pt, pr, pb, pl</InlineCode>
              </p>
              <p>
                <InlineCode>m, mx, my, mt, mr, mb, ml</InlineCode>
              </p>
              <p>Values: 0-16 (maps to Tailwind spacing)</p>
            </div>
          </div>
          <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-6 space-y-4">
            <Text fontWeight="medium" color="primary">
              Visual Props
            </Text>
            <div className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
              <p>
                <InlineCode>rounded</InlineCode> - none | sm | md | lg | xl |
                2xl | full
              </p>
              <p>
                <InlineCode>shadow</InlineCode> - none | sm | md | lg | xl
              </p>
              <p>
                <InlineCode>bg</InlineCode> - Background color token
              </p>
            </div>
          </div>
          <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-6 space-y-4">
            <Text fontWeight="medium" color="primary">
              Sizing Props
            </Text>
            <div className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
              <p>
                <InlineCode>w, h</InlineCode> - Width, Height
              </p>
              <p>
                <InlineCode>minW, maxW</InlineCode> - Min/Max width
              </p>
              <p>
                <InlineCode>minH, maxH</InlineCode> - Min/Max height
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
            <code>{`import { Box } from '@/components/Box';

<Box p="6" rounded="xl" shadow="md" bg="white">
  <Text>Content inside box</Text>
</Box>

<Box as="article" p="4" m="2">
  <Text>Semantic article element</Text>
</Box>`}</code>
          </pre>
        </div>
      </div>
    </div>
  );
}
