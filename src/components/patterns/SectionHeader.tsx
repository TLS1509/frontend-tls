import React from 'react';
import type { LucideIcon } from 'lucide-react';

/**
 * SectionHeader — Canonical section-level heading within a page.
 *
 * ── 5 variants (controls icon style) ──────────────────────────────────────
 *   - `default`   : icon in **soft tinted bubble** (bg-{tone}-50 + tone icon)
 *   - `solid`     : icon in **saturated tone bubble** (bg-{tone}-500 + white icon) — strong CTA
 *   - `minimal`   : **stroke-only icon** inline with title (no bubble) — premium/airy
 *   - `accent`    : **tone-colored vertical bar** before title + stroke icon optional
 *   - `underline` : title with **accent underline** + stroke icon optional
 *
 * ── 4 sizes (controls heading + bubble) ───────────────────────────────────
 *   - `xs` : h5 (1.25rem) + 32px bubble — tight inline sections
 *   - `sm` : h4 (1.125rem) + 36px bubble — secondary sections
 *   - `md` : h3 (1.375rem) + 44px bubble — DEFAULT, main page sections
 *   - `lg` : h2 (1.75rem) + 56px bubble — page-level group titles
 *
 * `compact` (deprecated alias) maps to `size="sm"` for backward compat.
 *
 * ── Tone (primary | warm | sun | accent | neutral) ────────────────────────
 * Drives icon color, bar gradient, underline color, and (for solid) bubble bg.
 */

export type SectionHeaderVariant = 'default' | 'solid' | 'minimal' | 'accent' | 'underline';
export type SectionHeaderTone = 'primary' | 'warm' | 'sun' | 'accent' | 'neutral';
export type SectionHeaderSize = 'xs' | 'sm' | 'md' | 'lg';

export interface SectionHeaderProps {
  icon?: LucideIcon | React.ReactNode;
  title: string;
  subtitle?: string;
  action?: React.ReactNode;
  divider?: boolean;
  /** Visual size — controls heading level (h2/h3/h4/h5) + bubble + glyph. Default `md`. */
  size?: SectionHeaderSize;
  /** @deprecated Use `size="sm"`. Alias kept for backward compat. */
  compact?: boolean;
  variant?: SectionHeaderVariant;
  tone?: SectionHeaderTone;
  className?: string;
  /** Override icon color class (e.g. "text-primary-600"). Used by `default` variant only. */
  iconClassName?: string;
}

// ── Tone maps ────────────────────────────────────────────────────────────────

const TONE_ICON: Record<SectionHeaderTone, string> = {
  primary: 'text-primary-600',
  warm:    'text-secondary-600',
  sun:     'text-accent-600',
  accent:  'text-accent-700',
  neutral: 'text-ink-700',
};

const TONE_BUBBLE_BG: Record<SectionHeaderTone, string> = {
  primary: 'bg-primary-50',
  warm:    'bg-secondary-50',
  sun:     'bg-accent-50',
  accent:  'bg-accent-50',
  neutral: 'bg-ink-50',
};

const TONE_SOLID_BG: Record<SectionHeaderTone, string> = {
  primary: 'bg-gradient-to-br from-primary-500 to-primary-700 text-white shadow-brand-sm',
  warm:    'bg-gradient-to-br from-secondary-500 to-secondary-700 text-white shadow-warm-sm',
  sun:     'bg-gradient-to-br from-accent-400 to-accent-600 text-accent-900 shadow-sun-sm',
  accent:  'bg-gradient-to-br from-accent-500 to-accent-700 text-white shadow-sun-sm',
  neutral: 'bg-gradient-to-br from-ink-700 to-ink-900 text-white shadow-sm',
};

const TONE_BAR: Record<SectionHeaderTone, string> = {
  primary: 'bg-gradient-to-b from-primary-400 to-primary-600',
  warm:    'bg-gradient-to-b from-secondary-400 to-secondary-600',
  sun:     'bg-gradient-to-b from-accent-300 to-accent-500',
  accent:  'bg-gradient-to-b from-accent-400 to-accent-600',
  neutral: 'bg-gradient-to-b from-ink-300 to-ink-500',
};

const TONE_UNDERLINE: Record<SectionHeaderTone, string> = {
  primary: 'bg-primary-500',
  warm:    'bg-secondary-500',
  sun:     'bg-accent-400',
  accent:  'bg-accent-500',
  neutral: 'bg-ink-400',
};

// ── Size maps ────────────────────────────────────────────────────────────────

const SIZE_TITLE: Record<SectionHeaderSize, string> = {
  xs: 'text-h5',
  sm: 'text-h4',
  md: 'text-h3',
  lg: 'text-h2',
};

const SIZE_BUBBLE: Record<SectionHeaderSize, string> = {
  xs: 'w-8 h-8',
  sm: 'w-9 h-9',
  md: 'w-11 h-11',
  lg: 'w-14 h-14',
};

