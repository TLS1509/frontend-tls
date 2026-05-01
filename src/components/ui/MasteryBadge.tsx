/**
 * MasteryBadge — Skill Level Visualization
 *
 * Shows learner's proficiency on a 5-tier scale (Novice → Expert)
 * using color progression from light (novice) to bright (expert).
 * Visually represents Bloom's taxonomy progression.
 *
 * Uses TLS design tokens for skill level colors.
 */

import React from 'react';

export interface MasteryBadgeProps {
  level: 1 | 2 | 3 | 4 | 5;  // Novice, Beginner, Intermediate, Advanced, Expert
  skillName: string;
  progressToNext?: number;  // 0-100, % toward next level
  tone?: 'primary' | 'warm' | 'sun';  // for border/accent color
  size?: 'sm' | 'md' | 'lg';
  showLabel?: boolean;
}

const LEVEL_NAMES = {
  1: 'Novice',
  2: 'Beginner',
  3: 'Intermediate',
  4: 'Advanced',
  5: 'Expert',
};

const LEVEL_DESCRIPTIONS = {
  1: 'Just starting out',
  2: 'Building foundations',
  3: 'Growing confidence',
  4: 'Approaching mastery',
  5: 'Expert level',
};

export const MasteryBadge: React.FC<MasteryBadgeProps> = ({
  level,
  skillName,
  progressToNext = 0,
  tone = 'primary',
  size = 'md',
  showLabel = true,
}) => {
  // Map level to token color variable
  const levelTokens = {
    1: 'var(--skill-level-1)',
    2: 'var(--skill-level-2)',
    3: 'var(--skill-level-3)',
    4: 'var(--skill-level-4)',
    5: 'var(--skill-level-5)',
  };

  const toneColors = {
    primary: 'var(--tls-primary-500)',
    warm: 'var(--tls-orange-500)',
    sun: 'var(--tls-yellow-600)',
  };

  const sizeStyles = {
    sm: {
      container: 'var(--s-2) var(--s-3)',
      title: 'var(--t-caption)',
      description: 'var(--t-micro)',
      ringSize: '32px',
    },
    md: {
      container: 'var(--s-3) var(--s-4)',
      title: 'var(--t-body-sm)',
      description: 'var(--t-caption)',
      ringSize: '48px',
    },
    lg: {
      container: 'var(--s-4) var(--s-6)',
      title: 'var(--t-body)',
      description: 'var(--t-body-sm)',
      ringSize: '64px',
    },
  };

  const currentSize = sizeStyles[size];

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: size === 'sm' ? 'var(--s-2)' : 'var(--s-3)',
        padding: currentSize.container,
        borderRadius: 'var(--r-lg)',
        background: 'var(--surface-muted)',
        border: `2px solid ${toneColors[tone]}`,
        transition: 'all var(--dur-2)',
      }}
    >
      {/* Circular Level Indicator */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: currentSize.ringSize,
          height: currentSize.ringSize,
          borderRadius: '50%',
          background: levelTokens[level],
          color: level <= 2 ? 'var(--tls-ink-900)' : 'var(--tls-ink-0)',
          fontWeight: 700,
          fontSize: size === 'sm' ? 'var(--t-body-sm)' : size === 'md' ? 'var(--t-h4)' : 'var(--t-h3)',
          flexShrink: 0,
          boxShadow: `0 4px 12px ${levelTokens[level]}80`,
        }}
      >
        {level}
      </div>

      {/* Text Content */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 'var(--s-1)' }}>
        {showLabel && (
          <div
            style={{
              fontSize: currentSize.title,
              fontWeight: 600,
              color: 'var(--text)',
              margin: 0,
            }}
          >
            {LEVEL_NAMES[level]}
          </div>
        )}
        <div
          style={{
            fontSize: currentSize.description,
            color: 'var(--text-muted)',
            margin: 0,
          }}
        >
          {skillName}
        </div>

        {/* Progress bar to next level */}
        {progressToNext > 0 && progressToNext < 100 && (
          <div
            style={{
              marginTop: 'var(--s-2)',
              width: '100%',
              height: '4px',
              backgroundColor: 'var(--surface)',
              borderRadius: 'var(--r-xs)',
              overflow: 'hidden',
              border: `1px solid ${toneColors[tone]}30`,
            }}
          >
            <div
              style={{
                height: '100%',
                width: `${progressToNext}%`,
                backgroundColor: toneColors[tone],
                transition: 'width var(--dur-3) var(--ease-standard)',
              }}
            />
          </div>
        )}

        {/* Completion label */}
        {progressToNext > 0 && progressToNext < 100 && (
          <div
            style={{
              fontSize: 'var(--t-micro)',
              color: 'var(--text-muted)',
              marginTop: '2px',
            }}
          >
            {progressToNext}% to {LEVEL_NAMES[Math.min(5, level + 1) as 1 | 2 | 3 | 4 | 5]}
          </div>
        )}

        {/* Max level message */}
        {level === 5 && (
          <div
            style={{
              fontSize: 'var(--t-micro)',
              color: toneColors[tone],
              marginTop: '2px',
              fontWeight: 500,
            }}
          >
            ✨ Mastery achieved
          </div>
        )}
      </div>
    </div>
  );
};

export default MasteryBadge;
