'use client';

import { useLayoutEffect, useState } from 'react';
import { createPortal } from 'react-dom';

type PortalProps = {
  children: React.ReactNode;
  id?: string;
};

export function Portal({ children, id = 'page-mode-portal' }: PortalProps) {
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
