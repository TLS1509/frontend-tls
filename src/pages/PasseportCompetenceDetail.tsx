import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Target, TrendingUp, BookOpen, Flame, ArrowLeft } from 'lucide-react';
import { EditorialHero } from '../components/patterns/EditorialHero';
import { SectionCard } from '../components/patterns/SectionCard';
import { Button } from '../components/core/Button';
import { Badge } from '../components/ui/Badge';
import { ProgressBar } from '../components/ui/ProgressBar';
import { SkillBar } from '../components/ui/SkillBar';
import { AtrophieIndicator } from '../components/ui/AtrophieIndicator';
import { CompetencyRadar } from '../components/ui/CompetencyRadar';
import { StatCard } from '../components/ui/StatCard';
import { usePasseportStore } from '../stores/persistence';
import { getCompetenceById, domainLabel } from '../data/competencies';
import { MOCK_USER_ID } from '../data/passeport';
import type { CompetenceDomain } from '../types/learning';

const DREYFUS_DESC = [
  { level: 1, label: 'Novice',     desc: 'Applique des règles simples sans contexte.' },
  { level: 2, label: 'Apprenant',  desc: 'Reconnaît les situations récurrentes.' },
  { level: 3, label: 'Compétent',  desc: 'Planifie et adapte selon le contexte.' },
  { level: 4, label: 'Expert',     desc: 'Perçoit les situations de façon holistique.' },
  { level: 5, label: 'Maître',     desc: 'Intuition et excellence situationnelle.' },
] as const;

const DOMAIN_TONE: Record<CompetenceDomain, 'default' | 'warm' | 'sun'> = {
  Soft: 'default',
  Hard: 'warm',
  Out: 'sun',
};