const SIZE_BUBBLE_RADIUS: Record<SectionHeaderSize, string> = {
  xs: 'rounded-lg',
  sm: 'rounded-lg',
  md: 'rounded-xl',
  lg: 'rounded-2xl',
};

const SIZE_GLYPH: Record<SectionHeaderSize, number> = {
  xs: 16,
  sm: 18,
  md: 22,
  lg: 28,
};

const SIZE_INLINE_GLYPH: Record<SectionHeaderSize, number> = {
  xs: 14,
  sm: 16,
  md: 20,
  lg: 24,
};

const SIZE_GAP: Record<SectionHeaderSize, string> = {
  xs: 'gap-2',
  sm: 'gap-2.5',
  md: 'gap-3',
  lg: 'gap-4',
};

/**
 * SectionHeader does NOT apply its own bottom margin — the parent layout
 * (e.g. `<section className="flex flex-col gap-4">`) controls vertical spacing.
 * This avoids the double-spacing trap (mb on header + gap on parent).
 *
 * If you need a bottom margin, pass it via `className` (e.g. `className="mb-4"`).
 */
const SIZE_MARGIN: Record<SectionHeaderSize, string> = {
  xs: '',
  sm: '',
  md: '',
  lg: '',
};

const SIZE_BAR_WIDTH: Record<SectionHeaderSize, string> = {
  xs: 'w-0.5',
  sm: 'w-1',
  md: 'w-1',
  lg: 'w-1.5',
};

const SIZE_UNDERLINE_HEIGHT: Record<SectionHeaderSize, string> = {
  xs: 'h-[2px]',
  sm: 'h-[2px]',
  md: 'h-[3px]',
  lg: 'h-[4px]',
};

const SIZE_UNDERLINE_WIDTH: Record<SectionHeaderSize, string> = {
  xs: 'w-[24px]',
  sm: 'w-[28px]',
  md: 'w-[36px]',
  lg: 'w-[48px]',
};

const SIZE_EMOJI_TEXT: Record<SectionHeaderSize, string> = {
  xs: 'text-base',
  sm: 'text-lg',
  md: 'text-2xl',
  lg: 'text-3xl',
};

// ── Component ────────────────────────────────────────────────────────────────

