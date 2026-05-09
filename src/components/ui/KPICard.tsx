import React from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';
import { StatCard } from './StatCard';
import type { StatCardSize, StatCardVariant } from './StatCard';

/**
 * KPICard — DEPRECATED thin alias of StatCard.
 *
 * Kept for backward compatibility. New code should use StatCard directly:
 *   <StatCard
 *     icon={...}
 *     value="12"
 *     label="Cours terminés"
 *     variant="brand"
 *     delta="+2% ce mois"
 *     deltaDirection="up"
 *   />
 *
 * Maps:
 *   tone='default'  → variant='default'
 *   tone='brand'    → variant='brand'
 *   tone='warm'     → variant='warm'
 *   tone='sun'      → variant='sun'
 *   tone='success'  → variant='default' (StatCard has no success variant —
 *                      we layer a subtle success bg via className)
 *   trend.value+direction → delta + deltaDirection (with TrendIcon prefix)
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

const TONE_TO_VARIANT: Record<KPICardTone, StatCardVariant> = {
  default: 'default',
  brand:   'brand',
  warm:    'warm',
  sun:     'sun',
  success: 'default', // StatCard has no success variant; class override below
};

const SIZE_MAP: Record<KPICardSize, StatCardSize> = { sm: 'sm', md: 'md' };

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
  const variant = TONE_TO_VARIANT[tone];
  const TrendIcon = trend?.direction === 'up' ? TrendingUp : TrendingDown;

  const delta = trend ? (
    <span className="inline-flex items-center gap-1">
      <TrendIcon size={12} strokeWidth={2.5} />
      {Math.abs(trend.value)}%{trend.label ? ` ${trend.label}` : ''}
    </span>
  ) : undefined;

  // Layer a subtle success bg if the legacy tone='success' was used
  const extraClass = tone === 'success' ? 'bg-success-bg border-success-base/30' : '';
  const interactiveClass = onClick
    ? 'cursor-pointer hover:border-ink-300 hover:shadow-sm active:scale-[0.98] transition-all'
    : '';

  return (
    <StatCard
      icon={icon}
      label={label}
      value={value}
      delta={delta}
      deltaDirection={trend?.direction}
      variant={variant}
      size={SIZE_MAP[size]}
      className={[extraClass, interactiveClass, className].filter(Boolean).join(' ')}
      onClick={onClick}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
      onKeyDown={onClick ? (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onClick();
        }
      } : undefined}
    />
  );
};

export default KPICard;
