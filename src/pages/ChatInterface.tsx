import React, { useState, useRef, useEffect } from 'react';
import { Send, Sparkles, BookOpen, Target, FileText, ThumbsUp, ThumbsDown, ExternalLink, AlertTriangle, ShieldOff } from 'lucide-react';
import { EditorialHero } from '../components/patterns/EditorialHero';
import { SectionCard } from '../components/patterns/SectionCard';
import { Card } from '../components/core/Card';
import { Button } from '../components/core/Button';
import { Avatar } from '../components/ui/Avatar';
import { Badge } from '../components/ui/Badge';
import { useChatStore, MOCK_CHAT_SESSION_ID } from '../stores/persistence';
import { simulateRAGResponse, CHAT_SUGGESTIONS, PRIVACY_BLOCKLIST } from '../data/chatbot';
import type { ChatMessage, ChatFeedback } from '../types/learning';

const CONFIDENCE_THRESHOLD = 0.6;
const MOCK_USER_ID = 'user-demo';

function formatTime(): string {
  const d = new Date();
  return `${d.getHours()}:${String(d.getMinutes()).padStart(2, '0')}`;
}

// ─── Sub-components ────────────────────────────────────────────────────────────

function UserBubble({ message }: { message: ChatMessage }) {
  return (
    <div className="flex flex-col items-end gap-stack-xs">
      <div className="max-w-[75%] bg-primary-100 text-primary-900 rounded-2xl rounded-br-sm px-4 py-3 text-body-sm leading-relaxed">
        {message.content}
      </div>
      <span className="text-micro text-ink-400 px-1">{message.timestamp}</span>
    </div>
  );
}

