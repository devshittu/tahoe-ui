'use client';

import { useEffect, useMemo, useRef } from 'react';
import {
  generateUniqueId,
  useFocusTrap,
  useScreenReaderAnnouncement,
} from '../a11yUtils';
import { A11yOptions, DEFAULT_A11Y_OPTIONS } from '../types';

export type UseModalA11yOptions = {
  prefix: 'dialog' | 'pagemode';
  isOpen: boolean;
  a11yOptions?: A11yOptions;
  loadingMessage?: string;
  isLoading?: boolean;
};

export type UseModalA11yReturn = {
  modalId: string | undefined;
  titleId: string | undefined;
  descId: string | undefined;
  containerRef: React.RefObject<HTMLDivElement | null>;
  announce: (message: string) => void;
  ariaProps: {
    id: string | undefined;
    'aria-labelledby': string | undefined;
    'aria-describedby': string | undefined;
  };
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
 */
export function useModalA11y({
  prefix,
  isOpen,
  a11yOptions = {},
  loadingMessage,
  isLoading = false,
}: UseModalA11yOptions): UseModalA11yReturn {
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

  const containerRef = useRef<HTMLDivElement>(null);

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

  const announce = useScreenReaderAnnouncement();
  useFocusTrap(isOpen, enableFocusTrap, containerRef);

  useEffect(() => {
    if (!announceToScreenReader) return;

    if (isOpen) {
      const modalType = prefix === 'dialog' ? 'Dialog' : 'Page mode';
      announce(`${modalType} opened`);
    }
  }, [isOpen, announce, announceToScreenReader, prefix]);

  useEffect(() => {
    if (!announceToScreenReader || !isLoading) return;

    const message = loadingMessage || 'Loading';
    announce(message);
  }, [isLoading, loadingMessage, announce, announceToScreenReader]);

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
