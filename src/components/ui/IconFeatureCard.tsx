/**
 * IconFeatureCard — Square-ish tile card with icon, title, description.
 *
 * Pattern : icon (top) + title (h4) + description (body-sm) centered.
 * Aspect tile / button-shaped : padding équilibré pour ratio plus carré.
 *
 * 2 modes :
 *  - **display** (default) : div wrapper — pour features statiques sur landing/marketing
 *  - **button** (onClick provided) : button wrapper sémantique + focus-visible + hover lift
 *
 * 3 icon styles :
 *  - **plain** (default) : icon stroke nu, tone-colored — visuel le plus discret
 *  - **filled** : icon fill="currentColor" — visuel plein/solide, plus présent
 *  - **bubble** : icon dans une bulle tone-tinted — visuel le plus distinctif
 *
 * 5 icon sizes (icône = élément principal) :
 *  - **xs** : 20px (mini tile très dense, navigation tiles)
 *  - **sm** : 24px (compact tile, dense layouts)
 *  - **md** (default) : 32px (tile standard — équilibre lisibilité × compacité)
 *  - **lg** : 40px (tile large)
 *  - **xl** : 48px (large feature card — l'icône domine la card)
 *
 * Title scale avec la size : xs→body-sm · sm→body · md→h4 · lg→h3 · xl→h3
 *
 * 4 surfaces (aspect de fond) :
 *  - **card** (default) : bg-white + border ink-200 — neutre, surface standard
 *  - **tinted** : bg-{tone}-50 + border {tone}-100 — teinté tone (subtle accent)
 *  - **glass** : bg-white/60 backdrop-blur-glass-light — translucide léger
 *  - **frosted** : bg-white/40 backdrop-blur-glass-medium + border white/40 — verre dépoli
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

const TONE_BUBBLE: Record<IconFeatureCardTone, string> = {
  brand: 'bg-primary-50 text-primary-500',
  warm:  'bg-secondary-50 text-secondary-500',
  sun:   'bg-accent-50 text-accent-400',
};

const TONE_FOCUS: Record<IconFeatureCardTone, string> = {
  brand: 'focus-visible:outline-primary-500',
  warm:  'focus-visible:outline-secondary-400',
  sun:   'focus-visible:outline-accent-500',
};

/* Surface (aspect de fond) — tone-aware pour 'tinted' uniquement */
const SURFACE_CARD =
  'bg-white border border-ink-200 hover:border-ink-300';

const SURFACE_TINTED: Record<IconFeatureCardTone, string> = {
  brand: 'bg-primary-50/60 border border-primary-100 hover:border-primary-200 hover:bg-primary-50',
  warm:  'bg-secondary-50/60 border border-secondary-100 hover:border-secondary-200 hover:bg-secondary-50',
  sun:   'bg-accent-50/60 border border-accent-100 hover:border-accent-200 hover:bg-accent-50',
};

const SURFACE_GLASS =
  'bg-white/60 backdrop-blur-glass-light border border-white/60 hover:bg-white/75';

const SURFACE_FROSTED =
  'bg-white/40 backdrop-blur-glass-medium border border-white/50 hover:bg-white/55 shadow-sm';

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
  'group flex flex-col items-center justify-center text-center gap-stack-xs rounded-2xl transition-[box-shadow,transform] duration-base ease-emphasis hover:shadow-md hover:-translate-y-1';

const BASE_BUTTON =
  'group flex flex-col items-center justify-center text-center gap-stack-xs rounded-2xl transition-[box-shadow,transform] duration-base ease-emphasis cursor-pointer hover:shadow-md hover:-translate-y-1 focus-visible:outline-2 focus-visible:outline-offset-2 disabled:opacity-disabled disabled:cursor-not-allowed disabled:hover:shadow-none disabled:hover:translate-y-0 active:scale-[0.98] active:translate-y-0';

/* Square aspect — garde l'aspect bouton-compact responsive (ratio 1:1) */
const SQUARE_ASPECT = 'aspect-square';

