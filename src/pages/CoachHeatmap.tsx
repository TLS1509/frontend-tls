import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Users, Download, RefreshCw, AlertTriangle } from 'lucide-react';
import { EditorialHero } from '../components/patterns/EditorialHero';
import { SectionCard } from '../components/patterns/SectionCard';
import { Button } from '../components/core/Button';
import { StatCard } from '../components/ui/StatCard';
import { FilterChip } from '../components/ui/FilterChip';
import { HeatmapGrid } from '../components/ui/HeatmapGrid';
import { Badge } from '../components/ui/Badge';
import { Container } from '../components/layout';
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
    <div className="flex flex-col gap-section">
      <EditorialHero
        eyebrow="Coach · Passeport"
        title="Heatmap Compétences Équipe"
        summary="Visualise les niveaux Dreyfus de toute ton équipe d'un seul coup d'œil. Identifie les lacunes collectives et les apprenants en difficulté."
        tone="default"
        trailing={
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="md" leadingIcon={<Download size={16} />}>
              Exporter
            </Button>
            <Button variant="glass" size="md" leadingIcon={<RefreshCw size={16} />}>
              Actualiser
            </Button>
          </div>
        }
      />

      <Container width="wide" padding={false} className="px-4 md:px-8 flex flex-col gap-section">

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
          <div className="flex items-start gap-stack p-4 bg-warning-bg border border-warning-border rounded-xl">
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
              variant="ghost"
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
            <div className="flex flex-wrap gap-2">
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
          <div className="flex gap-2 mb-stack border-b border-ink-100 pb-3">
            {STATUS_TABS.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={[
                  'px-3 py-1.5 text-caption font-semibold rounded-pill transition-colors duration-fast',
                  activeTab === tab.id
                    ? 'bg-primary-600 text-white'
                    : 'bg-ink-100 text-ink-600 hover:bg-ink-200',
                ].join(' ')}
              >
                {tab.label}
                {tab.id === 'stuck' && stuckCount > 0 && (
                  <span className="ml-1.5 inline-flex items-center justify-center w-4 h-4 rounded-full bg-danger-base text-white text-micro">
                    {stuckCount}
                  </span>
                )}
              </button>
            ))}
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
          <div className="flex flex-col gap-2">
            {filteredRows.map((a) => {
              const { label, variant } = STATUS_BADGE[a.status];
              const avg = (a.scores.filter((s) => s > 0).reduce((acc, s) => acc + s, 0) /
                Math.max(a.scores.filter((s) => s > 0).length, 1)).toFixed(1);
              return (
                <div
                  key={a.id}
                  className="flex items-center justify-between px-4 py-3 rounded-xl border border-ink-100 bg-white hover:bg-ink-50 transition-colors duration-fast"
                >
                  <div className="flex items-center gap-stack">
                    <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-primary-100 text-primary-700 text-caption font-bold shrink-0">
                      {a.initials}
                    </span>
                    <span className="text-body-sm font-medium text-ink-900">{a.name}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-caption text-ink-500">Moy. D{avg}</span>
                    <Badge variant={variant}>{label}</Badge>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => navigate(`/coach/apprenant/${a.id}`)}
                    >
                      Profil
                    </Button>
                  </div>
                </div>
              );
            })}
          </div>
        </SectionCard>

      </Container>
    </div>
  );
}
