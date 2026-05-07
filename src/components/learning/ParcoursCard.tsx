import React from 'react';
import { Check, Lock } from 'lucide-react';

export type ParcoursStatus = 'not-started' | 'in-progress' | 'completed';

export interface ParcoursCardProps {
  title: string;
  description?: string;
  progress?: number;
  lessonCount?: number;
  status?: ParcoursStatus;
  className?: string;
}

const STATUS_BORDER: Record<ParcoursStatus, string> = {
  'not-started': 'border-ink-200',
  'in-progress': 'border-primary-300',
  completed:     'border-success-base/40',
};

const STATUS_FILL: Record<ParcoursStatus, string> = {
  'not-started': 'bg-ink-300',
  'in-progress': 'bg-gradient-to-r from-primary-500 to-primary-700',
  completed:     'bg-gradient-to-r from-success-base to-success-fg',
};

const STATUS_DOT: Record<ParcoursStatus, string> = {
  'not-started': 'bg-ink-300',
  'in-progress': 'bg-primary-500 shadow-brand-xs animate-pulse',
  completed:     'bg-success-base',
};

const STATUS_LABEL: Record<ParcoursStatus, { text: string; className: string }> = {
  'not-started': { text: 'À commencer', className: 'text-ink-500 bg-ink-50' },
  'in-progress': { text: 'En cours', className: 'text-primary-700 bg-primary-50' },
  completed:     { text: 'Terminé', className: 'text-success-fg bg-success-bg' },
};

export const ParcoursCard: React.FC<ParcoursCardProps> = ({
  title,
  description,
  progress = 0,
  lessonCount,
  status = 'not-started',
  className = '',
}) => {
  const label = STATUS_LABEL[status];

  return (
    <div
      className={[
        'group flex flex-col gap-3 bg-white border-2 rounded-2xl p-5 transition-all hover:-translate-y-0.5 hover:shadow-md',
        STATUS_BORDER[status],
        className,
      ]
        .filter(Boolean)
        .join(' ')}
    >
      <div className="flex items-center justify-between gap-2">
        <span
          className={[
            'inline-flex items-center gap-1.5 px-2.5 py-1 rounded-pill text-micro font-bold uppercase tracking-wider',
            label.className,
          ].join(' ')}
        >
          <span className={['w-1.5 h-1.5 rounded-full', STATUS_DOT[status]].join(' ')} />
          {label.text}
        </span>
        {status === 'completed' && (
          <Check size={16} strokeWidth={3} className="text-success-base" />
        )}
      </div>

      <h3 className="m-0 text-h4 font-display font-semibold text-ink-900 leading-snug">{title}</h3>

      {description && (
        <p className="m-0 text-body-sm text-ink-500 leading-relaxed line-clamp-2">{description}</p>
      )}

      {progress !== undefined && (
        <div className="flex items-center gap-3">
          <div className="flex-1 h-1.5 bg-ink-100 rounded-pill overflow-hidden shadow-inner">
            <div
              className={['h-full rounded-pill transition-[width] duration-500 ease-out', STATUS_FILL[status]].join(
                ' ',
              )}
              style={{ width: `${progress}%` }}
            />
          </div>
          <span className="text-caption font-bold text-ink-900 min-w-9 text-right">
            {progress}%
          </span>
        </div>
      )}

      {lessonCount !== undefined && (
        <p className="m-0 text-caption text-ink-500 inline-flex items-center gap-1">
          <span aria-hidden="true">📚</span>
          {lessonCount} leçons
        </p>
      )}
    </div>
  );
};

export default ParcoursCard;
