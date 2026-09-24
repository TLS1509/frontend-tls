import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Target, Award, ChevronRight, Plus, Sparkles } from 'lucide-react';
import { EditorialHero } from '../components/patterns/EditorialHero';
import { SectionHeader } from '../components/patterns/SectionHeader';
import { Card } from '../components/core/Card';
import { CARD_HOVER, CARD_HOVER_NEUTRE } from '../lib/tone-classes';
import { Button } from '../components/core/Button';
import { Badge } from '../components/ui/Badge';
import { MetaPill } from '../components/ui/MetaPill';
import { ProgressBar } from '../components/ui/ProgressBar';
import { SkillBar } from '../components/ui/SkillBar';
import { GoalProgress } from '../components/ui/GoalProgress';
import { EmptyState } from '../components/ui/EmptyState';
import { Tabs } from '../components/ui/Tabs';
import { RadarChart, AreaChart, TimelineChart, GaugeChart, ChartWithExport } from '../components/charts';
import { AtrophieIndicator } from '../components/ui/AtrophieIndicator';
import { usePasseportStore } from '../stores/persistence';
import { getCompetenceById, domainLabel, competencyLevel } from '../data/competencies';
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
      level: competencyLevel(lc),
      target: lc.targetLevel ?? competencyLevel(lc),
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
    { id: 'event-1', date: '2026-01-15', type: 'lesson' as const, label: 'Terminé : Prompt Engineering 101', description: 'Maîtrise des techniques de base de rédaction de prompts' },
    { id: 'event-2', date: '2026-02-10', type: 'session' as const, label: 'Session de coaching avec Sophie', description: 'Discussion sur les compétences de leadership et la délégation' },
    { id: 'event-3', date: '2026-03-05', type: 'badge' as const, label: 'Obtenu : Badge Prompt Master', description: 'Certification avancée en prompt engineering' },
    { id: 'event-4', date: '2026-03-20', type: 'milestone' as const, label: 'Niveau Dreyfus 4 atteint', description: 'Maîtrise avancée en Leadership' },
    // « Série d'apprentissage : 30 jours — engagement quotidien constant » est
    // sorti avec l'arbitrage n°18 : plus de série quotidienne dans l'app
    // apprenant, et une série ne prouve aucune compétence.
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
    /* En-tête `flat` : encadré (`default`), son h1 partait 33 px à droite du
       bord où se posent les titres de section — deux axes sur une page qui n'en
       veut qu'un. Sans cadre, le h1, les onglets et les sections partagent le
       même bord gauche, et `PageShell` rend les 48 px du haut. */
    <PageShell width="wide">
      <EditorialHero
        eyebrow="SBO · Match"
        title="Mon Passeport Compétences"
        summary="Visualise ta progression Dreyfus, définis tes objectifs et suis l'évolution de tes compétences H.S.O."
        tone="flat"
        /* L'action principale de la page (arbitrage n°19) : le seul aplat. */
        trailing={
          <Button emphasis="solid" size="md" leadingIcon={<Plus size={16} />} onClick={() => setActiveTab('objectifs')}>
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

        {/* Overview tab — chaque bloc est une SECTION de la page : son titre
            (h2 28) est posé sur la page, la carte ne porte que l'objet (le
            graphique, la liste). Avant, six cartes à titre de 20 px se
            suivaient au même poids, et la page sautait du h1 au h3. */}
        {activeTab === 'overview' && (
          <div className="flex flex-col gap-page">

            {/* Radar + chiffres */}
            <section className="flex flex-col gap-stack">
              <SectionHeader
                title="Radar de compétences"
                subtitle="Niveau actuel (bleu) vs objectif cible (orange). Clic sur un axe pour le détail."
              />
              <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-stack items-start">
                <Card className="flex flex-col gap-stack">
                  <RadarChart
                    data={RADAR_AXES}
                    size="md"
                    onAxisClick={(axis) => setSelectedAxis(axis.label)}
                    showLegend
                  />
                  {selectedAxis && (
                    <div className="flex items-start gap-stack-xs p-stack rounded-lg bg-primary-50 border border-primary-200">
                      <div className="w-1.5 h-1.5 rounded-pill bg-primary-500 mt-2.5 shrink-0" />
                      <p className="text-body text-primary-900 max-w-prose">
                        <strong>{selectedAxis}</strong> · Vois l'onglet "Compétences" ci-dessous pour explorer cette compétence.
                      </p>
                    </div>
                  )}
                </Card>

                {/* Deux chiffres. Le libellé nomme le chiffre (légende 13/600,
                    casse normale) ; la valeur et son unité partagent la ligne de
                    base. Un seul padding (24) pour les deux cartes : à 20 et 24,
                    leurs textes ne partaient pas du même bord. */}
                <div className="flex flex-col gap-stack w-full lg:w-72">
                  <Card className="flex flex-col gap-stack-xs">
                    <p className="text-caption font-semibold text-ink-600">Progression globale</p>
                    <div className="flex items-baseline gap-stack-xs">
                      <span className="text-h2 font-display text-ink-900 tabular-nums">
                        {avgLevel.toLocaleString('fr-FR', { minimumFractionDigits: 1, maximumFractionDigits: 1 })}
                      </span>
                      <span className="text-body text-ink-600">/ 5 Dreyfus</span>
                    </div>
                    <ProgressBar value={(avgLevel / 5) * 100} fill="brand" size="md" showLabel />
                    <p className="text-caption text-ink-600">Moyenne pondérée · {COMPETENCES.length} compétences</p>
                  </Card>
                  {/* Padding canon (24) : le bouton pleine largeur du bas tombe à 25 du
                      coin, au-delà du rayon 20 — forme fixe (règle des coins imbriqués). */}
                  <Card className="flex flex-col gap-stack-xs">
                    <p className="text-caption font-semibold text-ink-600">Objectifs actifs</p>
                    <div className="flex items-baseline gap-stack-xs">
                      <span className="text-h2 font-display text-ink-900 tabular-nums">{activeObjectives.length}</span>
                      <span className="text-body text-ink-600">objectifs</span>
                    </div>
                    {/* L'action de la carte : `soft` (n°19 — `outline` est
                        réservé à Annuler). */}
                    <Button
                      emphasis="soft" size="sm" trailingIcon={<ChevronRight size={14} />}
                      className="mt-stack-xs"
                      onClick={() => setActiveTab('objectifs')}>
                      Voir les objectifs
                    </Button>
                  </Card>
                </div>
              </div>
            </section>

            {/* Temps d'apprentissage — le graphique se pose directement dans la
                carte : `ChartContainer` y ajoutait un second cadre. */}
            <section className="flex flex-col gap-stack">
              <SectionHeader
                title="Temps d'apprentissage"
                subtitle="Répartition heures/semaine entre leçons et sessions de coaching."
              />
              <Card>
                <AreaChart
                  data={LEARNING_TIME_DATA}
                  series={[
                    { key: 'lessons', label: 'Leçons (h)' },
                    { key: 'coaching', label: 'Coaching (h)' },
                  ]}
                  stacked
                  size="md"
                />
              </Card>
            </section>

            {/* Chronologie + jauge : deux sections côte à côte. La jauge garde
                sa hauteur : étirée sur celle de la chronologie, sa carte était
                une boîte vide de 500 px. */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-page lg:gap-section">
              <section className="flex flex-col gap-stack min-w-0">
                <SectionHeader
                  title="Parcours d'apprentissage"
                  subtitle="Chronologie des étapes clés et réalisations"
                />
                <Card>
                  <ChartWithExport
                    chartId="passeport-timeline"
                    filename="passeport-timeline"
                    exportVariant="compact"
                  >
                    {/* TimelineChart expose data / layout (pas events / orientation),
                        et n'a pas de prop size. */}
                    <TimelineChart
                      data={TIMELINE_EVENTS}
                      layout="vertical"
                    />
                  </ChartWithExport>
                </Card>
              </section>

              <section className="flex flex-col gap-stack min-w-0">
                <SectionHeader
                  title="Progression globale"
                  subtitle="Gauge de progression vers tes objectifs"
                />
                <Card>
                  <ChartWithExport
                    chartId="passeport-gauge"
                    filename="passeport-gauge"
                    exportVariant="compact"
                  >
                    {/* GaugeChart expose `current`, pas `value`. */}
                    <GaugeChart
                      current={avgLevel}
                      max={5}
                      variant="arc"
                      size="md"
                      tone="warm"
                      target={4.5}
                    />
                  </ChartWithExport>
                </Card>
              </section>
            </div>

            {/* Résumé par compétence — « Tout voir » rejoint le titre qu'il
                prolonge, au lieu d'un pied de carte. */}
            <section className="flex flex-col gap-stack">
              <SectionHeader
                title="Résumé par compétence"
                action={
                  <Button emphasis="ghost" size="sm" onClick={() => setActiveTab('competences')}>
                    Tout voir
                  </Button>
                }
              />
              <Card>
                <div className="flex flex-col gap-stack-sm">
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
              </Card>
            </section>

            {/* Suggested skills to develop — l'étincelle reste : c'est le
                marqueur fonctionnel d'une sortie d'IA (DESIGN.md § 10). */}
            <section className="flex flex-col gap-stack">
              <SectionHeader
                title="Propositions d'alternatives"
                subtitle="Compétences recommandées pour maximiser ta progression (IA-générées)."
                icon={Sparkles}
                variant="minimal"
                tone="sun"
              />
              {/* Des objets qu'on choisit : une grille de cartes, sans carte
                  autour (une carte de cartes ne dit rien de plus). */}
              <div className="flex flex-col gap-stack">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-stack">
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
                      <Card className={`p-stack-md flex flex-col gap-stack-xs h-full transition-all bg-gradient-to-br from-accent-50 to-yellow-50 border border-accent-200 ${CARD_HOVER['sun']} group-focus-visible:outline-2 group-focus-visible:outline-offset-2 group-focus-visible:outline-accent-400`}>
                        <div className="flex items-start justify-between gap-stack-xs">
                          <div className="flex flex-col gap-stack-3xs flex-1 min-w-0">
                            <span className="text-body font-semibold text-ink-900">{skill.label}</span>
                            <p className="text-caption text-ink-600">{skill.reason}</p>
                          </div>
                        </div>
                        {/* Une donnée, pas un état : MetaPill (arbitrages n°14-15). */}
                        <MetaPill text={skill.synergy} tone="sun" className="self-start" />
                        <p className="text-caption text-ink-600">~{skill.estimatedWeeks} semaines d'apprentissage</p>
                        <div className="text-caption font-semibold text-accent-800 transition-colors">
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
            </section>
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
            {/* Anatomie de carte : nom (h3 20) → 4 → domaine (une donnée,
                MetaPill) → 12 → niveau → 8 → progression → 12 → lien. Le nom
                était à 16/600, sous le niveau à 20 : l'œil lisait « D3 » avant
                de savoir de quelle compétence il s'agissait. */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-stack">
              {COMPETENCES.map((c) => (
                <button
                  key={c.id}
                  onClick={() => navigate(`/passeport/competence/${c.id}`)}
                  className="group text-left"
                  aria-label={`Voir le détail de ${c.label}`}
                >
                  <Card className={`flex flex-col gap-0 h-full transition-all ${CARD_HOVER_NEUTRE} group-focus-visible:outline-2 group-focus-visible:outline-offset-2 group-focus-visible:outline-primary-500`}>
                    <div className="flex items-start justify-between gap-stack-xs">
                      <div className="flex flex-col items-start gap-stack-3xs flex-1 min-w-0">
                        <h3 className="font-display text-h3 text-ink-900">{c.label}</h3>
                        <MetaPill text={domainLabel(c.domain)} tone={DOMAIN_COLORS[c.domain]} />
                      </div>
                      <div aria-label={c.daysSinceActivity > 0 ? `Compétence inactive depuis ${c.daysSinceActivity} jours` : 'Compétence active'} className="shrink-0">
                        <AtrophieIndicator daysSinceActivity={c.daysSinceActivity} currentLevel={c.level} size="sm" />
                      </div>
                    </div>
                    <div className="mt-stack-sm flex items-baseline gap-stack-xs flex-wrap">
                      <span className="text-body font-bold text-ink-900 tabular-nums">D{c.level}</span>
                      {c.target > c.level && (
                        <span className="text-caption text-ink-600 tabular-nums">objectif D{c.target}</span>
                      )}
                      {c.target === c.level && (
                        <Badge variant="success" size="compact" className="self-center">Atteint</Badge>
                      )}
                    </div>
                    <ProgressBar
                      className="mt-stack-xs"
                      value={(c.points / c.nextPoints) * 100}
                      fill={DOMAIN_COLORS[c.domain]}
                      size="sm"
                      label={`${c.points} / ${c.nextPoints} pts`}
                      showLabel
                    />
                    <div className="mt-stack-sm text-caption font-semibold text-primary-800">
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
                  <div className="mt-stack pt-stack border-t border-ink-200 flex flex-col gap-stack-xs">
                    <p className="text-caption font-semibold text-ink-600">Objectifs suggérés</p>
                    <div className="flex flex-wrap gap-stack-xs">
                      {COMPETENCES.filter(c => c.target > c.level).slice(0, 3).map((c) => (
                        <button
                          key={c.id}
                          onClick={() => {
                            setNewObjectiveCompetenceId(c.id);
                            setNewObjectiveTarget(c.target);
                            setShowObjectiveModal(true);
                          }}
                          className="group px-3 py-2 rounded-lg border border-primary-200 bg-primary-50 text-primary-800 text-caption font-medium hover:bg-primary-100 transition-colors"
                        >
                          {c.label} → D{c.target}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* L'aplat reste à « Définir un objectif », en tête de page :
                    ici, l'action de la liste (`soft`). */}
                <Button
                  emphasis="soft"
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
                actions={<Button emphasis="soft" leadingIcon={<Plus size={16} />}>Créer mon premier objectif</Button>}
              />
            )}
          </div>
        )}
    </PageShell>
  );
}
