import React from 'react';
import { Link } from 'react-router-dom';

/**
 * Button — Valeurs : src/index.css (@theme) et src/styles/design-tokens.css.
 * Règles d'usage : docs/_canon/REGLES-USAGE-COMPOSANTS.md
 * (design-system/spec.json supprimé le 2026-07-22 : jamais importé, périmé.)
 *
 * A single action trigger. Pill shape, clear hierarchy:
 *   - primary:           one per screen, main task (teal #4A8FA1)
 *   - secondary:         alternative actions / warm CTA (orange #ED843A)
 *   - accent:            celebration / highlight (yellow #DF9E3D)
 *   - ghost:             soft brand action (light teal bg, very subtle border)
 *   - outline:          transparent bg + visible teal border (mid-weight between ghost and primary)
 *   - outline-warm:     transparent bg + visible orange border
 *   - destructive:       delete / irreversible
 *   - glass:             on DARK tinted/gradient surfaces (text-white, semi-transparent)
 *   - glass-light:       ⭐ on LIGHT tinted surfaces (cards EntryCard/SessionCard tinted) — filled frosted white
 *   - glass-light-ghost: ⭐ on LIGHT tinted surfaces — ghost frosted (secondary action)
 *   - glass-warm:        ⭐ frosted tinted warm (secondary-100/70 + blur)
 *   - glass-sun:         ⭐ frosted tinted sun (accent-100/70 + blur)
 *   - link:              inline text links
 *
 * Glass variants pair :
 *   - Use `glass` on saturated/dark backgrounds (hero brand, auth, dark gradient overlay)
 *   - Use `glass-light` (filled) + `glass-light-ghost` (secondary) on LIGHT tinted card surfaces
 *     (primary-50, secondary-50, accent-50, etc.) for cohérent frosted DS effect
 *
 * PRÉFÉRER l'API `emphasis` × `tone` pour les nouveaux usages (voir plus bas).
 *
 * Retirés le 2026-07-23 (tous les usages migrés) :
 *   - warm        → secondary
 *   - brand-ghost → ghost
 *   - glass-brand → ghost  (doublon exact, 4 unités RGB)
 */

export type ButtonVariant =
  | 'primary'
  | 'secondary'
  | 'accent'
  | 'ghost'
  | 'outline'
  | 'outline-warm'
  | 'destructive'
  | 'glass'
  | 'glass-light'
  | 'glass-light-ghost'
  | 'glass-warm'
  | 'glass-sun'
  | 'link';
  // 2026-07-23 : retirés après migration de tous les usages.
  //   'warm'        → 'secondary'   (32 usages migrés)
  //   'brand-ghost' → 'ghost'       (9 usages migrés)
  //   'glass-brand' → 'ghost'       (2 usages migrés — doublon exact, 4 unités RGB)

export type ButtonSize = 'sm' | 'md' | 'lg' | 'xl';

/* ─────────────────── Grille emphase × ton (2026-07-23) ──────────────────── */

/**
 * Les 14 `variant` ci-dessus encodent le TON dans leur nom. D'où la
 * prolifération : chaque nouveau ton exigeait un nouveau nom, et les doublons
 * devenaient invisibles. Rangés, ils forment une grille de 5 emphases × 5 tons,
 * avec un doublon (`glass-brand` ≡ `ghost`, 4 unités RGB d'écart) et des trous
 * (pas d'outline en sun/danger, pas de link hors brand).
 *
 * `emphasis` + `tone` expriment la même chose sans les noms arbitraires, et
 * attachent le contrat de contraste au NIVEAU plutôt qu'à chaque nom :
 *   solid   — fond porteur, label inversé
 *   soft    — fond teinté clair, label foncé du même ton, bordure visible
 *   outline — fond transparent, bordure et label du ton
 *   ghost   — ni fond ni bordure, label du ton
 *   link    — texte souligné, pas de boîte
 *
 * Migration : `variant` reste pleinement supporté et INCHANGÉ visuellement.
 * Les combinaisons déjà nommées réutilisent exactement les mêmes classes ;
 * seules les cases neuves sont écrites, et elles naissent conformes
 * (bordure ≥ 600, qui atteint le seuil 3:1 de WCAG 1.4.11 — les cases
 * héritées seront alignées dessus à l'étape suivante).
 */
