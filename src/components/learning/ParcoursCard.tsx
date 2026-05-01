import React from 'react';
import './ParcoursCard.css';

export interface ParcoursCardProps {
  title: string;
  description?: string;
  progress?: number;
  lessonCount?: number;
  status?: 'not-started' | 'in-progress' | 'completed';
  className?: string;
}

export const ParcoursCard: React.FC<ParcoursCardProps> = ({
  title,
  description,
  progress = 0,
  lessonCount,
  status = 'not-started',
  className = '',
}) => {
  const classes = ['tls-parcours-card', `tls-parcours-card--${status}`, className]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={classes}>
      <div className="tls-parcours-card__header">
        <h3 className="tls-parcours-card__title">{title}</h3>
      </div>
      {description && <p className="tls-parcours-card__description">{description}</p>}
      {progress !== undefined && (
        <div className="tls-parcours-card__progress">
          <div className="tls-parcours-card__bar">
            <div className="tls-parcours-card__fill" style={{ width: `${progress}%` }} />
          </div>
          <span className="tls-parcours-card__percent">{progress}%</span>
        </div>
      )}
      {lessonCount && (
        <p className="tls-parcours-card__lessons">{lessonCount} lessons</p>
      )}
    </div>
  );
};
