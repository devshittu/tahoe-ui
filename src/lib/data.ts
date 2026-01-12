// lib/data.ts

// Define interfaces for component data
export interface ComponentApiProp {
  name: string;
  type: string;
  description: string;
  default?: string;
}

export interface ComponentData {
  id: string;
  name: string;
  description: string;
  api: ComponentApiProp[];
  previewComponentCode: string; // Raw HTML/CSS/JS for the iframe preview
  codeSnippet: string; // React/TypeScript code snippet for display
}

// Define interface for static navigation links
export interface StaticNavLink {
  path: string;
  label: string;
}

// Mock data for demonstration purposes
export const mockComponents: ComponentData[] = [
  {
    id: 'button',
    name: 'Button',
    description:
      'A standard button component for user interactions. It supports various states and styles, and is highly customizable.',
    api: [
      {
        name: 'onClick',
        type: '() => void',
        description: 'Callback fired when the button is clicked.',
      },
      {
        name: 'children',
        type: 'React.ReactNode',
        description: 'The content of the button.',
      },
      {
        name: 'variant',
        type: "'primary' | 'secondary' | 'ghost'",
        description: 'The visual style of the button.',
        default: 'primary',
      },
      {
        name: 'disabled',
        type: 'boolean',
        description: 'If true, the button will be disabled.',
        default: 'false',
      },
      {
        name: 'size',
        type: "'sm' | 'md' | 'lg'",
        description: 'The size of the button.',
        default: 'md',
      },
    ],
    previewComponentCode: `
      <style>
        /* Basic styles for the buttons within the preview */
        .btn-primary {
          padding: 0.75rem 1.5rem;
          background-color: #3B82F6; /* blue-500 */
          color: white;
          font-weight: 600;
          border-radius: 0.5rem;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
          transition: background-color 0.2s ease-in-out;
          cursor: pointer;
          border: none;
        }
        .btn-primary:hover {
          background-color: #2563EB; /* blue-600 */
        }
        .btn-secondary {
          padding: 0.75rem 1.5rem;
          background-color: #E5E7EB; /* gray-200 */
          color: #1F2937; /* gray-900 */
          font-weight: 600;
          border-radius: 0.5rem;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
          transition: background-color 0.2s ease-in-out;
          cursor: pointer;
          border: none;
        }
        .btn-secondary:hover {
          background-color: #D1D5DB; /* gray-300 */
        }
        .btn-ghost {
          padding: 0.75rem 1.5rem;
          background-color: transparent;
          color: #3B82F6; /* blue-500 */
          font-weight: 600;
          border-radius: 0.5rem;
          transition: background-color 0.2s ease-in-out;
          cursor: pointer;
          border: none;
        }
        .btn-ghost:hover {
          background-color: rgba(59, 130, 246, 0.1); /* blue-500 with 10% opacity */
        }
        .btn-disabled {
          padding: 0.75rem 1.5rem;
          background-color: #9CA3AF; /* gray-400 */
          color: #6B7280; /* gray-500 */
          font-weight: 600;
          border-radius: 0.5rem;
          cursor: not-allowed;
          opacity: 0.7;
          border: none;
        }

        /* Dark mode styles for buttons */
        body.dark .btn-primary { background-color: #2563EB; }
        body.dark .btn-primary:hover { background-color: #1D4ED8; }
        body.dark .btn-secondary { background-color: #374151; color: #F9FAFB; }
        body.dark .btn-secondary:hover { background-color: #4B5563; }
        body.dark .btn-ghost { color: #60A5FA; }
        body.dark .btn-ghost:hover { background-color: rgba(96, 165, 250, 0.1); }
        body.dark .btn-disabled { background-color: #4B5563; color: #9CA3AF; }
      </style>
      <div class="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4">
        <button class="btn-primary">
          Primary Button
        </button>
        <button class="btn-secondary">
          Secondary Button
        </button>
        <button class="btn-ghost">
          Ghost Button
        </button>
        <button class="btn-disabled" disabled>
          Disabled
        </button>
      </div>
    `,
    codeSnippet: `
import React from 'react';
import { cn } from '@/lib/utils';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
}

const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  className,
  ...props
}) => {
  const baseStyles = 'font-semibold rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-opacity-50';
  const variantStyles = {
    primary: 'bg-blue-600 text-white hover:bg-blue-700 shadow-md focus:ring-blue-500',
    secondary: 'bg-gray-200 text-gray-800 hover:bg-gray-300 shadow-md focus:ring-gray-400',
    ghost: 'text-blue-600 hover:bg-blue-50 focus:ring-blue-500',
  };
  const sizeStyles = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg',
  };

  return (
    <button
      className={cn(
        baseStyles,
        variantStyles[variant],
        sizeStyles[size],
        props.disabled && 'opacity-70 cursor-not-allowed',
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
`,
  },
  {
    id: 'modal',
    name: 'Modal Dialog',
    description:
      'A versatile modal component for displaying content on top of the current page. It supports custom content and close functionality, ideal for alerts, forms, or confirmations.',
    api: [
      {
        name: 'isOpen',
        type: 'boolean',
        description: 'Controls the visibility of the modal.',
      },
      {
        name: 'onClose',
        type: '() => void',
        description: 'Callback fired when the modal is requested to close.',
      },
      {
        name: 'children',
        type: 'React.ReactNode',
        description: 'The content of the modal.',
      },
      {
        name: 'title',
        type: 'string',
        description: 'The title displayed in the modal header.',
      },
      {
        name: 'showCloseButton',
        type: 'boolean',
        description: 'If true, a close button is displayed.',
        default: 'true',
      },
    ],
    previewComponentCode: `
      <style>
        .modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.7);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1000;
          opacity: 1;
        }
        .modal-content {
          background: white;
          padding: 2.5rem;
          border-radius: 0.75rem;
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.3);
          max-width: 90%;
          width: 400px;
          text-align: center;
          position: relative;
        }
        .modal-close {
          position: absolute;
          top: 1rem;
          right: 1rem;
          background: none;
          border: none;
          font-size: 1.5rem;
          cursor: pointer;
          color: #666;
        }
        .modal-title {
          font-size: 1.75rem;
          font-weight: bold;
          margin-bottom: 1rem;
          color: #333;
        }
        .modal-body {
          font-size: 1rem;
          color: #555;
          margin-bottom: 1.5rem;
        }
        .modal-button {
          padding: 0.75rem 1.5rem;
          background-color: #4F46E5;
          color: white;
          border: none;
          border-radius: 0.5rem;
          cursor: pointer;
          font-weight: 600;
        }

        /* Dark mode styles */
        body.dark .modal-content { background: #1f2937; } /* dark:bg-gray-800 */
        body.dark .modal-title { color: #f9fafb; } /* dark:text-white */
        body.dark .modal-body { color: #d1d5db; } /* dark:text-gray-300 */
        body.dark .modal-close { color: #9ca3af; } /* dark:text-gray-400 */
        body.dark .modal-close:hover { color: #f9fafb; } /* dark:hover:text-white */
        body.dark .modal-button { background-color: #4338CA; }
        body.dark .modal-button:hover { background-color: #3730A3; }
      </style>
      <div class="modal-overlay">
        <div class="modal-content">
          <button class="modal-close">&times;</button>
          <h2 class="modal-title">Welcome to Tahoe UI!</h2>
          <p class="modal-body">This is a sample modal dialog. It can display important information or collect user input efficiently.</p>
          <button class="modal-button">Awesome!</button>
        </div>
      </div>
    `,
    codeSnippet: `
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiX } from 'react-icons/fi';
import { cn } from '@/lib/utils';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  title?: string;
  showCloseButton?: boolean;
}

const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  children,
  title,
  showCloseButton = true,
}) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-[1000]"
          onClick={onClose}
        >
          <motion.div
            initial={{ y: -50, opacity: 0, scale: 0.9 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 50, opacity: 0, scale: 0.9 }}
            transition={{ type: 'spring', damping: 20, stiffness: 300 }}
            className={cn(
              "bg-white dark:bg-gray-800 p-8 rounded-xl shadow-2xl relative",
              "max-w-lg w-[90vw] mx-4 my-8"
            )}
            onClick={(e) => e.stopPropagation()}
          >
            {showCloseButton && (
              <button
                onClick={onClose}
                className="absolute top-4 right-4 text-gray-500 hover:text-gray-900 dark:hover:text-white transition-colors duration-200"
                aria-label="Close modal"
              >
                <FiX size={24} />
              </button>
            )}
            {title && (
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 pr-10">
                {title}
              </h2>
            )}
            <div>{children}</div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Modal;
`,
  },
  {
    id: 'carousel',
    name: 'Image Carousel',
    description:
      'A component for displaying a series of images or content slides with navigation and autoplay capabilities. Perfect for showcasing portfolios or product images.',
    api: [
      {
        name: 'images',
        type: 'string[]',
        description: 'Array of image URLs to display.',
      },
      {
        name: 'autoplay',
        type: 'boolean',
        description: 'Whether the carousel should autoplay slides.',
        default: 'false',
      },
      {
        name: 'interval',
        type: 'number',
        description: 'Autoplay interval in milliseconds.',
        default: '3000',
      },
      {
        name: 'showIndicators',
        type: 'boolean',
        description: 'If true, shows navigation indicators.',
        default: 'true',
      },
    ],
    previewComponentCode: `
      <style>
        .carousel-container {
          width: 100%;
          max-width: 600px;
          height: 350px;
          overflow: hidden;
          border-radius: 0.75rem;
          box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
          position: relative;
          background-color: white;
        }
        .carousel-slide {
          width: 100%;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 2rem;
          font-weight: bold;
          color: white;
          position: absolute;
          top: 0;
          left: 0;
          transition: transform 0.5s ease-in-out;
        }
        .carousel-slide:nth-child(1) { background-color: #EF4444; } /* Red */
        .carousel-slide:nth-child(2) { background-color: #3B82F6; } /* Blue */
        .carousel-slide:nth-child(3) { background-color: #10B981; } /* Green */
        .carousel-nav {
          position: absolute;
          bottom: 1rem;
          left: 50%;
          transform: translateX(-50%);
          display: flex;
          gap: 0.5rem;
        }
        .carousel-dot {
          width: 10px;
          height: 10px;
          background-color: rgba(0, 0, 0, 0.3);
          border-radius: 50%;
          cursor: pointer;
          transition: background-color 0.3s;
        }
        .carousel-dot.active {
          background-color: #4F46E5; /* Blue */
        }
        .carousel-arrow {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          background-color: rgba(0, 0, 0, 0.5);
          color: white;
          border: none;
          padding: 0.5rem;
          border-radius: 50%;
          cursor: pointer;
          font-size: 1.5rem;
          z-index: 10;
          transition: background-color 0.3s;
        }
        .carousel-arrow:hover {
          background-color: rgba(0, 0, 0, 0.7);
        }
        .carousel-arrow.left { left: 1rem; }
        .carousel-arrow.right { right: 1rem; }

        /* Dark mode styles */
        body.dark .carousel-container { background-color: #1f2937; } /* dark:bg-gray-800 */
        body.dark .carousel-slide { color: #f9fafb; } /* dark:text-white */
        body.dark .carousel-arrow { background-color: rgba(255, 255, 255, 0.2); }
        body.dark .carousel-arrow:hover { background-color: rgba(255, 255, 255, 0.4); }
        body.dark .carousel-dot { background-color: rgba(255, 255, 255, 0.4); }
        body.dark .carousel-dot.active { background-color: #4F46E5; } /* dark:bg-blue-600 */
      </style>
      <div class="carousel-container">
        <div class="carousel-slide" data-index="0" style="transform: translateX(0%);">Slide 1</div>
        <div class="carousel-slide" data-index="1" style="transform: translateX(100%);">Slide 2</div>
        <div class="carousel-slide" data-index="2" style="transform: translateX(200%);">Slide 3</div>
        <button class="carousel-arrow left">&lt;</button>
        <button class="carousel-arrow right">&gt;</button>
        <div class="carousel-nav">
          <div class="carousel-dot active" data-dot-index="0"></div>
          <div class="carousel-dot" data-dot-index="1"></div>
          <div class="carousel-dot" data-dot-index="2"></div>
        </div>
      </div>
      <script>
        let currentSlide = 0;
        const slides = document.querySelectorAll('.carousel-slide');
        const dots = document.querySelectorAll('.carousel-dot');
        const totalSlides = slides.length;
        const prevArrow = document.querySelector('.carousel-arrow.left');
        const nextArrow = document.querySelector('.carousel-arrow.right');

        function updateDots() {
          dots.forEach((dot, i) => {
            if (i === currentSlide) {
              dot.classList.add('active');
            } else {
              dot.classList.remove('active');
            }
          });
        }

        function showSlide(index) {
          slides.forEach((slide, i) => {
            slide.style.transform = \`translateX(\${100 * (i - index)}%)\`;
          });
          currentSlide = index;
          updateDots();
        }

        dots.forEach(dot => {
          dot.addEventListener('click', (e) => {
            const index = parseInt(e.target.dataset.dotIndex);
            showSlide(index);
          });
        });

        prevArrow.addEventListener('click', () => {
          currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
          showSlide(currentSlide);
        });

        nextArrow.addEventListener('click', () => {
          currentSlide = (currentSlide + 1) % totalSlides;
          showSlide(currentSlide);
        });

        setInterval(() => {
          currentSlide = (currentSlide + 1) % totalSlides;
          showSlide(currentSlide);
        }, 3000);

        showSlide(currentSlide); // Initial display
      </script>
    `,
    codeSnippet: `
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import { cn } from '@/lib/utils';

interface CarouselProps {
  images: string[];
  autoplay?: boolean;
  interval?: number;
  showIndicators?: boolean;
}

const Carousel: React.FC<CarouselProps> = ({
  images,
  autoplay = false,
  interval = 3000,
  showIndicators = true,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (!autoplay) return;

    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, interval);

    return () => clearInterval(timer);
  }, [autoplay, interval, images.length]);

  const goToPrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  };

  const goToNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  if (images.length === 0) {
    return <div className="text-center text-gray-500">No images to display.</div>;
  }

  return (
    <div className="relative w-full max-w-2xl h-80 overflow-hidden rounded-lg shadow-xl bg-gray-100 dark:bg-gray-900">
      <AnimatePresence initial={false}>
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -100 }}
          transition={{ duration: 0.5 }}
          className="absolute inset-0 flex items-center justify-center"
        >
          <img
            src={images[currentIndex] || 'https://placehold.co/600x350/E0E7FF/4338CA?text=Image+Placeholder'}
            alt={\`Slide \${currentIndex + 1}\`}
            className="w-full h-full object-cover"
            onError={(e) => {
              e.currentTarget.src = 'https://placehold.co/600x350/E0E7FF/4338CA?text=Image+Error';
            }}
          />
        </motion.div>
      </AnimatePresence>

      <button
        onClick={goToPrev}
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-75 transition-colors duration-200 z-10"
        aria-label="Previous slide"
      >
        <FiChevronLeft size={24} />
      </button>
      <button
        onClick={goToNext}
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-75 transition-colors duration-200 z-10"
        aria-label="Next slide"
      >
        <FiChevronRight size={24} />
      </button>

      {showIndicators && (
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2 z-10">
          {images.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={cn(
                "w-3 h-3 rounded-full bg-white transition-all duration-200",
                currentIndex === index ? "scale-125 bg-blue-500" : "opacity-60"
              )}
              aria-label={\`Go to slide \${index + 1}\`}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Carousel;
`,
  },
  {
    id: 'offcanvas',
    name: 'Off-canvas Menu',
    description:
      'A sidebar menu that slides in from the edge of the screen, commonly used for navigation on mobile devices or supplementary content.',
    api: [
      {
        name: 'isOpen',
        type: 'boolean',
        description: 'Controls the visibility of the off-canvas menu.',
      },
      {
        name: 'onClose',
        type: '() => void',
        description: 'Callback fired when the menu is requested to close.',
      },
      {
        name: 'children',
        type: 'React.ReactNode',
        description: 'The content of the off-canvas menu.',
      },
      {
        name: 'side',
        type: "'left' | 'right'",
        description: 'Which side the menu slides in from.',
        default: 'left',
      },
      {
        name: 'width',
        type: 'string',
        description: 'The width of the off-canvas menu.',
        default: '280px',
      },
    ],
    previewComponentCode: `
      <style>
        .offcanvas-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.7);
          z-index: 999;
          opacity: 1;
        }
        .offcanvas-menu {
          position: fixed;
          top: 0;
          left: 0;
          width: 280px;
          height: 100%;
          background: white;
          box-shadow: 5px 0 15px rgba(0, 0, 0, 0.3);
          transform: translateX(0%);
          z-index: 1000;
          padding: 2rem;
          display: flex;
          flex-direction: column;
        }
        .offcanvas-close {
          position: absolute;
          top: 1rem;
          right: 1rem;
          background: none;
          border: none;
          font-size: 1.5rem;
          cursor: pointer;
          color: #666;
        }
        .offcanvas-title {
          font-size: 1.75rem;
          font-weight: bold;
          margin-bottom: 2rem;
          color: #333;
        }
        .offcanvas-nav-item {
          padding: 0.75rem 0;
          font-size: 1.1rem;
          color: #555;
          text-decoration: none;
        }

        /* Dark mode styles */
        body.dark .offcanvas-menu { background: #1f2937; } /* dark:bg-gray-800 */
        body.dark .offcanvas-title { color: #f9fafb; } /* dark:text-white */
        body.dark .offcanvas-nav-item { color: #d1d5db; } /* dark:text-gray-300 */
        body.dark .offcanvas-nav-item:hover { color: #f9fafb; } /* dark:hover:text-white */
        body.dark .offcanvas-close { color: #9ca3af; } /* dark:text-gray-400 */
        body.dark .offcanvas-close:hover { color: #f9fafb; } /* dark:hover:text-white */

        /* RTL specific adjustments */
        body[dir="rtl"] .offcanvas-menu {
          left: auto;
          right: 0;
          transform: translateX(0%);
        }
        body[dir="rtl"] .offcanvas-close {
          left: 1rem;
          right: auto;
        }
      </style>
      <div class="offcanvas-overlay"></div>
      <div class="offcanvas-menu">
        <button class="offcanvas-close">&times;</button>
        <h2 class="offcanvas-title">Navigation</h2>
        <a href="#" class="offcanvas-nav-item">Home</a>
        <a href="#" class="offcanvas-nav-item">Components</a>
        <a href="#" class="offcanvas-nav-item">Guidelines</a>
        <a href="#" class="offcanvas-nav-item">Resources</a>
      </div>
    `,
    codeSnippet: `
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiX } from 'react-icons/fi';
import { cn } from '@/lib/utils';

interface OffcanvasProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  side?: 'left' | 'right';
  width?: string;
}

const Offcanvas: React.FC<OffcanvasProps> = ({
  isOpen,
  onClose,
  children,
  side = 'left',
  width = '280px',
}) => {
  const variants = {
    left: {
      open: { x: 0 },
      closed: { x: '-100%' },
    },
    right: {
      open: { x: 0 },
      closed: { x: '100%' },
    },
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-70 z-[999]"
            onClick={onClose}
          />
          <motion.aside
            initial="closed"
            animate="open"
            exit="closed"
            variants={variants[side]}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className={cn(
              "fixed inset-y-0 bg-white dark:bg-gray-900 shadow-xl z-[1000] p-6 flex flex-col",
              side === 'left' ? 'left-0' : 'right-0'
            )}
            style={{ width }}
          >
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-900 dark:hover:text-white transition-colors duration-200"
              aria-label="Close off-canvas menu"
            >
              <FiX size={24} />
            </button>
            {children}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
};

export default Offcanvas;
`,
  },
];

// Static navigation links for the sidebar
export const staticNavLinks: StaticNavLink[] = [
  { path: '/playground/pagemode', label: 'Playground Pagemode' },
  { path: '/playground/typography', label: 'Typography System' },
  { path: '/playground/typo', label: 'Playground Typography' },
  { path: '/demo', label: 'Demo' },
  { path: '/docs', label: 'Docs' },
  { path: '/storybook', label: 'Storybook' },
  { path: '/playground/navigation', label: 'Playground Navigation' },
  { path: '/playground/frame', label: 'Playground Frame' },
  { path: '/playground/floating-panel', label: 'Floating Control panel' },
  { path: '/playground/modal', label: 'Modern Modal' },
];

// lib/data.ts
