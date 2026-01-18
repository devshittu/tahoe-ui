// src/components/Form/index.ts

/**
 * Form Controls
 *
 * A comprehensive form control system built with HeadlessUI for accessibility.
 * All components follow the design principles and support validation states.
 *
 * Components:
 * - FormField: Label, helper text, error handling wrapper
 * - FormGroup: Fieldset for grouping related fields
 * - Input: Text input with variants and icons
 * - Textarea: Multi-line input with auto-resize
 * - Select: Dropdown using HeadlessUI Listbox
 * - Checkbox: Accessible checkbox with animations
 * - RadioGroup: Radio buttons with descriptions
 * - Switch: Toggle switch with spring animation
 * - Slider: Range input with dual thumb support
 * - DatePicker: Calendar date selection
 * - FileUpload: Drag and drop file upload
 */

// Wrapper components
export { FormField, default as FormFieldDefault } from './FormField';
export { FormGroup, default as FormGroupDefault } from './FormGroup';

// Input components
export { Input, default as InputDefault } from './Input';
export { Textarea, default as TextareaDefault } from './Textarea';
export { Select, default as SelectDefault } from './Select';

// Selection components
export { Checkbox, default as CheckboxDefault } from './Checkbox';
export { RadioGroup, default as RadioGroupDefault } from './RadioGroup';
export { Switch, default as SwitchDefault } from './Switch';

// Advanced components
export { Slider, default as SliderDefault } from './Slider';
export { DatePicker, default as DatePickerDefault } from './DatePicker';
export { FileUpload, default as FileUploadDefault } from './FileUpload';

// Types
export type { FormFieldProps } from './FormField';
export type { FormGroupProps, FormGroupOrientation } from './FormGroup';
export type { InputProps, InputVariant, InputSize, InputState } from './Input';
export type {
  TextareaProps,
  TextareaVariant,
  TextareaSize,
  TextareaState,
} from './Textarea';
export type {
  SelectProps,
  SelectOption,
  SelectSize,
  SelectState,
} from './Select';
export type { CheckboxProps, CheckboxSize } from './Checkbox';
export type {
  RadioGroupProps,
  RadioOption,
  RadioGroupSize,
  RadioGroupOrientation,
} from './RadioGroup';
export type { SwitchProps, SwitchSize } from './Switch';
export type { SliderProps, SliderSize, SliderMark } from './Slider';
export type { DatePickerProps, DatePickerSize } from './DatePicker';
export type { FileUploadProps, UploadedFile } from './FileUpload';
