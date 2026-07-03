import React, { useState } from 'react';
import { Users, BarChart3, CheckCircle2, AlertTriangle, ChevronRight } from 'lucide-react';
import { EditorialHero } from '../components/patterns/EditorialHero';
import { SectionCard } from '../components/patterns/SectionCard';
import { SectionHeader } from '../components/patterns/SectionHeader';
import { Card } from '../components/core/Card';
import { Button } from '../components/core/Button';
import { Badge } from '../components/ui/Badge';
import { StatCard } from '../components/ui/StatCard';
import { ProgressBar } from '../components/ui/ProgressBar';
import { Avatar } from '../components/ui/Avatar';
import { Tabs } from '../components/ui/Tabs';
import { CompetencyRadar } from '../components/ui/CompetencyRadar';
import { AtrophieIndicator } from '../components/ui/AtrophieIndicator';
import { Container } from '../components/layout';

// ─── Mock data ─────────────────────────────────────────────────────────────────

const TEAM_STATS = [
  { label: 'Membres actifs', value: '14 / 14', delta: '', deltaDirection: 'up' as const },
  { label: 'Taux complétion', value: '68%', delta: '+8%', deltaDirection: 'up' as const },
  { label: 'JAC validés', value: '73%', delta: '+3%', deltaDirection: 'up' as const },
  { label: 'Couverture compétences', value: '4/6', delta: '', deltaDirection: 'up' as const },
];

const TEAM_MEMBERS = [
  { id: 1, name: 'Sophie Martin', role: 'Développeuse Senior', initials: 'SM', completion: 82, dreyfus: 3.2, daysSinceActivity: 2, jac: 90 },
  { id: 2, name: 'Pierre Bernard', role: 'Chef de Projet', initials: 'PB', completion: 45, dreyfus: 2.1, daysSinceActivity: 8, jac: 55 },
  { id: 3, name: 'Nadia Ferreira', role: 'Lead Designer', initials: 'NF', completion: 95, dreyfus: 4.1, daysSinceActivity: 1, jac: 98 },
  { id: 4, name: 'Julien Moreau', role: 'Analyste Data', initials: 'JM', completion: 70, dreyfus: 2.8, daysSinceActivity: 95, jac: 72 },
  { id: 5, name: 'Amina Benali', role: 'Consultante', initials: 'AB', completion: 60, dreyfus: 3.0, daysSinceActivity: 5, jac: 65 },
];

const PROJECTS = [
  { id: 1, title: 'Montée en compétences Leadership', type: 'Formation', progress: 74, members: 6, dueDate: '2026-09-01', status: 'on-track' },
  { id: 2, title: 'Certification Data Analyse', type: 'Certification', progress: 48, members: 4, dueDate: '2026-07-15', status: 'at-risk' },
  { id: 3, title: 'Projet Final : Communication', type: 'Projet', progress: 90, members: 3, dueDate: '2026-06-01', status: 'on-track' },
];

// Team radar (aggregate)
const TEAM_RADAR = [
  { label: 'Leadership', current: 3.0, target: 4 },
  { label: 'Communication', current: 3.5, target: 4 },
  { label: 'Analyse', current: 2.5, target: 4 },
  { label: 'Tech & Outils', current: 3.2, target: 4 },
  { label: 'Créativité', current: 2.0, target: 3 },
  { label: 'Coopération', current: 3.3, target: 4 },
];

const PROJECT_STATUS_STYLE = {
  'on-track': { label: 'En bonne voie', variant: 'success' as const },
  'at-risk': { label: 'À risque', variant: 'danger' as const },
};

const TABS = [
  { id: 'overview', label: 'Vue d\'ensemble' },
  { id: 'members', label: 'Membres' },
  { id: 'projects', label: 'Projets' },
];

// ─── Component ────────────────────────────────────────────────────────────────

