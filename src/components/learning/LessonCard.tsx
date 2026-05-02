/**
 * LessonCard — Learning Pattern
 *
 * Lesson card with progress tracking, difficulty indicator, and duration.
 * Extends ParcoursCard patterns for lesson-level content.
 *
 * Usage:
 *   <LessonCard
 *     title="Introduction to React"
 *     description="Learn the basics of React"
 *     progress={65}
 *     duration="2h 30m"
 *     difficulty="intermediate"
 *     tone="primary"
 *     onClick={() => navigate('/lesson/123')}
 *   />
 */

import React from 'react';
import { Clock, Zap, Lock } from 'lucide-react';
import { ProgressBar } from '../ui/ProgressBar';
import { Badge } from '../ui/Badge';
import './LessonCard.css';

export type LessonDifficulty = 'beginner' | 'intermediate' | 'advanced';
export type LessonTone = 'primary' | 'warm' | 'sun';

export interface LessonCardProps {
  title: string;
  description: string;
  progress: number; // 0-100
  duration: string; // e.g., "2h 30m"
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

const DIFFICULTY_VARIANTS: Record<LessonDifficulty, any> = {
  beginner: 'primary',
  intermediate: 'secondary',
  advanced: 'secondary',
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
      className={`lesson-card lesson-card--${tone} ${className}`}
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
      {/* Locked overlay */}
      {locked && (
        <div className="lesson-card__locked-overlay">
          <div className="lesson-card__locked-icon">
            <Lock size={24} aria-label="Locked" />
          </div>
        </div>
      )}

      {/* Card content */}
      <div className={`lesson-card__inner${locked ? ' lesson-card__inner--locked' : ''}`}>
        {/* Header with title and difficulty */}
        <div className="lesson-card__header">
          <h3 className="lesson-card__title">{title}</h3>
          <Badge
            variant={DIFFICULTY_VARIANTS[difficulty]}
            className="lesson-card__difficulty"
          >
            {DIFFICULTY_LABELS[difficulty]}
          </Badge>
        </div>

        {/* Description */}
        <p className="lesson-card__description">{description}</p>

        {/* Metadata */}
        <div className="lesson-card__metadata">
          <div className="lesson-card__meta-item">
            <Clock size={14} aria-hidden="true" />
            <span>{duration}</span>
          </div>
          {instructor && (
            <div className="lesson-card__meta-item">
              <span>{instructor}</span>
            </div>
          )}
        </div>

        {/* Progress bar */}
        <div className="lesson-card__progress">
          <ProgressBar
            value={progress}
            size="sm"
            showLabel={true}
            className="lesson-card__progress-bar"
          />
        </div>
      </div>
    </div>
  );
};

export default LessonCard;
