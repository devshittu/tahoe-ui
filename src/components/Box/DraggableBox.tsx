// src/components/Box/DraggableBox.tsx
'use client';

import React, { ReactNode, useEffect, useRef } from 'react';
import clsx from 'clsx';
import BaseBox from './BaseBox';

type DraggableBoxProps = {
  children: ReactNode;
  disabled?: boolean;
  className?: string;
} & React.ComponentProps<typeof BaseBox>;

const DraggableBox = ({
  children,
  disabled,
  className,
  ...props
}: DraggableBoxProps) => {
  const boxRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!boxRef.current || disabled) return;

    const box = boxRef.current;
    let isDragging = false;
    let startX = 0;
    let startY = 0;
    let initialLeft = 0;
    let initialTop = 0;

    const onMouseDown = (e: MouseEvent) => {
      isDragging = true;
      startX = e.clientX;
      startY = e.clientY;
      const rect = box.getBoundingClientRect();
      initialLeft = rect.left;
      initialTop = rect.top;
      document.body.style.userSelect = 'none';
    };

    const onMouseMove = (e: MouseEvent) => {
      if (!isDragging) return;
      const dx = e.clientX - startX;
      const dy = e.clientY - startY;
      box.style.position = 'absolute';
      box.style.left = `${initialLeft + dx}px`;
      box.style.top = `${initialTop + dy}px`;
    };

    const onMouseUp = () => {
      isDragging = false;
      document.body.style.userSelect = 'auto';
    };

    box.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);

    return () => {
      box.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
    };
  }, [disabled]);

  return (
    <BaseBox
      ref={boxRef}
      className={clsx(!disabled && 'cursor-move', className)}
      aria-label={disabled ? 'Draggable box disabled' : 'Draggable box enabled'}
      role="group"
      {...props}
    >
      {children}
    </BaseBox>
  );
};

export default DraggableBox;
