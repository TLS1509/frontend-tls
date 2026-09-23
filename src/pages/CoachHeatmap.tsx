import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Users, Download, RefreshCw, AlertTriangle } from 'lucide-react';
import { EditorialHero } from '../components/patterns/EditorialHero';
import { SectionCard } from '../components/patterns/SectionCard';
import { Button } from '../components/core/Button';
import { StatCard } from '../components/ui/StatCard';
import { FilterChip } from '../components/ui/FilterChip';
import { HeatmapGrid } from '../components/ui/HeatmapGrid';
import { Avatar } from '../components/ui/Avatar';
import { Badge } from '../components/ui/Badge';
import { Tabs } from '../components/ui/Tabs';
import { PageShell } from '../components/layout';
import { APPRENANTS, APPRENANT_AXES as AXES } from '../data/apprenants';

const STATUS_TABS = [
  { id: 'all', label: 'Tous' },
  { id: 'active', label: 'Actifs' },
  { id: 'stuck', label: 'En difficulté' },
  { id: 'ahead', label: 'En avance' },
];

const STATUS_BADGE: Record<string, { label: string; variant: 'neutral' | 'danger' | 'success' }> = {
  active: { label: 'Actif', variant: 'neutral' },
  stuck: { label: 'En difficulté', variant: 'danger' },
  ahead: { label: 'En avance', variant: 'success' },
};

// ─── Component ────────────────────────────────────────────────────────────────

export default function CoachHeatmap() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('all');
  const [selectedAxis, setSelectedAxis] = useState<string | null>(null);

  const filteredRows = APPRENANTS.filter((a) =>
    activeTab === 'all' ? true : a.status === activeTab
  );

  const stuckCount = APPRENANTS.filter((a) => a.status === 'stuck').length;
  const avgScore = (APPRENANTS.flatMap((a) => a.scores).filter((s) => s > 0).reduce((acc, s) => acc + s, 0) /
    APPRENANTS.flatMap((a) => a.scores).filter((s) => s > 0).length).toFixed(1);

  return (
    <PageShell width="wide" noPadTop className="pt-6 md:pt-8 lg:pt-10">
      <EditorialHero
        eyebrow="Coach · Passeport"
        title="Heatmap Compétences Équipe"
        summary="Visualisez les niveaux Dreyfus de toute votre équipe d'un seul coup d'œil. Identifiez les lacunes collectives et les apprenants en difficulté."
        tone="flat"
        trailing={
          <div className="flex items-center gap-stack-xs">
            <Button emphasis="outline" size="md" leadingIcon={<Download size={16} />}>
              Exporter
            </Button>
            <Button emphasis="soft" size="md" leadingIcon={<RefreshCw size={16} />}>
              Actualiser
            </Button>
          </div>
        }
      />

      <div className="flex flex-col gap-section">

        {/* KPI row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-stack">
          <StatCard value={APPRENANTS.length} label="Apprenants" variant="default" size="sm" />
          <StatCard value={String(avgScore)} label="Score Dreyfus moyen" variant="brand" size="sm" />
          <StatCard
            value={stuckCount}
            label="En difficulté"
            variant="warm"
            size="sm"
            delta={stuckCount > 0 ? 'Intervention recommandée' : 'RAS'}
            deltaDirection={stuckCount > 0 ? 'down' : 'up'}
          />
          <StatCard value={`${AXES.length}`} label="Compétences suivies" size="sm" />
        </div>

        {/* Alert for stuck learners */}
        {stuckCount > 0 && (
          <div className="flex items-start gap-stack p-stack bg-warning-bg border border-warning-border rounded-lg">
            <AlertTriangle size={18} className="text-warning-fg shrink-0 mt-0.5" />
            <div className="flex flex-col gap-tight">
              <p className="text-body-sm font-semibold text-warning-fg">
                {stuckCount} apprenant{stuckCount > 1 ? 's' : ''} en difficulté
              </p>
              <p className="text-caption text-ink-600">
                Pierre Bernard et Marc Lefebvre montrent des scores bas sur plusieurs axes. Une intervention est recommandée.
              </p>
            </div>
            <Button
              emphasis="outline"
              size="sm"
              className="shrink-0 ml-auto"
              onClick={() => navigate('/coach/apprenants?filter=stuck')}
            >
              Voir les profils
            </Button>
          </div>
        )}

        {/* Axis filter chips */}
        <SectionCard
          title="Heatmap Dreyfus"
          titleIcon={<Users size={18} />}
          headerAction={
            <div className="flex flex-wrap gap-stack-xs">
              {AXES.map((axis) => (
                <FilterChip
                  key={axis}
                  label={axis}
                  active={selectedAxis === axis}
                  onClick={() => setSelectedAxis(selectedAxis === axis ? null : axis)}
                />
              ))}
            </div>
          }
        >
          {/* Status filter tabs */}
          <div className="mb-stack">
            <Tabs
              items={STATUS_TABS.map((tab) => ({
                ...tab,
                badge: tab.id === 'stuck' && stuckCount > 0 ? stuckCount : undefined,
              }))}
              value={activeTab}
              onChange={setActiveTab}
              variant="underline"
            />
          </div>

          <HeatmapGrid
            axes={AXES}
            rows={filteredRows.map(({ name, initials, scores }) => ({ name, initials, scores }))}
            onCellClick={(rowIdx) => {
              const apprenant = filteredRows[rowIdx];
              navigate(`/coach/apprenant/${apprenant.id}`);
            }}
          />
        </SectionCard>

        {/* Per-apprenant status list */}
        <SectionCard title="Résumé par apprenant" titleIcon={<Users size={18} />}>
          {/* Une liste qu'on parcourt pour ouvrir un profil : des rangées dans la
              carte de section, séparées par un filet, plutôt que dix boîtes
              bordées empilées (arbitrage n°5 du 23/09). */}
          <ul className="flex flex-col divide-y divide-ink-100">
            {filteredRows.map((a) => {
              const { label, variant } = STATUS_BADGE[a.status];
              const avg = (a.scores.filter((s) => s > 0).reduce((acc, s) => acc + s, 0) /
                Math.max(a.scores.filter((s) => s > 0).length, 1)).toFixed(1).replace('.', ',');
              return (
                <li key={a.id} className="flex items-center gap-stack-sm py-stack-sm first:pt-0 last:pb-0">
                  {/* À 375 px, l'avatar coûtait sa place au nom : il n'apparaît qu'à
                      partir de sm (enveloppant — `hidden` sur l'Avatar perdrait contre
                      son `inline-flex`, piège n°6). */}
                  <span className="hidden sm:block shrink-0">
                    <Avatar initials={a.initials} name={a.name} size="sm" tint="brand" />
                  </span>
                  {/* La moyenne passe sous le nom à 375 px, à côté au-delà : la rangée
                      garde une seule ligne sur grand écran. */}
                  <div className="flex-1 min-w-0 flex flex-col sm:flex-row sm:items-center sm:justify-between sm:gap-stack">
                    <span className="text-body-sm font-medium text-ink-900 truncate">{a.name}</span>
                    <span className="text-caption text-ink-500 shrink-0">Moyenne D{avg}</span>
                  </div>
                  <Badge variant={variant} size="compact" className="shrink-0">{label}</Badge>
                  <Button
                    emphasis="outline"
                    size="sm"
                    className="shrink-0"
                    aria-label={`Profil de ${a.name}`}
                    onClick={() => navigate(`/coach/apprenant/${a.id}`)}
                  >
                    Profil
                  </Button>
                </li>
              );
            })}
          </ul>
        </SectionCard>

      </div>
    </PageShell>
  );
}
