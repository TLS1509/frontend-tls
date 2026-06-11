/**
 * Score Counter
 * Number counts up when quiz/challenge completes
 * Celebration animation with optional confetti-like effect
 */

import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

interface ScoreCounterProps {
  finalScore: number
  maxScore: number
  isComplete: boolean
  duration?: number
  label?: string
  showPercentage?: boolean
  colors?: {
    background: string
    text: string
    accent: string
  }
  onComplete?: () => void
}

const Particle: React.FC<{
  index: number
  accentColor: string
}> = ({ index, accentColor }) => {
  const angle = (index / 8) * Math.PI * 2
  const distance = 60 + Math.random() * 30
  const x = Math.cos(angle) * distance
  const y = Math.sin(angle) * distance

  return (
    <motion.div
      className="absolute w-2 h-2 rounded-full pointer-events-none"
      style={{
        backgroundColor: accentColor,
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

export const ScoreCounter: React.FC<ScoreCounterProps> = ({
  finalScore,
  maxScore,
  isComplete,
  duration = 1.5,
  label = 'Score',
  showPercentage = true,
  colors = {
    background: '#F0F9FF',
    text: '#0984B4',
    accent: '#ED843A',
  },
  onComplete,
}) => {
  const [displayScore, setDisplayScore] = useState(0)
  const percentage = Math.round((finalScore / maxScore) * 100)

  useEffect(() => {
    if (!isComplete) {
      setDisplayScore(0)
      return
    }

    const interval = setInterval(() => {
      setDisplayScore((prev) => {
        if (prev >= finalScore) {
          clearInterval(interval)
          onComplete?.()
          return finalScore
        }
        return prev + Math.ceil((finalScore - prev) / 10)
      })
    }, 30)

    return () => clearInterval(interval)
  }, [isComplete, finalScore, onComplete])

  return (
    <motion.div
      className="relative flex flex-col items-center gap-4 p-8 rounded-2xl"
      style={{
        backgroundColor: colors.background,
      }}
      initial={{ scale: 0.8, opacity: 0 }}
      animate={isComplete ? { scale: 1, opacity: 1 } : {}}
      transition={{
        type: 'spring',
        stiffness: 100,
        damping: 15,
      }}
    >
      {/* Particle burst */}
      {isComplete && (
        <div className="absolute inset-0 w-full h-full">
          {Array.from({ length: 8 }).map((_, i) => (
            <Particle key={i} index={i} accentColor={colors.accent} />
          ))}
        </div>
      )}

      {/* Glow effect */}
      <motion.div
        className="absolute inset-0 rounded-2xl pointer-events-none"
        style={{
          background: `radial-gradient(circle, ${colors.accent}, transparent)`,
          filter: 'blur(30px)',
        }}
        animate={{
          scale: isComplete ? [1, 1.1, 1] : 0,
          opacity: isComplete ? [0.4, 0.2, 0] : 0,
        }}
        transition={{
          duration: 1.2,
          ease: 'easeOut',
        }}
      />

      {/* Content */}
      <div className="relative z-10 text-center">
        <p className="font-body text-caption font-semibold uppercase tracking-widest text-ink-500 m-0 mb-2">
          {label}
        </p>

        <motion.div
          className="flex items-baseline justify-center gap-2"
          initial={{ scale: 0 }}
          animate={isComplete ? { scale: 1 } : {}}
          transition={{
            type: 'spring',
            stiffness: 150,
            damping: 12,
            delay: 0.2,
          }}
        >
          <span
            className="font-display font-extrabold text-h1"
            style={{ color: colors.text }}
          >
            {displayScore}
          </span>
          <span
            className="font-display font-bold text-h3"
            style={{ color: colors.text, opacity: 0.6 }}
          >
            / {maxScore}
          </span>
        </motion.div>

        {showPercentage && (
          <motion.p
            className="font-body text-body font-semibold mt-2 m-0"
            style={{ color: colors.accent }}
            initial={{ opacity: 0 }}
            animate={isComplete ? { opacity: 1 } : {}}
            transition={{ delay: 0.4 }}
          >
            {percentage}%
          </motion.p>
        )}
      </div>

      {/* Success message */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={isComplete ? { opacity: 1, y: 0 } : {}}
        transition={{ delay: 0.6 }}
        className="relative z-10"
      >
        <p className="font-body text-body text-ink-600 text-center m-0">
          {percentage >= 80
            ? '🎉 Excellent!'
            : percentage >= 60
              ? '✨ Bien joué!'
              : '💪 Continuer'}
        </p>
      </motion.div>
    </motion.div>
  )
}

export default ScoreCounter
