import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Target, BookOpen, ChevronRight } from 'lucide-react';
import { EditorialHero } from '../components/patterns/EditorialHero';
import { SectionHeader } from '../components/patterns/SectionHeader';
import { Tabs } from '../components/ui/Tabs';
import { Card } from '../components/core/Card';
import { Button } from '../components/core/Button';
import { MetaPill } from '../components/ui/MetaPill';
import { ProgressBar } from '../components/ui/ProgressBar';
import { SkillBar } from '../components/ui/SkillBar';
import { CompetencyRadar } from '../components/ui/CompetencyRadar';
import { StatCard } from '../components/ui/StatCard';
import { ActivityFeed } from '../components/patterns/ActivityFeed';
import { PageShell } from '../components/layout';

// ─── Mock data ────────────────────────────────────────────────────────────────

const COMPETENCE = {
  id: 'leadership',
  label: 'Leadership & Management',
  currentLevel: 3,
  targetLevel: 5,
  progress: 62,
  xp: 320,
  nextLevelXp: 500,
  weeklyProgress: 3,
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
  { id: '1', type: 'lesson' as const, title: 'Leçon : Styles de leadership situationnel', date: 'Il y a 2j', xp: 25 },
  { id: '2', type: 'coaching' as const, title: 'Session coaching : bilan D3', date: 'La semaine dernière', xp: 100 },
  { id: '3', type: 'parcours' as const, title: 'Exercice : Délégation et contrôle', date: 'Il y a 10j', xp: 50 },
];

// ─── Component ────────────────────────────────────────────────────────────────

export default function DashboardCompetenceDetail() {
  const { id } = useParams<{ id: string }>();
  const _ = id;
  const [tab, setTab] = useState<'radar' | 'skills' | 'activity'>('radar');

  /* Passe typographique du 24/09 — le rythme de PageShell (48 entre
     sections ; la page posait sa marge haute puis 32). La progression et le
     détail sont deux sections h2 (ils étaient des cartes titrées en h3, la
     page sautait du h1 au h3). Les onglets sont ceux du système (ils étaient
     faits main, au cran 700 du teal et au 500) et leurs panneaux ne répètent
     plus leur nom en titre de carte. Les activités sont des rangées dans une
     carte ; l'action finale reprend le bord gauche de la page. Le fond (le
     niveau Dreyfus compté en XP) relève de l'arbitrage n°18, pas de cette
     passe. */
  return (
    <PageShell width="wide">
      <EditorialHero
        eyebrow="Tableau de bord · Compétence"
        title={COMPETENCE.label}
        summary={`Niveau Dreyfus D${COMPETENCE.currentLevel} → objectif D${COMPETENCE.targetLevel} · ${COMPETENCE.progress} % de progression`}
        tone="flat"
        trailing={
          /* Aller voir ailleurs, comme « Voir tout » : `ghost` (arbitrage
             n°19). L'aplat de l'écran est « Continuer ma progression ». */
          <Button emphasis="ghost" size="md" leadingIcon={<Target size={16} />}>
            Voir le passeport complet
          </Button>
        }
      />

      {/* KPI row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-stack">
        <StatCard value={`D${COMPETENCE.currentLevel}`} label="Niveau actuel" variant="brand" size="sm" />
        <StatCard value={`${COMPETENCE.xp} XP`} label="Points gagnés" size="sm" delta={`+${COMPETENCE.weeklyProgress * 25} cette semaine`} deltaDirection="up" />
        <StatCard value={`${COMPETENCE.progress} %`} label="Progression cible" size="sm" />
        <StatCard value={`D${COMPETENCE.targetLevel}`} label="Objectif" size="sm" />
      </div>

      {/* Progression — les deux valeurs en légende tabulaire au cran 600
          (elles étaient au 500), de part et d'autre de la jauge. */}
      <section className="flex flex-col gap-stack">
        <SectionHeader title={`Progression D${COMPETENCE.currentLevel} → D${COMPETENCE.targetLevel}`} />
        <Card className="flex flex-col gap-stack-xs">
          <div className="flex justify-between font-body text-caption text-ink-600 tabular-nums">
            <span>{COMPETENCE.xp} XP accumulés</span>
            <span>{COMPETENCE.nextLevelXp - COMPETENCE.xp} XP restants</span>
          </div>
          <ProgressBar value={Math.round((COMPETENCE.xp / COMPETENCE.nextLevelXp) * 100)} fill="brand" size="lg" showLabel />
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
               une carte ; le gain est une donnée (MetaPill), plus un Badge. */
            <Card as="ul" className="flex flex-col gap-0 p-0 divide-y divide-ink-100">
              {ACTIVITY_ITEMS.map((item) => (
                <li key={item.id} className="flex items-center justify-between gap-stack px-stack-lg py-stack">
                  <div className="flex flex-col gap-tight">
                    <span className="font-body text-body font-semibold text-ink-900">{item.title}</span>
                    <span className="font-body text-caption text-ink-600">{item.date}</span>
                  </div>
                  <div className="flex items-center gap-stack-xs">
                    <MetaPill text={`+${item.xp} XP`} tone="success" />
                    <ChevronRight size={16} className="text-ink-500" aria-hidden="true" />
                  </div>
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
