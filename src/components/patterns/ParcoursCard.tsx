/**
 * ParcoursCard — Design System Pattern
 *
 * Tinted-glass learning path card for catalogues / hubs.
 *
 * Visual spec :
 *  - Tinted gradient background via Card variant="tinted" tone={tone}
 *  - Tone-colored title (primary teal / warm orange / sun yellow)
 *  - Title : full text (no truncate) + native tooltip
 *  - MetaPills : duration + lessons (always visible)
 *  - Description : up to 5 lines (line-clamp-5) + native tooltip if longer
 *  - InlineProgress bar tone-aware + bold % label
 *  - Full-width tone CTA button with hover lift + tone-aware focus outline
 *  - Radial top-glow overlay per tone on hover (decorative, aria-hidden)
 *  - Inter-card alignment via flex layout + min-h on description + flex-1 spacer
 *
 * Usage : grid layouts (LearningPaths, Dashboard discovery section).
 */

import React from 'react';
import { ArrowRight, Clock3, BookOpen } from 'lucide-react';
import { InlineProgress } from './InlineProgress';
import { Card } from '../core/Card';
import { MetaPillGroup } from '../ui/MetaPillGroup';
import { CTA_SHADOW_HOVER_MD } from '../../lib/tone-classes';

export type ParcoursTone = 'primary' | 'warm' | 'sun';
export type ParcoursStatus = 'en cours' | 'complété' | 'non commencé';

export interface ParcoursCardProps {
  id: string;
  title: string;
  description: string;
  progress: number;
  status: ParcoursStatus;
  tone?: ParcoursTone;
  /** Card variant: tinted (default gradient bg) or outline (white bg + colored border). */
  cardVariant?: 'tinted' | 'outline';
  onClick?: (id: string) => void;
  className?: string;
  /** Duration label rendered in a MetaPill (e.g. "6 semaines"). */
  duration?: string;
  /** Number of lessons rendered in a MetaPill (e.g. "12 leçons"). */
  lessons?: number;
}

const CTA_LABELS: Record<ParcoursStatus, string> = {
  'en cours':       'Continuer le parcours',
  complété:         'Revoir le parcours',
  'non commencé':   'Commencer le parcours',
};

const TITLE_TONE_CLASSES: Record<ParcoursTone, string> = {
  primary: 'text-primary-600',
  warm:    'text-secondary-600',
  sun:     'text-accent-700',
};

/* ─── Outline variant (minimal, white background + colored border) ─────── */
const BG_OUTLINE = 'bg-white';
const BORDER_OUTLINE: Record<ParcoursTone, string> = {
  primary: '!border-primary-300 !border-2',
  warm:    '!border-secondary-300 !border-2',
  sun:     '!border-accent-300 !border-2',
};

const HOVER_BG_OUTLINE: Record<ParcoursTone, string> = {
  primary: 'hover:bg-primary-50',
  warm:    'hover:bg-secondary-50',
  sun:     'hover:bg-accent-50',
};

const CTA_BASE =
  'flex items-center justify-center gap-stack-xs w-full h-11 rounded-pill px-4 cursor-pointer font-body text-body-sm font-semibold whitespace-nowrap transition-[background-color,color,transform,box-shadow] duration-fast ease-emphasis hover:-translate-y-px active:translate-y-0 focus-visible:outline-2 focus-visible:outline-offset-2';

// Tone-aware CTA classes — includes tone-matched focus outline.
const CTA_TONE_CLASSES: Record<ParcoursTone, string> = {
  primary: 'bg-primary-500 hover:bg-primary-600 text-white shadow-brand-sm hover:shadow-brand-md focus-visible:outline-primary-400',
  warm:    'bg-secondary-500 hover:bg-secondary-600 text-white shadow-xs hover:shadow-sm focus-visible:outline-secondary-400',
  sun:     'bg-accent-400 hover:bg-accent-500 text-accent-900 shadow-xs hover:shadow-sun-sm focus-visible:outline-accent-500',
};

// CARD_HOVER_SHADOW moved to tone-classes.ts as CTA_SHADOW_HOVER_MD (single source of truth)

