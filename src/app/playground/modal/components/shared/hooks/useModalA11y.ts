// src/app/playground/modal/components/shared/hooks/useModalA11y.ts
'use client';

import { useEffect, useMemo, useRef } from 'react';
import {
  generateUniqueId,
  useFocusTrap,
  useScreenReaderAnnouncement,
} from '../a11yUtils';
import { A11yOptions, DEFAULT_A11Y_OPTIONS } from '../types';

/**
 * Options for useModalA11y hook
 */
export type UseModalA11yOptions = {
  /** Prefix for generated IDs ('dialog' | 'pagemode') */
  prefix: 'dialog' | 'pagemode';
  /** Whether the modal is currently open */
  isOpen: boolean;
  /** Accessibility configuration options */
  a11yOptions?: A11yOptions;
  /** Loading state message for announcement */
  loadingMessage?: string;
  /** Whether modal is in loading state */
  isLoading?: boolean;
};

/**
 * Return type for useModalA11y hook
 */
export type UseModalA11yReturn = {
  /** Generated modal ID */
  modalId: string | undefined;
  /** Generated title ID for aria-labelledby */
  titleId: string | undefined;
  /** Generated description ID for aria-describedby */
  descId: string | undefined;
  /** Container ref for focus trap */
  containerRef: React.RefObject<HTMLDivElement>;
  /** Function to announce messages to screen readers */
  announce: (message: string) => void;
  /** Pre-configured ARIA props for HeadlessDialog */
  ariaProps: {
    id: string | undefined;
    'aria-labelledby': string | undefined;
    'aria-describedby': string | undefined;
  };
  /** Merged a11y options with defaults */
  a11y: Required<
    Pick<
      A11yOptions,
      | 'escapeClose'
      | 'role'
      | 'closeOnOutsideClick'
      | 'enableFocusTrap'
      | 'announceToScreenReader'
    >
  > &
    A11yOptions;
};

/**
 * Unified hook for modal accessibility
 *
 * Combines:
 * - ARIA ID generation
 * - Focus trapping
 * - Screen reader announcements
 * - Loading state announcements
 *
 * @example
 * ```tsx
 * const {
 *   modalId,
 *   titleId,
 *   descId,
 *   containerRef,
 *   ariaProps,
 *   a11y,
 * } = useModalA11y({
 *   prefix: 'dialog',
 *   isOpen,
 *   a11yOptions,
 *   isLoading,
 *   loadingMessage,
 * });
 * ```
 */
export function useModalA11y({
  prefix,
  isOpen,
  a11yOptions = {},
  loadingMessage,
  isLoading = false,
}: UseModalA11yOptions): UseModalA11yReturn {
  // Merge with defaults
  const a11y = { ...DEFAULT_A11Y_OPTIONS, ...a11yOptions };

  const {
    generateUniqueIds = true,
    enableFocusTrap = true,
    announceToScreenReader = true,
    ariaLabelledby,
    ariaDescribedby,
    escapeClose = true,
    role = 'dialog',
    closeOnOutsideClick = true,
  } = a11y;

  // Container ref for focus trap
  const containerRef = useRef<HTMLDivElement>(null);

  // Generate unique IDs
  const modalId = useMemo(
    () => (generateUniqueIds ? generateUniqueId(prefix) : undefined),
    [generateUniqueIds, prefix],
  );

  const titleId = useMemo(
    () => (generateUniqueIds ? `${modalId}-title` : ariaLabelledby),
    [generateUniqueIds, modalId, ariaLabelledby],
  );

  const descId = useMemo(
    () => (generateUniqueIds ? `${modalId}-desc` : ariaDescribedby),
    [generateUniqueIds, modalId, ariaDescribedby],
  );

  // Initialize hooks
  const announce = useScreenReaderAnnouncement();
  useFocusTrap(isOpen, enableFocusTrap, containerRef);

  // Announce open/close state changes
  useEffect(() => {
    if (!announceToScreenReader) return;

    if (isOpen) {
      const modalType = prefix === 'dialog' ? 'Dialog' : 'Page mode';
      announce(`${modalType} opened`);
    }
    // Note: Close announcement is handled by the component when isOpen becomes false
    // before unmount, so we don't need to handle it here
  }, [isOpen, announce, announceToScreenReader, prefix]);

  // Announce loading state changes
  useEffect(() => {
    if (!announceToScreenReader || !isLoading) return;

    const message = loadingMessage || 'Loading';
    announce(message);
  }, [isLoading, loadingMessage, announce, announceToScreenReader]);

  // Pre-configured ARIA props
  const ariaProps = useMemo(
    () => ({
      id: modalId,
      'aria-labelledby': titleId,
      'aria-describedby': descId,
    }),
    [modalId, titleId, descId],
  );

  return {
    modalId,
    titleId,
    descId,
    containerRef,
    announce,
    ariaProps,
    a11y: {
      ...a11y,
      escapeClose,
      role,
      closeOnOutsideClick,
      enableFocusTrap,
      announceToScreenReader,
    },
  };
}
