/**
 * VeilleHeroFilterChips — Filter chip bar for the Veille editorial hub hero.
 *
 * Figma DS name: VeilleHeroFilterChips.
 *
 * Composes FilterChip (variant="glass") atoms into a complete filter bar:
 *  - Primary content-type filter chips (passed via `filters`)
 *  - Optional "Sauvegardés" saved-items toggle (with bookmark icon + count)
 *  - Vertical separator between type chips and saved chip
 *  - Optional "Réinitialiser" text reset link (shown when `hasActiveFilter`)
 *  - Optional results count (shown when `hasActiveFilter`)
 *
 * All chips use `variant="glass"` so the bar is designed for placement on
 * coloured/gradient hero backgrounds. Pass `className` to adjust top spacing
 * (the component controls no external margin itself — Piège #12).
 *
 * Props are intentionally string-typed for `filters[].id` to keep the
 * component dependency-free from domain enums.
 */

import React from 'react';
import { Bookmark } from 'lucide-react';
import { FilterChip } from '../ui/FilterChip';

// ─── Types ────────────────────────────────────────────────────────────────────

export interface VeilleHeroFilter {
  id: string;
  label: string;
  /** Optional icon node shown inside the chip */
  icon?: React.ReactNode;
  /** Optional count badge — shown as a pill inside the chip */
  count?: number;
}

export interface VeilleHeroFilterChipsProps {
  /** The list of content-type filter chips */
  filters: VeilleHeroFilter[];
  /** Currently active filter id */
  value: string;
  onChange: (id: string) => void;

  /** Show the "Sauvegardés" toggle chip */
  showSaved?: boolean;
  /** Number shown in the saved chip badge (omit to hide badge) */
  savedCount?: number;
  /** Whether the saved chip is currently active */
  isSavedActive?: boolean;
  onSavedToggle?: () => void;

  /** When true, displays the "Réinitialiser" link and results count */
  hasActiveFilter?: boolean;
  onReset?: () => void;
  /** Number of filtered results — shown when hasActiveFilter is true */
  resultsCount?: number;

  className?: string;
}

// ─── Component ────────────────────────────────────────────────────────────────

export const VeilleHeroFilterChips: React.FC<VeilleHeroFilterChipsProps> = ({
  filters,
  value,
  onChange,
  showSaved = true,
  savedCount,
  isSavedActive = false,
  onSavedToggle,
  hasActiveFilter = false,
  onReset,
  resultsCount,
  className = '',
}) => (
  <div
    className={[
      'flex flex-wrap items-center gap-2',
      className,
    ].filter(Boolean).join(' ')}
    role="group"
    aria-label="Filtres de contenu"
  >
    {/* ── Content-type filter chips ───────────────────────────────────────── */}
    {filters.map(({ id, label, icon, count }) => (
      <FilterChip
        key={id}
        variant="glass"
        label={label}
        active={value === id}
        icon={icon}
        count={count}
        onClick={() => onChange(id)}
        aria-label={`Filtrer par ${label}${count !== undefined ? ` (${count})` : ''}`}
      />
    ))}

    {/* ── Separator ───────────────────────────────────────────────────────── */}
    {showSaved && (
      <span aria-hidden className="w-px h-4 bg-white/20 mx-0.5 shrink-0" />
    )}

    {/* ── Saved toggle ────────────────────────────────────────────────────── */}
    {showSaved && (
      <FilterChip
        variant="glass"
        label="Sauvegardés"
        active={isSavedActive}
        icon={<Bookmark size={12} strokeWidth={2.5} aria-hidden />}
        count={savedCount && savedCount > 0 ? savedCount : undefined}
        onClick={onSavedToggle}
        aria-label={`Voir les contenus sauvegardés${savedCount ? ` (${savedCount})` : ''}`}
      />
    )}

    {/* ── Reset link — shown when any filter is active ────────────────────── */}
    {hasActiveFilter && onReset && (
      <button
        type="button"
        onClick={onReset}
        className="font-body text-caption text-white/40 hover:text-white/70 underline underline-offset-2 transition-colors ml-1 cursor-pointer bg-transparent border-0"
      >
        Réinitialiser
      </button>
    )}

    {/* ── Results count ───────────────────────────────────────────────────── */}
    {hasActiveFilter && resultsCount !== undefined && (
      <span className="font-body text-caption text-white/40 ml-auto">
        <strong className="text-white/70">{resultsCount}</strong>
        {' '}résultat{resultsCount !== 1 ? 's' : ''}
      </span>
    )}
  </div>
);

export default VeilleHeroFilterChips;
