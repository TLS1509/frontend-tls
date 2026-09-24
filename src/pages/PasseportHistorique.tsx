import React from 'react';
import { TrendingUp, Award, BookOpen, Briefcase } from 'lucide-react';
import EditorialHero from '../components/patterns/EditorialHero';
import { SectionHeader } from '../components/patterns/SectionHeader';
import { Card } from '../components/core/Card';
import { MetaPill } from '../components/ui/MetaPill';
import { StatCard } from '../components/ui/StatCard';
import { CompetencyRadar } from '../components/ui/CompetencyRadar';
import { usePasseportStore } from '../stores/persistence';
import { getCompetenceById } from '../data/competencies';
import { MOCK_USER_ID } from '../data/passeport';
import type { CompetencyProgression } from '../types/learning';
import { PageShell } from '../components/layout';

const TYPE_CONFIG: Record<CompetencyProgression['type'], { icon: React.ElementType; color: string; bg: string; label: string }> = {
  jac: { icon: Award, color: 'text-success-fg', bg: 'bg-success-bg', label: 'JAC' },
  mission: { icon: Briefcase, color: 'text-secondary-600', bg: 'bg-secondary-50', label: 'Mission' },
  formation: { icon: BookOpen, color: 'text-info-fg', bg: 'bg-info-bg', label: 'Formation' },
  'dreyfus-up': { icon: TrendingUp, color: 'text-primary-700', bg: 'bg-primary-50', label: 'Niveau ↑' },
};

const RADAR_AXES = [
  { label: 'Communication', current: 4 },
  { label: 'Leadership', current: 3 },
  { label: 'Analyse', current: 2 },
  { label: 'Tech', current: 4 },
  { label: 'Créativité', current: 1 },
  { label: 'Coopération', current: 3 },
];

const PasseportHistorique: React.FC = () => {
  const passeportStore = usePasseportStore();
  const progressions = passeportStore.getProgressions(MOCK_USER_ID);
  // Sort descending by date
  const timeline = [...progressions].sort(
    (a, b) => new Date(b.occurredAt).getTime() - new Date(a.occurredAt).getTime()
  );

  const dreyfusUps = timeline.filter((e) => e.type === 'dreyfus-up').length;
  const jacs = timeline.filter((e) => e.type === 'jac').length;
  const missions = timeline.filter((e) => e.type === 'mission').length;
  const formations = timeline.filter((e) => e.type === 'formation').length;

  return (
    <PageShell width="wide" noPadTop={false}>
      <EditorialHero
        eyebrow="Passeport · Historique"
        title="6 mois de progression"
        summary="Tous tes événements Dreyfus, JAC, missions et formations validés depuis novembre 2025"
        tone="flat"
      />
      <div className="grid grid-cols-2 md:grid-cols-4 gap-stack">
        <StatCard label="Niveaux Dreyfus gagnés" value={`+${dreyfusUps}`} sub="depuis le début" deltaDirection="up" />
        <StatCard label="JAC validés" value={String(jacs)} />
        <StatCard label="Missions complétées" value={String(missions)} />
        <StatCard label="Formations terminées" value={String(formations)} />
      </div>

      {/* Deux sections, leur titre (h2 28) posé sur la page. Le radar était
          dans une carte, elle-même dans une carte. */}
      <section className="flex flex-col gap-stack">
        <SectionHeader title="Radar actuel vs il y a 6 mois" subtitle="Évolution de tous les axes Dreyfus" />
        <Card className="flex items-center justify-center">
          <CompetencyRadar axes={RADAR_AXES} size="md" />
        </Card>
      </section>

      {/* La frise est une collection : des rangées dans une carte (arbitrage
          n°5), plus une carte par événement dans une carte. Chaque rangée :
          pastille carrée (arbitrage n°3) centrée sur la première ligne, titre
          et date sur la même ligne de base, détail en corps ink-700, puis ses
          données — compétence et niveau en MetaPill (arbitrages n°14-15),
          plus en Badge capitales, et la date en légende. */}
      <section className="flex flex-col gap-stack">
        <SectionHeader title="Timeline détaillée" subtitle="Tous les événements impactant ton passeport" />
        <Card className="p-0 overflow-hidden">
          <ol className="divide-y divide-ink-100">
            {timeline.map((ev) => {
              const cfg = TYPE_CONFIG[ev.type];
              const Icon = cfg.icon;
              const comp = getCompetenceById(ev.competenceId);
              const dateLabel = new Date(ev.occurredAt).toLocaleDateString('fr-FR', {
                day: 'numeric',
                month: 'long',
                year: 'numeric',
              });
              return (
                <li key={ev.id} className="flex items-start gap-stack px-stack-lg py-stack-md">
                  <span className={`w-9 h-9 rounded-md ${cfg.bg} ${cfg.color} inline-flex items-center justify-center shrink-0`} aria-hidden="true">
                    <Icon size={18} />
                  </span>
                  {/* 5 px : la première ligne (26) se centre sur la pastille (36). */}
                  <div className="flex flex-col gap-stack-3xs min-w-0 flex-1 mt-[5px]">
                    <div className="flex items-baseline justify-between gap-x-stack gap-y-stack-3xs flex-wrap">
                      <p className="text-body font-semibold text-ink-900">{ev.title}</p>
                      <time dateTime={ev.occurredAt} className="text-caption text-ink-600 tabular-nums">{dateLabel}</time>
                    </div>
                    <p className="text-body text-ink-700 max-w-prose">{ev.detail}</p>
                    <div className="mt-stack-xs flex flex-wrap items-center gap-stack-xs">
                      <MetaPill text={comp?.label ?? ev.competenceId} tone="primary" />
                      {ev.newLevel && <MetaPill text={`Dreyfus ${ev.newLevel}`} tone="success" />}
                      <span className="text-caption text-ink-600">{cfg.label}</span>
                    </div>
                  </div>
                </li>
              );
            })}
          </ol>
        </Card>
      </section>
    </PageShell>
  );
};

export default PasseportHistorique;