export type ButtonEmphasis = 'solid' | 'soft' | 'outline' | 'ghost' | 'link';
export type ButtonTone = 'brand' | 'warm' | 'sun' | 'danger' | 'neutral';

export interface ButtonProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'type'> {
  /**
   * API historique — 14 noms, toujours supportée et inchangée.
   * Préférer `emphasis` + `tone` pour les nouveaux usages.
   */
  variant?: ButtonVariant;
  /** Niveau d'insistance. Prend le pas sur `variant` s'il est fourni. */
  emphasis?: ButtonEmphasis;
  /** Ton de la couleur. N'a d'effet qu'avec `emphasis`. Défaut : brand. */
  tone?: ButtonTone;
  /** Le bouton est posé sur une surface sombre ou saturée. */
  onDark?: boolean;
  size?: ButtonSize;
  /** Render just an icon (requires aria-label) */
  iconOnly?: boolean;
  /** Icon before label */
  leadingIcon?: React.ReactNode;
  /** Icon after label */
  trailingIcon?: React.ReactNode;
  /** Loading state — disables + shows spinner */
  loading?: boolean;
  /** Stretch to full container width */
  fullWidth?: boolean;
  /** HTML button type (button | submit | reset) */
  type?: 'button' | 'submit' | 'reset';
  /**
   * Render as an internal React Router link instead of a <button>. Use this
   * instead of wrapping <Button> in <Link> — nesting a real <button> inside
   * an <a> is invalid HTML and creates duplicate/ambiguous tab stops for
   * keyboard and screen-reader users. Mutually exclusive with `href`.
   */
  to?: string;
  /**
   * Render as a plain external <a> instead of a <button>. Same rationale as
   * `to` — use this instead of wrapping <Button> in <a>. Mutually exclusive
   * with `to`.
   */
  href?: string;
  /** Anchor target — only applies when `to` or `href` is set. */
  target?: string;
  /** Anchor rel — only applies when `to` or `href` is set. */
  rel?: string;
  /** Anchor download — only applies when `href` is set. */
  download?: string | boolean;
}

/**
 * BASE — porte deux corrections transverses (2026-07-23), donc valables pour
 * les 474 boutons de l'app sans toucher à un seul variant.
 *
 * 1. ANNEAU DE FOCUS BICOLORE.
 *    L'ancien `outline-primary-500` mesurait 2,94 sur blanc, 2,84 sur le fond
 *    de page, 2,62 sur surface teintée, 2,41 sur surface sombre — sous le seuil
 *    de 3,0 que WCAG 1.4.11 exige d'un indicateur de focus, et ce PARTOUT.
 *    Aucune couleur unique ne s'en sort : un anneau teal sur du teal foncé est
 *    perdu d'avance (testé sur 600, 700, 900 et ink-900). D'où deux anneaux
 *    concentriques — blanc à l'intérieur (`ring-offset-white`), ink-900 à
 *    l'extérieur : sur fond clair c'est le sombre qui porte (12,6 à 14,2), sur
 *    fond sombre c'est le blanc (7,08). Au moins un des deux contraste toujours.
 *
 * 2. MOUVEMENT VRAIMENT NEUTRALISÉ SOUS `prefers-reduced-motion`.
 *    La règle globale de `index.css` ramène `transition-duration` à 0,01 ms.
 *    Elle ne touche NI `translate` NI `scale`, qui sont des propriétés et non
 *    des transitions : le bouton ne glissait plus, il SAUTAIT — un déplacement
 *    brusque sous le curseur, pire que l'animation d'origine. Les variantes
 *    `motion-reduce:` ci-dessous suppriment le déplacement lui-même.
 */
