import React from 'react';
import { Sparkles, ArrowLeft } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

/**
 * HeroSection — canonical page-level hero for content pages.
 *
 * Now consolidates the previous DashboardHero and LearningPathHeader
 * (both kept as thin aliases for backward compat). Inspired by the
 * LearningPathHeader visual style (radial glow corners, clamp() title,
 * KPI glass cards on gradient).
 *
 * 4 variants, each tone-aware (primary | warm | sun | success | danger):
 *   - gradient : saturated brand gradient + radial corner glows, white
 *                text. The "rich hero" used in dashboards and learning
 *                detail pages.
 *   - glass    : frosted glass card on tinted backdrop, dark text.
 *   - minimal  : soft bg-{tone}-50 + outline, dark text, no gradient.
 *   - media    : gradient bg with decorative sparkles + radial overlay.
 *
 * Optional rich slots (typically used with `gradient`):
 *   - showBackButton + onBack : back chip top-left
 *   - progress (0-100)        : full-width progress bar with label
 *   - kpis                    : grid of glass KPI cards (icon + value + label)
 *
 * Composition:
 *   <HeroSection
 *     variant="gradient" tone="primary"
 *     eyebrow="Module 2"
 *     title="Fondamentaux du Leadership"
 *     description="..."
 *     progress={42}
 *     kpis={[{ icon: ..., value: '12', label: 'leçons' }]}
 *     actions={<Button>Continuer</Button>}
 *     showBackButton onBack={...}
 *   />
 */

export type HeroVariant = 'gradient' | 'glass' | 'minimal' | 'media';
export type HeroTone = 'primary' | 'warm' | 'sun' | 'success' | 'danger';
export type HeroAlign = 'left' | 'center';
export type HeroSize = 'sm' | 'md' | 'lg';

export interface HeroKPI {
  /** Lucide icon component or ReactNode rendered inside a glass square. */
  icon?: React.ReactNode;
  /** Big value, e.g. "12", "86h", "92%". */
  value: React.ReactNode;
  /** Small uppercase-ish label below the value. */
  label: React.ReactNode;
}

export interface HeroSectionProps {
  /** Lucide icon component or any ReactNode (rendered inside an icon bubble). */
  icon?: LucideIcon | React.ReactNode;
  /** Optional eyebrow text rendered above the title (category, breadcrumb). */
  eyebrow?: React.ReactNode;
  title: React.ReactNode;
  description?: React.ReactNode;
  /** Inline metadata pills below the description (icon + text pairs). */
  metadata?: Array<{ icon: React.ReactNode; text: React.ReactNode }>;
  /** Trailing actions (Buttons, links, etc.). */
  actions?: React.ReactNode;
  /** Progress bar 0–100 — renders below description with "{progress}% complété". */
  progress?: number;
  /** Optional progress label override (default: "{n}% complété"). */
  progressLabel?: React.ReactNode;
  /** KPI cards grid (typically used with the gradient variant). */
  kpis?: HeroKPI[];
  /** Show "← Retour" chip top-left. */
  showBackButton?: boolean;
  onBack?: () => void;
  /** Custom back button label (default: "Retour"). */
  backLabel?: React.ReactNode;

  variant?: HeroVariant;
  tone?: HeroTone;
  align?: HeroAlign;
  size?: HeroSize;
  /** Additional content slotted at the bottom (cards, charts, illustrations). */
  children?: React.ReactNode;
  className?: string;
}

// ─── Variant × tone class maps ──────────────────────────────────────────────

const GRADIENT_BG: Record<HeroTone, string> = {
  primary: 'bg-gradient-to-br from-primary-500 via-primary-600 to-primary-800',
  warm:    'bg-gradient-to-br from-secondary-500 via-secondary-600 to-secondary-700',
  sun:     'bg-gradient-to-br from-accent-400 via-accent-500 to-secondary-500',
  success: 'bg-gradient-to-br from-success-base via-success-fg to-primary-700',
  danger:  'bg-gradient-to-br from-danger-base via-secondary-500 to-secondary-700',
};

const GLASS_OUTER: Record<HeroTone, string> = {
  primary: 'bg-gradient-to-br from-primary-50/80 via-white to-primary-50/40',
  warm:    'bg-gradient-to-br from-secondary-50/80 via-white to-secondary-50/40',
  sun:     'bg-gradient-to-br from-accent-50/80 via-white to-accent-50/40',
  success: 'bg-gradient-to-br from-success-bg/80 via-white to-success-bg/40',
  danger:  'bg-gradient-to-br from-danger-bg/80 via-white to-danger-bg/40',
};

