// src/hooks/useImageStatus.ts
import { useState, useCallback } from 'react';

interface UseImageStatusProps {
  fallbackSrc?: string;
  onErrorFallback?: () => void;
}

export const useImageStatus = ({ fallbackSrc, onErrorFallback }: UseImageStatusProps) => {
  const [hasError, setHasError] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  const handleLoad = useCallback(() => {
    setIsLoaded(true);
  }, []);

  const handleError = useCallback(() => {
    if (fallbackSrc) {
      setHasError(true);
    } else {
      setHasError(true);
      if (onErrorFallback) onErrorFallback();
    }
  }, [fallbackSrc, onErrorFallback]);

  return { hasError, isLoaded, handleLoad, handleError };
};
