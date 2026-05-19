import React, { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckCircle2, AlertTriangle } from 'lucide-react';
import { EditorialHero } from '../components/patterns/EditorialHero';
import { CorrectionCard } from '../components/ui/CorrectionCard';
import { StatCard } from '../components/ui/StatCard';
import { EmptyState } from '../components/ui/EmptyState';
import { Tabs } from '../components/ui/Tabs';
import { useCoachingStore } from '../stores/persistence';
import { getApprenantById } from '../data/apprenants';
import { getCompetenceById } from '../data/competencies';
import type { Correction } from '../types/learning';

// ─── Display helpers ──────────────────────────────────────────────────────────

const TABS = [
  { id: 'pending', label: "File d'attente" },
  { id: 'in-review', label: 'En cours' },
  { id: 'completed', label: 'Terminés' },
];

/** Display status mapping — the cahier has 5 internal statuses but the queue collapses them to 3 buckets. */
const bucketOf = (s: Correction['status']): 'pending' | 'in-review' | 'completed' => {
  switch (s) {
    case 'pending':           return 'pending';
    case 'in-review':         return 'in-review';
    case 'coach-feedback':    return 'in-review';
    case 'learner-response':  return 'in-review';
    case 'completed':         return 'completed';
  }
};

/** "2026-05-18T08:00:00Z" → "Il y a 1j" / "Il y a 2h" / "Hier" approximation. */
const submittedAtLabel = (iso: string): string => {
  const submitted = new Date(iso).getTime();
  const now = Date.now();
  const diffH = Math.round((now - submitted) / (1000 * 60 * 60));
  if (diffH < 1) return "Il y a quelques minutes";
  if (diffH < 24) return `Il y a ${diffH}h`;
  const diffD = Math.round(diffH / 24);
  if (diffD === 1) return 'Hier';
  if (diffD < 7) return `Il y a ${diffD}j`;
  return new Date(iso).toLocaleDateString('fr-FR', { day: 'numeric', month: 'short' });
};

// ─── Component ────────────────────────────────────────────────────────────────

export default function CoachCorrectionsQueue() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'pending' | 'in-review' | 'completed'>('pending');

  // Phase 16.4 #2 — read corrections live from store (seeded from MOCK on first access).
  const coachingStore = useCoachingStore();
  const all = coachingStore.getAllCorrections();

  const buckets = useMemo(() => {
    const pending: Correction[] = [];
    const inReview: Correction[] = [];
    const completed: Correction[] = [];
    all.forEach((c) => {
      const b = bucketOf(c.status);
      if (b === 'pending') pending.push(c);
      else if (b === 'in-review') inReview.push(c);
      else completed.push(c);
    });
    return { pending, inReview, completed };
  }, [all]);

  const currentItems = buckets[activeTab === 'pending' ? 'pending' : activeTab === 'in-review' ? 'inReview' : 'completed'];
  const urgentCount = buckets.pending.length;

  return (
    <div className="flex flex-col gap-section">
      <EditorialHero
        eyebrow="Coach · Corrections"
        title="File de Corrections"
        summary="Gère les exercices soumis par tes apprenants. Corrige, commente et suis la progression de chacun."
        tone="warm"
        trailing={
          urgentCount > 0 ? (
            <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm px-3 py-2 rounded-xl border border-white/30">
              <AlertTriangle size={16} className="text-white" />
              <span className="text-body-sm text-white font-semibold">{urgentCount} en attente</span>
            </div>
          ) : undefined
        }
      />

      <div className="max-w-wide mx-auto w-full px-4 md:px-8 flex flex-col gap-section">

        {/* KPI row */}
        <div className="grid grid-cols-3 gap-stack">
          <StatCard
            value={buckets.pending.length}
            label="En attente"
            variant="warm"
            size="sm"
            delta={buckets.pending.length > 0 ? 'Action requise' : 'RAS'}
            deltaDirection={buckets.pending.length > 0 ? 'down' : 'up'}
          />
          <StatCard value={buckets.inReview.length} label="En cours de correction" size="sm" />
          <StatCard
            value={buckets.completed.length}
            label="Corrigés cette semaine"
            variant="brand"
            size="sm"
            delta="↑ vs sem. dernière"
            deltaDirection="up"
          />
        </div>

        {/* Tabs */}
        <Tabs
          items={TABS}
          value={activeTab}
          onChange={(id) => setActiveTab(id as 'pending' | 'in-review' | 'completed')}
        />

        {/* Queue */}
        <div className="flex flex-col gap-3">
          {currentItems.length === 0 ? (
            <EmptyState
              icon={<CheckCircle2 size={32} />}
              title="Aucun exercice dans cette catégorie"
              description={activeTab === 'pending' ? 'Tous les exercices ont été traités.' : 'Aucun exercice pour le moment.'}
            />
          ) : (
            currentItems.map((c) => {
              const learner = getApprenantById(c.learnerId);
              const competence = c.competenceId ? getCompetenceById(c.competenceId) : undefined;
              return (
                <CorrectionCard
                  key={c.id}
                  id={c.id}
                  apprenantName={learner?.name ?? c.learnerId}
                  apprenantInitials={learner?.initials ?? c.learnerId.slice(0, 2).toUpperCase()}
                  exerciceTitle={c.exerciseTitle}
                  competence={competence?.label ?? c.competenceId ?? ''}
                  submittedAt={submittedAtLabel(c.submittedAt)}
                  status={bucketOf(c.status) === 'completed' ? 'corrected' : bucketOf(c.status)}
                  excerpt={c.submittedContent.slice(0, 220)}
                  feedbackCount={c.iterationCount}
                  surface={activeTab === 'pending' ? 'tinted' : 'card'}
                  onOpen={() => navigate(`/coach/correction/${c.id}`)}
                  onAssign={activeTab === 'pending' ? () => navigate(`/coach/correction/${c.id}`) : undefined}
                />
              );
            })
          )}
        </div>

      </div>
    </div>
  );
}
