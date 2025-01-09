// src/components/Button/AnimatedButton.tsx

'use client';

import React, { type ButtonHTMLAttributes } from 'react';
import Button, { ButtonProps } from './Button';

export type AnimatedButtonProps = ButtonProps & {
  /** Type of animation */
  animationType?: 'pulse' | 'shake' | 'bounce';
};

const animationClasses = {
  pulse: 'animate-pulse',
  shake: 'animate-shake',
  bounce: 'animate-bounce',
};

const AnimatedButton = React.forwardRef<HTMLButtonElement, AnimatedButtonProps>(
  ({ animationType, className = '', ...rest }, ref) => {
    return (
      <Button
        ref={ref}
        className={`${
          animationType ? animationClasses[animationType] : ''
        } ${className}`}
        {...rest}
      />
    );
  },
);

AnimatedButton.displayName = 'AnimatedButton';
export default React.memo(AnimatedButton);
