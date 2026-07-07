import React, { useState, useRef, useEffect } from 'react';
import { SlidersHorizontal, RotateCcw } from 'lucide-react';
import { Search, type SearchSize, type SearchVariant } from '../ui/Search';
import { FilterChip, type FilterChipTone, type FilterChipSize } from '../ui/FilterChip';
import { SelectCheckbox } from '../ui/SelectCheckbox';
import { Button } from '../core/Button';

/**
 * SearchFilters — canonical search + filters composite (2026-06-30).
 *
 * The single orchestrator pages consume instead of hand-rolling search bars,
 * custom pill rows, native <select> filters, or collapsible filter panels.
 * It assembles `Search` + `FilterChip` + `SelectCheckbox` and picks the right
 * control per axis automatically:
 *   - kind:'toggle'                       → one FilterChip
 *   - kind:'select', options ≤ threshold  → row of FilterChip
 *   - kind:'select', options > threshold  → SelectCheckbox dropdown
 *
 * Two layouts:
 *   - `inline` (default) — controls live in the Search filtersSlot (always visible).
 *     Best for 1–2 low-cardinality axes (Veille, Parcours).
 *   - `panel` — a filter button (with active-count badge) toggles a collapsible
 *     panel of labelled groups (the Journal pattern). Best for 2+ axes.
 */

export interface SearchFilterOption {
  id: string;
  label: string;
  count?: number;
  icon?: React.ReactNode;
}

export interface SelectFilterAxis {
  id: string;
  label: string;
  kind?: 'select';
  options: SearchFilterOption[];
  selected: string[];
  onChange: (selected: string[]) => void;
  /** Multi-select (default) or single-select. */
  multi?: boolean;
  /** Force a control; otherwise auto by option count vs `chipThreshold`. */
  control?: 'chips' | 'dropdown';
}

export interface ToggleFilterAxis {
  id: string;
  label: string;
  kind: 'toggle';
  value: boolean;
  onChange: (value: boolean) => void;
  icon?: React.ReactNode;
  count?: number;
}

export type SearchFilterAxis = SelectFilterAxis | ToggleFilterAxis;

export interface SearchFiltersProps {
  query: string;
  onQueryChange: (value: string) => void;
  placeholder?: string;
  'aria-label'?: string;
  filters?: SearchFilterAxis[];
  /** `inline` = controls in the search filtersSlot · `panel` = collapsible panel. */
  layout?: 'inline' | 'panel';
  /** Active-state chip colour. Default `primary`. */
  tone?: FilterChipTone;
  /** Search size. Default `md`. */
  size?: SearchSize;
  /** Search surface. Default `default`. */
  variant?: SearchVariant;
  /** Select axes with more options than this render as a dropdown checklist. Default 6. */
  chipThreshold?: number;
  /** Override the default reset (which clears query + every axis). */
  onReset?: () => void;
  /** Extra controls right of the input (e.g. a layout toggle). */
  trailing?: React.ReactNode;
  className?: string;
}

const isToggle = (a: SearchFilterAxis): a is ToggleFilterAxis => a.kind === 'toggle';

/** Search size → FilterChip size (FilterChip has no `lg`). */
const CHIP_SIZE: Record<SearchSize, FilterChipSize> = { sm: 'sm', md: 'md', lg: 'md' };

