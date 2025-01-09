// // src/components/Button/IconButton.tsx
// 'use client';

// import React, {
//   forwardRef,
//   type ButtonHTMLAttributes,
//   type ReactNode,
// } from 'react';
// import clsx from 'clsx';
// import { twMerge } from 'tailwind-merge';
// import Button, { ButtonProps } from './Button';

// /**
//  * Defines the position of the icon within the button.
//  */
// type IconPosition = 'left' | 'right';

// /**
//  * The IconButtonProps extends the standard ButtonProps
//  * while customizing it for icon-only usage.
//  */
// type IconButtonProps = Omit<ButtonProps, 'children'> & {
//   /**
//    * Accessible label for the button. Essential for screen readers.
//    */
//   ariaLabel: string;
//   /**
//    * The icon to display within the button.
//    */
//   icon: ReactNode;
//   /**
//    * Position of the icon relative to the button's content.
//    * Defaults to 'left'.
//    */
//   iconPosition?: IconPosition;
// };

// /**
//  * IconButton Component
//  * A button designed to display only an icon, ensuring accessibility via aria-label.
//  */
// const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(
//   (
//     {
//       ariaLabel,
//       icon,
//       iconPosition = 'left',
//       className = '',
//       variant = 'solid',
//       color = 'primary',
//       size = 'md',
//       rounded = 'full', // Typically, icon buttons are circular
//       isLoading = false,
//       fullWidth = false,
//       focusable = false,
//       spinner,
//       disabled,
//       ...rest
//     },
//     ref
//   ) => {
//     // Ensure that ariaLabel is provided for accessibility
//     if (!ariaLabel) {
//       console.warn(
//         'Accessibility Warning: IconButton requires an ariaLabel for screen readers.'
//       );
//     }

//     /**
//      * Combine class names:
//      * - Base Button styles
//      * - Additional GlassButton styles if needed
//      * - Custom classes
//      */
//     const combinedClassName = twMerge(
//       clsx(
//         className,
//         // Override padding to make the button square
//         size === 'xs' && 'p-1',
//         size === 'sm' && 'p-2',
//         size === 'md' && 'p-3',
//         size === 'lg' && 'p-4',
//         size === 'xl' && 'p-5',
//         // Ensure the button is circular
//         rounded === 'full' && 'rounded-full'
//       )
//     );

//     /**
//      * Determine icon placement based on iconPosition prop.
//      */
//     const iconElement =
//       iconPosition === 'left' ? (
//         <span className="mr-0">{icon}</span>
//       ) : (
//         <span className="ml-0">{icon}</span>
//       );

//     return (
//       <Button
//         ref={ref}
//         variant={variant}
//         color={color}
//         size={size}
//         rounded={rounded}
//         isLoading={isLoading}
//         fullWidth={fullWidth}
//         focusable={focusable}
//         spinner={spinner}
//         disabled={disabled}
//         aria-label={ariaLabel}
//         className={combinedClassName}
//         {...rest}
//       >
//         {/* Render spinner or icon */}
//         {isLoading ? (
//           spinner || (
//             <svg
//               className="animate-spin h-5 w-5 text-current"
//               xmlns="http://www.w3.org/2000/svg"
//               fill="none"
//               viewBox="0 0 24 24"
//             >
//               <circle
//                 className="opacity-25"
//                 cx="12"
//                 cy="12"
//                 r="10"
//                 stroke="currentColor"
//                 strokeWidth="4"
//               ></circle>
//               <path
//                 className="opacity-75"
//                 fill="currentColor"
//                 d="M4 12a8 8 0 018-8v8H4z"
//               ></path>
//             </svg>
//           )
//         ) : (
//           iconElement
//         )}
//       </Button>
//     );
//   }
// );

// IconButton.displayName = 'IconButton';
// export default React.memo(IconButton);

// src/components/Button/IconButton.tsx
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
 * Defines the position of the icon within the button.
 */
type IconPosition = 'left' | 'right';

/**
 * The IconButtonProps extends the standard ButtonProps
 * while customizing it for icon-only usage.
 */
type IconButtonProps = Omit<ButtonProps, 'children'> & {
  /**
   * Accessible label for the button. Essential for screen readers.
   */
  ariaLabel: string;
  /**
   * The icon to display within the button.
   */
  icon: ReactNode;
  /**
   * Position of the icon relative to the button's content.
   * Defaults to 'left'.
   */
  iconPosition?: IconPosition;
};

/**
 * IconButton Component
 * A button designed to display only an icon, ensuring accessibility via aria-label.
 */
const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(
  (
    {
      ariaLabel,
      icon,
      iconPosition = 'left',
      className = '',
      variant = 'solid',
      color = 'primary',
      size = 'md',
      rounded = 'full', // Typically, icon buttons are circular
      isLoading = false,
      fullWidth = false,
      focusable = false,
      spinner,
      disabled,
      ...rest
    },
    ref,
  ) => {
    // Ensure that ariaLabel is provided for accessibility
    if (!ariaLabel) {
      console.warn(
        'Accessibility Warning: IconButton requires an ariaLabel for screen readers.',
      );
    }

    /**
     * Combine class names:
     * - Base Button styles
     * - Additional styles for IconButton
     * - Custom classes
     */
    const combinedClassName = twMerge(
      clsx(
        className,
        // Override padding to make the button square
        size === 'xs' && 'p-1',
        size === 'sm' && 'p-2',
        size === 'md' && 'p-3',
        size === 'lg' && 'p-4',
        size === 'xl' && 'p-5',
        // Ensure the button is circular
        rounded === 'full' && 'rounded-full',
        // Remove text-related styles since it's icon-only
        !icon && 'text-transparent',
      ),
    );

    /**
     * Determine icon placement based on iconPosition prop.
     */
    const iconElement =
      iconPosition === 'left' ? (
        <span className="mr-0">{icon}</span>
      ) : (
        <span className="ml-0">{icon}</span>
      );

    return (
      <Button
        ref={ref}
        variant={variant}
        color={color}
        size={size}
        rounded={rounded}
        isLoading={isLoading}
        fullWidth={fullWidth}
        focusable={focusable}
        spinner={spinner}
        disabled={disabled}
        aria-label={ariaLabel}
        className={combinedClassName}
        {...rest}
      >
        {/* Render spinner or icon */}
        {isLoading
          ? spinner || (
              <svg
                className="animate-spin h-5 w-5 text-current"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8v8H4z"
                ></path>
              </svg>
            )
          : iconElement}
      </Button>
    );
  },
);

IconButton.displayName = 'IconButton';
export default React.memo(IconButton);
