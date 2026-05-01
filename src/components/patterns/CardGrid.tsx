import React from 'react';

export type CardGridLayout = 'compact' | 'default' | 'feature';
export type CardGridGapSize = 'sm' | 'md' | 'lg';

export interface CardGridProps {
  children: React.ReactNode;
  layout?: CardGridLayout;
  gapSize?: CardGridGapSize;
  autoFit?: boolean;
  className?: string;
}

/**
 * CardGrid — Responsive grid layout component for card collections
 *
 * Layouts:
 * - compact: 2 columns
 * - default: 3 columns (default)
 * - feature: 4 columns
 * - autoFit: Flexible columns based on minmax(180px, 1fr)
 *
 * Responsive breakpoints:
 * - Desktop (1280px+): Full column count
 * - Tablet (768px-1023px): Column count - 1
 * - Mobile (< 768px): 1 column
 */
export const CardGrid: React.FC<CardGridProps> = ({
  children,
  layout = 'default',
  gapSize = 'md',
  autoFit = false,
  className = '',
}) => {
  const classes = [
    'card-grid',
    `card-grid--${layout}`,
    `card-grid--gap-${gapSize}`,
    autoFit && 'card-grid--autofit',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return <div className={classes}>{children}</div>;
};
