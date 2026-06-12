/**
 * ConversationalChat — chat-like message shell for AI-driven flows.
 *
 * Used by the Onboarding conversational questionnaire (CDC §03 §UJ #1a)
 * but kept generic enough to host any LLM-driven Q&A: bubbles, typing
 * indicator, auto-scroll, sticky input area.
 *
 * Message types :
 *  - `ai`        : AI bubble (left-aligned, brand-tinted, with TlsLogo avatar)
 *  - `user`      : User bubble (right-aligned, warm filled, no avatar)
 *  - `typing`    : 3-dot typing indicator (auto-removed when next message arrives)
 *  - `inline`    : Inline interactive element (e.g. Dreyfus selector) — full width
 *
 * Auto-scrolls to bottom on every new message.
 */

import React, { useEffect, useRef } from 'react';
import { TlsLogo } from '../ui/TlsLogo';

export type ChatMessage =
  | { id: string; type: 'ai'; content: React.ReactNode }
  | { id: string; type: 'user'; content: React.ReactNode }
  | { id: string; type: 'typing' }
  | { id: string; type: 'inline'; content: React.ReactNode };

export interface ConversationalChatProps {
  messages: ChatMessage[];
  /** Sticky footer slot — typically input + send button. */
  footer?: React.ReactNode;
  /** Optional title shown at top of chat surface. */
  title?: React.ReactNode;
  className?: string;
}

/** Markdown-lite : turns **text** into <strong> for AI message readability. */
function renderInlineMarkdown(text: string): React.ReactNode {
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  return parts.map((p, i) => {
    if (p.startsWith('**') && p.endsWith('**')) {
      return <strong key={i} className="font-semibold text-primary-700">{p.slice(2, -2)}</strong>;
    }
    return <React.Fragment key={i}>{p}</React.Fragment>;
  });
}

const TypingDots: React.FC = () => (
  <span className="inline-flex items-center gap-tight" aria-label="L'assistant écrit">
    <span className="w-1.5 h-1.5 rounded-full bg-primary-400 animate-[pulse_1.2s_ease-in-out_infinite]" style={{ animationDelay: '0ms' }} />
    <span className="w-1.5 h-1.5 rounded-full bg-primary-400 animate-[pulse_1.2s_ease-in-out_infinite]" style={{ animationDelay: '200ms' }} />
    <span className="w-1.5 h-1.5 rounded-full bg-primary-400 animate-[pulse_1.2s_ease-in-out_infinite]" style={{ animationDelay: '400ms' }} />
  </span>
);

const AiBubble: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div className="flex items-end gap-stack-xs max-w-[88%] sm:max-w-[78%] mr-auto animate-in fade-in slide-in-from-bottom-1 duration-300">
    <span className="shrink-0 inline-flex items-center justify-center w-8 h-8 rounded-pill bg-white border border-primary-200 shadow-sm">
      <TlsLogo size={28} withBubble={false} variant="primary" />
    </span>
    <div className="rounded-2xl rounded-bl-md bg-white/90 backdrop-blur-glass-light border border-primary-100 px-4 py-3 text-body-sm text-ink-900 leading-relaxed shadow-sm">
      {children}
    </div>
  </div>
);

const UserBubble: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div className="flex items-end justify-end gap-stack-xs max-w-[88%] sm:max-w-[78%] ml-auto animate-in fade-in slide-in-from-bottom-1 duration-300">
    <div className="rounded-2xl rounded-br-md bg-secondary-500 text-white px-4 py-3 text-body-sm leading-relaxed shadow-sm">
      {children}
    </div>
  </div>
);

const InlineBlock: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div className="w-full animate-in fade-in slide-in-from-bottom-1 duration-300">
    {children}
  </div>
);

export const ConversationalChat: React.FC<ConversationalChatProps> = ({
  messages,
  footer,
  title,
  className = '',
}) => {
  const scrollerRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom on each new message
  useEffect(() => {
    const el = scrollerRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [messages.length]);

  return (
    <section
      className={[
        'flex flex-col rounded-2xl bg-white/70 backdrop-blur-glass-medium border border-white/60 shadow-lg overflow-hidden',
        'min-h-[60vh] max-h-[75vh]',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
      aria-label="Conversation d'onboarding"
    >
      {title && (
        <header className="shrink-0 px-5 py-3 border-b border-white/50 bg-white/40 backdrop-blur-glass-light text-body-sm font-semibold text-ink-700">
          {title}
        </header>
      )}

      <div
        ref={scrollerRef}
        className="flex-1 overflow-y-auto px-4 sm:px-6 py-5 flex flex-col gap-stack-xs scroll-smooth"
        role="log"
        aria-live="polite"
        aria-atomic="false"
      >
        {messages.map((m) => {
          if (m.type === 'ai') {
            return (
              <AiBubble key={m.id}>
                {typeof m.content === 'string' ? renderInlineMarkdown(m.content) : m.content}
              </AiBubble>
            );
          }
          if (m.type === 'user') {
            return <UserBubble key={m.id}>{m.content}</UserBubble>;
          }
          if (m.type === 'typing') {
            return (
              <AiBubble key={m.id}>
                <TypingDots />
              </AiBubble>
            );
          }
          return <InlineBlock key={m.id}>{m.content}</InlineBlock>;
        })}
      </div>

      {footer && (
        <footer className="shrink-0 px-4 sm:px-5 py-3 border-t border-white/50 bg-white/60 backdrop-blur-glass-light">
          {footer}
        </footer>
      )}
    </section>
  );
};

export default ConversationalChat;
