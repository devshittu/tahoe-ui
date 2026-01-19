'use client';

import { useLayoutEffect, useState } from 'react';
import { createPortal } from 'react-dom';

export type PortalProps = {
  children: React.ReactNode;
  id?: string;
};

/**
 * Portal - Renders children into a DOM node outside the parent hierarchy
 */
export function Portal({ children, id = 'overlay-portal' }: PortalProps) {
  const [mountNode, setMountNode] = useState<HTMLElement | null>(null);

  useLayoutEffect(() => {
    let container = document.getElementById(id);
    if (!container) {
      container = document.createElement('div');
      container.setAttribute('id', id);
      document.body.appendChild(container);
    }
    setMountNode(container);
  }, [id]);

  if (!mountNode) return null;
  return createPortal(children, mountNode);
}