export const SectionHeader: React.FC<SectionHeaderProps> = ({
  icon,
  title,
  subtitle,
  action,
  divider = false,
  size: sizeProp,
  compact,
  variant = 'default',
  tone = 'primary',
  className = '',
  iconClassName,
}) => {
  // Resolve size: `compact` (deprecated) → 'sm', else use `size` prop, default 'md'
  const size: SectionHeaderSize = sizeProp ?? (compact ? 'sm' : 'md');

  const titleSize = SIZE_TITLE[size];
  const bubbleSize = SIZE_BUBBLE[size];
  const bubbleRadius = SIZE_BUBBLE_RADIUS[size];
  const glyphSize = SIZE_GLYPH[size];
  const inlineGlyphSize = SIZE_INLINE_GLYPH[size];
  const gap = SIZE_GAP[size];
  const margin = SIZE_MARGIN[size];

  // ── Icon rendering ─────────────────────────────────────────────────────────
  const renderBubbleIcon = (style: 'tinted' | 'solid') => {
    if (!icon) return null;
    const iconColor = iconClassName ?? TONE_ICON[tone];
    const bubbleClasses = [
      'inline-flex items-center justify-center shrink-0',
      bubbleSize,
      bubbleRadius,
      style === 'solid' ? TONE_SOLID_BG[tone] : `${TONE_BUBBLE_BG[tone]} ${iconColor}`,
    ].join(' ');

    if (React.isValidElement(icon) || typeof icon === 'string' || typeof icon === 'number') {
      return (
        <span className={[bubbleClasses, 'leading-none', SIZE_EMOJI_TEXT[size]].join(' ')} aria-hidden="true">
          {icon}
        </span>
      );
    }
    const Icon = icon as LucideIcon;
    return (
      <span className={bubbleClasses}>
        <Icon size={glyphSize} strokeWidth={style === 'solid' ? 2.25 : 2} />
      </span>
    );
  };

  const renderInlineIcon = () => {
    if (!icon) return null;
    const colorClass = TONE_ICON[tone];
    if (React.isValidElement(icon) || typeof icon === 'string' || typeof icon === 'number') {
      return <span className={['shrink-0 inline-flex items-center', colorClass].join(' ')} aria-hidden="true">{icon}</span>;
    }
    const Icon = icon as LucideIcon;
    return (
      <span className={['shrink-0 inline-flex items-center', colorClass].join(' ')} aria-hidden="true">
        <Icon size={inlineGlyphSize} strokeWidth={2} />
      </span>
    );
  };

  // ── Layout ─────────────────────────────────────────────────────────────────
  const wrapperBase = [
    'flex items-center justify-between gap-4',
    margin,
    divider ? `pb-${size === 'xs' || size === 'sm' ? '3' : '4'} border-b border-ink-200` : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  if (variant === 'minimal') {
    return (
      <div className={wrapperBase}>
        <div className={['flex items-center flex-1 min-w-0', gap].join(' ')}>
          {renderInlineIcon()}
          <h2 className={['font-display font-semibold text-ink-900 leading-tight m-0 tracking-tight', titleSize].join(' ')}>
            {title}
          </h2>
          {subtitle && (
            <span className="hidden sm:inline-flex text-body-sm text-ink-500 font-body before:content-['·'] before:mx-2 before:text-ink-300">
              {subtitle}
            </span>
          )}
        </div>
        {action && <div className="shrink-0 flex items-center gap-2">{action}</div>}
      </div>
    );
  }

  if (variant === 'accent') {
    return (
      <div className={wrapperBase}>
        <div className="flex items-stretch gap-3 flex-1 min-w-0">
          <span aria-hidden="true" className={['shrink-0 rounded-full', SIZE_BAR_WIDTH[size], TONE_BAR[tone]].join(' ')} />
          <div className="flex flex-col flex-1 min-w-0 justify-center gap-tight">
            <div className="flex items-center gap-2">
              {renderInlineIcon()}
              <h2 className={['font-display font-semibold text-ink-900 leading-tight m-0 tracking-tight', titleSize].join(' ')}>
                {title}
              </h2>
            </div>
            {subtitle && <p className="font-body text-body-sm text-ink-500 leading-snug m-0">{subtitle}</p>}
          </div>
        </div>
        {action && <div className="shrink-0 flex items-center gap-2">{action}</div>}
      </div>
    );
  }

  if (variant === 'underline') {
    return (
      <div className={wrapperBase}>
        <div className="flex items-end gap-2 flex-1 min-w-0">
          {renderInlineIcon()}
          <div className="flex flex-col flex-1 min-w-0">
            <h2 className={['relative inline-flex items-baseline font-display font-semibold text-ink-900 leading-tight m-0 tracking-tight', titleSize].join(' ')}>
              <span className="relative">
                {title}
                <span aria-hidden="true" className={['absolute left-0 -bottom-0.5 rounded-full', SIZE_UNDERLINE_HEIGHT[size], SIZE_UNDERLINE_WIDTH[size], TONE_UNDERLINE[tone]].join(' ')} />
              </span>
            </h2>
            {subtitle && <p className="font-body text-body-sm text-ink-500 leading-snug m-0 mt-tight">{subtitle}</p>}
          </div>
        </div>
        {action && <div className="shrink-0 flex items-center gap-2">{action}</div>}
      </div>
    );
  }

  // ── default | solid (icon bubble) ──────────────────────────────────────────
  // Layout uses CSS grid so the bubble icon's middle aligns with the title's
  // first line center, and the subtitle naturally sits below the title (not
  // under the icon) — same column offset as the title text.
  const bubbleStyle: 'tinted' | 'solid' = variant === 'solid' ? 'solid' : 'tinted';

  if (!icon) {
    // No icon — simple stack layout
    return (
      <div className={wrapperBase}>
        <div className="flex flex-col flex-1 min-w-0 gap-0.5">
          <h2 className={['font-display font-bold text-ink-900 leading-tight m-0', titleSize].join(' ')}>
            {title}
          </h2>
          {subtitle && (
            <p className="font-body text-body-sm text-ink-500 leading-snug m-0">{subtitle}</p>
          )}
        </div>
        {action && <div className="shrink-0 flex items-center gap-2">{action}</div>}
      </div>
    );
  }

  return (
    <div className={wrapperBase}>
      {/* Flex layout : icon | (title + subtitle stack centré).
         items-center sur le flex → icône alignée verticalement au CENTRE du bloc texte.
         Sub-stack flex-col + gap-tight → title et subtitle TIGHTLY packés (2px),
         indépendamment de la hauteur de la bubble icône.

         ⚠️ Trade-off design accepté : l'icône est alignée avec le CENTRE du bloc
         (title + subtitle) plutôt qu'avec la 1ère ligne du titre, MAIS le gap
         title↔subtitle reste tight. Priorité spacing >> alignement absolu. */}
      <div className={['flex items-center flex-1 min-w-0', gap].join(' ')}>
        {/* Icon — vertical center par items-center */}
        {renderBubbleIcon(bubbleStyle)}

        {/* Title + subtitle stack — tight gap entre les deux lignes */}
        <div className="flex flex-col flex-1 min-w-0 gap-tight">
          <h2
            className={[
              'font-display font-bold text-ink-900 leading-tight m-0',
              titleSize,
            ].join(' ')}
          >
            {title}
          </h2>
          {subtitle && (
            <p className="font-body text-body-sm text-ink-500 leading-snug m-0">
              {subtitle}
            </p>
          )}
        </div>
      </div>
      {action && <div className="shrink-0 flex items-center gap-2">{action}</div>}
    </div>
  );
};

export default SectionHeader;
