import React from 'react';
import type { LucideIcon } from 'lucide-react';
import { IconChip, type IconChipSize, type IconChipTone } from '../ui/IconChip';

/**
 * SectionHeader — Canonical section-level heading within a page.
 *
 * ── 3 variants (controls icon style) ──────────────────────────────────────
 *   - `default`   : icône dans une pastille `IconChip` (fond du ton au cran 50,
 *                   glyphe au cran 800)
 *   - `minimal`   : **stroke-only icon** inline with title (no bubble) — premium/airy
 *   - `underline` : title with **accent underline** + stroke icon optional
 *   ⚠️ `solid` est déprécié depuis le 2026-09-24 et rend la même pastille que
 *   `default`. C'était une pastille faite main (dégradé saturé, glyphe blanc,
 *   ombre teintée) : l'arbitrage n°3 fait d'`IconChip` LA pastille d'icône, et
 *   `solid` n'avait aucun usage produit.
 *   ⚠️ `accent` (barre verticale colorée avant le titre) a été retirée le
 *   2026-09-24 : zéro usage produit, et c'est le premier tell « AI slop » de la
 *   doctrine (pas de barre d'accent à gauche).
 *
 * ── La pastille : `IconChip` (arbitrage n°3, 2026-09-24) ──────────────────
 *   Elle était faite main — 32 · 36 · 44 · 56 px, rayons 14 · 14 · 20 · 24 —
 *   hors de l'échelle de la pastille d'icône. Et le glyphe du ton `sun`
 *   (accent-600 sur accent-50) mesurait 2,76:1, sous le 3:1 d'un objet
 *   graphique (WCAG 1.4.11). `IconChip` porte le glyphe au cran 800 : 6,31 à
 *   9,49:1 selon le ton. `accent` y rejoint `sun` (même famille, l'or).
 *
 * ── 4 sizes — rangées sur l'échelle (passe typographique du 2026-09-24) ─────
 *   L'échelle de l'app n'a que deux titres sous le h1 : la SECTION (h2, 28/36)
 *   et le BLOC (h3, 20/26). `size` choisit l'un des deux, plus la pastille :
 *   - `lg` : section 28 px + pastille 48 — titres de groupe au niveau de la page
 *   - `md` : section 28 px + pastille 40 — DEFAULT, sections principales
 *   - `sm` : bloc 20 px + pastille 32 — sous-sections
 *   - `xs` : bloc 20 px + pastille 32, écart serré (8 au lieu de 12) — sections serrées
 *   Avant, `md` rendait 20 px (le h3 depuis l'arbitrage n°21) : les sections
 *   d'une page avaient la taille d'un titre de carte. Et `xs` était à 16 px,
 *   un titre au corps du texte, hors de l'échelle des titres.
 *
 * ── L'action passe SOUS le titre quand la place manque (2026-09-24) ───────
 *   L'en-tête est une rangée qui se replie (`flex-wrap`). Le bloc du titre
 *   réclame au moins 16rem (256 px) à côté de l'action ; en dessous, l'action
 *   descend à 8 px sous lui, calée à gauche. Avant, elle ne se repliait
 *   jamais : à 375 px, dix titres de 28 px se cassaient sur deux lignes à côté
 *   d'un bouton, et quatre débordaient (« Classement » comprimé à 45 px sous un
 *   `SegmentedControl`, sur `/leaderboard`). La règle mesure la place réelle,
 *   pas la fenêtre : elle joue aussi dans une colonne étroite du bureau (les
 *   colonnes de 326 px du tableau de bord à 1024).
 *
 * ── Niveau de titre : prop `as` (h2 | h3 | h4), défaut h2 ─────────────────
 * Indépendant de `size` (2026-09-24). Le composant émettait TOUJOURS un <h2>,
 * y compris pour une section `xs` posée dans une carte sous un autre h2 : le
 * plan du document était faux pour les lecteurs d'écran. La taille dit
 * l'importance visuelle, `as` dit la place dans le plan — ce sont deux
 * questions, et seule la page connaît la réponse à la seconde. Pour un bloc
 * (`sm`, `xs`) sous une section, passer `as="h3"`.
 *
 * ── Sous-titre et méta ────────────────────────────────────────────────────
 *   - `subtitle` : une phrase qui décrit la section — 16/26, ink-700,
 *     plafonnée à `max-w-prose`, 4 px sous le titre.
 *   - `meta` : une DONNÉE (« 12 apprenants », « 3 en attente ») — légende
 *     13/20, ink-600. La donnée chuchote (doctrine § 6) : un compte posé en
 *     `subtitle` prend la voix d'une description.
 *
 * ── Rythme — ce que la PAGE doit poser ────────────────────────────────────
 * Le composant ne pose aucune marge externe (piège n°12). La doctrine demande
 * un rapport de 3:1 autour d'un titre de section : **48 px au-dessus**
 * (`gap-page` entre sections) et **16 px en dessous** (`gap-stack` entre
 * l'en-tête et son contenu). `check-rythme` signale sous 1,5:1.
 *
 *   <PageShell>                                   // 48 px entre sections
 *     <section className="flex flex-col gap-stack">  // 16 px titre → contenu
 *       <SectionHeader title="…" />
 *       …
 *
 * Graisse : 700 pour toutes les variantes (arbitrage n°12, un seul poids de
 * titre dans l'app). L'interligne et le tracking sont ceux du token — rien
 * n'est écrit à côté (`leading-tight` et `tracking-*` retirés le 2026-09-24).
 *
 * `compact` (deprecated alias) maps to `size="sm"` for backward compat.
 *
 * ── Tone (primary | warm | sun | accent | neutral) ────────────────────────
 * Drives the chip tone, the inline icon color and the underline color.
 */

