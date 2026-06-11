import React from 'react';
import { cx, GAP, type Space, type PolymorphicProps } from './_layout';

/**
 * Stack — vertical flow with a single, token-bound gap.
 *
 * Replaces `flex flex-col gap-…` (the most common layout shape in the app).
 * One owner for vertical rhythm: children never carry their own top/bottom
 * margins, so the "double-spacing trap" (margin + parent gap) can't happen.
 *
 *   <Stack gap="section">      // between sibling sections (32px)
 *   <Stack gap="stack">        // DEFAULT — card stacks (16px)
 *   <Stack as="section" gap="stack">  // semantic <section> wrapper
 */

export type StackAlign = 'start' | 'center' | 'end' | 'stretch';

const ALIGN: Record<StackAlign, string> = {
  start: 'items-start',
  center: 'items-center',
  end: 'items-end',
  stretch: 'items-stretch',
};

interface StackOwnProps {
  /** Vertical gap, bound to a spacing token. Default `stack` (16px). */
  gap?: Space;
  /** Cross-axis alignment. Omit for the flex default (stretch). */
  align?: StackAlign;
  className?: string;
  children?: React.ReactNode;
}

export function Stack<E extends React.ElementType = 'div'>({
  as,
  gap = 'stack',
  align,
  className = '',
  children,
  ...rest
}: PolymorphicProps<E, StackOwnProps>) {
  const Tag = (as || 'div') as React.ElementType;
  return (
    <Tag
      className={cx('flex flex-col', GAP[gap], align && ALIGN[align], className)}
      {...rest}
    >
      {children}
    </Tag>
  );
}

export default Stack;
