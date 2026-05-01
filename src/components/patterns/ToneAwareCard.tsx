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

const TONE_STYLES: Record<Tone, React.CSSProperties> = {
  primary: {
    background: 'var(--tls-primary-50)',
    border: '1px solid rgba(85, 161, 180, 0.2)',
  },
  warm: {
    background: 'var(--tls-orange-50)',
    border: '1px solid rgba(237, 132, 58, 0.2)',
  },
  sun: {
    background: 'var(--tls-yellow-50)',
    border: '1px solid rgba(248, 176, 68, 0.25)',
  },
};

export const ToneAwareCard: React.FC<ToneAwareCardProps> = ({
  children,
  tone,
  applyBackground = true,
  borderRadius = 'var(--r-xl)',
  padding,
  className = '',
  style,
  onClick,
}) => {
  const toneStyle = applyBackground ? TONE_STYLES[tone] : {};

  return (
    <div
      className={`tone-card--${tone} ${className}`}
      style={{
        borderRadius,
        padding,
        cursor: onClick ? 'pointer' : undefined,
        transition: onClick ? 'transform var(--dur-2) var(--ease-standard), box-shadow var(--dur-2)' : undefined,
        ...toneStyle,
        ...style,
      }}
      onClick={onClick}
    >
      {children}
    </div>
  );
};
