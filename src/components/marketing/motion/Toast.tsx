import React, { createContext, useCallback, useContext, useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, XCircle, Info, AlertTriangle, X } from 'lucide-react';

type ToastTone = 'success' | 'info' | 'warning' | 'danger';

type ToastItem = {
  id: number;
  tone: ToastTone;
  message: string;
  description?: string;
  duration?: number;
};

type ToastContextValue = {
  push: (toast: Omit<ToastItem, 'id'>) => void;
};

const ToastContext = createContext<ToastContextValue | null>(null);

const TONE_CLASSES: Record<ToastTone, { bg: string; border: string; icon: string; text: string }> = {
  success: {
    bg: 'bg-white',
    border: 'border-success-base/30',
    icon: 'text-success-fg',
    text: 'text-ink-900',
  },
  info: {
    bg: 'bg-white',
    border: 'border-info-base/30',
    icon: 'text-info-fg',
    text: 'text-ink-900',
  },
  warning: {
    bg: 'bg-white',
    border: 'border-warning-base/30',
    icon: 'text-warning-fg',
    text: 'text-ink-900',
  },
  danger: {
    bg: 'bg-white',
    border: 'border-danger-base/30',
    icon: 'text-danger-fg',
    text: 'text-ink-900',
  },
};

const TONE_ICONS: Record<ToastTone, React.ReactNode> = {
  success: <CheckCircle2 size={18} />,
  info: <Info size={18} />,
  warning: <AlertTriangle size={18} />,
  danger: <XCircle size={18} />,
};

/**
 * MarketingToastProvider — lightweight toast system for the marketing site.
 *
 * Usage:
 *   <MarketingToastProvider>{...site}</MarketingToastProvider>
 *   const { push } = useMarketingToast();
 *   push({ tone: 'success', message: 'Inscrit·e ✨', description: 'Premier email d\'ici 15 jours' });
 *
 * Stack top-right (mobile: bottom-center). Auto-dismiss after `duration` ms (default 4000).
 */
export const MarketingToastProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  const dismiss = useCallback((id: number) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const push = useCallback<ToastContextValue['push']>((toast) => {
    const id = Date.now() + Math.random();
    const item: ToastItem = { id, duration: 4000, ...toast };
    setToasts((prev) => [...prev, item]);
  }, []);

  return (
    <ToastContext.Provider value={{ push }}>
      {children}
      <div
        aria-live="polite"
        aria-atomic="false"
        className="fixed bottom-4 left-1/2 -translate-x-1/2 sm:bottom-auto sm:left-auto sm:translate-x-0 sm:top-20 sm:right-6 z-toast flex flex-col gap-stack-xs max-w-sm w-full px-4 sm:px-0 pointer-events-none"
      >
        <AnimatePresence>
          {toasts.map((t) => (
            <ToastCard key={t.id} item={t} onDismiss={() => dismiss(t.id)} />
          ))}
        </AnimatePresence>
      </div>
    </ToastContext.Provider>
  );
};

const ToastCard: React.FC<{ item: ToastItem; onDismiss: () => void }> = ({ item, onDismiss }) => {
  const tone = TONE_CLASSES[item.tone];

  useEffect(() => {
    const timer = window.setTimeout(onDismiss, item.duration);
    return () => window.clearTimeout(timer);
  }, [item.duration, onDismiss]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 12, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -12, scale: 0.96 }}
      transition={{ duration: 0.25, ease: [0.21, 0.47, 0.32, 0.98] }}
      className={`pointer-events-auto rounded-2xl border ${tone.bg} ${tone.border} shadow-2xl backdrop-blur-glass-medium p-stack`}
      role="status"
    >
      <div className="flex items-start gap-stack">
        <span className={`shrink-0 ${tone.icon} mt-0.5`}>{TONE_ICONS[item.tone]}</span>
        <div className={`flex-1 min-w-0 ${tone.text}`}>
          <p className="font-display font-bold text-body-sm m-0 leading-tight">{item.message}</p>
          {item.description && (
            <p className="font-body text-caption text-ink-600 m-0 mt-0.5 leading-snug">
              {item.description}
            </p>
          )}
        </div>
        <button
          type="button"
          onClick={onDismiss}
          aria-label="Fermer la notification"
          className="shrink-0 -mr-1 -mt-1 p-1 rounded-lg text-ink-400 hover:text-ink-700 hover:bg-ink-50 transition-colors duration-fast"
        >
          <X size={14} />
        </button>
      </div>
    </motion.div>
  );
};

export const useMarketingToast = (): ToastContextValue => {
  const ctx = useContext(ToastContext);
  if (!ctx) {
    // Fallback no-op if provider missing — fail soft instead of crash
    return { push: () => {} };
  }
  return ctx;
};

export default MarketingToastProvider;
