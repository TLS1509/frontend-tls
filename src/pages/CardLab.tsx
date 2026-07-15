/**
 * CardLab — page de test isolée pour la card ressource unifiée (Learning Space + Parcours).
 * Route standalone /_card-lab. 3 directions côte à côte, contenu réel + états.
 * NON extendu tant qu'une direction n'est pas choisie. À supprimer après validation.
 */

import React from 'react';
import {
  Flame, Layers, Map, FileText, Play, Lock, Check, ArrowRight, Clock,
} from 'lucide-react';

type Tone = 'brand' | 'warm' | 'sun';
type SampleType = 'astuce' | 'flashcard' | 'guide' | 'video' | 'ressource';

const TYPE_META: Record<SampleType, { tone: Tone; label: string; icon: React.ReactNode }> = {
  astuce:    { tone: 'sun',   label: 'Astuce',     icon: <Flame size={16} strokeWidth={1.9} /> },
  flashcard: { tone: 'brand', label: 'Flashcards', icon: <Layers size={16} strokeWidth={1.9} /> },
  guide:     { tone: 'brand', label: 'Guide',      icon: <Map size={16} strokeWidth={1.9} /> },
  ressource: { tone: 'brand', label: 'Ressource',  icon: <FileText size={16} strokeWidth={1.9} /> },
  video:     { tone: 'warm',  label: 'Vidéo',      icon: <Play size={16} strokeWidth={1.9} /> },
};

// tone → classes (accent porté par icône / bordure / lien — jamais les pills meta)
const ICON_BUBBLE: Record<Tone, string> = {
  brand: 'bg-primary-100 text-primary-600',
  warm:  'bg-secondary-100 text-secondary-600',
  sun:   'bg-accent-100 text-accent-700',
};
const COVER_GRAD: Record<Tone, string> = {
  brand: 'bg-gradient-to-br from-primary-100 to-primary-50 text-primary-600',
  warm:  'bg-gradient-to-br from-secondary-100 to-secondary-50 text-secondary-600',
  sun:   'bg-gradient-to-br from-accent-100 to-accent-50 text-accent-700',
};
const HOVER_BORDER: Record<Tone, string> = {
  brand: 'hover:border-primary-300',
  warm:  'hover:border-secondary-300',
  sun:   'hover:border-accent-300',
};
/* Direction D — bordure teintée visible AU REPOS (pas seulement au hover). */
const OUTLINE_BORDER: Record<Tone, string> = {
  brand: 'border-primary-300 hover:border-primary-400',
  warm:  'border-secondary-300 hover:border-secondary-400',
  sun:   'border-accent-300 hover:border-accent-400',
};
const ACCENT_TEXT: Record<Tone, string> = {
  brand: 'text-primary-600',
  warm:  'text-secondary-600',
  sun:   'text-accent-700',
};

interface Item {
  id: string;
  type: SampleType;
  title: string;
  desc: string;
  duration: string;
  level: string;
  theme: string;
  state?: 'locked' | 'done';
}

const ITEMS: Item[] = [
  { id: '1', type: 'astuce',    title: '5 phrases pour désamorcer un conflit', desc: 'Boîte à outils linguistique pour réorienter une conversation tendue.', duration: '3 min', level: 'Intermédiaire', theme: 'Communication' },
  { id: '2', type: 'flashcard', title: '10 concepts clés du leadership', desc: 'Cartes recto-verso pour mémoriser les fondamentaux.', duration: '8 min', level: 'Débutant', theme: 'Leadership' },
  { id: '3', type: 'guide',     title: 'Les 5 styles de leadership situationnel', desc: 'Guide pas-à-pas pour adapter ta posture à chaque contexte.', duration: '15 min', level: 'Intermédiaire', theme: 'Management' },
  { id: '4', type: 'video',     title: 'Animer un brainstorming en 30 min', desc: 'Démo filmée d\'une session de créativité guidée.', duration: '18 min', level: 'Avancé', theme: 'Créativité' },
  { id: '5', type: 'ressource', title: 'Template : Plan de communication', desc: 'Modèle Notion prêt à remplir pour structurer un plan de com.', duration: '15 min', level: 'Débutant', theme: 'Communication', state: 'locked' },
  { id: '6', type: 'astuce',    title: 'Le bon prompt en 3 étapes', desc: 'Méthode rapide pour formuler une demande efficace à une IA.', duration: '4 min', level: 'Débutant', theme: 'IA & Tech', state: 'done' },
];

