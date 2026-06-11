/**
 * Morphing SVG Visualizer
 * Animates between different SVG shapes (loop → circle → path) based on active panel
 * Perfect for Learn → Do → Match visual system
 */

import React from 'react'
import { motion } from 'framer-motion'

type Shape = 'loop' | 'circle' | 'path'

interface MorphingSVGVisualizerProps {
  activeIndex: number // 0, 1, or 2 for Learn, Do, Match
  size?: number
  className?: string
  colorClass?: string // e.g., "text-secondary-600" (uses currentColor)
}

// SVG path definitions for each shape
const SHAPES: Record<Shape, string> = {
  loop: 'M 50 20 Q 80 20 80 50 Q 80 80 50 80 Q 20 80 20 50 Q 20 20 50 20 M 50 35 Q 65 35 65 50 Q 65 65 50 65 Q 35 65 35 50 Q 35 35 50 35',
  circle: 'M 50 20 Q 80 20 80 50 Q 80 80 50 80 Q 20 80 20 50 Q 20 20 50 20',
  path: 'M 20 60 L 50 20 L 80 60 M 50 20 L 50 80',
}

/**
 * SVG that morphs between shapes with smooth animation
 * Uses Framer Motion's custom animationPreferences
 */
const MorphingShape: React.FC<{
  shape: Shape
  size: number
  strokeColor: string
}> = ({ shape, size, strokeColor }) => {
  return (
    <motion.svg
      viewBox="0 0 100 100"
      width={size}
      height={size}
      className="overflow-visible"
      style={{
        filter: 'drop-shadow(0 0 8px rgba(0,0,0,0.08))',
      }}
    >
      <motion.path
        d={SHAPES[shape]}
        fill="none"
        stroke={strokeColor}
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={false}
        animate={{ d: SHAPES[shape] }}
        transition={{
          duration: 0.8,
          ease: [0.34, 1.56, 0.64, 1], // custom cubic-bezier for smooth morph
        }}
      />
    </motion.svg>
  )
}

export const MorphingSVGVisualizer: React.FC<MorphingSVGVisualizerProps> = ({
  activeIndex,
  size = 120,
  className = '',
  colorClass = 'text-secondary-600',
}) => {
  const shapes: Shape[] = ['loop', 'circle', 'path']
  const currentShape = shapes[activeIndex % shapes.length]

  // Extract hex color from tailwind class (for SVG stroke)
  // Fallback to secondary-600 teal color
  const colorMap: Record<string, string> = {
    'text-secondary-600': '#55A1B4', // teal
    'text-primary-600': '#0984B4', // primary blue
    'text-accent-600': '#ED843A', // orange
  }
  const strokeColor = colorMap[colorClass] || '#55A1B4'

  return (
    <div className={`flex items-center justify-center ${className}`}>
      <motion.div
        key={`shape-${activeIndex}`}
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.8, opacity: 0 }}
        transition={{ duration: 0.4, ease: 'easeOut' }}
      >
        <MorphingShape shape={currentShape} size={size} strokeColor={strokeColor} />
      </motion.div>
    </div>
  )
}

export default MorphingSVGVisualizer
