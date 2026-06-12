/**
 * OnboardingUnified — Single chat-driven flow (steps 1 + 2 combined).
 *
 * CDC #03 Variant A: firstName + role + Dreyfus positioning in one conversational thread.
 * Steps: greeting → name → role → transition → questionnaire → done → /onboarding/payment
 */

import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Send, BookOpen, Briefcase, HeartHandshake, GraduationCap, ShieldCheck, ArrowRight } from 'lucide-react';
import { Button, Input } from '../components';
import { ConversationalChat } from '../components/patterns/ConversationalChat';
import type { ChatMessage } from '../components/patterns/ConversationalChat';
import { BehavioralTileGrid } from '../components/ui/BehavioralTileGrid';
import { TlsLogo } from '../components/ui/TlsLogo';
import { AmbientBlobs } from '../components/patterns/AmbientBlobs';
import { useUserProfileStore, useOnboardingStore } from '../stores/persistence';
import { getBehavioralTiles } from '../lib/behavioral-tiles';
import type { BehavioralTileSet } from '../lib/behavioral-tiles';
import { buildAcknowledgment, buildClosing } from '../lib/mistral-questionnaire-stub';
import type { OnboardingQuestion } from '../lib/onboarding-questionnaire';
import type { UserRole, DreyfusLevel } from '../types/learning';

interface LocalQuestion extends OnboardingQuestion {
  tiles: BehavioralTileSet;
}

const TYPING_MS_MIN = 600;
const TYPING_MS_MAX = 1400;
const WORD_DELAY_MS = 50;

const ROLE_TILES: Array<{ id: UserRole; label: string; icon: React.ComponentType<{ size: number; className?: string }> }> = [
  { id: 'apprenant', label: 'Apprenant', icon: BookOpen },
  { id: 'manager', label: 'Manager', icon: Briefcase },
  { id: 'coach', label: 'Coach', icon: HeartHandshake },
  { id: 'expert', label: 'Expert', icon: GraduationCap },
  { id: 'admin', label: 'Admin', icon: ShieldCheck },
];

const INTRO_LINES = [
  'Salut ! 👋 Je suis ton assistant IA de The Learning Society.',
  'Je vais te poser quelques questions pour créer ton profil personnalisé.',
];

type Step = 'greeting' | 'name' | 'role' | 'transition' | 'questionnaire' | 'done';

/** Holds pending timers for cancellation only — ID sequence lives in a separate ref. */
interface StreamingState {
  timersRef: number[];
}

function cancelTimers(timersRef: number[]) {
  timersRef.forEach((id) => window.clearTimeout(id));
}

/** Stream a single line word-by-word with a typing indicator.
 *  counter.current is a global ever-increasing ID — never resets. */
function streamLine(
  text: string,
  counter: React.MutableRefObject<number>,
  state: StreamingState,
  setMessages: React.Dispatch<React.SetStateAction<ChatMessage[]>>,
  onDone: () => void
) {
  const typingId = `m-${counter.current++}`;
  const msgId = `m-${counter.current++}`;

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
        setMessages((prev) => prev.map((m) => (m.id === msgId ? { ...m, content: snap } : m)));
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
  counter: React.MutableRefObject<number>,
  state: StreamingState,
  setMessages: React.Dispatch<React.SetStateAction<ChatMessage[]>>,
  cb?: () => void
) {
  let idx = 0;
  function next() {
    if (idx >= lines.length) { cb?.(); return; }
    streamLine(lines[idx++], counter, state, setMessages, next);
  }
  next();
}

