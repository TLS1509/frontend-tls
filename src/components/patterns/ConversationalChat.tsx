import React, { useEffect, useRef } from 'react';
import { Avatar } from '../ui/Avatar';
import { Card } from '../core/Card';
import { MessageBubble } from '../ui/MessageBubble';
import type { ChatMessage, ChatFeedback } from '../../types/learning';

// ── Typing indicator ──────────────────────────────────────────────────────────

function TypingIndicator() {
  return (
    <div className="flex gap-stack-xs items-start">
      <Avatar initials="IA" tint="brand" size="sm" className="shrink-0 mt-1" />
      <div className="bg-ink-50 border border-ink-200 rounded-2xl rounded-bl-sm px-4 py-3">
        <div className="flex items-center gap-1">
          {/* animationDelay is intentional: no Tailwind utility for animation-delay on keyframes */}
          <span className="w-2 h-2 rounded-full bg-ink-300 animate-bounce" style={{ animationDelay: '0ms' }} />
          <span className="w-2 h-2 rounded-full bg-ink-300 animate-bounce" style={{ animationDelay: '150ms' }} />
          <span className="w-2 h-2 rounded-full bg-ink-300 animate-bounce" style={{ animationDelay: '300ms' }} />
        </div>
      </div>
    </div>
  );
}

// ── ConversationalChat ────────────────────────────────────────────────────────

export interface ConversationalChatProps {
  messages: ChatMessage[];
  /** Show the animated typing indicator below the last message */
  isTyping?: boolean;
  /** Feedback callback forwarded to each AssistantBubble */
  onFeedback?: (messageId: string, rating: ChatFeedback['rating']) => void;
  /** Content shown when the message list is empty */
  emptyState?: React.ReactNode;
  /**
   * Extra className applied to the Card wrapper.
   * Use to control height constraints, e.g. `"min-h-[460px] max-h-[600px]"`.
   */
  className?: string;
}

/**
 * Full chat thread — scrollable list of MessageBubbles + optional typing
 * indicator + auto-scroll-to-bottom.
 *
 * Used by: ChatInterface
 */
export const ConversationalChat: React.FC<ConversationalChatProps> = ({
  messages,
  isTyping = false,
  onFeedback,
  emptyState,
  className = '',
}) => {
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  return (
    <Card
      className={`flex flex-col gap-stack p-4 md:p-6 overflow-y-auto ${className}`}
    >
      {messages.length === 0 && emptyState}

      {messages.map((msg) => (
        <MessageBubble
          key={msg.id}
          variant={msg.role === 'user' ? 'user' : 'assistant'}
          content={msg.content}
          timestamp={msg.timestamp}
          context="chatbot"
          messageId={msg.id}
          confidenceScore={msg.confidenceScore}
          privacyBlocked={msg.privacyBlocked}
          sourcesCited={msg.sourcesCited}
          feedback={msg.feedback}
          onFeedback={onFeedback}
        />
      ))}

      {isTyping && <TypingIndicator />}
      <div ref={endRef} />
    </Card>
  );
};
