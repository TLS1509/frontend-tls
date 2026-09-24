import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Target, BookOpen, ChevronRight } from 'lucide-react';
import { EditorialHero } from '../components/patterns/EditorialHero';
import { SectionHeader } from '../components/patterns/SectionHeader';
import { Tabs } from '../components/ui/Tabs';
import { Card } from '../components/core/Card';
import { Button } from '../components/core/Button';
import { SkillBar } from '../components/ui/SkillBar';
import { CompetencyRadar } from '../components/ui/CompetencyRadar';
import { StatCard } from '../components/ui/StatCard';
import { ActivityFeed } from '../components/patterns/ActivityFeed';
import { PageShell } from '../components/layout';
import { DREYFUS_LABELS, getDreyfusLevelDef } from '../data/competencies';
import type { DreyfusLevel } from '../types/learning';

// ─── Mock data ────────────────────────────────────────────────────────────────

const COMPETENCE: { id: string; label: string; currentLevel: DreyfusLevel; targetLevel: DreyfusLevel; progress: number } = {
  id: 'leadership',
  label: 'Leadership & Management',
  currentLevel: 3,
  targetLevel: 5,
  progress: 62,
};

const RADAR_AXES = [
  { label: 'Vision', current: 3, target: 5 },
  { label: 'Délégation', current: 4, target: 5 },
  { label: 'Feedback', current: 2, target: 4 },
  { label: 'Gestion conflits', current: 3, target: 4 },
  { label: 'Développement', current: 2, target: 5 },
  { label: 'Décision', current: 3, target: 4 },
];

const SKILLS = [
  { label: 'Donner du feedback constructif', value: 2, max: 5 },
  { label: 'Animer une réunion d\'équipe', value: 4, max: 5 },
  { label: 'Gérer un conflit interpersonnel', value: 2, max: 5 },
  { label: 'Définir une vision claire', value: 3, max: 5 },
  { label: 'Déléguer efficacement', value: 4, max: 5 },
];

const ACTIVITY_ITEMS = [
  { id: '1', type: 'lesson' as const, title: 'Leçon : Styles de leadership situationnel', date: 'Il y a 2j' },
  { id: '2', type: 'coaching' as const, title: 'Session coaching : bilan D3', date: 'La semaine dernière' },
  { id: '3', type: 'parcours' as const, title: 'Exercice : Délégation et contrôle', date: 'Il y a 10j' },
];

// ─── Component ────────────────────────────────────────────────────────────────

