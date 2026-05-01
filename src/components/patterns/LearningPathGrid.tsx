/**
 * LearningPathGrid Pattern
 * 
 * Composite pattern for displaying learning paths/courses
 * Wraps StepCard with learning-specific logic
 * 
 * Reusable in:
 * - Learning Paths listing page
 * - Search results
 * - Learning recommendations
 */

import React from 'react';
import { StepCard } from '../learning/StepCard';

export interface LearningPathGridItem {
  id: string;
  stepNumber?: number;
  title: string;
  description?: string;
  lessonCount?: number;
  lessons?: Array<{
    id: string;
    title: string;
    duration?: string;
    completed?: boolean;
  }>;
  progress?: number;
  status?: 'not-started' | 'in-progress' | 'completed' | 'locked';
  tone?: 'primary' | 'warm' | 'sun';
}

export interface LearningPathGridProps {
  /** Array of learning paths to display */
  paths: LearningPathGridItem[];
  
  /** Callback when user clicks on a path */
  onPathClick?: (id: string) => void;
  
  /** Filter by status */
  filterStatus?: 'all' | 'not-started' | 'in-progress' | 'completed' | 'locked';
  
  /** Default tone for all cards */
  defaultTone?: 'primary' | 'warm' | 'sun';
  
  /** Number of columns (responsive) */
  columns?: 1 | 2 | 3;
  
  /** Show/hide lesson expansion toggle */
  showLessons?: boolean;
  
  /** Loading state */
  isLoading?: boolean;
  
  /** Empty state message */
  emptyMessage?: string;
  
  /** Custom className */
  className?: string;
}

export const LearningPathGrid: React.FC<LearningPathGridProps> = ({
  paths,
  onPathClick,
  filterStatus = 'all',
  defaultTone = 'primary',
  columns = 3,
  showLessons = true,
  isLoading = false,
  emptyMessage = 'No learning paths available',
  className = '',
}) => {
  // Filter paths by status
  const filteredPaths =
    filterStatus === 'all'
      ? paths
      : paths.filter((p) => p.status === filterStatus);

  // Loading state
  if (isLoading) {
    return (
      <div className={`learning-path-grid learning-path-grid--loading ${className}`}>
        <div className="learning-path-grid__loader">
          <div className="learning-path-grid__spinner" />
          <p>Loading learning paths...</p>
        </div>
      </div>
    );
  }

  // Empty state
  if (!filteredPaths || filteredPaths.length === 0) {
    return (
      <div className={`learning-path-grid learning-path-grid--empty ${className}`}>
        <div className="learning-path-grid__empty">
          <p className="learning-path-grid__empty-icon">🎯</p>
          <p className="learning-path-grid__empty-message">{emptyMessage}</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`learning-path-grid learning-path-grid--${columns}col ${className}`}>
      {filteredPaths.map((path, idx) => (
        <div
          key={path.id}
          className="learning-path-grid__item"
          onClick={() => onPathClick?.(path.id)}
        >
          <StepCard
            stepNumber={path.stepNumber ?? idx + 1}
            title={path.title}
            description={path.description}
            lessonCount={path.lessonCount}
            lessonsGrid={showLessons ? path.lessons : undefined}
            progress={path.progress}
            status={path.status}
            className="learning-path-grid__card"
          />
        </div>
      ))}
    </div>
  );
};

export default LearningPathGrid;
