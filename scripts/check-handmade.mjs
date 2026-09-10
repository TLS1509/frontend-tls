#!/usr/bin/env node
/**
 * Le détecteur de composants faits main.
 *
 * ## Ce qu'il cherche
 *
 * Un élément qui **se comporte comme un composant du design system sans en
 * être un** : un `<div>` qui a la silhouette d'une carte, un `<button>` qui
 * refait un Button, une pastille qui refait un Badge. Chacun est invisible pris
 * seul — c'est leur nombre qui fait le désordre, et c'est pour ça qu'on ne les
 * voit pas en relisant.
 *
 * Pourquoi ça compte : une décision de design ne descend que dans les
 * composants. Le 09/09, le rayon des cartes est passé à 14 px dans `Card.tsx`
 * et 82 cartes faites main sont restées à 20 ou 24. Le 10/09, le filet des
 * boutons doux a été fermé au cran 600 et les CTA faits main ne l'ont jamais
 * su. Chaque élément fait main est une décision future qui n'arrivera pas.
 *
 * ## Comment il s'y prend
 *
 * Par SIGNATURE, pas par nom. On ne cherche pas « ce qui s'appelle carte » mais
 * « ce qui a un rayon, une surface et un padding, et contient un titre ». La
 * signature est volontairement large : mieux vaut un faux positif qu'on écarte
 * qu'un élément qui échappe. Chaque famille dit ce qu'elle attrape.
 *
 * ## Ce qu'il ne fait pas
 *
 * Il ne juge pas si un élément fait main est LÉGITIME. Beaucoup le sont : la
 * mesure du 10/09 a montré que sur 110 cartes faites main, deux seulement
 * étaient l'équivalent exact d'une `<Card>` — les autres portaient un dégradé,
 * du verre ou un ratio que le composant ne couvre pas. Ce détecteur donne la
 * liste ; c'est un humain qui décide, entre migrer l'élément et étendre le
 * composant.
 *
 * Usage : node scripts/check-handmade.mjs [--famille <nom>] [--fichiers]
 */
import { readFileSync, readdirSync, statSync } from 'node:fs';
import { join, relative } from 'node:path';

const ROOT = new URL('..', import.meta.url).pathname;
const SRC = join(ROOT, 'src');

/** Surfaces qui ne sont pas du produit : vitrine, laboratoires, prototypes. */
const HORS_PERIMETRE = [
  'pages/Components.tsx', 'pages/DesignLab.tsx', 'pages/CardLab.tsx',
  'pages/BgLab.tsx', 'components/DevPanel.tsx', '_prototypes', '_labs',
];

/**
 * Les familles. Chacune porte :
 *   - `primitive`  le composant qui devrait être employé
 *   - `fichiers`   les fichiers qui DÉFINISSENT la primitive (jamais comptés)
 *   - `signature`  ce qui fait dire « cet élément essaie d'être un X »
 *   - `sauf`       ce qui disqualifie (c'est autre chose)
 */
