// src/components/Box/BaseBox.tsx
'use client';

import React, { ElementType, ReactNode } from 'react';
import clsx from 'clsx';

type ThemeType = 'light' | 'dark' | 'custom';

type BaseBoxProps = {
  children: ReactNode;
  as?: ElementType;
  theme?: ThemeType;
  role?: string;
  ariaLabel?: string;
  className?: string;

  /** Sizing */
  width?: 'full' | '1/2' | '1/3' | '1/4';
  height?: 'full' | 'screen' | 'auto';
  minWidth?: '0' | 'full';
  minHeight?: '0' | 'screen';
  maxWidth?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';
  maxHeight?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';

  /** Spacing */
  padding?: '0' | '1' | '2' | '4' | '6' | '8';
  margin?: '0' | '1' | '2' | '4' | '6' | '8';

  /** Borders */
  border?: 'none' | 'sm' | 'md' | 'lg';
  borderColor?: 'gray-200' | 'gray-300' | 'blue-500';
  borderStyle?: 'solid' | 'dashed' | 'dotted';

  /** Background & Shadows */
  background?: 'white' | 'gray-100' | 'blue-50';
  shadow?: 'sm' | 'md' | 'lg' | 'xl';
  rounded?: 'none' | 'sm' | 'md' | 'lg' | 'full';

  /** Position & Overflow */
  position?: 'static' | 'relative' | 'absolute' | 'fixed' | 'sticky';
  top?: string;
  right?: string;
  bottom?: string;
  left?: string;
  overflow?: 'visible' | 'hidden' | 'scroll' | 'auto';
} & React.HTMLAttributes<HTMLElement>;

/** Tailwind Mappings */
const widthClasses = { full: 'w-full', '1/2': 'w-1/2', '1/3': 'w-1/3', '1/4': 'w-1/4' };
const heightClasses = { full: 'h-full', screen: 'h-screen', auto: 'h-auto' };
const minWidthClasses = { '0': 'min-w-0', full: 'min-w-full' };
const minHeightClasses = { '0': 'min-h-0', screen: 'min-h-screen' };
const maxWidthClasses = { xs: 'max-w-xs', sm: 'max-w-sm', md: 'max-w-md', lg: 'max-w-lg', xl: 'max-w-xl', '2xl': 'max-w-2xl' };
const maxHeightClasses = { xs: 'max-h-xs', sm: 'max-h-sm', md: 'max-h-md', lg: 'max-h-lg', xl: 'max-h-xl', '2xl': 'max-h-2xl' };
const paddingClasses = { '0': 'p-0', '1': 'p-1', '2': 'p-2', '4': 'p-4', '6': 'p-6', '8': 'p-8' };
const marginClasses = { '0': 'm-0', '1': 'm-1', '2': 'm-2', '4': 'm-4', '6': 'm-6', '8': 'm-8' };
const borderClasses = { none: 'border-0', sm: 'border', md: 'border-2', lg: 'border-4' };
const borderColorClasses = { 'gray-200': 'border-gray-200', 'gray-300': 'border-gray-300', 'blue-500': 'border-blue-500' };
const borderStyleClasses = { solid: 'border-solid', dashed: 'border-dashed', dotted: 'border-dotted' };
const backgroundClasses = { white: 'bg-white', 'gray-100': 'bg-gray-100', 'blue-50': 'bg-blue-50' };
const shadowClasses = { sm: 'shadow-sm', md: 'shadow-md', lg: 'shadow-lg', xl: 'shadow-xl' };
const roundedClasses = { none: 'rounded-none', sm: 'rounded-sm', md: 'rounded-md', lg: 'rounded-lg', full: 'rounded-full' };
const positionClasses = { static: 'static', relative: 'relative', absolute: 'absolute', fixed: 'fixed', sticky: 'sticky' };

/** Basic Theme Handling */
const themeClasses: Record<ThemeType, string> = {
  light: 'text-black bg-white',
  dark: 'text-white bg-gray-800',
  custom: '',
};

const BaseBox = ({
  children,
  as: Component = 'div',
  theme = 'custom',
  role,
  ariaLabel,
  className,
  width,
  height,
  minWidth,
  minHeight,
  maxWidth,
  maxHeight,
  padding,
  margin,
  border,
  borderColor,
  borderStyle,
  background,
  shadow,
  rounded,
  position,
  top,
  right,
  bottom,
  left,
  overflow,
  ...rest
}: BaseBoxProps) => {
  const classes = clsx(
    themeClasses[theme],
    width && widthClasses[width],
    height && heightClasses[height],
    minWidth && minWidthClasses[minWidth],
    minHeight && minHeightClasses[minHeight],
    maxWidth && maxWidthClasses[maxWidth],
    maxHeight && maxHeightClasses[maxHeight],
    padding && paddingClasses[padding],
    margin && marginClasses[margin],
    border && borderClasses[border],
    borderColor && borderColorClasses[borderColor],
    borderStyle && borderStyleClasses[borderStyle],
    background && backgroundClasses[background],
    shadow && shadowClasses[shadow],
    rounded && roundedClasses[rounded],
    position && positionClasses[position],
    top && `top-${top}`,
    right && `right-${right}`,
    bottom && `bottom-${bottom}`,
    left && `left-${left}`,
    overflow && `overflow-${overflow}`,
    className
  );

  return (
    <Component className={classes} role={role} aria-label={ariaLabel} {...rest}>
      {children}
    </Component>
  );
};

export default BaseBox;
