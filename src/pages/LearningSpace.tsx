import React, { useState } from 'react';
import {
  BookOpen,
  Clock,
  Flame,
  Search,
  Play,
  Video,
  Headphones,
  FileText,
  Map,
  Calendar,
  Users,
  Star,
  ChevronRight,
  Layers,
} from 'lucide-react';
import {
  Card,
  CardTitle,
  CardDesc,
  Button,
  Badge,
  Tabs,
  ProgressBar,
} from '../components';
import './LearningSpace.css';

type TabId = 'all' | 'parcours' | 'ressources' | 'live' | 'flashcards';

const TAB_ITEMS = [
  { id: 'all', label: 'Tout' },
  { id: 'parcours', label: 'Parcours' },
  { id: 'ressources', label: 'Ressources' },
  { id: 'live', label: 'Live & Workshops' },
  { id: 'flashcards', label: 'Flashcards' },
];

const SectionHeading: React.FC<{
  title: string;
  icon?: React.ReactNode;
  action?: React.ReactNode;
}> = ({ title, icon, action }) => (
  <div className="flex items-center justify-between mb-4">
    <h2 className="flex items-center gap-2 text-h3 font-bold text-ink-900 m-0">
      {icon}
      {title}
    </h2>
    {action}
  </div>
);

const FormatChip: React.FC<{ label: string; icon?: React.ReactNode }> = ({ label, icon }) => (
  <span className="inline-flex items-center gap-1 px-2 py-1 bg-ink-50 border border-ink-200 rounded-pill text-caption text-ink-500 font-medium">
    {icon}
    {label}
  </span>
);

/* ─── Tab content ────────────────────────────────────────────────── */

const TabAll: React.FC = () => (
  <div className="flex flex-col gap-8">
    <section>
      <SectionHeading
        title="En cours"
        icon={<Play size={18} className="text-primary-500" />}
        action={
          <Button variant="ghost" size="sm">
            Voir tout <ChevronRight size={14} />
          </Button>
        }
      />
      <div className="flex flex-col gap-3">
        <Card variant="interactive" as="article">
          <div className="p-5">
            <div className="flex items-start justify-between gap-4 mb-3">
              <div className="flex-1">
                <Badge variant="brand" className="mb-2">
                  Parcours
                </Badge>
                <CardTitle className="mb-1">Fondamentaux du leadership</CardTitle>
                <CardDesc>
                  Prochaine leçon : Communication assertive — Module 4/7
                </CardDesc>
              </div>
              <Button size="sm">Continuer</Button>
            </div>
            <ProgressBar value={65} fill="brand" size="sm" label="Progression" />
          </div>
        </Card>

        <Card variant="interactive" as="article">
          <div className="p-5">
            <div className="flex items-start justify-between gap-4 mb-3">
              <div className="flex-1">
                <Badge variant="warm" className="mb-2">
                  Parcours
                </Badge>
                <CardTitle className="mb-1">Transformation digitale</CardTitle>
                <CardDesc>Prochaine leçon : Roadmap d'adoption — Module 2/8</CardDesc>
              </div>
              <Button size="sm">Continuer</Button>
            </div>
            <ProgressBar value={20} fill="warm" size="sm" label="Progression" />
          </div>
        </Card>
      </div>
    </section>

    <section>
      <SectionHeading title="Recommandé pour vous" icon={<Star size={18} className="text-primary-500" />} />
      <div className="tls-grid">
        <Card variant="interactive" as="article">
          <div className="p-5 flex flex-col gap-3">
            <Badge variant="brand">Vidéo</Badge>
            <CardTitle>Prompt structure en 5 étapes</CardTitle>
            <CardDesc>
              Maîtrisez l'art du prompt engineering avec des frameworks éprouvés pour l'IA générative.
            </CardDesc>
            <FormatChip label="12 min" icon={<Video size={11} />} />
          </div>
        </Card>

        <Card variant="interactive" as="article">
          <div className="p-5 flex flex-col gap-3">
            <Badge variant="sun">Masterclass</Badge>
            <CardTitle>IA et apprentissage hybride</CardTitle>
            <CardDesc>
              Découvrez comment intégrer l'IA dans vos pratiques pédagogiques et professionnelles.
            </CardDesc>
            <FormatChip label="45 min" icon={<Video size={11} />} />
          </div>
        </Card>

        <Card variant="interactive" as="article">
          <div className="p-5 flex flex-col gap-3">
            <Badge variant="success">Guide</Badge>
            <CardTitle>Manager à l'ère du numérique</CardTitle>
            <CardDesc>
              Outils et méthodes pour accompagner vos équipes dans la transition technologique.
            </CardDesc>
            <FormatChip label="Lecture 8 min" icon={<FileText size={11} />} />
          </div>
        </Card>
      </div>
    </section>

    <section>
      <SectionHeading title="À venir" icon={<Calendar size={18} className="text-primary-500" />} />
      <Card variant="feature" as="article">
        <div className="p-6 flex flex-wrap items-center justify-between gap-6">
          <div className="flex flex-col gap-2">
            <Badge variant="danger">Live</Badge>
            <CardTitle>Workshop : Feedback &amp; culture apprenante</CardTitle>
            <div className="flex flex-wrap gap-3">
              <FormatChip label="Jeudi 8 mai · 14h00" icon={<Calendar size={11} />} />
              <FormatChip label="Avec Sophie Martin" icon={<Users size={11} />} />
              <FormatChip label="12 places restantes" icon={<Star size={11} />} />
            </div>
          </div>
          <Button>M'inscrire</Button>
        </div>
      </Card>
    </section>
  </div>
);

