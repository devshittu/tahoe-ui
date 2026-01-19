'use client';

import React, { useState, useEffect, forwardRef, memo } from 'react';
import { Button } from './Button';
import type { ToggleButtonProps } from './types';

/**
 * ToggleButton Component
 *
 * A stateful button that toggles between on/off states.
 * Visual styling changes based on toggle state.
 *
 * @example
 * ```tsx
 * import { ToggleButton } from '@tahoe-ui/button';
 *
 * <ToggleButton
 *   onToggle={(toggled) => console.log('Toggled:', toggled)}
 * >
 *   Toggle Me
 * </ToggleButton>
 *
 * <ToggleButton
 *   initialToggled={true}
 *   color="success"
 *   onToggle={setIsEnabled}
 * >
 *   {isEnabled ? 'Enabled' : 'Disabled'}
 * </ToggleButton>
 * ```
 */
const ToggleButton = forwardRef<HTMLButtonElement, ToggleButtonProps>(
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
        aria-pressed={toggled}
        {...rest}
      >
        {children}
      </Button>
    );
  },
);

ToggleButton.displayName = 'ToggleButton';

export default memo(ToggleButton);
export { ToggleButton };
