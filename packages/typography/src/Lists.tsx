'use client';

import React, { ReactNode } from 'react';
import { cn } from '@tahoe-ui/core';

/**
 * List Components - Semantic list elements
 *
 * UnorderedList, OrderedList, and ListItem for creating
 * properly styled semantic lists.
 *
 * @example
 * ```tsx
 * <UnorderedList>
 *   <ListItem>First item</ListItem>
 *   <ListItem>Second item</ListItem>
 * </UnorderedList>
 *
 * <OrderedList>
 *   <ListItem>Step one</ListItem>
 *   <ListItem>Step two</ListItem>
 * </OrderedList>
 * ```
 */

export interface ListProps {
  children: ReactNode;
  className?: string;
}

export interface ListItemProps {
  children: ReactNode;
  className?: string;
}

function UnorderedList({ children, className }: ListProps) {
  return (
    <ul
      className={cn(
        'list-disc pl-5 space-y-1',
        'text-gray-900 dark:text-gray-100',
        className,
      )}
    >
      {children}
    </ul>
  );
}

UnorderedList.displayName = 'UnorderedList';

function OrderedList({ children, className }: ListProps) {
  return (
    <ol
      className={cn(
        'list-decimal pl-5 space-y-1',
        'text-gray-900 dark:text-gray-100',
        className,
      )}
    >
      {children}
    </ol>
  );
}

OrderedList.displayName = 'OrderedList';

function ListItem({ children, className }: ListItemProps) {
  return <li className={cn(className)}>{children}</li>;
}

ListItem.displayName = 'ListItem';

export { UnorderedList, OrderedList, ListItem };
