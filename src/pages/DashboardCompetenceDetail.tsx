import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Target, TrendingUp, Clock, BookOpen, ChevronRight } from 'lucide-react';
import { EditorialHero } from '../components/patterns/EditorialHero';
import { SectionCard } from '../components/patterns/SectionCard';
import { Card } from '../components/core/Card';
import { Button } from '../components/core/Button';
import { Badge } from '../components/ui/Badge';
import { ProgressBar } from '../components/ui/ProgressBar';
import { SkillBar } from '../components/ui/SkillBar';
import { CompetencyRadar } from '../components/ui/CompetencyRadar';
import { StatCard } from '../components/ui/StatCard';
import { ActivityFeed } from '../components/patterns/ActivityFeed';

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
  { id: '2', type: 'coaching' as const, title: 'Session coaching — bilan D3', date: 'La semaine dernière', xp: 100 },
  { id: '3', type: 'parcours' as const, title: 'Exercice : Délégation et contrôle', date: 'Il y a 10j', xp: 50 },
];

// ─── Component ────────────────────────────────────────────────────────────────

export default function DashboardCompetenceDetail() {
  const { id } = useParams<{ id: string }>();
  const _ = id;
  const [tab, setTab] = useState<'radar' | 'skills' | 'activity'>('radar');

  return (
    <div className="flex flex-col gap-section">
      <EditorialHero
        eyebrow="Dashboard · Compétence"
        title={COMPETENCE.label}
        subtitle={`Niveau Dreyfus D${COMPETENCE.currentLevel} → Objectif D${COMPETENCE.targetLevel} · ${COMPETENCE.progress}% de progression`}
        tone="primary"
        actions={
          <Button variant="glass" size="md" leadingIcon={<Target size={16} />}>
            Voir le passeport complet
          </Button>
        }
      />

      <div className="max-w-wide mx-auto w-full px-4 md:px-8 flex flex-col gap-section">

        {/* KPI row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-stack">
          <StatCard value={`D${COMPETENCE.currentLevel}`} label="Niveau actuel" variant="brand" size="sm" />
          <StatCard value={`${COMPETENCE.xp} XP`} label="Points gagnés" size="sm" delta={`+${COMPETENCE.weeklyProgress * 25} cette semaine`} deltaDirection="up" />
          <StatCard value={`${COMPETENCE.progress}%`} label="Progression cible" size="sm" />
          <StatCard value={`D${COMPETENCE.targetLevel}`} label="Objectif" size="sm" />
        </div>

        {/* Progress bar */}
        <SectionCard title={`Progression D${COMPETENCE.currentLevel} → D${COMPETENCE.targetLevel}`} icon={<TrendingUp size={18} />}>
          <div className="flex flex-col gap-2">
            <div className="flex justify-between text-caption text-ink-500">
              <span>{COMPETENCE.xp} XP accumulés</span>
              <span>{COMPETENCE.nextLevelXp - COMPETENCE.xp} XP restants</span>
            </div>
            <ProgressBar value={Math.round((COMPETENCE.xp / COMPETENCE.nextLevelXp) * 100)} tone="primary" size="lg" showLabel />
          </div>
        </SectionCard>

        {/* Tabs */}
        <div className="flex gap-2 border-b border-ink-100">
          {(['radar', 'skills', 'activity'] as const).map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={[
                'px-4 py-2 text-body-sm font-semibold transition-colors duration-fast',
                tab === t ? 'text-primary-700 border-b-2 border-primary-600' : 'text-ink-500 hover:text-ink-900',
              ].join(' ')}
            >
              {t === 'radar' ? 'Radar' : t === 'skills' ? 'Sous-compétences' : 'Activités récentes'}
            </button>
          ))}
        </div>

        {tab === 'radar' && (
          <SectionCard title="Radar détaillé" icon={<Target size={18} />}>
            <CompetencyRadar axes={RADAR_AXES} size="lg" showLegend />
          </SectionCard>
        )}

        {tab === 'skills' && (
          <SectionCard title="Sous-compétences" icon={<BookOpen size={18} />}>
            <div className="flex flex-col gap-3">
              {SKILLS.map((s) => <SkillBar key={s.label} label={s.label} value={s.value} max={s.max} />)}
            </div>
          </SectionCard>
        )}

        {tab === 'activity' && (
          <SectionCard title="Activités récentes" icon={<Clock size={18} />}>
            <div className="flex flex-col gap-2">
              {ACTIVITY_ITEMS.map((item) => (
                <Card key={item.id} variant="default" className="flex items-center justify-between px-4 py-3">
                  <div className="flex flex-col gap-tight">
                    <span className="text-body-sm font-medium text-ink-900">{item.title}</span>
                    <span className="text-caption text-ink-400">{item.date}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant="success" size="sm">+{item.xp} XP</Badge>
                    <ChevronRight size={16} className="text-ink-300" />
                  </div>
                </Card>
              ))}
            </div>
          </SectionCard>
        )}

        <div className="flex justify-center pb-section">
          <Button variant="primary" size="lg" leadingIcon={<BookOpen size={18} />}>
            Continuer ma progression
          </Button>
        </div>

      </div>
    </div>
  );
}
