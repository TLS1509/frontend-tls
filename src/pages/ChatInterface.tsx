import React, { useState } from 'react';
import { Send, Sparkles, BookOpen, Target, FileText } from 'lucide-react';
import { EditorialHero } from '../components/patterns/EditorialHero';
import { SectionCard } from '../components/patterns/SectionCard';
import { ConversationalChat } from '../components/patterns/ConversationalChat';
import { Card } from '../components/core/Card';
import { Button } from '../components/core/Button';
import { Badge } from '../components/ui/Badge';
import { useChatStore, MOCK_CHAT_SESSION_ID } from '../stores/persistence';
import { simulateRAGResponse, CHAT_SUGGESTIONS, PRIVACY_BLOCKLIST } from '../data/chatbot';
import type { ChatMessage, ChatFeedback } from '../types/learning';

function formatTime(): string {
  const d = new Date();
  return `${d.getHours()}:${String(d.getMinutes()).padStart(2, '0')}`;
}

// ─── Page ──────────────────────────────────────────────────────────────────────

export default function ChatInterface() {
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const chatStore = useChatStore();
  // Seed session on first access
  const session = chatStore.getSession(MOCK_CHAT_SESSION_ID);
  const messages: ChatMessage[] = session?.messages ?? [];

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
            <ConversationalChat
              messages={messages}
              isTyping={isTyping}
              onFeedback={handleFeedback}
              emptyState={
                <p className="text-body-sm text-ink-400 text-center mt-8">
                  Commencez par poser une question ci-dessous.
                </p>
              }
              className="min-h-[460px] max-h-[600px]"
            />

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
