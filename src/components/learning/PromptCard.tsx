import React from 'react';
import { buttonClasses } from '../core/Button';
import { Badge } from '../ui/Badge';
import { ArrowRight } from 'lucide-react';
import type { BadgeVariant } from '../ui/Badge';

export type PromptCardSize = 'default' | 'featured';

export interface PromptCardProps {
  label: string;
  icon: React.ReactNode;
  text: string;
  /** Badge variant (color) — drives badge color AND card hover tinted bg. */
  variant?: BadgeVariant;
  /** Visual size — `default` is compact (grid items), `featured` is hero-sized for dashboard. */
  size?: PromptCardSize;
  /** CTA label override. */
  ctaLabel?: string;
  /** Show speech-bubble tail at bottom-right (default: true for compact size, false for featured). */
  bubble?: boolean;
  onClick?: () => void;
  onKeyDown?: (event: React.KeyboardEvent) => void;
  className?: string;
}

/**
 * Bulle de la famille chat (construction JournalBubbleCard, alignée le
 * 2026-09-17) : rayon conteneur (20), filet tonal, queue bordée — et AUCUNE
 * ombre, ni au repos (S2) ni au survol (règle carte du 16/09). L'ancienne
 * construction « borderless + drop-shadow silhouette » contredisait ces deux
 * décisions et donnait à la famille bulle un deuxième rayon (24).
 * Card body bg shifts to tone-tinted on hover.
 */
const VARIANT_HOVER_BG: Record<BadgeVariant, string> = {
  brand:   'group-hover:bg-primary-50/60',
  info:    'group-hover:bg-primary-50/60',
  warm:    'group-hover:bg-secondary-50/60',
  sun:     'group-hover:bg-accent-50/50',
  neutral: 'group-hover:bg-ink-50',
  success: 'group-hover:bg-success-bg/60',
  danger:  'group-hover:bg-danger-bg/60',
};

/**
 * CTA hover text color matches the variant's accent color.
 */
const VARIANT_CTA_HOVER: Record<BadgeVariant, string> = {
  brand:   'group-hover:text-primary-700',
  info:    'group-hover:text-primary-700',
  warm:    'group-hover:text-secondary-700',
  sun:     'group-hover:text-accent-700',
  neutral: 'group-hover:text-ink-700',
  success: 'group-hover:text-success-fg',
  danger:  'group-hover:text-danger-fg',
};

/** Filet au repos — 100 du ton (comme JournalChatCompose), neutre sinon. */
const VARIANT_BORDER: Record<BadgeVariant, string> = {
  brand:   'border-primary-100',
  info:    'border-primary-100',
  warm:    'border-secondary-100',
  sun:     'border-accent-100',
  neutral: 'border-ink-200',
  success: 'border-ink-200',
  danger:  'border-ink-200',
};

/** Le filet se ferme d'un cran au survol (règle carte du 16/09). */
const VARIANT_HOVER_BORDER: Record<BadgeVariant, string> = {
  brand:   'hover:border-primary-300 group-hover:border-primary-300',
  info:    'hover:border-primary-300 group-hover:border-primary-300',
  warm:    'hover:border-secondary-300 group-hover:border-secondary-300',
  sun:     'hover:border-accent-300 group-hover:border-accent-300',
  neutral: 'hover:border-ink-300 group-hover:border-ink-300',
  success: 'hover:border-ink-300 group-hover:border-ink-300',
  danger:  'hover:border-ink-300 group-hover:border-ink-300',
};

/**
 * Speech-bubble tail — Apple Messages style at bottom-right.
 *
 * Construction JournalBubbleCard : carré tourné 45°, coin br arrondi 6 px,
 * bordures droite + basse qui prolongent le filet de la bulle, fond partagé
 * (blanc au repos, teinté au survol via group-hover).
 */
const SpeechTail: React.FC<{ variant: BadgeVariant }> = ({ variant }) => (
  <span
    aria-hidden="true"
    className={[
      // Position: absolute, tucked under the card's bottom edge, offset from right
      'absolute -bottom-2 right-8 w-5 h-5 rotate-45 rounded-br-[6px]',
      'bg-white border-r border-b transition-colors duration-200',
      VARIANT_BORDER[variant],
      VARIANT_HOVER_BORDER[variant],
      // Match the card's tinted bg on hover
      VARIANT_HOVER_BG[variant],
    ].join(' ')}
  />
);

