// src/app/playground/code-studio/components/primitives/Controls.tsx
'use client';

import React from 'react';
import { cn } from '@/lib/utils';
import type {
  ControlProps,
  TextControl,
  NumberControl,
  BooleanControl,
  SelectControl,
  RadioControl,
  RangeControl,
  StudioSize,
} from '../types';
import { getSizeConfig } from '../types';

/**
 * Control wrapper with label
 */
interface ControlWrapperProps {
  label: string;
  description?: string;
  required?: boolean;
  size?: StudioSize;
  children: React.ReactNode;
  className?: string;
}

export function ControlWrapper({
  label,
  description,
  required,
  size = 'default',
  children,
  className,
}: ControlWrapperProps) {
  const sizeConfig = getSizeConfig(size);

  return (
    <div
      className={cn('flex flex-col', className)}
      style={{ gap: sizeConfig.gap / 2 }}
    >
      <label className="flex items-center gap-1">
        <span
          className="text-gray-700 dark:text-gray-300 font-medium"
          style={{ fontSize: sizeConfig.fontSize }}
        >
          {label}
        </span>
        {required && <span className="text-red-500">*</span>}
      </label>
      {children}
      {description && (
        <span
          className="text-gray-500 dark:text-gray-400"
          style={{ fontSize: sizeConfig.fontSize - 2 }}
        >
          {description}
        </span>
      )}
    </div>
  );
}

/**
 * Text input control
 */
export function TextControlInput({
  control,
  name,
  value,
  onChange,
  size = 'default',
}: ControlProps<TextControl>) {
  const sizeConfig = getSizeConfig(size);
  const stringValue = String(value ?? '');

  const inputClasses = cn(
    'w-full px-3 rounded-lg',
    'bg-white dark:bg-gray-800',
    'border border-gray-200 dark:border-gray-700',
    'text-gray-900 dark:text-gray-100',
    'placeholder:text-gray-400 dark:placeholder:text-gray-500',
    'focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500',
    'transition-colors duration-150',
    control.disabled && 'opacity-50 cursor-not-allowed',
  );

  return (
    <ControlWrapper
      label={control.label ?? name}
      description={control.description}
      required={control.required}
      size={size}
    >
      {control.multiline ? (
        <textarea
          value={stringValue}
          onChange={(e) => onChange(e.target.value)}
          placeholder={control.placeholder}
          disabled={control.disabled}
          minLength={control.minLength}
          maxLength={control.maxLength}
          className={cn(inputClasses, 'resize-y min-h-[80px]')}
          style={{
            fontSize: sizeConfig.fontSize,
            padding: `${sizeConfig.padding / 2}px ${sizeConfig.padding}px`,
          }}
        />
      ) : (
        <input
          type="text"
          value={stringValue}
          onChange={(e) => onChange(e.target.value)}
          placeholder={control.placeholder}
          disabled={control.disabled}
          minLength={control.minLength}
          maxLength={control.maxLength}
          className={inputClasses}
          style={{
            fontSize: sizeConfig.fontSize,
            height: sizeConfig.controlHeight,
          }}
        />
      )}
    </ControlWrapper>
  );
}

/**
 * Number input control
 */
export function NumberControlInput({
  control,
  name,
  value,
  onChange,
  size = 'default',
}: ControlProps<NumberControl>) {
  const sizeConfig = getSizeConfig(size);
  const numValue = Number(value ?? 0);

  return (
    <ControlWrapper
      label={control.label ?? name}
      description={control.description}
      required={control.required}
      size={size}
    >
      <input
        type="number"
        value={numValue}
        onChange={(e) => onChange(Number(e.target.value))}
        min={control.min}
        max={control.max}
        step={control.step}
        disabled={control.disabled}
        className={cn(
          'w-full px-3 rounded-lg',
          'bg-white dark:bg-gray-800',
          'border border-gray-200 dark:border-gray-700',
          'text-gray-900 dark:text-gray-100',
          'focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500',
          'transition-colors duration-150',
          control.disabled && 'opacity-50 cursor-not-allowed',
        )}
        style={{
          fontSize: sizeConfig.fontSize,
          height: sizeConfig.controlHeight,
        }}
      />
    </ControlWrapper>
  );
}

