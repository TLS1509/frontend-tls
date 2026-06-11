import React from 'react';
import { cx, GAP, type Space, type PolymorphicProps } from './_layout';

/**
 * Grid — generic two-dimensional layout primitive.
 *
 * Two modes:
 *   • fluid (default) — `min` sets a column floor; the grid fits as many equal
 *     columns as the width allows, no breakpoints needed. Replaces the ad-hoc
 *     `grid-cols-[repeat(auto-fit,minmax(220px,1fr))]` scattered across pages.
 *     The `min(<min>,100%)` clamp prevents overflow when the viewport is
 *     narrower than one column.
 *   • fixed — `cols` sets an explicit column count (add responsive variants via
 *     className when needed).
 *
 *   <Grid min="220px" gap="stack-lg">   // fluid — DEFAULT shape
 *   <Grid cols={3} gap="stack">         // fixed 3-up
 *
 * For card collections prefer the opinionated <CardGrid> (card-tuned column
 * presets); reach for <Grid> when you need a raw, content-agnostic grid.
 */

const COLS: Record<number, string> = {
  1: 'grid-cols-1',
  2: 'grid-cols-2',
  3: 'grid-cols-3',
  4: 'grid-cols-4',
  5: 'grid-cols-5',
  6: 'grid-cols-6',
};

interface GridOwnProps {
  /** Fluid mode: minimum column width (e.g. "220px", "16rem"). Default "240px". */
  min?: string;
  /** Fixed mode: explicit column count (1–6). Wins over `min`. */
  cols?: 1 | 2 | 3 | 4 | 5 | 6;
  /** Gap between cells, bound to a spacing token. Default `stack` (16px). */
  gap?: Space;
  className?: string;
  style?: React.CSSProperties;
  children?: React.ReactNode;
}

export function Grid<E extends React.ElementType = 'div'>({
  as,
  min = '240px',
  cols,
  gap = 'stack',
  className = '',
  style,
  children,
  ...rest
}: PolymorphicProps<E, GridOwnProps>) {
  const Tag = (as || 'div') as React.ElementType;
  const fixed = cols != null;
  return (
    <Tag
      className={cx('grid', GAP[gap], fixed && COLS[cols], className)}
      style={
        fixed
          ? style
          : {
              gridTemplateColumns: `repeat(auto-fit, minmax(min(${min}, 100%), 1fr))`,
              ...style,
            }
      }
      {...rest}
    >
      {children}
    </Tag>
  );
}

export default Grid;
