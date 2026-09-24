import React, { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Clock3, ChevronRight } from 'lucide-react';
import { EditorialHero } from '../components/patterns/EditorialHero';
import { SectionCard } from '../components/patterns/SectionCard';
import { SectionHeader } from '../components/patterns/SectionHeader';
import { Card } from '../components/core/Card';
import { Button } from '../components/core/Button';
import { Badge } from '../components/ui/Badge';
import { StatCard } from '../components/ui/StatCard';
import { EmptyState } from '../components/ui/EmptyState';
import { Tabs } from '../components/ui/Tabs';
import { CompetencyRadar } from '../components/ui/CompetencyRadar';
import { Container, PageShell } from '../components/layout';
import { RadarChart, type RadarDataPoint } from '../components/charts/RadarChart';
import { ApprenantsTable, formatDreyfus } from '../components/coach/ApprenantsTable';
import { APPRENANTS, APPRENANT_AXES, getApprenantById } from '../data/apprenants';
import { useCoachingStore } from '../stores/persistence';

// ─── Display helpers ──────────────────────────────────────────────────────────

const TABS = [
  { id: 'apprenants', label: 'Mes apprenants' },
  { id: 'corrections', label: 'Corrections' },
  { id: 'sessions', label: 'Sessions' },
];

/* Arbitrage n°18, étendu au coach le 24/09 : l'onglet « Matrice de
   performance » est retiré. Son axe vertical était un score d'engagement
   calculé depuis la série (et la taille des bulles, des heures déduites de la
   série) : sans la série, il ne restait que le niveau Dreyfus, que la table
   « Mes apprenants » donne déjà. Pas de remplaçant (Chloé : le coach n'en a
   pas besoin). */

/* Rangée dans la carte : retrait 20 puis 24 px, jamais sous le rayon (20) de
   la carte — au coin, le contenu reste dans le régime « forme fixe ». */
const ROW = 'flex items-center gap-stack px-stack-md sm:px-stack-lg py-stack';

// ─── Component ────────────────────────────────────────────────────────────────

