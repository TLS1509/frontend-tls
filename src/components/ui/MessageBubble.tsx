import React from 'react';
import {
  ThumbsUp,
  ThumbsDown,
  ExternalLink,
  AlertTriangle,
  ShieldOff,
  CheckCheck,
} from 'lucide-react';
import { Avatar } from './Avatar';
import type { AvatarTint } from './Avatar';
import type { ChatFeedback, ChatSourceCitation } from '../../types/learning';

const CONFIDENCE_THRESHOLD = 0.6;

export type MessageBubbleContext = 'chatbot' | 'messaging';

export interface MessageBubbleProps {
  /** 'user' = right-aligned primary bubble; 'assistant' = left-aligned with avatar */
  variant: 'user' | 'assistant';
  content: string;
  timestamp: string;

  /**
   * Visual context — drives color scheme, radius, and shadows.
   * - 'chatbot' (default): soft primary-100 / ink-50 backgrounds, 2xl radius, no shadow
   * - 'messaging': filled primary-500 / white backgrounds, xl radius + shadow
   */
  context?: MessageBubbleContext;

  // ── Sender info (assistant variant) ─────────────────────────────────────────
  /** Avatar initials label. Default: 'IA' */
  senderInitials?: string;
  /** Avatar tint. Default: 'brand' */
  senderTint?: AvatarTint;
  /** Show avatar beside the bubble. Default: true for assistant */
  showAvatar?: boolean;
  /** Sender name label shown above the bubble (useful in messaging context) */
  senderName?: string;

  // ── AI chatbot extras (chatbot context + assistant variant only) ─────────────
  /** Message ID required for onFeedback callbacks */
  messageId?: string;
  /** Confidence score 0–1 — below 0.6 triggers a low-confidence warning banner */
  confidenceScore?: number;
  /** When true, replaces content with a privacy-blocked state */
  privacyBlocked?: boolean;
  /** Source citation pills rendered below the timestamp */
  sourcesCited?: ChatSourceCitation[];
  /** Previously submitted feedback on this message */
  feedback?: ChatFeedback;
  /** Thumbs-up / thumbs-down callback */
  onFeedback?: (messageId: string, rating: ChatFeedback['rating']) => void;

  // ── Extra slot ────────────────────────────────────────────────────────────────
  /** Content rendered inside the bubble after the text (e.g. attachments) */
  children?: React.ReactNode;

  /** Show a double-checkmark read receipt after the timestamp */
  showReadReceipt?: boolean;

  className?: string;
}

/** Render message text with lightweight markdown: newlines and **bold** */
function renderContent(text: string): React.ReactNode {
  const lines = text.split('\n');
  return lines.map((line, i) => {
    if (line === '') return <br key={i} />;
    const parts = line.split(/(\*\*[^*]+\*\*)/g);
    return (
      <p key={i} className="m-0 mb-0.5 last:mb-0 leading-relaxed">
        {parts.map((part, j) =>
          part.startsWith('**') && part.endsWith('**') ? (
            <strong key={j}>{part.slice(2, -2)}</strong>
          ) : (
            part
          ),
        )}
      </p>
    );
  });
}

