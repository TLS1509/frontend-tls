import React, { useState } from 'react';
import { BarChart3, Download, RefreshCw, TrendingUp, Users, Award, Calendar } from 'lucide-react';
import { EditorialHero } from '../components/patterns/EditorialHero';
import { SectionCard } from '../components/patterns/SectionCard';
import { Card } from '../components/core/Card';
import { Button } from '../components/core/Button';
import { Badge } from '../components/ui/Badge';
import { StatCard } from '../components/ui/StatCard';
import { ProgressBar } from '../components/ui/ProgressBar';
import { FilterChip } from '../components/ui/FilterChip';
import { Tabs } from '../components/ui/Tabs';
import { DataTable } from '../components/patterns/DataTable';

// ─── Mock data ────────────────────────────────────────────────────────────────

const KPI_MAIN = [
  { value: '127', label: 'Apprenants actifs', delta: '↑ 12 ce mois', dir: 'up' as const, variant: 'brand' as const },
  { value: 'D3.1', label: 'Dreyfus moyen', delta: '↑ 0.4 ce trimestre', dir: 'up' as const, variant: 'default' as const },
  { value: '68%', label: 'Taux engagement', delta: '↑ 5% vs période précédente', dir: 'up' as const, variant: 'default' as const },
  { value: '89', label: 'Sessions coach/mois', delta: '↑ 8 vs mois dernier', dir: 'up' as const, variant: 'warm' as const },
];

const DEPARTMENTS = [
  { name: 'Product & Tech', learners: 34, avgDreyfus: 3.4, engagement: 75, badgesEarned: 87 },
  { name: 'Marketing & Sales', learners: 28, avgDreyfus: 2.9, engagement: 62, badgesEarned: 54 },
  { name: 'Finance & Ops', learners: 22, avgDreyfus: 3.1, engagement: 71, badgesEarned: 61 },
  { name: 'RH & Talent', learners: 18, avgDreyfus: 3.6, engagement: 83, badgesEarned: 72 },
  { name: 'Direction', learners: 12, avgDreyfus: 4.0, engagement: 91, badgesEarned: 48 },
  { name: 'Support Client', learners: 13, avgDreyfus: 2.6, engagement: 54, badgesEarned: 29 },
];

const TABLE_COLUMNS = [
  { key: 'name', label: 'Département', sortable: true },
  { key: 'learners', label: 'Apprenants', sortable: true },
  { key: 'avgDreyfus', label: 'Dreyfus moy.', sortable: true },
  { key: 'engagement', label: 'Engagement', sortable: true },
  { key: 'badgesEarned', label: 'Badges obtenus', sortable: true },
];

const PERIOD_OPTIONS = [
  { id: 'week', label: 'Semaine' },
  { id: 'month', label: 'Mois' },
  { id: 'quarter', label: 'Trimestre' },
  { id: 'year', label: 'Année' },
];

// ─── Component ────────────────────────────────────────────────────────────────

