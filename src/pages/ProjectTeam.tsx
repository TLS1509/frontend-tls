import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Users, UserCheck, Target, CheckCircle2 } from 'lucide-react';
import { Button } from '../components/core/Button';
import { Badge } from '../components/ui/Badge';
import { MetaPill } from '../components/ui/MetaPill';
import { Card } from '../components/core/Card';
import { EditorialHero } from '../components/patterns/EditorialHero';
import { SectionHeader } from '../components/patterns/SectionHeader';
import { StatCard } from '../components/ui/StatCard';
import { Avatar } from '../components/ui/Avatar';
import { useProjectsStore } from '../stores/persistence';
import { DREYFUS_LABELS } from '../data/competencies';
import { PageShell } from '../components/layout';

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
    /* `PageShell` : le `Container` ajoutait sa gouttière à celle de la page.
       Le retour et l'en-tête forment un groupe (24). */
    <PageShell width="medium">
      <div className="flex flex-col gap-stack-lg">
        <div>
          <Button emphasis="outline" size="sm" leadingIcon={<ArrowLeft size={14} />} onClick={() => navigate(`/project/${projectId}`)}>
            Retour au projet
          </Button>
        </div>

        <EditorialHero
          eyebrow={{ label: 'Projet · Équipe' }}
          title="Équipe du projet"
          summary={project?.title ? `Membres, niveaux Dreyfus et compétences : ${project.title}` : 'Membres, niveaux Dreyfus et compétences de l\'équipe.'}
          tone="flat"
        />
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-stack">
        <StatCard label="Membres" value={teamMembers.length} icon={<Users size={20} />} variant="brand" />
        <StatCard label="Experts" value={experts.length} icon={<UserCheck size={20} />} variant="warm" />
        <StatCard label="JAC soumis" value={totalJacs} icon={<Target size={20} />} variant="default" />
        <StatCard label="JAC validés" value={totalValidated} icon={<CheckCircle2 size={20} />} variant="default" />
      </div>

      {/* Collaborateurs — titre (h2 28) sur la page, le compte en méta ; une
          carte par personne (des boîtes grises dans une carte avant). Rôle,
          tâches et niveaux sont des données : MetaPill. Quinze Badge en
          capitales criaient sur cet écran. */}
      {collaborateurs.length > 0 && (
        <section className="flex flex-col gap-stack">
          <SectionHeader title="Collaborateurs" meta={`${collaborateurs.length} membres actifs`} />
          <div className="grid grid-cols-1 gap-stack sm:grid-cols-2">
            {collaborateurs.map((m) => {
              const competencies = Object.entries(m.currentDreyfusLevels);
              return (
                <Card key={m.userId} size="sm" className="flex flex-col gap-stack">
                  <div className="flex items-center gap-stack-sm">
                    <Avatar initials={m.initials} size="md" tint="brand" />
                    <div className="flex flex-col gap-stack-3xs min-w-0">
                      <span className="text-body font-semibold text-ink-900 truncate">{m.name}</span>
                      <div className="flex items-center gap-stack-2xs flex-wrap">
                        <MetaPill text={ROLE_LABELS[m.role]} />
                        <MetaPill text={`${m.assignedTaskIds.length} tâche(s)`} tone="primary" className="tabular-nums" />
                      </div>
                    </div>
                  </div>
                  {competencies.length > 0 && (
                    <div className="flex flex-col gap-stack-xs">
                      <p className="text-caption font-semibold text-ink-600">Niveaux Dreyfus</p>
                      <div className="flex flex-wrap gap-stack-2xs">
                        {competencies.map(([compId, level]) => {
                          const skillReq = project?.skillProfile.find((s) => s.competencyId === compId);
                          const label = skillReq?.competencyName ?? compId;
                          const met = level >= (skillReq?.dreyfusLevelRequired ?? 1);
                          return (
                            <MetaPill
                              key={compId}
                              text={`${label} · D${level} · ${DREYFUS_LABELS[level as 1 | 2 | 3 | 4 | 5]}`}
                              tone={met ? 'success' : 'warm'}
                            />
                          );
                        })}
                      </div>
                    </div>
                  )}
                  <div className="flex items-center gap-stack-xs text-caption text-ink-600 tabular-nums">
                    <CheckCircle2 size={14} aria-hidden="true" />
                    <span>{m.jacValidated}/{m.jacCount} JAC validés</span>
                  </div>
                </Card>
              );
            })}
          </div>
        </section>
      )}

      {/* Experts & Managers — rangées dans une carte ; le rôle s'y lisait
          deux fois (légende et Badge) : il reste la légende. */}
      {(experts.length > 0 || managers.length > 0) && (
        <section className="flex flex-col gap-stack">
          <SectionHeader title="Experts & Managers" />
          <Card className="p-0 overflow-hidden">
            <ul className="divide-y divide-ink-100">
              {[...experts, ...managers].map((m) => (
                <li key={m.userId} className="flex items-center gap-stack px-stack-lg py-stack">
                  <Avatar initials={m.initials} size="md" tint="warm" />
                  <div className="flex-1 min-w-0 flex flex-col gap-stack-3xs">
                    <p className="text-body font-semibold text-ink-900">{m.name}</p>
                    <p className="text-caption text-ink-600">{ROLE_LABELS[m.role]}</p>
                  </div>
                </li>
              ))}
            </ul>
          </Card>
        </section>
      )}

      {/* Compétences requises par le projet — rangées dans une carte ; le
          niveau requis est une donnée (MetaPill), « Insuffisant » un état
          (Badge). */}
      {project && project.skillProfile.length > 0 && (
        <section className="flex flex-col gap-stack">
          <SectionHeader title="Compétences requises" subtitle="Niveaux requis par le profil du projet" />
          <Card className="p-0 overflow-hidden">
            <ul className="divide-y divide-ink-100">
              {project.skillProfile.map((req) => {
                const membersAtLevel = collaborateurs.filter(
                  (m) => (m.currentDreyfusLevels[req.competencyId] ?? 0) >= req.dreyfusLevelRequired
                ).length;
                return (
                  <li key={req.competencyId} className="flex items-center justify-between gap-stack px-stack-lg py-stack">
                    <div className="flex-1 min-w-0 flex flex-col gap-stack-3xs">
                      <p className="text-body font-semibold text-ink-900">{req.competencyName}</p>
                      <p className="text-caption text-ink-600 tabular-nums">
                        {membersAtLevel}/{collaborateurs.length} membres au niveau requis
                      </p>
                    </div>
                    <div className="flex items-center gap-stack-xs shrink-0">
                      <MetaPill text={`D${req.dreyfusLevelRequired}+ requis`} tone={DREYFUS_VARIANT(req.dreyfusLevelRequired)} />
                      {membersAtLevel < req.count && (
                        <Badge variant="danger">Insuffisant</Badge>
                      )}
                    </div>
                  </li>
                );
              })}
            </ul>
          </Card>
        </section>
      )}
    </PageShell>
  );
};

export default ProjectTeam;
