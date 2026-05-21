/**
 * OnboardingQuestionnaireConversational — chat-driven positioning interview.
 *
 * CDC #03 §User Journey #1a (Individual variant) :
 * "Conversational Mistral UI (competencies adaptative per self-selected
 *  objectives, dynamic scope 3-30Q), Dreyfus 1-5 scale, open-ended responses,
 *  progress bar, submit → auto-seed Passeport"
 *
 * This component is rendered by OnboardingQuestionnaire.tsx when
 * `accountType === 'individual'`. Company learners get the form-based variant.
 *
 * Stub : Mistral API is not wired (Phase 16.12bis). All AI responses come from
 * deterministic templates in `src/lib/mistral-questionnaire-stub.ts`.
 */

import React, { useEffect, useRef, useState } from 'react';
import { Send } from 'lucide-react';
import { Button } from '../components/core/Button';
import { ConversationalChat } from '../components/patterns/ConversationalChat';
import type { ChatMessage } from '../components/patterns/ConversationalChat';
import { DreyfusSlider } from '../components/ui/DreyfusSlider';
import { ProgressBar } from '../components/ui/ProgressBar';
import { getCompetenceById } from '../data/competencies';
import {
  buildGreeting,
  buildQuestionIntro,
  buildAcknowledgment,
  buildClosing,
} from '../lib/mistral-questionnaire-stub';
import type { OnboardingQuestion } from '../lib/onboarding-questionnaire';
import type { DreyfusLevel } from '../types/learning';

const AI_MESSAGE_DELAY_MS = 450; // pause between AI bubbles — no typing indicator

export interface OnboardingQuestionnaireConversationalProps {
  questions: OnboardingQuestion[];
  firstName: string;
  requiresPayment: boolean;
  onComplete: (answers: Record<number, DreyfusLevel>, elaborations: Record<number, string>) => void;
}

