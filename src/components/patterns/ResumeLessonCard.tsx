/**
 * ResumeLessonCard — Action dominante dashboard "Reprendre ta leçon".
 *
 * Design intent : titre DOMINANT (pleine largeur), zéro meta pills en chapeau,
 * une ligne de contexte sobre, progress + CTA frosted-glass.
 */

import React from 'react';
import { ArrowRight, Play, BookOpen } from 'lucide-react';
import { InlineProgress } from './InlineProgress';
import { Card } from '../core/Card';

export type ResumeLessonTone = 'primary' | 'warm' | 'sun';

export interface ResumeLessonCardProps {
  id: string;
  parcoursTitle: string;
  /** Contexte de position : "Étape 2 sur 5", "Leçon 3 / Module 2" */
  eyebrow?: React.ReactNode;
  /** Kept for backward compat — not rendered */
  description?: string;
  /** Prochaine leçon concrète — affichée en ligne éditoriale sous le titre. */
  nextLessonTitle?: string;
  progress: number;
  ctaLabel?: string;
  tone?: ResumeLessonTone;
  level?: 'débutant' | 'intermédiaire' | 'avancé';
  duration?: string;
  lessons?: number;
  onClick?: (id: string) => void;
  className?: string;
}

const TITLE_TONE: Record<ResumeLessonTone, string> = {
  primary: 'text-primary-800',
  warm:    'text-secondary-800',
  sun:     'text-accent-800',
};

const EYEBROW_PILL: Record<ResumeLessonTone, string> = {
  primary: 'bg-primary-200/60 text-primary-700',
  warm:    'bg-secondary-200/60 text-secondary-700',
  sun:     'bg-accent-200/60 text-accent-700',
};

const CTA_TONE: Record<ResumeLessonTone, string> = {
  primary: 'bg-white/80 text-primary-800 border border-white/70 backdrop-blur-sm shadow-sm hover:bg-white hover:shadow-brand-sm',
  warm:    'bg-white/80 text-secondary-800 border border-white/70 backdrop-blur-sm shadow-sm hover:bg-white hover:shadow-warm-sm',
  sun:     'bg-white/80 text-accent-800 border border-white/70 backdrop-blur-sm shadow-sm hover:bg-white hover:shadow-sun-sm',
};

const CARD_HOVER_SHADOW: Record<ResumeLessonTone, string> = {
  primary: 'hover:shadow-brand-sm',
  warm:    'hover:shadow-warm-sm',
  sun:     'hover:shadow-sun-sm',
};

const GLOW_BG: Record<ResumeLessonTone, React.CSSProperties> = {
  primary: { background: 'radial-gradient(circle at 50% 0%, rgba(85, 161, 180, 0.10) 0%, transparent 70%)' },
  warm:    { background: 'radial-gradient(circle at 50% 0%, rgba(241, 138, 76, 0.14) 0%, transparent 70%)' },
  sun:     { background: 'radial-gradient(circle at 50% 0%, rgba(248, 176, 68, 0.14) 0%, transparent 70%)' },
};

const DIVIDER_TONE: Record<ResumeLessonTone, string> = {
  primary: 'bg-primary-200/55',
  warm:    'bg-secondary-200/55',
  sun:     'bg-accent-200/60',
};

const NEXT_ICON_TONE: Record<ResumeLessonTone, string> = {
  primary: 'text-primary-600',
  warm:    'text-secondary-600',
  sun:     'text-accent-700',
};

export const ResumeLessonCard: React.FC<ResumeLessonCardProps> = ({
  id,
  parcoursTitle,
  eyebrow,
  nextLessonTitle,
  progress,
  ctaLabel = 'Continuer ma leçon',
  tone = 'warm',
  level,
  duration,
  onClick,
  className = '',
}) => {
  const contextParts = [eyebrow, level, duration].filter(Boolean);
  const contextLine = contextParts.slice(0, 2).join(' · ');

  return (
    <Card
      variant="tinted"
      tone={tone === 'sun' ? 'sun' : tone === 'warm' ? 'warm' : 'primary'}
      onClick={() => onClick?.(id)}
      aria-label={`Reprendre ${parcoursTitle}`}
      className={`group relative overflow-hidden cursor-pointer transition-[transform,box-shadow] duration-base ease-emphasis hover:-translate-y-0.5 ${CARD_HOVER_SHADOW[tone]} !p-0 !rounded-2xl !gap-0 ${className}`}
    >
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-slow ease-standard"
        style={GLOW_BG[tone]}
      />

      <div className="relative px-6 py-6 md:px-8 md:py-7 lg:px-9 lg:py-8 flex flex-col gap-stack">

        {/* Eyebrow row — pill "En cours" + position inline (une seule ligne éditoriale) */}
        <div className="flex items-center gap-stack-xs flex-wrap">
          <span className={[
            'inline-flex items-center gap-1.5 text-[11px] font-semibold tracking-wide uppercase px-2.5 py-1 rounded-pill',
            EYEBROW_PILL[tone],
          ].join(' ')}>
            <Play size={8} fill="currentColor" aria-hidden="true" />
            En cours
          </span>
          {contextLine && (
            <span className="font-body text-caption font-medium text-ink-500">{contextLine}</span>
          )}
        </div>

        {/* Title — DOMINANT */}
        <h2 className={[
          'font-display font-bold leading-[1.04] tracking-display m-0 text-balance',
          'text-[1.9rem] md:text-[2.3rem] lg:text-[2.6rem]',
          TITLE_TONE[tone],
        ].join(' ')}>
          {parcoursTitle}
        </h2>

        {/* Prochaine leçon — ligne concrète (remplit l'espace de façon utile, practice-as-verb) */}
        {nextLessonTitle && (
          <p className="flex items-center gap-2 font-body text-body-sm text-ink-700 m-0 leading-snug">
            <BookOpen size={15} strokeWidth={2} className={`shrink-0 ${NEXT_ICON_TONE[tone]}`} aria-hidden="true" />
            <span>Prochaine leçon&nbsp;: <span className="font-semibold text-ink-900">{nextLessonTitle}</span></span>
          </p>
        )}

        {/* Hairline — sépare le contexte de l'action */}
        <div aria-hidden="true" className={`h-px w-full ${DIVIDER_TONE[tone]} mt-1`} />

        {/* Progress + CTA */}
        <div className="flex flex-col sm:flex-row sm:items-center gap-stack">
          <div className="flex-1 min-w-0">
            <InlineProgress value={progress} tone={tone} showLabel size="md" />
          </div>
          <button
            type="button"
            className={[
              'inline-flex items-center justify-center gap-2 h-11 px-6 rounded-pill',
              'text-body-sm font-body font-semibold whitespace-nowrap shrink-0 cursor-pointer',
              'transition-[background-color,color,transform,box-shadow] duration-fast ease-emphasis',
              'hover:-translate-y-px active:translate-y-0',
              'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-400',
              CTA_TONE[tone],
            ].join(' ')}
            onClick={(e) => { e.stopPropagation(); onClick?.(id); }}
            aria-label={ctaLabel}
          >
            <span>{ctaLabel}</span>
            <ArrowRight size={15} aria-hidden="true" />
          </button>
        </div>

      </div>
    </Card>
  );
};

export default ResumeLessonCard;