export const SearchFilters: React.FC<SearchFiltersProps> = ({
  query,
  onQueryChange,
  placeholder = 'Rechercher…',
  'aria-label': ariaLabel,
  filters = [],
  layout = 'inline',
  tone = 'primary',
  size = 'md',
  variant = 'default',
  chipThreshold = 6,
  onReset,
  trailing,
  className = '',
}) => {
  const [panelOpen, setPanelOpen] = useState(false);
  // Inline layout: filters are revealed on focus and collapse on click outside.
  const [inlineOpen, setInlineOpen] = useState(false);
  const inlineRef = useRef<HTMLDivElement>(null);
  const chipSize = CHIP_SIZE[size];

  useEffect(() => {
    if (layout !== 'inline' || !inlineOpen) return;
    const onPointerDown = (e: MouseEvent) => {
      if (inlineRef.current && !inlineRef.current.contains(e.target as Node)) {
        setInlineOpen(false);
      }
    };
    document.addEventListener('mousedown', onPointerDown);
    return () => document.removeEventListener('mousedown', onPointerDown);
  }, [layout, inlineOpen]);

  const activeCount = filters.reduce(
    (n, a) => (isToggle(a) ? n + (a.value ? 1 : 0) : n + a.selected.length),
    0,
  );
  const hasActive = activeCount > 0 || query.trim() !== '';

  const toggleSelect = (axis: SelectFilterAxis, id: string) => {
    const multi = axis.multi !== false;
    if (multi) {
      axis.onChange(
        axis.selected.includes(id)
          ? axis.selected.filter((x) => x !== id)
          : [...axis.selected, id],
      );
    } else {
      axis.onChange(axis.selected.includes(id) ? [] : [id]);
    }
  };

  const reset = () => {
    if (onReset) return onReset();
    onQueryChange('');
    filters.forEach((a) => (isToggle(a) ? a.onChange(false) : a.onChange([])));
  };

  /** A select axis resolved to a dropdown control is self-describing (trigger shows its own
   *  label as placeholder), so the panel skips the redundant group label for it. */
  const isDropdownAxis = (axis: SearchFilterAxis): boolean =>
    !isToggle(axis) &&
    (axis.control === 'dropdown' || (axis.control !== 'chips' && axis.options.length > chipThreshold));

  /** Render the control(s) for one axis (no group label — caller adds it in panel mode). */
  const renderAxisControl = (axis: SearchFilterAxis): React.ReactNode => {
    if (isToggle(axis)) {
      return (
        <FilterChip
          label={axis.label}
          icon={axis.icon}
          count={axis.count}
          active={axis.value}
          tone={tone}
          size={chipSize}
          onClick={() => axis.onChange(!axis.value)}
        />
      );
    }
    if (isDropdownAxis(axis)) {
      return (
        <SelectCheckbox
          options={axis.options.map((o) => ({ id: o.id, label: o.label }))}
          selected={axis.selected}
          onChange={axis.onChange}
          placeholder={axis.label}
        />
      );
    }
    return axis.options.map((o) => (
      <FilterChip
        key={`${axis.id}:${o.id}`}
        label={o.label}
        icon={o.icon}
        count={o.count}
        active={axis.selected.includes(o.id)}
        tone={tone}
        size={chipSize}
        onClick={() => toggleSelect(axis, o.id)}
      />
    ));
  };

  const resetButton = (
    <Button
      variant="glass-warm"
      size="sm"
      leadingIcon={<RotateCcw size={11} />}
      onClick={reset}
    >
      Réinitialiser
    </Button>
  );

  // ── PANEL layout ──────────────────────────────────────────────────────────
  if (layout === 'panel') {
    return (
      <div className={['flex flex-col gap-stack-xs', className].filter(Boolean).join(' ')}>
        <Search
          variant={variant}
          size={size}
          value={query}
          onChange={(e) => onQueryChange(e.target.value)}
          placeholder={placeholder}
          aria-label={ariaLabel}
          trailing={
            <span className="inline-flex items-center gap-stack-xs">
              {trailing}
              <button
                type="button"
                onClick={() => setPanelOpen((v) => !v)}
                aria-expanded={panelOpen}
                aria-label={`${panelOpen ? 'Masquer' : 'Afficher'} les filtres${
                  activeCount > 0 ? ` (${activeCount} actif${activeCount > 1 ? 's' : ''})` : ''
                }`}
                className={[
                  'relative inline-flex items-center justify-center min-h-touch w-10 rounded-md border cursor-pointer transition-all',
                  'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500',
                  panelOpen || activeCount > 0
                    ? 'bg-primary-500 border-primary-500 text-white hover:bg-primary-600'
                    : 'bg-white border-ink-200 text-ink-600 hover:bg-ink-50 hover:border-ink-300',
                ].join(' ')}
              >
                <SlidersHorizontal size={16} strokeWidth={2.25} />
                {activeCount > 0 && !panelOpen && (
                  <span className="absolute -top-1 -right-1 inline-flex items-center justify-center w-4 h-4 rounded-full bg-accent-500 text-white text-[10px] font-bold border border-white">
                    {activeCount}
                  </span>
                )}
              </button>
            </span>
          }
        />

        {panelOpen && (
          <div
            className={[
              'flex flex-wrap items-center gap-stack-xs p-2.5 rounded-2xl',
              'bg-white/70 backdrop-blur-glass-light border border-white/60',
              'shadow-[0_8px_24px_-8px_rgba(85,161,180,0.18)]',
              'animate-[filterIn_0.18s_ease]',
            ].join(' ')}
          >
            {filters.map((axis) => (
              <div key={axis.id} className="flex flex-col gap-stack-xs">
                {!isDropdownAxis(axis) && (
                  <span className="font-body text-caption font-medium text-ink-500">{axis.label}</span>
                )}
                <div
                  className="flex flex-wrap items-center gap-stack-xs"
                  role="group"
                  aria-label={axis.label}
                >
                  {renderAxisControl(axis)}
                </div>
              </div>
            ))}
            {hasActive && <div className="ml-auto">{resetButton}</div>}
          </div>
        )}
      </div>
    );
  }

  // ── INLINE layout — filters revealed on focus, collapse on click outside ────
  return (
    <div ref={inlineRef} className={className}>
      <Search
        variant={variant}
        size={size}
        value={query}
        onChange={(e) => { onQueryChange(e.target.value); setInlineOpen(true); }}
        onFocus={() => setInlineOpen(true)}
        placeholder={placeholder}
        aria-label={ariaLabel}
        trailing={
          (trailing || hasActive) ? (
            <span className="inline-flex items-center gap-stack-xs">
              {trailing}
              {hasActive && resetButton}
            </span>
          ) : undefined
        }
        filtersSlot={
          inlineOpen && filters.length > 0 ? (
            <div className="flex flex-wrap items-center gap-2">
              {filters.map((axis) => (
                <div
                  key={axis.id}
                  className="flex flex-wrap items-center gap-stack-xs"
                  role="group"
                  aria-label={axis.label}
                >
                  {renderAxisControl(axis)}
                </div>
              ))}
            </div>
          ) : undefined
        }
      />
    </div>
  );
};

export default SearchFilters;
