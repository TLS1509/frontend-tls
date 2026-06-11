import { motion, AnimatePresence } from 'motion/react';
import { X, CheckCircle2, AlertCircle, Info, AlertTriangle } from 'lucide-react';
import { useState, useEffect } from 'react';

type ToastType = 'success' | 'error' | 'info' | 'warning';

interface ToastProps {
  id: string;
  type: ToastType;
  title: string;
  message?: string;
  duration?: number;
  onClose: (id: string) => void;
}

function Toast({ id, type, title, message, duration = 5000, onClose }: ToastProps) {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(() => onClose(id), 300);
    }, duration);

    return () => clearTimeout(timer);
  }, [id, duration, onClose]);

  const getTypeConfig = () => {
    const configs = {
      success: {
        icon: <CheckCircle2 className="w-5 h-5" />,
        color: 'var(--success-600)',
        bg: 'var(--success-50)',
        borderColor: 'var(--success-200)',
      },
      error: {
        icon: <AlertCircle className="w-5 h-5" />,
        color: 'var(--error-600)',
        bg: 'var(--error-50)',
        borderColor: 'var(--error-200)',
      },
      info: {
        icon: <Info className="w-5 h-5" />,
        color: 'var(--primary)',
        bg: 'var(--primary-50)',
        borderColor: 'var(--primary-200)',
      },
      warning: {
        icon: <AlertTriangle className="w-5 h-5" />,
        color: 'var(--warning-600)',
        bg: 'var(--warning-50)',
        borderColor: 'var(--warning-200)',
      },
    };
    return configs[type];
  };

  const config = getTypeConfig();

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: -20, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, x: 100, scale: 0.9 }}
          transition={{ duration: 0.3 }}
          className="flex items-start gap-3 p-4 rounded-xl shadow-lg max-w-md"
          style={{
            background: config.bg,
            border: `1px solid ${config.borderColor}`,
            backdropFilter: 'var(--blur-lg)',
          }}
        >
          {/* Icon */}
          <div style={{ color: config.color, flexShrink: 0 }}>
            {config.icon}
          </div>

          {/* Content */}
          <div className="flex-1 min-w-0">
            <p 
              style={{ 
                fontSize: 'var(--text-sm)',
                fontWeight: 'var(--font-weight-semibold)',
                color: 'var(--foreground)',
                marginBottom: message ? 'var(--space-1)' : 0,
              }}
            >
              {title}
            </p>
            {message && (
              <p 
                style={{ 
                  fontSize: 'var(--text-xs)',
                  color: 'var(--muted-foreground)',
                  lineHeight: 'var(--leading-relaxed)',
                }}
              >
                {message}
              </p>
            )}
          </div>

          {/* Close button */}
          <button
            onClick={() => {
              setIsVisible(false);
              setTimeout(() => onClose(id), 300);
            }}
            className="flex-shrink-0 opacity-60 hover:opacity-100 transition-opacity"
            style={{ color: config.color }}
          >
            <X className="w-4 h-4" />
          </button>

          {/* Progress bar */}
          <motion.div
            initial={{ scaleX: 1 }}
            animate={{ scaleX: 0 }}
            transition={{ duration: duration / 1000, ease: 'linear' }}
            className="absolute bottom-0 left-0 h-1 rounded-b-xl"
            style={{
              background: config.color,
              transformOrigin: 'left',
            }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// Toast Container Component
interface ToastContainerProps {
  toasts: ToastProps[];
  onRemove: (id: string) => void;
  position?: 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left' | 'top-center';
}

export function ToastContainer({ 
  toasts, 
  onRemove, 
  position = 'top-right' 
}: ToastContainerProps) {
  const getPositionStyles = () => {
    const positions = {
      'top-right': { top: 'var(--space-4)', right: 'var(--space-4)' },
      'top-left': { top: 'var(--space-4)', left: 'var(--space-4)' },
      'bottom-right': { bottom: 'var(--space-4)', right: 'var(--space-4)' },
      'bottom-left': { bottom: 'var(--space-4)', left: 'var(--space-4)' },
      'top-center': { top: 'var(--space-4)', left: '50%', transform: 'translateX(-50%)' },
    };
    return positions[position];
  };

  return (
    <div
      className="fixed z-50 flex flex-col gap-3"
      style={{
        ...getPositionStyles(),
        maxWidth: '420px',
      }}
    >
      {toasts.map(toast => (
        <Toast key={toast.id} {...toast} onClose={onRemove} />
      ))}
    </div>
  );
}

// Hook to manage toasts
export function useToast() {
  const [toasts, setToasts] = useState<ToastProps[]>([]);

  const addToast = (
    type: ToastType,
    title: string,
    message?: string,
    duration?: number
  ) => {
    const id = `toast-${Date.now()}-${Math.random()}`;
    const newToast: ToastProps = {
      id,
      type,
      title,
      message,
      duration,
      onClose: removeToast,
    };

    setToasts(prev => [...prev, newToast]);
    return id;
  };

  const removeToast = (id: string) => {
    setToasts(prev => prev.filter(toast => toast.id !== id));
  };

  return {
    toasts,
    addToast,
    removeToast,
    success: (title: string, message?: string, duration?: number) =>
      addToast('success', title, message, duration),
    error: (title: string, message?: string, duration?: number) =>
      addToast('error', title, message, duration),
    info: (title: string, message?: string, duration?: number) =>
      addToast('info', title, message, duration),
    warning: (title: string, message?: string, duration?: number) =>
      addToast('warning', title, message, duration),
  };
}

// Example usage component
export function ToastExample() {
  const { toasts, success, error, info, warning, removeToast } = useToast();

  return (
    <>
      <div className="flex gap-3">
        <button onClick={() => success('Succès !', 'Votre action a été effectuée')}>
          Success Toast
        </button>
        <button onClick={() => error('Erreur', 'Une erreur est survenue')}>
          Error Toast
        </button>
        <button onClick={() => info('Information', 'Nouvelle mise à jour disponible')}>
          Info Toast
        </button>
        <button onClick={() => warning('Attention', 'Cette action est irréversible')}>
          Warning Toast
        </button>
      </div>

      <ToastContainer toasts={toasts} onRemove={removeToast} position="top-right" />
    </>
  );
}
