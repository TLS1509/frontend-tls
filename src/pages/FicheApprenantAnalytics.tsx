import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, Calendar, MessageSquare } from 'lucide-react';
import { EditorialHero } from '../components/patterns/EditorialHero';
import { SectionHeader } from '../components/patterns/SectionHeader';
import { Card } from '../components/core/Card';
import { Button } from '../components/core/Button';
import { Badge } from '../components/ui/Badge';
import { MetaPill } from '../components/ui/MetaPill';
import { Avatar } from '../components/ui/Avatar';
import { StatCard } from '../components/ui/StatCard';
import { SkillBar } from '../components/ui/SkillBar';
import { CompetencyRadar } from '../components/ui/CompetencyRadar';
import { HeatmapGrid } from '../components/ui/HeatmapGrid';
import { ProgressBar } from '../components/ui/ProgressBar';
import { AtrophieIndicator } from '../components/ui/AtrophieIndicator';
import { Tabs } from '../components/ui/Tabs';
import { useAnalyticsStore } from '../stores/persistence';
import { PageShell } from '../components/layout';
import { MOCK_COACH_ID } from '../data/analytics';
import type { LearnerStatus } from '../types/learning';

const STATUS_LABEL: Record<LearnerStatus, string> = {
  'on-track': 'En progression',
  'at-risk': 'À risque',
  'stuck': 'Bloqué',
};

const STATUS_VARIANT: Record<LearnerStatus, 'success' | 'warm' | 'danger'> = {
  'on-track': 'success',
  'at-risk': 'warm',
  'stuck': 'danger',
};

function formatRelativeDate(isoDate: string): string {
  const days = Math.round((Date.now() - new Date(isoDate).getTime()) / 86400000);
  if (days === 0) return "Aujourd'hui";
  if (days === 1) return 'Il y a 1 jour';
  return `Il y a ${days} jours`;
}

function dreyfusLabel(level: number): string {
  return ['', 'Novice', 'Apprenant', 'Compétent', 'Expert', 'Maître'][level] ?? 'D?';
}

// ─── Component ────────────────────────────────────────────────────────────────

