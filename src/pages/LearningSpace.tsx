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

/* ─── Types ─────────────────────────────────────────────────────────────── */

type TabId = 'all' | 'parcours' | 'ressources' | 'live' | 'flashcards';

const TAB_ITEMS = [
  { id: 'all', label: 'Tout' },
  { id: 'parcours', label: 'Parcours' },
  { id: 'ressources', label: 'Ressources' },
  { id: 'live', label: 'Live & Workshops' },
  { id: 'flashcards', label: 'Flashcards' },
];

/* ─── Sub-components ─────────────────────────────────────────────────────── */

/* Inline section heading with optional CTA */
const SectionHeading: React.FC<{
  title: string;
  icon?: React.ReactNode;
  action?: React.ReactNode;
}> = ({ title, icon, action }) => (
  <div
    style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginBottom: 'var(--s-4)',
    }}
  >
    <h2
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 'var(--s-2)',
        fontSize: 'var(--t-h3)',
        fontWeight: 700,
        color: 'var(--text)',
        margin: 0,
      }}
    >
      {icon}
      {title}
    </h2>
    {action}
  </div>
);

/* Format chip — small pill for content type */
const FormatChip: React.FC<{ label: string; icon?: React.ReactNode }> = ({
  label,
  icon,
}) => (
  <span
    style={{
      display: 'inline-flex',
      alignItems: 'center',
      gap: 'var(--s-1)',
      padding: 'var(--s-1) var(--s-2)',
      background: 'var(--bg)',
      border: '1px solid var(--border)',
      borderRadius: 'var(--r-full)',
      fontSize: 'var(--t-caption)',
      color: 'var(--text-muted)',
      fontWeight: 500,
    }}
  >
    {icon}
    {label}
  </span>
);

/* ─── Tab content sections ────────────────────────────────────────────────── */

