/**
 * DesignLab — banc d'essai des arbitrages design en cours (chantier typo/a11y du 2026-07-23).
 * Route standalone /_design-lab, hors shell app (même convention que /_card-lab).
 *
 * Principe : ce lab NE RECOPIE AUCUNE VALEUR. Tout est relu à l'exécution depuis
 * les variables CSS (`getComputedStyle`) et tous les ratios de contraste sont
 * calculés en direct avec la formule WCAG 2.x. C'est la leçon du chantier :
 * « une valeur écrite deux fois finit toujours par mentir ».
 *
 * Le toggle « Appliquer » injecte les overrides dans <head> : la proposition
 * reste active quand on navigue vers le reste de l'app (SPA, pas de reload),
 * ce qui permet de juger en situation réelle et pas seulement sur ce banc.
 *
 * À supprimer quand les arbitrages sont rendus et appliqués.
 */

import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Check, X, Type, Square, MousePointerClick, Baseline, RotateCcw, Bold, LayoutGrid, Ruler, LayoutList, Wrench, FlaskConical, ListChecks, ChevronRight, ArrowUpRight } from 'lucide-react';
import { Button } from '../components/core/Button';
import { Card } from '../components/core/Card';

/* ─────────────────────────── Contraste WCAG 2.x ─────────────────────────── */

const srgbToLin = (c: number) => {
  const v = c / 255;
  return v <= 0.04045 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
};

const parseColor = (input: string): [number, number, number] | null => {
  const s = input.trim();
  const hex = s.match(/^#([0-9a-f]{3}|[0-9a-f]{6})$/i);
  if (hex) {
    const h = hex[1].length === 3 ? hex[1].split('').map((c) => c + c).join('') : hex[1];
    return [parseInt(h.slice(0, 2), 16), parseInt(h.slice(2, 4), 16), parseInt(h.slice(4, 6), 16)];
  }
  const rgb = s.match(/rgba?\(([^)]+)\)/);
  if (rgb) {
    const p = rgb[1].split(/[,\s/]+/).filter(Boolean).map(Number);
    if (p.length >= 3) return [p[0], p[1], p[2]];
  }
  return null;
};

const luminance = (rgb: [number, number, number]) =>
  0.2126 * srgbToLin(rgb[0]) + 0.7152 * srgbToLin(rgb[1]) + 0.0722 * srgbToLin(rgb[2]);

const contrast = (fg: string, bg: string): number => {
  const a = parseColor(fg);
  const b = parseColor(bg);
  if (!a || !b) return 0;
  const la = luminance(a);
  const lb = luminance(b);
  const [hi, lo] = la > lb ? [la, lb] : [lb, la];
  return (hi + 0.05) / (lo + 0.05);
};

const fmt = (n: number) => n.toFixed(2).replace('.', ',');

/* ──────────────────── OKLCH — pour dériver une rampe ─────────────────────
   Ajouté le 2026-07-30 pour répondre à une question de Chloé : « on peut pas
   faire dériver notre grayscale de notre ink-900 TLS ? »

   Pourquoi OKLCH et pas HSL. En HSL, deux couleurs de même `L` n'ont pas la
   même clarté perçue — un jaune à L 50 % éclate, un bleu à L 50 % est sombre.
   Impossible d'y changer une teinte sans bouger le contraste. La clarté d'OKLCH
   est perceptuelle : on tient `L`, on tourne `h`, et **les ratios WCAG ne
   bougent pas**. C'est ce qui permet de proposer une autre rampe sans rouvrir
   un seul dossier d'accessibilité.
   ─────────────────────────────────────────────────────────────────────────── */

const linToSrgb = (v: number) => {
  const c = v <= 0.0031308 ? v * 12.92 : 1.055 * Math.pow(v, 1 / 2.4) - 0.055;
  return Math.round(Math.min(1, Math.max(0, c)) * 255);
};

/** sRGB → OKLCH, angles en degrés. */
const toOklch = (input: string): [number, number, number] | null => {
  const rgb = parseColor(input);
  if (!rgb) return null;
  const [r, g, b] = rgb.map(srgbToLin);
  const l = Math.cbrt(0.4122214708 * r + 0.5363325363 * g + 0.0514459929 * b);
  const m = Math.cbrt(0.2119034982 * r + 0.6806995451 * g + 0.1073969566 * b);
  const s = Math.cbrt(0.0883024619 * r + 0.2817188376 * g + 0.6299787005 * b);
  const L = 0.2104542553 * l + 0.793617785 * m - 0.0040720468 * s;
  const A = 1.9779984951 * l - 2.428592205 * m + 0.4505937099 * s;
  const B = 0.0259040371 * l + 0.7827717662 * m - 0.808675766 * s;
  let h = (Math.atan2(B, A) * 180) / Math.PI;
  if (h < 0) h += 360;
  return [L, Math.hypot(A, B), h];
};

/** OKLCH → hex, écrêté au gamut sRGB. */
const fromOklch = (L: number, C: number, h: number): string => {
  const rad = (h * Math.PI) / 180;
  const A = C * Math.cos(rad);
  const B = C * Math.sin(rad);
  const l = (L + 0.3963377774 * A + 0.2158037573 * B) ** 3;
  const m = (L - 0.1055613458 * A - 0.0638541728 * B) ** 3;
  const s = (L - 0.0894841775 * A - 1.291485548 * B) ** 3;
  const rgb = [
    linToSrgb(4.0767416621 * l - 3.3077115913 * m + 0.2309699292 * s),
    linToSrgb(-1.2684380046 * l + 2.6097574011 * m - 0.3413193965 * s),
    linToSrgb(-0.0041960863 * l - 0.7034186147 * m + 1.707614701 * s),
  ];
  return `#${rgb.map((v) => v.toString(16).padStart(2, '0')).join('')}`;
};

/**
 * Rejoue une couleur sur la teinte de `hueSource`, en conservant **exactement**
 * sa clarté et sa chroma. Le contraste est donc préservé au centième près.
 */
const rehue = (couleur: string, hueSource: string): string => {
  const a = toOklch(couleur);
  const b = toOklch(hueSource);
  if (!a || !b) return couleur;
  return fromOklch(a[0], a[1], b[2]);
};

/* ─────────────────────── Lecture live des tokens ────────────────────────── */

/** Lit une variable CSS sur :root. Jamais de hex recopié dans ce fichier. */
const readToken = (name: string): string => {
  if (typeof document === 'undefined') return '';
  return getComputedStyle(document.documentElement).getPropertyValue(name).trim();
};

const useLiveTokens = (names: string[]): Record<string, string> => {
  const key = names.join('|');
  return useMemo(() => {
    const out: Record<string, string> = {};
    for (const n of names) out[n] = readToken(n);
    return out;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key]);
};

/* ────────────────────────────── Primitives UI ───────────────────────────── */

const Verdict: React.FC<{ ratio: number; large?: boolean }> = ({ ratio, large = false }) => {
  const need = large ? 3 : 4.5;
  const pass = ratio >= need;
  return (
    <span
      className={[
        'inline-flex items-center gap-1 shrink-0 rounded-pill px-2 py-0.5 text-micro font-bold tabular-nums',
        pass ? 'bg-success-bg text-success-fg' : 'bg-danger-bg text-danger-fg',
      ].join(' ')}
    >
      {pass ? <Check size={14} strokeWidth={3} /> : <X size={14} strokeWidth={3} />}
      {fmt(ratio)}:1
    </span>
  );
};

const Section: React.FC<{
  id: string;
  icon: React.ReactNode;
  title: string;
  intro: string;
  children: React.ReactNode;
}> = ({ id, icon, title, intro, children }) => (
  // scroll-mt-24 : la correction que /components n'a pas — sans ça la cible
  // passe sous l'en-tête sticky au saut d'ancre.
  <section id={id} className="scroll-mt-24 flex flex-col gap-stack">
    <header className="flex flex-col gap-tight">
      <h2 className="flex items-center gap-stack-xs text-h3 font-bold tracking-headline text-ink-900">
        <span className="inline-flex items-center justify-center w-9 h-9 rounded-lg bg-primary-50 text-primary-700 shrink-0">
          {icon}
        </span>
        {title}
      </h2>
      <p className="text-body-sm text-ink-600 m-0 max-w-prose">{intro}</p>
    </header>
    {children}
  </section>
);

const Panel: React.FC<{ label: string; tone: 'current' | 'proposed'; children: React.ReactNode }> = ({
  label,
  tone,
  children,
}) => (
  <div className="flex flex-col gap-stack-xs min-w-0">
    <p
      className={[
        'text-micro font-extrabold uppercase tracking-[0.07em] m-0',
        tone === 'current' ? 'text-danger-fg' : 'text-success-fg',
      ].join(' ')}
    >
      {label}
    </p>
    <div className="rounded-xl border border-ink-200 bg-white p-4">{children}</div>
  </div>
);

/* ──────────────────────────── 1. Typographie ────────────────────────────── */

type ScaleRow = { token: string; px: number; uses: number };

/** Usages comptés par grep sur src/ le 2026-07-23 — chiffre de cadrage, pas un token. */
const CURRENT_SCALE: ScaleRow[] = [
  { token: 'micro', px: 11, uses: 297 },
  { token: 'caption', px: 13, uses: 1314 },
  { token: 'body-sm', px: 15, uses: 864 },
  { token: 'body', px: 16, uses: 1267 },
  { token: 'h5', px: 16, uses: 27 },
  { token: 'body-lg', px: 18, uses: 137 },
  { token: 'h4', px: 18, uses: 166 },
  { token: 'h3', px: 22, uses: 145 },
  { token: 'h2', px: 28, uses: 88 },
  { token: 'h1', px: 36, uses: 35 },
];

const PROPOSED_SCALE: ScaleRow[] = [
  { token: 'micro', px: 11, uses: 297 },
  { token: 'caption', px: 13, uses: 1314 },
  { token: 'body', px: 16, uses: 1267 + 864 },
  { token: 'body-lg', px: 18, uses: 137 },
  { token: 'h4', px: 18, uses: 166 },
  { token: 'h3', px: 22, uses: 145 },
  { token: 'h2', px: 28, uses: 88 },
  { token: 'h1', px: 36, uses: 35 },
];

const SPECIMEN = 'Reprends ta pratique';
const PRODUCT_FLOOR = 1.125;

const ScaleTable: React.FC<{ rows: ScaleRow[] }> = ({ rows }) => (
  <ul className="flex flex-col m-0 p-0 list-none">
    {rows.map((r, i) => {
      const prev = i > 0 ? rows[i - 1].px : null;
      const ratio = prev ? r.px / prev : null;
      const tight = ratio !== null && ratio < PRODUCT_FLOOR;
      return (
        <li
          key={r.token}
          className="flex items-baseline gap-stack-xs py-1.5 border-b border-ink-100 last:border-b-0"
        >
          <span
            className="flex-1 min-w-0 truncate font-body font-semibold text-ink-900 leading-tight"
            style={{ fontSize: `${r.px}px` }}
          >
            {SPECIMEN}
          </span>
          <span className="shrink-0 text-micro text-ink-500 tabular-nums whitespace-nowrap">
            {r.token} · {r.px}px · {r.uses}
          </span>
          <span
            className={[
              'shrink-0 w-12 text-right text-micro font-bold tabular-nums',
              ratio === null ? 'text-ink-300' : tight ? 'text-danger-fg' : 'text-success-fg',
            ].join(' ')}
          >
            {ratio ? `×${ratio.toFixed(2).replace('.', ',')}` : '—'}
          </span>
        </li>
      );
    })}
  </ul>
);

/* ────────────────────────────── 1 bis. Graisses ─────────────────────────── */

/**
 * Divergences mesurées par grep sur src/ le 2026-07-23.
 * `token` = ce que déclare `--text-h*--font-weight` dans index.css.
 * `usage` = ce que le code fait réellement, en part des sites de ce rôle.
 */
type WeightRow = { role: string; token: number | null; usage: { w: number; pct: number }[] };

const WEIGHT_DIVERGENCE: WeightRow[] = [
  { role: '<h1>', token: 700, usage: [{ w: 800, pct: 59 }, { w: 700, pct: 35 }] },
  { role: '<h2>', token: 700, usage: [{ w: 800, pct: 42 }, { w: 700, pct: 39 }, { w: 600, pct: 10 }] },
  { role: 'text-h2', token: 700, usage: [{ w: 700, pct: 64 }, { w: 800, pct: 27 }] },
  { role: 'text-h3', token: 600, usage: [{ w: 700, pct: 70 }, { w: 800, pct: 17 }, { w: 600, pct: 8 }] },
  { role: 'text-h4', token: 600, usage: [{ w: 700, pct: 60 }, { w: 600, pct: 25 }, { w: 800, pct: 9 }] },
  { role: 'text-caption', token: null, usage: [{ w: 700, pct: 21 }, { w: 600, pct: 19 }, { w: 500, pct: 6 }] },
];

/** Les 5 graisses réellement utilisées à l'échelle, adossées à un rôle nommé. */
const WEIGHT_ROLES = [
  { name: 'display', w: 800, uses: 219, forWhat: 'héros marketing uniquement' },
  { name: 'title', w: 700, uses: 917, forWhat: 'titres de page et de section' },
  { name: 'emphasis', w: 600, uses: 774, forWhat: 'sous-titres, libellés, boutons' },
  { name: 'meta', w: 500, uses: 168, forWhat: 'métadonnées, légendes appuyées' },
  { name: 'body', w: 400, uses: 20, forWhat: 'texte courant' },
];

const WeightSpecimen: React.FC<{ px: number; weights: number[]; label: string }> = ({ px, weights, label }) => (
  <div className="flex flex-col gap-tight">
    <p className="text-micro text-ink-500 m-0">{label}</p>
    <div className="flex flex-wrap items-baseline gap-stack">
      {weights.map((w) => (
        <span key={w} className="flex flex-col gap-0.5">
          <span className="font-body text-ink-900 leading-tight" style={{ fontSize: `${px}px`, fontWeight: w }}>
            Reprends ta pratique
          </span>
          <span className="text-micro text-ink-400 tabular-nums">{w}</span>
        </span>
      ))}
    </div>
  </div>
);

/* ─────────────── 1 quater. Taille optique & seuil grand texte ───────────── */

/** Hauteurs d'x mesurées au canvas à 100px : Spartan 41 · Nunito 49,3. */
const XH = { spartan: 0.41, nunito: 0.493 };
const spartanToNunito = (px: number) => (px * XH.spartan) / XH.nunito;
/** Seuil WCAG « grand texte » : 18,66px en ≥700, sinon 24px. */
const WCAG_BOLD_PX = 18.66;

/**
 * Spécimen posé sur une ligne de base commune, avec un repère tracé à la
 * hauteur d'x de la référence. L'écart se voit au lieu de se calculer.
 */
/**
 * Spécimens posés sur une ligne de base commune (`align-items: baseline`) et
 * adjacents : l'œil compare directement les hauteurs.
 *
 * J'avais d'abord tracé un repère à la hauteur d'x. Retiré : le bas du
 * conteneur n'est pas la ligne de base (les jambages descendent en dessous),
 * donc le trait tombait à côté et embrouillait au lieu d'aider. Le mot témoin
 * n'a volontairement pas de jambage, pour que la comparaison soit franche.
 */
const XHeightSpecimen: React.FC<{
  items: { font: 'display' | 'body'; px: number; label: string; muted?: boolean }[];
}> = ({ items }) => (
  <div className="flex items-baseline gap-stack-lg flex-wrap border-b border-ink-200 pb-1">
    {items.map((it, i) => (
      <span key={i} className="inline-flex flex-col">
        <span
          className={it.muted ? 'text-ink-300' : 'text-ink-900'}
          style={{
            fontFamily: it.font === 'display' ? "'League Spartan', sans-serif" : "'Nunito', sans-serif",
            fontSize: `${it.px}px`,
            fontWeight: 700,
            lineHeight: 1.05,
          }}
        >
          Maîtrise
        </span>
      </span>
    ))}
  </div>
);

const SpecimenLegend: React.FC<{ items: { label: string; muted?: boolean }[] }> = ({ items }) => (
  <div className="flex gap-stack-lg flex-wrap mt-stack-xs">
    {items.map((it, i) => (
      <span key={i} className={['text-micro whitespace-nowrap', it.muted ? 'text-ink-400' : 'text-ink-700'].join(' ')}>
        {it.label}
      </span>
    ))}
  </div>
);

/* ────────────────────────────── 2. Rayons ───────────────────────────────── */

const RADIUS_TOKENS = ['--radius-lg', '--radius-xl', '--radius-2xl', '--radius-3xl'] as const;

const MiniCard: React.FC<{ radius: string }> = ({ radius }) => (
  <div
    className="border border-ink-200 bg-white p-3 shadow-card flex flex-col gap-stack-xs"
    style={{ borderRadius: radius }}
  >
    <span className="inline-flex items-center gap-1 self-start rounded-pill bg-secondary-50 px-2 py-0.5 text-micro font-bold uppercase tracking-[0.06em] text-secondary-700">
      En cours
    </span>
    <p className="text-body-sm font-bold text-ink-900 m-0">Devenir prompt designer</p>
    <p className="text-caption text-ink-500 m-0">Étape 2 sur 5</p>
  </div>
);

/* ─────────────────── 1 ter. Les deux fontes, mesurées ───────────────────── */

/**
 * Métriques relevées au canvas le 2026-07-23 (à 100px, police chargée).
 * Elles ne sont pas décoratives : ce sont elles qui dictent les combos.
 */
const FONT_METRICS = [
  { label: 'Hauteur d’x',        ls: 41,   nu: 49.3, unit: '', note: 'ratio 0,832 — hors de la bande idéale 0,9–1,1' },
  { label: 'Hauteur de capitale', ls: 66,   nu: 71.2, unit: '', note: 'ratio 0,927 — proche' },
  { label: 'x / capitale',        ls: 62,   nu: 69,   unit: ' %', note: 'Nunito dans la zone corps 65–75 % · League Spartan en zone display' },
  { label: 'Largeur d’alphabet',  ls: 1192, nu: 1315, unit: '', note: 'League Spartan 9 % plus étroite' },
  { label: 'Ascendante + descendante', ls: 92, nu: 136, unit: '', note: 'Nunito occupe plus de hauteur de ligne à taille égale' },
];

/** Couverture d'encre mesurée, base Nunito 700 = 1,000. */
const INK = [
  { w: 400, ls: 0.679, nu: 0.725 },
  { w: 600, ls: 0.885, nu: 0.84 },
  { w: 700, ls: 1.017, nu: 1.0 },
  { w: 800, ls: 1.125, nu: 1.145 },
];

/** Le système de rôles qui découle des mesures. */
interface TypeRole {
  role: string;
  font: 'display' | 'body';
  px: number;
  weight: number;
  tracking: string;
  leading: number;
  usage: string;
}

const TYPE_ROLES: TypeRole[] = [
  { role: 'Display',        font: 'display', px: 48, weight: 800, tracking: '-0.03em',  leading: 1.05, usage: 'héros marketing, jamais dans l’app' },
  { role: 'Titre de page',  font: 'display', px: 36, weight: 700, tracking: '-0.03em',  leading: 1.2,  usage: 'h1' },
  { role: 'Titre section',  font: 'display', px: 28, weight: 700, tracking: '-0.025em', leading: 1.25, usage: 'h2' },
  { role: 'Titre bloc',     font: 'display', px: 22, weight: 700, tracking: '-0.025em', leading: 1.35, usage: 'h3' },
  { role: 'Titre de card',  font: 'display', px: 18, weight: 600, tracking: '-0.02em',  leading: 1.4,  usage: 'h4 — le changement clé' },
  { role: 'Eyebrow',        font: 'body',    px: 11, weight: 700, tracking: '0.06em',   leading: 1.45, usage: 'statuts, sur-titres — Nunito, pas Spartan' },
  { role: 'Corps',          font: 'body',    px: 16, weight: 400, tracking: '0',        leading: 1.55, usage: 'texte courant' },
  { role: 'Méta',           font: 'body',    px: 13, weight: 400, tracking: '0',        leading: 1.5,  usage: 'légendes, métadonnées' },
  { role: 'Micro',          font: 'body',    px: 11, weight: 600, tracking: '0.04em',   leading: 1.45, usage: 'badges, compteurs' },
  { role: 'Bouton',         font: 'body',    px: 15, weight: 600, tracking: '0',        leading: 1,    usage: 'libellés d’action' },
];

const FAM = {
  display: "'League Spartan', sans-serif",
  body: "'Nunito', sans-serif",
} as const;

