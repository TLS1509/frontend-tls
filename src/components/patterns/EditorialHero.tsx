import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { MeshGradientBg } from '../marketing/motion/MeshGradientBg';
import type { MeshTone } from '../marketing/motion/MeshGradientBg';

/**
 * PageHero — universal page-opening hero (canonical name since Phase 19.B-2026-05-26).
 *
 * Used by 101+ pages across Dashboard, Auth, Coaching, Settings, etc. — far beyond
 * editorial content. The component was originally named `EditorialHero` when it shipped
 * for Magazine/Article pages, but its dominance across the app made the name misleading.
 *
 * ── Universal usage (default) ────────────────────────────────────────────────
 *   <PageHero tone="brand" title="Bienvenue" summary="..." />
 *
 * ── Naming convention ────────────────────────────────────────────────────────
 *   Use `PageHero` for any page-opening hero — Dashboard, Coaching hub, Settings,
 *   detail pages, Auth, etc. This is the canonical universal name.
 *
 *   `EditorialHero` is kept as an alias AND remains the recommended canonical name
 *   for ACTUALLY editorial surfaces (Magazine, Veille, Articles, Newsletter,
 *   WeeklyNews). Editorial-specific defaults (max-w-prose summary, italic eyebrow,
 *   author/date meta) may diverge in a future EditorialHero variant — keeping the
 *   name reserved preserves room for that specialization.
 *
 * ── Tones ────────────────────────────────────────────────────────────────────
 *   - `default` : light primary tint → white (subtle — editorial/auth pages)
 *   - `brand`   : saturated primary blue gradient (Dashboard, brand-assertive)
 *   - `warm`    : saturated secondary orange gradient
 *   - `sun`     : saturated accent yellow gradient
 */

export type PageHeroTone = 'default' | 'brand' | 'warm' | 'sun';

export interface PageHeroEyebrow {
  icon?: React.ReactNode;
  label: string;
}

export interface PageHeroMetaItem {
  icon?: React.ReactNode;
  label: React.ReactNode;
}

export interface PageHeroBackLink {
  /** Custom label (default: « Retour »). */
  label?: React.ReactNode;
  /** Click handler — typically `() => navigate(-1)` or a custom back URL. */
  onClick: () => void;
}

export interface PageHeroProps {
  /** Small uppercase chip above the title — typically a category or section name. */
  eyebrow?: PageHeroEyebrow | React.ReactNode;
  /** Main title of the hero. Renders as `<h1>`. */
  title: React.ReactNode;
  /** Subtitle / lede paragraph below the title. */
  summary?: React.ReactNode;
  /** Optional metadata row at the bottom (date, author, edition, etc.). */
  meta?: PageHeroMetaItem[];
  /** Extra content rendered after the meta row (CTAs, badges, etc.). */
  trailing?: React.ReactNode;
  /** Force compact padding (e.g. when nested in a layout that already pads). */
  compact?: boolean;
  /** Background gradient tone. Default: `default` (light primary). */
  tone?: PageHeroTone;
  /**
   * Optional back-link chip rendered top-left, above the eyebrow.
   * Accepts either `{ label?, onClick }` (renders a default styled chip with arrow)
   * OR a raw ReactNode for full custom control. Added Phase 19.B-2026-05-26 to absorb
   * HeroSection's `showBackButton + onBack` pattern.
   */
  backLink?: PageHeroBackLink | React.ReactNode;
  /**
   * Optional progress bar 0-100 rendered above the trailing slot.
   * Use with `progressLabel` for the descriptor below the bar.
   * Added Phase 19.B-2026-05-26 to absorb HeroSection's progress pattern.
   */
  progress?: number;
  /** Descriptor rendered below the progress bar (e.g. « 3 / 7 leçons complétées »). */
  progressLabel?: React.ReactNode;
  className?: string;
}

// ─── Backward-compatible aliases ─────────────────────────────────────────────
// Kept so existing 101 consumers don't break. Also the canonical name for
// editorial-specific surfaces (see JSDoc above).

/** @deprecated Prefer `PageHeroTone`. Alias kept for rétrocompat + editorial-specific naming. */
export type EditorialHeroTone = PageHeroTone;
/** @deprecated Prefer `PageHeroEyebrow`. Alias kept for rétrocompat + editorial-specific naming. */
export type EditorialHeroEyebrow = PageHeroEyebrow;
/** @deprecated Prefer `PageHeroMetaItem`. Alias kept for rétrocompat + editorial-specific naming. */
export type EditorialHeroMetaItem = PageHeroMetaItem;
/** @deprecated Prefer `PageHeroProps`. Alias kept for rétrocompat + editorial-specific naming. */
export type EditorialHeroProps = PageHeroProps;

// ─── Tone style maps ─────────────────────────────────────────────────────────

