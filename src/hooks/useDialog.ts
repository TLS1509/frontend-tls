import { useEffect, useId, useRef } from 'react';

/**
 * useDialog — le comportement d'une modale selon le motif Dialog (Modal) de
 * l'APG W3C : https://www.w3.org/WAI/ARIA/apg/patterns/dialog-modal/
 *
 * - à l'ouverture, le focus entre dans la modale (premier élément focusable,
 *   ou le panneau lui-même, qui porte tabIndex={-1}) ;
 * - Tab et Maj+Tab restent dans la modale ;
 * - Échap ferme ;
 * - à la fermeture, le focus revient à l'élément qui l'avait avant.
 *
 * Posé le 2026-09-23 : l'audit a trouvé 8 modales sur 10 sans rôle ni gestion
 * du focus — il fallait 23 Tab pour entrer dans la réservation, et le focus
 * retombait sur <body> à la fermeture. Le rendu (rayon, surface) reste à
 * chaque modale ; seul le comportement est partagé ici.
 *
 * Usage : appeler AVANT tout `if (!isOpen) return null` (règle des hooks),
 * puis poser sur le panneau :
 *   ref={dialog.ref} role="dialog" aria-modal="true"
 *   aria-labelledby={dialog.titleId} tabIndex={-1}
 * et `id={dialog.titleId}` sur le titre.
 */
const FOCUSABLE = [
  'a[href]', 'button:not([disabled])', 'input:not([disabled]):not([type="hidden"])',
  'select:not([disabled])', 'textarea:not([disabled])', '[tabindex]:not([tabindex="-1"])',
].join(',');

export function useDialog<T extends HTMLElement = HTMLDivElement>(open: boolean, onClose: () => void) {
  const ref = useRef<T>(null);
  const titleId = useId();
  // onClose change à chaque rendu dans la plupart des appelants : on le lit
  // par une ref pour ne pas réinstaller l'effet (et reperdre le focus).
  const closeRef = useRef(onClose);
  closeRef.current = onClose;

  useEffect(() => {
    if (!open) return;
    const previous = document.activeElement as HTMLElement | null;
    const focusables = () =>
      ref.current
        ? [...ref.current.querySelectorAll<HTMLElement>(FOCUSABLE)].filter((el) => el.offsetParent !== null || el === document.activeElement)
        : [];

    // L'effet s'exécute après le rendu : le panneau existe déjà. Pas de
    // requestAnimationFrame — suspendu dans un onglet en arrière-plan, il
    // laissait le focus dehors.
    const node = ref.current;
    if (node && !node.contains(document.activeElement)) (focusables()[0] ?? node).focus();

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.stopPropagation();
        closeRef.current();
        return;
      }
      if (e.key !== 'Tab' || !ref.current) return;
      const list = focusables();
      if (list.length === 0) { e.preventDefault(); ref.current.focus(); return; }
      const first = list[0], last = list[list.length - 1];
      const active = document.activeElement;
      if (e.shiftKey && (active === first || !ref.current.contains(active))) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && (active === last || !ref.current.contains(active))) { e.preventDefault(); first.focus(); }
    };
    document.addEventListener('keydown', onKey, true);

    return () => {
      document.removeEventListener('keydown', onKey, true);
      if (previous && document.contains(previous)) previous.focus();
    };
  }, [open]);

  return { ref, titleId };
}

export default useDialog;
