import React, { useState } from 'react';
import { AlertTriangle, Users, Clock, Calendar, MessageSquare, Sparkles, TrendingUp } from 'lucide-react';
import { EditorialHero } from '../components/patterns/EditorialHero';
import { SectionCard } from '../components/patterns/SectionCard';
import { Card } from '../components/core/Card';
import { Button } from '../components/core/Button';
import { Badge } from '../components/ui/Badge';
import { StatCard } from '../components/ui/StatCard';
import { Avatar } from '../components/ui/Avatar';
import { FilterChip } from '../components/ui/FilterChip';
import { AtrophieIndicator } from '../components/ui/AtrophieIndicator';
import { AITransparencyLabel } from '../components/ui/AITransparencyLabel';

// ─── Mock data ────────────────────────────────────────────────────────────────

type StagnationSeverity = 'critical' | 'medium' | 'resolved';

interface StagnantLearner {
  id: string;
  name: string;
  role: string;
  daysSinceActivity: number;
  stagnationDays: number;
  blockedSkill: string;
  dreyfusLevel: number;
  severity: StagnationSeverity;
}

const STAGNANT_LEARNERS: StagnantLearner[] = [
  {
    id: '1',
    name: 'Marie Dupont',
    role: 'Commercial · Équipe Sud',
    daysSinceActivity: 195,
    stagnationDays: 72,
    blockedSkill: 'Négociation avancée',
    dreyfusLevel: 2,
    severity: 'critical',
  },
  {
    id: '2',
    name: 'Thomas Bernard',
    role: 'Manager · Équipe Nord',
    daysSinceActivity: 210,
    stagnationDays: 64,
    blockedSkill: 'Leadership situationnel',
    dreyfusLevel: 3,
    severity: 'critical',
  },
  {
    id: '3',
    name: 'Camille Rousseau',
    role: 'RH · Siège',
    daysSinceActivity: 105,
    stagnationDays: 45,
    blockedSkill: 'Conduite du changement',
    dreyfusLevel: 2,
    severity: 'medium',
  },
  {
    id: '4',
    name: 'Lucas Martin',
    role: 'Développeur · Tech',
    daysSinceActivity: 98,
    stagnationDays: 38,
    blockedSkill: 'Architecture logicielle',
    dreyfusLevel: 3,
    severity: 'medium',
  },
  {
    id: '5',
    name: 'Sophie Leclerc',
    role: 'Finance · Comptabilité',
    daysSinceActivity: 91,
    stagnationDays: 31,
    blockedSkill: 'Analyse financière',
    dreyfusLevel: 1,
    severity: 'medium',
  },
];

const AI_SUGGESTIONS = [
  {
    id: 'suggestion-1',
    learnerName: 'Marie Dupont',
    advice: 'Proposer une session de pratique délibérée en binôme avec un expert niveau 4+ en négociation. Le stade compétent (niveau 2) nécessite des cas réels guidés pour franchir le palier.',
    actionLabel: 'Planifier session binôme',
  },
  {
    id: 'suggestion-2',
    learnerName: 'Thomas Bernard',
    advice: 'Orienter vers le module "Leadership en situation d\'incertitude" (15 min/jour × 5 jours). Les données montrent que les apprenants au niveau 3 progressent mieux avec un format micro-learning intensif.',
    actionLabel: 'Assigner le module',
  },
  {
    id: 'suggestion-3',
    learnerName: 'Camille Rousseau',
    advice: 'Envoyer un message de relance personnalisé avec un défi terrain concret (ex. animer une réunion de changement cette semaine). L\'engagement actif accélère la sortie de stagnation au niveau 2.',
    actionLabel: 'Envoyer le défi',
  },
];

type FilterKey = 'all' | 'critical' | 'medium' | 'resolved';

// ─── Component ────────────────────────────────────────────────────────────────

