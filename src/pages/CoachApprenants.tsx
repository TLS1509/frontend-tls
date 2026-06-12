import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Users, AlertTriangle, Search as SearchIcon } from 'lucide-react';
import { EditorialHero } from '../components/patterns/EditorialHero';
import { SectionCard } from '../components/patterns/SectionCard';
import { Button } from '../components/core/Button';
import { StatCard } from '../components/ui/StatCard';
import { ProfileCard } from '../components/ui/ProfileCard';
import { FilterChip } from '../components/ui/FilterChip';
import { Badge } from '../components/ui/Badge';
import { EmptyState } from '../components/ui/EmptyState';
import { APPRENANTS } from '../data/apprenants';
import { Container } from '../components/layout';

const FILTER_OPTIONS = [
  { id: 'all', label: 'Tous' },
  { id: 'active', label: 'Actifs' },
  { id: 'stuck', label: 'En difficulté' },
  { id: 'ahead', label: 'En avance' },
];

const STATUS_BADGE: Record<string, { label: string; variant: 'neutral' | 'danger' | 'success' }> = {
  active: { label: 'Actif', variant: 'neutral' },
  stuck: { label: 'En difficulté', variant: 'danger' },
  ahead: { label: 'En avance', variant: 'success' },
};

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
    <div className="flex flex-col gap-section">
      <EditorialHero
        eyebrow="Coach · Apprenants"
        title="Mes Apprenants"
        summary="Suis la progression de chaque apprenant, identifie les situations à risque et planifie les interventions."
        tone="default"
      />

      <Container width="wide" padding={false} className="px-stack md:px-section flex flex-col gap-section">

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
            value={`D${(APPRENANTS.reduce((acc, a) => acc + a.dreyfusAvg, 0) / APPRENANTS.length).toFixed(1)}`}
            label="Score Dreyfus moyen"
            size="sm"
          />
        </div>

        {/* Alert */}
        {stuckCount > 0 && (
          <div className="flex items-start gap-stack p-stack bg-warning-bg border border-warning-border rounded-xl">
            <AlertTriangle size={18} className="text-warning-fg shrink-0 mt-0.5" />
            <p className="text-body-sm text-ink-700">
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
              className="w-full pl-9 pr-4 py-stack-xs.5 rounded-xl border border-ink-200 text-body-sm focus:outline-none focus:border-primary-400 transition-colors duration-fast"
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

        {/* Apprenants grid */}
        <SectionCard title={`${filtered.length} apprenant${filtered.length !== 1 ? 's' : ''}`} titleIcon={<Users size={18} />}>
          {filtered.length === 0 ? (
            <EmptyState
              icon={<Users size={32} />}
              title="Aucun apprenant trouvé"
              description="Aucun apprenant ne correspond à ta recherche."
            />
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-stack">
              {filtered.map((a) => {
                const { label, variant } = STATUS_BADGE[a.status];
                return (
                  <div key={a.id} className="flex flex-col gap-0">
                    <ProfileCard
                      name={a.name}
                      role={a.role}
                      initials={a.initials}
                      specialties={a.tags}
                      variant="default"
                      align="left"
                      cta={
                        <div className="flex items-center gap-stack-xs">
                          <Badge variant={variant} size="sm">{label}</Badge>
                          <Button
                            variant="brand-ghost"
                            size="sm"
                            onClick={() => navigate(`/coach/apprenant/${a.id}`)}
                          >
                            Profil
                          </Button>
                        </div>
                      }
                    />
                  </div>
                );
              })}
            </div>
          )}
        </SectionCard>

      </Container>
    </div>
  );
}
