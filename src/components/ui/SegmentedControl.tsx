import React from 'react';

export interface SegmentOption<T extends string> {
  value: T;
  label: string;
}

interface SegmentedControlProps<T extends string> {
  options: readonly SegmentOption<T>[];
  value: T;
  onChange: (value: T) => void;
  className?: string;
}

export function SegmentedControl<T extends string>({
  options,
  value,
  onChange,
  className = '',
}: SegmentedControlProps<T>) {
  return (
    <div
      className={`inline-flex flex-wrap gap-1 p-1 rounded-md bg-theme-inset border border-theme-border ${className}`}
      role="tablist"
    >
      {options.map((option) => {
        const isActive = option.value === value;
        return (
          <button
            key={option.value}
            type="button"
            role="tab"
            aria-selected={isActive}
            onClick={() => onChange(option.value)}
            className={`px-3 py-1.5 rounded text-xs font-medium transition-all duration-150 cursor-pointer ${
              isActive
                ? 'bg-theme-card text-theme-text border border-theme-border shadow-xs'
                : 'text-theme-text-muted hover:text-theme-text border border-transparent'
            }`}
          >
            {option.label}
          </button>
        );
      })}
    </div>
  );
}
