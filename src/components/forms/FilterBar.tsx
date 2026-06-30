/**
 * FilterBar — clickable filter pills bar.
 *
 * Pattern : barre de filtre horizontale avec pills clickables + clear all.
 * Conçue pour s'intégrer dans n'importe quelle toolbar (Search, page header)
 * ou en standalone (entre hero et listing).
 *
 * Usage :
 *   <FilterBar
 *     options={[
 *       { id: 'all',    label: 'Tout', icon: <Sparkles size={12} />, count: 24 },
 *       { id: 'unread', label: 'Non lus', count: 3 },
 *     ]}
 *     selected={['all']}
 *     onChange={(ids) => setFilters(ids)}
 *     onClearAll={() => setFilters([])}
 *   />
 *
 * Props :
 *   - `multiSelect: boolean` (default true) — toggle multiple ; sinon single-select
 *   - `tone: 'brand' | 'warm' | 'sun' | 'neutral'` (default brand) — couleur active
 *   - `size: 'sm' | 'md'` (default md)
 *   - `surface: 'tinted' | 'plain'` (default plain) — fond `bg-ink-50` ou transparent
 *   - `showClearAll: boolean` (default true) — affiche bouton "Effacer" si sélection
 *
 * 100% Tailwind + DS tokens.
 */

import React from 'react';
import { X } from 'lucide-react';
import { FilterChip, type FilterChipTone } from '../ui/FilterChip';

export interface FilterBarOption {
  id: string;
  label: string;
  icon?: React.ReactNode;
  /** Optional count badge shown after the label. */
  count?: number;
  /** Disable this option (locked / unavailable). */
  disabled?: boolean;
}

export type FilterBarTone = 'brand' | 'warm' | 'sun' | 'neutral';
export type FilterBarVariant = 'solid' | 'glass' | 'glass-inverse';

export interface FilterBarProps {
  options: FilterBarOption[];
  selected: string[];
  onChange: (selected: string[]) => void;
  onClearAll?: () => void;
  multiSelect?: boolean;
  tone?: FilterBarTone;
  variant?: FilterBarVariant;
  size?: 'sm' | 'md';
  surface?: 'tinted' | 'plain';
  showClearAll?: boolean;
  /** Optional label rendered before the first pill (e.g. "Filtrer :"). */
  label?: string;
  className?: string;
}

/* ── FilterBar tone → FilterChip tone (brand maps to primary) ─────────────── */

const TONE_MAP: Record<FilterBarTone, FilterChipTone> = {
  brand:   'primary',
  warm:    'warm',
  sun:     'sun',
  neutral: 'neutral',
};

const SURFACE: Record<'tinted' | 'plain', string> = {
  tinted: 'bg-ink-50 border border-ink-100 rounded-2xl p-2',
  plain:  '',
};

/* ── Component ──────────────────────────────────────────────────────────── */

export const FilterBar: React.FC<FilterBarProps> = ({
  options,
  selected,
  onChange,
  onClearAll,
  multiSelect = true,
  tone = 'brand',
  variant = 'solid',
  size = 'md',
  surface = 'plain',
  showClearAll = true,
  label,
  className = '',
}) => {
  const handleClick = (id: string) => {
    if (multiSelect) {
      const next = selected.includes(id)
        ? selected.filter((s) => s !== id)
        : [...selected, id];
      onChange(next);
    } else {
      onChange(selected.includes(id) ? [] : [id]);
    }
  };

  const handleClear = () => {
    if (onClearAll) onClearAll();
    else onChange([]);
  };

  const hasSelection = selected.length > 0;
  const isGlass = variant === 'glass' || variant === 'glass-inverse';
  const chipVariant = isGlass ? 'glass' : 'default';
  const chipTone = TONE_MAP[tone];

  return (
    <div
      role="toolbar"
      aria-label={label ?? 'Filtres'}
      className={[
        'flex flex-wrap items-center gap-stack-xs',
        SURFACE[surface],
        className,
      ]
        .filter(Boolean)
        .join(' ')}
    >
      {label && (
        <span className="font-body text-micro font-bold uppercase tracking-wider text-ink-500 mr-1">
          {label}
        </span>
      )}

      {options.map((option) => (
        <FilterChip
          key={option.id}
          label={option.label}
          icon={option.icon}
          count={option.count}
          active={selected.includes(option.id)}
          tone={chipTone}
          variant={chipVariant}
          size={size}
          disabled={option.disabled}
          onClick={() => handleClick(option.id)}
        />
      ))}

      {hasSelection && showClearAll && (
        <>
          <span
            aria-hidden
            className={`hidden sm:inline-block w-px h-5 ${isGlass ? 'bg-white/30' : 'bg-ink-200'} mx-1`}
          />
          <button
            type="button"
            onClick={handleClear}
            className={`inline-flex items-center gap-tight px-2.5 py-1 font-body text-micro font-semibold bg-transparent border-0 cursor-pointer transition-colors duration-base rounded-pill focus-visible:outline-2 focus-visible:outline-offset-2 ${
              isGlass
                ? 'text-white/70 hover:text-white focus-visible:outline-white/50'
                : 'text-ink-500 hover:text-danger-fg focus-visible:outline-primary-500'
            }`}
            title="Effacer tous les filtres"
          >
            <X size={12} strokeWidth={2.5} />
            Effacer
          </button>
        </>
      )}
    </div>
  );
};

export default FilterBar;
