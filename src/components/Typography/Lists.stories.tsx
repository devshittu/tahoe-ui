// src/components/Typography/Lists.stories.tsx

import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import {
  UnorderedList,
  OrderedList,
  ListItem,
  ListProps,
  ListItemProps,
} from './Lists';
import { AppProvider } from '@/providers/app';

const meta: Meta = {
  title: 'Typography/Lists',
  component: UnorderedList, // Primary component
  subcomponents: {
    // Explicitly cast subcomponents to ComponentType<any> to satisfy TypeScript
    OrderedList: OrderedList as React.ComponentType<any>,
    ListItem: ListItem as React.ComponentType<any>,
  },
  decorators: [
    (Story) => (
      <AppProvider>
        {/* Container with padding and max width for better visualization */}
        <div className="p-4 space-y-6 max-w-2xl border border-gray-200 rounded-lg">
          <Story />
        </div>
      </AppProvider>
    ),
  ],
  args: {
    className: '',
  },
  argTypes: {
    className: {
      control: 'text',
      description: 'Additional CSS classes for custom styling.',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: '""' },
      },
    },
  },
};

export default meta;
type Story = StoryObj<ListProps>;

/**
 * UnorderedList Default story demonstrating basic usage.
 */
export const UnorderedListDefault: Story = {
  render: (args: ListProps) => (
    <UnorderedList {...args}>
      <ListItem>First item</ListItem>
      <ListItem>Second item</ListItem>
      <ListItem>Third item</ListItem>
    </UnorderedList>
  ),
};

/**
 * OrderedList Default story demonstrating basic usage.
 */
export const OrderedListDefault: Story = {
  render: (args: ListProps) => (
    <OrderedList {...args}>
      <ListItem>First step</ListItem>
      <ListItem>Second step</ListItem>
      <ListItem>Third step</ListItem>
    </OrderedList>
  ),
};

/**
 * UnorderedList with Custom ClassName.
 */
export const UnorderedListCustomClassName: Story = {
  render: (args: ListProps) => (
    <UnorderedList {...args} className="list-disc text-blue-500">
      <ListItem>Custom styled item 1</ListItem>
      <ListItem>Custom styled item 2</ListItem>
      <ListItem>Custom styled item 3</ListItem>
    </UnorderedList>
  ),
};

/**
 * OrderedList with Custom ClassName.
 */
export const OrderedListCustomClassName: Story = {
  render: (args: ListProps) => (
    <OrderedList {...args} className="list-decimal text-green-500">
      <ListItem>Custom styled step 1</ListItem>
      <ListItem>Custom styled step 2</ListItem>
      <ListItem>Custom styled step 3</ListItem>
    </OrderedList>
  ),
};

/**
 * ListItem with Custom ClassName.
 */
export const ListItemCustomClassName: Story = {
  render: () => (
    <UnorderedList className="list-disc text-red-500">
      <ListItem className="font-bold">Bold item</ListItem>
      <ListItem className="italic">Italic item</ListItem>
      <ListItem className="underline">Underlined item</ListItem>
    </UnorderedList>
  ),
};

/**
 * Combined Props Example.
 * Demonstrates multiple props applied together for enhanced styling.
 */
export const CombinedProps: Story = {
  render: () => (
    <OrderedList className="list-decimal text-purple-600">
      <ListItem className="font-semibold">Step one</ListItem>
      <ListItem className="font-semibold">Step two</ListItem>
      <ListItem className="font-semibold">Step three</ListItem>
    </OrderedList>
  ),
};

/**
 * Showcase Story demonstrating multiple Lists usages together.
 */
export const Showcase: Story = {
  render: (args: ListProps) => (
    <div className="space-y-6">
      {/* 1) Default UnorderedList */}
      <UnorderedList {...args}>
        <ListItem>Default unordered item 1</ListItem>
        <ListItem>Default unordered item 2</ListItem>
        <ListItem>Default unordered item 3</ListItem>
      </UnorderedList>

      {/* 2) Default OrderedList */}
      <OrderedList {...args}>
        <ListItem>Default ordered step 1</ListItem>
        <ListItem>Default ordered step 2</ListItem>
        <ListItem>Default ordered step 3</ListItem>
      </OrderedList>

      {/* 3) Custom UnorderedList */}
      <UnorderedList {...args} className="list-disc text-blue-500">
        <ListItem>Custom styled unordered item 1</ListItem>
        <ListItem>Custom styled unordered item 2</ListItem>
        <ListItem>Custom styled unordered item 3</ListItem>
      </UnorderedList>

      {/* 4) Custom OrderedList */}
      <OrderedList {...args} className="list-decimal text-green-500">
        <ListItem>Custom styled ordered step 1</ListItem>
        <ListItem>Custom styled ordered step 2</ListItem>
        <ListItem>Custom styled ordered step 3</ListItem>
      </OrderedList>

      {/* 5) ListItems with Custom Styling */}
      <UnorderedList className="list-disc text-red-500">
        <ListItem className="font-bold">Bold item</ListItem>
        <ListItem className="italic">Italic item</ListItem>
        <ListItem className="underline">Underlined item</ListItem>
      </UnorderedList>

      {/* 6) Combined Props List */}
      <OrderedList className="list-decimal text-purple-600">
        <ListItem className="font-semibold">Step one</ListItem>
        <ListItem className="font-semibold">Step two</ListItem>
        <ListItem className="font-semibold">Step three</ListItem>
      </OrderedList>
    </div>
  ),
};
