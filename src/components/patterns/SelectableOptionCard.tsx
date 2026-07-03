/**
 * SelectableOptionCard — bordered selectable card (icon + label [+ description]).
 *
 * Replaces 2 near-identical hand-rolled `<button>` implementations found in
 * ManagerExport.tsx (format picker) and ManagerViewsBuilder.tsx (chart-type
 * picker) — same visual language (icon bubble + border state + optional
 * "Sélectionné" badge), previously duplicated rather than shared.
 *
 * `size="md"` (default): full card — icon bubble, label, description, badge.
 * `size="sm"`: compact — icon + label only, no description/badge (for dense
 * grids like a 2x2 chart-type picker).
 */

import React from 'react';
import { Badge } from '../ui/Badge';

export interface SelectableOptionCardProps {
  icon: React.ReactNode;
  label: string;
  description?: string;
  selected: boolean;
  onClick: () => void;
  size?: 'sm' | 'md';
  className?: string;
}

export const SelectableOptionCard: React.FC<SelectableOptionCardProps> = ({
  icon,
  label,
  description,
  selected,
  onClick,
  size = 'md',
  className = '',
}) => {
  const isCompact = size === 'sm';

  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={selected}
      className={[
        'flex rounded-xl border text-left transition-all duration-base',
        'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500',
        isCompact ? 'flex-col items-center gap-tight p-3' : 'flex-col gap-stack-xs p-5',
        selected
          ? 'bg-primary-50 border-primary-300 shadow-sm'
          : 'bg-white border-ink-100 hover:border-ink-200',
        className,
      ].join(' ')}
    >
      <div
        className={[
          'rounded-lg flex items-center justify-center shrink-0',
          isCompact ? 'w-8 h-8' : 'w-10 h-10',
          selected ? 'bg-primary-600 text-white' : 'bg-ink-100 text-ink-500',
        ].join(' ')}
      >
        {icon}
      </div>

      <div className={['flex flex-col', isCompact ? 'items-center gap-0' : 'gap-tight'].join(' ')}>
        <span className={isCompact ? 'text-caption font-semibold text-ink-900' : 'text-body-sm font-semibold text-ink-900'}>
          {label}
        </span>
        {!isCompact && description && (
          <span className="text-caption text-ink-500">{description}</span>
        )}
      </div>

      {!isCompact && selected && <Badge variant="info" size="sm">Sélectionné</Badge>}
    </button>
  );
};

export default SelectableOptionCard;
