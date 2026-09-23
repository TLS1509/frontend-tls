import React from 'react';

/**
 * Card — Valeurs : src/index.css (@theme) et src/styles/design-tokens.css.
 * Règles d'usage : docs/_canon/REGLES-USAGE-COMPOSANTS.md
 * (design-system/spec.json supprimé le 2026-07-22 : jamais importé, périmé.)
 *
 * Self-contained content container.
 *
 * Variants:
 *   - default: bordered, white background
 *   - feature: highlighted, elevated shadow, no border
 *   - elevated: shadow-based depth
 *   - interactive: hover lift effect
 *   - glass: frosted glass effect
 *   - minimal: borderless, transparent
 *
 * Tones (optional accent): primary | warm | sun | brand
 * Sizes: sm | md | lg
 */

export type CardVariant =
  | 'default'
  | 'feature'
  | 'elevated'
  | 'interactive'
  | 'glass'
  | 'glass-brand'
  | 'glass-warm'
  | 'glass-dark'
  | 'minimal'
  /** Surface sombre opaque — lecteurs vidéo, blocs de code. Texte blanc à 15,8:1
      sur ink-900. Remplace les `className="bg-ink-900"` qui PERDAIENT contre le
      `bg-white` de `default` (même spécificité, ordre d'émission : piège n°6) —
      six pages rendaient du texte blanc sur blanc, 1,00:1 (audit du 23/09). */
  | 'ink'
  // Retirés le 2026-07-24 : `bordered`, `muted`, `sunken` — 0 usage dans tout src/.
  /** Tinted gradient — REQUIRES the `tone` prop to render properly.
      Used as the surface for ParcoursCard / learning hubs. */
  | 'tinted';
export type CardTone = 'primary' | 'warm' | 'sun' | 'brand';
export type CardSize = 'xs' | 'sm' | 'md' | 'lg';

export interface CardBadgeConfig {
  label: string;
  tone?: CardTone;
  icon?: React.ReactNode;
  variant?: 'primary' | 'warm' | 'sun' | 'success' | 'danger';
  position?: 'top-right' | 'top-left';
}

export interface CardProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'title'> {
  variant?: CardVariant;
  tone?: CardTone;
  size?: CardSize;
  /** Render as semantic element (article, section, div, etc.) */
  as?: keyof React.JSX.IntrinsicElements;

  /* ── Props-based content ── */
  eyebrow?: React.ReactNode;
  title?: React.ReactNode;
  description?: React.ReactNode;
  footer?: React.ReactNode;
  icon?: React.ReactNode;
  children?: React.ReactNode;

  /* ── Interaction ── */
  onClick?: (e: React.MouseEvent<HTMLDivElement>) => void;
  /** Hover lift effect (additive — also enabled by variant="interactive") */
  interactive?: boolean;
}

