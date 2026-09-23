import React, { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { Toast } from './Toast';
import type { ToastItem } from '../../hooks/useToast';

/**
 * ToastContainer — pile de toasts + régions live.
 *
 * Accessibilité (audit du 23/09) :
 * - Les régions live sont PERMANENTES : montées dès le chargement, vides au
 *   repos. Un lecteur d'écran n'annonce que ce qui change DANS une région qu'il
 *   connaît déjà ; une région insérée en même temps que son message est
 *   souvent muette. Le conteneur ne renvoie donc plus `null` quand la pile est
 *   vide.
 * - Deux régions sœurs, jamais imbriquées : `status` (polite) pour succès,
 *   info et avertissement ; `alert` (assertive) pour les erreurs seulement.
 *   Le Toast lui-même ne porte plus de rôle live.
 * - La minuterie de fermeture se met en pause tant que le pointeur survole le
 *   toast ou que le focus est dedans (WCAG 2.2.1 Timing Adjustable) : on ne
 *   retire pas un message pendant qu'on le lit ou qu'on vise son bouton.
 */

interface ToastContainerProps {
  toasts: ToastItem[];
  onRemove: (id: string) => void;
}

const TYPE_TO_VARIANT: Record<ToastItem['type'], 'success' | 'info' | 'warning' | 'danger'> = {
  success: 'success',
  error:   'danger',
  warning: 'warning',
  info:    'info',
};

const TITLE_FALLBACK: Record<ToastItem['type'], string> = {
  success: 'Succès',
  error:   'Erreur',
  warning: 'Attention',
  info:    'Information',
};

interface ToastEntryProps {
  toast: ToastItem;
  onRemove: (id: string) => void;
}

/** Un toast et sa minuterie, suspendue au survol et au focus. */
const ToastEntry: React.FC<ToastEntryProps> = ({ toast, onRemove }) => {
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);
  const remaining = useRef(toast.duration);
  const paused = hovered || focused;

  useEffect(() => {
    if (toast.duration <= 0 || paused) return;
    const startedAt = Date.now();
    const timer = setTimeout(() => onRemove(toast.id), Math.max(remaining.current, 0));
    return () => {
      clearTimeout(timer);
      remaining.current -= Date.now() - startedAt;
    };
  }, [paused, toast.id, toast.duration, onRemove]);

  return (
    <div
      className="pointer-events-auto animate-[toast-slide-in_0.3s_cubic-bezier(0.34,1.56,0.64,1)_both]"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onFocus={() => setFocused(true)}
      onBlur={(e) => {
        // Le focus qui passe d'un bouton à l'autre du même toast ne relance rien.
        if (!e.currentTarget.contains(e.relatedTarget as Node | null)) setFocused(false);
      }}
    >
      <Toast
        variant={TYPE_TO_VARIANT[toast.type]}
        title={toast.title ?? TITLE_FALLBACK[toast.type]}
        dismissible
        onDismiss={() => onRemove(toast.id)}
        className="shadow-lg"
      >
        {toast.message}
      </Toast>
    </div>
  );
};

export const ToastContainer: React.FC<ToastContainerProps> = ({ toasts, onRemove }) => {
  const polite = toasts.filter((t) => t.type !== 'error');
  const assertive = toasts.filter((t) => t.type === 'error');

  return createPortal(
    <div className="fixed bottom-6 right-6 z-toast flex flex-col w-full max-w-[360px] pointer-events-none">
      {/* Pas de `hidden` / `empty:hidden` sur les régions : une région en
          display:none sort de l'arbre d'accessibilité, et on retomberait sur
          l'insertion simultanée qu'on vient de corriger. L'écart entre les
          deux piles n'est posé que quand les deux sont occupées. */}
      <div role="status" aria-live="polite" className="flex flex-col gap-stack-xs">
        {polite.map((t) => (
          <ToastEntry key={t.id} toast={t} onRemove={onRemove} />
        ))}
      </div>
      <div
        role="alert"
        aria-live="assertive"
        className={['flex flex-col gap-stack-xs', polite.length > 0 && assertive.length > 0 && 'mt-stack-xs']
          .filter(Boolean)
          .join(' ')}
      >
        {assertive.map((t) => (
          <ToastEntry key={t.id} toast={t} onRemove={onRemove} />
        ))}
      </div>
    </div>,
    document.body,
  );
};

export default ToastContainer;
