// // src/components/Button/GlassButton.tsx
// 'use client';

// import React, {
//   forwardRef,
//   type ButtonHTMLAttributes,
//   type ReactNode,
// } from 'react';
// import clsx from 'clsx';
// import { twMerge } from 'tailwind-merge';
// import Button from './Button';

// type ButtonRounded = 'none' | 'sm' | 'md' | 'lg' | 'full';

// type GlassButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
//   /**
//    * The visual variant: `solid`, `outline`, or `text`.
//    * Defaults to `solid`.
//    */
//   variant?: 'solid' | 'outline' | 'text';
//   /**
//    * The size: `xs`, `sm`, `md`, `lg`, or `xl`.
//    * Defaults to `md`.
//    */
//   size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
//   /**
//    * If true, shows a loading indicator and disables clicks.
//    */
//   isLoading?: boolean;
//   /**
//    * Makes the button span the full width of its container.
//    */
//   fullWidth?: boolean;
//   /**
//    * Optionally override the default spinner with your own element.
//    */
//   spinner?: ReactNode;
//   /**
//    * An optional icon to display to the left of the text.
//    */
//   leftIcon?: ReactNode;
//   /**
//    * An optional icon to display to the right of the text.
//    */
//   rightIcon?: ReactNode;
//   /**
//    * Control how rounded the corners are. Defaults to 'md'.
//    */
//   rounded?: ButtonRounded;
// };

// const GlassButton = forwardRef<HTMLButtonElement, GlassButtonProps>(
//   (props, ref) => {
//     const {
//       className,
//       variant = 'solid',
//       size = 'md',
//       rounded = 'md',
//       ...rest
//     } = props;

//     const glassStyles = clsx(
//       'bg-white bg-opacity-20 backdrop-filter backdrop-blur-lg border border-white border-opacity-10',
//       'shadow-lg',
//       'hover:bg-opacity-30',
//       'transition duration-200 ease-in-out',
//       {
//         'focus:ring-2 focus:ring-blue-500 focus:ring-offset-2':
//           !props.disabled && !props.isLoading,
//       },
//     );

//     const combinedClassName = twMerge(glassStyles, className);

//     return (
//       <Button
//         {...rest}
//         ref={ref}
//         variant={variant}
//         size={size}
//         rounded={rounded}
//         className={combinedClassName}
//       />
//     );
//   },
// );

// GlassButton.displayName = 'GlassButton';

// export default React.memo(GlassButton);

// src/components/Button/GlassButton.tsx
'use client';

import React, {
  forwardRef,
  type ButtonHTMLAttributes,
  type ReactNode,
} from 'react';
import clsx from 'clsx';
import { twMerge } from 'tailwind-merge';
import Button, { ButtonProps } from './Button';

/**
 * Defines how rounded the corners are.
 */
type ButtonRounded = 'none' | 'sm' | 'md' | 'lg' | 'full';

/**
 * The GlassButtonProps extends the standard ButtonProps
 * while adding any specific props if needed in the future.
 */
type GlassButtonProps = ButtonProps & {
  /**
   * Control how rounded the corners are. Defaults to 'md'.
   */
  rounded?: ButtonRounded;
};

/**
 * GlassButton Component
 * Applies glassmorphism styles to the foundational Button component.
 */
const GlassButton = forwardRef<HTMLButtonElement, GlassButtonProps>(
  (
    {
      className,
      variant = 'solid',
      color = 'primary',
      size = 'md',
      rounded = 'md',
      isLoading = false,
      fullWidth = false,
      focusable = false,
      ...rest
    },
    ref,
  ) => {
    /**
     * Glassmorphism Styles:
     * - Semi-transparent background
     * - Backdrop blur
     * - Subtle border
     * - Soft shadow
     * - Hover effects
     */
    const glassStyles = clsx(
      'bg-white bg-opacity-20 backdrop-filter backdrop-blur-lg border border-white border-opacity-10',
      'shadow-lg',
      'hover:bg-opacity-30',
      'transition duration-200 ease-in-out',
      {
        'focus:ring-2 focus:ring-blue-500 focus:ring-offset-2':
          focusable && !isLoading && !rest.disabled,
      },
    );

    /**
     * Combine Glass Styles with existing className
     */
    const combinedClassName = twMerge(glassStyles, className);

    return (
      <Button
        {...rest}
        ref={ref}
        variant={variant}
        color={color}
        size={size}
        rounded={rounded}
        isLoading={isLoading}
        fullWidth={fullWidth}
        focusable={focusable}
        className={combinedClassName}
      />
    );
  },
);

GlassButton.displayName = 'GlassButton';
export default React.memo(GlassButton);