export const OnboardingQuestionnaireConversational: React.FC<OnboardingQuestionnaireConversationalProps> = ({
  questions,
  firstName,
  requiresPayment,
  onComplete,
}) => {
  const total = questions.length;

  // ── State ──
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [currentIdx, setCurrentIdx] = useState(0); // index of current question
  const [answers, setAnswers] = useState<Record<number, DreyfusLevel>>({});
  const [elaborations, setElaborations] = useState<Record<number, string>>({});
  const [selectedLevel, setSelectedLevel] = useState<DreyfusLevel | undefined>(undefined);
  const [textValue, setTextValue] = useState('');
  const [isClosed, setIsClosed] = useState(false);
  const seqRef = useRef(0);

  const newId = () => `m-${seqRef.current++}`;

  // Track active timers so we can cancel them on unmount (avoids StrictMode races
  // where a stale timer would push an empty/duplicate bubble onto fresh state).
  const timersRef = useRef<number[]>([]);
  const cancelTimers = () => {
    timersRef.current.forEach((id) => window.clearTimeout(id));
    timersRef.current = [];
  };

  // ── Helpers : queue AI messages with a small delay between them ──
  // No typing indicator — empty/falsy lines are skipped defensively.
  function appendAiSequence(lines: string[], cb?: () => void) {
    const valid = lines.filter((l) => typeof l === 'string' && l.trim().length > 0);
    valid.forEach((line, idx) => {
      const t = window.setTimeout(() => {
        setMessages((prev) => [...prev, { id: newId(), type: 'ai', content: line }]);
      }, 200 + idx * AI_MESSAGE_DELAY_MS);
      timersRef.current.push(t);
    });
    if (cb) {
      const t = window.setTimeout(cb, 200 + valid.length * AI_MESSAGE_DELAY_MS);
      timersRef.current.push(t);
    }
  }

  // ── Greeting + first question on mount ──
  // No init-ref guard: rely on cleanup to cancel timers in StrictMode dev double-mount.
  // Each mount schedules its own timers; previous mount's are cancelled by cleanup.
  useEffect(() => {
    setMessages([]); // ensure clean slate (StrictMode-safe)
    const greeting = buildGreeting(firstName, total);
    appendAiSequence(greeting, () => askQuestion(0));
    return cancelTimers;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function askQuestion(idx: number) {
    const q = questions[idx];
    if (!q) return;
    const label = getCompetenceById(q.competenceId)?.label ?? q.competenceId;
    const intro = buildQuestionIntro(q, label);
    appendAiSequence([intro, q.q]);
  }

  // ── User submit ──
  function handleSend() {
    if (selectedLevel === undefined) return;
    const q = questions[currentIdx];
    const elaboration = textValue.trim();

    // Persist answer
    setAnswers((prev) => ({ ...prev, [q.id]: selectedLevel }));
    if (elaboration) {
      setElaborations((prev) => ({ ...prev, [q.id]: elaboration }));
    }

    // Show user bubble (Dreyfus + optional text)
    const userMsg: React.ReactNode = (
      <div className="flex flex-col gap-1">
        <span className="font-semibold">Niveau D{selectedLevel}</span>
        {elaboration && <span className="opacity-90">{elaboration}</span>}
      </div>
    );
    setMessages((prev) => [...prev, { id: newId(), type: 'user', content: userMsg }]);

    // Reset inputs
    setSelectedLevel(undefined);
    setTextValue('');

    // Ack + next question or closing
    const ack = buildAcknowledgment(selectedLevel, elaboration.length > 0);
    const nextIdx = currentIdx + 1;

    if (nextIdx >= total) {
      // Final wrap
      appendAiSequence([ack, ...buildClosing(firstName, requiresPayment)], () => {
        setIsClosed(true);
      });
    } else {
      appendAiSequence([ack], () => {
        setCurrentIdx(nextIdx);
        askQuestion(nextIdx);
      });
    }
  }

  const progressPct = isClosed
    ? 100
    : Math.round((currentIdx / Math.max(total, 1)) * 100);

  // ── Footer : inline Dreyfus + textarea + send (or final CTA) ──
  const footer = isClosed ? (
    <div className="flex flex-col sm:flex-row justify-end gap-2">
      <Button
        variant="warm"
        size="md"
        trailingIcon={<Send size={14} />}
        onClick={() => onComplete(answers, elaborations)}
      >
        Continuer
      </Button>
    </div>
  ) : (
    <div className="flex flex-col gap-stack-xs">
      <DreyfusSlider
        tone="warm"
        variant="effect"
        value={selectedLevel}
        onChange={(lv) => setSelectedLevel(lv as DreyfusLevel)}
        aria-label="Choisis ton niveau Dreyfus"
      />
      <div className="flex items-center gap-2">
        <textarea
          value={textValue}
          onChange={(e) => setTextValue(e.target.value)}
          placeholder="(Optionnel) Développe ta réponse, donne un exemple…"
          rows={2}
          className="flex-1 resize-none rounded-xl border border-ink-200 bg-white/90 px-3 py-2 text-body-sm text-ink-900 leading-relaxed placeholder:text-ink-400 focus:outline-none focus:ring-2 focus:ring-secondary-300 focus:border-secondary-400 transition-all"
        />
        <Button
          variant="warm"
          size="lg"
          iconOnly
          trailingIcon={<Send size={18} />}
          aria-label="Envoyer la réponse"
          disabled={selectedLevel === undefined}
          onClick={handleSend}
          className="self-center shrink-0"
        />
      </div>
    </div>
  );

  const title = (
    <div className="flex flex-col gap-1">
      <div className="flex items-baseline justify-between gap-2">
        <span>Positionnement Dreyfus</span>
        <span className="text-caption text-ink-500 tabular-nums">
          {isClosed ? total : Math.min(currentIdx + 1, total)} / {total}
        </span>
      </div>
      <ProgressBar value={progressPct} max={100} fill="warm" size="sm" valueLabel={false} />
    </div>
  );

  return <ConversationalChat title={title} messages={messages} footer={footer} />;
};

export default OnboardingQuestionnaireConversational;
