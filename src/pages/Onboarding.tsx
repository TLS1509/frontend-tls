/**
 * Onboarding — Guide IA chat-driven profile collection.
 *
 * CDC #03 Onboarding flow Step 1: Collect only firstName + role via conversational chat.
 * - AI greeting → asks name → asks role (quick-reply tiles) → transition → navigate to questionnaire
 * - Streaming pattern: typing indicator → word-by-word fill for realistic chatbot feel
 * - Timing: 600-1400ms initial pause, 50ms/word for natural cadence
 *
 * Next steps (Phase 16+):
 * - Replace buildGreeting/buildRoleQuestion stubs with Mistral calls
 * - Integrate with real Mistral API for question generation & level inference
 */

import React, { useEffect, useRef, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Send, Sparkles, BookOpen, Briefcase, HeartHandshake, GraduationCap, ShieldCheck } from 'lucide-react';
import { Button, Input } from '../components';
import { ConversationalChat } from '../components/patterns/ConversationalChat';
import type { ChatMessage } from '../components/patterns/ConversationalChat';
import { TlsLogo } from '../components/ui/TlsLogo';
import { AmbientBlobs } from '../components/patterns/AmbientBlobs';
import { useUserProfileStore, useOnboardingStore } from '../stores/persistence';
import type { UserRole } from '../types/learning';
import { MOCK_USER_ID } from '../data/passeport';

/* ─── Timing constants — match OnboardingQuestionnaireConversational ─────── */
const TYPING_MS_MIN = 600;
const TYPING_MS_MAX = 1400;
const WORD_DELAY_MS = 50;

/* ─── Role options for quick-reply tiles ─────────────────────────────────── */
const ROLE_TILES: Array<{ id: UserRole; label: string; icon: React.ComponentType<{ size: number }> }> = [
  { id: 'apprenant', label: 'Apprenant',  icon: BookOpen },
  { id: 'manager',   label: 'Manager',    icon: Briefcase },
  { id: 'coach',     label: 'Coach',      icon: HeartHandshake },
  { id: 'expert',    label: 'Expert',     icon: GraduationCap },
  { id: 'admin',     label: 'Admin',      icon: ShieldCheck },
];

/* ─── AI message builders (stub — to be replaced by Mistral in Phase 16.12bis) ──── */
function buildGreeting(): string[] {
  return [
    'Salut ! 👋 Je suis ton assistant IA de The Learning Society.',
    'Je vais te poser quelques questions pour créer un profil personnalisé.',
  ];
}

function buildNameQuestion(): string {
  return 'Commençons par le commencement — quel est ton prénom ?';
}

function buildRoleQuestion(): string {
  return 'Parfait ! Quel est ton rôle dans l\'organisation ?';
}

function buildAckName(firstName: string): string {
  return `Enchanté, ${firstName} ! 😊`;
}

function buildAckRole(role: UserRole): string {
  const roleLabel = ROLE_TILES.find((r) => r.id === role)?.label ?? role;
  return `Super, tu es ${roleLabel}. On va vraiment pouvoir t'adapter un parcours !`;
}

function buildTransition(): string[] {
  return [
    'Maintenant, passons au positionnement — je vais évaluer tes compétences avec quelques questions.',
    'Après ça, tu auras une view complète de ton Passeport de compétences. Prêt ?',
  ];
}

/* ─── Streaming helper (same as OnboardingQuestionnaireConversational) ───── */
interface StreamingState {
  messages: ChatMessage[];
  seqId: number;
  timersRef: number[];
}

function createStreamingState(): StreamingState {
  return {
    messages: [],
    seqId: 0,
    timersRef: [],
  };
}

function newId(state: StreamingState): string {
  return `m-${state.seqId++}`;
}

function cancelTimers(timersRef: number[]) {
  timersRef.forEach((id) => window.clearTimeout(id));
}

function streamLine(
  text: string,
  state: StreamingState,
  setMessages: React.Dispatch<React.SetStateAction<ChatMessage[]>>,
  onDone: () => void
) {
  const typingId = newId(state);
  const msgId = newId(state);

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
          state.timersRef.push(t3);
        }
      }, idx * WORD_DELAY_MS);
      state.timersRef.push(t2);
    });
  }, typingMs);

  state.timersRef.push(t1);
}

function appendAiSequence(
  lines: string[],
  state: StreamingState,
  setMessages: React.Dispatch<React.SetStateAction<ChatMessage[]>>,
  cb?: () => void
) {
  const valid = lines.filter((l) => typeof l === 'string' && l.trim().length > 0);
  let i = 0;

  function next() {
    if (i >= valid.length) {
      cb?.();
      return;
    }
    streamLine(valid[i++], state, setMessages, next);
  }

  next();
}