/* Graisse 700 et aucun serrage — décidé le 2026-09-09.
   Avant : `font-semibold` (600) et `tracking-tight` (−0,025em), tous deux dans
   BASE, donc appliqués aux quatre tailles indistinctement.

   Le serrage est une compensation optique : à grande taille, l'espace entre les
   lettres paraît proportionnellement plus grand et l'œil voit des trous, alors
   on resserre. Sous 16 px l'effet s'inverse — les lettres ont besoin d'air pour
   rester distinctes, et les resserrer les colle. Or `sm` fait 13 px et compte
   522 usages : c'était la taille la plus employée qui encaissait le plus le
   défaut. Et la graisse 700 aggrave le cumul, puisqu'elle élargit les lettres.

   La graisse ne change aucun seuil de contraste avant 18,66 px, où WCAG classe
   le label en « grand texte » (seuil 3,0 au lieu de 4,5) — seul `xl` en profite.
   Ne pas remettre `tracking-tight` ici : s'il devait revenir pour les grandes
   tailles, sa place est dans SIZE_CLASSES, jamais dans BASE. */
const BASE = 'inline-flex items-center justify-center gap-stack-xs rounded-pill font-body font-bold cursor-pointer transition-[background-color,box-shadow,transform,opacity] duration-fast ease-emphasis focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink-900 focus-visible:ring-offset-2 focus-visible:ring-offset-white active:scale-[0.97] active:duration-instant motion-reduce:active:scale-100 motion-reduce:transition-none disabled:opacity-disabled disabled:cursor-not-allowed disabled:pointer-events-none aria-busy:pointer-events-none whitespace-nowrap select-none';

