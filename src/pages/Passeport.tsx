import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Target, TrendingUp, Award, ChevronRight, Plus, Sparkles } from 'lucide-react';
import { EditorialHero } from '../components/patterns/EditorialHero';
import { SectionHeader } from '../components/patterns/SectionHeader';
import { SectionCard } from '../components/patterns/SectionCard';
import { Card } from '../components/core/Card';
import { Button } from '../components/core/Button';
import { Badge } from '../components/ui/Badge';
import { ProgressBar } from '../components/ui/ProgressBar';
import { SkillBar } from '../components/ui/SkillBar';
import { GoalProgress } from '../components/ui/GoalProgress';
import { EmptyState } from '../components/ui/EmptyState';
import { Tabs } from '../components/ui/Tabs';
import { RadarChart, AreaChart, ChartContainer, TimelineChart, GaugeChart, ChartWithExport } from '../components/charts';
import { AtrophieIndicator } from '../components/ui/AtrophieIndicator';
import { usePasseportStore } from '../stores/persistence';
import { getCompetenceById, domainLabel } from '../data/competencies';
import { MOCK_USER_ID } from '../data/passeport';
import type { CompetenceDomain } from '../types/learning';
import { PageShell } from '../components/layout';

/** Couleur du tone par domaine H.S.O. (Cahier #02). */
const DOMAIN_COLORS: Record<CompetenceDomain, 'brand' | 'warm' | 'sun'> = {
  Soft: 'brand',
  Hard: 'warm',
  Out: 'sun',
};

const TABS = [
  { id: 'overview', label: "Vue d'ensemble" },
  { id: 'competences', label: 'Compétences' },
  { id: 'objectifs', label: 'Objectifs' },
];

// ─── Component ────────────────────────────────────────────────────────────────

