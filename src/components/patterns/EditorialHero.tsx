import React from 'react';

/**
 * EditorialHero — full-width hero band for editorial / auth / static pages.
 *
 * Visual: glass card with tone-aware gradient + soft radial halo,
 * eyebrow chip + h1 title + summary paragraph + optional meta row.
 *
 * Used by editorial pages (MagazineArticle, ArticleDetail, Newsletter,
 * WeeklyNewsDetail), auth pages (Login, Signup, ForgotPassword,
 * ResetPassword), Project, Coaching flows, Settings, Dashboard.
 *
 * Tone variants control the gradient saturation:
 *  - `default` : light primary tint → white (subtle, used by editorial/auth)
 *  - `brand`   : saturated primary blue gradient (Dashboard hero)
 *  - `warm`    : saturated secondary orange gradient
 *  - `sun`     : saturated accent yellow gradient
 */

export type EditorialHeroTone = 'default' | 'brand' | 'warm' | 'sun';

export interface EditorialHeroEyebrow {
  icon?: React.ReactNode;
  label: string;
}

export interface EditorialHeroMetaItem {
  icon?: React.ReactNode;
  label: React.ReactNode;
}

export interface EditorialHeroProps {
  /** Small uppercase chip above the title — typically a category or section name. */
  eyebrow?: EditorialHeroEyebrow | React.ReactNode;
  /** Main title of the hero. Renders as `<h1>`. */
  title: React.ReactNode;
  /** Subtitle / lede paragraph below the title. */
  summary?: React.ReactNode;
  /** Optional metadata row at the bottom (date, author, edition, etc.). */
  meta?: EditorialHeroMetaItem[];
  /** Extra content rendered after the meta row (CTAs, badges, etc.). */
  trailing?: React.ReactNode;
  /** Force compact padding (e.g. when nested in a layout that already pads). */
  compact?: boolean;
  /** Background gradient tone. Default: `default` (light primary). */
  tone?: EditorialHeroTone;
  className?: string;
}

const TONE_BG: Record<EditorialHeroTone, string> = {
  default: 'bg-gradient-to-br from-primary-50 via-white/90 to-white/85',
  // brand = TLS deep saturated teal (primary-500 → primary-700) — white text on top
  brand:   'bg-gradient-to-br from-primary-500 via-primary-600 to-primary-700',
  warm:    'bg-gradient-to-br from-secondary-500 via-secondary-600 to-secondary-700',
  sun:     'bg-gradient-to-br from-accent-500 via-accent-600 to-accent-700',
};

const TONE_BORDER: Record<EditorialHeroTone, string> = {
  default: 'border-primary-200/60',
  brand:   'border-white/20',
  warm:    'border-white/20',
  sun:     'border-white/20',
};

const TONE_HALO: Record<EditorialHeroTone, string> = {
  default: 'radial-gradient(circle, rgba(85, 161, 180, 0.18) 0%, transparent 70%)',
  brand:   'radial-gradient(circle, rgba(255, 255, 255, 0.20) 0%, transparent 70%)',
  warm:    'radial-gradient(circle, rgba(255, 255, 255, 0.20) 0%, transparent 70%)',
  sun:     'radial-gradient(circle, rgba(255, 255, 255, 0.22) 0%, transparent 70%)',
};

const TONE_EYEBROW: Record<EditorialHeroTone, string> = {
  default: 'text-primary-700',
  brand:   'text-white/80',
  warm:    'text-white/85',
  sun:     'text-white/90',
};

/** Title color per tone (white on saturated tones, ink on light default). */
const TONE_TITLE: Record<EditorialHeroTone, string> = {
  default: 'text-ink-900',
  brand:   'text-white',
  warm:    'text-white',
  sun:     'text-white',
};

/** Summary text color per tone. */
const TONE_SUMMARY: Record<EditorialHeroTone, string> = {
  default: 'text-ink-500',
  brand:   'text-white/85',
  warm:    'text-white/85',
  sun:     'text-white/90',
};

/** Meta text color per tone. */
const TONE_META: Record<EditorialHeroTone, string> = {
  default: 'text-ink-500',
  brand:   'text-white/75',
  warm:    'text-white/75',
  sun:     'text-white/80',
};

const isEyebrowObject = (value: unknown): value is EditorialHeroEyebrow =>
  typeof value === 'object' &&
  value !== null &&
  'label' in (value as Record<string, unknown>);

export const EditorialHero: React.FC<EditorialHeroProps> = ({
  eyebrow,
  title,
  summary,
  meta,
  trailing,
  compact = false,
  tone = 'default',
  className = '',
}) => {
  return (
    <section
      className={[
        'relative overflow-hidden rounded-2xl border shadow-md backdrop-blur-glass-light',
        TONE_BG[tone],
        TONE_BORDER[tone],
        compact ? 'px-6 py-6' : 'px-8 py-8',
        'flex flex-col gap-3',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
    >
      {/* Tone-aware halo */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -top-[60%] -right-[20%] w-[380px] h-[380px] rounded-full"
        style={{ background: TONE_HALO[tone] }}
      />

      {eyebrow && (
        <div className="relative">
          {isEyebrowObject(eyebrow) ? (
            <span className={['inline-flex items-center gap-1.5 text-micro font-bold uppercase tracking-wider', TONE_EYEBROW[tone]].join(' ')}>
              {eyebrow.icon}
              {eyebrow.label}
            </span>
          ) : (
            eyebrow
          )}
        </div>
      )}

      <h1 className={['relative font-display text-h1 font-extrabold tracking-tight m-0 leading-[1.1]', TONE_TITLE[tone]].join(' ')}>
        {title}
      </h1>

      {summary && (
        <p className={['relative font-body text-body-lg leading-relaxed m-0 max-w-[68ch]', TONE_SUMMARY[tone]].join(' ')}>
          {summary}
        </p>
      )}

      {meta && meta.length > 0 && (
        <div className={['relative flex flex-wrap items-center gap-2 mt-1 text-caption', TONE_META[tone]].join(' ')}>
          {meta.map((item, idx) => (
            <span key={idx} className="inline-flex items-center gap-1">
              {item.icon}
              {item.label}
            </span>
          ))}
        </div>
      )}

      {trailing && <div className="relative mt-2">{trailing}</div>}
    </section>
  );
};

export default EditorialHero;
