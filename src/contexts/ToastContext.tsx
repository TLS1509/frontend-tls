/**
 * ToastContext — global toast provider.
 *
 * Wraps the app once (at App.tsx root) and exposes `useToastContext()`
 * everywhere — no need to re-instantiate `useToast` per page.
 *
 * Usage in a page:
 *   const toast = useToastContext();
 *   toast.success('Préférences sauvegardées');
 *   toast.error('Échec de l\'envoi');
 */

import React, { createContext, useContext } from 'react';
import { useToast } from '../hooks/useToast';
import type { UseToastReturn } from '../hooks/useToast';
import { ToastContainer } from '../components/ui/ToastContainer';

const ToastCtx = createContext<UseToastReturn | null>(null);

export const ToastProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const api = useToast();
  return (
    <ToastCtx.Provider value={api}>
      {children}
      <ToastContainer toasts={api.toasts} onRemove={api.removeToast} />
    </ToastCtx.Provider>
  );
};

export const useToastContext = (): UseToastReturn => {
  const ctx = useContext(ToastCtx);
  if (!ctx) {
    throw new Error('useToastContext must be used within <ToastProvider>');
  }
  return ctx;
};
