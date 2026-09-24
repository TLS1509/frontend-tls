import React, { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FileText, CheckCircle2, Search, Clock, MessageSquare, ChevronRight } from 'lucide-react';
import { EditorialHero } from '../components/patterns/EditorialHero';
import { PageShell } from '../components/layout';
import { SectionCard } from '../components/patterns/SectionCard';
import { FilterChip } from '../components/ui/FilterChip';
import { Card } from '../components/core/Card';
import { Button } from '../components/core/Button';
import { Badge } from '../components/ui/Badge';
import { MetaPill } from '../components/ui/MetaPill';
import { Avatar } from '../components/ui/Avatar';
import { EmptyState } from '../components/ui/EmptyState';
import { StatCard } from '../components/ui/StatCard';
import { useCoachingStore } from '../stores/persistence';
import { MOCK_USER_ID } from '../data/passeport';
import { MOCK_COACH, MOCK_COACH_ID } from '../data/coaching';
import { getCompetenceById } from '../data/competencies';
import type { CorrectionStatus } from '../types/learning';

/* Page de l'APPRENANT. Jusqu'au 2026-09-24 elle parlait au coach — « À
   corriger », « Corriger », « Rechercher un apprenant » — et affichait le coach
   comme auteur de l'exercice. Elle réutilisait `CorrectionCard`, dont les
   libellés d'état et de bouton sont écrits pour la file du coach et ne se
   paramètrent pas. D'où la carte locale ci-dessous : même construction (Card,
   Avatar, Badge, MetaPill, Button), vocabulaire de l'apprenant. La bonne suite
   est une prop d'audience sur `CorrectionCard`. */

// ─── Helpers ─────────────────────────────────────────────────────────────────

/** Trois états vus de l'apprenant : la balle est chez le coach, chez lui, ou c'est fini. */
type LearnerStatus = 'waiting' | 'feedback' | 'validated';

function toLearnerStatus(s: CorrectionStatus): LearnerStatus {
  if (s === 'completed') return 'validated';
  if (s === 'coach-feedback') return 'feedback';
  // pending · in-review · learner-response : le coach n'a pas encore (re)répondu
  return 'waiting';
}

const STATUS: Record<LearnerStatus, { label: string; variant: 'neutral' | 'info' | 'success' }> = {
  waiting:   { label: 'En attente du coach', variant: 'neutral' },
  feedback:  { label: 'Retour reçu',         variant: 'info' },
  validated: { label: 'Validée',             variant: 'success' },
};

function relativeDate(iso: string): string {
  const diffMs = Date.now() - new Date(iso).getTime();
  const diffH = Math.floor(diffMs / 3600000);
  if (diffH < 24) return `il y a ${diffH} h`;
  const diffD = Math.floor(diffH / 24);
  if (diffD === 1) return 'hier';
  return `il y a ${diffD} j`;
}

const FILTER_OPTIONS: { id: 'all' | LearnerStatus; label: string }[] = [
  { id: 'all', label: 'Toutes' },
  { id: 'waiting', label: 'En attente du coach' },
  { id: 'feedback', label: 'Retour reçu' },
  { id: 'validated', label: 'Validées' },
];

interface LearnerCorrection {
  id: string;
  coachName: string;
  exerciceTitle: string;
  competence: string;
  submittedAt: string;
  status: LearnerStatus;
  excerpt?: string;
  iterationCount: number;
}

// ─── Carte ────────────────────────────────────────────────────────────────────

const LearnerCorrectionCard: React.FC<LearnerCorrection & { onOpen: () => void }> = ({
  coachName,
  exerciceTitle,
  competence,
  submittedAt,
  status,
  excerpt,
  iterationCount,
  onOpen,
}) => {
  const { label, variant } = STATUS[status];
  const initials = coachName.split(' ').map((w) => w[0]).join('').slice(0, 2).toUpperCase();
  return (
    <Card variant="default" tone="primary" className="flex flex-col gap-stack-xs">
      <div className="flex items-start justify-between gap-stack-xs">
        <div className="flex items-center gap-stack-xs min-w-0">
          <Avatar name={coachName} initials={initials} size="sm" />
          <div className="min-w-0">
            <p className="text-body font-semibold text-ink-900 truncate">{status === 'waiting' ? 'Envoyé à' : 'Relu par'} {coachName}</p>
            <p className="text-caption text-ink-600 flex items-center gap-tight">
              <Clock size={14} aria-hidden />
              Soumis {submittedAt}
            </p>
          </div>
        </div>
        <Badge variant={variant}>{label}</Badge>
      </div>

      <div className="flex flex-col gap-tight">
        <p className="text-body font-semibold text-ink-900 line-clamp-2">{exerciceTitle}</p>
        {competence && <MetaPill text={competence} tone="primary" className="w-fit" />}
      </div>

      {excerpt && (
        <div className="rounded-lg bg-ink-50/70 px-3 py-2">
          <p className="text-body text-ink-600 line-clamp-2 italic">« {excerpt} »</p>
        </div>
      )}

      <div className="flex items-center justify-between pt-stack-xs border-t border-ink-100 mt-auto">
        <div className="flex items-center gap-tight text-caption text-ink-600">
          <MessageSquare size={14} aria-hidden />
          <span>Itération {iterationCount + 1}</span>
        </div>
        <Button emphasis="outline" size="sm" trailingIcon={<ChevronRight size={14} />} onClick={onOpen}>
          {status === 'waiting' ? 'Voir ma soumission' : 'Lire le retour'}
        </Button>
      </div>
    </Card>
  );
};

