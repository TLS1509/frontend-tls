import React, { useMemo, useState } from 'react';
import { Target, Plus, CheckCircle2, Clock, ChevronRight, Trash2, Pencil, PlayCircle } from 'lucide-react';
import { EditorialHero } from '../components/patterns/EditorialHero';
import { SectionCard } from '../components/patterns/SectionCard';
import { Card } from '../components/core/Card';
import { Button } from '../components/core/Button';
import { Badge } from '../components/ui/Badge';
import { ProgressBar } from '../components/ui/ProgressBar';
import { EmptyState } from '../components/ui/EmptyState';
import { Modal } from '../components/ui/Modal';
import { Select } from '../components/core/Select';
import { Input } from '../components/core/Input';
import { FormGroup } from '../components/core/FormGroup';
import { usePasseportStore } from '../stores/persistence';
import { COMPETENCES, getCompetenceById, domainLabel } from '../data/competencies';
import { MOCK_USER_ID } from '../data/passeport';
import type { CompetencyObjective, DreyfusLevel } from '../types/learning';
import { Container } from '../components/layout';

type ModalState = null | { mode: 'create' } | { mode: 'edit'; id: string };

interface FormState {
  competenceId: string;
  targetLevel: DreyfusLevel;
  deadline: string;
  status: CompetencyObjective['status'];
}

const DREYFUS_OPTIONS: { value: string; label: string }[] = [
  { value: '2', label: 'D2 : Débutant avancé' },
  { value: '3', label: 'D3 : Compétent' },
  { value: '4', label: 'D4 : Performant' },
  { value: '5', label: 'D5 : Expert' },
];

const STATUS_OPTIONS: { value: string; label: string }[] = [
  { value: 'active', label: 'Actif (planifié)' },
  { value: 'draft', label: 'Brouillon (en attente)' },
];

const todayIso = () => new Date().toISOString();
const inSixMonthsDate = () => {
  const d = new Date();
  d.setMonth(d.getMonth() + 6);
  return d.toISOString().slice(0, 10);
};

const competencyOptions = COMPETENCES.map((c) => ({
  value: c.id,
  label: `${c.label} · ${domainLabel(c.domain)}`,
}));

