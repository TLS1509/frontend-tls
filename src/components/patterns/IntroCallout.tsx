/**
 * IntroCallout — lead paragraph card for editorial pages.
 *
 * Carte teintée tone-aware + paragraphe d'intro. La surface teintée suffit à
 * la détacher du corps : la barre d'accent verticale de 6 px qui la bordait à
 * gauche a été retirée le 2026-09-24 — c'est le premier tell « AI slop » de la
 * doctrine (pas de barre d'accent `border-left`).
 * Utilisé en haut d'un article long (sous le hero, avant le body) pour donner
 * le contexte / thèse principale.
 *
 * Usage:
 *   <IntroCallout tone="brand">
 *     L'IA générative transforme la pédagogie en profondeur…
 *   </IntroCallout>
 *
 * Tones: brand (blue) / warm (orange) / sun (yellow) / neutral (ink).
 */

import React from 'react';
import { Quote } from 'lucide-react';

export type IntroCalloutTone = 'brand' | 'warm' | 'sun' | 'neutral';

export interface IntroCalloutProps {
  /** Visual tone. */
  tone?: IntroCalloutTone;
  /** Lead paragraph content (string or rich nodes). */
  children: React.ReactNode;
  /** Optional eyebrow line (small uppercase label above the content). */
  eyebrow?: string;
  /** Show quote icon before the content (default: false). */
  withQuoteIcon?: boolean;
  className?: string;
}

const SURFACE: Record<IntroCalloutTone, string> = {
  brand:   'bg-primary-50/60 border-primary-200 backdrop-blur-glass-light',
  warm:    'bg-secondary-50/60 border-secondary-200 backdrop-blur-glass-light',
  sun:     'bg-accent-50/70 border-accent-200 backdrop-blur-glass-light',
  neutral: 'bg-white/70 border-ink-200 backdrop-blur-glass-light',
};

const EYEBROW: Record<IntroCalloutTone, string> = {
  brand:   'text-primary-700',
  warm:    'text-secondary-700',
  sun:     'text-accent-700',
  neutral: 'text-ink-600',
};

const ICON_BG: Record<IntroCalloutTone, string> = {
  brand:   'bg-primary-100 text-primary-800',
  warm:    'bg-secondary-100 text-secondary-700',
  sun:     'bg-accent-100 text-accent-800',
  neutral: 'bg-ink-100 text-ink-600',
};

export const IntroCallout: React.FC<IntroCalloutProps> = ({
  tone = 'brand',
  children,
  eyebrow,
  withQuoteIcon = false,
  className = '',
}) => {
  return (
    <div
      className={[
        'relative rounded-lg border p-stack-md sm:p-stack-lg',
        SURFACE[tone],
        className,
      ].join(' ')}
    >
      <div className="flex items-start gap-stack">
        {withQuoteIcon && (
          <span
            aria-hidden
            className={[
              'shrink-0 w-10 h-10 rounded-pill inline-flex items-center justify-center',
              ICON_BG[tone],
            ].join(' ')}
          >
            <Quote size={18} strokeWidth={2.2} />
          </span>
        )}

        <div className="flex-1 min-w-0 flex flex-col gap-stack-xs">
          {eyebrow && (
            <span
              className={[
                'inline-flex font-body text-caption font-medium',
                EYEBROW[tone],
              ].join(' ')}
            >
              {eyebrow}
            </span>
          )}
          <div className="font-body text-body-lg text-ink-800">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

export default IntroCallout;
