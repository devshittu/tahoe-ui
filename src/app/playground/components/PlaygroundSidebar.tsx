// src/app/playground/components/PlaygroundSidebar.tsx
'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Text, SmallText } from '@/components/Typography';
import {
  playgroundCategories,
  statusColors,
  statusLabels,
  type PlaygroundComponent,
  type PlaygroundCategory,
} from '@/lib/playground-data';
import {
  FiLayout,
  FiMessageSquare,
  FiLayers,
  FiMove,
  FiBox,
  FiChevronDown,
  FiHome,
} from 'react-icons/fi';

/**
 * Icon mapping for categories
 */
const categoryIcons: Record<string, React.ElementType> = {
  'display-utility': FiLayout,
  'feedback-messaging': FiMessageSquare,
  'interactive-surfaces': FiLayers,
  gestural: FiMove,
  foundation: FiBox,
};

interface PlaygroundSidebarProps {
  className?: string;
}

/**
 * Playground Sidebar Navigation
 *
 * Features:
 * - Collapsible category sections
 * - Active state indication
 * - Status badges
 * - Keyboard navigation support
 *
 * Design Principles:
 * - #2 Visual Hierarchy: Categories > Items
 * - #9 Obvious Affordances: Clear active states
 * - #13 Predictable Navigation: Always know where you are
 */
export function PlaygroundSidebar({ className }: PlaygroundSidebarProps) {
  const pathname = usePathname();
  const [expandedCategories, setExpandedCategories] = React.useState<
    Set<string>
  >(new Set(playgroundCategories.map((cat) => cat.id)));

  const toggleCategory = (categoryId: string) => {
    setExpandedCategories((prev) => {
      const next = new Set(prev);
      if (next.has(categoryId)) {
        next.delete(categoryId);
      } else {
        next.add(categoryId);
      }
      return next;
    });
  };

  return (
    <nav
      className={cn(
        'flex flex-col h-full overflow-y-auto',
        'bg-white dark:bg-gray-900',
        'border-r border-gray-200 dark:border-gray-800',
        className,
      )}
      aria-label="Playground navigation"
    >
      {/* Header */}
      <div className="sticky top-0 z-10 bg-white dark:bg-gray-900 border-b border-gray-100 dark:border-gray-800">
        <Link
          href="/playground"
          className={cn(
            'flex items-center gap-3 px-4 py-3',
            'hover:bg-gray-50 dark:hover:bg-gray-800/50',
            'transition-colors duration-150',
          )}
        >
          <FiHome className="w-5 h-5 text-gray-700 dark:text-gray-300" />
          <Text fontWeight="semibold" color="primary">
            Playground
          </Text>
        </Link>
      </div>

      {/* Categories */}
      <div className="flex-1 py-2">
        {playgroundCategories.map((category) => (
          <CategorySection
            key={category.id}
            category={category}
            isExpanded={expandedCategories.has(category.id)}
            onToggle={() => toggleCategory(category.id)}
            currentPath={pathname}
          />
        ))}
      </div>

      {/* Footer */}
      <div className="sticky bottom-0 px-4 py-3 border-t border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-900">
        <SmallText className="text-xs">Tahoe UI Components</SmallText>
      </div>
    </nav>
  );
}

interface CategorySectionProps {
  category: PlaygroundCategory;
  isExpanded: boolean;
  onToggle: () => void;
  currentPath: string;
}

function CategorySection({
  category,
  isExpanded,
  onToggle,
  currentPath,
}: CategorySectionProps) {
  const Icon = categoryIcons[category.id] || FiBox;

  return (
    <div className="mb-1">
      {/* Category Header */}
      <button
        onClick={onToggle}
        className={cn(
          'flex items-center justify-between w-full px-4 py-2',
          'text-left',
          'hover:bg-gray-50 dark:hover:bg-gray-800/50',
          'transition-colors duration-150',
        )}
        aria-expanded={isExpanded}
      >
        <div className="flex items-center gap-2">
          <Icon className="w-4 h-4 text-gray-400 dark:text-gray-500" />
          <Text className="text-sm" fontWeight="medium" color="secondary">
            {category.title}
          </Text>
        </div>
        <motion.div
          animate={{ rotate: isExpanded ? 180 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <FiChevronDown className="w-4 h-4 text-gray-400" />
        </motion.div>
      </button>

      {/* Category Items */}
      <motion.div
        initial={false}
        animate={{
          height: isExpanded ? 'auto' : 0,
          opacity: isExpanded ? 1 : 0,
        }}
        transition={{ duration: 0.2, ease: [0.4, 0, 0.2, 1] }}
        className="overflow-hidden"
      >
        <div className="pl-4 pr-2 pb-2">
          {category.items.map((item) => (
            <NavItem
              key={item.id}
              item={item}
              isActive={currentPath === item.href}
            />
          ))}
        </div>
      </motion.div>
    </div>
  );
}

interface NavItemProps {
  item: PlaygroundComponent;
  isActive: boolean;
}

function NavItem({ item, isActive }: NavItemProps) {
  const colors = statusColors[item.status];

  return (
    <Link
      href={item.href}
      className={cn(
        'group relative flex items-center justify-between',
        'px-3 py-2 rounded-lg',
        'transition-colors duration-150',
        isActive
          ? 'bg-gray-100 dark:bg-gray-800'
          : 'hover:bg-gray-50 dark:hover:bg-gray-800/50',
      )}
    >
      {/* Active indicator - positioned relative to Link */}
      {isActive && (
        <motion.div
          layoutId="sidebar-active"
          className="absolute -left-3 top-1/2 -translate-y-1/2 w-1 h-5 bg-gray-900 dark:bg-gray-100 rounded-r"
          transition={{ type: 'spring', stiffness: 500, damping: 30 }}
        />
      )}

      <Text
        className="text-sm truncate"
        fontWeight={isActive ? 'medium' : 'regular'}
        color={isActive ? 'primary' : 'tertiary'}
      >
        {item.name}
      </Text>

      {/* Status indicator */}
      {item.status !== 'done' && (
        <span
          className={cn(
            'flex-shrink-0 px-1.5 py-0.5 text-[10px] font-medium rounded',
            'border',
            colors.bg,
            colors.text,
            colors.border,
          )}
        >
          {statusLabels[item.status]}
        </span>
      )}
    </Link>
  );
}

export default PlaygroundSidebar;