export default function AlerteStagnation() {
  const [activeFilter, setActiveFilter] = useState<FilterKey>('all');

  const filteredLearners = STAGNANT_LEARNERS.filter((l) => {
    if (activeFilter === 'all') return true;
    return l.severity === activeFilter;
  });

  return (
    <div className="flex flex-col gap-section">
      <EditorialHero
        eyebrow="Coach · Alertes"
        title="Alertes Stagnation"
        summary="Apprenants dont la progression Dreyfus est bloquée depuis plus de 30 jours. Interviens avant qu'ils décrochent."
        tone="warm"
        trailing={
          <Badge variant="sun" size="md">3 stagnations critiques</Badge>
        }
      />

      <div className="max-w-wide mx-auto w-full px-4 md:px-8 flex flex-col gap-section">

        {/* KPI strip */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-stack">
          <StatCard
            label="Apprenants en stagnation"
            value="5"
            icon={<Users size={20} />}
          />
          <StatCard
            label="Stagnation critique >60j"
            value="2"
            variant="warm"
            icon={<AlertTriangle size={20} />}
            deltaDirection="up"
            delta="+1 cette semaine"
          />
          <StatCard
            label="Sessions planifiées suite alerte"
            value="3"
            icon={<Calendar size={20} />}
            deltaDirection="up"
            delta="+2 vs semaine dernière"
          />
        </div>

        {/* Filtres */}
        <div className="flex flex-wrap gap-2">
          <FilterChip
            label="Tous"
            active={activeFilter === 'all'}
            count={STAGNANT_LEARNERS.length}
            onClick={() => setActiveFilter('all')}
          />
          <FilterChip
            label="Critique >60j"
            active={activeFilter === 'critical'}
            count={STAGNANT_LEARNERS.filter((l) => l.severity === 'critical').length}
            onClick={() => setActiveFilter('critical')}
            icon={<AlertTriangle size={12} />}
          />
          <FilterChip
            label="Moyen 30–60j"
            active={activeFilter === 'medium'}
            count={STAGNANT_LEARNERS.filter((l) => l.severity === 'medium').length}
            onClick={() => setActiveFilter('medium')}
            icon={<Clock size={12} />}
          />
          <FilterChip
            label="Résolu"
            active={activeFilter === 'resolved'}
            count={0}
            onClick={() => setActiveFilter('resolved')}
          />
        </div>

        {/* Liste apprenants en stagnation */}
        <SectionCard
          title="Apprenants en stagnation"
          titleIcon={<AlertTriangle size={18} />}
          description={`${filteredLearners.length} apprenant${filteredLearners.length > 1 ? 's' : ''} affiché${filteredLearners.length > 1 ? 's' : ''}`}
        >
          {filteredLearners.length === 0 ? (
            <div className="py-8 text-center text-body-sm text-ink-500">
              Aucun apprenant dans cette catégorie.
            </div>
          ) : (
            <div className="flex flex-col gap-3">
              {filteredLearners.map((learner) => (
                <Card
                  key={learner.id}
                  variant="default"
                  className="flex flex-col md:flex-row md:items-center gap-stack p-4"
                >
                  {/* Identité */}
                  <div className="flex items-center gap-3 flex-1 min-w-0">
                    <Avatar name={learner.name} size="md" />
                    <div className="flex flex-col gap-tight min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="text-body-sm font-semibold text-ink-900">{learner.name}</span>
                        <AtrophieIndicator
                          daysSinceActivity={learner.daysSinceActivity}
                          currentLevel={learner.dreyfusLevel}
                          size="sm"
                          showLabel
                        />
                      </div>
                      <span className="text-caption text-ink-500">{learner.role}</span>
                    </div>
                  </div>

                  {/* Méta-infos */}
                  <div className="flex flex-wrap items-center gap-2 shrink-0">
                    <Badge
                      variant={learner.severity === 'critical' ? 'danger' : 'warning'}
                      size="sm"
                    >
                      {learner.stagnationDays}j de stagnation
                    </Badge>
                    <Badge variant="neutral" size="sm">
                      <TrendingUp size={10} className="inline mr-0.5" />
                      {learner.blockedSkill}
                    </Badge>
                    <Badge variant="info" size="sm">
                      Dreyfus niv. {learner.dreyfusLevel}
                    </Badge>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-2 shrink-0">
                    <Button
                      variant="ghost"
                      size="sm"
                      leadingIcon={<Calendar size={14} />}
                    >
                      Planifier session
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      leadingIcon={<MessageSquare size={14} />}
                    >
                      Envoyer message
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </SectionCard>

        {/* Actions recommandées par l'IA */}
        <SectionCard
          title="Actions recommandées"
          titleIcon={<Sparkles size={18} />}
          description="Suggestions personnalisées basées sur le profil Dreyfus de chaque apprenant."
          headerAction={<AITransparencyLabel variant="recommended" size="sm" />}
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-stack">
            {AI_SUGGESTIONS.map((suggestion) => (
              <Card
                key={suggestion.id}
                variant="tinted"
                tone="warm"
                className="flex flex-col gap-stack p-4"
              >
                <div className="flex flex-col gap-tight">
                  <span className="text-caption font-bold text-secondary-700 uppercase tracking-wide">
                    {suggestion.learnerName}
                  </span>
                  <p className="text-body-sm text-ink-700 leading-relaxed">
                    {suggestion.advice}
                  </p>
                </div>
                <Button variant="warm" size="sm" fullWidth leadingIcon={<Sparkles size={13} />}>
                  {suggestion.actionLabel}
                </Button>
              </Card>
            ))}
          </div>
        </SectionCard>

      </div>
    </div>
  );
}
