'use client';

import React, { forwardRef, ElementType, ReactNode } from 'react';
import clsx from 'clsx';

type ThemeType = 'light' | 'dark' | 'custom';

export type BaseBoxProps = {
  children: ReactNode;
  as?: ElementType;
  theme?: ThemeType;
  role?: string;
  ariaLabel?: string;
  className?: string;

  /** Sizing */
  width?: 'full' | '1/2' | '1/3' | '1/4' | 'auto';
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

const BaseBox = forwardRef<HTMLElement, BaseBoxProps>(
  (
    {
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
    },
    ref,
  ) => {
    const classes = clsx(
      theme === 'light' ? 'text-black bg-white' : '',
      theme === 'dark' ? 'text-white bg-gray-800' : '',
      className,
      width && `w-${width}`,
      height && `h-${height}`,
      minWidth && `min-w-${minWidth}`,
      minHeight && `min-h-${minHeight}`,
      maxWidth && `max-w-${maxWidth}`,
      maxHeight && `max-h-${maxHeight}`,
      padding && `p-${padding}`,
      margin && `m-${margin}`,
      border && `border-${border}`,
      borderColor && `border-${borderColor}`,
      borderStyle && `border-${borderStyle}`,
      background && `bg-${background}`,
      shadow && `shadow-${shadow}`,
      rounded && `rounded-${rounded}`,
      position && position,
      top && `top-${top}`,
      right && `right-${right}`,
      bottom && `bottom-${bottom}`,
      left && `left-${left}`,
      overflow && `overflow-${overflow}`,
    );

    return (
      <Component
        ref={ref}
        className={classes}
        role={role}
        aria-label={ariaLabel}
        {...rest}
      >
        {children}
      </Component>
    );
  },
);

BaseBox.displayName = 'BaseBox';

export default BaseBox;

// src/components/Box/BaseBox.tsx
