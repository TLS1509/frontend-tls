import React, { useState } from 'react';
import { Users, ClipboardCheck, TrendingUp } from 'lucide-react';
import EditorialHero from '../components/patterns/EditorialHero';
import { SectionHeader } from '../components/patterns/SectionHeader';
import { DataTable, type DataTableColumn } from '../components/patterns/DataTable';
import { Card } from '../components/core/Card';
import { Button } from '../components/core/Button';
import { Badge } from '../components/ui/Badge';
import { MetaPill } from '../components/ui/MetaPill';
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
    { label: 'S1', engagement: 62, active: 18 },
    { label: 'S2', engagement: 75, active: 22 },
    { label: 'S3', engagement: 68, active: 20 },
    { label: 'S4', engagement: 82, active: 24 },
    { label: 'S5', engagement: 78, active: 23 },
    { label: 'S6', engagement: 85, active: 25 },
  ];

  return (
    /* 48 px entre l'en-tête, les chiffres et l'espace à onglets ; 32 entre les
       onglets et leur panneau ; 16 entre un titre de section et son contenu.
       Les libellés anglais (« Team Roster », « Validation Queue ») sont des
       titres : ils passent en français. */
    <PageShell width="wide" noPadTop className="pt-6 md:pt-8 lg:pt-10">
      <EditorialHero
        eyebrow="Coach Enterprise · Vue équipe"
        title="Mon équipe Acme Corp"
        summary="L'équipe, la file de validation et les analytics agrégés."
        tone="flat"
      />

      <div className="grid grid-cols-2 md:grid-cols-4 gap-stack">
        <StatCard label="Apprenants suivis" value={stats.activeMembers} sub={`${members.length} membres au total`} />
        <StatCard label="Taux de complétion" value={`${stats.completionRate} %`} sub="formations" />
        <StatCard label="File de validation" value={pendingCorrections.length} sub="à corriger" />
        <StatCard label="Engagement" value={`${stats.engagementRate} %`} sub="hebdomadaire" />
      </div>

      <div className="flex flex-col gap-section">
        <Tabs
          value={tab}
          onChange={(v) => setTab(v as typeof tab)}
          items={[
            { id: 'roster', label: 'Équipe' },
            { id: 'queue', label: 'File de validation' },
            { id: 'analytics', label: 'Analytics' },
          ]}
        />

        {tab === 'roster' && (
          <section className="flex flex-col gap-stack">
            <SectionHeader
              title="Apprenants assignés"
              subtitle="Statut et progression par membre de l'équipe."
              meta={`${members.length} membres`}
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
                      <span className="flex flex-col gap-tight min-w-0">
                        <span className="font-semibold text-ink-900 truncate">{m.name}</span>
                        <span className="text-caption text-ink-600 truncate">{ROLE_LABEL[m.role]}</span>
                      </span>
                    </span>
                  ),
                  progress: (
                    <span className="flex items-center gap-stack-xs min-w-[8rem]">
                      <ProgressBar value={m.progressPercent} fill="brand" size="sm" valueLabel={false} className="flex-1" />
                      <span className="tabular-nums text-ink-700 w-12 shrink-0 whitespace-nowrap text-right">{m.progressPercent}&nbsp;%</span>
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
          /* Une file de travaux : des rangées dans UNE carte, plus des cartes
             dans une carte de section. La compétence est une donnée : MetaPill. */
          <section className="flex flex-col gap-stack">
            <SectionHeader
              title="File de validation"
              subtitle="Corrections soumises, en attente de relecture."
              meta={`${pendingCorrections.length} à corriger`}
              size="md"
            />
            {pendingCorrections.length === 0 ? (
              <p className="text-body text-ink-600">Aucune correction en attente.</p>
            ) : (
              <Card className="p-0">
                <ul className="flex flex-col divide-y divide-ink-100">
                  {pendingCorrections.map((c) => {
                    const competence = c.competenceId ? getCompetenceById(c.competenceId) : null;
                    return (
                      <li key={c.id} className="flex flex-wrap items-center gap-x-stack gap-y-stack-xs px-stack-md sm:px-stack-lg py-stack-sm">
                        <ClipboardCheck className="w-5 h-5 text-secondary-700 shrink-0" aria-hidden="true" />
                        <div className="flex-1 basis-40 min-w-0 flex flex-col gap-tight">
                          <p className="text-body font-semibold text-ink-900 truncate">{c.exerciseTitle}</p>
                          <p className="text-caption text-ink-600">Soumis {formatDate(c.submittedAt)}</p>
                        </div>
                        {competence && <MetaPill text={competence.label} />}
                        <Button emphasis="soft" tone="warm" size="sm">Corriger</Button>
                      </li>
                    );
                  })}
                </ul>
              </Card>
            )}
          </section>
        )}

        {tab === 'analytics' && (
          <div className="flex flex-col gap-page">
            {/* Deux chiffres : des `StatCard`, plus des cartes faites main (libellé
                en 16/600 au-dessus d'un h2 et d'une légende ink-500). */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-stack">
              <StatCard
                icon={<TrendingUp size={20} />}
                value={`${stats.completionRate} %`}
                label="Taux de complétion"
              >
                <p className="text-caption text-ink-600">Formations actives : {stats.activeFormations}</p>
              </StatCard>
              <StatCard
                icon={<Users size={20} />}
                value={`${stats.engagementRate} %`}
                label="Taux d'engagement hebdomadaire"
              >
                <p className="text-caption text-ink-600 tabular-nums">{stats.activeMembers} / {members.length} apprenants actifs</p>
              </StatCard>
            </div>

            <section className="flex flex-col gap-stack">
              <SectionHeader title="Progression d'équipe" subtitle="Performance de chaque apprenant." size="md" />
              <Card>
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
              </Card>
            </section>

            <section className="flex flex-col gap-stack">
              <SectionHeader title="Tendance d'engagement" subtitle="Évolution hebdomadaire de l'engagement." size="md" />
              <Card>
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
                    layout="vertical"
                    showLegend
                  />
                </ChartWithExport>
              </Card>
            </section>
          </div>
        )}
      </div>
    </PageShell>
  );
};

export default CoachEnterpriseDashboard;
