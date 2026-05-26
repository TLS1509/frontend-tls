/**
 * ViewerOverlay — wrapper standardisé pour pages viewer full-screen.
 *
 * Pattern uniforme pour les pages "lecteur immersif" : LessonPlayer,
 * AstucesViewer, FlashcardsViewer, VideoTutorial, VideoViewer,
 * ComplementaryContentViewer.
 *
 * Structure :
 *  ┌─────────────────────────────────────────────┐
 *  │ [X close]   [Title + meta]      [Actions]   │  ← sticky header (glass)
 *  │ [Progress bar gradient]                      │  ← optional
 *  ├─────────────────────────────────────────────┤
 *  │                                             │
 *  │  {children}                                 │  ← main content slot
 *  │                                             │
 *  ├─────────────────────────────────────────────┤
 *  │ [← Prev] [Counter] [Next →]                 │  ← sticky footer nav (optional)
 *  └─────────────────────────────────────────────┘
 *
 * Props :
 *  - title (required) : title shown in header
 *  - subtitle (optional) : 1-line meta below title
 *  - tone : surface tone (brand / warm / sun / dark) — dark for video viewers
 *  - onClose : close handler (← X button)
 *  - progress : 0–100 — shows progress bar in header
 *  - currentIndex, total, onPrev, onNext : footer nav (omit to hide)
 *  - headerActions : extra slot in header (bookmark, share, etc.)
 *
 * Mobile : header sticky compact, footer fixed bottom with safe-area padding.
 * Keyboard : Esc → onClose, ArrowLeft → onPrev, ArrowRight → onNext.
 */

import React, { useEffect } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

export type ViewerOverlayTone = 'light' | 'brand' | 'warm' | 'sun' | 'dark';

export interface ViewerOverlayProps {
  /** Title displayed in header. */
  title: string;
  /** Optional 1-line meta (duration, author, etc.). */
  subtitle?: string;
  /** Background tone — dark = full immersive (video reels style). */
  tone?: ViewerOverlayTone;
  /** Close button handler (←  X). */
  onClose: () => void;
  /** Show progress bar (0–100). */
  progress?: number;
  /** Sequence position (1-based label). */
  currentIndex?: number;
  /** Total count. */
  total?: number;
  /** Previous handler — hides if undefined. */
  onPrev?: () => void;
  /** Next handler — hides if undefined. */
  onNext?: () => void;
  /** Extra slot in header (bookmark / share / settings). */
  headerActions?: React.ReactNode;
  /** Footer label override (e.g. "Section 3 sur 7"). */
  footerLabel?: string;
  /** Main content. */
  children: React.ReactNode;
  /** Optional className for the main content container. */
  contentClassName?: string;
}

const TONE_SHELL: Record<ViewerOverlayTone, string> = {
  light: 'bg-white text-ink-900',
  brand: 'bg-gradient-to-b from-primary-50 to-white text-ink-900',
  warm:  'bg-gradient-to-b from-secondary-50 to-white text-ink-900',
  sun:   'bg-gradient-to-b from-accent-50 to-white text-ink-900',
  dark:  'bg-ink-950 text-white',
};

const TONE_HEADER: Record<ViewerOverlayTone, string> = {
  light: 'bg-white/85 backdrop-blur-glass-medium border-b border-ink-100',
  brand: 'bg-white/85 backdrop-blur-glass-medium border-b border-primary-100',
  warm:  'bg-white/85 backdrop-blur-glass-medium border-b border-secondary-100',
  sun:   'bg-white/85 backdrop-blur-glass-medium border-b border-accent-100',
  dark:  'bg-ink-950/80 backdrop-blur-glass-medium border-b border-white/10',
};

const TONE_CLOSE_BTN: Record<ViewerOverlayTone, string> = {
  light: 'text-ink-700 hover:bg-ink-100',
  brand: 'text-ink-700 hover:bg-primary-50',
  warm:  'text-ink-700 hover:bg-secondary-50',
  sun:   'text-ink-700 hover:bg-accent-50',
  dark:  'text-white/85 hover:bg-white/10',
};

const TONE_PROGRESS: Record<ViewerOverlayTone, string> = {
  light: 'bg-gradient-to-r from-primary-400 to-primary-600',
  brand: 'bg-gradient-to-r from-primary-400 to-primary-600',
  warm:  'bg-gradient-to-r from-secondary-400 to-secondary-600',
  sun:   'bg-gradient-to-r from-accent-400 to-secondary-500',
  dark:  'bg-gradient-to-r from-accent-400 to-primary-400',
};

const TONE_FOOTER: Record<ViewerOverlayTone, string> = {
  light: 'bg-white/95 backdrop-blur-glass-medium border-t border-ink-100',
  brand: 'bg-white/95 backdrop-blur-glass-medium border-t border-primary-100',
  warm:  'bg-white/95 backdrop-blur-glass-medium border-t border-secondary-100',
  sun:   'bg-white/95 backdrop-blur-glass-medium border-t border-accent-100',
  dark:  'bg-ink-950/90 backdrop-blur-glass-medium border-t border-white/10',
};

