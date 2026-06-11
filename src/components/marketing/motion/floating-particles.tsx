/**
 * Floating Particles
 * Ambient animated blobs/orbs floating in background
 * Perfect for Direction C (warm, organic, movement)
 */

import React from 'react'
import { motion } from 'framer-motion'

interface FloatingParticlesProps {
  count?: number
  colors?: string[]
  intensity?: 'subtle' | 'medium' | 'intense'
  className?: string
  blurAmount?: number
}

const Particle: React.FC<{
  index: number
  color: string
  intensity: 'subtle' | 'medium' | 'intense'
  blurAmount: number
}> = ({ index, color, intensity, blurAmount }) => {
  // Stagger animations per particle
  const duration = 15 + index * 2
  const delay = index * 0.5

  const intensityMap = {
    subtle: { opacity: 0.05, distance: 80 },
    medium: { opacity: 0.1, distance: 120 },
    intense: { opacity: 0.15, distance: 160 },
  }

  const { opacity, distance } = intensityMap[intensity]

  return (
    <motion.div
      className="absolute rounded-full"
      style={{
        backgroundColor: color,
        filter: `blur(${blurAmount}px)`,
        pointerEvents: 'none',
      }}
      initial={{
        width: Math.random() * 200 + 100,
        height: Math.random() * 200 + 100,
        opacity: 0,
        x: Math.random() * 400 - 200,
        y: Math.random() * 400 - 200,
      }}
      animate={{
        opacity: [opacity * 0.3, opacity, opacity * 0.5],
        x: [
          Math.random() * 400 - 200,
          Math.random() * distance - distance / 2,
          Math.random() * 400 - 200,
        ],
        y: [
          Math.random() * 400 - 200,
          Math.random() * distance - distance / 2,
          Math.random() * 400 - 200,
        ],
      }}
      transition={{
        duration,
        repeat: Infinity,
        ease: 'easeInOut',
        delay,
      }}
    />
  )
}

export const FloatingParticles: React.FC<FloatingParticlesProps> = ({
  count = 5,
  colors = ['#55A1B4', '#ED843A', '#F8B044'],
  intensity = 'subtle',
  className = '',
  blurAmount = 40,
}) => {
  return (
    <div
      className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}
      style={{
        zIndex: 0,
        mixBlendMode: 'screen',
      }}
    >
      {Array.from({ length: count }).map((_, i) => (
        <Particle
          key={i}
          index={i}
          color={colors[i % colors.length]}
          intensity={intensity}
          blurAmount={blurAmount}
        />
      ))}
    </div>
  )
}

export default FloatingParticles
