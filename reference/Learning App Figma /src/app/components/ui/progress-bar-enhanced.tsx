import { motion } from 'motion/react';

interface Milestone {
  value: number;
  label: string;
  icon?: string;
}

interface ProgressBarEnhancedProps {
  current: number;
  total: number;
  milestones?: Milestone[];
  color?: string;
  showPercentage?: boolean;
  showNumbers?: boolean;
  height?: string;
  animated?: boolean;
  label?: string;
}

export function ProgressBarEnhanced({
  current,
  total,
  milestones = [],
  color = 'var(--primary)',
  showPercentage = true,
  showNumbers = true,
  height = '12px',
  animated = true,
  label,
}: ProgressBarEnhancedProps) {
  const percentage = Math.min((current / total) * 100, 100);
  const isComplete = percentage === 100;

  return (
    <div className="w-full">
      {/* Label */}
      {label && (
        <div className="flex items-center justify-between mb-2">
          <span 
            style={{ 
              fontSize: 'var(--text-sm)',
              fontWeight: 'var(--font-weight-semibold)',
              color: 'var(--foreground)',
            }}
          >
            {label}
          </span>
          {showPercentage && (
            <span
              style={{
                fontSize: 'var(--text-sm)',
                fontWeight: 'var(--font-weight-bold)',
                color: isComplete ? 'var(--success-600)' : color,
              }}
            >
              {percentage.toFixed(0)}%
            </span>
          )}
        </div>
      )}

      {/* Progress Bar */}
      <div
        className="relative w-full rounded-full overflow-hidden"
        style={{
          background: 'var(--neutral-100)',
          height,
        }}
      >
        {/* Fill */}
        <motion.div
          initial={animated ? { width: 0 } : { width: `${percentage}%` }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: animated ? 1 : 0, ease: 'easeOut' }}
          className="absolute inset-y-0 left-0 rounded-full"
          style={{
            background: isComplete 
              ? 'linear-gradient(90deg, var(--success-600), var(--success-700))' 
              : `linear-gradient(90deg, ${color}, ${color}dd)`,
            boxShadow: isComplete 
              ? '0 0 10px var(--success-600)44' 
              : `0 0 10px ${color}44`,
          }}
        >
          {/* Shimmer effect */}
          {animated && (
            <motion.div
              animate={{ x: ['-100%', '200%'] }}
              transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 1 }}
              className="absolute inset-0"
              style={{
                background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)',
                width: '30%',
              }}
            />
          )}
        </motion.div>

        {/* Milestones */}
        {milestones.map((milestone, i) => {
          const milestonePercentage = (milestone.value / total) * 100;
          const isPassed = percentage >= milestonePercentage;

          return (
            <motion.div
              key={i}
              initial={animated ? { scale: 0 } : { scale: isPassed ? 1 : 0.8 }}
              animate={{ scale: isPassed ? 1 : 0.8, opacity: 1 }}
              transition={{ delay: animated ? 0.8 + (i * 0.1) : 0 }}
              className="absolute w-6 h-6 rounded-full flex items-center justify-center cursor-help"
              style={{
                left: `${milestonePercentage}%`,
                top: '50%',
                transform: 'translate(-50%, -50%)',
                background: isPassed ? 'var(--success-600)' : 'var(--neutral-300)',
                color: 'white',
                fontSize: 'var(--text-xs)',
                fontWeight: 'var(--font-weight-bold)',
                border: '2px solid white',
                boxShadow: 'var(--shadow-sm)',
                zIndex: 10,
              }}
              title={milestone.label}
            >
              {milestone.icon || (isPassed ? '✓' : i + 1)}
            </motion.div>
          );
        })}
      </div>

      {/* Numbers */}
      {showNumbers && (
        <div className="flex items-center justify-between mt-2">
          <span 
            style={{ 
              fontSize: 'var(--text-xs)',
              color: 'var(--muted-foreground)',
            }}
          >
            {current} / {total}
          </span>
          {!showPercentage && (
            <span
              style={{
                fontSize: 'var(--text-xs)',
                fontWeight: 'var(--font-weight-semibold)',
                color: isComplete ? 'var(--success-600)' : color,
              }}
            >
              {percentage.toFixed(0)}%
            </span>
          )}
        </div>
      )}
    </div>
  );
}