// Hover strategy for filled variants: keep the base color (no aggressive
// darkening) and add a colored glow shadow. Le soulèvement au survol a été
// retiré le 2026-09-09 (S1) : il datait l'interface, déplaçait le contenu sous
// le curseur, et n'existait pas sur mobile — où vivent 84 % des boutons. Le
// retour tactile passe désormais par le seul `active:scale-[0.98]`, visible lui
// au doigt comme à la souris.
const VARIANT_CLASSES: Record<ButtonVariant, string> = {
  primary:     'bg-primary-600 text-white shadow-sm hover:shadow-brand-md hover:bg-primary-500 active:bg-primary-800 active:shadow-sm',
  secondary:   'bg-secondary-500 text-white shadow-sm hover:shadow-warm-md hover:bg-secondary-400 active:bg-secondary-700 active:shadow-sm',
  accent:      'bg-accent-500 text-white shadow-sm hover:shadow-sun-md hover:bg-accent-400 active:bg-accent-600 active:shadow-sm',
  /* ghost — le fond doux, filet fermé.

     C'est la variante la plus employée de l'app : 191 des 495 boutons du produit,
     devant `primary`. Son filet vivait au cran 100, à 1,05 de contraste avec le
     blanc — invisible. Le bouton se lisait, mais rien n'annonçait que c'en était
     un, ce que WCAG 1.4.11 réclame à 3,0 pour le contour d'un composant.

     Tranché le 2026-09-09 : le filet passe au cran 600 (3,66) et reste à 1 px.
     La règle ne dit rien de l'épaisseur, seulement de la couleur — un trait fin
     au bon cran passe comme un trait épais, et le bouton ne s'alourdit pas.
     Il n'y avait d'ailleurs pas d'entre-deux : `primary-500`, le teal de la
     signature, mesure 2,94 et rate le seuil de six centièmes.

     Le label reste au cran 800, à 6,31 sur ce fond — le meilleur contraste de
     texte de toutes les pistes examinées, remplissages saturés compris. */
  ghost:       'bg-primary-50 text-primary-800 border border-primary-600 shadow-xs hover:bg-primary-100 hover:border-primary-700 hover:shadow-sm active:bg-primary-200 active:border-primary-800',
  /* outline : transparent bg + visible colored border — mid-weight between ghost and primary
     ⚠️ La bordure est à 600, PAS à 400/500. Mesuré le 2026-07-31 : sur blanc,
     `primary-400` = 2,44 et `primary-500` = 2,94, tous deux sous le seuil de
     3,0 que WCAG 1.4.11 impose au contour d'un élément d'interface — la
     bordure était donc décorative, pas perceptible. `primary-600` = 3,66 et
     `secondary-600` = 3,98 passent. Le label, lui, était déjà conforme
     (`primary-700` = 5,02 sur blanc). Ne pas « adoucir » ces bordures en
     revenant à 400 : c'est le contour qui porte l'affordance du bouton. */
  outline:     'bg-transparent text-primary-700 border border-primary-600 shadow-xs hover:bg-primary-50 hover:border-primary-700 hover:shadow-sm active:bg-primary-100 active:border-primary-700',
  'outline-warm': 'bg-transparent text-secondary-700 border border-secondary-600 shadow-xs hover:bg-secondary-50 hover:border-secondary-700 hover:shadow-warm-sm active:bg-secondary-100 active:border-secondary-700',
  destructive: 'bg-danger-strong text-white shadow-sm hover:shadow-danger-md active:bg-danger-deep active:shadow-sm',
  /* glass : pour surfaces DARK (hero brand, auth glass-dark) — semi-transparent + text-white */
  glass:       'bg-white/20 text-white border border-white/30 backdrop-blur-sm hover:bg-white/35 hover:border-white/50',
  /* glass-light : pour surfaces LIGHT tinted (EntryCard tinted, SessionCard tinted) — frosted white filled */
  'glass-light':
               'bg-white/70 text-ink-900 border border-white/70 backdrop-blur-glass-light shadow-sm hover:bg-white/90 hover:border-white active:bg-white',
  /* glass-light-ghost : action secondary sur surface LIGHT tinted — frosted plus translucide */
  'glass-light-ghost':
               'bg-white/40 text-ink-800 border border-white/50 backdrop-blur-glass-light hover:bg-white/60 hover:border-white/70 active:bg-white/70',
  /* glass-warm / glass-sun : tinted frosted buttons — bg tone-100/X + blur + tone-800 text.
     Pour usages sur fond blanc OU sur surface tinted MÊME tone (emphasis subtle).
     (glass-brand retiré le 2026-07-23 : doublon exact de `ghost`.) */
  'glass-warm':
               'bg-secondary-100/70 text-secondary-800 border border-secondary-600 backdrop-blur-glass-light shadow-xs hover:bg-secondary-100 hover:border-secondary-700 active:bg-secondary-200 active:border-secondary-700',
  /* glass-sun monte au cran 700, pas 600 : l'or est la seule famille dont le
     cran 600 (#C68D36) rate le seuil, à 2,89. Le 700 donne 4,88. */
  'glass-sun':
               'bg-accent-100/70 text-accent-800 border border-accent-700 backdrop-blur-glass-light shadow-xs hover:bg-accent-100 hover:border-accent-800 active:bg-accent-200 active:border-accent-800',
  link:        'bg-transparent text-primary-700 underline underline-offset-4 hover:text-primary-800 p-0 h-auto',
};

