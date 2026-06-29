/**
 * ResumeLessonCard — Dashboard dominant action "Reprendre ta leçon".
 *
 * Redesign B/C hybrid (2026-06-27):
 * - Fond dégradé doux tone-aware (âme de B, pas saturé)
 * - Layout horizontal compact : contenu gauche | stats+CTA droite (sobriété de C)
 * - Barre de progression pleine largeur en bordure basse (signature visuelle)
 * - Hauteur contenue ~160px desktop, s'empile en mobile
 */

import React from 'react';
import { ArrowRight, Play, BookOpen } from 'lucide-react';

export type ResumeLessonTone = 'primary' | 'warm' | 'sun';

export interface ResumeLessonCardProps {
  id: string;
  parcoursTitle: string;
  eyebrow?: React.ReactNode;
  /** @deprecated not rendered */
  description?: string;
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

// ─── Tone maps ────────────────────────────────────────────────────────────────

const BG_GRADIENT: Record<ResumeLessonTone, string> = {
  primary: 'bg-gradient-to-br from-primary-50 via-primary-100/60 to-primary-50',
  warm:    'bg-gradient-to-br from-secondary-50 via-secondary-100/60 to-secondary-50',
  sun:     'bg-gradient-to-br from-accent-50 via-accent-100/60 to-accent-50',
};

const BORDER_COLOR: Record<ResumeLessonTone, string> = {
  primary: 'border-primary-200/70',
  warm:    'border-secondary-200/70',
  sun:     'border-accent-200/70',
};

const PILL_CLASSES: Record<ResumeLessonTone, string> = {
  primary: 'bg-primary-200/70 text-primary-700',
  warm:    'bg-secondary-200/70 text-secondary-700',
  sun:     'bg-accent-200/60 text-accent-700',
};

const TITLE_COLOR: Record<ResumeLessonTone, string> = {
  primary: 'text-primary-900',
  warm:    'text-secondary-900',
  sun:     'text-accent-900',
};

const ICON_COLOR: Record<ResumeLessonTone, string> = {
  primary: 'text-primary-500',
  warm:    'text-secondary-500',
  sun:     'text-accent-600',
};

const DIVIDER_COLOR: Record<ResumeLessonTone, string> = {
  primary: 'border-primary-200/60',
  warm:    'border-secondary-200/60',
  sun:     'border-accent-200/50',
};

const PCT_COLOR: Record<ResumeLessonTone, string> = {
  primary: 'text-primary-700',
  warm:    'text-secondary-700',
  sun:     'text-accent-700',
};

const CTA_CLASSES: Record<ResumeLessonTone, string> = {
  primary: 'bg-primary-600 text-white hover:bg-primary-700 active:bg-primary-800 shadow-brand-sm hover:shadow-brand-md',
  warm:    'bg-secondary-500 text-white hover:bg-secondary-600 active:bg-secondary-700 shadow-warm-sm hover:shadow-warm-md',
  sun:     'bg-accent-500 text-white hover:bg-accent-600 active:bg-accent-700 shadow-sun-sm',
};

const PROGRESS_FILL: Record<ResumeLessonTone, string> = {
  primary: 'bg-primary-500',
  warm:    'bg-secondary-500',
  sun:     'bg-accent-500',
};

const PROGRESS_TRACK: Record<ResumeLessonTone, string> = {
  primary: 'bg-primary-200/50',
  warm:    'bg-secondary-200/50',
  sun:     'bg-accent-200/50',
};

// ─── Component ───────────────────────────────────────────────────────────────

export const ResumeLessonCard: React.FC<ResumeLessonCardProps> = ({
  id,
  parcoursTitle,
  eyebrow,
  nextLessonTitle,
  progress,
  ctaLabel = 'Reprendre ta leçon',
  tone = 'warm',
  level,
  duration,
  onClick,
  className = '',
}) => {
  const clamped = Math.max(0, Math.min(100, progress));
  const contextParts = [eyebrow, level, duration].filter(Boolean);
  const contextLine = contextParts.slice(0, 2).join(' · ');

  return (
    <article
      role="button"
      tabIndex={0}
      aria-label={`Reprendre ${parcoursTitle}`}
      onClick={() => onClick?.(id)}
      onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onClick?.(id); } }}
      className={[
        'group relative rounded-2xl border overflow-hidden cursor-pointer',
        'transition-[transform,box-shadow] duration-base ease-emphasis',
        'hover:-translate-y-0.5 hover:shadow-card-lift',
        'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500',
        '!h-auto !overflow-visible',
        BG_GRADIENT[tone],
        BORDER_COLOR[tone],
        className,
      ].join(' ')}
    >
      {/* ── Main content row ───────────────────────────────────────────── */}
      <div className="flex flex-col sm:flex-row">

        {/* Left — eyebrow + title + next lesson */}
        <div className="flex-1 min-w-0 px-6 pt-5 pb-4 sm:py-6 sm:px-7 flex flex-col gap-2">

          {/* Eyebrow row */}
          <div className="flex items-center gap-2 flex-wrap">
            <span className={[
              'inline-flex items-center gap-1.5 text-[11px] font-semibold tracking-wide uppercase px-2.5 py-1 rounded-pill',
              PILL_CLASSES[tone],
            ].join(' ')}>
              <Play size={8} fill="currentColor" aria-hidden="true" />
              En cours
            </span>
            {contextLine && (
              <span className="font-body text-caption text-ink-500 font-medium">{contextLine}</span>
            )}
          </div>

          {/* Title */}
          <h2 className={[
            'font-display font-bold leading-[1.05] tracking-headline m-0 text-balance',
            'text-[1.45rem] sm:text-[1.7rem]',
            TITLE_COLOR[tone],
          ].join(' ')}>
            {parcoursTitle}
          </h2>

          {/* Next lesson */}
          {nextLessonTitle && (
            <p className="flex items-center gap-2 font-body text-body-sm text-ink-600 m-0 leading-snug">
              <BookOpen size={14} strokeWidth={2} className={`shrink-0 ${ICON_COLOR[tone]}`} aria-hidden="true" />
              <span>
                Prochaine leçon&nbsp;:{' '}
                <span className="font-semibold text-ink-800">{nextLessonTitle}</span>
              </span>
            </p>
          )}
        </div>

        {/* Right — % stat + CTA (vertical divider on sm+) */}
        <div className={[
          'flex sm:flex-col items-center justify-between sm:justify-center',
          'px-6 pb-4 pt-0 sm:py-6 sm:px-7',
          'sm:border-l sm:border-dashed',
          'gap-4 sm:gap-3 sm:min-w-[160px]',
          DIVIDER_COLOR[tone],
        ].join(' ')}>
          {/* Progress % — quiet stat (completion is secondary to the action;
              the full-width rail below already carries the visual signal). */}
          <div className="flex flex-col items-center">
            <span className={[
              'font-display font-semibold leading-none tabular-nums',
              'text-[1.5rem] sm:text-[1.6rem]',
              PCT_COLOR[tone],
            ].join(' ')}>
              {clamped}%
            </span>
            <span className="text-micro font-medium text-ink-400 mt-0.5 uppercase tracking-[0.06em]">
              complété
            </span>
          </div>

          {/* CTA */}
          <button
            type="button"
            onClick={(e) => { e.stopPropagation(); onClick?.(id); }}
            aria-label={ctaLabel}
            className={[
              'inline-flex items-center justify-center gap-1.5',
              'h-10 px-5 rounded-pill text-body-sm font-body font-semibold whitespace-nowrap shrink-0',
              'transition-[background-color,transform,box-shadow] duration-fast ease-emphasis',
              'hover:-translate-y-px active:translate-y-0',
              'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-400',
              CTA_CLASSES[tone],
            ].join(' ')}
          >
            {ctaLabel}
            <ArrowRight size={14} aria-hidden="true" />
          </button>
        </div>
      </div>

      {/* ── Progress rail — pleine largeur, bordure basse ──────────────── */}
      <div
        className={['h-1.5 w-full', PROGRESS_TRACK[tone]].join(' ')}
        role="progressbar"
        aria-valuenow={clamped}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label={`Progression : ${clamped}%`}
      >
        <div
          className={['h-full transition-[width] duration-700 ease-out', PROGRESS_FILL[tone]].join(' ')}
          style={{ width: `${clamped}%` }}
        />
      </div>
    </article>
  );
};

export default ResumeLessonCard;
