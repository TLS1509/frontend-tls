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

// ─── Mock data ─────────────────────────────────────────────────────────────────

const COMPANY_STATS = [
  { label: 'Collaborateurs actifs', value: '47', delta: '+3', deltaDirection: 'up' as const },
  { label: 'Taux d\'engagement', value: '78%', delta: '+5%', deltaDirection: 'up' as const },
  { label: 'Formations actives', value: '12', delta: '', deltaDirection: 'up' as const },
  { label: 'Budget utilisé', value: '62%', delta: '', deltaDirection: 'up' as const },
];

const TOP_PROJECTS = [
  { title: 'Programme Leadership 2026', team: 'Direction', progress: 74, status: 'on-track' },
  { title: 'Montée en compétences Data', team: 'Tech', progress: 48, status: 'at-risk' },
  { title: 'Onboarding Q2 2026', team: 'RH', progress: 90, status: 'on-track' },
];

const ALERTS = [
  { id: 1, type: 'atrophie', message: '3 collaborateurs inactifs depuis +90 jours', severity: 'warning' },
  { id: 2, type: 'budget', message: 'Budget coaching à 80% de consommation', severity: 'warning' },
  { id: 3, type: 'deadline', message: 'Certification "Leadership D4" échéance dans 14j', severity: 'danger' },
];

const COHORTS = [
  { name: 'Direction Générale', count: 6, avg: 3.8, coach: 'Marie L.' },
  { name: 'Équipe Tech', count: 14, avg: 3.2, coach: 'Thomas D.' },
  { name: 'Équipe Commerciale', count: 18, avg: 2.9, coach: 'Amina B.' },
  { name: 'Support & Ops', count: 9, avg: 2.5, coach: 'Paul M.' },
];

const STATUS_STYLE = {
  'on-track': { label: 'En bonne voie', variant: 'success' as const },
  'at-risk': { label: 'À risque', variant: 'danger' as const },
};

const SEVERITY_STYLE = {
  warning: 'bg-warning-bg text-warning-fg border-warning-border',
  danger: 'bg-danger-bg text-danger-fg border-danger-border',
};

const TABS = [
  { id: 'overview', label: 'Vue d\'ensemble' },
  { id: 'cohorts', label: 'Cohortes' },
  { id: 'budget', label: 'Budget & Licences' },
];

// ─── Component ────────────────────────────────────────────────────────────────

export default function ManagerEnterprise() {
  const [activeTab, setActiveTab] = useState('overview');

  return (
    <div className="flex flex-col gap-section">
      <EditorialHero
        eyebrow="Espace Manager"
        title="Portail Entreprise"
        summary="KPIs globaux, suivi des cohortes, gestion du budget formation et alertes en temps réel."
        tone="default"
        trailing={
          <Button variant="glass" size="md" leadingIcon={<Download size={16} />}>
            Exporter rapport
          </Button>
        }
      />

      <div className="max-w-wide mx-auto w-full px-4 md:px-8 flex flex-col gap-section">

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
        {ALERTS.length > 0 && (
          <div className="flex flex-col gap-2">
            {ALERTS.map((a) => (
              <div
                key={a.id}
                className={`flex items-center gap-3 p-3 rounded-lg border ${SEVERITY_STYLE[a.severity as keyof typeof SEVERITY_STYLE]}`}
              >
                <AlertTriangle size={16} className="shrink-0" />
                <span className="text-body-sm flex-1">{a.message}</span>
                <Button variant="ghost" size="sm">Voir</Button>
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
                {TOP_PROJECTS.map((p, i) => {
                  const s = STATUS_STYLE[p.status as keyof typeof STATUS_STYLE];
                  return (
                    <Card key={i} className="p-4 flex flex-col gap-2">
                      <div className="flex items-center justify-between gap-2">
                        <div className="flex flex-col gap-0.5">
                          <span className="text-body-sm font-semibold text-ink-900">{p.title}</span>
                          <span className="text-caption text-ink-400">{p.team}</span>
                        </div>
                        <Badge variant={s.variant} size="sm">{s.label}</Badge>
                      </div>
                      <ProgressBar value={p.progress} fill="brand" size="sm" showLabel label={`${p.progress}%`} />
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
                {COHORTS.map((c, i) => (
                  <Card key={i} className="p-4 flex flex-col gap-2">
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-body-sm font-semibold text-ink-900">{c.name}</span>
                      <span className="text-caption text-ink-400">{c.count} membres</span>
                    </div>
                    <div className="flex items-center gap-2 text-caption text-ink-500">
                      <span>Dreyfus moy. : <strong className="text-ink-800">{c.avg}</strong></span>
                      <span>·</span>
                      <span>Coach : {c.coach}</span>
                    </div>
                    <ProgressBar value={(c.avg / 5) * 100} fill="brand" size="sm" />
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
            {COHORTS.map((c, i) => (
              <Card key={i} className="p-4 flex items-center gap-4">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-body-sm font-semibold text-ink-900">{c.name}</span>
                    <Badge variant="neutral" size="sm">{c.count} membres</Badge>
                  </div>
                  <div className="text-caption text-ink-400">Coach : {c.coach} · Dreyfus moy. {c.avg}/5</div>
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
                  <Card className="p-4 flex flex-col gap-2">
                    <p className="text-caption text-ink-500">Budget annuel</p>
                    <p className="text-h3 font-display font-bold text-ink-900">48 000 €</p>
                  </Card>
                  <Card className="p-4 flex flex-col gap-2">
                    <p className="text-caption text-ink-500">Consommé</p>
                    <p className="text-h3 font-display font-bold text-secondary-600">29 760 €</p>
                  </Card>
                  <Card className="p-4 flex flex-col gap-2">
                    <p className="text-caption text-ink-500">Restant</p>
                    <p className="text-h3 font-display font-bold text-success-fg">18 240 €</p>
                  </Card>
                </div>
                <ProgressBar value={62} fill="warm" size="lg" showLabel label="62% consommé" />
                <Button variant="brand-ghost" size="sm" leadingIcon={<Download size={14} />}>
                  Exporter rapport budget
                </Button>
              </div>
            </SectionCard>
          </div>
        )}

      </div>
    </div>
  );
}
