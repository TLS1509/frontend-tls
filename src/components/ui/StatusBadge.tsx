import React from 'react';
import './StatusBadge.css';

/**
 * StatusBadge — status indicator for learning paths, lessons, sessions, etc.
 *
 * 5 semantic states with distinct icon + color treatment:
 * - locked      → gray, lock icon
 * - available   → brand/teal, circle icon
 * - in-progress → brand glow, play icon
 * - completed   → success green, check icon
 * - failed      → error red, X icon
 *
 * Uses CSS classes for all visual logic (no inline styles).
 */

export type StatusBadgeStatus =
  | 'locked'
  | 'available'
  | 'in-progress'
  | 'completed'
  | 'failed';

export interface StatusBadgeProps {
  status: StatusBadgeStatus;
  /** Show the text label alongside the icon */
  showLabel?: boolean;
  /** Size variant */
  size?: 'sm' | 'md';
  className?: string;
}

/* ---- SVG icons per state ---- */

function LockIcon({ size }: { size: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <rect x="3" y="7" width="10" height="8" rx="2" stroke="currentColor" strokeWidth="1.6" />
      <path d="M5 7V5a3 3 0 0 1 6 0v2" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}

function CircleIcon({ size }: { size: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <circle cx="8" cy="8" r="6" stroke="currentColor" strokeWidth="1.8" />
    </svg>
  );
}

function PlayIcon({ size }: { size: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
      <path d="M5 3.5l8 4.5-8 4.5V3.5z" />
    </svg>
  );
}

function CheckIcon({ size }: { size: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path d="M3 8l4 4 6-7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function XIcon({ size }: { size: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path d="M4 4l8 8M12 4l-8 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

const STATUS_LABELS: Record<StatusBadgeStatus, string> = {
  locked: 'Verrouillé',
  available: 'Disponible',
  'in-progress': 'En cours',
  completed: 'Terminé',
  failed: 'Échoué',
};

const ICON_SIZES = { sm: 10, md: 12 };

function getIcon(status: StatusBadgeStatus, iconSize: number): React.ReactNode {
  switch (status) {
    case 'locked':      return <LockIcon size={iconSize} />;
    case 'available':   return <CircleIcon size={iconSize} />;
    case 'in-progress': return <PlayIcon size={iconSize} />;
    case 'completed':   return <CheckIcon size={iconSize} />;
    case 'failed':      return <XIcon size={iconSize} />;
  }
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({
  status,
  showLabel = false,
  size = 'md',
  className = '',
}) => {
  const iconSize = ICON_SIZES[size];
  const label = STATUS_LABELS[status];
  const icon = getIcon(status, iconSize);

  const classes = [
    'status-badge',
    `status-badge--${size}`,
    `status-badge--${status}`,
    !showLabel && 'status-badge--icon-only',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <span
      className={classes}
      role="status"
      aria-label={label}
    >
      {icon}
      {showLabel && <span>{label}</span>}
    </span>
  );
};

export default StatusBadge;
