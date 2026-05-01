import { motion } from 'motion/react';
import { Button } from './button';

interface EmptyStateProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  action?: {
    label: string;
    onClick: () => void;
  };
  secondaryAction?: {
    label: string;
    onClick: () => void;
  };
  variant?: 'default' | 'search' | 'inbox' | 'error';
}

export function EmptyState({ 
  icon, 
  title, 
  description, 
  action,
  secondaryAction,
  variant = 'default' 
}: EmptyStateProps) {
  const getVariantColor = () => {
    switch (variant) {
      case 'search': return 'var(--accent)';
      case 'inbox': return 'var(--primary)';
      case 'error': return 'var(--error-600)';
      default: return 'var(--primary)';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="flex flex-col items-center justify-center p-12 text-center"
    >
      {/* Icon with animation */}
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="mb-6"
      >
        <motion.div
          animate={{ 
            y: [0, -10, 0],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="w-24 h-24 rounded-full flex items-center justify-center relative overflow-hidden"
          style={{
            background: `${getVariantColor()}15`,
            border: `2px solid ${getVariantColor()}30`,
          }}
        >
          <div style={{ color: getVariantColor() }}>
            {icon}
          </div>
          
          {/* Pulse effect */}
          <motion.div
            animate={{
              scale: [1, 1.5, 1],
              opacity: [0.5, 0, 0.5],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
            }}
            className="absolute inset-0 rounded-full"
            style={{
              background: getVariantColor(),
            }}
          />
        </motion.div>
      </motion.div>

      {/* Title */}
      <motion.h3
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="mb-2"
        style={{
          fontFamily: 'var(--font-display)',
          fontSize: 'var(--text-xl)',
          fontWeight: 'var(--font-weight-bold)',
          color: 'var(--foreground)',
        }}
      >
        {title}
      </motion.h3>

      {/* Description */}
      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="mb-6 max-w-md"
        style={{
          fontSize: 'var(--text-sm)',
          color: 'var(--muted-foreground)',
          lineHeight: 'var(--leading-relaxed)',
        }}
      >
        {description}
      </motion.p>

      {/* Actions */}
      {(action || secondaryAction) && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="flex flex-col sm:flex-row gap-3"
        >
          {action && (
            <Button
              onClick={action.onClick}
              className="gap-2"
              style={{
                background: 'var(--gradient-primary)',
                color: 'white',
                fontWeight: 'var(--font-weight-semibold)',
                boxShadow: '0 4px 12px rgba(85, 161, 180, 0.3)',
              }}
            >
              {action.label}
            </Button>
          )}
          {secondaryAction && (
            <Button
              onClick={secondaryAction.onClick}
              variant="outline"
              className="gap-2"
            >
              {secondaryAction.label}
            </Button>
          )}
        </motion.div>
      )}
    </motion.div>
  );
}