const MINIMAL_BG: Record<HeroTone, string> = {
  primary: 'bg-primary-50 border-primary-200',
  warm:    'bg-secondary-50 border-secondary-200',
  sun:     'bg-accent-50 border-accent-200',
  success: 'bg-success-bg border-success-base/30',
  danger:  'bg-danger-bg border-danger-base/30',
};

const TITLE_DARK_COLOR: Record<HeroTone, string> = {
  primary: 'text-primary-900',
  warm:    'text-secondary-900',
  sun:     'text-accent-900',
  success: 'text-success-fg',
  danger:  'text-danger-fg',
};

const EYEBROW_DARK_COLOR: Record<HeroTone, string> = {
  primary: 'text-primary-700',
  warm:    'text-secondary-700',
  sun:     'text-accent-700',
  success: 'text-success-fg',
  danger:  'text-danger-fg',
};

const ICON_BUBBLE_DARK: Record<HeroTone, string> = {
  primary: 'bg-primary-100 text-primary-700 ring-primary-200',
  warm:    'bg-secondary-100 text-secondary-700 ring-secondary-200',
  sun:     'bg-accent-100 text-accent-700 ring-accent-200',
  success: 'bg-success-bg text-success-fg ring-success-base/30',
  danger:  'bg-danger-bg text-danger-fg ring-danger-base/30',
};

// Progress bar fill on non-light (glass/minimal) variants — static class map
// because Tailwind can't statically detect dynamic from/to-{tone}-N strings.
const PROGRESS_FILL_DARK: Record<HeroTone, string> = {
  primary: 'bg-gradient-to-r from-primary-500 to-primary-700',
  warm:    'bg-gradient-to-r from-secondary-500 to-secondary-700',
  sun:     'bg-gradient-to-r from-accent-500 to-accent-700',
  success: 'bg-gradient-to-r from-success-base to-success-fg',
  danger:  'bg-gradient-to-r from-danger-base to-danger-fg',
};

// Size scales — applies to padding, title size, icon bubble
const SIZE_PADDING: Record<HeroSize, string> = {
  sm: 'px-6 py-8 max-md:px-5 max-md:py-6',
  md: 'px-10 py-12 max-md:px-6 max-md:py-9',
  lg: 'px-12 py-16 max-md:px-7 max-md:py-11',
};

const SIZE_TITLE: Record<HeroSize, string> = {
  sm: 'text-h3',
  md: 'text-h2',
  lg: 'text-h1',
};

const SIZE_BUBBLE: Record<HeroSize, string> = {
  sm: 'w-12 h-12 text-h4',
  md: 'w-14 h-14 text-h3',
  lg: 'w-16 h-16 text-h2',
};

// ─── Helpers ────────────────────────────────────────────────────────────────

const renderIcon = (icon: HeroSectionProps['icon'], size: number): React.ReactNode => {
  if (!icon) return null;
  if (React.isValidElement(icon)) return icon;
  // Treat as component (LucideIcon)
  const Component = icon as React.ComponentType<{ size?: number; strokeWidth?: number }>;
  return <Component size={size} strokeWidth={2} />;
};

// Decorative sparkles for the `media` variant — positioned absolutely.
const MediaSparkles: React.FC = () => (
  <>
    <span aria-hidden="true" className="pointer-events-none absolute top-6 left-8 text-white/45 [animation:hero-twinkle_3s_ease-in-out_infinite]">
      <Sparkles size={18} fill="currentColor" />
    </span>
    <span aria-hidden="true" className="pointer-events-none absolute top-10 right-12 text-white/35 [animation:hero-twinkle_3s_ease-in-out_infinite_1s]">
      <Sparkles size={14} fill="currentColor" />
    </span>
    <span aria-hidden="true" className="pointer-events-none absolute bottom-8 left-1/3 text-white/40 [animation:hero-twinkle_3s_ease-in-out_infinite_1.6s]">
      <Sparkles size={16} fill="currentColor" />
    </span>
    <span aria-hidden="true" className="pointer-events-none absolute bottom-12 right-1/4 text-white/30 [animation:hero-twinkle_3s_ease-in-out_infinite_2.2s]">
      <Sparkles size={20} fill="currentColor" />
    </span>
    <style>{`
      @keyframes hero-twinkle {
        0%, 100% { opacity: 0.25; transform: scale(0.85) rotate(-6deg); }
        50%      { opacity: 0.85; transform: scale(1.1)  rotate(8deg); }
      }
    `}</style>
  </>
);

// ─── Component ──────────────────────────────────────────────────────────────

