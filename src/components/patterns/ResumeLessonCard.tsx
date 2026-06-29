/**
 * ResumeLessonCard — Dashboard dominant action "Reprendre la leçon".
 *
 * Hiérarchie corrigée (Phase 19 P2) :
 *  - Panneau gauche : contexte + titre parcours + prochaine leçon
 *  - Panneau droit  : indicateur d'étape (Étape X/Y) + CTA seul
 *  - Barre basse    : progression visuelle uniquement (pas de %)
 *
 * Le % de complétion est retiré du champ visuel — la barre suffit.
 * Le CTA n'a plus de compétiteur dans son panneau → action claire.
 */

import React from 'react';
import { ArrowRight, Play, BookOpen, Target } from 'lucide-react';

export type ResumeLessonTone = 'primary' | 'warm' | 'sun';

export interface ResumeLessonCardProps {
  id: string;
  parcoursTitle: string;
  /** Affiché dans la ligne de contexte gauche (ex: "Étape 2 sur 5"). */
  eyebrow?: React.ReactNode;
  /** @deprecated not rendered */
  description?: string;
  nextLessonTitle?: string;
  progress: number;
  /** Étape actuelle — alimente le compteur droit. */
  currentStep?: number;
  /** Nombre total d'étapes — alimente le compteur droit. */
  totalSteps?: number;
  ctaLabel?: string;
  tone?: ResumeLessonTone;
  level?: 'débutant' | 'intermédiaire' | 'avancé';
  duration?: string;
  onClick?: (id: string) => void;
  className?: string;
}

// ─── Tone maps ────────────────────────────────────────────────────────────────

const BG_GRADIENT: Record<ResumeLessonTone, string> = {
  primary: 'bg-gradient-to-br from-primary-50 via-primary-100/50 to-white',
  warm:    'bg-gradient-to-br from-secondary-50 via-secondary-100/50 to-white',
  sun:     'bg-gradient-to-br from-accent-50 via-accent-100/50 to-white',
};

const BORDER_COLOR: Record<ResumeLessonTone, string> = {
  primary: 'border-primary-200/60',
  warm:    'border-secondary-200/60',
  sun:     'border-accent-200/60',
};

const PILL_CLASSES: Record<ResumeLessonTone, string> = {
  primary: 'bg-primary-100 text-primary-700',
  warm:    'bg-secondary-100 text-secondary-700',
  sun:     'bg-accent-100 text-accent-700',
};

const TITLE_COLOR: Record<ResumeLessonTone, string> = {
  primary: 'text-primary-900',
  warm:    'text-ink-900',
  sun:     'text-ink-900',
};

const ICON_COLOR: Record<ResumeLessonTone, string> = {
  primary: 'text-primary-500',
  warm:    'text-secondary-500',
  sun:     'text-accent-600',
};

const DIVIDER_COLOR: Record<ResumeLessonTone, string> = {
  primary: 'border-primary-200/50',
  warm:    'border-secondary-200/50',
  sun:     'border-accent-200/40',
};

const STEP_NUM_COLOR: Record<ResumeLessonTone, string> = {
  primary: 'text-primary-700',
  warm:    'text-secondary-700',
  sun:     'text-accent-700',
};

const CTA_CLASSES: Record<ResumeLessonTone, string> = {
  primary: 'bg-primary-600 text-white hover:bg-primary-700 active:bg-primary-800 shadow-brand-sm hover:shadow-brand-md',
  warm:    'bg-secondary-500 text-white hover:bg-secondary-600 active:bg-secondary-700 shadow-warm-sm hover:shadow-warm-md',
  sun:     'bg-accent-500 text-ink-900 hover:bg-accent-600 active:bg-accent-700 shadow-sun-sm',
};

const PROGRESS_FILL: Record<ResumeLessonTone, string> = {
  primary: 'bg-primary-400',
  warm:    'bg-secondary-400',
  sun:     'bg-accent-400',
};

const PROGRESS_TRACK: Record<ResumeLessonTone, string> = {
  primary: 'bg-primary-100',
  warm:    'bg-secondary-100',
  sun:     'bg-accent-100',
};

// ─── Component ───────────────────────────────────────────────────────────────

