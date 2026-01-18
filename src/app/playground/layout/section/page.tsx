// src/app/playground/layout/section/page.tsx
'use client';

import React, { useState } from 'react';
import { Text, SmallText, InlineCode } from '@/components/Typography';
import { HeadlineBlock } from '../../headline/components';
import {
  Section,
  Container,
  type SectionBackground,
  type SectionPadding,
} from '@/components/Box';

const BG_VALUES: SectionBackground[] = [
  'transparent',
  'white',
  'gray-50',
  'gray-100',
  'gray-900',
  'gray-950',
];
const PADDING_VALUES: SectionPadding[] = [
  'none',
  'sm',
  'md',
  'lg',
  'xl',
  '2xl',
];

export default function SectionPlayground() {
  const [bg, setBg] = useState<SectionBackground>('gray-50');
  const [py, setPy] = useState<SectionPadding>('md');
  const [borderTop, setBorderTop] = useState(false);
  const [borderBottom, setBorderBottom] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 py-12 px-4">
      <div className="max-w-5xl mx-auto space-y-12">
        <HeadlineBlock
          headline="Section"
          subheadline="Semantic section primitive with background and spacing support for page layouts."
          size="medium"
        />

        {/* Configuration */}
        <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-6 space-y-6">
          <Text fontWeight="medium" color="primary" className="text-lg">
            Configuration
          </Text>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="space-y-2">
              <SmallText className="text-gray-500">Background</SmallText>
              <select
                value={bg}
                onChange={(e) => setBg(e.target.value as SectionBackground)}
                className="w-full px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-sm"
              >
                {BG_VALUES.map((v) => (
                  <option key={v} value={v}>
                    {v}
                  </option>
                ))}
              </select>
            </div>
            <div className="space-y-2">
              <SmallText className="text-gray-500">Padding</SmallText>
              <select
                value={py}
                onChange={(e) => setPy(e.target.value as SectionPadding)}
                className="w-full px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-sm"
              >
                {PADDING_VALUES.map((v) => (
                  <option key={v} value={v}>
                    {v}
                  </option>
                ))}
              </select>
            </div>
            <div className="space-y-2">
              <SmallText className="text-gray-500">Border Top</SmallText>
              <label className="flex items-center gap-2 mt-2">
                <input
                  type="checkbox"
                  checked={borderTop}
                  onChange={(e) => setBorderTop(e.target.checked)}
                  className="w-4 h-4 rounded"
                />
                <SmallText>Enable</SmallText>
              </label>
            </div>
            <div className="space-y-2">
              <SmallText className="text-gray-500">Border Bottom</SmallText>
              <label className="flex items-center gap-2 mt-2">
                <input
                  type="checkbox"
                  checked={borderBottom}
                  onChange={(e) => setBorderBottom(e.target.checked)}
                  className="w-4 h-4 rounded"
                />
                <SmallText>Enable</SmallText>
              </label>
            </div>
          </div>
        </div>

        {/* Live Demo */}
        <div className="space-y-4">
          <Text fontWeight="medium" color="primary" className="text-lg">
            Live Demo
          </Text>
          <div className="bg-gray-200 dark:bg-gray-700 rounded-xl overflow-hidden">
            <Section
              bg={bg}
              py={py}
              borderTop={borderTop}
              borderBottom={borderBottom}
            >
              <Container size="lg" padding="md">
                <Text color="primary" fontWeight="medium">
                  Section Content
                </Text>
                <SmallText className="text-gray-500 mt-2 block">
                  bg=&quot;{bg}&quot; py=&quot;{py}&quot;
                  {borderTop && ' borderTop'}
                  {borderBottom && ' borderBottom'}
                </SmallText>
              </Container>
            </Section>
          </div>
        </div>

        {/* Background Variants */}
        <div className="space-y-4">
          <Text fontWeight="medium" color="primary" className="text-lg">
            Background Variants
          </Text>
          <div className="rounded-xl overflow-hidden border border-gray-200 dark:border-gray-800">
            {BG_VALUES.filter((b) => b !== 'transparent').map((bgVal) => (
              <Section key={bgVal} bg={bgVal} py="sm">
                <Container size="lg" padding="md">
                  <SmallText
                    className={
                      bgVal.includes('900') || bgVal.includes('950')
                        ? 'text-gray-300'
                        : 'text-gray-600 dark:text-gray-400'
                    }
                  >
                    bg=&quot;{bgVal}&quot;
                  </SmallText>
                </Container>
              </Section>
            ))}
          </div>
        </div>

        {/* Padding Scale */}
        <div className="space-y-4">
          <Text fontWeight="medium" color="primary" className="text-lg">
            Padding Scale
          </Text>
          <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 overflow-hidden">
            {PADDING_VALUES.map((pyVal) => (
              <Section key={pyVal} bg="gray-50" py={pyVal} borderBottom>
                <Container size="lg" padding="md">
                  <SmallText className="text-gray-600 dark:text-gray-400">
                    py=&quot;{pyVal}&quot;
                  </SmallText>
                </Container>
              </Section>
            ))}
          </div>
        </div>

        {/* Landing Page Pattern */}
        <div className="space-y-4">
          <Text fontWeight="medium" color="primary" className="text-lg">
            Landing Page Pattern
          </Text>
          <div className="rounded-xl overflow-hidden border border-gray-200 dark:border-gray-800">
            <Section bg="gray-950" py="lg">
              <Container size="lg" padding="md">
                <Text className="text-white text-xl" fontWeight="semibold">
                  Hero Section
                </Text>
                <SmallText className="text-gray-400 mt-2 block">
                  Dark background with large padding
                </SmallText>
              </Container>
            </Section>
            <Section bg="white" py="lg" aria-labelledby="features-heading">
              <Container size="lg" padding="md">
                <Text
                  id="features-heading"
                  color="primary"
                  className="text-xl"
                  fontWeight="semibold"
                >
                  Features
                </Text>
                <SmallText className="text-gray-500 mt-2 block">
                  With aria-labelledby for accessibility
                </SmallText>
              </Container>
            </Section>
            <Section bg="gray-50" py="lg">
              <Container size="lg" padding="md">
                <Text color="primary" className="text-xl" fontWeight="semibold">
                  Testimonials
                </Text>
                <SmallText className="text-gray-500 mt-2 block">
                  Alternating background colors
                </SmallText>
              </Container>
            </Section>
            <Section bg="gray-900" py="md">
              <Container size="lg" padding="md">
                <Text className="text-gray-300">Footer Section</Text>
              </Container>
            </Section>
          </div>
        </div>

        {/* API Reference */}
        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-6 space-y-4">
            <Text fontWeight="medium" color="primary">
              Background Values
            </Text>
            <div className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
              <p>
                <InlineCode>transparent</InlineCode> - No background
              </p>
              <p>
                <InlineCode>white</InlineCode> - White/gray-950
              </p>
              <p>
                <InlineCode>gray-50</InlineCode> - Light gray
              </p>
              <p>
                <InlineCode>gray-100</InlineCode> - Medium gray
              </p>
              <p>
                <InlineCode>gray-900</InlineCode> - Dark gray
              </p>
              <p>
                <InlineCode>gray-950</InlineCode> - Darkest
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
                <InlineCode>sm</InlineCode> - 32→48px
              </p>
              <p>
                <InlineCode>md</InlineCode> - 48→64px (default)
              </p>
              <p>
                <InlineCode>lg</InlineCode> - 64→80→96px
              </p>
              <p>
                <InlineCode>xl</InlineCode> - 80→96→128px
              </p>
              <p>
                <InlineCode>2xl</InlineCode> - 96→128→160px
              </p>
            </div>
          </div>
          <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-6 space-y-4">
            <Text fontWeight="medium" color="primary">
              Additional Props
            </Text>
            <div className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
              <p>
                <InlineCode>borderTop</InlineCode> - Add top border
              </p>
              <p>
                <InlineCode>borderBottom</InlineCode> - Add bottom border
              </p>
              <p>
                <InlineCode>fullHeight</InlineCode> - h-screen
              </p>
              <p>
                <InlineCode>minFullHeight</InlineCode> - min-h-screen
              </p>
              <p>
                <InlineCode>aria-label</InlineCode> - Accessible label
              </p>
              <p>
                <InlineCode>aria-labelledby</InlineCode> - Reference heading
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
            <code>{`import { Section, Container } from '@/components/Box';

// Basic section
<Section bg="gray-50" py="lg">
  <Container>
    <h2>Features</h2>
    <p>Content here...</p>
  </Container>
</Section>

// Accessible section with landmark
<Section
  bg="white"
  py="xl"
  aria-labelledby="testimonials-heading"
>
  <Container>
    <h2 id="testimonials-heading">Testimonials</h2>
  </Container>
</Section>

// Full-height hero
<Section bg="gray-950" py="none" minFullHeight>
  <Container className="flex items-center h-full">
    <HeroContent />
  </Container>
</Section>`}</code>
          </pre>
        </div>
      </div>
    </div>
  );
}
