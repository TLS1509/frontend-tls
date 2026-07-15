/**
 * ResumeLessonCard — Dashboard/home dominant action "Reprendre la leçon".
 *
 * Refonte 2026-07 (card-system) :
 *  - Surface : blanc solide + shadow-card (direction app validée — pas de gradient teinté)
 *  - Accent tone (warm/primary/sun) vit UNIQUEMENT dans : bulle icône · bordure · CTA · barre de progression
 *  - Grammaire meta unifiée (4 rôles) :
 *      · Status badge  → "En cours" (seule chip colorée, = l'état)
 *      · Meta pills    → durée · niveau (NEUTRES — ce sont des faits)
 *      · Eyebrow/step  → "Étape X sur Y" (contexte, texte discret)
 *      · Titre         → héros
 *  - Mobile-first : stack vertical, CTA full-width ; desktop : footer progress + CTA.
 */

import React from 'react';
import { ArrowRight, Play, Target } from 'lucide-react';
import { MetaPillGroup, type MetaPillItem } from '../ui/MetaPillGroup';

export type ResumeLessonTone = 'primary' | 'warm' | 'sun';

export interface ResumeLessonCardProps {
  id: string;
  parcoursTitle: string;
  /** Contexte d'étape affiché en ligne de tête (ex: "Étape 2 sur 5"). */
  eyebrow?: React.ReactNode;
  /** @deprecated non rendu */
  description?: string;
  nextLessonTitle?: string;
  progress: number;
  /** Étape actuelle — alimente le compteur "Étape X sur Y". */
  currentStep?: number;
  /** Nombre total d'étapes. */
  totalSteps?: number;
  ctaLabel?: string;
  tone?: ResumeLessonTone;
  level?: string;
  duration?: string;
  onClick?: (id: string) => void;
  className?: string;
}

// ─── Tone maps (accent only : bulle · bordure · CTA · progress) ───────────────

const CARD_BORDER: Record<ResumeLessonTone, string> = {
  primary: 'border-primary-200/70 hover:border-primary-300',
  warm:    'border-secondary-200/70 hover:border-secondary-300',
  sun:     'border-accent-200/70 hover:border-accent-300',
};

const ICON_BUBBLE: Record<ResumeLessonTone, string> = {
  primary: 'bg-gradient-to-br from-primary-400 to-primary-600 text-white shadow-brand-sm',
  warm:    'bg-gradient-to-br from-secondary-400 to-secondary-500 text-white shadow-warm-sm',
  sun:     'bg-gradient-to-br from-accent-300 to-accent-500 text-accent-900 shadow-sun-sm',
};

/** Status chip "En cours" — echoes accent (c'est l'état de la card). */
const STATUS_CHIP: Record<ResumeLessonTone, string> = {
  primary: 'bg-primary-100 text-primary-700',
  warm:    'bg-secondary-100 text-secondary-700',
  sun:     'bg-accent-100 text-accent-800',
};

const CTA_CLASSES: Record<ResumeLessonTone, string> = {
  primary: 'bg-primary-600 text-white hover:bg-primary-700 active:bg-primary-800 shadow-brand-sm hover:shadow-brand-md',
  warm:    'bg-secondary-500 text-white hover:bg-secondary-600 active:bg-secondary-700 shadow-warm-sm hover:shadow-warm-md',
  sun:     'bg-accent-400 text-accent-900 hover:bg-accent-500 active:bg-accent-600 shadow-sun-sm',
};