export type SectionHeaderVariant =
  | 'default'
  /** @deprecated Rend la pastille `IconChip` de `default` depuis le 2026-09-24. */
  | 'solid'
  | 'minimal'
  | 'underline';
export type SectionHeaderLevel = 'h2' | 'h3' | 'h4';
export type SectionHeaderTone = 'primary' | 'warm' | 'sun' | 'accent' | 'neutral';
export type SectionHeaderSize = 'xs' | 'sm' | 'md' | 'lg';

export interface SectionHeaderProps {
  icon?: LucideIcon | React.ReactNode;
  title: string;
  /** Une phrase qui décrit la section — 16 px, ink-700. */
  subtitle?: string;
  /** Une donnée sur la section (compte, statut chiffré) — légende 13 px, ink-600. */
  meta?: React.ReactNode;
  action?: React.ReactNode;
  divider?: boolean;
  /** Section (`md`, `lg` : 28 px) ou bloc (`sm`, `xs` : 20 px), plus la pastille. Default `md`. Does NOT set the heading level: see `as`. */
  size?: SectionHeaderSize;
  /** Heading level in the document outline. Default `h2`. Independent of `size`. */
  as?: SectionHeaderLevel;
  /** @deprecated Use `size="sm"`. Alias kept for backward compat. */
  compact?: boolean;
  variant?: SectionHeaderVariant;
  tone?: SectionHeaderTone;
  className?: string;
}

// ── Tone maps ────────────────────────────────────────────────────────────────

/* Icône nue des variantes `minimal` et `underline` (objet graphique, WCAG
   1.4.11 : 3:1). L'or monte au 700 : l'accent-600 mesurait 2,89 sur blanc,
   le 700 mesure 4,88 (4,65 sur accent-50). Le teal et l'orange passent au 600
   (3,66 · 3,98 sur blanc). */
const TONE_ICON: Record<SectionHeaderTone, string> = {
  primary: 'text-primary-600',
  warm:    'text-secondary-600',
  sun:     'text-accent-700',
  accent:  'text-accent-700',
  neutral: 'text-ink-700',
};

/* La pastille parle le vocabulaire d'IconChip : `primary` s'y appelle `brand`,
   et `accent` rejoint `sun` (la même famille, l'or). */
const TONE_CHIP: Record<SectionHeaderTone, IconChipTone> = {
  primary: 'brand',
  warm:    'warm',
  sun:     'sun',
  accent:  'sun',
  neutral: 'neutral',
};

const TONE_UNDERLINE: Record<SectionHeaderTone, string> = {
  primary: 'bg-primary-500',
  warm:    'bg-secondary-500',
  sun:     'bg-accent-400',
  accent:  'bg-accent-500',
  neutral: 'bg-ink-400',
};

// ── Size maps ────────────────────────────────────────────────────────────────

/* Deux pas seulement : la section (h2, 28/36) et le bloc (h3, 20/26). Le token
   porte la taille, l'interligne, la graisse (700) et le tracking. */
const SIZE_TITLE: Record<SectionHeaderSize, string> = {
  xs: 'text-h3',
  sm: 'text-h3',
  md: 'text-h2',
  lg: 'text-h2',
};

/* La pastille prend le cran d'IconChip le plus proche SOUS l'ancienne bulle
   (32 · 36 · 44 · 56 → 32 · 32 · 40 · 48) : le titre de bloc (h3) garde une
   pastille de 32, la section (h2) en prend 40, le titre de groupe 48. */
const SIZE_CHIP: Record<SectionHeaderSize, IconChipSize> = {
  xs: 'sm',
  sm: 'sm',
  md: 'md',
  lg: 'lg',
};

