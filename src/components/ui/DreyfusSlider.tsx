/**
 * DreyfusSlider — horizontal 1-5 Likert picker with multiple visual variants.
 *
 * Designed as a more compact / engaging alternative to DreyfusLevelSelector
 * (which uses a vertical grid). Especially useful inside a conversational
 * chat where vertical real estate is limited.
 *
 * Variants × tones :
 *  - `variant`   : 'solid' (TLS color filled track) · 'glass' (white/blur track)
 *                  · 'light' (ink-50 track, minimal) · 'effect' (solid + soft glow)
 *  - `tone`      : 'brand' (primary teal) · 'warm' (secondary orange) · 'sun' (accent)
 *  - `animate`   : true → smooth thumb transition + value flash on change
 *
 * A11y : single composite `<input type="range">` for screen readers + 5 native
 * tick buttons over it for mouse/touch. Arrow keys & Home/End supported.
 */

import React from 'react';
import { Leaf, Sparkles, Sprout, TreeDeciduous, Trophy } from 'lucide-react';

export type DreyfusSliderVariant = 'solid' | 'glass' | 'light' | 'effect';
export type DreyfusSliderTone = 'brand' | 'warm' | 'sun';

export interface DreyfusSliderLevel {
  v: number;
  label: string;
  desc?: string;
  icon?: React.ReactNode;
}

/**
 * Libellés canoniques Cahier #02 (Novice/Apprenant/Compétent/Expert/Maître) —
 * voir `data/competencies.ts` DREYFUS_LABELS, source de vérité unique.
 * Ne jamais diverger de ce libellé ici : les 2 doivent toujours matcher.
 */
const DEFAULT_LEVELS: DreyfusSliderLevel[] = [
  { v: 1, label: 'Novice',    desc: 'Suit des règles explicites',           icon: <Sprout size={16} strokeWidth={1.75} /> },
  { v: 2, label: 'Apprenant', desc: 'Adapte selon l\'expérience acquise',   icon: <Leaf size={16} strokeWidth={1.75} /> },
  { v: 3, label: 'Compétent', desc: 'Planifie et priorise en autonomie',    icon: <TreeDeciduous size={16} strokeWidth={1.75} /> },
  { v: 4, label: 'Expert',    desc: 'Perçoit et adapte intuitivement',      icon: <Trophy size={16} strokeWidth={1.75} /> },
  { v: 5, label: 'Maître',    desc: 'Redéfinit les pratiques du domaine',   icon: <Sparkles size={16} strokeWidth={1.75} /> },
];

export interface DreyfusSliderProps {
  value?: number;
  onChange: (level: number) => void;
  levels?: DreyfusSliderLevel[];
  variant?: DreyfusSliderVariant;
  tone?: DreyfusSliderTone;
  animate?: boolean;
  showLabels?: boolean;
  className?: string;
  'aria-label'?: string;
}

// ─── Tone palettes (solid TLS colors — no gradient) ──────────────────────────

const TRACK_FILL: Record<DreyfusSliderTone, string> = {
  brand: 'bg-primary-500',
  warm:  'bg-secondary-500',
  sun:   'bg-accent-400',
};

const THUMB_FILL: Record<DreyfusSliderTone, string> = {
  brand: 'bg-primary-600 border-white',
  warm:  'bg-secondary-600 border-white',
  sun:   'bg-accent-500 border-white',
};

const THUMB_GLOW: Record<DreyfusSliderTone, string> = {
  brand: 'shadow-[0_0_0_6px_rgba(85,161,180,0.18),0_4px_12px_-2px_rgba(85,161,180,0.45)]',
  warm:  'shadow-[0_0_0_6px_rgba(237,132,58,0.18),0_4px_12px_-2px_rgba(237,132,58,0.45)]',
  sun:   'shadow-[0_0_0_6px_rgba(248,176,68,0.18),0_4px_12px_-2px_rgba(248,176,68,0.45)]',
};

const TICK_ACTIVE: Record<DreyfusSliderTone, string> = {
  brand: 'text-primary-700',
  warm:  'text-secondary-700',
  sun:   'text-accent-700',
};

// ─── Variant backgrounds (track unfilled portion) ────────────────────────────

const TRACK_BG: Record<DreyfusSliderVariant, string> = {
  solid:  'bg-ink-100',
  glass:  'bg-white/50 backdrop-blur-glass-light border border-white/60',
  light:  'bg-ink-50',
  effect: 'bg-ink-100',
};

// ─────────────────────────────────────────────────────────────────────────────

