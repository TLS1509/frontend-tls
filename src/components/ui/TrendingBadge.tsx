/**
 * TrendingBadge — Social Proof Indicators
 *
 * Visual indicators showing:
 * - Trending (popular, growing interest)
 * - Popular (high engagement)
 * - Recommended (personalized for learner)
 * - Featured (curated by team)
 * - New (recently added)
 *
 * Uses animation to draw attention appropriately.
 */

import React from 'react';
import { TrendingUp, Star, Sparkles, Award, Zap } from 'lucide-react';
import './TrendingBadge.css';

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

const ICON_SIZES = { sm: 12, md: 14 };

export const TrendingBadge: React.FC<TrendingBadgeProps> = ({
  type,
  size = 'md',
  animated = true,
  count,
}) => {
  const Icon = ICONS[type];
  const iconSize = ICON_SIZES[size];

  const classes = [
    'trending-badge',
    `trending-badge--${type}`,
    `trending-badge--${size}`,
    animated ? 'trending-badge--animated' : '',
  ].filter(Boolean).join(' ');

  return (
    <div className={classes}>
      <Icon size={iconSize} aria-hidden="true" />
      <span>{LABELS[type]}</span>
      {count != null && (
        <span className="trending-badge__count">{count}</span>
      )}
    </div>
  );
};

export default TrendingBadge;
