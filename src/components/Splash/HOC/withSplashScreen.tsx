'use client';
import React, { useEffect, useState } from 'react';
import { useSplashStore } from '../store/SplashScreenStore';
import SplashScreen from '../splash-screen';
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

    useEffect(() => {
      setHasMounted(true);

      if (!hasShownSplash) {
        setLoading(true);
        setDisplayStyle('none');

        setTimeout(() => {
          setHasShownSplash(true);
          setLoading(false);
          setDisplayStyle('block');
        }, 2000);
      }
    }, [hasShownSplash, setHasShownSplash]);

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
