import React, { useMemo, useState } from 'react';
import { FileText, CheckCircle2, Search } from 'lucide-react';
import { EditorialHero } from '../components/patterns/EditorialHero';
import { PageShell } from '../components/layout';
import { SectionCard } from '../components/patterns/SectionCard';
import { FilterChip } from '../components/ui/FilterChip';
import { CorrectionCard } from '../components/ui/CorrectionCard';
import { EmptyState } from '../components/ui/EmptyState';
import { StatCard } from '../components/ui/StatCard';
import { useCoachingStore } from '../stores/persistence';
import { MOCK_USER_ID } from '../data/passeport';
import type { CorrectionStatus } from '../types/learning';

// ─── Helpers ─────────────────────────────────────────────────────────────────

type CardStatus = 'pending' | 'in-review' | 'corrected';

function toCorrectionCardStatus(s: CorrectionStatus): CardStatus {
  if (s === 'completed') return 'corrected';
  if (s === 'pending') return 'pending';
  return 'in-review';
}

function relativeDate(iso: string): string {
  const diffMs = Date.now() - new Date(iso).getTime();
  const diffH = Math.floor(diffMs / 3600000);
  if (diffH < 24) return `Il y a ${diffH}h`;
  const diffD = Math.floor(diffH / 24);
  if (diffD === 1) return 'Hier';
  return `Il y a ${diffD}j`;
}

// Legacy mock kept only to avoid empty state on first load before store seeds
const CORRECTIONS_FALLBACK = [
  {
    id: '1',
    apprenantName: 'Sophie Martin',
    apprenantInitials: 'SM',
    exerciceTitle: 'Analyse d\'une situation de management complexe',
    competence: 'Leadership',
    submittedAt: 'Il y a 2h',
    status: 'pending' as const,
    excerpt: 'Dans cette situation, j\'ai dû gérer un conflit entre deux membres de mon équipe qui avaient des visions différentes sur le projet...',
    feedbackCount: 0,
  },
  {
    id: '2',
    apprenantName: 'Pierre Bernard',
    apprenantInitials: 'PB',
    exerciceTitle: 'Plan de communication projet Q3',
    competence: 'Communication',
    submittedAt: 'Hier',
    status: 'in-review' as const,
    excerpt: 'Le plan de communication s\'articule autour de trois axes principaux : la transparence, la fréquence et l\'adaptation au public...',
    feedbackCount: 2,
  },
  {
    id: '3',
    apprenantName: 'Nadia Ferreira',
    apprenantInitials: 'NF',
    exerciceTitle: 'Rapport d\'analyse décisionnelle',
    competence: 'Analyse',
    submittedAt: 'Il y a 3j',
    status: 'corrected' as const,
    feedbackCount: 4,
  },
  {
    id: '4',
    apprenantName: 'Julien Moreau',
    apprenantInitials: 'JM',
    exerciceTitle: 'Étude de cas : délégation et contrôle',
    competence: 'Leadership',
    submittedAt: 'Il y a 5j',
    status: 'pending' as const,
    excerpt: 'J\'ai analysé cette situation de délégation en me basant sur le modèle situationnel de Hersey et Blanchard...',
    feedbackCount: 0,
  },
];

const FILTER_OPTIONS = [
  { id: 'all', label: 'Tous' },
  { id: 'pending', label: 'À corriger' },
  { id: 'in-review', label: 'En cours' },
  { id: 'corrected', label: 'Corrigés' },
];

// ─── Component ────────────────────────────────────────────────────────────────

export default function CoachingCorrections() {
  const [activeFilter, setActiveFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const coachingStore = useCoachingStore();
  const storeCorrections = coachingStore.getCorrections(MOCK_USER_ID);
  const sessions = coachingStore.getSessions(MOCK_USER_ID);

  const corrections = useMemo(() => {
    const src = storeCorrections.length > 0 ? storeCorrections : [];
    if (src.length === 0) return CORRECTIONS_FALLBACK;
    return src.map((c) => {
      const session = sessions.find((s) => s.id === c.sessionId);
      return {
        id: c.id,
        apprenantName: session?.coachName ?? 'Sophie Marchand',
        apprenantInitials: session?.coachName ? session.coachName.split(' ').map((w) => w[0]).join('') : 'SM',
        exerciceTitle: c.exerciseTitle,
        competence: c.competenceId ?? '',
        submittedAt: relativeDate(c.submittedAt),
        status: toCorrectionCardStatus(c.status),
        excerpt: c.submittedContent?.slice(0, 150),
        feedbackCount: c.iterationCount,
      };
    });
  }, [storeCorrections, sessions]);

  const pendingCount = corrections.filter((c) => c.status === 'pending').length;
  const correctedCount = corrections.filter((c) => c.status === 'corrected').length;

  const filtered = corrections.filter((c) => {
    const matchFilter = activeFilter === 'all' || c.status === activeFilter;
    const matchSearch = !searchQuery ||
      c.exerciceTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.apprenantName.toLowerCase().includes(searchQuery.toLowerCase());
    return matchFilter && matchSearch;
  });

  return (
    <div className="flex flex-col gap-section">
      <EditorialHero
        eyebrow="Coaching · Corrections"
        title="Mes Corrections"
        summary="Retrouve ici les exercices soumis par ton coach en attente de correction et les travaux déjà corrigés."
        tone="flat"
      />

      <PageShell noPadTop className="pt-6 md:pt-8 lg:pt-10">

        {/* KPI row */}
        <div className="grid grid-cols-3 gap-stack">
          <StatCard value={pendingCount} label="À corriger" variant="warm" size="sm"
            delta={pendingCount > 0 ? 'En attente' : 'RAS'} deltaDirection={pendingCount > 0 ? 'down' : 'up'} />
          <StatCard value={corrections.filter((c) => c.status === 'in-review').length} label="En cours" variant="default" size="sm" />
          <StatCard value={correctedCount} label="Corrigés ce mois" variant="brand" size="sm"
            delta="↑ 2 vs mois dernier" deltaDirection="up" />
        </div>

        {/* Search + filters */}
        <div className="flex flex-col gap-stack-xs">
          <div className="relative">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-ink-400" />
            <input
              type="text"
              placeholder="Rechercher un exercice ou un apprenant..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-ink-200 text-body-sm focus:outline-none focus:border-primary-400 transition-colors duration-fast"
            />
          </div>
          <div className="flex flex-wrap gap-stack-xs">
            {FILTER_OPTIONS.map((f) => (
              <FilterChip
                key={f.id}
                label={f.label}
                active={activeFilter === f.id}
                onClick={() => setActiveFilter(f.id)}
              />
            ))}
          </div>
        </div>

        {/* Corrections list */}
        <SectionCard title={`${filtered.length} résultat${filtered.length !== 1 ? 's' : ''}`} titleIcon={<FileText size={18} />}>
          {filtered.length === 0 ? (
            <EmptyState
              icon={<CheckCircle2 size={32} />}
              title="Aucun exercice trouvé"
              description="Aucune correction ne correspond à tes critères de recherche."
            />
          ) : (
            <div className="flex flex-col gap-stack-xs">
              {filtered.map((correction) => (
                <CorrectionCard
                  key={correction.id}
                  {...correction}
                  onOpen={() => {}}
                />
              ))}
            </div>
          )}
        </SectionCard>

      </PageShell>
    </div>
  );
}
