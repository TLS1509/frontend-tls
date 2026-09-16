/**
 * MarketingEssaisMatiere — banc d'essai « fait-main », /website/_essais-matiere.
 *
 * Six traitements du MÊME fragment d'accueil, pour les juger à taille réelle
 * plutôt qu'en vignette. La copy est la vraie (H1 arbitré du 28/07), les tokens
 * sont ceux du DS, la typo est celle du site. Seul le traitement change.
 *
 * Les six viennent de deux tris du 16/09 :
 *   · trois retenus du nuancier — annotation, alignement imparfait, liquid glass
 *   · trois familles viables du relevé Mobbin — trait continu, décor en bande,
 *     objet réel posé
 *
 * Route de travail, hors sitemap et hors nav. À supprimer une fois tranché.
 */

import React, { useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Button } from '../../components/core/Button';
import { SEOHead } from './components/SEOHead';

const SHELL = 'max-w-wide mx-auto px-4 sm:px-6 lg:px-10';

/** Le grain de papier, en tuile SVG — le même pour tous les essais qui en ont. */
const GRAIN =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='150' height='150'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='150' height='150' filter='url(%23n)' opacity='0.6'/%3E%3C/svg%3E\")";

// ─── Le fragment commun ──────────────────────────────────────────────────────

type EtapeProps = { k: string; n: string; d: string };
const ETAPES: EtapeProps[] = [
  { k: 'Étape 01', n: 'Cadrer', d: 'Ce que le métier exige, listé avec vous.' },
  { k: 'Étape 02', n: 'Prouver', d: 'Sur des projets réels, pas des quiz.' },
  { k: 'Étape 03', n: 'Allouer', d: 'Les bonnes compétences au bon endroit.' },
];

/** Le titre et le chapô, identiques partout. `ton` ne change que la couleur. */
const Titre: React.FC<{ sombre?: boolean }> = ({ sombre }) => (
  <div className="max-w-2xl">
    <h2
      className={`font-display text-section ${sombre ? 'text-white' : 'text-ink-900'} [text-wrap:balance]`}
    >
      <span className="block">Ne formez plus pour former.</span>
      <span className={`block ${sombre ? 'text-primary-200' : 'text-primary-700'}`}>
        Bâtissez votre moteur de performance.
      </span>
    </h2>
    <p
      className={`font-body text-lede ${sombre ? 'text-white/80' : 'text-ink-700'} leading-relaxed m-0 mt-stack max-w-xl [text-wrap:pretty]`}
    >
      Le dispositif qui transforme vos compétences en avantage mesurable —
      conçu avec vous, pas pour vous.
    </p>
  </div>
);

const Cta: React.FC = () => (
  <div className="mt-stack-lg">
    <Button to="/website/diagnostic" variant="primary" size="lg" trailingIcon={<ArrowRight size={18} />}>
      Évaluer notre maturité
    </Button>
  </div>
);

// ─── 1 · Le trait continu ────────────────────────────────────────────────────
//
// Une seule ligne d'encre ininterrompue, tracée une fois au chargement.
// C'est ce que fait Claude : la ligne n'est PAS le logo, c'est un élément de
// page. Le tracé se joue sur `pathLength`, donc il faut un stroke — d'où le
// choix d'un trait et non d'une forme pleine.

const TraitContinu: React.FC = () => {
  const reduced = useReducedMotion();
  return (
    <div className="relative">
      <svg
        aria-hidden
        viewBox="0 0 520 420"
        className="pointer-events-none absolute right-0 top-1/2 hidden h-[86%] -translate-y-1/2 lg:block"
      >
        <path
          d="M64 352 C 16 286, 44 196, 122 178 C 196 161, 232 238, 186 280 C 142 320, 74 288, 96 220
             C 122 140, 246 96, 330 132 C 414 168, 438 268, 372 316 C 318 355, 250 330, 262 276
             C 274 222, 372 208, 430 246 C 470 272, 478 316, 462 352"
          fill="none"
          stroke="currentColor"
          className="text-secondary-500"
          strokeWidth="2.2"
          strokeLinecap="round"
          style={
            reduced
              ? undefined
              : {
                  strokeDasharray: 2600,
                  strokeDashoffset: 2600,
                  animation: 'tls-tracer 3.4s cubic-bezier(.65,0,.35,1) .35s forwards',
                }
          }
        />
      </svg>
      <div className="relative">
        <Titre />
        <Cta />
      </div>
    </div>
  );
};

