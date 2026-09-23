/**
 * ArbitragesLab — banc des décisions ouvertes par l'audit du design system du 2026-09-23.
 * Route standalone /_arbitrages, hors shell (même convention que /_design-lab).
 *
 * Chaque décision montre ses options CÔTE À CÔTE, rendues avec les vrais
 * composants et les vrais tokens. Aucune valeur n'est recopiée : les couleurs
 * sont relues dans les variables CSS au rendu et les contrastes calculés en
 * direct (formule WCAG 2.x, couleur résolue par un canvas — piège n°6 ter).
 *
 * Les choix restent dans ce navigateur (localStorage) ; le bouton « Copier mes
 * choix » produit un texte à coller dans la conversation.
 *
 * À supprimer quand les arbitrages sont rendus et appliqués.
 */

import React, { useEffect, useMemo, useState } from 'react';
import { Check, Copy, Users, BookOpen, Bell, Sparkles, ChevronRight, Search as SearchIcon } from 'lucide-react';
import { Button } from '../components/core/Button';
import { Card } from '../components/core/Card';
import { Badge } from '../components/ui/Badge';
import { Avatar } from '../components/ui/Avatar';

/* ─────────────────────────── Couleurs et contraste ─────────────────────────── */

const toRgb = (() => {
  let ctx: CanvasRenderingContext2D | null = null;
  return (css: string): [number, number, number] => {
    if (!ctx) {
      const cv = document.createElement('canvas');
      cv.width = cv.height = 1;
      ctx = cv.getContext('2d', { willReadFrequently: true });
    }
    if (!ctx) return [0, 0, 0];
    ctx.clearRect(0, 0, 1, 1);
    ctx.fillStyle = '#000';
    ctx.fillStyle = css;
    ctx.fillRect(0, 0, 1, 1);
    const d = ctx.getImageData(0, 0, 1, 1).data;
    return [d[0], d[1], d[2]];
  };
})();

const lin = (c: number) => { const v = c / 255; return v <= 0.04045 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4); };
const lum = ([r, g, b]: [number, number, number]) => 0.2126 * lin(r) + 0.7152 * lin(g) + 0.0722 * lin(b);
const ratio = (a: string, b: string) => {
  const la = lum(toRgb(a)), lb = lum(toRgb(b));
  return (Math.max(la, lb) + 0.05) / (Math.min(la, lb) + 0.05);
};
const fmt = (n: number) => n.toFixed(2).replace('.', ',');

/** Relit un token du @theme au rendu : `tok('primary-500')`. */
const useTokens = () => {
  const [ready, setReady] = useState(false);
  useEffect(() => setReady(true), []);
  return useMemo(() => {
    const cs = ready ? getComputedStyle(document.documentElement) : null;
    return (name: string) => (cs ? cs.getPropertyValue(`--color-${name}`).trim() : '#000');
  }, [ready]);
};

/* ─────────────────────────────── Mise en page ─────────────────────────────── */

type Choice = Record<string, string>;
const STORE_KEY = 'tls-arbitrages-2026-09-23';

const readChoices = (): Choice => {
  try { return JSON.parse(localStorage.getItem(STORE_KEY) || '{}'); } catch { return {}; }
};

interface OptionProps {
  id: string;
  letter: string;
  label: string;
  recommended?: boolean;
  selected: boolean;
  onSelect: () => void;
  facts: React.ReactNode[];
  children: React.ReactNode;
}

const Option: React.FC<OptionProps> = ({ letter, label, recommended, selected, onSelect, facts, children }) => (
  <div
    className={[
      'flex flex-col gap-stack rounded-xl border p-stack-lg transition-colors',
      selected ? 'border-primary-700 bg-primary-50' : 'border-ink-200 bg-white',
    ].join(' ')}
  >
    <div className="flex items-start justify-between gap-stack-xs">
      <div className="flex flex-col gap-tight">
        <span className="font-display text-h4 text-ink-900">{letter}. {label}</span>
        {recommended && <Badge variant="brand" size="compact">Recommandé</Badge>}
      </div>
    </div>
    <div className="rounded-lg bg-ink-50 p-stack min-h-[10rem] flex items-center justify-center">{children}</div>
    <ul className="flex flex-col gap-stack-3xs text-caption text-ink-700">
      {facts.map((f, i) => <li key={i}>{f}</li>)}
    </ul>
    <Button
      emphasis={selected ? 'solid' : 'outline'}
      size="sm"
      leadingIcon={selected ? <Check size={14} /> : undefined}
      onClick={onSelect}
    >
      {selected ? 'Choisi' : `Je choisis ${letter}`}
    </Button>
  </div>
);

