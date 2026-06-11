/**
 * Parallax Text Layers
 * Applies different scroll speeds to eyebrow, title, and body text
 * Creates depth effect where text layers move at different rates during scroll
 */

import React from 'react'
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion'

interface ParallaxTextLayersProps {
  eyebrow?: React.ReactNode
  eyebrowClass?: string
  title?: React.ReactNode
  titleClass?: string
  body?: React.ReactNode
  bodyClass?: string
  containerClass?: string
  // Parallax speeds (0 = stationary, 0.5 = half scroll speed, 1 = normal scroll)
  eyebrowSpeed?: number
  titleSpeed?: number
  bodySpeed?: number
}

/**
 * Parallax text layer component
 * Uses scroll position to move text at different speeds
 */
const ParallaxTextLayer: React.FC<{
  children: React.ReactNode
  speed: number
  className?: string
}> = ({ children, speed, className = '' }) => {
  const ref = React.useRef<HTMLDivElement>(null)
  const { scrollY } = useScroll()
  const reduceMotion = useReducedMotion()

  // Transform: as scrollY increases, move element up (negative Y) at specified speed
  const y = useTransform(scrollY, [0, 1000], [0, -100 * speed], {
    clamp: false,
  })

  return (
    <motion.div
      ref={ref}
      className={className}
      style={{
        y: reduceMotion ? 0 : y,
      }}
    >
      {children}
    </motion.div>
  )
}

export const ParallexTextLayers: React.FC<ParallaxTextLayersProps> = ({
  eyebrow,
  eyebrowClass = 'font-body text-caption font-bold uppercase tracking-widest text-secondary-600 m-0',
  title,
  titleClass = 'font-display font-extrabold text-ink-900 leading-[1.04] tracking-tight m-0 [text-wrap:balance] text-[clamp(2rem,4.5vw,3.5rem)]',
  body,
  bodyClass = 'font-body text-body-lg text-ink-600 leading-relaxed m-0 max-w-2xl',
  containerClass = 'flex flex-col gap-stack-lg',
  eyebrowSpeed = 0.3,
  titleSpeed = 0.5,
  bodySpeed = 0.7,
}) => {
  return (
    <div className={containerClass}>
      {eyebrow && (
        <ParallaxTextLayer speed={eyebrowSpeed} className={eyebrowClass}>
          {eyebrow}
        </ParallaxTextLayer>
      )}

      {title && (
        <ParallaxTextLayer speed={titleSpeed} className={titleClass}>
          {title}
        </ParallaxTextLayer>
      )}

      {body && (
        <ParallaxTextLayer speed={bodySpeed} className={bodyClass}>
          {body}
        </ParallaxTextLayer>
      )}
    </div>
  )
}

export default ParallexTextLayers
