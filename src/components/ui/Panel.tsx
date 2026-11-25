import React from 'react';

interface PanelProps {
  title?: string;
  subtitle?: string;
  headerAction?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}

export const Panel: React.FC<PanelProps> = ({
  title,
  subtitle,
  headerAction,
  children,
  className = '',
}) => {
  return (
    <section
      className={`bg-theme-card border border-theme-border rounded-lg p-5 flex flex-col ${className}`}
    >
      {(title || headerAction) && (
        <div className="flex items-start justify-between gap-3 mb-4">
          <div>
            {title && (
              <h3 className="text-xs font-semibold uppercase tracking-wider text-theme-text-muted">
                {title}
              </h3>
            )}
            {subtitle && (
              <p className="text-xs text-theme-text-subtle mt-1">{subtitle}</p>
            )}
          </div>
          {headerAction && <div className="shrink-0">{headerAction}</div>}
        </div>
      )}
      {children}
    </section>
  );
};
