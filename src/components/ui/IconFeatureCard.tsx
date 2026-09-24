/**
 * IconFeatureCard — Square-ish tile card with icon, title, description.
 *
 * Pattern : icon (top) + title (h3 20, 16 dans les tuiles denses) + description (16) centered.
 * Aspect tile / button-shaped : padding équilibré pour ratio plus carré.
 *
 * 2 modes :
 *  - **display** (default) : div wrapper — pour features statiques sur landing/marketing
 *  - **button** (onClick provided) : button wrapper sémantique + focus-visible
 *
 * 3 icon styles :
 *  - **plain** (default) : icon stroke nu, tone-colored — visuel le plus discret
 *  - **filled** : icon fill="currentColor" — visuel plein/solide, plus présent
 *  - **bubble** : icon dans une pastille `IconChip` — visuel le plus distinctif.
 *    ⚠️ Depuis le 2026-09-24, la bulle EST un IconChip (arbitrage n°3) : carré
 *    au rayon proportionnel, 32 · 40 · 48 px selon `iconSize`, glyphe au cran
 *    800. Elle était faite main — `rounded-xl` (20) à toutes les tailles, donc
 *    un cercle à 32 et 40, jusqu'à 64 px, et son glyphe au cran 500 (400 pour
 *    l'or) mesurait 1,60 à 2,62:1 sur la bulle (sous le 3:1 d'un objet
 *    graphique) ; il mesure 5,79 à 9,49.
 *    ⚠️ Une tuile plus étroite que la bulle et son padding (48 + 2 × 12 en
 *    `md`) ne la contient pas : c'est la grille qu'il faut élargir
 *    (`CardGrid layout="square-tiles"`, deux colonnes au moins).
 *
 * 5 icon sizes (icône = élément principal) :
 *  - **xs** : 20px (mini tile très dense, navigation tiles)
 *  - **sm** : 24px (compact tile, dense layouts)
 *  - **md** (default) : 32px (tile standard — équilibre lisibilité × compacité)
 *  - **lg** : 40px (tile large)
 *  - **xl** : 48px (large feature card — l'icône domine la card)
 *
 * Title scale avec la size : xs/sm → 16 px · md/lg/xl → h3 (20)
 *
 * 4 surfaces (aspect de fond) :
 *  - **card** (default) : bg-white + border ink-200 — neutre, surface standard
 *  - **tinted** : bg-{tone}-50 + border {tone}-100 — teinté tone (subtle accent)
 *  - **glass** : voile ink-900/15 + blur léger, texte blanc — sur hero 700+
 *  - **frosted** : voile ink-900/25 + blur moyen, texte blanc — verre dépoli, hero 700+
 *
 * Tones : brand (primary) / warm / sun
 *
 * Square mode :
 *  - **square** (default false) : si true, force aspect-square pour garder l'aspect
 *    bouton-compact quelle que soit la largeur de la grille parent.
 *
 * Use cases :
 *  - Quick action tiles ("Coaching · Réserver une session" etc.)
 *  - Marketing landing features
 *  - Dashboard navigation tiles
 *  - Settings tiles
 *  - Glass overlays sur hero/cover image
 */

import React from 'react';
import { CARD_HOVER } from '../../lib/tone-classes';
import { IconChip, type IconChipSize } from './IconChip';

export type IconFeatureCardTone = 'brand' | 'warm' | 'sun';
export type IconFeatureCardIconStyle = 'plain' | 'filled' | 'bubble';
export type IconFeatureCardIconSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
export type IconFeatureCardSurface = 'card' | 'tinted' | 'glass' | 'frosted';

interface IconFeatureCardBaseProps {
  icon: React.ReactNode;
  title: string;
  description?: string;
  tone?: IconFeatureCardTone;
  /** Style icône : 'plain' (stroke), 'filled' (fill-current), 'bubble' (bg tinted) */
  iconStyle?: IconFeatureCardIconStyle;
  /** Taille du conteneur icon : xs (20) / sm (24) / md (32 — default) / lg (40) / xl (48) */
  iconSize?: IconFeatureCardIconSize;
  /** Aspect du fond : 'card' (default) / 'tinted' / 'glass' / 'frosted' */
  surface?: IconFeatureCardSurface;
  /** Force aspect-square pour garder l'aspect bouton-compact (responsive). */
  square?: boolean;
  className?: string;
}