const GLOW_BG: Record<ParcoursTone, React.CSSProperties> = {
  primary: { background: 'radial-gradient(circle at 50% 0%, rgba(85, 161, 180, 0.10) 0%, transparent 70%)' },
  warm:    { background: 'radial-gradient(circle at 50% 0%, rgba(241, 138, 76, 0.14) 0%, transparent 70%)' },
  sun:     { background: 'radial-gradient(circle at 50% 0%, rgba(248, 176, 68, 0.14) 0%, transparent 70%)' },
};

export const ParcoursCard: React.FC<ParcoursCardProps> = ({
  id,
  title,
  description,
  progress,
  status,
  tone = 'primary',
  cardVariant = 'tinted',
  onClick,
  className = '',
  duration,
  lessons,
}) => {
  const hasMeta = Boolean(duration || lessons);
  const isTinted = cardVariant === 'tinted';
  const bgClasses = isTinted ? '' : BG_OUTLINE;
  const borderClasses = isTinted ? '' : BORDER_OUTLINE[tone];
  const hoverClasses = !isTinted ? HOVER_BG_OUTLINE[tone] : '';

  return (
    <Card
      variant={isTinted ? 'tinted' : 'default'}
      tone={isTinted ? tone : undefined}
      onClick={() => onClick?.(id)}
      aria-label={`${title} — ${status}`}
      className={[
        'group relative overflow-hidden cursor-pointer transition-[transform,box-shadow,opacity] duration-base ease-emphasis hover:-translate-y-1',
        isTinted ? CTA_SHADOW_HOVER_MD[tone] : '',
        `!p-0 !rounded-2xl !gap-0`,
        bgClasses,
        borderClasses,
        hoverClasses,
        !isTinted ? '!border-none' : '', // outline: remove default border
        className,
      ].filter(Boolean).join(' ')}
    >
      {/* Radial glow overlay — opacity-0 → opacity-100 on group-hover (tinted only) */}
      {isTinted && (
        <div
          aria-hidden="true"
          className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-base ease-standard"
          style={GLOW_BG[tone]}
        />
      )}

      <div className="relative p-8 flex flex-col gap-stack h-full min-w-0">
        {/* Titre — pas de truncate, overflow-wrap:anywhere évite le dépassement sur longs mots,
            hyphens-none désactive la césure automatique (évite "Communica-tion"), text-wrap:balance
            pour wrap équilibré. */}
        <h3
          className={`font-display text-h3 font-bold leading-[1.15] m-0 [overflow-wrap:anywhere] hyphens-none max-md:text-h4 [text-wrap:balance] ${TITLE_TONE_CLASSES[tone]}`}
          title={title}
        >
          {title}
        </h3>

        {/* MetaPills — rendered only when data present (no empty space reservation) */}
        {hasMeta && (
          <MetaPillGroup
            items={[
              ...(duration ? [{ icon: <Clock3 size={13} />, text: duration }] : []),
              ...(lessons ? [{ icon: <BookOpen size={13} />, text: `${lessons} leçons` }] : []),
            ]}
            size="sm"
            layout="horizontal"
            gap="sm"
          />
        )}

        {/* Description — min-h réservé (3 lignes ≈ 72px) pour aligner inter-cards.
            Full par défaut (jusqu'à 5 lignes), tooltip natif si plus long. */}
        <p
          className="font-body text-body-sm text-ink-600 leading-normal m-0 line-clamp-5 min-h-[4.5rem]"
          title={description}
        >
          {description}
        </p>

        {/* Spacer — pousse progress + CTA toujours au bas de la card */}
        <div className="flex-1 min-h-2" />

        <InlineProgress value={progress} tone={tone} showLabel={true} size="md" />

        <button
          type="button"
          className={`${CTA_BASE} ${CTA_TONE_CLASSES[tone]}`}
          onClick={(e) => { e.stopPropagation(); onClick?.(id); }}
          aria-label={CTA_LABELS[status]}
        >
          <span>{CTA_LABELS[status]}</span>
          <ArrowRight size={15} aria-hidden="true" />
        </button>
      </div>
    </Card>
  );
};

export default ParcoursCard;
