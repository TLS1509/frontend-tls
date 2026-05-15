import React, { useState } from 'react';
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
import { CompetencyRadar } from '../components/ui/CompetencyRadar';
import { AtrophieIndicator } from '../components/ui/AtrophieIndicator';

// ─── Mock data ────────────────────────────────────────────────────────────────

const RADAR_AXES = [
  { label: 'Leadership', current: 3, target: 5 },
  { label: 'Communication', current: 4, target: 4 },
  { label: 'Analyse', current: 2, target: 4 },
  { label: 'Tech & Outils', current: 4, target: 5 },
  { label: 'Créativité', current: 1, target: 3 },
  { label: 'Coopération', current: 3, target: 4 },
];

const COMPETENCES = [
  { id: 'leadership', label: 'Leadership & Management', pilier: 'Hard', level: 3, target: 5, daysSinceActivity: 45, points: 320, nextPoints: 500 },
  { id: 'comm', label: 'Communication & Influence', pilier: 'Soft', level: 4, target: 4, daysSinceActivity: 12, points: 480, nextPoints: 500 },
  { id: 'analyse', label: 'Analyse & Décision', pilier: 'Hard', level: 2, target: 4, daysSinceActivity: 120, points: 190, nextPoints: 300 },
  { id: 'tech', label: 'Tech & Outils numériques', pilier: 'Out', level: 4, target: 5, daysSinceActivity: 3, points: 460, nextPoints: 500 },
  { id: 'creat', label: 'Créativité & Innovation', pilier: 'Soft', level: 1, target: 3, daysSinceActivity: 200, points: 70, nextPoints: 150 },
  { id: 'coop', label: 'Coopération & Équipe', pilier: 'Soft', level: 3, target: 4, daysSinceActivity: 30, points: 310, nextPoints: 400 },
];

const GOALS = [
  { id: 1, label: 'Atteindre Dreyfus 5 en Leadership', current: 3, target: 5, deadline: '2026-12-01' },
  { id: 2, label: 'Valider Analyse (D4)', current: 2, target: 4, deadline: '2026-09-01' },
];

const PILIER_COLORS: Record<string, string> = {
  Hard: 'brand',
  Soft: 'warm',
  Out: 'sun',
};

const TABS = [
  { id: 'overview', label: "Vue d'ensemble" },
  { id: 'competences', label: 'Compétences' },
  { id: 'objectifs', label: 'Objectifs' },
];

// ─── Component ────────────────────────────────────────────────────────────────

export default function Passeport() {
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedAxis, setSelectedAxis] = useState<string | null>(null);

  const handleAxisClick = (axis: { label: string }) => {
    setSelectedAxis(axis.label);
  };

  return (
    <div className="flex flex-col gap-section">
      <EditorialHero
        eyebrow="SBO · Match"
        title="Mon Passeport Compétences"
        summary="Visualise ta progression Dreyfus, définis tes objectifs et suis l'évolution de tes compétences H.S.O."
        tone="default"
        trailing={
          <Button variant="glass" size="md" leadingIcon={<Plus size={16} />}>
            Définir un objectif
          </Button>
        }
      />

      <div className="max-w-wide mx-auto w-full px-4 md:px-8 flex flex-col gap-section">

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
                <div className="flex justify-center py-4">
                  <CompetencyRadar
                    axes={RADAR_AXES}
                    size="md"
                    onAxisClick={handleAxisClick}
                  />
                </div>
                {selectedAxis && (
                  <p className="text-caption text-primary-600 text-center">
                    Axe sélectionné : <strong>{selectedAxis}</strong> — voir l'onglet Compétences pour le détail.
                  </p>
                )}
              </SectionCard>

              <div className="flex flex-col gap-stack w-full lg:w-72">
                <Card className="p-4 flex flex-col gap-3">
                  <p className="text-caption text-ink-500 font-medium uppercase tracking-wide">Progression globale</p>
                  <div className="flex items-end gap-2">
                    <span className="text-h2 font-display font-bold text-ink-900">3,0</span>
                    <span className="text-body-sm text-ink-400 pb-1">/ 5 Dreyfus</span>
                  </div>
                  <ProgressBar value={60} fill="brand" size="md" showLabel />
                  <p className="text-caption text-ink-400">Moyenne pondérée · 6 compétences</p>
                </Card>
                <Card className="p-4 flex flex-col gap-3">
                  <p className="text-caption text-ink-500 font-medium uppercase tracking-wide">Objectifs actifs</p>
                  <div className="flex items-end gap-2">
                    <span className="text-h2 font-display font-bold text-ink-900">2</span>
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
              <div className="flex flex-col gap-3">
                {COMPETENCES.map((c) => (
                  <div key={c.id} className="flex items-center gap-3">
                    <div className="flex-1 min-w-0">
                      <SkillBar
                        label={c.label}
                        value={(c.level / 5) * 100}
                        tone={PILIER_COLORS[c.pilier] as 'primary' | 'warm' | 'sun'}
                        showLabel
                      />
                    </div>
                    <AtrophieIndicator daysSinceActivity={c.daysSinceActivity} currentLevel={c.level} size="sm" showLabel={false} />
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
              subtitle="Compétences H.S.O — Dreyfus 1 à 5"
              icon={<Award size={20} />}
              tone="primary"
            />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-stack">
              {COMPETENCES.map((c) => (
                <Card key={c.id} className="p-5 flex flex-col gap-3">
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex flex-col gap-1">
                      <span className="text-body-sm font-semibold text-ink-900">{c.label}</span>
                      <Badge variant={PILIER_COLORS[c.pilier] as 'brand' | 'warm' | 'sun'} size="sm">
                        {c.pilier} Skills
                      </Badge>
                    </div>
                    <AtrophieIndicator daysSinceActivity={c.daysSinceActivity} currentLevel={c.level} size="sm" />
                  </div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-h4 font-display font-bold text-ink-900">D{c.level}</span>
                    {c.target > c.level && (
                      <span className="text-caption text-ink-400">→ objectif D{c.target}</span>
                    )}
                    {c.target === c.level && (
                      <Badge variant="success" size="sm">Objectif atteint</Badge>
                    )}
                  </div>
                  <ProgressBar
                    value={(c.points / c.nextPoints) * 100}
                    fill={PILIER_COLORS[c.pilier] as 'brand' | 'warm' | 'sun'}
                    size="sm"
                    label={`${c.points} / ${c.nextPoints} pts`}
                    showLabel
                  />
                  <Button variant="ghost" size="sm" trailingIcon={<ChevronRight size={14} />}>
                    Voir le détail
                  </Button>
                </Card>
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
            {GOALS.length > 0 ? (
              <div className="flex flex-col gap-stack">
                {GOALS.map((g) => (
                  <GoalProgress
                    key={g.id}
                    label={g.label}
                    current={g.current}
                    target={g.target}
                    deadline={g.deadline}
                  />
                ))}
                <Button variant="brand-ghost" size="md" leadingIcon={<Plus size={16} />}>
                  Ajouter un objectif
                </Button>
              </div>
            ) : (
              <EmptyState
                title="Aucun objectif défini"
                description="Définis un objectif de progression Dreyfus pour suivre ta montée en compétences."
                action={<Button variant="primary">Définir mon premier objectif</Button>}
              />
            )}
          </div>
        )}

      </div>
    </div>
  );
}
