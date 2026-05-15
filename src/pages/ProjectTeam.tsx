import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Users, UserCheck, TrendingUp, Target, CheckCircle2 } from 'lucide-react';
import { Button } from '../components/core/Button';
import { Badge } from '../components/ui/Badge';
import { EditorialHero } from '../components/patterns/EditorialHero';
import { SectionCard } from '../components/patterns/SectionCard';
import { StatCard } from '../components/ui/StatCard';
import { Avatar } from '../components/ui/Avatar';
import { useProjectsStore } from '../stores/persistence';

const DREYFUS_LABELS = ['', 'Novice', 'Apprenant', 'Compétent', 'Expert', 'Maître'] as const;

const DREYFUS_VARIANT = (level: number): 'neutral' | 'info' | 'brand' | 'warm' | 'success' => {
  if (level <= 2) return 'neutral';
  if (level === 3) return 'brand';
  return 'warm';
};

const ROLE_LABELS: Record<string, string> = {
  collaborateur: 'Collaborateur',
  manager: 'Manager',
  expert: 'Expert',
};

export const ProjectTeam: React.FC = () => {
  const { id: projectId } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const store = useProjectsStore();

  const project = store.getProject(projectId ?? '');
  const teamMembers = projectId ? store.getTeamMembers(projectId) : [];

  const collaborateurs = teamMembers.filter((m) => m.role === 'collaborateur');
  const experts = teamMembers.filter((m) => m.role === 'expert');
  const managers = teamMembers.filter((m) => m.role === 'manager');

  const totalJacs = teamMembers.reduce((sum, m) => sum + m.jacCount, 0);
  const totalValidated = teamMembers.reduce((sum, m) => sum + m.jacValidated, 0);

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-10 py-section flex flex-col gap-section">
      <div>
        <Button variant="ghost" size="sm" leadingIcon={<ArrowLeft size={14} />} onClick={() => navigate(`/project/${projectId}`)}>
          Retour au projet
        </Button>
      </div>

      <EditorialHero
        eyebrow={{ label: 'Projet · Équipe' }}
        title="Équipe du projet"
        summary={project?.title ? `Membres, niveaux Dreyfus et compétences — ${project.title}` : 'Membres, niveaux Dreyfus et compétences de l\'équipe.'}
        tone="brand"
      />

      <div className="grid grid-cols-2 md:grid-cols-4 gap-stack-xs">
        <StatCard label="Membres" value={teamMembers.length} icon={<Users size={20} />} variant="brand" />
        <StatCard label="Experts" value={experts.length} icon={<UserCheck size={20} />} variant="warm" />
        <StatCard label="JAC soumis" value={totalJacs} icon={<Target size={20} />} variant="default" />
        <StatCard label="JAC validés" value={totalValidated} icon={<CheckCircle2 size={20} />} variant="default" />
      </div>

      {/* Collaborateurs */}
      {collaborateurs.length > 0 && (
        <SectionCard title="Collaborateurs" titleIcon={<Users size={18} />} description={`${collaborateurs.length} membres actifs`}>
          <div className="grid grid-cols-1 gap-stack sm:grid-cols-2">
            {collaborateurs.map((m) => {
              const competencies = Object.entries(m.currentDreyfusLevels);
              return (
                <div key={m.userId} className="flex flex-col gap-stack-xs rounded-xl border border-ink-100 bg-ink-50 p-4">
                  <div className="flex items-center gap-3">
                    <Avatar initials={m.initials} size="md" tint="brand" />
                    <div className="flex flex-col gap-tight min-w-0">
                      <span className="text-body-sm font-semibold text-ink-900 truncate">{m.name}</span>
                      <div className="flex items-center gap-1.5 flex-wrap">
                        <Badge variant="neutral">{ROLE_LABELS[m.role]}</Badge>
                        <Badge variant="brand">{m.assignedTaskIds.length} tâche(s)</Badge>
                      </div>
                    </div>
                  </div>
                  {competencies.length > 0 && (
                    <div className="flex flex-col gap-stack-xs">
                      <p className="text-caption font-semibold text-ink-500 uppercase tracking-wide m-0">Niveaux Dreyfus</p>
                      <div className="flex flex-wrap gap-1.5">
                        {competencies.map(([compId, level]) => {
                          const skillReq = project?.skillProfile.find((s) => s.competencyId === compId);
                          const label = skillReq?.competencyName ?? compId;
                          return (
                            <span key={compId} className={`px-2 py-0.5 rounded-pill text-caption font-semibold ${
                              level >= (skillReq?.dreyfusLevelRequired ?? 1)
                                ? 'bg-success-bg text-success-fg'
                                : 'bg-warning-bg text-warning-fg'
                            }`}>
                              {label} · D{level}
                            </span>
                          );
                        })}
                      </div>
                    </div>
                  )}
                  <div className="flex items-center gap-stack-xs text-caption text-ink-500">
                    <CheckCircle2 size={12} />
                    <span>{m.jacValidated}/{m.jacCount} JAC validés</span>
                  </div>
                </div>
              );
            })}
          </div>
        </SectionCard>
      )}

      {/* Experts & Managers */}
      {(experts.length > 0 || managers.length > 0) && (
        <SectionCard title="Experts & Managers" titleIcon={<UserCheck size={18} />}>
          <div className="flex flex-col gap-stack-xs">
            {[...experts, ...managers].map((m) => (
              <div key={m.userId} className="flex items-center gap-stack p-3 rounded-lg border border-ink-100">
                <Avatar initials={m.initials} size="md" tint="warm" />
                <div className="flex-1 min-w-0">
                  <p className="text-body-sm font-semibold text-ink-900 m-0">{m.name}</p>
                  <p className="text-caption text-ink-500 m-0">{ROLE_LABELS[m.role]}</p>
                </div>
                <Badge variant="warm">{ROLE_LABELS[m.role]}</Badge>
              </div>
            ))}
          </div>
        </SectionCard>
      )}

      {/* Compétences requises par le projet */}
      {project && project.skillProfile.length > 0 && (
        <SectionCard title="Compétences requises" titleIcon={<TrendingUp size={18} />} description="Niveaux requis par le profil du projet">
          <div className="flex flex-col gap-stack-xs">
            {project.skillProfile.map((req) => {
              const membersAtLevel = collaborateurs.filter(
                (m) => (m.currentDreyfusLevels[req.competencyId] ?? 0) >= req.dreyfusLevelRequired
              ).length;
              return (
                <div key={req.competencyId} className="flex items-center justify-between gap-stack p-3 rounded-lg bg-ink-50">
                  <div className="flex-1 min-w-0">
                    <p className="text-body-sm font-semibold text-ink-900 m-0">{req.competencyName}</p>
                    <p className="text-caption text-ink-500 m-0">
                      {membersAtLevel}/{collaborateurs.length} membres au niveau requis
                    </p>
                  </div>
                  <div className="flex items-center gap-stack-xs shrink-0">
                    <Badge variant={DREYFUS_VARIANT(req.dreyfusLevelRequired)}>
                      D{req.dreyfusLevelRequired}+ requis
                    </Badge>
                    {membersAtLevel < req.count && (
                      <Badge variant="danger">Insuffisant</Badge>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </SectionCard>
      )}
    </div>
  );
};

export default ProjectTeam;