/* Le décalage qui aligne la PREMIÈRE LIGNE du titre sur le centre de la pastille.

   La pastille est toujours plus haute que la ligne du titre. Les centrer l'un
   sur l'autre demande donc de descendre le TEXTE de la moitié de l'écart, et
   non de remonter la pastille : une marge négative sur la pastille la ferait
   déborder au-dessus de l'en-tête. Recalculé le 2026-09-24 sur les crans
   d'IconChip et les interlignes du token :

     taille   ligne   pastille   décalage
     xs        26        32         3
     sm        26        32         3
     md        36        40         2
     lg        36        48         6

   Quand le titre passe sur deux lignes, le bloc entier descend d'autant, mais sa
   première ligne reste centrée sur la pastille : c'est tout l'objet. */
const SIZE_TITLE_OFFSET: Record<SectionHeaderSize, string> = {
  xs: 'mt-[3px]',
  sm: 'mt-[3px]',
  md: 'mt-0.5',   // 2 px
  lg: 'mt-1.5',   // 6 px
};

const SIZE_INLINE_GLYPH: Record<SectionHeaderSize, number> = {
  xs: 14,
  sm: 16,
  md: 20,
  lg: 24,
};

/* Même règle pour l'icône nue des variantes `minimal` et `underline` : son
   centre sur celui de la première ligne — (ligne − glyphe) / 2. */
const SIZE_INLINE_OFFSET: Record<SectionHeaderSize, string> = {
  xs: 'mt-1.5',   // (26 − 14) / 2 = 6
  sm: 'mt-[5px]', // (26 − 16) / 2 = 5
  md: 'mt-2',     // (36 − 20) / 2 = 8
  lg: 'mt-1.5',   // (36 − 24) / 2 = 6
};

/* Écart pastille ↔ titre : il grandit avec la pastille. */
const SIZE_GAP: Record<SectionHeaderSize, string> = {
  xs: 'gap-stack-xs',
  sm: 'gap-stack-sm',
  md: 'gap-stack-sm',
  lg: 'gap-stack',
};

/* Filet de séparation : 12 px d'air sous un bloc, 16 sous une section. Écrit en
   entier — l'ancien `pb-${…}` interpolé n'existait que parce que `pb-3` et
   `pb-4` traînaient ailleurs dans le code (Tailwind ne compile que le littéral). */
const SIZE_DIVIDER: Record<SectionHeaderSize, string> = {
  xs: 'pb-stack-sm border-b border-ink-200',
  sm: 'pb-stack-sm border-b border-ink-200',
  md: 'pb-stack border-b border-ink-200',
  lg: 'pb-stack border-b border-ink-200',
};

const SIZE_UNDERLINE_HEIGHT: Record<SectionHeaderSize, string> = {
  xs: 'h-[2px]',
  sm: 'h-[2px]',
  md: 'h-[3px]',
  lg: 'h-[4px]',
};

const SIZE_UNDERLINE_WIDTH: Record<SectionHeaderSize, string> = {
  xs: 'w-[24px]',
  sm: 'w-[28px]',
  md: 'w-[36px]',
  lg: 'w-[48px]',
};

/* Le bloc du titre réclame au moins 16rem à côté de l'action, sinon l'action
   passe dessous (voir l'en-tête du fichier). `grow` + `basis-64` plutôt que
   `flex-1` + `basis-64` : les deux derniers écrivent tous deux `flex-basis`,
   et c'est l'ordre d'émission de Tailwind qui trancherait (piège n°6).
   16rem reproduit, aux cinq largeurs mesurées, ce que faisait l'enveloppant
   local du tableau de bord (colonnes de 534 · 454 · 326 · 460 · 343 px). */
const TITLE_SIDE = 'grow basis-64 min-w-0';

// ── Component ────────────────────────────────────────────────────────────────

