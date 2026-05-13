import React from 'react';
import { Clock, Lock, ArrowRight } from 'lucide-react';
import { ProgressBar } from '../ui/ProgressBar';
import { Badge } from '../ui/Badge';
import type { BadgeVariant } from '../ui/Badge';

export type LessonDifficulty = 'beginner' | 'intermediate' | 'advanced';
export type LessonTone = 'primary' | 'warm' | 'sun';
export type LessonCardSurface = 'card' | 'tinted' | 'glass' | 'frosted';

export interface LessonCardProps {
  title: string;
  description: string;
  progress: number;
  duration: string;
  difficulty: LessonDifficulty;
  instructor?: string;
  tone?: LessonTone;
  /** Surface treatment — card (default solid), tinted (subtle bg), glass, frosted. */
  surface?: LessonCardSurface;
  locked?: boolean;
  onClick?: () => void;
  className?: string;
}

const DIFFICULTY_LABELS: Record<LessonDifficulty, string> = {
  beginner: 'Débutant',
  intermediate: 'Intermédiaire',
  advanced: 'Avancé',
};

const DIFFICULTY_VARIANTS: Record<LessonDifficulty, BadgeVariant> = {
  beginner: 'success',
  intermediate: 'info',
  advanced: 'warm',
};

const TONE_BORDER: Record<LessonTone, string> = {
  primary: 'border-l-primary-500',
  warm:    'border-l-secondary-500',
  sun:     'border-l-accent-500',
};

const TONE_HOVER_GLOW: Record<LessonTone, string> = {
  primary: 'hover:shadow-[0_8px_24px_rgba(85,161,180,0.15)]',
  warm:    'hover:shadow-[0_8px_24px_rgba(237,132,58,0.18)]',
  sun:     'hover:shadow-[0_8px_24px_rgba(248,176,68,0.20)]',
};

const SURFACE_TONE: Record<LessonCardSurface, Record<LessonTone, string>> = {
  card: {
    primary: 'bg-white border border-ink-200',
    warm:    'bg-white border border-ink-200',
    sun:     'bg-white border border-ink-200',
  },
  tinted: {
    primary: 'bg-primary-50/40 border border-primary-100',
    warm:    'bg-secondary-50/40 border border-secondary-100',
    sun:     'bg-accent-50/50 border border-accent-100',
  },
  glass: {
    primary: 'bg-white/70 backdrop-blur-glass-light border border-white/60 shadow-sm',
    warm:    'bg-white/70 backdrop-blur-glass-light border border-white/60 shadow-sm',
    sun:     'bg-white/70 backdrop-blur-glass-light border border-white/60 shadow-sm',
  },
  frosted: {
    primary: 'bg-primary-50/65 backdrop-blur-glass-medium border border-primary-200/50 shadow-md',
    warm:    'bg-secondary-50/65 backdrop-blur-glass-medium border border-secondary-200/50 shadow-md',
    sun:     'bg-accent-50/70 backdrop-blur-glass-medium border border-accent-200/50 shadow-md',
  },
};

export const LessonCard: React.FC<LessonCardProps> = ({
  title,
  description,
  progress,
  duration,
  difficulty,
  instructor,
  tone = 'primary',
  surface = 'card',
  locked = false,
  onClick,
  className = '',
}) => {
  return (
    <div
      className={[
        'group relative border-l-4 rounded-2xl p-5 transition-all duration-300',
        SURFACE_TONE[surface][tone],
        TONE_BORDER[tone],
        locked
          ? 'cursor-not-allowed'
          : `cursor-pointer hover:-translate-y-1 ${TONE_HOVER_GLOW[tone]} focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500`,
        className,
      ]
        .filter(Boolean)
        .join(' ')}
      onClick={!locked ? onClick : undefined}
      role="button"
      tabIndex={locked ? -1 : 0}
      onKeyDown={
        !locked
          ? (e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                onClick?.();
              }
            }
          : undefined
      }
      aria-label={`${title}${locked ? ' (verrouillé)' : ''}`}
    >
      {locked && (
        <div className="absolute inset-0 z-10 flex items-center justify-center rounded-2xl bg-white/85 backdrop-blur-sm">
          <div className="flex flex-col items-center gap-2">
            <div className="w-14 h-14 rounded-full bg-ink-100 text-ink-500 flex items-center justify-center shadow-inner">
              <Lock size={26} />
            </div>
            <span className="text-caption font-semibold text-ink-500">Verrouillée</span>
          </div>
        </div>
      )}

      <div className={['flex flex-col gap-3', locked ? 'opacity-50' : ''].filter(Boolean).join(' ')}>
        <div className="flex items-start justify-between gap-3">
          <h3 className="m-0 text-h4 font-display font-semibold text-ink-900 leading-snug line-clamp-2 flex-1">
            {title}
          </h3>
          <Badge variant={DIFFICULTY_VARIANTS[difficulty]}>{DIFFICULTY_LABELS[difficulty]}</Badge>
        </div>

        <p className="m-0 text-body-sm text-ink-500 leading-relaxed line-clamp-2">{description}</p>

        <div className="flex flex-wrap items-center gap-3 text-caption text-ink-500">
          <div className="inline-flex items-center gap-1.5">
            <Clock size={14} aria-hidden="true" className="text-ink-400" />
            <span>{duration}</span>
          </div>
          {instructor && (
            <>
              <span className="w-1 h-1 rounded-full bg-ink-300" aria-hidden="true" />
              <span>{instructor}</span>
            </>
          )}
        </div>

        <div className="mt-1">
          <ProgressBar value={progress} size="sm" showLabel={true} />
        </div>

        {!locked && (
          <div className="flex items-center justify-between pt-2 border-t border-ink-100">
            <span className="text-caption font-semibold text-ink-500">
              {progress === 0 ? 'Commencer' : progress >= 100 ? 'Revoir' : 'Continuer'}
            </span>
            <ArrowRight size={16} className="text-ink-400 group-hover:text-primary-600 group-hover:translate-x-1 transition-all" />
          </div>
        )}
      </div>
    </div>
  );
};

export default LessonCard;
