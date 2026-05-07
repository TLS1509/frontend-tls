import React from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';

/**
 * KPICard — standalone KPI / statistic card
 * Tones: default | brand | warm | sun | success
 * Sizes: sm | md
 */

export type KPICardTone = 'default' | 'brand' | 'warm' | 'sun' | 'success';
export type KPICardSize = 'sm' | 'md';

export interface KPICardProps {
  value: string | number;
  label: string;
  icon?: React.ReactNode;
  trend?: {
    value: number;
    direction: 'up' | 'down';
    label?: string;
  };
  tone?: KPICardTone;
  size?: KPICardSize;
  onClick?: () => void;
  className?: string;
}

const SIZE_CLASSES: Record<KPICardSize, string> = {
  sm: 'px-4 pt-4 pb-3',
  md: 'py-5 px-4',
};

const TONE_ICON_CLASSES: Record<KPICardTone, string> = {
  default: 'bg-ink-50 text-ink-500',
  brand:   'bg-primary-50 text-primary-600',
  warm:    'bg-secondary-50 text-secondary-600',
  sun:     'bg-accent-50 text-accent-600',
  success: 'bg-success-bg text-success-fg',
};

const TONE_VALUE_CLASSES: Record<KPICardTone, string> = {
  default: 'text-primary-700',
  brand:   'text-primary-700',
  warm:    'text-secondary-600',
  sun:     'text-accent-700',
  success: 'text-success-fg',
};

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
  const interactive = !!onClick;
  const classes = [
    'flex flex-col gap-3 rounded-lg bg-white border border-ink-200 transition-all',
    SIZE_CLASSES[size],
    interactive && 'cursor-pointer hover:border-ink-300 hover:shadow-sm active:scale-[0.98]',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  const trendColor = trend?.direction === 'up' ? 'text-success-fg' : 'text-danger-fg';
  const TrendIcon = trend?.direction === 'up' ? TrendingUp : TrendingDown;

  return (
    <div
      className={classes}
      onClick={onClick}
      role={interactive ? 'button' : undefined}
      tabIndex={interactive ? 0 : undefined}
      onKeyDown={interactive ? (e) => { if (e.key === 'Enter' || e.key === ' ') onClick(); } : undefined}
    >
      {icon && (
        <div className={`flex items-center justify-center w-10 h-10 rounded-md shrink-0 ${TONE_ICON_CLASSES[tone]}`}>
          {icon}
        </div>
      )}
      <strong className={`text-h2 font-bold leading-none ${TONE_VALUE_CLASSES[tone]}`}>
        {value}
      </strong>
      <span className="text-body-sm text-ink-600 font-medium">{label}</span>
      {trend && (
        <span className={`text-micro font-bold mt-1 inline-flex items-center gap-1 ${trendColor}`}>
          <TrendIcon size={12} strokeWidth={2.5} /> {Math.abs(trend.value)}%{trend.label ? ` ${trend.label}` : ''}
        </span>
      )}
    </div>
  );
};

export default KPICard;
