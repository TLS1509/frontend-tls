/**
 * tone-classes.ts — Shared tone → Tailwind class maps
 *
 * Used by: LearningPathDetail, Coaching, Profile, Notifications, Veille,
 *          and any other page that maps a semantic PageTone to Tailwind classes.
 *
 * Export these maps instead of duplicating them in each page file.
 *
 * PageTone deliberately mirrors `Tone` from `src/data/learningPaths.ts`
 * ('primary' | 'warm' | 'sun') — defined here independently to keep
 * UI concerns separate from data layer.
 */

export type PageTone = 'primary' | 'warm' | 'sun';

/** Accent text color per tone */
export const TONE_TEXT: Record<PageTone, string> = {
  primary: 'text-primary-500',
  warm:    'text-secondary-500',
  sun:     'text-accent-400',
};

/** Subtle tinted background (50-level) per tone */
export const TONE_BG_50: Record<PageTone, string> = {
  primary: 'bg-primary-50',
  warm:    'bg-secondary-50',
  sun:     'bg-accent-50',
};

/** Light border (200-level) per tone */
export const TONE_BORDER_200: Record<PageTone, string> = {
  primary: 'border-primary-200',
  warm:    'border-secondary-200',
  sun:     'border-accent-200',
};

/** Saturated background (500 / accent-400) per tone */
export const TONE_BG_500: Record<PageTone, string> = {
  primary: 'bg-primary-500',
  warm:    'bg-secondary-500',
  sun:     'bg-accent-400',
};

/** Saturated border (500 / accent-400) per tone */
export const TONE_BORDER_500: Record<PageTone, string> = {
  primary: 'border-primary-500',
  warm:    'border-secondary-500',
  sun:     'border-accent-400',
};

/**
 * Full-bleed hero gradient per tone.
 * Use on section headers, project banners, decorative backgrounds.
 */
export const TONE_HERO_GRADIENT: Record<PageTone, string> = {
  primary: 'bg-gradient-to-br from-primary-500 to-secondary-500',
  warm:    'bg-gradient-to-br from-secondary-500 to-accent-400',
  sun:     'bg-gradient-to-br from-accent-400 to-primary-500',
};

/**
 * Soft 100-level background per tone (cards, badges).
 * Slightly stronger than BG_50, for card headers or icon bubbles.
 */
export const TONE_BG_100: Record<PageTone, string> = {
  primary: 'bg-primary-100',
  warm:    'bg-secondary-100',
  sun:     'bg-accent-100',
};

/** Dark text color (700-level) per tone — for headings on light bg */
export const TONE_TEXT_700: Record<PageTone, string> = {
  primary: 'text-primary-700',
  warm:    'text-secondary-700',
  sun:     'text-accent-700',
};

// ── Card shadow / border / fill maps ─────────────────────────────────────────
//
// SOURCE OF TRUTH for tone-aware card styling.
// Import from here in ALL card components — never redefine inline.
// When a shadow token changes, change it HERE only; all cards update at once.
//
// 'primary' and 'brand' are the same teal color — two legacy names.
// Support both so LessonCard/SessionCard ('primary') and CourseCard ('brand')
// can share the same maps.

export type CardTone = PageTone | 'brand';

/** Resting border — subtle 200-level tint. */
export const CARD_BORDER_RESTING: Record<CardTone, string> = {
  primary: 'border-primary-200',
  brand:   'border-primary-200',
  warm:    'border-secondary-200',
  sun:     'border-accent-200',
};

/** Hover border — one step darker (300-level). */
export const CARD_BORDER_HOVER: Record<CardTone, string> = {
  primary: 'hover:border-primary-300',
  brand:   'hover:border-primary-300',
  warm:    'hover:border-secondary-300',
  sun:     'hover:border-accent-300',
};

/** Resting shadow xs — barely lifts off the page. */
export const CARD_SHADOW_RESTING: Record<CardTone, string> = {
  primary: 'shadow-brand-xs',
  brand:   'shadow-brand-xs',
  warm:    'shadow-warm-xs',
  sun:     'shadow-sun-xs',
};

/** Resting shadow sm — stronger presence for feature/elevated variants. */
export const CARD_SHADOW_RESTING_SM: Record<CardTone, string> = {
  primary: 'shadow-brand-sm',
  brand:   'shadow-brand-sm',
  warm:    'shadow-warm-sm',
  sun:     'shadow-sun-sm',
};

/** Hover shadow sm — for Card default/tinted variants. */
export const CARD_SHADOW_HOVER_SM: Record<CardTone, string> = {
  primary: 'hover:shadow-brand-sm',
  brand:   'hover:shadow-brand-sm',
  warm:    'hover:shadow-warm-sm',
  sun:     'hover:shadow-sun-sm',
};

/**
 * Hover shadow md — for content cards (CourseCard, LessonCard, SessionCard…).
 * More dramatic lift since these cards are larger / primary-action cards.
 */
export const CARD_SHADOW_HOVER_MD: Record<CardTone, string> = {
  primary: 'hover:shadow-brand-md',
  brand:   'hover:shadow-brand-md',
  warm:    'hover:shadow-warm-md',
  sun:     'hover:shadow-sun-md',
};

/**
 * ProgressBar fill per tone — pass as `fill={CARD_PROGRESS_FILL[tone]}` to <ProgressBar>.
 * 'brand' and 'primary' both map to the teal brand fill.
 */
export const CARD_PROGRESS_FILL: Record<CardTone, 'brand' | 'warm' | 'sun'> = {
  primary: 'brand',
  brand:   'brand',
  warm:    'warm',
  sun:     'sun',
};

/** Hover shadow md for action CTA buttons — tone-aware lift */
export const CTA_SHADOW_HOVER_MD: Record<PageTone, string> = {
  primary: 'hover:shadow-brand-md',
  warm:    'hover:shadow-card-hover',
  sun:     'hover:shadow-sun-md',
};

/** Action button tone classes (for footer buttons, action rows) */
export const ACTION_BTN_TONES: Record<PageTone, Record<'primary' | 'secondary', string>> = {
  primary: {
    primary: 'bg-primary-500 hover:bg-primary-600 text-white',
    secondary: 'bg-primary-50 hover:bg-primary-100 text-primary-700 border border-primary-200'
  },
  warm: {
    primary: 'bg-secondary-500 hover:bg-secondary-600 text-white',
    secondary: 'bg-secondary-50 hover:bg-secondary-100 text-secondary-700 border border-secondary-200'
  },
  sun: {
    primary: 'bg-accent-400 hover:bg-accent-500 text-accent-900',
    secondary: 'bg-accent-50 hover:bg-accent-100 text-accent-700 border border-accent-200'
  },
};

/** CTA text color for icons (used in cards to make icons tone-aware) */
export const TONE_CTA_TEXT: Record<PageTone, string> = {
  primary: 'text-primary-600',
  warm:    'text-secondary-500',
  sun:     'text-accent-400',
};

/** Border color for tone-aware dividers and tags */
export const TONE_BORDER: Record<PageTone, string> = {
  primary: 'border-primary-200',
  warm:    'border-secondary-200',
  sun:     'border-accent-200',
};

/** Divider color by surface type */
export const SURFACE_DIVIDER: Record<'card' | 'tinted' | 'glass' | 'frosted', string> = {
  card:    'border-ink-100',
  tinted:  'border-white/60',
  glass:   'border-white/30',
  frosted: 'border-white/30',
};