export const ResumeLessonCard: React.FC<ResumeLessonCardProps> = ({
  id,
  parcoursTitle,
  eyebrow,
  nextLessonTitle,
  progress,
  currentStep,
  totalSteps,
  ctaLabel = 'Reprendre la leçon',
  tone = 'warm',
  level,
  duration,
  onClick,
  className = '',
}) => {
  const clamped = Math.max(0, Math.min(100, progress));

  const hasStep = currentStep !== undefined && totalSteps !== undefined;

  /* Meta pills à gauche de l'eyebrow */
  const metaParts = [level, duration].filter(Boolean);

  return (
    <article
      role="button"
      tabIndex={0}
      aria-label={`Reprendre ${parcoursTitle}`}
      onClick={() => onClick?.(id)}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onClick?.(id);
        }
      }}
      className={[
        'group relative rounded-2xl border overflow-hidden cursor-pointer',
        'transition-[transform,box-shadow] duration-base ease-emphasis',
        'hover:-translate-y-0.5 hover:shadow-card-lift',
        '!h-auto !overflow-visible',
        BG_GRADIENT[tone],
        BORDER_COLOR[tone],
        className,
      ].join(' ')}
    >
      {/* ── Main content ───────────────────────────────────────────────── */}
      <div className="flex flex-col sm:flex-row">

        {/* ── Gauche : contexte + titre + prochaine leçon ─────────────── */}
        <div className="flex-1 min-w-0 px-6 pt-5 pb-5 sm:py-6 sm:px-7 flex flex-col gap-2.5">

          {/* Contexte row : pill "En cours" + meta + eyebrow */}
          <div className="flex items-center gap-2 flex-wrap">
            <span className={[
              'inline-flex items-center gap-1 text-[11px] font-bold tracking-[0.05em] uppercase px-2 py-[3px] rounded-pill shrink-0',
              PILL_CLASSES[tone],
            ].join(' ')}>
              <Play size={8} fill="currentColor" aria-hidden="true" />
              En cours
            </span>

            {/* Étape X sur Y — affiché si eyebrow fourni (contexte de texte) */}
            {eyebrow && (
              <span className="font-body text-caption text-ink-500 font-medium leading-none">
                {eyebrow}
              </span>
            )}

            {/* Meta séparés : niveau · durée */}
            {metaParts.length > 0 && (
              <>
                {(eyebrow || true) && (
                  <span aria-hidden className="w-px h-3 bg-ink-200 shrink-0" />
                )}
                <span className="font-body text-caption text-ink-400 font-medium leading-none">
                  {metaParts.join(' · ')}
                </span>
              </>
            )}
          </div>

          {/* Titre parcours */}
          <h2 className={[
            'font-display font-bold leading-[1.07] tracking-headline m-0 text-balance',
            'text-[1.35rem] sm:text-[1.6rem]',
            TITLE_COLOR[tone],
          ].join(' ')}>
            {parcoursTitle}
          </h2>

          {/* Prochaine leçon */}
          {nextLessonTitle && (
            <p className="flex items-start gap-1.5 font-body text-body-sm text-ink-500 m-0 leading-snug">
              <Target
                size={14}
                strokeWidth={2}
                className={`shrink-0 mt-px ${ICON_COLOR[tone]}`}
                aria-hidden="true"
              />
              <span className="min-w-0">
                <span className="text-ink-400">Prochain objectif · </span>
                <span className="font-medium text-ink-700">{nextLessonTitle}</span>
              </span>
            </p>
          )}
        </div>

        {/* ── Droite : indicateur d'étape + CTA ───────────────────────── */}
        <div className={[
          'flex sm:flex-col items-center justify-between sm:justify-center',
          'px-6 pb-5 pt-0 sm:pt-6 sm:py-6 sm:px-6',
          'sm:border-l sm:border-dashed',
          'gap-4 sm:gap-4 sm:min-w-[148px]',
          DIVIDER_COLOR[tone],
        ].join(' ')}>

          {/* Compteur d'étape — stat primaire (remplace l'ancien %) */}
          {hasStep ? (
            <div className="flex flex-col items-center text-center gap-0.5 shrink-0">
              <span className="font-body text-micro uppercase tracking-[0.08em] text-ink-400 font-semibold leading-none">
                Étape
              </span>
              <div className="flex items-baseline gap-0.5 leading-none mt-0.5">
                <span className={[
                  'font-display font-bold leading-none tabular-nums text-[1.55rem]',
                  STEP_NUM_COLOR[tone],
                ].join(' ')}>
                  {currentStep}
                </span>
                <span className="font-body text-body-sm text-ink-400 font-medium">
                  /{totalSteps}
                </span>
              </div>
            </div>
          ) : eyebrow ? (
            /* Fallback : eyebrow affiché comme stat si pas de step props */
            <div className={[
              'font-display font-semibold text-body leading-tight text-center',
              STEP_NUM_COLOR[tone],
            ].join(' ')}>
              {eyebrow}
            </div>
          ) : null}

          {/* CTA — action principale, sans concurrence */}
          <button
            type="button"
            onClick={(e) => { e.stopPropagation(); onClick?.(id); }}
            aria-label={ctaLabel}
            className={[
              'inline-flex items-center justify-center gap-1.5',
              'h-11 px-4 rounded-pill text-body-sm font-body font-semibold whitespace-nowrap shrink-0',
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

      {/* ── Barre de progression — visuelle uniquement (pas de %) ──────── */}
      <div
        className={['h-[3px] w-full', PROGRESS_TRACK[tone]].join(' ')}
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
