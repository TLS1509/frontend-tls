import React, { useState } from 'react';
import { Users, ClipboardCheck, TrendingUp } from 'lucide-react';
import EditorialHero from '../components/patterns/EditorialHero';
import SectionCard from '../components/patterns/SectionCard';
import { SectionHeader } from '../components/patterns/SectionHeader';
import { DataTable, type DataTableColumn } from '../components/patterns/DataTable';
import { Card } from '../components/core/Card';
import { Button } from '../components/core/Button';
import { Badge } from '../components/ui/Badge';
import { StatCard } from '../components/ui/StatCard';
import { Tabs } from '../components/ui/Tabs';
import { Avatar } from '../components/ui/Avatar';
import { ProgressBar } from '../components/ui/ProgressBar';
import { PageShell } from '../components/layout';
import { BarChart, ChartWithExport } from '../components/charts';
import { useEnterpriseStore, useCoachingStore } from '../stores/persistence';
import { MOCK_COMPANY_ID } from '../data/enterprise';
import { MOCK_USER_ID } from '../data/passeport';
import { getCompetenceById } from '../data/competencies';
import type { EnterpriseRole, MemberStatus } from '../types/learning';

const MEMBER_STATUS: Record<MemberStatus, { label: string; variant: 'success' | 'warm' | 'neutral'; order: number }> = {
  active: { label: 'Actif', variant: 'success', order: 0 },
  pending: { label: 'En attente', variant: 'warm', order: 1 },
  suspended: { label: 'Suspendu', variant: 'neutral', order: 2 },
};

const ROLE_LABEL: Record<EnterpriseRole, string> = {
  admin: 'Admin',
  manager: 'Manager',
  member: 'Membre',
  viewer: 'Invité',
};

/* Des membres qu'on compare sur la progression et le statut : une table
   triable, pas une pile de cartes (arbitrage n°5 du 23/09). Les valeurs de
   tri voyagent dans la rangée sous des clés que la table n'affiche pas. */
const ROSTER_COLUMNS: DataTableColumn[] = [
  { key: 'name', label: 'Apprenant', sortable: true, sortValue: (r) => r._name as string },
  { key: 'progress', label: 'Progression', sortable: true, sortValue: (r) => r._progress as number },
  { key: 'status', label: 'Statut', sortable: true, sortValue: (r) => r._status as number },
  { key: 'action', label: 'Fiche', align: 'right' },
];

