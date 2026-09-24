import React, { useState } from 'react';
import { BookOpen, PenLine, User, Calendar } from 'lucide-react';
import { EditorialHero } from '../components/patterns/EditorialHero';
import { SectionHeader } from '../components/patterns/SectionHeader';
import { Card } from '../components/core/Card';
import { Button } from '../components/core/Button';
import { Badge } from '../components/ui/Badge';
import { Avatar } from '../components/ui/Avatar';
import { Tabs } from '../components/ui/Tabs';
import { PageShell } from '../components/layout';

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
    title: 'Notes de session : Groupe B',
    date: '10 mai 2026',
    excerpt: "L'atelier sur l'intelligence émotionnelle a généré beaucoup d'échanges. Trois apprenants ont mentionné des situations concrètes au travail.",
    category: 'Session',
  },
  {
    id: '3',
    title: 'Bilan mensuel : Promotion Printemps',
    date: '5 mai 2026',
    excerpt: 'La cohorte affiche un taux de complétion de 78 %. Les modules de leadership restent les plus appréciés. Points à renforcer : feedback constructif.',
    category: 'Bilan',
  },
  {
    id: '4',
    title: 'Préparation : entretien de mi-parcours',
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

/* Rangée dans la carte : retrait 20 puis 24 px, jamais sous le rayon (20)
   de la carte — au coin, le contenu reste dans le régime « forme fixe ».
   20 px de haut et de bas : une entrée porte un titre, sa méta et un extrait. */
const ROW = 'flex items-center gap-stack px-stack-md sm:px-stack-lg py-stack-md';

const TAB_ITEMS = [
  { id: 'mine',     label: 'Mes entrées'        },
  { id: 'learners', label: 'Entrées apprenants' },
];

export default function CoachJournal() {
  const [tab, setTab] = useState('mine');

  const entries = tab === 'mine' ? MY_ENTRIES : LEARNER_ENTRIES;
  const tabLabel = TAB_ITEMS.find((t) => t.id === tab)?.label ?? '';

  return (
    <PageShell width="page" noPadTop className="pt-6 md:pt-8 lg:pt-10">
      <EditorialHero
        eyebrow={{ icon: <BookOpen size={14} />, label: 'Coach · Journal' }}
        title="Journal de coaching"
        summary="Consignez vos observations, bilans de session et réflexions pédagogiques."
        tone="flat"
        /* « Nouvelle entrée » : l'action principale du journal, le seul
           `solid` de l'écran (arbitrage n°19). « Lire » et « Voir », les
           actions des rangées, sont en `soft`. */
        trailing={
          <Button emphasis="solid" tone="brand" leadingIcon={<PenLine size={16} />}>
            Nouvelle entrée
          </Button>
        }
      />

      {/* Plus de `px-stack` : les onglets et la liste partaient 16 px à droite
          du titre (deux bords gauches). Ni de `pb-page` : PageShell porte déjà
          l'air du bas de page. */}
      <div className="flex flex-col gap-section">
        <Tabs items={TAB_ITEMS} value={tab} onChange={setTab} variant="underline" />

        {/* Des entrées de journal forment une collection qu'on parcourt : des
            rangées dans UNE carte, pas une pile de cartes (arbitrage n°5 du
            23/09). Chaque entrée se lit comme un article d'index : titre h3 20,
            méta en légende à 4 px, extrait 16 ink-700 à 8 px, plafonné à la
            largeur de lecture. La catégorie est une donnée : elle passe dans la
            méta, en légende — plus en pastille d'état de couleur. */}
        <section className="flex flex-col gap-stack">
          <SectionHeader title={tabLabel} meta={`${entries.length} entrées`} size="md" />

          {tab === 'mine' && (
            <Card className="p-0">
              <ul className="flex flex-col divide-y divide-ink-100" aria-label="Mes entrées">
                {MY_ENTRIES.map((entry) => (
                  <li key={entry.id} className={ROW}>
                    <div className="flex flex-col flex-1 min-w-0">
                      <h3 className="font-display text-h3 text-ink-900">{entry.title}</h3>
                      <p className="mt-stack-3xs flex items-center gap-stack-xs flex-wrap text-caption text-ink-600">
                        <span>{entry.category}</span>
                        <span aria-hidden="true">·</span>
                        <span className="inline-flex items-center gap-stack-3xs">
                          <Calendar size={14} aria-hidden="true" />
                          {entry.date}
                        </span>
                      </p>
                      <p className="mt-stack-xs text-body text-ink-700 max-w-prose line-clamp-2">{entry.excerpt}</p>
                    </div>
                    <Button emphasis="soft" tone="brand" size="sm" className="shrink-0" aria-label={`Lire : ${entry.title}`}>Lire</Button>
                  </li>
                ))}
              </ul>
            </Card>
          )}

          {tab === 'learners' && (
            <Card className="p-0">
              <ul className="flex flex-col divide-y divide-ink-100" aria-label="Entrées apprenants">
                {LEARNER_ENTRIES.map((entry) => {
                  const sentiment = SENTIMENT_CONFIG[entry.sentiment];
                  return (
                    <li key={entry.id} className={ROW}>
                      {/* À 375 px l'avatar prenait 52 px à une colonne de texte de 139 : il
                          n'apparaît qu'à partir de sm (le nom reste dans la ligne de méta). */}
                      <span className="hidden sm:block shrink-0">
                        <Avatar size="md" tint="warm">{entry.learner.initials}</Avatar>
                      </span>
                      <div className="flex flex-col flex-1 min-w-0">
                        <h3 className="font-display text-h3 text-ink-900">{entry.title}</h3>
                        <p className="mt-stack-3xs flex items-center gap-stack-xs flex-wrap text-caption text-ink-600">
                          <span className="inline-flex items-center gap-stack-3xs">
                            <User size={14} aria-hidden="true" />
                            {entry.learner.name}
                          </span>
                          <span aria-hidden="true">·</span>
                          <span className="inline-flex items-center gap-stack-3xs">
                            <Calendar size={14} aria-hidden="true" />
                            {entry.date}
                          </span>
                          <Badge variant={sentiment.variant} size="compact">{sentiment.label}</Badge>
                        </p>
                      </div>
                      <Button emphasis="soft" tone="brand" size="sm" className="shrink-0" aria-label={`Voir : ${entry.title}`}>Voir</Button>
                    </li>
                  );
                })}
              </ul>
            </Card>
          )}
        </section>
      </div>
    </PageShell>
  );
}