export const ViewerOverlay: React.FC<ViewerOverlayProps> = ({
  title,
  subtitle,
  tone = 'light',
  onClose,
  progress,
  currentIndex,
  total,
  onPrev,
  onNext,
  headerActions,
  footerLabel,
  children,
  contentClassName = '',
}) => {
  const showFooter = onPrev || onNext || (currentIndex !== undefined && total !== undefined);
  const isDark = tone === 'dark';

  // Keyboard navigation
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === 'ArrowLeft' && onPrev) {
        onPrev();
      } else if (e.key === 'ArrowRight' && onNext) {
        onNext();
      }
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [onClose, onPrev, onNext]);

  return (
    <div className={['min-h-screen flex flex-col', TONE_SHELL[tone]].join(' ')}>
      {/* ── Header sticky ───────────────────────────────────── */}
      <header
        className={[
          'sticky top-0 z-sticky px-4 sm:px-6 lg:px-10 py-3 flex items-center gap-4',
          TONE_HEADER[tone],
        ].join(' ')}
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Fermer le lecteur"
          className={[
            'shrink-0 inline-flex items-center justify-center w-11 h-11 rounded-lg cursor-pointer transition-colors duration-base',
            'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500',
            TONE_CLOSE_BTN[tone],
          ].join(' ')}
        >
          <X size={18} strokeWidth={2.25} />
        </button>

        <div className="flex-1 min-w-0">
          <h1
            className={[
              'm-0 font-display text-body-sm sm:text-body font-bold leading-tight truncate',
              isDark ? 'text-white' : 'text-ink-900',
            ].join(' ')}
          >
            {title}
          </h1>
          {subtitle && (
            <p
              className={[
                'm-0 font-body text-micro sm:text-caption truncate',
                isDark ? 'text-white/70' : 'text-ink-500',
              ].join(' ')}
            >
              {subtitle}
            </p>
          )}
        </div>

        {headerActions && (
          <div className="shrink-0 flex items-center gap-2">{headerActions}</div>
        )}
      </header>

      {/* Progress bar — sits below header (no shift on render) */}
      {progress !== undefined && (
        <div
          role="progressbar"
          aria-valuenow={Math.round(progress)}
          aria-valuemin={0}
          aria-valuemax={100}
          className={[
            'sticky z-sticky h-1',
            isDark ? 'bg-white/10' : 'bg-ink-100',
          ].join(' ')}
          style={{ top: '60px' }}
        >
          <div
            className={['h-full transition-[width] duration-fast', TONE_PROGRESS[tone]].join(' ')}
            style={{ width: `${Math.max(0, Math.min(100, progress))}%` }}
          />
        </div>
      )}

      {/* ── Main content ────────────────────────────────────── */}
      <main
        className={[
          'flex-1 min-w-0',
          showFooter ? 'pb-20 sm:pb-24' : '',
          contentClassName,
        ]
          .filter(Boolean)
          .join(' ')}
      >
        {children}
      </main>

      {/* ── Footer nav (optional) ───────────────────────────── */}
      {showFooter && (
        <footer
          className={[
            'fixed bottom-0 left-0 right-0 z-sticky px-4 sm:px-6 lg:px-10 py-3 flex items-center justify-between gap-3',
            TONE_FOOTER[tone],
          ].join(' ')}
        >
          <button
            type="button"
            onClick={onPrev}
            disabled={!onPrev}
            aria-label="Précédent"
            className={[
              'inline-flex items-center gap-1.5 px-3 py-2 min-h-touch rounded-lg font-body text-caption font-semibold cursor-pointer transition-colors duration-base',
              'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500',
              isDark
                ? 'text-white/85 hover:bg-white/10 disabled:text-white/30 disabled:cursor-not-allowed'
                : 'text-ink-700 hover:bg-ink-50 disabled:text-ink-300 disabled:cursor-not-allowed',
            ].join(' ')}
          >
            <ChevronLeft size={16} />
            <span className="hidden sm:inline">Précédent</span>
          </button>

          <span
            className={[
              'font-body text-caption font-medium tabular-nums',
              isDark ? 'text-white/70' : 'text-ink-500',
            ].join(' ')}
          >
            {footerLabel ??
              (currentIndex !== undefined && total !== undefined
                ? `${currentIndex} / ${total}`
                : '')}
          </span>

          <button
            type="button"
            onClick={onNext}
            disabled={!onNext}
            aria-label="Suivant"
            className={[
              'inline-flex items-center gap-1.5 px-3 py-2 min-h-touch rounded-lg font-body text-caption font-semibold cursor-pointer transition-colors duration-base',
              'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500',
              isDark
                ? 'text-white/85 hover:bg-white/10 disabled:text-white/30 disabled:cursor-not-allowed'
                : 'text-ink-700 hover:bg-ink-50 disabled:text-ink-300 disabled:cursor-not-allowed',
            ].join(' ')}
          >
            <span className="hidden sm:inline">Suivant</span>
            <ChevronRight size={16} />
          </button>
        </footer>
      )}
    </div>
  );
};

export default ViewerOverlay;
