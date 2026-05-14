import React, { useState } from 'react';
import { BookOpen, PenLine, User, Calendar, Smile, Frown, Meh } from 'lucide-react';
import { EditorialHero } from '../components/patterns/EditorialHero';
import { Card } from '../components/core/Card';
import { Button } from '../components/core/Button';
import { Badge } from '../components/ui/Badge';
import { Avatar } from '../components/ui/Avatar';
import { Tabs } from '../components/ui/Tabs';

const MY_ENTRIES = [
  {
    id: '1',
    title: 'Réflexion sur la progression de Marie',
    date: '12 mai 2026',
    excerpt: 'Cette semaine, Marie a fait des progrès significatifs sur la gestion des conflits. Son approche a évolué vers une posture plus assertive.',
    category: 'Observation',
  },
  {
    id: '2',
    title: 'Notes de session — Groupe B',
    date: '10 mai 2026',
    excerpt: "L'atelier sur l'intelligence émotionnelle a généré beaucoup d'échanges. Trois apprenants ont mentionné des situations concrètes au travail.",
    category: 'Session',
  },
  {
    id: '3',
    title: 'Bilan mensuel — Promotion Printemps',
    date: '5 mai 2026',
    excerpt: 'La cohorte affiche un taux de complétion de 78 %. Les modules de leadership restent les plus appréciés. Points à renforcer : feedback constructif.',
    category: 'Bilan',
  },
  {
    id: '4',
    title: 'Préparation — entretien de mi-parcours',
    date: '2 mai 2026',
    excerpt: "Préparer les questions clés pour l'entretien individuel de Thomas. Focus sur les objectifs fixés en début de parcours et les écarts observés.",
    category: 'Préparation',
  },
];

const LEARNER_ENTRIES = [
  {
    id: '1',
    learner: { name: 'Marie Dupont', initials: 'MD' },
    title: 'Ce que j\'ai appris ce mois-ci',
    date: '11 mai 2026',
    sentiment: 'positive',
  },
  {
    id: '2',
    learner: { name: 'Thomas Martin', initials: 'TM' },
    title: 'Mes difficultés avec le module Leadership',
    date: '9 mai 2026',
    sentiment: 'neutral',
  },
  {
    id: '3',
    learner: { name: 'Sophie Bernard', initials: 'SB' },
    title: 'Retour sur l\'atelier de la semaine',
    date: '8 mai 2026',
    sentiment: 'positive',
  },
  {
    id: '4',
    learner: { name: 'Lucas Petit', initials: 'LP' },
    title: 'Découragement sur les exercices pratiques',
    date: '6 mai 2026',
    sentiment: 'negative',
  },
];

const SENTIMENT_CONFIG: Record<string, { label: string; variant: 'success' | 'neutral' | 'danger' }> = {
  positive: { label: 'Positif', variant: 'success' },
  neutral:  { label: 'Neutre',  variant: 'neutral'  },
  negative: { label: 'Négatif', variant: 'danger'   },
};

const CATEGORY_VARIANT: Record<string, 'brand' | 'warm' | 'sun' | 'neutral'> = {
  Observation: 'brand',
  Session:     'warm',
  Bilan:       'sun',
  Préparation: 'neutral',
};

const TAB_ITEMS = [
  { id: 'mine',     label: 'Mes entrées'        },
  { id: 'learners', label: 'Entrées apprenants' },
];

export default function CoachJournal() {
  const [tab, setTab] = useState('mine');

  return (
    <div className="flex flex-col gap-section">
      <EditorialHero
        eyebrow={{ icon: <BookOpen size={14} />, label: 'Coach · Journal' }}
        title="Journal de Coaching"
        summary="Consignez vos observations, bilans de session et réflexions pédagogiques."
        tone="warm"
        trailing={
          <Button variant="glass" leadingIcon={<PenLine size={16} />}>
            Nouvelle entrée
          </Button>
        }
      />

      <div className="max-w-page mx-auto w-full px-4 flex flex-col gap-section pb-page">
        <Tabs items={TAB_ITEMS} value={tab} onChange={setTab} variant="underline" />

        {tab === 'mine' && (
          <div className="flex flex-col gap-stack">
            {MY_ENTRIES.map((entry) => (
              <Card key={entry.id}>
                <div className="flex flex-col gap-stack-xs">
                  <div className="flex items-start justify-between gap-stack-xs">
                    <div className="flex flex-col gap-tight">
                      <span className="font-display font-semibold text-h4 text-ink-900">{entry.title}</span>
                      <span className="flex items-center gap-stack-xs text-caption text-ink-500">
                        <Calendar size={12} />
                        {entry.date}
                      </span>
                    </div>
                    <Badge variant={CATEGORY_VARIANT[entry.category] ?? 'neutral'}>{entry.category}</Badge>
                  </div>
                  <p className="text-body-sm text-ink-600 leading-relaxed">{entry.excerpt}</p>
                  <div className="flex justify-end">
                    <Button variant="ghost" size="sm">Lire</Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}

        {tab === 'learners' && (
          <div className="flex flex-col gap-stack">
            {LEARNER_ENTRIES.map((entry) => {
              const sentiment = SENTIMENT_CONFIG[entry.sentiment];
              return (
                <Card key={entry.id}>
                  <div className="flex items-center gap-stack">
                    <Avatar size="md" tint="warm">{entry.learner.initials}</Avatar>
                    <div className="flex flex-col gap-tight flex-1 min-w-0">
                      <span className="font-display font-semibold text-body text-ink-900 truncate">{entry.title}</span>
                      <span className="flex items-center gap-stack-xs text-caption text-ink-500">
                        <User size={12} />
                        {entry.learner.name}
                        <span className="text-ink-300">·</span>
                        <Calendar size={12} />
                        {entry.date}
                      </span>
                    </div>
                    <Badge variant={sentiment.variant}>{sentiment.label}</Badge>
                    <Button variant="ghost" size="sm">Voir</Button>
                  </div>
                </Card>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
