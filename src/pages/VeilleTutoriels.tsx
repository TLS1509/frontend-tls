/**
 * VeilleTutoriels — Page n-1 catégorie : tous les tutoriels TLS.
 *
 * Tone : sun (apprentissage, mise en pratique).
 *
 * Archétype hero : EditorialHero `sun` bounded + filter par niveau.
 * Pattern listing : grid 3 cols thumbnail-dominant.
 * Featured tutoriel en bandeau top (spotlight 2-col cover + meta).
 */

import React, { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Video,
  ArrowLeft,
  Play,
  Clock,
  GraduationCap,
  ArrowRight,
  TrendingUp,
  FolderOpen,
} from 'lucide-react';
import { AmbientBlobs } from '../components/patterns/AmbientBlobs';
import { FilterChip } from '../components/ui/FilterChip';
import { Search } from '../components/ui/Search';
import { Button } from '../components/core/Button';
import { Badge } from '../components/ui/Badge';

type Level = 'all' | 'beginner' | 'intermediate' | 'advanced';

interface Tuto {
  id: string;
  title: string;
  summary: string;
  duration: string;
  level: 'beginner' | 'intermediate' | 'advanced';
  category: string;
  instructor: string;
  featured?: boolean;
}

const TUTOS: Tuto[] = [
  { id: 't1', title: 'Construire un prompt structuré en 5 étapes', summary: 'Apprenez la méthode CRISP : Context, Role, Intent, Style, Precision. Tutoriel pas-à-pas avec exemples concrets.', duration: '12 min', level: 'beginner', category: 'Prompt Engineering', instructor: 'Marie Dubois', featured: true },
  { id: 't2', title: 'Maîtriser l\'IA pour la formation', summary: "Comment intégrer l'IA générative dans vos parcours d'apprentissage.", duration: '18 min', level: 'intermediate', category: 'Pédagogie', instructor: 'Pierre Leclerc' },
  { id: 't3', title: 'Débuter avec les LLM en entreprise', summary: 'Les fondamentaux pour comprendre, déployer et sécuriser un LLM.', duration: '24 min', level: 'beginner', category: 'IA & Tech', instructor: 'Thomas Renaud' },
  { id: 't4', title: 'Design de chatbots pédagogiques avancés', summary: 'Architectures, embeddings, fine-tuning — niveau expert.', duration: '32 min', level: 'advanced', category: 'IA & Tech', instructor: 'Sophie Martin' },
  { id: 't5', title: 'Évaluer la qualité d\'un parcours digital', summary: '7 critères et 3 outils gratuits pour auditer un parcours e-learning.', duration: '15 min', level: 'intermediate', category: 'Évaluation', instructor: 'Claire Dupont' },
  { id: 't6', title: 'Storytelling pédagogique en 3 actes', summary: 'La méthode hollywoodienne appliquée à la formation pro.', duration: '20 min', level: 'beginner', category: 'Pédagogie', instructor: 'Julie Petit' },
  { id: 't7', title: 'Mesurer le ROI d\'un dispositif de formation', summary: 'Modèle Kirkpatrick augmenté + tableau de bord prêt à l\'emploi.', duration: '28 min', level: 'advanced', category: 'Évaluation', instructor: 'Marc Leroy' },
];

const LEVELS: { id: Level; label: string; tone: 'sun' | 'brand' | 'warm' | 'neutral' }[] = [
  { id: 'all',          label: 'Tous niveaux', tone: 'neutral' },
  { id: 'beginner',     label: 'Débutant',     tone: 'sun' },
  { id: 'intermediate', label: 'Intermédiaire', tone: 'brand' },
  { id: 'advanced',     label: 'Avancé',       tone: 'warm' },
];

const LEVEL_BADGE: Record<Tuto['level'], { label: string; classes: string }> = {
  beginner:     { label: 'Débutant',     classes: 'bg-accent-100 text-accent-700 border-accent-200' },
  intermediate: { label: 'Intermédiaire', classes: 'bg-primary-100 text-primary-700 border-primary-200' },
  advanced:     { label: 'Avancé',       classes: 'bg-secondary-100 text-secondary-700 border-secondary-200' },
};