interface IconFeatureCardDisplayProps extends IconFeatureCardBaseProps {
  onClick?: undefined;
}

interface IconFeatureCardButtonProps extends IconFeatureCardBaseProps {
  /** Click handler — when provided, the card renders as <button>. */
  onClick: () => void;
  /** Optional aria-label override. */
  'aria-label'?: string;
}

export type IconFeatureCardProps = IconFeatureCardDisplayProps | IconFeatureCardButtonProps;

/* Tons "doux" : éviter les shades 600/700 trop foncées (surtout le jaune).
   - brand → primary-500 (#55A1B4, teal canonique TLS)
   - warm  → secondary-500 (#ED843A, orange canonique TLS)
   - sun   → accent-400 (#F8B044, TLS Yellow Base — shade canonique brand) */
const TONE_PLAIN: Record<IconFeatureCardTone, string> = {
  brand: 'text-primary-500',
  warm:  'text-secondary-500',
  sun:   'text-accent-400',
};

const TONE_FILLED: Record<IconFeatureCardTone, string> = {
  brand: 'text-primary-500 [&_svg]:fill-current',
  warm:  'text-secondary-500 [&_svg]:fill-current',
  sun:   'text-accent-400 [&_svg]:fill-current',
};

/* La bulle est un `IconChip` (arbitrage n°3, 2026-09-24) : ses tons portent
   les mêmes noms (brand · warm · sun). Sur la surface `tinted`, elle passe
   `surface="tinted"` — cran 100, arbitrage n°10 du 2026-09-23 (option C) : la
   surface est au cran 50 (à 60 % au repos, pleine au survol), une bulle au 50
   s'y fondait, jusqu'à 1,00:1 sous le pointeur.
   Taille : le cran d'IconChip égal à l'ancienne bulle jusqu'à 48 px ; `lg` et
   `xl` (56, 64 — hors de l'échelle de la pastille) s'arrêtent à 48. */
const BUBBLE_CHIP: Record<IconFeatureCardIconSize, IconChipSize> = {
  xs: 'sm', // 32
  sm: 'md', // 40
  md: 'lg', // 48
  lg: 'lg', // 48 (était 56)
  xl: 'lg', // 48 (était 64)
};

const TONE_FOCUS: Record<IconFeatureCardTone, string> = {
  brand: 'focus-visible:outline-primary-500',
  warm:  'focus-visible:outline-secondary-400',
  sun:   'focus-visible:outline-accent-500',
};

/* Surface (aspect de fond) — tone-aware pour 'tinted' uniquement.
 * 'card' reçoit son survol via CARD_HOVER[tone] (getSurfaceClasses) — filet
 * fermé d'un cran + fond léger, règle du 2026-09-16. */
const SURFACE_CARD =
  'bg-white border border-ink-200';

const SURFACE_TINTED: Record<IconFeatureCardTone, string> = {
  brand: 'bg-primary-50/60 border border-primary-100 hover:border-primary-200 hover:bg-primary-50',
  warm:  'bg-secondary-50/60 border border-secondary-100 hover:border-secondary-200 hover:bg-secondary-50',
  sun:   'bg-accent-50/60 border border-accent-100 hover:border-accent-200 hover:bg-accent-50',
};

/* glass / frosted — surfaces de hero SOMBRE (cran 700 ou plus), texte blanc.
   ⚠️ Corrigé le 2026-09-23. Elles posaient un voile BLANC (/60, /40) et
   laissaient le texte en encre : c'était donc à l'appelant de passer le texte
   en blanc, et la vitrine le faisait — blanc sur voile blanc, 1,74 (glass) et
   2,39 (frosted) sur l'arrêt 700. Garder le voile clair et l'encre n'aurait pas
   suffi : ink-500 sur blanc/60 composé sur 700 donne 2,88, et l'icône au
   cran 500 moins encore. Le composant porte désormais les deux moitiés du
   contrat : voile sombre ET texte blanc plein (5,86 et 6,50 sur 700). */
const SURFACE_GLASS =
  'bg-ink-900/15 backdrop-blur-glass-light border border-white/30 hover:bg-ink-900/25';

const SURFACE_FROSTED =
  'bg-ink-900/25 backdrop-blur-glass-medium border border-white/40 hover:bg-ink-900/35 shadow-sm';

const isSurfaceSombre = (surface: IconFeatureCardSurface) =>
  surface === 'glass' || surface === 'frosted';

