'use client';

import React from 'react';
import { twMerge } from 'tailwind-merge';
import type {
  PropsPanelProps,
  PropControl,
  StudioSize,
  SelectControl,
  RangeControl,
} from '../types';
import { getSizeConfig, STUDIO_STYLES } from '../types';

interface ControlRendererProps {
  name: string;
  control: PropControl;
  value: unknown;
  onChange: (value: unknown) => void;
  size: StudioSize;
}

/**
 * Render a control based on its type
 */
function ControlRenderer({
  name,
  control,
  value,
  onChange,
  size,
}: ControlRendererProps) {
  const sizeConfig = getSizeConfig(size);
  const inputClasses = twMerge(
    'w-full rounded-lg px-3',
    STUDIO_STYLES.control.input,
    STUDIO_STYLES.control.focus,
    'outline-none transition-all duration-150',
    'text-text-primary dark:text-text-primary',
  );

  switch (control.type) {
    case 'text':
      return (
        <input
          type="text"
          value={(value as string) ?? ''}
          onChange={(e) => onChange(e.target.value)}
          placeholder={control.placeholder}
          maxLength={control.maxLength}
          disabled={control.disabled}
          className={inputClasses}
          style={{
            height: sizeConfig.controlHeight,
            fontSize: sizeConfig.fontSize,
          }}
        />
      );

    case 'number':
      return (
        <input
          type="number"
          value={(value as number) ?? 0}
          onChange={(e) => onChange(Number(e.target.value))}
          min={control.min}
          max={control.max}
          step={control.step}
          disabled={control.disabled}
          className={inputClasses}
          style={{
            height: sizeConfig.controlHeight,
            fontSize: sizeConfig.fontSize,
          }}
        />
      );

    case 'boolean':
      return (
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            checked={(value as boolean) ?? false}
            onChange={(e) => onChange(e.target.checked)}
            disabled={control.disabled}
            className={twMerge(
              'w-4 h-4 rounded',
              'border-border-default',
              'text-brand-primary-500 focus:ring-brand-primary-500/20',
            )}
          />
          <span
            className="text-text-secondary dark:text-text-muted"
            style={{ fontSize: sizeConfig.fontSize }}
          >
            {(value as boolean) ? 'Enabled' : 'Disabled'}
          </span>
        </label>
      );

    case 'select':
      const selectControl = control as SelectControl;
      return (
        <select
          value={(value as string) ?? ''}
          onChange={(e) => onChange(e.target.value)}
          disabled={control.disabled}
          className={inputClasses}
          style={{
            height: sizeConfig.controlHeight,
            fontSize: sizeConfig.fontSize,
          }}
        >
          {selectControl.options.map((option) => {
            const optValue = typeof option === 'string' ? option : option.value;
            const optLabel = typeof option === 'string' ? option : option.label;
            return (
              <option key={optValue} value={optValue}>
                {optLabel}
              </option>
            );
          })}
        </select>
      );

    case 'color':
      return (
        <div className="flex items-center gap-2">
          <input
            type="color"
            value={(value as string) ?? '#000000'}
            onChange={(e) => onChange(e.target.value)}
            disabled={control.disabled}
            className="w-8 h-8 rounded cursor-pointer border border-border-default"
          />
          <input
            type="text"
            value={(value as string) ?? '#000000'}
            onChange={(e) => onChange(e.target.value)}
            disabled={control.disabled}
            className={twMerge(inputClasses, 'flex-1 font-mono')}
            style={{
              height: sizeConfig.controlHeight,
              fontSize: sizeConfig.fontSize,
            }}
          />
        </div>
      );

    case 'range':
      const rangeControl = control as RangeControl;
      return (
        <div className="flex items-center gap-3">
          <input
            type="range"
            value={(value as number) ?? rangeControl.min}
            onChange={(e) => onChange(Number(e.target.value))}
            min={rangeControl.min}
            max={rangeControl.max}
            step={rangeControl.step ?? 1}
            disabled={control.disabled}
            className="flex-1 accent-brand-primary-500"
          />
          {rangeControl.showValue !== false && (
            <span
              className="text-text-muted font-mono min-w-[3ch] text-right"
              style={{ fontSize: sizeConfig.fontSize }}
            >
              {value as number}
            </span>
          )}
        </div>
      );

    default:
      return null;
  }
}

/**
 * PropsPanel - Panel for editing component props
 */
export function PropsPanel({
  controls,
  values,
  onChange,
  onReset,
  size = 'default',
  className,
}: PropsPanelProps) {
  const sizeConfig = getSizeConfig(size);

  // Group controls
  const groupedControls = React.useMemo(() => {
    const groups: Record<string, Array<[string, PropControl]>> = {
      default: [],
    };

    for (const [name, control] of Object.entries(controls)) {
      const groupName = control.group || 'default';
      if (!groups[groupName]) {
        groups[groupName] = [];
      }
      groups[groupName].push([name, control]);
    }

    return groups;
  }, [controls]);

  return (
    <div
      className={twMerge('flex flex-col h-full', className)}
      style={{ minWidth: 280 }}
    >
      {/* Header */}
      <div
        className={twMerge(
          'flex items-center justify-between',
          STUDIO_STYLES.panel.header,
        )}
        style={{ padding: sizeConfig.padding }}
      >
        <span
          className="font-semibold text-text-primary dark:text-text-primary"
          style={{ fontSize: sizeConfig.fontSize + 1 }}
        >
          Props
        </span>
        <button
          type="button"
          onClick={onReset}
          className={twMerge(
            'text-text-muted hover:text-text-secondary',
            'transition-colors duration-150',
          )}
          style={{ fontSize: sizeConfig.fontSize - 1 }}
        >
          Reset
        </button>
      </div>

      {/* Controls */}
      <div
        className="flex-1 overflow-auto"
        style={{ padding: sizeConfig.padding }}
      >
        {Object.entries(groupedControls).map(([groupName, groupControls]) => (
          <div key={groupName} className="mb-4 last:mb-0">
            {groupName !== 'default' && (
              <h4
                className={twMerge(
                  'font-medium text-text-secondary dark:text-text-muted',
                  'mb-2 pb-1 border-b border-border-subtle/50',
                )}
                style={{ fontSize: sizeConfig.fontSize - 1 }}
              >
                {groupName}
              </h4>
            )}
            <div style={{ gap: sizeConfig.gap }} className="flex flex-col">
              {groupControls.map(([name, control]) => (
                <div key={name}>
                  <label
                    className={twMerge(
                      'block mb-1.5',
                      STUDIO_STYLES.control.label,
                    )}
                    style={{ fontSize: sizeConfig.fontSize - 1 }}
                  >
                    {control.label || name}
                    {control.required && (
                      <span className="text-error ml-0.5">*</span>
                    )}
                  </label>
                  {control.description && (
                    <p
                      className="text-text-muted mb-1"
                      style={{ fontSize: sizeConfig.fontSize - 2 }}
                    >
                      {control.description}
                    </p>
                  )}
                  <ControlRenderer
                    name={name}
                    control={control}
                    value={values[name]}
                    onChange={(val) => onChange(name, val)}
                    size={size}
                  />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default PropsPanel;
