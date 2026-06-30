import React, { useState } from 'react';
import { BarChart3, TrendingUp, Download, Settings } from 'lucide-react';
import { EditorialHero } from '../components/patterns/EditorialHero';
import { SectionCard } from '../components/patterns/SectionCard';
import { DataTable } from '../components/patterns/DataTable';
import { Card } from '../components/core/Card';
import { Button } from '../components/core/Button';
import { Badge } from '../components/ui/Badge';
import { StatCard } from '../components/ui/StatCard';
import { ProgressBar } from '../components/ui/ProgressBar';
import { FilterChip } from '../components/ui/FilterChip';
import { Tabs } from '../components/ui/Tabs';
import { PageShell } from '../components/layout';

// ─── Mock data ────────────────────────────────────────────────────────────────

const PERIOD_OPTIONS = [
  { id: 'week', label: 'Semaine' },
  { id: 'month', label: 'Mois' },
  { id: 'quarter', label: 'Trimestre' },
  { id: 'year', label: 'Année' },
];

const DEPT_OPTIONS = [
  { id: 'all', label: 'Tous' },
  { id: 'product', label: 'Product & Tech' },
  { id: 'marketing', label: 'Marketing' },
  { id: 'finance', label: 'Finance' },
  { id: 'rh', label: 'RH' },
  { id: 'direction', label: 'Direction' },
];

const TAB_ITEMS = [
  { id: 'dept', label: 'Par département' },
  { id: 'comp', label: 'Par compétence' },
  { id: 'trends', label: 'Tendances' },
];

const MAIN_KPIS = [
  {
    value: '340',
    sub: '%',
    label: 'ROI Formation',
    delta: '↑ 12%',
    deltaDirection: 'up' as const,
    variant: 'brand' as const,
  },
  {
    value: '€1 240',
    label: 'Coût / Apprenant',
    delta: '↓ 8%',
    deltaDirection: 'down' as const,
    variant: 'default' as const,
  },
  {
    value: '72',
    label: 'NPS Plateforme',
    delta: '↑ 4 pts',
    deltaDirection: 'up' as const,
    variant: 'default' as const,
  },
  {
    value: '47',
    label: 'Certifications Dreyfus',
    delta: '↑ 9 ce trimestre',
    deltaDirection: 'up' as const,
    variant: 'brand' as const,
  },
  {
    value: '1 840',
    sub: 'h',
    label: 'Heures formation',
    delta: '↑ 15%',
    deltaDirection: 'up' as const,
    variant: 'default' as const,
  },
  {
    value: '91',
    sub: '%',
    label: 'Rétention post-formation',
    delta: '↑ 3%',
    deltaDirection: 'up' as const,
    variant: 'warm' as const,
  },
];

const DEPARTMENTS = [
  { name: 'Product & Tech', learners: 34, avgDreyfusRaw: 3.4, engagement: 75, roi: '380%' },
  { name: 'Marketing', learners: 28, avgDreyfusRaw: 2.9, engagement: 62, roi: '310%' },
  { name: 'Finance', learners: 22, avgDreyfusRaw: 3.1, engagement: 71, roi: '350%' },
  { name: 'RH', learners: 18, avgDreyfusRaw: 3.6, engagement: 83, roi: '420%' },
  { name: 'Direction', learners: 12, avgDreyfusRaw: 4.0, engagement: 91, roi: '520%' },
  { name: 'Support', learners: 13, avgDreyfusRaw: 2.6, engagement: 54, roi: '260%' },
];

const TABLE_COLUMNS = [
  { key: 'name', label: 'Département', sortable: true },
  { key: 'learners', label: 'Apprenants', sortable: true, align: 'center' as const },
  { key: 'avgDreyfus', label: 'Dreyfus moy.', sortable: false, align: 'center' as const },
  { key: 'engagement', label: 'Engagement', sortable: true, width: '180px' },
  { key: 'roi', label: 'ROI', sortable: true, align: 'right' as const },
];

const COMPETENCES = [
  { label: 'Leadership', pct: 64, dreyfus: 3.2, badge: 'info' as const },
  { label: 'Communication', pct: 70, dreyfus: 3.5, badge: 'success' as const },
  { label: 'Analyse', pct: 56, dreyfus: 2.8, badge: 'danger' as const },
  { label: 'Tech & Digital', pct: 74, dreyfus: 3.7, badge: 'success' as const },
  { label: 'Créativité', pct: 48, dreyfus: 2.4, badge: 'danger' as const },
  { label: 'Coopération', pct: 62, dreyfus: 3.1, badge: 'info' as const },
];

const ENGAGEMENT_TREND = [58, 62, 65, 68, 71, 68];

// ─── Component ────────────────────────────────────────────────────────────────

