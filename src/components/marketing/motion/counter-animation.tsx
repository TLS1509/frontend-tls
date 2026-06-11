/**
 * Counter Animation
 * Displays "Step 1/3", "Step 2/3" with animated counter
 * Numbers count up smoothly when the step changes
 */

import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

interface CounterAnimationProps {
  currentStep: number // 0, 1, 2 (but display as 1, 2, 3)
  totalSteps?: number // default: 3
  label?: string // e.g., "Étape" (shown before the counter)
  className?: string
  colorClass?: string // text color, e.g., "text-secondary-600"
}

/**
 * Animated counter that counts from previous value to current
 * Uses Framer Motion for smooth number animation
 */
const AnimatedNumber: React.FC<{ value: number }> = ({ value }) => {
  return (
    <motion.span
      key={value}
      initial={{ y: 10, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: -10, opacity: 0 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
    >
      {value}
    </motion.span>
  )
}

export const CounterAnimation: React.FC<CounterAnimationProps> = ({
  currentStep,
  totalSteps = 3,
  label = 'Étape',
  className = '',
  colorClass = 'text-secondary-600',
}) => {
  const displayStep = currentStep + 1 // Convert 0-indexed to 1-indexed display
  const [prevStep, setPrevStep] = useState(displayStep)

  useEffect(() => {
    setPrevStep(displayStep)
  }, [displayStep])

  return (
    <div className={`inline-flex items-baseline gap-2 ${className}`}>
      <span className={`font-body text-caption font-semibold uppercase tracking-widest ${colorClass}`}>
        {label}
      </span>
      <motion.span
        className={`font-display font-bold text-h3 ${colorClass}`}
        layout
      >
        <AnimatedNumber value={displayStep} />
        <span>/{totalSteps}</span>
      </motion.span>
    </div>
  )
}

export default CounterAnimation
