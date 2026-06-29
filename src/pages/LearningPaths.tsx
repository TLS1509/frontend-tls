/**
 * LearningPaths Page : Mes Parcours
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
import { PageShell } from '../components/layout';
import { useLessonProgressStore } from '../stores/persistence';
import { MOCK_PARCOURS_DATA, MOCK_PARCOURS_LIST } from '../data/learningPaths';
import type { ParcoursListItem } from '../data/learningPaths';

type Parcours = ParcoursListItem & { status: ParcoursStatus };

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

  const lessonProgressStore = useLessonProgressStore();

  // Compute progress from store for each parcours using real lesson completion data
  const parcoursList = useMemo(() => {
    return MOCK_PARCOURS_LIST.map((p) => {
      const data = MOCK_PARCOURS_DATA[p.id];
      if (!data) return p;
      // Collect all lesson IDs in this parcours
      const allLessonIds = data.etapes.flatMap((e) => e.lecons.map((l) => l.id));
      if (allLessonIds.length === 0) return p;
      // Count completed lessons from the store
      const storeCompleted = allLessonIds.filter((id) => lessonProgressStore.isLessonCompleted(id)).length;
      // Only use store data if the user has started at least one lesson; else keep seed progress
      const realProgress = storeCompleted > 0
        ? Math.round((storeCompleted / allLessonIds.length) * 100)
        : p.progress;
      const status: ParcoursStatus = realProgress >= 100 ? 'complété' : realProgress > 0 ? 'en cours' : 'non commencé';
      return { ...p, progress: realProgress, status };
    });
  }, [lessonProgressStore.lessons]);

  const total = parcoursList.length;
  const totalLessons = parcoursList.reduce((s, p) => s + p.lessons, 0);
  const completedLessons = parcoursList.reduce(
    (s, p) => s + Math.round((p.lessons * p.progress) / 100),
    0,
  );
  const overallProgress = totalLessons > 0 ? Math.round((completedLessons / totalLessons) * 100) : 0;
  const inProgress = parcoursList.filter((p) => p.status === 'en cours').length;
  const completed  = parcoursList.filter((p) => p.status === 'complété').length;
  const counts = useMemo(() => ({
    'en cours':      parcoursList.filter((p) => p.status === 'en cours').length,
    'complété':      parcoursList.filter((p) => p.status === 'complété').length,
    'non commencé': parcoursList.filter((p) => p.status === 'non commencé').length,
  }), [parcoursList]);

  const filteredParcours = useMemo(() => {
    return parcoursList.filter((p) => {
      const matchStatus = selectedStatuses.size === 0 || selectedStatuses.has(p.status);
      const q = query.trim().toLowerCase();
      const matchQuery =
        q.length === 0 ||
        p.title.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        p.instructor.toLowerCase().includes(q);
      return matchStatus && matchQuery;
    });
  }, [parcoursList, selectedStatuses, query]);

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
    <PageShell width="page" noPadTop={false} className="relative bg-gradient-page-ambient">

        {/* Hero : EditorialHero tone="brand" (primary teal : Parcours = core content of TLS) */}
        <EditorialHero
          tone="flat"
          eyebrow={{ icon: <GraduationCap size={12} />, label: 'Mon apprentissage' }}
          title="Mes Parcours"
          summary="Explore tes parcours de formation et suis ta progression au fil des leçons."
          trailing={
            <Search
              size="sm"
              variant="glass"
              value={query}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setQuery(e.target.value)}
              placeholder="Rechercher…"
              aria-label="Rechercher un parcours"
              filtersSlot={
                <div className="flex flex-wrap items-center gap-stack-xs">
                  <FilterBar
                    options={STATUS_FILTERS.map((f) => ({ id: f.id, label: f.label, count: counts[f.id] }))}
                    selected={Array.from(selectedStatuses)}
                    onChange={(ids) => setSelectedStatuses(new Set(ids as ParcoursStatus[]))}
                    onClearAll={resetFilters}
                    tone="brand"
                    variant="glass"
                    size="sm"
                    surface="plain"
                  />
                  <span className="font-body text-caption text-white/70 ml-auto">
                    {filteredParcours.length} sur {total}
                  </span>
                </div>
              }
            />
          }
        />

        {/* Grid */}
        {filteredParcours.length === 0 ? (
          <EmptyState
            tone="warm"
            icon={<Sparkles size={32} />}
            title="Aucun parcours trouvé"
            description="Aucun parcours ne correspond à tes filtres pour le moment."
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
    </PageShell>
  );
};

export default LearningPaths;