/**
 * Boolean toggle control
 */
export function BooleanControlInput({
  control,
  name,
  value,
  onChange,
  size = 'default',
}: ControlProps<BooleanControl>) {
  const sizeConfig = getSizeConfig(size);
  const boolValue = Boolean(value);

  return (
    <div className="flex items-center justify-between">
      <label className="flex items-center gap-1">
        <span
          className="text-gray-700 dark:text-gray-300 font-medium"
          style={{ fontSize: sizeConfig.fontSize }}
        >
          {control.label ?? name}
        </span>
        {control.required && <span className="text-red-500">*</span>}
      </label>
      <button
        type="button"
        role="switch"
        aria-checked={boolValue}
        onClick={() => onChange(!boolValue)}
        disabled={control.disabled}
        className={cn(
          'relative inline-flex shrink-0 cursor-pointer rounded-full',
          'transition-colors duration-200 ease-in-out',
          'focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/50',
          boolValue
            ? 'bg-blue-600 dark:bg-blue-500'
            : 'bg-gray-200 dark:bg-gray-700',
          control.disabled && 'opacity-50 cursor-not-allowed',
        )}
        style={{
          width: size === 'compact' ? 36 : size === 'large' ? 48 : 40,
          height: size === 'compact' ? 20 : size === 'large' ? 28 : 24,
        }}
      >
        <span
          className={cn(
            'pointer-events-none inline-block rounded-full bg-white shadow-sm',
            'transform transition-transform duration-200 ease-in-out',
          )}
          style={{
            width: size === 'compact' ? 16 : size === 'large' ? 24 : 20,
            height: size === 'compact' ? 16 : size === 'large' ? 24 : 20,
            marginTop: 2,
            marginLeft: boolValue
              ? size === 'compact'
                ? 18
                : size === 'large'
                  ? 22
                  : 18
              : 2,
          }}
        />
      </button>
    </div>
  );
}

/**
 * Select dropdown control
 */
export function SelectControlInput({
  control,
  name,
  value,
  onChange,
  size = 'default',
}: ControlProps<SelectControl>) {
  const sizeConfig = getSizeConfig(size);
  const stringValue = String(value ?? '');

  const options = control.options.map((opt) =>
    typeof opt === 'string' ? { value: opt, label: opt } : opt,
  );

  return (
    <ControlWrapper
      label={control.label ?? name}
      description={control.description}
      required={control.required}
      size={size}
    >
      <select
        value={stringValue}
        onChange={(e) => onChange(e.target.value)}
        disabled={control.disabled}
        className={cn(
          'w-full px-3 rounded-lg appearance-none',
          'bg-white dark:bg-gray-800',
          'border border-gray-200 dark:border-gray-700',
          'text-gray-900 dark:text-gray-100',
          'focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500',
          'transition-colors duration-150',
          'cursor-pointer',
          control.disabled && 'opacity-50 cursor-not-allowed',
        )}
        style={{
          fontSize: sizeConfig.fontSize,
          height: sizeConfig.controlHeight,
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3E%3Cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='m6 8 4 4 4-4'/%3E%3C/svg%3E")`,
          backgroundPosition: 'right 8px center',
          backgroundRepeat: 'no-repeat',
          backgroundSize: '20px',
          paddingRight: '32px',
        }}
      >
        <option value="">Select...</option>
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </ControlWrapper>
  );
}

/**
 * Radio button group control
 */
