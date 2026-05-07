import React from 'react';
import { BookOpen, Clock, Check } from 'lucide-react';

export type ParcoursTone = 'brand' | 'warm' | 'sun';
export type ParcoursStatus = 'not-started' | 'in-progress' | 'completed';

interface ParcoursCardProps {
  title: string;
  description?: string;
  instructor?: string;
  progress?: number;
  lessonCount?: number;
  duration?: string;
  status?: ParcoursStatus;
  tone?: ParcoursTone;
  ctaLabel?: string;
  onCta?: () => void;
  className?: string;
}

const TONE_THUMB: Record<ParcoursTone, string> = {
  brand: 'bg-gradient-to-br from-primary-400 to-primary-700',
  warm:  'bg-gradient-to-br from-secondary-400 to-secondary-700',
  sun:   'bg-gradient-to-br from-accent-300 to-accent-600',
};

const TONE_FILL: Record<ParcoursTone, string> = {
  brand: 'bg-primary-500',
  warm:  'bg-secondary-500',
  sun:   'bg-accent-400',
};

const TONE_CTA: Record<ParcoursTone, string> = {
  brand: 'bg-primary-500 text-white hover:bg-primary-600',
  warm:  'bg-secondary-500 text-white hover:bg-secondary-600',
  sun:   'bg-accent-400 text-accent-900 hover:bg-accent-500',
};

const STATUS_BORDER: Record<ParcoursStatus, string> = {
  'not-started': 'border-ink-200',
  'in-progress': 'border-primary-400',
  'completed':   'border-success-base',
};

export const ParcoursCard: React.FC<ParcoursCardProps> = ({
  title,
  description,
  instructor,
  progress = 0,
  lessonCount,
  duration,
  status = 'not-started',
  tone = 'brand',
  ctaLabel,
  onCta,
  className = '',
}) => {
  const classes = [
    'bg-white border rounded-xl overflow-hidden flex flex-col cursor-pointer transition-all',
    'hover:-translate-y-1 hover:shadow-lg hover:border-ink-300',
    STATUS_BORDER[status],
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={classes}>
      <div
        className={[
          'relative h-[120px] flex items-center justify-center overflow-hidden',
          TONE_THUMB[tone],
          'after:content-[""] after:absolute after:inset-0 after:bg-white/5',
        ].join(' ')}
        aria-hidden="true"
      >
        <BookOpen
          size={40}
          strokeWidth={1.75}
          className="relative z-[1] text-white drop-shadow-md"
        />
        {status === 'completed' && (
          <span className="absolute top-3 right-3 z-[2] w-6 h-6 rounded-full bg-success-base text-white inline-flex items-center justify-center">
            <Check size={14} strokeWidth={3} />
          </span>
        )}
      </div>

      <div className="p-5 flex flex-col gap-3 flex-1">
        <h3 className="m-0 text-h4 font-display font-semibold leading-tight text-ink-900">
          {title}
        </h3>

        {instructor && <p className="m-0 text-caption text-ink-500">{instructor}</p>}

        {description && (
          <p className="m-0 text-body-sm leading-relaxed text-ink-500">{description}</p>
        )}

        {(lessonCount !== undefined || duration) && (
          <div className="flex flex-wrap gap-2">
            {lessonCount !== undefined && (
              <span className="inline-flex items-center gap-1 text-caption font-medium text-ink-500 bg-ink-50 border border-ink-200 rounded-pill px-3 py-0.5">
                <BookOpen size={12} strokeWidth={2} /> {lessonCount} leçons
              </span>
            )}
            {duration && (
              <span className="inline-flex items-center gap-1 text-caption font-medium text-ink-500 bg-ink-50 border border-ink-200 rounded-pill px-3 py-0.5">
                <Clock size={12} strokeWidth={2} /> {duration}
              </span>
            )}
          </div>
        )}

        {progress !== undefined && (
          <div className="flex items-center gap-3">
            <div className="flex-1 h-1.5 bg-ink-200 rounded-pill overflow-hidden">
              <div
                className={`h-full rounded-pill transition-[width] duration-300 ${TONE_FILL[tone]}`}
                style={{ width: `${progress}%` }}
              />
            </div>
            <span className="text-caption font-semibold text-ink-900 min-w-9 text-right">
              {progress}%
            </span>
          </div>
        )}

        {ctaLabel && (
          <button
            type="button"
            onClick={onCta}
            className={[
              'w-full px-4 py-3 rounded-md text-body-sm font-semibold cursor-pointer transition-all mt-1',
              'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500',
              TONE_CTA[tone],
            ].join(' ')}
          >
            {ctaLabel}
          </button>
        )}
      </div>
    </div>
  );
};

export default ParcoursCard;
