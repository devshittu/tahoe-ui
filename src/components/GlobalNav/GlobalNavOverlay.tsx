// File: src/components/GlobalNav/GlobalNavOverlay.tsx
import { cn } from '@/lib/utils';

interface GlobalNavOverlayProps {
  isOpen: boolean;
}

/**
 * GlobalNavOverlay Component
 * Renders a full-screen overlay with a subtle blur effect.
 * It appears when the mega menu is open, providing a visual focus
 * on the navigation and obscuring the content beneath.
 */
export default function GlobalNavOverlay({ isOpen }: GlobalNavOverlayProps) {
  return (
    <div
      className={cn(
        'fixed inset-0 z-40 transition-opacity duration-300',
        'bg-black/20 backdrop-blur-sm', // Subtle black overlay with blur
        {
          'opacity-100 visible': isOpen,
          'opacity-0 invisible': !isOpen,
        },
      )}
      aria-hidden={!isOpen} // Hide from accessibility tree when not open
    />
  );
}
