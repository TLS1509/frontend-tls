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
        'flex rounded-lg border text-left transition-all duration-base',
        'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500',
        isCompact ? 'flex-col items-center gap-stack-xs p-stack-sm' : 'flex-col gap-stack-xs p-stack-md',
        // Choisie : filet au cran 700 (arbitrage n°9) — au 300, le filet qui dit
        // « choisi » mesurait 1,6:1 sur blanc et ne se voyait pas.
        selected
          ? 'bg-primary-50 border-primary-700 shadow-sm'
          : 'bg-white border-ink-200 hover:border-ink-300',
        className,
      ].join(' ')}
    >
      {/* Des <span> seulement : un <button> n'admet que du contenu phrasé
          (2026-09-24, il portait deux <div>). Les classes flex donnent le rendu. */}
      <span
        className={[
          // Pastille d'icône 32/40 : `rounded-md`, l'étage proportionnel (arbitrage n°3).
          'rounded-md flex items-center justify-center shrink-0',
          isCompact ? 'w-8 h-8' : 'w-10 h-10',
          selected ? 'bg-primary-700 text-white' : 'bg-ink-100 text-ink-500',
        ].join(' ')}
      >
        {icon}
      </span>

      {/* Libellé 16 / 600 aux deux tailles : c'est le nom de l'option, pas une
          légende ; le compact ne se distingue que par l'absence de description. */}
      <span className={['flex flex-col', isCompact ? 'items-center' : 'gap-stack-3xs'].join(' ')}>
        <span className="text-body font-semibold text-ink-900">
          {label}
        </span>
        {!isCompact && description && (
          <span className="text-caption text-ink-600">{description}</span>
        )}
      </span>

      {!isCompact && selected && <Badge variant="info" size="compact">Sélectionné</Badge>}
    </button>
  );
};

export default SelectableOptionCard;
