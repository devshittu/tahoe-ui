// src/components/Typography/Lists.tsx
'use client';

import React, { ReactNode } from 'react';
import clsx from 'clsx';

type ListProps = {
  children: ReactNode;
  className?: string;
};

export const UnorderedList = ({ children, className }: ListProps) => (
  <ul className={clsx('list-disc pl-5', className)}>{children}</ul>
);

export const OrderedList = ({ children, className }: ListProps) => (
  <ol className={clsx('list-decimal pl-5', className)}>{children}</ol>
);

type ListItemProps = {
  children: ReactNode;
  className?: string;
};

export const ListItem = ({ children, className }: ListItemProps) => (
  <li className={clsx(className)}>{children}</li>
);