// [&[role=button]] arbitrary variants neutralize the legacy BEM rule in
// components-modern.css (`[role="button"] { height:40px; overflow:hidden }`)
// so a Card with role="button" doesn't get clipped to a 40px tall
// mini-button. Padding/border-radius/display are already set by BASE +
// SIZE_CLASSES in @layer utilities and beat the @layer components rule.
// See piège n°8 in .claude/rules/pieges-tailwind.md.
// [&[role=button]]:h-auto neutralizes the BEM rule in components-modern.css
// that sets height:40px on every [role="button"] element (piège #8).
// We intentionally do NOT add overflow-visible here so that cards with
// overflow-hidden in their className can still clip their rounded corners.
// Piège #8 — components-modern.css imposes these on every [role="button"] :
//   `height: 40px` (clips card to mini-button height)
//   `font-weight: 600` (semibold inherited by all descendants)
//   `align-items: center` (children no longer stretch to fill cross-axis,
//     causing inner content to overflow narrow cards horizontally)
// All three are neutralized below for clickable Cards.
// `motion-reduce:*` (2026-07-24) : même correction que Button.BASE. La règle
// globale de index.css ramène transition-duration à 0,01 ms mais ne touche ni
// `translate` ni `scale` — une card `interactive` SAUTAIT de 4px au survol au
// lieu de glisser. On supprime le déplacement lui-même sous reduced-motion.
/* Rayon de référence : 20 px (`rounded-xl`) — décidé le 2026-09-16.

   HISTORIQUE, parce que la valeur a fait l'aller-retour et que ça compte.
   R1 (2026-09-09) l'avait fait passer de 20 à 14, au motif qu'un filet de 1 px
   ne tient pas une courbe longue : au-delà d'une certaine courbe le coin paraît
   mou et l'objet gonflé. L'argument reste vrai — ce n'était pas une erreur,
   c'était un arbitrage.

   Ce qui l'a rouvert : à l'usage, 14 se lit comme un rectangle. Trois choses
   ont pesé dans le retour à 20.

   1. `--radius-xl` existe déjà dans l'échelle : aucun token à créer.
   2. Figma était RESTÉ à 20 — les nœuds Card, Card/Glass et StatCard y sont
      tous liés à `--radius-xl`. Le code s'aligne donc sur le dessin, au lieu de
      creuser la dérive.
   3. Le « rendu iOS » qu'on cherchait ne vient pas du rayon mais de la FORME de
      la courbe — une superellipse, pas un arc de cercle. `corner-shape: squircle`
      le donne, mais Chromium seulement : pas Safari, donc pas sur iPhone, où
      l'on compare. Écarté pour l'instant ; à reprendre quand Safari suivra.

   ⚠️ Ce qui NE revient PAS de R1 : la migration des cartes faites main. R1 a
   ramené 90 cartes sur la primitive, et elles doivent suivre ce changement.
   Deux rayons de carte qui coexistent, c'est exactement le défaut que R1 a
   réparé — ne pas le recréer à l'envers.

   ⚠️ `Button` est à `rounded-lg` (14) depuis R3, au motif qu'il « s'accorde à la
   Card qui le porte ». Cette justification tombe avec ce changement : à revoir. */
const BASE = 'flex flex-col rounded-xl text-ink-900 font-body text-body-sm transition-all duration-200 motion-reduce:transition-none [&[role=button]]:h-auto [&[role=button]]:font-normal [&[role=button]]:items-stretch';

const VARIANT_CLASSES: Record<CardVariant, string> = {
  // Shadows are tone-aware — applied dynamically via TONE_SHADOW_* maps below.
  // default/interactive/feature/elevated/tinted have no shadow baked in.
  default: 'bg-white border border-ink-200 hover:border-ink-300',
  feature: 'bg-white',
  elevated: 'bg-white',
  /* Aucune ombre ici : les cards n'en portent plus depuis le 2026-09-09 (S2). */
  // Idem pour border/bg : conservés ici comme défaut sans tone, surchargés par
  // TONE_INTERACTIVE_HOVER (émis après, donc gagnant — vérifié).
  interactive: 'bg-white border border-ink-200 cursor-pointer hover:border-primary-300 hover:bg-primary-50/30',
  glass:       'backdrop-blur-glass-medium backdrop-saturate-[180%] bg-gradient-to-br from-white/88 to-white/65 border border-white/75 shadow-[0_2px_12px_rgba(0,0,0,0.06),inset_0_1px_0_rgba(255,255,255,0.9)] hover:shadow-md',
  'glass-brand': 'backdrop-blur-glass-medium backdrop-saturate-[180%] bg-gradient-to-br from-primary-500/[30%] to-primary-500/[12%] border border-primary-500/35 shadow-[0_2px_12px_rgba(45,90,102,0.12),inset_0_1px_0_rgba(255,255,255,0.4)] hover:shadow-brand-sm',
  'glass-warm':  'backdrop-blur-glass-medium backdrop-saturate-[180%] bg-gradient-to-br from-secondary-100/88 to-secondary-50/70 border border-secondary-200/65 shadow-[0_2px_12px_rgba(180,80,20,0.08),inset_0_1px_0_rgba(255,255,255,0.85)] hover:shadow-warm-sm',
  // 2026-07-24 : les 4 hex codés en dur remplacés par les tokens primary
  // (500/800/900 — valeurs identiques vérifiées). Le gradient suit désormais
  // toute évolution de la palette. Arbitrary property car un radial-gradient
  // inline n'accepte pas de classe Tailwind.
  'glass-dark':  'backdrop-blur-glass-medium backdrop-saturate-[180%] [background:radial-gradient(circle_at_0%_0%,var(--color-primary-500)_0%,var(--color-primary-800)_60%,var(--color-primary-900)_100%)] border border-white/20 shadow-lg hover:shadow-xl text-white/95',
  minimal:  'bg-transparent border border-ink-200 hover:bg-ink-50 hover:border-ink-300',
  ink:      'bg-ink-900 border border-ink-800 text-white',
  // bordered / muted / sunken retirés le 2026-07-24 (0 usage). Si un besoin
  // resurgit : bordered = border-2 primary-200 ; muted = bg-ink-50 ; sunken = bg-ink-100.
  // `tinted` provides only the border + shadow defaults — the actual gradient
  // bg is supplied by TONE_GRADIENT_BG_CLASSES via the `tone` prop. Falls back
  // to a neutral white surface if no tone is set.
  tinted:   'bg-white border backdrop-blur-sm',
};

