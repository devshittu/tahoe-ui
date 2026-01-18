// src/app/playground/layout-primitives/page.tsx
'use client';

import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import { Heading, Text, SmallText, Paragraph } from '@/components/Typography';
import {
  Box,
  Flex,
  Grid,
  Stack,
  Center,
  Container,
  Spacer,
  Section,
} from '@/components/Box';
import type { GapValue, JustifyContent, AlignItems } from '@/components/Box';
import {
  FiLayers,
  FiGrid,
  FiColumns,
  FiAlignCenter,
  FiMaximize,
  FiMinus,
  FiLayout,
  FiBox,
} from 'react-icons/fi';

type ActiveSection =
  | 'box'
  | 'flex'
  | 'grid'
  | 'stack'
  | 'center'
  | 'container'
  | 'spacer'
  | 'section';

const SECTIONS: { id: ActiveSection; label: string; icon: React.ReactNode }[] =
  [
    { id: 'box', label: 'Box', icon: <FiBox className="w-4 h-4" /> },
    { id: 'flex', label: 'Flex', icon: <FiColumns className="w-4 h-4" /> },
    { id: 'grid', label: 'Grid', icon: <FiGrid className="w-4 h-4" /> },
    { id: 'stack', label: 'Stack', icon: <FiLayers className="w-4 h-4" /> },
    {
      id: 'center',
      label: 'Center',
      icon: <FiAlignCenter className="w-4 h-4" />,
    },
    {
      id: 'container',
      label: 'Container',
      icon: <FiMaximize className="w-4 h-4" />,
    },
    { id: 'spacer', label: 'Spacer', icon: <FiMinus className="w-4 h-4" /> },
    { id: 'section', label: 'Section', icon: <FiLayout className="w-4 h-4" /> },
  ];

const GAP_VALUES: GapValue[] = ['0', '1', '2', '4', '6', '8', '12'];
const JUSTIFY_VALUES: JustifyContent[] = [
  'start',
  'center',
  'end',
  'between',
  'around',
];
const ALIGN_VALUES: AlignItems[] = [
  'start',
  'center',
  'end',
  'baseline',
  'stretch',
];

function DemoBox({ children }: { children: React.ReactNode }) {
  return (
    <div className="px-4 py-2 bg-blue-100 dark:bg-blue-900/30 border border-blue-200 dark:border-blue-800 rounded-lg text-blue-700 dark:text-blue-300 text-sm font-medium">
      {children}
    </div>
  );
}

function BoxDemo() {
  const [padding, setPadding] = useState<string>('4');
  const [rounded, setRounded] = useState<string>('lg');
  const [shadow, setShadow] = useState<string>('md');
  const [bg, setBg] = useState<string>('white');

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <Text fontWeight="medium" color="primary">
          Box is the foundation primitive. It renders a div with spacing,
          sizing, and visual props.
        </Text>
      </div>

      {/* Controls */}
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

      {/* Demo */}
      <div className="bg-gray-100 dark:bg-gray-800 rounded-xl p-8">
        <Box
          p={padding as '4'}
          rounded={rounded as 'lg'}
          shadow={shadow as 'md'}
          bg={bg as 'white'}
        >
          <Text color="primary">
            This is a Box with p={padding}, rounded={rounded}, shadow={shadow},
            bg={bg}
          </Text>
        </Box>
      </div>

      {/* Polymorphic Example */}
      <div className="space-y-2">
        <Text fontWeight="medium" color="primary">
          Polymorphic rendering
        </Text>
        <SmallText className="text-gray-500">
          Use the `as` prop for semantic HTML
        </SmallText>
        <div className="flex gap-4">
          <Box as="article" p="4" rounded="lg" bg="gray-50">
            <Text>{'as="article"'}</Text>
          </Box>
          <Box as="aside" p="4" rounded="lg" bg="gray-50">
            <Text>{'as="aside"'}</Text>
          </Box>
          <Box as="nav" p="4" rounded="lg" bg="gray-50">
            <Text>{'as="nav"'}</Text>
          </Box>
        </div>
      </div>
    </div>
  );
}