/* Cibles tactiles — revues le 2026-09-09.
   `sm` mesure 32 px de haut et compte 227 des 522 boutons : il vit dans les
   tableaux de bord denses (ManagerCohort, CoachDashboard, Webhooks…), où le
   passer à 44 px visuels casserait les mises en page.

   La réponse n'est pas d'agrandir le bouton mais **d'étendre sa cible** : le
   pseudo-élément porte la zone tactile à 44 px sans toucher au rendu. C'est ce
   que font iOS et Material — la cible déborde le visuel. Le bouton reste dense,
   le doigt ne rate plus.

   (44 − 32) ÷ 2 = 6 px de débord vertical, soit `-inset-y-1.5`.
   `xl` passe de 56 à 52 px : à 19 px de police en graisse 700, le label franchit
   le seuil des 18,66 px et bascule en « grand texte » au sens WCAG — son
   exigence de contraste tombe de 4,5 à 3,0, ce qui rouvre le cran 600 des
   couleurs de marque en label blanc. */
const SIZE_CLASSES: Record<ButtonSize, string> = {
  sm: 'h-8 px-3.5 text-caption relative after:absolute after:content-[""] after:inset-x-0 after:-inset-y-1.5',
  md: 'h-touch px-5 text-body-sm',
  lg: 'h-12 px-6 text-body',
  xl: 'h-13 px-7 text-[1.1875rem]',
};

/* L'icône suit la taille du bouton, et c'est le SVG qui se plie à la boîte.

   Avant : la boîte valait `1em` d'un `font-size: 1.05em`, et le SVG gardait sa
   taille propre — presque toujours 16 px, quelle que soit la taille du bouton.
   Deux défauts en découlaient, mesurés au navigateur :

     taille   boîte      SVG rendu     écart
     sm       13,65 px   13,65 × 16    écrasé de 2,35 px → icône non carrée
     md       15,75 px   15,75 × 16    écrasé de 0,25 px
     lg       16,80 px   16   × 16     boîte plus large que le glyphe
     xl       19,95 px   16   × 16     glyphe de 16 px contre un label de 19 px

   Sous `lg`, la boîte est plus étroite que le glyphe : `flex-shrink` mord sur la
   largeur et pas sur la hauteur, donc le cercle devient un ovale et les traits
   perdent la grille du pixel. Au-dessus, l'inverse : la boîte grandit, le glyphe
   non — l'icône paraît rétrécir à mesure que le bouton grossit.

   La correction tient en deux gestes. La boîte prend une taille fixe issue de
   l'échelle `--icon-size-*`, appariée à la police du label comme les commentaires
   de ces tokens le prévoyaient depuis le début (caption→xs, body-sm→sm, body→md).
   Et `[&>svg]` force le glyphe à remplir cette boîte, donc il est carré par
   construction, à toutes les tailles.

   Cette échelle existait dans `index.css` depuis le sprint 2 — cinq tokens, cinq
   utilities, **zéro consommateur**. C'est son premier usage. */
const ICON_BOX = 'inline-flex items-center justify-center shrink-0 [&>svg]:w-full [&>svg]:h-full';

const ICON_SIZE_CLASSES: Record<ButtonSize, string> = {
  sm: 'icon-xs', // 16 px pour un label de 13 px — rapport 1,23
  md: 'icon-sm', // 18 px pour 15 px — 1,20
  lg: 'icon-md', // 20 px pour 16 px — 1,25
  xl: 'icon-lg', // 24 px pour 19 px — 1,26
};

/* ────────────────── Résolution emphase × ton → classes ──────────────────── */

/**
 * Cases DÉJÀ nommées : elles pointent sur la classe existante, à l'identique.
 * `emphasis="soft" tone="brand"` rend donc exactement `variant="ghost"`.
 *
 * Cases NEUVES (marquées ✚) : elles n'existaient sous aucun nom. Écrites
 * conformes dès l'origine — bordure au cran 600, qui atteint le 3:1 exigé par
 * WCAG 1.4.11 pour le contour d'un composant. Les cases héritées gardent leur
 * bordure actuelle (souvent 100 ou 400, sous le seuil) : les aligner ferait
 * bouger le rendu, ce qui n'est pas le périmètre de cette étape.
 */
