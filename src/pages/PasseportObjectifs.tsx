import React, { useState } from 'react';
import { Target, Plus, CheckCircle2, Clock, ChevronRight, Trash2 } from 'lucide-react';
import { EditorialHero } from '../components/patterns/EditorialHero';
import { SectionCard } from '../components/patterns/SectionCard';
import { SectionHeader } from '../components/patterns/SectionHeader';
import { Card } from '../components/core/Card';
import { Button } from '../components/core/Button';
import { Badge } from '../components/ui/Badge';
import { GoalProgress } from '../components/ui/GoalProgress';
import { ProgressBar } from '../components/ui/ProgressBar';
import { Stepper } from '../components/ui/Stepper';
import { EmptyState } from '../components/ui/EmptyState';

// ─── Mock data ────────────────────────────────────────────────────────────────

const GOALS = [
  {
    id: 1,
    label: 'Atteindre Dreyfus 5 en Leadership',
    competence: 'Leadership',
    current: 3,
    target: 5,
    deadline: '2026-12-01',
    progress: 60,
    status: 'active' as const,
    milestones: [
      { id: 'a', label: 'Valider D3 (Compétent)', done: true },
      { id: 'b', label: 'Compléter le parcours Leadership avancé', done: false },
      { id: 'c', label: 'Session coaching + évaluation 360°', done: false },
      { id: 'd', label: 'Valider D4 (Performant)', done: false },
    ],
  },
  {
    id: 2,
    label: 'Valider Analyse & Décision D4',
    competence: 'Analyse',
    current: 2,
    target: 4,
    deadline: '2026-09-01',
    progress: 25,
    status: 'active' as const,
    milestones: [
      { id: 'a', label: 'Compléter les 3 modules Analyse', done: false },
      { id: 'b', label: 'Exercice pratique : cas décisionnel', done: false },
      { id: 'c', label: 'Valider D3', done: false },
    ],
  },
  {
    id: 3,
    label: 'Améliorer Créativité & Innovation',
    competence: 'Créativité',
    current: 1,
    target: 3,
    deadline: '2027-01-01',
    progress: 10,
    status: 'draft' as const,
    milestones: [],
  },
];

const COMPETENCES_AVAILABLE = [
  'Leadership & Management',
  'Communication & Influence',
  'Analyse & Décision',
  'Tech & Outils numériques',
  'Créativité & Innovation',
  'Coopération & Équipe',
];

// ─── Component ────────────────────────────────────────────────────────────────

export default function PasseportObjectifs() {
  const [selectedGoal, setSelectedGoal] = useState<number | null>(1);

  const activeGoals = GOALS.filter((g) => g.status === 'active');
  const draftGoals = GOALS.filter((g) => g.status === 'draft');
  const goal = GOALS.find((g) => g.id === selectedGoal);

  return (
    <div className="flex flex-col gap-section">
      <EditorialHero
        eyebrow="Passeport · Objectifs"
        title="Mes Objectifs de Progression"
        subtitle="Définis des objectifs Dreyfus mesurables et suis leur avancement. Chaque objectif génère un plan d'action personnalisé."
        tone="primary"
        actions={
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
              {Math.round(activeGoals.reduce((acc, g) => acc + g.progress, 0) / Math.max(activeGoals.length, 1))}%
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
          icon={<Target size={18} />}
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
              action={<Button variant="primary" size="md">Créer un objectif</Button>}
            />
          ) : (
            <div className="flex flex-col gap-3">
              {activeGoals.map((g) => (
                <button
                  key={g.id}
                  type="button"
                  onClick={() => setSelectedGoal(g.id === selectedGoal ? null : g.id)}
                  className={[
                    'w-full text-left p-4 rounded-xl border transition-all duration-base',
                    g.id === selectedGoal
                      ? 'bg-primary-50 border-primary-200 shadow-sm'
                      : 'bg-white border-ink-100 hover:border-ink-200',
                  ].join(' ')}
                >
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <div className="flex flex-col gap-tight">
                      <span className="text-body-sm font-semibold text-ink-900">{g.label}</span>
                      <span className="inline-flex items-center gap-1 text-caption text-primary-700 bg-primary-50 px-2 py-0.5 rounded-pill w-fit font-medium">
                        {g.competence}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      <Badge variant="neutral" size="sm">D{g.current}→D{g.target}</Badge>
                      <span className="text-caption text-ink-400 flex items-center gap-1">
                        <Clock size={11} />
                        {new Date(g.deadline).toLocaleDateString('fr-FR', { month: 'short', year: 'numeric' })}
                      </span>
                    </div>
                  </div>
                  <ProgressBar value={g.progress} tone="primary" size="sm" showLabel />
                </button>
              ))}
            </div>
          )}
        </SectionCard>

        {/* Selected goal milestones */}
        {goal && goal.milestones.length > 0 && (
          <SectionCard
            title={`Jalons — ${goal.label}`}
            icon={<CheckCircle2 size={18} />}
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
          <SectionCard title="En attente de planification" icon={<Clock size={18} />}>
            <div className="flex flex-col gap-2">
              {draftGoals.map((g) => (
                <Card key={g.id} variant="default" className="flex items-center justify-between px-4 py-3">
                  <div className="flex flex-col gap-tight">
                    <span className="text-body-sm font-medium text-ink-900">{g.label}</span>
                    <span className="text-caption text-ink-400">{g.competence} · D{g.current}→D{g.target}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button variant="ghost" size="sm">Planifier</Button>
                    <button className="text-ink-300 hover:text-danger-fg transition-colors duration-fast">
                      <Trash2 size={14} />
                    </button>
                  </div>
                </Card>
              ))}
            </div>
          </SectionCard>
        )}

      </div>
    </div>
  );
}