/**
 * Gradient tone backgrounds — applied when variant="tinted" combined with a
 * tone. Replaces the standalone ToneAwareCard's TONE_CLASSES to keep the
 * styling in one place.
 */
const TONE_GRADIENT_BG_CLASSES: Record<CardTone, string> = {
  primary: 'bg-gradient-to-br from-primary-100/92 to-primary-50/78 border-primary-200/70 shadow-[inset_0_1px_0_rgba(255,255,255,0.85)]',
  warm:    'bg-gradient-to-br from-secondary-100/92 to-secondary-50/78 border-secondary-200/70 shadow-[inset_0_1px_0_rgba(255,255,255,0.85)]',
  sun:     'bg-gradient-to-br from-accent-100/92 to-accent-50/78 border-accent-200/70 shadow-[inset_0_1px_0_rgba(255,255,255,0.85)]',
  brand:   'bg-gradient-to-br from-primary-100/92 to-primary-50/78 border-primary-200/70 shadow-[inset_0_1px_0_rgba(255,255,255,0.85)]',
};

/* Le padding intérieur — doctrine du 2026-09-09, géométrie corrigée le 17/09.

   **24 px est le canon** (`md`, le défaut). **20 px est la seule dérogation**,
   pour les surfaces denses — tranché le 2026-09-23 (arbitrage n°4) : à 20, le
   padding égale le rayon, le coin cesse de pincer ; l'ancien argument pour
   16 (« 20 n'existe pas dans l'échelle ») était faux, `stack-md` existe.
   Pas de troisième valeur.

   La règle géométrique (.claude/rules/doctrine-design.md § Padding intérieur) : **le padding ne descend pas sous
   le rayon**. Le point serré bascule à P = R exactement — dès que le padding
   atteint le rayon, le coin cesse d'être le point le plus proche du contenu et
   ne pince plus DU TOUT. Au rayon 20 : 24 px ne pince pas ; 16 px pince de
   10 %, et seulement si du contenu occupe le coin (tranché le 17/09 : la
   dérogation dense RESTE à 16 — 20 px n'existe pas dans l'échelle d'espacement).
   ⚠️ L'ancien commentaire posait ici un seuil de « ~1,4× » : il n'existait pas
   (aucune mesure, aucune source — corrigé le 17/09). Ne pas le réintroduire.

   Les noms sont sémantiques parce que la doctrine porte sur des intentions —
   « dense » et « canonique » — et non sur des nombres. `xs` garde `p-3` : 12 px
   n'a pas de nom dans l'échelle, et cette taille n'a aucun consommateur.

   Les 90 cartes faites main ont été ramenées sur ces deux valeurs le 09/09 :
   17 conversions de vocabulaire à pixel constant, 32 convergences depuis 12, 20
   et 32 px. */
const SIZE_PADDING: Record<CardSize, string> = {
  xs: 'p-3',
  sm: 'p-stack-md',   // 20 px — dense (arbitrage n°4 du 23/09 : padding = rayon, le coin ne pince plus)
  md: 'p-stack-lg',   // 24 px — le canon
  lg: 'p-section',    // 32 px — éditorial
};

const SIZE_GAP: Record<CardSize, string> = {
  xs: 'gap-stack-xs',
  sm: 'gap-stack-xs',
  md: 'gap-stack-xs',
  lg: 'gap-stack',
};