export default function DashboardCompetenceDetail() {
  const { id } = useParams<{ id: string }>();
  const _ = id;
  const [tab, setTab] = useState<'radar' | 'skills' | 'activity'>('radar');
  // Le prochain cran de l'échelle, lu au référentiel Dreyfus.
  const prochain = Math.min(5, COMPETENCE.currentLevel + 1) as DreyfusLevel;
  const definitionProchain = getDreyfusLevelDef(prochain);

  /* Passe typographique du 24/09 — le rythme de PageShell (48 entre
     sections ; la page posait sa marge haute puis 32). La progression et le
     détail sont deux sections h2 (ils étaient des cartes titrées en h3, la
     page sautait du h1 au h3). Les onglets sont ceux du système (ils étaient
     faits main, au cran 700 du teal et au 500) et leurs panneaux ne répètent
     plus leur nom en titre de carte. Les activités sont des rangées dans une
     carte ; l'action finale reprend le bord gauche de la page.
     Arbitrage n°18 (24/09) : aucun XP n'est affiché à côté d'un niveau
     Dreyfus. La tuile « 320 XP · Points gagnés », la jauge « 320 XP accumulés
     · 180 XP restants » et les « +25 XP » des activités sont sortis ; la
     section de progression dit ce que le prochain niveau demande, et qu'il
     se valide humainement. */
  return (
    <PageShell width="wide">
      <EditorialHero
        eyebrow="Tableau de bord · Compétence"
        title={COMPETENCE.label}
        summary={`Niveau Dreyfus D${COMPETENCE.currentLevel} → objectif D${COMPETENCE.targetLevel} · ${COMPETENCE.progress} % de progression`}
        tone="flat"
        trailing={
          /* Aller voir ailleurs, comme « Voir tout » : `ghost` (arbitrage
             n°19). L'aplat de l'écran est « Continuer ma progression ».
             Posé sous le titre, il se cale sur son bord : `-ml-stack-md`
             rattrape le padding d'une boîte qu'il n'affiche plus. */
          <Button emphasis="ghost" size="md" leadingIcon={<Target size={16} />} className="-ml-stack-md">
            Voir le passeport complet
          </Button>
        }
      />

      {/* KPI row */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-stack">
        <StatCard value={`D${COMPETENCE.currentLevel}`} label="Niveau actuel" variant="brand" size="sm" />
        <StatCard value={`${COMPETENCE.progress} %`} label="Progression cible" size="sm" />
        <StatCard value={`D${COMPETENCE.targetLevel}`} label="Objectif" size="sm" />
      </div>

      {/* Le prochain niveau : ce qu'il demande (le référentiel Dreyfus), et
          comment il s'obtient — une validation humaine sur preuves, jamais un
          total de points. La jauge d'XP qui tenait cette place faisait monter
          un niveau Dreyfus avec des points (arbitrage n°18). */}
      <section className="flex flex-col gap-stack">
        <SectionHeader
          title={`Prochain niveau : D${prochain} · ${DREYFUS_LABELS[prochain]}`}
          subtitle="Il se valide avec ton coach ou ton manager, sur preuves de ta pratique."
        />
        <Card className="flex flex-col gap-stack">
          <p className="font-body text-body text-ink-900 max-w-prose">{definitionProchain.criteria}</p>
          {definitionProchain.indicators && definitionProchain.indicators.length > 0 && (
            <ul className="flex flex-col gap-stack-xs list-disc pl-stack-lg marker:text-ink-500">
              {definitionProchain.indicators.map((ind) => (
                <li key={ind} className="font-body text-body text-ink-700 max-w-prose">{ind}</li>
              ))}
            </ul>
          )}
        </Card>
      </section>

      {/* Détail — le titre, les onglets, puis leur panneau (24). */}
      <section className="flex flex-col gap-stack">
        <SectionHeader title="Détail de la compétence" />
        <Tabs
          variant="underline"
          value={tab}
          onChange={(t) => setTab(t as 'radar' | 'skills' | 'activity')}
          label="Détail de la compétence"
          items={[
            { id: 'radar', label: 'Radar' },
            { id: 'skills', label: 'Sous-compétences' },
            { id: 'activity', label: 'Activités récentes' },
          ]}
        />

        <div className="mt-stack-xs">
          {tab === 'radar' && (
            <Card>
              <CompetencyRadar axes={RADAR_AXES} size="lg" showLegend />
            </Card>
          )}

          {tab === 'skills' && (
            <Card className="flex flex-col gap-stack-xs">
              {SKILLS.map((sk) => <SkillBar key={sk.label} label={sk.label} value={sk.value} />)}
            </Card>
          )}

          {tab === 'activity' && (
            /* Des rangées dans une carte (arbitrage n°5), plus des cartes dans
               une carte. Le « +25 XP » de chaque rangée est sorti (n°18). */
            <Card as="ul" className="flex flex-col gap-0 p-0 divide-y divide-ink-100">
              {ACTIVITY_ITEMS.map((item) => (
                <li key={item.id} className="flex items-center justify-between gap-stack px-stack-lg py-stack">
                  <div className="flex flex-col gap-tight">
                    <span className="font-body text-body font-semibold text-ink-900">{item.title}</span>
                    <span className="font-body text-caption text-ink-600">{item.date}</span>
                  </div>
                  <ChevronRight size={16} className="shrink-0 text-ink-500" aria-hidden="true" />
                </li>
              ))}
            </Card>
          )}
        </div>
      </section>

      {/* L'action principale de l'écran, et la seule en aplat (arbitrage
          n°19) : la fiche d'une compétence sert à reprendre sa progression. */}
      <div>
        <Button emphasis="solid" size="lg" leadingIcon={<BookOpen size={18} />}>
          Continuer ma progression
        </Button>
      </div>
    </PageShell>
  );
}
