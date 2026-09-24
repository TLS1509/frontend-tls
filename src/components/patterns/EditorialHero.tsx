import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { MeshGradientBg } from '../marketing/motion/MeshGradientBg';
import type { MeshTone } from '../marketing/motion/MeshGradientBg';

/**
 * PageHero — universal page-opening hero (canonical name since Phase 19.B-2026-05-26).
 *
 * Used by 101+ pages across Dashboard, Auth, Coaching, Settings, etc. — far beyond
 * editorial content. The component was originally named `EditorialHero` when it shipped
 * for Magazine/Article pages, but its dominance across the app made the name misleading.
 *
 * ── Universal usage (flat — Notion/Apple/Linear style) ───────────────────────
 *   <PageHero tone="flat" title="Explorez nos ressources" summary="..." />
 *
 * ── Naming convention ────────────────────────────────────────────────────────
 *   Use `PageHero tone="flat"` for ALL product app pages — Dashboard, Coaching hub,
 *   Settings, detail pages, etc. Same surface as the page, purely typographic.
 *
 *   `EditorialHero` is kept as an alias for editorial surfaces (Magazine, Veille).
 *
 * ── Tones ────────────────────────────────────────────────────────────────────
 *   - `flat`    : ✅ RECOMMENDED — transparent bg, pure typographic (Notion/Apple style)
 *   - `default` : subtle light primary tint with card border (editorial/auth fallback)
 *   - `brand`   : saturated primary blue gradient — DEPRECATED for product pages
 *   - `warm`    : saturated secondary orange gradient — DEPRECATED for product pages
 *   - `sun`     : saturated accent yellow gradient — DEPRECATED for product pages
 */

export type PageHeroTone = 'flat' | 'default' | 'brand' | 'warm' | 'sun';

export interface PageHeroEyebrow {
  icon?: React.ReactNode;
  label: string;
}

export interface PageHeroMetaItem {
  icon?: React.ReactNode;
  label: React.ReactNode;
}

export interface PageHeroBackLink {
  /** Custom label (default: « Retour »). */
  label?: React.ReactNode;
  /** Click handler — typically `() => navigate(-1)` or a custom back URL. */
  onClick: () => void;
}

export interface PageHeroProps {
  /** Surtitre : le LIEU (section, catégorie), en légende 13/600 ink-600, sans
      capitales. Chaîne ou `{ icon, label }` reçoivent ce style ; un nœud React
      passe tel quel. */
  eyebrow?: PageHeroEyebrow | React.ReactNode;
  /** Main title of the hero. Renders as `<h1>` — 36/44/700, toujours. */
  title: React.ReactNode;
  /** Chapô : 18/28, ink-700, plafonné à `max-w-prose`. */
  summary?: React.ReactNode;
  /** Optional metadata row at the bottom (date, author, edition, etc.). */
  meta?: PageHeroMetaItem[];
  /** Extra content rendered after the meta row (CTAs, badges, etc.) — 24 px sous le contenu. */
  trailing?: React.ReactNode;
  /** Padding réduit sur les tons colorés (24 au lieu de 32). Ne touche pas au titre. */
  compact?: boolean;
  /** Background gradient tone. Default: `default` (light primary). */
  tone?: PageHeroTone;
  /**
   * Optional back-link chip rendered top-left, above the eyebrow.
   * Accepts either `{ label?, onClick }` (renders a default styled chip with arrow)
   * OR a raw ReactNode for full custom control. Added Phase 19.B-2026-05-26 to absorb
   * HeroSection's `showBackButton + onBack` pattern.
   */
  backLink?: PageHeroBackLink | React.ReactNode;
  /**
   * Optional progress bar 0-100 rendered above the trailing slot.
   * Use with `progressLabel` for the descriptor below the bar.
   * Added Phase 19.B-2026-05-26 to absorb HeroSection's progress pattern.
   */
  progress?: number;
  /** Descriptor rendered below the progress bar (e.g. « 3 / 7 leçons complétées »). */
  progressLabel?: React.ReactNode;
  className?: string;
}

