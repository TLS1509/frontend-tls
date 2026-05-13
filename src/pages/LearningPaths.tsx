/**
 * LearningPaths Page — Mes Parcours
 *
 * Phase 10 refactor:
 *  - Hero custom → EditorialHero tone="warm" with KPI trailing slot
 *  - Custom KpiCard → StatCard (canonical UI atom)
 *  - Semantic spacing tokens (gap-stack, gap-section)
 *  - EmptyState reused from DS
 */

import React, { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  GraduationCap,
  Sparkles,
  RotateCcw,
} from 'lucide-react';
import { Search } from '../components/ui/Search';
import { FilterBar } from '../components/forms/FilterBar';
import { StatCard } from '../components/ui/StatCard';
import { EmptyState } from '../components/ui/EmptyState';
import { BookOpen, Clock3, Trophy, Flame } from 'lucide-react';
import { ParcoursCard } from '../components/patterns/ParcoursCard';
import type { ParcoursTone, ParcoursStatus } from '../components/patterns/ParcoursCard';
import { CardGrid } from '../components/patterns/CardGrid';
import { EditorialHero } from '../components/patterns/EditorialHero';
import { Button } from '../components/core/Button';

interface Parcours {
  id: string;
  title: string;
  description: string;
  instructor: string;
  level: 'débutant' | 'intermédiaire' | 'avancé';
  duration: string;
  lessons: number;
  progress: number;
  status: ParcoursStatus;
  category: string;
}

const MOCK_PARCOURS: Parcours[] = [
  {
    id: '1',
    title: 'Fondamentaux du Leadership',
    description:
      'Apprenez les principes essentiels du leadership moderne et développez vos compétences de management.',
    instructor: 'Marie Dubois',
    level: 'débutant',
    duration: '6 semaines',
    lessons: 12,
    progress: 65,
    status: 'en cours',
    category: 'Leadership',
  },
  {
    id: '2',
    title: 'Communication Efficace',
    description:
      'Maîtrisez les techniques de communication interpersonnelle pour améliorer vos relations professionnelles.',
    instructor: 'Jean Martin',
    level: 'intermédiaire',
    duration: '4 semaines',
    lessons: 8,
    progress: 100,
    status: 'complété',
    category: 'Soft Skills',
  },
  {
    id: '3',
    title: 'Gestion de Projet Agile',
    description:
      'Découvrez les méthodologies agiles et apprenez à piloter vos projets de manière flexible et efficace.',
    instructor: 'Pierre Leclerc',
    level: 'intermédiaire',
    duration: '8 semaines',
    lessons: 16,
    progress: 35,
    status: 'en cours',
    category: 'Project Management',
  },
  {
    id: '4',
    title: 'Intelligence Émotionnelle en Entreprise',
    description:
      'Développez votre intelligence émotionnelle pour mieux gérer le stress et les relations interpersonnelles.',
    instructor: 'Sophie Bernard',
    level: 'avancé',
    duration: '6 semaines',
    lessons: 14,
    progress: 0,
    status: 'non commencé',
    category: 'Soft Skills',
  },
  {
    id: '5',
    title: 'Prise de Décision Stratégique',
    description:
      'Apprenez un cadre structuré pour prendre des décisions stratégiques complexes et assurer leur mise en œuvre.',
    instructor: 'Marc Rousseau',
    level: 'avancé',
    duration: '8 semaines',
    lessons: 18,
    progress: 0,
    status: 'non commencé',
    category: 'Strategic Thinking',
  },
  {
    id: '6',
    title: 'Transformation Digitale et Innovation',
    description:
      'Explorez comment piloter la transformation digitale et créer une culture d\'innovation durable.',
    instructor: 'Isabelle Fontaine',
    level: 'avancé',
    duration: '10 semaines',
    lessons: 20,
    progress: 20,
    status: 'en cours',
    category: 'Digital',
  },
];

const TONES: ParcoursTone[] = ['primary', 'warm', 'sun'];

const STATUS_FILTERS: { id: ParcoursStatus; label: string }[] = [
  { id: 'en cours', label: 'En cours' },
  { id: 'complété', label: 'Terminés' },
  { id: 'non commencé', label: 'Pas commencés' },
];