interface DecisionProps {
  id: string;
  n: number;
  title: string;
  question: string;
  context: React.ReactNode;
  choice: string | undefined;
  setChoice: (id: string, value: string) => void;
  options: Omit<OptionProps, 'selected' | 'onSelect' | 'id'>[];
}

const Decision: React.FC<DecisionProps> = ({ id, n, title, question, context, choice, setChoice, options }) => (
  <section id={id} className="flex flex-col gap-stack-lg scroll-mt-8">
    <header className="flex flex-col gap-stack-xs max-w-prose">
      <span className="text-caption text-ink-600">Décision {n}</span>
      <h2 className="font-display text-h2 text-ink-900">{title}</h2>
      <p className="text-body text-ink-900 font-semibold">{question}</p>
      <div className="text-body-sm text-ink-700 flex flex-col gap-stack-xs">{context}</div>
    </header>
    <div className="grid gap-stack grid-cols-1 lg:grid-cols-3">
      {options.map((o) => (
        <Option key={o.letter} id={id} {...o} selected={choice === o.letter} onSelect={() => setChoice(id, o.letter)} />
      ))}
    </div>
  </section>
);

/* ─────────────────────────────── Spécimens ─────────────────────────────── */

/** Un élément focusable figé dans l'état focus, pour comparer les indicateurs. */
const FocusSpecimen: React.FC<{ ring: 'p500' | 'p700' | 'bicolore'; surface: 'white' | 'tint' | 'dark' }> = ({ ring, surface }) => {
  const SURFACE = { white: 'bg-white', tint: 'bg-primary-50', dark: 'bg-gradient-to-br from-primary-700 to-primary-800' } as const;
  const RING = {
    p500: 'outline outline-2 outline-offset-2 outline-primary-500',
    p700: 'outline outline-2 outline-offset-2 outline-primary-700',
    bicolore: 'ring-2 ring-ink-900 ring-offset-2 ring-offset-white',
  } as const;
  const label = surface === 'dark' ? 'text-white' : 'text-ink-900';
  return (
    <div className={`${SURFACE[surface]} rounded-lg p-stack flex items-center justify-center`}>
      <span className={`inline-flex items-center gap-stack-2xs rounded-lg px-stack py-stack-xs text-body-sm font-semibold ${label} ${RING[ring]}`}>
        <BookOpen size={16} aria-hidden /> Parcours
      </span>
    </div>
  );
};

const ModalSpecimen: React.FC<{ radius: 'rounded-xl' | 'rounded-2xl' | 'rounded-[28px]' }> = ({ radius }) => (
  <div className="relative w-full rounded-lg bg-ink-900/40 p-stack flex items-center justify-center">
    <div className={`w-full max-w-[16rem] bg-white ${radius} p-stack-lg flex flex-col gap-stack-sm`}>
      <span className="font-display text-h4 text-ink-900">Annuler la session ?</span>
      <span className="text-caption text-ink-700">Ton coach sera prévenu.</span>
      <div className="flex gap-stack-xs justify-end">
        <Button emphasis="ghost" size="sm">Garder</Button>
        <Button emphasis="solid" tone="danger" size="sm">Annuler la session</Button>
      </div>
    </div>
  </div>
);

const CHIP_SIZES = [24, 32, 40, 48] as const;
const CHIP_BOX: Record<(typeof CHIP_SIZES)[number], string> = { 24: 'w-6 h-6', 32: 'w-8 h-8', 40: 'w-10 h-10', 48: 'w-12 h-12' };
const CHIP_ICON: Record<(typeof CHIP_SIZES)[number], number> = { 24: 14, 32: 16, 40: 20, 48: 24 };
const CHIP_RADIUS = {
  cercle: { 24: 'rounded-pill', 32: 'rounded-pill', 40: 'rounded-pill', 48: 'rounded-pill' },
  etage: { 24: 'rounded-lg', 32: 'rounded-lg', 40: 'rounded-lg', 48: 'rounded-lg' },
  proportion: { 24: 'rounded-sm', 32: 'rounded-md', 40: 'rounded-md', 48: 'rounded-lg' },
} as const;