// ─── Backward-compatible aliases ─────────────────────────────────────────────
// Kept so existing 101 consumers don't break. Also the canonical name for
// editorial-specific surfaces (see JSDoc above).

/** @deprecated Prefer `PageHeroTone`. Alias kept for rétrocompat + editorial-specific naming. */
export type EditorialHeroTone = PageHeroTone;
/** @deprecated Prefer `PageHeroEyebrow`. Alias kept for rétrocompat + editorial-specific naming. */
export type EditorialHeroEyebrow = PageHeroEyebrow;
/** @deprecated Prefer `PageHeroMetaItem`. Alias kept for rétrocompat + editorial-specific naming. */
export type EditorialHeroMetaItem = PageHeroMetaItem;
/** @deprecated Prefer `PageHeroProps`. Alias kept for rétrocompat + editorial-specific naming. */
export type EditorialHeroProps = PageHeroProps;

// ─── Tone style maps ─────────────────────────────────────────────────────────

const TONE_BG: Record<PageHeroTone, string> = {
  flat:    '',
  default: 'bg-gradient-to-br from-primary-50 via-white/90 to-white/85',
  // 700 → 800 (arbitrage n°8 du 23/09) : partis du cran 500, ces dégradés
  // portaient du texte blanc entre 2,44 et 3,22:1. Même dégradé que la
  // rangée active de la Sidebar ; blanc à 5,02 → 7,08 (brand).
  brand:   'bg-gradient-to-br from-primary-700 to-primary-800',
  warm:    'bg-gradient-to-br from-secondary-700 to-secondary-800',
  sun:     'bg-gradient-to-br from-accent-700 to-accent-800',
};

const TONE_BORDER: Record<PageHeroTone, string> = {
  flat:    '',
  default: 'border-primary-200/60',
  brand:   'border-white/20',
  warm:    'border-white/20',
  sun:     'border-white/20',
};

/* Halos — des classes, plus un fond passé en style inline (2026-09-23). Chaque
   couleur était déjà un token au rgb près : rgba(85,161,180) = primary-500,
   rgba(248,176,68) = accent-400. Le span est carré, donc l'ellipse par défaut
   de `bg-radial` (farthest-corner) est le cercle qu'écrivait `circle` ; et un
   dégradé d'une couleur vers transparent s'interpole à l'identique en oklab
   comme en sRGB (interpolation prémultipliée). Rendu inchangé. */
const TONE_HALO: Record<PageHeroTone, string> = {
  flat:    '',
  default: 'bg-radial from-primary-500/28 to-transparent to-65%',
  brand:   'bg-radial from-white/50 to-transparent to-65%',
  warm:    'bg-radial from-white/48 to-transparent to-65%',
  sun:     'bg-radial from-white/52 to-transparent to-65%',
};

const TONE_HALO_2: Record<PageHeroTone, string> = {
  flat:    '',
  default: 'bg-radial from-accent-400/16 to-transparent to-60%',
  brand:   'bg-radial from-accent-400/26 to-transparent to-60%',
  warm:    'bg-radial from-primary-500/22 to-transparent to-60%',
  sun:     'bg-radial from-primary-500/20 to-transparent to-60%',
};

const TONE_MESH: Partial<Record<PageHeroTone, MeshTone>> = {
  brand: 'brand',
  warm:  'warm',
  sun:   'sun',
};

const TONE_SHADOW: Record<PageHeroTone, string> = {
  flat:    '',
  default: 'shadow-md',
  brand:   'shadow-[0_4px_12px_-2px_rgba(45,90,102,0.25),inset_0_1px_0_rgba(255,255,255,0.22)]',
  warm:    'shadow-[0_4px_12px_-2px_rgba(180,80,20,0.18),inset_0_1px_0_rgba(255,255,255,0.22)]',
  sun:     'shadow-[0_4px_12px_-2px_rgba(180,120,10,0.14),inset_0_1px_0_rgba(255,255,255,0.26)]',
};

