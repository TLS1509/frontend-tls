import React, { useState } from 'react';
import { ChevronDown, Check, Lock, Clock } from 'lucide-react';
import { Badge, type BadgeVariant } from '../ui/Badge';

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
  // Numéro d'étape en text-h3 (20 px, 700) = grand texte, 3:1 : arrêt clair au
  // 600 (3,66). Parti du 500, il mesurait 2,94.
  'in-progress': 'bg-gradient-to-br from-primary-600 to-primary-700 text-white shadow-brand-sm ring-4 ring-primary-100',
  completed:     'bg-gradient-to-br from-success-base to-success-fg text-white shadow-success-sm ring-4 ring-success-bg',
  locked:        'bg-ink-50 text-ink-400 ring-2 ring-ink-200',
};

const STATUS_HOVER_SHADOW: Record<StepStatus, string> = {
  'not-started': '',
  'in-progress': '',
  completed:     '',
  locked:        '',
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

/* L'état de l'étape : le vrai Badge (passe typographique du 2026-09-24).
   C'était une imitation faite main, en `tracking-wider` — et « Verrouillée »
   y tombait en ink-500 sur ink-50. */
const STATUS_LABEL: Record<StepStatus, { text: string; variant: BadgeVariant }> = {
  'not-started': { text: 'À commencer', variant: 'neutral' },
  'in-progress': { text: 'En cours', variant: 'brand' },
  completed:     { text: 'Terminée', variant: 'success' },
  locked:        { text: 'Verrouillée', variant: 'neutral' },
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
    'relative bg-white border-2 rounded-xl p-stack-lg flex flex-col gap-stack transition-[transform,box-shadow,border-color] duration-base ease-standard',
    !isLocked && '',
    !isLocked && STATUS_HOVER_SHADOW[status],
    STATUS_BORDER[status],
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={classes} {...rest}>
      <header className="flex items-start gap-stack">
        <div
          className={[
            'inline-flex items-center justify-center w-14 h-14 rounded-2xl shrink-0 font-display text-h3',
            STATUS_BADGE[status],
          ].join(' ')}
        >
          {status === 'completed' ? (
            <Check size={24} strokeWidth={3} />
          ) : isLocked ? (
            <Lock size={20} />
          ) : (
            stepNumber
          )}
        </div>
        {/* État → titre 4 · titre → méta 4 (doctrine § 5). Le `mt-stack-3xs`
            du titre remplace la marge de base des titres (0,75em = 15 px),
            faite pour séparer des sections : état et titre étaient à 19 px. */}
        <div className="flex-1 min-w-0 flex flex-col items-start">
          <Badge variant={label.variant}>{label.text}</Badge>
          <h3 className="mt-stack-3xs text-h3 font-display text-ink-900">{title}</h3>
          {lessonCount !== undefined && (
            <span className="inline-flex items-center gap-stack-3xs text-caption text-ink-600 mt-stack-3xs">
              <Clock size={14} className="text-ink-600" />
              {lessonCount} leçons
            </span>
          )}
        </div>
      </header>

      {description && (
        <p className="m-0 text-body text-ink-700 max-w-prose">{description}</p>
      )}

      {progress !== undefined && (
        <div className="flex items-center gap-stack-xs">
          <div className="flex-1 h-1.5 bg-ink-100 rounded-pill overflow-hidden shadow-inner">
            <div
              className={['h-full rounded-pill transition-[width] duration-500 ease-out', STATUS_FILL[status]].join(' ')}
              style={{ width: `${progress}%` }}
            />
          </div>
          <span className="text-caption font-semibold text-ink-900 min-w-9 text-right tabular-nums">
            {progress}%
          </span>
        </div>
      )}

      {lessonsGrid && lessonsGrid.length > 0 && (
        <>
          <button
            type="button"
            className="inline-flex items-center justify-between w-full px-4 py-2.5 text-body font-semibold text-ink-700 bg-ink-50 hover:bg-ink-100 rounded-lg cursor-pointer transition-colors border border-ink-100"
            onClick={handleToggleExpand}
            aria-expanded={isExpanded}
          >
            <span>{isExpanded ? 'Masquer les leçons' : 'Voir les leçons'}</span>
            <ChevronDown
              size={16}
              className={['transition-transform duration-base ease-emphasis', isExpanded ? 'rotate-180' : ''].join(' ')}
            />
          </button>

          {isExpanded && (
            <div className="flex flex-col gap-stack-xs animate-[dd-slide-up_0.2s_ease-out]">
              {lessonsGrid.map((lesson) => (
                <div
                  key={lesson.id}
                  className={[
                    'flex items-center justify-between gap-stack-xs px-4 py-3 rounded-lg border transition-colors',
                    lesson.completed
                      ? 'bg-success-bg/60 border-success-base/20 text-success-fg hover:bg-success-bg'
                      : 'bg-white border-ink-200 text-ink-900 hover:bg-ink-50 hover:border-ink-300',
                  ].join(' ')}
                >
                  <div className="flex items-center gap-stack-xs flex-1 min-w-0">
                    <span
                      className={[
                        'inline-flex items-center justify-center w-6 h-6 rounded-pill shrink-0',
                        lesson.completed ? 'bg-success-vivid text-white' : 'bg-ink-100 text-ink-500',
                      ].join(' ')}
                    >
                      {lesson.completed ? <Check size={14} strokeWidth={3} /> : '·'}
                    </span>
                    <div className="text-body font-semibold truncate">{lesson.title}</div>
                  </div>
                  {lesson.duration && (
                    <span className="text-caption text-ink-600 shrink-0 inline-flex items-center gap-stack-3xs tabular-nums">
                      <Clock size={14} />
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
        <div className="absolute inset-0 flex items-center justify-center rounded-xl bg-white/80 backdrop-blur-sm pointer-events-none">
          <div className="inline-flex items-center gap-stack-xs px-4 py-2 rounded-pill bg-ink-100 text-ink-700 font-semibold border border-ink-200">
            <Lock size={16} /> Étape verrouillée
          </div>
        </div>
      )}
    </div>
  );
};

export default StepCard;