const TabParcours: React.FC = () => {
  const parcours = [
    {
      title: 'Fondamentaux du leadership',
      desc: 'Développez votre posture de leader et vos compétences relationnelles.',
      progress: 65,
      modules: 7,
      duration: '6h30',
      fill: 'brand' as const,
      badge: 'brand' as const,
    },
    {
      title: 'Transformation digitale',
      desc: 'Comprenez les enjeux et pilotez la transformation numérique de votre organisation.',
      progress: 20,
      modules: 8,
      duration: '8h',
      fill: 'warm' as const,
      badge: 'warm' as const,
    },
    {
      title: 'Prise de parole en public',
      desc: 'Techniques avancées pour captiver votre audience et structurer vos interventions.',
      progress: 0,
      modules: 5,
      duration: '4h',
      fill: 'gradient' as const,
      badge: 'sun' as const,
    },
  ];

  return (
    <div className="flex flex-col gap-4">
      {parcours.map((p) => (
        <Card key={p.title} variant="interactive" as="article">
          <div className="p-5">
            <div className="flex items-start justify-between gap-4 mb-4">
              <div className="flex-1">
                <Badge variant={p.badge} className="mb-2">
                  Parcours
                </Badge>
                <CardTitle className="mb-1">{p.title}</CardTitle>
                <CardDesc className="mb-3">{p.desc}</CardDesc>
                <div className="flex flex-wrap gap-3">
                  <FormatChip label={`${p.modules} modules`} icon={<Layers size={11} />} />
                  <FormatChip label={p.duration} icon={<Clock size={11} />} />
                </div>
              </div>
              <Button size="sm" variant={p.progress > 0 ? 'primary' : 'secondary'}>
                {p.progress > 0 ? 'Continuer' : 'Commencer'}
              </Button>
            </div>
            <ProgressBar
              value={p.progress}
              fill={p.fill}
              size="sm"
              label={p.progress > 0 ? 'Progression' : 'Non commencé'}
            />
          </div>
        </Card>
      ))}
    </div>
  );
};

