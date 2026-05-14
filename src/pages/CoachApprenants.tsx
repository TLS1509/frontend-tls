import React, { useState } from 'react';
import { Users, TrendingUp, AlertTriangle, Search as SearchIcon } from 'lucide-react';
import { EditorialHero } from '../components/patterns/EditorialHero';
import { SectionCard } from '../components/patterns/SectionCard';
import { Button } from '../components/core/Button';
import { StatCard } from '../components/ui/StatCard';
import { ProfileCard } from '../components/ui/ProfileCard';
import { FilterChip } from '../components/ui/FilterChip';
import { Badge } from '../components/ui/Badge';
import { EmptyState } from '../components/ui/EmptyState';

// ─── Mock data ────────────────────────────────────────────────────────────────

const APPRENANTS = [
  {
    id: 1,
    name: 'Sophie Martin',
    initials: 'SM',
    role: 'Manager d\'équipe',
    tags: ['Leadership D3', 'Communication D4'],
    status: 'active',
    lastActivity: '2j',
    dreyfusAvg: 3.2,
    nextSession: '22 mai',
    streak: 14,
  },
  {
    id: 2,
    name: 'Pierre Bernard',
    initials: 'PB',
    role: 'Chef de projet',
    tags: ['Communication D3', 'Analyse D1'],
    status: 'stuck',
    lastActivity: '8j',
    dreyfusAvg: 2.1,
    nextSession: null,
    streak: 0,
  },
  {
    id: 3,
    name: 'Nadia Ferreira',
    initials: 'NF',
    role: 'Directrice Marketing',
    tags: ['Leadership D4', 'Analyse D4'],
    status: 'ahead',
    lastActivity: '1j',
    dreyfusAvg: 4.1,
    nextSession: '20 mai',
    streak: 21,
  },
  {
    id: 4,
    name: 'Julien Moreau',
    initials: 'JM',
    role: 'Responsable RH',
    tags: ['Communication D3', 'Leadership D3'],
    status: 'active',
    lastActivity: '3j',
    dreyfusAvg: 2.8,
    nextSession: '25 mai',
    streak: 6,
  },
  {
    id: 5,
    name: 'Camille Durand',
    initials: 'CD',
    role: 'Directrice Commerciale',
    tags: ['Leadership D5', 'Analyse D5'],
    status: 'ahead',
    lastActivity: 'Hier',
    dreyfusAvg: 4.3,
    nextSession: '21 mai',
    streak: 35,
  },
  {
    id: 6,
    name: 'Marc Lefebvre',
    initials: 'ML',
    role: 'Manager junior',
    tags: ['Leadership D1', 'Tech D1'],
    status: 'stuck',
    lastActivity: '14j',
    dreyfusAvg: 1.5,
    nextSession: null,
    streak: 0,
  },
];

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
        subtitle="Suis la progression de chaque apprenant, identifie les situations à risque et planifie les interventions."
        tone="primary"
      />

      <div className="max-w-wide mx-auto w-full px-4 md:px-8 flex flex-col gap-section">

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
          <div className="flex items-start gap-stack p-4 bg-warning-bg border border-warning-border rounded-xl">
            <AlertTriangle size={18} className="text-warning-fg shrink-0 mt-0.5" />
            <p className="text-body-sm text-ink-700">
              <strong>{stuckCount} apprenants</strong> n'ont pas eu d'activité depuis plus de 7 jours. Une prise de contact est recommandée.
            </p>
          </div>
        )}

        {/* Search + filters */}
        <div className="flex flex-col gap-3">
          <div className="relative">
            <SearchIcon size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-ink-400" />
            <input
              type="text"
              placeholder="Rechercher un apprenant..."
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

        {/* Apprenants grid */}
        <SectionCard title={`${filtered.length} apprenant${filtered.length !== 1 ? 's' : ''}`} icon={<Users size={18} />}>
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
                      tags={a.tags}
                      variant="default"
                      alignment="left"
                      cta={
                        <div className="flex items-center gap-2">
                          <Badge variant={variant} size="sm">{label}</Badge>
                          <Button variant="brand-ghost" size="sm">Profil</Button>
                        </div>
                      }
                    />
                  </div>
                );
              })}
            </div>
          )}
        </SectionCard>

      </div>
    </div>
  );
}
