import React from 'react';

interface ToggleSwitchProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label: string;
  description?: string;
}

export const ToggleSwitch: React.FC<ToggleSwitchProps> = ({
  checked,
  onChange,
  label,
  description,
}) => {
  return (
    <label className="flex items-center justify-between gap-3 cursor-pointer select-none group">
      <div className="flex flex-col">
        <span className="text-sm font-medium text-theme-text group-hover:text-theme-brand transition-colors">
          {label}
        </span>
        {description && (
          <span className="text-xs text-theme-text-muted">{description}</span>
        )}
      </div>

      <button
        type="button"
        role="switch"
        aria-checked={checked}
        onClick={() => onChange(!checked)}
        className={`relative inline-flex h-5 w-9 shrink-0 items-center rounded-full border transition-colors duration-150 cursor-pointer ${
          checked
            ? 'bg-theme-brand border-theme-brand'
            : 'bg-theme-inset border-theme-border-strong'
        }`}
      >
        <span
          className={`inline-block h-3.5 w-3.5 rounded-full transition-transform duration-150 ${
            checked
              ? 'translate-x-4.5 bg-theme-brand-fg'
              : 'translate-x-0.5 bg-theme-text-muted'
          }`}
        />
      </button>
    </label>
  );
};
