/**
 * BehavioralTileGrid (ui/) — interactive Dreyfus level self-assessment selector.
 *
 * ⚠️ NAMING NOTE: this is a DIFFERENT component from patterns/BehavioralTileGrid.
 *   - ui/BehavioralTileGrid   = interactive picker (value, onChange, DreyfusLevel)
 *     Used in: OnboardingQuestionnaireConversational, OnboardingUnified
 *   - patterns/BehavioralTileGrid = informational display ({ title, description, tags }[])
 *     Used in: LessonPlayer, Components showcase
 *
 * Each tile maps internally to a Dreyfus level (1-4) but only shows
 * a concrete behavioral statement — no level numbers or labels visible.
 *
 * CDC #03 §UJ #1a — behavioral response tiles.
 */

import React from 'react';
import { Sprout, TrendingUp, Star, Users } from 'lucide-react';
import type { DreyfusLevel } from '../../types/learning';
import type { BehavioralTileSet } from '../../lib/behavioral-tiles';

const LEVEL_ICONS = [Sprout, TrendingUp, Star, Users] as const;

export type TileSize = 'compact' | 'default' | 'large';
export type TileLayout = 'grid' | 'stack';

export interface BehavioralTileGridProps {
  tiles: BehavioralTileSet;
  /** Currently selected level (1-4). Controls the highlighted tile. */
  value?: DreyfusLevel;
  onChange: (level: DreyfusLevel) => void;
  disabled?: boolean;
  size?: TileSize;
  layout?: TileLayout;
  className?: string;
}

const ICON_WRAP: Record<TileSize, string> = {
  compact: 'w-7 h-7 rounded-lg',
  default: 'w-8 h-8 rounded-lg',
  large: 'w-10 h-10 rounded-xl',
};

const ICON_SIZE: Record<TileSize, number> = {
  compact: 14,
  default: 16,
  large: 20,
};

const PAD: Record<TileSize, string> = {
  compact: 'px-3 py-2.5',
  default: 'px-4 py-3',
  large: 'px-stack-md py-stack',
};

/* Un énoncé de comportement est du texte qu'on lit : 16 px à toutes les
   tailles (passe typographique du 2026-09-24 — le cran `compact` le passait
   à 13). La taille de la tuile ne règle plus que son padding et sa pastille. */
const LABEL_TEXT: Record<TileSize, string> = {
  compact: 'text-body',
  default: 'text-body',
  large: 'text-body',
};

const GAP: Record<TileSize, string> = {
  compact: 'gap-stack-xs',
  default: 'gap-stack-sm',
  large: 'gap-stack-sm',
};

export const BehavioralTileGrid: React.FC<BehavioralTileGridProps> = ({
  tiles,
  value,
  onChange,
  disabled = false,
  size = 'default',
  layout = 'grid',
  className = '',
}) => {
  const iconSize = ICON_SIZE[size];

  return (
    <div
      className={[
        layout === 'grid' ? 'grid grid-cols-2 gap-stack-sm' : 'flex flex-col gap-stack-xs',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
      role="group"
      aria-label="Sélectionne ton niveau"
    >
      {tiles.map((label, idx) => {
        const level = (idx + 1) as DreyfusLevel;
        const isSelected = value === level;
        const Icon = LEVEL_ICONS[idx];

        return (
          <button
            key={idx}
            type="button"
            disabled={disabled}
            onClick={() => onChange(level)}
            aria-pressed={isSelected}
            className={[
              /* `items-start` + pastille dans une boîte haute d'une ligne
                 (`h-lh`) : elle se centre sur la première ligne de l'énoncé,
                 pas sur le bloc quand il en fait deux ou trois. */
              'flex items-start text-left rounded-xl border transition-all duration-200 min-h-[52px]',
              LABEL_TEXT[size],
              GAP[size],
              'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-secondary-500',
              'disabled:opacity-disabled disabled:cursor-not-allowed',
              PAD[size],
              isSelected
                ? 'bg-secondary-700 border-secondary-700 text-white shadow-card scale-[1.01]'
                : 'bg-white border border-ink-100 text-ink-800 hover:border-secondary-300 hover:bg-secondary-50/40 active:scale-[0.99]',
            ]
              .filter(Boolean)
              .join(' ')}
          >
            <span className="flex items-center h-lh shrink-0" aria-hidden>
              <span
                className={[
                  'inline-flex items-center justify-center',
                  ICON_WRAP[size],
                  isSelected ? 'bg-white/20' : 'bg-secondary-50',
                ].join(' ')}
              >
                <Icon
                  size={iconSize}
                  className={isSelected ? 'text-white' : 'text-secondary-500'}
                />
              </span>
            </span>
            {/* 16/400 : un énoncé à lire, plus un libellé en 500 serré en
                `leading-snug` (réservé aux titres courts en gras, n°11). */}
            <span className="font-body">
              {label}
            </span>
          </button>
        );
      })}
    </div>
  );
};

export default BehavioralTileGrid;
