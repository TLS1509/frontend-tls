/**
 * ResumeLessonCard — Pattern dédié dashboard "Reprendre ta leçon".
 *
 * Spécifique à la stage "Ton parcours" du Dashboard learner-centric :
 * surface en grand l'action de reprendre la leçon en cours d'un parcours actif.
 *
 * Diffère de `ParcoursCard` (qui sert dans les grids/catalogues de parcours) :
 *  - Hero-sized (padding p-6/p-8/p-10 selon viewport)
 *  - Layout pleine largeur (pas de min-height fixe, content libre)
 *  - Eyebrow "Étape X sur Y" + titre h1 du parcours
 *  - Description = contexte de la leçon en cours
 *  - Progress bar large + CTA pill arrondi côte-à-côte (desktop) / stacked (mobile)
 *  - Meta pills (niveau, temps restant, nombre de leçons) en haut à droite
 *  - Glass tone-aware (primary/warm/sun) avec radial glow hover
 *
 * Utilisé par : Dashboard.
 */

import React from 'react';
import { ArrowRight, Zap, Clock3, BookOpen } from 'lucide-react';
import { InlineProgress } from './InlineProgress';
import { Card } from '../core/Card';
import { MetaPillGroup } from '../ui/MetaPillGroup';

export type ResumeLessonTone = 'primary' | 'warm' | 'sun';

export interface ResumeLessonCardProps {
  /** ID du parcours (passé au onClick). */
  id: string;
  /** Titre du parcours en cours. */
  parcoursTitle: string;
  /** Eyebrow (ex: "Étape 2 sur 5", "Leçon 3 / Module 2"). */
  eyebrow?: React.ReactNode;
  /** Description / contexte de la leçon en cours (visible sans truncate). */
  description: string;
  /** Progression globale du parcours (0-100). */
  progress: number;
  /** Label CTA personnalisé (default: "Continuer ma leçon"). */
  ctaLabel?: string;
  /** Ton de la card (couleur de l'accent + CTA + glow). */
  tone?: ResumeLessonTone;
  /** Niveau du parcours (Meta pill optionnelle). */
  level?: 'débutant' | 'intermédiaire' | 'avancé';
  /** Durée restante (Meta pill optionnelle). */
  duration?: string;
  /** Nombre de leçons restantes ou totales (Meta pill optionnelle). */
  lessons?: number;
  /** Callback au clic sur la card ou le CTA. */
  onClick?: (id: string) => void;
  className?: string;
}

const TITLE_TONE: Record<ResumeLessonTone, string> = {
  primary: 'text-primary-600',
  warm:    'text-secondary-600',
  sun:     'text-accent-700',
};

const EYEBROW_TONE: Record<ResumeLessonTone, string> = {
  primary: 'text-primary-700',
  warm:    'text-secondary-700',
  sun:     'text-accent-700',
};

const CTA_TONE: Record<ResumeLessonTone, string> = {
  primary: 'bg-primary-500 hover:bg-primary-600 text-white shadow-brand-sm hover:shadow-brand-md',
  warm:    'bg-secondary-500 hover:bg-secondary-600 text-white shadow-warm-sm hover:shadow-warm-md',
  sun:     'bg-accent-400 hover:bg-accent-500 text-accent-900 shadow-sun-sm hover:shadow-sm',
};

const GLOW_BG: Record<ResumeLessonTone, React.CSSProperties> = {
  primary: { background: 'radial-gradient(circle at 50% 0%, rgba(85, 161, 180, 0.10) 0%, transparent 70%)' },
  warm:    { background: 'radial-gradient(circle at 50% 0%, rgba(241, 138, 76, 0.14) 0%, transparent 70%)' },
  sun:     { background: 'radial-gradient(circle at 50% 0%, rgba(248, 176, 68, 0.14) 0%, transparent 70%)' },
};

export const ResumeLessonCard: React.FC<ResumeLessonCardProps> = ({
  id,
  parcoursTitle,
  eyebrow,
  description,
  progress,
  ctaLabel = 'Continuer ma leçon',
  tone = 'warm',
  level,
  duration,
  lessons,
  onClick,
  className = '',
}) => {
  return (
    <Card
      variant="tinted"
      tone={tone === 'sun' ? 'sun' : tone === 'warm' ? 'warm' : 'primary'}
      onClick={() => onClick?.(id)}
      aria-label={`Reprendre ${parcoursTitle}`}
      className={`group relative overflow-hidden cursor-pointer transition-[transform,box-shadow] duration-base ease-emphasis hover:-translate-y-1 hover:shadow-lg !p-0 !rounded-2xl !gap-0 ${className}`}
    >
      {/* Radial glow on hover */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-slow ease-standard"
        style={GLOW_BG[tone]}
      />

      <div className="relative p-6 md:p-8 lg:p-10 flex flex-col gap-5 md:gap-6">
        {/* Top row — eyebrow + meta pills */}
        <div className="flex flex-wrap items-center gap-3 justify-between">
          {eyebrow && (
            <span className={['inline-flex items-center gap-1.5 text-caption font-medium', EYEBROW_TONE[tone]].join(' ')}>
              {eyebrow}
            </span>
          )}
          {(level || duration || lessons) && (
            <MetaPillGroup
              items={[
                ...(level ? [{ icon: <Zap size={13} />, text: level }] : []),
                ...(duration ? [{ icon: <Clock3 size={13} />, text: duration }] : []),
                ...(lessons ? [{ icon: <BookOpen size={13} />, text: `${lessons} leçons` }] : []),
              ]}
              size="sm"
              layout="horizontal"
              gap="sm"
            />
          )}
        </div>

        {/* Parcours title — display, large */}
        <h2 className={['font-display text-h2 md:text-h1 font-bold leading-[1.1] tracking-tight m-0 text-balance', TITLE_TONE[tone]].join(' ')}>
          {parcoursTitle}
        </h2>

        {/* Description */}
        <p className="font-body text-body md:text-body-lg text-ink-700 leading-relaxed m-0 max-w-[64ch]">
          {description}
        </p>

        {/* Progress + CTA row */}
        <div className="flex flex-col md:flex-row md:items-center gap-4 md:gap-6 mt-1">
          <div className="flex-1 min-w-0">
            <InlineProgress value={progress} tone={tone} showLabel={true} size="md" />
          </div>
          <button
            type="button"
            className={[
              'inline-flex items-center justify-center gap-2 h-12 px-6 rounded-pill text-body font-body font-semibold whitespace-nowrap shrink-0 cursor-pointer transition-[background-color,color,transform,box-shadow] duration-fast ease-emphasis',
              'hover:-translate-y-px active:translate-y-0',
              'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-400',
              CTA_TONE[tone],
            ].join(' ')}
            onClick={(e) => {
              e.stopPropagation();
              onClick?.(id);
            }}
            aria-label={ctaLabel}
          >
            <span>{ctaLabel}</span>
            <ArrowRight size={16} aria-hidden="true" />
          </button>
        </div>
      </div>
    </Card>
  );
};

export default ResumeLessonCard;