// ─── 2 · Le décor peint en bande ─────────────────────────────────────────────
//
// La correction du 16/09 : chez Structured, Craft, Duna et Legend le décor
// occupe la BANDE d'ouverture, jamais le fond de page. Ici le décor est un
// placeholder SVG — le vrai serait un asset commandé.

const DecorBande: React.FC = () => (
  <div className="relative isolate overflow-hidden rounded-lg">
    <svg
      aria-hidden
      viewBox="0 0 1200 420"
      preserveAspectRatio="xMidYMid slice"
      className="absolute inset-0 -z-10 h-full w-full"
    >
      <defs>
        <linearGradient id="essai-ciel" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#DCE4E2" />
          <stop offset=".55" stopColor="#EFE3CF" />
          <stop offset="1" stopColor="#E7D8C1" />
        </linearGradient>
        <filter id="essai-flou">
          <feGaussianBlur stdDeviation="7" />
        </filter>
      </defs>
      <rect width="1200" height="420" fill="url(#essai-ciel)" />
      <circle cx="930" cy="104" r="58" fill="#F2C88C" opacity=".7" />
      <g filter="url(#essai-flou)">
        <path d="M0 252 C 190 210, 366 276, 566 242 C 762 209, 934 266, 1200 224 L1200 420 L0 420Z" fill="#C3CBB4" opacity=".92" />
        <path d="M0 308 C 210 274, 398 330, 610 302 C 806 276, 986 322, 1200 294 L1200 420 L0 420Z" fill="#A2B199" opacity=".93" />
        <path d="M0 366 C 236 342, 452 380, 686 360 C 884 343, 1030 370, 1200 354 L1200 420 L0 420Z" fill="#7E9380" opacity=".95" />
      </g>
    </svg>
    <div aria-hidden className="absolute inset-0 -z-10 opacity-[0.28] mix-blend-multiply"
         style={{ backgroundImage: GRAIN, backgroundSize: '150px' }} />
    <div className="px-6 py-band sm:px-10">
      <Titre />
      <Cta />
    </div>
  </div>
);

// ─── 3 · L'objet réel posé ───────────────────────────────────────────────────
//
// Contra Labs : une statue antique photographiée à côté d'un portable, sur un
// crème uni. Le fait-main vient de l'objet, pas de la surface.
// ⚠️ Ici l'objet est une SILHOUETTE de substitution — le vrai essai demande une
// vraie photo. C'est le seul des six qui ne peut pas être jugé sans asset.

const ObjetPose: React.FC = () => (
  <div className="relative overflow-hidden rounded-lg bg-[#F2EDE4]">
    <div className="grid items-center gap-flow px-6 py-band sm:px-10 lg:grid-cols-[1fr_auto]">
      <div>
        <Titre />
        <Cta />
      </div>
      <div className="relative mx-auto w-[240px] max-w-full">
        <svg viewBox="0 0 240 300" className="h-auto w-full" role="img"
             aria-label="Substitut d'objet : une silhouette posée, en attente d'une vraie photo">
          <ellipse cx="120" cy="286" rx="78" ry="11" fill="#D8CDBC" />
          <path d="M120 34 C 152 34, 168 60, 164 92 C 160 122, 146 136, 148 158
                   L 160 262 L 80 262 L 92 158 C 94 136, 80 122, 76 92 C 72 60, 88 34, 120 34 Z"
                fill="#DCD2C2" />
          <path d="M120 34 C 152 34, 168 60, 164 92 C 160 122, 146 136, 148 158 L 152 200
                   C 130 186, 122 140, 124 96 C 126 62, 122 44, 120 34 Z" fill="#CBBFAC" />
        </svg>
        <p className="mt-stack text-center font-body text-caption text-ink-500">
          substitut — à remplacer par une vraie photo d'objet
        </p>
      </div>
    </div>
  </div>
);

