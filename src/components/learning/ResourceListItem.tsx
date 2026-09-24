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
  /* Rangée de liste : rayon de son étage (`rounded-lg`, 14) et retrait 16 —
     le bouton d'action (rayon 14) y reste une forme fixe, là où 12 px dans un
     rayon de 20 le pinçait (check-radius). 16 + 36 + 16 = 68 px de haut. */
  const base = [
    'flex items-center justify-between gap-stack-xs p-stack rounded-lg bg-ink-50',
    onClick ? 'cursor-pointer hover:bg-ink-100 transition-colors duration-base w-full text-left border-0' : '',
    className,
  ].filter(Boolean).join(' ');

  const inner = (
    <>
      {/* Libellé de rangée 16/600 ink-900 (passe typographique du
          2026-09-24) : c'était une légende de 13 px, plus petite que le bouton
          « Télécharger » posé à côté — le nom du document passait après l'action. */}
      <div className="flex items-center gap-stack-xs min-w-0">
        {icon && <span className="text-ink-600 shrink-0 inline-flex">{icon}</span>}
        <span className="text-body font-semibold text-ink-900 truncate">{label}</span>
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
