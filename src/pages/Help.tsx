import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/core/Button';
import { ArrowLeft, Bot, Send, Sparkles, UserRound } from 'lucide-react';
import '../styles/static-pages.css';
import '../styles/figma-missing-pages.css';

type ChatRole = 'user' | 'bot';

interface ChatMessage {
  id: string;
  role: ChatRole;
  content: string;
  suggestions?: string[];
}

function botReply(text: string): { content: string; suggestions?: string[] } {
  const q = text.toLowerCase();
  if (q.includes('parcours') || q.includes('démarrer') || q.includes('demarrer')) {
    return {
      content:
        "Pour démarrer un parcours, ouvrez « Mon parcours » dans le menu. Vous y voyez les parcours disponibles, la progression et les prochaines leçons.",
      suggestions: ['Voir mes parcours en cours', 'Explorer les nouveaux parcours'],
    };
  }
  if (q.includes('coaching') || q.includes('réserver') || q.includes('reserver')) {
    return {
      content:
        "Pour réserver une session, allez dans « Sessions coaching ». Vous choisissez un créneau et complétez le questionnaire de préparation si demandé.",
      suggestions: ['Voir les créneaux', 'Questionnaire pré-session'],
    };
  }
  if (q.includes('badge') || q.includes('progression')) {
    return {
      content: 'Vos badges et votre progression sont visibles sur votre profil et le tableau de bord.',
      suggestions: ['Ouvrir mon profil', 'Tableau de bord'],
    };
  }
  return {
    content:
      "Je peux vous orienter sur les parcours, le coaching, la veille ou le journal. Posez une question courte ou choisissez une suggestion ci-dessous.",
    suggestions: ['Comment démarrer un parcours ?', 'Réserver une session de coaching', 'Consulter la veille'],
  };
}

/**
 * Help / chatbot — static mock, parity with figmamakedesignreact HelpChatbotPage
 */
export const Help: React.FC = () => {
  const navigate = useNavigate();
  const endRef = useRef<HTMLDivElement>(null);
  const [input, setInput] = useState('');
  const [typing, setTyping] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      role: 'bot',
      content:
        "Bonjour ! Je suis l'assistant TLS (mode statique). Comment puis-je vous aider aujourd'hui ?",
      suggestions: [
        'Comment démarrer un parcours ?',
        'Réserver une session de coaching',
        'Consulter mes badges',
        'Suivre ma progression',
      ],
    },
  ]);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, typing]);

  const pushUser = (text: string) => {
    const trimmed = text.trim();
    if (!trimmed) return;
    setMessages((prev) => [...prev, { id: `u-${Date.now()}`, role: 'user', content: trimmed }]);
    setInput('');
    setTyping(true);
    window.setTimeout(() => {
      const { content, suggestions } = botReply(trimmed);
      setMessages((prev) => [...prev, { id: `b-${Date.now()}`, role: 'bot', content, suggestions }]);
      setTyping(false);
    }, 700 + Math.random() * 500);
  };

  return (
    <div className="tls-page">
      <section className="tls-editorial-hero">
        <div className="tls-row" style={{ alignItems: 'flex-start' }}>
          <div>
            <h1>Aide & assistant</h1>
            <p className="tls-editorial-summary">Assistant conversationnel de support pour orienter rapidement les utilisateurs vers les bons parcours/actions.</p>
          </div>
          <Button variant="secondary" size="sm" leadingIcon={<ArrowLeft size={16} />} onClick={() => navigate('/dashboard')}>
            Retour
          </Button>
        </div>
      </section>

      <div className="help-chat">
        <header className="help-chat__head">
          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--s-3)' }}>
            <span
              style={{
                width: 40,
                height: 40,
                borderRadius: 'var(--r-lg)',
                background: 'var(--tls-primary-100)',
                color: 'var(--tls-primary-700)',
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Bot size={22} />
            </span>
            <div>
              <h2 style={{ margin: 0, fontSize: 'var(--t-h4)' }}>Assistant TLS</h2>
              <p className="tls-muted" style={{ margin: 0, fontSize: 'var(--t-caption)' }}>
                <Sparkles size={12} style={{ verticalAlign: 'middle', marginRight: 4 }} />
                Mode démo
              </p>
            </div>
          </div>
        </header>

        <div className="help-chat__messages">
          {messages.map((m) => (
            <div key={m.id} className={`help-chat__bubble help-chat__bubble--${m.role === 'bot' ? 'bot' : 'user'}`}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6, opacity: 0.85 }}>
                {m.role === 'bot' ? <Bot size={14} /> : <UserRound size={14} />}
                <span style={{ fontSize: 'var(--t-micro)', fontWeight: 700, textTransform: 'uppercase' }}>
                  {m.role === 'bot' ? 'Assistant' : 'Vous'}
                </span>
              </div>
              <div>{m.content}</div>
              {m.suggestions && m.suggestions.length > 0 && (
                <div className="help-chat__suggestions">
                  {m.suggestions.map((s) => (
                    <button key={s} type="button" className="help-chat__suggestion" onClick={() => pushUser(s)}>
                      {s}
                    </button>
                  ))}
                </div>
              )}
            </div>
          ))}
          {typing && <div className="help-chat__typing">L&apos;assistant écrit…</div>}
          <div ref={endRef} />
        </div>

        <footer className="help-chat__footer">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && pushUser(input)}
            placeholder="Posez votre question…"
            aria-label="Message"
          />
          <Button leadingIcon={<Send size={16} />} onClick={() => pushUser(input)}>
            Envoyer
          </Button>
        </footer>
      </div>
    </div>
  );
};