/* Sur les heros sombres, le texte est en BLANC PLEIN (23/09) : sur le cran 700,
   le blanc ne vaut que 5,02 (brand) et 4,88 (sun) — la moindre transparence
   (/75, /85) le faisait tomber à 3,60-4,32. La hiérarchie passe par la taille
   et la graisse, pas par l'opacité. */
/* Le surtitre ne dit que le LIEU (2026-09-24, passe typographique) : légende
   13/600 à l'encre ink-600, sans capitales ni couleur de marque. Il était en
   capitales espacées primary-700 sur `flat` — et, passé en simple chaîne (58
   pages sur 102), il ne recevait AUCUNE classe : 16 px, graisse 400, ink-900,
   aussi gros que le texte courant (mesuré sur /passeport). ink-600 tient 6,8:1
   sur le primary-50 du ton `default`. */
const TONE_EYEBROW: Record<PageHeroTone, string> = {
  flat:    'text-ink-600',
  default: 'text-ink-600',
  brand:   'text-white',
  warm:    'text-white',
  sun:     'text-white',
};

const TONE_TITLE: Record<PageHeroTone, string> = {
  flat:    'text-ink-900',
  default: 'text-ink-900',
  brand:   'text-white',
  warm:    'text-white',
  sun:     'text-white',
};

/* Le chapô est du texte secondaire LONG : ink-700 (doctrine § 2), pas ink-600
   qui est la couleur de la méta. */
const TONE_SUMMARY: Record<PageHeroTone, string> = {
  flat:    'text-ink-700',
  default: 'text-ink-700',
  brand:   'text-white',
  warm:    'text-white',
  sun:     'text-white',
};

const TONE_META: Record<PageHeroTone, string> = {
  flat:    'text-ink-600',
  default: 'text-ink-600',
  brand:   'text-white',
  warm:    'text-white',
  sun:     'text-white',
};

const isEyebrowObject = (value: unknown): value is PageHeroEyebrow =>
  typeof value === 'object' &&
  value !== null &&
  'label' in (value as Record<string, unknown>);

const isBackLinkObject = (value: unknown): value is PageHeroBackLink =>
  typeof value === 'object' &&
  value !== null &&
  'onClick' in (value as Record<string, unknown>);

/* Bouton « Retour » des heros sombres : voile SOMBRE sous le blanc (23/09).
   Il portait blanc/15 — un voile clair qui éclaircit ce que le blanc a besoin
   de sombre : 3,75 sur l'arrêt 700 d'un hero brand (parcours). ink-900/20 :
   6,17 (brand) · 7,54 (warm) · 6,10 (sun). Le survol fonce, il n'éclaircit pas. */
const TONE_BACKLINK: Record<PageHeroTone, string> = {
  flat:    'text-primary-700 bg-ink-50 border-ink-200 hover:bg-ink-100',
  default: 'text-primary-800 bg-white/70 border-primary-200 hover:bg-primary-50',
  brand:   'text-white bg-ink-900/20 border-white/30 hover:bg-ink-900/30',
  warm:    'text-white bg-ink-900/20 border-white/30 hover:bg-ink-900/30',
  sun:     'text-white bg-ink-900/20 border-white/30 hover:bg-ink-900/30',
};

const TONE_PROGRESS_TRACK: Record<PageHeroTone, string> = {
  flat:    'bg-ink-100',
  default: 'bg-primary-100/60',
  brand:   'bg-white/15',
  warm:    'bg-white/15',
  sun:     'bg-white/15',
};

