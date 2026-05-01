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

export interface TrendingBadgeProps {
  type: 'trending' | 'popular' | 'recommended' | 'featured' | 'new';
  size?: 'sm' | 'md';
  animated?: boolean;
  count?: number;  // e.g., "2.3k learning this"
}

export const TrendingBadge: React.FC<TrendingBadgeProps> = ({
  type,
  size = 'md',
  animated = true,
  count,
}) => {
  const badges = {
    trending: {
      icon: TrendingUp,
      label: 'Trending',
      bg: 'var(--tls-orange-50)',
      border: 'var(--tls-orange-200)',
      text: 'var(--tls-orange-700)',
      animationKeyframes: '@keyframes trendingPulse { 0% { opacity: 0.8; } 50% { opacity: 1; } 100% { opacity: 0.8; } }',
    },
    popular: {
      icon: Star,
      label: 'Popular',
      bg: 'var(--tls-yellow-50)',
      border: 'var(--tls-yellow-200)',
      text: 'var(--tls-yellow-700)',
      animationKeyframes: '@keyframes popularGlow { 0%, 100% { box-shadow: 0 0 0 0 rgba(248, 176, 68, 0.3); } 50% { box-shadow: 0 0 0 6px rgba(248, 176, 68, 0); } }',
    },
    recommended: {
      icon: Sparkles,
      label: 'For You',
      bg: 'var(--tls-primary-50)',
      border: 'var(--tls-primary-200)',
      text: 'var(--tls-primary-700)',
      animationKeyframes: '@keyframes recommendedBounce { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-2px); } }',
    },
    featured: {
      icon: Award,
      label: 'Featured',
      bg: 'linear-gradient(135deg, var(--tls-primary-50), var(--tls-orange-50))',
      border: 'var(--tls-primary-200)',
      text: 'var(--tls-primary-700)',
      animationKeyframes: '@keyframes featuredShine { 0% { opacity: 0.7; } 50% { opacity: 1; } 100% { opacity: 0.7; } }',
    },
    new: {
      icon: Zap,
      label: 'New',
      bg: 'var(--tls-success-light-bg)',
      border: 'var(--tls-success-border)',
      text: 'var(--tls-success-fg)',
      animationKeyframes: '@keyframes newPulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.8; } }',
    },
  };

  const badge = badges[type];
  const sizeStyles = {
    sm: {
      padding: '2px 6px',
      fontSize: 'var(--t-micro)',
      iconSize: 12,
      gap: '3px',
    },
    md: {
      padding: 'var(--s-1) var(--s-2)',
      fontSize: 'var(--t-caption)',
      iconSize: 14,
      gap: '4px',
    },
  };

  const currentSize = sizeStyles[size];
  const Icon = badge.icon;

  return (
    <>
      <style>{`
        @keyframes ${type}Badge {
          ${badge.animationKeyframes}
        }
      `}</style>
      <div
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: currentSize.gap,
          padding: currentSize.padding,
          borderRadius: 'var(--r-pill)',
          background: badge.bg,
          border: `1px solid ${badge.border}`,
          fontSize: currentSize.fontSize,
          fontWeight: 600,
          color: badge.text,
          animation: animated ? `${type}Badge 2s ease-in-out infinite` : 'none',
          whiteSpace: 'nowrap',
          transition: 'all var(--dur-2)',
        }}
      >
        <Icon size={currentSize.iconSize} />
        <span>{badge.label}</span>
        {count && <span style={{ marginLeft: '2px', fontSize: 'var(--t-micro)', opacity: 0.8 }}>{count}</span>}
      </div>
    </>
  );
};

export default TrendingBadge;