export default function EnterpriseAnalyticsDashboard() {
  const [activePeriod, setActivePeriod] = useState('month');
  const [activeTab, setActiveTab] = useState('kpis');

  const tableRows = DEPARTMENTS.map((d) => ({
    ...d,
    avgDreyfus: (
      <Badge variant={d.avgDreyfus >= 3.5 ? 'success' : d.avgDreyfus >= 3 ? 'info' : 'warning'} size="sm">
        D{d.avgDreyfus.toFixed(1)}
      </Badge>
    ),
    engagement: (
      <div className="flex items-center gap-2 min-w-[120px]">
        <ProgressBar value={d.engagement} fill="brand" size="sm" />
        <span className="text-caption text-ink-600 shrink-0">{d.engagement}%</span>
      </div>
    ),
  }));

  return (
    <div className="flex flex-col gap-section">
      <EditorialHero
        eyebrow="Enterprise · Analytics"
        title="Dashboard Analytics Entreprise"
        summary="Vue cross-équipes des KPIs d'engagement, de progression Dreyfus et d'utilisation des ressources coaching."
        tone="brand"
        trailing={
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="md" leadingIcon={<Download size={16} />}>
              Exporter le rapport
            </Button>
            <Button variant="glass" size="md" leadingIcon={<RefreshCw size={16} />}>
              Actualiser
            </Button>
          </div>
        }
      />

      <div className="max-w-wide mx-auto w-full px-4 md:px-8 flex flex-col gap-section">

        {/* Period filter */}
        <div className="flex flex-wrap gap-2">
          {PERIOD_OPTIONS.map((p) => (
            <FilterChip
              key={p.id}
              label={p.label}
              active={activePeriod === p.id}
              onClick={() => setActivePeriod(p.id)}
            />
          ))}
        </div>

        {/* Main KPIs */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-stack">
          {KPI_MAIN.map((kpi) => (
            <StatCard
              key={kpi.label}
              value={kpi.value}
              label={kpi.label}
              delta={kpi.delta}
              deltaDirection={kpi.dir}
              variant={kpi.variant}
              size="md"
            />
          ))}
        </div>

        {/* Tabs */}
        <Tabs
          items={[
            { id: 'kpis', label: 'KPIs globaux' },
            { id: 'departments', label: 'Par département' },
            { id: 'competences', label: 'Par compétence' },
          ]}
          value={activeTab}
          onChange={setActiveTab}
        />

        {activeTab === 'kpis' && (
          <div className="flex flex-col gap-section">

            {/* Engagement chart (simplified visual) */}
            <SectionCard title="Taux d'engagement par semaine" titleIcon={<BarChart3 size={18} />}>
              <div className="flex items-end gap-2 h-40">
                {[62, 68, 71, 65, 74, 70, 78, 68].map((val, i) => (
                  <div key={i} className="flex-1 flex flex-col items-center gap-1">
                    <div
                      className="w-full bg-primary-400 rounded-t-sm transition-all duration-slow"
                      style={{ height: `${val}%` }}
                      title={`${val}%`}
                    />
                    <span className="text-micro text-ink-400">S{i + 1}</span>
                  </div>
                ))}
              </div>
            </SectionCard>

            {/* Dreyfus progression */}
            <SectionCard title="Progression Dreyfus globale" titleIcon={<TrendingUp size={18} />}>
              <div className="flex flex-col gap-2">
                {[1, 2, 3, 4, 5].map((level) => {
                  const counts = [8, 28, 52, 31, 8];
                  const count = counts[level - 1];
                  const total = 127;
                  const pct = Math.round((count / total) * 100);
                  return (
                    <div key={level} className="flex items-center gap-stack">
                      <span className="text-caption font-semibold text-ink-600 w-8">D{level}</span>
                      <div className="flex-1">
                        <ProgressBar value={pct} fill="brand" size="sm" />
                      </div>
                      <span className="text-caption text-ink-500 w-20 text-right">{count} apprenants</span>
                    </div>
                  );
                })}
              </div>
            </SectionCard>

            {/* Other KPIs */}
            <div className="grid md:grid-cols-3 gap-stack">
              <Card variant="tinted" tone="primary" className="flex flex-col items-center justify-center py-6 gap-tight">
                <Award size={22} className="text-primary-600" />
                <span className="text-h2 font-display font-bold text-primary-700">351</span>
                <span className="text-caption text-ink-500 text-center">Badges Dreyfus obtenus</span>
              </Card>
              <Card variant="tinted" tone="primary" className="flex flex-col items-center justify-center py-6 gap-tight">
                <Calendar size={22} className="text-primary-600" />
                <span className="text-h2 font-display font-bold text-primary-700">89</span>
                <span className="text-caption text-ink-500 text-center">Sessions coaching réalisées</span>
              </Card>
              <Card variant="tinted" tone="primary" className="flex flex-col items-center justify-center py-6 gap-tight">
                <Users size={22} className="text-primary-600" />
                <span className="text-h2 font-display font-bold text-primary-700">94%</span>
                <span className="text-caption text-ink-500 text-center">Satisfaction coaching</span>
              </Card>
            </div>
          </div>
        )}

        {activeTab === 'departments' && (
          <SectionCard title="KPIs par département" titleIcon={<BarChart3 size={18} />}>
            <DataTable columns={TABLE_COLUMNS} rows={tableRows} rowKey="name" />
          </SectionCard>
        )}

        {activeTab === 'competences' && (
          <SectionCard title="Progression par compétence (toute l'entreprise)" titleIcon={<TrendingUp size={18} />}>
            <div className="flex flex-col gap-3">
              {['Leadership', 'Communication', 'Analyse', 'Tech & Outils', 'Créativité', 'Coopération'].map((comp, i) => {
                const dreyfusAvgs = [3.2, 3.5, 2.8, 3.7, 2.4, 3.1];
                const avg = dreyfusAvgs[i];
                const pct = Math.round((avg / 5) * 100);
                return (
                  <div key={comp} className="flex items-center gap-stack">
                    <span className="text-body-sm font-medium text-ink-700 w-36 shrink-0">{comp}</span>
                    <div className="flex-1">
                      <ProgressBar value={pct} fill="brand" size="md" />
                    </div>
                    <Badge
                      variant={avg >= 3.5 ? 'success' : avg >= 3 ? 'info' : 'warning'}
                      size="sm"
                    >
                      D{avg.toFixed(1)}
                    </Badge>
                  </div>
                );
              })}
            </div>
          </SectionCard>
        )}

      </div>
    </div>
  );
}
