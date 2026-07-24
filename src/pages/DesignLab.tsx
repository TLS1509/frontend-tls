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
import { Check, X, Type, Square, MousePointerClick, Baseline, RotateCcw, Bold, LayoutGrid, Ruler, LayoutList, Wrench, FlaskConical } from 'lucide-react';
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
      {pass ? <Check size={11} strokeWidth={3} /> : <X size={11} strokeWidth={3} />}
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
      <h2 className="flex items-center gap-stack-xs text-h3 font-bold tracking-headline text-ink-900 m-0">
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

/* ─────────────────────────────── La page ────────────────────────────────── */

const NAV = [
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
];

/** Doit rester aligné sur le `scroll-mt-24` des sections (6rem = 96px). */
const HEADER_OFFSET = 96;

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

  // Contrastes du repos, lus sur les valeurs résolues.
  const fillHex = resolve(cur.fill === 'transparent' ? surface : cur.fill);
  const textC = contrast(resolve(cur.text), fillHex);
  const pageHex = resolve(surface);
  const edgeC = cur.border === 'none' || cur.width === 0
    ? null
    : contrast(resolve(cur.border), pageHex);

  const previewStyle: React.CSSProperties = {
    background: cur.fill === 'transparent' ? 'transparent' : resolve(cur.fill),
    color: resolve(cur.text),
    border: cur.border === 'none' || cur.width === 0 ? 'none' : `${cur.width}px solid ${resolve(cur.border)}`,
    opacity: 1,
  };

  return (
    <section id="atelier" className="scroll-mt-24 flex flex-col gap-stack">
      <header className="flex flex-col gap-tight">
        <h2 className="flex items-center gap-stack-xs text-h3 font-bold tracking-headline text-ink-900 m-0">
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
              className="inline-flex items-center justify-center h-touch px-5 rounded-pill font-body text-body-sm font-semibold"
              style={previewStyle}
            >
              Reprendre
            </span>
          ) : (
            <div className="w-52 rounded-xl p-4 flex flex-col gap-stack-xs" style={previewStyle}>
              <span className="font-display text-h4 font-bold" style={{ color: resolve(cur.text) }}>Titre de card</span>
              <span className="text-caption" style={{ color: resolve(cur.text), opacity: 0.75 }}>Étape 2 sur 5</span>
            </div>
          )}
          <div className="flex flex-col gap-1.5">
            <span className="inline-flex items-center gap-1.5 rounded-pill px-2.5 py-1 text-micro font-bold tabular-nums" style={{ background: 'rgba(255,255,255,0.9)' }}>
              <span className={textC >= 4.5 ? 'text-success-fg' : 'text-danger-fg'}>{textC >= 4.5 ? '✓' : '✗'} texte {fmt(textC)}</span>
            </span>
            {edgeC !== null && (
              <span className="inline-flex items-center gap-1.5 rounded-pill px-2.5 py-1 text-micro font-bold tabular-nums" style={{ background: 'rgba(255,255,255,0.9)' }}>
                <span className={edgeC >= 3 ? 'text-success-fg' : 'text-danger-fg'}>{edgeC >= 3 ? '✓' : '✗'} bordure {fmt(edgeC)}</span>
              </span>
            )}
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
        <div className="mx-auto max-w-page px-4 sm:px-6 py-3 flex flex-wrap items-center gap-stack-xs">
          <div className="flex flex-col gap-0.5 mr-auto min-w-0">
            <h1 className="text-h4 font-bold tracking-snug text-ink-900 m-0">Design Lab</h1>
            <p className="text-micro text-ink-500 m-0">
              Arbitrages en cours · valeurs relues en direct, ratios calculés à l'exécution
            </p>
          </div>

          <nav className="flex flex-wrap items-center gap-1" aria-label="Sections du lab">
            {NAV.map((n) => (
              <button
                key={n.id}
                type="button"
                onClick={() => scrollTo(n.id)}
                className="min-h-touch inline-flex items-center rounded-pill px-3 text-caption font-semibold text-ink-700 hover:bg-primary-50 hover:text-primary-800 transition-colors duration-fast cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500"
              >
                {n.label}
              </button>
            ))}
          </nav>

          <button
            type="button"
            onClick={() => setApplied((a) => !a)}
            aria-pressed={applied}
            className={[
              'min-h-touch inline-flex items-center gap-stack-xs rounded-pill px-4 text-caption font-bold transition-colors duration-fast cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500',
              applied
                ? 'bg-primary-700 text-white hover:bg-primary-800'
                : 'bg-ink-100 text-ink-800 hover:bg-ink-200',
            ].join(' ')}
          >
            {applied ? <RotateCcw size={14} strokeWidth={2.4} /> : <Check size={14} strokeWidth={2.4} />}
            {applied ? 'Proposition active — revenir' : 'Appliquer la proposition'}
          </button>
        </div>

        {/* Essais bouton — s'appliquent à toute l'app pendant la navigation */}
        <div className="mx-auto max-w-page px-4 sm:px-6 pb-3 flex flex-wrap items-center gap-1.5">
          <span className="text-micro font-bold uppercase tracking-[0.07em] text-ink-500 mr-1">
            Essayer sur l'app
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
                  'inline-flex flex-col items-start rounded-lg border px-2.5 py-1 transition-colors duration-fast cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500',
                  on
                    ? 'border-primary-600 bg-primary-50 text-primary-900'
                    : 'border-ink-200 bg-white text-ink-600 hover:border-ink-300 hover:text-ink-900',
                ].join(' ')}
              >
                <span className="text-micro font-bold">{t.label}</span>
                <span className="text-micro text-ink-400">{t.hint}</span>
              </button>
            );
          })}
          {trials.length > 0 && (
            <button
              type="button"
              onClick={() => setTrials([])}
              className="inline-flex items-center gap-1 rounded-pill px-2.5 h-8 text-micro font-semibold text-ink-600 hover:bg-ink-100 hover:text-ink-900 transition-colors duration-fast cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500"
            >
              <X size={12} strokeWidth={2.5} /> Tout retirer
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
        {/* ── 0. Atelier — bac à sable ─────────────────────────────────── */}
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
                  className="text-ink-900 m-0"
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
            <strong className="font-bold text-ink-900">rounded-full vs rounded-pill :</strong> les deux rendent{' '}
            <em>exactement</em> la même chose ({readToken('--radius-pill') || '999px'} contre un pill infini). Une
            migration des 122 <code>rounded-full</code> ne changerait aucun pixel — ce qui vaut le coup, c'est de
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
          <h3 className="text-h4 font-bold tracking-snug text-ink-900 m-0 mt-stack">
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

        {/* ── Rappel Button réel ───────────────────────────────────────── */}
        <section className="flex flex-col gap-stack">
          <h2 className="text-h4 font-bold tracking-snug text-ink-900 m-0">Composant Button réel, pour repère</h2>
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
