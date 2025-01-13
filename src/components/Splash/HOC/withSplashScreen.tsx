'use client';

import React, { useEffect, useState } from 'react';
import { useSplashStore, useSplashBaseStore } from '../store/splash-store';
import SplashScreen from '../splash-screen';

type WithSplashScreenProps = {
  children?: React.ReactNode;
};

export function withSplashScreen<P extends WithSplashScreenProps>(
  WrappedComponent: React.ComponentType<P>,
): React.FC<P> {
  const EnhancedComponent: React.FC<P> = (props: P) => {
    // We only read from the store once to avoid repeated triggers
    const store = useSplashBaseStore.getState();
    const [localMount, setLocalMount] = useState<boolean>(false);
    const [localLoading, setLocalLoading] = useState<boolean>(false);
    const [localDisplay, setLocalDisplay] = useState<'none' | 'block'>('block');

    // Single effect that runs once on mount
    useEffect(() => {
      // Mark store hasMounted if not already
      if (!store.hasMounted) {
        store.setHasMounted(true);
      }

      // If frequency is "always", always show
      if (store.config.frequency === 'always') {
        setLocalLoading(true);
        setLocalDisplay('none');
        setTimeout(() => {
          setLocalLoading(false);
          setLocalDisplay('block');
        }, store.config.displayDuration);
      } else if (!store.hasShown) {
        // "once-per-session" or "once-per-window" logic
        setLocalLoading(true);
        setLocalDisplay('none');
        setTimeout(() => {
          store.setHasShown(true);
          setLocalLoading(false);
          setLocalDisplay('block');
        }, store.config.displayDuration);
      }

      setLocalMount(true);
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []); // no dependencies => only run once

    if (!localMount) {
      // Not fully loaded the HOC logic => skip rendering
      return null;
    }

    return (
      <>
        {localLoading && <SplashScreen />}
        <div style={{ display: localDisplay }}>
          <WrappedComponent {...props} />
        </div>
      </>
    );
  };

  EnhancedComponent.displayName = `WithSplashScreen(${getDisplayName(
    WrappedComponent,
  )})`;
  return EnhancedComponent;
}

function getDisplayName<P>(WrappedComponent: React.ComponentType<P>) {
  return WrappedComponent.displayName || WrappedComponent.name || 'Component';
}
// src/components/Splash/HOC/withSplashScreen.tsx
