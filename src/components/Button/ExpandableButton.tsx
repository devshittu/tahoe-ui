// src/components/Button/ExpandableButton.tsx

'use client';

import React, {
  useState,
  useRef,
  useEffect,
  type ButtonHTMLAttributes,
} from 'react';
import Button, { ButtonProps } from './Button';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';

type ExpandableButtonProps = ButtonProps & {
  /** Content to display when expanded */
  expandedContent: React.ReactNode;
};

const ExpandableButton = React.forwardRef<
  HTMLButtonElement,
  ExpandableButtonProps
>(({ expandedContent, children, className = '', ...rest }, ref) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const toggleExpand = () => setIsExpanded((prev) => !prev);

  const handleClickOutside = (event: MouseEvent) => {
    if (
      containerRef.current &&
      !containerRef.current.contains(event.target as Node)
    ) {
      setIsExpanded(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="relative inline-block text-left" ref={containerRef}>
      <Button ref={ref} onClick={toggleExpand} className={className} {...rest}>
        {children}
        {isExpanded ? (
          <FaChevronUp className="ml-2" />
        ) : (
          <FaChevronDown className="ml-2" />
        )}
      </Button>

      {isExpanded && (
        <div className="absolute left-0 mt-2 w-56 bg-white border border-gray-200 rounded-md shadow-lg z-50">
          <div className="py-2">{expandedContent}</div>
        </div>
      )}
    </div>
  );
});

ExpandableButton.displayName = 'ExpandableButton';
export default React.memo(ExpandableButton);
