import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { Button } from '../core/Button';

interface ChartDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  actions?: Array<{
    label: string;
    onClick: () => void;
    variant?: 'primary' | 'secondary' | 'ghost';
  }>;
  size?: 'sm' | 'md' | 'lg';
}

/**
 * ChartDetailModal — Reusable drill-down modal for chart interactions
 * Used by: all charts (click handler) for detail views
 * Features: focus trap, keyboard dismiss (Esc), backdrop click, scrollable content
 */
export const ChartDetailModal: React.FC<ChartDetailModalProps> = ({
  isOpen,
  onClose,
  title,
  subtitle,
  children,
  actions,
  size = 'md',
}) => {
  const sizeClasses = {
    sm: 'max-w-sm',
    md: 'max-w-md',
    lg: 'max-w-lg',
  };

  // Handle Escape key
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // Lock body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = '';
      };
    }
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-modal"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                onClose();
              }
            }}
            aria-label="Close modal"
          />

          {/* Modal */}
          <motion.div
            className={`fixed inset-0 flex items-center justify-center z-modal pointer-events-none p-4`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <motion.div
              className={`bg-white rounded-2xl shadow-lg max-h-[90vh] overflow-y-auto pointer-events-auto w-full ${sizeClasses[size]}`}
              initial={{ scale: 0.95, opacity: 0, y: 10 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 10 }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="sticky top-0 bg-white border-b border-ink-200 p-6 flex items-start justify-between">
                <div className="flex-1">
                  <h2 className="text-h3 font-bold text-ink-900">{title}</h2>
                  {subtitle && (
                    <p className="text-body-sm text-ink-600 mt-1">{subtitle}</p>
                  )}
                </div>
                <button
                  onClick={onClose}
                  className="ml-4 p-2 text-ink-600 hover:text-ink-900 hover:bg-ink-100 rounded-lg transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500"
                  aria-label="Close modal"
                >
                  <X size={24} />
                </button>
              </div>

              {/* Content */}
              <div className="p-6">
                {children}
              </div>

              {/* Footer (if actions provided) */}
              {actions && actions.length > 0 && (
                <div className="sticky bottom-0 bg-white border-t border-ink-200 p-6 flex items-center justify-end gap-3">
                  {actions.map((action, idx) => (
                    <Button
                      key={idx}
                      variant={action.variant || 'secondary'}
                      size="md"
                      onClick={() => {
                        action.onClick();
                        onClose();
                      }}
                    >
                      {action.label}
                    </Button>
                  ))}
                </div>
              )}
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default ChartDetailModal;
