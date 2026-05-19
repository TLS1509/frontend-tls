import React from 'react';

type Props = {
  /** Opacity 0..1. Default 0.04 (very subtle). */
  opacity?: number;
  className?: string;
};

/**
 * Decorative noise/grain texture overlay. Adds analog warmth to flat gradients.
 * Inline SVG, GPU-accelerated, no network request.
 *
 * Use over hero gradients and large color blocks. Always `pointer-events-none`,
 * `mix-blend-overlay`.
 *
 * Tip : keep opacity ≤ 0.06 to avoid visual noise on text.
 */
export const NoiseTexture: React.FC<Props> = ({ opacity = 0.04, className = '' }) => (
  <div
    aria-hidden
    className={`absolute inset-0 pointer-events-none mix-blend-overlay ${className}`}
    style={{
      opacity,
      backgroundImage:
        "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 256 256'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/%3E%3CfeColorMatrix values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.6 0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
      backgroundSize: '256px 256px',
    }}
  />
);

export default NoiseTexture;
