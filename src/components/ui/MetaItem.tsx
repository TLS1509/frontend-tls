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

/* Étiquette et valeur — passe typographique du 2026-09-24.

   L'étiquette était en capitales espacées (`uppercase tracking-wider`, 500,
   ink-500) : le registre qui crie, réservé à Badge, posé sur une donnée qui
   chuchote. Elle devient une légende — 13 px, casse normale, ink-600 — et c'est
   la valeur, en 600, qui porte le regard. Au cran `sm`, les deux restent à
   13 px : la graisse et la couleur suffisent à dire lequel est lequel. */
const SIZE_VALUE: Record<MetaItemSize, string> = {
  sm: 'text-caption',
  md: 'text-body',
};

/* Une couleur de marque ne porte du texte qu'au cran 800 (doctrine, § 2). */
const TONE_VALUE: Record<MetaItemTone, string> = {
  muted: 'text-ink-900',
  brand: 'text-primary-800',
  warm:  'text-secondary-800',
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
    'flex flex-col gap-stack-3xs',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={classes}>
      <span className="inline-flex items-center gap-stack-3xs text-caption text-ink-600">
        {icon && <span className="inline-flex items-center shrink-0">{icon}</span>}
        {label}
      </span>
      <span className={`font-semibold ${SIZE_VALUE[size]} ${TONE_VALUE[tone]}`}>{value}</span>
    </div>
  );
};

export default MetaItem;
