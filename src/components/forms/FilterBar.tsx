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
 *       { id: 'all',    label: 'Tout', icon: <Sparkles size={14} />, count: 24 },
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
import { Button } from '../core/Button';

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
  tinted: 'bg-ink-50 border border-ink-100 rounded-xl p-2',
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
      {/* Le nom du groupe a la voix d'un libellé de champ (2026-09-24) : 16/600,
          casse normale, à l'encre du texte — blanc sur les variantes verre,
          comme « Effacer » plus bas. Il était en étiquette (11 px, capitales
          espacées, ink-500) : la voix d'un `Badge`, réservée aux états, et au
          cran des placeholders. */}
      {label && (
        <span className={`font-body text-body font-semibold mr-1 ${isGlass ? 'text-white' : 'text-ink-900'}`}>
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
          {/* « Effacer » parle la voix de la barre (2026-09-24). Il était en
              11/700 ink-500 — le corps des étiquettes et l'encre des
              placeholders — à côté de pastilles en 13/600 (`sm`) ou 16/600
              (`md`) : le seul outil de la barre en chuchotait moins que les
              filtres qu'il efface. C'est désormais un `Button` neutre, au
              corps de la barre :
                · `sm` (pastilles de 28 px) → `link` 13 : sans boîte, il ne
                  fait pas grandir la barre ; sa cible monte à 28 px ;
                · `md` (pastilles de 44 px, arbitrage n°22) → `ghost` 16, à la
                  hauteur des pastilles ;
                · verre (hero ≥ 700) → `ghost` `onDark`, blanc : le `link`
                  n'a pas de version sur fond sombre. En `sm`, ce bouton de
                  36 px fait passer la barre de 28 à 36 px à la sélection. */}
          <Button
            emphasis={isGlass || size === 'md' ? 'ghost' : 'link'}
            tone="neutral"
            onDark={isGlass}
            size={size}
            leadingIcon={<X />}
            onClick={handleClear}
            title="Effacer tous les filtres"
          >
            Effacer
          </Button>
        </>
      )}
    </div>
  );
};

export default FilterBar;
