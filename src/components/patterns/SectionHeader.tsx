import React from 'react';
import type { LucideIcon } from 'lucide-react';

/**
 * SectionHeader — Canonical section-level heading within a page.
 *
 * ── 4 variants (controls icon style) ──────────────────────────────────────
 *   - `default`   : icon in **soft tinted bubble** (bg-{tone}-50 + tone icon)
 *   - `solid`     : icon in **saturated tone bubble** (dégradé {tone}-600→700 + white icon)
 *   - `minimal`   : **stroke-only icon** inline with title (no bubble) — premium/airy
 *   - `underline` : title with **accent underline** + stroke icon optional
 *   ⚠️ `accent` (barre verticale colorée avant le titre) a été retirée le
 *   2026-09-24 : zéro usage produit, et c'est le premier tell « AI slop » de la
 *   doctrine (pas de barre d'accent à gauche).
 *
 * ── 4 sizes — rangées sur l'échelle (passe typographique du 2026-09-24) ─────
 *   L'échelle de l'app n'a que deux titres sous le h1 : la SECTION (h2, 28/36)
 *   et le BLOC (h3, 20/26). `size` choisit l'un des deux, plus la pastille :
 *   - `lg` : section 28 px + pastille 56 — titres de groupe au niveau de la page
 *   - `md` : section 28 px + pastille 44 — DEFAULT, sections principales
 *   - `sm` : bloc 20 px + pastille 36 — sous-sections
 *   - `xs` : bloc 20 px + pastille 32 — sections serrées
 *   Avant, `md` rendait 20 px (le h3 depuis l'arbitrage n°21) : les sections
 *   d'une page avaient la taille d'un titre de carte. Et `xs` était à 16 px,
 *   un titre au corps du texte, hors de l'échelle des titres.
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
 * Drives icon color, underline color, and (for solid) bubble bg.
 */

export type SectionHeaderVariant = 'default' | 'solid' | 'minimal' | 'underline';
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
  /** Override icon color class (e.g. "text-primary-600"). Used by `default` variant only. */
  iconClassName?: string;
}

// ── Tone maps ────────────────────────────────────────────────────────────────

const TONE_ICON: Record<SectionHeaderTone, string> = {
  primary: 'text-primary-600',
  warm:    'text-secondary-600',
  sun:     'text-accent-600',
  accent:  'text-accent-700',
  neutral: 'text-ink-700',
};

const TONE_BUBBLE_BG: Record<SectionHeaderTone, string> = {
  primary: 'bg-primary-50',
  warm:    'bg-secondary-50',
  sun:     'bg-accent-50',
  accent:  'bg-accent-50',
  neutral: 'bg-ink-50',
};