export const DreyfusSlider: React.FC<DreyfusSliderProps> = ({
  value,
  onChange,
  levels = DEFAULT_LEVELS,
  variant = 'solid',
  tone = 'warm',
  animate = true,
  showLabels = true,
  className = '',
  'aria-label': ariaLabel = 'Niveau Dreyfus',
}) => {
  const current = value ?? 0;
  const isSet = value !== undefined && value !== null;
  // Position thumb at center of active tick (1..5 maps to 0%..100%)
  const pct = isSet ? ((current - 1) / (levels.length - 1)) * 100 : 0;

  const filledTrackClasses = [
    'absolute left-0 top-0 h-full rounded-pill',
    TRACK_FILL[tone],
    animate ? 'transition-all duration-300 ease-out' : '',
  ].filter(Boolean).join(' ');

  const thumbClasses = [
    'absolute top-1/2 -translate-x-1/2 -translate-y-1/2',
    'w-7 h-7 rounded-pill border-2',
    THUMB_FILL[tone],
    variant === 'effect' ? THUMB_GLOW[tone] : 'shadow-md',
    animate ? 'transition-all duration-300 ease-out' : '',
    isSet ? 'opacity-100' : 'opacity-0 pointer-events-none',
  ].filter(Boolean).join(' ');

  const trackClasses = [
    'relative h-2.5 rounded-pill',
    TRACK_BG[variant],
  ].join(' ');

  return (
    <div className={['flex flex-col gap-stack-xs', className].filter(Boolean).join(' ')}>
      {/* Track + thumb */}
      <div className="relative px-3 py-3">
        <div className={trackClasses} role="presentation">
          <div className={filledTrackClasses} style={{ width: `${pct}%` }} aria-hidden="true" />
          <div className={thumbClasses} style={{ left: `${pct}%` }} aria-hidden="true" />

          {/* Hidden native range for keyboard a11y */}
          <input
            type="range"
            min={1}
            max={levels.length}
            step={1}
            value={current || 1}
            onChange={(e) => onChange(Number(e.target.value))}
            aria-label={ariaLabel}
            aria-valuemin={1}
            aria-valuemax={levels.length}
            aria-valuenow={isSet ? current : undefined}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary-500 rounded-pill"
          />
        </div>

        {/* Tick buttons (click to set discrete value) */}
        <div className="absolute inset-x-3 top-1/2 -translate-y-1/2 flex justify-between pointer-events-none">
          {levels.map((lv, idx) => {
            const tickPct = (idx / (levels.length - 1)) * 100;
            const isActive = isSet && current === lv.v;
            const isPast = isSet && current > lv.v;
            return (
              <button
                key={lv.v}
                type="button"
                onClick={() => onChange(lv.v)}
                style={{ left: `${tickPct}%` }}
                aria-label={`Niveau ${lv.v} — ${lv.label}`}
                aria-pressed={isActive}
                className={[
                  'absolute -translate-x-1/2 w-5 h-5 rounded-pill pointer-events-auto cursor-pointer',
                  'flex items-center justify-center transition-all duration-base',
                  'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500',
                  isActive
                    ? 'opacity-0'
                    : isPast
                    ? `${TRACK_FILL[tone]} opacity-60 hover:opacity-100 scale-100 hover:scale-110`
                    : 'bg-white border border-ink-300 hover:border-primary-400 scale-100 hover:scale-110',
                ].join(' ')}
              >
                {!isPast && !isActive && (
                  <span className="text-[10px] font-bold text-ink-500 leading-none">{lv.v}</span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Labels under each tick */}
      {showLabels && (
        <div className="flex justify-between px-3">
          {levels.map((lv) => {
            const isActive = isSet && current === lv.v;
            return (
              <div
                key={lv.v}
                className={[
                  'flex flex-col items-center gap-0.5 w-1/5 text-center min-w-0',
                  'transition-all duration-base',
                  isActive ? `${TICK_ACTIVE[tone]} font-bold scale-105` : 'text-ink-500',
                ].join(' ')}
              >
                {lv.icon && <span aria-hidden="true" className="inline-flex items-center justify-center">{lv.icon}</span>}
                <span className="text-[10px] sm:text-caption font-semibold leading-tight">{lv.label}</span>
              </div>
            );
          })}
        </div>
      )}

      {/* Selected level description (animate value flash) */}
      {isSet && levels[current - 1]?.desc && (
        <p
          key={current}
          className={[
            'm-0 text-center text-caption text-ink-600',
            animate ? 'animate-in fade-in duration-300' : '',
          ].filter(Boolean).join(' ')}
        >
          <span className="font-semibold text-ink-900">D{current} · {levels[current - 1].label}</span>
          {' — '}
          {levels[current - 1].desc}
        </p>
      )}
    </div>
  );
};

export default DreyfusSlider;
