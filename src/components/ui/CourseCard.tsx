import React from 'react';
import { Palette, BookOpen, Grid3x3, User, Play, Zap } from 'lucide-react';
import './CourseCard.css';

export type CourseCardTone = 'brand' | 'warm' | 'sun';

export interface CourseCardProps {
  title: string;
  instructor?: string;
  category?: 'Design' | 'React' | 'Design Systems' | string;
  enrolled?: boolean;
  progress?: number; // 0-100
  tone?: CourseCardTone;
  onEnroll?: () => void;
  onContinue?: () => void;
}

const getCategoryIcon = (category: string) => {
  switch (category) {
    case 'Design':
      return <Palette size={64} strokeWidth={1.5} className="course-card__hero-icon-svg" />;
    case 'React':
      return <Grid3x3 size={64} strokeWidth={1.5} className="course-card__hero-icon-svg" />;
    case 'Design Systems':
      return <BookOpen size={64} strokeWidth={1.5} className="course-card__hero-icon-svg" />;
    default:
      return <BookOpen size={64} strokeWidth={1.5} className="course-card__hero-icon-svg" />;
  }
};

const categoryToneMap: Record<string, CourseCardTone> = {
  Design: 'warm',
  React: 'brand',
  'Design Systems': 'sun',
};

export const CourseCard: React.FC<CourseCardProps> = ({
  title,
  instructor = 'Course Instructor',
  category = 'Other',
  enrolled = false,
  progress = 0,
  tone,
  onEnroll,
  onContinue,
}) => {
  const resolvedTone: CourseCardTone = tone ?? categoryToneMap[category] ?? 'brand';

  return (
    <div className={`course-card course-card--${resolvedTone}`}>
      {/* Course Hero with Gradient */}
      <div className="course-card__hero">
        <div className="course-card__hero-icon">
          {getCategoryIcon(category)}
        </div>
      </div>

      {/* Course Content */}
      <div className="course-card__content">
        {/* Category Badge */}
        <span className="course-card__badge">{category}</span>

        {/* Course Title */}
        <h3 className="course-card__title">{title}</h3>

        {/* Course Description */}
        <p className="course-card__description">
          Expand your skills with comprehensive, project-based learning...
        </p>

        {/* Instructor Info */}
        <div className="course-card__instructor">
          <User size={14} strokeWidth={2} className="course-card__instructor-icon" />
          <span className="course-card__instructor-name">{instructor}</span>
        </div>

        {/* Progress Bar (if enrolled) */}
        {enrolled && (
          <div className="course-card__progress-section">
            <div className="course-card__progress-bar">
              <div
                className="course-card__progress-fill"
                style={{ width: `${progress}%` }}
              />
            </div>
            <p className="course-card__progress-label">{progress}% complete</p>
          </div>
        )}

        {/* CTA Button */}
        <button
          onClick={enrolled ? onContinue : onEnroll}
          className={`course-card__button ${enrolled ? 'course-card__button--enrolled' : 'course-card__button--enroll'}`}
        >
          {enrolled ? (
            <>
              <Play size={16} />
              Continue Learning
            </>
          ) : (
            <>
              <Zap size={16} />
              Enroll Now
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default CourseCard;