const TabAll: React.FC = () => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--s-8)' }}>
    {/* En cours */}
    <section>
      <SectionHeading
        title="En cours"
        icon={<Play size={18} color="var(--tls-primary-500)" />}
        action={
          <Button variant="ghost" size="sm">
            Voir tout <ChevronRight size={14} />
          </Button>
        }
      />
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--s-3)' }}>
        {/* Card 1 */}
        <Card variant="interactive" as="article">
          <div style={{ padding: 'var(--s-5)' }}>
            <div
              style={{
                display: 'flex',
                alignItems: 'flex-start',
                justifyContent: 'space-between',
                gap: 'var(--s-4)',
                marginBottom: 'var(--s-3)',
              }}
            >
              <div style={{ flex: 1 }}>
                <Badge variant="brand" style={{ marginBottom: 'var(--s-2)' }}>
                  Parcours
                </Badge>
                <CardTitle style={{ marginBottom: 'var(--s-1)' }}>
                  Fondamentaux du leadership
                </CardTitle>
                <CardDesc>
                  Prochaine leçon : Communication assertive — Module 4/7
                </CardDesc>
              </div>
              <Button size="sm">Continuer</Button>
            </div>
            <ProgressBar value={65} fill="brand" size="sm" label="Progression" />
          </div>
        </Card>

        {/* Card 2 */}
        <Card variant="interactive" as="article">
          <div style={{ padding: 'var(--s-5)' }}>
            <div
              style={{
                display: 'flex',
                alignItems: 'flex-start',
                justifyContent: 'space-between',
                gap: 'var(--s-4)',
                marginBottom: 'var(--s-3)',
              }}
            >
              <div style={{ flex: 1 }}>
                <Badge variant="warm" style={{ marginBottom: 'var(--s-2)' }}>
                  Parcours
                </Badge>
                <CardTitle style={{ marginBottom: 'var(--s-1)' }}>
                  Transformation digitale
                </CardTitle>
                <CardDesc>
                  Prochaine leçon : Roadmap d'adoption — Module 2/8
                </CardDesc>
              </div>
              <Button size="sm">Continuer</Button>
            </div>
            <ProgressBar value={20} fill="warm" size="sm" label="Progression" />
          </div>
        </Card>
      </div>
    </section>

    {/* Recommandé pour vous */}
    <section>
      <SectionHeading
        title="Recommandé pour vous"
        icon={<Star size={18} color="var(--tls-primary-500)" />}
      />
      <div className="tls-grid">
        {/* Reco 1 */}
        <Card variant="interactive" as="article">
          <div style={{ padding: 'var(--s-5)', display: 'flex', flexDirection: 'column', gap: 'var(--s-3)' }}>
            <Badge variant="brand">Vidéo</Badge>
            <CardTitle>Prompt structure en 5 étapes</CardTitle>
            <CardDesc>
              Maîtrisez l'art du prompt engineering avec des frameworks éprouvés pour l'IA générative.
            </CardDesc>
            <FormatChip label="12 min" icon={<Video size={11} />} />
          </div>
        </Card>

        {/* Reco 2 */}
        <Card variant="interactive" as="article">
          <div style={{ padding: 'var(--s-5)', display: 'flex', flexDirection: 'column', gap: 'var(--s-3)' }}>
            <Badge variant="sun">Masterclass</Badge>
            <CardTitle>IA et apprentissage hybride</CardTitle>
            <CardDesc>
              Découvrez comment intégrer l'IA dans vos pratiques pédagogiques et professionnelles.
            </CardDesc>
            <FormatChip label="45 min" icon={<Video size={11} />} />
          </div>
        </Card>

        {/* Reco 3 */}
        <Card variant="interactive" as="article">
          <div style={{ padding: 'var(--s-5)', display: 'flex', flexDirection: 'column', gap: 'var(--s-3)' }}>
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

    {/* À venir */}
    <section>
      <SectionHeading
        title="À venir"
        icon={<Calendar size={18} color="var(--tls-primary-500)" />}
      />
      <Card variant="feature" as="article">
        <div
          style={{
            padding: 'var(--s-6)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 'var(--s-6)',
            flexWrap: 'wrap',
          }}
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--s-2)' }}>
            <Badge variant="danger">Live</Badge>
            <CardTitle>Workshop : Feedback & culture apprenante</CardTitle>
            <div style={{ display: 'flex', gap: 'var(--s-3)', flexWrap: 'wrap' }}>
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
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--s-4)' }}>
      {parcours.map((p) => (
        <Card key={p.title} variant="interactive" as="article">
          <div style={{ padding: 'var(--s-5)' }}>
            <div
              style={{
                display: 'flex',
                alignItems: 'flex-start',
                justifyContent: 'space-between',
                gap: 'var(--s-4)',
                marginBottom: 'var(--s-4)',
              }}
            >
              <div style={{ flex: 1 }}>
                <Badge variant={p.badge} style={{ marginBottom: 'var(--s-2)' }}>
                  Parcours
                </Badge>
                <CardTitle style={{ marginBottom: 'var(--s-1)' }}>{p.title}</CardTitle>
                <CardDesc style={{ marginBottom: 'var(--s-3)' }}>{p.desc}</CardDesc>
                <div style={{ display: 'flex', gap: 'var(--s-3)', flexWrap: 'wrap' }}>
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
    {
      type: 'articles',
      icon: <FileText size={20} />,
      badge: 'brand' as const,
      title: 'Les 7 habitudes des leaders efficaces',
      duration: 'Lecture 6 min',
    },
    {
      type: 'videos',
      icon: <Video size={20} />,
      badge: 'warm' as const,
      title: 'Maîtriser le feedback en 3 étapes',
      duration: '14 min',
    },
    {
      type: 'podcasts',
      icon: <Headphones size={20} />,
      badge: 'sun' as const,
      title: 'Le futur du travail – épisode 12',
      duration: '28 min',
    },
    {
      type: 'guides',
      icon: <Map size={20} />,
      badge: 'success' as const,
      title: 'Guide complet : Gestion de projet agile',
      duration: 'Lecture 12 min',
    },
  ];

  const filtered = filter === 'all' ? resources : resources.filter((r) => r.type === filter);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--s-5)' }}>
      {/* Filter chips */}
      <div style={{ display: 'flex', gap: 'var(--s-2)', flexWrap: 'wrap' }}>
        {filters.map((f) => (
          <button
            key={f.id}
            type="button"
            onClick={() => setFilter(f.id)}
            className="tls-pill"
            style={{
              background: filter === f.id ? 'var(--tls-primary-500)' : undefined,
              color: filter === f.id ? 'var(--text-inverse)' : undefined,
              borderColor: filter === f.id ? 'var(--tls-primary-500)' : undefined,
              cursor: 'pointer',
              transition: 'background var(--dur-1), color var(--dur-1)',
            }}
          >
            {f.label}
          </button>
        ))}
      </div>

      {/* Resource grid */}
      <div className="tls-grid">
        {filtered.map((r) => (
          <Card key={r.title} variant="interactive" as="article">
            <div
              style={{
                padding: 'var(--s-5)',
                display: 'flex',
                flexDirection: 'column',
                gap: 'var(--s-3)',
              }}
            >
              <div
                style={{
                  width: 44,
                  height: 44,
                  borderRadius: 'var(--r-lg)',
                  background: 'var(--bg)',
                  border: '1px solid var(--border)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'var(--tls-primary-500)',
                }}
              >
                {r.icon}
              </div>
              <Badge variant={r.badge}>{r.type.charAt(0).toUpperCase() + r.type.slice(1, -1)}</Badge>
              <CardTitle style={{ fontSize: 'var(--t-body)', fontWeight: 600 }}>
                {r.title}
              </CardTitle>
              <FormatChip label={r.duration} icon={<Clock size={11} />} />
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

const TabLive: React.FC = () => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--s-5)' }}>
    <SectionHeading title="Sessions à venir" icon={<Calendar size={18} color="var(--tls-primary-500)" />} />

    {/* Upcoming 1 */}
    <Card variant="feature" as="article">
      <div style={{ padding: 'var(--s-6)', display: 'flex', flexDirection: 'column', gap: 'var(--s-4)' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 'var(--s-3)' }}>
          <Badge variant="danger">Live · Jeudi 8 mai</Badge>
          <Badge variant="brand">12 places restantes</Badge>
        </div>
        <CardTitle>Workshop : Feedback &amp; culture apprenante</CardTitle>
        <CardDesc>
          Apprenez à instaurer une culture du feedback bienveillant et à en faire un levier de performance collective.
        </CardDesc>
        <div style={{ display: 'flex', gap: 'var(--s-3)', flexWrap: 'wrap' }}>
          <FormatChip label="14h00 – 15h30" icon={<Clock size={11} />} />
          <FormatChip label="Animé par Sophie Martin" icon={<Users size={11} />} />
        </div>
        <div>
          <Button>M'inscrire</Button>
        </div>
      </div>
    </Card>

    {/* Upcoming 2 */}
    <Card variant="feature" as="article">
      <div style={{ padding: 'var(--s-6)', display: 'flex', flexDirection: 'column', gap: 'var(--s-4)' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 'var(--s-3)' }}>
          <Badge variant="danger">Live · Mardi 13 mai</Badge>
          <Badge variant="warm">4 places restantes</Badge>
        </div>
        <CardTitle>Masterclass : Piloter avec les données</CardTitle>
        <CardDesc>
          Intégrez la data dans votre management pour prendre de meilleures décisions et motiver vos équipes.
        </CardDesc>
        <div style={{ display: 'flex', gap: 'var(--s-3)', flexWrap: 'wrap' }}>
          <FormatChip label="10h00 – 11h30" icon={<Clock size={11} />} />
          <FormatChip label="Animé par Thomas Leroy" icon={<Users size={11} />} />
        </div>
        <div>
          <Button>M'inscrire</Button>
        </div>
      </div>
    </Card>

    {/* Past recording */}
    <SectionHeading title="Replay disponible" icon={<Video size={18} color="var(--tls-primary-500)" />} />
    <Card variant="interactive" as="article">
      <div style={{ padding: 'var(--s-5)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 'var(--s-4)', flexWrap: 'wrap' }}>
        <div style={{ flex: 1 }}>
          <Badge variant="success" style={{ marginBottom: 'var(--s-2)' }}>Replay</Badge>
          <CardTitle style={{ marginBottom: 'var(--s-1)' }}>Intelligence émotionnelle au travail</CardTitle>
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
    {
      title: 'Leadership & management',
      count: 48,
      last: 'Il y a 2 jours',
      badge: 'brand' as const,
      color: 'brand' as const,
    },
    {
      title: 'Transformation digitale',
      count: 32,
      last: 'Il y a 5 jours',
      badge: 'warm' as const,
      color: 'warm' as const,
    },
    {
      title: 'Communication & soft skills',
      count: 24,
      last: 'Il y a 1 semaine',
      badge: 'sun' as const,
      color: 'gradient' as const,
    },
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--s-4)' }}>
      {decks.map((d) => (
        <Card key={d.title} variant="interactive" as="article">
          <div
            style={{
              padding: 'var(--s-5)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: 'var(--s-4)',
              flexWrap: 'wrap',
            }}
          >
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 'var(--s-2)' }}>
              <Badge variant={d.badge}>Deck</Badge>
              <CardTitle style={{ marginBottom: 0 }}>{d.title}</CardTitle>
              <div style={{ display: 'flex', gap: 'var(--s-3)', flexWrap: 'wrap' }}>
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

/* ─── Page ───────────────────────────────────────────────────────────────── */

export const LearningSpace: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabId>('all');

  return (
    <div className="feature-page">
      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <section
        style={{
          borderRadius: 'var(--r-2xl)',
          background: 'linear-gradient(135deg, var(--tls-primary-600) 0%, var(--tls-primary-400) 100%)',
          padding: 'var(--s-8)',
          boxShadow: 'var(--shadow-lg)',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Decorative blob */}
        <div
          aria-hidden="true"
          style={{
            position: 'absolute',
            top: '-30%',
            right: '-8%',
            width: 340,
            height: 340,
            borderRadius: '50%',
            background: 'radial-gradient(circle, var(--overlay-white-xs) 0%, transparent 70%)',
            pointerEvents: 'none',
          }}
        />

        <div style={{ position: 'relative' }}>
          <p
            style={{
              fontSize: 'var(--t-caption)',
              fontWeight: 600,
              letterSpacing: '0.06em',
              textTransform: 'uppercase',
              color: 'var(--on-color-text-muted)',
              marginBottom: 'var(--s-2)',
            }}
          >
            Bibliothèque IA
          </p>
          <h1
            style={{
              fontSize: 'var(--t-h1)',
              fontWeight: 800,
              color: 'var(--text-inverse)',
              margin: '0 0 var(--s-2)',
            }}
          >
            Mon Espace Apprentissage
          </h1>
          <p
            style={{
              fontSize: 'var(--t-body)',
              color: 'var(--on-color-text-soft)',
              marginBottom: 'var(--s-5)',
              maxWidth: 540,
            }}
          >
            Votre IA a sélectionné du contenu sur mesure selon vos objectifs et votre rythme de la semaine.
          </p>

          {/* Search bar */}
          <label
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 'var(--s-2)',
              background: 'var(--overlay-white-xs)',
              border: '1px solid var(--overlay-white-sm)',
              borderRadius: 'var(--r-full)',
              padding: 'var(--s-2) var(--s-4)',
              maxWidth: 400,
              backdropFilter: 'var(--glass-blur)',
              marginBottom: 'var(--s-5)',
            }}
          >
            <Search size={16} color="var(--on-color-text-soft)" />
            <input
              type="search"
              placeholder="Rechercher un contenu…"
              style={{
                background: 'transparent',
                border: 'none',
                outline: 'none',
                fontSize: 'var(--t-body)',
                color: 'var(--text-inverse)',
                width: '100%',
              }}
            />
          </label>

          {/* KPI pills */}
          <div style={{ display: 'flex', gap: 'var(--s-3)', flexWrap: 'wrap' }}>
            <span
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 'var(--s-2)',
                padding: 'var(--s-1) var(--s-3)',
                background: 'var(--overlay-white-sm)',
                borderRadius: 'var(--r-full)',
                fontSize: 'var(--t-caption)',
                color: 'var(--text-inverse)',
                fontWeight: 500,
              }}
            >
              <BookOpen size={12} /> 3 parcours actifs
            </span>
            <span
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 'var(--s-2)',
                padding: 'var(--s-1) var(--s-3)',
                background: 'var(--overlay-white-sm)',
                borderRadius: 'var(--r-full)',
                fontSize: 'var(--t-caption)',
                color: 'var(--text-inverse)',
                fontWeight: 500,
              }}
            >
              <Clock size={12} /> 12h cette semaine
            </span>
            <span
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 'var(--s-2)',
                padding: 'var(--s-1) var(--s-3)',
                background: 'var(--overlay-white-sm)',
                borderRadius: 'var(--r-full)',
                fontSize: 'var(--t-caption)',
                color: 'var(--text-inverse)',
                fontWeight: 500,
              }}
            >
              <Flame size={12} /> 7 jours de streak
            </span>
          </div>
        </div>
      </section>

      {/* ── Filter tabs ──────────────────────────────────────────────────── */}
      <Tabs
        variant="pill"
        items={TAB_ITEMS}
        value={activeTab}
        onChange={(id) => setActiveTab(id as TabId)}
      />

      {/* ── Tab content ──────────────────────────────────────────────────── */}
      {activeTab === 'all' && <TabAll />}
      {activeTab === 'parcours' && <TabParcours />}
      {activeTab === 'ressources' && <TabRessources />}
      {activeTab === 'live' && <TabLive />}
      {activeTab === 'flashcards' && <TabFlashcards />}
    </div>
  );
};
