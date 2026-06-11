import React, { useEffect, useRef, useState } from 'react';
import { motion, useScroll } from 'framer-motion';

export type StoryPanel = {
  eyebrow?: string;
  title: string;
  body: string;
};

type Props = {
  panels: StoryPanel[];
  /** Render function for the sticky visual. Receives the active panel index (0..panels.length-1). */
  visual: (activeIndex: number) => React.ReactNode;
  /** Optional eyebrow color tone for all panels. */
  eyebrowToneClass?: string;
  /** Side of the visual. 'right' (default) = text left, visual right. */
  visualSide?: 'left' | 'right';
  /** Optional render function for custom text layout (e.g., with parallax layers). */
  renderText?: (panel: StoryPanel, index: number, isActive: boolean) => React.ReactNode;
  className?: string;
};

/**
 * Sticky-scroll storytelling section.
 *
 * - Section is `N * 100vh` tall, where N = panels.length.
 * - Inner content sticks to top of viewport while user scrolls.
 * - Active panel index = floor(scrollProgress * N).
 * - Visual is rendered via callback so caller controls morphing.
 *
 * Mobile fallback (<lg): panels stack vertically with visual repeated per panel.
 */
export const StickyScrollStory: React.FC<Props> = ({
  panels,
  visual,
  eyebrowToneClass = 'text-warning-fg',
  visualSide = 'right',
  renderText,
  className = '',
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end end'],
  });
  const [active, setActive] = useState(0);

  useEffect(() => {
    const unsubscribe = scrollYProgress.on('change', (v) => {
      const idx = Math.min(
        panels.length - 1,
        Math.max(0, Math.floor(v * panels.length))
      );
      setActive(idx);
    });
    return () => unsubscribe();
  }, [scrollYProgress, panels.length]);

  return (
    <>
      {/* Desktop: sticky scroll */}
      <section
        ref={ref}
        className={`hidden lg:block relative ${className}`}
        style={{ height: `${panels.length * 100}vh` }}
      >
        <div className="sticky top-0 h-screen flex items-center">
          <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 gap-page items-center w-full">
            {/* Text column */}
            <div className={`relative min-h-[400px] ${visualSide === 'left' ? 'order-2' : ''}`}>
              {panels.map((panel, i) => (
                <motion.div
                  key={i}
                  initial={false}
                  animate={{
                    opacity: active === i ? 1 : 0,
                    y: active === i ? 0 : 24,
                  }}
                  transition={{ duration: 0.5, ease: [0.21, 0.47, 0.32, 0.98] }}
                  className={i === 0 ? 'relative flex flex-col gap-stack-lg' : 'absolute inset-0 flex flex-col gap-stack-lg'}
                  style={{ pointerEvents: active === i ? 'auto' : 'none' }}
                >
                  {renderText ? (
                    renderText(panel, i, active === i)
                  ) : (
                    <>
                      {panel.eyebrow && (
                        <span className={`font-body text-caption font-bold ${eyebrowToneClass} uppercase tracking-widest`}>
                          {panel.eyebrow}
                        </span>
                      )}
                      <h3 className="font-display text-[clamp(2rem,4vw,3.25rem)] font-extrabold text-ink-900 leading-[1.05] tracking-tight m-0">
                        {panel.title}
                      </h3>
                      <p className="font-body text-body-lg text-ink-600 leading-relaxed m-0 max-w-xl">
                        {panel.body}
                      </p>
                    </>
                  )}
                  <div className="flex items-center gap-2 pt-stack">
                    {panels.map((_, j) => (
                      <span
                        key={j}
                        className={`h-1 rounded-pill transition-all duration-slow ${
                          j === active ? 'w-8 bg-primary-600' : 'w-2 bg-ink-200'
                        }`}
                      />
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
            {/* Visual column */}
            <div className={`relative flex items-center justify-center ${visualSide === 'left' ? 'order-1' : ''}`}>
              {visual(active)}
            </div>
          </div>
        </div>
      </section>

      {/* Mobile: stack panels */}
      <section className={`lg:hidden ${className}`}>
        <div className="max-w-7xl mx-auto px-6 flex flex-col gap-page">
          {panels.map((panel, i) => (
            <div key={i} className="flex flex-col gap-stack-lg">
              {renderText ? (
                renderText(panel, i, true)
              ) : (
                <>
                  {panel.eyebrow && (
                    <span className={`font-body text-caption font-bold ${eyebrowToneClass} uppercase tracking-widest`}>
                      {panel.eyebrow}
                    </span>
                  )}
                  <h3 className="font-display text-h2 font-extrabold text-ink-900 leading-[1.05] tracking-tight m-0">
                    {panel.title}
                  </h3>
                  <p className="font-body text-body-lg text-ink-600 leading-relaxed m-0">
                    {panel.body}
                  </p>
                </>
              )}
              <div className="flex items-center justify-center">{visual(i)}</div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
};

export default StickyScrollStory;