const TONE_PROGRESS_FILL: Record<PageHeroTone, string> = {
  flat:    'bg-primary-500',
  default: 'bg-primary-500',
  brand:   'bg-white',
  warm:    'bg-white',
  sun:     'bg-white',
};

// ─── Component ───────────────────────────────────────────────────────────────

export const PageHero: React.FC<PageHeroProps> = ({
  eyebrow,
  title,
  summary,
  meta,
  trailing,
  compact = false,
  tone = 'default',
  backLink,
  progress,
  progressLabel,
  className = '',
}) => {
  const clampedProgress =
    typeof progress === 'number' ? Math.max(0, Math.min(100, progress)) : null;

  const isFlat = tone === 'flat';

  /* Surtitre : légende 13/600, le lieu seulement (voir TONE_EYEBROW). Une
     chaîne ou un objet reçoivent ce style ; un nœud React passe tel quel —
     c'est à l'appelant de le styler. */
  const eyebrowClasses = [
    'self-start inline-flex items-center gap-stack-2xs text-caption font-semibold',
    TONE_EYEBROW[tone],
  ].join(' ');
  const eyebrowNode = !eyebrow ? null : isEyebrowObject(eyebrow) ? (
    <p className={eyebrowClasses}>
      {eyebrow.icon}
      {eyebrow.label}
    </p>
  ) : typeof eyebrow === 'string' || typeof eyebrow === 'number' ? (
    <p className={eyebrowClasses}>{eyebrow}</p>
  ) : (
    eyebrow
  );

  /* Le rythme de l'en-tête (passe typographique du 2026-09-24) — ce qui va
     ensemble est proche :
       retour → surtitre    24   (le retour mène AILLEURS : il se tient à l'écart)
       surtitre → titre      8   (un seul groupe : le titre et son lieu)
       titre → chapô        12
       chapô → méta         12
       → progression        16
       → actions            24   (contenu → actions, comme dans une carte)
     Avant, un `gap-stack-xs` uniforme mettait 8 px partout : le chapô collait
     au titre autant que le surtitre, et rien ne disait ce qui formait un
     groupe. L'espace sous l'en-tête (32 à 48 px) appartient à la page
     (`PageShell`), pas au composant (piège n°12).
     Le retour était à 16 px du titre, qui n'était qu'à 12 de son chapô : le h1
     flottait à égale distance des deux (rapport 1,33, sous le 1,5 de
     `check-rythme` sur trois pages du centre d'aide). À 24, il revient à son
     chapô (2,0).

     Rayon des tons colorés : 20 (`rounded-xl`), l'étage conteneur — le hero
     est l'objet le plus grand posé dans la page. Il était à 14, le rayon d'un
     bouton. Son padding (32, ou 24 en `compact`) reste au-dessus de 20 : ce
     qu'il contient garde la forme de son étage (règle des coins imbriqués,
     régime « forme fixe ») ; le mesh et les halos sont rognés par le hero. */
  return (
    <section
      className={[
        'flex flex-col',
        !isFlat && 'relative overflow-hidden rounded-xl border backdrop-blur-glass-light',
        !isFlat && TONE_BG[tone],
        !isFlat && TONE_BORDER[tone],
        !isFlat && TONE_SHADOW[tone],
        !isFlat && (compact ? 'px-stack-lg py-stack-lg' : 'px-section py-section'),
        className,
      ]
        .filter(Boolean)
        .join(' ')}
    >
      {/* Mesh + halos only on coloured tones */}
      {!isFlat && TONE_MESH[tone] && (
        <MeshGradientBg tone={TONE_MESH[tone]!} intensity="subtle" />
      )}
      {!isFlat && (
        <>
          <span
            aria-hidden="true"
            className={['pointer-events-none absolute -top-[55%] -right-[15%] w-[520px] h-[520px] rounded-pill', TONE_HALO[tone]].join(' ')}
          />
          <span
            aria-hidden="true"
            className={['pointer-events-none absolute -bottom-[45%] -left-[10%] w-[320px] h-[320px] rounded-pill', TONE_HALO_2[tone]].join(' ')}
          />
        </>
      )}

      {backLink && (
        <div className="relative mb-stack-lg">
          {isBackLinkObject(backLink) ? (
            <button
              type="button"
              onClick={backLink.onClick}
              className={[
                'inline-flex items-center gap-stack-2xs text-caption font-bold rounded-pill border px-3 py-1.5 transition-colors',
                'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500',
                TONE_BACKLINK[tone],
              ].join(' ')}
            >
              <ArrowLeft size={14} strokeWidth={2.25} />
              {backLink.label ?? 'Retour'}
            </button>
          ) : (
            backLink
          )}
        </div>
      )}

      {/* Le titre et son surtitre forment un seul groupe (8 px). Le h1 porte
          l'échelle telle quelle : 36/44/700, tracking -0,03em — le token dit
          tout, rien n'est écrit à côté. Le `leading-[1.1]` qui vivait ici
          ramenait la ligne à 39,6 px : sur deux lignes (375 px), les
          jambages du League Spartan touchaient presque la ligne suivante. */}
      <div className="relative flex flex-col gap-stack-xs">
        {eyebrowNode}
        <h1 className={['font-display text-h1 text-balance', TONE_TITLE[tone]].join(' ')}>
          {title}
        </h1>
      </div>

      {/* Chapô : 18/28, ink-700, plafonné à la largeur de lecture. Il était à
          16 px ink-600 sur `flat` (88 pages sur 102) — le même corps que le
          texte courant qui le suit : rien ne disait qu'il était le chapô. */}
      {summary && (
        <p className={['relative mt-stack-sm font-body text-body-lg max-w-prose', TONE_SUMMARY[tone]].join(' ')}>
          {summary}
        </p>
      )}

      {/* Méta : légende 13 px. 12 px entre deux données, 4 px entre une icône
          et son texte (doctrine § 5). */}
      {meta && meta.length > 0 && (
        <div className={[
          'relative mt-stack-sm flex flex-wrap items-center gap-x-stack-sm gap-y-stack-3xs text-caption',
          TONE_META[tone],
        ].join(' ')}>
          {meta.map((item, idx) => (
            <span key={idx} className="inline-flex items-center gap-stack-3xs">
              {item.icon}
              {item.label}
            </span>
          ))}
        </div>
      )}

      {/* Progress bar (above trailing) */}
      {clampedProgress !== null && (
        <div className="relative mt-stack flex flex-col gap-stack-2xs">
          <div
            className={['h-1.5 rounded-pill overflow-hidden', TONE_PROGRESS_TRACK[tone]].join(' ')}
            role="progressbar"
            aria-valuenow={clampedProgress}
            aria-valuemin={0}
            aria-valuemax={100}
          >
            <div
              className={['h-full rounded-pill transition-[width] duration-700 ease-out', TONE_PROGRESS_FILL[tone]].join(' ')}
              style={{ width: `${clampedProgress}%` }}
            />
          </div>
          {progressLabel && (
            <p className={['text-caption', TONE_META[tone]].join(' ')}>
              {progressLabel}
            </p>
          )}
        </div>
      )}

      {trailing && <div className="relative mt-stack-lg">{trailing}</div>}
    </section>
  );
};

// ─── Editorial-specific alias ────────────────────────────────────────────────
// Same component, kept reachable under the "EditorialHero" name. This serves both:
//   (1) Rétrocompat for 101 existing consumers (no migration burden).
//   (2) A semantic anchor for ACTUALLY editorial pages (Magazine, Veille, Articles)
//       where editorial-specific defaults may diverge in a future variant.
//
// New consumers SHOULD prefer `PageHero` for non-editorial surfaces, and
// `EditorialHero` for editorial surfaces. Mechanically identical for now.

export const EditorialHero = PageHero;

export default PageHero;
