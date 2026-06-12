import React from 'react';
import { Lock, Circle, Play, Check, X, TrendingUp, Star, Sparkles, Award, Zap } from 'lucide-react';

// ─── Badge (status text) ───────────────────────────────────────────────────

export type BadgeVariant =
  | 'brand'
  | 'neutral'
  | 'warm'
  | 'sun'
  | 'success'
  | 'danger'
  | 'info';

export type BadgeSize = 'sm' | 'md' | 'lg';

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant;
  size?: BadgeSize;
  dot?: boolean;
  text?: React.ReactNode;
  /** @deprecated Use variant. `primary` maps to `brand`. */
  color?: BadgeVariant | 'primary';
}

const mapLegacyColor = (color?: BadgeVariant | 'primary'): BadgeVariant => {
  if (color === 'primary' || !color) return 'brand';
  return color;
};

const BASE =
  'inline-flex items-center gap-tight rounded-pill font-body font-bold uppercase leading-tight whitespace-nowrap border';

const SIZE_CLASSES: Record<BadgeSize, string> = {
  sm: 'text-[10px] px-2 py-0.5 tracking-[0.06em]',
  md: 'text-micro px-2.5 py-0.5 tracking-[0.05em]',
  lg: 'text-caption px-3 py-1 tracking-[0.04em]',
};

const VARIANT_CLASSES: Record<BadgeVariant, string> = {
  brand:    'bg-primary-50 text-primary-800 border-primary-200',
  neutral:  'bg-ink-50 text-ink-700 border-ink-200',
  warm:     'bg-secondary-50 text-secondary-700 border-secondary-200',
  sun:      'bg-accent-50 text-accent-800 border-accent-200',
  success:  'bg-success-bg text-success-fg border-success-base/30',
  danger:   'bg-danger-bg text-danger-fg border-danger-base/30',
  info:     'bg-info-bg text-info-fg border-info-base/30',
};

const DOT_CLASSES: Record<BadgeVariant, string> = {
  brand:    'bg-primary-500',
  neutral:  'bg-ink-400',
  warm:     'bg-secondary-500',
  sun:      'bg-accent-500',
  success:  'bg-success-base',
  danger:   'bg-danger-base',
  info:     'bg-info-base',
};

export const Badge: React.FC<BadgeProps> = ({
  variant,
  color,
  size = 'md',
  dot = false,
  text,
  className = '',
  children,
  ...rest
}) => {
  const resolvedVariant: BadgeVariant = variant ?? mapLegacyColor(color);
  const classes = [BASE, SIZE_CLASSES[size], VARIANT_CLASSES[resolvedVariant], className]
    .filter(Boolean)
    .join(' ');

  return (
    <span className={classes} {...rest}>
      {dot && (
        <span
          aria-hidden
          className={`w-1.5 h-1.5 rounded-full shrink-0 ${DOT_CLASSES[resolvedVariant]}`}
        />
      )}
      {children ?? text}
    </span>
  );
};

export default Badge;

// ─── StatusBadge (lesson state indicator with icon) ────────────────────────

export type StatusBadgeStatus =
  | 'locked'
  | 'available'
  | 'in-progress'
  | 'completed'
  | 'failed';

export interface StatusBadgeProps {
  status: StatusBadgeStatus;
  showLabel?: boolean;
  size?: 'sm' | 'md';
  className?: string;
}

const STATUS_LABELS: Record<StatusBadgeStatus, string> = {
  locked:       'Verrouillé',
  available:    'Disponible',
  'in-progress':'En cours',
  completed:    'Terminé',
  failed:       'Échoué',
};

const STATUS_CLASSES: Record<StatusBadgeStatus, string> = {
  locked:        'bg-ink-100 text-ink-500 border-ink-200',
  available:     'bg-primary-50 text-primary-700 border-primary-200',
  'in-progress': 'bg-primary-100 text-primary-800 border-primary-300 shadow-brand-xs',
  completed:     'bg-success-bg text-success-fg border-success-base/30',
  failed:        'bg-danger-bg text-danger-fg border-danger-base/30',
};