export default function FicheApprenantAnalytics() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [tab, setTab] = useState<'overview' | 'heatmap' | 'activity'>('overview');

  const analyticsStore = useAnalyticsStore();
  // Seed coach profiles then find the specific learner
  analyticsStore.getLearnerProfiles(MOCK_COACH_ID);
  const learner = id ? analyticsStore.getLearnerById(id) : undefined;

  if (!learner) {
    return (
      <PageShell width="wide" noPadTop className="pt-6 md:pt-8 lg:pt-10">
        {/* Pas d'identifiant technique affiché, et toujours une sortie. */}
        <EditorialHero
          eyebrow="Coach · Fiche apprenant"
          title="Nous ne trouvons pas cet apprenant"
          summary="Il ne fait peut-être plus partie de votre équipe, ou le lien est incomplet. Retrouvez-le depuis la liste de vos apprenants."
          tone="flat"
          /* Seule sortie de l'écran, donc son action principale : `solid`
             (arbitrage n°19). */
          trailing={
            <Button emphasis="solid" tone="brand" size="md" leadingIcon={<ArrowLeft size={16} />} onClick={() => navigate('/coach/apprenants')}>
              Retour aux apprenants
            </Button>
          }
        />
      </PageShell>
    );
  }

  const radarAxes = learner.competencyScores.map((cs) => ({
    label: cs.label,
    current: cs.current,
    target: cs.target,
  }));

  /* `SkillBar` attend un pourcentage : on lui passait le niveau brut (4 sur 5),
     qu'il affichait « 4 % » avec une jauge presque vide. Niveau / 5, comme la
     colonne JAC de la table des apprenants. */
  const skillBars = learner.competencyScores.map((cs) => ({
    label: cs.label,
    value: Math.round((cs.current / 5) * 100),
  }));

  const heatmapAxes = learner.competencyScores.map((cs) => cs.label);
  const heatmapRows = [{
    name: learner.name,
    initials: learner.initials,
    scores: learner.competencyScores.map((cs) => cs.current),
  }];

  const dreyfusLevelRound = Math.round(learner.dreyfusAvg);

  return (
    /* PageShell : la page n'avait aucune marge haute (le surtitre touchait le
       bord) et son contenu vivait dans un `Container` qui ajoutait 32 px de
       retrait sous le titre. Un seul bord gauche, et 48 px entre les temps de
       la page. */
    <PageShell width="wide" noPadTop className="pt-6 md:pt-8 lg:pt-10">
      <EditorialHero
        eyebrow="Coach · Fiche apprenant"
        title={learner.name}
        summary={learner.role}
        tone="flat"
        /* Arbitrage n°19 : planifier est l'action principale (`solid`), le
           message l'action seconde (`soft`). */
        trailing={
          <div className="flex flex-wrap items-center gap-stack-xs">
            <Button emphasis="soft" tone="brand" size="md" leadingIcon={<MessageSquare size={16} />}>
              Envoyer un message
            </Button>
            <Button emphasis="solid" tone="brand" size="md" leadingIcon={<Calendar size={16} />}>
              Planifier une session
            </Button>
          </div>
        }
      />

      <div className="flex flex-col gap-stack">
        {/* L'état de l'apprenant. La carte répétait le nom (en h2 de 20 px) et
            le rôle que le h1 et le chapô viennent de dire : elle ne garde que
            ce qu'elle ajoute — l'avatar, les états, l'objectif. */}
        <Card variant="default" className="flex flex-wrap items-center gap-x-stack-lg gap-y-stack p-stack-lg">
          <Avatar name={learner.name} initials={learner.initials} size="xl" />
          <div className="flex flex-wrap items-center gap-stack-xs flex-1 min-w-0">
            <Badge variant={STATUS_VARIANT[learner.status]} size="normal">
              {STATUS_LABEL[learner.status]}
            </Badge>
            <Badge variant="info" size="normal">D{dreyfusLevelRound} {dreyfusLabel(dreyfusLevelRound)}</Badge>
            <AtrophieIndicator daysSinceActivity={learner.daysSinceActivity} />
          </div>
          {/* Le pourcentage était dit deux fois (en légende et sous la jauge) :
              une seule fois, sur la ligne du libellé. */}
          <div className="w-full md:w-56 flex flex-col gap-stack-xs">
            <div className="flex items-baseline justify-between text-caption text-ink-600">
              <span>Objectif</span>
              <span className="font-semibold text-ink-900 tabular-nums">{learner.progressPercent}&nbsp;%</span>
            </div>
            <ProgressBar value={learner.progressPercent} fill="brand" size="md" valueLabel={false} />
          </div>
        </Card>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-stack">
          <StatCard value={`D${learner.dreyfusAvg.toFixed(1).replace('.', ',')}`} label="Dreyfus moyen" variant="brand" size="sm" />
          <StatCard value={`${learner.streak} j`} label="Streak actuel" variant="warm" size="sm" delta={learner.streak > 0 ? `↑ actif` : 'Inactif'} deltaDirection={learner.streak > 0 ? 'up' : 'down'} />
          <StatCard value={learner.sessionsCompleted} label="Sessions complétées" size="sm" />
          <StatCard value={`${learner.totalXp.toLocaleString('fr-FR')} XP`} label="Total XP" size="sm" />
        </div>
      </div>

      <div className="flex flex-col gap-section">
        <Tabs
          items={[
            { id: 'overview', label: 'Compétences' },
            { id: 'heatmap', label: 'Heatmap' },
            { id: 'activity', label: 'Activité' },
          ]}
          value={tab}
          onChange={(id) => setTab(id as 'overview' | 'heatmap' | 'activity')}
          variant="underline"
        />

        {/* Les sections des panneaux : titre h2 posé sur la page, contenu dans
            la carte (elles étaient des h3 de 20 px enfermés dans des cartes). */}
        {tab === 'overview' && (
          <div className="grid md:grid-cols-2 gap-page md:gap-section">
            <section className="flex flex-col gap-stack min-w-0">
              <SectionHeader title="Radar compétences" meta="Niveau actuel et objectif, échelle Dreyfus 1 à 5" size="md" />
              <Card className="flex-1">
                <CompetencyRadar axes={radarAxes} size="md" showLegend />
              </Card>
            </section>
            <section className="flex flex-col gap-stack min-w-0">
              <SectionHeader title="Niveaux par compétence" meta={`${skillBars.length} compétences`} size="md" />
              <Card className="flex-1 flex flex-col gap-stack-sm">
                {skillBars.map((sb) => <SkillBar key={sb.label} label={sb.label} value={sb.value} />)}
              </Card>
            </section>
          </div>
        )}

        {tab === 'heatmap' && (
          <section className="flex flex-col gap-stack">
            <SectionHeader title="Détail Dreyfus par axe" size="md" />
            <HeatmapGrid axes={heatmapAxes} rows={heatmapRows} showLegend />
          </section>
        )}

        {tab === 'activity' && (
          <section className="flex flex-col gap-stack">
            <SectionHeader
              title="Activités récentes"
              meta={learner.recentCompletions.length > 0 ? `${learner.recentCompletions.length} activités` : undefined}
              size="md"
            />
            {learner.recentCompletions.length === 0 ? (
              <p className="text-body text-ink-600">Aucune activité récente enregistrée.</p>
            ) : (
              /* Une collection du même type : des rangées dans UNE carte, plus
                 une pile de cartes. Le type et les XP sont des données : MetaPill
                 et légende, plus des pastilles d'état. */
              <Card className="p-0">
                <ul className="flex flex-col divide-y divide-ink-100">
                  {learner.recentCompletions.map((a) => (
                    <li key={a.id} className="flex flex-wrap items-center justify-between gap-x-stack gap-y-stack-xs px-stack-md sm:px-stack-lg py-stack-sm">
                      <div className="flex items-center gap-stack-sm min-w-0">
                        <MetaPill text={a.itemType} />
                        <span className="text-body text-ink-900">{a.itemLabel}</span>
                      </div>
                      <div className="flex items-center gap-stack-sm flex-wrap text-caption text-ink-600 tabular-nums">
                        {a.npsGiven !== undefined && <span>NPS {a.npsGiven}/10</span>}
                        <span>{formatRelativeDate(a.completedAt)}</span>
                        <span className="font-semibold text-ink-700">+{a.xpEarned} XP</span>
                      </div>
                    </li>
                  ))}
                </ul>
              </Card>
            )}
          </section>
        )}
      </div>
    </PageShell>
  );
}