const PROGRESS_FILL: Record<ResumeLessonTone, string> = {
  primary: 'bg-primary-500',
  warm:    'bg-secondary-500',
  sun:     'bg-accent-400',
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
  ctaLabel = 'Reprendre',
  tone = 'warm',
  level,
  duration,
  onClick,
  className = '',
}) => {
  const clamped = Math.max(0, Math.min(100, progress));
  const hasStep = currentStep !== undefined && totalSteps !== undefined;
  const stepText = hasStep ? `Étape ${currentStep} sur ${totalSteps}` : eyebrow;

  /* Meta pills = faits, NEUTRES. */
  const metaItems: MetaPillItem[] = [
    duration ? { text: duration } : null,
    level ? { text: level.charAt(0).toUpperCase() + level.slice(1) } : null,
  ].filter(Boolean) as MetaPillItem[];

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
        'group relative flex flex-col gap-5 rounded-2xl border bg-white p-5 sm:p-6 cursor-pointer',
        'shadow-card transition-[transform,box-shadow,border-color] duration-base ease-emphasis',
        'hover:-translate-y-0.5 hover:shadow-card-lift',
        'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500',
        CARD_BORDER[tone],
        className,
      ].join(' ')}
    >
      {/* ── Corps : bulle icône + contenu ───────────────────────────────── */}
      <div className="flex items-start gap-4">
        <span
          className={[
            'shrink-0 grid place-items-center rounded-2xl',
            'w-12 h-12 sm:w-14 sm:h-14',
            ICON_BUBBLE[tone],
          ].join(' ')}
          aria-hidden
        >
          <Play size={20} fill="currentColor" strokeWidth={0} className="translate-x-px" />
        </span>

        <div className="flex-1 min-w-0 flex flex-col gap-2">
          {/* Rôle 1 — status badge (coloré) + step context (texte discret) */}
          <div className="flex items-center gap-2 flex-wrap">
            <span
              className={[
                'inline-flex items-center gap-1 rounded-pill px-2 py-[3px] shrink-0',
                'text-micro font-bold uppercase tracking-[0.05em]',
                STATUS_CHIP[tone],
              ].join(' ')}
            >
              <span className="w-1.5 h-1.5 rounded-pill bg-current animate-pulse" aria-hidden />
              En cours
            </span>
            {stepText && (
              <span className="font-body text-caption text-ink-500 font-medium leading-none">
                {stepText}
              </span>
            )}
          </div>

          {/* Rôle 2 — titre héros */}
          <h2 className="font-display font-bold leading-[1.1] tracking-headline m-0 text-ink-900 text-[1.3rem] sm:text-[1.55rem] text-balance">
            {parcoursTitle}
          </h2>

          {/* Prochaine leçon */}
          {nextLessonTitle && (
            <p className="flex items-start gap-1.5 font-body text-body-sm text-ink-500 m-0 leading-snug">
              <Target size={14} strokeWidth={2} className="shrink-0 mt-0.5 text-ink-400" aria-hidden />
              <span className="min-w-0">
                <span className="text-ink-400">Prochaine leçon · </span>
                <span className="font-medium text-ink-700">{nextLessonTitle}</span>
              </span>
            </p>
          )}

          {/* Rôle 3 — meta pills NEUTRES (faits) */}
          {metaItems.length > 0 && (
            <MetaPillGroup items={metaItems} size="sm" className="mt-0.5" />
          )}
        </div>
      </div>

      {/* ── Footer : progression + CTA (mobile stack → desktop row) ──────── */}
      <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-5">
        <div className="flex-1 flex flex-col gap-1.5">
          <div className="flex items-center justify-between gap-2">
            <span className="text-micro font-semibold uppercase tracking-[0.06em] text-ink-400">
              Progression
            </span>
            <span className="text-caption font-bold text-ink-600 tabular-nums">{clamped}%</span>
          </div>
          <div
            className="h-1.5 w-full rounded-pill bg-ink-100 overflow-hidden"
            role="progressbar"
            aria-valuenow={clamped}
            aria-valuemin={0}
            aria-valuemax={100}
            aria-label={`Progression : ${clamped}%`}
          >
            <div
              className={['h-full rounded-pill transition-[width] duration-700 ease-out', PROGRESS_FILL[tone]].join(' ')}
              style={{ width: `${clamped}%` }}
            />
          </div>
        </div>

        <button
          type="button"
          onClick={(e) => { e.stopPropagation(); onClick?.(id); }}
          aria-label={ctaLabel}
          className={[
            'inline-flex items-center justify-center gap-1.5 shrink-0',
            'h-11 px-5 rounded-pill text-body-sm font-body font-semibold whitespace-nowrap',
            'w-full sm:w-auto',
            'transition-[background-color,transform,box-shadow] duration-fast ease-emphasis',
            'hover:-translate-y-px active:translate-y-0',
            'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-400',
            CTA_CLASSES[tone],
            '[&>svg]:transition-transform group-hover:[&>svg]:translate-x-0.5',
          ].join(' ')}
        >
          {ctaLabel}
          <ArrowRight size={16} aria-hidden />
        </button>
      </div>
    </article>
  );
};

export default ResumeLessonCard;