/* Fixed icon zone height — garantit que l'icône occupe la MÊME hauteur quel que soit
   l'iconStyle (plain/filled/bubble). Sans ça : bubble (w-X h-X) > plain (icon size raw)
   et le title se retrouverait à un Y différent. */
const ICON_ZONE: Record<IconFeatureCardIconSize, string> = {
  xs: 'min-h-[24px]',  // bubble xs = 32px
  sm: 'min-h-[32px]',  // bubble sm = 40px
  md: 'min-h-[40px]',  // bubble md = 48px
  lg: 'min-h-[48px]',  // bubble lg = 56px
  xl: 'min-h-[56px]',  // bubble xl = 64px
};

/* Title size scale — plus grand quand l'icône est grande pour rythme visuel cohérent.
   xs → body-sm (14px) · sm → body (16px) · md → h4 (20px) · lg/xl → h3 (24px). */
const TITLE_SIZE: Record<IconFeatureCardIconSize, string> = {
  xs: 'text-body-sm',
  sm: 'text-body',
  md: 'text-h4',
  lg: 'text-h3',
  xl: 'text-h3',
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
  lg: 'px-4 py-5',      // 16px H · 20px V (80%)
  xl: 'px-5 py-stack-lg',      // 20px H · 24px V (83%)
};

/* Bubble container size par iconSize */
const BUBBLE_SIZE: Record<IconFeatureCardIconSize, string> = {
  xs: 'w-8 h-8',    // 32px
  sm: 'w-10 h-10',  // 40px
  md: 'w-12 h-12',  // 48px
  lg: 'w-14 h-14',  // 56px
  xl: 'w-16 h-16',  // 64px
};

function getSurfaceClasses(surface: IconFeatureCardSurface, tone: IconFeatureCardTone): string {
  switch (surface) {
    case 'tinted': return SURFACE_TINTED[tone];
    case 'glass': return SURFACE_GLASS;
    case 'frosted': return SURFACE_FROSTED;
    case 'card':
    default: return SURFACE_CARD;
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

  const classes = [
    isButton ? BASE_BUTTON : BASE_DISPLAY,
    PADDING_BY_SIZE[iconSize],
    getSurfaceClasses(surface, tone),
    square && SQUARE_ASPECT,
    isButton && TONE_FOCUS[tone],
    className,
  ].filter(Boolean).join(' ');

  // Icon wrapper depending on iconStyle (inner element — visual)
  let iconInner: React.ReactNode;
  if (iconStyle === 'bubble') {
    iconInner = (
      <div
        className={[
          'inline-flex items-center justify-center rounded-xl transition-transform group-hover:scale-110',
          BUBBLE_SIZE[iconSize],
          TONE_BUBBLE[tone],
        ].join(' ')}
        aria-hidden="true"
      >
        {icon}
      </div>
    );
  } else if (iconStyle === 'filled') {
    iconInner = (
      <div
        className={[
          'inline-flex items-center justify-center transition-transform group-hover:scale-110',
          TONE_FILLED[tone],
        ].join(' ')}
        aria-hidden="true"
      >
        {icon}
      </div>
    );
  } else {
    // plain
    iconInner = (
      <div
        className={[
          'inline-flex items-center justify-center transition-transform group-hover:scale-110',
          TONE_PLAIN[tone],
        ].join(' ')}
        aria-hidden="true"
      >
        {icon}
      </div>
    );
  }

  /* Wrapper icon zone — hauteur fixée pour alignement cross-card.
     Centre l'icon (peu importe son iconStyle) dans une zone uniforme. */
  const iconNode = (
    <div className={['flex items-center justify-center', ICON_ZONE[iconSize]].join(' ')}>
      {iconInner}
    </div>
  );

  const body = (
    <>
      {iconNode}
      <div className="flex flex-col gap-tight">
        {/* Title scale avec iconSize (xs→body-sm · sm→body · md→h4 · lg/xl→h3). */}
        <h3 className={`m-0 font-display ${TITLE_SIZE[iconSize]} font-bold text-ink-900 leading-tight`}>
          {title}
        </h3>
        {description && (
          <p className="m-0 font-body text-body-sm leading-relaxed text-ink-500">{description}</p>
        )}
      </div>
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
