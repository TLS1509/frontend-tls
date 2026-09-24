import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, AlertTriangle } from 'lucide-react';
import { Button } from '../components/core/Button';
import { Badge } from '../components/ui/Badge';
import { MetaPill } from '../components/ui/MetaPill';
import { Alert } from '../components/ui/Alert';
import { Card } from '../components/core/Card';
import { EditorialHero } from '../components/patterns/EditorialHero';
import { SectionHeader } from '../components/patterns/SectionHeader';
import { DataTable } from '../components/patterns/DataTable';
import { useProjectsStore } from '../stores/persistence';
import type { DreyfusLevel } from '../types/learning';
import { DREYFUS_LABELS } from '../data/competencies';
import { PageShell } from '../components/layout';

export const ProjectSkillGaps: React.FC = () => {
  const { id: projectId } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const store = useProjectsStore();

  const project = store.getProject(projectId ?? '');
  const teamMembers = projectId ? store.getTeamMembers(projectId) : [];
  const collaborateurs = teamMembers.filter((m) => m.role === 'collaborateur');

  if (!project) {
    return (
      <PageShell width="page">
        <Button emphasis="solid" leadingIcon={<ArrowLeft size={16} />} onClick={() => navigate(`/project/${projectId}`)} className="self-start">
          Retour au projet
        </Button>
      </PageShell>
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
    /* `PageShell` : le `Container` ajoutait sa gouttière à celle de la page.
       Le retour et l'en-tête forment un groupe (24). */
    <PageShell width="medium">
      <div className="flex flex-col gap-stack-lg">
        <div>
          <Button emphasis="ghost" tone="neutral" size="sm" leadingIcon={<ArrowLeft size={14} />} onClick={() => navigate(`/project/${projectId}`)}>
            Retour au projet
          </Button>
        </div>

        <EditorialHero
          eyebrow={{ label: 'Projet · Analyse' }}
          title="Lacunes de compétences"
          summary={`Comparaison entre les niveaux Dreyfus requis par le projet et les niveaux actuels de l'équipe.`}
          tone="flat"
        />
      </div>

      {/* L'alerte du système (elle était faite main). */}
      {criticalGaps.length > 0 && (
        <Alert variant="warning" icon={<AlertTriangle size={18} />}>
          {criticalGaps.length} compétence(s) insuffisamment couvertes : des recrutements ou formations sont recommandés avant le lancement.
        </Alert>
      )}

      {/* Gaps critiques — titre (h2 28) et explication sur la page ; les
          compétences en rangées dans une carte (elles étaient des boîtes
          teintées dans une carte). Le niveau requis est une donnée
          (MetaPill) ; le manque reste un Badge, c'est l'état qui alerte. */}
      {criticalGaps.length > 0 && (
        <section className="flex flex-col gap-stack">
          <SectionHeader
            title="Gaps critiques"
            subtitle="Compétences dont le nombre de membres qualifiés est inférieur au requis"
          />
          <Card className="p-0 overflow-hidden">
            <ul className="divide-y divide-ink-100">
              {criticalGaps.map((entry) => {
                const deficit = entry.requiredCount - entry.membersAtLevel.length;
                return (
                  <li key={entry.competencyId} className="flex flex-col gap-stack-xs px-stack-lg py-stack">
                    <div className="flex items-center justify-between gap-stack flex-wrap">
                      <p className="text-body font-semibold text-ink-900">{entry.competencyName}</p>
                      <div className="flex items-center gap-stack-xs">
                        <MetaPill text={`D${entry.required}+ requis (${DREYFUS_LABELS[entry.required]})`} tone="primary" />
                        <Badge variant="danger">−{deficit} membre(s)</Badge>
                      </div>
                    </div>
                    <p className="text-caption text-ink-600">
                      {entry.membersAtLevel.length}/{entry.requiredCount} membres au niveau requis
                      {entry.membersAtLevel.length > 0 && (
                        <> · Qualifiés : {entry.membersAtLevel.map((m) => `${m.name} (D${m.current})`).join(', ')}</>
                      )}
                    </p>
                  </li>
                );
              })}
            </ul>
          </Card>
        </section>
      )}

      {/* Compétences couvertes */}
      {coveredSkills.length > 0 && (
        <section className="flex flex-col gap-stack">
          <SectionHeader
            title="Compétences couvertes"
            subtitle="Compétences suffisamment couvertes par l'équipe actuelle"
          />
          <Card className="p-0 overflow-hidden">
            <ul className="divide-y divide-ink-100">
              {coveredSkills.map((entry) => (
                <li key={entry.competencyId} className="flex items-center justify-between gap-stack flex-wrap px-stack-lg py-stack">
                  <p className="text-body font-semibold text-ink-900">{entry.competencyName}</p>
                  <div className="flex items-center gap-stack-xs">
                    <MetaPill text={`D${entry.required}+ (${DREYFUS_LABELS[entry.required]})`} tone="primary" />
                    <MetaPill text={`${entry.membersAtLevel.length}/${entry.requiredCount} membres`} tone="success" className="tabular-nums" />
                  </div>
                </li>
              ))}
            </ul>
          </Card>
        </section>
      )}

      {/* Vue d'ensemble — le tableau porte son propre cadre : pas de carte
          autour. Les niveaux sont des données (MetaPill). */}
      <section className="flex flex-col gap-stack">
        <SectionHeader title="Vue d'ensemble par membre" />
        <DataTable
          columns={[
            { key: 'name', label: 'Membre', align: 'left' },
            ...project.skillProfile.map((req) => ({
              key: req.competencyId,
              label: `${req.competencyName} (D${req.dreyfusLevelRequired}+)`,
              align: 'center' as const,
            })),
          ]}
          rows={collaborateurs.map((m) => {
            const row: Record<string, React.ReactNode> = {
              name: <span className="font-semibold text-ink-900 whitespace-nowrap">{m.name}</span>,
            };
            project.skillProfile.forEach((req) => {
              const current = (m.currentDreyfusLevels[req.competencyId] ?? 1) as DreyfusLevel;
              const ok = current >= req.dreyfusLevelRequired;
              row[req.competencyId] = (
                <MetaPill text={`D${current} · ${DREYFUS_LABELS[current]}`} tone={ok ? 'success' : 'warm'} />
              );
            });
            return row;
          })}
          emptyMessage="Aucun collaborateur dans ce projet."
        />
      </section>
    </PageShell>
  );
};

export default ProjectSkillGaps;