const CoachEnterpriseDashboard: React.FC = () => {
  const [tab, setTab] = useState<'roster' | 'queue' | 'analytics'>('roster');

  const enterpriseStore = useEnterpriseStore();
  const coachingStore = useCoachingStore();

  const members = enterpriseStore.getMembers(MOCK_COMPANY_ID);
  const stats = enterpriseStore.getStats(MOCK_COMPANY_ID);

  const pendingCorrections = coachingStore
    .getCorrections(MOCK_USER_ID)
    .filter((c) => c.status === 'pending');

  const formatDate = (iso: string) => {
    const diff = Math.round((Date.now() - new Date(iso).getTime()) / (1000 * 60 * 60 * 24));
    return diff === 0 ? "aujourd'hui" : diff === 1 ? 'il y a 1 jour' : `il y a ${diff} jours`;
  };

  // Analytics data for charts
  const TEAM_PROGRESS_DATA = members.map((m) => ({
    label: m.name.split(' ')[0],
    progression: m.progressPercent,
    engagement: Math.round(Math.random() * 100),
    completions: Math.floor(Math.random() * 15),
  }));

  const ENGAGEMENT_TREND = [
    { label: 'Week 1', engagement: 62, active: 18 },
    { label: 'Week 2', engagement: 75, active: 22 },
    { label: 'Week 3', engagement: 68, active: 20 },
    { label: 'Week 4', engagement: 82, active: 24 },
    { label: 'Week 5', engagement: 78, active: 23 },
    { label: 'Week 6', engagement: 85, active: 25 },
  ];

  return (
    <PageShell width="wide" noPadTop className="pt-6 md:pt-8 lg:pt-10">
      <EditorialHero
        eyebrow="Coach Enterprise · Vue équipe"
        title="Mon équipe Acme Corp"
        summary="Team roster, validation queue et analytics agrégés"
        tone="flat"
      />

      <div className="flex flex-col gap-section">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-stack-xs">
          <StatCard label="Apprenants suivis" value={stats.activeMembers} sub={`${members.length} membres total`} />
          <StatCard label="Taux de complétion" value={`${stats.completionRate}%`} sub="formations" />
          <StatCard label="Queue validation" value={pendingCorrections.length} sub="à reviewer" />
          <StatCard label="Engagement" value={`${stats.engagementRate}%`} sub="hebdomadaire" />
        </div>

        <Tabs
          value={tab}
          onChange={(v) => setTab(v as typeof tab)}
          items={[
            { id: 'roster', label: 'Team Roster' },
            { id: 'queue', label: 'Validation Queue' },
            { id: 'analytics', label: 'Team Analytics' },
          ]}
        />

        {tab === 'roster' && (
          <section className="flex flex-col gap-stack" aria-label="Apprenants assignés">
            <SectionHeader
              title="Apprenants assignés"
              subtitle="Statut et progression par membre de l'équipe"
              icon={<Users size={20} />}
              tone="primary"
              size="md"
            />
            <DataTable
              columns={ROSTER_COLUMNS}
              pageSize={Math.max(members.length, 1)}
              emptyMessage="Aucun membre dans l'équipe."
              rows={members.map((m) => {
                const status = MEMBER_STATUS[m.status];
                return {
                  _name: m.name,
                  _progress: m.progressPercent,
                  _status: status.order,
                  name: (
                    <span className="flex items-center gap-stack-sm min-w-0">
                      <Avatar initials={m.name.split(' ').map((n) => n[0]).join('').slice(0, 2)} size="sm" />
                      <span className="flex flex-col min-w-0">
                        <span className="font-semibold text-ink-900 truncate">{m.name}</span>
                        <span className="text-caption text-ink-600 truncate">{ROLE_LABEL[m.role]}</span>
                      </span>
                    </span>
                  ),
                  progress: (
                    <span className="flex items-center gap-stack-xs min-w-[8rem]">
                      <ProgressBar value={m.progressPercent} fill="brand" size="sm" valueLabel={false} className="flex-1" />
                      <span className="tabular-nums text-ink-700 w-9 text-right">{m.progressPercent} %</span>
                    </span>
                  ),
                  status: <Badge variant={status.variant} size="compact">{status.label}</Badge>,
                  action: (
                    <Button emphasis="outline" size="sm" aria-label={`Voir la fiche de ${m.name}`}>
                      Voir fiche
                    </Button>
                  ),
                };
              })}
            />
          </section>
        )}

        {tab === 'queue' && (
          <SectionCard title="Validation Queue" description="Corrections soumises en attente de review">
            {pendingCorrections.length === 0 ? (
              <p className="text-body-sm text-ink-500 m-0">Aucune correction en attente.</p>
            ) : (
              <div className="flex flex-col gap-stack-xs">
                {pendingCorrections.map((c) => {
                  const competence = c.competenceId ? getCompetenceById(c.competenceId) : null;
                  return (
                    <Card key={c.id} className="p-stack-md flex items-center gap-stack">
                      <ClipboardCheck className="w-6 h-6 text-secondary-600 shrink-0" />
                      <div className="flex-1 min-w-0">
                        <div className="font-semibold truncate">{c.exerciseTitle}</div>
                        <div className="text-caption text-ink-500">{formatDate(c.submittedAt)}</div>
                      </div>
                      {competence && <Badge variant="brand">{competence.label}</Badge>}
                      <Button emphasis="soft" tone="warm" size="sm">Reviewer</Button>
                    </Card>
                  );
                })}
              </div>
            )}
          </SectionCard>
        )}

        {tab === 'analytics' && (
          <div className="flex flex-col gap-section">
            {/* KPI cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-stack">
              <Card className="p-stack-lg">
                <TrendingUp className="w-6 h-6 text-success-fg mb-stack-xs" />
                <div className="font-semibold mb-1">Taux de complétion</div>
                <div className="font-display text-h2 font-bold">{stats.completionRate}%</div>
                <div className="text-caption text-ink-500">formations actives : {stats.activeFormations}</div>
              </Card>
              <Card className="p-stack-lg">
                <Users className="w-6 h-6 text-info-fg mb-stack-xs" />
                <div className="font-semibold mb-1">Taux d'engagement hebdomadaire</div>
                <div className="font-display text-h2 font-bold">{stats.engagementRate}%</div>
                <div className="text-caption text-ink-500">{stats.activeMembers} / {members.length} apprenants actifs</div>
              </Card>
            </div>

            {/* Analytics charts */}
            <SectionCard title="Progression d'équipe" description="Performance de chaque apprenant" tone="brand">
              <ChartWithExport
                chartId="team-progress-chart"
                filename="team-progress-analytics"
                exportVariant="full"
                data={TEAM_PROGRESS_DATA}
              >
                <BarChart
                  data={TEAM_PROGRESS_DATA}
                  series={[
                    { key: 'progression', label: 'Progression %', color: '#55A1B4' },
                    { key: 'engagement', label: 'Engagement %', color: '#ED843A' },
                  ]}
                  size="lg"
                  layout="horizontal"
                  showLegend
                />
              </ChartWithExport>
            </SectionCard>

            <SectionCard title="Tendance d'engagement" description="Évolution hebdomadaire de l'engagement" tone="warm">
              <ChartWithExport
                chartId="engagement-trend-chart"
                filename="engagement-trend-analytics"
                exportVariant="full"
                data={ENGAGEMENT_TREND}
              >
                <BarChart
                  data={ENGAGEMENT_TREND}
                  series={[
                    { key: 'engagement', label: 'Taux engagement %', color: '#F8B044' },
                    { key: 'active', label: 'Apprenants actifs', color: '#55A1B4' },
                  ]}
                  size="lg"
                  showLegend
                />
              </ChartWithExport>
            </SectionCard>
          </div>
        )}
      </div>
    </PageShell>
  );
};

export default CoachEnterpriseDashboard;
