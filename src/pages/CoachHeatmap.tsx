import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Download, RefreshCw } from 'lucide-react';
import { EditorialHero } from '../components/patterns/EditorialHero';
import { SectionHeader } from '../components/patterns/SectionHeader';
import { Card } from '../components/core/Card';
import { Button } from '../components/core/Button';
import { StatCard } from '../components/ui/StatCard';
import { FilterChip } from '../components/ui/FilterChip';
import { HeatmapGrid } from '../components/ui/HeatmapGrid';
import { Avatar } from '../components/ui/Avatar';
import { Badge } from '../components/ui/Badge';
import { Tabs } from '../components/ui/Tabs';
import { Alert } from '../components/ui/Alert';
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
    /* Trois temps à 48 px : l'en-tête, l'état de l'équipe (chiffres + alerte,
       16 entre eux), puis deux sections — la heatmap et le résumé. Leurs titres
       étaient des h3 de 20 px enfermés dans des cartes (h1 → h3, et un titre
       de section à la taille d'un titre de carte) : ils passent en h2 28 posés
       sur la page, sur le même bord gauche que le h1. */
    <PageShell width="wide" noPadTop className="pt-6 md:pt-8 lg:pt-10">
      <EditorialHero
        eyebrow="Coach · Passeport"
        title="Heatmap compétences équipe"
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

      <div className="flex flex-col gap-stack">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-stack">
          <StatCard value={APPRENANTS.length} label="Apprenants" variant="default" size="sm" />
          <StatCard value={String(avgScore).replace('.', ',')} label="Score Dreyfus moyen" variant="brand" size="sm" />
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

        {stuckCount > 0 && (
          /* `Alert` et non un bandeau fait main (dont le filet
             `border-warning-border` n'existe pas dans @theme). Le titre dit
             l'état, le texte l'explique à 16 px — il était à 13, en légende,
             pour une phrase qu'on lit. */
          <Alert
            variant="warning"
            title={`${stuckCount} apprenant${stuckCount > 1 ? 's' : ''} en difficulté`}
            actions={
              <Button
                emphasis="outline"
                size="sm"
                onClick={() => navigate('/coach/apprenants?filter=stuck')}
              >
                Voir les profils
              </Button>
            }
          >
            Pierre Bernard et Marc Lefebvre montrent des scores bas sur plusieurs axes. Une intervention est recommandée.
          </Alert>
        )}
      </div>

      {/* La heatmap : titre, filtres (statut puis compétence), grille. La grille
          porte sa propre table bordée et sa légende : pas de carte autour. */}
      <section className="flex flex-col gap-stack">
        <SectionHeader
          title="Heatmap Dreyfus"
          meta={`${filteredRows.length} apprenant${filteredRows.length > 1 ? 's' : ''} · ${AXES.length} compétences`}
          size="md"
        />
        <Tabs
          items={STATUS_TABS.map((tab) => ({
            ...tab,
            badge: tab.id === 'stuck' && stuckCount > 0 ? stuckCount : undefined,
          }))}
          value={activeTab}
          onChange={setActiveTab}
          variant="underline"
        />
        <div className="flex flex-wrap gap-stack-xs" role="group" aria-label="Mettre en avant une compétence">
          {AXES.map((axis) => (
            <FilterChip
              key={axis}
              label={axis}
              size="sm"
              active={selectedAxis === axis}
              onClick={() => setSelectedAxis(selectedAxis === axis ? null : axis)}
            />
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
      </section>

      <section className="flex flex-col gap-stack">
        <SectionHeader title="Résumé par apprenant" size="md" />
        {/* Une liste qu'on parcourt pour ouvrir un profil : des rangées dans
            une carte, séparées par un filet (arbitrage n°5 du 23/09). */}
        <Card className="p-0">
          <ul className="flex flex-col divide-y divide-ink-100">
            {filteredRows.map((a) => {
              const { label, variant } = STATUS_BADGE[a.status];
              const avg = (a.scores.filter((s) => s > 0).reduce((acc, s) => acc + s, 0) /
                Math.max(a.scores.filter((s) => s > 0).length, 1)).toFixed(1).replace('.', ',');
              return (
                <li key={a.id} className="flex items-center gap-stack-sm px-stack-md sm:px-stack-lg py-stack-sm">
                  {/* À 375 px, l'avatar coûtait sa place au nom : il n'apparaît qu'à
                      partir de sm (enveloppant — `hidden` sur l'Avatar perdrait contre
                      son `inline-flex`, piège n°6). */}
                  <span className="hidden sm:block shrink-0">
                    <Avatar initials={a.initials} name={a.name} size="sm" tint="brand" />
                  </span>
                  {/* Nom 16/600, puis la moyenne en légende : sous le nom à 375 px,
                      à côté au-delà. */}
                  <div className="flex-1 min-w-0 flex flex-col sm:flex-row sm:items-baseline sm:justify-between sm:gap-stack">
                    <span className="text-body font-semibold text-ink-900 truncate">{a.name}</span>
                    <span className="text-caption text-ink-600 tabular-nums shrink-0">Moyenne D{avg}</span>
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
        </Card>
      </section>
    </PageShell>
  );
}
