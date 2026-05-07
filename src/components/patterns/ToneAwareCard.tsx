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
  primary: 'bg-primary-50 border border-primary-200',
  warm:    'bg-secondary-50 border border-secondary-200',
  sun:     'bg-accent-50 border border-accent-200',
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
    `tone-card--${tone}`,
    applyBackground ? TONE_CLASSES[tone] : '',
    onClick ? 'cursor-pointer transition-all duration-200' : '',
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
