import React from 'react';
import { Search } from 'lucide-react';

export type EmptyStateTone = 'default' | 'warm' | 'danger';

export interface EmptyStateProps {
  tone?: EmptyStateTone;
  icon?: React.ReactNode;
  title: React.ReactNode;
  description?: React.ReactNode;
  /** Primary + secondary actions (Button components) */
  actions?: React.ReactNode;
  className?: string;
}

const TONE_ICON_BG: Record<EmptyStateTone, string> = {
  default: 'bg-gradient-to-br from-primary-50 to-primary-100 text-primary-700',
  warm:    'bg-gradient-to-br from-secondary-50 to-secondary-100 text-secondary-700',
  danger:  'bg-gradient-to-br from-danger-bg to-danger-base/15 text-danger-fg',
};

const TONE_RING: Record<EmptyStateTone, string> = {
  default: 'ring-primary-100 shadow-brand-sm',
  warm:    'ring-secondary-100 shadow-md',
  danger:  'ring-danger-bg shadow-md',
};

export const EmptyState: React.FC<EmptyStateProps> = ({
  tone = 'default',
  icon,
  title,
  description,
  actions,
  className = '',
}) => {
  /* Anatomie (passe typographique du 2026-09-24) : icône · 16 · titre h3
     20/26/700 · 8 · texte 16/26 ink-700 · 24 · actions. Centré : c'est le
     seul cas où la doctrine l'admet (§ 3, état vide) — et seulement pour deux
     lignes au plus. D'où `max-w-prose` (65 caractères) plutôt que les 440 px
     d'avant (≈ 50 caractères), qui faisaient passer à la ligne plus tôt, et
     `text-balance`, qui équilibre les deux lignes. Padding sur l'échelle
     (48 / 24 : `py-14`, 56 px, n'en était pas un pas). */
  const containerClasses = [
    'flex flex-col items-center text-center px-stack-lg py-page gap-stack rounded-xl bg-ink-50/40 border border-dashed border-ink-200',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  const iconWrapperClasses = [
    'inline-flex items-center justify-center w-20 h-20 rounded-2xl ring-8 transition-transform',
    TONE_ICON_BG[tone],
    TONE_RING[tone],
  ].join(' ');

  return (
    <div className={containerClasses}>
      <span className={iconWrapperClasses} aria-hidden="true">
        {icon ?? <Search size={32} strokeWidth={1.75} />}
      </span>
      <div className="flex flex-col items-center gap-stack-xs max-w-prose">
        <h3 className="font-display text-h3 text-ink-900 text-balance">
          {title}
        </h3>
        {description && (
          <p className="font-body text-body text-ink-700 text-balance">{description}</p>
        )}
      </div>
      {actions && (
        <div className="flex items-center justify-center gap-stack-xs flex-wrap mt-stack-xs">{actions}</div>
      )}
    </div>
  );
};

export default EmptyState;
