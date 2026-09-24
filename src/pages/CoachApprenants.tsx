import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Users, AlertTriangle, Search as SearchIcon } from 'lucide-react';
import { EditorialHero } from '../components/patterns/EditorialHero';
import { SectionHeader } from '../components/patterns/SectionHeader';
import { Button } from '../components/core/Button';
import { StatCard } from '../components/ui/StatCard';
import { FilterChip } from '../components/ui/FilterChip';
import { EmptyState } from '../components/ui/EmptyState';
import { ApprenantsTable, formatDreyfus } from '../components/coach/ApprenantsTable';
import { PageShell } from '../components/layout';
import { APPRENANTS } from '../data/apprenants';

const FILTER_OPTIONS = [
  { id: 'all', label: 'Tous' },
  { id: 'active', label: 'Actifs' },
  { id: 'stuck', label: 'En difficulté' },
  { id: 'ahead', label: 'En avance' },
];

// ─── Component ────────────────────────────────────────────────────────────────

export default function CoachApprenants() {
  const navigate = useNavigate();
  const [activeFilter, setActiveFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filtered = APPRENANTS.filter((a) => {
    const matchFilter = activeFilter === 'all' || a.status === activeFilter;
    const matchSearch = !searchQuery ||
      a.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      a.role.toLowerCase().includes(searchQuery.toLowerCase());
    return matchFilter && matchSearch;
  });

  const stuckCount = APPRENANTS.filter((a) => a.status === 'stuck').length;
  const aheadCount = APPRENANTS.filter((a) => a.status === 'ahead').length;

  return (
    <PageShell width="page" noPadTop className="pt-6 md:pt-8 lg:pt-10">
      <EditorialHero
        eyebrow="Coach · Apprenants"
        title="Mes Apprenants"
        summary="Suivez la progression de chaque apprenant, identifiez les situations à risque et planifiez les interventions."
        tone="flat"
      />

      <div className="flex flex-col gap-section">

        {/* KPI row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-stack">
          <StatCard value={APPRENANTS.length} label="Apprenants suivis" size="sm" />
          <StatCard
            value={stuckCount}
            label="En difficulté"
            variant="warm"
            size="sm"
            delta={stuckCount > 0 ? 'Intervention recommandée' : 'RAS'}
            deltaDirection={stuckCount > 0 ? 'down' : 'up'}
          />
          <StatCard value={aheadCount} label="En avance" variant="brand" size="sm" delta="Excellent" deltaDirection="up" />
          <StatCard
            value={`${formatDreyfus(APPRENANTS.reduce((acc, a) => acc + a.dreyfusAvg, 0) / APPRENANTS.length)} / 5`}
            label="Score Dreyfus moyen"
            size="sm"
          />
        </div>

        {/* Alert */}
        {stuckCount > 0 && (
          <div className="flex items-start gap-stack p-stack bg-warning-bg border border-warning-border rounded-lg">
            <AlertTriangle size={18} className="text-warning-fg shrink-0 mt-0.5" />
            <p className="text-body text-ink-700">
              <strong>{stuckCount} apprenants</strong> n'ont pas eu d'activité depuis plus de 7 jours. Une prise de contact est recommandée.
            </p>
          </div>
        )}

        {/* Search + filters */}
        <div className="flex flex-col gap-stack-xs">
          <div className="relative">
            <SearchIcon size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-ink-400" />
            <input
              type="text"
              placeholder="Rechercher un apprenant..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2.5 rounded-lg border border-ink-200 text-body focus:outline-none focus:border-primary-400 transition-colors duration-fast"
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

        {/* Une collection d'apprenants se lit en table triable, pas en grille de
            cartes (arbitrage n°5 du 23/09) : le coach trie par statut, activité,
            JAC ou Dreyfus pour trouver qui a besoin de lui. */}
        <section className="flex flex-col gap-stack" aria-label="Liste des apprenants">
          <SectionHeader
            title={`${filtered.length} apprenant${filtered.length !== 1 ? 's' : ''}`}
            icon={<Users size={20} />}
            tone="primary"
            size="md"
          />
          {filtered.length === 0 ? (
            <EmptyState
              icon={<Users size={32} />}
              title="Aucun apprenant trouvé"
              description="Aucun apprenant ne correspond à votre recherche."
            />
          ) : (
            <ApprenantsTable
              apprenants={filtered}
              onRowClick={(a) => navigate(`/coach/apprenant/${a.id}`)}
              actionLabel="Fiche"
              renderAction={(a) => (
                <Button
                  emphasis="outline"
                  size="sm"
                  aria-label={`Profil de ${a.name}`}
                  onClick={(e) => {
                    e.stopPropagation();
                    navigate(`/coach/apprenant/${a.id}`);
                  }}
                >
                  Profil
                </Button>
              )}
            />
          )}
        </section>

      </div>
    </PageShell>
  );
}
