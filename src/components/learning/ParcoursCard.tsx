import React from 'react';

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
  'in-progress': 'bg-primary-500',
  completed:     'bg-success-base',
};

export const ParcoursCard: React.FC<ParcoursCardProps> = ({
  title,
  description,
  progress = 0,
  lessonCount,
  status = 'not-started',
  className = '',
}) => {
  return (
    <div
      className={[
        'flex flex-col gap-3 bg-white border-2 rounded-xl p-5 transition-all',
        STATUS_BORDER[status],
        className,
      ]
        .filter(Boolean)
        .join(' ')}
    >
      <h3 className="m-0 text-h4 font-semibold text-ink-900 leading-snug">{title}</h3>
      {description && (
        <p className="m-0 text-body-sm text-ink-500 leading-relaxed">{description}</p>
      )}
      {progress !== undefined && (
        <div className="flex items-center gap-3">
          <div className="flex-1 h-1.5 bg-ink-100 rounded-pill overflow-hidden">
            <div
              className={['h-full rounded-pill transition-[width] duration-300', STATUS_FILL[status]].join(' ')}
              style={{ width: `${progress}%` }}
            />
          </div>
          <span className="text-caption font-semibold text-ink-900 min-w-9 text-right">
            {progress}%
          </span>
        </div>
      )}
      {lessonCount && <p className="m-0 text-caption text-ink-500">{lessonCount} lessons</p>}
    </div>
  );
};

export default ParcoursCard;
