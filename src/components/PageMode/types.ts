export type PageModePosition = 'top' | 'bottom' | 'left' | 'right';

export type A11yOptions = {
  escapeClose?: boolean;
  role?: 'dialog' | 'alertdialog';
  ariaLabel?: string;
  ariaLabelledby?: string;
  ariaDescribedby?: string;
  ariaModal?: boolean;
  handlebarAriaLabel?: string;
  lockScroll?: boolean;
  closeOnOutsideClick?: boolean;
};
