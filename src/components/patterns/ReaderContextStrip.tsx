/**
 * ReaderContextStrip — sticky reading context bar for long-form content pages.
 *
 * Shows the article title in the center after the user scrolls past a threshold
 * (default 100px), fading in so they never lose track of what they're reading.
 *
 * Usage:
 *   <ReaderContextStrip
 *     title={article.title}
 *     onBack={() => navigate(-1)}
 *     backLabel="Retour au magazine"
 *     trailing={<><ReadingProgressRing /><Button>…</Button></>}
 *   />
 *
 * The `trailing` slot accepts any right-side content (progress ring, bookmark,
 * share, download, etc.) — each page controls its own actions.
 *
 * Consumed by: MagazineArticle, WeeklyNewsDetail, Dossier
 */

import React, { useEffect, useState } from 'react';
import { ArrowLeft } from 'lucide-react';
import { Container } from '../layout';

type ContainerWidth = 'page' | 'medium' | 'wide';

export interface ReaderContextStripProps {
  /** Article/document title — shown in the center after scrollThreshold. */
  title: string;
  /** Called when the back button is clicked. */
  onBack: () => void;
  /** Label for the back button. Defaults to "Retour". */
  backLabel?: string;
  /** Right-side slot: progress ring, bookmark, share, download, etc. */
  trailing?: React.ReactNode;
  /** Container width. Defaults to "page". */
  containerWidth?: ContainerWidth;
  /** Scroll distance in px before the title fades in. Defaults to 100. */
  scrollThreshold?: number;
}

export const ReaderContextStrip: React.FC<ReaderContextStripProps> = ({
  title,
  onBack,
  backLabel = 'Retour',
  trailing,
  containerWidth = 'page',
  scrollThreshold = 100,
}) => {
  const [titleVisible, setTitleVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setTitleVisible(window.scrollY > scrollThreshold);
    window.addEventListener('scroll', onScroll, { passive: true });
    // sync initial state in case page loads mid-scroll
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, [scrollThreshold]);

  return (
    <div className="sticky top-0 z-sticky bg-white/85 backdrop-blur-glass-medium border-b border-ink-100">
      <Container width={containerWidth} className="h-14 flex items-center gap-stack-xs">
        {/* ── Back button ────────────────────────────────────── */}
        <button
          type="button"
          onClick={onBack}
          className="shrink-0 inline-flex items-center gap-1.5 min-h-touch px-2 font-body text-caption font-semibold text-ink-700 hover:text-primary-700 bg-transparent border-0 cursor-pointer rounded-sm transition-colors duration-base focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500"
        >
          <ArrowLeft size={14} aria-hidden />
          {backLabel}
        </button>

        {/* ── Article title — fades in after scroll threshold ── */}
        <p
          aria-hidden={!titleVisible}
          className={[
            'flex-1 min-w-0 m-0 font-body text-body-sm font-semibold text-ink-800 truncate',
            'transition-opacity duration-slow',
            titleVisible ? 'opacity-100' : 'opacity-0 pointer-events-none',
          ].join(' ')}
        >
          {title}
        </p>

        {/* ── Trailing slot (ring + bookmark + share + …) ────── */}
        {trailing && (
          <div className="shrink-0 flex items-center gap-stack-xs">
            {trailing}
          </div>
        )}
      </Container>
    </div>
  );
};

export default ReaderContextStrip;