const FAMILLES = [
  {
    nom: 'bouton',
    primitive: '<Button>',
    fichiers: ['core/Button.tsx'],
    /* Une pilule cliquable de hauteur fixe portant un libellé en gras.
       ⚠️ Signature resserrée le 2026-09-10 : la première version comptait 35
       éléments dont la majorité étaient des CHIPS (filtres, bascules) et une
       pastille d'état. Deux critères les écartent — le libellé d'un bouton
       n'est jamais en `text-micro` (le plus petit Button est en `caption`), et
       il n'est jamais en majuscules, ce qui est la marque d'un Badge. */
    signature: (cl) => /\brounded-pill\b/.test(cl)
      && /\b(h-\d+|min-h-touch)\b/.test(cl)
      && /\bfont-(bold|semibold)\b/.test(cl)
      && /\btext-(caption|body-sm|body)\b/.test(cl)
      && /\bcursor-pointer\b|\bhover:/.test(cl),
    sauf: (cl) => /\bw-\d+ h-\d+\b/.test(cl)     // carré = pastille d'icône
      || /\buppercase\b/.test(cl)                  // majuscules = Badge
      || /\btext-micro\b/.test(cl),                // trop petit pour un bouton
  },
  {
    nom: 'carte',
    primitive: '<Card>',
    fichiers: ['core/Card.tsx'],
    // Un rayon, une surface, un padding — la silhouette d'un objet posé.
    signature: (cl) => /\brounded-(md|lg|xl|2xl)\b/.test(cl)
      && /\bborder\b|\bbg-white\b/.test(cl)
      && /\bp[xy]?-(stack|stack-lg|section|[3-9]|1[0-2])\b/.test(cl),
    sauf: (cl) => /\b(absolute|fixed|sticky)\b/.test(cl),
  },
  {
    nom: 'badge d’état',
    primitive: '<Badge>',
    fichiers: ['ui/Badge.tsx', 'ui/Chip.tsx'],
    // Pastille teintée portant un texte court en petit corps.
    signature: (cl) => /\brounded-pill\b/.test(cl)
      && /\bbg-(primary|secondary|accent|ink|success|danger|warning|info)-\d/.test(cl)
      && /\btext-(micro|caption)\b/.test(cl),
    sauf: (cl) => /\b(h-\d+|cursor-pointer|min-h-touch)\b/.test(cl),
  },
  {
    nom: 'ligne de méta',
    primitive: '<MetaPill> / <MetaPillGroup>',
    fichiers: ['ui/Chip.tsx', 'ui/MetaPill.tsx'],
    // Icône + libellé court, alignés, en petit corps gris.
    signature: (cl) => /\b(inline-flex|flex) items-center\b/.test(cl)
      && /\bgap-[\w.]+\b/.test(cl)
      && /\btext-(caption|micro)\b/.test(cl)
      && /\btext-ink-[456]00\b/.test(cl),
    sauf: (cl) => /\brounded-pill\b/.test(cl),   // c'est déjà une pastille
  },
  {
    nom: 'pastille d’icône',
    primitive: 'aucune — à créer si le motif se confirme',
    fichiers: [],
    // Carré arrondi qui centre un glyphe : le motif le plus répété du repo.
    signature: (cl) => /\b(inline-flex|flex)\b/.test(cl)
      && /\bitems-center\b/.test(cl) && /\bjustify-center\b/.test(cl)
      && /\brounded-(sm|md|lg|xl|2xl|pill)\b/.test(cl)
      && /\bw-\d+ h-\d+\b/.test(cl)
      && /\bbg-/.test(cl),
    sauf: () => false,
  },
  {
    nom: 'champ de saisie',
    primitive: '<Input>',
    fichiers: ['core/Input.tsx'],
    signature: (cl) => /\brounded-(sm|md|lg|xl)\b/.test(cl)
      && /\bborder\b/.test(cl)
      && /\bpx-[\d.]+\b/.test(cl)
      && /\bfocus:|focus-visible:/.test(cl)
      && /\bw-full\b/.test(cl),
    sauf: (cl) => /\bcursor-pointer\b/.test(cl),
  },
];

