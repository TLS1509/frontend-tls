/**
 * Hover Lift Card
 * Card lifts up with shadow growth on hover
 * Simple, premium interaction for all card types
 */

import React from 'react'
import { motion } from 'framer-motion'

interface HoverLiftCardProps {
  children: React.ReactNode
  className?: string
  shadowIntensity?: 'light' | 'medium' | 'heavy'
  liftDistance?: number // px
}

export const HoverLiftCard: React.FC<HoverLiftCardProps> = ({
  children,
  className = '',
  shadowIntensity = 'medium',
  liftDistance = 8,
}) => {
  const shadowMap = {
    light: 'shadow-md',
    medium: 'shadow-2xl',
    heavy: 'shadow-[0_40px_64px_-12px_rgba(0,0,0,0.15)]',
  }

  return (
    <motion.div
      className={`${className} transition-all duration-300`}
      whileHover={{
        y: -liftDistance,
      }}
      whileTap={{
        y: -liftDistance * 0.5,
      }}
      transition={{
        type: 'spring',
        stiffness: 300,
        damping: 25,
      }}
    >
      <motion.div
        className={shadowMap[shadowIntensity]}
        animate={{
          boxShadow: [
            '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
            '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
          ],
        }}
        whileHover={{
          boxShadow: '0 20px 40px -12px rgba(0, 0, 0, 0.15)',
        }}
        transition={{ duration: 0.3 }}
      >
        {children}
      </motion.div>
    </motion.div>
  )
}

export default HoverLiftCard