const MetaPill: React.FC<{ children: React.ReactNode; icon?: React.ReactNode }> = ({ children, icon }) => (
  <span className="inline-flex items-center gap-1 rounded-pill px-2 py-0.5 text-micro font-medium bg-ink-50 text-ink-700 border border-ink-200">
    {icon}{children}
  </span>
);

/* Base structurelle SANS couleur de bordure — chaque direction compose sa propre
   largeur/couleur de bordure pour éviter la collision BASE vs STATUS (CLAUDE.md piège #6). */
const CARD_SHARED =
  'group relative text-left w-full flex flex-col rounded-2xl bg-white shadow-card ' +
  'transition-[transform,box-shadow,border-color] duration-base ease-emphasis cursor-pointer ' +
  'hover:-translate-y-0.5 hover:shadow-card-hover ' +
  'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500';

/* A/B/C — bordure neutre au repos, teintée seulement au hover. */
const CARD_BASE = `${CARD_SHARED} border border-ink-100`;

/* D — bordure teintée dès le repos (2px, plus affirmée, jamais juste au hover). */
const CARD_BASE_OUTLINE = `${CARD_SHARED} border-2`;

/* ─── Direction A — Tappable minimal (snacking, pas de bouton) ───────────────── */
const CardA: React.FC<{ item: Item }> = ({ item }) => {
  const m = TYPE_META[item.type];
  const locked = item.state === 'locked';
  const done = item.state === 'done';
  return (
    <button type="button" className={`${CARD_BASE} p-4 gap-2.5 ${HOVER_BORDER[m.tone]} ${locked ? 'opacity-70' : ''}`}>
      <div className="flex items-center gap-2.5">
        <span className={`shrink-0 grid place-items-center w-9 h-9 rounded-xl ${locked ? 'bg-ink-100 text-ink-400' : ICON_BUBBLE[m.tone]}`}>
          {locked ? <Lock size={15} /> : m.icon}
        </span>
        <span className={`text-micro font-bold uppercase tracking-[0.05em] ${ACCENT_TEXT[m.tone]}`}>{m.label}</span>
        <span className="text-caption text-ink-400">· {item.duration}</span>
        {done && <span className="ml-auto inline-flex items-center gap-1 text-micro font-semibold text-success-fg"><Check size={13} /> Fait</span>}
      </div>
      <h3 className="m-0 font-display text-body-lg font-bold leading-snug text-ink-900 line-clamp-2 tracking-tight">{item.title}</h3>
      <p className="m-0 text-caption text-ink-500 leading-snug line-clamp-2">{item.desc}</p>
      {locked ? (
        <span className="mt-1 inline-flex items-center gap-1.5 text-caption text-ink-500"><Lock size={12} /> Upgrade requis</span>
      ) : (
        <div className="mt-1 flex items-center gap-1.5">
          <MetaPill>{item.level}</MetaPill>
          <MetaPill>{item.theme}</MetaPill>
          <ArrowRight size={16} className={`ml-auto ${ACCENT_TEXT[m.tone]} opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all`} />
        </div>
      )}
    </button>
  );
};

