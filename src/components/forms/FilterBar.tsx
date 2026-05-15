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
export type FilterBarVariant = 'solid' | 'glass';

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

/* ── Variant base styles ────────────────────────────────────────────────── */

const VARIANT_BASE: Record<FilterBarVariant, string> = {
  solid: '',
  glass: 'bg-white/15 border-white/25 backdrop-blur-glass-light text-white hover:bg-white/22',
};

const VARIANT_INACTIVE: Record<FilterBarVariant, string> = {
  solid: 'bg-white border-ink-200 text-ink-700 hover:border-ink-300 hover:bg-ink-50',
  glass: 'bg-white/10 border-white/20 text-white/80 hover:bg-white/15',
};

/* ── Tone styles ────────────────────────────────────────────────────────── */

const ACTIVE_PILL: Record<FilterBarTone, string> = {
  brand:   'bg-primary-600 border-primary-600 text-white shadow-xs hover:bg-primary-700',
  warm:    'bg-secondary-600 border-secondary-600 text-white shadow-xs hover:bg-secondary-700',
  sun:     'bg-accent-400 border-accent-400 text-ink-900 shadow-xs hover:bg-accent-500',
  neutral: 'bg-ink-900 border-ink-900 text-white shadow-xs hover:bg-ink-800',
};

const ACTIVE_COUNT: Record<FilterBarTone, string> = {
  brand:   'bg-white/25 text-white',
  warm:    'bg-white/25 text-white',
  sun:     'bg-ink-900/15 text-ink-900',
  neutral: 'bg-white/25 text-white',
};

const INACTIVE_PILL =
  'bg-white border-ink-200 text-ink-700 hover:border-ink-300 hover:bg-ink-50';

const INACTIVE_COUNT = 'bg-ink-100 text-ink-600';

const SURFACE: Record<'tinted' | 'plain', string> = {
  tinted: 'bg-ink-50 border border-ink-100 rounded-2xl p-2',
  plain:  '',
};

const SIZE_PILL: Record<'sm' | 'md', string> = {
  sm: 'h-7 px-2.5 text-micro gap-1.5 rounded-pill',
  md: 'h-9 px-3.5 text-caption gap-2 rounded-pill',
};

const SIZE_COUNT: Record<'sm' | 'md', string> = {
  sm: 'h-4 min-w-4 px-1 text-[10px] rounded-pill',
  md: 'h-5 min-w-5 px-1.5 text-[10px] rounded-pill',
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

  return (
    <div
      role="toolbar"
      aria-label={label ?? 'Filtres'}
      className={[
        'flex flex-wrap items-center gap-2',
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

      {options.map((option) => {
        const isActive = selected.includes(option.id);
        const isDisabled = option.disabled;

        const pillClasses =
          variant === 'glass'
            ? isActive
              ? `${VARIANT_BASE.glass} bg-white/20`
              : VARIANT_INACTIVE.glass
            : isActive
            ? ACTIVE_PILL[tone]
            : INACTIVE_PILL;

        return (
          <button
            key={option.id}
            type="button"
            disabled={isDisabled}
            aria-pressed={isActive}
            onClick={() => handleClick(option.id)}
            className={[
              'inline-flex items-center font-body font-semibold border',
              'transition-colors duration-base cursor-pointer',
              'focus-visible:outline-2 focus-visible:outline-offset-2',
              variant === 'glass'
                ? 'focus-visible:outline-white/50'
                : 'focus-visible:outline-primary-500',
              SIZE_PILL[size],
              pillClasses,
              isDisabled ? 'opacity-disabled cursor-not-allowed' : '',
            ]
              .filter(Boolean)
              .join(' ')}
          >
            {option.icon && (
              <span className="inline-flex items-center shrink-0">{option.icon}</span>
            )}
            <span className="truncate">{option.label}</span>
            {option.count !== undefined && (
              <span
                className={[
                  'inline-flex items-center justify-center font-bold tabular-nums',
                  SIZE_COUNT[size],
                  variant === 'glass'
                    ? 'bg-white/30 text-white'
                    : isActive
                    ? ACTIVE_COUNT[tone]
                    : INACTIVE_COUNT,
                ].join(' ')}
              >
                {option.count}
              </span>
            )}
          </button>
        );
      })}

      {hasSelection && showClearAll && (
        <>
          <span
            aria-hidden
            className={`hidden sm:inline-block w-px h-5 ${
              variant === 'glass' ? 'bg-white/30' : 'bg-ink-200'
            } mx-1`}
          />
          <button
            type="button"
            onClick={handleClear}
            className={`inline-flex items-center gap-1 px-2.5 py-1 font-body text-micro font-semibold bg-transparent border-0 cursor-pointer transition-colors duration-base rounded-pill ${
              variant === 'glass'
                ? 'text-white/70 hover:text-white'
                : 'text-ink-500 hover:text-danger-fg'
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
