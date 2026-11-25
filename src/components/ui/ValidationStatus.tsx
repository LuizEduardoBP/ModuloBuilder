import React from 'react';
import { CheckCircle2, AlertCircle, Info, Loader2 } from 'lucide-react';

export type ValidationState = 'idle' | 'valid' | 'invalid' | 'loading';

interface ValidationStatusProps {
  state: ValidationState;
  title?: string;
  message: string;
}

const STATE_STYLES: Record<
  ValidationState,
  { container: string; iconColor: string }
> = {
  idle: {
    container: 'bg-theme-inset border-theme-border text-theme-text-muted',
    iconColor: 'text-theme-text-subtle',
  },
  valid: {
    container: 'bg-theme-success-bg border-theme-success-border text-theme-success',
    iconColor: 'text-theme-success',
  },
  invalid: {
    container: 'bg-theme-error-bg border-theme-error-border text-theme-error',
    iconColor: 'text-theme-error',
  },
  loading: {
    container: 'bg-theme-brand-light border-theme-brand-border text-theme-brand',
    iconColor: 'text-theme-brand',
  },
};

export const ValidationStatus: React.FC<ValidationStatusProps> = ({
  state,
  title,
  message,
}) => {
  const styles = STATE_STYLES[state];

  const renderIcon = () => {
    switch (state) {
      case 'valid':
        return <CheckCircle2 className={`w-4 h-4 shrink-0 mt-0.5 ${styles.iconColor}`} />;
      case 'invalid':
        return <AlertCircle className={`w-4 h-4 shrink-0 mt-0.5 ${styles.iconColor}`} />;
      case 'loading':
        return <Loader2 className={`w-4 h-4 shrink-0 mt-0.5 animate-spin ${styles.iconColor}`} />;
      case 'idle':
      default:
        return <Info className={`w-4 h-4 shrink-0 mt-0.5 ${styles.iconColor}`} />;
    }
  };

  return (
    <div
      className={`border rounded-md px-3.5 py-3 flex items-start gap-2.5 text-sm ${styles.container}`}
    >
      {renderIcon()}
      <div className="min-w-0">
        {title && <span className="font-semibold block leading-snug">{title}</span>}
        <span className={`text-xs block leading-relaxed ${title ? 'mt-0.5 opacity-90' : ''}`}>
          {message}
        </span>
      </div>
    </div>
  );
};
