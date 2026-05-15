/**
 * ViewerHeader — Sticky toolbar for full-screen viewer / reader pages.
 *
 * Pattern audit Phase 10 : 6+ viewer pages reproduisent la même UI manuelle
 * (back btn + title + prev/next chevrons + close). Ce composant l'unifie.
 *
 * Used by (target) : VideoViewer, FlashcardsViewer, AstucesViewer,
 *                    ComplementaryContentViewer, VideoReels, JournalDetail, CourseDetail
 *
 * Layout :
 *   ┌──────────────────────────────────────────────────────────────────┐
 *   │ [← Back]   Title eyebrow                  [< Prev] [Next >] [×] │
 *   │            Optional subtitle / meta                              │
 *   │ ▓▓▓▓▓▓▓▓░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░  (optional progress) │
 *   └──────────────────────────────────────────────────────────────────┘
 *
 * Features :
 *  - Sticky top-0 z-sticky glass background
 *  - Back button (gauche)
 *  - Title + optional subtitle / meta (centré, truncate)
 *  - Prev / Next chevrons (droite) — disabled at boundaries
 *  - Close button optionnel (X — typically navigate to parent route)
 *  - Optional counter ("3 / 12")
 *  - Optional inline progress bar (0–100) — Phase 14.2a addition
 *  - Tone-aware (primary / warm / sun) — Phase 14.2a addition
 *  - Touch targets ≥ 44 px (mobile a11y) — Phase 14.2a fix
 *  - 100% Tailwind, glass-light backdrop-blur, no BEM
 */

import React from 'react';
import { ArrowLeft, ChevronLeft, ChevronRight, X } from 'lucide-react';
import type { PageTone } from '../../lib/tone-classes';

export interface ViewerHeaderProps {
  /** Back button label (default "Retour"). Hidden if onBack is omitted. */
  backLabel?: string;
  /** Back button callback (typically navigate(-1) or to parent route). */
  onBack?: () => void;

  /** Optional small eyebrow text above the title (e.g. "Vidéo · Module 2"). */
  eyebrow?: React.ReactNode;
  /** Main title displayed in the toolbar — truncated if too long. */
  title?: React.ReactNode;
  /** Optional secondary text under the title. */
  subtitle?: React.ReactNode;

  /** Optional progression : current index (1-based). */
  current?: number;
  /** Optional total count : displayed as "current / total". */
  total?: number;

  /** Optional inline progress bar value (0–100). Renders below the row when defined. */
  progress?: number;

  /** Previous callback. Disabled if undefined OR `disablePrev` is true. */
  onPrev?: () => void;
  /** Next callback. Disabled if undefined OR `disableNext` is true. */
  onNext?: () => void;
  /** Force-disable prev (e.g. at first item). */
  disablePrev?: boolean;
  /** Force-disable next (e.g. at last item). */
  disableNext?: boolean;

  /** Optional close callback (X button, typically navigates to parent). */
  onClose?: () => void;

  /** Optional extra slot rendered between subtitle and prev/next (e.g. badge, action). */
  trailing?: React.ReactNode;

  /** Make the header sticky to top (default true). */
  sticky?: boolean;

  /** Color tone applied to eyebrow, counter accent, progress bar. */
  tone?: PageTone;

  className?: string;
}

const TONE_EYEBROW: Record<PageTone, string> = {
  primary: 'text-primary-700',
  warm:    'text-secondary-700',
  sun:     'text-accent-700',
};

const TONE_COUNTER_ACCENT: Record<PageTone, string> = {
  primary: 'text-primary-700',
  warm:    'text-secondary-700',
  sun:     'text-accent-700',
};

const TONE_PROGRESS_FILL: Record<PageTone, string> = {
  primary: 'bg-gradient-to-r from-primary-500 to-primary-700',
  warm:    'bg-gradient-to-r from-secondary-500 to-secondary-700',
  sun:     'bg-gradient-to-r from-accent-300 to-accent-500',
};

const TONE_FOCUS_OUTLINE: Record<PageTone, string> = {
  primary: 'focus-visible:outline-primary-500',
  warm:    'focus-visible:outline-secondary-500',
  sun:     'focus-visible:outline-accent-400',
};

