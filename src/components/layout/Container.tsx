import React from 'react';
import { cx, type PolymorphicProps } from './_layout';
import { WIDTH, type ContainerWidth } from './widths';

/**
 * Container — width-capped, centered content column with the canonical
 * responsive horizontal gutter.
 *
 * Replaces the hand-typed `max-w-… mx-auto px-4 sm:px-6 lg:px-10` that appears
 * ~250× across pages. Widths bind to the `--container-*` source-of-truth tokens
 * (index.css @theme), so the whole app shifts from one place.
 *
 *   prose    65ch   → long-form reading column (articles)
 *   content  768px  → narrow / focused pages (forms, single column)
 *   page     1152px → DEFAULT — standard content pages
 *   wide     1280px → dashboards / data-rich pages
 *   full     none   → edge-to-edge (gutter still applies unless padding={false})
 *
 * Use `as` for the right landmark: `<Container as="main">` for the primary
 * region, `as="section"` / `as="article"` for nested ones.
 */

export type { ContainerWidth };

/** Canonical responsive page gutter — 16 / 24 / 40px. */
const GUTTER = 'px-4 sm:px-6 lg:px-10';

interface ContainerOwnProps {
  width?: ContainerWidth;
  /** Apply the responsive horizontal gutter. Default true. */
  padding?: boolean;
  className?: string;
  children?: React.ReactNode;
}

export function Container<E extends React.ElementType = 'div'>({
  as,
  width = 'page',
  padding = true,
  className = '',
  children,
  ...rest
}: PolymorphicProps<E, ContainerOwnProps>) {
  const Tag = (as || 'div') as React.ElementType;
  return (
    <Tag
      className={cx(WIDTH[width], 'mx-auto w-full', padding && GUTTER, className)}
      {...rest}
    >
      {children}
    </Tag>
  );
}

export default Container;
