/**
 * AstucesCard — Tips & tricks card (Phase 23.C feature treatment).
 *
 * Uses border-2 (2px) as intentional visual distinction for tips/tricks content.
 * This card deserves heavier visual weight than standard lesson content cards.
 * Do not unify to standard border (1px) without design team approval.
 *
 * Phase 23.C: Documented border-2 as feature treatment (not a bug).
 */

import React from 'react';
import { TONE_BG_500, TONE_BG_50, TONE_BORDER_200, TONE_TEXT_700 } from '../../lib/tone-classes';
import type { PageTone } from '../../lib/tone-classes';

export interface AstucesCardProps {
  /** Step number shown in the top-left accent badge */
  number: number;
  /** Uppercase category label shown in the top-right accent badge */
  badge: string;
  /** Hero image URL */
  image: string;
  /** Card heading */
  title: string;
  /** Card body text */
  description: string;
  /** Optional numbered examples rendered as tone-tinted rows */
  examples?: string[];
  /** Tone drives border, badge and example-row accent colors */
  tone?: PageTone;
}

const TONE_CARD_BORDER: Record<PageTone, string> = {
  primary: 'border-primary-400',
  warm:    'border-secondary-400',
  sun:     'border-accent-400',
};

const TONE_CARD_SHADOW: Record<PageTone, string> = {
  primary: 'shadow-brand-md',
  warm:    'shadow-warm-md',
  sun:     'shadow-sun-md',
};

export const AstucesCard: React.FC<AstucesCardProps> = ({
  number,
  badge,
  image,
  title,
  description,
  examples = [],
  tone = 'sun',
}) => (
  <article
    className={[
      'relative p-3 sm:p-4 rounded-2xl bg-white border-2',
      TONE_CARD_SHADOW[tone],
      TONE_CARD_BORDER[tone],
    ].join(' ')}
  >
    {/* Number badge — top-left */}
    <div
      className={[
        'absolute -top-4 -left-2 sm:left-6',
        'w-10 h-10 rounded-xl inline-flex items-center justify-center shadow-md',
        TONE_BG_500[tone],
      ].join(' ')}
    >
      <span className="font-display text-h5 font-bold text-white">{number}</span>
    </div>

    {/* Category badge — top-right */}
    <div className="flex justify-end mb-2">
      <span
        className={[
          'inline-flex items-center px-2 py-1 rounded-lg',
          'text-white text-micro font-bold uppercase tracking-wide',
          TONE_BG_500[tone],
        ].join(' ')}
      >
        {badge}
      </span>
    </div>

    {/* Hero image */}
    <div className="rounded-2xl overflow-hidden mb-3 shadow-md aspect-video sm:aspect-[3/1]">
      <img src={image} alt="" className="w-full h-full object-cover" loading="lazy" />
    </div>

    {/* Title */}
    <h2
      className={[
        'm-0 mb-2 font-display text-h4 sm:text-h3 font-bold tracking-headline',
        TONE_TEXT_700[tone],
      ].join(' ')}
    >
      {title}
    </h2>

    {/* Description */}
    <p className="m-0 text-body-sm sm:text-body text-ink-700 leading-snug">
      {description}
    </p>

    {/* Examples */}
    {examples.length > 0 && (
      <ul className="m-0 mt-2 p-0 list-none flex flex-col gap-1">
        {examples.map((example, idx) => (
          <li
            key={idx}
            className={[
              'flex items-center gap-2 p-2.5 rounded-lg border',
              TONE_BG_50[tone],
              TONE_BORDER_200[tone],
            ].join(' ')}
          >
            <span
              className={[
                'shrink-0 inline-flex items-center justify-center w-6 h-6',
                'rounded-pill text-white text-caption font-bold text-xs',
                TONE_BG_500[tone],
              ].join(' ')}
            >
              {idx + 1}
            </span>
            <span className="font-body text-caption text-ink-800 leading-snug">{example}</span>
          </li>
        ))}
      </ul>
    )}
  </article>
);