/* ─── Types ──────────────────────────────────────────────────────────────── */

type Step = 'greeting' | 'name' | 'role' | 'transition' | 'done';

interface ProfileAnswers {
  firstName: string;
  role: UserRole | '';
}

/* ─── Main Component ─────────────────────────────────────────────────────── */

export const Onboarding: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const profileStore = useUserProfileStore();
  const onboardingStore = useOnboardingStore();

  // ── Detect invitation context ──
  useEffect(() => {
    const token = searchParams.get('invite');
    const company = searchParams.get('company');
    if (token || company) {
      onboardingStore.setAccountType('invited', {
        invitationToken: token ?? undefined,
        company: company ?? undefined,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // ── State management ──
  const [step, setStep] = useState<Step>('greeting');
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [answers, setAnswers] = useState<ProfileAnswers>({
    firstName: onboardingStore.firstName || '',
    role: (onboardingStore.role ?? '') as UserRole | '',
  });
  const [transitioning, setTransitioning] = useState(false);
  const [nameInput, setNameInput] = useState('');

  const streamingState = useRef(createStreamingState());

  // ── Cleanup on unmount ──
  useEffect(() => {
    return () => cancelTimers(streamingState.current.timersRef);
  }, []);

  // ── Initialize with greeting ──
  useEffect(() => {
    const greeting = buildGreeting();
    appendAiSequence(greeting, streamingState.current, setMessages, () => {
      setStep('name');
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // ── Handle name submission ──
  function handleNameSubmit() {
    const name = nameInput.trim();
    if (!name || transitioning) return;

    setTransitioning(true);
    setAnswers((prev) => ({ ...prev, firstName: name }));

    // User bubble
    setMessages((prev) => [...prev, { id: `m-${streamingState.current.seqId++}`, type: 'user', content: name }]);

    // AI acknowledgment + question for role
    appendAiSequence(
      [buildAckName(name), buildRoleQuestion()],
      streamingState.current,
      setMessages,
      () => {
        setStep('role');
        setNameInput('');
        setTransitioning(false);
      }
    );
  }

  // ── Handle role selection ──
  function handleRoleSelect(selectedRole: UserRole) {
    if (transitioning) return;

    setTransitioning(true);
    setAnswers((prev) => ({ ...prev, role: selectedRole }));

    // User bubble showing role label
    const roleLabel = ROLE_TILES.find((r) => r.id === selectedRole)?.label ?? selectedRole;
    setMessages((prev) => [
      ...prev,
      { id: `m-${streamingState.current.seqId++}`, type: 'user', content: roleLabel },
    ]);

    // AI acknowledgment + transition
    appendAiSequence(
      [buildAckRole(selectedRole), ...buildTransition()],
      streamingState.current,
      setMessages,
      () => {
        setStep('transition');
        handleComplete(selectedRole);
      }
    );
  }

  // ── Handle completion: save profile and navigate ──
  function handleComplete(selectedRole: UserRole) {
    const finalRole = selectedRole || ('apprenant' as UserRole);

    // Update stores
    onboardingStore.patch({
      firstName: answers.firstName,
      role: finalRole,
    });

    profileStore.set({
      userId: MOCK_USER_ID,
      firstName: answers.firstName,
      role: finalRole,
      sector: '', // simplified — not collected in variant A
      goals: [],  // simplified — not collected in variant A
      rhythm: '',  // simplified — not collected in variant A
      credits: { classic: 0, special: 0 },
      subscriptionTier: 'free',
      completedAt: new Date().toISOString(),
    });

    onboardingStore.markStepComplete('profile');
    onboardingStore.goToStep('questionnaire');

    // Small delay before navigating (so transition message is visible)
    const t = window.setTimeout(() => {
      navigate('/onboarding/questionnaire');
    }, 800);

    streamingState.current.timersRef.push(t);
  }

  // ── Render based on step ──

  // Step: Name input with text field
  if (step === 'name') {
    const footer = (
      <div className="flex items-end gap-2">
        <textarea
          value={nameInput}
          onChange={(e) => setNameInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
              e.preventDefault();
              handleNameSubmit();
            }
          }}
          placeholder="Entre ton prénom…"
          rows={1}
          disabled={transitioning}
          className="flex-1 resize-none rounded-xl border border-ink-200 bg-white px-3 py-2.5 text-body-sm text-ink-900 leading-relaxed placeholder:text-ink-400 focus:outline-none focus:ring-2 focus:ring-secondary-300 focus:border-secondary-400 transition-all duration-base disabled:opacity-disabled"
          style={{ maxHeight: '96px', overflowY: 'auto' }}
          autoFocus
        />
        <Button
          variant="warm"
          size="md"
          iconOnly
          trailingIcon={<Send size={16} />}
          aria-label="Envoyer"
          disabled={!nameInput.trim() || transitioning}
          onClick={handleNameSubmit}
          className="shrink-0 self-end mb-0.5"
        />
      </div>
    );

    return (
      <main className="relative min-h-screen overflow-x-hidden">
        <div className="fixed inset-0 -z-10 bg-gradient-page-ambient-warm" aria-hidden />
        <AmbientBlobs intensity="subtle" />

        <div className="relative z-base max-w-3xl mx-auto px-4 sm:px-6 lg:px-10 pt-8 pb-section flex flex-col gap-section">
          {/* Brand bar */}
          <div className="flex items-center justify-between">
            <div className="w-24" />
            <a
              href="/dashboard"
              aria-label="The Learning Society — retour accueil"
              className="flex items-center gap-2 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary-500 rounded-sm"
            >
              <TlsLogo size={36} variant="color" withBubble />
            </a>
            <div className="w-24 flex justify-end">
              <button
                onClick={() => navigate('/dashboard')}
                className="font-body text-caption text-ink-500 hover:text-ink-900 transition-colors duration-base focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500 rounded-sm min-h-touch flex items-center"
              >
                Déjà inscrit ?
              </button>
            </div>
          </div>

          {/* Header */}
          <header className="flex flex-col gap-tight text-center">
            <p className="m-0 inline-flex items-center justify-center gap-2 font-body text-caption font-semibold uppercase tracking-wider text-secondary-600">
              <Sparkles size={14} aria-hidden="true" />
              Démarrage personnalisé
            </p>
            <h1 className="m-0 font-display text-h2 font-extrabold tracking-display text-ink-900 leading-tight">
              Bienvenue !
            </h1>
          </header>

          {/* Chat window */}
          <ConversationalChat
            title={<span className="font-body text-body-sm font-semibold text-ink-700">Guide IA</span>}
            messages={messages}
            footer={footer}
            className="min-h-[62vh] max-h-[72vh]"
          />
        </div>
      </main>
    );
  }

  // Step: Role selection with tiles (inline quick-replies)
  if (step === 'role') {
    const footer = (
      <div className="flex flex-wrap gap-2 justify-center">
        {ROLE_TILES.map((roleOption) => {
          const Icon = roleOption.icon;
          return (
            <button
              key={roleOption.id}
              onClick={() => handleRoleSelect(roleOption.id)}
              disabled={transitioning}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-pill border-2 border-secondary-300 bg-white text-secondary-700 hover:bg-secondary-50 hover:border-secondary-400 transition-all duration-base disabled:opacity-disabled cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-secondary-500"
            >
              <Icon size={16} />
              <span className="font-body text-body-sm font-medium">{roleOption.label}</span>
            </button>
          );
        })}
      </div>
    );

    return (
      <main className="relative min-h-screen overflow-x-hidden">
        <div className="fixed inset-0 -z-10 bg-gradient-page-ambient-warm" aria-hidden />
        <AmbientBlobs intensity="subtle" />

        <div className="relative z-base max-w-3xl mx-auto px-4 sm:px-6 lg:px-10 pt-8 pb-section flex flex-col gap-section">
          {/* Brand bar */}
          <div className="flex items-center justify-between">
            <div className="w-24" />
            <a
              href="/dashboard"
              aria-label="The Learning Society — retour accueil"
              className="flex items-center gap-2 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary-500 rounded-sm"
            >
              <TlsLogo size={36} variant="color" withBubble />
            </a>
            <div className="w-24" />
          </div>

          {/* Chat window */}
          <ConversationalChat
            title={<span className="font-body text-body-sm font-semibold text-ink-700">Guide IA</span>}
            messages={messages}
            footer={footer}
            className="min-h-[62vh] max-h-[72vh]"
          />
        </div>
      </main>
    );
  }

  // Step: Transition (navigating to questionnaire)
  return (
    <main className="relative min-h-screen overflow-x-hidden flex items-center justify-center">
      <div className="fixed inset-0 -z-10 bg-gradient-page-ambient-warm" aria-hidden />
      <AmbientBlobs intensity="subtle" />

      <div className="relative z-base text-center">
        <p className="font-body text-body text-ink-500">Redirection en cours…</p>
      </div>
    </main>
  );
};

export default Onboarding;
