import React from 'react';

/**
 * IconChip — la pastille d'icône : un carré teinté qui porte un glyphe Lucide.
 *
 * ═══ POURQUOI CE COMPOSANT ════════════════════════════════════════════════
 *
 * C'était le motif le plus répété du dépôt sans primitive : au 23/09, 159
 * pastilles faites main dans l'app, 12 tailles, 36 combinaisons taille × rayon
 * — 94 cercles, 65 carrés. Chaque décision de design (le rayon, le cran de
 * fond, l'encre) devait être refaite à la main 159 fois, donc ne l'était pas.
 *
 * ═══ LA FORME — arbitrage n°3 du 2026-09-23 ════════════════════════════════
 *
 * Un CARRÉ au rayon PROPORTIONNEL, pas un cercle :
 *
 *   taille   boîte   rayon            glyphe
 *   xs       24 px   rounded-sm (6)   icon-2xs (14)
 *   sm       32 px   rounded-md (10)  icon-xs  (16)
 *   md       40 px   rounded-md (10)  icon-md  (20)
 *   lg       48 px   rounded-lg (14)  icon-lg  (24)
 *
 * Le rapport rayon/côté reste entre 0,25 et 0,31 : la pastille se lit carrée à
 * toutes les tailles. Le ROND est réservé aux personnes (`Avatar`) — une icône
 * dans un cercle se confond avec un visage absent. C'est la convention
 * d'Atlassian. Et le cercle d'un `Button iconOnly` reste, lui, une exception
 * écrite de l'étage interactif : une pastille qu'on presse n'est pas un
 * IconChip, c'est un `<Button iconOnly aria-label="…">`.
 *
 * ═══ LE TON — contraste mesuré ════════════════════════════════════════════
 *
 * Fond au cran 50 (ou `-bg` des sémantiques), glyphe au cran 800 (ou `-fg`).
 * WCAG 1.4.11 demande 3:1 à un objet graphique porteur de sens ; toutes les
 * paires passent même le 4,5 du texte :
 *
 *   brand   primary-50 / primary-800      6,31
 *   warm    secondary-50 / secondary-800  9,49
 *   sun     accent-50 / accent-800        7,64
 *   neutral ink-100 / ink-700             9,43
 *   success success-bg / success-fg       6,72
 *   danger  danger-bg / danger-fg         7,75
 *   info    info-bg / info-fg            10,21
 *
 * ⚠️ `neutral` est au cran 100, pas 50 : `ink-50` (#f9fafb) est le gris brut de
 * Tailwind et ne se détache presque pas du blanc (1,05:1, ΔE ≈ 1,5), quand les
 * 50 des trois tons de marque se détachent d'un ΔE de 6 à 7. `ink-100` rend au
 * neutre la même présence qu'aux autres.
 *
 * ═══ CONSTRUCTION ═════════════════════════════════════════════════════════
 *
 * Maps de classes complètes et statiques (motif `Button.tsx`) : Tailwind ne
 * compile que le littéral. Le rayon vit HORS de BASE, une seule classe de rayon
 * par appel — deux classes de rayon ont la même spécificité, c'est l'ordre
 * d'émission qui trancherait (piège n°6).
 *
 * Le glyphe remplit sa boîte (`[&>svg]:w-full [&>svg]:h-full`) : la taille
 * passée à l'icône Lucide est ignorée, c'est le cran de la pastille qui décide.
 * Sans ça, une icône de 24 posée dans une pastille de 32 la déborde, ou un
 * glyphe plus large que sa boîte s'écrase en ovale (`flex-shrink`).
 *
 * Décorative par défaut (`aria-hidden`) : le texte voisin porte le sens. Si
 * l'icône est seule à dire quelque chose, passer `label` — elle devient alors
 * `role="img"` avec ce nom accessible.
 */

export type IconChipSize = 'xs' | 'sm' | 'md' | 'lg';
export type IconChipTone = 'brand' | 'warm' | 'sun' | 'neutral' | 'success' | 'danger' | 'info';

export interface IconChipProps {
  /** Une icône Lucide. Sa taille propre est ignorée : elle remplit la boîte. */
  children: React.ReactNode;
  /** 24 · 32 · 40 · 48 px. Défaut : `sm` (32). */
  size?: IconChipSize;
  /** Défaut : `brand`. */
  tone?: IconChipTone;
  /** Nom accessible. Absent = pastille décorative, masquée aux lecteurs d'écran. */
  label?: string;
  /** Placement uniquement (marges, `shrink-0` déjà posé, `self-start`…). */
  className?: string;
}

const BASE = 'inline-flex items-center justify-center shrink-0';

const SIZE: Record<IconChipSize, string> = {
  xs: 'w-6 h-6',
  sm: 'w-8 h-8',
  md: 'w-10 h-10',
  lg: 'w-12 h-12',
};

/* Le rayon, proportionnel au côté — arbitrage n°3. Hors de BASE. */
const RAYON: Record<IconChipSize, string> = {
  xs: 'rounded-sm',
  sm: 'rounded-md',
  md: 'rounded-md',
  lg: 'rounded-lg',
};

const ICON_BOX = 'inline-flex items-center justify-center [&>svg]:w-full [&>svg]:h-full';

/* Le glyphe fait la moitié du côté (un peu plus à 24, où 12 serait illisible). */
const ICON_SIZE: Record<IconChipSize, string> = {
  xs: 'icon-2xs', // 14
  sm: 'icon-xs',  // 16
  md: 'icon-md',  // 20
  lg: 'icon-lg',  // 24
};

const TONE: Record<IconChipTone, string> = {
  brand:   'bg-primary-50 text-primary-800',
  warm:    'bg-secondary-50 text-secondary-800',
  sun:     'bg-accent-50 text-accent-800',
  neutral: 'bg-ink-100 text-ink-700',
  success: 'bg-success-bg text-success-fg',
  danger:  'bg-danger-bg text-danger-fg',
  info:    'bg-info-bg text-info-fg',
};

export const IconChip: React.FC<IconChipProps> = ({
  children,
  size = 'sm',
  tone = 'brand',
  label,
  className = '',
}) => {
  const a11y = label
    ? { role: 'img' as const, 'aria-label': label }
    : { 'aria-hidden': true as const };

  return (
    <span
      className={[BASE, SIZE[size], RAYON[size], TONE[tone], className].filter(Boolean).join(' ')}
      {...a11y}
    >
      <span className={`${ICON_BOX} ${ICON_SIZE[size]}`}>{children}</span>
    </span>
  );
};

export default IconChip;
