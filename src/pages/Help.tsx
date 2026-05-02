import React, { useState } from 'react';
import { Card, CardTitle, CardDesc, Button, Badge } from '../components';
import type { BadgeVariant } from '../components';
import {
  Search,
  ChevronDown,
  ChevronUp,
  Bot,
  Send,
  Mail,
  MessageCircle,
  BookOpen,
  Sparkles,
} from 'lucide-react';

/* ── FAQ data ───────────────────────────────────────────────────────────── */

const FAQ_ITEMS = [
  {
    id: 'start',
    topic: 'Démarrer',
    question: 'Comment démarrer mon premier parcours ?',
    answer:
      'Rendez-vous dans l\'onglet "Mon parcours" depuis le menu principal. Choisissez un parcours parmi les thématiques disponibles, puis cliquez sur "Commencer". Chaque parcours est composé de modules courts accessibles à votre rythme.',
  },
  {
    id: 'coaching',
    topic: 'Coaching',
    question: 'Comment réserver une session de coaching ?',
    answer:
      'Depuis la section "Sessions coaching", sélectionnez un créneau disponible dans le calendrier de votre coach. Vous recevrez une confirmation par e-mail avec le lien de connexion. Pensez à remplir le questionnaire de préparation 24 h avant.',
  },
  {
    id: 'journal',
    topic: 'Journal',
    question: 'À quoi sert le journal de bord ?',
    answer:
      'Le journal vous permet de noter vos réflexions, insights et actions à la suite de chaque module ou session. Ces notes restent privées et vous aident à ancrer vos apprentissages dans la durée.',
  },
  {
    id: 'billing',
    topic: 'Facturation',
    question: 'Comment gérer mon abonnement et ma facturation ?',
    answer:
      'Accédez à la section "Mon compte > Facturation" pour consulter vos factures, changer de formule ou mettre à jour votre mode de paiement. Les factures sont disponibles en téléchargement au format PDF.',
  },
  {
    id: 'data',
    topic: 'Données',
    question: 'Comment sont protégées mes données personnelles ?',
    answer:
      'TLS est conforme au RGPD. Vos données sont hébergées en Europe et ne sont jamais revendues. Vous pouvez demander l\'export ou la suppression de vos données à tout moment depuis "Mon compte > Confidentialité".',
  },
];

const POPULAR_TOPICS = ['Parcours', 'Coaching', 'Badges', 'Facturation', 'Journal', 'RGPD'];

const CHAT_DEMO = [
  { role: 'ai' as const,   text: 'Bonjour ! Je suis l\'assistant TLS. Comment puis-je vous aider aujourd\'hui ?' },
  { role: 'user' as const, text: 'Comment accéder à mon historique de formation ?' },
  { role: 'ai' as const,   text: 'Votre historique est disponible dans "Mon profil > Activité". Vous y retrouvez tous les modules terminés, le temps passé et vos notes de journal associées.' },
];

const CONTACT_OPTIONS = [
  {
    icon: Mail,
    title: 'E-mail',
    desc: 'Réponse sous 24 h ouvrées. Idéal pour les questions détaillées ou les demandes techniques.',
    action: 'Envoyer un e-mail',
    badge: '24 h',
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
  },
];

/* ── Component ──────────────────────────────────────────────────────────── */

