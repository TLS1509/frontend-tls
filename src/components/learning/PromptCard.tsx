import React from 'react';
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
 * Apple Messages-style chat bubble — borderless, drop-shadow only.
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

/**
 * Tone-aware drop-shadow on hover (matches the variant's accent color, very subtle).
 */
const VARIANT_HOVER_SHADOW: Record<BadgeVariant, string> = {
  brand:   'group-hover:[filter:drop-shadow(0_8px_24px_rgba(85,161,180,0.18))]',
  info:    'group-hover:[filter:drop-shadow(0_8px_24px_rgba(85,161,180,0.18))]',
  warm:    'group-hover:[filter:drop-shadow(0_8px_24px_rgba(237,132,58,0.18))]',
  sun:     'group-hover:[filter:drop-shadow(0_8px_24px_rgba(248,176,68,0.20))]',
  neutral: 'group-hover:[filter:drop-shadow(0_8px_20px_rgba(0,0,0,0.10))]',
  success: 'group-hover:[filter:drop-shadow(0_8px_24px_rgba(157,190,186,0.18))]',
  danger:  'group-hover:[filter:drop-shadow(0_8px_24px_rgba(242,133,89,0.18))]',
};

/**
 * Speech-bubble tail — Apple Messages style at bottom-right.
 *
 * Borderless: the tail shares the card's background color (white at rest,
 * tone-tinted on hover) and inherits the parent's drop-shadow filter so
 * the silhouette appears as a single seamless bubble shape.
 */
const SpeechTail: React.FC<{ variant: BadgeVariant }> = ({ variant }) => (
  <span
    aria-hidden="true"
    className={[
      // Position: absolute, tucked under the card's bottom edge, offset from right
      'absolute -bottom-2 right-8 w-5 h-5 rotate-45 rounded-br-[6px]',
      // No border — share the card's background to merge seamlessly
      'bg-white transition-colors duration-200',
      // Match the card's tinted bg on hover
      VARIANT_HOVER_BG[variant],
    ].join(' ')}
  />
);

const BASE_INTERACTIVE =
  'group relative cursor-pointer rounded-3xl bg-white transition-all duration-slow ease-emphasis ' +
  // Override global [role="button"] rule from components-modern.css that forces height:40px + overflow:hidden
  '!h-auto !overflow-visible ' +
  'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500 ' +
  '[filter:drop-shadow(0_2px_8px_rgba(0,0,0,0.06))] ' +
  'hover:-translate-y-1';

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
  const hoverShadow = VARIANT_HOVER_SHADOW[variant] ?? VARIANT_HOVER_SHADOW.info;
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
          'flex flex-col md:flex-row items-stretch md:items-center gap-5 md:gap-7',
          'p-6 md:p-8',
          hoverBg,
          hoverShadow,
          className,
        ]
          .filter(Boolean)
          .join(' ')}
        onClick={onClick}
        onKeyDown={handleKeyDown}
        tabIndex={0}
        role="button"
      >
        <div className="shrink-0 self-start md:self-center inline-flex items-center justify-center w-16 h-16 md:w-20 md:h-20 rounded-2xl bg-gradient-to-br from-white via-primary-50/40 to-secondary-50/40 shadow-sm transition-transform duration-300 group-hover:scale-105">
          {icon}
        </div>

        <div className="flex-1 flex flex-col gap-2.5 min-w-0">
          <Badge variant={variant} className="self-start">
            {label}
          </Badge>
          <p className="m-0 font-display text-h3 md:text-h2 font-semibold text-ink-900 leading-snug text-balance">
            {text}
          </p>
        </div>

        <div className="shrink-0 self-start md:self-center">
          <span className="inline-flex items-center gap-2 px-5 h-11 rounded-pill bg-primary-600 text-white text-body-sm font-semibold transition-all group-hover:bg-primary-700 group-hover:-translate-y-px">
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
        'flex flex-col items-center text-center gap-4 p-6',
        hoverBg,
        hoverShadow,
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

      <p className="m-0 text-body-sm leading-relaxed text-ink-600 text-balance">{text}</p>

      <div className={['inline-flex items-center gap-1 text-caption font-semibold text-ink-500 transition-colors', ctaHover].join(' ')}>
        {ctaLabel ?? 'Réfléchir'}
        <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
      </div>

      {showBubble && <SpeechTail variant={variant} />}
    </div>
  );
};

export default PromptCard;
