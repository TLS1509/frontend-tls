import React, { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckCircle2 } from 'lucide-react';
import { EditorialHero } from '../components/patterns/EditorialHero';
import { SectionHeader } from '../components/patterns/SectionHeader';
import { CorrectionCard } from '../components/ui/CorrectionCard';
import { StatCard } from '../components/ui/StatCard';
import { EmptyState } from '../components/ui/EmptyState';
import { Tabs } from '../components/ui/Tabs';
import { PageShell } from '../components/layout';
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

/** Display status mapping : the cahier has 5 internal statuses but the queue collapses them to 3 buckets. */
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

  // Phase 16.4 #2 : read corrections live from store (seeded from MOCK on first access).
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

  const tabLabel = TABS.find((t) => t.id === activeTab)?.label ?? '';

  return (
    /* 48 px entre l'en-tête, les chiffres et la file ; 32 entre les onglets et
       leur panneau. Le badge « 3 en attente » du hero est retiré : un compte en
       registre d'état, qui répétait la tuile « En attente » juste dessous. */
    <PageShell width="page" noPadTop className="pt-6 md:pt-8 lg:pt-10">
      <EditorialHero
        eyebrow="Coach · Corrections"
        title="File de corrections"
        summary="Gérez les exercices soumis par vos apprenants. Corrigez, commentez et suivez la progression de chacun."
        tone="flat"
      />

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

      <div className="flex flex-col gap-section">
        <Tabs
          items={TABS}
          value={activeTab}
          onChange={(id) => setActiveTab(id as 'pending' | 'in-review' | 'completed')}
        />

        {/* Le panneau a son titre h2 : les cartes portent des h3 (le titre de
            l'exercice), qui suivaient directement le h1. Le compte passe en
            méta ; 12 px entre deux cartes d'une même file (8 avant). */}
        <section className="flex flex-col gap-stack">
          <SectionHeader
            title={tabLabel}
            meta={`${currentItems.length} exercice${currentItems.length > 1 ? 's' : ''}`}
            size="md"
          />
          {currentItems.length === 0 ? (
            <EmptyState
              icon={<CheckCircle2 size={32} />}
              title="Aucun exercice dans cette catégorie"
              description={activeTab === 'pending' ? 'Tous les exercices ont été traités.' : 'Aucun exercice pour le moment.'}
            />
          ) : (
            <div className="flex flex-col gap-stack-sm">
              {currentItems.map((c) => {
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
                    status={(bucketOf(c.status) === 'completed' ? 'corrected' : bucketOf(c.status)) as 'pending' | 'in-review' | 'corrected'}
                    excerpt={c.submittedContent.slice(0, 220)}
                    feedbackCount={c.iterationCount}
                    surface={activeTab === 'pending' ? 'tinted' : 'card'}
                    onOpen={() => navigate(`/coach/correction/${c.id}`)}
                    onAssign={activeTab === 'pending' ? () => navigate(`/coach/correction/${c.id}`) : undefined}
                  />
                );
              })}
            </div>
          )}
        </section>
      </div>
    </PageShell>
  );
}