// ─── 4 · La couche d'annotation ──────────────────────────────────────────────
//
// La page est nette ; par-dessus, quelqu'un a surligné et noté en marge.
// Un document relu — c'est littéralement le métier de TLS.

const Annotation: React.FC = () => (
  <div>
    <Titre />
    <p className="font-body text-body-lg text-ink-700 leading-relaxed m-0 mt-flow max-w-2xl">
      Le poste décrit ce qu'on{' '}
      <span className="bg-[linear-gradient(transparent_62%,rgba(237,132,58,.42)_62%)]">attend</span>{' '}
      de quelqu'un. La compétence décrit ce qu'il{' '}
      <span className="bg-[linear-gradient(transparent_62%,rgba(237,132,58,.42)_62%)]">sait faire</span>.
    </p>
    <p className="mt-stack font-body text-body text-secondary-700 italic -rotate-1 origin-left">
      ↳ c'est là que tout se joue
    </p>
    <Cta />
  </div>
);

// ─── 5 · L'alignement imparfait ──────────────────────────────────────────────
//
// Des rotations sous le degré. On ne les voit pas ; on voit que ce n'est pas
// une grille. Aucun asset, aucune décision esthétique engagée.

const AlignementImparfait: React.FC = () => (
  <div>
    <Titre />
    <div className="mt-flow grid gap-stack-lg sm:grid-cols-3">
      {ETAPES.map((e, i) => (
        <div
          key={e.n}
          className={[
            'rounded-lg border border-ink-200 bg-white p-stack-lg',
            ['-rotate-[0.5deg]', 'rotate-[0.35deg] -translate-y-0.5', '-rotate-[0.25deg] translate-y-0.5'][i],
          ].join(' ')}
        >
          <span className="font-body text-caption font-bold tracking-label text-ink-500 uppercase">{e.k}</span>
          <h3 className="mt-stack-xs font-display text-h4 text-ink-900">{e.n}</h3>
          <p className="mt-stack-xs font-body text-body-sm text-ink-600 leading-relaxed m-0">{e.d}</p>
        </div>
      ))}
    </div>
    <Cta />
  </div>
);

// ─── 6 · Le liquid glass ─────────────────────────────────────────────────────
//
// Pas du verre transparent : un émail. Il vit de ce qu'il y a dessous, donc il
// est posé ici sur le décor peint — seul, sur du blanc, il ne réfracte rien.
// ⚠️ La vraie réfraction se calcule sur le GPU ; en CSS on l'approche.
// Le brief §4 dit « le verre est l'exception » : ici c'est un ÉTAT, pas une peau.

const LiquidGlass: React.FC = () => (
  <div className="relative isolate overflow-hidden rounded-lg">
    <svg aria-hidden viewBox="0 0 1200 460" preserveAspectRatio="xMidYMid slice"
         className="absolute inset-0 -z-10 h-full w-full">
      <rect width="1200" height="460" fill="#E9DFCD" />
      <circle cx="300" cy="120" r="200" fill="#C9D6CE" opacity=".8" />
      <circle cx="900" cy="300" r="240" fill="#EBC79B" opacity=".7" />
      <circle cx="640" cy="180" r="170" fill="#AFC3C7" opacity=".6" />
    </svg>
    <div aria-hidden className="absolute inset-0 -z-10 opacity-30 mix-blend-multiply"
         style={{ backgroundImage: GRAIN, backgroundSize: '150px' }} />
    <div className="px-6 py-band sm:px-10">
      <Titre />
      <div className="mt-flow grid gap-stack-lg sm:grid-cols-3">
        {ETAPES.map((e) => (
          <div
            key={e.n}
            className="relative overflow-hidden rounded-lg border border-white/55 p-stack-lg
                       backdrop-blur-md backdrop-saturate-[1.85] backdrop-brightness-[1.07]
                       bg-gradient-to-br from-white/40 to-white/15
                       shadow-[inset_0_1px_0_rgba(255,255,255,.95),0_16px_38px_rgba(48,34,20,.2)]"
          >
            <span className="font-body text-caption font-bold tracking-label uppercase text-ink-600">{e.k}</span>
            <h3 className="mt-stack-xs font-display text-h4 text-ink-900">{e.n}</h3>
            <p className="mt-stack-xs font-body text-body-sm text-ink-700 leading-relaxed m-0">{e.d}</p>
          </div>
        ))}
      </div>
      <Cta />
    </div>
  </div>
);

