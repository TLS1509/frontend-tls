import React from 'react';
import './ParcoursCard.css';

export type ParcoursTone = 'brand' | 'warm' | 'sun';

interface ParcoursCardProps {
  title: string;
  description?: string;
  instructor?: string;
  progress?: number;
  lessonCount?: number;
  duration?: string;
  status?: 'not-started' | 'in-progress' | 'completed';
  tone?: ParcoursTone;
  ctaLabel?: string;
  onCta?: () => void;
  className?: string;
}

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
    'tls-parcours-card',
    `tls-parcours-card--${status}`,
    `tls-parcours-card--${tone}`,
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={classes}>
      {/* Gradient thumbnail header */}
      <div className="tls-parcours-card__thumb" aria-hidden="true">
        <div className="tls-parcours-card__thumb-icon">📚</div>
      </div>

      <div className="tls-parcours-card__body">
        <h3 className="tls-parcours-card__title">{title}</h3>

        {instructor && (
          <p className="tls-parcours-card__instructor">{instructor}</p>
        )}

        {description && (
          <p className="tls-parcours-card__description">{description}</p>
        )}

        {/* Meta pills */}
        {(lessonCount || duration) && (
          <div className="tls-parcours-card__meta">
            {lessonCount && (
              <span className="tls-parcours-card__pill">
                📖 {lessonCount} leçons
              </span>
            )}
            {duration && (
              <span className="tls-parcours-card__pill">
                ⏱ {duration}
              </span>
            )}
          </div>
        )}

        {/* Progress bar */}
        {progress !== undefined && (
          <div className="tls-parcours-card__progress">
            <div className="tls-parcours-card__bar">
              <div
                className="tls-parcours-card__fill"
                style={{ width: `${progress}%` }}
              />
            </div>
            <span className="tls-parcours-card__percent">{progress}%</span>
          </div>
        )}

        {/* CTA */}
        {ctaLabel && (
          <button
            type="button"
            className="tls-parcours-card__cta"
            onClick={onCta}
          >
            {ctaLabel}
          </button>
        )}
      </div>
    </div>
  );
};

export default ParcoursCard;
