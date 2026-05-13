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
