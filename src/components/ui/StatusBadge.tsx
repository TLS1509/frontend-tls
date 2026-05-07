import React from 'react';
import { Lock, Circle, Play, Check, X } from 'lucide-react';

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
  locked: 'Verrouillé',
  available: 'Disponible',
  'in-progress': 'En cours',
  completed: 'Terminé',
  failed: 'Échoué',
};

const STATUS_CLASSES: Record<StatusBadgeStatus, string> = {
  locked:        'bg-ink-100 text-ink-500 border-ink-200',
  available:     'bg-primary-50 text-primary-700 border-primary-200',
  'in-progress': 'bg-primary-100 text-primary-800 border-primary-300 shadow-brand-xs',
  completed:     'bg-success-bg text-success-fg border-success-base/30',
  failed:        'bg-danger-bg text-danger-fg border-danger-base/30',
};

const SIZE_CLASSES: Record<'sm' | 'md', string> = {
  sm: 'text-micro px-1.5 py-0.5 gap-1',
  md: 'text-caption px-2 py-1 gap-1.5',
};

const ICON_SIZE: Record<'sm' | 'md', number> = { sm: 10, md: 12 };

const StatusIcon: React.FC<{ status: StatusBadgeStatus; size: number }> = ({ status, size }) => {
  const props = { size, strokeWidth: 2 };
  switch (status) {
    case 'locked':      return <Lock {...props} />;
    case 'available':   return <Circle {...props} />;
    case 'in-progress': return <Play size={size} fill="currentColor" strokeWidth={0} />;
    case 'completed':   return <Check {...props} strokeWidth={2.5} />;
    case 'failed':      return <X {...props} strokeWidth={2.5} />;
  }
};

export const StatusBadge: React.FC<StatusBadgeProps> = ({
  status,
  showLabel = false,
  size = 'md',
  className = '',
}) => {
  const iconSize = ICON_SIZE[size];
  const label = STATUS_LABELS[status];

  const classes = [
    'inline-flex items-center justify-center font-semibold border rounded-pill whitespace-nowrap',
    SIZE_CLASSES[size],
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

export default StatusBadge;