const RoleSpecimen: React.FC<{ r: TypeRole }> = ({ r }) => (
  <li className="flex flex-col gap-0.5 py-2.5 border-b border-ink-100 last:border-b-0 min-w-0">
    <span
      className="text-ink-900 truncate"
      style={{
        fontFamily: FAM[r.font],
        fontSize: `${r.px}px`,
        fontWeight: r.weight,
        letterSpacing: r.tracking,
        lineHeight: r.leading,
      }}
    >
      Reprends ta pratique
    </span>
    <span className="text-micro text-ink-500 tabular-nums">
      <strong className="font-bold text-ink-700">{r.role}</strong>
      {' · '}{r.font === 'display' ? 'League Spartan' : 'Nunito'}
      {' '}{r.px}/{r.weight}
      {r.tracking !== '0' && ` · ${r.tracking}`}
      {' · interligne '}{r.leading}
      <span className="text-ink-400"> — {r.usage}</span>
    </span>
  </li>
);

/* ──────────────────── 2 bis. Composition de card ────────────────────────── */

/**
 * Anatomie d'une card, rendue avec des valeurs paramétrables pour comparer une
 * composition à l'autre. Les 4 rôles de texte d'une card TLS : eyebrow (statut),
 * titre, méta, action. C'est là que se joue la hiérarchie — et aujourd'hui elle
 * repose presque entièrement sur la graisse, faute d'écart de taille.
 */
type CardComposition = {
  label: string;
  note: string;
  radius: number;
  eyebrow: { px: number; w: number };
  title: { px: number; w: number; font: 'display' | 'body' };
  meta: { px: number; w: number };
  gap: number;
};

const DemoCard: React.FC<{ c: CardComposition; greyMeta: string }> = ({ c, greyMeta }) => (
  <div
    className="border border-ink-200 bg-white shadow-card flex flex-col p-4"
    style={{ borderRadius: `${c.radius}px`, gap: `${c.gap}px` }}
  >
    <span
      className="inline-flex items-center self-start rounded-pill bg-secondary-50 px-2 py-0.5 uppercase tracking-[0.06em] text-secondary-700"
      style={{ fontSize: `${c.eyebrow.px}px`, fontWeight: c.eyebrow.w }}
    >
      En cours
    </span>
    <p
      className="text-ink-900 m-0"
      style={{
        fontFamily: c.title.font === 'display' ? "'League Spartan', sans-serif" : "'Nunito', sans-serif",
        fontSize: `${c.title.px}px`,
        fontWeight: c.title.w,
        letterSpacing: c.title.font === 'display' ? '-0.02em' : '0',
        lineHeight: 1.3,
      }}
    >
      Devenir prompt designer
    </p>
    <p className="m-0 leading-snug" style={{ fontSize: `${c.meta.px}px`, fontWeight: c.meta.w, color: greyMeta }}>
      Étape 2 sur 5 · 3 h restantes
    </p>
    <span
      className="inline-flex items-center justify-center self-start rounded-pill bg-primary-700 px-4 text-white"
      style={{ fontSize: `${c.meta.px}px`, fontWeight: 600, height: 44 }}
    >
      Reprendre
    </span>
  </div>
);

const COMPOSITIONS: CardComposition[] = [
  {
    label: 'A · Actuelle',
    note: 'Nunito 15/700 · méta 13/400 — 2 px d’écart, la graisse fait tout',
    radius: 24,
    eyebrow: { px: 11, w: 700 },
    title: { px: 15, w: 700, font: 'body' },
    meta: { px: 13, w: 400 },
    gap: 8,
  },
  {
    label: 'B · Écart de taille rétabli',
    note: 'Nunito 18/700 · méta 13/400 — ×1,38, la taille porte la hiérarchie',
    radius: 20,
    eyebrow: { px: 11, w: 700 },
    title: { px: 18, w: 700, font: 'body' },
    meta: { px: 13, w: 400 },
    gap: 10,
  },
  {
    label: 'C · Proposition — Spartan sur le titre',
    note: 'League Spartan 18/600 · méta Nunito 13/400 — contraste de fonte ET de taille, graisse relâchée',
    radius: 20,
    eyebrow: { px: 11, w: 700 },
    title: { px: 18, w: 600, font: 'display' },
    meta: { px: 13, w: 400 },
    gap: 10,
  },
];


/* ─────────── 3 ter. Correction des 3 variants majoritaires ──────────────── */

type BtnState = { s: string; bg: string; tx: string; bd: string; focus?: boolean; off?: boolean };

const CP = { 50:'#e8f4f7',100:'#dcebef',200:'#b9d7df',300:'#96c3cf',500:'#55a1b4',600:'#4a8fa1',700:'#3d7786',800:'#2f5f6a',900:'#1f3e45' };
const CS = { 50:'#fff3eb',100:'#fddcc7',200:'#fcbb93',300:'#f59a5f',500:'#ed843a',600:'#c06920',700:'#8f5017',800:'#5e3710',900:'#3b2109' };
const OFF: BtnState = { s:'désactivé', bg:'#f9fafb', tx:'#9ca3af', bd:'#e5e7eb', off:true };

/** Fond teinté + bordure franche : les 5 états d'une même famille. */
const tinted = (C: Record<number,string>): BtnState[] => ([
  { s:'repos',  bg:C[100], tx:C[800], bd:C[600] },
  { s:'survol', bg:C[200], tx:C[900], bd:C[700] },
  { s:'actif',  bg:C[300], tx:C[900], bd:C[800] },
  { s:'focus',  bg:C[100], tx:C[800], bd:C[600], focus:true },
  OFF,
]);

/** Rempli profond : le cran 900 porte du blanc très largement. */
const deep = (C: Record<number,string>): BtnState[] => ([
  { s:'repos',  bg:C[900], tx:'#ffffff', bd:C[900] },
  { s:'survol', bg:C[800], tx:'#ffffff', bd:C[800] },
  { s:'actif',  bg:C[900], tx:'#ffffff', bd:C[900] },
  { s:'focus',  bg:C[900], tx:'#ffffff', bd:C[900], focus:true },
  { ...OFF, bg:'#e5e7eb', bd:'#e5e7eb' },
]);

const FIX_GROUPS: {
  name: string; uses: number; note: string;
  candidates: { label: string; current?: boolean; states: BtnState[] }[];
}[] = [
  {
    name: 'ghost', uses: 177, note: 'le plus utilisé du DS, et le contour le plus faible',
    candidates: [
      { label: 'Actuel — bordure primary-100', current: true, states: [
        { s:'repos',  bg:CP[50],  tx:CP[800], bd:CP[100] },
        { s:'survol', bg:CP[100], tx:CP[800], bd:CP[200] },
        { s:'actif',  bg:CP[200], tx:CP[900], bd:CP[200] },
        { s:'focus',  bg:CP[50],  tx:CP[800], bd:CP[100], focus:true },
        OFF,
      ]},
      { label: 'Corrigé — bordure primary-600 (seul changement)', states: [
        { s:'repos',  bg:CP[50],  tx:CP[800], bd:CP[600] },
        { s:'survol', bg:CP[100], tx:CP[800], bd:CP[700] },
        { s:'actif',  bg:CP[200], tx:CP[900], bd:CP[800] },
        { s:'focus',  bg:CP[50],  tx:CP[800], bd:CP[600], focus:true },
        OFF,
      ]},
    ],
  },
  {
    name: 'primary', uses: 125, note: 'texte à 3,66 aujourd’hui — deux sorties possibles',
    candidates: [
      { label: 'Actuel — fond primary-600, label blanc', current: true, states: [
        { s:'repos',  bg:CP[600], tx:'#ffffff', bd:CP[600] },
        { s:'survol', bg:CP[500], tx:'#ffffff', bd:CP[500] },
        { s:'actif',  bg:CP[800], tx:'#ffffff', bd:CP[800] },
        { s:'focus',  bg:CP[600], tx:'#ffffff', bd:CP[600], focus:true },
        { ...OFF, bg:'#e5e7eb', bd:'#e5e7eb' },
      ]},
      { label: 'A — rempli profond (primary-900, pétrole)', states: deep(CP) },
      { label: 'B — teinté clair + bordure franche', states: tinted(CP) },
    ],
  },
  {
    name: 'secondary', uses: 67, note: 'texte à 2,64 — le plus bas de tout le DS',
    candidates: [
      { label: 'Actuel — fond secondary-500, label blanc', current: true, states: [
        { s:'repos',  bg:CS[500], tx:'#ffffff', bd:CS[500] },
        { s:'survol', bg:'#f18a4c', tx:'#ffffff', bd:'#f18a4c' },
        { s:'actif',  bg:CS[700], tx:'#ffffff', bd:CS[700] },
        { s:'focus',  bg:CS[500], tx:'#ffffff', bd:CS[500], focus:true },
        { ...OFF, bg:'#e5e7eb', bd:'#e5e7eb' },
      ]},
      { label: 'A — rempli profond (secondary-900, brun foncé)', states: deep(CS) },
      { label: 'B — teinté clair + bordure franche', states: tinted(CS) },
    ],
  },
];

/* ───────────────── 3 bis. Audit des 14 variants de Button ───────────────── */

type BtnVariant =
  | 'primary' | 'secondary' | 'accent' | 'ghost' | 'outline' | 'outline-warm'
  | 'destructive' | 'glass' | 'glass-light' | 'glass-light-ghost'
  | 'glass-warm' | 'glass-sun' | 'link';

/**
 * Usages comptés par grep sur src/ le 2026-07-23, APRÈS l'élagage :
 * `glass-brand` retiré (doublon de ghost), et les alias `warm`/`brand-ghost`
 * migrés vers secondary/ghost. 13 variants restants.
 */
const BTN_INVENTORY: { v: BtnVariant; uses: number; surface: 'blanc' | 'teinté' | 'sombre' }[] = [
  { v: 'ghost', uses: 188, surface: 'blanc' },
  { v: 'primary', uses: 125, surface: 'blanc' },
  { v: 'secondary', uses: 99, surface: 'blanc' },
  { v: 'glass', uses: 61, surface: 'sombre' },
  { v: 'link', uses: 9, surface: 'blanc' },
  { v: 'glass-light', uses: 7, surface: 'teinté' },
  { v: 'accent', uses: 6, surface: 'blanc' },
  { v: 'outline', uses: 6, surface: 'blanc' },
  { v: 'glass-warm', uses: 4, surface: 'blanc' },
  { v: 'destructive', uses: 4, surface: 'blanc' },
  { v: 'glass-light-ghost', uses: 3, surface: 'teinté' },
  { v: 'glass-sun', uses: 1, surface: 'blanc' },
  { v: 'outline-warm', uses: 1, surface: 'blanc' },
];

const SURFACE_BG: Record<'blanc' | 'teinté' | 'sombre', string> = {
  blanc: 'bg-white',
  teinté: 'bg-primary-50',
  sombre: 'bg-primary-800',
};

/**
 * Mesure au rendu réel : on lit la couleur calculée du <button> et de son
 * label, puis on remonte au fond effectif. Aucune valeur n'est supposée.
 */
/**
 * Aplatit une couleur CSS quelconque sur un fond connu, en la peignant sur un
 * canvas 1×1 et en relisant le pixel.
 *
 * Pourquoi pas une analyse de chaîne : Tailwind v4 émet `oklab(… / 0.2)` pour
 * `bg-white/20`. Un analyseur qui ne connaît que hex et rgb() renvoie null,
 * la sonde retombe silencieusement sur la couleur de page, et publie un ratio
 * faussement excellent (7,08 au lieu de 4,3 sur le variant `glass`). Le canvas
 * résout tous les formats, y compris ceux qui n'existent pas encore.
 */
const flattenOn = (color: string, under: string): string => {
  const c = document.createElement('canvas');
  c.width = 1;
  c.height = 1;
  const x = c.getContext('2d');
  if (!x) return under;
  x.fillStyle = under;
  x.fillRect(0, 0, 1, 1);
  x.fillStyle = color;
  x.fillRect(0, 0, 1, 1);
  const d = x.getImageData(0, 0, 1, 1).data;
  return `rgb(${d[0]},${d[1]},${d[2]})`;
};

const useRenderedContrast = (ref: React.RefObject<HTMLElement | null>, pageBg: string, tick: number) => {
  const [r, setR] = useState<{ text: number; edge: number } | null>(null);
  useEffect(() => {
    const el = ref.current?.querySelector('button, a');
    if (!el) return;
    const cs = getComputedStyle(el);
    const fill = flattenOn(cs.backgroundColor, pageBg);
    const text = contrast(flattenOn(cs.color, fill), fill);
    const borderVisible = parseFloat(cs.borderTopWidth) > 0;
    const edge = borderVisible
      ? contrast(flattenOn(cs.borderTopColor, pageBg), pageBg)
      : contrast(fill, pageBg);
    setR({ text, edge });
  }, [ref, pageBg, tick]);
  return r;
};

const VariantRow: React.FC<{ v: BtnVariant; uses: number; surface: 'blanc' | 'teinté' | 'sombre'; tick: number }> = ({
  v, uses, surface, tick,
}) => {
  const ref = React.useRef<HTMLDivElement>(null);
  const pageBg = surface === 'blanc' ? 'rgb(255,255,255)' : surface === 'teinté' ? 'rgb(232,244,247)' : 'rgb(47,95,106)';
  const m = useRenderedContrast(ref, pageBg, tick);
  const textOk = m ? m.text >= 4.5 : null;
  const edgeOk = m ? m.edge >= 3 : null;
  return (
    <div className="grid grid-cols-[minmax(0,1fr)_auto] sm:grid-cols-[150px_minmax(0,1fr)_64px_64px] items-center gap-stack-xs py-2 border-b border-ink-100 last:border-b-0">
      <div className="min-w-0">
        <code className="text-caption text-ink-900">{v}</code>
        <span className="text-micro text-ink-400 tabular-nums"> · {uses}</span>
      </div>
      <div ref={ref} className={['rounded-lg px-3 py-2 inline-flex', SURFACE_BG[surface]].join(' ')}>
        <Button variant={v} size="md">Reprendre</Button>
      </div>
      <div className="text-right">
        <span className={['text-micro font-bold tabular-nums', textOk ? 'text-success-fg' : 'text-danger-fg'].join(' ')}>
          {m ? fmt(m.text) : '…'}
        </span>
        <span className="block text-micro text-ink-400">texte</span>
      </div>
      <div className="text-right">
        <span className={['text-micro font-bold tabular-nums', edgeOk ? 'text-success-fg' : 'text-danger-fg'].join(' ')}>
          {m ? fmt(m.edge) : '…'}
        </span>
        <span className="block text-micro text-ink-400">contour</span>
      </div>
    </div>
  );
};

/* ─────────────────── 2 ter. Inventaire des variants Card ────────────────── */

type CardVar = 'default' | 'feature' | 'elevated' | 'interactive' | 'glass'
  | 'glass-brand' | 'glass-warm' | 'glass-dark' | 'minimal' | 'tinted';

/**
 * Usages scopés au composant Card. Après tri du 2026-07-24 :
 * bordered/muted/sunken retirés (0 usage), glass-dark tokenisé. 10 variants.
 */
const CARD_INVENTORY: { v: CardVar; uses: number; surface: 'blanc' | 'sombre'; note?: string }[] = [
  { v: 'tinted', uses: 41, surface: 'blanc', note: 'exige un tone' },
  { v: 'default', uses: 29, surface: 'blanc' },
  { v: 'feature', uses: 8, surface: 'blanc' },
  { v: 'interactive', uses: 4, surface: 'blanc' },
  { v: 'minimal', uses: 1, surface: 'blanc', note: 'usage unique' },
  { v: 'glass', uses: 1, surface: 'blanc', note: 'usage unique' },
  { v: 'glass-brand', uses: 1, surface: 'blanc', note: 'usage unique' },
  { v: 'glass-dark', uses: 1, surface: 'sombre', note: 'tokenisé ✓ · usage unique' },
  { v: 'elevated', uses: 1, surface: 'blanc', note: 'usage unique' },
  { v: 'glass-warm', uses: 0, surface: 'blanc', note: '0 côté Card' },
];

const CardVariantRow: React.FC<{ v: CardVar; uses: number; surface: 'blanc' | 'sombre'; note?: string; tick: number }> = ({
  v, uses, surface, note, tick,
}) => {
  const ref = React.useRef<HTMLDivElement>(null);
  const pageBg = surface === 'blanc' ? 'rgb(255,255,255)' : 'rgb(31,62,69)';
  const [m, setM] = useState<{ text: number; edge: number } | null>(null);
  useEffect(() => {
    // La Card (div rendu) est le premier enfant du wrapper coloré `ref`.
    const el = ref.current?.firstElementChild as HTMLElement | null;
    if (!el) return;
    const cs = getComputedStyle(el);
    const title = ref.current?.querySelector('[data-card-title]');
    const titleColor = title ? getComputedStyle(title).color : cs.color;
    const fill = flattenOn(cs.backgroundColor, pageBg);
    const text = contrast(flattenOn(titleColor, fill), fill);
    const hasBorder = parseFloat(cs.borderTopWidth) > 0;
    const edge = hasBorder ? contrast(flattenOn(cs.borderTopColor, pageBg), pageBg) : 0;
    setM({ text, edge });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tick]);
  const unused = uses === 0;
  return (
    <div className="grid grid-cols-[minmax(0,1fr)_auto] sm:grid-cols-[140px_minmax(0,1fr)_60px_60px] items-center gap-stack-xs py-2 border-b border-ink-100 last:border-b-0">
      <div className="min-w-0">
        <code className={['text-caption', unused ? 'text-ink-400 line-through' : 'text-ink-900'].join(' ')}>{v}</code>
        <span className="text-micro text-ink-400 tabular-nums"> · {uses}</span>
        {note && <span className="block text-micro text-danger-fg">{note}</span>}
      </div>
      <div ref={ref} className={['rounded-lg p-2 inline-flex', surface === 'blanc' ? 'bg-white' : 'bg-primary-900'].join(' ')}>
        <Card variant={v} tone={v === 'tinted' ? 'primary' : undefined} size="sm" className="w-40">
          <span data-card-title className={v === 'glass-dark' ? 'text-white font-bold text-body-sm' : 'text-ink-900 font-bold text-body-sm'}>
            Titre de card
          </span>
          <span className={v === 'glass-dark' ? 'text-white/80 text-caption' : 'text-ink-500 text-caption'}>Étape 2 sur 5</span>
        </Card>
      </div>
      <div className="text-right">
        <span className={['text-micro font-bold tabular-nums', m && m.text >= 4.5 ? 'text-success-fg' : 'text-danger-fg'].join(' ')}>
          {m ? fmt(m.text) : '…'}
        </span>
        <span className="block text-micro text-ink-400">titre</span>
      </div>
      <div className="text-right">
        <span className={['text-micro font-bold tabular-nums', !m ? 'text-ink-400' : m.edge === 0 ? 'text-ink-400' : m.edge >= 3 ? 'text-success-fg' : 'text-danger-fg'].join(' ')}>
          {m ? (m.edge === 0 ? '—' : fmt(m.edge)) : '…'}
        </span>
        <span className="block text-micro text-ink-400">bordure</span>
      </div>
    </div>
  );
};

/* ────────────────────────────── 3. Boutons ──────────────────────────────── */

type BtnCase = {
  role: string;
  /** tokens lus en direct — aucun hex ici */
  restVar: string;
  hoverVar: string;
  label: 'blanc' | 'ink-900';
};

const BUTTON_OPTIONS: Record<string, BtnCase[]> = {
  'A · Actuel': [
    { role: 'primary', restVar: '--color-primary-600', hoverVar: '--color-primary-500', label: 'blanc' },
    { role: 'secondary', restVar: '--color-secondary-500', hoverVar: '--color-secondary-400', label: 'blanc' },
    { role: 'accent', restVar: '--color-accent-500', hoverVar: '--color-accent-400', label: 'blanc' },
  ],
  'B · Fills foncés': [
    { role: 'primary', restVar: '--color-primary-700', hoverVar: '--color-primary-800', label: 'blanc' },
    { role: 'secondary', restVar: '--color-secondary-700', hoverVar: '--color-secondary-800', label: 'blanc' },
    { role: 'accent', restVar: '--color-accent-700', hoverVar: '--color-accent-800', label: 'blanc' },
  ],
  'C · Label ink-900': [
    { role: 'primary', restVar: '--color-primary-600', hoverVar: '--color-primary-500', label: 'ink-900' },
    { role: 'secondary', restVar: '--color-secondary-500', hoverVar: '--color-secondary-400', label: 'ink-900' },
    { role: 'accent', restVar: '--color-accent-500', hoverVar: '--color-accent-400', label: 'ink-900' },
  ],
  // D — corrigé le 2026-07-23 après mesure. Le sens du survol dépend de la
  // couleur du label : avec un label BLANC il faut assombrir, avec un label
  // SOMBRE il faut éclaircir (sinon le fond se rapproche du texte). Les
  // variantes chaudes éclaircissent DÉJÀ au survol — pour elles, seule la
  // couleur du label change, le fill et le survol restent tels quels.
  'D · Hybride (corrigé)': [
    { role: 'primary', restVar: '--color-primary-700', hoverVar: '--color-primary-800', label: 'blanc' },
    { role: 'secondary', restVar: '--color-secondary-500', hoverVar: '--color-secondary-400', label: 'ink-900' },
    { role: 'accent', restVar: '--color-accent-500', hoverVar: '--color-accent-400', label: 'ink-900' },
  ],
};

