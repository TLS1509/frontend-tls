/**
 * OnboardingQuestionnaireConversational — chat-driven positioning interview.
 *
 * CDC #03 §User Journey #1a (Individual variant).
 * Supports 3 testable visual variants via the `variant` prop:
 *   A — Chat + behavioral tiles (CDC-faithful, conversational)
 *   B — Focus card + tiles (clean, card-centric)
 *   C — Immersive full-screen (Typeform-style, one question at a time)
 *
 * All variants use the same state machine and auto-advance on tile selection.
 * No visible Dreyfus labels — only behavioral statements map internally to D1-D4.
 */

import React, { useEffect, useRef, useState } from 'react';
import { ArrowRight, Send } from 'lucide-react';
import { Button } from '../components/core/Button';
import { BehavioralTileGrid } from '../components/ui/BehavioralTileGrid';
import { ConversationalChat } from '../components/patterns/ConversationalChat';
import type { ChatMessage } from '../components/patterns/ConversationalChat';
import { ProgressBar } from '../components/ui/ProgressBar';
import { TlsLogo } from '../components/ui/TlsLogo';
import { getCompetenceById } from '../data/competencies';
import { getBehavioralTiles } from '../lib/behavioral-tiles';
import {
  buildGreeting,
  buildQuestionIntro,
  buildAcknowledgment,
  buildClosing,
} from '../lib/mistral-questionnaire-stub';
import type { OnboardingQuestion } from '../lib/onboarding-questionnaire';
import type { DreyfusLevel } from '../types/learning';

/** Typing indicator duration (ms) — proportional to message length, clamped. */
const TYPING_MS_MIN = 600;
const TYPING_MS_MAX = 1400;
/** Delay between each streamed word (ms). 50ms ≈ 20 words/sec — realistic chatbot feel. */
const WORD_DELAY_MS = 50;

export type QuestionnaireVariant = 'a' | 'b' | 'c';

export interface OnboardingQuestionnaireConversationalProps {
  questions: OnboardingQuestion[];
  firstName: string;
  requiresPayment: boolean;
  /** Visual variant. Parent mounts with key={variant} to force reset on change. */
  variant?: QuestionnaireVariant;
  onComplete: (answers: Record<number, DreyfusLevel>, elaborations: Record<number, string>) => void;
}