const EMPHASIS_TONE: Record<ButtonEmphasis, Partial<Record<ButtonTone, string>>> = {
  solid: {
    brand:  VARIANT_CLASSES.primary,
    warm:   VARIANT_CLASSES.secondary,
    sun:    VARIANT_CLASSES.accent,
    danger: VARIANT_CLASSES.destructive,
    // ✚ neutre plein — encre de marque, blanc dessus
    neutral: 'bg-ink-900 text-white shadow-sm hover:bg-ink-800 active:bg-ink-900 active:shadow-sm',
  },
  soft: {
    brand:   VARIANT_CLASSES.ghost,
    warm:    VARIANT_CLASSES['glass-warm'],
    sun:     VARIANT_CLASSES['glass-sun'],
    neutral: VARIANT_CLASSES['glass-light'],
    // ✚ danger doux — pour les confirmations non destructives
    danger:  'bg-danger-bg text-danger-fg border border-danger-strong shadow-xs hover:bg-danger-bg hover:border-danger-deep active:bg-danger-bg',
  },
  outline: {
    brand: VARIANT_CLASSES.outline,
    warm:  VARIANT_CLASSES['outline-warm'],
    // ✚ les deux tons qui manquaient
    sun:    'bg-transparent text-accent-800 border border-accent-600 shadow-xs hover:bg-accent-50 hover:border-accent-700 hover:shadow-sun-sm active:bg-accent-100',
    danger: 'bg-transparent text-danger-fg border border-danger-strong shadow-xs hover:bg-danger-bg hover:border-danger-deep active:bg-danger-bg',
  },
  ghost: {
    neutral: VARIANT_CLASSES['glass-light-ghost'],
    // ✚ sans fond ni bordure — l'action la plus discrète
    brand: 'bg-transparent text-primary-700 hover:bg-primary-50 hover:text-primary-800 active:bg-primary-100',
    warm:  'bg-transparent text-secondary-700 hover:bg-secondary-50 hover:text-secondary-800 active:bg-secondary-100',
    sun:   'bg-transparent text-accent-800 hover:bg-accent-50 active:bg-accent-100',
  },
  link: {
    brand: VARIANT_CLASSES.link,
    // ✚ le lien n'existait qu'en brand
    warm:   'bg-transparent text-secondary-700 underline underline-offset-4 hover:text-secondary-800 p-0 h-auto',
    sun:    'bg-transparent text-accent-800 underline underline-offset-4 hover:text-accent-800 p-0 h-auto',
    danger: 'bg-transparent text-danger-fg underline underline-offset-4 hover:text-danger-deep p-0 h-auto',
  },
};

/** Sur surface sombre, `solid` bascule sur le traitement translucide existant. */
const resolveClasses = (
  variant: ButtonVariant,
  emphasis: ButtonEmphasis | undefined,
  tone: ButtonTone,
  onDark: boolean,
): string => {
  if (!emphasis) return VARIANT_CLASSES[variant];
  if (onDark && emphasis === 'solid') return VARIANT_CLASSES.glass;
  return EMPHASIS_TONE[emphasis][tone] ?? EMPHASIS_TONE[emphasis].brand ?? VARIANT_CLASSES.primary;
};

/**
 * Les classes d'un bouton, sans le bouton.
 *
 * Certaines cartes sont elles-mêmes la cible du clic — la carte entière porte
 * `role="button"` — et affichent à l'intérieur une pilule qui RESSEMBLE à un
 * bouton sans en être un. Y mettre un vrai `<Button>` imbriquerait un contrôle
 * dans un contrôle : la navigation au clavier s'y perd, et les lecteurs d'écran
 * annoncent deux boutons là où l'utilisateur n'en voit qu'un.
 *
 * Ces affordances ont donc besoin de l'APPARENCE seule. Sans cette fonction,
 * elles la recopiaient à la main — et manquaient chaque décision : la graisse
 * 700 du 09/09, le filet au cran 600 du 10/09, la cible tactile. Elles la
 * prennent maintenant à la source.
 *
 * ⚠️ À n'employer que sur un élément NON interactif, à l'intérieur d'un parent
 * qui porte déjà l'interaction. Pour tout le reste, c'est `<Button>`.
 */
