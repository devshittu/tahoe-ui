// src/app/playground/box/page.tsx
'use client';

import React, { useState } from 'react';
import {
  BaseBox,
  GridBox,
  FlexBox,
  StackBox,
  SplitBox,
  GlassBox,
  BlurBox,
  InteractiveBox,
  AnimatedBox,
  DraggableBox,
} from '@/components/Box';
import { motion } from 'framer-motion';

const DemoPage = () => {
  // BaseBox State
  const [baseWidth, setBaseWidth] = useState<'full' | '1/2' | '1/3' | '1/4'>(
    'full',
  );
  const [baseHeight, setBaseHeight] = useState<'full' | 'screen' | 'auto'>(
    'auto',
  );
  const [basePadding, setBasePadding] = useState<
    '0' | '1' | '2' | '4' | '6' | '8'
  >('4');
  const [baseMargin, setBaseMargin] = useState<
    '0' | '1' | '2' | '4' | '6' | '8'
  >('4');
  const [baseBackground, setBaseBackground] = useState<
    'white' | 'gray-100' | 'blue-50'
  >('gray-100');
  const [baseBorder, setBaseBorder] = useState<'none' | 'sm' | 'md' | 'lg'>(
    'md',
  );
  const [baseBorderColor, setBaseBorderColor] = useState<
    'gray-200' | 'gray-300' | 'blue-500'
  >('gray-300');
  const [baseShadow, setBaseShadow] = useState<'sm' | 'md' | 'lg' | 'xl'>('md');
  const [baseRounded, setBaseRounded] = useState<
    'none' | 'sm' | 'md' | 'lg' | 'full'
  >('md');
  const [baseTheme, setBaseTheme] = useState<'light' | 'dark' | 'custom'>(
    'light',
  );

  // GridBox State
  const [gridColumns, setGridColumns] = useState<
    '1' | '2' | '3' | '4' | 'auto-fit' | 'auto-fill'
  >('2');
  const [gridGap, setGridGap] = useState<'0' | '1' | '2' | '4' | '6' | '8'>(
    '4',
  );

  // FlexBox State
  const [flexDirection, setFlexDirection] = useState<
    'row' | 'row-reverse' | 'col' | 'col-reverse'
  >('row');
  const [flexJustify, setFlexJustify] = useState<
    'start' | 'center' | 'end' | 'between' | 'around' | 'evenly'
  >('start');
  const [flexAlign, setFlexAlign] = useState<
    'start' | 'center' | 'end' | 'stretch' | 'baseline'
  >('stretch');

  // StackBox State
  const [stackDirection, setStackDirection] = useState<'col' | 'row'>(
    'col',
  );
  const [stackGap, setStackGap] = useState<'0' | '1' | '2' | '4' | '6' | '8'>(
    '4',
  );

  // SplitBox State
  const [splitGap, setSplitGap] = useState<'0' | '1' | '2' | '4' | '6' | '8'>(
    '4',
  );

  // GlassBox State
  const [glassBlur, setGlassBlur] = useState<'sm' | 'md' | 'lg'>('md');
  const [glassOpacity, setGlassOpacity] = useState<number>(50);

  // BlurBox State
  const [blurLevel, setBlurLevel] = useState<'sm' | 'md' | 'lg'>('md');

  // InteractiveBox State
  const [interactiveHoverEffect, setInteractiveHoverEffect] = useState<
    'scale' | 'shadow' | 'opacity' | 'none'
  >('none');
  const [interactiveFocusEffect, setInteractiveFocusEffect] = useState<
    'ring' | 'shadow' | 'none'
  >('none');
  const [interactiveActiveEffect, setInteractiveActiveEffect] = useState<
    'scale' | 'shadow' | 'none'
  >('none');
  const [interactiveDisabled, setInteractiveDisabled] =
    useState<boolean>(false);

  // AnimatedBox State
  const [animatedEffect, setAnimatedEffect] = useState<
    'fade-in' | 'slide-up' | 'zoom-in' | 'none'
  >('none');
  const [animatedDuration, setAnimatedDuration] = useState<number>(0.3);
  const [animatedDelay, setAnimatedDelay] = useState<number>(0);

  // DraggableBox State
  const [draggableDisabled, setDraggableDisabled] = useState<boolean>(false);

  return (
    <div className="p-8 space-y-12">
      {/* BaseBox Demo */}
      <section>
        <h2 className="text-2xl font-bold mb-4">BaseBox Demo</h2>
        <div className="flex flex-wrap gap-4 mb-4">
          <select
            value={baseWidth}
            onChange={(e) => setBaseWidth(e.target.value as any)}
            className="p-2 border rounded"
          >
            <option value="full">Full Width</option>
            <option value="1/2">1/2</option>
            <option value="1/3">1/3</option>
            <option value="1/4">1/4</option>
          </select>
          <select
            value={baseHeight}
            onChange={(e) => setBaseHeight(e.target.value as any)}
            className="p-2 border rounded"
          >
            <option value="auto">Auto Height</option>
            <option value="full">Full Height</option>
            <option value="screen">Screen Height</option>
          </select>
          <select
            value={basePadding}
            onChange={(e) => setBasePadding(e.target.value as any)}
            className="p-2 border rounded"
          >
            <option value="0">Padding 0</option>
            <option value="1">Padding 1</option>
            <option value="2">Padding 2</option>
            <option value="4">Padding 4</option>
            <option value="6">Padding 6</option>
            <option value="8">Padding 8</option>
          </select>
          <select
            value={baseMargin}
            onChange={(e) => setBaseMargin(e.target.value as any)}
            className="p-2 border rounded"
          >
            <option value="0">Margin 0</option>
            <option value="1">Margin 1</option>
            <option value="2">Margin 2</option>
            <option value="4">Margin 4</option>
            <option value="6">Margin 6</option>
            <option value="8">Margin 8</option>
          </select>
          <select
            value={baseBackground}
            onChange={(e) => setBaseBackground(e.target.value as any)}
            className="p-2 border rounded"
          >
            <option value="white">White</option>
            <option value="gray-100">Gray 100</option>
            <option value="blue-50">Blue 50</option>
          </select>
          <select
            value={baseBorder}
            onChange={(e) => setBaseBorder(e.target.value as any)}
            className="p-2 border rounded"
          >
            <option value="none">No Border</option>
            <option value="sm">Small Border</option>
            <option value="md">Medium Border</option>
            <option value="lg">Large Border</option>
          </select>
          <select
            value={baseBorderColor}
            onChange={(e) => setBaseBorderColor(e.target.value as any)}
            className="p-2 border rounded"
          >
            <option value="gray-200">Gray 200</option>
            <option value="gray-300">Gray 300</option>
            <option value="blue-500">Blue 500</option>
          </select>
          <select
            value={baseShadow}
            onChange={(e) => setBaseShadow(e.target.value as any)}
            className="p-2 border rounded"
          >
            <option value="sm">Shadow SM</option>
            <option value="md">Shadow MD</option>
            <option value="lg">Shadow LG</option>
            <option value="xl">Shadow XL</option>
          </select>
          <select
            value={baseRounded}
            onChange={(e) => setBaseRounded(e.target.value as any)}
            className="p-2 border rounded"
          >
            <option value="none">No Rounding</option>
            <option value="sm">Small Rounding</option>
            <option value="md">Medium Rounding</option>
            <option value="lg">Large Rounding</option>
            <option value="full">Full Rounding</option>
          </select>
          <select
            value={baseTheme}
            onChange={(e) => setBaseTheme(e.target.value as any)}
            className="p-2 border rounded"
          >
            <option value="light">Light Theme</option>
            <option value="dark">Dark Theme</option>
            <option value="custom">Custom Theme</option>
          </select>
        </div>
        <BaseBox
          width={baseWidth}
          height={baseHeight}
          padding={basePadding}
          margin={baseMargin}
          background={baseBackground}
          border={baseBorder}
          borderColor={baseBorderColor}
          shadow={baseShadow}
          rounded={baseRounded}
          theme={baseTheme}
        >
          <p>This is a BaseBox component.</p>
        </BaseBox>
      </section>

      {/* GridBox Demo */}
      <section>
        <h2 className="text-2xl font-bold mb-4">GridBox Demo</h2>
        <div className="flex flex-wrap gap-4 mb-4">
          <select
            value={gridColumns}
            onChange={(e) => setGridColumns(e.target.value as any)}
            className="p-2 border rounded"
          >
            <option value="1">1 Column</option>
            <option value="2">2 Columns</option>
            <option value="3">3 Columns</option>
            <option value="4">4 Columns</option>
            <option value="auto-fit">Auto Fit</option>
            <option value="auto-fill">Auto Fill</option>
          </select>
          <select
            value={gridGap}
            onChange={(e) => setGridGap(e.target.value as any)}
            className="p-2 border rounded"
          >
            <option value="0">Gap 0</option>
            <option value="1">Gap 1</option>
            <option value="2">Gap 2</option>
            <option value="4">Gap 4</option>
            <option value="6">Gap 6</option>
            <option value="8">Gap 8</option>
          </select>
        </div>
        <GridBox columns={gridColumns} gap={gridGap}>
          <BaseBox className="bg-blue-100 p-4">Box 1</BaseBox>
          <BaseBox className="bg-blue-200 p-4">Box 2</BaseBox>
          <BaseBox className="bg-blue-300 p-4">Box 3</BaseBox>
          <BaseBox className="bg-blue-400 p-4">Box 4</BaseBox>
        </GridBox>
      </section>

      {/* FlexBox Demo */}
      <section>
        <h2 className="text-2xl font-bold mb-4">FlexBox Demo</h2>
        <div className="flex flex-wrap gap-4 mb-4">
          <select
            value={flexDirection}
            onChange={(e) => setFlexDirection(e.target.value as any)}
            className="p-2 border rounded"
          >
            <option value="row">Row</option>
            <option value="row-reverse">Row Reverse</option>
            <option value="col">Column</option>
            <option value="col-reverse">Column Reverse</option>
          </select>
          <select
            value={flexJustify}
            onChange={(e) => setFlexJustify(e.target.value as any)}
            className="p-2 border rounded"
          >
            <option value="start">Start</option>
            <option value="center">Center</option>
            <option value="end">End</option>
            <option value="between">Between</option>
            <option value="around">Around</option>
            <option value="evenly">Evenly</option>
          </select>
          <select
            value={flexAlign}
            onChange={(e) => setFlexAlign(e.target.value as any)}
            className="p-2 border rounded"
          >
            <option value="start">Start</option>
            <option value="center">Center</option>
            <option value="end">End</option>
            <option value="stretch">Stretch</option>
            <option value="baseline">Baseline</option>
          </select>
        </div>
        <FlexBox
          direction={flexDirection}
          justify={flexJustify}
          align={flexAlign}
          gap="4"
        >
          <BaseBox className="bg-green-100 p-4">Flex Item 1</BaseBox>
          <BaseBox className="bg-green-200 p-4">Flex Item 2</BaseBox>
          <BaseBox className="bg-green-300 p-4">Flex Item 3</BaseBox>
        </FlexBox>
      </section>

      {/* StackBox Demo */}
      <section>
        <h2 className="text-2xl font-bold mb-4">StackBox Demo</h2>
        <div className="flex flex-wrap gap-4 mb-4">
          <select
            value={stackDirection}
            onChange={(e) => setStackDirection(e.target.value as any)}
            className="p-2 border rounded"
          >
            <option value="column">Vertical Stack</option>
            <option value="row">Horizontal Stack</option>
          </select>
          <select
            value={stackGap}
            onChange={(e) => setStackGap(e.target.value as any)}
            className="p-2 border rounded"
          >
            <option value="0">Gap 0</option>
            <option value="1">Gap 1</option>
            <option value="2">Gap 2</option>
            <option value="4">Gap 4</option>
            <option value="6">Gap 6</option>
            <option value="8">Gap 8</option>
          </select>
        </div>
        <StackBox direction={stackDirection} gap={stackGap}>
          <BaseBox className="bg-purple-100 p-4">Stack Item 1</BaseBox>
          <BaseBox className="bg-purple-200 p-4">Stack Item 2</BaseBox>
          <BaseBox className="bg-purple-300 p-4">Stack Item 3</BaseBox>
        </StackBox>
      </section>

      {/* SplitBox Demo */}
      <section>
        <h2 className="text-2xl font-bold mb-4">SplitBox Demo</h2>
        <div className="flex flex-wrap gap-4 mb-4">
          <select
            value={splitGap}
            onChange={(e) => setSplitGap(e.target.value as any)}
            className="p-2 border rounded"
          >
            <option value="0">Gap 0</option>
            <option value="1">Gap 1</option>
            <option value="2">Gap 2</option>
            <option value="4">Gap 4</option>
            <option value="6">Gap 6</option>
            <option value="8">Gap 8</option>
          </select>
        </div>
        <SplitBox gap={splitGap}>
          <BaseBox className="bg-red-100 p-4">Left Section</BaseBox>
          <BaseBox className="bg-red-200 p-4">Right Section</BaseBox>
        </SplitBox>
      </section>

      {/* GlassBox Demo */}
      <section>
        <h2 className="text-2xl font-bold mb-4">GlassBox Demo</h2>
        <div className="flex flex-wrap gap-4 mb-4">
          <select
            value={glassBlur}
            onChange={(e) => setGlassBlur(e.target.value as any)}
            className="p-2 border rounded"
          >
            <option value="sm">Blur SM</option>
            <option value="md">Blur MD</option>
            <option value="lg">Blur LG</option>
          </select>
          <select
            value={glassOpacity}
            onChange={(e) => setGlassOpacity(Number(e.target.value))}
            className="p-2 border rounded"
          >
            <option value={10}>Opacity 10</option>
            <option value={20}>Opacity 20</option>
            <option value={30}>Opacity 30</option>
            <option value={40}>Opacity 40</option>
            <option value={50}>Opacity 50</option>
            <option value={60}>Opacity 60</option>
            <option value={70}>Opacity 70</option>
            <option value={80}>Opacity 80</option>
            <option value={90}>Opacity 90</option>
          </select>
        </div>
        <GlassBox blur={glassBlur} opacity={glassOpacity} padding="4">
          <p>This is a GlassBox component with a frosted glass effect.</p>
        </GlassBox>
      </section>

      {/* BlurBox Demo */}
      <section>
        <h2 className="text-2xl font-bold mb-4">BlurBox Demo</h2>
        <div className="flex flex-wrap gap-4 mb-4">
          <select
            value={blurLevel}
            onChange={(e) => setBlurLevel(e.target.value as any)}
            className="p-2 border rounded"
          >
            <option value="sm">Blur SM</option>
            <option value="md">Blur MD</option>
            <option value="lg">Blur LG</option>
          </select>
        </div>
        <BlurBox blur={blurLevel} padding="4" background="blue-50">
          <p>This is a BlurBox component with background blur.</p>
        </BlurBox>
      </section>

      {/* InteractiveBox Demo */}
      <section>
        <h2 className="text-2xl font-bold mb-4">InteractiveBox Demo</h2>
        <div className="flex flex-wrap gap-4 mb-4">
          <select
            value={interactiveHoverEffect}
            onChange={(e) => setInteractiveHoverEffect(e.target.value as any)}
            className="p-2 border rounded"
          >
            <option value="none">No Hover Effect</option>
            <option value="scale">Scale</option>
            <option value="shadow">Shadow</option>
            <option value="opacity">Opacity</option>
          </select>
          <select
            value={interactiveFocusEffect}
            onChange={(e) => setInteractiveFocusEffect(e.target.value as any)}
            className="p-2 border rounded"
          >
            <option value="none">No Focus Effect</option>
            <option value="ring">Ring</option>
            <option value="shadow">Shadow</option>
          </select>
          <select
            value={interactiveActiveEffect}
            onChange={(e) => setInteractiveActiveEffect(e.target.value as any)}
            className="p-2 border rounded"
          >
            <option value="none">No Active Effect</option>
            <option value="scale">Scale</option>
            <option value="shadow">Shadow</option>
          </select>
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={interactiveDisabled}
              onChange={(e) => setInteractiveDisabled(e.target.checked)}
            />
            <span>Disabled</span>
          </label>
        </div>
        <InteractiveBox
          hoverEffect={interactiveHoverEffect}
          focusEffect={interactiveFocusEffect}
          activeEffect={interactiveActiveEffect}
          disabled={interactiveDisabled}
          padding="4"
          background="white"
        >
          <p>This is an InteractiveBox. Try interacting with me!</p>
        </InteractiveBox>
      </section>

      {/* AnimatedBox Demo */}
      <section>
        <h2 className="text-2xl font-bold mb-4">AnimatedBox Demo</h2>
        <div className="flex flex-wrap gap-4 mb-4">
          <select
            value={animatedEffect}
            onChange={(e) => setAnimatedEffect(e.target.value as any)}
            className="p-2 border rounded"
          >
            <option value="none">No Animation</option>
            <option value="fade-in">Fade In</option>
            <option value="slide-up">Slide Up</option>
            <option value="zoom-in">Zoom In</option>
          </select>
          <select
            value={animatedDuration}
            onChange={(e) => setAnimatedDuration(Number(e.target.value))}
            className="p-2 border rounded"
          >
            <option value={0.1}>Duration 0.1s</option>
            <option value={0.2}>Duration 0.2s</option>
            <option value={0.3}>Duration 0.3s</option>
            <option value={0.5}>Duration 0.5s</option>
            <option value={0.7}>Duration 0.7s</option>
            <option value={1}>Duration 1s</option>
          </select>
          <select
            value={animatedDelay}
            onChange={(e) => setAnimatedDelay(Number(e.target.value))}
            className="p-2 border rounded"
          >
            <option value={0}>Delay 0s</option>
            <option value={0.1}>Delay 0.1s</option>
            <option value={0.2}>Delay 0.2s</option>
            <option value={0.3}>Delay 0.3s</option>
            <option value={0.5}>Delay 0.5s</option>
          </select>
        </div>
        <AnimatedBox
          animation={animatedEffect}
          duration={animatedDuration}
          delay={animatedDelay}
          padding="4"
          background="gray-100"
          className="rounded-lg"
        >
          <p>This is an AnimatedBox. Watch me animate!</p>
        </AnimatedBox>
      </section>

      {/* DraggableBox Demo */}
      <section>
        <h2 className="text-2xl font-bold mb-4">DraggableBox Demo</h2>
        <div className="flex flex-wrap gap-4 mb-4">
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={draggableDisabled}
              onChange={(e) => setDraggableDisabled(e.target.checked)}
            />
            <span>Disabled</span>
          </label>
        </div>
        <DraggableBox
          disabled={draggableDisabled}
          padding="4"
          background="blue-50"
          rounded="lg"
        >
          <p>Drag me around!</p>
        </DraggableBox>
      </section>
    </div>
  );
};

export default DemoPage;
