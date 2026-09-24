/**
 * Help Page : Centre d'aide
 */

import React, { useMemo, useState } from 'react';
import { useHelpcenterStore } from '../stores/persistence';
import { Card } from '../components/core/Card';
import { Button } from '../components/core/Button';
import { IconChip } from '../components/ui/IconChip';
import { Badge } from '../components/ui/Badge';
import { MetaPill } from '../components/ui/MetaPill';
import { Search as SearchInput } from '../components/ui/Search';
import { FilterBar } from '../components/forms/FilterBar';
import { PageHero } from '../components/patterns/EditorialHero';
import { SectionHeader } from '../components/patterns/SectionHeader';
import { PageShell } from '../components/layout';
import {
  ChevronDown,
  Bot,
  Send,
  Mail,
  MessageCircle,
  BookOpen,
  Sparkles,
} from 'lucide-react';

const FAQ_ITEMS = [
  {
    id: 'start',
    topic: 'Démarrer',
    question: 'Comment démarrer mon premier parcours ?',
    answer: 'Rendez-vous dans l\'onglet "Mon parcours" depuis le menu principal. Choisissez un parcours parmi les thématiques disponibles, puis cliquez sur "Commencer". Chaque parcours est composé de modules courts accessibles à votre rythme.',
  },
  {
    id: 'coaching',
    topic: 'Coaching',
    question: 'Comment réserver une session de coaching ?',
    answer: 'Depuis la section "Sessions coaching", sélectionnez un créneau disponible dans le calendrier de votre coach. Vous recevrez une confirmation par e-mail avec le lien de connexion. Pensez à remplir le questionnaire de préparation 24 h avant.',
  },
  {
    id: 'journal',
    topic: 'Journal',
    question: 'À quoi sert le journal de bord ?',
    answer: 'Le journal vous permet de noter vos réflexions, insights et actions à la suite de chaque module ou session. Ces notes restent privées et vous aident à ancrer vos apprentissages dans la durée.',
  },
  {
    id: 'billing',
    topic: 'Facturation',
    question: 'Comment gérer mon abonnement et ma facturation ?',
    answer: 'Accédez à la section "Mon compte > Facturation" pour consulter vos factures, changer de formule ou mettre à jour votre mode de paiement. Les factures sont disponibles en téléchargement au format PDF.',
  },
  {
    id: 'data',
    topic: 'Données',
    question: 'Comment sont protégées mes données personnelles ?',
    answer: 'TLS est conforme au RGPD. Vos données sont hébergées en Europe et ne sont jamais revendues. Vous pouvez demander l\'export ou la suppression de vos données à tout moment depuis "Mon compte > Confidentialité".',
  },
];

const POPULAR_TOPICS = ['Parcours', 'Coaching', 'Badges', 'Facturation', 'Journal', 'RGPD'];

const CHAT_DEMO = [
  { role: 'ai'   as const, text: "Bonjour. Je suis l'assistant TLS. Comment puis-je vous aider aujourd'hui ?" },
  { role: 'user' as const, text: 'Comment accéder à mon historique de formation ?' },
  { role: 'ai'   as const, text: 'Votre historique est disponible dans "Mon profil > Activité". Vous y retrouvez tous les modules terminés, le temps passé et vos notes de journal associées.' },
];

/* Le délai et le volume sont des données (`MetaPill`) ; « En ligne » est un
   état (`Badge`). Les trois étaient des Badge en capitales. */
const CONTACT_OPTIONS = [
  {
    icon: Mail,
    title: 'E-mail',
    desc: 'Réponse sous 24 h ouvrées. Idéal pour les questions détaillées ou les demandes techniques.',
    action: 'Envoyer un e-mail',
    meta: 'Sous 24 h',
  },
  {
    icon: MessageCircle,
    title: 'Chat en direct',
    desc: 'Disponible du lundi au vendredi, de 9 h à 18 h. Un conseiller vous répond en quelques minutes.',
    action: 'Ouvrir le chat',
    status: 'En ligne',
  },
  {
    icon: BookOpen,
    title: 'Documentation',
    desc: 'Guides complets, tutoriels vidéo et FAQ avancée pour explorer toutes les fonctionnalités.',
    action: 'Consulter les docs',
    meta: 'Plus de 80 articles',
  },
];