/* ─── Direction B — Cover aperçu (zone teintée + pill glass) ─────────────────── */
const CardB: React.FC<{ item: Item }> = ({ item }) => {
  const m = TYPE_META[item.type];
  const locked = item.state === 'locked';
  const done = item.state === 'done';
  return (
    <button type="button" className={`${CARD_BASE} overflow-hidden ${HOVER_BORDER[m.tone]} ${locked ? 'opacity-70' : ''}`}>
      {/* Cover teintée = l'aperçu */}
      <div className={`relative h-20 flex items-center justify-center ${locked ? 'bg-ink-100 text-ink-400' : COVER_GRAD[m.tone]}`}>
        <span className="scale-[1.6]">{locked ? <Lock size={16} /> : m.icon}</span>
        {/* pill glass durée (bon usage du glass : sur fond coloré) */}
        <span className="absolute top-2 right-2 inline-flex items-center gap-1 rounded-pill px-2 py-0.5 text-micro font-semibold bg-white/60 backdrop-blur-glass-light text-ink-700 border border-white/60">
          <Clock size={11} /> {item.duration}
        </span>
        {done && <span className="absolute top-2 left-2 inline-flex items-center justify-center w-6 h-6 rounded-pill bg-white/80 text-success-fg"><Check size={14} /></span>}
      </div>
      <div className="flex flex-col gap-1.5 p-4">
        <span className={`text-micro font-bold uppercase tracking-[0.05em] ${ACCENT_TEXT[m.tone]}`}>{m.label}</span>
        <h3 className="m-0 font-display text-body-lg font-bold leading-snug text-ink-900 line-clamp-2 tracking-tight">{item.title}</h3>
        <p className="m-0 text-caption text-ink-500 leading-snug line-clamp-2">{item.desc}</p>
        {locked ? (
          <span className="mt-1 inline-flex items-center gap-1.5 text-caption text-ink-500"><Lock size={12} /> Upgrade requis</span>
        ) : (
          <div className="mt-1 flex items-center gap-1.5">
            <MetaPill>{item.level}</MetaPill>
            <MetaPill>{item.theme}</MetaPill>
          </div>
        )}
      </div>
    </button>
  );
};

/* ─── Direction C — Hybride (tappable + lien ghost "Ouvrir →") ───────────────── */
const CardC: React.FC<{ item: Item }> = ({ item }) => {
  const m = TYPE_META[item.type];
  const locked = item.state === 'locked';
  const done = item.state === 'done';
  return (
    <button type="button" className={`${CARD_BASE} p-4 gap-2.5 ${HOVER_BORDER[m.tone]} ${locked ? 'opacity-70' : ''}`}>
      <div className="flex items-start gap-2.5">
        <span className={`shrink-0 grid place-items-center w-10 h-10 rounded-xl ${locked ? 'bg-ink-100 text-ink-400' : ICON_BUBBLE[m.tone]}`}>
          {locked ? <Lock size={16} /> : m.icon}
        </span>
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-1.5">
            <span className={`text-micro font-bold uppercase tracking-[0.05em] ${ACCENT_TEXT[m.tone]}`}>{m.label}</span>
            <span className="text-caption text-ink-400">· {item.duration}</span>
            {done && <span className="ml-auto inline-flex items-center gap-1 text-micro font-semibold text-success-fg"><Check size={13} /> Fait</span>}
          </div>
          <h3 className="m-0 mt-0.5 font-display text-body-lg font-bold leading-snug text-ink-900 line-clamp-2 tracking-tight">{item.title}</h3>
        </div>
      </div>
      <p className="m-0 text-caption text-ink-500 leading-snug line-clamp-2">{item.desc}</p>
      <div className="mt-1 flex items-center gap-1.5 pt-2.5 border-t border-ink-100">
        {locked ? (
          <span className="inline-flex items-center gap-1.5 text-caption text-ink-500"><Lock size={12} /> Upgrade requis</span>
        ) : (
          <>
            <MetaPill>{item.level}</MetaPill>
            <MetaPill>{item.theme}</MetaPill>
            <span className={`ml-auto inline-flex items-center gap-1 text-caption font-semibold ${ACCENT_TEXT[m.tone]}`}>
              {done ? 'Revoir' : 'Ouvrir'} <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
            </span>
          </>
        )}
      </div>
    </button>
  );
};

