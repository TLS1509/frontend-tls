/**
 * Scroll Effects Utilities — Direction C Immersive Scroll Experience
 *
 * Provides reusable scroll-driven animations for the marketing site:
 * - Parallax effect (elements move at different speeds)
 * - Scroll-triggered reveals (fade + slide on intersection)
 * - Scroll progress indicator
 * - Orchestrated stagger reveals
 *
 * All effects respect prefers-reduced-motion and use GPU-safe transforms
 */

import React from 'react'
import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
  useInView,
} from 'framer-motion'

/**
 * ParallaxSection: Container moves slower than page scroll (parallax effect)
 * Creates depth perception as viewport scrolls
 */
export const ParallaxSection = React.forwardRef<
  HTMLDivElement,
  {
    children: React.ReactNode
    speed?: number // 0.5 = half scroll speed, 1 = normal, 2 = double
    className?: string
  }
>(({ children, speed = 0.5, className = '' }, ref) => {
  const containerRef = React.useRef<HTMLDivElement>(null)
  const { scrollY } = useScroll()
  const reduceMotion = useReducedMotion()

  // Parallax: as scrollY increases, element moves up slower.
  // Clamped (default) so the offset caps at -200*speed instead of
  // extrapolating unbounded for sections far down a long page — an
  // unclamped transform pushed a section ~890px off its box further down
  // this homepage, reading as a giant empty gap between sections.
  const y = useTransform(
    scrollY,
    [0, 1000],
    [0, -200 * speed]
  )

  return (
    <motion.div
      ref={ref || containerRef}
      className={className}
      style={{
        y: reduceMotion ? 0 : y,
      }}
    >
      {children}
    </motion.div>
  )
})
ParallaxSection.displayName = 'ParallaxSection'

/**
 * ScrollReveal: Fade + slide-up reveal when element enters viewport
 * More sophisticated than basic Reveal: orchestrates stagger groups
 */
export const ScrollReveal = React.forwardRef<
  HTMLDivElement,
  {
    children: React.ReactNode
    className?: string
    delay?: number // stagger delay in seconds
    duration?: number // animation duration in ms
    distance?: number // slide distance in px
  }
>(
  (
    {
      children,
      className = '',
      delay = 0,
      duration = 600,
      distance = 14,
    },
    ref
  ) => {
    const containerRef = React.useRef<HTMLDivElement>(null)
    const isInView = useInView(containerRef, {
      once: true,
      margin: '0px 0px -8% 0px',
      amount: 0.01,
    })
    const reduceMotion = useReducedMotion()

    return (
      <motion.div
        ref={ref || containerRef}
        className={className}
        initial={reduceMotion ? false : { y: distance, opacity: 0 }}
        animate={isInView ? { y: 0, opacity: 1 } : { y: distance, opacity: 0 }}
        transition={{
          duration: duration / 1000,
          delay,
          ease: [0.21, 0.47, 0.32, 0.98], // cubic-bezier
        }}
      >
        {children}
      </motion.div>
    )
  }
)
ScrollReveal.displayName = 'ScrollReveal'

/**
 * StaggerGroup: Orchestrates staggered reveals of children
 * Each child animates with sequential delay
 */
export const StaggerGroup = React.forwardRef<
  HTMLDivElement,
  {
    children: React.ReactNode
    className?: string
    staggerDelay?: number // delay between each child (ms)
    delayFirst?: number // delay before first child (ms)
  }
>(
  (
    {
      children,
      className = '',
      staggerDelay = 100,
      delayFirst = 0,
    },
    ref
  ) => {
    const containerRef = React.useRef<HTMLDivElement>(null)
    const isInView = useInView(containerRef, {
      once: true,
      margin: '0px 0px -8% 0px',
      amount: 0.01,
    })
    const reduceMotion = useReducedMotion()

    return (
      <motion.div
        ref={ref || containerRef}
        className={className}
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
        variants={{
          hidden: { opacity: 0 },
          visible: { opacity: 1 },
        }}
      >
        {React.Children.map(children, (child, i) => (
          <motion.div
            key={i}
            variants={{
              hidden: { y: 14, opacity: 0 },
              visible: {
                y: 0,
                opacity: 1,
                transition: {
                  delay: reduceMotion ? 0 : (delayFirst + i * staggerDelay) / 1000,
                  duration: 0.6,
                  ease: [0.21, 0.47, 0.32, 0.98],
                },
              },
            }}
          >
            {child}
          </motion.div>
        ))}
      </motion.div>
    )
  }
)
StaggerGroup.displayName = 'StaggerGroup'

/**
 * ScrollProgressIndicator: Visual indicator of scroll progress
 * Thin bar at top that fills as page scrolls
 */
export const ScrollProgressIndicator: React.FC<{
  color?: string // CSS color (default: primary-600)
  height?: number // height in px (default: 3)
}> = ({ color = 'rgb(var(--color-primary-600))', height = 3 }) => {
  const { scrollYProgress } = useScroll()

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 z-50"
      style={{
        height: `${height}px`,
        backgroundColor: color,
        scaleX: scrollYProgress,
        transformOrigin: '0%',
      }}
    />
  )
}

/**
 * OrchestrationContext: Coordinate multiple scroll animations
 * Useful for syncing parallax + reveals across sections
 */
export const OrchestrationContext = React.createContext<{
  scrollProgress: any
  isInView: any
}>({
  scrollProgress: null,
  isInView: null,
})

export const OrchestrationProvider: React.FC<{
  children: React.ReactNode
}> = ({ children }) => {
  const { scrollYProgress } = useScroll()

  return (
    <OrchestrationContext.Provider
      value={{
        scrollProgress: scrollYProgress,
        isInView: null, // can be extended
      }}
    >
      {children}
    </OrchestrationContext.Provider>
  )
}