function FlexDemo() {
  const [gap, setGap] = useState<GapValue>('4');
  const [justify, setJustify] = useState<JustifyContent>('start');
  const [align, setAlign] = useState<AlignItems>('center');
  const [direction, setDirection] = useState<'row' | 'col'>('row');

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <Text fontWeight="medium" color="primary">
          Flex is a flexbox layout primitive with intuitive shorthand props.
        </Text>
      </div>

      {/* Controls */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="space-y-2">
          <SmallText className="text-gray-500">Direction</SmallText>
          <select
            value={direction}
            onChange={(e) => setDirection(e.target.value as 'row' | 'col')}
            className="w-full px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-sm"
          >
            <option value="row">row</option>
            <option value="col">col</option>
          </select>
        </div>
        <div className="space-y-2">
          <SmallText className="text-gray-500">Gap</SmallText>
          <select
            value={gap}
            onChange={(e) => setGap(e.target.value as GapValue)}
            className="w-full px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-sm"
          >
            {GAP_VALUES.map((v) => (
              <option key={v} value={v}>
                {v}
              </option>
            ))}
          </select>
        </div>
        <div className="space-y-2">
          <SmallText className="text-gray-500">Justify</SmallText>
          <select
            value={justify}
            onChange={(e) => setJustify(e.target.value as JustifyContent)}
            className="w-full px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-sm"
          >
            {JUSTIFY_VALUES.map((v) => (
              <option key={v} value={v}>
                {v}
              </option>
            ))}
          </select>
        </div>
        <div className="space-y-2">
          <SmallText className="text-gray-500">Align</SmallText>
          <select
            value={align}
            onChange={(e) => setAlign(e.target.value as AlignItems)}
            className="w-full px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-sm"
          >
            {ALIGN_VALUES.map((v) => (
              <option key={v} value={v}>
                {v}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Demo */}
      <div className="bg-gray-100 dark:bg-gray-800 rounded-xl p-4 min-h-[200px]">
        <Flex
          direction={direction}
          gap={gap}
          justify={justify}
          align={align}
          className="h-full min-h-[180px] bg-white dark:bg-gray-900 rounded-lg p-4"
        >
          <DemoBox>Item 1</DemoBox>
          <DemoBox>Item 2</DemoBox>
          <DemoBox>Item 3</DemoBox>
        </Flex>
      </div>

      {/* Center shorthand */}
      <div className="space-y-2">
        <Text fontWeight="medium" color="primary">
          Center shorthand
        </Text>
        <SmallText className="text-gray-500">
          Use `center` prop to center both axes
        </SmallText>
        <div className="bg-gray-100 dark:bg-gray-800 rounded-xl p-4 h-32">
          <Flex center className="h-full bg-white dark:bg-gray-900 rounded-lg">
            <DemoBox>Centered content</DemoBox>
          </Flex>
        </div>
      </div>
    </div>
  );
}

function GridDemo() {
  const [cols, setCols] = useState<string>('3');
  const [gap, setGap] = useState<GapValue>('4');
  const [useAutoFit, setUseAutoFit] = useState(false);

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <Text fontWeight="medium" color="primary">
          Grid is a CSS Grid layout primitive with column/row control.
        </Text>
      </div>

      {/* Controls */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        <div className="space-y-2">
          <SmallText className="text-gray-500">Columns</SmallText>
          <select
            value={cols}
            onChange={(e) => setCols(e.target.value)}
            disabled={useAutoFit}
            className="w-full px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-sm disabled:opacity-50"
          >
            {['1', '2', '3', '4', '5', '6'].map((v) => (
              <option key={v} value={v}>
                {v}
              </option>
            ))}
          </select>
        </div>
        <div className="space-y-2">
          <SmallText className="text-gray-500">Gap</SmallText>
          <select
            value={gap}
            onChange={(e) => setGap(e.target.value as GapValue)}
            className="w-full px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-sm"
          >
            {GAP_VALUES.map((v) => (
              <option key={v} value={v}>
                {v}
              </option>
            ))}
          </select>
        </div>
        <div className="space-y-2">
          <SmallText className="text-gray-500">Auto-fit</SmallText>
          <label className="flex items-center gap-2 cursor-pointer mt-2">
            <input
              type="checkbox"
              checked={useAutoFit}
              onChange={(e) => setUseAutoFit(e.target.checked)}
              className="w-4 h-4 rounded border-gray-300 dark:border-gray-600"
            />
            <Text>{'Use colsAuto="200px"'}</Text>
          </label>
        </div>
      </div>

      {/* Demo */}
      <div className="bg-gray-100 dark:bg-gray-800 rounded-xl p-4">
        <Grid
          cols={useAutoFit ? undefined : (cols as '3')}
          colsAuto={useAutoFit ? '200px' : undefined}
          gap={gap}
        >
          {Array.from({ length: 6 }).map((_, i) => (
            <DemoBox key={i}>Item {i + 1}</DemoBox>
          ))}
        </Grid>
      </div>

      <SmallText className="text-gray-500">
        Tip: `colsAuto` creates responsive auto-fit columns with CSS Grid
      </SmallText>
    </div>
  );
}

function StackDemo() {
  const [direction, setDirection] = useState<'column' | 'row'>('column');
  const [gap, setGap] = useState<GapValue>('4');
  const [divider, setDivider] = useState(false);

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <Text fontWeight="medium" color="primary">
          Stack is a convenience component for vertical/horizontal stacking with
          optional dividers.
        </Text>
      </div>

      {/* Controls */}
      <div className="grid grid-cols-3 gap-4">
        <div className="space-y-2">
          <SmallText className="text-gray-500">Direction</SmallText>
          <select
            value={direction}
            onChange={(e) => setDirection(e.target.value as 'column' | 'row')}
            className="w-full px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-sm"
          >
            <option value="column">column</option>
            <option value="row">row</option>
          </select>
        </div>
        <div className="space-y-2">
          <SmallText className="text-gray-500">Gap</SmallText>
          <select
            value={gap}
            onChange={(e) => setGap(e.target.value as GapValue)}
            className="w-full px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-sm"
          >
            {GAP_VALUES.map((v) => (
              <option key={v} value={v}>
                {v}
              </option>
            ))}
          </select>
        </div>
        <div className="space-y-2">
          <SmallText className="text-gray-500">Divider</SmallText>
          <label className="flex items-center gap-2 cursor-pointer mt-2">
            <input
              type="checkbox"
              checked={divider}
              onChange={(e) => setDivider(e.target.checked)}
              className="w-4 h-4 rounded border-gray-300 dark:border-gray-600"
            />
            <Text>Show dividers</Text>
          </label>
        </div>
      </div>

      {/* Demo */}
      <div className="bg-gray-100 dark:bg-gray-800 rounded-xl p-4">
        <Stack
          direction={direction}
          gap={gap}
          divider={divider}
          p="4"
          rounded="lg"
          bg="white"
        >
          <DemoBox>First item</DemoBox>
          <DemoBox>Second item</DemoBox>
          <DemoBox>Third item</DemoBox>
        </Stack>
      </div>
    </div>
  );
}

function CenterDemo() {
  const [horizontal, setHorizontal] = useState(false);
  const [vertical, setVertical] = useState(false);

  const centerMode =
    !horizontal && !vertical ? 'both' : horizontal ? 'horizontal' : 'vertical';

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <Text fontWeight="medium" color="primary">
          Center is a utility for centering content. By default, it centers both
          axes.
        </Text>
      </div>

      {/* Controls */}
      <div className="flex gap-6">
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            checked={horizontal}
            onChange={(e) => {
              setHorizontal(e.target.checked);
              if (e.target.checked) setVertical(false);
            }}
            className="w-4 h-4 rounded border-gray-300 dark:border-gray-600"
          />
          <Text>Horizontal only</Text>
        </label>
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            checked={vertical}
            onChange={(e) => {
              setVertical(e.target.checked);
              if (e.target.checked) setHorizontal(false);
            }}
            className="w-4 h-4 rounded border-gray-300 dark:border-gray-600"
          />
          <Text>Vertical only</Text>
        </label>
      </div>

      {/* Demo */}
      <div className="bg-gray-100 dark:bg-gray-800 rounded-xl p-4 h-64">
        <Center
          horizontal={horizontal}
          vertical={vertical}
          className="h-full bg-white dark:bg-gray-900 rounded-lg"
        >
          <DemoBox>Centered {centerMode}</DemoBox>
        </Center>
      </div>
    </div>
  );
}

