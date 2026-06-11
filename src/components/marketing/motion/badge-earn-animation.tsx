/**
 * Badge Earn Animation
 * Badge pops in with particle burst when unlocked
 * Perfect for Learning App achievement celebrations
 */

import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface BadgeEarnAnimationProps {
  isEarned: boolean
  badgeIcon?: React.ReactNode
  badgeLabel?: string
  badgeColor?: string
  particleCount?: number
  onAnimationComplete?: () => void
}

const Particle: React.FC<{
  index: number
  color: string
}> = ({ index, color }) => {
  const angle = (index / 12) * Math.PI * 2
  const distance = 100 + Math.random() * 50
  const x = Math.cos(angle) * distance
  const y = Math.sin(angle) * distance

  return (
    <motion.div
      className="absolute w-2 h-2 rounded-full pointer-events-none"
      style={{
        backgroundColor: color,
        left: '50%',
        top: '50%',
      }}
      initial={{
        x: 0,
        y: 0,
        opacity: 1,
        scale: 1,
      }}
      animate={{
        x,
        y,
        opacity: 0,
        scale: 0,
      }}
      transition={{
        duration: 0.8,
        ease: 'easeOut',
      }}
    />
  )
}

export const BadgeEarnAnimation: React.FC<BadgeEarnAnimationProps> = ({
  isEarned,
  badgeIcon,
  badgeLabel,
  badgeColor = '#ED843A',
  particleCount = 12,
  onAnimationComplete,
}) => {
  return (
    <AnimatePresence>
      {isEarned && (
        <div className="relative w-32 h-32 mx-auto">
          {/* Particle burst */}
          <div className="absolute inset-0 w-full h-full">
            {Array.from({ length: particleCount }).map((_, i) => (
              <Particle key={i} index={i} color={badgeColor} />
            ))}
          </div>

          {/* Badge container */}
          <motion.div
            className="absolute inset-0 flex items-center justify-center"
            initial={{ scale: 0, rotate: -180, opacity: 0 }}
            animate={{ scale: 1, rotate: 0, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{
              type: 'spring',
              stiffness: 100,
              damping: 15,
              duration: 0.6,
            }}
            onAnimationComplete={onAnimationComplete}
          >
            {/* Glow effect */}
            <motion.div
              className="absolute inset-0 rounded-full"
              style={{
                background: `radial-gradient(circle, ${badgeColor}, transparent)`,
                filter: 'blur(20px)',
              }}
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.6, 0.3, 0.6],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
              }}
            />

            {/* Badge content */}
            <motion.div
              className="relative z-10 flex flex-col items-center gap-2 bg-white rounded-full w-28 h-28 flex items-center justify-center shadow-lg"
              animate={{
                y: [0, -8, 0],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            >
              {badgeIcon && (
                <div className="text-4xl">{badgeIcon}</div>
              )}
              {badgeLabel && (
                <p className="font-body text-caption font-bold text-center text-ink-900">
                  {badgeLabel}
                </p>
              )}
            </motion.div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}

export default BadgeEarnAnimation
