import React, { useState } from 'react';

export interface StepLesson {
  id: string;
  title: string;
  duration?: string;
  completed?: boolean;
}

export interface StepCardProps extends React.HTMLAttributes<HTMLDivElement> {
  stepNumber: number;
  title: string;
  description?: string;
  lessonCount?: number;
  lessonsGrid?: StepLesson[];
  progress?: number;
  status?: 'not-started' | 'in-progress' | 'completed' | 'locked';
  isExpanded?: boolean;
  onToggleExpand?: () => void;
}

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
    'tls-step-card',
    `tls-step-card--${status}`,
    isExpanded && 'tls-step-card--expanded',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={classes} {...rest}>
      <header className="tls-step-card__header">
        <div className="tls-step-card__badge">{stepNumber}</div>
        <div className="tls-step-card__header-content">
          <h3 className="tls-step-card__title">{title}</h3>
          {lessonCount && <span className="tls-step-card__lesson-count">{lessonCount} lessons</span>}
        </div>
      </header>

      {description && <p className="tls-step-card__description">{description}</p>}

      {progress !== undefined && (
        <div className="tls-step-card__progress">
          <div className="tls-step-card__bar">
            <div className="tls-step-card__fill" style={{ width: `${progress}%` }} />
          </div>
          <span className="tls-step-card__percent">{progress}%</span>
        </div>
      )}

      {lessonsGrid && lessonsGrid.length > 0 && (
        <>
          <button
            type="button"
            className="tls-step-card__toggle"
            onClick={handleToggleExpand}
            aria-expanded={isExpanded}
          >
            <span>{isExpanded ? 'Hide' : 'Show'} Lessons</span>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="6 9 12 15 18 9" />
            </svg>
          </button>

          {isExpanded && (
            <div className="tls-step-card__lessons-grid">
              {lessonsGrid.map((lesson) => (
                <div key={lesson.id} className={`tls-step-card__lesson ${lesson.completed ? 'tls-step-card__lesson--completed' : ''}`}>
                  <div className="tls-step-card__lesson-title">{lesson.title}</div>
                  {lesson.duration && <span className="tls-step-card__lesson-duration">{lesson.duration}</span>}
                  {lesson.completed && (
                    <svg
                      className="tls-step-card__lesson-check"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  )}
                </div>
              ))}
            </div>
          )}
        </>
      )}

      {status === 'locked' && <div className="tls-step-card__lock-overlay">🔒 Locked</div>}
    </div>
  );
};

export default StepCard;
