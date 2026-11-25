import React from 'react';
import { ToolIcon } from '../ToolIcon';

interface ToolHeaderProps {
  icon: string;
  title: string;
  description: string;
  code?: string;
  actions?: React.ReactNode;
}

export const ToolHeader: React.FC<ToolHeaderProps> = ({
  icon,
  title,
  description,
  code,
  actions,
}) => {
  return (
    <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 border-b border-theme-border pb-5">
      <div className="space-y-1.5">
        <div className="flex items-center gap-2.5 flex-wrap">
          <span className="inline-flex items-center justify-center w-8 h-8 rounded-md bg-theme-inset border border-theme-border text-theme-brand shrink-0">
            <ToolIcon name={icon} className="w-4 h-4" />
          </span>
          <h2 className="font-display text-xl md:text-2xl font-bold tracking-tight text-theme-text">
            {title}
          </h2>
          {code && (
            <span className="font-mono text-[11px] font-medium px-2 py-0.5 rounded bg-theme-inset border border-theme-border text-theme-text-muted">
              {code}
            </span>
          )}
        </div>
        <p className="text-sm text-theme-text-muted leading-relaxed max-w-2xl">
          {description}
        </p>
      </div>

      {actions && (
        <div className="flex items-center gap-2 shrink-0">
          {actions}
        </div>
      )}
    </div>
  );
};
