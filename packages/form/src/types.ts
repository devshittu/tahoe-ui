/**
 * @tahoe-ui/form - Type Definitions
 *
 * Comprehensive type system for form components.
 *
 * @packageDocumentation
 */

import {
  type InputHTMLAttributes,
  type TextareaHTMLAttributes,
  type ReactNode,
  type ReactElement,
} from 'react';

// ============================================================================
// Input Types
// ============================================================================

export type InputVariant = 'default' | 'filled' | 'outlined';
export type InputSize = 'sm' | 'md' | 'lg';
export type InputState = 'error' | 'success' | undefined;

export interface InputProps extends Omit<
  InputHTMLAttributes<HTMLInputElement>,
  'size'
> {
  /** Visual variant */
  variant?: InputVariant;
  /** Input size */
  size?: InputSize;
  /** Validation state */
  state?: InputState;
  /** Left icon/addon */
  leftIcon?: ReactNode;
  /** Right icon/addon */
  rightIcon?: ReactNode;
  /** Full width */
  fullWidth?: boolean;
}

// ============================================================================
// Textarea Types
// ============================================================================

export type TextareaVariant = 'default' | 'filled' | 'outlined';
export type TextareaSize = 'sm' | 'md' | 'lg';
export type TextareaState = 'error' | 'success' | undefined;

export interface TextareaProps extends Omit<
  TextareaHTMLAttributes<HTMLTextAreaElement>,
  'size'
> {
  /** Visual variant */
  variant?: TextareaVariant;
  /** Size preset */
  size?: TextareaSize;
  /** Validation state */
  state?: TextareaState;
  /** Auto-resize to content */
  autoResize?: boolean;
  /** Minimum rows */
  minRows?: number;
  /** Maximum rows (only with autoResize) */
  maxRows?: number;
  /** Show character count */
  showCount?: boolean;
  /** Full width */
  fullWidth?: boolean;
}

// ============================================================================
// Select Types
// ============================================================================

export interface SelectOption<T = string> {
  value: T;
  label: string;
  disabled?: boolean;
}

export type SelectSize = 'sm' | 'md' | 'lg';
export type SelectState = 'error' | 'success' | undefined;

export interface SelectProps<T = string> {
  /** Options to select from */
  options: SelectOption<T>[];
  /** Current value */
  value?: T;
  /** Change handler */
  onChange?: (value: T) => void;
  /** Placeholder when no value selected */
  placeholder?: string;
  /** Size preset */
  size?: SelectSize;
  /** Validation state */
  state?: SelectState;
  /** Disabled state */
  disabled?: boolean;
  /** Full width */
  fullWidth?: boolean;
  /** Additional className */
  className?: string;
  /** ID for accessibility */
  id?: string;
  /** Name for form submission */
  name?: string;
}

// ============================================================================
// Checkbox Types
// ============================================================================

export type CheckboxSize = 'sm' | 'md' | 'lg';

export interface CheckboxProps {
  /** Checked state */
  checked?: boolean;
  /** Change handler */
  onChange?: (checked: boolean) => void;
  /** Indeterminate state */
  indeterminate?: boolean;
  /** Label text */
  label?: string;
  /** Description below label */
  description?: string;
  /** Size preset */
  size?: CheckboxSize;
  /** Disabled state */
  disabled?: boolean;
  /** Error state */
  error?: boolean;
  /** Name for form submission */
  name?: string;
  /** Value for form submission */
  value?: string;
  /** Additional className */
  className?: string;
}

// ============================================================================
// RadioGroup Types
// ============================================================================

export interface RadioOption<T = string> {
  value: T;
  label: string;
  description?: string;
  disabled?: boolean;
}

export type RadioGroupSize = 'sm' | 'md' | 'lg';
export type RadioGroupOrientation = 'horizontal' | 'vertical';

export interface RadioGroupProps<T = string> {
  /** Radio options */
  options: RadioOption<T>[];
  /** Current value */
  value?: T;
  /** Change handler */
  onChange?: (value: T) => void;
  /** Size preset */
  size?: RadioGroupSize;
  /** Layout orientation */
  orientation?: RadioGroupOrientation;
  /** Disabled state */
  disabled?: boolean;
  /** Error state */
  error?: boolean;
  /** Name for form submission */
  name?: string;
  /** Additional className */
  className?: string;
}

