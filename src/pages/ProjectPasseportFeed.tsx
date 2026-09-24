import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, TrendingUp } from 'lucide-react';
import { Button } from '../components/core/Button';
import { MetaPill } from '../components/ui/MetaPill';
import { Card } from '../components/core/Card';
import { EmptyState } from '../components/ui/EmptyState';
import { EditorialHero } from '../components/patterns/EditorialHero';
import { SectionHeader } from '../components/patterns/SectionHeader';
import { Avatar } from '../components/ui/Avatar';
import { useProjectsStore } from '../stores/persistence';
import { PageShell } from '../components/layout';

const DREYFUS_LABELS = ['', 'Novice', 'Apprenant', 'Compétent', 'Expert', 'Maître'] as const;

const SOURCE_LABELS: Record<string, string> = {
  project_task: 'Tâche projet',
  jac: 'JAC',
  manual: 'Manuel',
};

export const ProjectPasseportFeed: React.FC = () => {
  const { id: projectId } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const store = useProjectsStore();

  const enrichments = projectId ? store.getEnrichments(projectId) : [];

  // Aggregate per collaborator
  const collaboratorMap = new Map<string, { name: string; initials: string; count: number; competencies: string[] }>();
  enrichments.forEach((e) => {
    const existing = collaboratorMap.get(e.collaboratorId);
    if (existing) {
      existing.count += 1;
      if (!existing.competencies.includes(e.competencyName)) {
        existing.competencies.push(e.competencyName);
      }
    } else {
      collaboratorMap.set(e.collaboratorId, {
        name: e.collaboratorName,
        initials: e.collaboratorInitials,
        count: 1,
        competencies: [e.competencyName],
      });
    }
  });

  const formatDate = (iso: string) =>
    new Date(iso).toLocaleDateString('fr-FR', { day: 'numeric', month: 'short', year: 'numeric' });

  return (
    /* `PageShell` : le `Container` ajoutait sa propre gouttière à celle de la
       page. Le retour et l'en-tête forment un groupe (24). */
    <PageShell width="medium">
      <div className="flex flex-col gap-stack-lg">
        <div>
          <Button emphasis="outline" size="sm" leadingIcon={<ArrowLeft size={14} />} onClick={() => navigate(`/project/${projectId}`)}>
            Retour au projet
          </Button>
        </div>

        <EditorialHero
          eyebrow={{ label: 'Projet · Passeport' }}
          title="Feed Passeport Compétences"
          summary="Enrichissements Dreyfus générés par le projet : progressions validées par les experts."
          tone="flat"
        />
      </div>

      {enrichments.length === 0 ? (
        <EmptyState
          icon={<TrendingUp size={32} />}
          title="Aucun enrichissement Passeport pour ce projet."
          description="Les enrichissements apparaîtront quand des JAC seront validés."
        />
      ) : (
        <>
          {/* Feed chronologique — titre (h2 28) sur la page, le compte en méta ;
              les progressions en rangées dans une carte (elles étaient des
              boîtes vertes dans une carte). La source est une méta (ink-600,
              elle était en ink-500 à 4,32:1) ; l'écart de niveau une donnée. */}
          <section className="flex flex-col gap-stack">
            <SectionHeader
              title="Enrichissements récents"
              meta={`${enrichments.length} progression(s) validée(s)`}
            />
            <Card className="p-0 overflow-hidden">
              <ul className="divide-y divide-ink-100">
                {enrichments.map((e) => (
                  <li key={e.id} className="flex items-center gap-stack px-stack-lg py-stack">
                    <Avatar initials={e.collaboratorInitials} size="md" tint="brand" />
                    <div className="flex-1 min-w-0 flex flex-col gap-stack-3xs">
                      <p className="text-body font-semibold text-ink-900">
                        {e.collaboratorName} : {e.competencyName}
                      </p>
                      <p className="text-caption text-success-fg">
                        D{e.oldDreyfusLevel} ({DREYFUS_LABELS[e.oldDreyfusLevel]}) → D{e.newDreyfusLevel} ({DREYFUS_LABELS[e.newDreyfusLevel]})
                        · validé par {e.verifiedByName} · {formatDate(e.verifiedAt)}
                      </p>
                      <p className="text-caption text-ink-600">{SOURCE_LABELS[e.sourceType] ?? e.sourceType}</p>
                    </div>
                    <MetaPill text={`+${e.newDreyfusLevel - e.oldDreyfusLevel}`} tone="success" className="shrink-0 tabular-nums" />
                  </li>
                ))}
              </ul>
            </Card>
          </section>

          {/* Synthèse par collaborateur — des cartes d'objets autonomes, sans
              carte autour ; les compétences sont des données (MetaPill). */}
          {collaboratorMap.size > 0 && (
            <section className="flex flex-col gap-stack">
              <SectionHeader title="Synthèse par collaborateur" />
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-stack">
                {[...collaboratorMap.values()].map((c) => (
                  <Card key={c.name} size="sm" className="flex flex-col gap-stack-sm">
                    <div className="flex items-center gap-stack-sm">
                      <Avatar initials={c.initials} size="md" tint="brand" />
                      <div className="flex flex-col gap-stack-3xs">
                        <p className="text-body font-semibold text-ink-900">{c.name}</p>
                        <p className="text-caption text-ink-600">{c.count} enrichissement(s)</p>
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-stack-2xs">
                      {c.competencies.map((comp) => (
                        <MetaPill key={comp} text={comp} tone="primary" />
                      ))}
                    </div>
                  </Card>
                ))}
              </div>
            </section>
          )}
        </>
      )}
    </PageShell>
  );
};

export default ProjectPasseportFeed;
