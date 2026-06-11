/**
 * Lesson Progress Arc
 * Circular progress indicator with smooth stroke animation
 * For Learning App lesson completion tracking
 */

import React from 'react'
import { motion } from 'framer-motion'

interface LessonProgressArcProps {
  progress: number // 0-100
  size?: number // diameter in px
  strokeWidth?: number
  colors?: {
    background: string
    foreground: string
  }
  showLabel?: boolean
  label?: string
}

export const LessonProgressArc: React.FC<LessonProgressArcProps> = ({
  progress,
  size = 120,
  strokeWidth = 8,
  colors = {
    background: '#E5E7EB',
    foreground: '#55A1B4',
  },
  showLabel = true,
  label = 'Progression',
}) => {
  const radius = (size - strokeWidth) / 2
  const circumference = radius * 2 * Math.PI
  const strokeDashoffset = circumference - (progress / 100) * circumference

  return (
    <div
      className="flex flex-col items-center gap-3"
      style={{
        width: size,
      }}
    >
      {/* SVG Circle */}
      <div className="relative" style={{ width: size, height: size }}>
        <svg width={size} height={size} className="absolute inset-0 transform -rotate-90">
          {/* Background circle */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke={colors.background}
            strokeWidth={strokeWidth}
          />

          {/* Progress circle */}
          <motion.circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke={colors.foreground}
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            strokeDasharray={circumference}
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset }}
            transition={{
              duration: 1.2,
              ease: [0.34, 1.56, 0.64, 1],
            }}
          />
        </svg>

        {/* Center label */}
        {showLabel && (
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="font-display font-bold text-h4" style={{ color: colors.foreground }}>
              {progress}%
            </span>
            {label && (
              <span className="font-body text-caption text-ink-500">{label}</span>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

export default LessonProgressArc