/* ─── Direction D — Bordure teintée toujours visible (même layout que A) ─────── */
const CardD: React.FC<{ item: Item }> = ({ item }) => {
  const m = TYPE_META[item.type];
  const locked = item.state === 'locked';
  const done = item.state === 'done';
  return (
    <button
      type="button"
      className={`${CARD_BASE_OUTLINE} p-4 gap-2.5 ${locked ? 'border-ink-200 opacity-70' : OUTLINE_BORDER[m.tone]}`}
    >
      <div className="flex items-center gap-2.5">
        <span className={`shrink-0 grid place-items-center w-9 h-9 rounded-xl ${locked ? 'bg-ink-100 text-ink-400' : ICON_BUBBLE[m.tone]}`}>
          {locked ? <Lock size={15} /> : m.icon}
        </span>
        <span className={`text-micro font-bold uppercase tracking-[0.05em] ${ACCENT_TEXT[m.tone]}`}>{m.label}</span>
        <span className="text-caption text-ink-400">· {item.duration}</span>
        {done && <span className="ml-auto inline-flex items-center gap-1 text-micro font-semibold text-success-fg"><Check size={13} /> Fait</span>}
      </div>
      <h3 className="m-0 font-display text-body-lg font-bold leading-snug text-ink-900 line-clamp-2 tracking-tight">{item.title}</h3>
      <p className="m-0 text-caption text-ink-500 leading-snug line-clamp-2">{item.desc}</p>
      {locked ? (
        <span className="mt-1 inline-flex items-center gap-1.5 text-caption text-ink-500"><Lock size={12} /> Upgrade requis</span>
      ) : (
        <div className="mt-1 flex items-center gap-1.5">
          <MetaPill>{item.level}</MetaPill>
          <MetaPill>{item.theme}</MetaPill>
          <ArrowRight size={16} className={`ml-auto ${ACCENT_TEXT[m.tone]} opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all`} />
        </div>
      )}
    </button>
  );
};

const DIRECTIONS = [
  { id: 'A', name: 'Tappable minimal', desc: 'Card entièrement cliquable, zéro bouton. Flèche au hover. Le plus « feed/snacking ».', Card: CardA },
  { id: 'B', name: 'Cover aperçu', desc: 'Zone teintée en tête = l\'aperçu (icône + pill glass durée). Plus riche visuellement.', Card: CardB },
  { id: 'C', name: 'Hybride + lien', desc: 'Tappable, mais lien « Ouvrir → » explicite en pied (pas de bouton plein).', Card: CardC },
  { id: 'D', name: 'Bordure teintée (repos)', desc: 'Même layout que A, mais bordure 2px colorée dès le repos — pas juste au hover.', Card: CardD },
];

export const CardLab: React.FC = () => (
  <div className="min-h-[100dvh] w-full bg-gradient-page-ambient">
    <header className="px-6 sm:px-8 py-5 border-b border-ink-100 bg-white/80 backdrop-blur-glass-light sticky top-0 z-10">
      <h1 className="m-0 font-display text-h4 font-bold text-ink-900 tracking-headline">Card ressource unifiée — 3 directions</h1>
      <p className="m-0 text-caption text-ink-500 mt-0.5">
        Remplace LearningItemCard + ResourceCard · grammaire meta unifiée · niveau en mots · tappable · contenu + états réels.
      </p>
    </header>

    <div className="flex flex-col gap-10 px-6 sm:px-8 py-8 max-w-6xl mx-auto">
      {DIRECTIONS.map(({ id, name, desc, Card }) => (
        <section key={id} className="flex flex-col gap-4">
          <div className="flex items-baseline gap-2">
            <span className="inline-flex items-center justify-center w-7 h-7 rounded-pill bg-ink-900 text-white text-caption font-bold">{id}</span>
            <div>
              <h2 className="m-0 font-display text-h4 font-bold text-ink-900 tracking-headline">{name}</h2>
              <p className="m-0 text-caption text-ink-500">{desc}</p>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {ITEMS.map((it) => <Card key={it.id} item={it} />)}
          </div>
        </section>
      ))}
    </div>
  </div>
);

export default CardLab;