/** Les dérives de token : une valeur écrite en dur là où un token existe. */
const DERIVES = [
  { nom: 'couleur en dur (hex dans une classe)', rx: /\[#[0-9a-fA-F]{3,8}\]/g },
  { nom: 'style={{}} portant une couleur',        rx: /style=\{\{[^}]*\b(color|background)\b[^}]*\}\}/g },
  { nom: 'gouttière numérique (token existant)',  rx: /(?<![\w-])gap-(0\.5|2|4|6|8)(?![\w.-])/g },
  { nom: 'taille d’icône hors échelle',           rx: /size=\{(?!14\b|16\b|18\b|20\b|24\b|28\b|32\b|40\b|48\b)\d{1,3}\}/g },
  { nom: 'rayon hors token (rounded-full / 3xl)', rx: /(?<![\w-])rounded-(full|3xl)(?![\w-])/g },
  /* Un pas typographique déclare DÉJÀ son interligne et sa graisse :
       --text-h4: 1.25rem
       --text-h4--line-height: 1.75rem
       --text-h4--font-weight: 700
     Écrire `leading-*` ou `font-*` à côté de `text-h4` annule ce que le token
     dit. C'est de là que viennent les dix combinaisons de titre de carte et les
     six interlignes relevés le 2026-09-10 sur quatre tailles de paragraphe. */
  { nom: 'interligne écrasant un pas typographique',
    rx: /className=(["'`])(?:(?!\1)[\s\S])*?(?:\btext-(?:h[1-4]|body-lg|body-sm|body|caption|micro|hero|section|title|feature|lede)\b(?:(?!\1)[\s\S])*?\bleading-|\bleading-(?:(?!\1)[\s\S])*?\btext-(?:h[1-4]|body-lg|body-sm|body|caption|micro|hero|section|title|feature|lede)\b)/g },
  { nom: 'graisse écrasant un pas de titre',
    rx: /className=(["'`])(?:(?!\1)[\s\S])*?(?:\btext-h[1-4]\b(?:(?!\1)[\s\S])*?\bfont-(?:semibold|extrabold|black|medium|normal)\b|\bfont-(?:semibold|extrabold|black|medium|normal)\b(?:(?!\1)[\s\S])*?\btext-h[1-4]\b)/g },
];

function fichiers(dir, acc = []) {
  for (const nom of readdirSync(dir)) {
    const chemin = join(dir, nom);
    if (statSync(chemin).isDirectory()) fichiers(chemin, acc);
    else if (nom.endsWith('.tsx')) acc.push(chemin);
  }
  return acc;
}

/** Les className, littéraux comme construits par tableau ou concaténation. */
function classNames(src) {
  const out = [];
  for (const m of src.matchAll(/className=(["'`])((?:[^"'`]|\\.)*?)\1/gs)) out.push(m[2]);
  // ⚠️ S'arrêter au PREMIER `]` suivi d'un `.join` ou d'un `.filter`. Sans le
  // `filter`, la forme très répandue `].filter(Boolean).join(' ')` ne matchait
  // pas là, et la capture courait jusqu'à un `].join` bien plus loin — fusionnant
  // les classes de plusieurs éléments et fabriquant de faux positifs.
  for (const m of src.matchAll(/className=\{\[([\s\S]*?)\]\s*\.\s*(?:join|filter)/g)) out.push(m[1]);
  return out.map((c) => c.replace(/\s+/g, ' '));
}

const cibles = fichiers(SRC).filter((f) => {
  const rel = relative(SRC, f);
  return !HORS_PERIMETRE.some((h) => rel.includes(h));
});

const resultats = new Map(FAMILLES.map((f) => [f.nom, { total: 0, parFichier: new Map(), exemple: null }]));
const derives = new Map(DERIVES.map((d) => [d.nom, { total: 0, parFichier: new Map() }]));

for (const f of cibles) {
  const rel = relative(SRC, f);
  const src = readFileSync(f, 'utf8');
  const cls = classNames(src);

  for (const fam of FAMILLES) {
    if (fam.fichiers.some((p) => rel.endsWith(p))) continue;      // le définisseur
    const utilise = new RegExp(`<(${fam.primitive.replace(/[<>]|\s|\/.*/g, '')})\\b`).test(src);
    for (const cl of cls) {
      if (!fam.signature(cl) || fam.sauf(cl)) continue;
      const r = resultats.get(fam.nom);
      r.total += 1;
      r.parFichier.set(rel, (r.parFichier.get(rel) ?? 0) + 1);
      if (!r.exemple) r.exemple = { rel, cl: cl.slice(0, 92), utilise };
    }
  }

  for (const d of DERIVES) {
    const n = (src.match(d.rx) ?? []).length;
    if (!n) continue;
    const r = derives.get(d.nom);
    r.total += n;
    r.parFichier.set(rel, n);
  }
}

const arg = (nom) => {
  const i = process.argv.indexOf(nom);
  return i >= 0 ? (process.argv[i + 1] ?? true) : null;
};
const famVoulue = arg('--famille');
const montrerFichiers = process.argv.includes('--fichiers');

console.log(`Détecteur de composants faits main — ${cibles.length} fichiers de produit\n`);
console.log('══ Éléments qui se comportent comme un composant sans en être un ══\n');
for (const fam of FAMILLES) {
  if (famVoulue && fam.nom !== famVoulue) continue;
  const r = resultats.get(fam.nom);
  console.log(`  ${String(r.total).padStart(4)}  ${fam.nom.padEnd(20)} → devrait passer par ${fam.primitive}`);
  if (r.exemple) console.log(`        ex. ${r.exemple.rel} · ${r.exemple.cl}`);
  if (montrerFichiers) {
    for (const [f, n] of [...r.parFichier].sort((a, b) => b[1] - a[1]).slice(0, 8)) {
      console.log(`           ${String(n).padStart(3)}  ${f}`);
    }
  }
  console.log('');
}

console.log('══ Valeurs écrites en dur là où un token existe ══\n');
for (const d of DERIVES) {
  const r = derives.get(d.nom);
  console.log(`  ${String(r.total).padStart(4)}  ${d.nom}`);
  if (montrerFichiers && r.total) {
    for (const [f, n] of [...r.parFichier].sort((a, b) => b[1] - a[1]).slice(0, 5)) {
      console.log(`           ${String(n).padStart(3)}  ${f}`);
    }
  }
}

console.log('\nUn chiffre n\'est pas un défaut : beaucoup de ces éléments sont légitimes.');
console.log('Ce que la liste donne, c\'est OÙ REGARDER — et, à chaque décision de design,');
console.log('ce qui ne la recevra pas tout seul.');
console.log('\n  --fichiers            détaille par fichier');
console.log('  --famille <nom>       n\'affiche qu\'une famille');
