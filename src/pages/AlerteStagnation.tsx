import React, { useState } from 'react';
import { AlertTriangle, Users, Clock, Calendar, MessageSquare } from 'lucide-react';
import { EditorialHero } from '../components/patterns/EditorialHero';
import { SectionHeader } from '../components/patterns/SectionHeader';
import { DataTable, type DataTableColumn } from '../components/patterns/DataTable';
import { Card } from '../components/core/Card';
import { Button } from '../components/core/Button';
import { StatCard } from '../components/ui/StatCard';
import { Avatar } from '../components/ui/Avatar';
import { FilterChip } from '../components/ui/FilterChip';
import { AtrophieIndicator } from '../components/ui/AtrophieIndicator';
import { AITransparencyLabel } from '../components/ui/AITransparencyLabel';
import { PageShell } from '../components/layout';

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
  { key: 'stagnation', label: 'Stagnation', sortable: true, align: 'right', sortValue: (r) => r._stagnation as number },
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
    /* PageShell, comme les autres pages coach : la page n'avait aucune marge
       haute (le surtitre touchait le bord) et son contenu vivait dans un
       `Container` qui ajoutait 32 px de retrait — les tuiles et la table
       partaient 32 px à droite du titre. Un seul bord gauche désormais, et
       48 px entre les trois temps de la page. */
    <PageShell width="wide" noPadTop className="pt-6 md:pt-8 lg:pt-10">
      {/* Le badge « 3 stagnations critiques » est retiré : c'était une donnée
          en registre d'état, et il contredisait la tuile juste dessous (2). */}
      <EditorialHero
        eyebrow="Coach · Alertes"
        title="Alertes stagnation"
        summary="Apprenants dont la progression Dreyfus est bloquée depuis plus de 30 jours. Intervenez avant qu'ils décrochent."
        tone="flat"
      />

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

      {/* La liste : son titre, ses filtres (qui la filtrent) et sa table forment
          un groupe. Le compte est une donnée : il passe en méta. */}
      <section className="flex flex-col gap-stack">
        <SectionHeader
          title="Apprenants en stagnation"
          meta={`${filteredLearners.length} apprenant${filteredLearners.length > 1 ? 's' : ''} affiché${filteredLearners.length > 1 ? 's' : ''} · les plus bloqués d'abord`}
          size="md"
        />
        <div className="flex flex-wrap gap-stack-xs" role="group" aria-label="Filtrer par durée de stagnation">
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
                <span className="flex flex-col gap-tight min-w-0">
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
            /* Une durée est une donnée : un nombre, aligné à droite en chiffres
               tabulaires — pas une pastille d'état en capitales (« 72 J »).
               Le critique (> 60 j) se distingue par la graisse, pas la couleur. */
            stagnation: (
              <span className={`tabular-nums whitespace-nowrap ${learner.severity === 'critical' ? 'font-semibold text-ink-900' : 'text-ink-700'}`}>
                {learner.stagnationDays}&nbsp;j
              </span>
            ),
            skill: <span className="text-ink-700">{learner.blockedSkill}</span>,
            dreyfus: <span className="tabular-nums text-ink-900 whitespace-nowrap">niv. {learner.dreyfusLevel}</span>,
            /* Arbitrage n°19 : l'action de la rangée (Planifier) en `soft`, la
               seconde (Message) en `ghost` — elles étaient deux `outline`, le
               niveau réservé à Annuler. */
            actions: (
              <span className="inline-flex items-center gap-stack-xs">
                <Button
                  emphasis="soft"
                  tone="brand"
                  size="sm"
                  leadingIcon={<Calendar size={14} />}
                  aria-label={`Planifier une session avec ${learner.name}`}
                >
                  Planifier
                </Button>
                <Button
                  emphasis="ghost"
                  tone="brand"
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

      {/* Actions recommandées par l'IA — une section de la page (titre h2 hors
          carte), et une collection du même type : des rangées dans UNE carte,
          plus trois cartes orange identiques (arbitrage n°5 ; DESIGN.md §11,
          « pas de grilles de trois cards identiques »). Le nom de l'apprenant
          était en capitales orange — le registre d'une étiquette : il devient
          le titre de sa rangée, 16/600 ink-900. L'étiquette « Recommandé par
          l'IA » porte seule le marqueur IA ; les boutons, qui sont des actions
          humaines, n'en ont plus. */}
      <section className="flex flex-col gap-stack">
        <SectionHeader
          title="Actions recommandées"
          subtitle="Suggestions personnalisées basées sur le profil Dreyfus de chaque apprenant."
          size="md"
          action={<AITransparencyLabel variant="recommended" size="sm" />}
        />
        <Card className="p-0">
          <ul className="flex flex-col divide-y divide-ink-100">
            {AI_SUGGESTIONS.map((suggestion) => (
              <li
                key={suggestion.id}
                className="flex flex-col md:flex-row md:items-start gap-stack-sm md:gap-stack-lg px-stack-md sm:px-stack-lg py-stack-md"
              >
                <div className="flex flex-col gap-stack-3xs min-w-0 flex-1">
                  <p className="text-body font-semibold text-ink-900">{suggestion.learnerName}</p>
                  <p className="text-body text-ink-700 max-w-prose">{suggestion.advice}</p>
                </div>
                <Button emphasis="soft" tone="warm" size="sm" className="self-start shrink-0">
                  {suggestion.actionLabel}
                </Button>
              </li>
            ))}
          </ul>
        </Card>
      </section>
    </PageShell>
  );
}
