// File: components/GlobalNav/GlobalNavSearch.tsx
// import { FiSearch, FiX } from 'react-icons/fi'; // Removed direct imports
import { iconMap } from '@/lib/iconMap'; // Import iconMap
import { cn } from '@/lib/utils';
import { useState, useRef, useEffect } from 'react';

interface GlobalNavSearchProps {
  isOpen: boolean;
  onClose: () => void;
}

/**
 * GlobalNavSearch Component
 * Provides a search input field within the global navigation.
 * It expands when active and includes a clear button.
 * Uses iconMap for rendering icons.
 */
export default function GlobalNavSearch({
  isOpen,
  onClose,
}: GlobalNavSearchProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  const FiSearch = iconMap['FiSearch'];
  const FiX = iconMap['FiX'];

  useEffect(() => {
    if (isOpen) {
      inputRef.current?.focus();
    }
  }, [isOpen]);

  const handleClear = () => {
    setSearchTerm('');
    inputRef.current?.focus();
  };

  return (
    <div
      className={cn(
        'absolute inset-0 z-50 flex items-center justify-center bg-white dark:bg-black',
        'transition-transform duration-300 ease-in-out',
        {
          'translate-y-full opacity-0 invisible': !isOpen, // Slide down and hide
          'translate-y-0 opacity-100 visible': isOpen, // Slide up and show
        },
      )}
      aria-hidden={!isOpen}
    >
      <div className="relative w-full max-w-xl px-4">
        {FiSearch && (
          <FiSearch
            className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-500 dark:text-gray-400"
            size={20}
          />
        )}
        <input
          ref={inputRef}
          type="text"
          placeholder="Search apple.com"
          className={cn(
            'w-full py-3 pl-12 pr-12 rounded-lg',
            'bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white',
            'border border-transparent focus:border-blue-500 focus:ring-blue-500 focus:ring-1',
            'transition-all duration-200 ease-in-out',
            'placeholder:text-gray-500 dark:placeholder:text-gray-400',
          )}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Escape') {
              onClose();
            }
          }}
        />
        {searchTerm && FiX && (
          <button
            onClick={handleClear}
            className="absolute right-6 top-1/2 -translate-y-1/2 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
            aria-label="Clear search"
          >
            <FiX size={20} />
          </button>
        )}
      </div>
      <button
        onClick={onClose}
        className="absolute top-4 right-4 p-2 rounded-full text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
        aria-label="Close search"
      >
        {FiX && <FiX size={24} />}
      </button>
    </div>
  );
}
