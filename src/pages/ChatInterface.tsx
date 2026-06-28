import React, { useState } from 'react';
import { Send, Sparkles, BookOpen, Target, FileText, Shield, ExternalLink } from 'lucide-react';
import { EditorialHero } from '../components/patterns/EditorialHero';
import { SectionCard } from '../components/patterns/SectionCard';
import { ConversationalChat } from '../components/patterns/ConversationalChat';
import { Card } from '../components/core/Card';
import { Button } from '../components/core/Button';
import { Badge } from '../components/ui/Badge';
import { AITransparencyLabel } from '../components/ui/AITransparencyLabel';
import { useChatStore, MOCK_CHAT_SESSION_ID } from '../stores/persistence';
import { simulateRAGResponse, CHAT_SUGGESTIONS, PRIVACY_BLOCKLIST } from '../data/chatbot';
import type { ChatMessage, ChatFeedback, ChatSourceCitation } from '../types/learning';
import { Container } from '../components/layout';

function formatTime(): string {
  const d = new Date();
  return `${d.getHours()}:${String(d.getMinutes()).padStart(2, '0')}`;
}

// ─── AI transparency footer (AI Act Article 4 compliance) ────────────────────

function ConfidenceChip({ score }: { score: number }) {
  const pct = Math.round(score * 100);
  const cls =
    pct >= 80
      ? 'text-success-fg bg-success-bg border-success-border'
      : pct >= 60
        ? 'text-info-fg bg-info-bg border-info-border'
        : 'text-warning-fg bg-warning-bg border-warning-border';
  return (
    <span className={`inline-flex items-center text-micro font-medium px-1.5 py-0.5 rounded-xs border ${cls}`}>
      {pct}% confiance
    </span>
  );
}

function SourceChip({ source }: { source: ChatSourceCitation }) {
  const inner = (
    <span className="inline-flex items-center gap-0.5 text-micro text-primary-700 bg-primary-50 border border-primary-100 px-1.5 py-0.5 rounded-xs font-medium hover:bg-primary-100 transition-colors duration-fast">
      {source.title}
      {source.url && <ExternalLink size={9} aria-hidden />}
    </span>
  );
  return source.url
    ? <a href={source.url} className="focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-primary-500 rounded-xs">{inner}</a>
    : inner;
}

function buildAiContent(m: ChatMessage): React.ReactNode {
  if (m.privacyBlocked) {
    return (
      <div className="flex flex-col gap-tight">
        <p className="text-body-sm text-ink-900 leading-relaxed">{m.content}</p>
        <div className="flex items-center gap-tight pt-tight border-t border-ink-100 mt-1">
          <span className="inline-flex items-center gap-tight text-micro font-medium text-ink-500 bg-ink-50 border border-ink-200 px-1.5 py-0.5 rounded-xs">
            <Shield size={10} aria-hidden />
            Filtré — confidentialité
          </span>
        </div>
      </div>
    );
  }

  const sources = m.sourcesCited ?? [];

  return (
    <div className="flex flex-col gap-tight">
      <p className="text-body-sm text-ink-900 leading-relaxed">{m.content}</p>
      <div className="flex flex-wrap items-center gap-tight pt-tight border-t border-primary-100 mt-1">
        <AITransparencyLabel variant="generated" size="sm" />
        {m.confidenceScore !== undefined && (
          <ConfidenceChip score={m.confidenceScore} />
        )}
        {sources.slice(0, 3).map((s) => (
          <SourceChip key={s.sourceId} source={s} />
        ))}
      </div>
    </div>
  );
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
        tone="flat"
        trailing={
          <Badge variant="info" size="md">RAG · Mistral</Badge>
        }
      />

      <Container width="wide" padding={false} className="px-stack md:px-section flex flex-col gap-section">
        <div className="flex flex-col lg:flex-row gap-section items-start">

          {/* ── Chat area ──────────────────────────────────────────────── */}
          <div className="flex-1 min-w-0 flex flex-col gap-stack">

            {/* Message list */}
            <ConversationalChat
              messages={[
                ...messages.map((m) => ({
                  id: m.id,
                  type: m.role === 'user' ? 'user' as const : 'ai' as const,
                  content: m.role === 'assistant' ? buildAiContent(m) : m.content,
                })),
                ...(isTyping ? [{ id: 'typing', type: 'typing' as const }] : []),
              ]}
              className="min-h-[460px] max-h-[600px]"
            />

            {/* Input area */}
            <Card className="p-stack flex flex-col gap-stack-xs">
              <div className="flex gap-stack items-end">
                <textarea
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyDown={handleKeyDown}
                  rows={2}
                  placeholder="Posez votre question à l'assistant…"
                  disabled={isTyping}
                  className="flex-1 resize-none rounded-lg border border-ink-200 bg-white px-3 py-stack-xs.5 text-body-sm text-ink-900 placeholder:text-ink-400 focus:outline-none focus:border-primary-400 focus:ring-2 focus:ring-primary-100 transition-all duration-base h-auto min-h-[64px] disabled:opacity-disabled disabled:cursor-not-allowed"
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
            <Card variant="tinted" tone="primary" className="mt-stack p-stack flex flex-col gap-tight">
              <p className="text-caption font-semibold text-primary-900">À propos de cet assistant</p>
              <p className="text-caption text-primary-700 leading-relaxed">
                Les réponses sont générées uniquement depuis le contenu indexé de la plateforme (formations, Passeport, Coaching, Missions). Aucune donnée externe.
              </p>
              <div className="flex flex-wrap gap-tight mt-1">
                <Badge variant="info" size="sm">Contenu Formation</Badge>
                <Badge variant="info" size="sm">Passeport</Badge>
                <Badge variant="info" size="sm">Missions</Badge>
              </div>
            </Card>
          </aside>
        </div>
      </Container>
    </div>
  );
}
