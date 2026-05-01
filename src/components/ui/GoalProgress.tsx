/**
 * GoalProgress — Learning Goal Tracking
 *
 * Visualizes progress toward a specific learning goal with:
 * - Goal name
 * - Completion percentage
 * - Time remaining / deadline
 * - On-track indicator
 *
 * Uses TLS design tokens and design system.
 */

import React from 'react';
import { CheckCircle2, AlertCircle, Clock } from 'lucide-react';

export interface GoalProgressProps {
  goal: string;
  percentComplete: number;  // 0-100
  daysRemaining?: number;
  hoursRemaining?: number;
  isOnTrack: boolean;
  icon?: React.ReactNode;
  tone?: 'primary' | 'warm' | 'success' | 'danger';
  size?: 'sm' | 'md';
  showDetails?: boolean;
}

export const GoalProgress: React.FC<GoalProgressProps> = ({
  goal,
  percentComplete,
  daysRemaining,
  hoursRemaining,
  isOnTrack,
  icon,
  tone = 'primary',
  size = 'md',
  showDetails = true,
}) => {
  // Determine background based on on-track status
  const tones = {
    primary: {
      bg: 'var(--tls-primary-50)',
      bar: 'var(--tls-primary-500)',
      border: 'var(--tls-primary-200)',
    },
    warm: {
      bg: 'var(--tls-orange-50)',
      bar: 'var(--tls-orange-500)',
      border: 'var(--tls-orange-200)',
    },
    success: {
      bg: 'var(--tls-success-light-bg)',
      bar: 'var(--tls-success-base)',
      border: 'var(--tls-success-border)',
    },
    danger: {
      bg: 'var(--tls-danger-light)',
      bar: 'var(--tls-danger-base)',
      border: 'var(--tls-danger-border)',
    },
  };

  const effectiveTone = !isOnTrack ? 'danger' : tone;
  const themeColors = tones[effectiveTone];

  const sizeStyles = {
    sm: {
      padding: 'var(--s-2) var(--s-3)',
      titleSize: 'var(--t-body-sm)',
      descSize: 'var(--t-caption)',
    },
    md: {
      padding: 'var(--s-3) var(--s-4)',
      titleSize: 'var(--t-body)',
      descSize: 'var(--t-body-sm)',
    },
  };

  const currentSize = sizeStyles[size];

  // Format time remaining
  const timeRemaining = daysRemaining
    ? daysRemaining === 1
      ? 'Due tomorrow'
      : `${daysRemaining} days left`
    : hoursRemaining
      ? hoursRemaining === 1
        ? 'Due in 1 hour'
        : `${hoursRemaining} hours left`
      : 'Time unknown';

  // Completion status
  const isComplete = percentComplete >= 100;

  return (
    <div
      style={{
        padding: currentSize.padding,
        borderRadius: 'var(--r-lg)',
        background: themeColors.bg,
        border: `1px solid ${themeColors.border}`,
        transition: 'all var(--dur-2)',
      }}
    >
      {/* Header: Goal name + status icon */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: 'var(--s-3)',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--s-2)', flex: 1 }}>
          {icon && <div style={{ flexShrink: 0 }}>{icon}</div>}
          <div>
            <h3
              style={{
                margin: 0,
                fontSize: currentSize.titleSize,
                fontWeight: 600,
                color: 'var(--text)',
              }}
            >
              {goal}
            </h3>
          </div>
        </div>

        {/* Status badge */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '4px',
            marginLeft: 'var(--s-2)',
            flexShrink: 0,
          }}
        >
          {isComplete ? (
            <CheckCircle2 size={20} style={{ color: 'var(--tls-success-base)' }} />
          ) : !isOnTrack ? (
            <AlertCircle size={20} style={{ color: 'var(--tls-danger-base)' }} />
          ) : null}
        </div>
      </div>

      {/* Progress bar */}
      <div
        style={{
          width: '100%',
          height: size === 'sm' ? '6px' : '8px',
          backgroundColor: 'rgba(255, 255, 255, 0.5)',
          borderRadius: 'var(--r-xs)',
          overflow: 'hidden',
          marginBottom: 'var(--s-2)',
          border: `1px solid ${themeColors.border}40`,
        }}
      >
        <div
          style={{
            height: '100%',
            width: `${Math.min(100, percentComplete)}%`,
            backgroundColor: themeColors.bar,
            transition: 'width var(--dur-3) var(--ease-standard)',
            borderRadius: 'var(--r-xs)',
          }}
        />
      </div>

      {/* Details row: Percentage + Time remaining */}
      {showDetails && (
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            fontSize: currentSize.descSize,
            color: 'var(--text-muted)',
          }}
        >
          <span style={{ fontWeight: 500 }}>{Math.round(percentComplete)}% complete</span>
          <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
            <Clock size={14} />
            {timeRemaining}
          </span>
        </div>
      )}

      {/* On-track status message */}
      {!isOnTrack && (
        <div
          style={{
            marginTop: 'var(--s-2)',
            paddingTop: 'var(--s-2)',
            borderTop: `1px solid ${themeColors.border}`,
            fontSize: 'var(--t-caption)',
            color: 'var(--tls-danger-base)',
            fontWeight: 500,
          }}
        >
          ⚠️ Behind schedule — increase learning pace to catch up
        </div>
      )}

      {isComplete && (
        <div
          style={{
            marginTop: 'var(--s-2)',
            paddingTop: 'var(--s-2)',
            borderTop: `1px solid ${themeColors.border}`,
            fontSize: 'var(--t-caption)',
            color: 'var(--tls-success-base)',
            fontWeight: 500,
          }}
        >
          ✨ Goal completed! What's next?
        </div>
      )}
    </div>
  );
};

export default GoalProgress;
