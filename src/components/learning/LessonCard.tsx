import React from 'react';
import { Clock, Lock } from 'lucide-react';
import { ProgressBar } from '../ui/ProgressBar';
import { Badge } from '../ui/Badge';
import type { BadgeVariant } from '../ui/Badge';

export type LessonDifficulty = 'beginner' | 'intermediate' | 'advanced';
export type LessonTone = 'primary' | 'warm' | 'sun';

export interface LessonCardProps {
  title: string;
  description: string;
  progress: number;
  duration: string;
  difficulty: LessonDifficulty;
  instructor?: string;
  tone?: LessonTone;
  locked?: boolean;
  onClick?: () => void;
  className?: string;
}

const DIFFICULTY_LABELS: Record<LessonDifficulty, string> = {
  beginner: 'Beginner',
  intermediate: 'Intermediate',
  advanced: 'Advanced',
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

export const LessonCard: React.FC<LessonCardProps> = ({
  title,
  description,
  progress,
  duration,
  difficulty,
  instructor,
  tone = 'primary',
  locked = false,
  onClick,
  className = '',
}) => {
  return (
    <div
      className={[
        'relative bg-white border border-ink-200 border-l-4 rounded-xl p-5 transition-all',
        TONE_BORDER[tone],
        locked
          ? 'cursor-not-allowed'
          : 'cursor-pointer hover:-translate-y-0.5 hover:shadow-md focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500',
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
      aria-label={`${title}${locked ? ' (locked)' : ''}`}
    >
      {locked && (
        <div className="absolute inset-0 z-10 flex items-center justify-center rounded-xl bg-white/80 backdrop-blur-sm">
          <div className="w-12 h-12 rounded-full bg-ink-100 text-ink-500 flex items-center justify-center">
            <Lock size={24} aria-label="Locked" />
          </div>
        </div>
      )}

      <div className={['flex flex-col gap-3', locked ? 'opacity-50' : ''].filter(Boolean).join(' ')}>
        <div className="flex items-start justify-between gap-3">
          <h3 className="m-0 text-h4 font-semibold text-ink-900 leading-snug">{title}</h3>
          <Badge variant={DIFFICULTY_VARIANTS[difficulty]}>{DIFFICULTY_LABELS[difficulty]}</Badge>
        </div>

        <p className="m-0 text-body-sm text-ink-500 leading-relaxed">{description}</p>

        <div className="flex flex-wrap gap-3 text-caption text-ink-500">
          <div className="inline-flex items-center gap-1">
            <Clock size={14} aria-hidden="true" />
            <span>{duration}</span>
          </div>
          {instructor && (
            <div className="inline-flex items-center gap-1">
              <span>{instructor}</span>
            </div>
          )}
        </div>

        <div className="mt-1">
          <ProgressBar value={progress} size="sm" showLabel={true} />
        </div>
      </div>
    </div>
  );
};

export default LessonCard;
