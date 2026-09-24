import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
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
import { DataTable, type DataTableColumn } from '../components/patterns/DataTable';
import { Container } from '../components/layout';

// ─── Mock data ─────────────────────────────────────────────────────────────────

const TEAM_STATS = [
  { label: 'Membres actifs', value: '14 / 14', delta: '', deltaDirection: 'up' as const },
  { label: 'Taux complétion', value: '68%', delta: '+8%', deltaDirection: 'up' as const },
  { label: 'JAC validés', value: '73%', delta: '+3%', deltaDirection: 'up' as const },
  { label: 'Couverture compétences', value: '4/6', delta: '', deltaDirection: 'up' as const },
];

// `slug` → id apprenant (data/apprenants.ts) : ouvre la fiche réelle & validable
// via /coach/apprenant/:slug (surface partagée coach + manager).
const TEAM_MEMBERS = [
  { id: 1, slug: 'sophie-martin', name: 'Sophie Martin', role: 'Développeuse Senior', initials: 'SM', completion: 82, dreyfus: 3.2, daysSinceActivity: 2, jac: 90 },
  { id: 2, slug: 'pierre-bernard', name: 'Pierre Bernard', role: 'Chef de Projet', initials: 'PB', completion: 45, dreyfus: 2.1, daysSinceActivity: 8, jac: 55 },
  { id: 3, slug: 'nadia-ferreira', name: 'Nadia Ferreira', role: 'Lead Designer', initials: 'NF', completion: 95, dreyfus: 4.1, daysSinceActivity: 1, jac: 98 },
  { id: 4, slug: 'julien-moreau', name: 'Julien Moreau', role: 'Analyste Data', initials: 'JM', completion: 70, dreyfus: 2.8, daysSinceActivity: 95, jac: 72 },
  { id: 5, slug: 'amina-benali', name: 'Amina Benali', role: 'Consultante', initials: 'AB', completion: 60, dreyfus: 3.0, daysSinceActivity: 5, jac: 65 },
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

/* Des membres qu'on compare sur la complétion, les JAC et le niveau : une
   table triable (arbitrage n°5 du 23/09). Les valeurs de tri voyagent dans la
   rangée sous des clés que la table n'affiche pas. */
const MEMBER_COLUMNS: DataTableColumn[] = [
  { key: 'name', label: 'Membre', sortable: true, sortValue: (r) => r._name as string },
  { key: 'activity', label: 'Activité', sortable: true, sortValue: (r) => r._days as number },
  { key: 'completion', label: 'Complétion', sortable: true, sortValue: (r) => r._completion as number },
  { key: 'jac', label: 'JAC', sortable: true, align: 'right', sortValue: (r) => r._jac as number },
  { key: 'dreyfus', label: 'Dreyfus', sortable: true, align: 'right', sortValue: (r) => r._dreyfus as number },
  { key: 'action', label: 'Fiche', align: 'right' },
];

/* Rangée dans la carte : retrait 20 puis 24 px, jamais sous le rayon (20) de
   la carte — au coin, le contenu reste dans le régime « forme fixe ». */
const ROW = 'flex flex-col sm:flex-row sm:items-center gap-stack-xs sm:gap-section px-stack-md sm:px-stack-lg py-stack';

const TABS = [
  { id: 'overview', label: 'Vue d\'ensemble' },
  { id: 'members', label: 'Membres' },
  { id: 'projects', label: 'Projets' },
];

// ─── Component ────────────────────────────────────────────────────────────────

export default function ManagerCohort() {
  const [activeTab, setActiveTab] = useState('overview');
  const navigate = useNavigate();

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
                      <span className="text-caption text-ink-600 shrink-0">D{m.dreyfus.toFixed(1)}</span>
                    </div>
                  ))}
                  <Button emphasis="outline" size="sm" trailingIcon={<ChevronRight size={14} />} onClick={() => setActiveTab('members')}>
                    Voir tous les membres
                  </Button>
                </div>
              </SectionCard>

              {/* Projects */}
              <SectionCard
                title="Projets en cours"
                titleIcon={<CheckCircle2 size={20} />}
                headerAction={<Button emphasis="outline" size="sm" onClick={() => setActiveTab('projects')}>Tout voir</Button>}
              >
                {/* Dans la carte de section, les projets sont des rangées et non des
                    cartes dans la carte : un seul niveau de coque. */}
                <ul className="flex flex-col divide-y divide-ink-100" aria-label="Projets en cours">
                  {PROJECTS.map((p) => {
                    const s = PROJECT_STATUS_STYLE[p.status as keyof typeof PROJECT_STATUS_STYLE];
                    return (
                      <li key={p.id} className="flex flex-col gap-stack-xs py-stack first:pt-0 last:pb-0">
                        <div className="flex items-center justify-between gap-stack-xs">
                          <span className="text-body font-semibold text-ink-900">{p.title}</span>
                          <Badge variant={s.variant} size="compact">{s.label}</Badge>
                        </div>
                        <p className="text-caption text-ink-600">
                          {p.type} · {p.members} membres · Échéance {p.dueDate}
                        </p>
                        <ProgressBar value={p.progress} fill="brand" size="sm" showLabel label={`${p.progress}%`} />
                      </li>
                    );
                  })}
                </ul>
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
            <DataTable
              columns={MEMBER_COLUMNS}
              pageSize={Math.max(TEAM_MEMBERS.length, 1)}
              rows={TEAM_MEMBERS.map((m) => ({
                _name: m.name,
                _days: m.daysSinceActivity,
                _completion: m.completion,
                _jac: m.jac,
                _dreyfus: m.dreyfus,
                name: (
                  <span className="flex items-center gap-stack-sm min-w-0">
                    <Avatar initials={m.initials} size="sm" />
                    <span className="flex flex-col min-w-0">
                      <span className="font-semibold text-ink-900 truncate">{m.name}</span>
                      <span className="text-caption text-ink-600 truncate">{m.role}</span>
                    </span>
                  </span>
                ),
                activity: (
                  <span className="inline-flex items-center gap-stack-xs whitespace-nowrap">
                    <span className="tabular-nums text-ink-700">il y a {m.daysSinceActivity} j</span>
                    <AtrophieIndicator daysSinceActivity={m.daysSinceActivity} size="sm" showLabel={false} />
                  </span>
                ),
                completion: (
                  <span className="flex items-center gap-stack-xs min-w-[7rem]">
                    <ProgressBar value={m.completion} fill="brand" size="sm" valueLabel={false} className="flex-1" />
                    <span className="tabular-nums text-ink-700 w-9 text-right">{m.completion} %</span>
                  </span>
                ),
                jac: <span className="tabular-nums text-ink-700">{m.jac} %</span>,
                dreyfus: <span className="tabular-nums text-ink-900">{m.dreyfus.toFixed(1).replace('.', ',')}</span>,
                action: (
                  <Button
                    emphasis="outline"
                    size="sm"
                    trailingIcon={<ChevronRight size={14} />}
                    aria-label={`Fiche de ${m.name}`}
                    onClick={() => navigate(`/coach/apprenant/${m.slug}`)}
                  >
                    Fiche
                  </Button>
                ),
              }))}
            />
          </div>
        )}

        {/* Projects tab */}
        {activeTab === 'projects' && (
          <div className="flex flex-col gap-stack">
            <SectionHeader title="Projets de la cohorte" icon={<CheckCircle2 size={20} />} tone="primary" />
            {/* Des projets qu'on parcourt : des rangées dans UNE carte, pas une
                pile de cartes (arbitrage n°5 du 23/09). */}
            <Card className="p-0">
              <ul className="flex flex-col divide-y divide-ink-100" aria-label="Projets de la cohorte">
                {PROJECTS.map((p) => {
                  const s = PROJECT_STATUS_STYLE[p.status as keyof typeof PROJECT_STATUS_STYLE];
                  return (
                    <li key={p.id} className={ROW}>
                      <div className="flex-1 min-w-0 flex flex-col gap-tight">
                        <div className="flex items-center gap-stack-xs flex-wrap">
                          <span className="text-body font-semibold text-ink-900">{p.title}</span>
                          <Badge variant={s.variant} size="compact">{s.label}</Badge>
                        </div>
                        <p className="text-caption text-ink-600">{p.type} · {p.members} membres · Échéance {p.dueDate}</p>
                      </div>
                      <div className="w-full sm:w-48 shrink-0">
                        <ProgressBar value={p.progress} fill="brand" size="sm" showLabel label={`${p.progress}% complété`} />
                      </div>
                      <Button
                        emphasis="outline"
                        size="sm"
                        className="shrink-0 self-start sm:self-auto"
                        trailingIcon={<ChevronRight size={14} />}
                        aria-label={`Voir le projet : ${p.title}`}
                      >
                        Voir le projet
                      </Button>
                    </li>
                  );
                })}
              </ul>
            </Card>
          </div>
        )}

      </Container>
    </div>
  );
}
