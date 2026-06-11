import React, { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Users, CheckCircle2, Clock3, ChevronRight } from 'lucide-react';
import { EditorialHero } from '../components/patterns/EditorialHero';
import { SectionCard } from '../components/patterns/SectionCard';
import { SectionHeader } from '../components/patterns/SectionHeader';
import { Card } from '../components/core/Card';
import { Button } from '../components/core/Button';
import { Badge } from '../components/ui/Badge';
import { Avatar } from '../components/ui/Avatar';
import { StatCard } from '../components/ui/StatCard';
import { ProgressBar } from '../components/ui/ProgressBar';
import { EmptyState } from '../components/ui/EmptyState';
import { Tabs } from '../components/ui/Tabs';
import { CompetencyRadar } from '../components/ui/CompetencyRadar';
import { AtrophieIndicator } from '../components/ui/AtrophieIndicator';
import { Container } from '../components/layout';
import { APPRENANTS, APPRENANT_AXES, getApprenantById, type ApprenantStatus } from '../data/apprenants';
import { useCoachingStore } from '../stores/persistence';

// ─── Display helpers ──────────────────────────────────────────────────────────

const STATUS_CONFIG: Record<ApprenantStatus, { label: string; variant: 'success' | 'danger' | 'brand' }> = {
  active: { label: 'Actif', variant: 'success' },
  stuck: { label: 'En difficulté', variant: 'danger' },
  ahead: { label: 'En avance', variant: 'brand' },
};

const TABS = [
  { id: 'apprenants', label: 'Mes apprenants' },
  { id: 'corrections', label: 'Corrections' },
  { id: 'sessions', label: 'Sessions' },
];

/** "2j", "8j", "Hier" → integer days for atrophie/jac computations. */
const parseDays = (s: string): number => {
  if (/hier/i.test(s)) return 1;
  const m = s.match(/(\d+)/);
  return m ? Number(m[1]) : 0;
};

// ─── Component ────────────────────────────────────────────────────────────────

