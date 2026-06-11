import React from 'react';
import { cx, GAP, type Space, type PolymorphicProps } from './_layout';

/**
 * Cluster — horizontal group that wraps gracefully.
 *
 * Replaces `flex flex-wrap items-center gap-…` (chip rows, tag lists, button
 * groups, meta rows — used 120×+ across pages). Wraps by default so it never
 * overflows on narrow viewports; set `wrap={false}` for a strict single row.
 *
 *   <Cluster>                          // chips/tags, 8px gap, centered
 *   <Cluster justify="between">        // title row: content left, actions right
 *   <Cluster gap="stack" wrap={false}> // toolbar that must stay on one line
 */

export type ClusterAlign = 'start' | 'center' | 'end' | 'baseline' | 'stretch';
export type ClusterJustify = 'start' | 'center' | 'end' | 'between';

const ALIGN: Record<ClusterAlign, string> = {
  start: 'items-start',
  center: 'items-center',
  end: 'items-end',
  baseline: 'items-baseline',
  stretch: 'items-stretch',
};

const JUSTIFY: Record<ClusterJustify, string> = {
  start: 'justify-start',
  center: 'justify-center',
  end: 'justify-end',
  between: 'justify-between',
};

interface ClusterOwnProps {
  /** Gap between items, bound to a spacing token. Default `stack-xs` (8px). */
  gap?: Space;
  align?: ClusterAlign;
  justify?: ClusterJustify;
  /** Allow items to wrap to multiple rows. Default true. */
  wrap?: boolean;
  className?: string;
  children?: React.ReactNode;
}

export function Cluster<E extends React.ElementType = 'div'>({
  as,
  gap = 'stack-xs',
  align = 'center',
  justify = 'start',
  wrap = true,
  className = '',
  children,
  ...rest
}: PolymorphicProps<E, ClusterOwnProps>) {
  const Tag = (as || 'div') as React.ElementType;
  return (
    <Tag
      className={cx(
        'flex',
        wrap && 'flex-wrap',
        ALIGN[align],
        JUSTIFY[justify],
        GAP[gap],
        className,
      )}
      {...rest}
    >
      {children}
    </Tag>
  );
}

export default Cluster;
