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
      'relative p-5 sm:p-8 rounded-3xl bg-white border-[3px]',
      'shadow-[0_8px_32px_rgba(248,176,68,0.18)]',
      TONE_CARD_BORDER[tone],
    ].join(' ')}
  >
    {/* Number badge — top-left */}
    <div
      className={[
        'absolute -top-5 -left-2 sm:left-8',
        'w-12 h-12 rounded-2xl inline-flex items-center justify-center shadow-md',
        TONE_BG_500[tone],
      ].join(' ')}
    >
      <span className="font-display text-h4 font-bold text-white">{number}</span>
    </div>

    {/* Category badge — top-right */}
    <div className="flex justify-end mb-stack">
      <span
        className={[
          'inline-flex items-center px-3 py-1.5 rounded-xl',
          'text-white text-micro font-bold uppercase tracking-wider',
          TONE_BG_500[tone],
        ].join(' ')}
      >
        {badge}
      </span>
    </div>

    {/* Hero image */}
    <div className="rounded-2xl overflow-hidden mb-stack-lg shadow-md aspect-[16/9] sm:aspect-[2/1]">
      <img src={image} alt="" className="w-full h-full object-cover" loading="lazy" />
    </div>

    {/* Title */}
    <h2
      className={[
        'm-0 mb-stack font-display text-h3 sm:text-h2 font-bold tracking-tight',
        TONE_TEXT_700[tone],
      ].join(' ')}
    >
      {title}
    </h2>

    {/* Description */}
    <p className="m-0 font-body text-body sm:text-body-lg text-ink-700 leading-relaxed">
      {description}
    </p>

    {/* Examples */}
    {examples.length > 0 && (
      <ul className="m-0 mt-stack-lg p-0 list-none flex flex-col gap-2">
        {examples.map((example, idx) => (
          <li
            key={idx}
            className={[
              'flex items-center gap-3 p-4 rounded-xl border',
              TONE_BG_50[tone],
              TONE_BORDER_200[tone],
            ].join(' ')}
          >
            <span
              className={[
                'shrink-0 inline-flex items-center justify-center w-8 h-8',
                'rounded-pill text-white text-caption font-bold',
                TONE_BG_500[tone],
              ].join(' ')}
            >
              {idx + 1}
            </span>
            <span className="font-body text-body-sm text-ink-800 leading-snug">{example}</span>
          </li>
        ))}
      </ul>
    )}
  </article>
);
