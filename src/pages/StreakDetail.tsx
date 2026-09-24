import React from 'react';
import { Flame, Target, CheckCircle2, Lock } from 'lucide-react';
import { useGamificationStore } from '../stores/persistence';
import { MOCK_USER_ID } from '../data/passeport';
import EditorialHero from '../components/patterns/EditorialHero';
import { SectionHeader } from '../components/patterns/SectionHeader';
import { Card } from '../components/core/Card';
import { ProgressBar } from '../components/ui/ProgressBar';
import { Badge } from '../components/ui/Badge';
import { StatCard } from '../components/ui/StatCard';
import { PageShell } from '../components/layout';

// Milestone tone → icon bubble classes
const MILESTONE_BUBBLE: Record<string, string> = {
  info:    'bg-primary-100 text-primary-800',
  success: 'bg-success-bg text-success-fg',
  warm:    'bg-secondary-50 text-secondary-600',
  sun:     'bg-accent-50 text-accent-500',
};

const MILESTONE_DEFS = [
  { days: 7,   label: '1 semaine', tone: 'info'    as const },
  { days: 14,  label: '2 semaines', tone: 'success' as const },
  { days: 30,  label: '1 mois',    tone: 'warm'    as const },
  { days: 100, label: '100 jours', tone: 'sun'     as const },
];

const StreakDetail: React.FC = () => {
  const gamifStore = useGamificationStore();
  const streak = gamifStore.getStreak(MOCK_USER_ID);
  const currentStreak = streak.currentStreak;
  const longest = streak.longestStreak;

  const DAYS = Array.from({ length: 30 }, (_, i) => ({
    day: i + 1,
    active: i < currentStreak,
  }));

  const MILESTONES = MILESTONE_DEFS.map((m) => ({
    ...m,
    unlocked: currentStreak >= m.days || longest >= m.days,
    progress: Math.min(100, Math.round((currentStreak / m.days) * 100)),
  }));

  return (
    /* L'en-tête entre dans la coque : il collait au haut de l'écran, au-dessus
       d'un `PageShell` dont le haut de page était réécrit à la main. Mots et
       ordre des blocs inchangés (arbitrage n°18 en cours). */
    <PageShell width="wide">
      <EditorialHero
        eyebrow="Gamification · Streak"
        title={`${currentStreak} jours d'affilée`}
        summary={currentStreak >= 30 ? "Tu as décroché le badge 1 mois de streak." : `Encore ${30 - currentStreak} jours pour décrocher ton badge 1 mois.`}
        tone="flat"
      />

      <div className="grid grid-cols-2 md:grid-cols-4 gap-stack">
        <StatCard label="Streak actuel" value={`${currentStreak}j`} sub="Actif" icon={<Flame size={18} />} />
        <StatCard label="Streak record" value={`${longest}j`} sub="Mars 2026" />
        <StatCard label="Total jours actifs" value="142" sub="6 derniers mois" />
        <StatCard label="Reset heure" value="00:00" sub="UTC+1 Paris" />
      </div>

      {/* Titres de section (h2 28) posés sur la page ; le calendrier était
          une carte dans une carte. */}
      <section className="flex flex-col gap-stack">
        <SectionHeader title="Activité des 30 derniers jours" subtitle="Un carré = un jour. Vert = activité validée, gris = inactif" />
        <Card className="flex flex-col gap-stack">
          <div className="grid grid-cols-7 gap-tight max-w-[280px]">
            {DAYS.map((d) => (
              <div
                key={d.day}
                title={`Jour ${d.day} : ${d.active ? 'Actif' : 'Inactif'}`}
                className={`aspect-square rounded-sm ${
                  d.active ? 'bg-success-base' : 'bg-ink-100'
                }`}
              />
            ))}
          </div>
          {/* Légende en ink-600 (ink-500 est la couleur des placeholders) ;
              chaque pastille tient à son mot, 16 entre les deux. */}
          <div className="flex items-center gap-stack text-caption text-ink-600">
            <span className="inline-flex items-center gap-stack-xs"><span className="w-3 h-3 rounded-sm bg-ink-100" aria-hidden="true" /> Inactif</span>
            <span className="inline-flex items-center gap-stack-xs"><span className="w-3 h-3 rounded-sm bg-success-base" aria-hidden="true" /> Actif</span>
          </div>
        </Card>
      </section>

      {/* Paliers — des cartes qu'on regarde une à une, sans carte autour. La
          pastille (48) prend son carré (arbitrage n°3) ; la barre de
          progression prend la largeur de la carte : dans sa rangée, elle se
          réduisait à 30 px, la largeur de son libellé. */}
      <section className="flex flex-col gap-stack">
        <SectionHeader title="Milestones débloquées" subtitle="Atteins ces paliers pour gagner des badges" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-stack">
          {MILESTONES.map((m) => (
            <Card key={m.days} className="p-stack-md flex flex-row items-center gap-stack">
              {/* Icon bubble : replaces AchievementBadge (full card component, not suitable inline) */}
              <div className={`w-12 h-12 rounded-lg flex items-center justify-center shrink-0 ${MILESTONE_BUBBLE[m.tone]}`}>
                {m.unlocked
                  ? <CheckCircle2 className="w-6 h-6" />
                  : <Lock className="w-5 h-5 opacity-60" />}
              </div>
              <div className="flex-1 min-w-0 flex flex-col gap-stack-3xs">
                <div className="text-body font-semibold text-ink-900">{m.label}</div>
                <div className="text-caption text-ink-600">{m.days} jours consécutifs</div>
                {m.unlocked ? (
                  <Badge variant="success" className="self-start mt-stack-3xs">Débloqué</Badge>
                ) : (
                  <div className="flex items-end gap-stack-xs mt-stack-3xs">
                    <ProgressBar value={m.progress!} max={100} fill="brand" className="flex-1" />
                    <span className="text-caption text-ink-600 tabular-nums shrink-0">{currentStreak}/{m.days}</span>
                  </div>
                )}
              </div>
            </Card>
          ))}
        </div>
      </section>

      <Card className="p-stack-lg bg-secondary-50/50 border-secondary-200 flex flex-row items-center gap-stack">
        <Target className="w-10 h-10 text-secondary-600 shrink-0" aria-hidden="true" />
        <div className="flex-1 flex flex-col gap-stack-3xs">
          <div className="text-body font-semibold text-ink-900">Objectif du jour</div>
          <p className="text-body text-ink-700 max-w-prose">Valide une leçon ou écris une entrée de journal avant minuit pour maintenir ta streak.</p>
        </div>
      </Card>
    </PageShell>
  );
};

export default StreakDetail;