function AssistantBubble({
  message,
  onFeedback,
}: {
  message: ChatMessage;
  onFeedback: (messageId: string, rating: ChatFeedback['rating']) => void;
}) {
  const isLowConfidence = message.confidenceScore !== undefined && message.confidenceScore < CONFIDENCE_THRESHOLD;
  const isPrivacyBlocked = message.privacyBlocked;

  const lines = message.content.split('\n');
  const hasFeedback = message.feedback?.rating !== undefined && message.feedback.rating !== 'skip';

  return (
    <div className="flex gap-stack-xs items-start">
      <Avatar initials="IA" tint="brand" size="sm" className="shrink-0 mt-1" />
      <div className="flex flex-col gap-stack-xs flex-1 min-w-0">
        {/* Message bubble */}
        <div className={[
          'max-w-[82%] rounded-2xl rounded-bl-sm px-4 py-3 text-body-sm leading-relaxed',
          isPrivacyBlocked
            ? 'bg-danger-bg border border-danger-border text-danger-fg'
            : isLowConfidence
              ? 'bg-warning-bg border border-warning-border text-ink-800'
              : 'bg-ink-50 border border-ink-200 text-ink-800',
        ].join(' ')}>
          {isPrivacyBlocked && (
            <div className="flex items-center gap-2 mb-2 text-danger-fg">
              <ShieldOff size={14} />
              <span className="text-caption font-semibold">Contenu bloqué</span>
            </div>
          )}
          {isLowConfidence && !isPrivacyBlocked && (
            <div className="flex items-center gap-2 mb-2 text-warning-fg">
              <AlertTriangle size={14} />
              <span className="text-caption font-semibold">Confiance limitée</span>
            </div>
          )}
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

        {/* Timestamp + sources */}
        <div className="flex items-start gap-2 pl-1 flex-wrap">
          <span className="text-micro text-ink-400 shrink-0">{message.timestamp}</span>
          {message.sourcesCited && message.sourcesCited.length > 0 && (
            <div className="flex flex-wrap gap-1">
              {message.sourcesCited.map((src) => (
                <span
                  key={src.sourceId}
                  className="inline-flex items-center gap-1 text-micro bg-primary-50 text-primary-700 border border-primary-200 rounded-pill px-2 py-0.5"
                >
                  {src.url ? (
                    <a href={src.url} className="hover:underline flex items-center gap-1">
                      {src.title}
                      <ExternalLink size={10} />
                    </a>
                  ) : (
                    src.title
                  )}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Feedback buttons — only for assistant messages with non-blocked content */}
        {!isPrivacyBlocked && (
          <div className="flex items-center gap-2 pl-1">
            {hasFeedback ? (
              <span className="text-micro text-ink-400">
                {message.feedback?.rating === 'yes' ? '✓ Utile' : '✗ Pas utile'} — merci pour ton retour
              </span>
            ) : (
              <>
                <span className="text-micro text-ink-400">Utile ?</span>
                <button
                  onClick={() => onFeedback(message.id, 'yes')}
                  className="inline-flex items-center gap-1 text-micro text-success-fg hover:text-success-base transition-colors duration-fast px-1.5 py-0.5 rounded-sm hover:bg-success-bg"
                  aria-label="Marquer comme utile"
                >
                  <ThumbsUp size={12} /> Oui
                </button>
                <button
                  onClick={() => onFeedback(message.id, 'no')}
                  className="inline-flex items-center gap-1 text-micro text-danger-fg hover:text-danger-base transition-colors duration-fast px-1.5 py-0.5 rounded-sm hover:bg-danger-bg"
                  aria-label="Marquer comme pas utile"
                >
                  <ThumbsDown size={12} /> Non
                </button>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

function TypingIndicator() {
  return (
    <div className="flex gap-stack-xs items-start">
      <Avatar initials="IA" tint="brand" size="sm" className="shrink-0 mt-1" />
      <div className="bg-ink-50 border border-ink-200 rounded-2xl rounded-bl-sm px-4 py-3">
        <div className="flex items-center gap-1">
          <span className="w-2 h-2 rounded-full bg-ink-300 animate-bounce" style={{ animationDelay: '0ms' }} />
          <span className="w-2 h-2 rounded-full bg-ink-300 animate-bounce" style={{ animationDelay: '150ms' }} />
          <span className="w-2 h-2 rounded-full bg-ink-300 animate-bounce" style={{ animationDelay: '300ms' }} />
        </div>
      </div>
    </div>
  );
}

// ─── Page ──────────────────────────────────────────────────────────────────────

export default function ChatInterface() {
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const chatStore = useChatStore();
  // Seed session on first access
  const session = chatStore.getSession(MOCK_CHAT_SESSION_ID);
  const messages: ChatMessage[] = session?.messages ?? [];

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const isPrivacyQuestion = (q: string) => {
    const lower = q.toLowerCase();
    return PRIVACY_BLOCKLIST.some((kw) => lower.includes(kw));
  };

  const handleSend = async () => {
    const text = inputValue.trim();
    if (!text || isTyping) return;
    setInputValue('');

    const userMsg: ChatMessage = {
      id: `msg-${Date.now()}-user`,
      role: 'user',
      content: text,
      timestamp: formatTime(),
    };
    chatStore.addMessage(MOCK_CHAT_SESSION_ID, userMsg);

    setIsTyping(true);
    // Simulate backend processing delay (Mistral RAG ~2-3s)
    await new Promise((res) => setTimeout(res, 1200 + Math.random() * 800));

    if (isPrivacyQuestion(text)) {
      const blockedMsg: ChatMessage = {
        id: `msg-${Date.now()}-blocked`,
        role: 'assistant',
        content: 'Je ne peux pas répondre à cette question pour des raisons de confidentialité.',
        timestamp: formatTime(),
        confidenceScore: 1.0,
        privacyBlocked: true,
        sourcesCited: [],
      };
      chatStore.addMessage(MOCK_CHAT_SESSION_ID, blockedMsg);
    } else {
      const ragResponse = simulateRAGResponse(text);
      const assistantMsg: ChatMessage = {
        id: `msg-${Date.now()}-assistant`,
        role: 'assistant',
        content: ragResponse.content,
        timestamp: formatTime(),
        confidenceScore: ragResponse.confidenceScore,
        intentCategory: ragResponse.intentCategory,
        sourcesCited: ragResponse.sourcesCited,
      };
      chatStore.addMessage(MOCK_CHAT_SESSION_ID, assistantMsg);
    }

    setIsTyping(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
      e.preventDefault();
      handleSend();
    }
  };

  const handleFeedback = (messageId: string, rating: ChatFeedback['rating']) => {
    chatStore.updateFeedback(MOCK_CHAT_SESSION_ID, messageId, { messageId, rating });
  };

  return (
    <div className="flex flex-col gap-section">
      <EditorialHero
        eyebrow={{ label: 'Assistant IA', icon: <Sparkles size={14} /> }}
        title="Votre assistant personnel"
        summary="Posez vos questions sur vos formations, demandez de l'aide sur un concept ou explorez vos compétences."
        tone="brand"
        trailing={
          <Badge variant="info" size="md">RAG · Mistral</Badge>
        }
      />

      <div className="max-w-wide mx-auto w-full px-4 md:px-8 flex flex-col gap-section">
        <div className="flex flex-col lg:flex-row gap-section items-start">

          {/* ── Chat area ──────────────────────────────────────────────── */}
          <div className="flex-1 min-w-0 flex flex-col gap-stack">

            {/* Message list */}
            <Card className="flex flex-col gap-stack p-4 md:p-6 min-h-[460px] max-h-[600px] overflow-y-auto">
              {messages.length === 0 && (
                <p className="text-body-sm text-ink-400 text-center mt-8">
                  Commencez par poser une question ci-dessous.
                </p>
              )}
              {messages.map((msg) =>
                msg.role === 'user'
                  ? <UserBubble key={msg.id} message={msg} />
                  : <AssistantBubble key={msg.id} message={msg} onFeedback={handleFeedback} />
              )}
              {isTyping && <TypingIndicator />}
              <div ref={messagesEndRef} />
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
                  disabled={isTyping}
                  className="flex-1 resize-none rounded-lg border border-ink-200 bg-white px-3 py-2.5 text-body-sm text-ink-900 placeholder:text-ink-400 focus:outline-none focus:border-primary-400 focus:ring-2 focus:ring-primary-100 transition-all duration-base h-auto min-h-[64px] disabled:opacity-disabled disabled:cursor-not-allowed"
                />
                <Button
                  variant="primary"
                  size="md"
                  leadingIcon={<Send size={16} />}
                  onClick={handleSend}
                  loading={isTyping}
                  disabled={!inputValue.trim() || isTyping}
                  aria-label="Envoyer le message"
                  className="shrink-0"
                >
                  Envoyer
                </Button>
              </div>
              <p className="text-micro text-ink-400 pl-1">
                Ctrl+Entrée pour envoyer · Les réponses sont basées sur le contenu indexé de la plateforme.
              </p>
            </Card>
          </div>

          {/* ── Suggestions sidebar ────────────────────────────────────── */}
          <aside className="w-full lg:w-72 shrink-0">
            <SectionCard
              title="Suggestions"
              description="Démarrez une conversation avec ces questions préparées."
            >
              <div className="flex flex-col gap-stack-xs">
                {CHAT_SUGGESTIONS.map((s) => {
                  const icons: Record<string, React.ReactNode> = {
                    formation: <BookOpen size={15} />,
                    projects: <FileText size={15} />,
                    passeport: <Target size={15} />,
                  };
                  return (
                    <Button
                      key={s.id}
                      variant="ghost"
                      size="sm"
                      leadingIcon={icons[s.intent] ?? <Sparkles size={15} />}
                      fullWidth
                      className="justify-start text-left"
                      onClick={() => setInputValue(s.label)}
                    >
                      {s.label}
                    </Button>
                  );
                })}
              </div>
            </SectionCard>

            {/* Info card */}
            <Card variant="tinted" tone="primary" className="mt-stack p-4 flex flex-col gap-tight">
              <p className="text-caption font-semibold text-primary-900">À propos de cet assistant</p>
              <p className="text-caption text-primary-700 leading-relaxed">
                Les réponses sont générées uniquement depuis le contenu indexé de la plateforme (formations, Passeport, Coaching, Missions). Aucune donnée externe.
              </p>
              <div className="flex flex-wrap gap-1 mt-1">
                <Badge variant="info" size="sm">Contenu Formation</Badge>
                <Badge variant="info" size="sm">Passeport</Badge>
                <Badge variant="info" size="sm">Missions</Badge>
              </div>
            </Card>
          </aside>
        </div>
      </div>
    </div>
  );
}
