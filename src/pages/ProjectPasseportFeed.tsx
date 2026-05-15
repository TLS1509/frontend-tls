import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, TrendingUp, Award, Target, Users } from 'lucide-react';
import { Button } from '../components/core/Button';
import { Badge } from '../components/ui/Badge';
import { EditorialHero } from '../components/patterns/EditorialHero';
import { SectionCard } from '../components/patterns/SectionCard';
import { StatCard } from '../components/ui/StatCard';
import { Avatar } from '../components/ui/Avatar';
import { useProjectsStore } from '../stores/persistence';

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
  const teamMembers = projectId ? store.getTeamMembers(projectId) : [];

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

  const uniqueCompetencies = [...new Set(enrichments.map((e) => e.competencyName))];
  const totalGain = enrichments.reduce((sum, e) => sum + (e.newDreyfusLevel - e.oldDreyfusLevel), 0);

  const formatDate = (iso: string) =>
    new Date(iso).toLocaleDateString('fr-FR', { day: 'numeric', month: 'short', year: 'numeric' });

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-10 py-section flex flex-col gap-section">
      <div>
        <Button variant="ghost" size="sm" leadingIcon={<ArrowLeft size={14} />} onClick={() => navigate(`/project/${projectId}`)}>
          Retour au projet
        </Button>
      </div>

      <EditorialHero
        eyebrow={{ label: 'Projet · Passeport' }}
        title="Feed Passeport Compétences"
        summary="Enrichissements Dreyfus générés par le projet — progressions validées par les experts."
        tone="brand"
      />

      <div className="grid grid-cols-2 md:grid-cols-4 gap-stack-xs">
        <StatCard label="Enrichissements" value={enrichments.length} icon={<TrendingUp size={20} />} variant="brand" />
        <StatCard label="Compétences enrichies" value={uniqueCompetencies.length} icon={<Target size={20} />} variant="warm" />
        <StatCard label="Collaborateurs enrichis" value={collaboratorMap.size} icon={<Users size={20} />} variant="default" />
        <StatCard label="Niveaux Dreyfus gagnés" value={totalGain} icon={<Award size={20} />} variant="default" />
      </div>

      {enrichments.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-section gap-stack text-center">
          <TrendingUp size={40} className="text-ink-300" />
          <p className="text-body-sm text-ink-500 m-0">Aucun enrichissement Passeport pour ce projet.</p>
          <p className="text-caption text-ink-400 m-0">Les enrichissements apparaîtront quand des JAC seront validés.</p>
        </div>
      ) : (
        <>
          {/* Feed chronologique */}
          <SectionCard
            title="Enrichissements récents"
            titleIcon={<TrendingUp size={18} />}
            description={`${enrichments.length} progression(s) validée(s)`}
          >
            <div className="flex flex-col gap-stack-xs">
              {enrichments.map((e) => (
                <div key={e.id} className="flex items-center gap-stack p-4 rounded-lg bg-success-bg border border-success-base/20">
                  <Avatar initials={e.collaboratorInitials} size="md" tint="brand" />
                  <div className="flex-1 min-w-0">
                    <p className="text-body-sm font-semibold text-ink-900 m-0">
                      {e.collaboratorName} — {e.competencyName}
                    </p>
                    <p className="text-caption text-success-fg m-0">
                      D{e.oldDreyfusLevel} ({DREYFUS_LABELS[e.oldDreyfusLevel]}) → D{e.newDreyfusLevel} ({DREYFUS_LABELS[e.newDreyfusLevel]})
                      · validé par {e.verifiedByName} · {formatDate(e.verifiedAt)}
                    </p>
                    <p className="text-caption text-ink-500 m-0">{SOURCE_LABELS[e.sourceType] ?? e.sourceType}</p>
                  </div>
                  <Badge variant="success">+{e.newDreyfusLevel - e.oldDreyfusLevel}</Badge>
                </div>
              ))}
            </div>
          </SectionCard>

          {/* Synthèse par collaborateur */}
          {collaboratorMap.size > 0 && (
            <SectionCard
              title="Synthèse par collaborateur"
              titleIcon={<Users size={18} />}
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-stack-xs">
                {[...collaboratorMap.values()].map((c) => (
                  <div key={c.name} className="flex flex-col gap-stack-xs p-4 rounded-lg border border-ink-100 bg-ink-50">
                    <div className="flex items-center gap-3">
                      <Avatar initials={c.initials} size="md" tint="brand" />
                      <div>
                        <p className="text-body-sm font-semibold text-ink-900 m-0">{c.name}</p>
                        <p className="text-caption text-ink-500 m-0">{c.count} enrichissement(s)</p>
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {c.competencies.map((comp) => (
                        <Badge key={comp} variant="brand">{comp}</Badge>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </SectionCard>
          )}
        </>
      )}
    </div>
  );
};

export default ProjectPasseportFeed;