export const Help: React.FC = () => {
  const helpcenterStore = useHelpcenterStore();
  const [openFaq,      setOpenFaq]      = useState<string | null>(null);
  const [chatInput,    setChatInput]    = useState('');
  const [searchValue,  setSearchValue]  = useState('');
  const [topicFilter,  setTopicFilter]  = useState<string[]>([]);

  // Live FAQ from store; fall back to static FAQ_ITEMS if store has no articles
  const faqItems = useMemo(() => {
    const results = helpcenterStore.searchArticles(searchValue);
    const filtered = topicFilter.length > 0
      ? results.filter((a) => topicFilter.includes(a.categoryId.toLowerCase()))
      : results;
    if (filtered.length === 0) return FAQ_ITEMS;
    return filtered.map((a) => ({
      id: a.id,
      topic: a.categoryId,
      question: a.title,
      answer: a.content || a.summary,
    }));
  }, [searchValue, topicFilter, helpcenterStore.articles]);

  const toggleFaq = (id: string) => setOpenFaq((prev) => (prev === id ? null : id));

  // Le nom de la catégorie, pas son code interne (« CAT-01 » ne disait rien).
  const categoryName = (id: string) =>
    helpcenterStore.categories.find((c) => c.id === id)?.name ?? id;

  /* Passe typographique du 2026-09-24 : haut de page au padding de
     `PageShell` ; le surtitre « Support & aide » redisait le titre ; les trois
     titres de section étaient des h2 faits main à 20 px (la taille d'un titre
     de carte) : ils prennent `SectionHeader`, 28 px ; les huit questions sont
     des rangées dans une carte (plus huit cartes empilées), leur code interne
     devient le nom de la catégorie, et la réponse passe du gris des
     placeholders (ink-500) à ink-700, à la largeur de lecture. */
  return (
    <PageShell width="medium">

        {/* ── Hero ─────────────────────────────────────────────── */}
        <PageHero
          tone="flat"
          title="Centre d'aide"
          summary="Trouvez rapidement des réponses, discutez avec l'assistant IA ou contactez notre équipe."
        />

        {/* ── Search + topic filters ────────────────────────────── */}
        <section aria-label="Recherche et filtres" className="flex flex-col gap-stack-sm">
          <SearchInput
            placeholder="Rechercher dans le centre d'aide…"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            wrapperClassName="max-w-2xl"
          />
          <FilterBar
            options={POPULAR_TOPICS.map((t) => ({ id: t.toLowerCase(), label: t }))}
            selected={topicFilter}
            onChange={setTopicFilter}
            label="Sujets populaires"
            size="sm"
          />
        </section>

        {/* FAQ */}
        <section className="flex flex-col gap-stack">
          <SectionHeader title="Questions fréquentes" meta={`${faqItems.length} questions`} />
          <Card className="p-0 overflow-hidden">
            <ul className="flex flex-col divide-y divide-ink-100">
              {faqItems.map((item) => {
                const isOpen = openFaq === item.id;
                return (
                  <li key={item.id}>
                    <button
                      type="button"
                      aria-expanded={isOpen}
                      onClick={() => toggleFaq(item.id)}
                      className="w-full flex items-start justify-between gap-stack px-stack-md sm:px-stack-lg py-stack bg-transparent border-0 cursor-pointer text-left transition-colors hover:bg-ink-50 focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-primary-500"
                    >
                      <span className="flex flex-col gap-stack-3xs min-w-0">
                        <span className="font-body text-body font-semibold text-ink-900">
                          {item.question}
                        </span>
                        <MetaPill text={categoryName(item.topic)} tone="neutral" className="self-start" />
                      </span>
                      {/* Une ligne de haut : le chevron se centre sur la première
                          ligne de la question. */}
                      <span className="shrink-0 inline-flex items-center h-lh text-primary-700" aria-hidden="true">
                        <ChevronDown size={18} className={['transition-transform duration-base', isOpen ? 'rotate-180' : ''].join(' ')} />
                      </span>
                    </button>
                    {isOpen && (
                      <p className="px-stack-md sm:px-stack-lg pb-stack-lg font-body text-body text-ink-700 max-w-prose">
                        {item.answer}
                      </p>
                    )}
                  </li>
                );
              })}
            </ul>
          </Card>
        </section>

        {/* Assistant IA */}
        <section className="flex flex-col gap-stack">
          <SectionHeader title="Assistant IA" meta="Démo interactive" />

          <Card className="p-0 border border-primary-200 bg-white overflow-hidden flex flex-col">
            {/* Chat header */}
            <div className="flex items-center gap-stack-sm px-stack-md sm:px-stack-lg py-stack border-b border-ink-200 bg-gradient-to-br from-primary-50 to-white">
              <IconChip size="md" tone="brand" surface="tinted">
                <Bot />
              </IconChip>
              <div className="flex flex-col gap-stack-3xs">
                <p className="font-body text-body font-semibold text-ink-900">Assistant TLS</p>
                <p className="font-body text-caption text-primary-800 flex items-center gap-stack-3xs">
                  <Sparkles size={14} aria-hidden="true" /> En ligne · répond instantanément
                </p>
              </div>
            </div>

            {/* Chat messages */}
            <div className="flex flex-col gap-stack-xs p-stack-md sm:p-stack-lg min-h-[260px]">
              {CHAT_DEMO.map((msg, i) => (
                <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={[
                    'max-w-[72%] px-stack py-stack-sm font-body text-body',
                    msg.role === 'user'
                      ? 'rounded-xl rounded-br-sm bg-primary-700 text-white'
                      : 'rounded-xl rounded-bl-sm bg-primary-50 text-ink-900',
                  ].join(' ')}>
                    {msg.text}
                  </div>
                </div>
              ))}
            </div>

            {/* Chat input */}
            <div className="flex items-center gap-stack-xs px-stack py-stack-sm border-t border-ink-200 bg-ink-50">
              <input
                type="text"
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                placeholder="Posez votre question…"
                aria-label="Message pour l'assistant"
                className="flex-1 min-w-0 border border-ink-400 rounded-lg px-stack h-touch bg-white text-ink-900 font-body text-body outline-none transition-colors focus:border-primary-700 placeholder:text-ink-500"
              />
              <Button
                emphasis="soft"
                size="md"
                leadingIcon={<Send size={16} />}
                onClick={() => setChatInput('')}
              >
                Envoyer
              </Button>
            </div>
          </Card>
        </section>

        {/* Contacter le support */}
        <section className="flex flex-col gap-stack">
          <SectionHeader title="Contacter le support" />
          <div className="grid grid-cols-1 gap-stack sm:grid-cols-3">
            {CONTACT_OPTIONS.map((opt) => {
              const Icon = opt.icon;
              return (
                /* Anatomie de carte : pastille, titre 20, texte 16 ink-700 à 8,
                   action à 24 du contenu. Plus d'ombre (S2). */
                <Card key={opt.title} className="flex flex-col gap-stack-lg">
                  <div className="flex flex-col gap-stack-sm">
                    <div className="flex items-start justify-between gap-stack-xs">
                      <IconChip size="lg" tone="brand">
                        <Icon />
                      </IconChip>
                      {opt.status ? <Badge variant="success" dot>{opt.status}</Badge> : <MetaPill text={opt.meta ?? ''} tone="neutral" />}
                    </div>
                    <div className="flex flex-col gap-stack-xs">
                      <h3 className="font-display text-h3 text-ink-900">{opt.title}</h3>
                      <p className="font-body text-body text-ink-700">{opt.desc}</p>
                    </div>
                  </div>
                  <Button emphasis="soft" tone="warm" size="sm" className="mt-auto self-start">
                    {opt.action}
                  </Button>
                </Card>
              );
            })}
          </div>
        </section>

    </PageShell>
  );
};
