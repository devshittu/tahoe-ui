// File: components/LandingPage/CraftUiCards.tsx
'use client';

import { useState, useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';
import type { ReactNode } from 'react';
import Card from './Card';
import BackgroundGrid from './BackgroundGrid';

// Import react-icons equivalents
import {
  FiTool, // For 'The Craft'
  FiFilm, // For 'CSS Animation' (approximation)
  FiFilter, // For 'SVG Filters'
  FiMousePointer, // For 'Scroll Animation' (approximation)
  FiPenTool, // For 'Taming Canvas' (approximation)
  FiLayout, // For 'Layout Tricks' (approximation)
  FiClock, // For 'Mastering Time'
} from 'react-icons/fi';

// Extend React.CSSProperties to include custom CSS variables
declare module 'react' {
  interface CSSProperties {
    '--gap'?: string;
    '--base'?: string;
  }
}

// Data structure for each card item
interface CardItem {
  id: string;
  title: string;
  description: string;
  imageSrc: string;
  link: string;
  // svgPath: ReactNode; // Removed
  iconComponent: ReactNode; // New prop
}

// Static data for the cards
const cardItems: CardItem[] = [
  {
    id: 'the-craft',
    title: 'The Craft',
    description:
      'Gain the confidence to build anything you envision, transforming motion, interaction, and design principles into second nature.',
    imageSrc: 'https://picsum.photos/720/720?random=12',
    link: '#',
    iconComponent: <FiTool size={18} />,
  },
  {
    id: 'css-animation',
    title: 'CSS Animation',
    description:
      'Master CSS animations from your very first set of @keyframes right through to things no one else ever teaches you.',
    imageSrc: 'https://picsum.photos/720/720?random=17',
    link: '#',
    iconComponent: <FiFilm size={18} />,
  },
  {
    id: 'svg-filters',
    title: 'SVG Filters',
    description:
      'Shaders on a budget. Learn how to use noise to your advantage whilst making flames and stickers.',
    imageSrc: 'https://picsum.photos/720/720?random=19',
    link: '#',
    iconComponent: <FiFilter size={18} />,
  },
  {
    id: 'scroll-animation',
    title: 'Scroll Animation',
    description:
      'Take your users on a journey with the joy of tasteful scroll animation. You might not even need JavaScript.',
    imageSrc: 'https://picsum.photos/720/720?random=42',
    link: '#',
    iconComponent: <FiMousePointer size={18} />,
  },
  {
    id: 'taming-canvas',
    title: 'Taming Canvas',
    description:
      "Grasp how to tame the pixel playground and when to do so. Whilst building with 'Performance Driven Development'.",
    imageSrc: 'https://picsum.photos/720/720?random=128',
    link: '#',
    iconComponent: <FiPenTool size={18} />,
  },
  {
    id: 'layout-tricks',
    title: 'Layout Tricks',
    description:
      'Do you really need a library for that? Sometimes stepping back and rethinking the problem yields a nifty solution.',
    imageSrc: 'https://picsum.photos/720/720?random=56',
    link: '#',
    iconComponent: <FiLayout size={18} />,
  },
  {
    id: 'mastering-time',
    title: 'Mastering Time',
    description:
      "It's not all just easings and compositions. Time plays a crucial part in various UI patterns that might not seem obvious at first.",
    imageSrc: 'https://picsum.photos/720/720?random=39',
    link: '#',
    iconComponent: <FiClock size={18} />,
  },
];

export default function CraftUiCards() {
  const [activeCardId, setActiveCardId] = useState<string | null>(
    cardItems[0].id, // Initialize with the first card active
  );
  const listRef = useRef<HTMLUListElement>(null); // Ref for the ul element

  // This effect handles the dynamic grid-template-columns for the "enlarging" effect
  useEffect(() => {
    const list = listRef.current; // Use the ref
    if (!list) return;

    const items = Array.from(list.querySelectorAll('li')) as HTMLLIElement[];

    const updateGridColumns = () => {
      const activeIndex = cardItems.findIndex(
        (item) => item.id === activeCardId,
      );
      if (activeIndex === -1) return;

      const cols = new Array(items.length)
        .fill(null)
        .map((_, i) => (activeIndex === i ? '10fr' : '1fr'))
        .join(' ');

      list.style.setProperty('grid-template-columns', cols);
    };

    updateGridColumns(); // Initial setup

    // Event listeners for interaction
    const handleInteraction = (event: Event) => {
      const closest = (event.target as HTMLElement).closest('li');
      if (closest) {
        const index = items.indexOf(closest);
        if (index !== -1) {
          setActiveCardId(cardItems[index].id);
        }
      }
    };

    // Using `pointerenter` for hover and `focusin` for keyboard navigation
    list.addEventListener('pointerenter', handleInteraction, true);
    list.addEventListener('focusin', handleInteraction, true);

    // Add resize listener to re-sync grid columns if window resizes
    const resyncOnResize = () => {
      updateGridColumns();
    };
    window.addEventListener('resize', resyncOnResize);

    // Cleanup listeners
    return () => {
      list.removeEventListener('pointerenter', handleInteraction, true);
      list.removeEventListener('focusin', handleInteraction, true);
      window.removeEventListener('resize', resyncOnResize);
    };
  }, [activeCardId]); // Re-run effect when activeCardId changes

  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center p-4 font-sans text-gray-900 dark:text-gray-100">
      {/* Background Grid Component */}
      <BackgroundGrid />

      {/* Theme Toggle is handled in app/layout.tsx */}

      <header className="mb-8 text-center">
        <h1 className="text-4xl font-extrabold leading-tight text-gray-900 dark:text-white sm:text-5xl lg:text-6xl">
          The Craft of UI
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-balance font-mono text-base text-gray-600 dark:text-gray-400 sm:text-lg">
          Unlock the art and science of interface development. This isn’t just
          about pushing pixels or following documentation — it’s about mastering
          the tools, understanding the nuances, and shaping experiences with
          intention.
        </p>
      </header>

      {/* The main interactive list/grid */}
      <ul
        ref={listRef}
        className={cn(
          'craft-ui-cards-list', // Custom class for JS targeting
          'grid w-full max-w-5xl gap-2', // Tailwind grid setup
          'list-none p-0 m-0', // Reset list styles
          'transition-[grid-template-columns] duration-[0.6s] ease-[cubic-bezier(0.1538,0.0,0.9961,1.0)]', // Custom easing
          'h-[min(40dvh,474px)]', // Height from original ul
        )}
        // Custom CSS variables for the grid behavior.
        style={{
          '--gap': '8px',
          '--base': '80px', // Approximated from clamp(2rem, 8cqi, 80px)
        }}
        role="tablist" // ARIA role for a set of interactive tabs/items
      >
        {cardItems.map((item) => (
          <li
            key={item.id}
            data-active={activeCardId === item.id ? 'true' : 'false'}
            className={cn(
              'relative overflow-hidden min-w-[var(--base)] rounded-lg border border-gray-300 bg-white dark:border-gray-700 dark:bg-black',
              'transition-all duration-[0.6s] ease-[cubic-bezier(0.1538,0.0,0.9961,1.0)]', // Apply transition to li itself
              'focus-within:ring-2 focus-within:ring-blue-500 focus-within:ring-offset-2 focus-within:outline-none', // Focus styling
            )}
            tabIndex={0} // Make list items focusable for keyboard navigation
            role="tab" // ARIA role for individual tab/item
            aria-selected={activeCardId === item.id ? 'true' : 'false'}
            id={`card-${item.id}`} // Unique ID for ARIA
            aria-controls={`panel-${item.id}`} // Link to potential panel (not implemented here)
          >
            <Card item={item} isActive={activeCardId === item.id} />
          </li>
        ))}
      </ul>

      <a
        className="fixed bottom-4 left-4 z-20 flex h-12 w-12 items-center justify-center rounded-full bg-blue-500 p-2 text-white shadow-lg transition-opacity duration-200 hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
        href="https://twitter.com/intent/follow?screen_name=jh3yy"
        target="_blank"
        rel="noreferrer noopener"
        aria-label="Follow jh3yy on Twitter"
      >
        <svg
          className="h-full w-full"
          viewBox="0 0 969 955"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle
            cx="161.191"
            cy="320.191"
            r="133.191"
            stroke="currentColor"
            strokeWidth="20"
          ></circle>
          <circle
            cx="806.809"
            cy="320.191"
            r="133.191"
            stroke="currentColor"
            strokeWidth="20"
          ></circle>
          <circle
            cx="695.019"
            cy="587.733"
            r="31.4016"
            fill="currentColor"
          ></circle>
          <circle
            cx="272.981"
            cy="587.733"
            r="31.4016"
            fill="currentColor"
          ></circle>
          <path
            d="M564.388 712.083C564.388 743.994 526.035 779.911 483.372 779.911C440.709 779.911 402.356 743.994 402.356 712.083C402.356 680.173 440.709 664.353 483.372 664.353C526.035 664.353 564.388 680.173 564.388 712.083Z"
            fill="currentColor"
          ></path>
          <rect
            x="310.42"
            y="448.31"
            width="343.468"
            height="51.4986"
            fill="#FF1E1E"
          ></rect>
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M745.643 288.24C815.368 344.185 854.539 432.623 854.539 511.741H614.938V454.652C614.938 433.113 597.477 415.652 575.938 415.652H388.37C366.831 415.652 349.37 433.113 349.37 454.652V511.741L110.949 511.741C110.949 432.623 150.12 344.185 219.845 288.24C289.57 232.295 384.138 200.865 482.744 200.865C581.35 200.865 675.918 232.295 745.643 288.24Z"
            fill="currentColor"
          ></path>
        </svg>
      </a>
    </div>
  );
}
