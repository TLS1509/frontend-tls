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
  paths: LearningPathGridItem[];
  onPathClick?: (id: string) => void;
  filterStatus?: 'all' | 'not-started' | 'in-progress' | 'completed' | 'locked';
  defaultTone?: 'primary' | 'warm' | 'sun';
  columns?: 1 | 2 | 3;
  showLessons?: boolean;
  isLoading?: boolean;
  emptyMessage?: string;
  className?: string;
}

const COLS: Record<1 | 2 | 3, string> = {
  1: 'grid-cols-1',
  2: 'grid-cols-1 md:grid-cols-2',
  3: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
};

export const LearningPathGrid: React.FC<LearningPathGridProps> = ({
  paths,
  onPathClick,
  filterStatus = 'all',
  columns = 3,
  showLessons = true,
  isLoading = false,
  emptyMessage = 'No learning paths available',
  className = '',
}) => {
  const filteredPaths =
    filterStatus === 'all' ? paths : paths.filter((p) => p.status === filterStatus);

  if (isLoading) {
    return (
      <div className={['flex items-center justify-center p-8', className].filter(Boolean).join(' ')}>
        <div className="flex flex-col items-center gap-3 text-ink-500">
          <div className="w-8 h-8 rounded-full border-[3px] border-ink-200 border-t-primary-500 animate-spin" />
          <p className="m-0 text-body-sm">Loading learning paths...</p>
        </div>
      </div>
    );
  }

  if (!filteredPaths || filteredPaths.length === 0) {
    return (
      <div className={['flex items-center justify-center p-8', className].filter(Boolean).join(' ')}>
        <div className="flex flex-col items-center gap-3 text-ink-500 text-center">
          <p className="m-0 text-3xl">🎯</p>
          <p className="m-0 text-body-sm">{emptyMessage}</p>
        </div>
      </div>
    );
  }

  return (
    <div className={['grid gap-4', COLS[columns], className].filter(Boolean).join(' ')}>
      {filteredPaths.map((path, idx) => (
        <div key={path.id} onClick={() => onPathClick?.(path.id)} className="cursor-pointer">
          <StepCard
            stepNumber={path.stepNumber ?? idx + 1}
            title={path.title}
            description={path.description}
            lessonCount={path.lessonCount}
            lessonsGrid={showLessons ? path.lessons : undefined}
            progress={path.progress}
            status={path.status}
          />
        </div>
      ))}
    </div>
  );
};

export default LearningPathGrid;