const FakeButton: React.FC<{ bg: string; fg: string; children: React.ReactNode }> = ({ bg, fg, children }) => (
  <span
    className="inline-flex items-center justify-center h-11 px-5 rounded-pill font-body font-semibold text-body-sm shrink-0"
    style={{ backgroundColor: bg, color: fg }}
  >
    {children}
  </span>
);

/* ───────────────────────── 4. Gris de texte ─────────────────────────────── */

/**
 * Le seuil de contraste dépend de la TAILLE et de la GRAISSE, pas seulement de
 * la couleur. WCAG « grand texte » (seuil 3,0 au lieu de 4,5) = ≥ 24 px, OU
 * ≥ 18,66 px ET graisse ≥ 700. Donc l'encre autorisée change selon le rôle typo.
 */
const isLargeText = (px: number, weight: number) => px >= 24 || (px >= 18.66 && weight >= 700);

/** Rampe d'encre testée, de la plus claire à la plus foncée. */
const INK_RAMP = ['300', '400', '500', '600', '700', '900'];

const TEXT_GREYS = ['--color-ink-400', '--color-ink-500', '--color-ink-600'] as const;
const SURFACES = [
  { name: 'blanc', varName: '--color-white' },
  { name: 'ink-25 (fond de page)', varName: '--tls-ink-25' },
  { name: 'ink-100 (surface grise)', varName: '--color-ink-100' },
] as const;

/* ────────────────────────── Atelier — bac à sable ───────────────────────── */

/**
 * Seuil « grand texte » CONSCIENT DE LA FONTE.
 * WCAG : ≥ 24px, ou ≥ 18,66px en ≥ 700. Mais la norme prévoit sa réserve pour
 * les polices « inhabituellement fines » — League Spartan (hauteur d'x à 83 %
 * de Nunito) en fait partie : ses seuils optiques montent à 28,9 / 22,4px.
 */
const isLargeForFont = (px: number, weight: number, font: 'display' | 'body') => {
  const [plain, bold] = font === 'display' ? [28.9, 22.4] : [24, 18.66];
  return px >= plain || (px >= bold && weight >= 700);
};

/** Rôles typo proposés en preset — réutilise le système de la section Fontes. */
const ATELIER_ROLES: { name: string; font: 'display' | 'body'; px: number; weight: number; tracking: string }[] = [
  { name: 'Titre page', font: 'display', px: 36, weight: 700, tracking: '-0.03em' },
  { name: 'Titre section', font: 'display', px: 28, weight: 700, tracking: '-0.025em' },
  { name: 'Titre bloc', font: 'display', px: 24, weight: 700, tracking: '-0.025em' },
  { name: 'Titre card', font: 'display', px: 18, weight: 600, tracking: '-0.02em' },
  { name: 'Corps', font: 'body', px: 16, weight: 400, tracking: '0' },
  { name: 'Méta', font: 'body', px: 13, weight: 400, tracking: '0' },
  { name: 'Bouton', font: 'body', px: 15, weight: 600, tracking: '0' },
];

const ATELIER_FONT: Record<'display' | 'body', string> = {
  display: "'League Spartan', sans-serif",
  body: "'Nunito', sans-serif",
};

/** Familles de tokens proposées à la sélection. Valeurs lues à l'exécution. */
const SWATCH_FAMILIES: { label: string; steps: string[]; prefix: string }[] = [
  { label: 'ink', prefix: '--color-ink-', steps: ['0', '25', '50', '100', '200', '300', '400', '500', '600', '700', '800', '900'] },
  { label: 'primary', prefix: '--color-primary-', steps: ['50', '100', '200', '300', '400', '500', '600', '700', '800', '900'] },
  { label: 'secondary', prefix: '--color-secondary-', steps: ['50', '100', '200', '300', '400', '500', '600', '700', '800', '900'] },
  { label: 'accent', prefix: '--color-accent-', steps: ['50', '100', '200', '300', '400', '500', '600', '700', '800', '900'] },
];

/** Un token = { css, hex résolu }. `transparent` traité à part. */
type Swatch = { token: string; css: string };

const SURFACE_OPTIONS = [
  { label: 'blanc', css: '--color-white' },
  { label: 'ink-25', css: '--tls-ink-25' },
  { label: 'primary-50', css: '--color-primary-50' },
  { label: 'primary-900', css: '--color-primary-900' },
];

type AtelierState = 'repos' | 'survol' | 'actif';

interface StateSpec {
  fill: string;    // token css ou 'transparent'
  text: string;
  border: string;  // token css ou 'none'
  width: number;   // px
}

const SwatchPicker: React.FC<{
  label: string;
  value: string;
  allowNone?: 'transparent' | 'none';
  onPick: (token: string) => void;
  resolve: (token: string) => string;
}> = ({ label, value, allowNone, onPick, resolve }) => (
  <div className="flex flex-col gap-1">
    <span className="text-micro font-bold uppercase tracking-[0.06em] text-ink-500">{label}</span>
    <div className="flex flex-wrap gap-1 items-center">
      {allowNone && (
        <button
          type="button"
          onClick={() => onPick(allowNone)}
          aria-pressed={value === allowNone}
          title={allowNone}
          className={[
            'w-6 h-6 rounded-sm border grid place-items-center text-micro text-ink-500 shrink-0',
            value === allowNone ? 'border-primary-600 ring-1 ring-primary-600' : 'border-ink-200',
          ].join(' ')}
        >
          ∅
        </button>
      )}
      {SWATCH_FAMILIES.map((fam) => (
        <div key={fam.label} className="flex gap-0.5">
          {fam.steps.map((s) => {
            const token = `${fam.prefix}${s}`;
            const on = value === token;
            return (
              <button
                key={token}
                type="button"
                onClick={() => onPick(token)}
                aria-pressed={on}
                title={`${fam.label}-${s}`}
                style={{ background: resolve(token) }}
                className={[
                  'w-5 h-6 rounded-[3px] border shrink-0 transition-transform',
                  on ? 'border-ink-900 ring-2 ring-ink-900 scale-110 z-base' : 'border-ink-200 hover:scale-105',
                ].join(' ')}
              />
            );
          })}
        </div>
      ))}
    </div>
  </div>
);

/* ──────────────────────────── Overrides live ────────────────────────────── */

const PROPOSAL_CSS = `:root{--text-body-sm:1rem;--t-body-sm:1rem;--radius-3xl:var(--radius-2xl);}`;
const STYLE_ID = '__design-lab-proposal';

/* ───────────── Essai des options bouton sur toute l'app ─────────────────── */

/**
 * Surcharge les boutons rendus PARTOUT dans l'app, en ciblant la signature de
 * classes de chaque variant (`button.bg-primary-600.text-white` = `primary`).
 * Injecté dans <head>, donc actif pendant la navigation SPA : on va juger sur
 * /dashboard, pas sur un banc d'essai.
 *
 * C'est un aperçu, pas la correction : rien n'est écrit dans Button.tsx.
 */
const BTN_TRIALS: Record<string, { label: string; hint: string; css: string }> = {
  'ghost-fix': {
    label: 'ghost corrigé',
    hint: 'bordure 100 → 600 · 177 boutons',
    css: `
      button.bg-primary-50.text-primary-800,a.bg-primary-50.text-primary-800{
        border-color:#4a8fa1!important;border-width:1.5px!important}
      button.bg-primary-50.text-primary-800:hover,a.bg-primary-50.text-primary-800:hover{
        border-color:#3d7786!important}`,
  },
  'primary-A': {
    label: 'primary — A profond',
    hint: 'primary-900 pétrole, label blanc · 125 boutons',
    css: `
      button.bg-primary-600.text-white,a.bg-primary-600.text-white{
        background-color:#1f3e45!important}
      button.bg-primary-600.text-white:hover,a.bg-primary-600.text-white:hover{
        background-color:#2f5f6a!important}`,
  },
  'primary-B': {
    label: 'primary — B teinté',
    hint: 'fond clair + bordure franche · 125 boutons',
    css: `
      button.bg-primary-600.text-white,a.bg-primary-600.text-white{
        background-color:#dcebef!important;color:#2f5f6a!important;
        border:1.5px solid #4a8fa1!important;box-shadow:none!important}
      button.bg-primary-600.text-white:hover,a.bg-primary-600.text-white:hover{
        background-color:#b9d7df!important;color:#1f3e45!important;border-color:#3d7786!important}`,
  },
  'secondary-B': {
    label: 'secondary — B teinté',
    hint: 'fond orange clair + bordure · 67 boutons',
    css: `
      button.bg-secondary-500.text-white,a.bg-secondary-500.text-white{
        background-color:#fddcc7!important;color:#5e3710!important;
        border:1.5px solid #c06920!important;box-shadow:none!important}
      button.bg-secondary-500.text-white:hover,a.bg-secondary-500.text-white:hover{
        background-color:#fcbb93!important;color:#3b2109!important;border-color:#8f5017!important}`,
  },
};
const TRIAL_STYLE_ID = '__design-lab-btn-trial';

/* ══════════════════════════════════════════════════════════════════════════
   TROIS ARBITRAGES OUVERTS — ajoutés le 2026-07-29
   Ces trois sections existent parce que trois affirmations circulaient dans la
   doc comme des décisions alors qu'aucune n'avait été tranchée :
     1. la couleur du texte courant       (gris teinté teal vs marron éditorial)
     2. le rayon des boutons et des cards (pilule 999 vs 14 vs 10)
     3. la signification des tonalités    (teal=focus, orange=action, or=validé)
   `DESIGN.md` porte lui-même 🚧 « table à rejouer » et « à l'arbitrage au banc ».
   ══════════════════════════════════════════════════════════════════════════ */

const PARAGRAPHE =
  "Nous accompagnons les organisations dans leur transition vers un modèle centré sur les compétences. Conseil stratégique, création pédagogique sur-mesure et Intelligence Artificielle pour aligner enfin vos talents avec vos enjeux business.";

const FONDS_TEXTE = [
  { nom: 'Blanc', token: '--color-ink-0' },
  { nom: 'Crème', token: '--color-surface-cream' },
  { nom: 'Papier teinté', token: '--color-accent-50' },
  { nom: 'Teal mist', token: '--color-primary-50' },
] as const;

/** Mélange linéaire en sRGB. `t = 0` rend `a`, `t = 1` rend `b`. */
const mix = (a: string, b: string, t: number): string => {
  const x = parseColor(a);
  const y = parseColor(b);
  if (!x || !y) return a;
  const c = x.map((v, i) => Math.round(v + (y[i] - v) * t));
  return `rgb(${c[0]}, ${c[1]}, ${c[2]})`;
};

/**
 * Éclaircit `encre` vers `bg` jusqu'à retrouver le contraste que `ref` obtient
 * sur ce même `bg`. Sert à dériver le ton de paragraphe d'une encre : la teinte
 * de l'encre choisie, la lisibilité exacte de la rampe actuelle. Dichotomie sur
 * 24 passes — la fonction est monotone en `t`, donc elle converge.
 *
 * Rien de ce que ça produit n'est un token : c'est une proposition à regarder.
 */
const rampMatch = (encre: string, bg: string, ref: string): string => {
  const cible = contrast(ref, bg);
  let lo = 0;
  let hi = 1;
  for (let i = 0; i < 24; i += 1) {
    const t = (lo + hi) / 2;
    if (contrast(mix(encre, bg, t), bg) > cible) lo = t;
    else hi = t;
  }
  return mix(encre, bg, (lo + hi) / 2);
};

/**
 * Trois traitements, pas deux.
 *
 * Le site ne pose jamais une encre unique : il pose un titre en `ink-900` et un
 * paragraphe en `ink-600` / `ink-700` (86 et 72 usages, mesurés le 30/07).
 * Comparer deux encres sur le seul titre masquait la vraie question, qui est
 * celle de la **rampe** : `ink-50` → `ink-800` sont les gris froids par défaut
 * de Tailwind, et `ink-900` (#252B37) est la seule valeur TLS de la série.
 * Passer le titre au marron sans toucher au reste met donc un titre chaud sur un
 * paragraphe froid — c'est la colonne du milieu, et elle est là pour être vue.
 */
const ENCRE_COLONNES = [
  {
    nom: 'Actuel',
    detail: 'titre ink-900 · paragraphe ink-600',
    titre: '--color-ink-900',
    derive: false,
  },
  {
    nom: 'Marron sur les titres seuls',
    detail: 'titre marron · paragraphe ink-600 inchangé',
    titre: '--color-brown-editorial',
    derive: false,
  },
  {
    nom: 'Rampe chaude',
    detail: 'titre marron · paragraphe dérivé, à créer',
    titre: '--color-brown-editorial',
    derive: true,
  },
] as const;

/* ── La rampe elle-même — ajouté le 2026-07-30 ─────────────────────────────
   Question de Chloé : « on peut pas faire dériver notre ink / grayscale de
   notre ink-900 TLS et remplacer les tailwind de base ? »

   La réponse est oui, et elle est décevante : mesuré en OKLCH, `ink-900` est à
   la teinte **264°**, quand le teal de marque `primary-500` est à **216°**.
   Quarante-huit degrés d'écart. `ink-900` n'est donc PAS un « gris teinté
   teal » — c'est un gris bleu-violet, de la même famille que les gris Tailwind
   qu'il est censé remplacer (`ink-500` est à 264,4°, `ink-600` à 256,8°).
   Dériver la rampe d'`ink-900` ne changerait presque rien : c'est la colonne B,
   et elle est là pour être écartée les yeux ouverts.

   Les deux colonnes qui changent quelque chose sont C (la teinte du vrai teal
   de marque) et D (celle du marron). Les quatre rampes tiennent la clarté
   d'origine cran par cran, donc **aucun ratio de contraste ne bouge**.
   ─────────────────────────────────────────────────────────────────────────── */

const CRANS_INK = [
  'ink-50', 'ink-100', 'ink-200', 'ink-300', 'ink-400',
  'ink-500', 'ink-600', 'ink-700', 'ink-800', 'ink-900',
] as const;

const RAMPES = [
  { cle: 'A', nom: 'Actuel', detail: 'gris Tailwind par défaut', hue: null },
  { cle: 'B', nom: 'Depuis ink-900', detail: 'teinte 264° — quasi identique à A', hue: '--color-ink-900' },
  { cle: 'C', nom: 'Depuis le teal TLS', detail: 'teinte 216° — enfin un gris de marque', hue: '--color-primary-500' },
  { cle: 'D', nom: 'Depuis le marron', detail: 'teinte 46° — la rampe chaude', hue: '--color-brown-editorial' },
] as const;