export default function PasseportCompetenceDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'progress' | 'skills' | 'activity'>('progress');
  const store = usePasseportStore();

  const competencies = store.getCompetencies(MOCK_USER_ID);
  const progressions = store.getProgressions(MOCK_USER_ID);
  const lc = competencies.find((c) => c.competenceId === id) ?? competencies[0];
  const ref = getCompetenceById(lc?.competenceId ?? '');

  const currentLevel = lc?.currentLevel ?? 1;
  const targetLevel = lc?.targetLevel ?? currentLevel;
  const points = lc?.points ?? 0;
  const nextLevelPoints = lc?.nextLevelPoints ?? 100;
  const daysSinceActivity = lc?.daysSinceActivity ?? 0;
  const domain = (ref?.domain ?? 'Soft') as CompetenceDomain;
  const label = ref?.label ?? (id ?? 'Compétence');
  const description = ref?.description ?? '';

  const progressPct = Math.round((currentLevel / targetLevel) * 100);
  const xpPct = Math.round((points / nextLevelPoints) * 100);

  // Progressions for this competency (activity tab)
  const competencyProgressions = progressions
    .filter((p) => p.competenceId === lc?.competenceId)
    .sort((a, b) => new Date(b.occurredAt).getTime() - new Date(a.occurredAt).getTime())
    .slice(0, 5);

  // Radar: sibling competencies in same domain for context
  const siblingCompetencies = competencies
    .map((c) => {
      const r = getCompetenceById(c.competenceId);
      return r ? { label: r.label, current: c.currentLevel, target: c.targetLevel ?? c.currentLevel } : null;
    })
    .filter(Boolean)
    .slice(0, 6) as { label: string; current: number; target: number }[];

  return (
    <div className="flex flex-col gap-section">
      <EditorialHero
        eyebrow={`Passeport · ${domainLabel(domain)}`}
        title={label}
        summary={description || `Compétence du domaine ${domain} — suivi Dreyfus 1 à 5.`}
        tone={DOMAIN_TONE[domain]}
        trailing={
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="md" leadingIcon={<ArrowLeft size={16} />} onClick={() => navigate('/passeport')}>
              Retour
            </Button>
            <Button variant="glass" size="md" leadingIcon={<Target size={16} />}>
              Définir un objectif
            </Button>
          </div>
        }
      />

      <div className="max-w-wide mx-auto w-full px-4 md:px-8 flex flex-col gap-section">

        {/* KPI row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-stack">
          <StatCard
            value={`D${currentLevel}`}
            label="Niveau actuel"
            delta={`→ D${targetLevel}`}
            deltaDirection="up"
            variant="brand"
            size="sm"
          />
          <StatCard
            value={`${points} XP`}
            label="Points accumulés"
            delta={`${nextLevelPoints - points} pour D${currentLevel < 5 ? currentLevel + 1 : 5}`}
            deltaDirection="up"
            size="sm"
          />
          <StatCard
            value={`${progressPct}%`}
            label="Progression cible"
            size="sm"
          />
          <StatCard
            value={`${daysSinceActivity}j`}
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
            {DREYFUS_DESC.map((d) => (
              <div
                key={d.level}
                className={[
                  'flex items-start gap-stack p-4 rounded-xl border transition-all duration-base',
                  d.level === currentLevel
                    ? 'bg-primary-50 border-primary-200 shadow-sm'
                    : 'bg-white border-ink-100',
                ].join(' ')}
              >
                <span className={[
                  'inline-flex items-center justify-center w-8 h-8 rounded-lg text-caption font-bold shrink-0',
                  d.level === currentLevel ? 'bg-primary-600 text-white' : d.level < currentLevel ? 'bg-success-bg text-success-fg' : 'bg-ink-100 text-ink-400',
                ].join(' ')}>
                  D{d.level}
                </span>
                <div className="flex flex-col gap-tight min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-body-sm font-semibold text-ink-900">{d.label}</span>
                    {d.level === currentLevel && <Badge variant="info" size="sm">Ton niveau</Badge>}
                    {d.level === targetLevel && d.level !== currentLevel && <Badge variant="brand" size="sm">Objectif</Badge>}
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
            <SectionCard title="Radar compétences" titleIcon={<Target size={18} />}>
              <CompetencyRadar axes={siblingCompetencies.length > 2 ? siblingCompetencies : [{ label, current: currentLevel, target: targetLevel }]} size="md" showLegend />
            </SectionCard>
            <SectionCard title="Progression XP" titleIcon={<Flame size={18} />}>
              <div className="flex flex-col gap-stack">
                <div className="flex items-center justify-between">
                  <span className="text-body-sm text-ink-600">Niveau D{currentLevel} → D{currentLevel < 5 ? currentLevel + 1 : 5}</span>
                  <span className="text-caption font-semibold text-primary-700">{points} / {nextLevelPoints} XP</span>
                </div>
                <ProgressBar value={xpPct} fill="brand" size="md" showLabel />
                <AtrophieIndicator daysSinceActivity={daysSinceActivity} currentLevel={currentLevel} />
              </div>
            </SectionCard>
          </div>
        )}

        {activeTab === 'skills' && (
          <SectionCard title="Compétences du même domaine" titleIcon={<BookOpen size={18} />}>
            <div className="flex flex-col gap-3">
              {siblingCompetencies.map((sc) => (
                <SkillBar key={sc.label} label={sc.label} value={(sc.current / 5) * 100} tone="brand" showValue />
              ))}
            </div>
          </SectionCard>
        )}

        {activeTab === 'activity' && (
          <SectionCard title="Progressions récentes" titleIcon={<TrendingUp size={18} />}>
            {competencyProgressions.length > 0 ? (
              <div className="flex flex-col gap-2">
                {competencyProgressions.map((p) => (
                  <div key={p.id} className="flex items-center justify-between px-4 py-3 rounded-lg border border-ink-100">
                    <div className="flex flex-col gap-tight">
                      <span className="text-body-sm font-medium text-ink-900">{p.title}</span>
                      <span className="text-caption text-ink-400">{new Date(p.occurredAt).toLocaleDateString('fr-FR', { day: 'numeric', month: 'short', year: 'numeric' })}</span>
                    </div>
                    {p.newLevel && <Badge variant="success" size="sm">D{p.newLevel}</Badge>}
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-body-sm text-ink-500 m-0">Aucune activité enregistrée pour cette compétence.</p>
            )}
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