export const ViewerHeader: React.FC<ViewerHeaderProps> = ({
  backLabel = 'Retour',
  onBack,
  eyebrow,
  title,
  subtitle,
  current,
  total,
  progress,
  onPrev,
  onNext,
  disablePrev = false,
  disableNext = false,
  onClose,
  trailing,
  sticky = true,
  tone = 'primary',
  className = '',
}) => {
  const prevDisabled = !onPrev || disablePrev;
  const nextDisabled = !onNext || disableNext;
  const hasNav = !!onPrev || !!onNext;
  const focusOutline = TONE_FOCUS_OUTLINE[tone];

  const navButtonBase = [
    'inline-flex items-center justify-center min-w-touch min-h-touch w-11 h-11 rounded-pill text-ink-700 bg-ink-50 hover:bg-ink-100 transition-colors',
    'disabled:opacity-disabled disabled:cursor-not-allowed',
    'focus-visible:outline-2 focus-visible:outline-offset-2',
    focusOutline,
  ].join(' ');

  const wrapperClasses = [
    'bg-white/85 backdrop-blur-glass-light border-b border-ink-200',
    sticky && 'sticky top-0 z-sticky',
    className,
  ].filter(Boolean).join(' ');

  return (
    <header className={wrapperClasses} role="banner">
      <div className="flex items-center gap-stack px-4 sm:px-6 lg:px-8 py-3">
        {/* Back button (left) */}
        {onBack && (
          <button
            type="button"
            onClick={onBack}
            aria-label={typeof backLabel === 'string' ? backLabel : 'Retour'}
            className={[
              'shrink-0 inline-flex items-center gap-2 min-h-touch px-3 py-1.5 rounded-pill bg-ink-50 hover:bg-ink-100 text-ink-700 hover:text-ink-900 transition-colors text-caption font-semibold',
              'focus-visible:outline-2 focus-visible:outline-offset-2',
              focusOutline,
            ].join(' ')}
          >
            <ArrowLeft size={14} strokeWidth={2.5} />
            <span className="hidden sm:inline">{backLabel}</span>
          </button>
        )}

        {/* Title block (center, flex-1, truncate) */}
        {(title || eyebrow || subtitle) && (
          <div className="flex-1 min-w-0 flex flex-col items-start sm:items-center">
            {eyebrow && (
              <span
                className={[
                  'font-body text-micro font-bold uppercase tracking-wider truncate w-full text-left sm:text-center',
                  TONE_EYEBROW[tone],
                ].join(' ')}
              >
                {eyebrow}
              </span>
            )}
            {title && (
              <h1
                className="m-0 font-display text-h4 font-bold text-ink-900 leading-tight truncate w-full text-left sm:text-center"
                title={typeof title === 'string' ? title : undefined}
              >
                {title}
              </h1>
            )}
            {subtitle && (
              <span className="font-body text-caption text-ink-500 truncate w-full text-left sm:text-center">
                {subtitle}
              </span>
            )}
          </div>
        )}

        {/* Trailing custom slot */}
        {trailing && <div className="shrink-0">{trailing}</div>}

        {/* Counter "X / Y" */}
        {current !== undefined && total !== undefined && (
          <span className="shrink-0 font-body text-caption font-semibold text-ink-600 tabular-nums">
            <span className={TONE_COUNTER_ACCENT[tone]}>{current}</span>
            <span className="text-ink-400"> / {total}</span>
          </span>
        )}

        {/* Prev / Next nav chevrons */}
        {hasNav && (
          <div className="shrink-0 flex items-center gap-1">
            <button
              type="button"
              onClick={onPrev}
              disabled={prevDisabled}
              aria-label="Élément précédent"
              className={navButtonBase}
            >
              <ChevronLeft size={18} strokeWidth={2.25} />
            </button>
            <button
              type="button"
              onClick={onNext}
              disabled={nextDisabled}
              aria-label="Élément suivant"
              className={navButtonBase}
            >
              <ChevronRight size={18} strokeWidth={2.25} />
            </button>
          </div>
        )}

        {/* Close button (right) */}
        {onClose && (
          <button
            type="button"
            onClick={onClose}
            aria-label="Fermer"
            className={[
              'shrink-0 inline-flex items-center justify-center min-w-touch min-h-touch w-11 h-11 rounded-pill text-ink-700 bg-ink-50 hover:bg-danger-bg hover:text-danger-fg transition-colors',
              'focus-visible:outline-2 focus-visible:outline-offset-2',
              focusOutline,
            ].join(' ')}
          >
            <X size={18} strokeWidth={2.25} />
          </button>
        )}
      </div>

      {/* Optional inline progress bar (under the header row) */}
      {typeof progress === 'number' && (
        <div className="h-1 bg-ink-100">
          <div
            className={['h-full transition-[width] duration-500 ease-out', TONE_PROGRESS_FILL[tone]].join(' ')}
            style={{ width: `${Math.min(100, Math.max(0, progress))}%` }}
            role="progressbar"
            aria-valuenow={Math.round(progress)}
            aria-valuemin={0}
            aria-valuemax={100}
          />
        </div>
      )}
    </header>
  );
};

export default ViewerHeader;
