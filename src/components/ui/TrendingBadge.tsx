import React from 'react';
import { TrendingUp, Star, Sparkles, Award, Zap } from 'lucide-react';

export interface TrendingBadgeProps {
  type: 'trending' | 'popular' | 'recommended' | 'featured' | 'new';
  size?: 'sm' | 'md';
  animated?: boolean;
  count?: number;
}

const ICONS = {
  trending: TrendingUp,
  popular: Star,
  recommended: Sparkles,
  featured: Award,
  new: Zap,
};

const LABELS = {
  trending: 'Trending',
  popular: 'Popular',
  recommended: 'For You',
  featured: 'Featured',
  new: 'New',
};

const TYPE_CLASSES: Record<TrendingBadgeProps['type'], string> = {
  trending:    'bg-gradient-to-br from-secondary-500 to-secondary-600 text-white',
  popular:     'bg-gradient-to-br from-accent-500 to-accent-600 text-white',
  recommended: 'bg-gradient-to-br from-primary-500 to-primary-600 text-white',
  featured:    'bg-gradient-to-br from-primary-700 to-primary-900 text-white',
  new:         'bg-gradient-to-br from-success-base to-success-fg text-white',
};

const SIZE_CLASSES: Record<'sm' | 'md', string> = {
  sm: 'text-micro px-2 py-0.5 gap-1',
  md: 'text-caption px-2.5 py-1 gap-1.5',
};

const ICON_SIZES: Record<'sm' | 'md', number> = { sm: 12, md: 14 };

const COUNT_CLASSES: Record<'sm' | 'md', string> = {
  sm: 'text-[10px] px-1 ml-0.5',
  md: 'text-micro px-1.5 ml-1',
};

export const TrendingBadge: React.FC<TrendingBadgeProps> = ({
  type,
  size = 'md',
  animated = true,
  count,
}) => {
  const Icon = ICONS[type];
  const iconSize = ICON_SIZES[size];

  const classes = [
    'inline-flex items-center font-bold rounded-pill shadow-sm whitespace-nowrap',
    SIZE_CLASSES[size],
    TYPE_CLASSES[type],
    animated && 'animate-pulse-slow',
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={classes}>
      <Icon size={iconSize} aria-hidden="true" />
      <span>{LABELS[type]}</span>
      {count != null && (
        <span
          className={`inline-flex items-center justify-center bg-white/25 rounded-pill font-bold ${COUNT_CLASSES[size]}`}
        >
          {count}
        </span>
      )}
    </div>
  );
};

export default TrendingBadge;
