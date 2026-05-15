import React, { useState } from 'react';
import { Send, Sparkles, BookOpen, Target, FileText } from 'lucide-react';
import { EditorialHero } from '../components/patterns/EditorialHero';
import { SectionCard } from '../components/patterns/SectionCard';
import { Card } from '../components/core/Card';
import { Button } from '../components/core/Button';
import { Avatar } from '../components/ui/Avatar';
import { MetaPill } from '../components/ui/MetaPill';

// ─── Mock data ─────────────────────────────────────────────────────────────────

type MessageRole = 'user' | 'assistant';

interface ChatMessage {
  id: number;
  role: MessageRole;
  text: string;
  timestamp: string;
  sources?: string[];
}

const MOCK_MESSAGES: ChatMessage[] = [
  {
    id: 1,
    role: 'user',
    text: 'Peux-tu m\'expliquer ce qu\'est le prompt engineering et pourquoi c\'est important pour utiliser les IA génératives ?',
    timestamp: '14:02',
  },
  {
    id: 2,
    role: 'assistant',
    text: 'Le prompt engineering, c\'est l\'art de formuler des instructions claires et précises pour guider un modèle de langage vers la réponse souhaitée.\n\nConcrètement, la qualité de ta question influe directement sur la qualité de la réponse. Un bon prompt comprend généralement : le contexte (qui tu es, quel est ton objectif), la tâche (ce que tu veux obtenir), le format attendu (liste, paragraphe, tableau…) et les contraintes éventuelles (longueur, niveau de détail, ton).\n\nC\'est une compétence clé dans ton parcours Leadership & IA.',
    timestamp: '14:02',
    sources: ['Module 3 — IA & Leadership', 'Fiche outil : Prompts efficaces'],
  },
  {
    id: 3,
    role: 'user',
    text: 'Intéressant ! Comment je peux m\'entraîner concrètement à cette compétence dans mon parcours ?',
    timestamp: '14:04',
  },
  {
    id: 4,
    role: 'assistant',
    text: 'Plusieurs ressources sont disponibles directement dans ton parcours :\n\n• **L\'atelier "Prompts & Cie"** (Module 3, semaine 2) — exercices pratiques avec feedback immédiat\n• **La mission JAC "IA en contexte"** — applique le prompt engineering à un vrai cas de ton poste\n• **Les flashcards du module** — révision rapide des patterns de prompts les plus utiles\n\nJe te recommande de commencer par l\'atelier : tu es à 62 % du module 3, tu peux enchaîner directement sur cette leçon.',
    timestamp: '14:04',
    sources: ['Module 3 — Atelier Prompts', 'Mission JAC #4'],
  },
  {
    id: 5,
    role: 'user',
    text: 'Merci ! Et pour ma mission JAC, j\'ai du mal à formuler une problématique précise. Tu peux m\'aider ?',
    timestamp: '14:06',
  },
  {
    id: 6,
    role: 'assistant',
    text: 'Bien sûr ! Pour formuler une bonne problématique JAC, commence par répondre à ces trois questions :\n\n1. **Quel est le défi réel** que tu rencontres dans ton équipe ou dans ton rôle ?\n2. **Quelle compétence** veux-tu développer à travers cette mission ?\n3. **Quel serait le signe** que tu as réussi — qu\'est-ce qui aurait changé concrètement ?\n\nDis-moi en quelques mots ton contexte professionnel et la compétence ciblée, et je t\'aide à reformuler une problématique précise et actionnelle.',
    timestamp: '14:07',
    sources: ['Guide JAC — Formuler sa problématique'],
  },
];

const SUGGESTIONS = [
  { id: 1, label: 'Résumé du module en cours', icon: <BookOpen size={15} /> },
  { id: 2, label: 'Aide pour ma mission JAC', icon: <FileText size={15} /> },
  { id: 3, label: 'Mes objectifs de la semaine', icon: <Target size={15} /> },
  { id: 4, label: 'Préparer mon prochain atelier', icon: <Sparkles size={15} /> },
];

// ─── Sub-components ────────────────────────────────────────────────────────────

function UserBubble({ message }: { message: ChatMessage }) {
  return (
    <div className="flex flex-col items-end gap-stack-xs">
      <div className="max-w-[75%] bg-primary-100 text-primary-900 rounded-pill rounded-br-sm px-4 py-3 text-body-sm leading-relaxed">
        {message.text}
      </div>
      <span className="text-micro text-ink-400 px-1">{message.timestamp}</span>
    </div>
  );
}

