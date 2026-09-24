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
import { Container, PageShell } from '../components/layout';

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
    <span className="inline-flex items-center gap-tight text-micro text-primary-800 bg-primary-50 border border-primary-100 px-1.5 py-0.5 rounded-xs font-medium hover:bg-primary-100 transition-colors duration-fast">
      {source.title}
      {source.url && <ExternalLink size={14} aria-hidden />}
    </span>
  );
  return source.url
    ? <a href={source.url} className="focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-primary-500 rounded-xs">{inner}</a>
    : inner;
}

// ─── Markdown des réponses ───────────────────────────────────────────────────
/* Les réponses arrivent en Markdown léger (gras, puces « • » ou « - », listes
   numérotées, paragraphes séparés par une ligne vide). Elles s'affichaient
   brutes, astérisques et puces en ligne compris. Pas de bibliothèque : ce
   sous-ensemble suffit, et rien n'est injecté en HTML. */

function renderInline(text: string): React.ReactNode {
  return text.split(/(\*\*[^*]+\*\*)/g).map((part, i) =>
    part.startsWith('**') && part.endsWith('**') && part.length > 4
      ? <strong key={i} className="font-semibold">{part.slice(2, -2)}</strong>
      : <React.Fragment key={i}>{part}</React.Fragment>,
  );
}

const BULLET = /^\s*(?:•|-|\*)\s+/;
const NUMBERED = /^\s*\d+[.)]\s+/;

function renderMarkdown(text: string): React.ReactNode {
  return text
    .split(/\n\s*\n/)
    .map((block) => block.split('\n').filter((l) => l.trim() !== ''))
    .filter((lines) => lines.length > 0)
    .map((lines, i) => {
      if (lines.every((l) => BULLET.test(l))) {
        return (
          <ul key={i} className="list-disc pl-5 flex flex-col gap-tight">
            {lines.map((l, j) => <li key={j}>{renderInline(l.replace(BULLET, ''))}</li>)}
          </ul>
        );
      }
      if (lines.every((l) => NUMBERED.test(l))) {
        return (
          <ol key={i} className="list-decimal pl-5 flex flex-col gap-tight">
            {lines.map((l, j) => <li key={j}>{renderInline(l.replace(NUMBERED, ''))}</li>)}
          </ol>
        );
      }
      return <p key={i}>{renderInline(lines.join(' '))}</p>;
    });
}

function buildAiContent(m: ChatMessage): React.ReactNode {
  if (m.privacyBlocked) {
    return (
      <div className="flex flex-col gap-tight">
        <p className="text-body-sm text-ink-900">{m.content}</p>
        <div className="flex items-center gap-tight pt-tight border-t border-ink-100 mt-1">
          <span className="inline-flex items-center gap-tight text-micro font-medium text-ink-500 bg-ink-50 border border-ink-200 px-1.5 py-0.5 rounded-xs">
            <Shield size={14} aria-hidden />
            Filtré — confidentialité
          </span>
        </div>
      </div>
    );
  }

  const sources = m.sourcesCited ?? [];

  return (
    <div className="flex flex-col gap-tight">
      <div className="flex flex-col gap-stack-xs text-body-sm text-ink-900">{renderMarkdown(m.content)}</div>
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

  /* `/assistant` est rendu pleine largeur par AppLayout (App.tsx), qui ne lui
     donne donc pas la gouttière commune : le titre passait sous la barre
     latérale et, à 375 px, le chat débordait (audit du 23/09). La page la
     reprend elle-même, avec la même largeur et le même rythme que les autres. */
  return (
    <Container width="wide">
    <PageShell width="wide">
      <EditorialHero
        eyebrow={{ label: 'Assistant IA', icon: <Sparkles size={14} /> }}
        title="Votre assistant personnel"
        summary="Posez vos questions sur vos formations, demandez de l'aide sur un concept ou explorez vos compétences."
        tone="flat"
        trailing={
          <Badge variant="info" size="normal">RAG · Mistral</Badge>
        }
      />

      <div className="flex flex-col gap-section">
        <div className="flex flex-col lg:flex-row gap-section items-start">

          {/* ── Chat area ──────────────────────────────────────────────── */}
          {/* `w-full` : sous lg, la rangée passe en colonne `items-start`, où la
              zone prenait sa largeur de contenu (champ + bouton) et sortait de
              l'écran à 375 px. En rangée, `flex-1` reprend la main. */}
          <div className="w-full flex-1 min-w-0 flex flex-col gap-stack">

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
            {/* Padding canon (24) : à 16, le champ (14) était à 17 du coin — évasé. */}
            <Card className="flex flex-col gap-stack-xs">
              <div className="flex gap-stack items-end">
                <textarea
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyDown={handleKeyDown}
                  rows={2}
                  placeholder="Posez votre question à l'assistant…"
                  disabled={isTyping}
                  className="flex-1 min-w-0 resize-none rounded-lg border border-ink-200 bg-white px-3 py-2.5 text-body-sm text-ink-900 placeholder:text-ink-500 focus:outline-none focus:border-primary-400 focus:ring-2 focus:ring-primary-100 transition-all duration-base h-auto min-h-[64px] disabled:opacity-disabled disabled:cursor-not-allowed"
                />
                <Button
                  emphasis="soft"
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
              <p className="text-micro text-ink-600 pl-1">
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
                    formation: <BookOpen size={14} />,
                    projects: <FileText size={14} />,
                    passeport: <Target size={14} />,
                  };
                  return (
                    <Button
                      key={s.id}
                      emphasis="outline"
                      size="sm"
                      leadingIcon={icons[s.intent] ?? <Sparkles size={14} />}
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
            <Card variant="tinted" tone="primary" className="mt-stack p-stack-md flex flex-col gap-tight">
              <p className="text-caption font-semibold text-primary-900">À propos de cet assistant</p>
              <p className="text-caption text-primary-700">
                Les réponses sont générées uniquement depuis le contenu indexé de la plateforme (formations, Passeport, Coaching, Missions). Aucune donnée externe.
              </p>
              <div className="flex flex-wrap gap-tight mt-1">
                <Badge variant="info" size="compact">Contenu Formation</Badge>
                <Badge variant="info" size="compact">Passeport</Badge>
                <Badge variant="info" size="compact">Missions</Badge>
              </div>
            </Card>
          </aside>
        </div>
      </div>
    </PageShell>
    </Container>
  );
}
