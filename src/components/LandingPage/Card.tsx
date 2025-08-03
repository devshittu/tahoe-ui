// File: src/components/LandingPage/Card.tsx
import Image from 'next/image';
import { type ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface CardItem {
  id: string;
  title: string;
  description: string;
  imageSrc: string;
  link: string;
  // svgPath: ReactNode; // No longer needed, replaced by icon component
  iconComponent: ReactNode; // New prop for React Icon component
}

interface CardProps {
  item: CardItem;
  isActive: boolean;
}

// Extend React.CSSProperties to include custom CSS variables
declare module 'react' {
  interface CSSProperties {
    '--easing'?: string;
    '--speed'?: string;
    // You might also need this if it's used directly in the style prop of an element
    // within Card.tsx that isn't already covered by a global declaration.
    '--base'?: string;
  }
}
/**
 * Card Component
 * Renders an individual card with an image, title, description, and link.
 * Applies active/inactive states for visual transitions, mimicking the original snippet's behavior,
 * including image vignette, correct title alignment, animation delays, and proper text/link spacing.
 * Uses react-icons for cleaner SVG integration.
 */
export default function Card({ item, isActive }: CardProps) {
  // Define custom CSS variables for transitions, mirroring the original snippet
  const easingCubicBezier = 'cubic-bezier(0.1538,0.0,0.9961,1.0)';
  const speed = '0.6s';
  const transitionDelay = `calc(${speed} * 0.25)`;

  const imageClasses = cn(
    'absolute inset-0 h-full w-full object-cover',
    `transition-[filter,transform] duration-[${speed}] ease-[${easingCubicBezier}]`,
  );

  const textAndSvgTransitionClasses = cn(
    `transition-opacity duration-[${speed}] ease-[${easingCubicBezier}]`,
  );

  const linkClasses =
    'absolute bottom-4 h-12 w-fit text-base leading-none text-inherit focus-visible:outline-none focus-visible:underline focus-visible:underline-offset-4 hover:underline hover:underline-offset-4 flex items-center justify-center'; // Added flex for touch target

  return (
    <article
      className={cn(
        'relative h-full w-full font-mono flex flex-col justify-end gap-4 p-4 overflow-hidden', // article now w-full h-full
        'absolute top-0 left-0', // Position article within li
      )}
      // Define custom properties for the easing and speed for inner elements
      style={{
        '--easing': easingCubicBezier,
        '--speed': speed,
      }}
    >
      <Image
        src={item.imageSrc}
        alt={`Image for ${item.title}`}
        width={720}
        height={720}
        className={cn(
          imageClasses,
          'pointer-events-none', // Image should not capture pointer events
          {
            'grayscale brightness-150 scale-110': !isActive, // Initial state when not active
            'grayscale-0 brightness-100 scale-100': isActive, // Active state
          },
        )}
        style={{
          maskImage: 'radial-gradient(100% 100% at 100% 0, #fff, #0000)', // Vignette
          transitionDelay: isActive ? transitionDelay : '0s', // Apply transition delay only when becoming active
        }}
        onError={(e) => {
          e.currentTarget.src = `https://placehold.co/720x720/cccccc/333333?text=Image+Error`;
        }}
      />
      <h3
        className={cn(
          'absolute top-4 whitespace-nowrap text-sm font-light uppercase opacity-60',
          textAndSvgTransitionClasses, // Apply unified transition class
          {
            'opacity-100': isActive,
          },
        )}
        style={{
          transformOrigin: '0% 50%',
          transform: 'rotate(90deg)', // Ensure rotate is applied
          left: 'calc(var(--base) * 0.5 - 9px)', // Corrected left alignment from original snippet
        }}
      >
        {item.title}
      </h3>
      {/* React Icon Component */}
      <div
        className={cn(
          'absolute left-4 z-10', // Position icon absolutely within article
          'h-6 w-6 fill-none opacity-60', // Base styling for icon container
          textAndSvgTransitionClasses, // Apply unified transition class for opacity
          {
            'opacity-100': isActive,
          },
        )}
        style={{
          // Position the icon relative to the bottom of the content area
          // This ensures it doesn't move upwards on un-hover.
          bottom: 'calc(1rem + 1.5rem + 1rem + 1rem)', // Padding + link height + description line-height + gap
          // The original snippet's SVG was positioned relative to the article bottom,
          // and its movement was tied to the article's transform.
          // Here, we fix its position relative to the article's bottom for stability.
        }}
      >
        {item.iconComponent}
      </div>

      <p
        className={cn(
          textAndSvgTransitionClasses,
          'text-sm text-gray-700 dark:text-gray-300',
          {
            'opacity-0': !isActive,
            'opacity-80': isActive, // Original snippet used 0.8 opacity for active text
          },
        )}
        style={{
          transitionDelay: isActive ? transitionDelay : '0s', // Apply delay on active
          // Adjusted bottom margin/padding to prevent overlap with "Watch now"
          marginBottom: 'calc(1rem + 18px + 1rem)', // Link height + bottom padding
        }}
      >
        {item.description}
      </p>
      <a
        href={item.link}
        className={cn(linkClasses, textAndSvgTransitionClasses, {
          'opacity-0': !isActive,
          'opacity-100': isActive,
        })}
        style={{
          transitionDelay: isActive ? transitionDelay : '0s', // Apply delay on active
          left: 'calc(var(--base) * 0.5)', // Align link text with original snippet's span translate
        }}
      >
        <span>Watch now</span>
      </a>
    </article>
  );
}