export default function CoachDashboard() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('apprenants');
  const [selectedApprenantId, setSelectedApprenantId] = useState<string | null>(null);

  // Phase 16.4 #1 : load corrections from store, group by status
  const coachingStore = useCoachingStore();
  const allCorrections = coachingStore.getAllCorrections();
  const pendingCorrections = useMemo(
    () => allCorrections.filter((c) => c.status === 'pending'),
    [allCorrections],
  );

  const selected = selectedApprenantId ? getApprenantById(selectedApprenantId) : undefined;

  const jacPct = (level: number) => Math.round((level / 5) * 100);
  const radarFor = (scores: number[]) =>
    APPRENANT_AXES.map((label, idx) => ({ label, current: scores[idx] ?? 0 }));

  return (
    <div className="flex flex-col gap-section">
      <EditorialHero
        eyebrow="Espace Coach"
        title="Tableau de bord Coach"
        summary="Suis la progression de tes apprenants, revois leurs travaux et planifie vos sessions."
        tone="default"
      />

      <Container width="wide" padding={false} className="px-stack md:px-section flex flex-col gap-section">

        {/* Stats row */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-stack">
          <StatCard label="Apprenants assignés" value={String(APPRENANTS.length)} size="sm" />
          <StatCard
            label="Corrections en attente"
            value={String(pendingCorrections.length)}
            delta={pendingCorrections.length > 0 ? 'urgent' : 'à jour'}
            deltaDirection={pendingCorrections.length > 0 ? 'up' : 'down'}
            size="sm"
          />
          <StatCard label="Sessions cette semaine" value="2" size="sm" />
          <StatCard
            label="Score Dreyfus moyen"
            value={`D${(APPRENANTS.reduce((acc, a) => acc + a.dreyfusAvg, 0) / APPRENANTS.length).toFixed(1)}`}
            size="sm"
          />
        </div>

        <Tabs items={TABS} value={activeTab} onChange={setActiveTab} variant="underline" />

        {/* Apprenants tab */}
        {activeTab === 'apprenants' && (
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-section items-start">
            <div className="flex flex-col gap-stack">
              <SectionHeader
                title="Mes apprenants"
                subtitle={`${APPRENANTS.length} apprenants assignés`}
                icon={<Users size={20} />}
                tone="primary"
              />
              {APPRENANTS.map((a) => {
                const status = STATUS_CONFIG[a.status];
                const days = parseDays(a.lastActivity);
                const jac = jacPct(a.dreyfusAvg);
                const isSelected = selectedApprenantId === a.id;
                return (
                  <Card
                    key={a.id}
                    className={`p-stack flex items-start gap-stack cursor-pointer transition-all duration-base ${isSelected ? 'ring-2 ring-primary-400' : 'hover:shadow-sm'}`}
                    onClick={() => setSelectedApprenantId(isSelected ? null : a.id)}
                  >
                    <Avatar initials={a.initials} size="md" />
                    <div className="flex-1 min-w-0 flex flex-col gap-stack-xs">
                      <div className="flex items-center gap-stack-xs flex-wrap">
                        <span className="text-body-sm font-semibold text-ink-900">{a.name}</span>
                        <Badge variant={status.variant} size="sm">{status.label}</Badge>
                        <AtrophieIndicator daysSinceActivity={days} currentLevel={Math.round(a.dreyfusAvg)} size="sm" showLabel={false} />
                      </div>
                      <div className="flex gap-stack text-caption text-ink-500 flex-wrap">
                        <span>Dernière activité : {a.lastActivity}</span>
                        <span>JAC : {jac}%</span>
                        <span>Dreyfus moy. : D{a.dreyfusAvg.toFixed(1)}</span>
                      </div>
                      <ProgressBar value={jac} fill="brand" size="sm" />
                    </div>
                    <ChevronRight size={16} className="shrink-0 text-ink-300 mt-1" />
                  </Card>
                );
              })}
            </div>

            {/* Radar detail panel */}
            {selected && (
              <div className="w-full lg:w-80 sticky top-4">
                <SectionCard
                  title={`Radar : ${selected.name}`}
                  description="Niveau actuel Dreyfus par compétence"
                >
                  <CompetencyRadar axes={radarFor(selected.scores)} size="sm" showLegend />
                  <Button
                    variant="brand-ghost"
                    size="sm"
                    fullWidth
                    trailingIcon={<ChevronRight size={14} />}
                    onClick={() => navigate(`/coach/apprenant/${selected.id}`)}
                  >
                    Voir la fiche complète
                  </Button>
                </SectionCard>
              </div>
            )}
          </div>
        )}

        {/* Corrections tab */}
        {activeTab === 'corrections' && (
          <div className="flex flex-col gap-stack">
            <SectionHeader
              title="File de corrections"
              subtitle={`${pendingCorrections.length} travail${pendingCorrections.length > 1 ? 'aux' : ''} en attente de review`}
              icon={<CheckCircle2 size={20} />}
              tone="primary"
              action={
                <Button variant="ghost" size="sm" trailingIcon={<ChevronRight size={14} />} onClick={() => navigate('/coach/corrections')}>
                  Tout voir
                </Button>
              }
            />
            {pendingCorrections.length > 0 ? (
              pendingCorrections.slice(0, 5).map((c) => {
                const learner = getApprenantById(c.learnerId);
                return (
                  <Card key={c.id} className="p-stack flex items-start gap-stack">
                    <div className="flex-1 min-w-0 flex flex-col gap-1">
                      <div className="flex items-center gap-stack-xs flex-wrap">
                        <span className="text-body-sm font-semibold text-ink-900">{c.exerciseTitle}</span>
                        {c.iterationCount === 0 && <Badge variant="sun" size="sm">Nouveau</Badge>}
                      </div>
                      <div className="flex gap-3 text-caption text-ink-500 flex-wrap">
                        <span>{learner?.name ?? c.learnerId}</span>
                        {c.competenceId && (
                          <>
                            <span>·</span>
                            <span className="capitalize">{c.competenceId.replace(/_/g, ' ')}</span>
                          </>
                        )}
                        <span>·</span>
                        <span>{new Date(c.submittedAt).toLocaleDateString('fr-FR', { day: 'numeric', month: 'short' })}</span>
                      </div>
                    </div>
                    <Button
                      variant="primary"
                      size="sm"
                      onClick={() => navigate(`/coach/correction/${c.id}`)}
                    >
                      Corriger
                    </Button>
                  </Card>
                );
              })
            ) : (
              <EmptyState title="Aucune correction en attente" description="Tous les travaux ont été reviewés." />
            )}
          </div>
        )}

        {/* Sessions tab */}
        {activeTab === 'sessions' && (
          <EmptyState
            title="Gestion des sessions"
            description="Calendrier et synchronisation Google/Outlook : disponible avec la configuration OAuth."
            icon={<Clock3 size={32} />}
          />
        )}

      </Container>
    </div>
  );
}