export default function ManagerCohort() {
  const [activeTab, setActiveTab] = useState('overview');

  return (
    <div className="flex flex-col gap-section">
      <EditorialHero
        eyebrow="Espace Manager · Équipe Tech"
        title="Dashboard Cohorte"
        summary="Progression de l'équipe, suivi des projets, performance JAC et couverture des compétences."
        tone="flat"
      />

      <Container width="wide" padding={false} className="px-stack md:px-section flex flex-col gap-section">

        {/* Team KPIs */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-stack">
          {TEAM_STATS.map((s, i) => (
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

        <Tabs items={TABS} value={activeTab} onChange={setActiveTab} variant="underline" />

        {/* Overview tab */}
        {activeTab === 'overview' && (
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-section items-start">
            <div className="flex flex-col gap-section">
              {/* Recent activity */}
              <SectionCard
                title="Performance équipe"
                titleIcon={<BarChart3 size={20} />}
              >
                <div className="flex flex-col gap-stack">
                  {TEAM_MEMBERS.slice(0, 3).map((m) => (
                    <div key={m.id} className="flex items-center gap-stack-xs">
                      <Avatar initials={m.initials} size="sm" />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-stack-xs mb-1">
                          <span className="text-caption font-semibold text-ink-800">{m.name}</span>
                          <AtrophieIndicator daysSinceActivity={m.daysSinceActivity} size="sm" showLabel={false} />
                        </div>
                        <ProgressBar value={m.completion} fill="brand" size="sm" showLabel label={`${m.completion}%`} />
                      </div>
                      <span className="text-caption text-ink-400 shrink-0">D{m.dreyfus.toFixed(1)}</span>
                    </div>
                  ))}
                  <Button variant="ghost" size="sm" trailingIcon={<ChevronRight size={14} />} onClick={() => setActiveTab('members')}>
                    Voir tous les membres
                  </Button>
                </div>
              </SectionCard>

              {/* Projects */}
              <SectionCard
                title="Projets en cours"
                titleIcon={<CheckCircle2 size={20} />}
                headerAction={<Button variant="ghost" size="sm" onClick={() => setActiveTab('projects')}>Tout voir</Button>}
              >
                <div className="flex flex-col gap-stack">
                  {PROJECTS.map((p) => {
                    const s = PROJECT_STATUS_STYLE[p.status as keyof typeof PROJECT_STATUS_STYLE];
                    return (
                      <Card key={p.id} className="p-3 flex flex-col gap-stack-xs">
                        <div className="flex items-center justify-between gap-stack-xs">
                          <span className="text-body-sm font-semibold text-ink-900">{p.title}</span>
                          <Badge variant={s.variant} size="sm">{s.label}</Badge>
                        </div>
                        <div className="flex gap-stack-xs text-caption text-ink-400">
                          <span>{p.type}</span>
                          <span>·</span>
                          <span>{p.members} membres</span>
                          <span>·</span>
                          <span>Échéance {p.dueDate}</span>
                        </div>
                        <ProgressBar value={p.progress} fill="brand" size="sm" showLabel label={`${p.progress}%`} />
                      </Card>
                    );
                  })}
                </div>
              </SectionCard>
            </div>

            {/* Team radar */}
            <div className="sticky top-4">
              <SectionCard
                title="Radar équipe"
                description="Moyenne Dreyfus · 14 membres"
              >
                <CompetencyRadar axes={TEAM_RADAR} size="sm" showLegend />
              </SectionCard>
            </div>
          </div>
        )}

        {/* Members tab */}
        {activeTab === 'members' && (
          <div className="flex flex-col gap-stack">
            <SectionHeader title="Membres de la cohorte" subtitle={`${TEAM_MEMBERS.length} membres · Équipe Tech`} icon={<Users size={20} />} tone="primary" />
            {TEAM_MEMBERS.map((m) => (
              <Card key={m.id} className="p-stack flex items-start gap-stack">
                <Avatar initials={m.initials} size="md" />
                <div className="flex-1 min-w-0 flex flex-col gap-stack-xs">
                  <div className="flex items-center gap-stack-xs flex-wrap">
                    <span className="text-body-sm font-semibold text-ink-900">{m.name}</span>
                    <span className="text-caption text-ink-400">{m.role}</span>
                    <AtrophieIndicator daysSinceActivity={m.daysSinceActivity} size="sm" showLabel />
                  </div>
                  <div className="grid grid-cols-3 gap-stack-xs text-caption text-ink-500">
                    <span>Complétion : <strong className="text-ink-800">{m.completion}%</strong></span>
                    <span>JAC : <strong className="text-ink-800">{m.jac}%</strong></span>
                    <span>Dreyfus : <strong className="text-ink-800">{m.dreyfus}</strong></span>
                  </div>
                  <ProgressBar value={m.completion} fill="brand" size="sm" />
                </div>
                <Button variant="ghost" size="sm" trailingIcon={<ChevronRight size={14} />}>
                  Fiche
                </Button>
              </Card>
            ))}
          </div>
        )}

        {/* Projects tab */}
        {activeTab === 'projects' && (
          <div className="flex flex-col gap-stack">
            <SectionHeader title="Projets de la cohorte" icon={<CheckCircle2 size={20} />} tone="primary" />
            {PROJECTS.map((p) => {
              const s = PROJECT_STATUS_STYLE[p.status as keyof typeof PROJECT_STATUS_STYLE];
              return (
                <Card key={p.id} className="p-stack flex flex-col gap-stack-xs">
                  <div className="flex items-center justify-between gap-stack-xs">
                    <div>
                      <p className="text-body-sm font-semibold text-ink-900">{p.title}</p>
                      <p className="text-caption text-ink-400">{p.type} · {p.members} membres · Échéance {p.dueDate}</p>
                    </div>
                    <Badge variant={s.variant} size="sm">{s.label}</Badge>
                  </div>
                  <ProgressBar value={p.progress} fill="brand" size="md" showLabel label={`${p.progress}% complété`} />
                  <div className="flex justify-end">
                    <Button variant="brand-ghost" size="sm" trailingIcon={<ChevronRight size={14} />}>
                      Voir le projet
                    </Button>
                  </div>
                </Card>
              );
            })}
          </div>
        )}

      </Container>
    </div>
  );
}
