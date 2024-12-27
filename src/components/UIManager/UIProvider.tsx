// src/components/UIManager/UIProvider.tsx
'use client';

import React, { useEffect } from 'react';
import { useUIManager } from './uiStore';

export const UIProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const top = useUIManager((s) => s.top);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        const current = top();
        if (current?.onEscape) {
          current.onEscape();
          e.stopPropagation();
        }
      }
    };
    document.addEventListener('keydown', onKeyDown, true);
    return () => {
      document.removeEventListener('keydown', onKeyDown, true);
    };
  }, [top]);

  return <>{children}</>;
};
