import React, { useState } from 'react';
import { Send, Sparkles, BookOpen, Target, FileText, Shield, ExternalLink } from 'lucide-react';
import { EditorialHero } from '../components/patterns/EditorialHero';
import { ConversationalChat } from '../components/patterns/ConversationalChat';
import { Card } from '../components/core/Card';
import { Button } from '../components/core/Button';
import { MetaPill } from '../components/ui/MetaPill';
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

/* Le score de confiance et les sources sont des DONNÉES sur la réponse :
   MetaPill (arbitrage n°14), au registre des puces (11/500). Elles étaient
   faites main, en rectangles au rayon 4. La confiance garde son ton selon
   la valeur. */
function ConfidenceChip({ score }: { score: number }) {
  const pct = Math.round(score * 100);
  const tone = pct >= 80 ? 'success' : pct >= 60 ? 'info' : 'sun';
  return <MetaPill text={`${pct}\u00A0% de confiance`} tone={tone} />;
}

function SourceChip({ source }: { source: ChatSourceCitation }) {
  const inner = (
    <MetaPill
      tone="brand"
      text={source.title}
      icon={source.url ? <ExternalLink aria-hidden /> : undefined}
    />
  );
  return source.url
    ? <a href={source.url} className="inline-flex rounded-pill focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-primary-500">{inner}</a>
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
        <p className="text-body text-ink-900">{m.content}</p>
        <div className="flex items-center gap-tight pt-tight border-t border-ink-100 mt-1">
          <MetaPill tone="neutral" icon={<Shield aria-hidden />} text="Filtré (confidentialité)" />
        </div>
      </div>
    );
  }

  const sources = m.sourcesCited ?? [];

  return (
    <div className="flex flex-col gap-tight">
      <div className="flex flex-col gap-stack-xs text-body text-ink-900">{renderMarkdown(m.content)}</div>
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
          /* Une donnée technique, pas un état : MetaPill (arbitrage n°14). */
          <MetaPill text="RAG · Mistral" tone="info" />
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
              {/* Sous 640 px, le bouton passe sous le champ : côte à côte, le
                  champ n'avait plus que 150 px et son texte se coupait. */}
              <div className="flex flex-col sm:flex-row gap-stack-sm sm:gap-stack sm:items-end">
                <textarea
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyDown={handleKeyDown}
                  rows={2}
                  placeholder="Posez votre question à l'assistant…"
                  disabled={isTyping}
                  className="flex-1 min-w-0 resize-none rounded-lg border border-ink-200 bg-white px-3 py-2.5 text-body text-ink-900 placeholder:text-ink-500 focus:outline-none focus:border-primary-400 focus:ring-2 focus:ring-primary-100 transition-all duration-base h-auto min-h-[64px] disabled:opacity-disabled disabled:cursor-not-allowed"
                />
                {/* L'envoi est l'action principale de l'écran : le seul
                    `solid` (arbitrage n°19). Les suggestions ne font que
                    remplir le champ. */}
                <Button
                  emphasis="solid"
                  size="md"
                  leadingIcon={<Send size={16} />}
                  onClick={handleSend}
                  loading={isTyping}
                  disabled={!inputValue.trim() || isTyping}
                  aria-label="Envoyer le message"
                  className="shrink-0 self-end"
                >
                  Envoyer
                </Button>
              </div>
              {/* Aide sous le champ : légende 13 ink-600, calée sur le bord du
                  champ (elle était en étiquette 11 px, décalée de 4 px). */}
              <p className="font-body text-caption text-ink-600">
                Ctrl+Entrée pour envoyer · Les réponses sont basées sur le contenu indexé de la plateforme.
              </p>
            </Card>
          </div>

          {/* ── Suggestions sidebar ──────────────────────────────────────
              « Suggestions » est une section de la page : h2 28 et sa phrase,
              puis des rangées qui peuvent passer sur deux lignes (dans des
              boutons `sm` de 36 px, les questions longues débordaient). Elle
              était une carte titrée en h3 : la page sautait du h1 au h3. */}
          <aside className="w-full lg:w-72 shrink-0 flex flex-col gap-section">
            <section className="flex flex-col gap-stack" aria-labelledby="assistant-suggestions">
              <div className="flex flex-col gap-stack-3xs">
                <h2 id="assistant-suggestions" className="font-display text-h2 text-ink-900">Suggestions</h2>
                <p className="font-body text-body text-ink-700">
                  Démarrez une conversation avec ces questions préparées.
                </p>
              </div>
              <ul className="flex flex-col gap-stack-xs">
                {CHAT_SUGGESTIONS.map((s) => {
                  const icons: Record<string, React.ReactNode> = {
                    formation: <BookOpen size={16} />,
                    projects: <FileText size={16} />,
                    passeport: <Target size={16} />,
                  };
                  return (
                    <li key={s.id}>
                      <button
                        type="button"
                        onClick={() => setInputValue(s.label)}
                        className="w-full min-h-touch flex items-start gap-stack-xs px-3 py-2.5 rounded-lg border border-ink-200 bg-white text-left font-body text-body text-ink-900 cursor-pointer transition-colors duration-base hover:bg-ink-50 hover:border-ink-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500"
                      >
                        {/* Calée sur la 1re ligne : (26 − 16) / 2. */}
                        <span className="shrink-0 mt-[5px] text-primary-700" aria-hidden="true">
                          {icons[s.intent] ?? <Sparkles size={16} />}
                        </span>
                        {/* Espace insécable avant « ? » : le point d'interrogation
                            tombait seul à la ligne. */}
                        {s.label.replace(/ \?/g, '\u00A0?')}
                      </button>
                    </li>
                  );
                })}
              </ul>
            </section>

            {/* Info card — un libellé (13/600), le texte au cran 700 (il était
                au 700 du teal : une couleur de marque ne porte du texte qu'au
                800), les périmètres en MetaPill (des données, plus des Badge). */}
            <Card variant="tinted" tone="primary" className="p-stack-md flex flex-col gap-stack-xs">
              <p className="font-body text-caption font-semibold text-primary-900">À propos de cet assistant</p>
              <p className="font-body text-caption text-ink-700">
                Les réponses sont générées uniquement depuis le contenu indexé de la plateforme (formations, Passeport, Coaching, Missions). Aucune donnée externe.
              </p>
              <div className="flex flex-wrap gap-stack-3xs mt-stack-3xs">
                <MetaPill text="Contenu formation" tone="brand" />
                <MetaPill text="Passeport" tone="brand" />
                <MetaPill text="Missions" tone="brand" />
              </div>
            </Card>
          </aside>
        </div>
      </div>
    </PageShell>
    </Container>
  );
}
