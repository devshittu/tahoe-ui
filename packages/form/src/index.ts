/**
 * @tahoe-ui/form
 *
 * Form components for the Tahoe UI design system.
 * Built with HeadlessUI for accessibility and Framer Motion for animations.
 *
 * @packageDocumentation
 *
 * @example
 * ```tsx
 * import {
 *   Input, Textarea, Select,
 *   Checkbox, RadioGroup, Switch,
 *   Slider, DatePicker, FileUpload,
 *   FormField, FormGroup
 * } from '@tahoe-ui/form';
 *
 * // Text input with validation
 * <FormField label="Email" required error={errors.email}>
 *   <Input type="email" placeholder="Enter email" state="error" />
 * </FormField>
 *
 * // Select dropdown
 * <Select
 *   options={[
 *     { value: 'apple', label: 'Apple' },
 *     { value: 'banana', label: 'Banana' },
 *   ]}
 *   value={fruit}
 *   onChange={setFruit}
 * />
 *
 * // Checkbox with label
 * <Checkbox label="Accept terms" checked={accepted} onChange={setAccepted} />
 * ```
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
export type {
  // Input
  InputProps,
  InputVariant,
  InputSize,
  InputState,
  // Textarea
  TextareaProps,
  TextareaVariant,
  TextareaSize,
  TextareaState,
  // Select
  SelectProps,
  SelectOption,
  SelectSize,
  SelectState,
  // Checkbox
  CheckboxProps,
  CheckboxSize,
  // RadioGroup
  RadioGroupProps,
  RadioOption,
  RadioGroupSize,
  RadioGroupOrientation,
  // Switch
  SwitchProps,
  SwitchSize,
  // Slider
  SliderProps,
  SliderSize,
  SliderMark,
  // DatePicker
  DatePickerProps,
  DatePickerSize,
  // FileUpload
  FileUploadProps,
  UploadedFile,
  // Form wrappers
  FormFieldProps,
  FormGroupProps,
  FormGroupOrientation,
} from './types';
