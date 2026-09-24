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
 * - pendant l'ouverture, TOUT LE RESTE du document est `inert` (2026-09-24),
 *   puis rendu tel quel à la fermeture — voir `rendreLeResteInerte`.
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

/* Combien de modales ouvertes veulent chaque élément inerte. Un élément déjà
   inerte qui n'y figure pas l'est par la page elle-même (le tiroir fermé de la
   Sidebar mobile) : on n'y touche jamais, ni pour le poser ni pour le lever. */
const demandes = new Map<HTMLElement, number>();
const SANS_RENDU = new Set(['SCRIPT', 'STYLE', 'LINK', 'META', 'TEMPLATE', 'NOSCRIPT']);

/** La couche de la modale : le premier ancêtre `position: fixed` du panneau
 *  (son voile), ou le panneau lui-même. Tout ce qu'elle contient reste vivant —
 *  une croix posée hors du panneau, le clic sur le voile qui ferme. */
function coucheDe(panneau: HTMLElement): HTMLElement {
  for (let n: HTMLElement | null = panneau; n && n !== document.body; n = n.parentElement) {
    if (getComputedStyle(n).position === 'fixed') return n;
  }
  return panneau;
}

/**
 * Rend inerte tout le document sauf `racine` — `inert` : ni focus, ni clic, ni
 * lecteur d'écran — et renvoie la fonction qui restaure.
 *
 * Posé le 2026-09-24. Le focus était piégé, mais la page derrière restait dans
 * l'arbre d'accessibilité : un lecteur d'écran la parcourait en mode lecture,
 * et `check-boutons` comptait le `solid` de la page EN PLUS de celui de la
 * modale (mesuré : 2 sur /passeport/objectifs et /learning-paths/4, 22 et 25
 * éléments focusables hors modale encore exposés).
 *
 * Les modales sont rendues en place, pas dans un portail : on ne peut donc pas
 * rendre `#root` inerte, la modale est dedans. On garde la racine et ses
 * ancêtres, et on rend inerte chacun de leurs frères — l'algorithme
 * d'`inertOthers` du paquet `aria-hidden` (celui de Radix). Comme lui, on garde
 * aussi les régions vivantes (`aria-live`) et leurs ancêtres : un toast qui
 * s'affiche pendant la modale est encore annoncé, et on peut le fermer.
 * Un frère `aria-hidden="true"` est laissé tel quel : il est déjà hors de
 * l'arbre, et c'est souvent un voile qui ferme au clic (`ChartDetailModal`).
 *
 * Deux modales ouvertes l'une sur l'autre : si la seconde vit dans un sous-arbre
 * que la première a rendu inerte, elle le lève le temps de son ouverture (sinon
 * elle naîtrait inerte, focus impossible) et le rend à la fermeture — s'il est
 * encore demandé. Un compteur par élément fait que la fermeture d'une modale ne
 * rend jamais vivant ce qu'une autre, encore ouverte, veut inerte.
 *
 * Exportée pour les surcouches qui ne passent pas par `useDialog`.
 */
export function rendreLeResteInerte(racine: HTMLElement): () => void {
  const garder = new Set<Element>();
  const cibles = [racine, ...document.querySelectorAll('[aria-live]:not([aria-live="off"])')];
  for (const cible of cibles) {
    for (let n: Element | null = cible; n && n !== document.body; n = n.parentElement) garder.add(n);
  }
  const poses: HTMLElement[] = [];
  const leves: HTMLElement[] = [];
  const parcourir = (parent: Element) => {
    for (const enfant of Array.from(parent.children)) {
      if (!(enfant instanceof HTMLElement) || SANS_RENDU.has(enfant.tagName)) continue;
      if (garder.has(enfant)) {
        if (enfant.inert && demandes.has(enfant)) {
          enfant.inert = false;
          leves.push(enfant);
        }
        if (enfant !== racine) parcourir(enfant);
        continue;
      }
      if (enfant.getAttribute('aria-hidden') === 'true') continue;
      if (enfant.inert && !demandes.has(enfant)) continue;
      demandes.set(enfant, (demandes.get(enfant) ?? 0) + 1);
      enfant.inert = true;
      poses.push(enfant);
    }
  };
  parcourir(document.body);

  return () => {
    for (const el of poses) {
      const n = (demandes.get(el) ?? 1) - 1;
      if (n > 0) {
        demandes.set(el, n);
      } else {
        demandes.delete(el);
        el.inert = false;
      }
    }
    for (const el of leves) if (demandes.has(el)) el.inert = true;
  };
}

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
    // Le reste devient inerte AVANT que le focus entre : une modale ouverte
    // par-dessus une autre peut naître dans un sous-arbre que la première a
    // rendu inerte, et on ne focalise rien d'inerte. Le déclencheur, dans la
    // page, perd le focus au passage — la ligne suivante le fait entrer.
    const restaurer = node ? rendreLeResteInerte(coucheDe(node)) : () => {};
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
      // La page redevient vivante AVANT de lui rendre le focus : on ne peut pas
      // focaliser un élément inerte.
      restaurer();
      if (previous && document.contains(previous)) previous.focus();
    };
  }, [open]);

  return { ref, titleId };
}

export default useDialog;
