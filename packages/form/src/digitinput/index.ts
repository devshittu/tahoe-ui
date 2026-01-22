// packages/form/src/digitinput/index.ts

export { DigitInput, default as DigitInputDefault } from './DigitInput';
export type { DigitInputRef } from './DigitInput';

export {
  useDigitInput,
  default as useDigitInputDefault,
} from './useDigitInput';
export type { UseDigitInputOptions } from './useDigitInput';

export { Numpad, CompactNumpad, default as NumpadDefault } from './Numpad';
export type { CompactNumpadProps } from './Numpad';

export type {
  DigitInputProps,
  DigitInputMode,
  DigitInputVariant,
  DigitInputSize,
  DigitInputState,
  DigitInputConfig,
  BoxAnimationState,
  UseDigitInputReturn,
  NumpadProps,
} from './types';

export {
  DIGIT_INPUT_CONFIG,
  SIZE_CONFIG as DIGIT_INPUT_SIZE_CONFIG,
  VARIANT_STYLES as DIGIT_INPUT_VARIANT_STYLES,
  NUMPAD_BUTTON_STYLES,
  SPRING_CONFIGS as DIGIT_INPUT_SPRING_CONFIGS,
  HAPTIC_PATTERNS as DIGIT_INPUT_HAPTIC_PATTERNS,
} from './types';
