import * as React from "react";
import { createContext, useContext, useState, useCallback } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "./utils";
import { X, CheckCircle2, XCircle, AlertTriangle, Info } from "lucide-react";

const toastVariants = cva(
  "group pointer-events-auto relative flex w-full items-center justify-between gap-4 overflow-hidden rounded-[var(--radius-lg)] border p-4 pr-8 shadow-[var(--shadow-lg)] transition-all data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-80 data-[state=open]:fade-in-0 data-[state=open]:slide-in-from-top-full data-[state=closed]:slide-out-to-top-full",
  {
    variants: {
      variant: {
        default: "bg-background border-border",
        success: "bg-success text-white border-success",
        destructive: "bg-destructive text-white border-destructive",
        warning: "bg-warning text-white border-warning",
        info: "bg-info text-white border-info",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export type ToastVariant = VariantProps<typeof toastVariants>["variant"];

export interface Toast {
  id: string;
  title?: string;
  description?: string;
  variant?: ToastVariant;
  duration?: number;
  action?: {
    label: string;
    onClick: () => void;
  };
}

interface ToastContextValue {
  toasts: Toast[];
  addToast: (toast: Omit<Toast, "id">) => void;
  removeToast: (id: string) => void;
  toast: (toast: Omit<Toast, "id">) => void;
}

const ToastContext = createContext<ToastContextValue | undefined>(undefined);

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const addToast = useCallback((toast: Omit<Toast, "id">) => {
    const id = Math.random().toString(36).substring(2, 9);
    const newToast: Toast = { id, duration: 5000, ...toast };
    
    setToasts((prev) => [...prev, newToast]);

    // Auto remove after duration
    if (newToast.duration !== Infinity) {
      setTimeout(() => {
        removeToast(id);
      }, newToast.duration);
    }
  }, []);

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  return (
    <ToastContext.Provider value={{ toasts, addToast, removeToast, toast: addToast }}>
      {children}
      <ToastViewport toasts={toasts} onRemove={removeToast} />
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return context;
}

function ToastViewport({ 
  toasts, 
  onRemove 
}: { 
  toasts: Toast[]; 
  onRemove: (id: string) => void;
}) {
  return (
    <div className="fixed top-0 right-0 z-[100] flex max-h-screen w-full flex-col-reverse gap-2 p-4 sm:top-auto sm:bottom-0 sm:right-0 sm:flex-col md:max-w-[420px]">
      {toasts.map((toast) => (
        <ToastItem key={toast.id} toast={toast} onRemove={onRemove} />
      ))}
    </div>
  );
}

function ToastItem({ 
  toast, 
  onRemove 
}: { 
  toast: Toast; 
  onRemove: (id: string) => void;
}) {
  const Icon = toast.variant === "success" ? CheckCircle2
    : toast.variant === "destructive" ? XCircle
    : toast.variant === "warning" ? AlertTriangle
    : toast.variant === "info" ? Info
    : null;

  return (
    <div
      className={cn(toastVariants({ variant: toast.variant }))}
      data-state="open"
    >
      <div className="flex gap-3 flex-1">
        {Icon && <Icon className="h-5 w-5 flex-shrink-0 mt-0.5" />}
        <div className="flex-1 space-y-1">
          {toast.title && (
            <div className="text-sm font-semibold">{toast.title}</div>
          )}
          {toast.description && (
            <div className="text-sm opacity-90">{toast.description}</div>
          )}
          {toast.action && (
            <button
              onClick={toast.action.onClick}
              className="text-sm underline hover:no-underline mt-2"
            >
              {toast.action.label}
            </button>
          )}
        </div>
      </div>
      <button
        onClick={() => onRemove(toast.id)}
        className="absolute top-2 right-2 rounded-[var(--radius-sm)] p-1 hover:bg-black/10 transition-tls"
      >
        <X className="h-4 w-4" />
      </button>
    </div>
  );
}

// Helper function for quick toasts
export const toast = {
  success: (title: string, description?: string) => ({
    title,
    description,
    variant: "success" as const,
  }),
  error: (title: string, description?: string) => ({
    title,
    description,
    variant: "destructive" as const,
  }),
  warning: (title: string, description?: string) => ({
    title,
    description,
    variant: "warning" as const,
  }),
  info: (title: string, description?: string) => ({
    title,
    description,
    variant: "info" as const,
  }),
};

export { toastVariants };
