import React, { useState } from 'react';
import { FileText, Clock, CheckCircle2, Search } from 'lucide-react';
import { EditorialHero } from '../components/patterns/EditorialHero';
import { SectionCard } from '../components/patterns/SectionCard';
import { Button } from '../components/core/Button';
import { FilterChip } from '../components/ui/FilterChip';
import { CorrectionCard } from '../components/ui/CorrectionCard';
import { EmptyState } from '../components/ui/EmptyState';
import { StatCard } from '../components/ui/StatCard';

// ─── Mock data ────────────────────────────────────────────────────────────────

const CORRECTIONS = [
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

  const pendingCount = CORRECTIONS.filter((c) => c.status === 'pending').length;
  const correctedCount = CORRECTIONS.filter((c) => c.status === 'corrected').length;

  const filtered = CORRECTIONS.filter((c) => {
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
        subtitle="Retrouve ici les exercices soumis par ton coach en attente de correction et les travaux déjà corrigés."
        tone="primary"
      />

      <div className="max-w-page mx-auto w-full px-4 md:px-8 flex flex-col gap-section">

        {/* KPI row */}
        <div className="grid grid-cols-3 gap-stack">
          <StatCard value={pendingCount} label="À corriger" variant="warm" size="sm"
            delta={pendingCount > 0 ? 'En attente' : 'RAS'} deltaDirection={pendingCount > 0 ? 'down' : 'up'} />
          <StatCard value={CORRECTIONS.filter((c) => c.status === 'in-review').length} label="En cours" variant="default" size="sm" />
          <StatCard value={correctedCount} label="Corrigés ce mois" variant="brand" size="sm"
            delta="↑ 2 vs mois dernier" deltaDirection="up" />
        </div>

        {/* Search + filters */}
        <div className="flex flex-col gap-3">
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
          <div className="flex flex-wrap gap-2">
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
        <SectionCard title={`${filtered.length} résultat${filtered.length !== 1 ? 's' : ''}`} icon={<FileText size={18} />}>
          {filtered.length === 0 ? (
            <EmptyState
              icon={<CheckCircle2 size={32} />}
              title="Aucun exercice trouvé"
              description="Aucune correction ne correspond à tes critères de recherche."
            />
          ) : (
            <div className="flex flex-col gap-3">
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

      </div>
    </div>
  );
}