export function buttonClasses({
  variant = 'primary',
  size = 'md',
  emphasis,
  tone = 'brand',
  onDark = false,
  fullWidth = false,
  className = '',
}: {
  variant?: ButtonVariant;
  size?: ButtonSize;
  emphasis?: ButtonEmphasis;
  tone?: ButtonTone;
  onDark?: boolean;
  fullWidth?: boolean;
  className?: string;
} = {}): string {
  return [
    BASE,
    resolveClasses(variant, emphasis, tone, onDark),
    SIZE_CLASSES[size],
    fullWidth && 'w-full',
    className,
  ]
    .filter(Boolean)
    .join(' ');
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  emphasis,
  tone = 'brand',
  onDark = false,
  size = 'md',
  iconOnly = false,
  leadingIcon,
  trailingIcon,
  loading = false,
  fullWidth = false,
  type = 'button',
  disabled,
  className = '',
  children,
  to,
  href,
  target,
  rel,
  download,
  onClick,
  ...rest
}) => {
  const classes = [
    BASE,
    resolveClasses(variant, emphasis, tone, onDark),
    !iconOnly && SIZE_CLASSES[size],
    iconOnly && `${size === 'sm' ? 'w-8' : size === 'lg' ? 'w-12' : size === 'xl' ? 'w-14' : 'w-touch'} aspect-square`,
    fullWidth && 'w-full',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  // Spinner icon (replaces leadingIcon when loading)
  const iconBox = `${ICON_BOX} ${ICON_SIZE_CLASSES[size]}`;

  const spinner = (
    <span
      className={`${iconBox} animate-spin animate-glow-pulse`}
      aria-hidden="true"
    >
      <svg viewBox="0 0 24 24" fill="none">
        <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" opacity="0.25" />
        <path d="M22 12a10 10 0 0 1-10 10" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
      </svg>
    </span>
  );

  const content = (
    <>
      {loading
        ? spinner
        : leadingIcon && <span className={iconBox}>{leadingIcon}</span>}
      {!iconOnly && children}
      {/* En `iconOnly`, le glyphe arrive par `children` : il passe donc par la
          même boîte, sinon lui seul garderait une taille fixe pendant que le
          bouton change de taille autour de lui. */}
      {iconOnly && !loading && <span className={iconBox}>{children}</span>}
      {trailingIcon && <span className={iconBox}>{trailingIcon}</span>}
    </>
  );

  // `to`/`href` render as a real single anchor instead of nesting this
  // <button> inside a <Link>/<a> — nesting is invalid HTML and creates
  // duplicate/ambiguous tab stops for keyboard and screen-reader users.
  if (to || href) {
    const isDisabled = disabled || loading;
    const linkRest = rest as Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, 'href' | 'target' | 'rel' | 'onClick'>;
    const sharedProps = {
      className: classes,
      target,
      rel,
      'aria-disabled': isDisabled || undefined,
      onClick: isDisabled
        ? (e: React.MouseEvent) => e.preventDefault()
        : (onClick as unknown as React.MouseEventHandler<HTMLAnchorElement> | undefined),
      ...linkRest,
    };
    if (to) {
      return (
        <Link to={to} {...sharedProps}>
          {content}
        </Link>
      );
    }
    return (
      <a href={href} download={download} {...sharedProps}>
        {content}
      </a>
    );
  }

  return (
    <button
      type={type}
      className={classes}
      disabled={disabled || loading}
      aria-busy={loading || undefined}
      aria-disabled={disabled || loading || undefined}
      onClick={onClick}
      {...rest}
    >
      {content}
    </button>
  );
};

export default Button;
