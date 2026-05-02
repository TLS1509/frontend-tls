import React from 'react';
import './KPICard.css';

/**
 * KPICard — standalone KPI / statistic card
 *
 * Wraps the .tls-kpi + .tls-kpi-icon pattern into a reusable component.
 * Tone variants apply a color accent to the icon background and value text.
 *
 * Tones: default | brand | warm | sun | success
 * Sizes: sm | md
 */

export type KPICardTone = 'default' | 'brand' | 'warm' | 'sun' | 'success';
export type KPICardSize = 'sm' | 'md';

export interface KPICardProps {
  /** Main metric value displayed prominently */
  value: string | number;
  /** Descriptive label below the value */
  label: string;
  /** Optional icon rendered above the value */
  icon?: React.ReactNode;
  /** Optional trend indicator */
  trend?: {
    value: number;
    direction: 'up' | 'down';
    label?: string;
  };
  /** Color tone */
  tone?: KPICardTone;
  /** Card size */
  size?: KPICardSize;
  /** Make card interactive */
  onClick?: () => void;
  className?: string;
}

// Tone variants are now handled by CSS classes (.tls-kpi--{tone})

export const KPICard: React.FC<KPICardProps> = ({
  value,
  label,
  icon,
  trend,
  tone = 'default',
  size = 'md',
  onClick,
  className = '',
}) => {
  const classes = [
    'tls-kpi',
    size === 'sm' && 'tls-kpi--sm',
    tone !== 'default' && `tls-kpi--${tone}`,
    onClick && 'tls-kpi--clickable',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  const trendSign = trend?.direction === 'up' ? '↑' : '↓';

  return (
    <div
      className={classes}
      onClick={onClick}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
      onKeyDown={onClick ? (e) => { if (e.key === 'Enter' || e.key === ' ') onClick(); } : undefined}
    >
      {icon && (
        <div className="tls-kpi-icon">
          {icon}
        </div>
      )}
      <strong>
        {value}
      </strong>
      <span>{label}</span>
      {trend && (
        <span className={`tls-kpi-trend ${trend.direction === 'up' ? 'tls-kpi-trend--up' : 'tls-kpi-trend--down'}`}>
          {trendSign} {Math.abs(trend.value)}%{trend.label ? ` ${trend.label}` : ''}
        </span>
      )}
    </div>
  );
};

export default KPICard;
