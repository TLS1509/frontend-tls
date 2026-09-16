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
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Button } from '../../components/core/Button';
import { SEOHead } from './components/SEOHead';

const SHELL = 'max-w-wide mx-auto px-4 sm:px-6 lg:px-10';

/** Le grain de papier, en tuile SVG — le même pour tous les essais qui en ont. */
const GRAIN =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='150' height='150'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='150' height='150' filter='url(%23n)' opacity='0.6'/%3E%3C/svg%3E\")";

// ─── Le mouvement — l'invariant d'abord ──────────────────────────────────────
//
// RÈGLE : le contenu n'est JAMAIS conditionné à une animation. On anime la
// position, jamais l'existence — pas d'`opacity: 0` en attente de JS. Si le
// moteur ne part pas (onglet en arrière-plan, rendu headless), tout est lu.
// C'est l'invariant n°2 de CONTEXT-SITE-MARKETING, et il vaut ici aussi.
//
// Chaque mouvement est tiré d'un save Mobbin — la colonne « d'où ça vient »
// dans le banc dit lequel.

/** Se pose en arrivant. La position bouge, le contenu est là dès le premier rendu. */
const Pose: React.FC<{ children: React.ReactNode; delai?: number; depuis?: number }> = ({
  children, delai = 0, depuis = 14,
}) => {
  const reduced = useReducedMotion();
  return (
    <motion.div
      initial={reduced ? false : { y: depuis }}
      whileInView={{ y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.72, delay: delai, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
};

/** La poussée caméra de Structured et Craft : une seule couche, liée au scroll. */
const Poussee: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const reduced = useReducedMotion();
  const ref = React.useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const scale = useTransform(scrollYProgress, [0, 1], [1.06, 1.14]);
  return (
    <div ref={ref} className="absolute inset-0 -z-10 overflow-hidden">
      <motion.div className="h-full w-full" style={reduced ? undefined : { scale }}>
        {children}
      </motion.div>
    </div>
  );
};

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
    <Poussee>
    <svg
      aria-hidden
      viewBox="0 0 1200 420"
      preserveAspectRatio="xMidYMid slice"
      className="h-full w-full object-cover"
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
    </Poussee>
    <div aria-hidden className="absolute inset-0 -z-10 opacity-[0.28] mix-blend-multiply"
         style={{ backgroundImage: GRAIN, backgroundSize: '150px' }} />
    <div className="px-6 py-band sm:px-10">
      <Pose><Titre /><Cta /></Pose>
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
      <Pose delai={0.12} depuis={22}><figure className="relative m-0 mx-auto w-[250px] max-w-full">
        <img src="/marketing/archives/do-instrument.webp"
             alt="Cadran solaire équatorial portatif en laiton doré, Andreas Vogler, vers 1766-90"
             className="h-auto w-full mix-blend-multiply" />
        <figcaption className="mt-stack text-center font-body text-caption text-ink-500">
          Cadran solaire portatif, A. Vogler, v. 1766 — The Met, domaine public
        </figcaption>
      </figure></Pose>
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
    <p className="font-body text-body-lg text-ink-700 m-0 mt-flow max-w-2xl">
      Le poste décrit ce qu'on <span className="tls-surl">attend</span> de quelqu'un.
      La compétence décrit ce qu'il <span className="tls-surl tls-surl-2">sait faire</span>.
    </p>
    <Pose delai={1.15} depuis={8}>
      <p className="mt-stack font-body text-body text-secondary-700 italic -rotate-1 origin-left">
        ↳ c'est là que tout se joue
      </p>
    </Pose>
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
        <motion.div
          key={e.n}
          initial={{ rotate: 0, y: 10 }}
          whileInView={{ rotate: [-0.5, 0.35, -0.25][i], y: [0, -2, 2][i] }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.8, delay: 0.1 * i, ease: [0.22, 1, 0.36, 1] }}
          className="rounded-lg border border-ink-200 bg-white p-stack-lg"
        >
          <span className="font-body text-caption font-bold tracking-label text-ink-500 uppercase">{e.k}</span>
          <h3 className="mt-stack-xs font-display text-h4 text-ink-900">{e.n}</h3>
          <p className="mt-stack-xs font-body text-body-sm text-ink-600 m-0">{e.d}</p>
        </motion.div>
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
            className="tls-verre relative overflow-hidden rounded-lg border border-white/55 p-stack-lg
                       backdrop-blur-md backdrop-saturate-[1.85] backdrop-brightness-[1.07]
                       bg-gradient-to-br from-white/40 to-white/15
                       shadow-[inset_0_1px_0_rgba(255,255,255,.95),0_16px_38px_rgba(48,34,20,.2)]"
          >
            <span className="font-body text-caption font-bold tracking-label uppercase text-ink-600">{e.k}</span>
            <h3 className="mt-stack-xs font-display text-h4 text-ink-900">{e.n}</h3>
            <p className="mt-stack-xs font-body text-body-sm text-ink-700 m-0">{e.d}</p>
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

// ─── 9 · Learn · Match · Do, en archives ─────────────────────────────────────
//
// Les trois piliers cherchés dans le domaine public, chacun avec l'image qui
// dit ce qu'il fait — pas une illustration du mot, une chose qui l'incarne.
//
//   LEARN  Maria Sibylla Merian, 1693 — une planche d'étude. Des spécimens
//          posés sur un vélin crème, observés. Merian étudiait la
//          métamorphose : l'image dit littéralement « regarder pour
//          comprendre comment ça se transforme ».
//   MATCH  Albrecht Dürer, 1515 — une carte céleste. Des points reliés en
//          figures : c'est la définition du match, quatre siècles avant nous.
//   DO     Andreas Vogler, v. 1766 — un cadran solaire portatif. L'instrument
//          qu'on tient, qu'on règle, avec lequel on mesure.
//
// ⚠️ Ceci n'est PAS le brief hero « constellation » archivé du 14/07. Celui-là
// mourait d'un H1 disparu et d'un ciel navy ; ici on prend une gravure de 1515
// pour sa TRAME, pas pour son thème.

const PILIERS_ARCHIVE = [
  { k: 'Learn', img: 'learn-specimen.webp', fond: '#F4EFE3',
    oeuvre: 'Study of Capers, Gorse, and a Beetle',
    qui: 'Maria Sibylla Merian, 1693 — aquarelle et gouache sur vélin',
    dit: 'Une planche d’étude : des spécimens observés, posés sur le vélin nu. Le fond crème est celui de l’œuvre — rien n’a été ajouté.' },
  { k: 'Match', img: 'match-trame.webp', fond: '#EEF4F4',
    oeuvre: 'The Celestial Map — Northern Hemisphere',
    qui: 'Albrecht Dürer, 1515 — gravure sur bois',
    dit: 'Des points reliés en figures. Bichromie primary-800 : la trame du bois devient notre matière.' },
  { k: 'Do', img: 'do-instrument.webp', fond: '#F2EDE4',
    oeuvre: 'Portable equatorial sundial',
    qui: 'Andreas Vogler, v. 1766-90 — laiton doré',
    dit: 'L’instrument qu’on tient et qu’on règle. Le seul des trois qui arrive en objet et non en matière.' },
];

const PiliersArchive: React.FC = () => (
  <div className="flex flex-col gap-flow">
    {/* la trame de Dürer employée en fond, très basse, derrière le vrai fragment */}
    <figure className="m-0">
      <div className="relative isolate overflow-hidden rounded-lg bg-[#F6F2E9]">
        <img src={`${ARCHIVES}/match-trame.webp`} alt="" aria-hidden
             className="absolute inset-0 -z-10 h-full w-full object-cover opacity-[0.14]" />
        <div className="px-6 py-band sm:px-10">
          <Titre />
          <Cta />
        </div>
      </div>
      <figcaption className="mt-stack font-body text-caption text-ink-500">
        La carte de Dürer à <strong>14 % derrière le texte</strong> — elle donne un fond qui a une
        provenance, et elle ne se bat pas avec le titre. C’est l’emploi que je recommande pour elle.
      </figcaption>
    </figure>

    <div className="grid gap-stack-lg @3xl:grid-cols-3">
      {PILIERS_ARCHIVE.map((p) => (
        <figure key={p.k} className="m-0 overflow-hidden rounded-lg border border-ink-200">
          <div className="flex h-[260px] items-center justify-center p-stack-lg"
               style={{ backgroundColor: p.fond }}>
            <img src={`${ARCHIVES}/${p.img}`} alt={p.oeuvre}
                 className="max-h-full w-auto max-w-full object-contain" />
          </div>
          <figcaption className="border-t border-ink-200 bg-white p-stack-lg">
            <span className="font-body text-caption font-bold tracking-label uppercase text-secondary-700">
              {p.k}
            </span>
            <h4 className="mt-stack-xs font-display text-h4 text-ink-900">{p.oeuvre}</h4>
            <p className="mt-stack-xs font-body text-caption text-ink-500 m-0">{p.qui}</p>
            <p className="mt-stack font-body text-body-sm text-ink-600 m-0">{p.dit}</p>
          </figcaption>
        </figure>
      ))}
    </div>

    <p className="font-body text-body-sm text-ink-600 m-0 max-w-3xl">
      <strong className="text-ink-900">Ce que ça ouvre.</strong> Trois images, une seule main —
      celle du domaine public, du XVI<sup>e</sup> au XVIII<sup>e</sup>. Elles ne se ressemblent pas
      mais elles viennent du même monde : l’observation, le relevé, l’instrument. C’est le registre
      de l’apprenance sans un seul cliché d’EdTech.
    </p>
  </div>
);

// ─── Le banc ─────────────────────────────────────────────────────────────────

type Essai = { id: string; n: string; src: string; note: string; motion: string; el: React.ReactNode };

const ESSAIS: Essai[] = [
  { id: 'trait', n: 'Le trait continu', src: 'Claude · Wispr Flow',
    note: 'Une seule ligne, tracée une fois au chargement. Aucun asset.',
    motion: "Le tracé se déroule une fois au chargement — **Claude**, dont la ligne du hero se dessine au lieu d'apparaître.",
    el: <TraitContinu /> },
  { id: 'decor', n: 'Le décor peint en bande', src: 'Structured · Craft · Duna',
    note: 'Une bande peinte à l’ouverture, la sobriété en dessous. Décor de substitution.',
    motion: 'Poussée caméra liée au scroll, sur **une seule couche** — **Structured** et **Craft**, tous deux tagués *Scroll Effects* chez Mobbin.',
    el: <DecorBande /> },
  { id: 'objet', n: 'L’objet réel posé', src: 'Contra Labs · Parker AI',
    note: 'Le fait-main vient de l’objet, pas de la surface. Demande une vraie photo.',
    motion: "L'objet se pose avec un léger dépassement — **Contra Labs**, dont la statue arrive comme un objet réel et non comme une image.",
    el: <ObjetPose /> },
  { id: 'annot', n: 'La couche d’annotation', src: 'repéré le 16/09',
    note: 'Un document relu, pas une brochure. Aucun asset.',
    motion: "Le surligneur passe de gauche à droite, la note en marge arrive après — le geste d'annoter, dans l'ordre où une main le fait.",
    el: <Annotation /> },
  { id: 'align', n: 'L’alignement imparfait', src: 'le système',
    note: 'Rotations de −0,5° / +0,35° / −0,25°. Invisible, et pourtant.',
    motion: "Les cartes se posent **dans** leur rotation au lieu de l'avoir déjà — **Anchor**, dont les pastilles arrivent en quinconce.",
    el: <AlignementImparfait /> },
  { id: 'glass', n: 'Le liquid glass', src: 'Apple 2025 · ton choix',
    note: 'Posé sur une matière, parce que seul sur du blanc il ne réfracte rien.',
    motion: 'Le reflet balaie, et la carte se soulève sous le pointeur — **Air** et **Phantom**, les deux saves tagués *Glass*.',
    el: <LiquidGlass /> },
  { id: 'mark', n: 'Le mark v4 — trois cercles qui se réunissent', src: 'brief logo du 09/09',
    note: 'Le regroupement dit-il quelque chose ? Et tient-il à 16 px ? Géométrie de test, pas un dessin de logo.',
    motion: 'Les trois cercles arrivent séparés et se recouvrent. Une fois, au chargement.',
    el: <MarkV4 /> },
  { id: 'archive', n: 'La matière d’archive', src: 'Millet, 1872 · The Met, domaine public',
    note: 'Un vrai fragment de peinture, recadré serré et passé dans nos deux encres. C’est le recadrage qui évite le piège Bosch.',
    motion: "Aucun — la matière est fixe, c'est le texte qui bouge. À juger tel quel.",
    el: <MatiereArchive /> },
  { id: 'piliers', n: 'Learn · Match · Do, en archives', src: 'Merian 1693 · Dürer 1515 · Vogler 1766',
    note: 'Les trois piliers cherchés dans le domaine public — une image qui incarne chacun, pas qui l’illustre.',
    motion: "Aucun pour l'instant : trois images à comparer se regardent, elles ne se jouent pas.",
    el: <PiliersArchive /> },
];

export const MarketingEssaisMatiere: React.FC = () => (
  <>
    <SEOHead title="Essais matière · interne" description="Banc d’essai interne." canonical="/website/_essais-matiere" />
    <style>{`
      @keyframes tls-tracer { to { stroke-dashoffset: 0 } }
      /* le surligneur passe — le texte est lisible avant, pendant et après */
      @keyframes tls-surligne { from { background-size: 0% 100% } to { background-size: 100% 100% } }
      .tls-surl {
        background-image: linear-gradient(transparent 62%, rgba(237,132,58,.42) 62%);
        background-repeat: no-repeat; background-size: 100% 100%;
        animation: tls-surligne 1.1s cubic-bezier(.65,0,.35,1) both;
      }
      .tls-surl-2 { animation-delay: .55s }
      /* le verre se soulève sous le pointeur — un état, pas une peau */
      .tls-verre { transition: transform .45s cubic-bezier(.22,1,.36,1), box-shadow .45s }
      .tls-verre:hover { transform: translateY(-4px) }
      @media (prefers-reduced-motion: reduce) {
        .tls-surl, .tls-surl-2 { animation: none }
        .tls-verre { transition: none } .tls-verre:hover { transform: none }
      }
    `}</style>

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
          <p className="mt-stack-xs font-body text-caption text-ink-500 m-0 max-w-2xl">
            <span className="font-bold tracking-label uppercase text-primary-700">Mouvement</span>
            {' · '}{e.motion}
          </p>
        </header>
        {e.el}
      </section>
    ))}
  </>
);

export default MarketingEssaisMatiere;
