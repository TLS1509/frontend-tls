import React, { useState } from 'react';
import { AlertTriangle, Users, Clock, Calendar, MessageSquare, Sparkles } from 'lucide-react';
import { EditorialHero } from '../components/patterns/EditorialHero';
import { SectionCard } from '../components/patterns/SectionCard';
import { SectionHeader } from '../components/patterns/SectionHeader';
import { DataTable, type DataTableColumn } from '../components/patterns/DataTable';
import { Card } from '../components/core/Card';
import { Button } from '../components/core/Button';
import { Badge } from '../components/ui/Badge';
import { StatCard } from '../components/ui/StatCard';
import { Avatar } from '../components/ui/Avatar';
import { FilterChip } from '../components/ui/FilterChip';
import { AtrophieIndicator } from '../components/ui/AtrophieIndicator';
import { AITransparencyLabel } from '../components/ui/AITransparencyLabel';
import { Container } from '../components/layout';

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

/* Des apprenants qu'on trie pour savoir qui relancer d'abord (inactivité,
   durée de stagnation, niveau) : une table triable, pas une pile de cartes
   (arbitrage n°5 du 23/09). Les valeurs de tri voyagent dans la rangée sous
   des clés que la table n'affiche pas. */
const COLUMNS: DataTableColumn[] = [
  { key: 'name', label: 'Apprenant', sortable: true, sortValue: (r) => r._name as string },
  { key: 'inactivity', label: 'Inactivité', sortable: true, sortValue: (r) => r._inactive as number },
  { key: 'stagnation', label: 'Stagnation', sortable: true, sortValue: (r) => r._stagnation as number },
  { key: 'skill', label: 'Compétence', sortable: true, sortValue: (r) => r._skill as string },
  { key: 'dreyfus', label: 'Dreyfus', sortable: true, align: 'right', sortValue: (r) => r._dreyfus as number },
  { key: 'actions', label: 'Actions', align: 'right' },
];

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
        summary="Apprenants dont la progression Dreyfus est bloquée depuis plus de 30 jours. Intervenez avant qu'ils décrochent."
        tone="flat"
        trailing={
          <Badge variant="sun" size="normal">3 stagnations critiques</Badge>
        }
      />

      <Container width="wide" padding={false} className="px-stack md:px-section flex flex-col gap-section">

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
        <div className="flex flex-wrap gap-stack-xs">
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
            icon={<AlertTriangle size={14} />}
          />
          <FilterChip
            label="Moyen 30–60j"
            active={activeFilter === 'medium'}
            count={STAGNANT_LEARNERS.filter((l) => l.severity === 'medium').length}
            onClick={() => setActiveFilter('medium')}
            icon={<Clock size={14} />}
          />
          <FilterChip
            label="Résolu"
            active={activeFilter === 'resolved'}
            count={0}
            onClick={() => setActiveFilter('resolved')}
          />
        </div>

        {/* Liste apprenants en stagnation */}
        <section className="flex flex-col gap-stack" aria-label="Apprenants en stagnation">
          <SectionHeader
            title="Apprenants en stagnation"
            subtitle={`${filteredLearners.length} apprenant${filteredLearners.length > 1 ? 's' : ''} affiché${filteredLearners.length > 1 ? 's' : ''}`}
            icon={<AlertTriangle size={20} />}
            tone="primary"
            size="md"
          />
          <DataTable
            columns={COLUMNS}
            pageSize={Math.max(filteredLearners.length, 1)}
            emptyMessage="Aucun apprenant dans cette catégorie."
            rows={filteredLearners.map((learner) => ({
              _name: learner.name,
              _inactive: learner.daysSinceActivity,
              _stagnation: learner.stagnationDays,
              _skill: learner.blockedSkill,
              _dreyfus: learner.dreyfusLevel,
              name: (
                <span className="flex items-center gap-stack-sm min-w-0">
                  <Avatar name={learner.name} size="sm" />
                  <span className="flex flex-col min-w-0">
                    <span className="font-semibold text-ink-900 truncate">{learner.name}</span>
                    <span className="text-caption text-ink-600 truncate">{learner.role}</span>
                  </span>
                </span>
              ),
              inactivity: (
                <AtrophieIndicator
                  daysSinceActivity={learner.daysSinceActivity}
                  currentLevel={learner.dreyfusLevel}
                  size="sm"
                  showLabel
                  className="whitespace-nowrap"
                />
              ),
              stagnation: (
                <Badge variant={learner.severity === 'critical' ? 'danger' : 'info'} size="compact">
                  {learner.stagnationDays} j
                </Badge>
              ),
              skill: <span className="text-ink-700">{learner.blockedSkill}</span>,
              dreyfus: <span className="tabular-nums text-ink-900 whitespace-nowrap">niv. {learner.dreyfusLevel}</span>,
              actions: (
                <span className="inline-flex items-center gap-stack-xs">
                  <Button
                    emphasis="outline"
                    size="sm"
                    leadingIcon={<Calendar size={14} />}
                    aria-label={`Planifier une session avec ${learner.name}`}
                  >
                    Planifier
                  </Button>
                  <Button
                    emphasis="outline"
                    size="sm"
                    leadingIcon={<MessageSquare size={14} />}
                    aria-label={`Envoyer un message à ${learner.name}`}
                  >
                    Message
                  </Button>
                </span>
              ),
            }))}
          />
        </section>

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
                className="flex flex-col gap-stack p-stack-md"
              >
                <div className="flex flex-col gap-tight">
                  <span className="text-caption font-bold text-secondary-700 uppercase tracking-wide">
                    {suggestion.learnerName}
                  </span>
                  <p className="text-body text-ink-700">
                    {suggestion.advice}
                  </p>
                </div>
                <Button emphasis="soft" tone="warm" size="sm" fullWidth leadingIcon={<Sparkles size={14} />}>
                  {suggestion.actionLabel}
                </Button>
              </Card>
            ))}
          </div>
        </SectionCard>

      </Container>
    </div>
  );
}
