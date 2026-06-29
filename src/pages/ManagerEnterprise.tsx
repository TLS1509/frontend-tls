import React, { useState } from 'react';
import { Building2, Users, TrendingUp, AlertTriangle, Download, Settings, ChevronRight } from 'lucide-react';
import { EditorialHero } from '../components/patterns/EditorialHero';
import { SectionCard } from '../components/patterns/SectionCard';
import { SectionHeader } from '../components/patterns/SectionHeader';
import { Card } from '../components/core/Card';
import { Button } from '../components/core/Button';
import { Badge } from '../components/ui/Badge';
import { StatCard } from '../components/ui/StatCard';
import { ProgressBar } from '../components/ui/ProgressBar';
import { Avatar } from '../components/ui/Avatar';
import { EmptyState } from '../components/ui/EmptyState';
import { Tabs } from '../components/ui/Tabs';
import { FilterChip } from '../components/ui/FilterChip';
import { AtrophieIndicator } from '../components/ui/AtrophieIndicator';
import { useEnterpriseStore } from '../stores/persistence';
import { MOCK_COMPANY_ID } from '../data/enterprise';
import { PageShell } from '../components/layout';

// ─── Component ────────────────────────────────────────────────────────────────

const STATUS_STYLE = {
  'on-track': { label: 'En bonne voie', variant: 'success' as const },
  'at-risk': { label: 'À risque', variant: 'danger' as const },
  'delayed': { label: 'En retard', variant: 'danger' as const },
  'completed': { label: 'Terminé', variant: 'neutral' as const },
};

const SEVERITY_STYLE = {
  info: 'bg-info-bg text-info-fg border-info-border',
  warning: 'bg-warning-bg text-warning-fg border-warning-border',
  danger: 'bg-danger-bg text-danger-fg border-danger-border',
};

const TABS = [
  { id: 'overview', label: 'Vue d\'ensemble' },
  { id: 'cohorts', label: 'Cohortes' },
  { id: 'budget', label: 'Budget & Licences' },
];