const RELATED_CATEGORIES = [
  { label: 'Actus de la semaine', href: '/veille/actus',     Icon: TrendingUp, bubble: 'bg-primary-100 text-primary-700' },
  { label: 'Dossiers d\'analyse',  href: '/veille/dossiers',  Icon: FolderOpen, bubble: 'bg-secondary-100 text-secondary-700' },
  { label: 'Vidéos courtes (reels)', href: '/veille/video-reels', Icon: Video, bubble: 'bg-accent-100 text-accent-700' },
];

export const VeilleTutoriels: React.FC = () => {
  const navigate = useNavigate();
  const [level, setLevel] = useState<Level>('all');
  const [query, setQuery] = useState('');

  const filtered = useMemo(() => {
    let result = TUTOS;
    if (level !== 'all') result = result.filter((t) => t.level === level);
    if (query.trim()) {
      const q = query.trim().toLowerCase();
      result = result.filter((t) =>
        t.title.toLowerCase().includes(q) ||
        t.summary.toLowerCase().includes(q) ||
        t.category.toLowerCase().includes(q)
      );
    }
    return result;
  }, [level, query]);

  const featured = filtered.find((t) => t.featured);
  const others = filtered.filter((t) => !t.featured);

  return (
    <div className="relative min-h-screen bg-gradient-page-ambient-sun flex flex-col">
      <AmbientBlobs />

      <main className="relative z-base w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-10 py-6 sm:py-8 lg:py-12 flex flex-col gap-section flex-1">

        <button
          type="button"
          onClick={() => navigate('/veille')}
          className="self-start inline-flex items-center gap-1.5 font-body text-caption text-ink-600 hover:text-accent-700 cursor-pointer bg-transparent border-0"
        >
          <ArrowLeft size={14} /> Retour à la veille
        </button>

        {/* Hero sun-toned */}
        <header className="flex flex-col gap-tight">
          <span className="inline-flex items-center gap-1.5 self-start px-2.5 py-1 rounded-pill bg-accent-100 border border-accent-200 text-caption font-bold text-accent-800">
            <Video size={12} /> Tutoriels TLS
          </span>
          <h1 className="m-0 font-display text-h1 font-bold text-ink-900 leading-tight">
            Apprendre par la pratique
          </h1>
          <p className="m-0 font-body text-body text-ink-600 max-w-prose">
            Vidéos pas-à-pas pour monter en compétence — de 12 à 32 minutes, par niveau.
          </p>
        </header>

        {/* Toolbar */}
        <div className="flex flex-col gap-stack-xs">
          <Search
            variant="default"
            placeholder="Rechercher un tutoriel, sujet, formateur…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <div className="flex gap-2 flex-wrap">
            {LEVELS.map(({ id, label }) => (
              <FilterChip
                key={id}
                label={label}
                icon={<GraduationCap size={12} />}
                active={level === id}
                onClick={() => setLevel(id)}
              />
            ))}
            <span className="ml-auto inline-flex items-center font-body text-caption text-ink-500">
              <strong className="text-accent-700">{filtered.length}</strong>&nbsp;tutoriel{filtered.length > 1 ? 's' : ''}
            </span>
          </div>
        </div>

        {/* Featured spotlight (cover + meta 2-col) */}
        {featured && (
          <article
            className="grid grid-cols-1 md:grid-cols-[1.2fr_1fr] gap-stack-lg p-4 sm:p-6 rounded-3xl bg-white/70 backdrop-blur-glass-light border border-accent-200 shadow-sm cursor-pointer hover:shadow-md transition-shadow duration-base"
            onClick={() => navigate(`/veille/video-tutorial/${featured.id}`)}
          >
            {/* Cover */}
            <div className="relative aspect-video rounded-2xl overflow-hidden bg-gradient-to-br from-accent-200 via-accent-300 to-secondary-300">
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="inline-flex items-center justify-center w-16 h-16 rounded-pill bg-white/90 backdrop-blur-glass-light shadow-lg text-accent-700">
                  <Play size={24} fill="currentColor" />
                </span>
              </div>
              <span className="absolute top-3 left-3 inline-flex items-center gap-1 px-2 py-1 rounded-pill bg-black/60 text-white text-micro font-bold backdrop-blur-glass-light">
                <Clock size={11} /> {featured.duration}
              </span>
              <span className="absolute top-3 right-3">
                <Badge variant="sun">À la une</Badge>
              </span>
            </div>
            {/* Meta */}
            <div className="flex flex-col gap-stack justify-center">
              <span className={`self-start inline-flex items-center gap-1 px-2 py-0.5 rounded-pill border text-micro font-bold ${LEVEL_BADGE[featured.level].classes}`}>
                {LEVEL_BADGE[featured.level].label}
              </span>
              <h2 className="m-0 font-display text-h3 font-bold text-ink-900 leading-tight">
                {featured.title}
              </h2>
              <p className="m-0 font-body text-body text-ink-600 leading-relaxed">
                {featured.summary}
              </p>
              <div className="flex items-center gap-2 font-body text-caption text-ink-500">
                <span>{featured.instructor}</span>
                <span aria-hidden>·</span>
                <span>{featured.category}</span>
              </div>
              <Button variant="primary" size="sm" trailingIcon={<ArrowRight size={13} />}>
                Regarder
              </Button>
            </div>
          </article>
        )}

        {/* Grid 3-cols thumbnail-dominant */}
        {others.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
            {others.map((tuto) => (
              <article
                key={tuto.id}
                onClick={() => navigate(`/veille/video-tutorial/${tuto.id}`)}
                className="group flex flex-col gap-stack rounded-2xl bg-white/70 backdrop-blur-glass-light border border-ink-100 overflow-hidden cursor-pointer hover:border-accent-300 hover:-translate-y-0.5 hover:shadow-md transition-all duration-base"
              >
                {/* Thumbnail */}
                <div className="relative aspect-video bg-gradient-to-br from-accent-100 via-accent-200 to-secondary-200">
                  <div className="absolute inset-0 flex items-center justify-center opacity-90 group-hover:opacity-100 transition-opacity">
                    <span className="inline-flex items-center justify-center w-12 h-12 rounded-pill bg-white/95 shadow-md text-accent-700">
                      <Play size={18} fill="currentColor" />
                    </span>
                  </div>
                  <span className="absolute bottom-2 right-2 inline-flex items-center gap-1 px-2 py-0.5 rounded-pill bg-black/65 text-white text-micro font-bold">
                    <Clock size={10} /> {tuto.duration}
                  </span>
                </div>
                {/* Content */}
                <div className="flex-1 flex flex-col gap-stack-xs px-4 pb-4">
                  <span className={`self-start inline-flex items-center gap-1 px-2 py-0.5 rounded-pill border text-micro font-bold ${LEVEL_BADGE[tuto.level].classes}`}>
                    {LEVEL_BADGE[tuto.level].label}
                  </span>
                  <h3 className="m-0 font-display text-body-sm font-bold text-ink-900 leading-snug line-clamp-2">
                    {tuto.title}
                  </h3>
                  <p className="m-0 font-body text-caption text-ink-500 leading-relaxed line-clamp-2">
                    {tuto.summary}
                  </p>
                  <div className="mt-auto flex items-center gap-2 font-body text-micro text-ink-400">
                    <span>{tuto.instructor}</span>
                    <span aria-hidden>·</span>
                    <span>{tuto.category}</span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}

        {filtered.length === 0 && (
          <div className="text-center py-section font-body text-body text-ink-500">
            Aucun tutoriel pour ces filtres — essayez d'élargir la recherche.
          </div>
        )}

        {/* Cross-categories */}
        <section
          aria-label="Autres catégories"
          className="flex flex-col gap-stack-lg pt-section border-t border-ink-100"
        >
          <h2 className="m-0 font-display text-h4 font-bold text-ink-900">
            Continuer l'exploration
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {RELATED_CATEGORIES.map((cat) => (
              <button
                key={cat.href}
                type="button"
                onClick={() => navigate(cat.href)}
                className={[
                  'group flex items-center gap-3 p-4 rounded-2xl',
                  'bg-white/70 backdrop-blur-glass-light border border-ink-100',
                  'hover:border-ink-200 hover:-translate-y-0.5 hover:shadow-sm',
                  'transition-all duration-base cursor-pointer text-left',
                  '!h-auto !overflow-visible !items-center !font-normal',
                ].join(' ')}
              >
                <span className={`inline-flex items-center justify-center w-10 h-10 rounded-pill ${cat.bubble}`}>
                  <cat.Icon size={16} />
                </span>
                <span className="font-body text-body-sm font-semibold text-ink-900 flex-1">
                  {cat.label}
                </span>
              </button>
            ))}
          </div>
        </section>

      </main>
    </div>
  );
};

export default VeilleTutoriels;
