import React from 'react';

export type MetaItemSize = 'sm' | 'md';
export type MetaItemTone = 'muted' | 'brand' | 'warm';

interface MetaItemProps {
  label: string;
  value: React.ReactNode;
  icon?: React.ReactNode;
  size?: MetaItemSize;
  tone?: MetaItemTone;
  className?: string;
}

const SIZE_LABEL: Record<MetaItemSize, string> = {
  sm: 'text-micro',
  md: 'text-caption',
};

const SIZE_VALUE: Record<MetaItemSize, string> = {
  sm: 'text-caption',
  md: 'text-body-sm',
};

const TONE_VALUE: Record<MetaItemTone, string> = {
  muted: 'text-ink-900',
  brand: 'text-primary-700',
  warm:  'text-secondary-600',
};

export const MetaItem: React.FC<MetaItemProps> = ({
  label,
  value,
  icon,
  size = 'md',
  tone = 'muted',
  className = '',
}) => {
  const classes = [
    'flex flex-col gap-0.5',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={classes}>
      <span
        className={`inline-flex items-center gap-tight font-medium uppercase tracking-wider text-ink-500 ${SIZE_LABEL[size]}`}
      >
        {icon && <span className="inline-flex items-center shrink-0">{icon}</span>}
        {label}
      </span>
      <span className={`font-semibold ${SIZE_VALUE[size]} ${TONE_VALUE[tone]}`}>{value}</span>
    </div>
  );
};

export default MetaItem;
