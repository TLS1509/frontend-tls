import React from 'react';
import { Link } from 'react-router-dom';

/**
 * Button — Valeurs : src/index.css (@theme) et src/styles/design-tokens.css.
 * Règles d'usage : docs/_canon/REGLES-USAGE-COMPOSANTS.md
 *
 * ═══ L'API PUBLIQUE EST `emphasis` × `tone` ═══════════════════════════════
 *
 * Deux axes, et ils disent deux choses différentes :
 *
 *   emphasis — COMBIEN le bouton insiste. Cinq niveaux, du plus au moins :
 *              solid · soft · outline · ghost · link
 *   tone     — DE QUELLE COULEUR il insiste. Cinq tons :
 *              brand · warm · sun · danger · neutral
 *
 * `variant` (13 noms historiques) reste supporté mais est DÉPRÉCIÉ : chaque
 * nom n'est plus qu'un alias vers une case de la grille (table VARIANT_ALIAS).
 *
 * ⚠️ POURQUOI ce renommage, et pourquoi il fallait le faire tout de suite.
 *
 * La bascule du 2026-09-17 (banc, décision `a2-contrat-solid`, option D : l'app
 * abandonne le remplissage plein) a changé ce que rendait `variant="primary"` —
 * de l'aplat teal au teinté — en modifiant la chaîne de classes sous ce nom.
 * Or la case `solid`/`brand` de la grille POINTAIT sur cette même chaîne. Elle a
 * donc suivi, en silence.
 *
 * Conséquence mesurée au navigateur le 2026-09-17 sur `/website` : le CTA
 * principal de la page d'accueil, qui déclare pourtant `emphasis="solid"`,
 * rendait `#e8f4f7` — primary-50, le teinté de l'app — au lieu d'un aplat. Le
 * site marketing avait perdu ses remplissages sans qu'une seule ligne du site
 * ne change, et ses deux CTA de hero — le principal et le secondaire — étaient
 * devenus visuellement indiscernables.
 *
 * La correction n'est pas de retoucher une valeur, c'est d'inverser la
 * dépendance : **la grille porte les classes, les noms historiques n'y pointent
 * plus que par coordonnées.** Un nom ne peut plus déplacer un niveau.
 *
 * ═══ LE CONTRAT DE CHAQUE NIVEAU ══════════════════════════════════════════
 *
 * Chaque contrat est mesuré au navigateur (canvas 1×1, fonds composés ancêtre
 * par ancêtre — jamais de regex sur `rgba()`, cf. CLAUDE.md piège n°6 ter).
 *
 *   solid   — aplat du ton au cran 700, label blanc. Le cran 700 est le
 *             PREMIER qui porte du blanc à 4,5:1 : brand 5,02 · warm 6,31 ·
 *             sun 4,88 · danger 5,15. Le cran 600, où vivait l'ancien
 *             `primary`, mesure 3,66 et échoue (c'est le défaut A2 de
 *             DESIGN.md, « le bouton primaire de l'app mesure 3,66 »).
 *   soft    — fond du ton au cran 50 OPAQUE, label 800, filet 700.
 *             Labels 6,31 / 9,49 / 7,64 — meilleurs que tout aplat.
 *   outline — fond transparent, filet 700, label 800.
 *   ghost   — ni fond ni filet au repos, le fond n'arrive qu'au survol.
 *   link    — texte souligné, pas de boîte.
 *
 * ⚠️ LE FILET EST AU 700 ET LE LABEL AU 800, parce qu'un bouton se pose aussi
 *    sur une carte teintée — pas seulement sur du blanc. C'est la correction du
 *    17/09, et elle généralise une leçon que le dépôt avait déjà apprise une
 *    fois : un seuil mesuré sur blanc n'est pas un seuil.
 *
 *      filet      blanc   tone-50   tone-100
 *      p-600       3,66      3,26       2,99  ✗
 *      p-700       5,02      4,48       4,11  ✓
 *      sec-600     3,98      3,65       3,07
 *      sec-700     6,31      5,79       4,88  ✓
 *      or-600      2,89      2,76       2,49  ✗ (déjà au 700 avant)
 *      or-700      4,88      4,65       4,20  ✓
 *
 *    Le cran 600 tenait sur le blanc et lâchait dès la première carte teal.
 *    L'or, seule famille déjà au 700, cesse d'être une exception : c'est la
 *    même règle pour les trois. Idem pour le label — `primary-700` mesure 4,48
 *    sur `primary-50`, donc il ratait AA sur les cartes de `/passeport`.
 *
 * ⚠️ Le fond du niveau `soft` est OPAQUE, et le cran est 50 pour les trois tons.
 *    Avant le renommage, `warm` et `sun` portaient `tone-100/70`. Deux mesures
 *    condamnent ce choix :
 *      · Un fond translucide laisse la PAGE changer la couleur du bouton. Sur
 *        `/website`, le CTA warm posé dans la bande `bg-ink-900` composait à
 *        `#bda79c` — un mastic brunâtre, plus une pastille ambre.
 *      · Le cran 100 n'est pas un pas régulier d'une famille à l'autre : mesuré
 *        en ΔE contre le blanc, primary-100 vaut 9,7 quand secondary-100 vaut
 *        19,5 et accent-100 20,7. Le bouton warm se détachait deux fois plus de
 *        la page que le teal. Le cran 50 est régulier : 6,4 · 6,9 · 6,3.
 *
 * ═══ LE FLOU, LUI, RESTE — mais seulement là où il recouvre ════════════════
 *
 * DESIGN.md §10.1 : « le verre est un signal, jamais une finition ». Il ne
 * subsiste donc que sur `soft`/`neutral` et `ghost`/`neutral` — la pastille
 * blanche givrée posée SUR une carte teintée — et sur `onDark`. Il a quitté
 * `soft`/`warm` et `soft`/`sun`, où il ne recouvrait rien.
 */

