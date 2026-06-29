import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Target, TrendingUp, Award, ChevronRight, Plus } from 'lucide-react';
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
import { RadarChart } from '../components/charts';
import { AtrophieIndicator } from '../components/ui/AtrophieIndicator';
import { usePasseportStore } from '../stores/persistence';
import { getCompetenceById, domainLabel } from '../data/competencies';
import { MOCK_USER_ID } from '../data/passeport';
import type { CompetenceDomain } from '../types/learning';
import { Container } from '../components/layout';

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

  // Stats
  const avgLevel = COMPETENCES.length > 0
    ? COMPETENCES.reduce((sum, c) => sum + c.level, 0) / COMPETENCES.length
    : 0;
  const activeObjectives = objectives.filter((o) => o.status === 'active');

  return (
    <div className="flex flex-col gap-section">
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

      <Container width="wide" padding={false} className="px-stack md:px-section flex flex-col gap-section">

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
                {activeObjectives.map((obj) => {
                  const ref = getCompetenceById(obj.competenceId);
                  const label = ref ? `Atteindre D${obj.targetLevel} en ${ref.label}` : `Objectif D${obj.targetLevel}`;
                  const daysRemaining = Math.ceil((new Date(obj.deadline).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24));
                  return (
                    <GoalProgress
                      key={obj.id}
                      goal={label}
                      percentComplete={obj.progressPct}
                      daysRemaining={daysRemaining}
                      isOnTrack={daysRemaining > 0}
                    />
                  );
                })}
                <Button variant="brand-ghost" size="md" leadingIcon={<Plus size={16} />}>
                  Ajouter un objectif
                </Button>
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

      </Container>
    </div>
  );
}
