import React from 'react';
import { cx, GAP, type Space, type PolymorphicProps } from './_layout';
import { WIDTH, type ContainerWidth } from './widths';

/**
 * PageShell — the canonical page scaffold in one element.
 *
 * Encodes the pattern repeated on nearly every route:
 *   `max-w-… mx-auto px-4 sm:px-6 lg:px-10 py-section md:py-section-lg
 *    lg:py-page flex flex-col gap-section`
 * i.e. width cap + centering + responsive horizontal gutter + responsive
 * vertical padding + vertical section rhythm.
 *
 * Renders as <div> by default — the app shell (App.tsx) already owns the single
 * <main> landmark, so this nests inside it. Pass `as="section"` to make the
 * page content a labelled region; only pass `as="main"` for routes rendered
 * OUTSIDE the shell (auth / fullscreen).
 *
 *   <PageShell>                       // page (1152px), 32px section rhythm
 *   <PageShell width="wide">          // dashboards
 *   <PageShell width="content" gap="stack-lg">  // focused / form pages
 */

type PaddingX = 'default' | 'comfortable';

interface PageShellOwnProps {
  width?: ContainerWidth;
  /** Vertical rhythm between top-level sections. Default `section` (32px). */
  gap?: Space;
  /**
   * Horizontal gutter preset.
   * - `default` (16/24/40px) — standard content pages.
   * - `comfortable` (24/40/48px) — settings/forms pages needing wider breathing room.
   */
  paddingX?: PaddingX;
  /**
   * Remove the responsive top padding.
   * Use when the first child (hero, EditorialHero, compact strip) already
   * provides its own top breathing room — avoids the double-spacing of
   * container-top (48px) + hero-top (32px).
   * Bottom padding is kept so the last section breathes above the footer.
   */
  noPadTop?: boolean;
  className?: string;
  children?: React.ReactNode;
}

const PADDING_X: Record<PaddingX, string> = {
  default:     'px-4 sm:px-6 lg:px-10',
  comfortable: 'px-6 sm:px-10 lg:px-12',
};

export function PageShell<E extends React.ElementType = 'div'>({
  as,
  width = 'page',
  gap = 'section',
  paddingX = 'default',
  noPadTop = false,
  className = '',
  children,
  ...rest
}: PolymorphicProps<E, PageShellOwnProps>) {
  const Tag = (as || 'div') as React.ElementType;
  return (
    <Tag
      className={cx(
        WIDTH[width],
        'mx-auto w-full',
        PADDING_X[paddingX],
        noPadTop
          ? 'pb-section md:pb-section-lg lg:pb-page'
          : 'py-section md:py-section-lg lg:py-page',
        'flex flex-col',
        GAP[gap],
        className,
      )}
      {...rest}
    >
      {children}
    </Tag>
  );
}

export default PageShell;
