'use client';

import React, { forwardRef, memo } from 'react';
import { cn } from '@tahoe-ui/core';
import { Button } from './Button';
import { type AnimatedButtonProps, ANIMATED_BUTTON_CLASSES } from './types';

/**
 * AnimatedButton Component
 *
 * A button with CSS animation effects applied.
 * Extends the base Button with pulse, shake, or bounce animations.
 *
 * @example
 * ```tsx
 * import { AnimatedButton } from '@tahoe-ui/button';
 *
 * <AnimatedButton animationType="pulse">
 *   Pulsing Button
 * </AnimatedButton>
 *
 * <AnimatedButton animationType="bounce" color="success">
 *   Bouncing Button
 * </AnimatedButton>
 * ```
 */
const AnimatedButton = forwardRef<HTMLButtonElement, AnimatedButtonProps>(
  ({ animationType, className, ...rest }, ref) => {
    return (
      <Button
        ref={ref}
        className={cn(
          animationType && ANIMATED_BUTTON_CLASSES[animationType],
          className,
        )}
        {...rest}
      />
    );
  },
);

AnimatedButton.displayName = 'AnimatedButton';

export default memo(AnimatedButton);
export { AnimatedButton };
