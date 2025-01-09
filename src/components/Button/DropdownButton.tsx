// src/components/Button/DropdownButton.tsx

'use client';

import React, {
  useState,
  useRef,
  useEffect,
  type ButtonHTMLAttributes,
} from 'react';
import Button, { ButtonProps } from './Button';
import { FaChevronDown } from 'react-icons/fa';

type DropdownButtonProps = ButtonProps & {
  /** The dropdown menu items */
  menuItems: { label: string; onClick: () => void }[];
};

const DropdownButton = React.forwardRef<HTMLButtonElement, DropdownButtonProps>(
  ({ menuItems, children, className = '', ...rest }, ref) => {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    const toggleDropdown = () => setIsOpen((prev) => !prev);

    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    useEffect(() => {
      document.addEventListener('mousedown', handleClickOutside);
      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }, []);

    return (
      <div className="relative inline-block text-left" ref={dropdownRef}>
        <Button
          ref={ref}
          onClick={toggleDropdown}
          className={className}
          {...rest}
        >
          {children}
          <FaChevronDown className="ml-2" />
        </Button>

        {isOpen && (
          <div className="absolute mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg z-50">
            <ul className="py-1">
              {menuItems.map((item, index) => (
                <li key={index}>
                  <button
                    onClick={() => {
                      item.onClick();
                      setIsOpen(false);
                    }}
                    className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    );
  },
);

DropdownButton.displayName = 'DropdownButton';
export default React.memo(DropdownButton);
