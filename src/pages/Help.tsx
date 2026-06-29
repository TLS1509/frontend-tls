/**
 * Help Page : Centre d'aide
 */

import React, { useMemo, useState } from 'react';
import { useHelpcenterStore } from '../stores/persistence';
import { Card } from '../components/core/Card';
import { Button } from '../components/core/Button';
import { Badge } from '../components/ui/Badge';
import { Search as SearchInput } from '../components/ui/Search';
import { FilterBar } from '../components/forms/FilterBar';
import { EditorialHero } from '../components/patterns/EditorialHero';
import { PageShell } from '../components/layout';
import type { BadgeVariant } from '../components';
import {
  ChevronDown,
  ChevronUp,
  Bot,
  Send,
  Mail,
  MessageCircle,
  BookOpen,
  HelpCircle,
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
  { role: 'ai'   as const, text: "Bonjour ! Je suis l'assistant TLS. Comment puis-je vous aider aujourd'hui ?" },
  { role: 'user' as const, text: 'Comment accéder à mon historique de formation ?' },
  { role: 'ai'   as const, text: 'Votre historique est disponible dans "Mon profil > Activité". Vous y retrouvez tous les modules terminés, le temps passé et vos notes de journal associées.' },
];

const CONTACT_OPTIONS = [
  {
    icon: Mail,
    title: 'E-mail',
    desc: 'Réponse sous 24 h ouvrées. Idéal pour les questions détaillées ou les demandes techniques.',
    action: 'Envoyer un e-mail',
    badge: '24 h',
    badgeVariant: 'neutral' as BadgeVariant,
  },
  {
    icon: MessageCircle,
    title: 'Chat en direct',
    desc: 'Disponible du lundi au vendredi, 9 h – 18 h. Un conseiller vous répond en quelques minutes.',
    action: 'Ouvrir le chat',
    badge: 'En ligne',
    badgeVariant: 'success' as BadgeVariant,
  },
  {
    icon: BookOpen,
    title: 'Documentation',
    desc: 'Guides complets, tutoriels vidéo et FAQ avancée pour explorer toutes les fonctionnalités.',
    action: 'Consulter les docs',
    badge: '80+ articles',
    badgeVariant: 'neutral' as BadgeVariant,
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

  return (
    <PageShell width="medium" noPadTop>

        {/* ── Hero ─────────────────────────────────────────────── */}
        <EditorialHero
          tone="flat"
          eyebrow={{ icon: <HelpCircle size={12} />, label: 'Support & aide' }}
          title="Centre d'aide"
          summary="Trouvez rapidement des réponses, discutez avec l'assistant IA ou contactez notre équipe."
        />

        {/* ── Search + topic filters ────────────────────────────── */}
        <section aria-label="Recherche et filtres" className="flex flex-col gap-stack-xs">
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
        <section>
          <h2 className="m-0 mb-stack font-display text-h3 font-bold text-ink-900 tracking-tight">
            Questions fréquentes
          </h2>
          <div className="flex flex-col gap-stack-xs">
            {faqItems.map((item) => {
              const isOpen = openFaq === item.id;
              return (
                <div
                  key={item.id}
                  className={[
                    'rounded-xl overflow-hidden transition-all duration-200',
                    isOpen
                      ? 'border border-primary-300 bg-gradient-to-br from-primary-50 to-white shadow-sm'
                      : 'border border-ink-200 bg-white',
                  ].join(' ')}
                >
                  <button
                    type="button"
                    aria-expanded={isOpen}
                    onClick={() => toggleFaq(item.id)}
                    className="w-full flex items-center justify-between gap-stack px-5 py-stack bg-transparent border-0 cursor-pointer text-left focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500 rounded-t-xl"
                  >
                    <div className="flex items-center gap-stack-xs">
                      <Badge variant={isOpen ? 'brand' : 'neutral'}>{item.topic}</Badge>
                      <span className="font-body text-body-sm font-semibold text-ink-900">
                        {item.question}
                      </span>
                    </div>
                    <span className="text-primary-500 shrink-0">
                      {isOpen ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                    </span>
                  </button>
                  {isOpen && (
                    <div className="px-5 pb-5 pt-stack border-t border-ink-200 font-body text-body-sm text-ink-500 leading-relaxed">
                      {item.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>

        {/* Assistant IA */}
        <section>
          <div className="flex items-center gap-stack-xs mb-stack">
            <h2 className="m-0 font-display text-h3 font-bold text-ink-900 tracking-tight">
              Assistant IA
            </h2>
            <Badge variant="brand">
              <Bot size={12} className="mr-1 align-middle" />
              Démo interactive
            </Badge>
          </div>

          <Card className="border border-primary-200 bg-white overflow-hidden flex flex-col">
            {/* Chat header */}
            <div className="flex items-center gap-stack-xs px-5 py-stack border-b border-ink-200 bg-gradient-to-br from-primary-50 to-white">
              <div className="w-10 h-10 rounded-lg bg-primary-100 text-primary-700 flex items-center justify-center shrink-0">
                <Bot size={20} />
              </div>
              <div>
                <p className="m-0 font-body text-body-sm font-bold text-ink-900">Assistant TLS</p>
                <p className="m-0 font-body text-caption text-primary-600 flex items-center gap-tight">
                  <Sparkles size={11} /> En ligne · répond instantanément
                </p>
              </div>
            </div>

            {/* Chat messages */}
            <div className="flex flex-col gap-stack-xs p-5 min-h-[260px]">
              {CHAT_DEMO.map((msg, i) => (
                <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={[
                    'max-w-[72%] px-stack py-3 font-body text-body-sm leading-relaxed shadow-xs',
                    msg.role === 'user'
                      ? 'rounded-xl rounded-br-sm bg-primary-500 text-white'
                      : 'rounded-xl rounded-bl-sm bg-primary-50 text-ink-900',
                  ].join(' ')}>
                    {msg.text}
                  </div>
                </div>
              ))}
            </div>

            {/* Chat input */}
            <div className="flex items-center gap-stack-xs px-stack py-3 border-t border-ink-200 bg-ink-50">
              <input
                type="text"
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                placeholder="Posez votre question…"
                aria-label="Message pour l'assistant"
                className="flex-1 border border-ink-200 rounded-lg px-stack py-3 bg-white text-ink-900 font-body text-body-sm outline-none transition-colors focus:border-primary-400 h-auto placeholder:text-ink-400"
              />
              <Button
                variant="primary"
                size="sm"
                leadingIcon={<Send size={15} />}
                onClick={() => setChatInput('')}
              >
                Envoyer
              </Button>
            </div>
          </Card>
        </section>

        {/* Contacter le support */}
        <section>
          <h2 className="m-0 mb-stack font-display text-h3 font-bold text-ink-900 tracking-tight">
            Contacter le support
          </h2>
          <div className="grid grid-cols-1 gap-stack-lg sm:grid-cols-3">
            {CONTACT_OPTIONS.map((opt) => {
              const Icon = opt.icon;
              return (
                <Card key={opt.title} className="p-stack-lg flex flex-col gap-stack border border-ink-200 bg-white shadow-sm">
                  <div className="flex items-start justify-between">
                    <div className="w-12 h-12 rounded-lg bg-primary-50 text-primary-600 flex items-center justify-center">
                      <Icon size={22} />
                    </div>
                    <Badge variant={opt.badgeVariant}>{opt.badge}</Badge>
                  </div>
                  <div>
                    <p className="m-0 mb-stack-xs font-display text-h4 font-bold text-ink-900">{opt.title}</p>
                    <p className="m-0 font-body text-caption text-ink-500 leading-relaxed">{opt.desc}</p>
                  </div>
                  <Button variant="secondary" size="sm" className="mt-auto">
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
