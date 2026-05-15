import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Target, TrendingUp, BookOpen, Clock, ChevronRight, Flame } from 'lucide-react';
import { EditorialHero } from '../components/patterns/EditorialHero';
import { SectionCard } from '../components/patterns/SectionCard';
import { SectionHeader } from '../components/patterns/SectionHeader';
import { Card } from '../components/core/Card';
import { Button } from '../components/core/Button';
import { Badge } from '../components/ui/Badge';
import { ProgressBar } from '../components/ui/ProgressBar';
import { SkillBar } from '../components/ui/SkillBar';
import { AtrophieIndicator } from '../components/ui/AtrophieIndicator';
import { CompetencyRadar } from '../components/ui/CompetencyRadar';
import { StatCard } from '../components/ui/StatCard';

// ─── Mock data ────────────────────────────────────────────────────────────────

const COMPETENCE = {
  id: 'leadership',
  label: 'Leadership & Management',
  /** Domaine H.S.O. (Cahier #02) — Humain | Savoirs | Organisation */
  domain: 'Humain' as const,
  domainColor: 'primary' as const,
  currentLevel: 3,
  targetLevel: 5,
  points: 320,
  nextLevelPoints: 500,
  daysSinceActivity: 12,
  description: 'Capacité à inspirer, guider et développer une équipe vers l\'atteinte d\'objectifs communs. Englobe la prise de décision, la gestion de conflits et le développement des talents.',
  // Dreyfus labels FR canoniques (Cahier #02) : Novice / Apprenant / Compétent / Expert / Maître
  dreyfusDesc: [
    { level: 1, label: 'Novice', desc: 'Applique des règles simples sans contexte.' },
    { level: 2, label: 'Apprenant', desc: 'Reconnaît les situations récurrentes.' },
    { level: 3, label: 'Compétent', desc: 'Planifie et adapte selon le contexte.', current: true },
    { level: 4, label: 'Expert', desc: 'Perçoit les situations de façon holistique.' },
    { level: 5, label: 'Maître', desc: 'Intuition et excellence situationnelle.' },
  ],
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
  { label: 'Donner du feedback constructif', level: 3, max: 5 },
  { label: 'Animer une réunion d\'équipe', level: 4, max: 5 },
  { label: 'Gérer un conflit interpersonnel', level: 2, max: 5 },
  { label: 'Définir une vision claire', level: 3, max: 5 },
  { label: 'Déléguer efficacement', level: 4, max: 5 },
];

const ACTIVITIES = [
  { id: 1, type: 'lesson', label: 'Leçon : Les styles de leadership', date: 'Hier', points: 25 },
  { id: 2, type: 'exercise', label: 'Exercice : Cas de délégation', date: 'Il y a 3j', points: 50 },
  { id: 3, type: 'coaching', label: 'Session coaching — feedback 360°', date: 'La semaine dernière', points: 100 },
];

// ─── Component ────────────────────────────────────────────────────────────────

