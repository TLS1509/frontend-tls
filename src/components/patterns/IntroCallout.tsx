/**
 * IntroCallout — lead paragraph card for editorial pages.
 *
 * Glass card tone-aware avec gradient border-left subtil + paragraphe d'intro.
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
  /** Show quote icon in left border (default: false). */
  withQuoteIcon?: boolean;
  className?: string;
}

const SURFACE: Record<IntroCalloutTone, string> = {
  brand:   'bg-primary-50/60 border-primary-200 backdrop-blur-glass-light',
  warm:    'bg-secondary-50/60 border-secondary-200 backdrop-blur-glass-light',
  sun:     'bg-accent-50/70 border-accent-200 backdrop-blur-glass-light',
  neutral: 'bg-white/70 border-ink-200 backdrop-blur-glass-light',
};

const ACCENT: Record<IntroCalloutTone, string> = {
  brand:   'bg-gradient-to-b from-primary-400 to-primary-600',
  warm:    'bg-gradient-to-b from-secondary-400 to-secondary-600',
  sun:     'bg-gradient-to-b from-accent-300 to-accent-500',
  neutral: 'bg-gradient-to-b from-ink-300 to-ink-500',
};

const EYEBROW: Record<IntroCalloutTone, string> = {
  brand:   'text-primary-700',
  warm:    'text-secondary-700',
  sun:     'text-accent-700',
  neutral: 'text-ink-600',
};

const ICON_BG: Record<IntroCalloutTone, string> = {
  brand:   'bg-primary-100 text-primary-700',
  warm:    'bg-secondary-100 text-secondary-700',
  sun:     'bg-accent-100 text-accent-700',
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
        'relative rounded-2xl border p-5 sm:p-6 pl-6 sm:pl-7',
        'overflow-hidden',
        SURFACE[tone],
        className,
      ].join(' ')}
    >
      {/* Left gradient accent bar */}
      <span
        aria-hidden
        className={[
          'absolute left-0 top-0 bottom-0 w-1.5',
          ACCENT[tone],
        ].join(' ')}
      />

      <div className="flex items-start gap-4">
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

        <div className="flex-1 min-w-0 flex flex-col gap-2">
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
          <div className="font-body text-body-lg text-ink-800 leading-relaxed">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

export default IntroCallout;
