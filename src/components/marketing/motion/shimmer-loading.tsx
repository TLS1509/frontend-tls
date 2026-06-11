/**
 * Shimmer Loading
 * Skeleton loaders with animated shimmer effect
 * Premium loading state (better than spinners)
 */

import React from 'react'
import { motion } from 'framer-motion'

type Shape = 'card' | 'text' | 'circle' | 'rect'

interface ShimmerLoadingProps {
  shape?: Shape
  count?: number
  baseColor?: string
  shimmerColor?: string
  className?: string
}

const ShimmerBox: React.FC<{
  shape: Shape
  baseColor: string
  shimmerColor: string
}> = ({ shape, baseColor, shimmerColor }) => {
  const shapeClasses = {
    card: 'h-48 rounded-lg',
    text: 'h-4 rounded w-3/4',
    circle: 'w-12 h-12 rounded-full',
    rect: 'h-32 rounded',
  }

  return (
    <motion.div
      className={`relative overflow-hidden ${shapeClasses[shape]}`}
      style={{
        backgroundColor: baseColor,
      }}
    >
      {/* Shimmer effect */}
      <motion.div
        className="absolute inset-0"
        style={{
          background: `linear-gradient(
            90deg,
            transparent,
            ${shimmerColor},
            transparent
          )`,
          backgroundSize: '200% 100%',
        }}
        animate={{
          backgroundPosition: ['200% 0', '-200% 0'],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: 'linear',
        }}
      />
    </motion.div>
  )
}

export const ShimmerLoading: React.FC<ShimmerLoadingProps> = ({
  shape = 'card',
  count = 3,
  baseColor = '#F3F4F6',
  shimmerColor = 'rgba(255, 255, 255, 0.4)',
  className = '',
}) => {
  const isCard = shape === 'card'

  return (
    <div className={`space-y-4 ${className}`}>
      {Array.from({ length: count }).map((_, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: i * 0.1 }}
          className={isCard ? 'rounded-lg border border-ink-100 p-4 space-y-3' : ''}
        >
          {isCard ? (
            <>
              <ShimmerBox shape="rect" baseColor={baseColor} shimmerColor={shimmerColor} />
              <ShimmerBox shape="text" baseColor={baseColor} shimmerColor={shimmerColor} />
              <ShimmerBox shape="text" baseColor={baseColor} shimmerColor={shimmerColor} />
              <div className="flex gap-2 pt-2">
                <ShimmerBox shape="circle" baseColor={baseColor} shimmerColor={shimmerColor} />
                <ShimmerBox shape="circle" baseColor={baseColor} shimmerColor={shimmerColor} />
              </div>
            </>
          ) : (
            <ShimmerBox shape={shape} baseColor={baseColor} shimmerColor={shimmerColor} />
          )}
        </motion.div>
      ))}
    </div>
  )
}

export default ShimmerLoading
