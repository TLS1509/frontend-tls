import React, { useState } from 'react';
import { MessageSquare, Sparkles, Clock, ChevronRight } from 'lucide-react';
import { EditorialHero } from '../components/patterns/EditorialHero';
import { Card } from '../components/core/Card';
import { Button } from '../components/core/Button';
import { Badge } from '../components/ui/Badge';
import { FilterChip } from '../components/ui/FilterChip';
import { EmptyState } from '../components/ui/EmptyState';
import { Container } from '../components/layout';

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

function ConversationCard({ item }: { item: ConversationItem }) {
  return (
    <Card className="flex flex-col gap-stack-xs p-stack hover:shadow-md transition-shadow duration-base group">
      <div className="flex items-start justify-between gap-stack">
        <p className="text-body-sm font-semibold text-ink-900 leading-snug flex-1 min-w-0 truncate">
          {item.title}
        </p>
        <Badge variant="neutral" className="shrink-0 text-micro">
          {item.messageCount} msg
        </Badge>
      </div>
      <p className="text-caption text-ink-500 line-clamp-2 leading-relaxed">
        {item.lastMessage}
      </p>
      <div className="flex items-center justify-between gap-stack mt-1">
        <span className="flex items-center gap-tight text-micro text-ink-400">
          <Clock size={12} />
          {item.date}
        </span>
        <Button
          variant="ghost"
          size="sm"
          trailingIcon={<ChevronRight size={14} />}
          className="opacity-0 group-hover:opacity-100 transition-opacity duration-fast"
        >
          Reprendre
        </Button>
      </div>
    </Card>
  );
}

// ─── Page ──────────────────────────────────────────────────────────────────────

export default function ChatHistoryPanel() {
  const [activeFilter, setActiveFilter] = useState<FilterKey>('all');

  const filtered = CONVERSATIONS.filter((c) => c.filter.includes(activeFilter));

  return (
    <div className="flex flex-col gap-section">
      <EditorialHero
        eyebrow={{ label: 'Assistant IA', icon: <Sparkles size={14} /> }}
        title="Historique des conversations"
        summary="Retrouvez toutes vos conversations avec l'assistant IA."
        tone="brand"
      />

      <Container width="wide" padding={false} className="px-stack md:px-section flex flex-col gap-section">

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
          <div className="flex flex-col gap-stack">
            {filtered.map((item) => (
              <ConversationCard key={item.id} item={item} />
            ))}
          </div>
        ) : (
          <EmptyState
            icon={<MessageSquare size={32} />}
            title="Aucune conversation"
            description="Vous n'avez pas encore de conversations pour cette période. Démarrez une nouvelle session avec l'assistant."
            actions={
              <Button variant="primary" size="md" leadingIcon={<Sparkles size={16} />}>
                Nouvelle conversation
              </Button>
            }
          />
        )}

        {/* New conversation CTA */}
        {filtered.length > 0 && (
          <div className="flex justify-center pt-2">
            <Button variant="primary" size="md" leadingIcon={<Sparkles size={16} />}>
              Nouvelle conversation
            </Button>
          </div>
        )}
      </Container>
    </div>
  );
}