export const Help: React.FC = () => {
  const [openFaq, setOpenFaq] = useState<string | null>(null);
  const [chatInput, setChatInput] = useState('');
  const [searchValue, setSearchValue] = useState('');

  const toggleFaq = (id: string) => setOpenFaq((prev) => (prev === id ? null : id));

  return (
    <div className="tls-page">

      {/* ── Hero ───────────────────────────────────────────────────────── */}
      <section className="tls-editorial-hero">
        <span className="tls-editorial-eyebrow">
          <Sparkles size={13} />
          Support &amp; aide
        </span>
        <h1 style={{ marginTop: 'var(--s-2)', marginBottom: 'var(--s-2)' }}>Centre d'aide</h1>
        <p className="tls-editorial-summary">
          Trouvez rapidement des réponses, discutez avec l'assistant IA ou contactez notre équipe.
        </p>

        {/* Search bar */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 'var(--s-3)',
            background: 'var(--glass-fill-strong)',
            border: '1px solid var(--tls-primary-200)',
            borderRadius: 'var(--r-xl)',
            padding: 'var(--s-3) var(--s-4)',
            maxWidth: 520,
            backdropFilter: 'var(--glass-blur)',
            boxShadow: 'var(--shadow-sm)',
          }}
        >
          <Search size={18} style={{ color: 'var(--tls-primary-500)', flexShrink: 0 }} />
          <input
            type="search"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            placeholder="Rechercher dans le centre d'aide…"
            aria-label="Rechercher"
            style={{
              border: 'none',
              background: 'transparent',
              flex: 1,
              color: 'var(--text)',
              font: 'inherit',
              fontSize: 'var(--t-body-sm)',
              outline: 'none',
            }}
          />
        </div>

        {/* Popular topics chips */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--s-2)', marginTop: 'var(--s-1)' }}>
          {POPULAR_TOPICS.map((topic) => (
            <button
              key={topic}
              type="button"
              className="tls-pill"
              style={{ cursor: 'pointer' }}
            >
              {topic}
            </button>
          ))}
        </div>
      </section>

      {/* ── FAQ ────────────────────────────────────────────────────────── */}
      <section>
        <h2 style={{ margin: '0 0 var(--s-4)', fontSize: 'var(--t-h3)', fontWeight: 700, letterSpacing: '-0.02em' }}>
          Questions fréquentes
        </h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--s-2)' }}>
          {FAQ_ITEMS.map((item) => {
            const isOpen = openFaq === item.id;
            return (
              <div
                key={item.id}
                style={{
                  border: `1px solid ${isOpen ? 'var(--tls-primary-300)' : 'var(--border)'}`,
                  borderRadius: 'var(--r-xl)',
                  background: isOpen
                    ? 'linear-gradient(135deg, var(--tls-primary-50), var(--glass-fill-strong))'
                    : 'var(--surface)',
                  overflow: 'hidden',
                  boxShadow: isOpen ? 'var(--shadow-sm)' : 'none',
                  transition: 'border-color var(--dur-2), box-shadow var(--dur-2)',
                }}
              >
                <button
                  type="button"
                  aria-expanded={isOpen}
                  onClick={() => toggleFaq(item.id)}
                  style={{
                    width: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: 'var(--s-4)',
                    padding: 'var(--s-4) var(--s-5)',
                    background: 'transparent',
                    border: 'none',
                    cursor: 'pointer',
                    textAlign: 'left',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--s-3)' }}>
                    <Badge variant={isOpen ? 'brand' : 'neutral'}>{item.topic}</Badge>
                    <span
                      style={{
                        fontWeight: 600,
                        fontSize: 'var(--t-body-sm)',
                        color: 'var(--text)',
                      }}
                    >
                      {item.question}
                    </span>
                  </div>
                  <span style={{ color: 'var(--tls-primary-500)', flexShrink: 0 }}>
                    {isOpen ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                  </span>
                </button>
                {isOpen && (
                  <div
                    style={{
                      padding: '0 var(--s-5) var(--s-5)',
                      color: 'var(--text-muted)',
                      fontSize: 'var(--t-body-sm)',
                      lineHeight: 1.7,
                      borderTop: '1px solid var(--border)',
                      paddingTop: 'var(--s-4)',
                    }}
                  >
                    {item.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* ── Assistant IA ───────────────────────────────────────────────── */}
      <section>
        <div className="tls-row" style={{ marginBottom: 'var(--s-4)', flexWrap: 'wrap', gap: 'var(--s-2)' }}>
          <h2 style={{ margin: 0, fontSize: 'var(--t-h3)', fontWeight: 700, letterSpacing: '-0.02em' }}>
            Assistant IA
          </h2>
          <Badge variant="brand">
            <Bot size={12} style={{ marginRight: 4, verticalAlign: 'middle' }} />
            Démo interactive
          </Badge>
        </div>

        <Card
          style={{
            border: '1px solid var(--tls-primary-200)',
            background: 'var(--surface)',
            overflow: 'hidden',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          {/* Chat header */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 'var(--s-3)',
              padding: 'var(--s-4) var(--s-5)',
              borderBottom: '1px solid var(--border)',
              background: 'linear-gradient(135deg, var(--tls-primary-50), var(--glass-fill-strong))',
            }}
          >
            <div
              style={{
                width: 40,
                height: 40,
                borderRadius: 'var(--r-lg)',
                background: 'var(--tls-primary-100)',
                color: 'var(--tls-primary-700)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
              }}
            >
              <Bot size={20} />
            </div>
            <div>
              <p style={{ margin: 0, fontWeight: 700, fontSize: 'var(--t-body-sm)', color: 'var(--text)' }}>
                Assistant TLS
              </p>
              <p style={{ margin: 0, fontSize: 'var(--t-caption)', color: 'var(--tls-primary-600)' }}>
                <Sparkles size={11} style={{ verticalAlign: 'middle', marginRight: 3 }} />
                En ligne · répond instantanément
              </p>
            </div>
          </div>

          {/* Chat messages */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: 'var(--s-3)',
              padding: 'var(--s-5)',
              minHeight: 260,
            }}
          >
            {CHAT_DEMO.map((msg, i) => (
              <div
                key={i}
                style={{
                  display: 'flex',
                  justifyContent: msg.role === 'user' ? 'flex-end' : 'flex-start',
                }}
              >
                <div
                  style={{
                    maxWidth: '72%',
                    padding: 'var(--s-3) var(--s-4)',
                    borderRadius: msg.role === 'user'
                      ? 'var(--r-xl) var(--r-xl) var(--r-sm) var(--r-xl)'
                      : 'var(--r-xl) var(--r-xl) var(--r-xl) var(--r-sm)',
                    background: msg.role === 'user'
                      ? 'var(--tls-primary-500)'
                      : 'var(--tls-primary-50)',
                    color: msg.role === 'user' ? 'var(--on-color-text-main)' : 'var(--text)',
                    fontSize: 'var(--t-body-sm)',
                    lineHeight: 1.6,
                    boxShadow: 'var(--shadow-xs)',
                  }}
                >
                  {msg.text}
                </div>
              </div>
            ))}
          </div>

          {/* Chat input */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 'var(--s-3)',
              padding: 'var(--s-3) var(--s-4)',
              borderTop: '1px solid var(--border)',
              background: 'var(--bg)',
            }}
          >
            <input
              type="text"
              value={chatInput}
              onChange={(e) => setChatInput(e.target.value)}
              placeholder="Posez votre question…"
              aria-label="Message pour l'assistant"
              style={{
                flex: 1,
                border: '1px solid var(--border)',
                borderRadius: 'var(--r-lg)',
                padding: 'var(--s-3) var(--s-4)',
                background: 'var(--surface)',
                color: 'var(--text)',
                font: 'inherit',
                fontSize: 'var(--t-body-sm)',
                outline: 'none',
                transition: 'border-color var(--dur-2)',
              }}
              onFocus={(e) => { e.target.style.borderColor = 'var(--tls-primary-400)'; }}
              onBlur={(e) => { e.target.style.borderColor = 'var(--border)'; }}
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

      {/* ── Contacter le support ───────────────────────────────────────── */}
      <section>
        <h2 style={{ margin: '0 0 var(--s-4)', fontSize: 'var(--t-h3)', fontWeight: 700, letterSpacing: '-0.02em' }}>
          Contacter le support
        </h2>
        <div className="feature-page__grid">
          {CONTACT_OPTIONS.map((opt) => {
            const Icon = opt.icon;
            return (
              <Card
                key={opt.title}
                style={{
                  padding: 'var(--s-6)',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 'var(--s-4)',
                  border: '1px solid var(--border)',
                  background: 'var(--surface)',
                  boxShadow: 'var(--shadow-sm)',
                  transition: 'transform var(--dur-2), box-shadow var(--dur-2)',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
                  <div
                    style={{
                      width: 48,
                      height: 48,
                      borderRadius: 'var(--r-lg)',
                      background: 'var(--tls-primary-50)',
                      color: 'var(--tls-primary-600)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <Icon size={22} />
                  </div>
                  <Badge variant={opt.badgeVariant ?? 'neutral'}>{opt.badge}</Badge>
                </div>
                <div>
                  <CardTitle style={{ marginBottom: 'var(--s-2)' }}>{opt.title}</CardTitle>
                  <CardDesc>{opt.desc}</CardDesc>
                </div>
                <Button variant="secondary" size="sm" style={{ marginTop: 'auto' }}>
                  {opt.action}
                </Button>
              </Card>
            );
          })}
        </div>
      </section>

    </div>
  );
};
