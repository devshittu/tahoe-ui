'use client';

import React, { ReactNode } from 'react';
import Text from './Text';
import clsx from 'clsx';

export type BadgeProps = {
  children: ReactNode;
  variant?: 'filled' | 'outlined' | 'ghost';
  color?: 'primary' | 'secondary' | 'accent' | string;
  size?: 'sm' | 'md';
  className?: string;
};

const variantClasses: Record<NonNullable<BadgeProps['variant']>, string> = {
  filled: 'bg-blue-500 text-white',
  outlined: 'border border-blue-500 text-blue-500',
  ghost: 'text-blue-500',
};

const sizeClasses: Record<NonNullable<BadgeProps['size']>, string> = {
  sm: 'text-xs px-2 py-1',
  md: 'text-sm px-3 py-1.5',
};

const Badge = ({
  children,
  variant = 'filled',
  color = 'primary',
  size = 'sm',
  className = '',
}: BadgeProps) => {
  return (
    <span
      className={clsx(
        'inline-flex items-center justify-center rounded-full',
        variantClasses[variant],
        sizeClasses[size],
        className,
      )}
    >
      <Text color={variant === 'filled' ? 'white' : color}>{children}</Text>
    </span>
  );
};

export default Badge;
// src/components/Typography/Badge.tsx
