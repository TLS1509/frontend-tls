import React, { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Users, CheckCircle2, Clock3, ChevronRight, BarChart3 } from 'lucide-react';
import { EditorialHero } from '../components/patterns/EditorialHero';
import { SectionCard } from '../components/patterns/SectionCard';
import { SectionHeader } from '../components/patterns/SectionHeader';
import { Card } from '../components/core/Card';
import { Button } from '../components/core/Button';
import { Badge } from '../components/ui/Badge';
import { StatCard } from '../components/ui/StatCard';
import { EmptyState } from '../components/ui/EmptyState';
import { Tabs } from '../components/ui/Tabs';
import { CompetencyRadar } from '../components/ui/CompetencyRadar';
import { Container, PageShell } from '../components/layout';
import { ScatterChart, type ScatterChartDataPoint } from '../components/charts/ScatterChart';
import { RadarChart, type RadarDataPoint } from '../components/charts/RadarChart';
import { ChartContainer } from '../components/charts/ChartContainer';
import { ApprenantsTable, formatDreyfus, parseDays } from '../components/coach/ApprenantsTable';
import { APPRENANTS, APPRENANT_AXES, getApprenantById, type ApprenantStatus } from '../data/apprenants';
import { useCoachingStore } from '../stores/persistence';

// ─── Display helpers ──────────────────────────────────────────────────────────

const TABS = [
  { id: 'apprenants', label: 'Mes apprenants' },
  { id: 'matrice', label: 'Matrice de performance' },
  { id: 'corrections', label: 'Corrections' },
  { id: 'sessions', label: 'Sessions' },
];

/**
 * Build scatter chart data from apprenants.
 * x: skill level (Dreyfus avg)
 * y: engagement score (based on streak + last activity recency)
 * z: hours logged (mock: derived from streak)
 */
