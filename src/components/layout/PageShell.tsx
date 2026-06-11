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

interface PageShellOwnProps {
  width?: ContainerWidth;
  /** Vertical rhythm between top-level sections. Default `section` (32px). */
  gap?: Space;
  className?: string;
  children?: React.ReactNode;
}

export function PageShell<E extends React.ElementType = 'div'>({
  as,
  width = 'page',
  gap = 'section',
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
        'px-4 sm:px-6 lg:px-10',
        'py-section md:py-section-lg lg:py-page',
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
