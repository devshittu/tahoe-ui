// src/app/playground/layout/container/page.tsx
'use client';

import React, { useState } from 'react';
import { Text, SmallText, InlineCode } from '@/components/Typography';
import { HeadlineBlock } from '../../headline/components';
import { Container } from '@/components/Box';

export default function ContainerPlayground() {
  const [size, setSize] = useState('lg');
  const [padding, setPadding] = useState('md');

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 py-12 px-4">
      <div className="max-w-5xl mx-auto space-y-12">
        <HeadlineBlock
          headline="Container"
          subheadline="Max-width constrained container with responsive padding for page layouts."
          size="medium"
        />

        {/* Configuration */}
        <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-6 space-y-6">
          <Text fontWeight="medium" color="primary" className="text-lg">
            Configuration
          </Text>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <SmallText className="text-gray-500">Size (max-width)</SmallText>
              <select
                value={size}
                onChange={(e) => setSize(e.target.value)}
                className="w-full px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-sm"
              >
                {['xs', 'sm', 'md', 'lg', 'xl', '2xl', 'full'].map((v) => (
                  <option key={v} value={v}>
                    {v}
                  </option>
                ))}
              </select>
            </div>
            <div className="space-y-2">
              <SmallText className="text-gray-500">Padding</SmallText>
              <select
                value={padding}
                onChange={(e) => setPadding(e.target.value)}
                className="w-full px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-sm"
              >
                {['none', 'sm', 'md', 'lg'].map((v) => (
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
          <div className="bg-gray-100 dark:bg-gray-800 rounded-xl p-4">
            <Container
              size={size as 'lg'}
              padding={padding as 'md'}
              className="bg-white dark:bg-gray-900 py-4 rounded-lg"
            >
              <Text color="primary" className="text-center">
                Container size={size}, padding={padding}
              </Text>
              <SmallText className="text-gray-500 text-center block mt-2">
                Resize the window to see responsive behavior
              </SmallText>
            </Container>
          </div>
        </div>

        {/* Size Comparison */}
        <div className="space-y-4">
          <Text fontWeight="medium" color="primary" className="text-lg">
            Size Comparison
          </Text>
          <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-6 space-y-4">
            {['xs', 'sm', 'md', 'lg', 'xl', '2xl'].map((s) => (
              <div
                key={s}
                className="bg-gray-100 dark:bg-gray-800 rounded-lg py-2"
              >
                <Container size={s as 'lg'} padding="md">
                  <div className="bg-blue-100 dark:bg-blue-900/30 rounded px-3 py-2 text-center">
                    <SmallText className="text-blue-700 dark:text-blue-300">
                      size=&quot;{s}&quot;
                    </SmallText>
                  </div>
                </Container>
              </div>
            ))}
          </div>
        </div>

        {/* Page Layout Example */}
        <div className="space-y-4">
          <Text fontWeight="medium" color="primary" className="text-lg">
            Page Layout Example
          </Text>
          <div className="bg-gray-200 dark:bg-gray-700 rounded-xl overflow-hidden">
            <div className="bg-gray-900 dark:bg-gray-950 py-4">
              <Container size="lg" padding="md">
                <Text className="text-white">Header</Text>
              </Container>
            </div>
            <Container size="lg" padding="md" className="py-8">
              <div className="bg-white dark:bg-gray-800 rounded-lg p-6 min-h-[200px]">
                <Text color="primary">Main content area</Text>
                <SmallText className="text-gray-500 mt-2">
                  Container constrains width while allowing full-bleed
                  backgrounds
                </SmallText>
              </div>
            </Container>
            <div className="bg-gray-800 dark:bg-gray-950 py-4">
              <Container size="lg" padding="md">
                <Text className="text-gray-300">Footer</Text>
              </Container>
            </div>
          </div>
        </div>

        {/* API Reference */}
        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-6 space-y-4">
            <Text fontWeight="medium" color="primary">
              Size Values
            </Text>
            <div className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
              <p>
                <InlineCode>xs</InlineCode> - max-w-xs (320px)
              </p>
              <p>
                <InlineCode>sm</InlineCode> - max-w-sm (384px)
              </p>
              <p>
                <InlineCode>md</InlineCode> - max-w-md (448px)
              </p>
              <p>
                <InlineCode>lg</InlineCode> - max-w-lg (512px)
              </p>
              <p>
                <InlineCode>xl</InlineCode> - max-w-xl (576px)
              </p>
              <p>
                <InlineCode>2xl</InlineCode> - max-w-2xl (672px)
              </p>
              <p>
                <InlineCode>full</InlineCode> - max-w-full
              </p>
            </div>
          </div>
          <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-6 space-y-4">
            <Text fontWeight="medium" color="primary">
              Padding Values
            </Text>
            <div className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
              <p>
                <InlineCode>none</InlineCode> - No padding
              </p>
              <p>
                <InlineCode>sm</InlineCode> - px-4
              </p>
              <p>
                <InlineCode>md</InlineCode> - px-6 lg:px-8
              </p>
              <p>
                <InlineCode>lg</InlineCode> - px-8 lg:px-12
              </p>
            </div>
          </div>
          <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-6 space-y-4">
            <Text fontWeight="medium" color="primary">
              Features
            </Text>
            <div className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
              <p>Auto horizontal centering</p>
              <p>Responsive padding</p>
              <p>Inherits all Box props</p>
            </div>
          </div>
        </div>

        {/* Code Example */}
        <div className="bg-gray-900 dark:bg-gray-800 rounded-2xl p-6">
          <Text fontWeight="medium" className="text-white mb-4">
            Usage
          </Text>
          <pre className="text-gray-300 text-sm overflow-x-auto">
            <code>{`import { Container } from '@/components/Box';

<Container size="lg" padding="md">
  <h1>Page Title</h1>
  <p>Content is constrained to max-width</p>
</Container>`}</code>
          </pre>
        </div>
      </div>
    </div>
  );
}