export const LearningPaths: React.FC = () => {
  const navigate = useNavigate();
  const [selectedStatuses, setSelectedStatuses] = useState<Set<ParcoursStatus>>(new Set());
  const [query, setQuery] = useState('');

  const total = MOCK_PARCOURS.length;
  const totalLessons = MOCK_PARCOURS.reduce((s, p) => s + p.lessons, 0);
  const completedLessons = MOCK_PARCOURS.reduce(
    (s, p) => s + Math.round((p.lessons * p.progress) / 100),
    0,
  );
  const overallProgress = totalLessons > 0 ? Math.round((completedLessons / totalLessons) * 100) : 0;
  const inProgress = MOCK_PARCOURS.filter((p) => p.status === 'en cours').length;
  const completed  = MOCK_PARCOURS.filter((p) => p.status === 'complété').length;
  const counts = useMemo(() => ({
    'en cours':      MOCK_PARCOURS.filter((p) => p.status === 'en cours').length,
    'complété':      MOCK_PARCOURS.filter((p) => p.status === 'complété').length,
    'non commencé': MOCK_PARCOURS.filter((p) => p.status === 'non commencé').length,
  }), []);

  const filteredParcours = useMemo(() => {
    return MOCK_PARCOURS.filter((p) => {
      const matchStatus = selectedStatuses.size === 0 || selectedStatuses.has(p.status);
      const q = query.trim().toLowerCase();
      const matchQuery =
        q.length === 0 ||
        p.title.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        p.instructor.toLowerCase().includes(q);
      return matchStatus && matchQuery;
    });
  }, [selectedStatuses, query]);

  const toggleStatus = (status: ParcoursStatus) => {
    setSelectedStatuses((prev) => {
      const next = new Set(prev);
      next.has(status) ? next.delete(status) : next.add(status);
      return next;
    });
  };

  const resetFilters = () => {
    setSelectedStatuses(new Set());
    setQuery('');
  };

  const handleCardClick = (id: string) => navigate(`/learning-paths/${id}`);

  return (
    <div className="relative min-h-screen bg-gradient-to-b from-primary-50/30 via-white to-primary-50/20">
      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-10 py-6 sm:py-8 lg:py-12 flex flex-col gap-section">

        {/* Hero — EditorialHero tone="brand" (primary teal — Parcours = core content of TLS) */}
        <EditorialHero
          tone="brand"
          eyebrow={{ icon: <GraduationCap size={12} />, label: 'Mon apprentissage' }}
          title="Mes Parcours"
          summary="Explorez vos parcours de formation et suivez votre progression au fil des leçons."
          trailing={
            overallProgress > 0 ? (
              <div
                role="progressbar"
                aria-valuenow={overallProgress}
                aria-valuemin={0}
                aria-valuemax={100}
                aria-label="Progression globale"
                className="relative flex flex-col gap-stack-xs px-5 py-4 rounded-xl text-white bg-white/10 backdrop-blur-glass-medium border border-white/20 shadow-lg"
              >
                <div className="flex items-baseline justify-between font-body font-semibold">
                  <span className="text-white/90">Progression globale</span>
                  <strong className="font-display text-h3 text-white">{overallProgress}%</strong>
                </div>
                <div className="h-2 rounded-pill bg-white/20 overflow-hidden">
                  <div
                    className="h-full bg-white rounded-pill transition-[width] duration-base"
                    style={{ width: `${overallProgress}%` }}
                  />
                </div>
              </div>
            ) : undefined
          }
        />

        {/* KPI row */}
        <section aria-label="Indicateurs clés" className="grid grid-cols-2 sm:grid-cols-4 gap-stack">
          <StatCard variant="brand"    size="sm" icon={<BookOpen size={18} />} label="Parcours actifs"   value={inProgress} />
          <StatCard variant="warm"     size="sm" icon={<Trophy size={18} />}   label="Parcours terminés" value={completed} />
          <StatCard variant="sun"      size="sm" icon={<Clock3 size={18} />}   label="Leçons complétées" value={completedLessons} sub={`/${totalLessons}`} />
          <StatCard variant="elevated" size="sm" icon={<Flame size={18} />}    label="Progression"        value={overallProgress} sub="%" />
        </section>

        {/* Filters */}
        <section aria-label="Filtres" className="flex flex-col gap-stack-xs">
          <Search
            value={query}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setQuery(e.target.value)}
            placeholder="Rechercher un parcours…"
            aria-label="Rechercher un parcours"
          />

          <div className="flex flex-wrap items-center gap-3">
            <FilterBar
              options={STATUS_FILTERS.map((f) => ({ id: f.id, label: f.label, count: counts[f.id] }))}
              selected={Array.from(selectedStatuses)}
              onChange={(ids) => setSelectedStatuses(new Set(ids as ParcoursStatus[]))}
              onClearAll={resetFilters}
              tone="brand"
              size="sm"
            />
            <span className="ml-auto font-body text-caption text-ink-500">
              {filteredParcours.length} sur {total}
            </span>
          </div>
        </section>

        {/* Grid */}
        {filteredParcours.length === 0 ? (
          <EmptyState
            tone="warm"
            icon={<Sparkles size={32} />}
            title="Aucun parcours trouvé"
            description="Aucun parcours ne correspond à vos filtres pour le moment."
            actions={
              <Button variant="secondary" size="sm" leadingIcon={<RotateCcw size={12} />} onClick={resetFilters}>
                Réinitialiser les filtres
              </Button>
            }
          />
        ) : (
          <CardGrid layout="default" gapSize="lg" aria-label="Liste des parcours">
            {filteredParcours.map((parcours, index) => (
              <ParcoursCard
                key={parcours.id}
                id={parcours.id}
                title={parcours.title}
                description={parcours.description}
                progress={parcours.progress}
                status={parcours.status}
                tone={TONES[index % TONES.length]}
                onClick={handleCardClick}
                duration={parcours.duration}
                lessons={parcours.lessons}
              />
            ))}
          </CardGrid>
        )}
      </div>
    </div>
  );
};

export default LearningPaths;