export const MessageBubble: React.FC<MessageBubbleProps> = ({
  variant,
  content,
  timestamp,
  context = 'chatbot',
  senderInitials = 'IA',
  senderTint = 'brand',
  showAvatar = true,
  senderName,
  messageId,
  confidenceScore,
  privacyBlocked,
  sourcesCited,
  feedback,
  onFeedback,
  children,
  showReadReceipt = false,
  className = '',
}) => {
  const isChatbot = context === 'chatbot';
  const isLowConfidence =
    isChatbot &&
    confidenceScore !== undefined &&
    confidenceScore < CONFIDENCE_THRESHOLD;
  const isPrivacyBlocked = isChatbot && !!privacyBlocked;
  const hasFeedback =
    feedback?.rating !== undefined && feedback.rating !== 'skip';

  // ── User bubble (right-aligned) ───────────────────────────────────────────
  if (variant === 'user') {
    return (
      <div className={`flex flex-col items-end gap-stack-xs ${className}`}>
        <div
          className={[
            'px-4 py-3 text-body-sm',
            isChatbot
              ? 'max-w-[75%] bg-primary-100 text-primary-900 rounded-2xl rounded-br-sm'
              : 'max-w-[68%] bg-primary-500 text-white rounded-xl rounded-br-xs shadow-md',
          ].join(' ')}
        >
          {renderContent(content)}
          {children}
        </div>
        <div className="flex items-center gap-1 px-1">
          <span className="text-micro text-ink-400">{timestamp}</span>
          {showReadReceipt && (
            <CheckCheck size={11} className="text-primary-400" />
          )}
        </div>
      </div>
    );
  }

  // ── Assistant bubble (left-aligned) ──────────────────────────────────────
  return (
    <div className={`flex gap-stack-xs items-start ${className}`}>
      {showAvatar && (
        <Avatar
          initials={senderInitials}
          tint={senderTint}
          size="sm"
          className="shrink-0 mt-1"
        />
      )}

      <div className="flex flex-col gap-stack-xs flex-1 min-w-0">
        {senderName && (
          <span className="text-micro text-ink-500 font-semibold pl-1">
            {senderName}
          </span>
        )}

        {/* Bubble */}
        <div
          className={[
            'px-4 py-3 text-body-sm',
            isChatbot
              ? 'max-w-[82%] rounded-2xl rounded-bl-sm'
              : 'max-w-[68%] rounded-xl rounded-bl-xs shadow-xs',
            isPrivacyBlocked
              ? 'bg-danger-bg border border-danger-border text-danger-fg'
              : isLowConfidence
              ? 'bg-warning-bg border border-warning-border text-ink-800'
              : isChatbot
              ? 'bg-ink-50 border border-ink-200 text-ink-800'
              : 'bg-white border border-ink-200 text-ink-900',
          ].join(' ')}
        >
          {/* AI: Privacy blocked banner */}
          {isPrivacyBlocked && (
            <div className="flex items-center gap-2 mb-2 text-danger-fg">
              <ShieldOff size={14} />
              <span className="text-caption font-semibold">Contenu bloqué</span>
            </div>
          )}

          {/* AI: Low confidence banner */}
          {isLowConfidence && !isPrivacyBlocked && (
            <div className="flex items-center gap-2 mb-2 text-warning-fg">
              <AlertTriangle size={14} />
              <span className="text-caption font-semibold">
                Confiance limitée
              </span>
            </div>
          )}

          {renderContent(content)}
          {children}
        </div>

        {/* Timestamp + source citation pills */}
        <div className="flex items-start gap-2 pl-1 flex-wrap">
          <span className="text-micro text-ink-400 shrink-0">{timestamp}</span>

          {isChatbot && sourcesCited && sourcesCited.length > 0 && (
            <div className="flex flex-wrap gap-1">
              {sourcesCited.map((src) => (
                <span
                  key={src.sourceId}
                  className="inline-flex items-center gap-1 text-micro bg-primary-50 text-primary-700 border border-primary-200 rounded-pill px-2 py-0.5"
                >
                  {src.url ? (
                    <a
                      href={src.url}
                      className="hover:underline flex items-center gap-1"
                    >
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

        {/* Feedback buttons — chatbot only, non-blocked messages */}
        {isChatbot && !isPrivacyBlocked && (
          <div className="flex items-center gap-2 pl-1">
            {hasFeedback ? (
              <span className="text-micro text-ink-400">
                {feedback?.rating === 'yes' ? '✓ Utile' : '✗ Pas utile'} —
                merci pour ton retour
              </span>
            ) : (
              <>
                <span className="text-micro text-ink-400">Utile ?</span>
                <button
                  onClick={() => messageId && onFeedback?.(messageId, 'yes')}
                  className="inline-flex items-center gap-1 text-micro text-success-fg hover:text-success-base transition-colors duration-fast px-1.5 py-0.5 rounded-sm hover:bg-success-bg"
                  aria-label="Marquer comme utile"
                >
                  <ThumbsUp size={12} /> Oui
                </button>
                <button
                  onClick={() => messageId && onFeedback?.(messageId, 'no')}
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
};
