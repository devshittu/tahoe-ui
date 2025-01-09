// src/components/Button/ToggleButton.tsx

'use client';

import React, { useState, useEffect, type ButtonHTMLAttributes } from 'react';
import Button, { ButtonProps } from './Button';

type ToggleButtonProps = ButtonProps & {
  /** Initial toggle state */
  initialToggled?: boolean;
  /** Callback when toggle state changes */
  onToggle?: (toggled: boolean) => void;
};

const ToggleButton = React.forwardRef<HTMLButtonElement, ToggleButtonProps>(
  (
    {
      initialToggled = false,
      onToggle,
      className = '',
      variant = 'solid',
      color = 'primary',
      children,
      ...rest
    },
    ref,
  ) => {
    const [toggled, setToggled] = useState(initialToggled);

    const handleToggle = () => {
      setToggled((prev) => {
        const newState = !prev;
        if (onToggle) onToggle(newState);
        return newState;
      });
    };

    useEffect(() => {
      if (onToggle) {
        onToggle(toggled);
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
      <Button
        ref={ref}
        variant={toggled ? 'solid' : 'outline'}
        color={toggled ? color : 'secondary'}
        onClick={handleToggle}
        className={className}
        {...rest}
      >
        {children}
      </Button>
    );
  },
);

ToggleButton.displayName = 'ToggleButton';
export default React.memo(ToggleButton);