export const OnboardingQuestionnaireConversational: React.FC<OnboardingQuestionnaireConversationalProps> = ({
  questions,
  firstName,
  requiresPayment,
  variant = 'a',
  onComplete,
}) => {
  const total = questions.length;

  // ── Shared state ──────────────────────────────────────────────────────────
  const [currentIdx, setCurrentIdx] = useState(0);
  const [answers, setAnswers] = useState<Record<number, DreyfusLevel>>({});
  const [justSelected, setJustSelected] = useState<DreyfusLevel | undefined>(); // tile visual feedback
  const [transitioning, setTransitioning] = useState(false);
  const [isClosed, setIsClosed] = useState(false);
  const [textValue, setTextValue] = useState('');

  // ── Variant A: AI message queue + inline tile visibility ─────────────────
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  // showInlineTiles: true = tiles are rendered inline in the chat log
  // (like Claude's AskUser proposition bubbles — not in a separate footer)
  const [showInlineTiles, setShowInlineTiles] = useState(false);
  const seqRef = useRef(0);
  const timersRef = useRef<number[]>([]);
  const newId = () => `m-${seqRef.current++}`;

  const cancelTimers = () => {
    timersRef.current.forEach((id) => window.clearTimeout(id));
    timersRef.current = [];
  };

  /**
   * Streams a single AI line: typing indicator → empty bubble → word-by-word fill.
   * Mimics a real LLM token stream — swap words.forEach for Mistral SSE in Phase 16.12bis.
   */
  function streamLine(text: string, onDone: () => void) {
    const typingId = newId();
    const msgId = newId();
    setMessages((prev) => [...prev, { id: typingId, type: 'typing' }]);
    const typingMs = Math.min(TYPING_MS_MAX, Math.max(TYPING_MS_MIN, text.length * 4));
    const t1 = window.setTimeout(() => {
      const words = text.trim().split(/\s+/);
      setMessages((prev) => [
        ...prev.filter((m) => m.id !== typingId),
        { id: msgId, type: 'ai', content: '' },
      ]);
      let built = '';
      words.forEach((word, idx) => {
        const t2 = window.setTimeout(() => {
          built = built ? `${built} ${word}` : word;
          const snap = built;
          setMessages((prev) =>
            prev.map((m) => (m.id === msgId ? { ...m, content: snap } : m))
          );
          if (idx === words.length - 1) {
            const t3 = window.setTimeout(onDone, 80);
            timersRef.current.push(t3);
          }
        }, idx * WORD_DELAY_MS);
        timersRef.current.push(t2);
      });
    }, typingMs);
    timersRef.current.push(t1);
  }

  /** Chains multiple AI lines sequentially — each starts only after the previous finishes. */
  function appendAiSequence(lines: string[], cb?: () => void) {
    const valid = lines.filter((l) => typeof l === 'string' && l.trim().length > 0);
    let i = 0;
    function next() {
      if (i >= valid.length) { cb?.(); return; }
      streamLine(valid[i++], next);
    }
    next();
  }

  function askQuestion(idx: number) {
    const q = questions[idx];
    if (!q) return;
    const label = getCompetenceById(q.competenceId)?.label ?? q.competenceId;
    const intro = buildQuestionIntro(q, label);
    // After the question bubble appears, show the inline tile options
    appendAiSequence([intro, q.q], () => setShowInlineTiles(true));
  }

  useEffect(() => {
    if (variant !== 'a') return;
    setMessages([]);
    setShowInlineTiles(false);
    const greeting = buildGreeting(firstName, total);
    appendAiSequence(greeting, () => askQuestion(0));
    return cancelTimers;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // ── Stub: infer Dreyfus level from free text ─────────────────────────────
  // Will be replaced by Mistral confidence scoring in Phase 16.12bis.
  function inferLevelFromText(text: string): DreyfusLevel {
    const t = text
      .toLowerCase()
      .normalize('NFD')
      .replace(/[̀-ͯ]/g, '');
    if (/(decouvre|novice|debutant|commence|jamais|peu a l|pas encore|n.ai pas|n.y connais)/.test(t)) return 1;
    if (/(quelques|bases|apprends|progressivement|parfois|de temps en|encore)/.test(t)) return 2;
    if (/(aisance|regulierement|autonomie|maitrise|confortable|souvent|couramment|facilement)/.test(t)) return 3;
    if (/(accompagne|forme|expert|transmets|leader|referent|enseigne|suis capable de former)/.test(t)) return 4;
    return 2; // stub default when no signal detected
  }

  // ── Text send handler ─────────────────────────────────────────────────────
  function handleTextSend() {
    const text = textValue.trim();
    if (!text || transitioning || isClosed) return;

    const q = questions[currentIdx];
    const level = inferLevelFromText(text);
    const nextIdx = currentIdx + 1;
    const isLast = nextIdx >= total;

    setShowInlineTiles(false);
    setTextValue('');
    setTransitioning(true);
    setAnswers((prev) => ({ ...prev, [q.id]: level }));

    // User bubble shows the typed text as-is
    setMessages((prev) => [...prev, { id: newId(), type: 'user', content: text }]);

    const ack = buildAcknowledgment(level, true);
    if (isLast) {
      appendAiSequence([ack, ...buildClosing(firstName, requiresPayment)], () => {
        setIsClosed(true);
        setTransitioning(false);
      });
    } else {
      appendAiSequence([ack], () => {
        setCurrentIdx(nextIdx);
        askQuestion(nextIdx);
        setTransitioning(false);
      });
    }
  }

  // ── Auto-advance handler (all variants) ───────────────────────────────────
  function handleTileSelect(level: DreyfusLevel) {
    if (transitioning) return;
    setShowInlineTiles(false); // collapse inline tiles immediately on tap
    setJustSelected(level);
    setTransitioning(true);

    const q = questions[currentIdx];
    const nextIdx = currentIdx + 1;
    const isLast = nextIdx >= total;

    const t = window.setTimeout(() => {
      setAnswers((prev) => ({ ...prev, [q.id]: level }));
      setJustSelected(undefined);

      if (variant === 'a') {
        // Add user bubble showing the chosen tile label
        const tileLabel = getBehavioralTiles(q.competenceId)[level - 1];
        setMessages((prev) => [
          ...prev,
          { id: newId(), type: 'user', content: tileLabel },
        ]);

        const ack = buildAcknowledgment(level, false);
        if (isLast) {
          appendAiSequence([ack, ...buildClosing(firstName, requiresPayment)], () => {
            setIsClosed(true);
            setTransitioning(false);
          });
        } else {
          appendAiSequence([ack], () => {
            setCurrentIdx(nextIdx);
            askQuestion(nextIdx);
            setTransitioning(false);
          });
        }
      } else {
        // Variants B & C: just advance
        if (isLast) {
          setIsClosed(true);
        } else {
          setCurrentIdx(nextIdx);
        }
        setTransitioning(false);
      }
    }, 360);

    timersRef.current.push(t);
  }

  const progressPct = isClosed ? 100 : Math.round((currentIdx / Math.max(total, 1)) * 100);
  const currentQ = questions[currentIdx];
  const currentTiles = currentQ ? getBehavioralTiles(currentQ.competenceId) : ['', '', '', ''] as [string, string, string, string];
  const competencyLabel = currentQ
    ? (getCompetenceById(currentQ.competenceId)?.label ?? currentQ.competenceId)
    : '';

  const finishButton = (
    <Button
      variant="warm"
      size="lg"
      trailingIcon={<ArrowRight size={16} />}
      onClick={() => onComplete(answers, {})}
      className="w-full sm:w-auto"
    >
      {requiresPayment ? 'Choisir ma formule' : 'Découvrir la plateforme'}
    </Button>
  );

  // ── VARIANT A : Conversational chat + inline tiles (Mistral-ready) ─────────
  //
  // Tiles appear as an inline block in the chat stream after the AI question,
  // exactly like Claude's "AskUser" proposition bubbles. When the user taps
  // one, it collapses immediately and the selected label appears as a user
  // bubble — no separate footer input zone needed.
  if (variant === 'a') {
    const title = (
      <div className="flex flex-col gap-0.5">
        <div className="flex items-baseline justify-between gap-stack-xs">
          <span className="text-body-sm font-semibold text-ink-700">Positionnement</span>
          <span className="text-caption text-ink-500 tabular-nums">
            {isClosed ? total : Math.min(currentIdx + 1, total)} / {total}
          </span>
        </div>
        <ProgressBar value={progressPct} max={100} fill="warm" size="sm" valueLabel={false} />
      </div>
    );

    // Inline tile quick-replies — appear after the AI question, aligned with bubble content
    const inlineTilesMsg: ChatMessage | null =
      showInlineTiles && !isClosed && currentQ
        ? {
            id: 'inline-tiles',
            type: 'inline',
            content: (
              <div className="ml-10 mt-1 mb-1">
                <p className="text-micro text-ink-400 mb-1.5 select-none">
                  Choisis une proposition ou réponds librement ci-dessous ↓
                </p>
                <BehavioralTileGrid
                  tiles={currentTiles}
                  value={justSelected}
                  onChange={handleTileSelect}
                  disabled={transitioning}
                  size="compact"
                  layout="grid"
                />
              </div>
            ),
          }
        : null;

    const displayMessages: ChatMessage[] = inlineTilesMsg
      ? [...messages, inlineTilesMsg]
      : messages;

    // Footer: text input always visible while conversation is active; finish button when done
    const footer = isClosed ? (
      <div className="flex justify-end">{finishButton}</div>
    ) : (
      <div className="flex items-end gap-stack-xs">
        <textarea
          value={textValue}
          onChange={(e) => setTextValue(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
              e.preventDefault();
              handleTextSend();
            }
          }}
          placeholder="Réponds librement… (Entrée pour envoyer)"
          rows={1}
          disabled={transitioning}
          className="flex-1 resize-none rounded-xl border border-ink-200 bg-white px-3 py-2.5 text-body-sm text-ink-900 leading-relaxed placeholder:text-ink-400 focus:outline-none focus:ring-2 focus:ring-secondary-300 focus:border-secondary-400 transition-all duration-base disabled:opacity-disabled max-h-24 overflow-y-auto"
        />
        <Button
          variant="warm"
          size="md"
          iconOnly
          trailingIcon={<Send size={16} />}
          aria-label="Envoyer"
          disabled={!textValue.trim() || transitioning}
          onClick={handleTextSend}
          className="shrink-0 self-end mb-0.5"
        />
      </div>
    );

    return (
      <ConversationalChat
        title={title}
        messages={displayMessages}
        footer={footer}
        className="min-h-[62vh] max-h-[72vh]"
      />
    );
  }

  // ── VARIANT B : Focus card + tiles ────────────────────────────────────────
  if (variant === 'b') {
    return (
      <div className="flex flex-col gap-stack">
        {/* Progress strip */}
        <div className="flex items-center gap-stack-xs">
          <ProgressBar value={progressPct} max={100} fill="warm" size="sm" valueLabel={false} className="flex-1" />
          <span className="text-caption text-ink-500 tabular-nums shrink-0">
            {isClosed ? total : currentIdx + 1} / {total}
          </span>
        </div>

        {/* Question card — key forces fade-in animation on question change */}
        <div
          key={`q-${currentIdx}-${isClosed}`}
          className="rounded-2xl bg-white/80 backdrop-blur-glass-medium border border-white/60 shadow-card px-6 py-stack-lg animate-in fade-in slide-in-from-bottom-2 duration-300 flex flex-col gap-stack-xs"
        >
          {/* AI identity */}
          <div className="flex items-center gap-stack-xs">
            <span className="inline-flex items-center justify-center w-7 h-7 rounded-pill bg-white border border-primary-100 shadow-xs">
              <TlsLogo size={24} withBubble={false} variant="primary" />
            </span>
            <span className="text-caption font-semibold text-primary-600">Assistant TLS</span>
          </div>

          {isClosed ? (
            <>
              <p className="font-body text-body-sm text-ink-700 leading-relaxed">
                C'est terminé {firstName || ''} ! Ton Passeport de compétences est initialisé.
              </p>
              <p className="font-body text-body-sm text-ink-500">
                {requiresPayment
                  ? 'Prochaine étape : choisir ta formule pour démarrer.'
                  : 'Prochaine étape : un tour rapide de la plateforme.'}
              </p>
            </>
          ) : (
            <>
              {competencyLabel && (
                <p className="font-body text-caption font-semibold uppercase tracking-wider text-secondary-500">
                  {competencyLabel}
                </p>
              )}
              <p className="font-body text-body font-medium text-ink-900 leading-relaxed">
                {currentQ?.q}
              </p>
            </>
          )}
        </div>

        {/* Tiles or finish CTA */}
        {isClosed ? (
          <div className="flex justify-center pt-2">{finishButton}</div>
        ) : (
          <BehavioralTileGrid
            key={`tiles-${currentIdx}`}
            tiles={currentTiles}
            value={justSelected}
            onChange={handleTileSelect}
            disabled={transitioning}
            size="default"
            layout="grid"
            className="animate-in fade-in duration-300"
          />
        )}
      </div>
    );
  }

  // ── VARIANT C : Immersive full-screen ─────────────────────────────────────
  const progressDots = (
    <div className="flex items-center justify-center gap-1.5" role="progressbar" aria-valuenow={currentIdx + 1} aria-valuemax={total}>
      {Array.from({ length: total }).map((_, i) => (
        <span
          key={i}
          className={[
            'rounded-pill transition-all duration-300',
            i < currentIdx
              ? 'w-4 h-1.5 bg-secondary-400'
              : i === currentIdx
              ? 'w-5 h-2 bg-secondary-500'
              : 'w-1.5 h-1.5 bg-ink-200',
          ].join(' ')}
        />
      ))}
    </div>
  );

  return (
    <div className="flex flex-col items-center gap-section min-h-[60vh] justify-center">
      {/* Question area */}
      <div
        key={`qc-${currentIdx}-${isClosed}`}
        className="flex flex-col items-center text-center gap-stack max-w-xl w-full animate-in fade-in slide-in-from-bottom-3 duration-350"
      >
        {isClosed ? (
          <>
            <p className="font-display text-h2 font-extrabold tracking-display text-ink-900 leading-tight">
              C'est tout !
            </p>
            <p className="font-body text-body text-ink-500 leading-relaxed">
              Ton Passeport de compétences est initialisé.
              {requiresPayment
                ? ' Prochaine étape : choisir ta formule.'
                : ' Prochaine étape : découvrir la plateforme.'}
            </p>
          </>
        ) : (
          <>
            <span className="font-body text-caption font-semibold uppercase tracking-wider text-secondary-500">
              {competencyLabel && `${competencyLabel} · `}Question {currentIdx + 1} sur {total}
            </span>
            <p className="font-display text-h3 font-bold tracking-headline text-ink-900 leading-tight">
              {currentQ?.q}
            </p>
          </>
        )}
      </div>

      {/* Tiles or CTA */}
      {isClosed ? (
        <div className="flex justify-center">{finishButton}</div>
      ) : (
        <BehavioralTileGrid
          key={`tc-${currentIdx}`}
          tiles={currentTiles}
          value={justSelected}
          onChange={handleTileSelect}
          disabled={transitioning}
          size="large"
          layout="grid"
          className="w-full max-w-lg animate-in fade-in slide-in-from-bottom-2 duration-300"
        />
      )}

      {/* Progress dots */}
      {!isClosed && progressDots}
    </div>
  );
};

export default OnboardingQuestionnaireConversational;
