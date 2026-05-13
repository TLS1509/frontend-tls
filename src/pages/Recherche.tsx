/**
 * Recherche — Page de recherche transversale (parcours / articles / vidéos / coachs).
 *
 * Flow : Navigation transversale. Page plein-largeur avec Sidebar.
 *
 * Structure :
 *  1. HeroSection (tone=primary) + input recherche large + count résultats
 *  2. FilterBar sticky : Tout / Parcours / Articles / Vidéos / Coachs
 *  3. CardGrid de résultats : ParcoursCard | ArticleCard | VideoCard | Coach card
 *  4. EmptyState si 0 résultat
 *  5. SkeletonGroup pendant la recherche (debounce 300ms)
 *
 * Route : /search
 */

import React, { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Search as SearchIcon,
  BookOpen,
  Newspaper,
  Video as VideoIcon,
  Users,
  Sparkles,
} from 'lucide-react';
import { Search as SearchInput } from '../components/ui/Search';
import { Button } from '../components/core/Button';
import { Badge } from '../components/ui/Badge';
import { Avatar } from '../components/ui/Avatar';
import { EmptyState } from '../components/ui/EmptyState';
import { HeroSection } from '../components/patterns/HeroSection';
import { FilterBar } from '../components/forms/FilterBar';
import { CardGrid } from '../components/patterns/CardGrid';
import { ParcoursCard } from '../components/patterns/ParcoursCard';
import { ArticleCard } from '../components/learning/ArticleCard';
import { VideoCard } from '../components/learning/VideoCard';
import {
  SkeletonGroup,
  EditorialCardSkeleton,
} from '../components/patterns/SkeletonTemplates';

/* ─── Types & Mock data ─────────────────────────────────────────────────── */

type ResultType = 'parcours' | 'article' | 'video' | 'coach';
type Filter = 'all' | ResultType;

interface ResultItem {
  id: string;
  type: ResultType;
  title: string;
  description: string;
  keywords: string[];
  // Type-specific fields
  duration?: string;
  progress?: number;
  status?: 'en cours' | 'complété' | 'non commencé';
  category?: string;
  author?: string;
  tone?: 'primary' | 'warm' | 'sun';
  // Coach
  role?: string;
  specialties?: string[];
}

const ITEMS: ResultItem[] = [
  { id: 'p1', type: 'parcours', title: 'Fondamentaux du Leadership',          description: 'Apprenez les principes essentiels du leadership moderne.', keywords: ['leadership', 'manager', 'team'], duration: '6 semaines', progress: 65, status: 'en cours', tone: 'primary' },
  { id: 'p2', type: 'parcours', title: 'Communication Efficace',               description: 'Techniques de communication interpersonnelle.',           keywords: ['communication', 'soft skills'],  duration: '4 semaines', progress: 100, status: 'complété', tone: 'warm' },
  { id: 'p3', type: 'parcours', title: 'IA Générative pour managers',          description: 'Intégrer GPT/Claude dans votre management quotidien.',     keywords: ['ia', 'gpt', 'claude', 'management'], duration: '5 semaines', progress: 0, status: 'non commencé', tone: 'sun' },

  { id: 'a1', type: 'article', title: "L'IA générative en formation : où en sommes-nous en 2026 ?", description: "Tour d'horizon des nouveaux usages de l'IA dans les parcours de formation.", keywords: ['ia', 'formation', 'tendances'], category: 'IA & Pédagogie', author: 'The Learning Society', duration: '6 min', tone: 'primary' },
  { id: 'a2', type: 'article', title: "L'essor du microlearning",               description: "78% des entreprises du CAC40 ont adopté le microlearning.",   keywords: ['microlearning', 'tendances'], category: 'Formation', author: 'Pierre Leclerc', duration: '4 min', tone: 'primary' },

  { id: 'v1', type: 'video', title: 'Prompt structuré en 5 étapes',             description: 'Tutoriel pas à pas pour formaliser ses prompts.',           keywords: ['prompt', 'ia', 'tutoriel'], duration: '12 min', author: 'Marie Dubois', tone: 'warm' },
  { id: 'v2', type: 'video', title: "Coaching minute : feedback constructif",   description: 'Comment donner du feedback qui motive vraiment.',           keywords: ['feedback', 'coaching', 'manager'], duration: '2 min', author: 'Sophie Renard', tone: 'sun' },

  { id: 'c1', type: 'coach', title: 'Sophie Martin',                            description: 'Coach exécutive spécialisée en leadership transformationnel.', keywords: ['leadership', 'coach', 'sophie'], role: 'Coach Exécutif', specialties: ['Leadership', 'Coaching'], tone: 'primary' },
  { id: 'c2', type: 'coach', title: 'Marc Dubois',                              description: 'Expert prompt engineering & IA générative.',                keywords: ['ia', 'prompt', 'coach'], role: 'Coach IA', specialties: ['Prompt Engineering', 'IA'], tone: 'warm' },
];