export default function EnterpriseKpis() {
  const [activePeriod, setActivePeriod] = useState('month');
  const [activeDept, setActiveDept] = useState('all');
  const [activeTab, setActiveTab] = useState('dept');

  const maxTrend = Math.max(...ENGAGEMENT_TREND);

  const tableRows = DEPARTMENTS.map((d) => ({
    name: d.name,
    learners: d.learners,
    avgDreyfus: (
      <Badge
        variant={d.avgDreyfusRaw >= 3.5 ? 'success' : d.avgDreyfusRaw >= 3.0 ? 'info' : 'danger'}
        size="sm"
      >
        D{d.avgDreyfusRaw.toFixed(1)}
      </Badge>
    ),
    engagement: (
      <div className="flex items-center gap-stack-xs min-w-28">
        <ProgressBar value={d.engagement} fill="brand" size="sm" valueLabel={false} className="flex-1" />
        <span className="text-caption text-ink-600 tabular-nums shrink-0">{d.engagement}%</span>
      </div>
    ),
    roi: (
      <span className="font-display text-body-sm font-bold text-success-fg">{d.roi}</span>
    ),
  }));

  return (
    <PageShell width="wide" noPadTop className="pt-6 md:pt-8 lg:pt-10">
      {/* Hero */}
      <EditorialHero
        eyebrow={{ label: 'Enterprise · KPIs' }}
        title="KPIs Détaillés"
        summary="Vue granulaire des indicateurs de performance par département, compétence et période."
        tone="flat"
        trailing={
          <div className="flex flex-wrap gap-stack-xs">
            <Button
              variant="ghost"
              size="md"
              leadingIcon={<Download size={16} />}
            >
              Exporter
            </Button>
            <Button
              variant="glass"
              size="md"
              leadingIcon={<Settings size={16} />}
            >
              Configurer
            </Button>
          </div>
        }
      />

      <div className="flex flex-col gap-section">

        {/* Period filter */}
        <div className="flex flex-wrap gap-stack-xs">
          {PERIOD_OPTIONS.map((p) => (
            <FilterChip
              key={p.id}
              label={p.label}
              active={activePeriod === p.id}
              onClick={() => setActivePeriod(p.id)}
            />
          ))}
        </div>

        {/* Department filter */}
        <div className="flex flex-wrap gap-stack-xs">
          {DEPT_OPTIONS.map((d) => (
            <FilterChip
              key={d.id}
              label={d.label}
              active={activeDept === d.id}
              onClick={() => setActiveDept(d.id)}
            />
          ))}
        </div>

        {/* Main KPI grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-stack">
          {MAIN_KPIS.map((kpi) => (
            <StatCard
              key={kpi.label}
              value={kpi.value}
              sub={kpi.sub}
              label={kpi.label}
              delta={kpi.delta}
              deltaDirection={kpi.deltaDirection}
              variant={kpi.variant}
              size="md"
            />
          ))}
        </div>

        {/* Tabs */}
        <Tabs
          items={TAB_ITEMS}
          value={activeTab}
          onChange={setActiveTab}
          variant="underline"
        />

        {/* Tab : Par département */}
        {activeTab === 'dept' && (
          <div className="flex flex-col gap-section">
            <SectionCard
              title="Progression Dreyfus par département"
              titleIcon={<BarChart3 size={18} className="text-primary-600" />}
            >
              <DataTable
                columns={TABLE_COLUMNS}
                rows={tableRows}
                pageSize={10}
              />
            </SectionCard>
          </div>
        )}

        {/* Tab : Par compétence */}
        {activeTab === 'comp' && (
          <div className="flex flex-col gap-section">
            <SectionCard
              title="Maîtrise par compétence (entreprise)"
              titleIcon={<TrendingUp size={18} className="text-primary-600" />}
            >
              <div className="flex flex-col gap-stack">
                {COMPETENCES.map((c) => (
                  <div key={c.label} className="flex items-center gap-stack">
                    <span className="w-36 shrink-0 text-body-sm font-semibold text-ink-700">
                      {c.label}
                    </span>
                    <div className="flex-1">
                      <ProgressBar value={c.pct} fill="brand" size="sm" valueLabel={false} />
                    </div>
                    <Badge variant={c.badge} size="sm">
                      D{c.dreyfus.toFixed(1)}
                    </Badge>
                  </div>
                ))}
              </div>
            </SectionCard>
          </div>
        )}

        {/* Tab : Tendances */}
        {activeTab === 'trends' && (
          <div className="flex flex-col gap-section">
            <SectionCard
              title="Évolution mensuelle (6 mois)"
              titleIcon={<TrendingUp size={18} className="text-primary-600" />}
            >
              <div className="flex flex-col gap-section">
                {/* Bar chart */}
                <div className="flex items-end gap-stack-xs h-32 pt-2">
                  {ENGAGEMENT_TREND.map((val, i) => (
                    <div key={i} className="flex flex-col items-center gap-tight flex-1 min-w-0">
                      <span className="text-micro text-ink-500 font-medium tabular-nums">{val}%</span>
                      <div
                        className="w-full rounded-t-sm bg-gradient-to-t from-primary-700 to-primary-400 transition-all duration-slow"
                        style={{ height: `${(val / maxTrend) * 80}px` }}
                      />
                      <span className="text-micro text-ink-400 font-medium">M{i + 1}</span>
                    </div>
                  ))}
                </div>

                {/* Summary card */}
                <Card variant="tinted" tone="brand" className="p-stack">
                  <div className="flex flex-col sm:flex-row gap-stack sm:items-center">
                    <div className="flex items-center gap-stack-xs">
                      <TrendingUp size={18} className="text-primary-600 shrink-0" />
                      <span className="text-body-sm font-bold text-ink-900">
                        +10% engagement sur 6 mois
                      </span>
                    </div>
                    <div className="hidden sm:block w-px h-4 bg-ink-200 shrink-0" />
                    <div className="flex items-center gap-stack-xs">
                      <TrendingUp size={18} className="text-primary-600 shrink-0" />
                      <span className="text-body-sm font-bold text-ink-900">
                        +0.4 Dreyfus moyen sur la période
                      </span>
                    </div>
                  </div>
                </Card>
              </div>
            </SectionCard>
          </div>
        )}

      </div>
    </PageShell>
  );
}