function ContainerDemo() {
  const [size, setSize] = useState<string>('lg');
  const [padding, setPadding] = useState<string>('md');

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <Text fontWeight="medium" color="primary">
          Container provides max-width constraints with responsive padding.
        </Text>
      </div>

      {/* Controls */}
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

      {/* Demo */}
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
  );
}

function SpacerDemo() {
  const [size, setSize] = useState<string>('4');
  const [direction, setDirection] = useState<'vertical' | 'horizontal'>(
    'vertical',
  );

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <Text fontWeight="medium" color="primary">
          Spacer is a pure structural element for creating intentional
          whitespace.
        </Text>
      </div>

      {/* Controls */}
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <SmallText className="text-gray-500">Size</SmallText>
          <select
            value={size}
            onChange={(e) => setSize(e.target.value)}
            className="w-full px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-sm"
          >
            {['1', '2', '3', '4', '6', '8', '12', '16'].map((v) => (
              <option key={v} value={v}>
                {v}
              </option>
            ))}
          </select>
        </div>
        <div className="space-y-2">
          <SmallText className="text-gray-500">Direction</SmallText>
          <select
            value={direction}
            onChange={(e) =>
              setDirection(e.target.value as 'vertical' | 'horizontal')
            }
            className="w-full px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-sm"
          >
            <option value="vertical">vertical</option>
            <option value="horizontal">horizontal</option>
          </select>
        </div>
      </div>

      {/* Demo */}
      <div className="bg-gray-100 dark:bg-gray-800 rounded-xl p-4">
        {direction === 'vertical' ? (
          <div className="bg-white dark:bg-gray-900 rounded-lg p-4">
            <DemoBox>Before spacer</DemoBox>
            <Spacer size={size as '4'} direction={direction} />
            <DemoBox>After spacer (size={size})</DemoBox>
          </div>
        ) : (
          <div className="flex items-center bg-white dark:bg-gray-900 rounded-lg p-4">
            <DemoBox>Before</DemoBox>
            <Spacer size={size as '4'} direction={direction} />
            <DemoBox>After (size={size})</DemoBox>
          </div>
        )}
      </div>
    </div>
  );
}

