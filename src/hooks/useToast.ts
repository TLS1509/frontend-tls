import { useState, useCallback } from 'react';

/**
 * useToast — Lightweight toast notification hook
 *
 * Usage:
 *   const { toasts, success, error, warning, info, removeToast } = useToast();
 *   success('Sauvegardé !');
 *
 * Wire up <ToastContainer toasts={toasts} onRemove={removeToast} /> anywhere in your tree.
 */

export type ToastType = 'success' | 'error' | 'warning' | 'info';

export interface ToastItem {
  id: string;
  type: ToastType;
  title?: string;
  message: string;
  duration: number;
}

export interface UseToastReturn {
  toasts: ToastItem[];
  success: (message: string, title?: string, duration?: number) => void;
  error:   (message: string, title?: string, duration?: number) => void;
  warning: (message: string, title?: string, duration?: number) => void;
  info:    (message: string, title?: string, duration?: number) => void;
  removeToast: (id: string) => void;
}

let _counter = 0;
const uid = () => `toast-${Date.now()}-${++_counter}`;

export const useToast = (): UseToastReturn => {
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  const add = useCallback(
    (type: ToastType, message: string, title?: string, duration = 4000) => {
      const id = uid();
      setToasts((prev) => [...prev.slice(-4), { id, type, message, title, duration }]);
      if (duration > 0) {
        setTimeout(() => {
          setToasts((prev) => prev.filter((t) => t.id !== id));
        }, duration);
      }
    },
    [],
  );

  const success = useCallback((msg: string, title?: string, dur?: number) => add('success', msg, title, dur), [add]);
  const error   = useCallback((msg: string, title?: string, dur?: number) => add('error',   msg, title, dur), [add]);
  const warning = useCallback((msg: string, title?: string, dur?: number) => add('warning', msg, title, dur), [add]);
  const info    = useCallback((msg: string, title?: string, dur?: number) => add('info',    msg, title, dur), [add]);

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  return { toasts, success, error, warning, info, removeToast };
};
