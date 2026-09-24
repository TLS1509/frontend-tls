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

// Libellé du niveau choisi à l'encre de marque au cran 800 (doctrine).
const TICK_ACTIVE: Record<DreyfusSliderTone, string> = {
  brand: 'text-primary-800',
  warm:  'text-secondary-800',
  sun:   'text-accent-800',
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
      {/* Piste + crans (2026-09-24). La piste va du CENTRE de la première
          colonne de libellés au centre de la dernière : sa marge vaut une
          demi-colonne, 50 / n % de la rangée (valeur calculée, `levels` est
          une prop). Elle occupait toute la rangée, donc ses crans tombaient à
          0 · 25 · 50 · 75 · 100 % quand les libellés, cinq colonnes égales,
          sont centrés à 10 · 30 · 50 · 70 · 90 % : jusqu'à 67 px d'écart à
          1440 (27 à 375) entre un cran et son mot.
          Les crans vivent sur un calque posé exactement sur la piste, et sont
          centrés sur son axe : leur calque n'avait pas de hauteur, ils
          pendaient 10 px sous la piste, quand le curseur, lui, est centré. */}
      <div className="px-3 py-3">
        <div className="relative" style={{ marginInline: `${50 / levels.length}%` }}>
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
          <div className="absolute inset-0 pointer-events-none">
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
                    'absolute top-1/2 -translate-x-1/2 -translate-y-1/2 w-5 h-5 rounded-pill pointer-events-auto cursor-pointer',
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
                    <span className="text-micro font-bold text-ink-600">{lv.v}</span>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Labels under each tick.
          Sous 24rem de rangée, les mots cèdent la place à leur code D1…D5
          (2026-09-24) : à 375 px, la colonne d'un niveau fait 54 px (34 dans
          la vitrine) et « Compétent » en demande 65 — « Apprenant » et
          « Compétent » se chevauchaient de 11 px. Le code est l'abréviation
          que l'app emploie partout (« Niveau D4 »), et la ligne de
          description, sous le curseur, redonne le nom du niveau choisi. Le
          mot reste lu par les lecteurs d'écran dans les deux cas.
          La rangée est le conteneur mesuré (deux boîtes : les libellés
          répondent à SA largeur, doctrine « Requêtes de conteneur »). */}
      {showLabels && (
        <div className="@container flex justify-between px-3">
          {levels.map((lv) => {
            const isActive = isSet && current === lv.v;
            return (
              <div
                key={lv.v}
                className={[
                  // Colonnes égales (`flex-1`), quel que soit le nombre de niveaux :
                  // la marge de la piste en dépend.
                  'flex flex-col items-center gap-stack-3xs flex-1 text-center min-w-0',
                  'transition-colors duration-base',
                  // Le niveau choisi se dit par l'encre de marque, à graisse égale
                  // (600) : le gras et le `scale-105` faisaient bouger le mot.
                  isActive ? TICK_ACTIVE[tone] : 'text-ink-600',
                ].join(' ')}
              >
                {lv.icon && <span aria-hidden="true" className="inline-flex items-center justify-center">{lv.icon}</span>}
                {/* 13 px à toutes les largeurs : le `micro` (11) de l'écran étroit
                    est le pas des étiquettes en capitales, pas d'un libellé. */}
                {/* Le mot, toujours lu ; les deux formes visibles, masquées aux
                    lecteurs d'écran. Pas de `sr-only @sm:not-sr-only` : le
                    `.sr-only` hors couche d'index.css bat `not-sr-only`. */}
                <span className="text-caption font-semibold break-words">
                  <span className="sr-only">{lv.label}</span>
                  <span aria-hidden="true" className="@sm:hidden">D{lv.v}</span>
                  <span aria-hidden="true" className="hidden @sm:inline">{lv.label}</span>
                </span>
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