const TONE_SOLID_BG: Record<SectionHeaderTone, string> = {
  // Pastille d'icône : 3:1 à l'arrêt le plus clair — 600 pour le teal et l'orange,
  // 700 pour l'or (le blanc y mesure 3,66 · 3,98 · 4,88).
  primary: 'bg-gradient-to-br from-primary-600 to-primary-700 text-white shadow-brand-sm',
  warm:    'bg-gradient-to-br from-secondary-600 to-secondary-700 text-white shadow-warm-sm',
  sun:     'bg-gradient-to-br from-accent-400 to-accent-600 text-accent-900 shadow-sun-sm',
  accent:  'bg-gradient-to-br from-accent-700 to-accent-800 text-white shadow-sun-sm',
  neutral: 'bg-gradient-to-br from-ink-700 to-ink-900 text-white shadow-sm',
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

const SIZE_BUBBLE: Record<SectionHeaderSize, string> = {
  xs: 'w-8 h-8',
  sm: 'w-9 h-9',
  md: 'w-11 h-11',
  lg: 'w-14 h-14',
};

const SIZE_BUBBLE_RADIUS: Record<SectionHeaderSize, string> = {
  xs: 'rounded-lg',
  sm: 'rounded-lg',
  md: 'rounded-xl',
  lg: 'rounded-2xl',
};

/* Le décalage qui aligne la PREMIÈRE LIGNE du titre sur le centre de la pastille.

   La pastille est toujours plus haute que la ligne du titre. Les centrer l'un
   sur l'autre demande donc de descendre le TEXTE de la moitié de l'écart, et
   non de remonter la pastille : une marge négative sur la pastille la ferait
   déborder au-dessus de l'en-tête. Recalculé le 2026-09-24 sur les interlignes
   du token (plus de `leading-tight` à côté) :

     taille   ligne   pastille   décalage
     xs        26        32         3
     sm        26        36         5
     md        36        44         4
     lg        36        56        10

   Quand le titre passe sur deux lignes, le bloc entier descend d'autant, mais sa
   première ligne reste centrée sur la pastille : c'est tout l'objet. */
const SIZE_TITLE_OFFSET: Record<SectionHeaderSize, string> = {
  xs: 'mt-[3px]',
  sm: 'mt-[5px]',
  md: 'mt-1',     //  4 px
  lg: 'mt-2.5',   // 10 px
};

const SIZE_GLYPH: Record<SectionHeaderSize, number> = {
  xs: 16,
  sm: 18,
  md: 22,
  lg: 28,
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

/* Émoji ou nœud passé en icône : la taille du glyphe se prend sur l'échelle,
   environ la moitié de la pastille. */
const SIZE_EMOJI_TEXT: Record<SectionHeaderSize, string> = {
  xs: 'text-body',
  sm: 'text-body-lg',
  md: 'text-h3',
  lg: 'text-h2',
};

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
  iconClassName,
  as: Heading = 'h2',
}) => {
  // Resolve size: `compact` (deprecated) → 'sm', else use `size` prop, default 'md'
  const size: SectionHeaderSize = sizeProp ?? (compact ? 'sm' : 'md');

  const titleClasses = ['font-display text-ink-900 text-balance', SIZE_TITLE[size]].join(' ');

  // ── Icon rendering ─────────────────────────────────────────────────────────
  const renderBubbleIcon = (style: 'tinted' | 'solid') => {
    if (!icon) return null;
    const iconColor = iconClassName ?? TONE_ICON[tone];
    const bubbleClasses = [
      'inline-flex items-center justify-center shrink-0',
      SIZE_BUBBLE[size],
      SIZE_BUBBLE_RADIUS[size],
      style === 'solid' ? TONE_SOLID_BG[tone] : `${TONE_BUBBLE_BG[tone]} ${iconColor}`,
    ].join(' ');

    if (React.isValidElement(icon) || typeof icon === 'string' || typeof icon === 'number') {
      return (
        <span className={[bubbleClasses, 'leading-none', SIZE_EMOJI_TEXT[size]].join(' ')} aria-hidden="true">
          {icon}
        </span>
      );
    }
    const Icon = icon as LucideIcon;
    return (
      <span className={bubbleClasses}>
        <Icon size={SIZE_GLYPH[size]} strokeWidth={style === 'solid' ? 2.25 : 2} />
      </span>
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
  const wrapperBase = [
    'flex items-center justify-between gap-stack',
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
        <div className="flex items-start gap-stack-xs flex-1 min-w-0">
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
        <div className="flex items-start gap-stack-xs flex-1 min-w-0">
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

  // ── default | solid (icon bubble) ──────────────────────────────────────────
  const bubbleStyle: 'tinted' | 'solid' = variant === 'solid' ? 'solid' : 'tinted';

  if (!icon) {
    return (
      <div className={wrapperBase}>
        <div className="flex flex-col gap-stack-3xs flex-1 min-w-0">
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
      <div className={['flex items-start flex-1 min-w-0', SIZE_GAP[size]].join(' ')}>
        {renderBubbleIcon(bubbleStyle)}
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