const ChipSpecimen: React.FC<{ shape: keyof typeof CHIP_RADIUS }> = ({ shape }) => (
  <div className="flex flex-col gap-stack w-full">
    <div className="flex items-end justify-center gap-stack">
      {CHIP_SIZES.map((s) => (
        <span key={s} className={`${CHIP_BOX[s]} ${CHIP_RADIUS[shape][s]} bg-primary-100 text-primary-800 inline-flex items-center justify-center`}>
          <Bell size={CHIP_ICON[s]} aria-hidden />
        </span>
      ))}
    </div>
    <div className="flex items-center gap-stack-sm bg-white rounded-lg border border-ink-200 p-stack">
      <Avatar initials="SM" size="sm" />
      <span className={`${CHIP_BOX[32]} ${CHIP_RADIUS[shape][32]} bg-secondary-50 text-secondary-800 inline-flex items-center justify-center shrink-0`}>
        <Sparkles size={16} aria-hidden />
      </span>
      <span className="text-caption text-ink-700">Une personne, puis une chose : se distinguent-elles ?</span>
    </div>
  </div>
);

const PaddingSpecimen: React.FC<{ pad: 'p-stack' | 'p-stack-md' | 'p-stack-lg'; px: number }> = ({ pad, px }) => {
  const R = 20;
  const clear = px >= R ? px : R - Math.SQRT2 * (R - px);
  return (
    <div className="flex flex-col gap-stack-xs items-center w-full">
      <div className={`w-full max-w-[15rem] bg-white rounded-xl border border-ink-200 ${pad} flex flex-col gap-stack-xs`}>
        <div className="flex items-start justify-between gap-stack-xs">
          <Badge variant="brand" size="compact">En cours</Badge>
          <span className="text-caption text-ink-600">3/5</span>
        </div>
        <span className="font-display text-h4 text-ink-900">Leadership</span>
        <div className="flex justify-between items-end">
          <span className="text-caption text-ink-600">2 h restantes</span>
          <Button emphasis="soft" size="sm">Reprendre</Button>
        </div>
      </div>
      <span className="text-caption text-ink-600">Au coin : {fmt(clear)} px · au bord : {px} px</span>
    </div>
  );
};

const LEARNERS = [
  { n: 'Marc Lefebvre', i: 'ML', s: 'En difficulté', v: 'danger' as const, a: '14 j' },
  { n: 'Pierre Bernard', i: 'PB', s: 'En difficulté', v: 'danger' as const, a: '8 j' },
  { n: 'Thomas Klein', i: 'TK', s: 'Actif', v: 'success' as const, a: '5 j' },
  { n: 'Camille Durand', i: 'CD', s: 'En avance', v: 'brand' as const, a: 'Hier' },
];