// ============================================================================
// Switch Types
// ============================================================================

export type SwitchSize = 'sm' | 'md' | 'lg';

export interface SwitchProps {
  /** Checked state */
  checked?: boolean;
  /** Change handler */
  onChange?: (checked: boolean) => void;
  /** Label text */
  label?: string;
  /** Description below label */
  description?: string;
  /** Size preset */
  size?: SwitchSize;
  /** Disabled state */
  disabled?: boolean;
  /** Name for form submission */
  name?: string;
  /** Additional className */
  className?: string;
}

// ============================================================================
// Slider Types
// ============================================================================

export type SliderSize = 'sm' | 'md' | 'lg';

export interface SliderMark {
  value: number;
  label?: string;
}

export interface SliderProps {
  /** Current value (single) or values (range) */
  value?: number | [number, number];
  /** Change handler */
  onChange?: (value: number | [number, number]) => void;
  /** Minimum value */
  min?: number;
  /** Maximum value */
  max?: number;
  /** Step increment */
  step?: number;
  /** Show marks */
  marks?: boolean | SliderMark[];
  /** Show value tooltip */
  showValue?: boolean;
  /** Size preset */
  size?: SliderSize;
  /** Disabled state */
  disabled?: boolean;
  /** Additional className */
  className?: string;
  /** ARIA label */
  'aria-label'?: string;
}

// ============================================================================
// DatePicker Types
// ============================================================================

export type DatePickerSize = 'sm' | 'md' | 'lg';

export interface DatePickerProps {
  /** Selected date */
  value?: Date;
  /** Change handler */
  onChange?: (date: Date) => void;
  /** Minimum selectable date */
  minDate?: Date;
  /** Maximum selectable date */
  maxDate?: Date;
  /** Size preset */
  size?: DatePickerSize;
  /** Disabled state */
  disabled?: boolean;
  /** Placeholder text */
  placeholder?: string;
  /** Date format function */
  formatDate?: (date: Date) => string;
  /** Locale for month/day names */
  locale?: string;
  /** Additional className */
  className?: string;
  /** ID for accessibility */
  id?: string;
}

// ============================================================================
// FileUpload Types
// ============================================================================

export interface UploadedFile {
  file: File;
  id: string;
  progress?: number;
  error?: string;
}

export interface FileUploadProps {
  /** Accepted file types */
  accept?: string[];
  /** Allow multiple files */
  multiple?: boolean;
  /** Maximum file size in bytes */
  maxSize?: number;
  /** Maximum number of files */
  maxFiles?: number;
  /** Upload handler */
  onUpload?: (files: File[]) => void;
  /** Error handler */
  onError?: (error: string) => void;
  /** Current files */
  files?: UploadedFile[];
  /** Remove file handler */
  onRemove?: (id: string) => void;
  /** Show image preview */
  preview?: boolean;
  /** Disabled state */
  disabled?: boolean;
  /** Additional className */
  className?: string;
}

// ============================================================================
// FormField Types
// ============================================================================

export interface FormFieldProps {
  /** Field label */
  label?: string;
  /** Helper text displayed below the input */
  helperText?: string;
  /** Error message (shows error state when provided) */
  error?: string;
  /** Success message (shows success state when provided) */
  success?: string;
  /** Mark field as required */
  required?: boolean;
  /** Disable the entire field */
  disabled?: boolean;
  /** Additional className for wrapper */
  className?: string;
  /** ID override (auto-generated if not provided) */
  id?: string;
  /** The form input element */
  children: ReactElement;
}

// ============================================================================
// FormGroup Types
// ============================================================================

export type FormGroupOrientation = 'vertical' | 'horizontal';

export interface FormGroupProps {
  /** Group legend/title */
  legend?: string;
  /** Optional description below legend */
  description?: string;
  /** Layout orientation for children */
  orientation?: FormGroupOrientation;
  /** Gap between children */
  gap?: '2' | '3' | '4' | '6';
  /** Error for the entire group */
  error?: string;
  /** Disable all fields in group */
  disabled?: boolean;
  /** Additional className */
  className?: string;
  /** Group children */
  children: ReactNode;
}