// ─── Component ────────────────────────────────────────────────────────────────

export default function CoachingCorrections() {
  const navigate = useNavigate();
  const [activeFilter, setActiveFilter] = useState<'all' | LearnerStatus>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const coachingStore = useCoachingStore();
  const storeCorrections = coachingStore.getCorrections(MOCK_USER_ID);
  const sessions = coachingStore.getSessions(MOCK_USER_ID);

  const corrections: LearnerCorrection[] = useMemo(
    () =>
      storeCorrections.map((c) => {
        const session = sessions.find((s) => s.id === c.sessionId);
        return {
          id: c.id,
          // Le coach est le relecteur, pas l'auteur : celui de la session liée,
          // sinon le coach de l'apprenant.
          coachName: session?.coachName ?? (c.coachId === MOCK_COACH_ID ? MOCK_COACH.name : 'Ton coach'),
          exerciceTitle: c.exerciseTitle,
          competence: c.competenceId ? (getCompetenceById(c.competenceId)?.label ?? c.competenceId) : '',
          submittedAt: relativeDate(c.submittedAt),
          status: toLearnerStatus(c.status),
          excerpt: c.submittedContent?.slice(0, 150),
          iterationCount: c.iterationCount,
        };
      }),
    [storeCorrections, sessions],
  );

  const countOf = (st: LearnerStatus) => corrections.filter((c) => c.status === st).length;

  const filtered = corrections.filter((c) => {
    const matchFilter = activeFilter === 'all' || c.status === activeFilter;
    const q = searchQuery.toLowerCase();
    const matchSearch = !q || c.exerciceTitle.toLowerCase().includes(q) || c.competence.toLowerCase().includes(q);
    return matchFilter && matchSearch;
  });

  return (
    <div className="flex flex-col gap-section">
      <EditorialHero
        eyebrow="Coaching · Corrections"
        title="Mes Corrections"
        summary="Retrouve les exercices que tu as soumis : ceux qui attendent ton coach, les retours à lire et les corrections validées."
        tone="flat"
      />

      <PageShell noPadTop className="pt-6 md:pt-8 lg:pt-10">

        {/* KPI row */}
        <div className="grid grid-cols-3 gap-stack">
          <StatCard value={countOf('waiting')} label="En attente du coach" variant="default" size="sm" />
          <StatCard value={countOf('feedback')} label="Retours à lire" variant="warm" size="sm" />
          <StatCard value={countOf('validated')} label="Validées" variant="brand" size="sm" />
        </div>

        {/* Search + filters */}
        <div className="flex flex-col gap-stack-xs">
          <div className="relative">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-ink-400" />
            <input
              type="text"
              placeholder="Rechercher un exercice ou une compétence…"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2.5 rounded-lg border border-ink-200 text-body focus:outline-none focus:border-primary-400 transition-colors duration-fast"
            />
          </div>
          <div className="flex flex-wrap gap-stack-xs">
            {FILTER_OPTIONS.map((f) => (
              <FilterChip
                key={f.id}
                label={f.label}
                active={activeFilter === f.id}
                onClick={() => setActiveFilter(f.id)}
              />
            ))}
          </div>
        </div>

        {/* Corrections list */}
        <SectionCard title={`${filtered.length} résultat${filtered.length !== 1 ? 's' : ''}`} titleIcon={<FileText size={18} />}>
          {filtered.length === 0 ? (
            <EmptyState
              icon={<CheckCircle2 size={32} />}
              title={corrections.length === 0 ? 'Aucun exercice soumis' : 'Aucun exercice trouvé'}
              description={
                corrections.length === 0
                  ? "Quand tu soumettras un exercice à ton coach, tu suivras ici sa correction."
                  : 'Aucune correction ne correspond à ta recherche.'
              }
            />
          ) : (
            <div className="flex flex-col gap-stack-xs">
              {filtered.map((correction) => (
                <LearnerCorrectionCard
                  key={correction.id}
                  {...correction}
                  onOpen={() => navigate(`/coaching/correction/${correction.id}`)}
                />
              ))}
            </div>
          )}
        </SectionCard>

      </PageShell>
    </div>
  );
}