export const SectionHeader: React.FC<SectionHeaderProps> = ({
  icon,
  title,
  subtitle,
  meta,
  action,
  divider = false,
  size: sizeProp,
  compact,
  variant = 'default',
  tone = 'primary',
  className = '',
  as: Heading = 'h2',
}) => {
  // Resolve size: `compact` (deprecated) → 'sm', else use `size` prop, default 'md'
  const size: SectionHeaderSize = sizeProp ?? (compact ? 'sm' : 'md');

  const titleClasses = ['font-display text-ink-900 text-balance', SIZE_TITLE[size]].join(' ');

  // ── Icon rendering ─────────────────────────────────────────────────────────
  /* La pastille est un IconChip : il porte la forme (carré au rayon
     proportionnel), le fond (cran 50) et l'encre (cran 800). Le glyphe remplit
     la boîte du cran, quelle que soit la taille passée à l'icône. */
  const renderChipIcon = () => {
    if (!icon) return null;
    const glyph = React.isValidElement(icon) || typeof icon === 'string' || typeof icon === 'number'
      ? icon
      : React.createElement(icon as LucideIcon, { strokeWidth: 2 });
    return (
      <IconChip size={SIZE_CHIP[size]} tone={TONE_CHIP[tone]}>
        {glyph}
      </IconChip>
    );
  };

  const renderInlineIcon = () => {
    if (!icon) return null;
    const classes = ['shrink-0 inline-flex items-center', TONE_ICON[tone], SIZE_INLINE_OFFSET[size]].join(' ');
    if (React.isValidElement(icon) || typeof icon === 'string' || typeof icon === 'number') {
      return <span className={classes} aria-hidden="true">{icon}</span>;
    }
    const Icon = icon as LucideIcon;
    return (
      <span className={classes} aria-hidden="true">
        <Icon size={SIZE_INLINE_GLYPH[size]} strokeWidth={2} />
      </span>
    );
  };

  /* Sous-titre (phrase) et méta (donnée), empilés sous le titre à 4 px : ils
     appartiennent au titre (doctrine § 5, « dans un groupe : 4–8 »). */
  const renderSecondary = () => (
    <>
      {subtitle && <p className="font-body text-body text-ink-700 max-w-prose">{subtitle}</p>}
      {meta && <p className="font-body text-caption text-ink-600">{meta}</p>}
    </>
  );

  // ── Layout ─────────────────────────────────────────────────────────────────
  /* Une rangée qui se replie : 16 entre le titre et l'action quand ils sont
     côte à côte, 8 quand l'action passe dessous (elle appartient à l'en-tête,
     doctrine § 5 « dans un groupe : 4–8 »). */
  const wrapperBase = [
    'flex flex-wrap items-center justify-between gap-x-stack gap-y-stack-xs',
    divider ? SIZE_DIVIDER[size] : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  const actionNode = action && <div className="shrink-0 flex items-center gap-stack-xs">{action}</div>;

  if (variant === 'minimal') {
    /* Le sous-titre vivait EN LIGNE après un « · », et disparaissait sous
       640 px (`hidden sm:inline-flex`) : une information que le mobile ne
       recevait pas. Il passe sous le titre, à toutes les largeurs. */
    return (
      <div className={wrapperBase}>
        <div className={`flex items-start gap-stack-xs ${TITLE_SIDE}`}>
          {renderInlineIcon()}
          <div className="flex flex-col gap-stack-3xs min-w-0">
            <Heading className={titleClasses}>{title}</Heading>
            {renderSecondary()}
          </div>
        </div>
        {actionNode}
      </div>
    );
  }

  if (variant === 'underline') {
    return (
      <div className={wrapperBase}>
        <div className={`flex items-start gap-stack-xs ${TITLE_SIDE}`}>
          {renderInlineIcon()}
          {/* 8 px et non 4 : le trait déborde de 2 px sous le titre. */}
          <div className="flex flex-col gap-stack-xs min-w-0">
            <Heading className={titleClasses}>
              <span className="relative">
                {title}
                <span aria-hidden="true" className={['absolute left-0 -bottom-0.5 rounded-pill', SIZE_UNDERLINE_HEIGHT[size], SIZE_UNDERLINE_WIDTH[size], TONE_UNDERLINE[tone]].join(' ')} />
              </span>
            </Heading>
            {renderSecondary()}
          </div>
        </div>
        {actionNode}
      </div>
    );
  }

  // ── default | solid (déprécié) : la pastille IconChip ─────────────────────
  if (!icon) {
    return (
      <div className={wrapperBase}>
        <div className={`flex flex-col gap-stack-3xs ${TITLE_SIDE}`}>
          <Heading className={titleClasses}>{title}</Heading>
          {renderSecondary()}
        </div>
        {actionNode}
      </div>
    );
  }

  return (
    <div className={wrapperBase}>
      {/* Pastille | (titre, puis sous-titre et méta). La pastille est figée en
          haut (`items-start`) ; le bloc de texte descend du décalage qui centre
          sa PREMIÈRE ligne sur elle (motif de référence de la doctrine § 4).
          Le sous-titre vit dans la colonne du titre — jamais sous l'icône —
          et suit le titre à 4 px quelle que soit la hauteur de la pastille :
          quand il vivait sur une seconde rangée de grille, l'écart titre →
          sous-titre valait 17 px en `md`, le reste de la pastille compris. */}
      <div className={['flex items-start', TITLE_SIDE, SIZE_GAP[size]].join(' ')}>
        {renderChipIcon()}
        <div className={['flex flex-col gap-stack-3xs min-w-0', SIZE_TITLE_OFFSET[size]].join(' ')}>
          <Heading className={titleClasses}>{title}</Heading>
          {renderSecondary()}
        </div>
      </div>
      {actionNode}
    </div>
  );
};

export default SectionHeader;
