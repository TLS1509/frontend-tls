import React, { useState } from 'react';
import { Download, ChevronRight } from 'lucide-react';
import { PageHero } from '../components/patterns/EditorialHero';
import { SectionHeader } from '../components/patterns/SectionHeader';
import { Card } from '../components/core/Card';
import { Button } from '../components/core/Button';
import { Badge } from '../components/ui/Badge';
import { StatCard } from '../components/ui/StatCard';
import { ProgressBar } from '../components/ui/ProgressBar';
import { Tabs } from '../components/ui/Tabs';
import { Alert } from '../components/ui/Alert';
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

const TABS = [
  { id: 'overview', label: 'Vue d\'ensemble' },
  { id: 'cohorts', label: 'Cohortes' },
  { id: 'budget', label: 'Budget & Licences' },
];

/* Une rangée dans une carte au padding canon : le filet entre deux rangées,
   16 px de part et d'autre, rien au-dessus de la première ni sous la dernière. */
const LIST_ROW = 'py-stack first:pt-0 last:pb-0';

const dreyfusFr = (n: number) => n.toFixed(1).replace('.', ',');

/* Budget : trois montants lus côte à côte. Libellé en légende, montant au pas
   du titre de bloc (20, League Spartan), en encre — la couleur ne dit pas
   qu'un montant est « consommé » ou « restant », le libellé le dit. */
