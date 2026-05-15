import React, { useState } from 'react';
import { Target, Plus, CheckCircle2, Clock, ChevronRight, Trash2 } from 'lucide-react';
import { EditorialHero } from '../components/patterns/EditorialHero';
import { SectionCard } from '../components/patterns/SectionCard';
import { Card } from '../components/core/Card';
import { Button } from '../components/core/Button';
import { Badge } from '../components/ui/Badge';
import { ProgressBar } from '../components/ui/ProgressBar';
import { EmptyState } from '../components/ui/EmptyState';
import { usePasseportStore } from '../stores/persistence';
import { getCompetenceById } from '../data/competencies';
import { MOCK_USER_ID } from '../data/passeport';

// ─── Component ────────────────────────────────────────────────────────────────

export default function PasseportObjectifs() {
  const passeportStore = usePasseportStore();
  const objectives = passeportStore.getObjectives(MOCK_USER_ID);
  const [selectedId, setSelectedId] = useState<string | null>(objectives[0]?.id ?? null);

  const activeGoals = objectives.filter((g) => g.status === 'active');
  const draftGoals = objectives.filter((g) => g.status === 'draft');
  const goal = objectives.find((g) => g.id === selectedId);

  return (
    <div className="flex flex-col gap-section">
      <EditorialHero
        eyebrow="Passeport · Objectifs"
        title="Mes Objectifs de Progression"
        summary="Définis des objectifs Dreyfus mesurables et suis leur avancement. Chaque objectif génère un plan d'action personnalisé."
        tone="default"
        trailing={
          <Button variant="glass" size="md" leadingIcon={<Plus size={16} />}>
            Nouvel objectif
          </Button>
        }
      />

      <div className="max-w-wide mx-auto w-full px-4 md:px-8 flex flex-col gap-section">

        {/* Summary row */}
        <div className="grid grid-cols-3 gap-stack">
          <Card variant="tinted" tone="primary" className="flex flex-col items-center justify-center py-6 gap-tight">
            <span className="text-h2 font-display font-bold text-primary-700">{activeGoals.length}</span>
            <span className="text-caption text-ink-500 text-center">Objectifs actifs</span>
          </Card>
          <Card variant="tinted" tone="primary" className="flex flex-col items-center justify-center py-6 gap-tight">
            <span className="text-h2 font-display font-bold text-primary-700">
              {Math.round(activeGoals.reduce((acc, g) => acc + g.progressPct, 0) / Math.max(activeGoals.length, 1))}%
            </span>
            <span className="text-caption text-ink-500 text-center">Progression moy.</span>
          </Card>
          <Card variant="tinted" tone="primary" className="flex flex-col items-center justify-center py-6 gap-tight">
            <span className="text-h2 font-display font-bold text-primary-700">{draftGoals.length}</span>
            <span className="text-caption text-ink-500 text-center">En attente</span>
          </Card>
        </div>

        {/* Active goals */}
        <SectionCard
          title="Objectifs actifs"
          titleIcon={<Target size={18} />}
          actions={
            <Button variant="ghost" size="sm" leadingIcon={<Plus size={14} />}>
              Ajouter
            </Button>
          }
        >
          {activeGoals.length === 0 ? (
            <EmptyState
              icon={<Target size={32} />}
              title="Aucun objectif actif"
              description="Définis ton premier objectif de progression Dreyfus."
              actions={<Button variant="primary" size="md">Créer un objectif</Button>}
            />
          ) : (
            <div className="flex flex-col gap-3">
              {activeGoals.map((g) => {
                const comp = getCompetenceById(g.competenceId);
                return (
                  <button
                    key={g.id}
                    type="button"
                    onClick={() => setSelectedId(g.id === selectedId ? null : g.id)}
                    className={[
                      'w-full text-left p-4 rounded-xl border transition-all duration-base',
                      g.id === selectedId
                        ? 'bg-primary-50 border-primary-200 shadow-sm'
                        : 'bg-white border-ink-100 hover:border-ink-200',
                    ].join(' ')}
                  >
                    <div className="flex items-start justify-between gap-3 mb-3">
                      <div className="flex flex-col gap-tight">
                        <span className="text-body-sm font-semibold text-ink-900">
                          {comp?.label ?? g.competenceId}
                        </span>
                        <span className="inline-flex items-center gap-1 text-caption text-primary-700 bg-primary-50 px-2 py-0.5 rounded-pill w-fit font-medium">
                          {comp?.domain ?? g.competenceId}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 shrink-0">
                        <Badge variant="neutral" size="sm">D{g.startLevel}→D{g.targetLevel}</Badge>
                        <span className="text-caption text-ink-400 flex items-center gap-1">
                          <Clock size={11} />
                          {new Date(g.deadline).toLocaleDateString('fr-FR', { month: 'short', year: 'numeric' })}
                        </span>
                      </div>
                    </div>
                    <ProgressBar value={g.progressPct} fill="brand" size="sm" showLabel />
                  </button>
                );
              })}
            </div>
          )}
        </SectionCard>

        {/* Selected goal milestones */}
        {goal && goal.milestones.length > 0 && (
          <SectionCard
            title={`Jalons — ${getCompetenceById(goal.competenceId)?.label ?? goal.competenceId}`}
            titleIcon={<CheckCircle2 size={18} />}
          >
            <div className="flex flex-col gap-2">
              {goal.milestones.map((m, idx) => (
                <div
                  key={m.id}
                  className={[
                    'flex items-center gap-stack p-3 rounded-lg border',
                    m.done ? 'bg-success-bg border-success-border' : 'bg-white border-ink-100',
                  ].join(' ')}
                >
                  <span className={[
                    'inline-flex items-center justify-center w-6 h-6 rounded-full text-micro font-bold shrink-0',
                    m.done ? 'bg-success-base text-white' : 'bg-ink-100 text-ink-400',
                  ].join(' ')}>
                    {m.done ? '✓' : idx + 1}
                  </span>
                  <span className={['text-body-sm', m.done ? 'text-success-fg line-through' : 'text-ink-800'].join(' ')}>
                    {m.label}
                  </span>
                </div>
              ))}
            </div>
            <div className="mt-stack">
              <Button variant="primary" size="md" leadingIcon={<ChevronRight size={16} />}>
                Voir le plan d'action complet
              </Button>
            </div>
          </SectionCard>
        )}

        {/* Draft goals */}
        {draftGoals.length > 0 && (
          <SectionCard title="En attente de planification" titleIcon={<Clock size={18} />}>
            <div className="flex flex-col gap-2">
              {draftGoals.map((g) => {
                const comp = getCompetenceById(g.competenceId);
                return (
                  <Card key={g.id} variant="default" className="flex items-center justify-between px-4 py-3">
                    <div className="flex flex-col gap-tight">
                      <span className="text-body-sm font-medium text-ink-900">{comp?.label ?? g.competenceId}</span>
                      <span className="text-caption text-ink-400">{comp?.subdomain ?? comp?.domain} · D{g.startLevel}→D{g.targetLevel}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button variant="ghost" size="sm">Planifier</Button>
                      <button
                        type="button"
                        onClick={() => passeportStore.deleteObjective(MOCK_USER_ID, g.id)}
                        className="min-h-touch inline-flex items-center justify-center px-2 text-ink-300 hover:text-danger-fg transition-colors duration-fast"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </Card>
                );
              })}
            </div>
          </SectionCard>
        )}

      </div>
    </div>
  );
}
