import React, { useState } from 'react';
import { ChevronDown, Check, Lock } from 'lucide-react';

export interface StepLesson {
  id: string;
  title: string;
  duration?: string;
  completed?: boolean;
}

export type StepStatus = 'not-started' | 'in-progress' | 'completed' | 'locked';

export interface StepCardProps extends React.HTMLAttributes<HTMLDivElement> {
  stepNumber: number;
  title: string;
  description?: string;
  lessonCount?: number;
  lessonsGrid?: StepLesson[];
  progress?: number;
  status?: StepStatus;
  isExpanded?: boolean;
  onToggleExpand?: () => void;
}

const STATUS_BADGE: Record<StepStatus, string> = {
  'not-started': 'bg-ink-200 text-ink-700',
  'in-progress': 'bg-primary-500 text-white shadow-brand-sm',
  completed:     'bg-success-base text-white shadow-md',
  locked:        'bg-ink-100 text-ink-400',
};

const STATUS_BORDER: Record<StepStatus, string> = {
  'not-started': 'border-ink-200',
  'in-progress': 'border-primary-300',
  completed:     'border-success-base/30',
  locked:        'border-ink-200 opacity-60',
};

const STATUS_FILL: Record<StepStatus, string> = {
  'not-started': 'bg-ink-300',
  'in-progress': 'bg-primary-500',
  completed:     'bg-success-base',
  locked:        'bg-ink-200',
};

export const StepCard: React.FC<StepCardProps> = ({
  stepNumber,
  title,
  description,
  lessonCount,
  lessonsGrid,
  progress,
  status = 'not-started',
  isExpanded: controlledExpanded,
  onToggleExpand,
  className = '',
  ...rest
}) => {
  const [internalExpanded, setInternalExpanded] = useState(false);
  const isExpanded = controlledExpanded !== undefined ? controlledExpanded : internalExpanded;

  const handleToggleExpand = () => {
    if (onToggleExpand) {
      onToggleExpand();
    } else {
      setInternalExpanded(!internalExpanded);
    }
  };

  const classes = [
    'relative bg-white border-2 rounded-xl p-5 flex flex-col gap-3 transition-all',
    STATUS_BORDER[status],
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={classes} {...rest}>
      <header className="flex items-start gap-4">
        <div
          className={[
            'inline-flex items-center justify-center w-12 h-12 rounded-xl shrink-0 font-display font-bold text-h4',
            STATUS_BADGE[status],
          ].join(' ')}
        >
          {stepNumber}
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="m-0 text-h4 font-semibold text-ink-900 leading-snug">{title}</h3>
          {lessonCount && (
            <span className="text-caption text-ink-500">{lessonCount} lessons</span>
          )}
        </div>
      </header>

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

      {lessonsGrid && lessonsGrid.length > 0 && (
        <>
          <button
            type="button"
            className="inline-flex items-center justify-between w-full px-3 py-2 text-body-sm font-medium text-ink-700 bg-ink-50 hover:bg-ink-100 rounded-md cursor-pointer transition-colors"
            onClick={handleToggleExpand}
            aria-expanded={isExpanded}
          >
            <span>{isExpanded ? 'Hide' : 'Show'} Lessons</span>
            <ChevronDown
              size={16}
              className={['transition-transform', isExpanded ? 'rotate-180' : ''].join(' ')}
            />
          </button>

          {isExpanded && (
            <div className="flex flex-col gap-2">
              {lessonsGrid.map((lesson) => (
                <div
                  key={lesson.id}
                  className={[
                    'flex items-center justify-between gap-3 px-3 py-2 rounded-md border',
                    lesson.completed
                      ? 'bg-success-bg border-success-base/20 text-success-fg'
                      : 'bg-ink-50 border-ink-200 text-ink-900',
                  ].join(' ')}
                >
                  <div className="text-body-sm font-medium flex-1 min-w-0 truncate">
                    {lesson.title}
                  </div>
                  {lesson.duration && (
                    <span className="text-caption text-ink-500 shrink-0">{lesson.duration}</span>
                  )}
                  {lesson.completed && (
                    <Check size={16} strokeWidth={2.5} className="text-success-base shrink-0" />
                  )}
                </div>
              ))}
            </div>
          )}
        </>
      )}

      {status === 'locked' && (
        <div className="absolute inset-0 flex items-center justify-center rounded-xl bg-white/80 backdrop-blur-sm">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-pill bg-ink-100 text-ink-700 font-semibold">
            <Lock size={16} /> Locked
          </div>
        </div>
      )}
    </div>
  );
};

export default StepCard;