/**
 * @deprecated API historique. Chaque nom est désormais un alias vers une case
 * de la grille `emphasis` × `tone` (voir VARIANT_ALIAS). Préférer les deux axes.
 *
 * Retirés le 2026-07-23 (usages migrés) : `warm` → secondary · `brand-ghost` →
 * ghost · `glass-brand` → ghost (doublon exact, 4 unités RGB).
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

export type ButtonSize = 'sm' | 'md' | 'lg' | 'xl';

/** Combien le bouton insiste. Du plus fort au plus discret. */
export type ButtonEmphasis = 'solid' | 'soft' | 'outline' | 'ghost' | 'link';
/** De quelle couleur il insiste. */
export type ButtonTone = 'brand' | 'warm' | 'sun' | 'danger' | 'neutral';

export interface ButtonProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'type'> {
  /**
   * @deprecated Utiliser `emphasis` + `tone`. Toujours supporté : chaque nom
   * est mappé sur une case de la grille par VARIANT_ALIAS.
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
/* Rayon : 14 px (`rounded-lg`) — décidé le 2026-09-14 (R3).
   Avant : `rounded-pill`, qui rendait 22 px sur la taille `md`.

   La règle est celle du seuil, et elle vaut pour les quatre familles. Le
   navigateur plafonne tout rayon à la moitié de la plus petite dimension : sous
   28 px de haut, la pilule et `rounded-lg` rendent donc EXACTEMENT la même
   forme. Badge (20 px), MetaPill (24) et Chip restent en pilule — c'est la
   convention du petit label, et elle ne coûte rien puisqu'elle ne se voit pas.
   Au-dessus du seuil, le rayon cesse d'être un accident de plafonnement et
   devient une déclaration : il prend alors l'échelle, comme la Card (R1).

   Mesuré avant de trancher, sur quatre pages de l'app : sur les ~613
   `rounded-pill` du repo, la moitié est sous le seuil (aucun effet), les
   cercles sont légitimes, et les rangées de nav n'ont ni fond ni filet au repos
   — leur rayon ne se voit qu'au survol. Il ne restait donc que le bouton plein.

   L'argument d'en face, qu'on écarte en connaissance de cause : le rayon d'une
   pilule vaut la moitié de sa hauteur, donc sa silhouette ne dépend pas de la
   longueur du label. C'est vrai, mais ce que ça achète — une constance que
   personne ne perçoit — coûte l'accord entre le CTA et la carte qui le porte.

   ⚠️ EXCEPTION `iconOnly` : le bouton-icône est carré (`aspect-square`), donc
   la pilule y donnait un cercle parfait. Le cercle est conservé, explicitement,
   dans la branche `iconOnly` du composant. Ne pas le retirer en croyant
   uniformiser : c'est 44 usages et une convention forte. */
const BASE = 'inline-flex items-center justify-center gap-stack-xs font-body font-bold cursor-pointer transition-[background-color,box-shadow,transform,opacity] duration-fast ease-emphasis focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink-900 focus-visible:ring-offset-2 focus-visible:ring-offset-white active:scale-[0.97] active:duration-instant motion-reduce:active:scale-100 motion-reduce:transition-none disabled:opacity-disabled disabled:cursor-not-allowed disabled:pointer-events-none aria-busy:pointer-events-none whitespace-nowrap select-none';

/* Le rayon vit HORS de BASE, et c'est délibéré : deux classes de rayon dans la
   même liste ont la même spécificité (0,1,0), donc c'est l'ordre d'émission de
   Tailwind qui trancherait, pas l'ordre du `className` — le piège n°6 de
   CLAUDE.md, déjà rencontré sur la couleur de bordure d'`Input`. Une seule
   classe de rayon est posée par appel, jamais deux. */
const RAYON = 'rounded-lg';
const RAYON_CERCLE = 'rounded-pill';

/* ═══ LA GRILLE — 5 niveaux × 5 tons, 25 cases, chacune complète ═══════════
   C'est ICI que vivent les classes. Aucune case ne pointe sur une autre, et
   surtout aucune ne pointe sur un nom historique : c'est la dépendance
   inverse qui a laissé le site marketing perdre ses aplats le 17/09 sans
   qu'une ligne du site ne change (voir l'en-tête du fichier).

   Survol : fond + ombre, jamais de soulèvement (S1 — le `hover:-translate-y`
   a été retiré de tout le produit le 2026-09-09 : il datait l'interface,
   déplaçait le contenu sous le curseur, et n'existait pas sur mobile, où
   vivent 84 % des boutons). Le retour tactile passe par `active:scale`.

   Sur `solid`, le survol FONCE d'un cran (700 → 800) au lieu d'éclaircir.
   L'ancien `hover:bg-primary-500` faisait tomber le contraste du label blanc
   de 3,66 à 2,94 : le bouton devenait MOINS lisible au moment précis où on
   s'apprêtait à le presser. Foncer le porte de 5,02 à 7,08. */
const EMPHASIS_TONE: Record<ButtonEmphasis, Record<ButtonTone, string>> = {
  /* ── solid — l'aplat. Le cran 700 est le premier à porter du blanc à 4,5:1.
        Réservé au site marketing (36 appels), au destructif et au verre onDark :
        l'app, elle, n'a plus d'aplat depuis le 17/09. */
  solid: {
    brand:   'bg-primary-700 text-white shadow-sm hover:bg-primary-800 hover:shadow-brand-md active:bg-primary-800 active:shadow-sm',
    warm:    'bg-secondary-700 text-white shadow-sm hover:bg-secondary-800 hover:shadow-warm-md active:bg-secondary-800 active:shadow-sm',
    sun:     'bg-accent-700 text-white shadow-sm hover:bg-accent-800 hover:shadow-sun-md active:bg-accent-800 active:shadow-sm',
    danger:  'bg-danger-strong text-white shadow-sm hover:bg-danger-deep hover:shadow-danger-md active:bg-danger-deep active:shadow-sm',
    neutral: 'bg-ink-900 text-white shadow-sm hover:bg-ink-800 active:bg-ink-900 active:shadow-sm',
  },
  /* ── soft — le fond doux. C'est le niveau PRINCIPAL de l'app depuis la
        bascule. Fond opaque au cran 50, label 800, filet 600 — le filet monte
        au 700 sur l'or, seule famille dont le 600 rate le seuil de contour
        (2,89 contre les 3,0 de WCAG 1.4.11 ; le 700 donne 4,88).
        `neutral` est la pastille blanche givrée posée sur une carte teintée :
        elle recouvre vraiment, donc elle garde son flou. */
  soft: {
    brand:   'bg-primary-50 text-primary-800 border border-primary-700 shadow-xs hover:bg-primary-100 hover:border-primary-800 hover:shadow-sm active:bg-primary-200 active:border-primary-800',
    warm:    'bg-secondary-50 text-secondary-800 border border-secondary-700 shadow-xs hover:bg-secondary-100 hover:border-secondary-800 hover:shadow-sm active:bg-secondary-200 active:border-secondary-800',
    sun:     'bg-accent-50 text-accent-800 border border-accent-700 shadow-xs hover:bg-accent-100 hover:border-accent-800 hover:shadow-sm active:bg-accent-200 active:border-accent-800',
    danger:  'bg-danger-bg text-danger-fg border border-danger-strong shadow-xs hover:border-danger-deep hover:shadow-sm active:bg-danger-bg active:border-danger-deep',
    /* Le filet de la pastille givrée est au cran ink-500, PAS ink-400.
       Mesuré le 17/09 sur ses vraies surfaces : ink-400 vaut 3,01 sur le blanc
       pur — pile le seuil — mais 2,78 sur la carte warm du Journal et 2,68 sur
       une carte teal. Le cran « bordure d'interface » de la rampe est calibré
       pour le blanc et pour lui seul. ink-500 donne 4,61 / 4,45 / 4,99.
       Avant correction, le filet était BLANC sur une carte quasi blanche :
       mesuré à 1,05 sur `/journal`, la pastille n'avait aucun contour — 12
       boutons se lisaient comme du texte gras, pas comme des boutons. */
    neutral: 'bg-white/80 text-ink-900 border border-ink-500 backdrop-blur-glass-light shadow-sm hover:bg-white hover:border-ink-600 active:bg-white',
  },
  /* ── outline — le filet sans fond. C'est le niveau secondaire. */
  outline: {
    brand:   'bg-transparent text-primary-800 border border-primary-700 shadow-xs hover:bg-primary-50 hover:border-primary-800 hover:shadow-sm active:bg-primary-100 active:border-primary-800',
    warm:    'bg-transparent text-secondary-800 border border-secondary-700 shadow-xs hover:bg-secondary-50 hover:border-secondary-800 hover:shadow-warm-sm active:bg-secondary-100 active:border-secondary-800',
    sun:     'bg-transparent text-accent-800 border border-accent-700 shadow-xs hover:bg-accent-50 hover:border-accent-800 hover:shadow-sun-sm active:bg-accent-100 active:border-accent-800',
    danger:  'bg-transparent text-danger-fg border border-danger-strong shadow-xs hover:bg-danger-bg hover:border-danger-deep active:bg-danger-bg active:border-danger-deep',
    neutral: 'bg-transparent text-ink-700 border border-ink-500 shadow-xs hover:bg-ink-50 hover:border-ink-600 hover:shadow-sm active:bg-ink-100 active:border-ink-600',
  },
  /* ── ghost — ni fond ni filet au repos. Le niveau le plus discret qui reste
        une boîte ; le fond n'apparaît qu'au survol. */
  ghost: {
    brand:   'bg-transparent text-primary-800 hover:bg-primary-50 active:bg-primary-100',
    warm:    'bg-transparent text-secondary-800 hover:bg-secondary-50 active:bg-secondary-100',
    sun:     'bg-transparent text-accent-800 hover:bg-accent-50 active:bg-accent-100',
    danger:  'bg-transparent text-danger-fg hover:bg-danger-bg active:bg-danger-bg',
    /* `ghost` n'a PAS de filet — c'est son contrat, et les quatre autres tons
       le respectent. Celui-ci portait un filet blanc/50, donc invisible (1,04
       mesuré sur `/journal`) : un contour qui ne se voit pas n'est pas un
       contour, c'est une ligne de code. */
    neutral: 'bg-transparent text-ink-700 hover:bg-ink-50 hover:text-ink-900 active:bg-ink-100',
  },
  /* ── link — pas de boîte du tout. */
  link: {
    brand:   'bg-transparent text-primary-800 underline underline-offset-4 hover:text-primary-900 p-0 h-auto',
    warm:    'bg-transparent text-secondary-800 underline underline-offset-4 hover:text-secondary-900 p-0 h-auto',
    sun:     'bg-transparent text-accent-800 underline underline-offset-4 hover:text-accent-800 p-0 h-auto',
    danger:  'bg-transparent text-danger-fg underline underline-offset-4 hover:text-danger-deep p-0 h-auto',
    neutral: 'bg-transparent text-ink-700 underline underline-offset-4 hover:text-ink-900 p-0 h-auto',
  },
};

/* ═══ SUR SURFACE SOMBRE ═══════════════════════════════════════════════════
   `onDark` n'est pas un ton : c'est le MÊME niveau, exprimé en blanc parce que
   la surface est saturée ou sombre. Trois niveaux seulement en ont besoin —
   sur du sombre, un aplat de marque n'a plus rien à dominer, et un lien reste
   un lien. Le ton n'entre pas : sur fond sombre, c'est la surface qui donne la
   couleur, le bouton se contente de la laisser passer (DESIGN.md §10.1). */
const ON_DARK: Partial<Record<ButtonEmphasis, string>> = {
  /* ⚠️ `solid` est un VERRE CLAIR À ENCRE FONCÉE, et c'est une correction, pas
     un goût. Il portait `bg-white/20 text-white` — un voile blanc SOUS du texte
     blanc, c'est-à-dire les deux clairs à la fois. CLAUDE.md nomme déjà cette
     contradiction pour le compteur de la nav : « un voile blanc éclaircit le
     fond, alors que du texte blanc réclame du sombre ».

     Mesuré le 17/09 sur les six surfaces sombres ou saturées du produit :

       voile + encre            ink-900  p-800  p-700  p-600  p-500  sec-500
       blanc/20 + blanc  (avant)   7,46   4,36   3,42   2,73   2,31    2,16
       blanc/85 + ink-900 (après) 10,65  11,34  11,72  12,03  12,34   12,40

     L'ancien passait AA sur UNE surface des six, et était le pire choix du
     tableau sur les cinq autres. Constaté en vrai sur `/coaching/compte-rendu`,
     dont le hero descend jusqu'à primary-500 : le bouton « Retour » mesurait
     2,31. Le verre clair passe partout, et il reste le verre côtier de
     DESIGN.md §10.1 — pas le verre sombre froid des SaaS IA. */
  solid:   'bg-white/85 text-ink-900 border border-white backdrop-blur-sm shadow-sm hover:bg-white active:bg-white/90',
  /* ⚠️ CONTRAT DE SURFACE pour les deux niveaux en blanc : ils demandent un fond
     au cran 700 OU PLUS FONCÉ. Sans voile, du blanc mesure 14,2 sur ink-900,
     7,08 sur le 800, 5,02 sur le 700 — et tombe à 3,66 sur le 600, 2,94 sur le
     500. Un hero qui descend au 500 ne peut porter aucun label blanc, quel que
     soit le bouton : c'est le fond qu'il faut remonter. */
  outline: 'bg-transparent text-white border border-white/70 hover:bg-white/15 hover:border-white active:bg-white/20',
  ghost:   'bg-transparent text-white hover:bg-white/15 active:bg-white/20',
};

/* ═══ LES 13 NOMS HISTORIQUES — de simples coordonnées ═════════════════════
   @deprecated. Ils ne portent plus de classes, seulement une case. Un nom ne
   peut donc plus faire glisser un niveau sous les pieds d'un autre.

   Deux alias changent de rendu, et c'est assumé (voir l'en-tête) :
     · `secondary` et `glass-warm` → soft/warm : le fond passe de
       `secondary-100/70` à `secondary-50` opaque.
     · `accent` et `glass-sun`     → soft/sun  : idem sur l'or.
   Les onze autres rendent exactement ce qu'ils rendaient. */
const VARIANT_ALIAS: Record<
  ButtonVariant,
  { emphasis: ButtonEmphasis; tone: ButtonTone; onDark?: boolean }
> = {
  primary:              { emphasis: 'soft',    tone: 'brand'   },
  secondary:            { emphasis: 'soft',    tone: 'warm'    },
  accent:               { emphasis: 'soft',    tone: 'sun'     },
  ghost:                { emphasis: 'outline', tone: 'brand'   },
  outline:              { emphasis: 'outline', tone: 'brand'   },
  'outline-warm':       { emphasis: 'outline', tone: 'warm'    },
  destructive:          { emphasis: 'solid',   tone: 'danger'  },
  glass:                { emphasis: 'solid',   tone: 'brand', onDark: true },
  'glass-light':        { emphasis: 'soft',    tone: 'neutral' },
  'glass-light-ghost':  { emphasis: 'ghost',   tone: 'neutral' },
  'glass-warm':         { emphasis: 'soft',    tone: 'warm'    },
  'glass-sun':          { emphasis: 'soft',    tone: 'sun'     },
  link:                 { emphasis: 'link',    tone: 'brand'   },
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

/* ────────────────── Résolution : deux axes, ou un alias ──────────────────── */

const resolveClasses = (
  variant: ButtonVariant,
  emphasis: ButtonEmphasis | undefined,
  tone: ButtonTone,
  onDark: boolean,
): string => {
  // Sans `emphasis`, on passe par l'alias — qui peut porter son propre onDark
  // (c'est le cas de `glass`, seul nom historique lié à une surface sombre).
  const coord = emphasis
    ? { emphasis, tone, onDark }
    : { ...VARIANT_ALIAS[variant], onDark: onDark || VARIANT_ALIAS[variant].onDark };
  return (coord.onDark && ON_DARK[coord.emphasis]) || EMPHASIS_TONE[coord.emphasis][coord.tone];
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
    RAYON,
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
    // Le bouton-icône est carré : la pilule y rend un cercle parfait.
    iconOnly ? RAYON_CERCLE : RAYON,
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