const FILTERS: { id: Filter; label: string; icon: React.ReactNode }[] = [
  { id: 'all',      label: 'Tout',      icon: <Sparkles size={12} /> },
  { id: 'parcours', label: 'Parcours',  icon: <BookOpen size={12} /> },
  { id: 'article',  label: 'Articles',  icon: <Newspaper size={12} /> },
  { id: 'video',    label: 'Vidéos',    icon: <VideoIcon size={12} /> },
  { id: 'coach',    label: 'Coachs',    icon: <Users size={12} /> },
];

/* ─── Component ──────────────────────────────────────────────────────────── */

export const Recherche: React.FC = () => {
  const navigate = useNavigate();

  const [query, setQuery] = useState('');
  const [debouncedQuery, setDebouncedQuery] = useState('');
  const [filter, setFilter] = useState<Filter>('all');
  const [isSearching, setIsSearching] = useState(false);

  // Debounce 300ms
  useEffect(() => {
    if (query.trim() === '') {
      setDebouncedQuery('');
      setIsSearching(false);
      return;
    }
    setIsSearching(true);
    const t = setTimeout(() => {
      setDebouncedQuery(query.trim().toLowerCase());
      setIsSearching(false);
    }, 300);
    return () => clearTimeout(t);
  }, [query]);

  const results = useMemo(() => {
    return ITEMS.filter((item) => {
      const matchType = filter === 'all' || item.type === filter;
      const q = debouncedQuery;
      const matchQuery =
        q === '' ||
        item.title.toLowerCase().includes(q) ||
        item.description.toLowerCase().includes(q) ||
        item.keywords.some((k) => k.includes(q));
      return matchType && matchQuery;
    });
  }, [debouncedQuery, filter]);

  const counts = useMemo(() => {
    const base: Record<Filter, number> = { all: ITEMS.length, parcours: 0, article: 0, video: 0, coach: 0 };
    ITEMS.forEach((item) => {
      base[item.type] += 1;
    });
    return base;
  }, []);

  /* ── Result renderer ─────────────────────────────────────────────────── */

  const renderResult = (item: ResultItem) => {
    if (item.type === 'parcours') {
      return (
        <ParcoursCard
          key={item.id}
          id={item.id}
          title={item.title}
          description={item.description}
          progress={item.progress ?? 0}
          status={item.status ?? 'non commencé'}
          tone={item.tone ?? 'primary'}
          duration={item.duration}
          onClick={() => navigate(`/learning-paths/${item.id}`)}
        />
      );
    }
    if (item.type === 'article') {
      return (
        <ArticleCard
          key={item.id}
          title={item.title}
          excerpt={item.description}
          category={item.category ?? ''}
          author={item.author ?? ''}
          readTime={item.duration ?? ''}
          onClick={() => navigate(`/veille/article/${item.id}`)}
        />
      );
    }
    if (item.type === 'video') {
      return (
        <VideoCard
          key={item.id}
          title={item.title}
          description={item.description}
          duration={item.duration ?? ''}
          instructor={item.author ?? ''}
          onClick={() => navigate(`/veille/video-tutorial/${item.id}`)}
        />
      );
    }
    // Coach card (inline DS card — pas de pattern dédié)
    return (
      <article
        key={item.id}
        onClick={() => navigate('/coaching')}
        className="group flex flex-col gap-stack p-5 rounded-2xl border border-ink-100 bg-white hover:border-primary-300 hover:shadow-sm hover:-translate-y-0.5 transition-all duration-base cursor-pointer"
      >
        <div className="flex items-start gap-3">
          <Avatar name={item.title} tint={item.tone === 'warm' ? 'warm' : item.tone === 'sun' ? 'sun' : 'brand'} size="lg" />
          <div className="flex-1 min-w-0">
            <h3 className="m-0 font-display text-h4 font-bold text-ink-900 leading-tight">
              {item.title}
            </h3>
            <p className="m-0 mt-1 font-body text-caption text-ink-500">
              {item.role}
            </p>
          </div>
        </div>
        <p className="m-0 font-body text-body-sm text-ink-600 leading-relaxed">
          {item.description}
        </p>
        {item.specialties && (
          <div className="flex flex-wrap gap-1.5">
            {item.specialties.map((s) => (
              <Badge key={s} variant="neutral">{s}</Badge>
            ))}
          </div>
        )}
      </article>
    );
  };

  /* ── Layout ──────────────────────────────────────────────────────────── */

  return (
    <div className="min-h-screen bg-surface">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-10 py-section flex flex-col gap-section">

        {/* Hero */}
        <HeroSection
          variant="solid"
          tone="primary"
          size="md"
          eyebrow="Recherche"
          title="Trouvez ce dont vous avez besoin"
          description="Parcours, articles, vidéos et coachs — tout au même endroit."
        />

        {/* Search bar */}
        <SearchInput
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Rechercher un sujet, un coach, une compétence…"
          variant="default"
          size="lg"
          leadingIcon={<SearchIcon size={20} strokeWidth={2} />}
        />

        {/* Filters */}
        <div className="sticky top-0 z-sticky bg-white/95 backdrop-blur-glass-light py-stack -mx-4 sm:-mx-6 lg:-mx-10 px-4 sm:px-6 lg:px-10 border-b border-ink-100">
          <FilterBar
            options={FILTERS.map((f) => ({
              id: f.id,
              label: f.label,
              icon: f.icon,
              count: counts[f.id],
            }))}
            selected={[filter]}
            onChange={(ids) => setFilter((ids[0] as Filter) ?? 'all')}
            multiSelect={false}
            showClearAll={false}
            tone="brand"
            size="md"
          />
        </div>

        {/* Result count */}
        {debouncedQuery && !isSearching && (
          <p className="m-0 font-body text-body-sm text-ink-600">
            <strong className="text-primary-700 tabular-nums">{results.length}</strong> résultat{results.length > 1 ? 's' : ''} pour "{debouncedQuery}"
          </p>
        )}

        {/* Results */}
        {isSearching ? (
          <SkeletonGroup count={6} template={EditorialCardSkeleton} layout="grid-3" />
        ) : results.length === 0 ? (
          <EmptyState
            icon={<SearchIcon size={32} />}
            title={debouncedQuery ? `Aucun résultat pour "${debouncedQuery}"` : 'Commencez votre recherche'}
            description={
              debouncedQuery
                ? 'Essayez avec d\'autres mots-clés ou élargissez les filtres.'
                : 'Tapez un mot-clé ou utilisez les filtres ci-dessus.'
            }
            actions={
              debouncedQuery ? (
                <Button variant="secondary" size="sm" onClick={() => { setQuery(''); setFilter('all'); }}>
                  Réinitialiser
                </Button>
              ) : undefined
            }
          />
        ) : (
          <CardGrid layout="default" gapSize="lg" aria-label="Résultats de recherche">
            {results.map(renderResult)}
          </CardGrid>
        )}
      </div>
    </div>
  );
};

export default Recherche;