function AssistantBubble({ message }: { message: ChatMessage }) {
  const lines = message.text.split('\n');
  return (
    <div className="flex gap-stack-xs items-start">
      <Avatar initials="IA" tint="brand" size="sm" className="shrink-0 mt-1" />
      <div className="flex flex-col gap-stack-xs flex-1 min-w-0">
        <div className="max-w-[80%] bg-ink-50 border border-ink-200 text-ink-800 rounded-pill rounded-bl-sm px-4 py-3 text-body-sm leading-relaxed">
          {lines.map((line, i) => {
            if (line === '') return <br key={i} />;
            // Bold markdown **text**
            const parts = line.split(/(\*\*[^*]+\*\*)/g);
            return (
              <p key={i} className="mb-0.5 last:mb-0">
                {parts.map((part, j) =>
                  part.startsWith('**') && part.endsWith('**')
                    ? <strong key={j}>{part.slice(2, -2)}</strong>
                    : part
                )}
              </p>
            );
          })}
        </div>
        <div className="flex items-center gap-stack-xs flex-wrap pl-1">
          <span className="text-micro text-ink-400">{message.timestamp}</span>
          {message.sources?.map((src) => (
            <MetaPill key={src} text={`Source : ${src}`} tone="primary" size="sm" />
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── Page ──────────────────────────────────────────────────────────────────────

export default function ChatInterface() {
  const [inputValue, setInputValue] = useState('');
  const [messages] = useState<ChatMessage[]>(MOCK_MESSAGES);

  const handleSend = () => {
    if (!inputValue.trim()) return;
    setInputValue('');
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
      handleSend();
    }
  };

  return (
    <div className="flex flex-col gap-section">
      <EditorialHero
        eyebrow={{ label: 'Assistant IA', icon: <Sparkles size={14} /> }}
        title="Votre assistant personnel"
        summary="Posez vos questions sur vos formations, demandez de l'aide sur un concept ou explorez vos compétences."
        tone="brand"
      />

      <div className="max-w-wide mx-auto w-full px-4 md:px-8 flex flex-col gap-section">
        <div className="flex flex-col lg:flex-row gap-section items-start">

          {/* ── Chat area ──────────────────────────────────────────────── */}
          <div className="flex-1 min-w-0 flex flex-col gap-stack">

            {/* Message list */}
            <Card className="flex flex-col gap-section p-4 md:p-6 min-h-[460px] max-h-[600px] overflow-y-auto">
              {messages.map((msg) =>
                msg.role === 'user'
                  ? <UserBubble key={msg.id} message={msg} />
                  : <AssistantBubble key={msg.id} message={msg} />
              )}
            </Card>

            {/* Input area */}
            <Card className="p-4 flex flex-col gap-stack-xs">
              <div className="flex gap-stack items-end">
                <textarea
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyDown={handleKeyDown}
                  rows={2}
                  placeholder="Posez votre question à l'assistant…"
                  className="flex-1 resize-none rounded-lg border border-ink-200 bg-white px-3 py-2.5 text-body-sm text-ink-900 placeholder:text-ink-400 focus:outline-none focus:border-primary-400 focus:ring-2 focus:ring-primary-100 transition-all duration-base h-auto min-h-[64px]"
                />
                <Button
                  variant="primary"
                  size="md"
                  leadingIcon={<Send size={16} />}
                  onClick={handleSend}
                  aria-label="Envoyer le message"
                  className="shrink-0"
                >
                  Envoyer
                </Button>
              </div>
              <p className="text-micro text-ink-400 pl-1">
                Ctrl+Entrée pour envoyer · Les réponses sont générées par IA et peuvent contenir des erreurs.
              </p>
            </Card>
          </div>

          {/* ── Suggestions sidebar ────────────────────────────────────── */}
          <aside className="w-full lg:w-72 shrink-0">
            <SectionCard
              title="Suggestions"
              description="Démarrez une conversation avec ces questions préparées pour votre parcours."
            >
              <div className="flex flex-col gap-stack-xs">
                {SUGGESTIONS.map((s) => (
                  <Button
                    key={s.id}
                    variant="ghost"
                    size="sm"
                    leadingIcon={s.icon}
                    fullWidth
                    className="justify-start text-left"
                    onClick={() => setInputValue(s.label)}
                  >
                    {s.label}
                  </Button>
                ))}
              </div>
            </SectionCard>
          </aside>
        </div>
      </div>
    </div>
  );
}