const STATUS_SIZE_CLASSES: Record<'sm' | 'md', string> = {
  sm: 'text-micro px-1.5 py-0.5 gap-1',
  md: 'text-caption px-2 py-1 gap-1.5',
};

const STATUS_ICON_SIZE: Record<'sm' | 'md', number> = { sm: 10, md: 12 };

const StatusIcon: React.FC<{ status: StatusBadgeStatus; size: number }> = ({ status, size }) => {
  const props = { size, strokeWidth: 2 };
  switch (status) {
    case 'locked':       return <Lock {...props} />;
    case 'available':    return <Circle {...props} />;
    case 'in-progress':  return <Play size={size} fill="currentColor" strokeWidth={0} />;
    case 'completed':    return <Check {...props} strokeWidth={2.5} />;
    case 'failed':       return <X {...props} strokeWidth={2.5} />;
  }
};

export const StatusBadge: React.FC<StatusBadgeProps> = ({
  status,
  showLabel = false,
  size = 'md',
  className = '',
}) => {
  const iconSize = STATUS_ICON_SIZE[size];
  const label = STATUS_LABELS[status];

  const classes = [
    'inline-flex items-center justify-center font-semibold border rounded-pill whitespace-nowrap',
    STATUS_SIZE_CLASSES[size],
    STATUS_CLASSES[status],
    !showLabel && 'aspect-square px-0',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <span className={classes} role="status" aria-label={label}>
      <StatusIcon status={status} size={iconSize} />
      {showLabel && <span>{label}</span>}
    </span>
  );
};

// ─── TrendingBadge (promotional gradient badge with pulse) ─────────────────

export type PromoType = 'trending' | 'popular' | 'recommended' | 'featured' | 'new';

export interface TrendingBadgeProps {
  type: PromoType;
  size?: 'sm' | 'md';
  animated?: boolean;
  count?: number;
}

const PROMO_ICONS: Record<PromoType, React.ElementType> = {
  trending:    TrendingUp,
  popular:     Star,
  recommended: Sparkles,
  featured:    Award,
  new:         Zap,
};

const PROMO_LABELS: Record<PromoType, string> = {
  trending:    'Trending',
  popular:     'Popular',
  recommended: 'For You',
  featured:    'Featured',
  new:         'New',
};

const PROMO_CLASSES: Record<PromoType, string> = {
  trending:    'bg-gradient-to-br from-secondary-500 to-secondary-600 text-white',
  popular:     'bg-gradient-to-br from-accent-500 to-accent-600 text-white',
  recommended: 'bg-gradient-to-br from-primary-500 to-primary-600 text-white',
  featured:    'bg-gradient-to-br from-primary-700 to-primary-900 text-white',
  new:         'bg-gradient-to-br from-success-base to-success-fg text-white',
};

const PROMO_SIZE_CLASSES: Record<'sm' | 'md', string> = {
  sm: 'text-micro px-2 py-0.5 gap-1',
  md: 'text-caption px-2.5 py-1 gap-1.5',
};

const PROMO_ICON_SIZES: Record<'sm' | 'md', number> = { sm: 12, md: 14 };

const PROMO_COUNT_CLASSES: Record<'sm' | 'md', string> = {
  sm: 'text-[10px] px-1 ml-0.5',
  md: 'text-micro px-1.5 ml-1',
};

export const TrendingBadge: React.FC<TrendingBadgeProps> = ({
  type,
  size = 'md',
  animated = true,
  count,
}) => {
  const Icon = PROMO_ICONS[type];
  const iconSize = PROMO_ICON_SIZES[size];

  const classes = [
    'inline-flex items-center font-bold rounded-pill shadow-sm whitespace-nowrap',
    PROMO_SIZE_CLASSES[size],
    PROMO_CLASSES[type],
    animated && 'animate-pulse-slow',
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={classes}>
      <Icon size={iconSize} aria-hidden="true" />
      <span>{PROMO_LABELS[type]}</span>
      {count != null && (
        <span
          className={`inline-flex items-center justify-center bg-white/25 rounded-pill font-bold ${PROMO_COUNT_CLASSES[size]}`}
        >
          {count}
        </span>
      )}
    </div>
  );
};
