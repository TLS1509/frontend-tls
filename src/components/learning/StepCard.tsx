import React, { useState } from 'react';
import { ChevronDown, Check, Lock, Clock } from 'lucide-react';

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
  'not-started': 'bg-ink-100 text-ink-600 ring-2 ring-ink-200',
  'in-progress': 'bg-gradient-to-br from-primary-500 to-primary-700 text-white shadow-brand-sm ring-4 ring-primary-100',
  completed:     'bg-gradient-to-br from-success-base to-success-fg text-white shadow-md ring-4 ring-success-bg',
  locked:        'bg-ink-50 text-ink-400 ring-2 ring-ink-200',
};

const STATUS_BORDER: Record<StepStatus, string> = {
  'not-started': 'border-ink-200',
  'in-progress': 'border-primary-300',
  completed:     'border-success-base/40',
  locked:        'border-ink-200',
};

const STATUS_FILL: Record<StepStatus, string> = {
  'not-started': 'bg-ink-300',
  'in-progress': 'bg-gradient-to-r from-primary-500 to-primary-700',
  completed:     'bg-gradient-to-r from-success-base to-success-fg',
  locked:        'bg-ink-200',
};

const STATUS_LABEL: Record<StepStatus, { text: string; className: string }> = {
  'not-started': { text: 'À commencer', className: 'bg-ink-100 text-ink-700' },
  'in-progress': { text: 'En cours', className: 'bg-primary-50 text-primary-700' },
  completed:     { text: 'Terminée', className: 'bg-success-bg text-success-fg' },
  locked:        { text: 'Verrouillée', className: 'bg-ink-50 text-ink-500' },
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

  const isLocked = status === 'locked';
  const label = STATUS_LABEL[status];

  const classes = [
    'relative bg-white border-2 rounded-2xl p-6 flex flex-col gap-4 transition-all',
    !isLocked && 'hover:-translate-y-0.5 hover:shadow-md',
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
            'inline-flex items-center justify-center w-14 h-14 rounded-2xl shrink-0 font-display font-extrabold text-h3',
            STATUS_BADGE[status],
          ].join(' ')}
        >
          {status === 'completed' ? (
            <Check size={26} strokeWidth={3} />
          ) : isLocked ? (
            <Lock size={22} />
          ) : (
            stepNumber
          )}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <span
              className={[
                'inline-flex items-center px-2 py-0.5 rounded-pill text-micro font-bold uppercase tracking-wider',
                label.className,
              ].join(' ')}
            >
              {label.text}
            </span>
          </div>
          <h3 className="m-0 text-h4 font-display font-bold text-ink-900 leading-snug">{title}</h3>
          {lessonCount !== undefined && (
            <span className="inline-flex items-center gap-1 text-caption text-ink-500 mt-1">
              <Clock size={12} className="text-ink-400" />
              {lessonCount} leçons
            </span>
          )}
        </div>
      </header>

      {description && (
        <p className="m-0 text-body-sm text-ink-500 leading-relaxed">{description}</p>
      )}

      {progress !== undefined && (
        <div className="flex items-center gap-3">
          <div className="flex-1 h-1.5 bg-ink-100 rounded-pill overflow-hidden shadow-inner">
            <div
              className={['h-full rounded-pill transition-[width] duration-500 ease-out', STATUS_FILL[status]].join(' ')}
              style={{ width: `${progress}%` }}
            />
          </div>
          <span className="text-caption font-bold text-ink-900 min-w-9 text-right">
            {progress}%
          </span>
        </div>
      )}

      {lessonsGrid && lessonsGrid.length > 0 && (
        <>
          <button
            type="button"
            className="inline-flex items-center justify-between w-full px-4 py-2.5 text-body-sm font-semibold text-ink-700 bg-ink-50 hover:bg-ink-100 rounded-xl cursor-pointer transition-colors border border-ink-100"
            onClick={handleToggleExpand}
            aria-expanded={isExpanded}
          >
            <span>{isExpanded ? 'Masquer les leçons' : 'Voir les leçons'}</span>
            <ChevronDown
              size={16}
              className={['transition-transform duration-200', isExpanded ? 'rotate-180' : ''].join(' ')}
            />
          </button>

          {isExpanded && (
            <div className="flex flex-col gap-2 animate-[dd-slide-up_0.2s_ease-out]">
              {lessonsGrid.map((lesson) => (
                <div
                  key={lesson.id}
                  className={[
                    'flex items-center justify-between gap-3 px-4 py-3 rounded-xl border transition-colors',
                    lesson.completed
                      ? 'bg-success-bg/60 border-success-base/20 text-success-fg hover:bg-success-bg'
                      : 'bg-white border-ink-200 text-ink-900 hover:bg-ink-50 hover:border-ink-300',
                  ].join(' ')}
                >
                  <div className="flex items-center gap-2.5 flex-1 min-w-0">
                    <span
                      className={[
                        'inline-flex items-center justify-center w-6 h-6 rounded-full shrink-0',
                        lesson.completed ? 'bg-success-base text-white' : 'bg-ink-100 text-ink-500',
                      ].join(' ')}
                    >
                      {lesson.completed ? <Check size={14} strokeWidth={3} /> : '·'}
                    </span>
                    <div className="text-body-sm font-medium truncate">{lesson.title}</div>
                  </div>
                  {lesson.duration && (
                    <span className="text-caption text-ink-500 shrink-0 inline-flex items-center gap-1">
                      <Clock size={11} />
                      {lesson.duration}
                    </span>
                  )}
                </div>
              ))}
            </div>
          )}
        </>
      )}

      {isLocked && (
        <div className="absolute inset-0 flex items-center justify-center rounded-2xl bg-white/80 backdrop-blur-sm pointer-events-none">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-pill bg-ink-100 text-ink-700 font-semibold border border-ink-200">
            <Lock size={16} /> Étape verrouillée
          </div>
        </div>
      )}
    </div>
  );
};

export default StepCard;