export const OnboardingUnified: React.FC = () => {
  const navigate = useNavigate();
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [step, setStep] = useState<Step>('greeting');
  const [firstName, setFirstName] = useState('');
  const [selectedRole, setSelectedRole] = useState<UserRole | null>(null);
  const [questionIdx, setQuestionIdx] = useState(0);
  const [nameInput, setNameInput] = useState('');
  const [loading, setLoading] = useState(false);

  // Global ID counter — never resets between state transitions to avoid message ID collisions.
  const msgCounter = useRef(0);
  const stateRef = useRef<StreamingState>({ timersRef: [] });
  const profile = useUserProfileStore();
  const onboarding = useOnboardingStore();

  const [questions, setQuestions] = useState<LocalQuestion[]>([]);

  useEffect(() => {
    setQuestions([
      {
        id: 1,
        competenceId: 'comp_strategic',
        q: 'Tes approches pour résoudre des problèmes complexes',
        tiles: getBehavioralTiles('comp_strategic'),
      },
      {
        id: 2,
        competenceId: 'comp_leadership',
        q: 'Ton style de leadership et influence',
        tiles: getBehavioralTiles('comp_leadership'),
      },
      {
        id: 3,
        competenceId: 'comp_innovation',
        q: 'Ton approche face aux changements et innovations',
        tiles: getBehavioralTiles('comp_innovation'),
      },
    ]);
  }, []);

  useEffect(() => {
    return () => cancelTimers(stateRef.current.timersRef);
  }, []);

  // Initial greeting on mount
  useEffect(() => {
    appendAiSequence(INTRO_LINES, msgCounter, stateRef.current, setMessages, () => {
      // Cancel previous timers, start fresh batch — but counter keeps incrementing
      stateRef.current = { timersRef: [] };
      setStep('name');
      streamLine('Commençons — quel est ton prénom ?', msgCounter, stateRef.current, setMessages, () => {});
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleNameSubmit = () => {
    if (!nameInput.trim() || loading) return;
    setLoading(true);

    const name = nameInput.trim();
    const userMsgId = `m-${msgCounter.current++}`;
    setMessages((prev) => [...prev, { id: userMsgId, type: 'user', content: name }]);
    setFirstName(name);
    setNameInput('');

    const ack = `Enchanté, ${name} ! 😊`;
    setTimeout(() => {
      stateRef.current = { timersRef: [] };
      streamLine(ack, msgCounter, stateRef.current, setMessages, () => {
        setTimeout(() => {
          setLoading(false);
          setStep('role');
          stateRef.current = { timersRef: [] };
          streamLine("Quel est ton rôle dans l'organisation ?", msgCounter, stateRef.current, setMessages, () => {});
        }, 600);
      });
    }, 300);
  };

  const handleRoleSelect = (role: UserRole) => {
    if (loading || selectedRole !== null) return;
    setLoading(true);
    setSelectedRole(role);

    const roleLabel = ROLE_TILES.find((r) => r.id === role)?.label ?? role;
    const userMsgId = `m-${msgCounter.current++}`;
    setMessages((prev) => [...prev, { id: userMsgId, type: 'user', content: `Je suis ${roleLabel}` }]);

    const ack = `Super, tu es ${roleLabel}. On va vraiment pouvoir t'adapter un parcours !`;
    setTimeout(() => {
      stateRef.current = { timersRef: [] };
      streamLine(ack, msgCounter, stateRef.current, setMessages, () => {
        setTimeout(() => {
          setStep('transition');
          stateRef.current = { timersRef: [] };
          const transitionLines = [
            'Maintenant, passons au positionnement — je vais évaluer tes compétences avec quelques questions.',
            'Après ça, tu auras une vue complète de ton Passeport de compétences.',
          ];
          appendAiSequence(transitionLines, msgCounter, stateRef.current, setMessages, () => {
            setTimeout(() => {
              setLoading(false);
              setStep('questionnaire');
              setQuestionIdx(0);
              stateRef.current = { timersRef: [] };
              const firstQ = questions[0];
              if (firstQ) {
                streamLine(firstQ.q, msgCounter, stateRef.current, setMessages, () => {});
              }
            }, 800);
          });
        }, 600);
      });
    }, 300);
  };

  const handleTileSelect = (level: DreyfusLevel) => {
    if (questionIdx >= questions.length || loading) return;

    const q = questions[questionIdx];
    setLoading(true);

    const tileLabel = q.tiles[level - 1] ?? String(level);
    const userMsgId = `m-${msgCounter.current++}`;
    setMessages((prev) => [...prev, { id: userMsgId, type: 'user', content: tileLabel }]);

    const ackLine = buildAcknowledgment(level, false);

    if (questionIdx < questions.length - 1) {
      stateRef.current = { timersRef: [] };
      streamLine(ackLine, msgCounter, stateRef.current, setMessages, () => {
        setTimeout(() => {
          const nextQ = questions[questionIdx + 1];
          stateRef.current = { timersRef: [] };
          streamLine(nextQ.q, msgCounter, stateRef.current, setMessages, () => {
            setQuestionIdx((prev) => prev + 1);
            setLoading(false);
          });
        }, 600);
      });
    } else {
      stateRef.current = { timersRef: [] };
      streamLine(ackLine, msgCounter, stateRef.current, setMessages, () => {
        setTimeout(() => {
          const closingLines = buildClosing(firstName, true);
          stateRef.current = { timersRef: [] };
          appendAiSequence(closingLines, msgCounter, stateRef.current, setMessages, () => {
            setTimeout(() => {
              setStep('done');
              profile.patch({ firstName, role: selectedRole! });
              onboarding.markStepComplete('profile');
              onboarding.markStepComplete('questionnaire');
              setTimeout(() => navigate('/onboarding/payment'), 1200);
            }, 800);
          });
        }, 600);
      });
    }
  };

  return (
    <div className="relative flex min-h-[100dvh] w-screen flex-col overflow-hidden bg-gradient-to-br from-primary-50 to-accent-50">
      <AmbientBlobs />

      {/* Header */}
      <div className="relative z-10 flex items-center justify-between border-b border-primary-100 bg-white/40 px-6 py-4 backdrop-blur-glass-light">
        <TlsLogo variant="primary" size={32} />
        <div className="text-caption text-ink-500">
          Étape {step === 'greeting' || step === 'name' || step === 'role' || step === 'transition' ? '1' : '2'} / 5
        </div>
      </div>

      {/* Chat area */}
      <div className="relative z-10 flex flex-1 flex-col overflow-hidden">
        <ConversationalChat
          messages={messages}
        />
      </div>

      {/* Input area */}
      <div className="relative z-10 border-t border-primary-100 bg-white/40 px-6 py-4 backdrop-blur-glass-light">
        {(step === 'greeting' || step === 'transition') && (
          <div className="flex justify-center">
            <p className="animate-pulse text-body-sm text-ink-500">Chargement...</p>
          </div>
        )}

        {step === 'name' && (
          <div className="flex gap-2">
            <Input
              placeholder="Ton prénom..."
              value={nameInput}
              onChange={(e) => setNameInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !loading) handleNameSubmit();
              }}
              disabled={loading}
              className="flex-1"
              autoFocus
            />
            <Button
              size="md"
              onClick={handleNameSubmit}
              disabled={!nameInput.trim() || loading}
              leadingIcon={<Send size={16} />}
            >
              {loading ? 'Envoi...' : 'Envoyer'}
            </Button>
          </div>
        )}

        {step === 'role' && (
          <div className="grid grid-cols-5 gap-2">
            {ROLE_TILES.map((tile) => {
              const Icon = tile.icon;
              return (
                <button
                  key={tile.id}
                  onClick={() => handleRoleSelect(tile.id)}
                  disabled={loading || selectedRole !== null}
                  className={`flex flex-col items-center gap-1 rounded-lg border-2 px-3 py-2 transition-all ${
                    selectedRole === tile.id
                      ? 'border-primary-500 bg-primary-50'
                      : 'border-primary-100 hover:border-primary-300 hover:bg-primary-50'
                  } ${loading || selectedRole ? 'pointer-events-none opacity-50' : 'cursor-pointer'}`}
                >
                  <Icon size={20} className="text-primary-600" />
                  <span className="text-caption font-semibold text-ink-900">{tile.label}</span>
                </button>
              );
            })}
          </div>
        )}

        {step === 'questionnaire' && questionIdx < questions.length && (
          <BehavioralTileGrid
            tiles={questions[questionIdx].tiles}
            onChange={handleTileSelect}
            disabled={loading}
          />
        )}

        {step === 'done' && (
          <div className="flex flex-col items-center gap-4">
            <p className="text-body text-ink-600">Passons à la sélection de ton plan...</p>
            <Button
              size="lg"
              onClick={() => navigate('/onboarding/payment')}
              leadingIcon={<ArrowRight size={18} />}
            >
              Continuer
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default OnboardingUnified;