// ─── 7 · Le mark v4 : trois cercles qui se réunissent ────────────────────────
//
// Le brief du 09/09 remplace la molécule par TROIS CERCLES — Learn · Match · Do.
// Cet essai teste une chose : est-ce que le regroupement DIT quelque chose ?
//
// Ce qu'il dit, s'il dit quelque chose : les trois piliers arrivent séparés et
// se recouvrent. La zone commune est l'endroit où la compétence se prouve.
// C'est une information vraie — pas une décoration.
//
// ⚠️ Deux contraintes que l'essai vérifie en même temps :
//   · le brief est FAVICON-FIRST → l'état final doit tenir à 16 px, en statique.
//     D'où les trois tailles côte à côte : si ça ne marche pas à 16, ça ne
//     marche pas.
//   · l'animation n'est jamais porteuse — elle est l'arrivée, pas le contenu.
//
// ⚠️ Ce n'est PAS une proposition de logo : c'est la géométrie minimale qui
// permet de juger le mouvement. Le dessin du mark v4 reste à faire.

type Cercle = { cx: number; cy: number; c: string; depart: { cx: number; cy: number } };
const CERCLES: Cercle[] = [
  { cx: 40, cy: 34, c: '#55A1B4', depart: { cx: 8, cy: 10 } },   // Learn  — teal
  { cx: 60, cy: 34, c: '#ED843A', depart: { cx: 92, cy: 10 } },  // Match  — orange
  { cx: 50, cy: 54, c: '#F8B044', depart: { cx: 50, cy: 94 } },  // Do     — or
];

const MarqueV4: React.FC<{ taille: number; verre?: boolean; rejoue: number }> = ({
  taille, verre, rejoue,
}) => {
  const reduced = useReducedMotion();
  return (
    <svg width={taille} height={taille} viewBox="0 0 100 100" aria-hidden
         style={{ display: 'block' }}>
      {CERCLES.map((c, i) => (
        <motion.circle
          key={`${rejoue}-${i}`}
          r={22}
          fill={c.c}
          fillOpacity={verre ? 0.42 : 0.82}
          stroke={verre ? 'rgba(255,255,255,.9)' : 'none'}
          strokeWidth={verre ? 1.6 : 0}
          initial={reduced ? false : { cx: c.depart.cx, cy: c.depart.cy, opacity: 0 }}
          animate={{ cx: c.cx, cy: c.cy, opacity: 1 }}
          transition={{ duration: 1.05, delay: 0.12 * i, ease: [0.22, 1, 0.36, 1] }}
        />
      ))}
    </svg>
  );
};