export default function ManagerEnterprise() {
  const [activeTab, setActiveTab] = useState('overview');

  const enterpriseStore = useEnterpriseStore();
  const stats = enterpriseStore.getStats(MOCK_COMPANY_ID);
  const alerts = enterpriseStore.getAlerts(MOCK_COMPANY_ID).filter((a) => !a.acknowledged);
  const projects = enterpriseStore.getProjects(MOCK_COMPANY_ID);
  const cohorts = enterpriseStore.getCohorts(MOCK_COMPANY_ID);

  const COMPANY_STATS = [
    { label: 'Collaborateurs actifs', value: String(stats.activeMembers), delta: '+3', deltaDirection: 'up' as const },
    { label: 'Taux d\'engagement', value: `${stats.engagementRate}%`, delta: '+5%', deltaDirection: 'up' as const },
    { label: 'Formations actives', value: String(stats.activeFormations), delta: '', deltaDirection: 'up' as const },
    { label: 'Budget utilisé', value: `${stats.budgetUsedPercent}%`, delta: '', deltaDirection: 'up' as const },
  ];

  return (
    <PageShell width="wide" noPadTop={true}>
      <EditorialHero
        eyebrow="Espace Manager"
        title="Portail Entreprise"
        summary="KPIs globaux, suivi des cohortes, gestion du budget formation et alertes en temps réel."
        tone="flat"
        trailing={
          <Button variant="glass" size="md" leadingIcon={<Download size={16} />}>
            Exporter rapport
          </Button>
        }
      />

        {/* Enterprise KPIs */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-stack">
          {COMPANY_STATS.map((s, i) => (
            <StatCard
              key={i}
              label={s.label}
              value={s.value}
              delta={s.delta || undefined}
              deltaDirection={s.deltaDirection}
              size="sm"
            />
          ))}
        </div>

        {/* Alerts */}
        {alerts.length > 0 && (
          <div className="flex flex-col gap-stack-xs">
            {alerts.map((a) => (
              <div
                key={a.id}
                className={`flex items-center gap-stack-xs p-3 rounded-lg border ${SEVERITY_STYLE[a.severity]}`}
              >
                <AlertTriangle size={16} className="shrink-0" />
                <span className="text-body-sm flex-1">{a.message}</span>
                <Button variant="ghost" size="sm" onClick={() => enterpriseStore.acknowledgeAlert(MOCK_COMPANY_ID, a.id)}>
                  Ignorer
                </Button>
              </div>
            ))}
          </div>
        )}

        <Tabs items={TABS} value={activeTab} onChange={setActiveTab} variant="underline" />

        {/* Overview tab */}
        {activeTab === 'overview' && (
          <div className="flex flex-col gap-section">

            <SectionCard
              title="Top projets en cours"
              titleIcon={<TrendingUp size={20} />}
              headerAction={<Button variant="ghost" size="sm">Tout voir</Button>}
            >
              <div className="flex flex-col gap-stack">
                {projects.map((p) => {
                  const s = STATUS_STYLE[p.status];
                  return (
                    <Card key={p.id} className="p-stack flex flex-col gap-stack-xs">
                      <div className="flex items-center justify-between gap-stack-xs">
                        <div className="flex flex-col gap-0.5">
                          <span className="text-body-sm font-semibold text-ink-900">{p.title}</span>
                          <span className="text-caption text-ink-400">{p.team}</span>
                        </div>
                        <Badge variant={s.variant} size="sm">{s.label}</Badge>
                      </div>
                      <ProgressBar value={p.progressPercent} fill="brand" size="sm" showLabel label={`${p.progressPercent}%`} />
                    </Card>
                  );
                })}
              </div>
            </SectionCard>

            <SectionCard
              title="Résumé cohortes"
              titleIcon={<Users size={20} />}
              headerAction={<Button variant="ghost" size="sm" onClick={() => setActiveTab('cohorts')}>Gérer</Button>}
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-stack">
                {cohorts.map((c) => (
                  <Card key={c.id} className="p-stack flex flex-col gap-stack-xs">
                    <div className="flex items-center justify-between gap-stack-xs">
                      <span className="text-body-sm font-semibold text-ink-900">{c.name}</span>
                      <span className="text-caption text-ink-400">{c.memberCount} membres</span>
                    </div>
                    <div className="flex items-center gap-stack-xs text-caption text-ink-500">
                      <span>Dreyfus moy. : <strong className="text-ink-800">{c.avgDreyfusLevel}</strong></span>
                      <span>·</span>
                      <span>Coach : {c.coachName ?? '–'}</span>
                    </div>
                    <ProgressBar value={(c.avgDreyfusLevel / 5) * 100} fill="brand" size="sm" />
                  </Card>
                ))}
              </div>
            </SectionCard>
          </div>
        )}

        {/* Cohorts tab */}
        {activeTab === 'cohorts' && (
          <div className="flex flex-col gap-stack">
            <SectionHeader title="Gestion des cohortes" icon={<Users size={20} />} tone="primary" />
            {cohorts.map((c) => (
              <Card key={c.id} className="p-stack flex items-center gap-stack">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-stack-xs mb-1">
                    <span className="text-body-sm font-semibold text-ink-900">{c.name}</span>
                    <Badge variant="neutral" size="sm">{c.memberCount} membres</Badge>
                  </div>
                  <div className="text-caption text-ink-400">Coach : {c.coachName ?? '–'} · Dreyfus moy. {c.avgDreyfusLevel}/5</div>
                </div>
                <Button variant="brand-ghost" size="sm" trailingIcon={<ChevronRight size={14} />}>
                  Détail
                </Button>
              </Card>
            ))}
          </div>
        )}

        {/* Budget tab */}
        {activeTab === 'budget' && (
          <div className="flex flex-col gap-section">
            <SectionCard title="Budget Formation" titleIcon={<Building2 size={20} />}>
              <div className="flex flex-col gap-section">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-stack">
                  <Card className="p-stack flex flex-col gap-stack-xs">
                    <p className="text-caption text-ink-500">Budget annuel</p>
                    <p className="text-h3 font-display font-bold text-ink-900">48 000 €</p>
                  </Card>
                  <Card className="p-stack flex flex-col gap-stack-xs">
                    <p className="text-caption text-ink-500">Consommé</p>
                    <p className="text-h3 font-display font-bold text-secondary-600">29 760 €</p>
                  </Card>
                  <Card className="p-stack flex flex-col gap-stack-xs">
                    <p className="text-caption text-ink-500">Restant</p>
                    <p className="text-h3 font-display font-bold text-success-fg">18 240 €</p>
                  </Card>
                </div>
                <ProgressBar value={stats.budgetUsedPercent} fill="warm" size="lg" showLabel label={`${stats.budgetUsedPercent}% consommé`} />
                <Button variant="brand-ghost" size="sm" leadingIcon={<Download size={14} />}>
                  Exporter rapport budget
                </Button>
              </div>
            </SectionCard>
          </div>
        )}
    </PageShell>
  );
}