export default function CoachDashboard() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('apprenants');
  const [selectedApprenantId, setSelectedApprenantId] = useState<string | null>(null);

  // Phase 16.4 #1 : load corrections from store, group by status
  const coachingStore = useCoachingStore();
  const allCorrections = coachingStore.getAllCorrections();
  const pendingCorrections = useMemo(
    () => allCorrections.filter((c) => c.status === 'pending'),
    [allCorrections],
  );

  const selected = selectedApprenantId ? getApprenantById(selectedApprenantId) : undefined;

  const radarFor = (scores: number[]) =>
    APPRENANT_AXES.map((label, idx) => ({ label, current: scores[idx] ?? 0 }));

  return (
    /* Rythme (passe typographique du 24/09) : 48 px entre les trois temps de la
       page — l'en-tête, les chiffres, l'espace de travail à onglets —, 32 entre
       les onglets et le panneau qu'ils commandent, 16 entre un titre de section
       et son contenu. Le `gap-section` posé ici mettait 32 partout : rien ne
       disait ce qui allait ensemble. */
    <PageShell width="page" className="pt-6 md:pt-8 lg:pt-10 relative z-base" noPadTop>
      <EditorialHero
        eyebrow="Espace Coach"
        title="Tableau de bord Coach"
        summary="Suivez la progression de vos apprenants, relisez leurs travaux et planifiez vos sessions."
        tone="flat"
      />

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-stack">
        <StatCard label="Apprenants assignés" value={String(APPRENANTS.length)} size="sm" />
        <StatCard
          label="Corrections en attente"
          value={String(pendingCorrections.length)}
          delta={pendingCorrections.length > 0 ? 'urgent' : 'à jour'}
          deltaDirection={pendingCorrections.length > 0 ? 'up' : 'down'}
          size="sm"
        />
        <StatCard label="Sessions cette semaine" value="2" size="sm" />
        <StatCard
          label="Niveau Dreyfus moyen"
          value={`${formatDreyfus(APPRENANTS.reduce((acc, a) => acc + a.dreyfusAvg, 0) / APPRENANTS.length)} / 5`}
          size="sm"
        />
      </div>

      <div className="flex flex-col gap-section">
        <Tabs items={TABS} value={activeTab} onChange={setActiveTab} variant="underline" />

        {/* Les titres de section n'ont plus de pastille d'icône : le titre part
            du même bord gauche que le h1 et que la table qu'il introduit. Les
            comptes passent en `meta` (13 px, ink-600) : une donnée chuchote. */}

        {/* Apprenants tab */}
        {activeTab === 'apprenants' && (
          /* Deux colonnes seulement quand le radar est ouvert : la colonne vide
             gardait son gouttière de 32 px, et la table s'arrêtait 32 px avant
             les onglets — deux bords droits. */
          <div className={`grid grid-cols-1 gap-section items-start ${selected ? 'lg:grid-cols-[minmax(0,1fr)_auto]' : ''}`}>
            <section className="flex flex-col gap-stack min-w-0">
              <SectionHeader
                title="Mes apprenants"
                meta={`${APPRENANTS.length} apprenants assignés · en difficulté d'abord`}
                size="md"
              />
              {/* Une collection d'objets du même type se lit en table, pas en pile
                  de cartes : dix apprenants tenaient 2 840 px en cartes, et le coach
                  ne pouvait pas trier pour trouver qui décroche. */}
              <ApprenantsTable
                apprenants={APPRENANTS}
                selectedId={selectedApprenantId}
                onRowClick={(a) => setSelectedApprenantId(selectedApprenantId === a.id ? null : a.id)}
              />
            </section>

            {/* Radar detail panel */}
            {selected && (
              <div className="w-full lg:w-96 sticky top-4 flex flex-col gap-stack">
                <SectionCard
                  title={`Radar : ${selected.name}`}
                  description="Niveau actuel Dreyfus par compétence"
                >
                  {/* Le radar se pose directement dans la carte : un
                      `ChartContainer` y ajoutait une carte dans la carte. */}
                  <RadarChart
                    data={radarFor(selected.scores)}
                    size="sm"
                    showLegend={true}
                    onAxisClick={(axis, index) => {
                      // Axis click handler — could navigate to competency detail or show modal
                      console.log(`Clicked axis: ${axis.label} (index ${index})`);
                    }}
                  />
                  {/* L'action du panneau : `soft` (arbitrage n°19). */}
                  <Button
                    emphasis="soft"
                    tone="brand"
                    size="sm"
                    fullWidth
                    trailingIcon={<ChevronRight size={14} />}
                    onClick={() => navigate(`/coach/apprenant/${selected.id}`)}
                  >
                    Voir la fiche complète
                  </Button>
                </SectionCard>
              </div>
            )}
          </div>
        )}

        {/* Corrections tab */}
        {activeTab === 'corrections' && (
          <section className="flex flex-col gap-stack">
            <SectionHeader
              title="File de corrections"
              meta={`${pendingCorrections.length} travail${pendingCorrections.length > 1 ? 'aux' : ''} à corriger`}
              size="md"
              action={
                /* « Tout voir » : le tertiaire, en `ghost` (arbitrage n°19). */
                <Button emphasis="ghost" tone="brand" size="sm" trailingIcon={<ChevronRight size={14} />} onClick={() => navigate('/coach/corrections')}>
                  Tout voir
                </Button>
              }
            />
            {/* Les travaux à corriger forment une collection qu'on parcourt : des
                rangées dans UNE carte, pas une pile de cartes (arbitrage n°5 du
                23/09). Les rangées n'ont pas de fond propre : la carte porte le coin. */}
            {pendingCorrections.length > 0 ? (
              <Card className="p-0">
                <ul className="flex flex-col divide-y divide-ink-100" aria-label="Corrections en attente">
                  {pendingCorrections.slice(0, 5).map((c) => {
                    const learner = getApprenantById(c.learnerId);
                    return (
                      <li key={c.id} className={ROW}>
                        {/* Titre 16/600 puis sa méta 13 ink-600 : une ligne et sa
                            légende, collées (doctrine § 5). */}
                        <div className="flex-1 min-w-0 flex flex-col gap-tight">
                          <div className="flex items-center gap-stack-xs flex-wrap">
                            <span className="text-body font-semibold text-ink-900">{c.exerciseTitle}</span>
                            {c.iterationCount === 0 && <Badge variant="sun" size="compact">Nouveau</Badge>}
                          </div>
                          <div className="flex gap-stack-xs text-caption text-ink-600 flex-wrap">
                            <span>{learner?.name ?? c.learnerId}</span>
                            {c.competenceId && (
                              <>
                                <span aria-hidden="true">·</span>
                                <span className="capitalize">{c.competenceId.replace(/_/g, ' ')}</span>
                              </>
                            )}
                            <span aria-hidden="true">·</span>
                            <span className="tabular-nums">{new Date(c.submittedAt).toLocaleDateString('fr-FR', { day: 'numeric', month: 'short' })}</span>
                          </div>
                        </div>
                        <Button
                          emphasis="soft"
                          size="sm"
                          className="shrink-0"
                          aria-label={`Corriger : ${c.exerciseTitle}`}
                          onClick={() => navigate(`/coach/correction/${c.id}`)}
                        >
                          Corriger
                        </Button>
                      </li>
                    );
                  })}
                </ul>
              </Card>
            ) : (
              <EmptyState title="Aucune correction en attente" description="Tous les travaux ont été relus." />
            )}
          </section>
        )}

        {/* Sessions tab */}
        {activeTab === 'sessions' && (
          <EmptyState
            title="Gestion des sessions"
            description="Calendrier et synchronisation Google/Outlook : disponible avec la configuration OAuth."
            icon={<Clock3 size={32} />}
          />
        )}
      </div>
    </PageShell>
  );
}
