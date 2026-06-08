/**
 * VeilleFormatShortcutCards — Navigation shortcut cards for Veille editorial formats.
 *
 * Figma DS name: VeilleFormatShortcutCards.
 *
 * Renders a 2×2 (mobile) → 4-col (sm+) grid of compact navigation cards,
 * each with an icon, a label and a short description. Designed for placement
 * inside the Veille hero (dark-gradient surface) by default, with an optional
 * `variant="light"` for use on white/light surfaces.
 *
 * Props:
 *  - items     — array of { label, desc?, icon, iconClassName?, onClick }
 *  - variant   — 'dark' (default, glass on gradient) | 'light' (on white surface)
 *  - className — extra classes on the root grid wrapper
 */

import React from 'react';
import { ArrowRight } from 'lucide-react';

// ─── Types ────────────────────────────────────────────────────────────────────

export interface VeilleFormatShortcutItem {
  label: string;
  desc?: string;
  /** Rendered icon node — pass a sized Lucide icon: `<BookOpen size={15} strokeWidth={2} />` */
  icon: React.ReactNode;
  /** Colour class applied to the icon wrapper, e.g. `'text-primary-200'` */
  iconClassName?: string;
  onClick?: () => void;
}

export type VeilleFormatShortcutVariant = 'dark' | 'light';

export interface VeilleFormatShortcutCardsProps {
  items: VeilleFormatShortcutItem[];
  variant?: VeilleFormatShortcutVariant;
  className?: string;
}

// ─── Variant maps ─────────────────────────────────────────────────────────────

const CARD: Record<VeilleFormatShortcutVariant, string> = {
  dark:  'bg-white/[0.06] border border-white/[0.12] hover:bg-white/[0.12] hover:border-white/25',
  light: 'bg-ink-50 border border-ink-200 hover:bg-ink-100 hover:border-ink-300',
};

const LABEL: Record<VeilleFormatShortcutVariant, string> = {
  dark:  'text-white',
  light: 'text-ink-900',
};

const DESC: Record<VeilleFormatShortcutVariant, string> = {
  dark:  'text-white/40',
  light: 'text-ink-400',
};

const ARROW: Record<VeilleFormatShortcutVariant, string> = {
  dark:  'text-white/30',
  light: 'text-ink-300',
};

// ─── Component ────────────────────────────────────────────────────────────────

export const VeilleFormatShortcutCards: React.FC<VeilleFormatShortcutCardsProps> = ({
  items,
  variant = 'dark',
  className = '',
}) => (
  <div
    className={[
      'grid grid-cols-2 sm:grid-cols-4 gap-2',
      className,
    ].filter(Boolean).join(' ')}
  >
    {items.map((item, i) => (
      <button
        key={i}
        type="button"
        onClick={item.onClick}
        disabled={!item.onClick}
        className={[
          'group flex items-center gap-2.5 p-3 rounded-xl text-left',
          'transition-all duration-base',
          'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500',
          item.onClick ? 'cursor-pointer' : 'cursor-default',
          CARD[variant],
        ].join(' ')}
      >
        {/* Icon */}
        <span
          className={['shrink-0', item.iconClassName ?? ''].filter(Boolean).join(' ')}
          aria-hidden
        >
          {item.icon}
        </span>

        {/* Text */}
        <span className="flex-1 min-w-0 flex flex-col gap-0">
          <span className={['font-body text-caption font-semibold leading-tight', LABEL[variant]].join(' ')}>
            {item.label}
          </span>
          {item.desc && (
            <span className={['font-body text-micro leading-tight hidden sm:block', DESC[variant]].join(' ')}>
              {item.desc}
            </span>
          )}
        </span>

        {/* Arrow — reveals on hover */}
        {item.onClick && (
          <ArrowRight
            size={12}
            className={[
              'shrink-0 opacity-0 group-hover:opacity-100 transition-opacity duration-base',
              ARROW[variant],
            ].join(' ')}
            aria-hidden
          />
        )}
      </button>
    ))}
  </div>
);

export default VeilleFormatShortcutCards;