/* Auto-layout CENTERED 2 axes — padding visuel ÉGAL haut/bas/gauche/droite :
   - items-center    → x-centered (icon + title sur l'axe central horizontal)
   - justify-center  → y-centered (content packé au milieu de la card)
   - text-center     → texte centré horizontalement
   - p-4             → padding interne 16px symétrique (tight, compact tile)
   - gap-stack-xs    → 8px entre icon et title (tight)

   Cohérence cross-card : pour garder icon/title alignés horizontalement entre cards
   voisines, utiliser des cards avec la MÊME shape de contenu dans une même row
   (toutes avec description OU toutes sans). Le composant IconFeatureCard est conçu
   pour des grids homogènes (typique des quick actions, KPI tiles, etc.). */
/* BASE — padding ajouté via PADDING_BY_SIZE (scale avec iconSize). */
const BASE_DISPLAY =
  'group flex flex-col items-center justify-center text-center rounded-xl transition-colors duration-base ease-emphasis';

const BASE_BUTTON =
  'group flex flex-col items-center justify-center text-center rounded-xl transition-[border-color,background-color,transform] duration-base ease-emphasis cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 disabled:opacity-disabled disabled:cursor-not-allowed active:scale-[0.98]';

/* Icône → titre : 1,5 fois l'écart titre → texte, pour que le titre se lise
   avec ce qu'il introduit (doctrine § 5) — 8 / 4 dans les tuiles denses,
   12 / 8 au-delà. À écarts égaux (8 / 8), le titre flottait entre l'icône et
   sa description. */
const ICON_GAP: Record<IconFeatureCardIconSize, string> = {
  xs: 'gap-stack-xs',
  sm: 'gap-stack-xs',
  md: 'gap-stack-sm',
  lg: 'gap-stack-sm',
  xl: 'gap-stack-sm',
};

/* Square aspect — garde l'aspect bouton-compact responsive (ratio 1:1) */
const SQUARE_ASPECT = 'aspect-square';

/* Fixed icon zone height — garantit que l'icône occupe la MÊME hauteur quel que soit
   l'iconStyle (plain/filled/bubble). Sans ça : bubble (w-X h-X) > plain (icon size raw)
   et le title se retrouverait à un Y différent. */
const ICON_ZONE: Record<IconFeatureCardIconSize, string> = {
  xs: 'min-h-[24px]',  // bulle xs = IconChip sm, 32 px
  sm: 'min-h-[32px]',  // bulle sm = IconChip md, 40 px
  md: 'min-h-[40px]',  // bulle md = IconChip lg, 48 px
  lg: 'min-h-[48px]',  // bulle lg = IconChip lg, 48 px
  xl: 'min-h-[56px]',  // bulle xl = IconChip lg, 48 px
};

/* Title size scale — sur l'échelle (passe typographique du 2026-09-24) :
   xs/sm → 16 px (tuiles de navigation denses) · md/lg/xl → h3 20/26.
   Titre → description : 4 px dans les tuiles denses, 8 au-delà (doctrine § 5,
   « titre → texte 8 », resserré là où le padding l'est aussi). */
const TITLE_SIZE: Record<IconFeatureCardIconSize, string> = {
  xs: 'text-body font-bold',
  sm: 'text-body font-bold',
  md: 'text-h3',
  lg: 'text-h3',
  xl: 'text-h3',
};

const TEXT_GAP: Record<IconFeatureCardIconSize, string> = {
  xs: 'gap-stack-3xs',
  sm: 'gap-stack-3xs',
  md: 'gap-stack-xs',
  lg: 'gap-stack-xs',
  xl: 'gap-stack-xs',
};

/* Padding scale par size — ASYMÉTRIQUE pour TOUTES les sizes (px < py).
   La card est verticale (icon top + title), donc moins de padding horizontal évite
   l'air mort sur les côtés et garde le contenu serré, plus de padding vertical donne
   de la respiration entre icon et title et entre title et bord bas.

   Progression : ratio H/V passe de 60% (xs) à ~83% (xl) — plus la card est grande,
   moins l'asymétrie est marquée. */
const PADDING_BY_SIZE: Record<IconFeatureCardIconSize, string> = {
  xs: 'px-1.5 py-2.5',  // 6px H · 10px V  (60%)
  sm: 'px-2 py-3',      // 8px H · 12px V  (67%)
  md: 'px-3 py-stack',      // 12px H · 16px V (75%)
  lg: 'px-4 py-stack-md',      // 16px H · 20px V (80%)
  xl: 'px-stack-md py-stack-lg',      // 20px H · 24px V (83%)
};