const CollectionSpecimen: React.FC<{ mode: 'cartes' | 'rangees' | 'table' }> = ({ mode }) => {
  if (mode === 'cartes') {
    return (
      <div className="flex flex-col gap-stack-xs w-full">
        {LEARNERS.map((l) => (
          <div key={l.n} className="bg-white rounded-xl border border-ink-200 p-stack flex items-center gap-stack-sm">
            <Avatar initials={l.i} size="sm" />
            <span className="text-body-sm font-semibold text-ink-900 flex-1">{l.n}</span>
            <Badge variant={l.v} size="compact">{l.s}</Badge>
          </div>
        ))}
      </div>
    );
  }
  if (mode === 'rangees') {
    return (
      <div className="w-full bg-white rounded-xl border border-ink-200 divide-y divide-ink-100">
        {LEARNERS.map((l) => (
          <div key={l.n} className="px-stack py-stack-xs flex items-center gap-stack-sm">
            <Avatar initials={l.i} size="sm" />
            <span className="text-body-sm font-semibold text-ink-900 flex-1">{l.n}</span>
            <Badge variant={l.v} size="compact">{l.s}</Badge>
            <ChevronRight size={16} className="text-ink-500" aria-hidden />
          </div>
        ))}
      </div>
    );
  }
  return (
    <div className="w-full bg-white rounded-lg border border-ink-200 overflow-hidden">
      <table className="w-full text-caption">
        <thead className="bg-ink-50 text-ink-700">
          <tr><th className="text-left px-stack-xs py-stack-2xs">Apprenant</th><th className="text-left px-stack-xs">Statut</th><th className="text-right px-stack-xs">Activité ↓</th></tr>
        </thead>
        <tbody>
          {LEARNERS.map((l) => (
            <tr key={l.n} className="border-t border-ink-100">
              <td className="px-stack-xs py-stack-2xs text-ink-900 font-semibold">{l.n}</td>
              <td className="px-stack-xs"><Badge variant={l.v} size="compact">{l.s}</Badge></td>
              <td className="px-stack-xs text-right text-ink-700">{l.a}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const CircleCornerSpecimen: React.FC<{ inset: 'serre' | 'recule' }> = ({ inset }) => (
  <div className="relative w-full max-w-[15rem] h-32 bg-white rounded-xl border border-ink-200">
    <span className={`absolute ${inset === 'serre' ? 'top-3 right-3' : 'top-stack-lg right-stack-lg'} w-9 h-9 rounded-pill bg-primary-100 text-primary-800 inline-flex items-center justify-center`}>
      <Users size={16} aria-hidden />
    </span>
    <div className="absolute left-stack-lg bottom-stack-lg flex flex-col gap-tight">
      <span className="font-display text-h4 text-ink-900">12 apprenants</span>
      <span className="text-caption text-ink-600">Cohorte de septembre</span>
    </div>
  </div>
);

const FieldSpecimen: React.FC<{ border: 'border-ink-300' | 'border-ink-500' }> = ({ border }) => (
  <div className="flex flex-col gap-stack-sm w-full max-w-[15rem]">
    <div className={`flex items-center gap-stack-xs bg-white rounded-lg border ${border} px-stack h-11`}>
      <SearchIcon size={16} className="text-ink-600" aria-hidden />
      <span className="text-body-sm text-ink-500">Rechercher une compétence…</span>
    </div>
    <div className="flex items-center gap-stack-xs">
      <span className={`relative w-11 h-6 rounded-pill ${border === 'border-ink-300' ? 'bg-ink-300' : 'bg-ink-500'}`}>
        <span className="absolute top-1 left-1 w-4 h-4 rounded-pill bg-white" />
      </span>
      <span className="text-caption text-ink-700">Notifications le week-end</span>
    </div>
  </div>
);

const HeroSpecimen: React.FC<{ gradient: 'actuel' | 'fonce' }> = ({ gradient }) => (
  <div className={`w-full rounded-xl p-stack-lg flex flex-col gap-stack-xs ${gradient === 'actuel' ? 'bg-gradient-to-br from-primary-500 via-primary-600 to-primary-700' : 'bg-gradient-to-br from-primary-700 to-primary-800'}`}>
    <span className="text-caption text-white/90">← Retour</span>
    <span className="font-display text-h3 text-white">Fondamentaux du Leadership</span>
    <span className="text-body-sm text-white/85">Les principes essentiels du leadership moderne.</span>
  </div>
);

/* ─────────────────────────────── La page ─────────────────────────────── */

export default function ArbitragesLab() {
  const tok = useTokens();
  const [choices, setChoices] = useState<Choice>(readChoices);
  const [copied, setCopied] = useState(false);

  const setChoice = (id: string, value: string) => {
    setChoices((c) => {
      const next = { ...c, [id]: value };
      try { localStorage.setItem(STORE_KEY, JSON.stringify(next)); } catch { /* mode privé : le choix reste en mémoire */ }
      return next;
    });
  };

  const white = '#ffffff';
  const p50 = tok('primary-50'), p500 = tok('primary-500'), p700 = tok('primary-700'), p800 = tok('primary-800'), ink900 = tok('ink-900');
  const ink300 = tok('ink-300'), ink500 = tok('ink-500');
  const worst = (c: string) => Math.min(ratio(c, white), ratio(c, p50), ratio(c, p700));
  // L'anneau bicolore : l'un des deux anneaux touche toujours la surface avec le plus fort contraste.
  const bicolore = Math.min(...[white, p50, p700].map((bg) => Math.max(ratio(white, bg), ratio(ink900, bg))));

  const DECISIONS: Omit<DecisionProps, 'choice' | 'setChoice'>[] = [
    {
      id: 'focus', n: 1, title: 'Anneau de focus',
      question: 'Quel indicateur de focus pour tout élément focusable de l’app ?',
      context: <p>Aujourd'hui, 186 à 223 éléments portent un contour <code>primary-500</code> ; seul <code>Button</code> porte l'anneau bicolore. WCAG 1.4.11 exige 3:1 contre la surface voisine. Chaque option est montrée sur blanc, sur une carte teintée et sur un hero teal.</p>,
      options: [
        { letter: 'A', label: 'Contour primary-500 (actuel)', facts: [`Pire cas : ${fmt(worst(p500))}:1 (seuil 3:1)`, `Sur blanc : ${fmt(ratio(p500, white))}:1`, 'Aucun changement de code'], children: <div className="grid grid-cols-3 gap-stack-xs w-full"><FocusSpecimen ring="p500" surface="white" /><FocusSpecimen ring="p500" surface="tint" /><FocusSpecimen ring="p500" surface="dark" /></div> },
        { letter: 'B', label: 'Contour primary-700', facts: [`Pire cas : ${fmt(worst(p700))}:1`, `Sur blanc : ${fmt(ratio(p700, white))}:1`, 'Échoue sur les heros teal : même couleur que le fond'], children: <div className="grid grid-cols-3 gap-stack-xs w-full"><FocusSpecimen ring="p700" surface="white" /><FocusSpecimen ring="p700" surface="tint" /><FocusSpecimen ring="p700" surface="dark" /></div> },
        { letter: 'C', label: 'Anneau bicolore de Button', recommended: true, facts: [`Pire cas : ${fmt(bicolore)}:1, partout`, 'Blanc 2 px + ink-900 : un des deux contraste toujours', 'Une utility partagée, remplace les 223 contours'], children: <div className="grid grid-cols-3 gap-stack-xs w-full"><FocusSpecimen ring="bicolore" surface="white" /><FocusSpecimen ring="bicolore" surface="tint" /><FocusSpecimen ring="bicolore" surface="dark" /></div> },
      ],
    },
    {
      id: 'modale', n: 2, title: 'Rayon des modales (R2)',
      question: 'Quel rayon pour les surcouches : modales, tiroirs, feuilles ?',
      context: <p>Les 11 modales sont à 24 px, les cartes à 20, et aucun étage « surcouche » n'est écrit. Material 3 met ses dialogues à 28 dp, Atlassian ses modales au-dessus de ses cartes. Le panneau garde 24 px de padding : c'est ce qui décide de la règle des coins imbriqués.</p>,
      options: [
        { letter: 'A', label: '20, comme les cartes', facts: ['Une seule valeur pour tous les conteneurs', 'Boutons à 24 du coin : forme fixe', 'La modale ne se distingue plus de la carte par la forme'], children: <ModalSpecimen radius="rounded-xl" /> },
        { letter: 'B', label: '24, étage « surcouche » écrit', recommended: true, facts: ['Aucun changement à l’écran : on écrit l’existant', 'Boutons à 24 du coin : forme fixe (24 ≥ 24)', 'Plus l’objet est haut dans l’empilement, plus il est rond'], children: <ModalSpecimen radius="rounded-2xl" /> },
        { letter: 'C', label: '28, comme Material 3', facts: ['Boutons à 24 du coin, sous le rayon 28', 'Règle des coins : rayon des boutons attendu 4, ils sont à 14 → évasés', 'Obligerait à monter le padding à 32'], children: <ModalSpecimen radius="rounded-[28px]" /> },
      ],
    },
    {
      id: 'pastille', n: 3, title: 'Pastille d’icône',
      question: 'Quelle forme pour les pastilles d’icône, et donc pour le futur composant ?',
      context: <p>159 pastilles faites main : 94 cercles, 65 carrés arrondis, 12 tailles, 36 combinaisons. Atlassian réserve le rond aux éléments liés à une personne (avatars). Montrées en 24, 32, 40 et 48 px, puis à côté d'un avatar.</p>,
      options: [
        { letter: 'A', label: 'Cercle', facts: ['La forme la plus répandue aujourd’hui (94)', 'Pas de contrainte de coin (capsule)', 'Se confond avec les avatars, ronds aussi'], children: <ChipSpecimen shape="cercle" /> },
        { letter: 'B', label: 'Carré à 14 (étage interactif)', facts: ['Un seul rayon, quelle que soit la taille', 'À 24 et 32 px, 14 rend presque un cercle', 'La forme change donc selon la taille'], children: <ChipSpecimen shape="etage" /> },
        { letter: 'C', label: 'Carré proportionnel', recommended: true, facts: ['6 · 10 · 10 · 14 selon la taille : se lit carré partout', 'Chose en carré, personne en rond (Atlassian)', 'Tokens existants, aucun nouveau rayon'], children: <ChipSpecimen shape="proportion" /> },
      ],
    },
    {
      id: 'padding', n: 4, title: 'Padding de la carte dense',
      question: 'Quelle marge pour une carte dense ?',
      context: <p>La doctrine garde 16 px « parce que 20 n'existe pas dans l'échelle » ; or <code>stack-md</code> (20) existe et sert 48 fois. Au rayon 20, un padding sous 20 pince le coin quand du contenu s'y trouve. Même carte, trois marges.</p>,
      options: [
        { letter: 'A', label: 'Dense à 16 (actuel)', facts: ['Pince de 10 % au coin', 'Les 48 usages à 20 migrent à 16 ou 24'], children: <PaddingSpecimen pad="p-stack" px={16} /> },
        { letter: 'B', label: 'Trois valeurs : 16, 20, 24', facts: ['Rien à migrer', 'Trois marges pour un même objet'], children: <PaddingSpecimen pad="p-stack-md" px={20} /> },
        { letter: 'C', label: 'Dense à 20, canon à 24', recommended: true, facts: ['Padding = rayon : le coin ne pince plus', 'Deux valeurs, comme aujourd’hui', '`size="sm"` passe de 16 à 20'], children: <PaddingSpecimen pad="p-stack-md" px={20} /> },
      ],
    },
    {
      id: 'collections', n: 5, title: 'Collections',
      question: 'Comment rendre une liste d’objets du même type ?',
      context: <p>Apprenants, notifications, classement, entrées de journal : encore rendus en cartes empilées sur 5 pages. Le tableau de bord coach est passé en table le 23/09.</p>,
      options: [
        { letter: 'A', label: 'Cartes empilées (actuel)', facts: ['Chaque objet a sa coque', 'Pages longues : 10 apprenants = 2 840 px'], children: <CollectionSpecimen mode="cartes" /> },
        { letter: 'B', label: 'Rangées dans une carte', recommended: true, facts: ['Une coque, des séparateurs', 'Règle : par défaut pour une collection', 'Table quand on doit trier'], children: <CollectionSpecimen mode="rangees" /> },
        { letter: 'C', label: 'Table partout', facts: ['Tri et comparaison', 'Trop sec pour des listes courtes côté apprenant'], children: <CollectionSpecimen mode="table" /> },
      ],
    },
    {
      id: 'cercles', n: 6, title: 'Cercles près d’un coin',
      question: 'La règle des coins imbriqués s’applique-t-elle aux cercles et capsules ?',
      context: <p>21 cercles ou capsules sont posés près d'un coin, à moins du rayon. Apple fait de la capsule une forme à part entière, sans parler de sa position.</p>,
      options: [
        { letter: 'A', label: 'Exempter les cercles', recommended: true, facts: ['Une capsule n’a pas de coin à accorder', 'Aucune correction'], children: <CircleCornerSpecimen inset="serre" /> },
        { letter: 'B', label: 'Les reculer au retrait ≥ rayon', facts: ['Le cercle quitte la zone du coin', '21 corrections de position'], children: <CircleCornerSpecimen inset="recule" /> },
        { letter: '—', label: 'Pas d’avis', facts: ['On laisse ouvert'], children: <span className="text-caption text-ink-600">Laisser la décision ouverte</span> },
      ],
    },
  ];

  const VALIDATIONS: Omit<DecisionProps, 'choice' | 'setChoice'>[] = [
    {
      id: 'champ', n: 7, title: 'Filet des champs et interrupteurs',
      question: 'Le correctif proposé te convient-il ?',
      context: <p>Pas une décision de doctrine : WCAG 1.4.11 impose 3:1 au contour d'un champ. C'est le rendu qui change, d'où la validation.</p>,
      options: [
        { letter: 'A', label: 'ink-300 (actuel)', facts: [`Contour : ${fmt(ratio(ink300, white))}:1 — échoue`], children: <FieldSpecimen border="border-ink-300" /> },
        { letter: 'B', label: 'ink-500 (proposé)', recommended: true, facts: [`Contour : ${fmt(ratio(ink500, white))}:1`, 'Même filet que Button neutre'], children: <FieldSpecimen border="border-ink-500" /> },
        { letter: '—', label: 'Autre chose', facts: ['Dis-moi quoi'], children: <span className="text-caption text-ink-600">À préciser</span> },
      ],
    },
    {
      id: 'hero', n: 8, title: 'Heros de parcours',
      question: 'Le dégradé foncé proposé te convient-il ?',
      context: <p>Les heros <code>brand</code>, <code>warm</code> et <code>sun</code> partent du cran 500 : le texte blanc y mesure 2,44 à 3,22. La Sidebar est déjà en 700 vers 800.</p>,
      options: [
        { letter: 'A', label: '500 vers 700 (actuel)', facts: [`Blanc sur 500 : ${fmt(ratio(white, p500))}:1 — échoue`], children: <HeroSpecimen gradient="actuel" /> },
        { letter: 'B', label: '700 vers 800 (proposé)', recommended: true, facts: [`Blanc sur 700 : ${fmt(ratio(white, p700))}:1`, `Blanc sur 800 : ${fmt(ratio(white, p800))}:1`], children: <HeroSpecimen gradient="fonce" /> },
        { letter: '—', label: 'Autre chose', facts: ['Par exemple le ton `flat` partout'], children: <span className="text-caption text-ink-600">À préciser</span> },
      ],
    },
  ];

  const all = [...DECISIONS, ...VALIDATIONS];
  const summary = all
    .map((d) => {
      const c = choices[d.id];
      const opt = d.options.find((o) => o.letter === c);
      return `${d.n}. ${d.title} : ${opt ? `${opt.letter} — ${opt.label}` : 'non tranché'}`;
    })
    .join('\n');

  const copy = async () => {
    try { await navigator.clipboard.writeText(summary); setCopied(true); setTimeout(() => setCopied(false), 2000); } catch { setCopied(false); }
  };

  const done = all.filter((d) => choices[d.id]).length;

  return (
    <div className="min-h-[100dvh] bg-ink-50 text-ink-900 font-body">
      <div className="mx-auto max-w-[80rem] px-4 sm:px-6 lg:px-10 py-section flex flex-col gap-section">
        <header className="flex flex-col gap-stack max-w-prose">
          <h1 className="font-display text-h1 text-ink-900">Arbitrages du design system</h1>
          <p className="text-body text-ink-700">
            Six décisions ouvertes par l'audit du 23/09, puis deux correctifs à valider. Chaque option est rendue avec les vrais composants ; les contrastes sont calculés en direct sur les tokens. Choisis, puis copie tes choix dans la conversation.
          </p>
          <nav aria-label="Décisions" className="flex flex-wrap gap-stack-xs">
            {all.map((d) => (
              <a key={d.id} href={`#${d.id}`} className="inline-flex items-center gap-stack-3xs rounded-pill border border-ink-200 bg-white px-stack-sm py-stack-3xs text-caption text-ink-800 hover:border-ink-300">
                {choices[d.id] && <Check size={12} className="text-primary-800" aria-hidden />}
                {d.n}. {d.title}
              </a>
            ))}
          </nav>
        </header>

        {DECISIONS.map((d) => <Decision key={d.id} {...d} choice={choices[d.id]} setChoice={setChoice} />)}

        <div className="border-t border-ink-200 pt-section flex flex-col gap-section">
          <h2 className="font-display text-h2 text-ink-900">À valider</h2>
          {VALIDATIONS.map((d) => <Decision key={d.id} {...d} choice={choices[d.id]} setChoice={setChoice} />)}
        </div>

        <Card as="section" aria-label="Mes choix" className="flex flex-col gap-stack">
          <div className="flex items-center justify-between gap-stack">
            <h2 className="font-display text-h3 text-ink-900">Mes choix ({done}/{all.length})</h2>
            <Button emphasis="solid" leadingIcon={copied ? <Check size={16} /> : <Copy size={16} />} onClick={copy}>
              {copied ? 'Copié' : 'Copier mes choix'}
            </Button>
          </div>
          <pre className="whitespace-pre-wrap font-mono text-caption text-ink-800 bg-ink-50 rounded-lg p-stack">{summary}</pre>
        </Card>
      </div>
    </div>
  );
}