export default function PasseportCompetenceDetail() {
  const { id } = useParams<{ id: string }>();
  const [activeTab, setActiveTab] = useState<'progress' | 'skills' | 'activity'>('progress');
  const _ = id; // used for routing

  const progressPct = Math.round((COMPETENCE.currentLevel / COMPETENCE.targetLevel) * 100);
  const xpPct = Math.round((COMPETENCE.points / COMPETENCE.nextLevelPoints) * 100);

  return (
    <div className="flex flex-col gap-section">
      <EditorialHero
        eyebrow={`Passeport · ${COMPETENCE.domain}`}
        title={COMPETENCE.label}
        summary={COMPETENCE.description}
        tone="default"
        trailing={
          <div className="flex items-center gap-3">
            <Button variant="glass" size="md" leadingIcon={<Target size={16} />}>
              Définir un objectif
            </Button>
            <Button variant="ghost" size="md">
              Historique
            </Button>
          </div>
        }
      />

      <div className="max-w-wide mx-auto w-full px-4 md:px-8 flex flex-col gap-section">

        {/* KPI row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-stack">
          <StatCard
            value={`D${COMPETENCE.currentLevel}`}
            label="Niveau actuel"
            delta={`→ D${COMPETENCE.targetLevel}`}
            deltaDirection="up"
            variant="brand"
            size="sm"
          />
          <StatCard
            value={`${COMPETENCE.points} XP`}
            label="Points accumulés"
            delta={`${COMPETENCE.nextLevelPoints - COMPETENCE.points} pour D${COMPETENCE.currentLevel + 1}`}
            deltaDirection="up"
            size="sm"
          />
          <StatCard
            value={`${progressPct}%`}
            label="Progression cible"
            size="sm"
          />
          <StatCard
            value={`${COMPETENCE.daysSinceActivity}j`}
            label="Dernière activité"
            size="sm"
          />
        </div>

        {/* Dreyfus scale */}
        <SectionCard
          title="Échelle Dreyfus"
          description="Ta position actuelle sur le parcours d'expertise"
          titleIcon={<TrendingUp size={20} />}
        >
          <div className="flex flex-col gap-2">
            {COMPETENCE.dreyfusDesc.map((d) => (
              <div
                key={d.level}
                className={[
                  'flex items-start gap-stack p-4 rounded-xl border transition-all duration-base',
                  d.current
                    ? 'bg-primary-50 border-primary-200 shadow-sm'
                    : 'bg-white border-ink-100',
                ].join(' ')}
              >
                <span className={[
                  'inline-flex items-center justify-center w-8 h-8 rounded-lg text-caption font-bold shrink-0',
                  d.current ? 'bg-primary-600 text-white' : d.level < COMPETENCE.currentLevel ? 'bg-success-bg text-success-fg' : 'bg-ink-100 text-ink-400',
                ].join(' ')}>
                  D{d.level}
                </span>
                <div className="flex flex-col gap-tight min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-body-sm font-semibold text-ink-900">{d.label}</span>
                    {d.current && <Badge variant="info" size="sm">Ton niveau</Badge>}
                    {d.level === COMPETENCE.targetLevel && <Badge variant="brand" size="sm">Objectif</Badge>}
                  </div>
                  <p className="text-caption text-ink-500">{d.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </SectionCard>

        {/* Tabs */}
        <div className="flex gap-2 border-b border-ink-100">
          {(['progress', 'skills', 'activity'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={[
                'px-4 py-2 text-body-sm font-semibold transition-colors duration-fast',
                activeTab === tab
                  ? 'text-primary-700 border-b-2 border-primary-600'
                  : 'text-ink-500 hover:text-ink-900',
              ].join(' ')}
            >
              {tab === 'progress' ? 'Progression' : tab === 'skills' ? 'Sous-compétences' : 'Activités'}
            </button>
          ))}
        </div>

        {activeTab === 'progress' && (
          <div className="grid md:grid-cols-2 gap-section">
            <SectionCard title="Radar de compétence" titleIcon={<Target size={18} />}>
              <CompetencyRadar axes={RADAR_AXES} size="md" showLegend />
            </SectionCard>
            <SectionCard title="Progression XP" titleIcon={<Flame size={18} />}>
              <div className="flex flex-col gap-stack">
                <div className="flex items-center justify-between">
                  <span className="text-body-sm text-ink-600">Niveau D{COMPETENCE.currentLevel} → D{COMPETENCE.currentLevel + 1}</span>
                  <span className="text-caption font-semibold text-primary-700">{COMPETENCE.points} / {COMPETENCE.nextLevelPoints} XP</span>
                </div>
                <ProgressBar value={xpPct} fill="brand" size="md" showLabel />
                <AtrophieIndicator daysSinceActivity={COMPETENCE.daysSinceActivity} currentLevel={COMPETENCE.currentLevel} />
              </div>
            </SectionCard>
          </div>
        )}

        {activeTab === 'skills' && (
          <SectionCard title="Sous-compétences" titleIcon={<BookOpen size={18} />}>
            <div className="flex flex-col gap-3">
              {SKILLS.map((skill) => (
                <SkillBar key={skill.label} label={skill.label} value={skill.level} />
              ))}
            </div>
          </SectionCard>
        )}

        {activeTab === 'activity' && (
          <SectionCard title="Activités récentes" titleIcon={<Clock size={18} />}>
            <div className="flex flex-col gap-2">
              {ACTIVITIES.map((act) => (
                <Card key={act.id} variant="default" className="flex items-center justify-between px-4 py-3">
                  <div className="flex flex-col gap-tight">
                    <span className="text-body-sm font-medium text-ink-900">{act.label}</span>
                    <span className="text-caption text-ink-400">{act.date}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant="success" size="sm">+{act.points} XP</Badge>
                    <ChevronRight size={16} className="text-ink-300" />
                  </div>
                </Card>
              ))}
            </div>
          </SectionCard>
        )}

        {/* CTA */}
        <div className="flex justify-center pb-section">
          <Button variant="primary" size="lg" leadingIcon={<BookOpen size={18} />}>
            Continuer ma progression
          </Button>
        </div>

      </div>
    </div>
  );
}
