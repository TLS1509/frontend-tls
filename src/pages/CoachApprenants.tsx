import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Users } from 'lucide-react';
import { EditorialHero } from '../components/patterns/EditorialHero';
import { SectionHeader } from '../components/patterns/SectionHeader';
import { Button } from '../components/core/Button';
import { StatCard } from '../components/ui/StatCard';
import { FilterChip } from '../components/ui/FilterChip';
import { EmptyState } from '../components/ui/EmptyState';
import { Alert } from '../components/ui/Alert';
import { Search } from '../components/ui/Search';
import { ApprenantsTable, formatDreyfus } from '../components/coach/ApprenantsTable';
import { PageShell } from '../components/layout';
import { APPRENANTS } from '../data/apprenants';

const FILTER_OPTIONS = [
  { id: 'all', label: 'Tous' },
  { id: 'active', label: 'Actifs' },
  { id: 'stuck', label: 'En difficulté' },
  { id: 'ahead', label: 'En avance' },
];

// ─── Component ────────────────────────────────────────────────────────────────

export default function CoachApprenants() {
  const navigate = useNavigate();
  const [activeFilter, setActiveFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filtered = APPRENANTS.filter((a) => {
    const matchFilter = activeFilter === 'all' || a.status === activeFilter;
    const matchSearch = !searchQuery ||
      a.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      a.role.toLowerCase().includes(searchQuery.toLowerCase());
    return matchFilter && matchSearch;
  });

  const stuckCount = APPRENANTS.filter((a) => a.status === 'stuck').length;
  const aheadCount = APPRENANTS.filter((a) => a.status === 'ahead').length;

  const filtreActif = activeFilter !== 'all' || searchQuery.trim() !== '';

  return (
    /* Trois temps à 48 px (gap-page de PageShell) : l'en-tête, l'état de la
       cohorte (chiffres + alerte, 16 entre eux : l'alerte explique le chiffre
       « En difficulté »), puis la liste — son titre, sa recherche, ses filtres
       et sa table forment un seul groupe. Avant, un `gap-section` uniforme
       mettait 32 px entre chaque bloc : les filtres flottaient à égale distance
       des chiffres et de la table qu'ils filtrent. */
    <PageShell width="page" noPadTop className="pt-6 md:pt-8 lg:pt-10">
      <EditorialHero
        eyebrow="Coach · Apprenants"
        title="Mes apprenants"
        summary="Suivez la progression de chaque apprenant, identifiez les situations à risque et planifiez les interventions."
        tone="flat"
      />

      <div className="flex flex-col gap-stack">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-stack">
          <StatCard value={APPRENANTS.length} label="Apprenants suivis" size="sm" />
          <StatCard
            value={stuckCount}
            label="En difficulté"
            variant="warm"
            size="sm"
            delta={stuckCount > 0 ? 'Intervention recommandée' : 'RAS'}
            deltaDirection={stuckCount > 0 ? 'down' : 'up'}
          />
          <StatCard value={aheadCount} label="En avance" variant="brand" size="sm" delta="Excellent" deltaDirection="up" />
          <StatCard
            value={`${formatDreyfus(APPRENANTS.reduce((acc, a) => acc + a.dreyfusAvg, 0) / APPRENANTS.length)} / 5`}
            label="Score Dreyfus moyen"
            size="sm"
          />
        </div>

        {stuckCount > 0 && (
          /* `Alert` et non un bandeau fait main : celui-ci posait
             `border-warning-border`, une couleur qui n'existe pas dans @theme —
             le filet prenait la couleur du texte, un trait sombre plus lourd
             que tous les contours de la page. */
          <Alert variant="warning">
            <strong className="font-semibold">{stuckCount} apprenants</strong> n'ont pas eu d'activité depuis plus de 7 jours. Une prise de contact est recommandée.
          </Alert>
        )}
      </div>

      {/* Une collection d'apprenants se lit en table triable, pas en grille de
          cartes (arbitrage n°5 du 23/09) : le coach trie par statut, activité,
          JAC ou Dreyfus pour trouver qui a besoin de lui. Le titre nomme la
          liste ; le compte est une donnée, il passe en méta. */}
      <section className="flex flex-col gap-stack">
        <SectionHeader
          title="Tous les apprenants"
          meta={
            filtreActif
              ? `${filtered.length} sur ${APPRENANTS.length} apprenants`
              : `${APPRENANTS.length} apprenants · en difficulté d'abord`
          }
          size="md"
        />

        {/* Recherche et filtres : la même hauteur (44 px) sur la même ligne
            dès que la place le permet (arbitrage n°22). */}
        <div className="flex flex-col md:flex-row md:items-center gap-stack-sm">
          <Search
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Rechercher un apprenant…"
            aria-label="Rechercher un apprenant"
            wrapperClassName="md:w-80 md:shrink-0"
          />
          <div className="flex flex-wrap gap-stack-xs" role="group" aria-label="Filtrer par statut">
            {FILTER_OPTIONS.map((f) => (
              <FilterChip
                key={f.id}
                label={f.label}
                active={activeFilter === f.id}
                onClick={() => setActiveFilter(f.id)}
              />
            ))}
          </div>
        </div>

        {filtered.length === 0 ? (
          <EmptyState
            icon={<Users size={32} />}
            title="Aucun apprenant trouvé"
            description="Aucun apprenant ne correspond à votre recherche."
          />
        ) : (
          <ApprenantsTable
            apprenants={filtered}
            onRowClick={(a) => navigate(`/coach/apprenant/${a.id}`)}
            actionLabel="Fiche"
            renderAction={(a) => (
              <Button
                emphasis="outline"
                size="sm"
                aria-label={`Profil de ${a.name}`}
                onClick={(e) => {
                  e.stopPropagation();
                  navigate(`/coach/apprenant/${a.id}`);
                }}
              >
                Profil
              </Button>
            )}
          />
        )}
      </section>
    </PageShell>
  );
}