const buildScatterData = (): ScatterChartDataPoint[] => {
  return APPRENANTS.map((a) => {
    const skillLevel = a.dreyfusAvg * 20; // scale 0-5 to 0-100
    // engagement: 0-100 based on streak (max 30 days = 100%) and last activity
    const days = parseDays(a.lastActivity);
    const lastActivityPenalty = Math.max(0, 100 - days * 3);
    const streakBoost = Math.min(30, a.streak) / 30 * 50;
    const engagementScore = Math.round((lastActivityPenalty * 0.6 + streakBoost) / 1.2);
    // hours: mock value based on streak (1 hour per day assumption)
    const hoursLogged = a.streak * 1.5;

    const statusColorMap: Record<ApprenantStatus, string> = {
      active: '#55A1B4', // primary-500
      stuck: '#F28559', // danger-base
      ahead: '#9DBEBA', // success-base
    };

    return {
      label: a.name,
      x: skillLevel,
      y: engagementScore,
      z: hoursLogged,
      color: statusColorMap[a.status],
    };
  });
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

  // Build scatter chart data (memoized)
  const scatterData = useMemo(() => buildScatterData(), []);

  const radarFor = (scores: number[]) =>
    APPRENANT_AXES.map((label, idx) => ({ label, current: scores[idx] ?? 0 }));

  return (
    <PageShell width="page" className="pt-6 md:pt-8 lg:pt-10 relative z-base gap-section" noPadTop>
      <EditorialHero
        eyebrow="Espace Coach"
        title="Tableau de bord Coach"
        summary="Suivez la progression de vos apprenants, relisez leurs travaux et planifiez vos sessions."
        tone="flat"
      />

      <div className="flex flex-col gap-section">

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
            label="Niveau Dreyfus moyen"
            value={`${formatDreyfus(APPRENANTS.reduce((acc, a) => acc + a.dreyfusAvg, 0) / APPRENANTS.length)} / 5`}
            size="sm"
          />
        </div>

        <Tabs items={TABS} value={activeTab} onChange={setActiveTab} variant="underline" />

        {/* Apprenants tab */}
        {activeTab === 'apprenants' && (
          <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_auto] gap-section items-start">
            <div className="flex flex-col gap-stack">
              <SectionHeader
                title="Mes apprenants"
                subtitle={`${APPRENANTS.length} apprenants assignés`}
                icon={<Users size={20} />}
                tone="primary"
                size="md"
              />
              {/* Une collection d'objets du même type se lit en table, pas en pile
                  de cartes : dix apprenants tenaient 2 840 px en cartes, et le coach
                  ne pouvait pas trier pour trouver qui décroche. */}
              <ApprenantsTable
                apprenants={APPRENANTS}
                selectedId={selectedApprenantId}
                onRowClick={(a) => setSelectedApprenantId(selectedApprenantId === a.id ? null : a.id)}
              />
            </div>

            {/* Radar detail panel */}
            {selected && (
              <div className="w-full lg:w-96 sticky top-4 flex flex-col gap-stack">
                <SectionCard
                  title={`Radar : ${selected.name}`}
                  description="Niveau actuel Dreyfus par compétence"
                >
                  <ChartContainer>
                    <RadarChart
                      data={radarFor(selected.scores)}
                      size="sm"
                      showLegend={true}
                      onAxisClick={(axis, index) => {
                        // Axis click handler — could navigate to competency detail or show modal
                        console.log(`Clicked axis: ${axis.label} (index ${index})`);
                      }}
                    />
                  </ChartContainer>
                  <Button
                    emphasis="outline"
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

        {/* Matrice tab */}
        {activeTab === 'matrice' && (
          <div className="flex flex-col gap-stack">
            <SectionHeader
              title="Matrice de performance"
              subtitle="Positionnement des apprenants : compétence (x) vs engagement (y) vs heures (bulles)"
              icon={<BarChart3 size={20} />}
              tone="primary"
              size="md"
            />
            <ChartContainer>
              <ScatterChart
                data={scatterData}
                xAxisLabel="Niveau de compétence (Dreyfus 0-100)"
                yAxisLabel="Score d'engagement (0-100)"
                xDomain={[0, 100]}
                yDomain={[0, 100]}
                size="lg"
                showLegend={true}
                bubbleScale={2}
                onDotClick={(dataPoint, index) => {
                  const apprenant = APPRENANTS[index];
                  if (apprenant) {
                    setSelectedApprenantId(apprenant.id);
                  }
                }}
              />
            </ChartContainer>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-stack-xs text-caption text-ink-600 mt-stack">
              <div className="flex items-center gap-stack-xs">
                <div className="w-3 h-3 rounded-pill" style={{ backgroundColor: '#55A1B4' }} />
                <span>Apprenant actif</span>
              </div>
              <div className="flex items-center gap-stack-xs">
                <div className="w-3 h-3 rounded-pill" style={{ backgroundColor: '#F28559' }} />
                <span>En difficulté</span>
              </div>
              <div className="flex items-center gap-stack-xs">
                <div className="w-3 h-3 rounded-pill" style={{ backgroundColor: '#9DBEBA' }} />
                <span>En avance</span>
              </div>
            </div>
            <div className="mt-stack-lg p-stack bg-primary-50 rounded-lg border border-primary-200">
              <p className="text-caption text-ink-700">
                <strong>Tooltip:</strong> Survolez une bulle pour voir le nom et les détails. Cliquez pour sélectionner l'apprenant et voir son radar de compétences.
              </p>
            </div>
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
              size="md"
              action={
                <Button emphasis="outline" size="sm" trailingIcon={<ChevronRight size={14} />} onClick={() => navigate('/coach/corrections')}>
                  Tout voir
                </Button>
              }
            />
            {pendingCorrections.length > 0 ? (
              pendingCorrections.slice(0, 5).map((c) => {
                const learner = getApprenantById(c.learnerId);
                return (
                  <Card key={c.id} className="p-stack-md flex items-start gap-stack">
                    <div className="flex-1 min-w-0 flex flex-col gap-tight">
                      <div className="flex items-center gap-stack-xs flex-wrap">
                        <span className="text-body-sm font-semibold text-ink-900">{c.exerciseTitle}</span>
                        {c.iterationCount === 0 && <Badge variant="sun" size="compact">Nouveau</Badge>}
                      </div>
                      <div className="flex gap-stack-xs text-caption text-ink-500 flex-wrap">
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
                      emphasis="soft"
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

      </div>
    </PageShell>
  );
}