const TONE_BG: Record<PageHeroTone, string> = {
  default: 'bg-gradient-to-br from-primary-50 via-white/90 to-white/85',
  // brand = TLS deep saturated teal (primary-500 → primary-700) — white text on top
  brand:   'bg-gradient-to-br from-primary-500 via-primary-600 to-primary-700',
  warm:    'bg-gradient-to-br from-secondary-500 via-secondary-600 to-secondary-700',
  sun:     'bg-gradient-to-br from-accent-500 via-accent-600 to-accent-700',
};

const TONE_BORDER: Record<PageHeroTone, string> = {
  default: 'border-primary-200/60',
  brand:   'border-white/20',
  warm:    'border-white/20',
  sun:     'border-white/20',
};

const TONE_HALO: Record<PageHeroTone, string> = {
  default: 'radial-gradient(circle, rgba(85, 161, 180, 0.28) 0%, transparent 65%)',
  brand:   'radial-gradient(circle, rgba(255, 255, 255, 0.50) 0%, transparent 65%)',
  warm:    'radial-gradient(circle, rgba(255, 255, 255, 0.48) 0%, transparent 65%)',
  sun:     'radial-gradient(circle, rgba(255, 255, 255, 0.52) 0%, transparent 65%)',
};

/* Second organic blob — bottom-left — creates cross-light depth like Direction C. */
const TONE_HALO_2: Record<PageHeroTone, string> = {
  default: 'radial-gradient(circle, rgba(248, 176, 68, 0.16) 0%, transparent 60%)',
  brand:   'radial-gradient(circle, rgba(248, 176, 68, 0.26) 0%, transparent 60%)',
  warm:    'radial-gradient(circle, rgba(85, 161, 180, 0.22) 0%, transparent 60%)',
  sun:     'radial-gradient(circle, rgba(85, 161, 180, 0.20) 0%, transparent 60%)',
};

/* Map hero tone → MeshGradientBg tone (animated illustrated layer, Direction C). */
const TONE_MESH: Partial<Record<PageHeroTone, MeshTone>> = {
  brand: 'brand',
  warm:  'warm',
  sun:   'sun',
};

/* Tinted outer + inner-rim shadow per tone (glass panel signature). */
const TONE_SHADOW: Record<PageHeroTone, string> = {
  default: 'shadow-md',
  brand:   'shadow-[0_4px_12px_-2px_rgba(45,90,102,0.25),inset_0_1px_0_rgba(255,255,255,0.22)]',
  warm:    'shadow-[0_4px_12px_-2px_rgba(180,80,20,0.18),inset_0_1px_0_rgba(255,255,255,0.22)]',
  sun:     'shadow-[0_4px_12px_-2px_rgba(180,120,10,0.14),inset_0_1px_0_rgba(255,255,255,0.26)]',
};

const TONE_EYEBROW: Record<PageHeroTone, string> = {
  default: 'text-primary-700',
  brand:   'text-white/80',
  warm:    'text-white/85',
  sun:     'text-white/90',
};

/** Title color per tone (white on saturated tones, ink on light default). */
const TONE_TITLE: Record<PageHeroTone, string> = {
  default: 'text-ink-900',
  brand:   'text-white',
  warm:    'text-white',
  sun:     'text-white',
};

/** Summary text color per tone. */
const TONE_SUMMARY: Record<PageHeroTone, string> = {
  default: 'text-ink-500',
  brand:   'text-white/85',
  warm:    'text-white/85',
  sun:     'text-white/90',
};

/** Meta text color per tone. */
const TONE_META: Record<PageHeroTone, string> = {
  default: 'text-ink-500',
  brand:   'text-white/75',
  warm:    'text-white/75',
  sun:     'text-white/80',
};

const isEyebrowObject = (value: unknown): value is PageHeroEyebrow =>
  typeof value === 'object' &&
  value !== null &&
  'label' in (value as Record<string, unknown>);

const isBackLinkObject = (value: unknown): value is PageHeroBackLink =>
  typeof value === 'object' &&
  value !== null &&
  'onClick' in (value as Record<string, unknown>);

// Back-link chip color per tone (matches eyebrow tone treatment).
const TONE_BACKLINK: Record<PageHeroTone, string> = {
  default: 'text-primary-700 bg-white/70 border-primary-200 hover:bg-primary-50',
  brand:   'text-white bg-white/15 border-white/25 hover:bg-white/25',
  warm:    'text-white bg-white/15 border-white/25 hover:bg-white/25',
  sun:     'text-white bg-white/15 border-white/25 hover:bg-white/25',
};

// Progress bar fill + track per tone.
const TONE_PROGRESS_TRACK: Record<PageHeroTone, string> = {
  default: 'bg-primary-100/60',
  brand:   'bg-white/15',
  warm:    'bg-white/15',
  sun:     'bg-white/15',
};

const TONE_PROGRESS_FILL: Record<PageHeroTone, string> = {
  default: 'bg-primary-500',
  brand:   'bg-white',
  warm:    'bg-white',
  sun:     'bg-white',
};

