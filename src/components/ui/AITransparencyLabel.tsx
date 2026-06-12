import React from 'react';
import { Sparkles } from 'lucide-react';

// ─── Types ──────────────────────────────────────────────────────────────────

export type AILabelVariant = 'recommended' | 'generated' | 'assisted';
export type AILabelSize = 'sm' | 'md';

export interface AITransparencyLabelProps {
  /** Nature of the AI involvement */
  variant?: AILabelVariant;
  size?: AILabelSize;
  className?: string;
}

// ─── Config ───────────────────────────────────────────────────────────────────

const VARIANT_CONFIG: Record<AILabelVariant, { label: string; classes: string }> = {
  recommended: {
    label: 'Recommandé par l\'IA',
    classes: 'bg-info-bg text-info-fg border border-info-border',
  },
  generated: {
    label: 'Généré par l\'IA',
    classes: 'bg-warning-bg text-warning-fg border border-warning-border',
  },
  assisted: {
    label: 'Assisté par l\'IA',
    classes: 'bg-ink-50 text-ink-600 border border-ink-200',
  },
};

const SIZE_CLASSES: Record<AILabelSize, string> = {
  sm: 'text-micro px-1.5 py-0.5 rounded-xs gap-0.5',
  md: 'text-caption px-2.5 py-1 rounded-md gap-tight',
};

const ICON_SIZE: Record<AILabelSize, number> = { sm: 10, md: 12 };

// ─── AITransparencyLabel ─────────────────────────────────────────────────────

export const AITransparencyLabel: React.FC<AITransparencyLabelProps> = ({
  variant = 'recommended',
  size = 'sm',
  className = '',
}) => {
  const { label, classes } = VARIANT_CONFIG[variant];
  const sizeClass = SIZE_CLASSES[size];
  const iconSize = ICON_SIZE[size];

  return (
    <span
      className={[
        'inline-flex items-center font-medium shrink-0',
        classes,
        sizeClass,
        className,
      ].filter(Boolean).join(' ')}
      aria-label={label}
      title={label}
    >
      <Sparkles size={iconSize} aria-hidden />
      {label}
    </span>
  );
};

export default AITransparencyLabel;
