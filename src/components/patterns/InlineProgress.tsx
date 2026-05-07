import React from 'react';
import { ProgressBar, type ProgressFill } from '../ui/ProgressBar';

export type InlineProgressTone = 'primary' | 'warm' | 'sun';
export type InlineProgressSize = 'sm' | 'md';

export interface InlineProgressProps {
  value: number;
  tone?: InlineProgressTone;
  showLabel?: boolean;
  size?: InlineProgressSize;
  className?: string;
}

const TONE_FILL: Record<InlineProgressTone, ProgressFill> = {
  primary: 'brand',
  warm:    'warm',
  sun:     'sun',
};

/**
 * @deprecated Use `<ProgressBar layout="inline" />` directly.
 * Kept as a thin alias for backward-compatibility.
 */
export const InlineProgress: React.FC<InlineProgressProps> = ({
  value,
  tone = 'primary',
  showLabel = true,
  size = 'md',
  className = '',
}) => (
  <ProgressBar
    value={value}
    layout="inline"
    fill={TONE_FILL[tone]}
    size={size}
    valueLabel={showLabel ? undefined : false}
    className={className}
  />
);

export default InlineProgress;
