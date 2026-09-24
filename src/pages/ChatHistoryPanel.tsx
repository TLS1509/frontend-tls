import React, { useState } from 'react';
import { MessageSquare, Sparkles, Clock, ChevronRight } from 'lucide-react';
import { EditorialHero } from '../components/patterns/EditorialHero';
import { Card } from '../components/core/Card';
import { Button } from '../components/core/Button';
import { FilterChip } from '../components/ui/FilterChip';
import { EmptyState } from '../components/ui/EmptyState';
import { Container, PageShell } from '../components/layout';

// ─── Mock data ─────────────────────────────────────────────────────────────────

type FilterKey = 'all' | 'week' | 'month';

interface ConversationItem {
  id: number;
  title: string;
  lastMessage: string;
  date: string;
  messageCount: number;
  filter: FilterKey[];
}

const CONVERSATIONS: ConversationItem[] = [
  {
    id: 1,
    title: 'Peux-tu m\'expliquer ce qu\'est le prompt engineering ?',
    lastMessage: 'Je te recommande de commencer par l\'atelier Prompts & Cie : tu es à 62 % du module 3.',
    date: 'Aujourd\'hui, 14:07',
    messageCount: 6,
    filter: ['all', 'week'],
  },
  {
    id: 2,
    title: 'Comment préparer mon entretien annuel avec mon manager ?',
    lastMessage: 'Voici une trame en 5 points pour structurer ta préparation : compétences, réalisations, objectifs…',
    date: 'Hier, 09:32',
    messageCount: 4,
    filter: ['all', 'week'],
  },
  {
    id: 3,
    title: 'Résumé du module Leadership et Intelligence Collective',
    lastMessage: 'Le module aborde 4 dimensions clés : la vision partagée, la co-construction, la délégation et le feedback constructif.',
    date: 'Lundi, 11:15',
    messageCount: 3,
    filter: ['all', 'week'],
  },
  {
    id: 4,
    title: 'Aide pour formuler ma problématique JAC du trimestre',
    lastMessage: 'Ta problématique pourrait être : « Comment renforcer l\'autonomie de mon équipe face aux décisions opérationnelles ? »',
    date: '6 mai, 16:48',
    messageCount: 8,
    filter: ['all', 'month'],
  },
  {
    id: 5,
    title: 'Quels sont mes objectifs prioritaires cette semaine ?',
    lastMessage: 'D\'après ton avancement, tu as 2 leçons à terminer dans le module 3 et un atelier à planifier avant vendredi.',
    date: '2 mai, 08:20',
    messageCount: 2,
    filter: ['all', 'month'],
  },
  {
    id: 6,
    title: 'Explique-moi le modèle de Dreyfus appliqué au leadership',
    lastMessage: 'Le modèle Dreyfus décrit 5 stades d\'acquisition d\'une compétence : novice, débutant avancé, compétent, performant, expert.',
    date: '28 avr., 17:03',
    messageCount: 5,
    filter: ['all', 'month'],
  },
];

const FILTERS: { key: FilterKey; label: string }[] = [
  { key: 'all', label: 'Toutes' },
  { key: 'week', label: 'Cette semaine' },
  { key: 'month', label: 'Ce mois' },
];

// ─── Sub-component ─────────────────────────────────────────────────────────────

/* Une conversation est une RANGÉE de la liste, plus une carte (arbitrage n°5 :
   une collection se rend en rangées dans une carte). Titre 16/600 et date en
   méta sur la même ligne de base ; l'aperçu du dernier message est du texte
   qu'on lit : 16 ink-700 (il était à 13 au cran 500) ; le nombre de messages
   est une donnée — « 6 messages » en légende, plus « 6 msg » en Badge. */
function ConversationRow({ item }: { item: ConversationItem }) {
  return (
    <li className="group flex flex-col gap-stack-xs px-stack-lg py-stack">
      <div className="flex items-baseline justify-between gap-stack">
        <p className="font-body text-body font-semibold text-ink-900 flex-1 min-w-0 truncate">
          {item.title}
        </p>
        <span className="shrink-0 inline-flex items-center gap-stack-3xs font-body text-caption text-ink-600 tabular-nums">
          <Clock size={14} aria-hidden="true" className="self-center" />
          {item.date}
        </span>
      </div>
      <p className="font-body text-body text-ink-700 line-clamp-2 max-w-prose">
        {item.lastMessage}
      </p>
      <div className="flex items-center justify-between gap-stack">
        <span className="font-body text-caption text-ink-600 tabular-nums">
          {item.messageCount} message{item.messageCount > 1 ? 's' : ''}
        </span>
        {/* L'action de la rangée : `soft` (arbitrage n°19 ; elle était en
            `outline`, réservé à Annuler). */}
        <Button
          emphasis="soft"
          size="sm"
          trailingIcon={<ChevronRight size={14} />}
          className="opacity-0 group-hover:opacity-100 focus-visible:opacity-100 transition-opacity duration-fast"
        >
          Reprendre
        </Button>
      </div>
    </li>
  );
}

// ─── Page ──────────────────────────────────────────────────────────────────────

export default function ChatHistoryPanel() {
  const [activeFilter, setActiveFilter] = useState<FilterKey>('all');

  const filtered = CONVERSATIONS.filter((c) => c.filter.includes(activeFilter));

  /* `/assistant` est rendu pleine largeur par AppLayout (App.tsx), qui ne lui
     donne donc pas la gouttière commune : le titre passait sous la barre
     latérale et, à 375 px, le chat débordait (audit du 23/09). La page la
     reprend elle-même, avec la même largeur et le même rythme que les autres. */
  return (
    <Container width="wide">
    <PageShell width="wide">
      <EditorialHero
        eyebrow={{ label: 'Assistant IA', icon: <Sparkles size={14} /> }}
        title="Historique des conversations"
        summary="Retrouve toutes tes conversations avec l'assistant IA."
        tone="flat"
        trailing={
          /* L'action de la page vit dans son en-tête : elle n'était qu'en
             bas, centrée sous la liste, sur un autre axe que le reste. C'est
             l'action principale de l'écran, son seul `solid` (arbitrage
             n°19) ; celle de l'état vide reste en `soft`. */
          <Button emphasis="solid" size="md" leadingIcon={<Sparkles size={16} />}>
            Nouvelle conversation
          </Button>
        }
      />

      {/* Les filtres et la liste : un même ensemble, 16 entre eux. */}
      <div className="flex flex-col gap-stack">

        {/* Filter bar */}
        <div className="flex items-center gap-stack-xs flex-wrap">
          {FILTERS.map((f) => (
            <FilterChip
              key={f.key}
              label={f.label}
              active={activeFilter === f.key}
              onClick={() => setActiveFilter(f.key)}
            />
          ))}
        </div>

        {/* Conversation list */}
        {filtered.length > 0 ? (
          <Card as="ul" className="flex flex-col gap-0 p-0 divide-y divide-ink-100">
            {filtered.map((item) => (
              <ConversationRow key={item.id} item={item} />
            ))}
          </Card>
        ) : (
          <EmptyState
            icon={<MessageSquare size={32} />}
            title="Aucune conversation"
            description="Tu n'as pas encore de conversations pour cette période. Démarre une nouvelle session avec l'assistant."
            actions={
              <Button emphasis="soft" size="md" leadingIcon={<Sparkles size={16} />}>
                Nouvelle conversation
              </Button>
            }
          />
        )}

      </div>
    </PageShell>
    </Container>
  );
}
