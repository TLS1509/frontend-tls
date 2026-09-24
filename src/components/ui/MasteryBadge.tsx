import React from 'react';
import { Sprout, Zap, Flame, Trophy } from 'lucide-react';
import { MetaPill, type MetaPillTone } from './MetaPill';

export type MasteryLevel = 'beginner' | 'intermediate' | 'advanced' | 'expert';

export interface MasteryBadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  level: MasteryLevel;
  icon?: React.ReactNode;
  label?: string;
  progress?: number;
}

/* Icônes Lucide — elles remplacent quatre emojis (pousse, éclair, flamme,
   trophée ; passe du 2026-09-24). Un emoji porte sa propre couleur et son
   propre dessin, que la palette ne règle pas ; le glyphe prend ici la couleur
   du niveau. */
const LEVEL_DEFAULTS: Record<MasteryLevel, { icon: React.ReactNode; label: string }> = {
  beginner:     { icon: <Sprout strokeWidth={1.75} />, label: 'Débutant' },
  intermediate: { icon: <Zap strokeWidth={1.75} />,    label: 'Intermédiaire' },
  advanced:     { icon: <Flame strokeWidth={1.75} />,  label: 'Avancé' },
  expert:       { icon: <Trophy strokeWidth={1.75} />, label: 'Expert' },
};

const LEVEL_RING: Record<MasteryLevel, string> = {
  beginner:     'text-success-base',
  intermediate: 'text-primary-500',
  advanced:     'text-secondary-500',
  expert:       'text-accent-500',
};

const LEVEL_BG: Record<MasteryLevel, string> = {
  beginner:     'bg-gradient-to-br from-success-bg to-white shadow-md',
  intermediate: 'bg-gradient-to-br from-primary-50 to-white shadow-brand-sm',
  advanced:     'bg-gradient-to-br from-secondary-50 to-white shadow-md',
  expert:       'bg-gradient-to-br from-accent-50 to-white shadow-md',
};

/* Couleur du glyphe central (un objet graphique : 3:1 suffit). */
const LEVEL_ICON: Record<MasteryLevel, string> = {
  beginner:     'text-success-fg',
  intermediate: 'text-primary-700',
  advanced:     'text-secondary-700',
  expert:       'text-accent-700',
};

/* Le libellé est une DONNÉE — le nom de la compétence (« Prompt
   Engineering »), ou le niveau par défaut : MetaPill, pas une étiquette en
   capitales (arbitrages n°14 et 15). Il était fait main, en 700 et en
   capitales espacées : il criait plus fort que l'anneau qu'il légende. */
const LEVEL_PILL_TONE: Record<MasteryLevel, MetaPillTone> = {
  beginner:     'success',
  intermediate: 'primary',
  advanced:     'warm',
  expert:       'sun',
};

export const MasteryBadge: React.FC<MasteryBadgeProps> = ({
  level,
  icon,
  label,
  progress = 100,
  className = '',
  ...rest
}) => {
  const defaults = LEVEL_DEFAULTS[level];
  const pct = Math.min(Math.max(progress, 0), 100);
  const radius = 38;
  const circumference = 2 * Math.PI * radius;
  const dashOffset = circumference - (pct / 100) * circumference;

  const classes = ['inline-flex flex-col items-center gap-stack-xs', className]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={classes} {...rest}>
      <div className="relative w-[96px] h-[96px]">
        <svg
          viewBox="0 0 96 96"
          className={`w-full h-full -rotate-90 ${LEVEL_RING[level]}`}
          aria-hidden="true"
        >
          <circle
            cx="48"
            cy="48"
            r={radius}
            fill="none"
            stroke="currentColor"
            strokeOpacity="0.12"
            strokeWidth="6"
          />
          <circle
            cx="48"
            cy="48"
            r={radius}
            fill="none"
            stroke="currentColor"
            strokeWidth="6"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={dashOffset}
            className="transition-[stroke-dashoffset] duration-700"
          />
        </svg>
        <div
          className={[
            'absolute inset-2 rounded-pill inline-flex items-center justify-center',
            LEVEL_BG[level],
            LEVEL_ICON[level],
          ].join(' ')}
        >
          <span className="inline-flex items-center justify-center icon-2xl [&>svg]:w-full [&>svg]:h-full" aria-hidden="true">
            {icon ?? defaults.icon}
          </span>
        </div>
      </div>
      <MetaPill text={label ?? defaults.label} tone={LEVEL_PILL_TONE[level]} size="md" />
    </div>
  );
};

export default MasteryBadge;
