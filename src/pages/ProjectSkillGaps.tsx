import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, AlertTriangle, CheckCircle2, Target, BarChart2 } from 'lucide-react';
import { Button } from '../components/core/Button';
import { Badge } from '../components/ui/Badge';
import { EditorialHero } from '../components/patterns/EditorialHero';
import { SectionCard } from '../components/patterns/SectionCard';
import { StatCard } from '../components/ui/StatCard';
import { useProjectsStore } from '../stores/persistence';
import type { DreyfusLevel } from '../types/learning';
import { Container } from '../components/layout';

const DREYFUS_LABELS = ['', 'Novice', 'Apprenant', 'Compétent', 'Expert', 'Maître'] as const;

export const ProjectSkillGaps: React.FC = () => {
  const { id: projectId } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const store = useProjectsStore();

  const project = store.getProject(projectId ?? '');
  const teamMembers = projectId ? store.getTeamMembers(projectId) : [];
  const collaborateurs = teamMembers.filter((m) => m.role === 'collaborateur');

  if (!project) {
    return (
      <Container width="page" padding={false} className="px-stack py-section">
        <Button variant="ghost" leadingIcon={<ArrowLeft size={16} />} onClick={() => navigate(`/project/${projectId}`)}>
          Retour au projet
        </Button>
      </Container>
    );
  }

  // Compute gaps per required competency
  type GapEntry = {
    competencyId: string;
    competencyName: string;
    required: DreyfusLevel;
    requiredCount: number;
    membersAtLevel: { name: string; initials: string; current: DreyfusLevel }[];
    gap: boolean;
  };

  const gapEntries: GapEntry[] = project.skillProfile.map((req) => {
    const membersAtLevel = collaborateurs
      .map((m) => ({
        name: m.name,
        initials: m.initials,
        current: (m.currentDreyfusLevels[req.competencyId] ?? 1) as DreyfusLevel,
      }))
      .filter((m) => m.current >= req.dreyfusLevelRequired);

    return {
      competencyId: req.competencyId,
      competencyName: req.competencyName,
      required: req.dreyfusLevelRequired,
      requiredCount: req.count,
      membersAtLevel,
      gap: membersAtLevel.length < req.count,
    };
  });

  const criticalGaps = gapEntries.filter((e) => e.gap);
  const coveredSkills = gapEntries.filter((e) => !e.gap);

  return (
    <Container width="medium" className="py-section flex flex-col gap-section">
      <div>
        <Button variant="ghost" size="sm" leadingIcon={<ArrowLeft size={14} />} onClick={() => navigate(`/project/${projectId}`)}>
          Retour au projet
        </Button>
      </div>

      <EditorialHero
        eyebrow={{ label: 'Projet · Analyse' }}
        title="Lacunes de compétences"
        summary={`Comparaison entre les niveaux Dreyfus requis par le projet et les niveaux actuels de l'équipe.`}
        tone="brand"
      />

      <div className="grid grid-cols-2 md:grid-cols-3 gap-stack-xs">
        <StatCard label="Compétences requises" value={gapEntries.length} icon={<Target size={20} />} variant="brand" />
        <StatCard label="Gaps critiques" value={criticalGaps.length} icon={<AlertTriangle size={20} />} variant={criticalGaps.length > 0 ? 'warm' : 'default'} />
        <StatCard label="Couvertes" value={coveredSkills.length} icon={<CheckCircle2 size={20} />} variant="default" />
      </div>

      {criticalGaps.length > 0 && (
        <div className="flex items-start gap-3 p-stack rounded-xl bg-warning-bg border border-warning-base/30">
          <AlertTriangle size={16} className="text-warning-fg mt-0.5 shrink-0" />
          <p className="text-body-sm font-semibold text-warning-fg m-0">
            {criticalGaps.length} compétence(s) insuffisamment couvertes : des recrutements ou formations sont recommandés avant le lancement.
          </p>
        </div>
      )}

      {/* Gaps critiques */}
      {criticalGaps.length > 0 && (
        <SectionCard
          title="Gaps critiques"
          titleIcon={<AlertTriangle size={18} />}
          description="Compétences dont le nombre de membres qualifiés est inférieur au requis"
        >
          <div className="flex flex-col gap-stack-xs">
            {criticalGaps.map((entry) => {
              const deficit = entry.requiredCount - entry.membersAtLevel.length;
              return (
                <div key={entry.competencyId} className="p-stack rounded-lg border border-warning-base/30 bg-warning-bg flex flex-col gap-stack-xs">
                  <div className="flex items-center justify-between gap-stack flex-wrap">
                    <p className="text-body-sm font-semibold text-ink-900 m-0">{entry.competencyName}</p>
                    <div className="flex items-center gap-stack-xs">
                      <Badge variant="brand">D{entry.required}+ requis ({DREYFUS_LABELS[entry.required]})</Badge>
                      <Badge variant="danger">−{deficit} membre(s)</Badge>
                    </div>
                  </div>
                  <p className="text-caption text-ink-600 m-0">
                    {entry.membersAtLevel.length}/{entry.requiredCount} membres au niveau requis
                    {entry.membersAtLevel.length > 0 && (
                      <> · Qualifiés : {entry.membersAtLevel.map((m) => `${m.name} (D${m.current})`).join(', ')}</>
                    )}
                  </p>
                </div>
              );
            })}
          </div>
        </SectionCard>
      )}

      {/* Compétences couvertes */}
      {coveredSkills.length > 0 && (
        <SectionCard
          title="Compétences couvertes"
          titleIcon={<CheckCircle2 size={18} />}
          description="Compétences suffisamment couvertes par l'équipe actuelle"
        >
          <div className="flex flex-col gap-stack-xs">
            {coveredSkills.map((entry) => (
              <div key={entry.competencyId} className="p-3 rounded-lg border border-success-base/30 bg-success-bg flex items-center justify-between gap-stack flex-wrap">
                <p className="text-body-sm font-semibold text-ink-900 m-0">{entry.competencyName}</p>
                <div className="flex items-center gap-stack-xs">
                  <Badge variant="brand">D{entry.required}+ ({DREYFUS_LABELS[entry.required]})</Badge>
                  <Badge variant="success">{entry.membersAtLevel.length}/{entry.requiredCount} membres</Badge>
                </div>
              </div>
            ))}
          </div>
        </SectionCard>
      )}

      {/* Vue d'ensemble */}
      <SectionCard title="Vue d'ensemble par membre" titleIcon={<BarChart2 size={18} />}>
        <div className="overflow-x-auto">
          <table className="w-full text-caption">
            <thead>
              <tr className="border-b border-ink-100">
                <th className="text-left font-semibold text-ink-600 pb-2 pr-4">Membre</th>
                {project.skillProfile.map((req) => (
                  <th key={req.competencyId} className="text-center font-semibold text-ink-600 pb-2 px-2 min-w-[100px]">
                    {req.competencyName}
                    <br />
                    <span className="text-ink-400 font-normal">D{req.dreyfusLevelRequired}+ requis</span>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {collaborateurs.map((m) => (
                <tr key={m.userId} className="border-b border-ink-50 last:border-0">
                  <td className="py-stack-xs pr-4 font-semibold text-ink-800 whitespace-nowrap">{m.name}</td>
                  {project.skillProfile.map((req) => {
                    const current = (m.currentDreyfusLevels[req.competencyId] ?? 1) as DreyfusLevel;
                    const ok = current >= req.dreyfusLevelRequired;
                    return (
                      <td key={req.competencyId} className="py-stack-xs px-2 text-center">
                        <span className={`px-2 py-0.5 rounded-pill text-caption font-semibold ${
                          ok ? 'bg-success-bg text-success-fg' : 'bg-warning-bg text-warning-fg'
                        }`}>
                          D{current}
                        </span>
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </SectionCard>
    </Container>
  );
};

export default ProjectSkillGaps;