/* Un `p-*` passé en `className` REMPLACE le padding de la taille — il ne
   s'y ajoute pas. Avant le 2026-09-23, les deux classes coexistaient et c'est
   l'ordre d'émission de Tailwind qui tranchait (piège n°6) : `p-stack` et `p-0`
   perdaient contre `p-stack-lg` et rendaient 24 px, `p-stack-md` gagnait. 71
   appels demandaient une marge qu'ils n'obtenaient pas — la dérogation dense à
   16 px n'existait nulle part à l'écran (audit du 23/09, volets 3 et 4).
   Seul un `p-` NU est détecté : un `px-`/`py-`/`pt-`… ou un `md:p-` n'efface
   pas le padding de base (propriétés distinctes ou variante émise après).
   Préférer `size="sm"` à `className="p-stack"` : le nom dit l'intention. */
const OWN_PADDING = /(?:^|\s)p-\S+/;

const TONE_BG_CLASSES: Record<CardTone, string> = {
  primary: 'bg-primary-50 border-primary-200',
  warm: 'bg-secondary-50 border-secondary-200',
  sun: 'bg-accent-50 border-accent-200',
  brand: 'bg-primary-50 border-primary-200',
};

const TONE_TITLE_CLASSES: Record<CardTone, string> = {
  primary: 'text-primary-900',
  warm: 'text-secondary-900',
  sun: 'text-accent-900',
  brand: 'text-primary-900',
};

const TONE_EYEBROW_CLASSES: Record<CardTone, string> = {
  primary: 'text-primary-800',
  warm: 'text-secondary-700',
  sun: 'text-accent-700',
  brand: 'text-primary-800',
};

// When variant="interactive" (or interactive=true) is combined with a tone,
// override the hardcoded primary hover colors with tone-specific ones.
const TONE_INTERACTIVE_HOVER: Record<CardTone, string> = {
  primary: 'hover:border-primary-300 hover:bg-primary-50/50',
  warm:    'hover:border-secondary-300 hover:bg-secondary-50/50',
  sun:     'hover:border-accent-300 hover:bg-accent-50/50',
  brand:   'hover:border-primary-300 hover:bg-primary-50/50',
};

// Les maps d'ombre CARD_SHADOW_* ont été retirées le 2026-09-17 : une carte ne
// porte plus d'ombre, ni au repos (S2, 09/09) ni au survol (règle CARD_HOVER,
// 16/09). Le survol vit dans TONE_INTERACTIVE_HOVER ci-dessus.

const INTERACTIVE_EXTRA = 'cursor-pointer';

// Anneau de focus BICOLORE (2026-07-24) : même correction que Button.BASE.
// L'ancien `outline-primary-500` mesurait 2,4 à 2,9 sur les surfaces réelles —
// sous le seuil de 3,0 de WCAG 1.4.11, et aucune couleur unique ne s'en sort
// (un anneau teal sur du teal foncé est perdu). Deux anneaux concentriques :
// blanc à l'intérieur, ink-900 à l'extérieur — au moins un contraste toujours.
const CLICKABLE = 'cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink-900 focus-visible:ring-offset-2 focus-visible:ring-offset-white';

const TITLE_SIZE: Record<CardSize, string> = {
  xs: 'text-body font-semibold',
  sm: 'text-body font-semibold',
  md: 'text-h4',
  lg: 'text-h3',
};

const DESC_SIZE: Record<CardSize, string> = {
  xs: 'text-caption',
  sm: 'text-caption',
  md: 'text-body-sm',
  lg: 'text-body',
};

const ICON_SIZE: Record<CardSize, string> = {
  xs: '[&>svg]:w-6 [&>svg]:h-6',
  sm: '[&>svg]:w-8 [&>svg]:h-8',
  md: '[&>svg]:w-10 [&>svg]:h-10',
  lg: '[&>svg]:w-14 [&>svg]:h-14',
};