export default function PasseportObjectifs() {
  const passeportStore = usePasseportStore();
  const objectives = passeportStore.getObjectives(MOCK_USER_ID);
  const competencies = passeportStore.getCompetencies(MOCK_USER_ID);

  const [selectedId, setSelectedId] = useState<string | null>(objectives[0]?.id ?? null);
  const [modalState, setModalState] = useState<ModalState>(null);
  const [form, setForm] = useState<FormState>({
    competenceId: COMPETENCES[0].id,
    targetLevel: 3,
    deadline: inSixMonthsDate(),
    status: 'active',
  });

  const activeGoals = objectives.filter((g) => g.status === 'active');
  const draftGoals = objectives.filter((g) => g.status === 'draft');
  const goal = objectives.find((g) => g.id === selectedId);

  const competenceLevelMap = useMemo(() => {
    const map = new Map<string, DreyfusLevel>();
    competencies.forEach((c) => map.set(c.competenceId, c.currentLevel));
    return map;
  }, [competencies]);

  const openCreate = () => {
    setForm({
      competenceId: COMPETENCES[0].id,
      targetLevel: 3,
      deadline: inSixMonthsDate(),
      status: 'active',
    });
    setModalState({ mode: 'create' });
  };

  const openEdit = (id: string) => {
    const existing = objectives.find((o) => o.id === id);
    if (!existing) return;
    setForm({
      competenceId: existing.competenceId,
      targetLevel: existing.targetLevel,
      deadline: existing.deadline.slice(0, 10),
      status: existing.status,
    });
    setModalState({ mode: 'edit', id });
  };

  const closeModal = () => setModalState(null);

  const handleSubmit = () => {
    if (!modalState) return;
    if (modalState.mode === 'create') {
      const startLevel = (competenceLevelMap.get(form.competenceId) ?? 1) as DreyfusLevel;
      const newObjective: CompetencyObjective = {
        id: `obj-${Date.now()}`,
        userId: MOCK_USER_ID,
        competenceId: form.competenceId,
        startLevel,
        targetLevel: form.targetLevel,
        status: form.status,
        deadline: form.deadline,
        progressPct: 0,
        milestones: [],
        createdAt: todayIso(),
      };
      passeportStore.setObjective(newObjective);
      setSelectedId(newObjective.id);
    } else {
      const existing = objectives.find((o) => o.id === modalState.id);
      if (!existing) return;
      passeportStore.setObjective({
        ...existing,
        competenceId: form.competenceId,
        targetLevel: form.targetLevel,
        deadline: form.deadline,
        status: form.status,
      });
    }
    closeModal();
  };

  const handleDelete = (id: string) => {
    passeportStore.deleteObjective(MOCK_USER_ID, id);
    if (selectedId === id) setSelectedId(null);
  };

  const handlePlan = (g: CompetencyObjective) => {
    passeportStore.setObjective({ ...g, status: 'active' });
  };

  return (
    <div className="flex flex-col gap-section">
      <EditorialHero
        eyebrow="Passeport · Objectifs"
        title="Mes Objectifs de Progression"
        summary="Définis des objectifs Dreyfus mesurables et suis leur avancement. Chaque objectif génère un plan d'action personnalisé."
        tone="flat"
        trailing={
          <Button variant="glass" size="md" leadingIcon={<Plus size={16} />} onClick={openCreate}>
            Nouvel objectif
          </Button>
        }
      />

      <Container width="wide" padding={false} className="px-stack md:px-section flex flex-col gap-section">

        {/* Summary row */}
        <div className="grid grid-cols-3 gap-stack">
          <Card variant="tinted" tone="primary" className="flex flex-col items-center justify-center py-stack-lg gap-tight">
            <span className="text-h2 font-display font-bold text-primary-700">{activeGoals.length}</span>
            <span className="text-caption text-ink-500 text-center">Objectifs actifs</span>
          </Card>
          <Card variant="tinted" tone="primary" className="flex flex-col items-center justify-center py-stack-lg gap-tight">
            <span className="text-h2 font-display font-bold text-primary-700">
              {Math.round(activeGoals.reduce((acc, g) => acc + g.progressPct, 0) / Math.max(activeGoals.length, 1))}%
            </span>
            <span className="text-caption text-ink-500 text-center">Progression moy.</span>
          </Card>
          <Card variant="tinted" tone="primary" className="flex flex-col items-center justify-center py-stack-lg gap-tight">
            <span className="text-h2 font-display font-bold text-primary-700">{draftGoals.length}</span>
            <span className="text-caption text-ink-500 text-center">En attente</span>
          </Card>
        </div>

        {/* Active goals */}
        <SectionCard
          title="Objectifs actifs"
          titleIcon={<Target size={18} />}
          actions={
            <Button variant="ghost" size="sm" leadingIcon={<Plus size={14} />} onClick={openCreate}>
              Ajouter
            </Button>
          }
        >
          {activeGoals.length === 0 ? (
            <EmptyState
              icon={<Target size={32} />}
              title="Aucun objectif actif"
              description="Définis ton premier objectif de progression Dreyfus."
              actions={<Button variant="primary" size="md" onClick={openCreate}>Créer un objectif</Button>}
            />
          ) : (
            <div className="flex flex-col gap-stack-xs">
              {activeGoals.map((g) => {
                const comp = getCompetenceById(g.competenceId);
                const isSelected = g.id === selectedId;
                return (
                  <div
                    key={g.id}
                    className={[
                      'w-full p-stack rounded-xl border transition-all duration-base',
                      isSelected
                        ? 'bg-primary-50 border-primary-200 shadow-sm'
                        : 'bg-white border-ink-100 hover:border-ink-200',
                    ].join(' ')}
                  >
                    <button
                      type="button"
                      onClick={() => setSelectedId(isSelected ? null : g.id)}
                      className="w-full text-left bg-transparent border-0 p-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500 rounded-lg"
                    >
                      <div className="flex items-start justify-between gap-stack-xs mb-3">
                        <div className="flex flex-col gap-tight">
                          <span className="text-body-sm font-semibold text-ink-900">
                            {comp?.label ?? g.competenceId}
                          </span>
                          <span className="inline-flex items-center gap-tight text-caption text-primary-700 bg-primary-50 px-2 py-0.5 rounded-pill w-fit font-medium">
                            {comp ? domainLabel(comp.domain) : g.competenceId}
                          </span>
                        </div>
                        <div className="flex items-center gap-stack-xs shrink-0">
                          <Badge variant="neutral" size="sm">D{g.startLevel}→D{g.targetLevel}</Badge>
                          <span className="text-caption text-ink-400 flex items-center gap-tight">
                            <Clock size={11} />
                            {new Date(g.deadline).toLocaleDateString('fr-FR', { month: 'short', year: 'numeric' })}
                          </span>
                        </div>
                      </div>
                      <ProgressBar value={g.progressPct} fill="brand" size="sm" showLabel />
                    </button>
                    <div className="mt-stack flex items-center justify-end gap-stack-xs">
                      <Button
                        variant="ghost"
                        size="sm"
                        leadingIcon={<Pencil size={14} />}
                        onClick={(e) => {
                          e.stopPropagation();
                          openEdit(g.id);
                        }}
                      >
                        Modifier
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        leadingIcon={<Trash2 size={14} />}
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDelete(g.id);
                        }}
                      >
                        Supprimer
                      </Button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </SectionCard>

        {/* Selected goal milestones */}
        {goal && goal.milestones.length > 0 && (
          <SectionCard
            title={`Jalons : ${getCompetenceById(goal.competenceId)?.label ?? goal.competenceId}`}
            titleIcon={<CheckCircle2 size={18} />}
          >
            <div className="flex flex-col gap-stack-xs">
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
            <div className="flex flex-col gap-stack-xs">
              {draftGoals.map((g) => {
                const comp = getCompetenceById(g.competenceId);
                return (
                  <Card key={g.id} variant="default" className="flex items-center justify-between px-stack py-3">
                    <div className="flex flex-col gap-tight">
                      <span className="text-body-sm font-medium text-ink-900">{comp?.label ?? g.competenceId}</span>
                      <span className="text-caption text-ink-400">{comp?.subdomain ?? (comp ? domainLabel(comp.domain) : '')} · D{g.startLevel}→D{g.targetLevel}</span>
                    </div>
                    <div className="flex items-center gap-stack-xs">
                      <Button
                        variant="ghost"
                        size="sm"
                        leadingIcon={<PlayCircle size={14} />}
                        onClick={() => handlePlan(g)}
                      >
                        Planifier
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        leadingIcon={<Pencil size={14} />}
                        onClick={() => openEdit(g.id)}
                      >
                        Modifier
                      </Button>
                      <button
                        type="button"
                        onClick={() => handleDelete(g.id)}
                        aria-label="Supprimer"
                        className="min-h-touch inline-flex items-center justify-center px-2 text-ink-300 hover:text-danger-fg transition-colors duration-fast focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-danger-base rounded-sm"
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

      </Container>

      {/* Create / Edit modal */}
      <Modal
        open={modalState !== null}
        onClose={closeModal}
        title={modalState?.mode === 'edit' ? "Modifier l'objectif" : 'Nouvel objectif de progression'}
        description="Définis une compétence cible, le niveau Dreyfus visé et une échéance."
        actions={
          <div className="flex items-center justify-end gap-stack-xs w-full">
            <Button variant="ghost" size="md" onClick={closeModal}>Annuler</Button>
            <Button variant="primary" size="md" onClick={handleSubmit}>
              {modalState?.mode === 'edit' ? 'Enregistrer' : "Créer l'objectif"}
            </Button>
          </div>
        }
      >
        <div className="flex flex-col gap-stack">
          <FormGroup label="Compétence" required>
            <Select
              value={form.competenceId}
              onChange={(e) => setForm((f) => ({ ...f, competenceId: e.target.value }))}
              options={competencyOptions}
            />
          </FormGroup>

          <FormGroup label="Niveau Dreyfus cible" required>
            <Select
              value={String(form.targetLevel)}
              onChange={(e) => setForm((f) => ({ ...f, targetLevel: Number(e.target.value) as DreyfusLevel }))}
              options={DREYFUS_OPTIONS}
            />
          </FormGroup>

          <FormGroup label="Échéance" required hint="Format ISO : défaut +6 mois">
            <Input
              type="date"
              value={form.deadline}
              onChange={(e) => setForm((f) => ({ ...f, deadline: e.target.value }))}
            />
          </FormGroup>

          <FormGroup label="Statut">
            <Select
              value={form.status}
              onChange={(e) => setForm((f) => ({ ...f, status: e.target.value as CompetencyObjective['status'] }))}
              options={STATUS_OPTIONS}
            />
          </FormGroup>
        </div>
      </Modal>
    </div>
  );
}