const BUDGET = [
  { label: 'Budget annuel', value: '48\u00a0000\u00a0€' },
  { label: 'Consommé', value: '29\u00a0760\u00a0€' },
  { label: 'Restant', value: '18\u00a0240\u00a0€' },
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
    { label: 'Taux d\'engagement', value: `${stats.engagementRate}\u00a0%`, delta: '+5\u00a0%', deltaDirection: 'up' as const },
    { label: 'Formations actives', value: String(stats.activeFormations), delta: '', deltaDirection: 'up' as const },
    { label: 'Budget utilisé', value: `${stats.budgetUsedPercent}\u00a0%`, delta: '', deltaDirection: 'up' as const },
  ];

  /* Passe typographique du 2026-09-24 : le haut de page reprend le padding de
     `PageShell` (48) au lieu d'un `pt` à part ; les alertes faites main — filet
     `*-border`, un jeton qui n'existe pas, donc peint à la couleur du texte —
     prennent `Alert` ; les titres de section sont des h2 hors des cartes ; les
     projets et les cohortes deviennent des rangées dans UNE carte (arbitrage
     n°5) ; « 12 membres » n'est plus un `Badge` (une donnée, pas un état). */
  return (
    <PageShell width="wide">
      <PageHero
        eyebrow="Espace Manager"
        title="Portail entreprise"
        summary="Indicateurs globaux, suivi des cohortes, budget de formation et alertes."
        tone="flat"
        trailing={
          /* Arbitrage n°19 : un portail de consultation, sans `solid`.
             Exporter est un outil (ghost), comme « Tout voir » et « Gérer » ;
             ouvrir le détail d'une cohorte est l'action de sa rangée (soft). */
          <Button emphasis="ghost" tone="brand" size="md" leadingIcon={<Download size={16} />}>
            Exporter le rapport
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
        <div className="flex flex-col gap-stack-sm">
          {alerts.map((a) => (
            <Alert
              key={a.id}
              variant={a.severity}
              actions={
                <Button emphasis="ghost" tone="neutral" size="sm" onClick={() => enterpriseStore.acknowledgeAlert(MOCK_COMPANY_ID, a.id)}>
                  Ignorer
                </Button>
              }
            >
              {a.message}
            </Alert>
          ))}
        </div>
      )}

      {/* Les onglets et leur panneau forment un bloc : 24 px entre eux. */}
      <div className="flex flex-col gap-stack-lg">
        <Tabs items={TABS} value={activeTab} onChange={setActiveTab} variant="underline" label="Vues du portail" />

        {/* Overview tab */}
        {activeTab === 'overview' && (
          <div className="flex flex-col gap-page">
            <section className="flex flex-col gap-stack">
              <SectionHeader
                title="Projets en cours"
                meta={`${projects.length} projets`}
                action={<Button emphasis="ghost" tone="brand" size="sm">Tout voir</Button>}
              />
              <Card>
                <ul className="flex flex-col divide-y divide-ink-100" aria-label="Projets en cours">
                  {projects.map((p) => {
                    const s = STATUS_STYLE[p.status];
                    return (
                      <li key={p.id} className={`flex flex-col gap-stack-xs ${LIST_ROW}`}>
                        <div className="flex items-baseline justify-between gap-stack-xs">
                          <div className="flex flex-col gap-stack-3xs min-w-0">
                            <span className="text-body font-semibold text-ink-900">{p.title}</span>
                            <span className="text-caption text-ink-600">{p.team}</span>
                          </div>
                          <Badge variant={s.variant} size="compact" className="shrink-0">{s.label}</Badge>
                        </div>
                        <ProgressBar value={p.progressPercent} fill="brand" size="sm" layout="inline" aria-label={`Avancement de ${p.title}`} />
                      </li>
                    );
                  })}
                </ul>
              </Card>
            </section>

            <section className="flex flex-col gap-stack">
              <SectionHeader
                title="Cohortes"
                meta={`${cohorts.length} cohortes`}
                action={<Button emphasis="ghost" tone="brand" size="sm" onClick={() => setActiveTab('cohorts')}>Gérer</Button>}
              />
              <Card>
                <ul className="flex flex-col divide-y divide-ink-100" aria-label="Cohortes">
                  {cohorts.map((c) => (
                    <li key={c.id} className={`flex flex-col gap-stack-xs sm:flex-row sm:items-center sm:gap-section ${LIST_ROW}`}>
                      <div className="flex flex-col gap-stack-3xs min-w-0 sm:flex-1">
                        <span className="text-body font-semibold text-ink-900">{c.name}</span>
                        <span className="text-caption text-ink-600">
                          {c.memberCount} membres · Coach : {c.coachName ?? '–'}
                        </span>
                      </div>
                      {/* Un niveau Dreyfus se lit sur son échelle (1 à 5), pas en pourcentage. */}
                      <ProgressBar
                        value={c.avgDreyfusLevel}
                        max={5}
                        fill="brand"
                        size="sm"
                        layout="inline"
                        label="Dreyfus moyen"
                        valueLabel={`${dreyfusFr(c.avgDreyfusLevel)} / 5`}
                        className="sm:w-80 sm:shrink-0"
                      />
                    </li>
                  ))}
                </ul>
              </Card>
            </section>
          </div>
        )}

        {/* Cohorts tab */}
        {activeTab === 'cohorts' && (
          <section className="flex flex-col gap-stack">
            <SectionHeader title="Gestion des cohortes" meta={`${cohorts.length} cohortes`} />
            {/* Des rangées dans UNE carte, pas une pile de cartes (arbitrage n°5). */}
            <Card>
              <ul className="flex flex-col divide-y divide-ink-100" aria-label="Cohortes">
                {cohorts.map((c) => (
                  <li key={c.id} className={`flex items-center gap-stack ${LIST_ROW}`}>
                    <div className="flex-1 min-w-0 flex flex-col gap-stack-3xs">
                      <span className="text-body font-semibold text-ink-900">{c.name}</span>
                      <span className="text-caption text-ink-600">
                        {c.memberCount} membres · Coach : {c.coachName ?? '–'} · Dreyfus moyen {dreyfusFr(c.avgDreyfusLevel)} / 5
                      </span>
                    </div>
                    <Button emphasis="soft" tone="brand" size="sm" trailingIcon={<ChevronRight size={14} />} aria-label={`Détail de la cohorte ${c.name}`}>
                      Détail
                    </Button>
                  </li>
                ))}
              </ul>
            </Card>
          </section>
        )}

        {/* Budget tab */}
        {activeTab === 'budget' && (
          <section className="flex flex-col gap-stack">
            <SectionHeader title="Budget de formation" />
            <Card className="flex flex-col gap-stack-lg">
              {/* Trois montants côte à côte, séparés par l'espace — pas trois
                  cartes dans la carte. */}
              <dl className="grid grid-cols-1 sm:grid-cols-3 gap-stack">
                {BUDGET.map((b) => (
                  <div key={b.label} className="flex flex-col gap-stack-3xs">
                    <dt className="text-caption font-semibold text-ink-600">{b.label}</dt>
                    <dd className="font-display text-h3 text-ink-900 tabular-nums">{b.value}</dd>
                  </div>
                ))}
              </dl>
              <ProgressBar value={stats.budgetUsedPercent} fill="warm" size="lg" label="Budget consommé" />
              <div>
                <Button emphasis="ghost" tone="brand" size="sm" leadingIcon={<Download size={14} />}>
                  Exporter le rapport budget
                </Button>
              </div>
            </Card>
          </section>
        )}
      </div>
    </PageShell>
  );
}
