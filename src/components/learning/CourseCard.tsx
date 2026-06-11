import React from 'react';
import { Palette, BookOpen, Grid3x3, Play, Zap } from 'lucide-react';

export type CourseCardTone = 'brand' | 'warm' | 'sun';

export interface CourseCardProps {
  title: string;
  category?: 'Design' | 'React' | 'Design Systems' | string;
  enrolled?: boolean;
  progress?: number;
  tone?: CourseCardTone;
  onEnroll?: () => void;
  onContinue?: () => void;
}

const getCategoryIcon = (category: string) => {
  const props = { size: 64, strokeWidth: 1.5, className: 'text-white' };
  switch (category) {
    case 'Design': return <Palette {...props} />;
    case 'React': return <Grid3x3 {...props} />;
    case 'Design Systems': return <BookOpen {...props} />;
    default: return <BookOpen {...props} />;
  }
};

const categoryToneMap: Record<string, CourseCardTone> = {
  Design: 'warm',
  React: 'brand',
  'Design Systems': 'sun',
};

// Sprint 3 glow — tone-aware ripple. overflow-hidden removed from wrapper so ::after box-shadow isn't clipped.
const TONE_HOVER_GLOW: Record<CourseCardTone, string> = {
  brand: 'hover-glow-primary',
  warm:  'hover-glow-warm',
  sun:   'hover-glow-sun',
};

const CARD_BASE =
  'flex flex-col h-full rounded-lg border border-ink-200 bg-white shadow-sm transition-[box-shadow,transform] duration-slow ease-emphasis cursor-pointer hover:shadow-md hover:-translate-y-1 active:translate-y-0 active:scale-[0.99]';

// rounded-t-lg clips hero gradient to the card's top corners (overflow-hidden moved here from CARD_BASE)
const HERO_BASE = 'aspect-video relative rounded-t-lg overflow-hidden flex items-center justify-center';

const HERO_TONE_CLASSES: Record<CourseCardTone, string> = {
  brand: 'bg-gradient-to-br from-primary-600 to-primary-800',
  warm:  'bg-gradient-to-br from-secondary-500 to-secondary-700',
  sun:   'bg-gradient-to-br from-accent-400 to-accent-700',
};

const BADGE_BASE =
  'inline-block px-3 py-1 rounded-pill text-caption font-semibold mb-4 border';

const BADGE_TONE_CLASSES: Record<CourseCardTone, string> = {
  brand: 'bg-primary-50 text-primary-700 border-primary-200',
  warm:  'bg-secondary-50 text-secondary-700 border-secondary-200',
  sun:   'bg-accent-50 text-accent-700 border-accent-200',
};

const PROGRESS_FILL_BASE = 'h-full transition-[width] duration-300';

const PROGRESS_FILL_TONE_CLASSES: Record<CourseCardTone, string> = {
  brand: 'bg-gradient-to-r from-primary-500 to-accent-400',
  warm:  'bg-gradient-to-r from-secondary-500 to-accent-400',
  sun:   'bg-gradient-to-r from-accent-400 to-accent-600',
};

const BUTTON_BASE =
  'w-full p-4 rounded-md text-body-sm font-semibold cursor-pointer flex items-center justify-center gap-2 transition-[background-color,box-shadow,transform] duration-fast ease-emphasis hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98]';

const BUTTON_ENROLL_TONE_CLASSES: Record<CourseCardTone, string> = {
  brand: 'text-white bg-gradient-to-br from-primary-600 to-primary-700 shadow-brand-sm hover:shadow-brand-md',
  warm:  'text-white bg-gradient-to-br from-secondary-500 to-secondary-600 shadow-warm-sm hover:shadow-warm-md',
  sun:   'text-white bg-gradient-to-br from-accent-400 to-accent-600 shadow-sun-sm hover:shadow-brand-md',
};

const BUTTON_ENROLLED =
  'bg-ink-100 text-ink-900 hover:bg-ink-50 hover:translate-y-0';

export const CourseCard: React.FC<CourseCardProps> = ({
  title,
  category = 'Other',
  enrolled = false,
  progress = 0,
  tone,
  onEnroll,
  onContinue,
}) => {
  const resolvedTone: CourseCardTone = tone ?? categoryToneMap[category] ?? 'brand';

  return (
    <div className={[CARD_BASE, TONE_HOVER_GLOW[resolvedTone]].join(' ')}>
      <div className={`${HERO_BASE} ${HERO_TONE_CLASSES[resolvedTone]}`}>
        <div className="opacity-90">{getCategoryIcon(category)}</div>
      </div>

      <div className="flex flex-col flex-1 p-6 max-sm:p-4">
        <span className={`${BADGE_BASE} ${BADGE_TONE_CLASSES[resolvedTone]} self-start`}>{category}</span>

        <h3 className="font-display text-h4 font-semibold text-ink-900 mb-2 line-clamp-2 min-h-[3.5rem]">
          {title}
        </h3>

        <p className="text-caption text-ink-600 mb-4 leading-normal line-clamp-2 min-h-[2.5rem]">
          Expand your skills with comprehensive, project-based learning...
        </p>

        <div className="flex-1" />

        <div className="min-h-[2.25rem] mb-4">
          {enrolled && (
            <>
              <div className="h-1.5 bg-ink-100 rounded-pill overflow-hidden mb-2">
                <div
                  className={`${PROGRESS_FILL_BASE} ${PROGRESS_FILL_TONE_CLASSES[resolvedTone]}`}
                  style={{ width: `${progress}%` }}
                />
              </div>
              <p className="text-micro text-ink-500 m-0">{progress}% complete</p>
            </>
          )}
        </div>

        <button
          onClick={enrolled ? onContinue : onEnroll}
          className={`${BUTTON_BASE} ${enrolled ? BUTTON_ENROLLED : BUTTON_ENROLL_TONE_CLASSES[resolvedTone]}`}
        >
          {enrolled ? <><Play size={16} />Continue Learning</> : <><Zap size={16} />Enroll Now</>}
        </button>
      </div>
    </div>
  );
};

export default CourseCard;
