/**
 * HeroSection — Layout router for 4 hero patterns
 *
 * Props: layout, tone, animation, children content
 * Routes to:
 * - centered : min-h-[88vh], watercolor video, centered text (Clarity)
 * - cinematic : 100dvh full-screen video, dark overlay, white text (Cinematic/Narrative)
 * - parallax : 200vh sticky, parallax bg, text-left (Momentum)
 * - static-image : static image + ambient blobs (Elegant)
 */

import React from 'react';
import { useReducedMotion } from 'framer-motion';

export type HeroLayout = 'centered' | 'cinematic' | 'parallax' | 'static-image';

interface HeroSectionProps {
  layout?: HeroLayout;
  tone?: 'default' | 'dark' | 'warm';
  animation?: boolean;
  children?: React.ReactNode;
}

// ─── Layout: Centered (watercolor video, centered text) ──────────────────
const HeroCentered: React.FC<HeroSectionProps> = ({ animation = true, children }) => {
  const reduced = useReducedMotion();
  const videoRef = React.useRef<HTMLVideoElement>(null);

  React.useEffect(() => {
    if (reduced || !animation) return;
    const v = videoRef.current;
    if (!v) return;
    v.muted = true;
    v.play().catch(() => {});
  }, [reduced, animation]);

  return (
    <section className="relative min-h-[88vh] overflow-hidden bg-secondary-50">
      <div
        className="absolute inset-0 overflow-hidden pointer-events-none"
        aria-hidden
      >
        {!animation || reduced ? (
          <img
            src="/marketing/assets/hero-watercolor.webp"
            alt=""
            className="absolute inset-0 w-full h-full object-cover"
          />
        ) : (
          <video
            ref={videoRef}
            autoPlay
            loop
            muted
            playsInline
            preload="auto"
            poster="/marketing/assets/hero-watercolor.webp"
            className="absolute inset-0 w-full h-full object-cover"
            tabIndex={-1}
          >
            <source src="/videos/watercolour-reveal-4s.mp4" type="video/mp4" />
          </video>
        )}
      </div>

      <div className="relative min-h-[88vh] flex items-center">
        <div className="w-full max-w-page mx-auto px-6 py-page">
          <div className="flex flex-col items-center text-center gap-stack-lg">
            {children}
          </div>
        </div>
      </div>
    </section>
  );
};

// ─── Layout: Cinematic (full-screen video, dark overlay, white text) ─────
const HeroCinematic: React.FC<HeroSectionProps> = ({ animation = true, children }) => {
  const reduced = useReducedMotion();
  const videoRef = React.useRef<HTMLVideoElement>(null);

  React.useEffect(() => {
    if (reduced || !animation) return;
    const v = videoRef.current;
    if (!v) return;
    v.muted = true;
    v.play().catch(() => {});
  }, [reduced, animation]);

  return (
    <section className="relative min-h-[100dvh] overflow-hidden bg-ink-900">
      <div
        className="absolute inset-0 overflow-hidden pointer-events-none"
        aria-hidden
      >
        {!animation || reduced ? (
          <img
            src="/marketing/assets/hero-watercolor.webp"
            alt=""
            className="absolute inset-0 w-full h-full object-cover"
          />
        ) : (
          <video
            ref={videoRef}
            autoPlay
            loop
            muted
            playsInline
            preload="auto"
            poster="/marketing/assets/hero-watercolor.webp"
            className="absolute inset-0 w-full h-full object-cover"
            tabIndex={-1}
          >
            <source src="/videos/watercolour-reveal-4s.mp4" type="video/mp4" />
          </video>
        )}
      </div>

      {/* Dark overlay scrim */}
      <div
        aria-hidden
        className="absolute inset-0 bg-ink-900/40 pointer-events-none"
      />

      <div className="relative min-h-[100dvh] flex items-center justify-center">
        <div className="w-full max-w-page mx-auto px-6 py-page text-center flex flex-col items-center gap-stack-lg">
          {children}
        </div>
      </div>
    </section>
  );
};

// ─── Layout: Parallax (200vh sticky, scroll-driven) ─────────────────────
const HeroParallax: React.FC<HeroSectionProps> = ({ animation = true, children }) => {
  const reduced = useReducedMotion();
  const videoRef = React.useRef<HTMLVideoElement>(null);

  React.useEffect(() => {
    if (reduced || !animation) return;
    const v = videoRef.current;
    if (!v) return;
    v.muted = true;
    v.play().catch(() => {});
  }, [reduced, animation]);

  return (
    <section className="relative min-h-[200vh] overflow-hidden bg-primary-50">
      <div
        className="absolute inset-0 overflow-hidden pointer-events-none top-0 sticky h-screen"
        aria-hidden
      >
        {!animation || reduced ? (
          <img
            src="/marketing/assets/hero-watercolor.webp"
            alt=""
            className="absolute inset-0 w-full h-full object-cover"
          />
        ) : (
          <video
            ref={videoRef}
            autoPlay
            loop
            muted
            playsInline
            preload="auto"
            poster="/marketing/assets/hero-watercolor.webp"
            className="absolute inset-0 w-full h-full object-cover"
            tabIndex={-1}
          >
            <source src="/videos/watercolour-reveal-4s.mp4" type="video/mp4" />
          </video>
        )}
      </div>

      <div className="relative min-h-[200vh] flex items-center pt-section">
        <div className="w-full max-w-page mx-auto px-6">
          <div className="flex flex-col gap-stack-lg">
            {children}
          </div>
        </div>
      </div>
    </section>
  );
};

// ─── Layout: Static Image (no video, ambient blobs) ──────────────────────
const HeroStaticImage: React.FC<HeroSectionProps> = ({ children }) => (
  <section className="relative min-h-[88vh] overflow-hidden bg-ink-50">
    <div className="relative min-h-[88vh] flex items-center">
      <div className="w-full max-w-page mx-auto px-6 py-page">
        <div className="flex flex-col items-center text-center gap-stack-lg">
          {children}
        </div>
      </div>
    </div>
  </section>
);

// ─── Main router ─────────────────────────────────────────────────────────
export const HeroSection: React.FC<HeroSectionProps> = ({
  layout = 'centered',
  animation = true,
  children,
  ...rest
}) => {
  switch (layout) {
    case 'centered':
      return (
        <HeroCentered animation={animation} {...rest}>
          {children}
        </HeroCentered>
      );
    case 'cinematic':
      return (
        <HeroCinematic animation={animation} {...rest}>
          {children}
        </HeroCinematic>
      );
    case 'parallax':
      return (
        <HeroParallax animation={animation} {...rest}>
          {children}
        </HeroParallax>
      );
    case 'static-image':
      return (
        <HeroStaticImage animation={animation} {...rest}>
          {children}
        </HeroStaticImage>
      );
    default:
      return (
        <HeroCentered animation={animation} {...rest}>
          {children}
        </HeroCentered>
      );
  }
};

export default HeroSection;
