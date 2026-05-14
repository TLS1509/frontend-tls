import React, { useState } from 'react';
import { FileText, Clock, CheckCircle2, Users, AlertTriangle } from 'lucide-react';
import { EditorialHero } from '../components/patterns/EditorialHero';
import { SectionCard } from '../components/patterns/SectionCard';
import { Button } from '../components/core/Button';
import { FilterChip } from '../components/ui/FilterChip';
import { CorrectionCard } from '../components/ui/CorrectionCard';
import { StatCard } from '../components/ui/StatCard';
import { EmptyState } from '../components/ui/EmptyState';
import { Tabs } from '../components/ui/Tabs';

// ─── Mock data ────────────────────────────────────────────────────────────────

const QUEUE = [
  {
    id: '1',
    apprenantName: 'Sophie Martin',
    apprenantInitials: 'SM',
    exerciceTitle: 'Analyse d\'une situation de management complexe',
    competence: 'Leadership',
    submittedAt: 'Il y a 1h',
    status: 'pending' as const,
    excerpt: 'Dans cette situation, j\'ai dû gérer un conflit entre deux membres de mon équipe...',
    feedbackCount: 0,
  },
  {
    id: '2',
    apprenantName: 'Thomas Klein',
    apprenantInitials: 'TK',
    exerciceTitle: 'Étude de cas : délégation et feedback',
    competence: 'Leadership',
    submittedAt: 'Il y a 3h',
    status: 'pending' as const,
    excerpt: 'J\'ai appliqué le modèle situationnel en adaptant mon style de management selon le profil de chaque collaborateur...',
    feedbackCount: 0,
  },
  {
    id: '3',
    apprenantName: 'Amélie Rousseau',
    apprenantInitials: 'AR',
    exerciceTitle: 'Plan de communication interne',
    competence: 'Communication',
    submittedAt: 'Hier',
    status: 'in-review' as const,
    excerpt: 'Le plan s\'articule autour de trois canaux principaux : les all-hands mensuels, la newsletter hebdomadaire...',
    feedbackCount: 1,
  },
  {
    id: '4',
    apprenantName: 'Pierre Bernard',
    apprenantInitials: 'PB',
    exerciceTitle: 'Rapport d\'auto-évaluation Dreyfus',
    competence: 'Analyse',
    submittedAt: 'Il y a 2j',
    status: 'corrected' as const,
    feedbackCount: 3,
  },
];

const TABS = [
  { id: 'pending', label: 'File d\'attente' },
  { id: 'in-review', label: 'En cours' },
  { id: 'corrected', label: 'Terminés' },
];

// ─── Component ────────────────────────────────────────────────────────────────

export default function CoachCorrectionsQueue() {
  const [activeTab, setActiveTab] = useState('pending');

  const pending = QUEUE.filter((c) => c.status === 'pending');
  const inReview = QUEUE.filter((c) => c.status === 'in-review');
  const corrected = QUEUE.filter((c) => c.status === 'corrected');

  const currentItems = activeTab === 'pending' ? pending : activeTab === 'in-review' ? inReview : corrected;
  const urgentCount = pending.length;

  return (
    <div className="flex flex-col gap-section">
      <EditorialHero
        eyebrow="Coach · Corrections"
        title="File de Corrections"
        subtitle="Gère les exercices soumis par tes apprenants. Corrige, commente et suis la progression de chacun."
        tone="warm"
        actions={
          urgentCount > 0 ? (
            <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm px-3 py-2 rounded-xl border border-white/30">
              <AlertTriangle size={16} className="text-white" />
              <span className="text-body-sm text-white font-semibold">{urgentCount} en attente</span>
            </div>
          ) : undefined
        }
      />

      <div className="max-w-page mx-auto w-full px-4 md:px-8 flex flex-col gap-section">

        {/* KPI row */}
        <div className="grid grid-cols-3 gap-stack">
          <StatCard value={pending.length} label="En attente" variant="warm" size="sm"
            delta={pending.length > 0 ? 'Action requise' : 'RAS'} deltaDirection={pending.length > 0 ? 'down' : 'up'} />
          <StatCard value={inReview.length} label="En cours de correction" size="sm" />
          <StatCard value={corrected.length} label="Corrigés cette semaine" variant="brand" size="sm"
            delta="↑ vs sem. dernière" deltaDirection="up" />
        </div>

        {/* Tabs */}
        <Tabs
          tabs={TABS.map((t) => ({ ...t, count: t.id === 'pending' ? pending.length : t.id === 'in-review' ? inReview.length : corrected.length }))}
          activeTab={activeTab}
          onChange={setActiveTab}
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
            currentItems.map((correction) => (
              <CorrectionCard
                key={correction.id}
                {...correction}
                surface={activeTab === 'pending' ? 'tinted' : 'card'}
                onOpen={() => {}}
                onAssign={activeTab === 'pending' ? () => {} : undefined}
              />
            ))
          )}
        </div>

      </div>
    </div>
  );
}
