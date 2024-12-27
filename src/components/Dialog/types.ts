export type DialogShowFrom = 'top' | 'bottom' | 'left' | 'right';
export type DialogHandlebarPosition = 'top' | 'bottom' | 'left' | 'right';

export type A11yOptions = {
  escapeClose?: boolean; // Default: true
  ariaLabel?: string;
  ariaLabelledby?: string;
  ariaDescribedby?: string;
  ariaModal?: boolean; // Default: true
  lockScroll?: boolean; // Default: false
  closeOnOutsideClick?: boolean; // Default: true
};

export type DialogProps = {
  isOpen: boolean;
  onClose: () => void;
  showFrom?: DialogShowFrom; // Default: 'top'
  handlebarPosition?: DialogHandlebarPosition; // Default: 'top'
  roundedEdges?: boolean; // Optional rounded corners
  themeable?: boolean; // Optional theme support
  a11yOptions?: A11yOptions;
  children: React.ReactNode;
};
