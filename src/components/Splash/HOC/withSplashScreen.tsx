'use client';
import React, { useEffect, useState } from 'react';
import { useSplashStore } from '../store/SplashScreenStore';
import SplashScreen from '../SplashScreen';
import { SplashScreenConfig } from '../types';

interface WithSplashScreenProps {
  children?: React.ReactNode;
  /** Optional configuration for splash screen customizations */
  splashConfig?: SplashScreenConfig;
}

const withSplashScreen = <P extends WithSplashScreenProps>(
  WrappedComponent: React.ComponentType<P>,
): React.FC<P> => {
  const EnhancedComponent: React.FC<P> = (props: P) => {
    const { splashConfig } = props;
    const [hasMounted, setHasMounted] = useState(false);
    const { hasShownSplash, setHasShownSplash } = useSplashStore();

    const [loading, setLoading] = useState(false);
    const [displayStyle, setDisplayStyle] = useState('block');

    // Extract animation duration from config or fallback to default
    const animationDuration = splashConfig?.animationDuration
      ? parseFloat(splashConfig.animationDuration) * 1000 // Convert "2.5s" to 2500ms
      : 2000; // Default to 2 seconds if not provided

    useEffect(() => {
      setHasMounted(true);

      if (!hasShownSplash) {
        setLoading(true);
        setDisplayStyle('none');

        setTimeout(() => {
          setHasShownSplash(true);
          setLoading(false);
          setDisplayStyle('block');
        }, animationDuration);
      }
    }, [hasShownSplash, setHasShownSplash, animationDuration]);

    if (!hasMounted) {
      return null;
    }

    return (
      <>
        {loading && <SplashScreen config={splashConfig} />}
        <div style={{ display: displayStyle }}>
          {React.createElement<React.ComponentProps<typeof WrappedComponent>>(
            WrappedComponent,
            props,
          )}
        </div>
      </>
    );
  };

  EnhancedComponent.displayName = `WithSplashScreen(${getDisplayName(
    WrappedComponent,
  )})`;
  return EnhancedComponent;
};

function getDisplayName<P>(WrappedComponent: React.ComponentType<P>) {
  return WrappedComponent.displayName || WrappedComponent.name || 'Component';
}

export default withSplashScreen;

// Path: src/components/SplashScreen/HOC/withSplashScreen.tsx