export const Card: React.FC<CardProps> = ({
  variant = 'default',
  tone,
  size = 'md',
  as = 'div',
  className = '',
  eyebrow,
  title,
  description,
  footer,
  icon,
  children,
  onClick,
  interactive = false,
  ...rest
}) => {
  // tinted variant uses the gradient tone map; other variants use the flat
  // tone bg map (existing behavior).
  const toneBgClasses = tone
    ? variant === 'tinted'
      ? TONE_GRADIENT_BG_CLASSES[tone]
      : TONE_BG_CLASSES[tone]
    : '';

  /* Aucune ombre sur les cards — décidé le 2026-09-09 (S1, S2).
     La bordure de 1 px pose l'objet ; cumuler bordure et ombre est le « ghost
     card », le tell le plus reconnaissable des interfaces générées. Le verre
     garde la sienne, lui en a besoin pour se détacher de ce qu'il recouvre. */

  // When interactive + tone, override the hardcoded primary hover with tone colors.
  const isInteractive = variant === 'interactive' || interactive;
  const toneInteractiveClasses = isInteractive && tone ? TONE_INTERACTIVE_HOVER[tone] : '';

  const classes = [
    BASE,
    VARIANT_CLASSES[variant],
    !OWN_PADDING.test(className) && SIZE_PADDING[size],
    SIZE_GAP[size],
    toneBgClasses,
    toneInteractiveClasses,
    interactive && variant !== 'interactive' && INTERACTIVE_EXTRA,
    onClick && CLICKABLE,
    className,
  ]
    .filter(Boolean)
    .join(' ');

  const hasPropsContent = eyebrow || title || description || footer || icon;

  const eyebrowClass = `font-mono text-micro font-bold uppercase tracking-[0.08em] ${tone ? TONE_EYEBROW_CLASSES[tone] : 'text-ink-500'}`;
  // tracking-display for large/medium titles (≥h3 = 1.375rem) for premium tightness
  const titleClass = `m-0 p-0 font-display ${TITLE_SIZE[size]} font-semibold leading-tight ${size === 'lg' ? 'tracking-display' : size === 'md' ? 'tracking-headline' : 'tracking-tight'} ${tone ? TONE_TITLE_CLASSES[tone] : 'text-ink-900'}`;
  const descriptionClass = `m-0 p-0 ${DESC_SIZE[size]} leading-normal text-ink-600`;
  const footerClass = 'flex items-center justify-between gap-stack-xs mt-2 pt-2 border-t border-ink-200 text-caption text-ink-600';
  const iconClass = `flex items-center justify-center shrink-0 mb-2 ${ICON_SIZE[size]} [&>svg]:text-current`;
  const headerClass = 'flex flex-col gap-tight mb-1';

  return React.createElement(
    as as string,
    {
      className: classes,
      onClick,
      role: onClick ? 'button' : undefined,
      tabIndex: onClick ? 0 : undefined,
      onKeyDown: onClick
        ? (e: React.KeyboardEvent) => {
            if (e.key === 'Enter' || e.key === ' ') {
              onClick(e as any);
            }
          }
        : undefined,
      ...rest,
    },
    hasPropsContent ? (
      <>
        {icon && <div className={iconClass}>{icon}</div>}
        {(eyebrow || title) && (
          <div className={headerClass}>
            {eyebrow && <div className={eyebrowClass}>{eyebrow}</div>}
            {title && <h3 className={titleClass}>{title}</h3>}
          </div>
        )}
        {description && <p className={descriptionClass}>{description}</p>}
        {footer && <div className={footerClass}>{footer}</div>}
      </>
    ) : (
      children
    )
  );
};

/**
 * LEGACY EXPORTS (deprecated, kept for backward compatibility)
 * Prefer Card props: <Card title="..." description="..." />
 */
export const CardEyebrow: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({
  className = '',
  ...rest
}) => (
  <div
    className={`font-mono text-micro font-bold uppercase tracking-[0.08em] text-ink-500 ${className}`}
    {...rest}
  />
);

export const CardTitle: React.FC<React.HTMLAttributes<HTMLHeadingElement>> = ({
  className = '',
  ...rest
}) => (
  <h3
    /* Pas de graisse écrite ici : le token `text-h4` déclare déjà 700, et la poser
       à côté ne peut que le contredire — c'était le cas, à 600, sur la primitive
       même qui sert de référence aux cartes. Corrigé le 2026-09-10. */
    className={`p-0 font-display text-h4 leading-tight tracking-headline text-ink-900 ${className}`}
    {...rest}
  />
);

export const CardDesc: React.FC<React.HTMLAttributes<HTMLParagraphElement>> = ({
  className = '',
  ...rest
}) => (
  <p
    className={`m-0 p-0 text-body-sm leading-normal text-ink-600 ${className}`}
    {...rest}
  />
);

export const CardFooter: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({
  className = '',
  ...rest
}) => (
  <div
    className={`flex items-center justify-between gap-stack-xs mt-2 pt-2 border-t border-ink-200 text-caption text-ink-600 ${className}`}
    {...rest}
  />
);

export default Card;