function SectionDemo() {
  const [bg, setBg] = useState<string>('gray-50');
  const [py, setPy] = useState<string>('md');

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <Text fontWeight="medium" color="primary">
          Section is a semantic full-width element with background and padding
          support.
        </Text>
      </div>

      {/* Controls */}
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <SmallText className="text-gray-500">Background</SmallText>
          <select
            value={bg}
            onChange={(e) => setBg(e.target.value)}
            className="w-full px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-sm"
          >
            {['transparent', 'white', 'gray-50', 'gray-100', 'gray-900'].map(
              (v) => (
                <option key={v} value={v}>
                  {v}
                </option>
              ),
            )}
          </select>
        </div>
        <div className="space-y-2">
          <SmallText className="text-gray-500">Vertical Padding</SmallText>
          <select
            value={py}
            onChange={(e) => setPy(e.target.value)}
            className="w-full px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-sm"
          >
            {['none', 'sm', 'md', 'lg', 'xl', '2xl'].map((v) => (
              <option key={v} value={v}>
                {v}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Demo */}
      <div className="rounded-xl overflow-hidden border border-gray-200 dark:border-gray-700">
        <Section bg={bg as 'gray-50'} py={py as 'md'}>
          <Container size="md">
            <Stack gap="4" align="center">
              <Heading size="lg" color="primary">
                Section Example
              </Heading>
              <Text
                color={bg === 'gray-900' ? 'primary' : 'secondary'}
                className={bg === 'gray-900' ? 'text-white' : ''}
              >
                This is a Section with bg={bg} and py={py}
              </Text>
            </Stack>
          </Container>
        </Section>
      </div>
    </div>
  );
}

export default function LayoutPrimitivesPlayground() {
  const [activeSection, setActiveSection] = useState<ActiveSection>('box');

  const renderDemo = () => {
    switch (activeSection) {
      case 'box':
        return <BoxDemo />;
      case 'flex':
        return <FlexDemo />;
      case 'grid':
        return <GridDemo />;
      case 'stack':
        return <StackDemo />;
      case 'center':
        return <CenterDemo />;
      case 'container':
        return <ContainerDemo />;
      case 'spacer':
        return <SpacerDemo />;
      case 'section':
        return <SectionDemo />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 py-12 px-4">
      <div className="max-w-4xl mx-auto space-y-12">
        {/* Header */}
        <div className="text-center space-y-4">
          <Heading size="2xl" color="primary" className="font-bold">
            Layout Primitives
          </Heading>
          <Paragraph color="secondary" className="max-w-2xl mx-auto">
            A modern, DX-friendly layout system built on Tailwind CSS. All
            components follow the 8pt grid system and design principles for
            consistent, accessible interfaces.
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

        {/* API Reference */}
        <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-6 space-y-4">
          <Heading size="md" color="primary" className="font-semibold">
            Common Props
          </Heading>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Text fontWeight="medium" color="primary">
                Spacing
              </Text>
              <SmallText className="text-gray-500 block">
                p, px, py, pt, pr, pb, pl - Padding
              </SmallText>
              <SmallText className="text-gray-500 block">
                m, mx, my, mt, mr, mb, ml - Margin
              </SmallText>
            </div>
            <div className="space-y-2">
              <Text fontWeight="medium" color="primary">
                Sizing
              </Text>
              <SmallText className="text-gray-500 block">
                w, h - Width, Height
              </SmallText>
              <SmallText className="text-gray-500 block">
                minW, maxW, minH, maxH - Constraints
              </SmallText>
            </div>
            <div className="space-y-2">
              <Text fontWeight="medium" color="primary">
                Visual
              </Text>
              <SmallText className="text-gray-500 block">
                rounded - Border radius
              </SmallText>
              <SmallText className="text-gray-500 block">
                shadow - Box shadow
              </SmallText>
              <SmallText className="text-gray-500 block">
                bg - Background color
              </SmallText>
            </div>
            <div className="space-y-2">
              <Text fontWeight="medium" color="primary">
                Layout
              </Text>
              <SmallText className="text-gray-500 block">
                overflow - Overflow behavior
              </SmallText>
              <SmallText className="text-gray-500 block">
                position - Position type
              </SmallText>
              <SmallText className="text-gray-500 block">z - Z-index</SmallText>
            </div>
          </div>
        </div>

        {/* Usage Example */}
        <div className="bg-gray-900 dark:bg-gray-800 rounded-2xl p-6">
          <Text fontWeight="medium" className="text-white mb-4">
            Import
          </Text>
          <pre className="text-gray-300 text-sm overflow-x-auto">
            <code>{`import { Box, Flex, Grid, Stack, Center, Container, Spacer, Section } from '@/components/Box';`}</code>
          </pre>
        </div>
      </div>
    </div>
  );
}
