import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, Users, Calendar, Target } from 'lucide-react';
import EditorialHero from '../components/patterns/EditorialHero';
import { Card } from '../components/core/Card';
import { Button } from '../components/core/Button';
import { Badge } from '../components/ui/Badge';
import { FilterChip } from '../components/ui/FilterChip';
import { StatCard } from '../components/ui/StatCard';
import { Avatar, AvatarGroup } from '../components/ui/Avatar';
import { ProgressBar } from '../components/ui/ProgressBar';
import { EmptyState } from '../components/ui/EmptyState';

type ProjectStatus = 'active' | 'completed' | 'paused';

interface Project {
  id: string;
  title: string;
  client: string;
  status: ProjectStatus;
  progress: number;
  team: { initials: string }[];
  deadline: string;
  competences: string[];
  jacStatus: 'pending' | 'validated' | 'in-review';
}

const MOCK_PROJECTS: Project[] = [
  { id: '1', title: 'Plan stratégique TLS 2027', client: 'The Learning Society', status: 'active', progress: 65, team: [{ initials: 'CM' }, { initials: 'MD' }, { initials: 'TB' }], deadline: '30 juin 2026', competences: ['Stratégie', 'Communication'], jacStatus: 'pending' },
  { id: '2', title: 'Refonte CRM client', client: 'Acme Corp', status: 'active', progress: 40, team: [{ initials: 'LM' }, { initials: 'SC' }], deadline: '15 juillet 2026', competences: ['Tech', 'UX'], jacStatus: 'in-review' },
  { id: '3', title: 'Onboarding partenaires', client: 'GlobalCo', status: 'completed', progress: 100, team: [{ initials: 'JP' }, { initials: 'AR' }, { initials: 'CM' }], deadline: '10 mai 2026', competences: ['Process', 'Comm.'], jacStatus: 'validated' },
];

const ProjectsList: React.FC = () => {
  const nav = useNavigate();
  const [filter, setFilter] = useState<'all' | ProjectStatus>('all');

  const filtered = filter === 'all' ? MOCK_PROJECTS : MOCK_PROJECTS.filter((p) => p.status === filter);

  return (
    <div className="min-h-screen bg-surface">
      <EditorialHero
        eyebrow="Projets · Mes missions"
        title="Tous mes projets en cours"
        description="Tâches assignées, statut JAC, mises à jour Passeport en temps réel"
        tone="brand"
        action={<Button variant="primary" leadingIcon={<Plus className="w-4 h-4" />}>Nouveau projet</Button>}
      />

      <div className="max-w-page mx-auto px-4 py-section flex flex-col gap-section">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-stack-xs">
          <StatCard label="Projets actifs" value="2" sub="+1 ce mois" />
          <StatCard label="Tâches assignées" value="12" sub="3 urgentes" />
          <StatCard label="JAC en attente" value="4" sub="dont 1 validé" />
          <StatCard label="Compétences mobilisées" value="8" />
        </div>

        <div className="flex flex-wrap gap-stack-xs">
          <FilterChip active={filter === 'all'} onClick={() => setFilter('all')}>Tous</FilterChip>
          <FilterChip active={filter === 'active'} onClick={() => setFilter('active')}>Actifs</FilterChip>
          <FilterChip active={filter === 'paused'} onClick={() => setFilter('paused')}>En pause</FilterChip>
          <FilterChip active={filter === 'completed'} onClick={() => setFilter('completed')}>Terminés</FilterChip>
        </div>

        {filtered.length === 0 ? (
          <EmptyState title="Aucun projet" description="Aucun projet ne correspond aux filtres" />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-stack">
            {filtered.map((p) => (
              <Card
                key={p.id}
                className="p-6 cursor-pointer hover:border-primary-300 transition-all"
                onClick={() => nav(`/project/${p.id}`)}
              >
                <div className="flex items-start justify-between gap-stack mb-stack">
                  <div className="flex-1">
                    <div className="text-caption text-ink-500 mb-1">{p.client}</div>
                    <h3 className="text-h4 font-semibold">{p.title}</h3>
                  </div>
                  <Badge variant={p.status === 'active' ? 'info' : p.status === 'completed' ? 'success' : 'neutral'}>
                    {p.status === 'active' ? 'En cours' : p.status === 'completed' ? 'Terminé' : 'En pause'}
                  </Badge>
                </div>

                <div className="flex flex-wrap gap-1 mb-stack">
                  {p.competences.map((c) => (
                    <Badge key={c} variant="brand">{c}</Badge>
                  ))}
                </div>

                <div className="mb-stack">
                  <div className="flex justify-between text-caption text-ink-500 mb-1">
                    <span>Progression</span>
                    <span>{p.progress}%</span>
                  </div>
                  <ProgressBar value={p.progress} max={100} tone="brand" />
                </div>

                <div className="flex items-center justify-between">
                  <AvatarGroup max={3}>
                    {p.team.map((t, i) => (
                      <Avatar key={i} initials={t.initials} size="sm" />
                    ))}
                  </AvatarGroup>
                  <div className="flex items-center gap-1 text-caption text-ink-500">
                    <Calendar className="w-3 h-3" /> {p.deadline}
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProjectsList;