const BASE_INTERACTIVE =
  'group relative cursor-pointer rounded-xl bg-white border transition-all duration-base ease-emphasis ' +
  // Override global [role="button"] rule from components-modern.css that forces height:40px + overflow:hidden
  '!h-auto !overflow-visible ' +
  'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500';

export const PromptCard: React.FC<PromptCardProps> = ({
  label,
  icon,
  text,
  variant = 'info',
  size = 'default',
  ctaLabel,
  bubble,
  onClick,
  onKeyDown,
  className = '',
}) => {
  const hoverBg = VARIANT_HOVER_BG[variant] ?? VARIANT_HOVER_BG.info;
  const restBorder = VARIANT_BORDER[variant] ?? VARIANT_BORDER.info;
  const hoverBorder = VARIANT_HOVER_BORDER[variant] ?? VARIANT_HOVER_BORDER.info;
  const ctaHover = VARIANT_CTA_HOVER[variant] ?? 'group-hover:text-primary-700';
  // Default: bubble visible on compact, hidden on featured (the featured layout is too wide for a bubble)
  const showBubble = bubble ?? size === 'default';

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if ((e.key === 'Enter' || e.key === ' ') && onClick) {
      e.preventDefault();
      onClick();
    }
    onKeyDown?.(e);
  };

  if (size === 'featured') {
    return (
      <div
        className={[
          BASE_INTERACTIVE,
          /* `@container` : la bulle bascule en ligne selon SA largeur, pas celle
             de l'écran. Son padding reste fixe au canon des cartes (24 px) —
             une requête de conteneur ne peut pas mesurer l'élément qui la porte,
             et ce padding décale de toute façon les seuils des descendants :
             `@xl` (576 px de contenu) se déclenche ici à 624 px de bulle. */
          '@container',
          'flex flex-col @xl:flex-row items-stretch @xl:items-center gap-stack @xl:gap-7',
          'p-stack-lg',
          restBorder,
          hoverBorder,
          hoverBg,
          className,
        ]
          .filter(Boolean)
          .join(' ')}
        onClick={onClick}
        onKeyDown={handleKeyDown}
        tabIndex={0}
        role="button"
      >
        <div className="shrink-0 self-start @xl:self-center inline-flex items-center justify-center w-16 h-16 @xl:w-20 @xl:h-20 rounded-2xl bg-gradient-to-br from-white via-primary-50/40 to-secondary-50/40 shadow-sm transition-transform duration-300 group-hover:scale-105">
          {icon}
        </div>

        <div className="flex-1 flex flex-col gap-2.5 min-w-0">
          <Badge variant={variant} className="self-start">
            {label}
          </Badge>
          <p className="m-0 font-display text-h3 @xl:text-h2 font-semibold text-ink-900 leading-snug text-balance">
            {text}
          </p>
        </div>

        <div className="shrink-0 self-start @xl:self-center">
          {/* Une affordance, pas un contrôle : la carte entière est déjà cliquable,
              y imbriquer un <Button> annoncerait deux boutons pour un seul objet.
              `buttonClasses` donne l'apparence à la source — cette pilule recopiait
              jusqu'ici les classes à la main, et manquait donc chaque décision. */}
          <span className={buttonClasses({ emphasis: 'soft', tone: 'brand' })}>
            {ctaLabel ?? 'Écrire ma réflexion'}
            <ArrowRight size={16} className="transition-transform group-hover:translate-x-0.5" />
          </span>
        </div>

        {showBubble && <SpeechTail variant={variant} />}
      </div>
    );
  }

  // Default compact (grid item) — Apple Messages chat bubble
  return (
    <div
      className={[
        BASE_INTERACTIVE,
        'flex flex-col items-center text-center gap-stack p-stack-lg',
        restBorder,
        hoverBorder,
        hoverBg,
        className,
      ]
        .filter(Boolean)
        .join(' ')}
      onClick={onClick}
      onKeyDown={handleKeyDown}
      tabIndex={0}
      role="button"
    >
      <Badge variant={variant}>{label}</Badge>

      <div className="inline-flex items-center justify-center transition-transform duration-300 group-hover:scale-110">
        {icon}
      </div>

      <p className="m-0 text-body text-ink-600 text-balance">{text}</p>

      <div className={['inline-flex items-center gap-tight text-caption font-semibold text-ink-500 transition-colors', ctaHover].join(' ')}>
        {ctaLabel ?? 'Réfléchir'}
        <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
      </div>

      {showBubble && <SpeechTail variant={variant} />}
    </div>
  );
};

export default PromptCard;
