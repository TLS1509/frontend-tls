/**
 * LearningPathHeader Pattern
 * 
 * Header section for learning path detail pages
 * Shows title, category, description, progress, and KPIs
 */

import React from 'react';

export interface LearningPathKPI {
  label: string;
  value: string | number;
  icon?: React.ReactNode;
}

export interface LearningPathHeaderProps {
  /** Path title */
  title: string;
  
  /** Category/topic */
  category?: string;
  
  /** Full description */
  description?: string;
  
  /** Progress percentage (0-100) */
  progress?: number;
  
  /** KPIs to display (lessons, duration, students, etc) */
  kpis?: LearningPathKPI[];
  
  /** Tone for styling */
  tone?: 'primary' | 'warm' | 'sun';
  
  /** Callback when back button is clicked */
  onBack?: () => void;
  
  /** Show back button */
  showBackButton?: boolean;
  
  /** Custom className */
  className?: string;
}

export const LearningPathHeader: React.FC<LearningPathHeaderProps> = ({
  title,
  category,
  description,
  progress,
  kpis,
  tone = 'primary',
  onBack,
  showBackButton = true,
  className = '',
}) => {
  return (
    <div className={`learning-path-header learning-path-header--${tone} ${className}`}>
      {/* Background glow effect */}
      <div className="learning-path-header__glow" />

      {/* Back button */}
      {showBackButton && (
        <button
          className="learning-path-header__back"
          onClick={onBack}
          aria-label="Go back"
        >
          ← Back
        </button>
      )}

      {/* Main content */}
      <div className="learning-path-header__content">
        {/* Category */}
        {category && (
          <span className="learning-path-header__category">
            {category.toUpperCase()}
          </span>
        )}

        {/* Title */}
        <h1 className="learning-path-header__title">{title}</h1>

        {/* Description */}
        {description && (
          <p className="learning-path-header__description">{description}</p>
        )}

        {/* Progress bar */}
        {progress !== undefined && (
          <div className="learning-path-header__progress">
            <div className="learning-path-header__progress-track">
              <div
                className="learning-path-header__progress-fill"
                style={{ width: `${progress}%` }}
              />
            </div>
            <span className="learning-path-header__progress-text">
              {progress}% Complete
            </span>
          </div>
        )}
      </div>

      {/* KPIs */}
      {kpis && kpis.length > 0 && (
        <div className="learning-path-header__kpis">
          {kpis.map((kpi, idx) => (
            <div key={idx} className="learning-path-header__kpi">
              {kpi.icon && (
                <span className="learning-path-header__kpi-icon">
                  {kpi.icon}
                </span>
              )}
              <div className="learning-path-header__kpi-content">
                <span className="learning-path-header__kpi-value">
                  {kpi.value}
                </span>
                <span className="learning-path-header__kpi-label">
                  {kpi.label}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default LearningPathHeader;