// ─── Component ───────────────────────────────────────────────────────────────

export const PageHero: React.FC<PageHeroProps> = ({
  eyebrow,
  title,
  summary,
  meta,
  trailing,
  compact = false,
  tone = 'default',
  backLink,
  progress,
  progressLabel,
  className = '',
}) => {
  const clampedProgress =
    typeof progress === 'number' ? Math.max(0, Math.min(100, progress)) : null;

  return (
    <section
      className={[
        'relative overflow-hidden rounded-2xl border backdrop-blur-glass-light',
        TONE_BG[tone],
        TONE_BORDER[tone],
        TONE_SHADOW[tone],
        compact ? 'px-6 py-stack-lg' : 'px-8 py-section',
        'flex flex-col gap-stack-xs',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
    >
      {/* Animated mesh gradient — illustrated atmospheric layer (Direction C).
          Only on saturated tones (brand/warm/sun) where the base gradient provides
          enough contrast to reveal the blob animation. */}
      {TONE_MESH[tone] && (
        <MeshGradientBg tone={TONE_MESH[tone]!} intensity="subtle" />
      )}

      {/* Primary halo — top-right warm light source */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -top-[55%] -right-[15%] w-[520px] h-[520px] rounded-full"
        style={{ background: TONE_HALO[tone] }}
      />
      {/* Secondary blob — bottom-left cross-light (Direction C depth layer) */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-[45%] -left-[10%] w-[320px] h-[320px] rounded-full"
        style={{ background: TONE_HALO_2[tone] }}
      />

      {/* Back link (top-left, above eyebrow) */}
      {backLink && (
        <div className="relative">
          {isBackLinkObject(backLink) ? (
            <button
              type="button"
              onClick={backLink.onClick}
              className={[
                'inline-flex items-center gap-tight.5 text-caption font-semibold rounded-pill border px-3 py-1.5 transition-colors',
                'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500',
                TONE_BACKLINK[tone],
              ].join(' ')}
            >
              <ArrowLeft size={14} strokeWidth={2.25} />
              {backLink.label ?? 'Retour'}
            </button>
          ) : (
            backLink
          )}
        </div>
      )}

      {eyebrow && (
        <div className="relative">
          {isEyebrowObject(eyebrow) ? (
            <span className={['inline-flex items-center gap-tight.5 text-caption font-medium', TONE_EYEBROW[tone]].join(' ')}>
              {eyebrow.icon}
              {eyebrow.label}
            </span>
          ) : (
            eyebrow
          )}
        </div>
      )}

      <h1 className={['relative font-display text-h1 font-extrabold tracking-display m-0 leading-[1.1] text-balance', TONE_TITLE[tone]].join(' ')}>
        {title}
      </h1>

      {summary && (
        <p className={['relative font-body text-body-lg leading-relaxed m-0 max-w-[68ch]', TONE_SUMMARY[tone]].join(' ')}>
          {summary}
        </p>
      )}

      {meta && meta.length > 0 && (
        <div className={['relative flex flex-wrap items-center gap-stack-xs mt-1 text-caption', TONE_META[tone]].join(' ')}>
          {meta.map((item, idx) => (
            <span key={idx} className="inline-flex items-center gap-tight">
              {item.icon}
              {item.label}
            </span>
          ))}
        </div>
      )}

      {/* Progress bar (above trailing) */}
      {clampedProgress !== null && (
        <div className="relative flex flex-col gap-tight.5 mt-2">
          <div
            className={['h-1.5 rounded-pill overflow-hidden', TONE_PROGRESS_TRACK[tone]].join(' ')}
            role="progressbar"
            aria-valuenow={clampedProgress}
            aria-valuemin={0}
            aria-valuemax={100}
          >
            <div
              className={['h-full rounded-pill transition-[width] duration-700 ease-out', TONE_PROGRESS_FILL[tone]].join(' ')}
              style={{ width: `${clampedProgress}%` }}
            />
          </div>
          {progressLabel && (
            <p className={['text-caption font-medium m-0', TONE_META[tone]].join(' ')}>
              {progressLabel}
            </p>
          )}
        </div>
      )}

      {trailing && <div className="relative mt-2">{trailing}</div>}
    </section>
  );
};

// ─── Editorial-specific alias ────────────────────────────────────────────────
// Same component, kept reachable under the "EditorialHero" name. This serves both:
//   (1) Rétrocompat for 101 existing consumers (no migration burden).
//   (2) A semantic anchor for ACTUALLY editorial pages (Magazine, Veille, Articles)
//       where editorial-specific defaults may diverge in a future variant.
//
// New consumers SHOULD prefer `PageHero` for non-editorial surfaces, and
// `EditorialHero` for editorial surfaces. Mechanically identical for now.

export const EditorialHero = PageHero;

export default PageHero;