function getSurfaceClasses(surface: IconFeatureCardSurface, tone: IconFeatureCardTone): string {
  switch (surface) {
    case 'tinted': return SURFACE_TINTED[tone];
    case 'glass': return SURFACE_GLASS;
    case 'frosted': return SURFACE_FROSTED;
    case 'card':
    default: return `${SURFACE_CARD} ${CARD_HOVER[tone]}`;
  }
}

export const IconFeatureCard: React.FC<IconFeatureCardProps> = ({
  icon,
  title,
  description,
  tone = 'brand',
  iconStyle = 'plain',
  iconSize = 'md',
  surface = 'card',
  square = false,
  className = '',
  ...rest
}) => {
  const isButton = 'onClick' in rest && typeof rest.onClick === 'function';
  const surSombre = isSurfaceSombre(surface);

  const classes = [
    isButton ? BASE_BUTTON : BASE_DISPLAY,
    ICON_GAP[iconSize],
    PADDING_BY_SIZE[iconSize],
    getSurfaceClasses(surface, tone),
    square && SQUARE_ASPECT,
    isButton && TONE_FOCUS[tone],
    className,
  ].filter(Boolean).join(' ');

  // Icon wrapper depending on iconStyle (inner element — visual)
  let iconInner: React.ReactNode;
  if (iconStyle === 'bubble') {
    /* L'enveloppe porte le survol, comme pour `plain` et `filled` : la
       `className` d'IconChip est réservée au placement. */
    iconInner = (
      <span className="inline-flex transition-transform group-hover:scale-110" aria-hidden="true">
        <IconChip size={BUBBLE_CHIP[iconSize]} tone={tone} surface={surface === 'tinted' ? 'tinted' : 'default'}>
          {icon}
        </IconChip>
      </span>
    );
  } else if (iconStyle === 'filled') {
    iconInner = (
      <span
        className={[
          'inline-flex items-center justify-center transition-transform group-hover:scale-110',
          surSombre ? 'text-white [&_svg]:fill-current' : TONE_FILLED[tone],
        ].join(' ')}
        aria-hidden="true"
      >
        {icon}
      </span>
    );
  } else {
    // plain
    iconInner = (
      <span
        className={[
          'inline-flex items-center justify-center transition-transform group-hover:scale-110',
          surSombre ? 'text-white' : TONE_PLAIN[tone],
        ].join(' ')}
        aria-hidden="true"
      >
        {icon}
      </span>
    );
  }

  /* Wrapper icon zone — hauteur fixée pour alignement cross-card.
     Centre l'icon (peu importe son iconStyle) dans une zone uniforme. */
  const iconNode = (
    <span className={['flex items-center justify-center', ICON_ZONE[iconSize]].join(' ')}>
      {iconInner}
    </span>
  );

  /* Dans un <button>, le titre est un <span> : un titre n'est pas un contenu
     valide de bouton (HTML), et il faussait le plan de la page. Même style.
     Les enveloppes de l'icône et du texte sont des <span> dans les deux cas
     (2026-09-24 ; elles étaient des <div>, invalides dans le bouton) : leurs
     classes flex donnent le même rendu.
     La description est une phrase courte, centrée comme la tuile : `text-balance`
     équilibre ses deux lignes. Au-delà de deux lignes, préférer une carte
     alignée à gauche (doctrine § 3). */
  const TitleTag = isButton ? 'span' : 'h3';
  const DescTag = isButton ? 'span' : 'p';
  const body = (
    <>
      {iconNode}
      <span className={['flex flex-col', TEXT_GAP[iconSize]].join(' ')}>
        <TitleTag className={`block font-display ${TITLE_SIZE[iconSize]} text-balance ${surSombre ? 'text-white' : 'text-ink-900'}`}>
          {title}
        </TitleTag>
        {description && (
          <DescTag className={`block font-body text-body text-balance ${surSombre ? 'text-white' : 'text-ink-700'}`}>{description}</DescTag>
        )}
      </span>
    </>
  );

  if (isButton) {
    return (
      <button type="button" className={classes} {...(rest as IconFeatureCardButtonProps)}>
        {body}
      </button>
    );
  }

  return <div className={classes}>{body}</div>;
};

export default IconFeatureCard;
