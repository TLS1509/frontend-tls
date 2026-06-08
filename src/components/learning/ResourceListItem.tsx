import React from 'react';

export interface ResourceListItemProps {
  /** Leading icon (e.g. <FileText size={14} />) */
  icon?: React.ReactNode;
  /** Main label — truncated when too long */
  label: string;
  /** Optional secondary badge (e.g. file type) */
  badge?: React.ReactNode;
  /** Optional action slot rendered on the right (e.g. a Download button) */
  action?: React.ReactNode;
  /** If provided, the row is rendered as a button and calls onClick on press */
  onClick?: () => void;
  className?: string;
}

export const ResourceListItem: React.FC<ResourceListItemProps> = ({
  icon,
  label,
  badge,
  action,
  onClick,
  className = '',
}) => {
  const base = [
    'flex items-center justify-between gap-stack-xs p-3 rounded-xl bg-ink-50',
    onClick ? 'cursor-pointer hover:bg-ink-100 transition-colors duration-base w-full text-left border-0' : '',
    className,
  ].filter(Boolean).join(' ');

  const inner = (
    <>
      <div className="flex items-center gap-stack-xs min-w-0">
        {icon && <span className="text-ink-400 shrink-0 inline-flex">{icon}</span>}
        <span className="text-caption text-ink-700 truncate">{label}</span>
        {badge}
      </div>
      {action && <div className="shrink-0">{action}</div>}
    </>
  );

  if (onClick) {
    return (
      <button type="button" className={base} onClick={onClick}>
        {inner}
      </button>
    );
  }

  return <div className={base}>{inner}</div>;
};