const MarkV4: React.FC = () => {
  const [rejoue, setRejoue] = useState(0);
  const blocs: Array<{ t: string; verre?: boolean; fond: string }> = [
    { t: 'Aplat de marque', fond: 'bg-white' },
    { t: 'Clear glass — la piste du brief v4', verre: true, fond: 'bg-[#E9DFCD]' },
  ];
  return (
    <div>
      <Titre />
      <div className="mt-flow grid gap-stack-lg sm:grid-cols-2">
        {blocs.map((b) => (
          <div key={b.t} className={`rounded-lg border border-ink-200 p-stack-lg ${b.fond}`}>
            <p className="font-body text-caption font-bold tracking-label uppercase text-ink-500 m-0">
              {b.t}
            </p>
            <div className="mt-stack-lg flex items-end gap-stack-lg">
              {[96, 32, 16].map((s) => (
                <div key={s} className="flex flex-col items-center gap-stack-xs">
                  <MarqueV4 taille={s} verre={b.verre} rejoue={rejoue} />
                  <span className="font-body text-caption text-ink-500">{s} px</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
      <div className="mt-stack-lg flex flex-wrap items-center gap-stack">
        <Button variant="ghost" size="sm" onClick={() => setRejoue((n) => n + 1)}>
          Rejouer l’arrivée
        </Button>
        <p className="font-body text-body-sm text-ink-600 m-0 max-w-xl">
          Les trois arrivent séparés et se recouvrent. <strong className="text-ink-900">Regarde
          le 16 px</strong> : c’est lui qui décide, pas le grand.
        </p>
      </div>
    </div>
  );
};

// ─── 8 · La matière d'archive ────────────────────────────────────────────────
//
// Fragments de domaine public, recadrés serré et retraités dans la palette.
// Source : « Autumn Landscape with a Flock of Turkeys », Jean-François Millet,
// 1872-73 — The Met, Open Access. Détail dans public/marketing/archives/LISEZMOI.md.
//
// ⚠️ LA RÈGLE QUI REND ÇA LÉGITIME EST LE RECADRAGE. Une œuvre reconnaissable
// emprunte l'autorité de quelqu'un d'autre — c'est le piège Bosch, et le brief
// hero archivé l'avait déjà nommé (« ça change juste DE QUI c'est le fait-main »).
// Un fragment serré de sa matière n'est plus l'œuvre : c'est de la peinture.
//
// Ce qui se juge ici : est-ce qu'une vraie touche de pinceau, retraitée dans nos
// deux encres, donne le fait-main que les générateurs ne donnent pas ?

const ARCHIVES = '/marketing/archives';

const BandeArchive: React.FC<{ img: string; sombre?: boolean; legende: string }> = ({
  img, sombre, legende,
}) => (
  <figure className="m-0">
    <div className="relative isolate overflow-hidden rounded-lg">
      <img src={`${ARCHIVES}/${img}`} alt="" aria-hidden
           className="absolute inset-0 -z-10 h-full w-full object-cover" />
      <div className="px-6 py-band sm:px-10">
        <Titre sombre={sombre} />
        <Cta />
      </div>
    </div>
    <figcaption className="mt-stack font-body text-caption text-ink-500">{legende}</figcaption>
  </figure>
);

const MatiereArchive: React.FC = () => (
  <div className="flex flex-col gap-flow">
    <BandeArchive img="bande-teal.webp"
      legende="Bichromie primary-800 → crème. On voit la touche, la trame de la toile, la structure des nuages." />
    <BandeArchive img="bande-marron.webp"
      legende="La même bande dans l’encre chaude. À comparer avec la décision 1 : l’encre et la matière doivent s’accorder." />
    <BandeArchive img="bande-brute.webp"
      legende="Le fragment sans retraitement — pour mesurer ce que la bichromie apporte, et ce qu’elle coûte." />

    {/* la pâte employée en texture, pas en image */}
    <figure className="m-0">
      <div className="relative isolate overflow-hidden rounded-lg bg-[#F4EFE4]">
        <img src={`${ARCHIVES}/grain-pate.webp`} alt="" aria-hidden
             className="absolute inset-0 -z-10 h-full w-full object-cover opacity-[0.22] mix-blend-multiply" />
        <div className="px-6 py-band sm:px-10">
          <Titre />
          <Cta />
        </div>
      </div>
      <figcaption className="mt-stack font-body text-caption text-ink-500">
        La même pâte employée <strong>en texture et non en image</strong> — désaturée, à 22 %,
        en produit multiplié sur un crème. C’est le grain de papier, mais pris sur une vraie toile.
      </figcaption>
    </figure>

    <p className="font-body text-body-sm text-ink-600 m-0 max-w-3xl">
      <strong className="text-ink-900">Source</strong> — <em>Autumn Landscape with a Flock of
      Turkeys</em>, Jean-François Millet, 1872-73. The Metropolitan Museum of Art,
      Open Access, domaine public. Aucune attribution n’est exigée ; on la porte quand même.
    </p>
  </div>
);

// ─── Le banc ─────────────────────────────────────────────────────────────────

type Essai = { id: string; n: string; src: string; note: string; el: React.ReactNode };

const ESSAIS: Essai[] = [
  { id: 'trait', n: 'Le trait continu', src: 'Claude · Wispr Flow',
    note: 'Une seule ligne, tracée une fois au chargement. Aucun asset.',
    el: <TraitContinu /> },
  { id: 'decor', n: 'Le décor peint en bande', src: 'Structured · Craft · Duna',
    note: 'Une bande peinte à l’ouverture, la sobriété en dessous. Décor de substitution.',
    el: <DecorBande /> },
  { id: 'objet', n: 'L’objet réel posé', src: 'Contra Labs · Parker AI',
    note: 'Le fait-main vient de l’objet, pas de la surface. Demande une vraie photo.',
    el: <ObjetPose /> },
  { id: 'annot', n: 'La couche d’annotation', src: 'repéré le 16/09',
    note: 'Un document relu, pas une brochure. Aucun asset.',
    el: <Annotation /> },
  { id: 'align', n: 'L’alignement imparfait', src: 'le système',
    note: 'Rotations de −0,5° / +0,35° / −0,25°. Invisible, et pourtant.',
    el: <AlignementImparfait /> },
  { id: 'glass', n: 'Le liquid glass', src: 'Apple 2025 · ton choix',
    note: 'Posé sur une matière, parce que seul sur du blanc il ne réfracte rien.',
    el: <LiquidGlass /> },
  { id: 'mark', n: 'Le mark v4 — trois cercles qui se réunissent', src: 'brief logo du 09/09',
    note: 'Le regroupement dit-il quelque chose ? Et tient-il à 16 px ? Géométrie de test, pas un dessin de logo.',
    el: <MarkV4 /> },
  { id: 'archive', n: 'La matière d’archive', src: 'Millet, 1872 · The Met, domaine public',
    note: 'Un vrai fragment de peinture, recadré serré et passé dans nos deux encres. C’est le recadrage qui évite le piège Bosch.',
    el: <MatiereArchive /> },
];

export const MarketingEssaisMatiere: React.FC = () => (
  <>
    <SEOHead title="Essais matière · interne" description="Banc d’essai interne." canonical="/website/_essais-matiere" />
    <style>{`@keyframes tls-tracer { to { stroke-dashoffset: 0 } }`}</style>

    <section className={`${SHELL} pt-hero pb-flow`}>
      <p className="font-body text-caption font-bold tracking-label uppercase text-secondary-700">
        Banc d’essai · 16 septembre 2026 · route interne
      </p>
      <h1 className="mt-stack font-display text-hero text-ink-900 [text-wrap:balance]">
        Six traitements, un seul fragment.
      </h1>
      <p className="mt-stack font-body text-lede text-ink-700 max-w-2xl leading-relaxed m-0">
        Le même titre, le même chapô, le même bouton, les mêmes trois étapes —
        rendus six fois. Seul le traitement change. C’est la seule façon de les
        comparer&nbsp;: en vignette, tout se ressemble.
      </p>
      <nav className="mt-flow flex flex-wrap gap-stack-xs">
        {ESSAIS.map((e, i) => (
          <a key={e.id} href={`#${e.id}`}
             className="rounded-pill border border-ink-200 px-3.5 py-1.5 font-body text-caption text-ink-700
                        transition-colors hover:border-primary-600 hover:text-primary-700
                        focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500">
            {i + 1} · {e.n}
          </a>
        ))}
      </nav>
    </section>

    {ESSAIS.map((e, i) => (
      <section key={e.id} id={e.id} className={`${SHELL} py-band scroll-mt-24`}>
        <header className="mb-flow border-t-2 border-ink-900 pt-stack">
          <div className="flex flex-wrap items-baseline gap-stack">
            <span className="font-body text-caption font-bold tracking-label uppercase text-secondary-700">
              Essai {i + 1}
            </span>
            <h2 className="font-display text-title text-ink-900">{e.n}</h2>
            <span className="font-body text-caption text-ink-500">{e.src}</span>
          </div>
          <p className="mt-stack-xs font-body text-body-sm text-ink-600 m-0 max-w-2xl">{e.note}</p>
        </header>
        {e.el}
      </section>
    ))}
  </>
);

export default MarketingEssaisMatiere;
