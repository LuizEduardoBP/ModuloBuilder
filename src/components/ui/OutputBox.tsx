import React from 'react';
import { Check, Copy } from 'lucide-react';

interface OutputBoxProps {
  value: string;
  placeholder?: string;
  copied?: boolean;
  onCopy?: () => void;
  copyLabel?: string;
  className?: string;
  size?: 'md' | 'lg';
}

export const OutputBox: React.FC<OutputBoxProps> = ({
  value,
  placeholder = '—',
  copied = false,
  onCopy,
  copyLabel = 'Copiar',
  className = '',
  size = 'lg',
}) => {
  const textSize = size === 'lg' ? 'text-lg sm:text-xl tracking-wider' : 'text-sm sm:text-base';

  return (
    <div
      className={`bg-theme-inset border border-theme-border rounded-md px-4 py-3.5 flex items-center justify-between gap-3 min-h-[58px] ${className}`}
    >
      <span
        className={`font-mono font-semibold break-all select-all ${textSize} ${
          value ? 'text-theme-text' : 'text-theme-text-subtle'
        }`}
      >
        {value || placeholder}
      </span>

      {value && onCopy && (
        <button
          type="button"
          onClick={onCopy}
          title={copyLabel}
          className={`inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-md text-xs font-medium border transition-colors duration-150 cursor-pointer shrink-0 ${
            copied
              ? 'bg-theme-success-bg border-theme-success-border text-theme-success'
              : 'bg-theme-card border-theme-border hover:border-theme-border-strong text-theme-text-muted hover:text-theme-text'
          }`}
        >
          {copied ? (
            <>
              <Check className="w-3.5 h-3.5" />
              <span>Copiado</span>
            </>
          ) : (
            <>
              <Copy className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">{copyLabel}</span>
            </>
          )}
        </button>
      )}
    </div>
  );
};
