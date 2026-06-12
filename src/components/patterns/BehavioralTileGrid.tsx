/**
 * BehavioralTileGrid — Competency / behavioral pillar tile grid.
 *
 * Figma DS name: BehavioralTileGrid.
 *
 * Renders a responsive auto-fit grid of competency/behaviour tiles.
 * Each tile shows:
 *  - A tinted accent square indicator (decoration)
 *  - Title (bold)
 *  - Description (body-sm)
 *  - Optional tag pills (micro text, tone-tinted)
 *
 * Tile tones cycle through 4 built-in palette entries (primary, warm, sun, primary-alt)
 * to create natural visual variety without requiring per-tile configuration.
 *
 * Used in LessonPlayer (Engagement section) and onboarding/positionnement flows
 * to present the conceptual pillars or behavioral dimensions of a competency.
 *
 * Props:
 *  - tiles  — array of { title, description, tags? }
 *  - heading — optional heading rendered above the grid
 *  - className — extra classes on the root wrapper
 */

import React from 'react';

// ─── Types ────────────────────────────────────────────────────────────────────

export interface BehavioralTile {
  title: string;
  description: string;
  tags?: string[];
}

export interface BehavioralTileGridProps {
  tiles: BehavioralTile[];
  /** Optional heading shown above the grid. */
  heading?: string;
  className?: string;
}

// ─── Internal palette — 4 entries that cycle with modulo ─────────────────────

interface TilePalette {
  card: string;
  accentBg: string;
  accentDot: string;
  tag: string;
}

const TILE_PALETTES: TilePalette[] = [
  {
    card:      'bg-primary-50 border-primary-100',
    accentBg:  'bg-primary-500/20',
    accentDot: 'bg-primary-500',
    tag:       'bg-primary-100 text-primary-700',
  },
  {
    card:      'bg-secondary-50 border-secondary-100',
    accentBg:  'bg-secondary-600/20',
    accentDot: 'bg-secondary-600',
    tag:       'bg-secondary-100 text-secondary-700',
  },
  {
    card:      'bg-accent-50 border-accent-100',
    accentBg:  'bg-accent-500/20',
    accentDot: 'bg-accent-500',
    tag:       'bg-accent-100 text-accent-700',
  },
  {
    card:      'bg-primary-50 border-primary-100',
    accentBg:  'bg-primary-400/20',
    accentDot: 'bg-primary-400',
    tag:       'bg-primary-100 text-primary-600',
  },
];

// ─── Component ────────────────────────────────────────────────────────────────

export const BehavioralTileGrid: React.FC<BehavioralTileGridProps> = ({
  tiles,
  heading,
  className = '',
}) => (
  <div className={['flex flex-col gap-stack', className].filter(Boolean).join(' ')}>

    {heading && (
      <h2 className="font-display text-h2 font-bold text-ink-900 m-0 leading-[1.15] text-balance">
        {heading}
      </h2>
    )}

    {/* auto-fit grid so any number of tiles fills the row naturally */}
    <div
      className="grid gap-stack"
      style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))' }}
    >
      {tiles.map((tile, i) => {
        const p = TILE_PALETTES[i % TILE_PALETTES.length];
        return (
          <div
            key={tile.title}
            className={['rounded-xl p-6 border', p.card].join(' ')}
          >
            {/* Accent indicator */}
            <div
              className={[
                'w-10 h-10 rounded-md flex items-center justify-center mb-stack',
                p.accentBg,
              ].join(' ')}
              aria-hidden
            >
              <div className={['w-4 h-4 rounded-sm', p.accentDot].join(' ')} />
            </div>

            {/* Title */}
            <h3 className="m-0 mb-2 font-display text-h4 font-bold text-ink-900">
              {tile.title}
            </h3>

            {/* Description */}
            <p className="m-0 mb-3 font-body text-body-sm text-ink-500 leading-relaxed">
              {tile.description}
            </p>

            {/* Tags */}
            {tile.tags && tile.tags.length > 0 && (
              <div className="flex flex-wrap gap-tight">
                {tile.tags.map((tag) => (
                  <span
                    key={tag}
                    className={[
                      'text-micro px-2 py-0.5 rounded-pill font-semibold',
                      p.tag,
                    ].join(' ')}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </div>
        );
      })}
    </div>
  </div>
);

export default BehavioralTileGrid;