const RampeArbitrage: React.FC<{ tick: number }> = ({ tick }) => {
  const tokens = useLiveTokens([
    ...CRANS_INK.map((c) => `--color-${c}`),
    '--color-primary-500',
    '--color-brown-editorial',
    '--color-ink-0',
  ]);
  void tick;
  const blanc = tokens['--color-ink-0'] || '#ffffff';

  /** Une colonne = les 10 crans rejoués sur une teinte. */
  const colonne = (hue: string | null) =>
    CRANS_INK.map((cran) => {
      const base = tokens[`--color-${cran}`] || '#000';
      return { cran, valeur: hue ? rehue(base, tokens[hue] || base) : base };
    });

  return (
    <div className="flex flex-col gap-stack">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {RAMPES.map((r) => {
          const crans = colonne(r.hue);
          return (
            <div key={r.cle} className="flex flex-col gap-stack-xs min-w-0">
              <div className="flex flex-col gap-0.5">
                <span className="text-micro font-extrabold uppercase tracking-[0.07em] text-ink-700">
                  {r.cle} · {r.nom}
                </span>
                <span className="text-micro text-ink-500">{r.detail}</span>
              </div>
              <div className="flex flex-col rounded-lg overflow-hidden border border-ink-200">
                {crans.map((c) => {
                  const ratio = contrast(c.valeur, blanc);
                  const clair = ratio < 2.2;
                  return (
                    <div
                      key={c.cran}
                      className="flex items-center justify-between gap-2 px-2.5 py-1.5"
                      style={{ backgroundColor: c.valeur }}
                    >
                      <span
                        className="text-micro font-semibold tabular-nums"
                        style={{ color: clair ? tokens['--color-ink-700'] : blanc }}
                      >
                        {c.cran.replace('ink-', '')}
                      </span>
                      <span
                        className="text-micro tabular-nums"
                        style={{ color: clair ? tokens['--color-ink-500'] : blanc, opacity: 0.85 }}
                      >
                        {c.valeur}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>

      {/* Spécimens : les deux rampes qui changent quelque chose, en situation. */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {RAMPES.filter((r) => r.cle === 'C' || r.cle === 'D').map((r) => {
          const crans = colonne(r.hue);
          const titre = crans.find((c) => c.cran === 'ink-900')!.valeur;
          const corps = crans.find((c) => c.cran === 'ink-600')!.valeur;
          const discret = crans.find((c) => c.cran === 'ink-500')!.valeur;
          return (
            <div
              key={r.cle}
              className="rounded-xl border border-ink-200 p-5 flex flex-col gap-stack-xs"
              style={{ backgroundColor: blanc }}
            >
              <span className="text-micro font-bold" style={{ color: discret }}>
                {r.cle} · {r.nom} — titre 900, corps 600, mention 500
              </span>
              <p
                className="font-display text-h3 font-extrabold tracking-headline m-0"
                style={{ color: titre }}
              >
                Ne formez plus pour former.
              </p>
              <p className="font-body text-body leading-relaxed m-0" style={{ color: corps }}>
                {PARAGRAPHE}
              </p>
              <div className="flex flex-wrap items-center gap-2 pt-1">
                <span className="text-micro font-semibold" style={{ color: discret }}>titre</span>
                <Verdict ratio={contrast(titre, blanc)} />
                <span className="text-micro font-semibold" style={{ color: discret }}>corps</span>
                <Verdict ratio={contrast(corps, blanc)} />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

/** 1 · Couleur du texte courant. Paires titre/paragraphe réelles, quatre fonds. */
const EncreArbitrage: React.FC<{ tick: number }> = ({ tick }) => {
  const tokens = useLiveTokens([
    '--color-ink-900',
    '--color-ink-600',
    '--color-brown-editorial',
    ...FONDS_TEXTE.map((f) => f.token),
    '--color-ink-0',
  ]);
  void tick;
  const blanc = tokens['--color-ink-0'] || '#ffffff';
  const refCorps = tokens['--color-ink-600'] || '#4b5563';

  return (
    <div className="flex flex-col gap-stack-lg">
      {FONDS_TEXTE.map((fond) => {
        const bg = tokens[fond.token] || blanc;
        return (
          <div key={fond.nom} className="flex flex-col gap-stack-xs">
            <p className="text-micro font-extrabold uppercase tracking-[0.07em] text-ink-500 m-0">
              {fond.nom} <span className="font-normal normal-case tracking-normal">{bg}</span>
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {ENCRE_COLONNES.map((col) => {
                const titre = tokens[col.titre] || '#000';
                const corps = col.derive ? rampMatch(titre, bg, refCorps) : refCorps;
                return (
                  <div
                    key={col.nom}
                    className="rounded-xl border border-ink-200 p-5 flex flex-col gap-stack-xs min-w-0"
                    style={{ backgroundColor: bg }}
                  >
                    <div className="flex flex-col gap-0.5">
                      <span className="text-micro font-bold" style={{ color: titre, opacity: 0.75 }}>
                        {col.nom}
                      </span>
                      <span className="text-micro" style={{ color: corps, opacity: 0.8 }}>
                        {col.detail}
                      </span>
                    </div>
                    <p
                      className="font-display text-h3 font-extrabold tracking-headline m-0"
                      style={{ color: titre }}
                    >
                      Ne formez plus pour former.
                    </p>
                    <p className="font-body text-body leading-relaxed m-0" style={{ color: corps }}>
                      {PARAGRAPHE}
                    </p>
                    <div className="flex flex-wrap items-center gap-2 pt-1">
                      <span className="text-micro font-semibold" style={{ color: corps }}>
                        titre
                      </span>
                      <Verdict ratio={contrast(titre, bg)} />
                      <span className="text-micro font-semibold" style={{ color: corps }}>
                        corps
                      </span>
                      <Verdict ratio={contrast(corps, bg)} />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
};

/** 2 · Rayons. Le même bouton et la même card à trois valeurs de l’échelle. */
const RAYONS_CANDIDATS = [
  { nom: 'Pilule · 999 px', token: '--radius-pill', note: 'état actuel des boutons' },
  { nom: 'lg · 14 px', token: '--radius-lg', note: 'compromis' },
  { nom: 'md · 10 px', token: '--radius-md', note: 'registre imprimé' },
] as const;

const RayonArbitrage: React.FC<{ tick: number }> = ({ tick }) => {
  const tokens = useLiveTokens([
    ...RAYONS_CANDIDATS.map((r) => r.token),
    '--color-primary-700',
    '--color-ink-0',
    '--color-ink-200',
    '--color-ink-900',
    '--color-ink-600',
  ]);
  void tick;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {RAYONS_CANDIDATS.map((r) => {
        const rad = tokens[r.token] || '0px';
        return (
          <div key={r.nom} className="flex flex-col gap-stack-xs min-w-0">
            <p className="text-micro font-extrabold uppercase tracking-[0.07em] text-ink-500 m-0">
              {r.nom}
            </p>
            <p className="text-caption text-ink-500 m-0 -mt-1">{r.note}</p>

            <div className="flex flex-col gap-4 pt-2">
              {/* bouton plein */}
              <span
                className="inline-flex items-center justify-center px-6 py-3 font-body text-body-sm font-bold w-fit"
                style={{
                  borderRadius: rad,
                  backgroundColor: tokens['--color-primary-700'],
                  color: tokens['--color-ink-0'],
                }}
              >
                Échanger sur votre projet
              </span>

              {/* card */}
              <div
                className="p-5 flex flex-col gap-stack-xs"
                style={{
                  borderRadius: rad,
                  backgroundColor: tokens['--color-ink-0'],
                  border: `1px solid ${tokens['--color-ink-200']}`,
                }}
              >
                <p
                  className="font-display text-h4 font-bold m-0"
                  style={{ color: tokens['--color-ink-900'] }}
                >
                  Accompagnement STRIDE
                </p>
                <p
                  className="font-body text-body-sm leading-relaxed m-0"
                  style={{ color: tokens['--color-ink-600'] }}
                >
                  La méthode en six étapes pour cadrer votre transition, avec un livrable à chaque
                  jalon.
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

/** 3 · Les tonalités disent-elles quelque chose, ou est-ce une fiction de doc ? */
const ROLES_ANNONCES = [
  { role: 'Focus, progression', token: '--color-primary-700', tint: '--color-primary-50', tonalite: 'primary' },
  { role: 'Action, contact humain', token: '--color-secondary-600', tint: '--color-secondary-50', tonalite: 'warm' },
  { role: 'Validé, accompli', token: '--color-accent-700', tint: '--color-accent-50', tonalite: 'sun' },
] as const;

/** Mêmes rôles, couleurs permutées d’un cran. Si l’œil ne proteste pas, l’association est arbitraire. */
const ROLES_PERMUTES = [
  { role: 'Focus, progression', token: '--color-secondary-600', tint: '--color-secondary-50', tonalite: 'warm' },
  { role: 'Action, contact humain', token: '--color-accent-700', tint: '--color-accent-50', tonalite: 'sun' },
  { role: 'Validé, accompli', token: '--color-primary-700', tint: '--color-primary-50', tonalite: 'primary' },
] as const;

const TonaliteBloc: React.FC<{
  jeu: readonly { role: string; token: string; tint: string; tonalite: string }[];
  tokens: Record<string, string>;
}> = ({ jeu, tokens }) => (
  <div className="flex flex-col gap-3">
    {jeu.map((r) => (
      <div
        key={r.role}
        className="flex items-center gap-4 rounded-xl p-4"
        style={{ backgroundColor: tokens[r.tint] }}
      >
        <span
          className="w-10 h-10 rounded-lg shrink-0"
          style={{ backgroundColor: tokens[r.token] }}
        />
        <div className="flex flex-col min-w-0">
          <span
            className="font-display text-body font-bold"
            style={{ color: tokens[r.token] }}
          >
            {r.role}
          </span>
          <span className="font-body text-caption text-ink-600">tonalité {r.tonalite}</span>
        </div>
      </div>
    ))}
  </div>
);

const TonaliteArbitrage: React.FC<{ tick: number }> = ({ tick }) => {
  const tokens = useLiveTokens([
    '--color-primary-700', '--color-primary-50',
    '--color-secondary-600', '--color-secondary-50',
    '--color-accent-700', '--color-accent-50',
  ]);
  void tick;
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <Panel label="Association annoncée par la doc" tone="proposed">
        <TonaliteBloc jeu={ROLES_ANNONCES} tokens={tokens} />
      </Panel>
      <Panel label="Mêmes rôles, couleurs permutées" tone="current">
        <TonaliteBloc jeu={ROLES_PERMUTES} tokens={tokens} />
      </Panel>
    </div>
  );
};

/* ══════════════════════════════════════════════════════════════════════════
   ④ REMPLI OU OUTLINE ? — ajouté le 2026-07-31
   Chloé, en marge de ③ : « je pense passer plutôt à des boutons outline border
   coloured et coloured texte que filled en primary ».

   L'intuition est bonne et la mesure la confirme, mais pas pour la raison
   qu'on croit. Ce n'est pas un choix de style : c'est le seul traitement qui
   garde les couleurs de marque RECONNAISSABLES tout en passant AA.

   En rempli, le label est blanc et doit contraster avec le fond de marque —
   ce qui force `primary-700` ou plus foncé, donc le « teal terni » écarté.
   En outline, le label est posé sur du blanc : `primary-700` y est à 5,02,
   et il se lit comme le teal de la marque et non comme un teal assombri.
   Même token, lecture opposée, selon ce qu'il y a derrière.

   Le piège : le variant `outline` existant a un label conforme et une
   **bordure qui ne l'est pas** (`border-primary-400` = 2,44, seuil 3,0 de
   SC 1.4.11). Voir la troisième rangée.
   ══════════════════════════════════════════════════════════════════════════ */

const BTN_REMPLIS = [
  { nom: 'primary', fond: '--color-primary-600', label: '--color-ink-0' },
  { nom: 'secondary', fond: '--color-secondary-500', label: '--color-ink-0' },
  { nom: 'accent', fond: '--color-accent-500', label: '--color-ink-0' },
] as const;

const BTN_OUTLINES = [
  { nom: 'outline', label: '--color-primary-700', bordure: '--color-primary-400' },
  { nom: 'outline-warm', label: '--color-secondary-700', bordure: '--color-secondary-400' },
] as const;

const BTN_OUTLINES_FIX = [
  { nom: 'outline', label: '--color-primary-700', bordure: '--color-primary-600' },
  { nom: 'outline-warm', label: '--color-secondary-700', bordure: '--color-secondary-600' },
  { nom: 'outline-sun', label: '--color-accent-700', bordure: '--color-accent-700' },
] as const;

/** Une pastille de bouton dessinée à plat, pour comparer sans le bruit du vrai composant. */
const BtnSpecimen: React.FC<{
  texte: string;
  fond?: string;
  label: string;
  bordure?: string;
  rayon: string;
}> = ({ texte, fond, label, bordure, rayon }) => (
  <span
    className="inline-flex items-center justify-center px-5 h-11 font-body text-body-sm font-semibold whitespace-nowrap"
    style={{
      borderRadius: rayon,
      backgroundColor: fond ?? 'transparent',
      color: label,
      border: bordure ? `1px solid ${bordure}` : '1px solid transparent',
    }}
  >
    {texte}
  </span>
);

const BoutonsOutline: React.FC<{ tick: number }> = ({ tick }) => {
  const tokens = useLiveTokens([
    '--color-ink-0', '--color-radius', '--radius-lg',
    ...BTN_REMPLIS.flatMap((b) => [b.fond, b.label]),
    ...BTN_OUTLINES.flatMap((b) => [b.label, b.bordure]),
    ...BTN_OUTLINES_FIX.flatMap((b) => [b.label, b.bordure]),
  ]);
  void tick;
  const blanc = tokens['--color-ink-0'] || '#ffffff';
  // ② est tranché : 14 px. Le banc montre donc déjà le rayon retenu.
  const rayon = tokens['--radius-lg'] || '14px';

  const Rangee: React.FC<{ titre: string; note: string; children: React.ReactNode }> = ({
    titre, note, children,
  }) => (
    <div className="flex flex-col gap-stack-xs">
      <div className="flex flex-col gap-0.5">
        <span className="text-micro font-extrabold uppercase tracking-[0.07em] text-ink-700">{titre}</span>
        <span className="text-micro text-ink-500">{note}</span>
      </div>
      <div className="rounded-xl border border-ink-200 p-5 flex flex-wrap items-start gap-6" style={{ backgroundColor: blanc }}>
        {children}
      </div>
    </div>
  );

  return (
    <div className="flex flex-col gap-stack">
      <Rangee
        titre="A · Rempli — l'état actuel"
        note="label blanc sur fond de marque · seuil texte 4,5"
      >
        {BTN_REMPLIS.map((b) => {
          const fond = tokens[b.fond];
          const label = tokens[b.label];
          return (
            <div key={b.nom} className="flex flex-col gap-2 items-start">
              <BtnSpecimen texte="Échanger sur votre projet" fond={fond} label={label} rayon={rayon} />
              <div className="flex items-center gap-2">
                <span className="text-micro font-semibold text-ink-600">{b.nom}</span>
                <Verdict ratio={contrast(label, fond)} />
              </div>
            </div>
          );
        })}
      </Rangee>

      <Rangee
        titre="B · Outline tel qu'il est aujourd'hui dans Button.tsx"
        note="label conforme, bordure non conforme · texte 4,5 · bordure 3,0"
      >
        {BTN_OUTLINES.map((b) => {
          const label = tokens[b.label];
          const bordure = tokens[b.bordure];
          return (
            <div key={b.nom} className="flex flex-col gap-2 items-start">
              <BtnSpecimen texte="Échanger sur votre projet" label={label} bordure={bordure} rayon={rayon} />
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-micro font-semibold text-ink-600">label</span>
                <Verdict ratio={contrast(label, blanc)} />
                <span className="text-micro font-semibold text-ink-600">bordure</span>
                <Verdict ratio={contrast(bordure, blanc)} large />
              </div>
            </div>
          );
        })}
      </Rangee>

      <Rangee
        titre="C · Outline corrigé — bordure remontée d'un cran"
        note="la seule modification : 400 → 600 sur la bordure"
      >
        {BTN_OUTLINES_FIX.map((b) => {
          const label = tokens[b.label];
          const bordure = tokens[b.bordure];
          return (
            <div key={b.nom} className="flex flex-col gap-2 items-start">
              <BtnSpecimen texte="Échanger sur votre projet" label={label} bordure={bordure} rayon={rayon} />
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-micro font-semibold text-ink-600">label</span>
                <Verdict ratio={contrast(label, blanc)} />
                <span className="text-micro font-semibold text-ink-600">bordure</span>
                <Verdict ratio={contrast(bordure, blanc)} large />
              </div>
            </div>
          );
        })}
      </Rangee>
    </div>
  );
};

/* ─────────────────────────────── La page ────────────────────────────────── */

const NAV = [
  { id: 'decisions', label: 'Décisions' },
  { id: 'atelier', label: 'Atelier' },
  { id: 'fonts', label: 'Fontes' },
  { id: 'optical', label: 'Taille optique' },
  { id: 'typo', label: 'Tailles' },
  { id: 'weights', label: 'Graisses' },
  { id: 'cards', label: 'Composition card' },
  { id: 'radius', label: 'Rayons' },
  { id: 'fix3', label: 'Corriger les 3 gros' },
  { id: 'cards-inv', label: 'Variants Card' },
  { id: 'inventory', label: 'Variants Button' },
  { id: 'buttons', label: 'Boutons' },
  { id: 'greys', label: 'Gris de texte' },
  // Les trois arbitrages ouverts, en tête de liste dans l'usage même si en
  // queue dans l'ordre : ce sont eux qui bloquent la direction artistique.
  { id: 'encre', label: '① Couleur du texte' },
  { id: 'rayon-arbitrage', label: '② Rayons' },
  { id: 'tonalites', label: '③ Sens des couleurs' },
  { id: 'boutons-outline', label: '④ Rempli ou outline' },
];

/** Doit rester aligné sur le `scroll-mt-24` des sections (6rem = 96px). */
const HEADER_OFFSET = 96;

/* ══════════════════════ Panneau de décisions ═══════════════════════════════ */

/**
 * Les arbitrages ouverts, en ordre de DÉPENDANCE — pas d'importance.
 * D1 bloque tout ce qui concerne la graisse : aucun rôle sémantique ne peut être
 * nommé tant qu'on n'a pas dit qui gagne entre le token (600) et l'usage (700).
 * Les choix sont persistés en localStorage pour survivre au rechargement.
 */
interface Decision {
  id: string;
  n: number;
  title: string;
  blocks?: string;
  dependsOn?: number;
  question: string;
  /** Ce que la mesure établit — jamais une opinion. */
  evidence: string[];
  options: { key: string; label: string; hint: string; recommended?: boolean }[];
  /** Aperçu inline du choix, quand il y a quelque chose à voir. */
  preview?: (choice: string | null) => React.ReactNode;
  /** Section du lab où se trouve la preuve complète. */
  section?: string;
}

const SPARTAN = "'League Spartan', sans-serif";

const DECISIONS: Decision[] = [
  {
    id: 'weight-h34', n: 1, title: 'Graisse des titres h3 / h4',
    blocks: 'bloque les rôles de graisse',
    question: 'Le token déclare 600. Le code écrit 700. Qui gagne ?',
    evidence: [
      'text-h3 : 700 sur 87 sites (70 %) · 600 sur 13 (10 %)',
      'text-h4 : 700 sur 98 sites (67 %) · 600 sur 28 (19 %)',
      'Aligner le token sur l’usage = 0 fichier à toucher. L’inverse = ~185 sites.',
    ],
    options: [
      { key: 'token-700', label: 'Le token passe à 700', hint: 'on suit l’usage — 0 site à modifier', recommended: true },
      { key: 'code-600', label: 'Le code revient à 600', hint: '~185 sites à corriger, titres plus légers' },
    ],
    preview: () => (
      <div className="flex flex-wrap gap-stack-lg">
        {[600, 700].map((w) => (
          <div key={w} className="flex flex-col gap-1">
            <span className="text-ink-900" style={{ fontFamily: SPARTAN, fontSize: 22, fontWeight: w, letterSpacing: '-0.025em' }}>
              Prochaine session
            </span>
            <span className="text-ink-900" style={{ fontFamily: SPARTAN, fontSize: 18, fontWeight: w, letterSpacing: '-0.02em' }}>
              Titre de card
            </span>
            <span className="text-micro text-ink-500 tabular-nums">h3 22 · h4 18 en {w}</span>
          </div>
        ))}
      </div>
    ),
    section: 'weights',
  },
  {
    id: 'weight-roles', n: 2, title: 'Nommer les rôles de graisse',
    dependsOn: 1,
    question: 'Une fois h3/h4 tranché, quels tokens sémantiques pose-t-on ?',
    evidence: [
      'Aucun --font-weight-* propre à TLS n’existe : seules les graisses portées par --text-h*.',
      '2 111 déclarations, 6 graisses. 700 (43 %) et 600 (37 %) font 80 % à eux deux.',
      'font-black (900) : 13 usages dispersés, jamais sur un héros — c’est du bruit.',
      'Sans rôles nommés, rien ne dit quand écrire 600 plutôt que 700.',
    ],
    options: [
      { key: 'five', label: '5 rôles nommés', hint: 'display 800 · title 700 · emphasis 600 · meta 500 · body 400', recommended: true },
      { key: 'four', label: '4 rôles (sans display)', hint: 'le 800 reste une exception marketing, non tokenisée' },
      { key: 'none', label: 'Pas de rôles', hint: 'on garde les graisses portées par les tokens de taille' },
    ],
    preview: () => (
      <div className="flex flex-col gap-0.5">
        {[
          ['display', 800, 'héros marketing'],
          ['title', 700, 'titres de page et de section'],
          ['emphasis', 600, 'sous-titres, libellés, boutons'],
          ['meta', 500, 'métadonnées appuyées'],
          ['body', 400, 'texte courant'],
        ].map(([n, w, use]) => (
          <div key={n as string} className="flex items-baseline gap-stack-xs">
            <code className="text-micro text-primary-800 w-32 shrink-0">--weight-{n}</code>
            <span className="text-body-sm text-ink-900 w-28 shrink-0" style={{ fontWeight: w as number }}>
              Reprends
            </span>
            <span className="text-micro text-ink-500">{use}</span>
          </div>
        ))}
      </div>
    ),
    section: 'weights',
  },
  {
    id: 'h4-bodylg', n: 3, title: 'h4 et body-lg font tous deux 18px',
    question: 'Deux tokens, une taille. On les distingue autrement ou on fusionne ?',
    evidence: [
      'h4 : 18px/600, interligne 26px, tracking -0,02em — 166 usages.',
      'body-lg : 18px/—, interligne 28px, pas de tracking — 137 usages.',
      'La taille ne hiérarchise rien entre les deux : seuls la graisse et l’interligne les séparent.',
      'Le CHANTIER recommande de NE PAS fusionner — deux rôles réels, pas un doublon.',
    ],
    options: [
      { key: 'keep', label: 'Garder les deux', hint: 'rôles distincts : titre de card vs texte introductif', recommended: true },
      { key: 'split', label: 'Écarter les tailles', hint: 'h4 → 20px, la taille redevient un signal' },
      { key: 'merge', label: 'Fusionner', hint: '303 usages basculent sur un seul token' },
    ],
  },
  {
    id: 'btn-weight', n: 4, title: 'Graisse et tracking des boutons',
    question: 'Les libellés paraissent fins. On monte la graisse et on relâche le serrage ?',
    evidence: [
      'Tous les boutons sont en 600. md (défaut) = 15px, sm = 13px — 485 boutons sur les deux.',
      'BASE applique tracking-tight (-0,025em) : à 13px le libellé est petit ET serré ET en 600.',
      'Gain purement visuel : aucune taille de bouton n’atteint 18,66px, donc 700 ne débloque pas la tolérance WCAG à 3,0.',
    ],
    options: [
      { key: 'both', label: '700 + tracking 0 sous 16px', hint: 'corrige les deux causes de la finesse', recommended: true },
      { key: 'weight', label: '700 seulement', hint: 'le serrage reste sur les petits libellés' },
      { key: 'keep', label: 'Ne rien changer', hint: '600 reste la graisse des libellés' },
    ],
    preview: () => (
      <div className="flex flex-wrap gap-stack">
        {[[600, '-0.025em', '600 · serré — actuel'], [700, '0', '700 · tracking 0 — proposé']].map(([w, tr, lbl]) => (
          <div key={lbl as string} className="flex flex-col gap-1 items-start">
            <span
              className="inline-flex items-center h-8 px-3.5 rounded-pill bg-primary-900 text-white"
              style={{ fontFamily: "'Nunito', sans-serif", fontSize: 13, fontWeight: w as number, letterSpacing: tr as string }}
            >
              Voir le parcours
            </span>
            <span className="text-micro text-ink-500">{lbl} · size sm 13px</span>
          </div>
        ))}
      </div>
    ),
  },
  {
    id: 'display-scale', n: 5, title: 'L’échelle display (96 / 64 / 48px)',
    question: 'Trois tokens déclarés, zéro usage. On les adopte ou on les retire ?',
    evidence: [
      '--text-display-xl / -lg / -md sont déclarés dans index.css et liés 1:1 aux text styles Figma.',
      'Usages dans src/ : 0. Les pages marketing utilisent text-4xl (36px), plus petit que le plus petit cran.',
      'Le plafond recommandé pour un héros est 6rem (96px) — display-xl y est pile.',
    ],
    options: [
      { key: 'adopt', label: 'Les adopter dans les héros', hint: 'remplace text-4xl sur les pages marketing' },
      { key: 'drop', label: 'Les retirer des deux côtés', hint: 'code ET Figma, sinon la dérive revient', recommended: true },
      { key: 'keep', label: 'Les laisser dormir', hint: '3 tokens morts de plus dans le système' },
    ],
  },
  {
    id: 'scale-bodysm', n: 6, title: 'Retirer body-sm (15px)',
    question: 'body-sm et body sont séparés de 1 px. On fusionne ?',
    evidence: [
      'Le pas body-sm→body vaut ×1,07 — le plancher du registre produit est 1,125.',
      '864 usages passeraient de 15 à 16 px.',
      'Vérifié au dashboard : le texte se recompose, rien ne déborde.',
    ],
    options: [
      { key: 'merge', label: 'Fusionner dans body', hint: '8 tokens au lieu de 10, pas à ×1,23', recommended: true },
      { key: 'keep', label: 'Garder les deux', hint: 'l’échelle reste plate à cet endroit' },
    ],
    section: 'typo',
  },
  {
    id: 'scale-h5', n: 7, title: 'Retirer h5 (16px)',
    question: 'h5 fait exactement la taille de body. On le garde ?',
    evidence: ['27 usages seulement.', 'Même taille que body (16 px) — seule la graisse les distingue.'],
    options: [
      { key: 'drop', label: 'Retirer h5', hint: 'les 27 usages passent en body + graisse', recommended: true },
      { key: 'keep', label: 'Garder h5', hint: 'un rôle de titre à part, même si la taille est identique' },
    ],
    section: 'typo',
  },
  {
    id: 'h3-size', n: 8, title: 'h3 : 22 → 24 px',
    dependsOn: 1,
    question: 'Deux mesures indépendantes demandent 24. On y va ?',
    evidence: [
      'Seuil WCAG grand texte en Spartan : 22,4 px. À 22 px, h3 n’y a pas droit.',
      'Compensation optique face à Nunito (+8 %) : 23,8 px.',
      'Bénéfice : le pas h4→h3 passe de ×1,22 à ×1,33.',
    ],
    options: [
      { key: '24', label: 'Passer à 24 px', hint: '145 usages · interligne 32 px (×8)', recommended: true },
      { key: '22', label: 'Rester à 22 px', hint: 'seuil de contraste 4,5 à appliquer sur h3' },
    ],
    preview: () => (
      <div className="flex flex-wrap gap-stack-lg items-baseline">
        {[22, 24].map((px) => (
          <div key={px} className="flex flex-col gap-1">
            <span className="text-ink-900" style={{ fontFamily: SPARTAN, fontSize: px, fontWeight: 700, letterSpacing: '-0.025em' }}>
              Prochaine session
            </span>
            <span className="text-micro text-ink-500 tabular-nums">
              {px} px → optique {((px * 0.41) / 0.493).toFixed(1)} px {px >= 22.4 ? '· seuil 3,0 mérité' : '· seuil 4,5'}
            </span>
          </div>
        ))}
      </div>
    ),
    section: 'optical',
  },
  {
    id: 'line-heights', n: 9, title: 'Les 2 interlignes hors grille',
    dependsOn: 8,
    question: 'h4 est à 26 px et h3 à 30 px — hors multiple de 4. On aligne ?',
    evidence: [
      '8 interlignes sur 10 sont déjà des multiples de 4. Ces deux-là sont les exceptions.',
      'h4 18 px : 24 px donne ×1,33 (×8) · 28 px donne ×1,56 (×4).',
      'h3 : si 24 px est retenu, 32 px suit naturellement (×1,33, ×8).',
    ],
    options: [
      { key: 'tight', label: 'h4 → 24 px, h3 → 32 px', hint: 'les deux sur la grille de 8, ratios 1,33', recommended: true },
      { key: 'loose', label: 'h4 → 28 px, h3 → 32 px', hint: 'h4 plus aéré (×1,56)' },
      { key: 'keep', label: 'Ne rien changer', hint: 'deux valeurs restent hors grille' },
    ],
  },
  {
    id: 'ink400', n: 10, title: 'ink-400 sur 309 textes',
    question: 'Il échoue partout, à toutes les tailles. Comment on le remplace ?',
    evidence: [
      '2,54 sur blanc — échoue AA (4,5) ET la tolérance grand texte (3,0).',
      'ink-500 le remplace sur fond clair (4,83) mais échoue sur fond gris (4,39) → ink-600 y est requis.',
      '219 des 364 sites ne sont pas classables statiquement : la surface vient d’un ancêtre.',
      'ink-400 garde un emploi légitime : l’état désactivé, que WCAG exempte.',
    ],
    options: [
      { key: 'lots', label: 'En 3 lots vérifiés', hint: 'gris d’abord (ink-600), puis clairs, puis les 219 au rendu', recommended: true },
      { key: 'bulk', label: 'Tout en ink-500 d’un coup', hint: 'laisse ~18 sites sous le seuil sur fond gris' },
    ],
    section: 'greys',
  },
  {
    id: 'buttons', n: 11, title: 'Les 3 boutons pleins',
    question: 'primary, secondary, accent échouent tous. Quel traitement ?',
    evidence: [
      'primary 3,66 · secondary 2,64 · accent 2,31 — et le survol aggrave (le fill s’éclaircit).',
      'Vos contraintes : pas de teal terni, pas de label sombre sur couleur.',
      'Le teal est le seul cran piégé : trop foncé pour ink-900, trop clair pour du blanc.',
      'ghost (177 usages) se corrige d’une propriété : bordure 100 → 600.',
    ],
    options: [
      { key: 'deep', label: 'Rempli profond (900)', hint: 'primary 11,46 · pétrole, pas un 700 terni', recommended: true },
      { key: 'tinted', label: 'Teinté clair + bordure', hint: '5,79 / 3,66 · reste dans les tons clairs' },
      { key: 'mixed', label: 'Hybride par famille', hint: 'teal en profond, chaudes en teinté' },
    ],
    section: 'fix3',
  },
  {
    id: 'card-radius', n: 12, title: 'Rayon de racine des cards',
    question: '14, 20 et 24 px coexistent sur des cards de même rôle. Lequel ?',
    evidence: [
      'Card.BASE pose rounded-xl (20 px), mais le rendu réel donne 14 / 20 / 24 selon le composant.',
      'Côté code c’est un quasi ex æquo : 106 rounded-2xl contre 100 rounded-xl.',
      'radius-3xl est un doublon exact de radius-2xl (24 px) — token mort.',
    ],
    options: [
      { key: '20', label: '20 px partout', hint: 'suit Card.BASE, plus sobre' },
      { key: '24', label: '24 px partout', hint: 'suit la hero du dashboard, plus doux' },
    ],
    section: 'radius',
  },
  {
    id: 'sub11', n: 13, title: 'Les 54 usages sous 11 px',
    question: 'text-[9px] ×12, text-[8px] ×2… on les rapatrie sur micro (11 px) ?',
    evidence: [
      '54 usages hors de l’échelle, dont 14 sous 10 px.',
      'À ces tailles, même Nunito (grande hauteur d’x) décroche.',
      'Aucun arbitrage réel : c’est mécanique.',
    ],
    options: [
      { key: 'clamp', label: 'Tout ramener à micro (11 px)', hint: 'plancher unique, échelle refermée', recommended: true },
      { key: 'audit', label: 'Regarder au cas par cas', hint: 'plus lent, peut garder des exceptions justifiées' },
    ],
  },
];

const DECISION_STORE = 'tls-design-lab-decisions';

const DecisionPanel: React.FC<{ onJump: (id: string) => void }> = ({ onJump }) => {
  const [choices, setChoices] = useState<Record<string, string>>(() => {
    if (typeof localStorage === 'undefined') return {};
    try { return JSON.parse(localStorage.getItem(DECISION_STORE) ?? '{}'); } catch { return {}; }
  });
  const [open, setOpen] = useState<string | null>(DECISIONS[0].id);

  const pick = (id: string, key: string) => {
    setChoices((c) => {
      const next = c[id] === key ? (() => { const { [id]: _, ...rest } = c; return rest; })() : { ...c, [id]: key };
      try { localStorage.setItem(DECISION_STORE, JSON.stringify(next)); } catch { /* quota, tant pis */ }
      return next;
    });
  };

  const done = DECISIONS.filter((d) => choices[d.id]).length;
  const recap = DECISIONS.filter((d) => choices[d.id])
    .map((d) => `${d.n}. ${d.title} → ${d.options.find((o) => o.key === choices[d.id])?.label}`)
    .join('\n');

  return (
    <section id="decisions" className="scroll-mt-24 flex flex-col gap-stack">
      <header className="flex flex-col gap-tight">
        <h2 className="flex items-center gap-stack-xs text-h3 font-bold tracking-headline text-ink-900">
          <span className="inline-flex items-center justify-center w-9 h-9 rounded-lg bg-primary-50 text-primary-700 shrink-0">
            <ListChecks size={18} strokeWidth={2} />
          </span>
          Décisions à trancher
          <span className="text-body-sm font-normal text-ink-500 tabular-nums">{done} / {DECISIONS.length}</span>
        </h2>
        <p className="text-body-sm text-ink-600 m-0 max-w-prose">
          Rangées par dépendance, pas par importance. Chaque option porte ce que la mesure établit —
          jamais une opinion. Les choix sont mémorisés localement.
        </p>
      </header>

      <div className="rounded-xl border border-ink-200 bg-white overflow-hidden">
        {DECISIONS.map((d) => {
          const chosen = choices[d.id];
          const isOpen = open === d.id;
          const blockedBy = d.dependsOn && !choices[DECISIONS.find((x) => x.n === d.dependsOn)!.id]
            ? d.dependsOn : null;
          return (
            <div key={d.id} className="border-b border-ink-100 last:border-b-0">
              <button
                type="button"
                onClick={() => setOpen(isOpen ? null : d.id)}
                aria-expanded={isOpen}
                className="w-full flex items-center gap-stack-xs px-4 py-2.5 text-left hover:bg-ink-25 transition-colors duration-fast cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500"
              >
                <span className={[
                  'w-5 h-5 rounded-pill grid place-items-center shrink-0 text-micro font-bold',
                  chosen ? 'bg-success-base text-white' : 'bg-ink-100 text-ink-600',
                ].join(' ')}>
                  {chosen ? '✓' : d.n}
                </span>
                <span className="flex-1 min-w-0">
                  <span className="text-body-sm font-semibold text-ink-900">{d.title}</span>
                  {d.blocks && !chosen && (
                    <span className="ml-1.5 text-micro font-bold text-danger-fg">{d.blocks}</span>
                  )}
                  {blockedBy && (
                    <span className="ml-1.5 text-micro text-ink-400">après la {blockedBy}</span>
                  )}
                  {chosen && (
                    <span className="block text-micro text-success-fg font-semibold">
                      {d.options.find((o) => o.key === chosen)?.label}
                    </span>
                  )}
                </span>
                <ChevronRight size={14} className={isOpen ? 'rotate-90 shrink-0 text-ink-400' : 'shrink-0 text-ink-400'} />
              </button>

              {isOpen && (
                <div className="px-4 pb-4 pl-11 flex flex-col gap-stack-xs">
                  <p className="text-body-sm font-semibold text-ink-800 m-0">{d.question}</p>
                  <ul className="flex flex-col gap-0.5 m-0 pl-4 list-disc">
                    {d.evidence.map((e, i) => (
                      <li key={i} className="text-caption text-ink-600">{e}</li>
                    ))}
                  </ul>

                  {d.preview && (
                    <div className="rounded-lg border border-ink-200 bg-ink-25 p-3 my-1">
                      {d.preview(chosen ?? null)}
                    </div>
                  )}

                  <div className="flex flex-wrap gap-stack-xs">
                    {d.options.map((o) => {
                      const on = chosen === o.key;
                      return (
                        <button
                          key={o.key}
                          type="button"
                          onClick={() => pick(d.id, o.key)}
                          aria-pressed={on}
                          className={[
                            'flex flex-col items-start rounded-lg border px-3 py-1.5 text-left transition-colors duration-fast cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500',
                            on ? 'border-primary-600 bg-primary-50' : 'border-ink-200 hover:border-ink-300',
                          ].join(' ')}
                        >
                          <span className={['text-caption font-bold', on ? 'text-primary-900' : 'text-ink-800'].join(' ')}>
                            {o.label}
                            {o.recommended && !on && <span className="ml-1 text-micro font-semibold text-ink-400">recommandé</span>}
                          </span>
                          <span className="text-micro text-ink-500">{o.hint}</span>
                        </button>
                      );
                    })}
                  </div>

                  {d.section && (
                    <button
                      type="button"
                      onClick={() => onJump(d.section!)}
                      className="self-start inline-flex items-center gap-1 text-micro font-semibold text-primary-800 hover:underline cursor-pointer"
                    >
                      Voir la preuve complète <ArrowUpRight size={14} />
                    </button>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {done > 0 && (
        <div className="rounded-xl border border-success-base/40 bg-success-bg p-4 flex flex-col gap-stack-xs">
          <p className="text-caption font-bold text-success-fg m-0">
            {done} décision{done > 1 ? 's' : ''} prise{done > 1 ? 's' : ''} — à me transmettre pour application
          </p>
          <pre className="text-micro text-ink-800 m-0 whitespace-pre-wrap font-mono">{recap}</pre>
        </div>
      )}
    </section>
  );
};

/**
 * Atelier — compose un bouton ou une card à la main : fond, texte, bordure,
 * par état. Le contraste se recalcule à chaque changement, sur les vrais tokens
 * résolus à l'exécution. C'est le bac à sable qui manquait : tâtonner tout en
 * voyant si ça passe, sans éditer de code ni perdre le filet de mesure.
 */
const Atelier: React.FC = () => {
  const resolve = useCallback((token: string): string => {
    if (token === 'transparent' || token === 'none') return 'transparent';
    if (typeof document === 'undefined') return '#000';
    const v = getComputedStyle(document.documentElement).getPropertyValue(token).trim();
    return v || '#000';
  }, []);

  const [target, setTarget] = useState<'bouton' | 'card'>('bouton');
  const [surface, setSurface] = useState('--color-white');
  const [state, setState] = useState<AtelierState>('repos');

  // Une spec par état — on peut régler chaque état indépendamment.
  const [specs, setSpecs] = useState<Record<AtelierState, StateSpec>>({
    repos:  { fill: '--color-primary-900', text: '--color-ink-0', border: 'none', width: 0 },
    survol: { fill: '--color-primary-800', text: '--color-ink-0', border: 'none', width: 0 },
    actif:  { fill: '--color-primary-900', text: '--color-ink-0', border: 'none', width: 0 },
  });
  const cur = specs[state];
  const setCur = (patch: Partial<StateSpec>) =>
    setSpecs((s) => ({ ...s, [state]: { ...s[state], ...patch } }));

  // Typo : une seule valeur (ne change pas selon l'état d'interaction).
  const [typo, setTypo] = useState({ font: 'body' as 'display' | 'body', px: 15, weight: 600, tracking: '0' });

  // Contrastes, lus sur les valeurs résolues.
  const fillHex = resolve(cur.fill === 'transparent' ? surface : cur.fill);
  const textC = contrast(resolve(cur.text), fillHex);
  const pageHex = resolve(surface);
  const edgeC = cur.border === 'none' || cur.width === 0
    ? null
    : contrast(resolve(cur.border), pageHex);

  // Seuil de texte conscient de la taille, de la graisse ET de la fonte.
  const large = isLargeForFont(typo.px, typo.weight, typo.font);
  const textNeed = large ? 3 : 4.5;
  const textPasses = textC >= textNeed;

  // Taille rendue de l'aperçu — pour le critère cible tactile, mesuré, pas supposé.
  const previewRef = React.useRef<HTMLElement>(null);
  const [size, setSize] = useState({ w: 0, h: 0 });
  useEffect(() => {
    const el = previewRef.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    setSize({ w: Math.round(r.width), h: Math.round(r.height) });
  }, [target, typo, cur, surface, state]);
  const minSide = Math.min(size.w, size.h);

  const previewStyle: React.CSSProperties = {
    background: cur.fill === 'transparent' ? 'transparent' : resolve(cur.fill),
    color: resolve(cur.text),
    border: cur.border === 'none' || cur.width === 0 ? 'none' : `${cur.width}px solid ${resolve(cur.border)}`,
    fontFamily: ATELIER_FONT[typo.font],
    fontSize: `${typo.px}px`,
    fontWeight: typo.weight,
    letterSpacing: typo.tracking,
    opacity: 1,
  };

  return (
    <section id="atelier" className="scroll-mt-24 flex flex-col gap-stack">
      <header className="flex flex-col gap-tight">
        <h2 className="flex items-center gap-stack-xs text-h3 font-bold tracking-headline text-ink-900">
          <span className="inline-flex items-center justify-center w-9 h-9 rounded-lg bg-primary-50 text-primary-700 shrink-0">
            <FlaskConical size={18} strokeWidth={2} />
          </span>
          Atelier — composer et tester
        </h2>
        <p className="text-body-sm text-ink-600 m-0 max-w-prose">
          Choisis un fond, un texte, une bordure, pour chaque état. Le contraste se
          recalcule en direct sur les vrais tokens. Aucune valeur codée : tout est lu à l'exécution.
        </p>
      </header>

      <div className="rounded-xl border border-ink-200 bg-white p-4 flex flex-col gap-stack">
        {/* barre de contrôle : cible · surface · état */}
        <div className="flex flex-wrap items-center gap-stack">
          <div className="inline-flex rounded-pill bg-ink-100 p-1">
            {(['bouton', 'card'] as const).map((t) => (
              <button
                key={t}
                type="button"
                onClick={() => setTarget(t)}
                aria-pressed={target === t}
                className={['rounded-pill px-3 h-8 text-caption font-semibold capitalize', target === t ? 'bg-white text-primary-800 shadow-xs' : 'text-ink-600'].join(' ')}
              >
                {t}
              </button>
            ))}
          </div>

          <label className="flex items-center gap-1.5 text-caption text-ink-600">
            page
            <select
              value={surface}
              onChange={(e) => setSurface(e.target.value)}
              className="h-8 rounded-md border border-ink-200 bg-white px-2 text-caption text-ink-900"
            >
              {SURFACE_OPTIONS.map((s) => <option key={s.css} value={s.css}>{s.label}</option>)}
            </select>
          </label>

          <div className="inline-flex rounded-pill bg-ink-100 p-1">
            {(['repos', 'survol', 'actif'] as AtelierState[]).map((s) => (
              <button
                key={s}
                type="button"
                onClick={() => setState(s)}
                aria-pressed={state === s}
                className={['rounded-pill px-3 h-8 text-caption font-semibold', state === s ? 'bg-white text-primary-800 shadow-xs' : 'text-ink-600'].join(' ')}
              >
                {s}
              </button>
            ))}
          </div>
        </div>

        {/* aperçu sur la page choisie + verdicts */}
        <div className="flex flex-wrap items-center gap-stack-lg rounded-lg p-6" style={{ background: pageHex }}>
          {target === 'bouton' ? (
            <span
              ref={previewRef as React.RefObject<HTMLSpanElement>}
              className="inline-flex items-center justify-center h-touch px-5 rounded-pill"
              style={previewStyle}
            >
              Reprendre
            </span>
          ) : (
            <div
              ref={previewRef as React.RefObject<HTMLDivElement>}
              className="w-56 rounded-xl p-4 flex flex-col gap-stack-xs"
              style={{ ...previewStyle, fontFamily: undefined, fontSize: undefined, fontWeight: undefined, letterSpacing: undefined }}
            >
              <span style={{ color: resolve(cur.text), fontFamily: ATELIER_FONT[typo.font], fontSize: `${typo.px}px`, fontWeight: typo.weight, letterSpacing: typo.tracking, lineHeight: 1.3 }}>
                Titre de card
              </span>
              <span className="text-caption" style={{ color: resolve(cur.text), opacity: 0.75, fontFamily: ATELIER_FONT.body }}>Étape 2 sur 5</span>
            </div>
          )}
          {/* ── Panneau WCAG en direct ─────────────────────────────────── */}
          {(() => {
            const CHECKS: { sc: string; label: string; level: 'AA' | 'AAA'; value: string; pass: boolean | null; detail: string }[] = [
              {
                sc: '1.4.3', label: 'Contraste du texte', level: 'AA',
                value: `${fmt(textC)} / ${textNeed.toFixed(1).replace('.', ',')}`, pass: textPasses,
                detail: large ? `grand texte${typo.font === 'display' ? ` — Spartan pèse ${((typo.px * 0.41) / 0.493).toFixed(0)}px` : ''}` : 'texte normal',
              },
              {
                sc: '1.4.6', label: 'Contraste renforcé', level: 'AAA',
                value: `${fmt(textC)} / ${(large ? 4.5 : 7).toFixed(1).replace('.', ',')}`, pass: textC >= (large ? 4.5 : 7),
                detail: 'seuil AAA',
              },
              {
                sc: '1.4.11', label: 'Contraste de la bordure', level: 'AA',
                value: edgeC === null ? '—' : `${fmt(edgeC)} / 3,0`, pass: edgeC === null ? null : edgeC >= 3,
                detail: edgeC === null ? 'pas de bordure' : 'contour vs page',
              },
              {
                sc: '2.5.8', label: 'Cible tactile', level: 'AA',
                value: minSide ? `${minSide}px / 24px` : '…', pass: minSide ? minSide >= 24 : null,
                detail: `${size.w}×${size.h}px rendu`,
              },
              {
                sc: '2.5.5', label: 'Cible tactile', level: 'AAA',
                value: minSide ? `${minSide}px / 44px` : '…', pass: minSide ? minSide >= 44 : null,
                detail: 'cible TLS',
              },
            ];
            return (
              <div className="rounded-lg bg-white/95 p-3 min-w-[16rem] flex flex-col gap-1">
                <span className="text-micro font-extrabold uppercase tracking-[0.07em] text-ink-700">WCAG en direct</span>
                {CHECKS.map((c) => (
                  <div key={c.sc + c.level} className="flex items-center gap-stack-xs text-micro">
                    <span className={[
                      'w-4 h-4 rounded-pill grid place-items-center shrink-0 text-white text-[9px] font-bold',
                      c.pass === null ? 'bg-ink-300' : c.pass ? 'bg-success-base' : 'bg-danger-base',
                    ].join(' ')}>
                      {c.pass === null ? '–' : c.pass ? '✓' : '✗'}
                    </span>
                    <span className="font-mono text-ink-500 w-9 shrink-0">{c.sc}</span>
                    <span className="text-ink-800 flex-1 min-w-0 truncate">{c.label} <span className="text-ink-400">{c.level}</span></span>
                    <span className="tabular-nums text-ink-700 font-semibold shrink-0">{c.value}</span>
                  </div>
                ))}
                <span className="text-micro text-ink-400 mt-0.5">
                  {typo.font === 'display' ? 'Spartan' : 'Nunito'} {typo.px}px/{typo.weight} · {large ? 'grand texte 3,0' : 'normal 4,5'}
                </span>
              </div>
            );
          })()}
        </div>

        {/* presets de rôle + réglages typo */}
        <div className="flex flex-col gap-stack-xs border-t border-ink-100 pt-stack">
          <span className="text-micro font-bold uppercase tracking-[0.06em] text-ink-500">Rôle typo (preset)</span>
          <div className="flex flex-wrap gap-1">
            {ATELIER_ROLES.map((r) => {
              const on = typo.font === r.font && typo.px === r.px && typo.weight === r.weight;
              return (
                <button
                  key={r.name}
                  type="button"
                  onClick={() => setTypo({ font: r.font, px: r.px, weight: r.weight, tracking: r.tracking })}
                  aria-pressed={on}
                  className={['rounded-md px-2.5 h-7 text-micro font-semibold border', on ? 'border-primary-600 bg-primary-50 text-primary-800' : 'border-ink-200 text-ink-600 hover:border-ink-300'].join(' ')}
                >
                  {r.name}
                </button>
              );
            })}
          </div>
          <div className="flex flex-wrap items-end gap-stack">
            <label className="flex flex-col gap-1 text-micro font-bold uppercase tracking-[0.06em] text-ink-500">
              fonte
              <div className="inline-flex rounded-pill bg-ink-100 p-1">
                {(['display', 'body'] as const).map((f) => (
                  <button
                    key={f}
                    type="button"
                    onClick={() => setTypo((t) => ({ ...t, font: f }))}
                    aria-pressed={typo.font === f}
                    className={['rounded-pill px-3 h-7 text-micro font-semibold', typo.font === f ? 'bg-white text-primary-800 shadow-xs' : 'text-ink-600'].join(' ')}
                  >
                    {f === 'display' ? 'Spartan' : 'Nunito'}
                  </button>
                ))}
              </div>
            </label>
            <label className="flex flex-col gap-1 text-micro font-bold uppercase tracking-[0.06em] text-ink-500">
              taille {typo.px}px
              <input
                type="range" min={11} max={48} step={1} value={typo.px}
                onChange={(e) => setTypo((t) => ({ ...t, px: Number(e.target.value) }))}
                className="w-40"
              />
            </label>
            <label className="flex flex-col gap-1 text-micro font-bold uppercase tracking-[0.06em] text-ink-500">
              graisse
              <div className="inline-flex gap-0.5">
                {[400, 500, 600, 700, 800].map((w) => (
                  <button
                    key={w}
                    type="button"
                    onClick={() => setTypo((t) => ({ ...t, weight: w }))}
                    aria-pressed={typo.weight === w}
                    className={['rounded-md px-2 h-7 text-micro font-bold tabular-nums border', typo.weight === w ? 'border-primary-600 bg-primary-50 text-primary-800' : 'border-ink-200 text-ink-600'].join(' ')}
                  >
                    {w}
                  </button>
                ))}
              </div>
            </label>
          </div>
        </div>

        {/* pickers pour l'état courant */}
        <div className="flex flex-col gap-stack">
          <SwatchPicker label={`fond · ${state}`} value={cur.fill} allowNone="transparent" onPick={(t) => setCur({ fill: t })} resolve={resolve} />
          <SwatchPicker label={`texte · ${state}`} value={cur.text} onPick={(t) => setCur({ text: t })} resolve={resolve} />
          <SwatchPicker label={`bordure · ${state}`} value={cur.border} allowNone="none" onPick={(t) => setCur({ border: t, width: cur.width === 0 ? 1.5 : cur.width })} resolve={resolve} />
          <label className="flex items-center gap-stack-xs text-caption text-ink-600">
            épaisseur bordure
            {[0, 1, 1.5, 2].map((w) => (
              <button
                key={w}
                type="button"
                onClick={() => setCur({ width: w })}
                aria-pressed={cur.width === w}
                className={['rounded-md px-2.5 h-7 text-micro font-bold tabular-nums border', cur.width === w ? 'border-primary-600 bg-primary-50 text-primary-800' : 'border-ink-200 text-ink-600'].join(' ')}
              >
                {w}px
              </button>
            ))}
          </label>
        </div>

        <p className="text-micro text-ink-500 m-0">
          Le <strong className="font-bold text-ink-700">focus</strong> est déjà réglé (anneau bicolore, section boutons) et le{' '}
          <strong className="font-bold text-ink-700">désactivé</strong> est exempté par WCAG — d'où les trois états ici.
        </p>
      </div>
    </section>
  );
};

const DesignLab: React.FC = () => {
  const [applied, setApplied] = useState(false);
  const [tick, setTick] = useState(0);

  // Injecte dans <head> : la proposition survit à la navigation SPA, donc on
  // peut aller juger sur /dashboard puis revenir.
  useEffect(() => {
    const existing = document.getElementById(STYLE_ID);
    if (applied) {
      if (!existing) {
        const el = document.createElement('style');
        el.id = STYLE_ID;
        el.textContent = PROPOSAL_CSS;
        document.head.appendChild(el);
      }
    } else {
      existing?.remove();
    }
    setTick((t) => t + 1);
  }, [applied]);

  // PAS de nettoyage au démontage : il se déclencherait en quittant /_design-lab,
  // c'est-à-dire au moment exact où l'aperçu doit servir. L'override vit jusqu'au
  // rechargement de page, ou jusqu'à ce qu'on le retire ici.

  // Essais bouton — plusieurs peuvent être actifs ensemble (ghost + primary…)
  const [trials, setTrials] = useState<string[]>([]);
  useEffect(() => {
    document.getElementById(TRIAL_STYLE_ID)?.remove();
    if (!trials.length) return;
    const el = document.createElement('style');
    el.id = TRIAL_STYLE_ID;
    el.textContent = trials.map((k) => BTN_TRIALS[k].css).join('\n');
    document.head.appendChild(el);
  }, [trials]);
  // Même raison : pas de nettoyage au démontage, sinon l'essai meurt en sortant du lab.

  const toggleTrial = useCallback((k: string) => {
    setTrials((cur) => {
      // A et B de la même famille s'excluent
      const fam = k.split('-')[0];
      const without = cur.filter((c) => c === k || c.split('-')[0] !== fam);
      return without.includes(k) ? without.filter((c) => c !== k) : [...without, k];
    });
  }, []);

  const radii = useLiveTokens([...RADIUS_TOKENS]);
  const greys = useLiveTokens([...TEXT_GREYS]);
  const greysAll = useLiveTokens(INK_RAMP.map((i) => `--color-ink-${i}`));
  const surfaces = useLiveTokens(SURFACES.map((s) => s.varName));
  const btnTokens = useLiveTokens(
    Object.values(BUTTON_OPTIONS).flatMap((cases) => cases.flatMap((c) => [c.restVar, c.hoverVar])),
  );
  const ink900 = useLiveTokens(['--color-ink-900', '--color-white']);

  /**
   * Saut instantané, volontairement.
   *
   * `scrollIntoView` est écarté : il cible le plus proche ancêtre scrollable, ce
   * qui casse dès qu'un wrapper porte `overflow:auto` sans pouvoir scroller (le
   * cas du wrapper de route partagé des autres labs). On calcule donc la cible
   * nous-mêmes, avec le décalage d'en-tête.
   *
   * `behavior:'smooth'` est écarté aussi : mesuré au navigateur, il est ignoré
   * *silencieusement* par certains moteurs — aucune erreur, aucun scroll. Un
   * filet via `requestAnimationFrame` ne rattrape rien non plus, rAF étant
   * suspendu dans les onglets masqués. Pour une nav de 4 sections, l'animation
   * est de la décoration : elle ne porte aucun état. On la retire plutôt que de
   * dépendre de deux mécanismes non garantis.
   */
  const scrollTo = useCallback((id: string) => {
    const el = document.getElementById(id);
    if (!el) return;
    const top = Math.max(0, el.getBoundingClientRect().top + window.scrollY - HEADER_OFFSET);
    window.scrollTo(0, top);
  }, []);

  const white = ink900['--color-white'] || '#ffffff';
  const ink = ink900['--color-ink-900'] || '#252b37';

  // `radius-3xl` est-il vraiment un doublon de `2xl` ? Vérifié à l'exécution,
  // pas affirmé : les deux valeurs sont résolues puis comparées en px.
  const px = (v: string) => (v.endsWith('rem') ? parseFloat(v) * 16 : parseFloat(v));
  const isDuplicate = px(radii['--radius-2xl']) === px(radii['--radius-3xl']);

  return (
    <div className="min-h-[100dvh] w-full bg-ink-25 font-body">
      {/* ── En-tête sticky ──────────────────────────────────────────────── */}
      <header className="sticky top-0 z-sticky border-b border-ink-200 bg-white/90 backdrop-blur-glass-medium">
        <div className="mx-auto max-w-page px-4 sm:px-6 py-2 flex items-center gap-stack-xs">
          <h1 className="text-body-sm font-bold tracking-snug text-ink-900 shrink-0 mr-1">Design Lab</h1>

          {/* Une seule ligne qui défile — 13 onglets ne doivent pas wrapper en
              un pavé qui mange le sticky. `-mx-1 px-1` pour que le focus ring ne
              soit pas clippé par overflow-x. */}
          <nav
            className="flex items-center gap-0.5 overflow-x-auto -mx-1 px-1 max-w-full sm:max-w-[60%]"
            aria-label="Sections du lab"
          >
            {NAV.map((n) => (
              <button
                key={n.id}
                type="button"
                onClick={() => scrollTo(n.id)}
                className="inline-flex items-center h-8 rounded-pill px-2.5 text-micro font-semibold whitespace-nowrap text-ink-600 hover:bg-primary-50 hover:text-primary-800 transition-colors duration-fast cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500"
              >
                {n.label}
              </button>
            ))}
          </nav>

          <button
            type="button"
            onClick={() => setApplied((a) => !a)}
            aria-pressed={applied}
            title={applied ? 'Proposition typo/rayon active — cliquer pour revenir' : 'Appliquer la proposition typo/rayon à toute l\'app'}
            className={[
              'shrink-0 inline-flex items-center gap-1 rounded-pill px-3 h-8 text-micro font-bold whitespace-nowrap transition-colors duration-fast cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500',
              applied
                ? 'bg-primary-700 text-white hover:bg-primary-800'
                : 'bg-ink-100 text-ink-800 hover:bg-ink-200',
            ].join(' ')}
          >
            {applied ? <RotateCcw size={14} strokeWidth={2.4} /> : <Check size={14} strokeWidth={2.4} />}
            {applied ? 'Proposition active' : 'Appliquer'}
          </button>
        </div>

        {/* Essais bouton — chips d'une ligne, détail en tooltip. Appliqués à
            toute l'app pendant la navigation. */}
        <div className="mx-auto max-w-page px-4 sm:px-6 pb-2 flex items-center gap-1.5 overflow-x-auto">
          <span className="text-micro font-bold uppercase tracking-[0.07em] text-ink-500 mr-0.5 shrink-0">
            Essayer :
          </span>
          {Object.entries(BTN_TRIALS).map(([k, t]) => {
            const on = trials.includes(k);
            return (
              <button
                key={k}
                type="button"
                aria-pressed={on}
                title={t.hint}
                onClick={() => toggleTrial(k)}
                className={[
                  'inline-flex items-center h-7 rounded-pill border px-2.5 text-micro font-semibold whitespace-nowrap shrink-0 transition-colors duration-fast cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500',
                  on
                    ? 'border-primary-600 bg-primary-50 text-primary-900'
                    : 'border-ink-200 bg-white text-ink-600 hover:border-ink-300 hover:text-ink-900',
                ].join(' ')}
              >
                {on && <Check size={14} strokeWidth={2.6} className="mr-1" />}
                {t.label}
              </button>
            );
          })}
          {trials.length > 0 && (
            <button
              type="button"
              onClick={() => setTrials([])}
              className="inline-flex items-center gap-1 rounded-pill px-2 h-7 text-micro font-semibold text-ink-600 hover:bg-ink-100 hover:text-ink-900 transition-colors duration-fast cursor-pointer shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500"
            >
              <X size={14} strokeWidth={2.5} /> Retirer
            </button>
          )}
        </div>

        {(applied || trials.length > 0) && (
          <p className="bg-primary-50 px-4 sm:px-6 py-1.5 text-micro text-primary-800 m-0 text-center">
            Injecté dans <code>&lt;head&gt;</code> : va voir sur{' '}
            <a className="underline font-bold" href="/dashboard">/dashboard</a>,{' '}
            <a className="underline font-bold" href="/learning-paths">/learning-paths</a> ou{' '}
            <a className="underline font-bold" href="/coaching">/coaching</a> — l'essai suit la navigation
            et disparaît au rechargement.
          </p>
        )}
      </header>

      <main className="mx-auto max-w-page px-4 sm:px-6 py-section flex flex-col gap-section-lg">
        {/* ── 0. Décisions à trancher ──────────────────────────────────── */}
        <DecisionPanel onJump={scrollTo} />

        {/* ── 0 bis. Atelier — bac à sable ─────────────────────────────── */}
        <Atelier />

        {/* ── 1 ter. Les deux fontes ───────────────────────────────────── */}
        <Section
          id="fonts"
          icon={<Type size={18} strokeWidth={2} />}
          title="League Spartan × Nunito — ce que les métriques imposent"
          intro="Les deux fontes sont variables (Spartan 100–900, Nunito 200–1000 + italique). Métriques relevées au canvas, pas décrites de mémoire : ce sont elles qui dictent les combos ci-dessous."
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-stack-lg">
            <div className="rounded-xl border border-ink-200 bg-white overflow-x-auto">
              <table className="w-full border-collapse text-caption">
                <thead>
                  <tr className="border-b border-ink-200">
                    <th className="text-left px-4 py-2.5 font-bold text-ink-900">Métrique (à 100px)</th>
                    <th className="text-right px-3 py-2.5 font-bold text-ink-900 whitespace-nowrap">L. Spartan</th>
                    <th className="text-right px-3 py-2.5 font-bold text-ink-900">Nunito</th>
                  </tr>
                </thead>
                <tbody>
                  {FONT_METRICS.map((m) => (
                    <tr key={m.label} className="border-b border-ink-100 last:border-b-0">
                      <th scope="row" className="text-left px-4 py-2.5 font-normal align-top">
                        <span className="font-semibold text-ink-800">{m.label}</span>
                        <br />
                        <span className="text-micro text-ink-500">{m.note}</span>
                      </th>
                      <td className="px-3 py-2.5 text-right tabular-nums font-bold text-ink-900 align-top">{m.ls}{m.unit}</td>
                      <td className="px-3 py-2.5 text-right tabular-nums font-bold text-ink-900 align-top">{m.nu}{m.unit}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="flex flex-col gap-stack">
              <Panel label="Couverture d’encre — base Nunito 700 = 1,000" tone="proposed">
                <ul className="flex flex-col m-0 p-0 list-none">
                  {INK.map((i) => (
                    <li key={i.w} className="flex items-center gap-stack-xs py-1.5 border-b border-ink-100 last:border-b-0">
                      <span className="w-10 shrink-0 text-caption font-bold text-ink-700 tabular-nums">{i.w}</span>
                      <span className="flex-1 text-micro text-ink-500">Spartan <strong className="text-ink-800 tabular-nums">{i.ls.toFixed(3)}</strong></span>
                      <span className="flex-1 text-micro text-ink-500">Nunito <strong className="text-ink-800 tabular-nums">{i.nu.toFixed(3)}</strong></span>
                    </li>
                  ))}
                </ul>
                <p className="text-caption text-ink-600 m-0 mt-stack-xs">
                  À graisse égale, <strong className="font-bold text-ink-900">l’encre est la même</strong> (700 → 1,017 contre
                  1,000). Les graisses se correspondent <strong className="font-bold text-ink-900">1:1</strong>, sans
                  compensation. Ce qu’on prend pour de la densité chez Spartan, c’est sa largeur : la même encre dans 91 % de
                  la place.
                </p>
              </Panel>

              <div className="rounded-xl border border-primary-200 bg-primary-50 p-4">
                <p className="text-caption text-primary-900 m-0">
                  <strong className="font-bold">Les trois règles qui en découlent.</strong>
                </p>
                <ol className="text-caption text-primary-900 m-0 mt-stack-xs pl-4 flex flex-col gap-1">
                  <li>
                    <strong className="font-bold">Compensation optique :</strong> l’écart de hauteur d’x est de{' '}
                    <strong className="font-bold">17 %</strong>, au-delà du seuil de 10 % au-delà duquel la littérature
                    impose de compenser. À niveau visuel égal, Spartan prend <strong className="font-bold">+1 à +2 px</strong>.
                  </li>
                  <li>
                    <strong className="font-bold">Graisses 1:1 :</strong> mesuré, aucune compensation.
                  </li>
                  <li>
                    <strong className="font-bold">Eyebrow en Nunito, pas en Spartan :</strong> à 11 px, la hauteur d’x de
                    Spartan (62 % de sa capitale) descend sous le seuil de lisibilité. Nunito (69 %) tient.
                  </li>
                </ol>
              </div>
            </div>
          </div>

          <Panel label="Le système de rôles proposé" tone="proposed">
            <ul className="flex flex-col m-0 p-0 list-none">
              {TYPE_ROLES.map((r) => <RoleSpecimen key={r.role} r={r} />)}
            </ul>
          </Panel>

          <p className="text-caption text-ink-600 m-0">
            <strong className="font-bold text-ink-900">Le changement de fond est le titre de card :</strong> aujourd’hui
            Nunito 15/700 (la paire la plus fréquente du dashboard). Proposé : <strong className="font-bold text-ink-900">League
            Spartan 18/600</strong>. On gagne un vrai écart de taille avec la méta 13 px (×1,38), on met la fonte display là
            où elle sert, et on <em>baisse</em> la graisse — ce qui commence à résorber les 43 % de <code>font-bold</code>.
          </p>
        </Section>

        {/* ── 1 quater. Taille optique ─────────────────────────────────── */}
        <Section
          id="optical"
          icon={<Ruler size={18} strokeWidth={2} />}
          title="Taille optique — pourquoi h3 doit passer à 24 px"
          intro="WCAG relâche le seuil de contraste à 3,0 pour le « grand texte » : ≥ 18,66 px en graisse ≥ 700. Mais la norme prévoit sa propre réserve — « si la police est inhabituellement fine ou décorative, une taille supérieure peut être nécessaire ». League Spartan tombe dedans."
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-stack-lg">
            <Panel label="Même taille nominale, présence différente" tone="current">
              <XHeightSpecimen
                items={[
                  { font: 'body', px: 22, label: '' },
                  { font: 'display', px: 22, label: '' },
                  { font: 'body', px: Math.round(spartanToNunito(22)), label: '', muted: true },
                ]}
              />
              <SpecimenLegend
                items={[
                  { label: 'Nunito 22 — référence' },
                  { label: 'Spartan 22 — plus petite' },
                  { label: `Nunito ${spartanToNunito(22).toFixed(0)} — l’équivalent`, muted: true },
                ]}
              />
              <p className="text-caption text-ink-600 m-0 mt-stack-xs">
                Spartan 22 px se lit comme du Nunito{' '}
                <strong className="font-bold text-ink-900 tabular-nums">{spartanToNunito(22).toFixed(1)} px</strong> —
                sous la barre WCAG de {String(WCAG_BOLD_PX).replace('.', ',')} px.
              </p>
            </Panel>

            <Panel label="À 24 px, Spartan repasse le seuil" tone="proposed">
              <XHeightSpecimen
                items={[
                  { font: 'body', px: WCAG_BOLD_PX, label: '', muted: true },
                  { font: 'display', px: 22, label: '', muted: true },
                  { font: 'display', px: 24, label: '' },
                ]}
              />
              <SpecimenLegend
                items={[
                  { label: 'Nunito 18,66 — le seuil', muted: true },
                  { label: 'Spartan 22 — en dessous', muted: true },
                  { label: 'Spartan 24 — au-dessus' },
                ]}
              />
              <p className="text-caption text-ink-600 m-0 mt-stack-xs">
                Le premier mot est le seuil lui-même, en Nunito {String(WCAG_BOLD_PX).replace('.', ',')} px. Il faut{' '}
                <strong className="font-bold text-ink-900 tabular-nums">
                  {((WCAG_BOLD_PX * XH.nunito) / XH.spartan).toFixed(1)} px
                </strong>{' '}
                de Spartan pour l’atteindre — d’où 24.
              </p>
            </Panel>
          </div>

          {/* h3 en situation */}
          <p className="text-micro font-extrabold uppercase tracking-[0.07em] text-ink-700 m-0 mt-stack">
            En situation — un titre de section
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-stack-lg">
            {[22, 24].map((px) => (
              <div key={px} className="rounded-xl border border-ink-200 bg-white p-4 flex flex-col gap-stack-xs">
                <p className="text-micro text-ink-500 m-0 tabular-nums">
                  h3 à {px} px {px === 24 && <span className="text-success-fg font-bold">— proposé</span>}
                </p>
                <h4
                  className="text-ink-900"
                  style={{ fontFamily: "'League Spartan', sans-serif", fontSize: `${px}px`, fontWeight: 700, letterSpacing: '-0.025em', lineHeight: 1.35 }}
                >
                  Prochaine session
                </h4>
                <p className="text-caption text-ink-500 m-0 leading-snug">
                  Cette semaine · 14:30 · 45 min · Visio
                </p>
                <div className="flex gap-stack-xs mt-stack-xs text-micro tabular-nums">
                  <span className="text-ink-500">≈ Nunito {spartanToNunito(px).toFixed(1)} px</span>
                  <span className={px >= 22.4 ? 'text-success-fg font-bold' : 'text-danger-fg font-bold'}>
                    {px >= 22.4 ? 'seuil 3,0 mérité' : 'seuil 4,5 à appliquer'}
                  </span>
                </div>
              </div>
            ))}
          </div>

          <p className="text-caption text-ink-600 m-0">
            <strong className="font-bold text-ink-900">Deux mesures indépendantes tombent au même endroit.</strong>{' '}
            Le seuil de contraste demande 22,4 px ; la compensation optique face à Nunito (+8 % sur la hauteur de
            capitale) demande 23,8 px. D’où <strong className="font-bold text-ink-900">24</strong>. Au passage
            l’échelle y gagne : h4→h3 passe de ×1,22 à ×1,33.
          </p>
        </Section>

        {/* ── 1. Typographie ───────────────────────────────────────────── */}
        <Section
          id="typo"
          icon={<Type size={18} strokeWidth={2} />}
          title="Échelle typographique"
          intro="79 % de la typo tient aujourd'hui dans trois tokens séparés par 3 px. Le pas body-sm→body est à ×1,07, très en dessous du plancher 1,125 du registre produit. La proposition retire body-sm (absorbé par body) et h5 (même taille que body)."
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-stack-lg">
            <Panel label="A · Actuelle — 10 tokens" tone="current">
              <ScaleTable rows={CURRENT_SCALE} />
            </Panel>
            <Panel label="B · Proposée — 8 tokens" tone="proposed">
              <ScaleTable rows={PROPOSED_SCALE} />
            </Panel>
          </div>
          <p className="text-caption text-ink-600 m-0">
            Il reste un <strong className="font-bold text-ink-900">×1,00</strong> assumé : <code>h4</code> et{' '}
            <code>body-lg</code> sont tous deux à 18 px. Ils diffèrent par la graisse et l'interligne, pas par la
            taille.
          </p>
        </Section>

        {/* ── 1 bis. Graisses ──────────────────────────────────────────── */}
        <Section
          id="weights"
          icon={<Bold size={18} strokeWidth={2} />}
          title="Graisses"
          intro="Une convention existe déjà, tokenisée dans index.css (h1/h2 = 700, h3/h4/h5 = 600). Le problème n'est pas qu'il manque des tokens : c'est que le code les contredit majoritairement. Et comme l'échelle de tailles est plate, la graisse porte seule la hiérarchie."
        >
          <div className="rounded-xl border border-ink-200 bg-white p-4 flex flex-col gap-stack">
            <WeightSpecimen px={13} weights={[400, 500, 600, 700]} label="13 px — les 4 graisses observées sur un même écran du dashboard" />
            <WeightSpecimen px={15} weights={[400, 600]} label="15 px — 2 graisses, même écran" />
            <p className="text-caption text-ink-600 m-0">
              C'est le symptôme : à taille constante, la graisse doit tout distinguer. Rétablir l'écart de taille
              (section précédente) libère la graisse de ce travail.
            </p>
          </div>

          <div className="overflow-x-auto rounded-xl border border-ink-200 bg-white">
            <table className="w-full border-collapse text-caption">
              <thead>
                <tr className="border-b border-ink-200">
                  <th className="text-left px-4 py-2.5 font-bold text-ink-900">Rôle</th>
                  <th className="text-left px-4 py-2.5 font-bold text-ink-900">Le token dit</th>
                  <th className="text-left px-4 py-2.5 font-bold text-ink-900">Le code fait</th>
                  <th className="text-left px-4 py-2.5 font-bold text-ink-900">Verdict</th>
                </tr>
              </thead>
              <tbody>
                {WEIGHT_DIVERGENCE.map((r) => {
                  const top = r.usage[0];
                  const contradicts = r.token !== null && top.w !== r.token;
                  return (
                    <tr key={r.role} className="border-b border-ink-100 last:border-b-0">
                      <th scope="row" className="text-left px-4 py-2.5 font-semibold text-ink-800 whitespace-nowrap">
                        <code>{r.role}</code>
                      </th>
                      <td className="px-4 py-2.5 tabular-nums text-ink-700">{r.token ?? '—'}</td>
                      <td className="px-4 py-2.5 text-ink-700">
                        {r.usage.map((u) => `${u.w} (${u.pct}%)`).join(' · ')}
                      </td>
                      <td className="px-4 py-2.5">
                        {r.token === null ? (
                          <span className="text-ink-500">aucune convention</span>
                        ) : contradicts ? (
                          <span className="font-bold text-danger-fg">le code contredit le token</span>
                        ) : (
                          <span className="font-bold text-success-fg">cohérent</span>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          <Panel label="Proposition — des rôles nommés, pas une échelle numérique" tone="proposed">
            <ul className="flex flex-col m-0 p-0 list-none gap-stack-xs">
              {WEIGHT_ROLES.map((r) => (
                <li key={r.name} className="flex items-baseline gap-stack-xs border-b border-ink-100 last:border-b-0 pb-1.5">
                  <code className="text-caption font-bold text-primary-800 w-40 shrink-0">--weight-{r.name}</code>
                  <span className="text-body-sm text-ink-900 w-12 shrink-0 tabular-nums" style={{ fontWeight: r.w }}>
                    {r.w}
                  </span>
                  <span className="text-caption text-ink-600 flex-1 min-w-0">{r.forWhat}</span>
                  <span className="text-micro text-ink-500 tabular-nums shrink-0">{r.uses} usages</span>
                </li>
              ))}
            </ul>
            <p className="text-caption text-ink-600 m-0 mt-stack-xs">
              <code>font-black</code> (900) n'y figure pas : <strong className="font-bold text-ink-900">13 usages</strong>,
              dispersés, jamais sur des titres de héros. Confirmé bruit.
            </p>
          </Panel>

          <p className="text-caption text-ink-600 m-0">
            <strong className="font-bold text-ink-900">La décision qui bloque tout le reste :</strong> pour{' '}
            <code>h3</code> et <code>h4</code>, le token dit 600 et le code dit 700 à 60–70 %. Soit on aligne le token
            sur l'usage (le code a déjà voté), soit on corrige les ~160 sites. Tant que ce n'est pas tranché, nommer
            les rôles ne sert à rien : ils décriraient une convention que le code ne suit pas.
          </p>
        </Section>

        {/* ── 2 bis. Composition de card ───────────────────────────────── */}
        <Section
          id="cards"
          icon={<LayoutGrid size={18} strokeWidth={2} />}
          title="Composition de card"
          intro="45 fichiers portent « Card » dans leur nom. Avant de les rationaliser, il faut fixer l'anatomie : eyebrow, titre, méta, action. Aujourd'hui titre et méta sont séparés de 2 px — c'est la graisse qui fait tout le travail."
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-stack-lg">
            {COMPOSITIONS.map((c, i) => (
              <div key={c.label} className="flex flex-col gap-stack-xs min-w-0">
                <p
                  className={[
                    'text-micro font-extrabold uppercase tracking-[0.07em] m-0',
                    i === 0 ? 'text-danger-fg' : 'text-success-fg',
                  ].join(' ')}
                >
                  {c.label}
                </p>
                <p className="text-micro text-ink-500 m-0 min-h-[2.5rem]">{c.note}</p>
                <DemoCard c={c} greyMeta={greys['--color-ink-500'] || '#6b7280'} />
                <p className="text-micro text-ink-400 m-0 tabular-nums">
                  rayon {c.radius}px · gap {c.gap}px
                </p>
              </div>
            ))}
          </div>
          <p className="text-caption text-ink-600 m-0">
            <strong className="font-bold text-ink-900">Ce que la comparaison montre :</strong> en A, titre et méta ne se
            distinguent que par la graisse. En B, l'écart de taille (×1,38) fait le travail. En C, on peut alors
            <em> relâcher</em> la graisse du titre à 600 sans rien perdre — ce qui commence à résorber les 43 % de{' '}
            <code>font-bold</code> de l'app.
          </p>
        </Section>

        {/* ── 2. Rayons ────────────────────────────────────────────────── */}
        <Section
          id="radius"
          icon={<Square size={18} strokeWidth={2} />}
          title="Rayons de carte"
          intro="Trois rayons cohabitent aujourd'hui sur des cartes de même rôle (14, 20 et 24 px, mesurés au rendu). Il faut en choisir un. Par ailleurs radius-3xl semble dupliquer radius-2xl : la comparaison ci-dessous est faite à l'exécution, pas recopiée."
        >
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-stack">
            {RADIUS_TOKENS.map((t) => {
              const val = radii[t] || '0px';
              const dup = t === '--radius-3xl' && isDuplicate;
              return (
                <div key={t} className="flex flex-col gap-stack-xs min-w-0">
                  <p className="text-micro font-bold text-ink-900 m-0 truncate">
                    {t.replace('--radius-', 'rounded-')}
                  </p>
                  <p className={['text-micro m-0 tabular-nums', dup ? 'text-danger-fg font-bold' : 'text-ink-500'].join(' ')}>
                    {val}
                    {dup ? ' — doublon de 2xl' : ''}
                  </p>
                  <MiniCard radius={val} />
                </div>
              );
            })}
          </div>
          <p className="text-caption text-ink-600 m-0">
            <strong className="font-bold text-ink-900">rounded-pill vs rounded-pill :</strong> les deux rendent{' '}
            <em>exactement</em> la même chose ({readToken('--radius-pill') || '999px'} contre un pill infini). Une
            migration des 122 <code>rounded-pill</code> ne changerait aucun pixel — ce qui vaut le coup, c'est de
            corriger la règle, pas le code.
          </p>
        </Section>

        {/* ── 3 ter. Correction des 3 gros variants ────────────────────── */}
        <Section
          id="fix3"
          icon={<Wrench size={18} strokeWidth={2} />}
          title="Les trois gros variants — 369 usages sur 474"
          intro="ghost, primary et secondary font 79 % des boutons de l'app. Aucune de ces propositions n'utilise de fond saturé ni de label sombre sur couleur. Les cinq états sont rendus, ratios calculés à l'exécution."
        >
          {FIX_GROUPS.map((g) => (
            <div key={g.name} className="flex flex-col gap-stack-xs">
              <div className="flex items-baseline gap-stack-xs flex-wrap">
                <code className="text-body-sm font-bold text-ink-900">{g.name}</code>
                <span className="text-micro text-ink-500 tabular-nums">{g.uses} usages</span>
                <span className="text-caption text-ink-600">— {g.note}</span>
              </div>
              {g.candidates.map((c) => (
                <div key={c.label} className="rounded-xl border border-ink-200 bg-white p-4 flex flex-col gap-stack-xs">
                  <p
                    className={[
                      'text-micro font-extrabold uppercase tracking-[0.07em] m-0',
                      c.current ? 'text-danger-fg' : 'text-success-fg',
                    ].join(' ')}
                  >
                    {c.label}
                  </p>
                  <div className="flex flex-wrap gap-stack items-start">
                    {c.states.map((s) => {
                      const tx = contrast(s.tx, s.bg);
                      const ed = contrast(s.bd, '#ffffff');
                      return (
                        <div key={s.s} className="flex flex-col gap-1 items-start">
                          <span
                            className="inline-flex items-center justify-center h-touch px-5 rounded-pill font-body text-body-sm font-semibold"
                            style={{
                              background: s.bg,
                              color: s.tx,
                              border: `1.5px solid ${s.bd}`,
                              boxShadow: s.focus ? '0 0 0 3px rgba(74,143,161,0.45)' : undefined,
                              opacity: s.off ? 0.65 : 1,
                            }}
                          >
                            Reprendre
                          </span>
                          <span className="text-micro text-ink-400">{s.s}</span>
                          {s.off ? (
                            <span className="text-micro text-ink-400">exempté</span>
                          ) : (
                            <span className="text-micro tabular-nums">
                              <span className={tx >= 4.5 ? 'text-success-fg font-bold' : 'text-danger-fg font-bold'}>{fmt(tx)}</span>
                              <span className="text-ink-300"> / </span>
                              <span className={ed >= 3 ? 'text-success-fg font-bold' : 'text-danger-fg font-bold'}>{fmt(ed)}</span>
                            </span>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          ))}
          <p className="text-caption text-ink-600 m-0">
            Sous chaque bouton : <strong className="font-bold text-ink-900">contraste du texte</strong> puis{' '}
            <strong className="font-bold text-ink-900">contraste du contour contre la page</strong>. Le désactivé est
            exempté par WCAG — c'est le seul emploi légitime de <code>ink-400</code>.
          </p>
        </Section>

        {/* ── 2 ter. Inventaire des variants Card ──────────────────────── */}
        <Section
          id="cards-inv"
          icon={<LayoutGrid size={18} strokeWidth={2} />}
          title="Les 10 variants de Card, mesurés au rendu"
          intro="Vrai composant Card, sur sa surface. Comptage scopé au composant (le grep brut confondait Card, Button, DropdownMenu…). tinted et default portent l'essentiel. Après tri du 2026-07-24 : bordered/muted/sunken retirés (0 usage), glass-dark tokenisé."
        >
          <div className="rounded-xl border border-ink-200 bg-white px-4 py-2">
            {CARD_INVENTORY.map((c) => (
              <CardVariantRow key={c.v} v={c.v} uses={c.uses} surface={c.surface} note={c.note} tick={tick} />
            ))}
          </div>
          <p className="text-caption text-ink-600 m-0">
            Colonnes : contraste du <strong className="font-bold text-ink-900">titre</strong> (seuil 4,5) et de la{' '}
            <strong className="font-bold text-ink-900">bordure contre la page</strong> (3,0, uniquement si la card est
            un contrôle cliquable — sinon décoratif, « — »). Trois variants sont <strong className="font-bold text-ink-900">barrés
            car jamais utilisés</strong> ; <code>glass-dark</code> code 4 couleurs en dur.
          </p>
        </Section>

        {/* ── 3 bis. Inventaire des variants Button ────────────────────── */}
        <Section
          id="inventory"
          icon={<LayoutList size={18} strokeWidth={2} />}
          title="Les 13 variants de Button, mesurés au rendu"
          intro="Chaque variant est ici le vrai composant Button, posé sur la surface pour laquelle il est documenté. Les deux ratios sont lus sur le rendu — couleur calculée du label, fond effectif, couleur de bordure — pas déduits d'une table. (glass-brand retiré : doublon de ghost.)"
        >
          <div className="rounded-xl border border-ink-200 bg-white px-4 py-2">
            {BTN_INVENTORY.map((b) => (
              <VariantRow key={b.v} v={b.v} uses={b.uses} surface={b.surface} tick={tick} />
            ))}
          </div>
          <p className="text-caption text-ink-600 m-0">
            <strong className="font-bold text-ink-900">Deux seuils distincts.</strong> Le <em>texte</em> doit atteindre
            4,5 (WCAG 1.4.3). Le <em>contour</em> — bordure, ou à défaut le fond contre la page — doit atteindre 3,0
            (WCAG 1.4.11), sinon rien ne signale qu'il s'agit d'un bouton. Un variant peut être irréprochable sur le
            premier et invisible sur le second : c'est le cas de toute la famille teintée.
          </p>
        </Section>

        {/* ── 3. Boutons ───────────────────────────────────────────────── */}
        <Section
          id="buttons"
          icon={<MousePointerClick size={18} strokeWidth={2} />}
          title="Contraste des boutons pleins"
          intro="Les trois variants pleins échouent AA aujourd'hui, et le survol aggrave (le fill s'éclaircit). Ratios calculés en direct sur les tokens réels — seuil AA texte normal 4,5:1."
        >
          <div className="flex flex-col gap-stack-lg">
            {Object.entries(BUTTON_OPTIONS).map(([optName, cases]) => {
              const isCurrent = optName.startsWith('A');
              return (
                <div key={optName} className="flex flex-col gap-stack-xs">
                  <p
                    className={[
                      'text-micro font-extrabold uppercase tracking-[0.07em] m-0',
                      isCurrent ? 'text-danger-fg' : 'text-success-fg',
                    ].join(' ')}
                  >
                    {optName}
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-stack rounded-xl border border-ink-200 bg-white p-4">
                    {cases.map((c) => {
                      const fg = c.label === 'blanc' ? white : ink;
                      const rest = btnTokens[c.restVar] || '#000';
                      const hover = btnTokens[c.hoverVar] || '#000';
                      return (
                        <div key={c.role} className="flex flex-col gap-stack-xs min-w-0">
                          <p className="text-micro font-bold text-ink-700 m-0">{c.role}</p>
                          <div className="flex items-center gap-stack-xs flex-wrap">
                            <FakeButton bg={rest} fg={fg}>Reprendre</FakeButton>
                            <Verdict ratio={contrast(fg, rest)} />
                            <span className="text-micro text-ink-500">repos</span>
                          </div>
                          <div className="flex items-center gap-stack-xs flex-wrap">
                            <FakeButton bg={hover} fg={fg}>Reprendre</FakeButton>
                            <Verdict ratio={contrast(fg, hover)} />
                            <span className="text-micro text-ink-500">survol</span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
          <p className="text-caption text-ink-600 m-0">
            Le teal est le seul cas piégé : trop foncé pour un label ink-900, trop clair pour du blanc. C'est ce qui
            interdit une règle unique et justifie l'hybride.
          </p>
          <p className="text-caption text-ink-600 m-0">
            <strong className="font-bold text-ink-900">Le sens du survol dépend du label.</strong> Avec un label blanc
            il faut <em>assombrir</em> ; avec un label sombre il faut <em>éclaircir</em>, sinon le fond se rapproche du
            texte. Les variantes chaudes éclaircissent déjà au survol — en hybride, <strong className="font-bold text-ink-900">seule
            la couleur du label change</strong>, le fill et le survol restent tels quels.
          </p>
        </Section>

        {/* ── 4. Gris de texte ─────────────────────────────────────────── */}
        <Section
          id="greys"
          icon={<Baseline size={18} strokeWidth={2} />}
          title="Gris de texte sur surfaces claires"
          intro="ink-400 sert 309 fois à du texte et échoue partout. ink-500 le remplace — sauf sur les surfaces grises, où il échoue aussi. Ce tableau dit lequel choisir selon le fond."
        >
          <div className="overflow-x-auto rounded-xl border border-ink-200 bg-white">
            <table className="w-full border-collapse text-caption">
              <thead>
                <tr className="border-b border-ink-200">
                  <th className="text-left px-4 py-2.5 font-bold text-ink-900">Fond</th>
                  {TEXT_GREYS.map((g) => (
                    <th key={g} className="text-left px-4 py-2.5 font-bold text-ink-900 whitespace-nowrap">
                      {g.replace('--color-', '')}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {SURFACES.map((s) => {
                  const bg = surfaces[s.varName];
                  return (
                    <tr key={s.varName} className="border-b border-ink-100 last:border-b-0">
                      <th scope="row" className="text-left px-4 py-3 font-semibold text-ink-700 whitespace-nowrap">
                        {s.name}
                      </th>
                      {TEXT_GREYS.map((g) => {
                        const fg = greys[g];
                        return (
                          <td key={g} className="px-4 py-3">
                            <span
                              className="inline-flex items-center gap-stack-xs rounded-md px-2.5 py-1.5"
                              style={{ backgroundColor: bg }}
                            >
                              <span style={{ color: fg }} className="text-caption whitespace-nowrap">
                                Prochaine leçon
                              </span>
                              <Verdict ratio={contrast(fg, bg)} />
                            </span>
                          </td>
                        );
                      })}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          <p className="text-caption text-ink-600 m-0">
            Lecture : sur fond gris, <code>ink-500</code> passe sous le seuil — ces sites-là veulent{' '}
            <code>ink-600</code>. C'est ce qui interdit un remplacement global en une passe.
          </p>

          {/* ── Encre minimale par rôle typo × fond ──────────────────────── */}
          <h3 className="text-h4 font-bold tracking-snug text-ink-900 mt-stack">
            Encre minimale par rôle typographique
          </h3>
          <p className="text-body-sm text-ink-600 m-0 max-w-prose">
            Le seuil dépend de la taille <em>et</em> de la graisse : WCAG relâche à 3,0 pour le « grand texte »
            (≥ 24 px, ou ≥ 18,66 px en ≥ 700). L'encre autorisée change donc selon le rôle — calculé à l'exécution.
          </p>

          <div className="overflow-x-auto rounded-xl border border-ink-200 bg-white">
            <table className="w-full border-collapse text-caption">
              <thead>
                <tr className="border-b border-ink-200">
                  <th scope="col" className="text-left px-4 py-2.5 font-bold text-ink-900">Rôle</th>
                  <th scope="col" className="text-left px-3 py-2.5 font-bold text-ink-900 whitespace-nowrap">Seuil</th>
                  {SURFACES.map((s) => (
                    <th key={s.varName} scope="col" className="text-left px-3 py-2.5 font-bold text-ink-900 whitespace-nowrap">
                      sur {s.name.split(' ')[0]}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {TYPE_ROLES.map((r) => {
                  const large = isLargeText(r.px, r.weight);
                  const need = large ? 3 : 4.5;
                  return (
                    <tr key={r.role} className="border-b border-ink-100 last:border-b-0">
                      <th scope="row" className="text-left px-4 py-2 font-semibold text-ink-800 whitespace-nowrap">
                        {r.role}
                        <span className="text-micro font-normal text-ink-400 tabular-nums"> {r.px}/{r.weight}</span>
                      </th>
                      <td className="px-3 py-2 whitespace-nowrap">
                        <span className={large ? 'text-ink-600' : 'text-ink-800 font-semibold'}>
                          {need.toFixed(1).replace('.', ',')}
                        </span>
                        <span className="text-micro text-ink-400"> {large ? 'grand' : 'normal'}</span>
                      </td>
                      {SURFACES.map((s) => {
                        const bg = surfaces[s.varName];
                        const step = INK_RAMP.find((i) => contrast(greysAll[`--color-ink-${i}`] ?? '', bg) >= need);
                        const val = step ? contrast(greysAll[`--color-ink-${step}`], bg) : 0;
                        return (
                          <td key={s.varName} className="px-3 py-2 whitespace-nowrap">
                            <span
                              className="inline-flex items-center gap-1.5 rounded-md px-2 py-1"
                              style={{ backgroundColor: bg }}
                            >
                              <span style={{ color: greysAll[`--color-ink-${step}`] }} className="font-mono text-micro font-bold">
                                ink-{step}
                              </span>
                              <span className="text-micro text-ink-500 tabular-nums">{fmt(val)}</span>
                            </span>
                          </td>
                        );
                      })}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          <div className="rounded-xl border border-danger-base/40 bg-danger-bg p-4">
            <p className="text-caption text-danger-fg m-0">
              <strong className="font-bold">La tolérance « grand texte » ne sauve pas <code>ink-400</code>.</strong>{' '}
              Même en Display 48/800 — le seuil le plus permissif, 3,0 — il plafonne à{' '}
              <strong className="font-bold tabular-nums">
                {fmt(contrast(greysAll['--color-ink-400'] ?? '', surfaces['--color-white'] ?? '#fff'))}
              </strong>. Il échoue à <em>toutes</em> les tailles, sur <em>tous</em> les fonds.
            </p>
            <p className="text-caption text-danger-fg m-0 mt-stack-xs">
              Conclusion : <code>ink-400</code> n'est pas une couleur ratée, elle est{' '}
              <strong className="font-bold">mal affectée</strong>. Sa place légitime est l'état{' '}
              <strong className="font-bold">désactivé</strong> (que WCAG exempte explicitement) et le décoratif
              non-textuel. Les 309 usages sur du texte sont une réaffectation de rôle, pas un changement de teinte.
            </p>
          </div>
        </Section>

        {/* ══ ① Couleur du texte courant ═══════════════════════════════════ */}
        <Section
          id="encre"
          icon={<Baseline size={18} />}
          title="① La couleur du texte courant"
          intro="Le marron éditorial #2f1c13 existe déjà dans les tokens mais ne sert que de warning-fg. La question posée au départ était « ink-900 ou marron », sur le seul titre. En mesurant les usages le 30/07, elle s'est révélée mal posée : le site n'écrit jamais d'une seule encre. Les trois colonnes ci-dessous montrent la vraie alternative."
        >
          <EncreArbitrage tick={tick} />

          <h3 className="font-display text-h4 font-bold tracking-snug text-ink-900 pt-stack">
            Et la rampe elle-même ? — vos deux questions du 30/07
          </h3>
          <div className="rounded-xl border border-primary-200 bg-primary-50 p-4 flex flex-col gap-stack-xs">
            <p className="text-caption text-ink-800 m-0">
              <strong className="font-bold">
                « On peut pas faire dériver notre grayscale de notre ink-900 TLS ? »
              </strong>{' '}
              Si, et la mesure rend la réponse décevante. En OKLCH, <code>ink-900</code> est à la teinte{' '}
              <strong className="font-bold">264°</strong> ; le teal de marque <code>primary-500</code>{' '}
              est à <strong className="font-bold">216°</strong>. Quarante-huit degrés d'écart.{' '}
              <code>ink-900</code> n'est donc pas un « gris teinté teal » : c'est un gris bleu-violet, de
              la même famille que les gris Tailwind qu'il est censé remplacer (<code>ink-500</code> est à
              264,4°, <code>ink-600</code> à 256,8°). D'où la colonne <strong className="font-bold">B</strong>{' '}
              ci-dessous, qui ne bouge quasiment rien — <code>#4b5563</code> devient{' '}
              <code>#4d5463</code>. Elle est là pour être écartée les yeux ouverts.
            </p>
            <p className="text-caption text-ink-800 m-0">
              <strong className="font-bold">
                « Le dark brown editorial, d'où est-il dérivé ? Du jaune ou de l'orange TLS ? »
              </strong>{' '}
              De l'orange, sans ambiguïté : le marron est à la teinte{' '}
              <strong className="font-bold">46°</strong>, l'orange <code>secondary-500</code> à 52,3°,
              l'or <code>accent-400</code> à 73,5°. Soit <strong className="font-bold">6,3°</strong> de
              l'orange contre 27,5° de l'or. Nuance utile : ce n'est pas un simple assombrissement de
              l'orange. Assombrir l'orange à la clarté du marron donne <code>#351906</code> ; le marron
              réel est <code>#2f1c13</code>, soit <strong className="font-bold">plus rouge de 6°</strong>{' '}
              et nettement moins saturé (chroma 0,034 contre 0,054). C'est donc bien la famille de
              l'orange, mais choisie à la main, pas calculée.
            </p>
            <p className="text-caption text-ink-800 m-0">
              <strong className="font-bold">Ce que ça coûte en accessibilité : rien.</strong> Les quatre
              rampes tiennent la clarté d'origine cran par cran — seule la teinte tourne. Sur{' '}
              <code>ink-600</code>, le contraste sur blanc passe de{' '}
              <strong className="font-bold">7,56 à 7,64</strong> ; sur <code>ink-900</code>, de 14,20 à
              14,35. Aucun dossier d'accessibilité ne se rouvre, quelle que soit la colonne retenue.
            </p>
          </div>
          <RampeArbitrage tick={tick} />

          <div className="rounded-xl border border-ink-200 bg-ink-50 p-4 flex flex-col gap-stack-xs">
            <p className="text-caption text-ink-700 m-0">
              <strong className="font-bold">Ce que la mesure a changé dans la question.</strong> Sur le
              site, <code>text-ink-900</code> compte <strong className="font-bold">202 usages</strong>{' '}
              (et non 169, chiffre qui avait dérivé), mais le texte de paragraphe vit ailleurs :{' '}
              <code>ink-600</code> 86 fois, <code>ink-700</code> 72, <code>ink-500</code> 67. Soit{' '}
              <strong className="font-bold">six niveaux de gris et 466 déclarations</strong> — pas une
              encre, une rampe.
            </p>
            <p className="text-caption text-ink-700 m-0">
              <strong className="font-bold">Et cette rampe n'est pas de vous.</strong>{' '}
              <code>ink-50</code> → <code>ink-800</code> sont exactement les gris{' '}
              <em>par défaut de Tailwind</em> (froids, bleutés) ; <code>ink-950</code> est le{' '}
              <code>slate-900</code> de Tailwind ; <code>ink-900</code> (#252B37) est la{' '}
              <strong className="font-bold">seule valeur TLS</strong> de la série. Vos paragraphes
              n'ont donc aucun teal aujourd'hui — l'étiquette « gris teinté teal » ne vaut que pour le
              cran le plus foncé.
            </p>
            <p className="text-caption text-ink-700 m-0">
              <strong className="font-bold">Conséquence pour la décision.</strong> La colonne du milieu
              est le piège : un titre chaud sur un paragraphe froid, ce qui arriverait si l'on ne
              changeait que <code>ink-900</code>. Une direction papier-et-encre demande la colonne de
              droite, dont le ton de paragraphe{' '}
              <strong className="font-bold">n'existe pas encore en token</strong> — il est calculé ici
              pour retrouver le contraste exact d'<code>ink-600</code> sur chaque fond. Choisir le
              marron, c'est donc accepter de créer une rampe chaude, pas de changer une valeur.
            </p>
            <p className="text-caption text-ink-700 m-0">
              Le contraste, lui, n'arbitre pas : il autorise. Les trois colonnes passent AAA sur les
              quatre fonds. La décision reste esthétique.
            </p>
          </div>
        </Section>

        {/* ══ ② Rayons ════════════════════════════════════════════════════ */}
        <Section
          id="rayon-arbitrage"
          icon={<Square size={18} />}
          title="② Le rayon des boutons et des cards"
          intro="La question annonçait deux valeurs en présence, pilule et 24. Le comptage du 30/07 en trouve sept sur le site. Les trois candidates ci-dessous existent déjà dans l'échelle, aucune n'est inventée — et la même valeur est appliquée au bouton et à la card, volontairement, pour voir ce que ça coûte."
        >
          <RayonArbitrage tick={tick} />
          <div className="rounded-xl border border-ink-200 bg-ink-50 p-4 flex flex-col gap-stack-xs">
            <p className="text-caption text-ink-700 m-0">
              <strong className="font-bold">Sept valeurs, pas deux.</strong> Mesuré sur{' '}
              <code>pages/marketing</code> + <code>components/marketing</code> :{' '}
              <code>rounded-pill</code> 111 · <code>rounded-2xl</code> 66 · <code>rounded-xl</code> 44 ·{' '}
              <code>rounded-lg</code> 10 · <code>rounded-sm</code> 8 · <code>rounded-2xl</code> 7 ·{' '}
              <code>rounded-md</code> 2. À noter : <code>rounded-2xl</code>{' '}
              <strong className="font-bold">ne correspond à aucun token TLS</strong> — il n'y a pas de{' '}
              <code>--radius-3xl</code> dans <code>index.css</code>, ces 7 usages tombent sur le défaut
              Tailwind. Le gain réel de l'arbitrage n'est donc pas « choisir entre deux registres », c'est
              refermer une échelle partie en éventail.
            </p>
            <p className="text-caption text-ink-700 m-0">
              <strong className="font-bold">Ce que la colonne de gauche démontre malgré elle.</strong> À
              999 px, la card devient un stade : la pilule n'est pas généralisable, elle ne vaut que pour
              des objets plus larges que hauts. L'arbitrage se joue donc réellement entre{' '}
              <strong className="font-bold">14 et 10</strong>, avec la pilule éventuellement conservée
              comme exception documentée sur les boutons seuls.
            </p>
            <p className="text-caption text-ink-700 m-0">
              <strong className="font-bold">Ce que chaque valeur raconte.</strong> La pilule se lit
              douce, accessible, grand public : c'est le registre d'une application. Le 10 px se lit
              comme un objet imprimé, plus adulte, plus sobre. Le 14 px est le compromis. Si la direction
              retenue est celle du papier et de l'encre, l'angle franc est plus cohérent que le bord rond.
            </p>
          </div>
        </Section>

        {/* ══ ③ Sens des couleurs ═════════════════════════════════════════ */}
        <Section
          id="tonalites"
          icon={<FlaskConical size={18} />}
          title="③ Les tonalités disent-elles vraiment quelque chose ?"
          intro="La doc affirme : teal = focus et progression, orange = action et contact humain, or = validé. À gauche cette association. À droite, les mêmes rôles avec les couleurs permutées d'un cran. Si le décalage ne vous saute pas aux yeux, l'association est une convention d'écriture et non une contrainte de design."
        >
          <TonaliteArbitrage tick={tick} />
          <div className="rounded-xl border border-ink-200 bg-ink-50 p-4 flex flex-col gap-stack-xs">
            <p className="text-caption text-ink-700 m-0">
              <strong className="font-bold">Cet arbitrage ne bloque aucun code.</strong> Vérifié le
              30/07 : la prop <code>tone=</code> a{' '}
              <strong className="font-bold">zéro usage</strong> dans{' '}
              <code>pages/marketing</code> et <code>components/marketing</code>. Les maps de{' '}
              <code>lib/tone-classes.ts</code> servent l'app, pas le site. Contrairement à ① et ②, il n'y
              a donc rien à migrer ici — la réponse n'engage que les compositions à venir.
            </p>
            <p className="text-caption text-ink-700 m-0">
              <strong className="font-bold">Ce que la permutation montre déjà.</strong> Entre les deux
              panneaux, seul le teal change visiblement de rôle. Permuter <em>warm</em> et <em>sun</em>{' '}
              se remarque à peine : l'orange #ED843A et l'or #F8B044 sont voisins en teinte. C'est
              exactement l'avertissement que <code>DESIGN.md</code> porte lui-même — « deux tonalités
              dominantes voisines ne distinguent rien à l'usage ». La triade annoncée se comporte donc
              en pratique comme une <strong className="font-bold">binaire</strong> : teal, et le chaud.
            </p>
            <p className="text-caption text-ink-700 m-0">
              Si l'association tient, on la verrouille et elle devient une vraie règle. Si elle ne tient
              pas, on libère les couleurs et on choisit par composition plutôt que par doctrine.
            </p>
          </div>
        </Section>

        {/* ══ ④ Rempli ou outline ═════════════════════════════════════════ */}
        <Section
          id="boutons-outline"
          icon={<MousePointerClick size={18} />}
          title="④ Rempli ou outline ?"
          intro="Votre remarque en marge de ③ — « je pense passer plutôt à des boutons outline border coloured et coloured texte que filled en primary ». La mesure vous donne raison, mais pour une raison plus forte que le style : c'est le seul traitement qui garde les couleurs de marque reconnaissables tout en passant AA. Les rayons sont ici à 14 px, votre arbitrage ② étant tranché."
        >
          <BoutonsOutline tick={tick} />
          <div className="rounded-xl border border-ink-200 bg-ink-50 p-4 flex flex-col gap-stack-xs">
            <p className="text-caption text-ink-700 m-0">
              <strong className="font-bold">Pourquoi le rempli vous coinçait.</strong> En rempli, le
              label est blanc et doit contraster avec le fond de marque. Or aucune des trois couleurs
              signatures ne le permet : blanc sur <code>primary-600</code> donne{' '}
              <strong className="font-bold">3,66</strong>, sur <code>secondary-500</code>{' '}
              <strong className="font-bold">2,64</strong>, sur <code>accent-500</code>{' '}
              <strong className="font-bold">2,31</strong> — et sur l'or canonique{' '}
              <code>accent-400</code>, <strong className="font-bold">1,86</strong>, le pire de la
              palette. Pour passer AA il faut descendre à{' '}
              <code>primary-700</code> (5,02) ou <code>secondary-700</code> (6,31) — c'est-à-dire
              exactement le « teal terni » que vous refusiez. Le rempli vous obligeait à choisir entre la
              conformité et la marque.
            </p>
            <p className="text-caption text-ink-700 m-0">
              <strong className="font-bold">Pourquoi l'outline dénoue ça.</strong> Le label n'est plus
              sur la couleur, il est sur du blanc. <code>primary-700</code> y mesure{' '}
              <strong className="font-bold">5,02</strong>, <code>secondary-700</code>{' '}
              <strong className="font-bold">6,31</strong>, <code>accent-700</code>{' '}
              <strong className="font-bold">4,88</strong> — tous conformes. Même token qu'en rempli,
              lecture inverse : posé sur blanc il se lit comme le teal de la marque, pas comme un teal
              assombri. Et l'or redevient utilisable, ce qu'il n'était pas du tout en rempli.
            </p>
            <p className="text-caption text-danger-fg m-0">
              <strong className="font-bold">Le défaut à corriger avant de généraliser.</strong> Le
              variant <code>outline</code> de <code>Button.tsx</code> a un label conforme et une{' '}
              <strong className="font-bold">bordure qui ne l'est pas</strong> :{' '}
              <code>border-primary-400</code> mesure <strong className="font-bold">2,44</strong> sur
              blanc, sous le seuil de 3,0 que WCAG 1.4.11 impose à un contour d'élément d'interface.
              Idem <code>outline-warm</code> avec <code>border-secondary-400</code> à 2,48. Le survol
              n'arrange rien (<code>primary-500</code> = 2,94). Rangée C : la bordure remontée à{' '}
              <code>600</code> passe à 3,66 et 3,98 — une seule valeur à changer par variant.
            </p>
          </div>
        </Section>

        {/* ── Rappel Button réel ───────────────────────────────────────── */}
        <section className="flex flex-col gap-stack">
          <h2 className="text-h4 font-bold tracking-snug text-ink-900">Composant Button réel, pour repère</h2>
          <div className="flex flex-wrap items-center gap-stack rounded-xl border border-ink-200 bg-white p-4">
            <Button variant="primary">Primary</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="accent">Accent</Button>
            <Button variant="ghost">Ghost</Button>
            <Button variant="outline">Outline</Button>
          </div>
          <p className="text-caption text-ink-500 m-0">
            Ci-dessus le vrai composant, non modifié — à comparer avec les simulations de la section Boutons.
          </p>
        </section>

        <footer className="border-t border-ink-200 pt-stack">
          <p className="text-micro text-ink-500 m-0">
            Banc temporaire — à supprimer une fois les arbitrages rendus. Aucune valeur n'est recopiée ici : tout est
            relu depuis les variables CSS à l'exécution. Rechargement = retour à l'état réel.{' '}
            <span className="tabular-nums">({tick > 0 ? 'live' : 'init'})</span>
          </p>
        </footer>
      </main>
    </div>
  );
};

export default DesignLab;