export default function Passeport() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedAxis, setSelectedAxis] = useState<string | null>(null);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [showObjectiveModal, setShowObjectiveModal] = useState(false);
  const [newObjectiveCompetenceId, setNewObjectiveCompetenceId] = useState<string | null>(null);
  const [newObjectiveTarget, setNewObjectiveTarget] = useState<number>(4);
  const store = usePasseportStore();

  const learnerCompetencies = store.getCompetencies(MOCK_USER_ID);
  const objectives = store.getObjectives(MOCK_USER_ID);

  // Enrich with referential metadata
  const COMPETENCES = learnerCompetencies.map((lc) => {
    const ref = getCompetenceById(lc.competenceId);
    return {
      id: lc.competenceId,
      label: ref?.label ?? lc.competenceId,
      domain: (ref?.domain ?? 'Soft') as CompetenceDomain,
      level: lc.currentLevel,
      target: lc.targetLevel ?? lc.currentLevel,
      daysSinceActivity: lc.daysSinceActivity,
      points: lc.points,
      nextPoints: lc.nextLevelPoints,
    };
  });

  // Radar axes derived from store
  const RADAR_AXES = COMPETENCES.map((c) => ({
    label: c.label,
    current: c.level,
    target: c.target,
  }));

  // Learning time allocation data (mock: 12 weeks of lessons + coaching)
  const LEARNING_TIME_DATA = [
    { label: 'Week 1', lessons: 12, coaching: 3 },
    { label: 'Week 2', lessons: 14, coaching: 2 },
    { label: 'Week 3', lessons: 18, coaching: 5 },
    { label: 'Week 4', lessons: 16, coaching: 4 },
    { label: 'Week 5', lessons: 20, coaching: 6 },
    { label: 'Week 6', lessons: 22, coaching: 8 },
    { label: 'Week 7', lessons: 19, coaching: 5 },
    { label: 'Week 8', lessons: 24, coaching: 7 },
    { label: 'Week 9', lessons: 26, coaching: 9 },
    { label: 'Week 10', lessons: 23, coaching: 6 },
    { label: 'Week 11', lessons: 28, coaching: 10 },
    { label: 'Week 12', lessons: 30, coaching: 12 },
  ];

  // Timeline events (learner journey)
  const TIMELINE_EVENTS = [
    { id: 'event-1', date: '2026-01-15', type: 'lesson' as const, title: 'Terminé : Prompt Engineering 101', description: 'Maîtrise des techniques de base de rédaction de prompts' },
    { id: 'event-2', date: '2026-02-10', type: 'session' as const, title: 'Session de coaching avec Sophie', description: 'Discussion sur les compétences de leadership et la délégation' },
    { id: 'event-3', date: '2026-03-05', type: 'badge' as const, title: 'Obtenu : Badge Prompt Master', description: 'Certification avancée en prompt engineering' },
    { id: 'event-4', date: '2026-03-20', type: 'milestone' as const, title: 'Niveau Dreyfus 4 atteint', description: 'Maîtrise avancée en Leadership' },
    { id: 'event-5', date: '2026-04-12', type: 'achievement' as const, title: "Série d'apprentissage : 30 jours", description: "Engagement quotidien constant avec les contenus d'apprentissage" },
  ];

  // Suggested skills to develop (AI-generated alternatives based on current profile)
  const SUGGESTED_SKILLS = [
    {
      id: 'suggest-1',
      label: 'Emotional Intelligence',
      reason: 'Complémenter ta Leadership actuelle (D3 → D4)',
      synergy: 'Haute synérgie avec Communication',
      estimatedWeeks: 4,
      domain: 'Soft' as CompetenceDomain,
    },
    {
      id: 'suggest-2',
      label: 'Data Analysis',
      reason: 'Booster tes compétences Techniques (D2 → D3)',
      synergy: 'Synérgie moyenne avec Problem Solving',
      estimatedWeeks: 6,
      domain: 'Hard' as CompetenceDomain,
    },
    {
      id: 'suggest-3',
      label: 'Executive Presence',
      reason: 'Accélerer tes Soft skills (Leadership + Communication)',
      synergy: 'Très haute synérgie multi-domaine',
      estimatedWeeks: 5,
      domain: 'Out' as CompetenceDomain,
    },
  ];

  // Stats
  const avgLevel = COMPETENCES.length > 0
    ? COMPETENCES.reduce((sum, c) => sum + c.level, 0) / COMPETENCES.length
    : 0;
  const activeObjectives = objectives.filter((o) => o.status === 'active');

  return (
    <PageShell width="wide" noPadTop={true}>
      <EditorialHero
        eyebrow="SBO · Match"
        title="Mon Passeport Compétences"
        summary="Visualise ta progression Dreyfus, définis tes objectifs et suis l'évolution de tes compétences H.S.O."
        tone="default"
        trailing={
          <Button variant="glass" size="md" leadingIcon={<Plus size={16} />} onClick={() => setActiveTab('objectifs')}>
            Définir un objectif
          </Button>
        }
      />

      {/* Tab navigation */}
        <Tabs
          items={TABS}
          value={activeTab}
          onChange={setActiveTab}
          variant="underline"
        />

        {/* Overview tab */}
        {activeTab === 'overview' && (
          <div className="flex flex-col gap-section">

            {/* Radar + stats */}
            <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-section items-start">
              <SectionCard
                title="Radar de compétences"
                description="Niveau actuel (bleu) vs objectif cible (orange). Clic sur un axe pour le détail."
              >
                <RadarChart
                  data={RADAR_AXES}
                  size="md"
                  onAxisClick={(axis) => setSelectedAxis(axis.label)}
                  showLegend
                />
                {selectedAxis && (
                  <div className="flex items-start gap-stack-xs p-stack rounded-lg bg-primary-50 border border-primary-200">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary-500 mt-1.5 shrink-0" />
                    <p className="text-body-sm text-primary-900">
                      <strong>{selectedAxis}</strong> · Vois l'onglet "Compétences" ci-dessous pour explorer cette compétence.
                    </p>
                  </div>
                )}
              </SectionCard>

              <div className="flex flex-col gap-stack w-full lg:w-72">
                <Card className="p-stack flex flex-col gap-stack-xs">
                  <p className="text-caption text-ink-500 font-medium uppercase tracking-wide">Progression globale</p>
                  <div className="flex items-end gap-stack-xs">
                    <span className="text-h2 font-display font-bold text-ink-900">{avgLevel.toFixed(1)}</span>
                    <span className="text-body-sm text-ink-400 pb-1">/ 5 Dreyfus</span>
                  </div>
                  <ProgressBar value={(avgLevel / 5) * 100} fill="brand" size="md" showLabel />
                  <p className="text-caption text-ink-400">Moyenne pondérée · {COMPETENCES.length} compétences</p>
                </Card>
                <Card className="p-stack flex flex-col gap-stack-xs">
                  <p className="text-caption text-ink-500 font-medium uppercase tracking-wide">Objectifs actifs</p>
                  <div className="flex items-end gap-stack-xs">
                    <span className="text-h2 font-display font-bold text-ink-900">{activeObjectives.length}</span>
                    <span className="text-body-sm text-ink-400 pb-1">objectifs</span>
                  </div>
                  <Button variant="brand-ghost" size="sm" trailingIcon={<ChevronRight size={14} />}
                    onClick={() => setActiveTab('objectifs')}>
                    Voir les objectifs
                  </Button>
                </Card>
              </div>
            </div>

            {/* Learning time allocation */}
            <SectionCard
              title="Temps d'apprentissage"
              description="Répartition heures/semaine entre leçons et sessions de coaching."
              tone="primary"
            >
              <ChartContainer>
                <AreaChart
                  data={LEARNING_TIME_DATA}
                  series={[
                    { key: 'lessons', label: 'Leçons (h)' },
                    { key: 'coaching', label: 'Coaching (h)' },
                  ]}
                  stacked
                  size="md"
                />
              </ChartContainer>
            </SectionCard>

            {/* Timeline + Gauge charts */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-section">
              <SectionCard
                title="Parcours d'apprentissage"
                description="Chronologie des étapes clés et réalisations"
                tone="brand"
              >
                <ChartWithExport
                  chartId="passeport-timeline"
                  filename="passeport-timeline"
                  exportVariant="compact"
                >
                  <TimelineChart
                    events={TIMELINE_EVENTS}
                    orientation="vertical"
                    size="md"
                  />
                </ChartWithExport>
              </SectionCard>

              <SectionCard
                title="Progression globale"
                description="Gauge de progression vers tes objectifs"
                tone="warm"
              >
                <ChartWithExport
                  chartId="passeport-gauge"
                  filename="passeport-gauge"
                  exportVariant="compact"
                >
                  <GaugeChart
                    value={avgLevel}
                    max={5}
                    variant="arc"
                    size="md"
                    tone="warm"
                    target={4.5}
                  />
                </ChartWithExport>
              </SectionCard>
            </div>

            {/* Quick skill bars */}
            <SectionCard
              title="Résumé par compétence"
              titleIcon={<TrendingUp size={20} />}
              tone="primary"
              actions={
                <Button variant="ghost" size="sm" onClick={() => setActiveTab('competences')}>
                  Tout voir
                </Button>
              }
            >
              <div className="flex flex-col gap-stack-xs">
                {COMPETENCES.map((c) => (
                  <div key={c.id} className="flex items-center gap-stack-xs">
                    <div className="flex-1 min-w-0">
                      <SkillBar
                        label={c.label}
                        value={(c.level / 5) * 100}
                        tone={DOMAIN_COLORS[c.domain]}
                        showValue
                      />
                    </div>
                    <div aria-label={c.daysSinceActivity > 0 ? `Compétence inactive depuis ${c.daysSinceActivity} jours` : 'Compétence active'}>
                      <AtrophieIndicator daysSinceActivity={c.daysSinceActivity} currentLevel={c.level} size="sm" showLabel={false} />
                    </div>
                  </div>
                ))}
              </div>
            </SectionCard>

            {/* Suggested skills to develop */}
            <SectionCard
              title="Propositions d'alternatives"
              description="Compétences recommandées pour maximiser ta progression (IA-générées)."
              titleIcon={<Sparkles size={20} />}
              tone="sun"
            >
              <div className="flex flex-col gap-stack">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-stack-lg">
                  {SUGGESTED_SKILLS.map((skill, idx) => (
                    <button
                      key={skill.id}
                      onClick={() => {
                        setNewObjectiveCompetenceId(skill.id);
                        setShowObjectiveModal(true);
                      }}
                      className="group text-left"
                      style={{
                        animation: showSuggestions
                          ? `slideIn 0.4s ease-out ${idx * 100}ms forwards`
                          : 'none',
                        opacity: showSuggestions ? 1 : 0,
                        transform: showSuggestions ? 'translateY(0)' : 'translateY(16px)',
                      }}
                    >
                      <Card className="p-5 flex flex-col gap-stack-xs h-full transition-all bg-gradient-to-br from-accent-50 to-yellow-50 border border-accent-200 group-hover:shadow-card-hover group-focus-visible:outline-2 group-focus-visible:outline-offset-2 group-focus-visible:outline-accent-400">
                        <div className="flex items-start justify-between gap-stack-xs">
                          <div className="flex flex-col gap-tight flex-1 min-w-0">
                            <span className="text-body-sm font-semibold text-ink-900">{skill.label}</span>
                            <p className="text-caption text-ink-600">{skill.reason}</p>
                          </div>
                        </div>
                        <Badge variant="sun" size="sm">{skill.synergy}</Badge>
                        <p className="text-caption text-ink-500">~{skill.estimatedWeeks} semaines d'apprentissage</p>
                        <div className="text-caption text-accent-600 group-hover:text-accent-700 transition-colors font-medium">
                          Créer objectif →
                        </div>
                      </Card>
                    </button>
                  ))}
                </div>
                <style>{`
                  @keyframes slideIn {
                    from {
                      opacity: 0;
                      transform: translateY(16px);
                    }
                    to {
                      opacity: 1;
                      transform: translateY(0);
                    }
                  }
                `}</style>
              </div>
            </SectionCard>
          </div>
        )}

        {/* Compétences tab */}
        {activeTab === 'competences' && (
          <div className="flex flex-col gap-stack">
            <SectionHeader
              title="Toutes mes compétences"
              subtitle="Compétences H.S.O : Dreyfus 1 à 5"
              icon={<Award size={20} />}
              tone="primary"
            />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-stack">
              {COMPETENCES.map((c) => (
                <button
                  key={c.id}
                  onClick={() => navigate(`/passeport/competence/${c.id}`)}
                  className="group text-left"
                  aria-label={`Voir le détail de ${c.label}`}
                >
                  <Card className="p-5 flex flex-col gap-stack-xs h-full transition-all group-hover:shadow-card-hover group-focus-visible:outline-2 group-focus-visible:outline-offset-2 group-focus-visible:outline-primary-500">
                    <div className="flex items-start justify-between gap-stack-xs">
                      <div className="flex flex-col gap-tight flex-1 min-w-0">
                        <span className="text-body-sm font-semibold text-ink-900">{c.label}</span>
                        <Badge variant={DOMAIN_COLORS[c.domain]} size="sm">
                          {domainLabel(c.domain)}
                        </Badge>
                      </div>
                      <div aria-label={c.daysSinceActivity > 0 ? `Compétence inactive depuis ${c.daysSinceActivity} jours` : 'Compétence active'} className="shrink-0">
                        <AtrophieIndicator daysSinceActivity={c.daysSinceActivity} currentLevel={c.level} size="sm" />
                      </div>
                    </div>
                    <div className="flex items-center gap-stack-xs flex-wrap">
                      <span className="text-h4 font-display font-bold text-ink-900">D{c.level}</span>
                      {c.target > c.level && (
                        <span className="text-caption text-ink-500">→ D{c.target}</span>
                      )}
                      {c.target === c.level && (
                        <Badge variant="success" size="sm">Atteint</Badge>
                      )}
                    </div>
                    <ProgressBar
                      value={(c.points / c.nextPoints) * 100}
                      fill={DOMAIN_COLORS[c.domain]}
                      size="sm"
                      label={`${c.points} / ${c.nextPoints} pts`}
                      showLabel
                    />
                    <div className="text-caption text-ink-400 group-hover:text-primary-600 transition-colors">
                      Voir le détail →
                    </div>
                  </Card>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Objectifs tab */}
        {activeTab === 'objectifs' && (
          <div className="flex flex-col gap-stack">
            <SectionHeader
              title="Mes objectifs"
              subtitle="Suivis de progression vers les niveaux Dreyfus cibles"
              icon={<Target size={20} />}
              tone="primary"
            />
            {activeObjectives.length > 0 ? (
              <div className="flex flex-col gap-stack">
                {activeObjectives.map((obj, idx) => {
                  const ref = getCompetenceById(obj.competenceId);
                  const label = ref ? `Atteindre D${obj.targetLevel} en ${ref.label}` : `Objectif D${obj.targetLevel}`;
                  const daysRemaining = Math.ceil((new Date(obj.deadline).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24));
                  return (
                    <div
                      key={obj.id}
                      style={{
                        animation: `slideIn 0.4s ease-out ${idx * 100}ms forwards`,
                        opacity: 1,
                      }}
                    >
                      <GoalProgress
                        goal={label}
                        percentComplete={obj.progressPct}
                        daysRemaining={daysRemaining}
                        isOnTrack={daysRemaining > 0}
                      />
                    </div>
                  );
                })}

                {/* Suggested objective targets */}
                {activeObjectives.length < 3 && (
                  <div className="mt-stack pt-stack border-t border-ink-200">
                    <p className="text-caption text-ink-500 mb-stack-xs font-medium">Objectifs suggérés :</p>
                    <div className="flex flex-wrap gap-stack-xs">
                      {COMPETENCES.filter(c => c.target > c.level).slice(0, 3).map((c) => (
                        <button
                          key={c.id}
                          onClick={() => {
                            setNewObjectiveCompetenceId(c.id);
                            setNewObjectiveTarget(c.target);
                            setShowObjectiveModal(true);
                          }}
                          className="group px-3 py-2 rounded-lg border border-primary-200 bg-primary-50 text-primary-700 text-caption font-medium hover:bg-primary-100 transition-colors"
                        >
                          {c.label} → D{c.target}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                <Button
                  variant="brand-ghost"
                  size="md"
                  leadingIcon={<Plus size={16} />}
                  onClick={() => setShowObjectiveModal(true)}
                  className="mt-stack"
                >
                  Ajouter un objectif
                </Button>
                <style>{`
                  @keyframes slideIn {
                    from {
                      opacity: 0;
                      transform: translateY(12px);
                    }
                    to {
                      opacity: 1;
                      transform: translateY(0);
                    }
                  }
                `}</style>
              </div>
            ) : (
              <EmptyState
                title="Aucun objectif pour le moment"
                description="Crée ton premier objectif pour structurer ta progression. Fixe un niveau Dreyfus cible et un délai : c'est le secret pour progresser."
                actions={<Button variant="primary" leadingIcon={<Plus size={16} />}>Créer mon premier objectif</Button>}
              />
            )}
          </div>
        )}
    </PageShell>
  );
}