export const HeroSection: React.FC<HeroSectionProps> = ({
  icon,
  eyebrow,
  title,
  description,
  metadata,
  actions,
  progress,
  progressLabel,
  kpis,
  showBackButton = false,
  onBack,
  backLabel = 'Retour',
  variant = 'gradient',
  tone = 'primary',
  align = 'left',
  size = 'md',
  children,
  className = '',
}) => {
  const isLight = variant === 'gradient' || variant === 'media';
  const alignClass = align === 'center' ? 'text-center mx-auto items-center' : 'text-left items-start';

  // Surface classes (variant + tone)
  const surfaceClasses = (() => {
    switch (variant) {
      case 'gradient':
        return ['relative overflow-hidden rounded-2xl shadow-xl text-white', GRADIENT_BG[tone]].join(' ');
      case 'media':
        return ['relative overflow-hidden rounded-2xl shadow-xl text-white', GRADIENT_BG[tone]].join(' ');
      case 'glass':
        return [
          'relative overflow-hidden rounded-2xl border border-white/60 ring-1 ring-inset ring-primary-100/40 backdrop-blur-xl backdrop-saturate-150 shadow-lg',
          GLASS_OUTER[tone],
          TITLE_DARK_COLOR[tone],
        ].join(' ');
      case 'minimal':
      default:
        return [
          'relative overflow-hidden rounded-2xl border',
          MINIMAL_BG[tone],
          TITLE_DARK_COLOR[tone],
        ].join(' ');
    }
  })();

  // Eyebrow color
  const eyebrowColor = isLight ? 'text-white/85' : EYEBROW_DARK_COLOR[tone];

  // Description color
  const descColor = isLight ? 'text-white/90' : 'text-ink-700';

  // Metadata pill bg
  const metaPillBg = isLight
    ? 'bg-white/15 backdrop-blur-md border border-white/25 text-white'
    : `${ICON_BUBBLE_DARK[tone]} ring-1 ring-inset border-0`;

  // Icon bubble
  const bubbleClass = [
    'inline-flex items-center justify-center shrink-0 rounded-2xl ring-1 mb-4',
    SIZE_BUBBLE[size],
    isLight
      ? 'bg-white/20 text-white ring-white/30 backdrop-blur-md shadow-md'
      : ICON_BUBBLE_DARK[tone],
  ].join(' ');

  // Eyebrow chip — when on gradient/media, render as backdrop pill (LearningPathHeader style)
  const eyebrowPillClasses = isLight
    ? 'inline-flex items-center self-start px-3 py-1 rounded-pill bg-white/20 backdrop-blur-sm text-caption font-bold uppercase tracking-[0.12em] text-white/95 border border-white/15'
    : `inline-flex items-center self-start px-2.5 py-1 rounded-pill text-micro font-bold uppercase tracking-[0.1em] ${EYEBROW_DARK_COLOR[tone]} ${MINIMAL_BG[tone]} border`;

  // KPI card — glass on light variants, soft bg on dark text variants
  const kpiCardClasses = isLight
    ? 'flex items-center gap-3 px-4 py-3 rounded-2xl bg-white/15 hover:bg-white/22 backdrop-blur-md transition-colors border border-white/15'
    : `flex items-center gap-3 px-4 py-3 rounded-2xl ${MINIMAL_BG[tone]} border transition-colors`;

  const kpiIconBubble = isLight
    ? 'inline-flex items-center justify-center w-10 h-10 rounded-xl bg-white/20 shrink-0'
    : `inline-flex items-center justify-center w-10 h-10 rounded-xl shrink-0 ${ICON_BUBBLE_DARK[tone]}`;

  return (
    <section
      className={[surfaceClasses, SIZE_PADDING[size], className].filter(Boolean).join(' ')}
    >
      {/* Radial glow corners for gradient/media (LearningPathHeader DNA) */}
      {(variant === 'gradient' || variant === 'media') && (
        <>
          <div
            aria-hidden="true"
            className="absolute -top-1/3 -right-[10%] w-[60%] aspect-square rounded-full bg-[radial-gradient(circle,rgba(255,255,255,0.22)_0%,transparent_60%)] pointer-events-none"
          />
          <div
            aria-hidden="true"
            className="absolute bottom-[-30%] left-[8%] w-[45%] aspect-square rounded-full bg-[radial-gradient(circle,rgba(255,255,255,0.12)_0%,transparent_65%)] pointer-events-none"
          />
        </>
      )}

      {/* Sparkles overlay only on `media` */}
      {variant === 'media' && <MediaSparkles />}

      {/* Subtle top-half sheen on glass */}
      {variant === 'glass' && (
        <div
          aria-hidden="true"
          className="absolute inset-x-0 top-0 h-1/2 pointer-events-none bg-gradient-to-b from-white/40 to-transparent"
        />
      )}

      {/* Back button (top-left, above the content block) */}
      {showBackButton && (
        <button
          type="button"
          onClick={onBack}
          aria-label={typeof backLabel === 'string' ? backLabel : 'Retour'}
          className={[
            'relative z-10 inline-flex items-center gap-2 mb-6 px-4 py-2 rounded-pill cursor-pointer transition-all duration-200 hover:-translate-x-0.5 text-caption font-semibold border focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-current',
            isLight
              ? 'bg-white/15 hover:bg-white/25 backdrop-blur-sm text-white border-white/20'
              : `bg-white border-ink-200 hover:bg-ink-50 ${TITLE_DARK_COLOR[tone]}`,
          ].join(' ')}
        >
          <ArrowLeft size={14} strokeWidth={2.5} /> {backLabel}
        </button>
      )}

      <div
        className={[
          'relative flex flex-col gap-3 max-w-[800px]',
          alignClass,
        ].join(' ')}
      >
        {icon && (
          <span className={bubbleClass} aria-hidden="true">
            {renderIcon(icon, size === 'lg' ? 30 : size === 'sm' ? 22 : 26)}
          </span>
        )}

        {eyebrow && (
          <span className={eyebrowPillClasses}>{eyebrow}</span>
        )}

        <h1
          className={[
            'm-0 font-display font-extrabold leading-[1.1] tracking-tight',
            // Use clamp() at md/lg sizes for fluid scaling (LearningPathHeader DNA)
            size === 'lg'
              ? 'text-[clamp(2.25rem,4.5vw,3.25rem)]'
              : size === 'md'
              ? 'text-[clamp(1.875rem,3.5vw,2.75rem)]'
              : SIZE_TITLE[size],
            isLight ? 'text-white' : TITLE_DARK_COLOR[tone],
          ].join(' ')}
        >
          {title}
        </h1>

        {description && (
          <p className={['m-0 text-body-lg leading-relaxed max-w-[640px]', descColor].join(' ')}>
            {description}
          </p>
        )}

        {/* Progress bar — gradient/media uses white bar on white/20 track */}
        {progress !== undefined && (
          <div className="flex items-center gap-3 mt-3 w-full max-w-[640px]">
            <div
              className={[
                'flex-1 h-2.5 rounded-pill overflow-hidden shadow-inner',
                isLight ? 'bg-white/20' : 'bg-ink-100',
              ].join(' ')}
            >
              <div
                className={[
                  'h-full rounded-pill transition-[width] duration-500 ease-out shadow-sm',
                  isLight ? 'bg-white' : PROGRESS_FILL_DARK[tone],
                ].join(' ')}
                style={{ width: `${Math.max(0, Math.min(100, progress))}%` }}
              />
            </div>
            <span className={['text-caption font-bold whitespace-nowrap tabular-nums', isLight ? 'text-white' : TITLE_DARK_COLOR[tone]].join(' ')}>
              {progressLabel ?? `${Math.round(progress)}% complété`}
            </span>
          </div>
        )}

        {metadata && metadata.length > 0 && (
          <div className={['flex flex-wrap gap-2 mt-1', align === 'center' ? 'justify-center' : 'justify-start'].join(' ')}>
            {metadata.map((item, idx) => (
              <span
                key={idx}
                className={[
                  'inline-flex items-center gap-2 px-3 py-1.5 rounded-pill text-caption font-semibold',
                  metaPillBg,
                ].join(' ')}
              >
                <span className="inline-flex items-center [&>svg]:w-4 [&>svg]:h-4">{item.icon}</span>
                <span>{item.text}</span>
              </span>
            ))}
          </div>
        )}

        {actions && (
          <div className={['flex flex-wrap gap-3 mt-2', align === 'center' ? 'justify-center' : 'justify-start'].join(' ')}>
            {actions}
          </div>
        )}

        {children && <div className="mt-2 w-full">{children}</div>}
      </div>

      {/* KPIs grid — anchored at the bottom of the hero, full width */}
      {kpis && kpis.length > 0 && (
        <div className="relative z-10 grid gap-3 grid-cols-[repeat(auto-fit,minmax(180px,1fr))] mt-7">
          {kpis.map((kpi, idx) => (
            <div key={idx} className={kpiCardClasses}>
              {kpi.icon && (
                <span className={kpiIconBubble} aria-hidden="true">{kpi.icon}</span>
              )}
              <div className="flex flex-col">
                <span className={['font-display text-h3 font-extrabold leading-none tracking-tight', isLight ? 'text-white' : TITLE_DARK_COLOR[tone]].join(' ')}>
                  {kpi.value}
                </span>
                <span className={['text-caption mt-1 font-medium', isLight ? 'text-white/85' : 'text-ink-600'].join(' ')}>
                  {kpi.label}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

export default HeroSection;
