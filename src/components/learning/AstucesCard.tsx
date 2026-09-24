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
import { TONE_BG_700, TONE_BG_50, TONE_BORDER_200 } from '../../lib/tone-classes';
import type { PageTone } from '../../lib/tone-classes';
import { MetaPill, type MetaPillTone } from '../ui/MetaPill';

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

/* La catégorie est une DONNÉE : MetaPill au ton de la carte (arbitrage n°14). */
const TONE_PILL: Record<PageTone, MetaPillTone> = {
  primary: 'primary',
  warm:    'warm',
  sun:     'sun',
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
  /* Anatomie (passe typographique du 2026-09-24) : catégorie → image 8 ·
     image → titre 16 · titre → texte 8 · texte → exemples 12. Padding 20 puis
     24 : jamais sous le rayon de la carte (20), arbitrage n°4 — il était à
     12 et 16. Le rythme est porté par la colonne, plus par des marges posées
     sur chaque enfant ; le titre (h2 non premier) y ajoutait sa marge de
     base de 15 px. */
  <article
    className={[
      'relative flex flex-col p-stack-md sm:p-stack-lg rounded-xl bg-white border-2',
      TONE_CARD_SHADOW[tone],
      TONE_CARD_BORDER[tone],
    ].join(' ')}
  >
    {/* Number badge — top-left */}
    <div
      className={[
        'absolute -top-4 -left-2 sm:left-6',
        'w-10 h-10 rounded-xl inline-flex items-center justify-center shadow-md',
        TONE_BG_700[tone],
      ].join(' ')}
    >
      <span className="font-display text-body font-bold text-white tabular-nums">{number}</span>
    </div>

    {/* Category — top-right */}
    <div className="flex justify-end">
      <MetaPill text={badge} tone={TONE_PILL[tone]} />
    </div>

    {/* Hero image */}
    <div className="mt-stack-xs rounded-xl overflow-hidden shadow-md aspect-video sm:aspect-[3/1]">
      <img src={image} alt="" className="w-full h-full object-cover" loading="lazy" />
    </div>

    {/* Title — h2 sous le h1 du lecteur : 20 px dans une colonne étroite, 28
        (le pas de son niveau) dès `sm`. Encre ink-900 : la couleur du ton
        (cran 700) ne porte pas un titre (doctrine § 2). */}
    <h2 className="mt-stack font-display text-h3 sm:text-h2 text-ink-900">
      {title}
    </h2>

    {/* Description */}
    <p className="m-0 mt-stack-xs text-body text-ink-700 max-w-prose">
      {description}
    </p>

    {/* Examples — du texte qu'on lit : 16 px (c'était 12, puis 13). La
        pastille numérotée se centre sur la première ligne (`h-lh`). */}
    {examples.length > 0 && (
      <ul className="m-0 mt-stack-sm p-0 list-none flex flex-col gap-stack-3xs">
        {examples.map((example, idx) => (
          <li
            key={idx}
            className={[
              'flex items-start gap-stack-xs px-stack-sm py-stack-xs rounded-lg border text-body',
              TONE_BG_50[tone],
              TONE_BORDER_200[tone],
            ].join(' ')}
          >
            <span className="flex items-center h-lh shrink-0">
              <span
                className={[
                  'inline-flex items-center justify-center w-6 h-6',
                  'rounded-pill text-white text-caption font-bold tabular-nums',
                  TONE_BG_700[tone],
                ].join(' ')}
              >
                {idx + 1}
              </span>
            </span>
            <span className="font-body text-body text-ink-900">{example}</span>
          </li>
        ))}
      </ul>
    )}
  </article>
);
