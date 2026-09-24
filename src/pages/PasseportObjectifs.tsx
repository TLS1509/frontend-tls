import React, { useMemo, useState } from 'react';
import { Target, Plus, Clock, ChevronRight, Trash2, Pencil, PlayCircle } from 'lucide-react';
import { EditorialHero } from '../components/patterns/EditorialHero';
import { SectionHeader } from '../components/patterns/SectionHeader';
import { Card } from '../components/core/Card';
import { Button } from '../components/core/Button';
import { MetaPill } from '../components/ui/MetaPill';
import { StatCard } from '../components/ui/StatCard';
import { ProgressBar } from '../components/ui/ProgressBar';
import { EmptyState } from '../components/ui/EmptyState';
import { Modal } from '../components/ui/Modal';
import { Select } from '../components/core/Select';
import { Input } from '../components/core/Input';
import { FormGroup } from '../components/core/FormGroup';
import { usePasseportStore } from '../stores/persistence';
import { COMPETENCES, getCompetenceById, domainLabel, competencyLevel } from '../data/competencies';
import { MOCK_USER_ID } from '../data/passeport';
import type { CompetencyObjective, DreyfusLevel } from '../types/learning';
import { PageShell } from '../components/layout';

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
    competencies.forEach((c) => map.set(c.competenceId, competencyLevel(c)));
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
    /* Un seul conteneur : l'en-tête collait au haut de l'écran et le corps
       partait 32 px plus à droite que le titre (`px-section`). */
    <PageShell width="wide">
      <EditorialHero
        eyebrow="Passeport · Objectifs"
        title="Mes Objectifs de Progression"
        summary="Définis des objectifs Dreyfus mesurables et suis leur avancement. Chaque objectif génère un plan d'action personnalisé."
        tone="flat"
        /* L'action principale de la page (arbitrage n°19) : le seul aplat. */
        trailing={
          <Button emphasis="solid" size="md" leadingIcon={<Plus size={16} />} onClick={openCreate}>
            Nouvel objectif
          </Button>
        }
      />

      {/* Chiffres : `StatCard`, calés à gauche comme le reste de la page. Les
          tuiles faites main centraient la valeur au-dessus d'un libellé
          ink-500 (la couleur des seuls placeholders). */}
      <div className="grid grid-cols-3 gap-stack">
        <StatCard label="Objectifs actifs" value={activeGoals.length} variant="brand" size="sm" />
        <StatCard
          label="Progression moy."
          value={`${Math.round(activeGoals.reduce((acc, g) => acc + g.progressPct, 0) / Math.max(activeGoals.length, 1))}%`}
          variant="brand"
          size="sm"
        />
        <StatCard label="En attente" value={draftGoals.length} variant="brand" size="sm" />
      </div>

      {/* Objectifs actifs — le titre de section (h2 28) sur la page, l'action
          qui ajoute à la liste à côté de lui ; les objectifs en rangées dans
          une carte, plus en boîtes dans une carte. */}
      <section className="flex flex-col gap-stack">
        {/* « Ajouter » double « Nouvel objectif » (l'aplat de l'en-tête) : un
            raccourci discret, `ghost`. */}
        <SectionHeader
          title="Objectifs actifs"
          action={
            <Button emphasis="ghost" size="sm" leadingIcon={<Plus size={14} />} onClick={openCreate}>
              Ajouter
            </Button>
          }
        />
        {activeGoals.length === 0 ? (
          <EmptyState
            icon={<Target size={32} />}
            title="Aucun objectif actif"
            description="Définis ton premier objectif de progression Dreyfus."
            actions={<Button emphasis="soft" size="md" onClick={openCreate}>Créer un objectif</Button>}
          />
        ) : (
          <Card className="p-0 overflow-hidden">
            <ul className="divide-y divide-ink-100">
              {activeGoals.map((g) => {
                const comp = getCompetenceById(g.competenceId);
                const isSelected = g.id === selectedId;
                return (
                  <li
                    key={g.id}
                    className={[
                      'flex flex-col gap-stack px-stack-lg py-stack-md transition-colors duration-base',
                      isSelected ? 'bg-primary-50' : 'bg-white',
                    ].join(' ')}
                  >
                    <button
                      type="button"
                      aria-expanded={isSelected}
                      onClick={() => setSelectedId(isSelected ? null : g.id)}
                      className="w-full text-left bg-transparent border-0 p-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500 rounded-lg flex flex-col gap-stack-sm"
                    >
                      <div className="flex items-start justify-between gap-stack">
                        <div className="flex flex-col items-start gap-stack-3xs min-w-0">
                          <span className="text-body font-semibold text-ink-900">
                            {comp?.label ?? g.competenceId}
                          </span>
                          <MetaPill text={comp ? domainLabel(comp.domain) : g.competenceId} tone="primary" />
                        </div>
                        {/* Le trajet de niveau et l'échéance sont des données : légende,
                            chiffres tabulaires. Le trajet était un Badge. */}
                        <div className="flex flex-col items-end gap-stack-3xs shrink-0 text-caption text-ink-600 tabular-nums">
                          <span className="font-semibold text-ink-900">D{g.startLevel} → D{g.targetLevel}</span>
                          <span className="flex items-center gap-stack-3xs">
                            <Clock size={14} aria-hidden="true" />
                            {new Date(g.deadline).toLocaleDateString('fr-FR', { month: 'short', year: 'numeric' })}
                          </span>
                        </div>
                      </div>
                      <ProgressBar value={g.progressPct} fill="brand" size="sm" showLabel />
                    </button>
                    {/* Deux outils de la rangée : `ghost` (n°19). Supprimer
                        prend le ton `danger` : il avait le poids de Modifier. */}
                    <div className="flex items-center justify-end gap-stack-xs">
                      <Button
                        emphasis="ghost"
                        tone="neutral"
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
                        emphasis="ghost"
                        tone="danger"
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
                  </li>
                );
              })}
            </ul>
          </Card>
        )}
      </section>

      {/* Selected goal milestones */}
      {goal && goal.milestones.length > 0 && (
        <section className="flex flex-col gap-stack">
          <SectionHeader title={`Jalons : ${getCompetenceById(goal.competenceId)?.label ?? goal.competenceId}`} />
          <Card className="p-0 overflow-hidden">
            <ol className="divide-y divide-ink-100">
              {goal.milestones.map((m, idx) => (
                <li
                  key={m.id}
                  className={[
                    'flex items-center gap-stack px-stack-lg py-stack-sm',
                    m.done ? 'bg-success-bg' : 'bg-white',
                  ].join(' ')}
                >
                  <span className={[
                    'inline-flex items-center justify-center w-6 h-6 rounded-pill text-caption font-bold tabular-nums shrink-0',
                    m.done ? 'bg-success-vivid text-white' : 'bg-ink-100 text-ink-700',
                  ].join(' ')}>
                    {m.done ? '✓' : idx + 1}
                  </span>
                  <span className={['text-body', m.done ? 'text-success-fg line-through' : 'text-ink-900'].join(' ')}>
                    {m.label}
                  </span>
                </li>
              ))}
            </ol>
          </Card>
          <Button emphasis="ghost" size="md" leadingIcon={<ChevronRight size={16} />} className="self-start">
            Voir le plan d'action complet
          </Button>
        </section>
      )}

      {/* Draft goals */}
      {draftGoals.length > 0 && (
        <section className="flex flex-col gap-stack">
          <SectionHeader title="En attente de planification" />
          <Card className="p-0 overflow-hidden">
            <ul className="divide-y divide-ink-100">
              {draftGoals.map((g) => {
                const comp = getCompetenceById(g.competenceId);
                return (
                  <li key={g.id} className="flex flex-wrap items-center justify-between gap-stack px-stack-lg py-stack">
                    <div className="flex flex-col gap-stack-3xs min-w-0">
                      <span className="text-body font-semibold text-ink-900">{comp?.label ?? g.competenceId}</span>
                      <span className="text-caption text-ink-600 tabular-nums">{comp?.subdomain ?? (comp ? domainLabel(comp.domain) : '')} · D{g.startLevel} → D{g.targetLevel}</span>
                    </div>
                    {/* L'action de la rangée, `soft` : planifier le brouillon.
                        Modifier est un outil, `ghost` comme plus haut. */}
                    <div className="flex flex-wrap items-center gap-stack-xs">
                      <Button
                        emphasis="soft"
                        size="sm"
                        leadingIcon={<PlayCircle size={14} />}
                        onClick={() => handlePlan(g)}
                      >
                        Planifier
                      </Button>
                      <Button
                        emphasis="ghost"
                        tone="neutral"
                        size="sm"
                        leadingIcon={<Pencil size={14} />}
                        onClick={() => openEdit(g.id)}
                      >
                        Modifier
                      </Button>
                      {/* Glyphe d'un contrôle : 3:1 au moins (WCAG 1.4.11). En
                          ink-300 il mesurait 1,47:1. */}
                      <button
                        type="button"
                        onClick={() => handleDelete(g.id)}
                        aria-label="Supprimer"
                        className="min-h-touch inline-flex items-center justify-center px-2 text-ink-600 hover:text-danger-fg transition-colors duration-fast focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-danger-base rounded-sm"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </li>
                );
              })}
            </ul>
          </Card>
        </section>
      )}

      {/* Create / Edit modal */}
      <Modal
        open={modalState !== null}
        onClose={closeModal}
        title={modalState?.mode === 'edit' ? "Modifier l'objectif" : 'Nouvel objectif de progression'}
        description="Définis une compétence cible, le niveau Dreyfus visé et une échéance."
        /* La modale est un écran : Annuler en `outline` neutre, Confirmer en
           `solid` (arbitrage n°19). */
        actions={
          <div className="flex items-center justify-end gap-stack-xs w-full">
            <Button emphasis="outline" tone="neutral" size="md" onClick={closeModal}>Annuler</Button>
            <Button emphasis="solid" size="md" onClick={handleSubmit}>
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
    </PageShell>
  );
}
