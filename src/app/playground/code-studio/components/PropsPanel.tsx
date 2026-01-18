// src/app/playground/code-studio/components/PropsPanel.tsx
'use client';

import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import type {
  PropsPanelProps,
  PropControl,
  TextControl,
  NumberControl,
  BooleanControl,
  SelectControl,
  RadioControl,
  RangeControl,
  StudioSize,
} from './types';
import { getSizeConfig, STUDIO_ANIMATIONS } from './types';
import {
  TextControlInput,
  NumberControlInput,
  BooleanControlInput,
  SelectControlInput,
  RadioControlInput,
  RangeControlInput,
  ColorControlInput,
} from './primitives/Controls';

/**
 * Renders the appropriate control component based on type
 */
function renderControl(
  name: string,
  control: PropControl,
  value: unknown,
  onChange: (value: unknown) => void,
  size: StudioSize,
) {
  const commonProps = { name, value, onChange, size };

  switch (control.type) {
    case 'text':
      return (
        <TextControlInput {...commonProps} control={control as TextControl} />
      );
    case 'number':
      return (
        <NumberControlInput
          {...commonProps}
          control={control as NumberControl}
        />
      );
    case 'boolean':
      return (
        <BooleanControlInput
          {...commonProps}
          control={control as BooleanControl}
        />
      );
    case 'select':
      return (
        <SelectControlInput
          {...commonProps}
          control={control as SelectControl}
        />
      );
    case 'radio':
      return (
        <RadioControlInput {...commonProps} control={control as RadioControl} />
      );
    case 'range':
      return (
        <RangeControlInput {...commonProps} control={control as RangeControl} />
      );
    case 'color':
      return <ColorControlInput {...commonProps} control={control} />;
    case 'object':
    case 'array':
    case 'function':
      // Complex types - show read-only badge for now
      return (
        <div className="flex items-center justify-between">
          <span
            className="text-gray-700 dark:text-gray-300 font-medium"
            style={{ fontSize: getSizeConfig(size).fontSize }}
          >
            {control.label ?? name}
          </span>
          <span className="px-2 py-0.5 text-xs rounded-md bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400">
            {control.type}
          </span>
        </div>
      );
    default:
      return null;
  }
}

/**
 * Group controls by their group property
 */
interface GroupedControls {
  ungrouped: Array<[string, PropControl]>;
  groups: Record<string, Array<[string, PropControl]>>;
}

function groupControls(controls: Record<string, PropControl>): GroupedControls {
  const result: GroupedControls = {
    ungrouped: [],
    groups: {},
  };

  for (const [name, control] of Object.entries(controls)) {
    if (control.group) {
      if (!result.groups[control.group]) {
        result.groups[control.group] = [];
      }
      result.groups[control.group].push([name, control]);
    } else {
      result.ungrouped.push([name, control]);
    }
  }

  return result;
}

/**
 * Props Panel component - renders all controls for a component
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
  const grouped = useMemo(() => groupControls(controls), [controls]);

  const hasChanges = useMemo(() => {
    return Object.keys(values).length > 0;
  }, [values]);

  return (
    <div
      className={cn(
        'flex flex-col h-full',
        'bg-white/80 dark:bg-gray-900/80',
        'backdrop-blur-xl',
        'border border-gray-200/50 dark:border-gray-800/50',
        'overflow-hidden',
        className,
      )}
      style={{ borderRadius: sizeConfig.borderRadius }}
    >
      {/* Header */}
      <div
        className={cn(
          'flex items-center justify-between',
          'border-b border-gray-200/50 dark:border-gray-800/50',
          'bg-gray-50/50 dark:bg-gray-800/30',
        )}
        style={{ padding: sizeConfig.padding }}
      >
        <h3
          className="font-semibold text-gray-900 dark:text-gray-100"
          style={{ fontSize: sizeConfig.fontSize + 2 }}
        >
          Props
        </h3>
        <motion.button
          type="button"
          onClick={onReset}
          disabled={!hasChanges}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className={cn(
            'px-3 py-1.5 rounded-lg',
            'text-gray-600 dark:text-gray-400',
            'hover:bg-gray-100 dark:hover:bg-gray-800',
            'transition-colors duration-150',
            'disabled:opacity-40 disabled:cursor-not-allowed',
          )}
          style={{ fontSize: sizeConfig.fontSize - 1 }}
        >
          Reset
        </motion.button>
      </div>

      {/* Controls List */}
      <div
        className="flex-1 overflow-y-auto"
        style={{ padding: sizeConfig.padding }}
      >
        <div className="flex flex-col" style={{ gap: sizeConfig.gap }}>
          {/* Ungrouped controls first */}
          {grouped.ungrouped.map(([name, control]) => (
            <motion.div
              key={name}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={STUDIO_ANIMATIONS.fast}
            >
              {renderControl(
                name,
                control,
                values[name],
                (v) => onChange(name, v),
                size,
              )}
            </motion.div>
          ))}

          {/* Grouped controls */}
          {Object.entries(grouped.groups).map(([groupName, groupControls]) => (
            <ControlGroup
              key={groupName}
              name={groupName}
              controls={groupControls}
              values={values}
              onChange={onChange}
              size={size}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

/**
 * Control group with collapsible header
 */
interface ControlGroupProps {
  name: string;
  controls: Array<[string, PropControl]>;
  values: Record<string, unknown>;
  onChange: (name: string, value: unknown) => void;
  size: StudioSize;
}

function ControlGroup({
  name,
  controls,
  values,
  onChange,
  size,
}: ControlGroupProps) {
  const [isExpanded, setIsExpanded] = React.useState(true);
  const sizeConfig = getSizeConfig(size);

  return (
    <div className="flex flex-col" style={{ gap: sizeConfig.gap / 2 }}>
      <button
        type="button"
        onClick={() => setIsExpanded(!isExpanded)}
        className={cn(
          'flex items-center gap-2 w-full',
          'text-left font-medium',
          'text-gray-500 dark:text-gray-400',
          'hover:text-gray-700 dark:hover:text-gray-300',
          'transition-colors duration-150',
        )}
        style={{ fontSize: sizeConfig.fontSize - 1 }}
      >
        <motion.span
          animate={{ rotate: isExpanded ? 90 : 0 }}
          transition={STUDIO_ANIMATIONS.fast}
          className="text-gray-400"
        >
          ▶
        </motion.span>
        <span className="uppercase tracking-wide">{name}</span>
      </button>

      <motion.div
        initial={false}
        animate={{
          height: isExpanded ? 'auto' : 0,
          opacity: isExpanded ? 1 : 0,
        }}
        transition={STUDIO_ANIMATIONS.springGentle}
        className="overflow-hidden"
      >
        <div
          className={cn(
            'flex flex-col',
            'pl-4 border-l-2 border-gray-200 dark:border-gray-700',
          )}
          style={{ gap: sizeConfig.gap }}
        >
          {controls.map(([controlName, control]) => (
            <div key={controlName}>
              {renderControl(
                controlName,
                control,
                values[controlName],
                (v) => onChange(controlName, v),
                size,
              )}
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}

export default PropsPanel;
