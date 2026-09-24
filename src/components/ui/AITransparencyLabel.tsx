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

/* Icône ↔ mot : 4 px, le pas « dans une ligne » (doctrine § 5) — 2 px
   (`gap-tight`) ne sépare que deux lignes d'un même énoncé. */
const SIZE_CLASSES: Record<AILabelSize, string> = {
  sm: 'text-micro px-1.5 py-0.5 gap-stack-3xs',
  md: 'text-caption px-2.5 py-1 gap-stack-3xs',
};

/* Le rayon suit la règle du seuil (R3) : `sm` fait 24 px de haut, sous 28 —
   la pilule (il était à 4 px, un rectangle) ; `md` en fait 30, au-dessus —
   l'échelle, 14 (il était à 10, un cran sans étage). Hors de SIZE_CLASSES :
   une seule classe de rayon par élément (piège n°6). */
const RAYON: Record<AILabelSize, string> = {
  sm: 'rounded-pill',
  md: 'rounded-lg',
};

/* 14 px aux deux tailles : le plancher de l'échelle d'icônes (`icon-2xs`),
   apparié à la légende (13) comme à l'étiquette (11). Elles étaient à 10 et
   12, hors de l'échelle. */
const ICON_SIZE: Record<AILabelSize, number> = { sm: 14, md: 14 };

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
        RAYON[size],
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
