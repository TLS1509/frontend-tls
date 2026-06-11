/**
 * Spotlight Border
 * Glowing border that responds to cursor position
 * Premium effect (Apple, Linear style)
 */

import React, { useRef, useState } from 'react'
import { motion } from 'framer-motion'

interface SpotlightBorderProps {
  children: React.ReactNode
  className?: string
  intensity?: number // 0-1
  color?: string // rgb or hex
  borderRadius?: string
}

export const SpotlightBorder: React.FC<SpotlightBorderProps> = ({
  children,
  className = '',
  intensity = 0.6,
  color = 'rgb(85, 161, 180)',
  borderRadius = '1rem',
}) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isHovering, setIsHovering] = useState(false)

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return

    const rect = containerRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    setMousePosition({ x, y })
  }

  const handleMouseEnter = () => setIsHovering(true)
  const handleMouseLeave = () => setIsHovering(false)

  return (
    <div
      ref={containerRef}
      className={`relative ${className}`}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Spotlight glow layer */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{
          borderRadius,
          overflow: 'hidden',
        }}
        animate={{
          opacity: isHovering ? intensity : 0,
        }}
        transition={{ duration: 0.3 }}
      >
        <motion.div
          className="absolute inset-0"
          style={{
            background: `radial-gradient(circle 150px at ${mousePosition.x}px ${mousePosition.y}px, ${color}, transparent)`,
            filter: 'blur(24px)',
          }}
        />
      </motion.div>

      {/* Border ring */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{
          borderRadius,
          border: `1px solid`,
          borderColor: color,
        }}
        animate={{
          opacity: isHovering ? intensity * 0.5 : 0.1,
        }}
        transition={{ duration: 0.3 }}
      />

      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  )
}

export default SpotlightBorder