export function RadioControlInput({
  control,
  name,
  value,
  onChange,
  size = 'default',
}: ControlProps<RadioControl>) {
  const sizeConfig = getSizeConfig(size);
  const stringValue = String(value ?? '');

  const options = control.options.map((opt) =>
    typeof opt === 'string' ? { value: opt, label: opt } : opt,
  );

  return (
    <ControlWrapper
      label={control.label ?? name}
      description={control.description}
      required={control.required}
      size={size}
    >
      <div className="flex flex-wrap gap-2">
        {options.map((opt) => (
          <button
            key={opt.value}
            type="button"
            onClick={() => onChange(opt.value)}
            disabled={control.disabled}
            className={cn(
              'px-3 py-1.5 rounded-lg',
              'border transition-all duration-150',
              'focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/50',
              stringValue === opt.value
                ? 'bg-gray-900 dark:bg-white text-white dark:text-gray-900 border-transparent'
                : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600',
              control.disabled && 'opacity-50 cursor-not-allowed',
            )}
            style={{ fontSize: sizeConfig.fontSize }}
          >
            {opt.label}
          </button>
        ))}
      </div>
    </ControlWrapper>
  );
}

/**
 * Range slider control
 */
export function RangeControlInput({
  control,
  name,
  value,
  onChange,
  size = 'default',
}: ControlProps<RangeControl>) {
  const sizeConfig = getSizeConfig(size);
  const numValue = Number(value ?? control.min);

  return (
    <ControlWrapper
      label={control.label ?? name}
      description={control.description}
      required={control.required}
      size={size}
    >
      <div className="flex items-center gap-3">
        <input
          type="range"
          value={numValue}
          onChange={(e) => onChange(Number(e.target.value))}
          min={control.min}
          max={control.max}
          step={control.step ?? 1}
          disabled={control.disabled}
          className={cn(
            'flex-1 h-2 rounded-full appearance-none cursor-pointer',
            'bg-gray-200 dark:bg-gray-700',
            '[&::-webkit-slider-thumb]:appearance-none',
            '[&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4',
            '[&::-webkit-slider-thumb]:rounded-full',
            '[&::-webkit-slider-thumb]:bg-gray-900 dark:[&::-webkit-slider-thumb]:bg-white',
            '[&::-webkit-slider-thumb]:shadow-sm',
            '[&::-webkit-slider-thumb]:cursor-pointer',
            control.disabled && 'opacity-50 cursor-not-allowed',
          )}
        />
        {control.showValue !== false && (
          <span
            className="text-gray-600 dark:text-gray-400 tabular-nums min-w-[3ch] text-right"
            style={{ fontSize: sizeConfig.fontSize }}
          >
            {numValue}
          </span>
        )}
      </div>
    </ControlWrapper>
  );
}

/**
 * Color picker control (simplified)
 */
export function ColorControlInput({
  control,
  name,
  value,
  onChange,
  size = 'default',
}: ControlProps) {
  const sizeConfig = getSizeConfig(size);
  const colorValue = String(value ?? '#000000');

  return (
    <ControlWrapper
      label={(control as { label?: string }).label ?? name}
      description={(control as { description?: string }).description}
      required={(control as { required?: boolean }).required}
      size={size}
    >
      <div className="flex items-center gap-2">
        <input
          type="color"
          value={colorValue}
          onChange={(e) => onChange(e.target.value)}
          disabled={(control as { disabled?: boolean }).disabled}
          className={cn(
            'w-10 h-10 rounded-lg cursor-pointer',
            'border border-gray-200 dark:border-gray-700',
            (control as { disabled?: boolean }).disabled &&
              'opacity-50 cursor-not-allowed',
          )}
        />
        <input
          type="text"
          value={colorValue}
          onChange={(e) => onChange(e.target.value)}
          disabled={(control as { disabled?: boolean }).disabled}
          className={cn(
            'flex-1 px-3 rounded-lg',
            'bg-white dark:bg-gray-800',
            'border border-gray-200 dark:border-gray-700',
            'text-gray-900 dark:text-gray-100 font-mono',
            'focus:outline-none focus:ring-2 focus:ring-blue-500/30',
            (control as { disabled?: boolean }).disabled &&
              'opacity-50 cursor-not-allowed',
          )}
          style={{
            fontSize: sizeConfig.fontSize,
            height: sizeConfig.controlHeight,
          }}
        />
      </div>
    </ControlWrapper>
  );
}
