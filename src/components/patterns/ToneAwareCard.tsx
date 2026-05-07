import React from 'react';

export type Tone = 'primary' | 'warm' | 'sun';

export interface ToneAwareCardProps {
  children: React.ReactNode;
  tone: Tone;
  /** Apply background + border automatically (default true) */
  applyBackground?: boolean;
  borderRadius?: string;
  padding?: string;
  className?: string;
  style?: React.CSSProperties;
  onClick?: () => void;
}

const TONE_CLASSES: Record<Tone, string> = {
  primary: 'bg-gradient-to-br from-primary-50/95 to-primary-100/60 border border-primary-200/60 shadow-xs',
  warm:    'bg-gradient-to-br from-secondary-50/95 to-secondary-100/60 border border-secondary-200/60 shadow-xs',
  sun:     'bg-gradient-to-br from-accent-50/95 to-accent-100/60 border border-accent-200/60 shadow-xs',
};

export const ToneAwareCard: React.FC<ToneAwareCardProps> = ({
  children,
  tone,
  applyBackground = true,
  borderRadius,
  padding,
  className = '',
  style,
  onClick,
}) => {
  const wrapperStyle: React.CSSProperties = {
    ...(borderRadius ? { borderRadius } : {}),
    ...(padding ? { padding } : {}),
    ...style,
  };

  const classes = [
    `tone-card--${tone} rounded-2xl`,
    applyBackground ? TONE_CLASSES[tone] : '',
    onClick ? 'cursor-pointer transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={classes} style={wrapperStyle} onClick={onClick}>
      {children}
    </div>
  );
};

export default ToneAwareCard;