const TabRessources: React.FC = () => {
  const [filter, setFilter] = useState<string>('all');

  const filters = [
    { id: 'all', label: 'Tous' },
    { id: 'articles', label: 'Articles' },
    { id: 'videos', label: 'Vidéos' },
    { id: 'podcasts', label: 'Podcasts' },
    { id: 'guides', label: 'Guides' },
  ];

  const resources = [
    { type: 'articles', icon: <FileText size={20} />, badge: 'brand' as const, title: 'Les 7 habitudes des leaders efficaces', duration: 'Lecture 6 min' },
    { type: 'videos', icon: <Video size={20} />, badge: 'warm' as const, title: 'Maîtriser le feedback en 3 étapes', duration: '14 min' },
    { type: 'podcasts', icon: <Headphones size={20} />, badge: 'sun' as const, title: 'Le futur du travail – épisode 12', duration: '28 min' },
    { type: 'guides', icon: <Map size={20} />, badge: 'success' as const, title: 'Guide complet : Gestion de projet agile', duration: 'Lecture 12 min' },
  ];

  const filtered = filter === 'all' ? resources : resources.filter((r) => r.type === filter);

  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-wrap gap-2">
        {filters.map((f) => {
          const isActive = filter === f.id;
          return (
            <button
              key={f.id}
              type="button"
              onClick={() => setFilter(f.id)}
              className={[
                'px-3 py-1 border rounded-pill text-caption font-medium cursor-pointer transition-colors',
                isActive
                  ? 'bg-primary-500 border-primary-500 text-white'
                  : 'bg-white border-ink-200 text-ink-700 hover:bg-ink-50',
              ].join(' ')}
            >
              {f.label}
            </button>
          );
        })}
      </div>

      <div className="tls-grid">
        {filtered.map((r) => (
          <Card key={r.title} variant="interactive" as="article">
            <div className="p-5 flex flex-col gap-3">
              <div className="w-11 h-11 rounded-lg bg-ink-50 border border-ink-200 flex items-center justify-center text-primary-500">
                {r.icon}
              </div>
              <Badge variant={r.badge}>
                {r.type.charAt(0).toUpperCase() + r.type.slice(1, -1)}
              </Badge>
              <CardTitle className="text-body font-semibold">{r.title}</CardTitle>
              <FormatChip label={r.duration} icon={<Clock size={11} />} />
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

const TabLive: React.FC = () => (
  <div className="flex flex-col gap-5">
    <SectionHeading title="Sessions à venir" icon={<Calendar size={18} className="text-primary-500" />} />

    <Card variant="feature" as="article">
      <div className="p-6 flex flex-col gap-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <Badge variant="danger">Live · Jeudi 8 mai</Badge>
          <Badge variant="brand">12 places restantes</Badge>
        </div>
        <CardTitle>Workshop : Feedback &amp; culture apprenante</CardTitle>
        <CardDesc>
          Apprenez à instaurer une culture du feedback bienveillant et à en faire un levier de
          performance collective.
        </CardDesc>
        <div className="flex flex-wrap gap-3">
          <FormatChip label="14h00 – 15h30" icon={<Clock size={11} />} />
          <FormatChip label="Animé par Sophie Martin" icon={<Users size={11} />} />
        </div>
        <div>
          <Button>M'inscrire</Button>
        </div>
      </div>
    </Card>

    <Card variant="feature" as="article">
      <div className="p-6 flex flex-col gap-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <Badge variant="danger">Live · Mardi 13 mai</Badge>
          <Badge variant="warm">4 places restantes</Badge>
        </div>
        <CardTitle>Masterclass : Piloter avec les données</CardTitle>
        <CardDesc>
          Intégrez la data dans votre management pour prendre de meilleures décisions et motiver vos
          équipes.
        </CardDesc>
        <div className="flex flex-wrap gap-3">
          <FormatChip label="10h00 – 11h30" icon={<Clock size={11} />} />
          <FormatChip label="Animé par Thomas Leroy" icon={<Users size={11} />} />
        </div>
        <div>
          <Button>M'inscrire</Button>
        </div>
      </div>
    </Card>

    <SectionHeading title="Replay disponible" icon={<Video size={18} className="text-primary-500" />} />
    <Card variant="interactive" as="article">
      <div className="p-5 flex flex-wrap items-center justify-between gap-4">
        <div className="flex-1">
          <Badge variant="success" className="mb-2">
            Replay
          </Badge>
          <CardTitle className="mb-1">Intelligence émotionnelle au travail</CardTitle>
          <CardDesc>Session du 22 avril – 58 min</CardDesc>
        </div>
        <Button variant="secondary" size="sm">
          <Play size={14} /> Regarder
        </Button>
      </div>
    </Card>
  </div>
);

const TabFlashcards: React.FC = () => {
  const decks = [
    { title: 'Leadership & management', count: 48, last: 'Il y a 2 jours', badge: 'brand' as const },
    { title: 'Transformation digitale', count: 32, last: 'Il y a 5 jours', badge: 'warm' as const },
    { title: 'Communication & soft skills', count: 24, last: 'Il y a 1 semaine', badge: 'sun' as const },
  ];

  return (
    <div className="flex flex-col gap-4">
      {decks.map((d) => (
        <Card key={d.title} variant="interactive" as="article">
          <div className="p-5 flex flex-wrap items-center justify-between gap-4">
            <div className="flex-1 flex flex-col gap-2">
              <Badge variant={d.badge}>Deck</Badge>
              <CardTitle className="mb-0">{d.title}</CardTitle>
              <div className="flex flex-wrap gap-3">
                <FormatChip label={`${d.count} cartes`} icon={<Layers size={11} />} />
                <FormatChip label={`Révisé ${d.last}`} icon={<Clock size={11} />} />
              </div>
            </div>
            <Button size="sm">Réviser</Button>
          </div>
        </Card>
      ))}
    </div>
  );
};

const HERO_PILL =
  'inline-flex items-center gap-2 px-3 py-1 bg-white/15 rounded-pill text-caption text-white font-medium';

export const LearningSpace: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabId>('all');

  return (
    <div className="feature-page">
      <section className="relative overflow-hidden rounded-2xl p-8 shadow-lg bg-gradient-to-br from-primary-600 to-primary-400">
        <div
          aria-hidden="true"
          className="absolute -top-[30%] -right-[8%] w-[340px] h-[340px] rounded-full pointer-events-none bg-[radial-gradient(circle,rgba(255,255,255,0.12)_0%,transparent_70%)]"
        />

        <div className="relative">
          <p className="text-caption font-semibold uppercase tracking-wider text-white/70 mb-2">
            Bibliothèque IA
          </p>
          <h1 className="text-h1 font-extrabold text-white m-0 mb-2">
            Mon Espace Apprentissage
          </h1>
          <p className="text-body text-white/85 mb-5 max-w-[540px]">
            Votre IA a sélectionné du contenu sur mesure selon vos objectifs et votre rythme de la
            semaine.
          </p>

          <label className="flex items-center gap-2 bg-white/10 border border-white/20 rounded-pill px-4 py-2 max-w-[400px] backdrop-blur-sm mb-5">
            <Search size={16} className="text-white/70" />
            <input
              type="search"
              placeholder="Rechercher un contenu…"
              className="bg-transparent border-0 outline-none text-body text-white w-full placeholder:text-white/60"
            />
          </label>

          <div className="flex flex-wrap gap-3">
            <span className={HERO_PILL}>
              <BookOpen size={12} /> 3 parcours actifs
            </span>
            <span className={HERO_PILL}>
              <Clock size={12} /> 12h cette semaine
            </span>
            <span className={HERO_PILL}>
              <Flame size={12} /> 7 jours de streak
            </span>
          </div>
        </div>
      </section>

      <Tabs
        variant="pill"
        items={TAB_ITEMS}
        value={activeTab}
        onChange={(id) => setActiveTab(id as TabId)}
      />

      {activeTab === 'all' && <TabAll />}
      {activeTab === 'parcours' && <TabParcours />}
      {activeTab === 'ressources' && <TabRessources />}
      {activeTab === 'live' && <TabLive />}
      {activeTab === 'flashcards' && <TabFlashcards />}
    </div>
  );
};
