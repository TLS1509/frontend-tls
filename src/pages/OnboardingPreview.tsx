/**
 * OnboardingPreview — 3 profile collection variants for comparison
 *
 * A: "Guide IA"  — full chat: AI collects profile + flows into questionnaire
 * B: "Focus"     — full-screen one-question-at-a-time, Duolingo/Headspace style
 * C: "Carte+"    — improved card shell, auto-advance on role tap, 3 sub-steps
 *
 * Route: /onboarding-preview (dev only — not in main nav)
 */

import React, { useEffect, useRef, useState } from 'react';
import { ArrowRight, Check, ChevronLeft, ChevronRight, Send, Sparkles } from 'lucide-react';
import { Button } from '../components/core/Button';
import { AmbientBlobs } from '../components/patterns/AmbientBlobs';
import { ConversationalChat } from '../components/patterns/ConversationalChat';
import type { ChatMessage } from '../components/patterns/ConversationalChat';
import { TlsLogo } from '../components/ui/TlsLogo';
import { ProgressBar } from '../components/ui/ProgressBar';

/* ─── Shared data ─────────────────────────────────────────────────────────── */

const ROLES = [
  { id: 'apprenant',  label: 'Apprenant',  emoji: '📚' },
  { id: 'manager',    label: 'Manager',    emoji: '💼' },
  { id: 'coach',      label: 'Coach',      emoji: '🤝' },
  { id: 'expert',     label: 'Expert',     emoji: '🎓' },
  { id: 'admin',      label: 'Admin',      emoji: '🛡️' },
];

const GOALS = [
  { id: 'Leadership',        label: 'Leadership',        emoji: '🚀' },
  { id: 'Communication',     label: 'Communication',     emoji: '💬' },
  { id: 'IA & Tech',         label: 'IA & Tech',         emoji: '🧠' },
  { id: 'Gestion de projet', label: 'Gestion de projet', emoji: '🎯' },
  { id: 'Coaching',          label: 'Coaching',          emoji: '🤝' },
  { id: 'Productivité',      label: 'Productivité',      emoji: '⚡' },
];

/* ─── Variant A : Guide IA (Chat) ─────────────────────────────────────────── */

const TYPING_MIN = 260;
const TYPING_MAX = 620;
const WORD_DELAY = 36;

type ChatPhase = 'boot' | 'name' | 'role' | 'goals' | 'done';

function VariantA({ onDone }: { onDone: () => void }) {
  const [messages, setMessages]       = useState<ChatMessage[]>([]);
  const [phase, setPhase]             = useState<ChatPhase>('boot');
  const [firstName, setFirstName]     = useState('');
  const [selectedRole, setSelectedRole] = useState('');
  const [selectedGoals, setSelectedGoals] = useState<string[]>([]);
  const [textValue, setTextValue]     = useState('');
  const [transitioning, setTransitioning] = useState(false);
  const seqRef   = useRef(0);
  const timersRef = useRef<number[]>([]);
  const newId = () => `m-${seqRef.current++}`;

  const cancel = () => { timersRef.current.forEach(clearTimeout); timersRef.current = []; };

  function streamLine(text: string, onStreamDone: () => void) {
    const typingId = newId();
    const msgId    = newId();
    setMessages(prev => [...prev, { id: typingId, type: 'typing' }]);
    const typingMs = Math.min(TYPING_MAX, Math.max(TYPING_MIN, text.length * 4));
    const t1 = window.setTimeout(() => {
      const words = text.trim().split(/\s+/);
      setMessages(prev => [
        ...prev.filter(m => m.id !== typingId),
        { id: msgId, type: 'ai', content: '' },
      ]);
      let built = '';
      words.forEach((word, idx) => {
        const t2 = window.setTimeout(() => {
          built = built ? `${built} ${word}` : word;
          const snap = built;
          setMessages(prev => prev.map(m => m.id === msgId ? { ...m, content: snap } : m));
          if (idx === words.length - 1) {
            const t3 = window.setTimeout(onStreamDone, 80);
            timersRef.current.push(t3);
          }
        }, idx * WORD_DELAY);
        timersRef.current.push(t2);
      });
    }, typingMs);
    timersRef.current.push(t1);
  }

  function seq(lines: string[], cb?: () => void) {
    const valid = lines.filter(l => l.trim());
    let i = 0;
    function next() { if (i >= valid.length) { cb?.(); return; } streamLine(valid[i++], next); }
    next();
  }

  useEffect(() => {
    seq(
      ["Bonjour ! Pour personnaliser ton expérience, je vais te poser quelques questions rapides."],
      () => seq(["Commençons par ton prénom ?"], () => setPhase('name'))
    );
    return cancel;
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function sendName() {
    const name = textValue.trim();
    if (!name) return;
    setFirstName(name);
    setTextValue('');
    setTransitioning(true);
    setPhase('boot');
    setMessages(prev => [...prev, { id: newId(), type: 'user', content: name }]);
    seq([`Bonjour **${name}** ! Et quel est ton rôle principal ?`], () => {
      setPhase('role');
      setTransitioning(false);
    });
  }

  function selectRole(roleId: string) {
    if (transitioning) return;
    const role = ROLES.find(r => r.id === roleId);
    if (!role) return;
    setSelectedRole(roleId);
    setTransitioning(true);
    setPhase('boot');
    setMessages(prev => [...prev, { id: newId(), type: 'user', content: `${role.emoji} ${role.label}` }]);
    seq(
      [`Parfait. Quels sont tes objectifs d'apprentissage ?`, `Tu peux en choisir plusieurs.`],
      () => { setPhase('goals'); setTransitioning(false); }
    );
  }

  function confirmGoals() {
    if (selectedGoals.length === 0 || transitioning) return;
    setTransitioning(true);
    setPhase('boot');
    const txt = selectedGoals.join(' · ');
    setMessages(prev => [...prev, { id: newId(), type: 'user', content: txt }]);
    seq(
      [
        `Excellent ${firstName} ! Profil créé.`,
        `Je vais maintenant évaluer tes compétences sur **${selectedGoals.length + 2} axes** liés à tes objectifs. C'est parti !`,
      ],
      () => { setPhase('done'); setTransitioning(false); }
    );
  }

  function toggleGoal(id: string) {
    setSelectedGoals(prev =>
      prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
    );
  }

  /* Inline tiles */
  const roleTiles: ChatMessage | null = phase === 'role' ? {
    id: 'role-tiles',
    type: 'inline',
    content: (
      <div className="ml-10 mt-1 mb-2 flex flex-wrap gap-stack-xs">
        {ROLES.map(r => (
          <button
            key={r.id}
            onClick={() => selectRole(r.id)}
            disabled={transitioning}
            className="px-3 py-2 rounded-xl border border-ink-200 bg-white/90 text-body-sm text-ink-800 font-medium hover:border-secondary-400 hover:bg-secondary-50 active:scale-95 transition-all duration-150 disabled:opacity-50"
          >
            {r.emoji} {r.label}
          </button>
        ))}
      </div>
    ),
  } : null;

  const goalTiles: ChatMessage | null = phase === 'goals' ? {
    id: 'goal-tiles',
    type: 'inline',
    content: (
      <div className="ml-10 mt-1 mb-2 flex flex-col gap-stack-xs">
        <div className="flex flex-wrap gap-stack-xs">
          {GOALS.map(g => {
            const on = selectedGoals.includes(g.id);
            return (
              <button
                key={g.id}
                onClick={() => toggleGoal(g.id)}
                disabled={transitioning}
                className={[
                  'px-3 py-2 rounded-xl border text-body-sm font-medium transition-all duration-150 active:scale-95',
                  on
                    ? 'bg-secondary-500 border-secondary-500 text-white'
                    : 'bg-white/90 border-ink-200 text-ink-800 hover:border-secondary-400 hover:bg-secondary-50',
                ].join(' ')}
              >
                {on && <Check size={11} className="inline mr-1 -mt-0.5" />}
                {g.emoji} {g.label}
              </button>
            );
          })}
        </div>
        {selectedGoals.length > 0 && (
          <button
            onClick={confirmGoals}
            disabled={transitioning}
            className="self-start mt-1 px-4 py-2 rounded-xl bg-secondary-500 text-white text-body-sm font-semibold hover:bg-secondary-600 transition-all duration-150 disabled:opacity-50"
          >
            Valider mes objectifs →
          </button>
        )}
      </div>
    ),
  } : null;

  const displayMessages = [
    ...messages,
    ...(roleTiles ? [roleTiles] : []),
    ...(goalTiles ? [goalTiles] : []),
  ];

  const chatTitle = (
    <div className="flex items-center justify-between">
      <span className="text-body-sm font-semibold text-ink-700">Configuration de ton profil</span>
      <span className="text-caption text-secondary-600 font-semibold">Guide IA</span>
    </div>
  );

  const footer = phase === 'done' ? (
    <div className="flex justify-end">
      <Button variant="warm" size="lg" trailingIcon={<ArrowRight size={16} />} onClick={onDone}>
        Commencer le positionnement
      </Button>
    </div>
  ) : phase === 'name' ? (
    <div className="flex items-end gap-stack-xs">
      <input
        autoFocus
        value={textValue}
        onChange={e => setTextValue(e.target.value)}
        onKeyDown={e => { if (e.key === 'Enter') sendName(); }}
        placeholder="Ton prénom…"
        className="flex-1 rounded-xl border border-ink-200 bg-white px-3 py-2.5 text-body-sm text-ink-900 placeholder:text-ink-400 focus:outline-none focus:ring-2 focus:ring-secondary-300 transition-all"
      />
      <Button
        variant="warm" size="md" iconOnly
        trailingIcon={<Send size={16} />}
        aria-label="Envoyer"
        disabled={!textValue.trim()}
        onClick={sendName}
        className="shrink-0 self-end mb-0.5"
      />
    </div>
  ) : (
    <p className="text-caption text-ink-400 text-center py-0.5 select-none">
      {phase === 'role' ? 'Sélectionne ton rôle ci-dessus' :
       phase === 'goals' ? 'Sélectionne tes objectifs ci-dessus' : ''}
    </p>
  );

  return (
    <ConversationalChat
      title={chatTitle}
      messages={displayMessages}
      footer={footer}
      className="min-h-[60vh] max-h-[72vh]"
    />
  );
}

/* ─── Variant B : Focus / full-screen ────────────────────────────────────── */

type BStep = 0 | 1 | 2; // name | role | goals

function VariantB({ onDone }: { onDone: () => void }) {
  const [step, setStep]               = useState<BStep>(0);
  const [firstName, setFirstName]     = useState('');
  const [selectedRole, setSelectedRole] = useState('');
  const [selectedGoals, setSelectedGoals] = useState<string[]>([]);
  const [exiting, setExiting]         = useState(false);

  function advance() {
    setExiting(true);
    setTimeout(() => {
      setStep(s => Math.min(s + 1, 2) as BStep);
      setExiting(false);
    }, 180);
  }

  function pickRole(id: string) {
    setSelectedRole(id);
    setTimeout(advance, 180);
  }

  function toggleGoal(id: string) {
    setSelectedGoals(prev =>
      prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
    );
  }

  const tileBase = [
    'flex flex-col items-center justify-center gap-stack-xs rounded-2xl border-2 py-5 px-3 transition-all duration-200 active:scale-95 cursor-pointer min-h-[88px]',
    'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-secondary-500',
  ].join(' ');

  const nGoals = selectedGoals.length;
  const goalSuffix = nGoals > 1 ? 's' : '';
  const goalHint = nGoals > 0
    ? `${nGoals} objectif${goalSuffix} selectionne${goalSuffix} sur 3`
    : "Jusqu'a 3 objectifs";

  return (
    <div
      className={[
        'flex flex-col items-center justify-center min-h-[65vh] gap-section',
        exiting ? 'opacity-0 translate-x-4' : 'opacity-100 translate-x-0',
        'transition-all duration-180',
      ].join(' ')}
    >
      {/* Step 0 — Name */}
      {step === 0 && (
        <>
          <div className="text-center flex flex-col gap-stack max-w-md w-full">
            <p className="font-body text-caption font-semibold uppercase tracking-wider text-secondary-600 m-0">
              Bienvenue sur TLS
            </p>
            <h2 className="font-display text-h1 font-extrabold tracking-display text-ink-900 leading-tight m-0">
              Ton prénom ?
            </h2>
          </div>
          <div className="flex flex-col gap-stack-xs w-full max-w-sm">
            <input
              autoFocus
              type="text"
              placeholder="Sophie…"
              value={firstName}
              onChange={e => setFirstName(e.target.value)}
              onKeyDown={e => { if (e.key === 'Enter' && firstName.trim()) advance(); }}
              className="w-full rounded-2xl border-2 border-ink-200 bg-white/80 px-5 py-stack text-body-lg text-ink-900 placeholder:text-ink-400 focus:outline-none focus:border-secondary-400 transition-colors duration-base text-center font-body"
            />
            <Button
              variant="warm" size="lg"
              trailingIcon={<ArrowRight size={16} />}
              onClick={advance}
              disabled={!firstName.trim()}
              className="w-full"
            >
              Continuer
            </Button>
          </div>
        </>
      )}

      {/* Step 1 — Role */}
      {step === 1 && (
        <>
          <div className="text-center flex flex-col gap-stack max-w-lg w-full">
            <p className="font-body text-caption font-semibold uppercase tracking-wider text-secondary-600 m-0">
              1 / 2
            </p>
            <h2 className="font-display text-h1 font-extrabold tracking-display text-ink-900 leading-tight m-0">
              {firstName ? `${firstName}, quel est ton rôle ?` : 'Quel est ton rôle ?'}
            </h2>
            <p className="font-body text-body-sm text-ink-500 m-0">Appuie pour continuer →</p>
          </div>
          <div className="grid grid-cols-3 gap-stack-xs w-full max-w-lg">
            {ROLES.map(r => (
              <button
                key={r.id}
                onClick={() => pickRole(r.id)}
                className={[
                  tileBase,
                  selectedRole === r.id
                    ? 'bg-secondary-500 border-secondary-500 text-white shadow-card scale-[1.02]'
                    : 'bg-white/85 border-white/60 text-ink-800 hover:border-secondary-300 hover:shadow-card-hover shadow-xs',
                ].join(' ')}
              >
                <span className="text-2xl">{r.emoji}</span>
                <span className="font-body text-body-sm font-semibold">{r.label}</span>
              </button>
            ))}
          </div>
        </>
      )}

      {/* Step 2 — Goals */}
      {step === 2 && (
        <>
          <div className="text-center flex flex-col gap-stack max-w-lg w-full">
            <p className="font-body text-caption font-semibold uppercase tracking-wider text-secondary-600 m-0">
              2 / 2
            </p>
            <h2 className="font-display text-h1 font-extrabold tracking-display text-ink-900 leading-tight m-0">
              Tes priorités ?
            </h2>
            <p className="font-body text-body-sm text-ink-500 m-0">{goalHint}</p>
          </div>
          <div className="grid grid-cols-3 gap-stack-xs w-full max-w-lg">
            {GOALS.map(g => {
              const on = selectedGoals.includes(g.id);
              return (
                <button
                  key={g.id}
                  onClick={() => toggleGoal(g.id)}
                  className={[
                    tileBase, 'relative',
                    on
                      ? 'bg-secondary-500 border-secondary-500 text-white shadow-card'
                      : 'bg-white/85 border-white/60 text-ink-800 hover:border-secondary-300 hover:shadow-card-hover shadow-xs',
                  ].join(' ')}
                >
                  {on && (
                    <span className="absolute top-2 right-2 w-4 h-4 rounded-full bg-white/30 inline-flex items-center justify-center">
                      <Check size={10} className="text-white" />
                    </span>
                  )}
                  <span className="text-xl">{g.emoji}</span>
                  <span className="font-body text-caption font-semibold text-center leading-snug">{g.label}</span>
                </button>
              );
            })}
          </div>
          <Button
            variant="warm" size="lg"
            trailingIcon={<ArrowRight size={16} />}
            onClick={onDone}
            disabled={selectedGoals.length === 0}
          >
            Commencer le positionnement
          </Button>
        </>
      )}

      {/* Progress dots */}
      <div className="flex gap-stack-xs items-center">
        {([0, 1, 2] as BStep[]).map(i => (
          <span
            key={i}
            className={[
              'rounded-pill transition-all duration-300',
              i < step  ? 'w-4 h-1.5 bg-secondary-400' :
              i === step ? 'w-5 h-2   bg-secondary-500' :
                           'w-1.5 h-1.5 bg-ink-200',
            ].join(' ')}
          />
        ))}
      </div>
    </div>
  );
}

/* ─── Variant C : Carte améliorée ────────────────────────────────────────── */

type CSubstep = 0 | 1 | 2; // identity | goals | confirmation

function VariantC({ onDone }: { onDone: () => void }) {
  const [substep, setSubstep]           = useState<CSubstep>(0);
  const [firstName, setFirstName]       = useState('');
  const [selectedRole, setSelectedRole] = useState('');
  const [selectedGoals, setSelectedGoals] = useState<string[]>([]);

  function pickRole(id: string) {
    setSelectedRole(id);
    if (firstName.trim()) {
      setTimeout(() => setSubstep(1), 260);
    }
  }

  function toggleGoal(id: string) {
    setSelectedGoals(prev =>
      prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
    );
  }

  const canNext0 = firstName.trim().length > 0 && selectedRole !== '';
  const canNext1 = selectedGoals.length > 0;

  const LABELS = ['Profil', 'Objectifs', 'Confirmation'];

  const tileBase = [
    'flex items-center gap-stack-xs.5 rounded-xl border px-3 py-2.5 text-left transition-all duration-150 active:scale-[0.98] cursor-pointer min-h-[44px]',
    'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-secondary-500',
  ].join(' ');

  const topGoal  = selectedGoals[0];
  const aiSuggestion = topGoal === 'Leadership' || topGoal === 'Coaching'
    ? 'Leadership & Impact — développe tes compétences de pilotage'
    : topGoal === 'IA & Tech'
    ? 'Tech & Innovation — maîtrise les outils IA pour ton métier'
    : 'Développement professionnel personnalisé selon tes objectifs';

  return (
    <div className="rounded-2xl bg-white/75 backdrop-blur-glass-medium border border-white/60 shadow-card overflow-hidden">

      {/* Segmented progress */}
      <div className="flex h-1 gap-px bg-ink-100" aria-hidden>
        {LABELS.map((_, i) => (
          <div
            key={i}
            className={[
              'flex-1 transition-all duration-300 ease-standard',
              i <= substep ? 'bg-secondary-500' : 'bg-transparent',
            ].join(' ')}
          />
        ))}
      </div>

      {/* Step content */}
      <div
        key={substep}
        className="p-6 sm:p-8 flex flex-col gap-stack-lg animate-in fade-in slide-in-from-right-2 duration-250"
      >

        {/* Step 0 — Identity */}
        {substep === 0 && (
          <>
            <div className="flex flex-col gap-tight">
              <h2 className="font-display text-h2 font-extrabold text-ink-900 m-0 leading-tight">
                Dis-nous qui tu es
              </h2>
              <p className="font-body text-body text-ink-500 m-0">
                Quelques informations pour personnaliser ton parcours.
              </p>
            </div>

            <div className="flex flex-col gap-stack-xs">
              <label className="font-body text-body-sm font-semibold text-ink-900">Ton prénom</label>
              <input
                autoFocus
                placeholder="Sophie…"
                value={firstName}
                onChange={e => setFirstName(e.target.value)}
                className="rounded-xl border border-ink-200 bg-white px-4 py-3 text-body-sm text-ink-900 placeholder:text-ink-400 focus:outline-none focus:border-secondary-400 transition-colors duration-base"
              />
            </div>

            <div className="flex flex-col gap-stack-xs">
              <label className="font-body text-body-sm font-semibold text-ink-900">
                Ton rôle
                {!firstName.trim() && (
                  <span className="ml-2 font-normal text-caption text-ink-400">(remplis ton prénom d'abord)</span>
                )}
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-stack-xs">
                {ROLES.map(r => {
                  const on = selectedRole === r.id;
                  return (
                    <button
                      key={r.id}
                      onClick={() => pickRole(r.id)}
                      disabled={!firstName.trim()}
                      className={[
                        tileBase,
                        on
                          ? 'bg-secondary-500 border-secondary-500 text-white shadow-sm'
                          : 'bg-white border-ink-100 text-ink-800 hover:border-secondary-300 hover:shadow-xs disabled:opacity-40',
                      ].join(' ')}
                    >
                      <span className="text-lg shrink-0">{r.emoji}</span>
                      <span className="font-body text-body-sm font-medium">{r.label}</span>
                    </button>
                  );
                })}
              </div>
              {selectedRole && firstName.trim() && (
                <p className="text-caption text-secondary-700 font-semibold m-0">
                  ✓ Rôle sélectionné — passage automatique en cours…
                </p>
              )}
            </div>
          </>
        )}

        {/* Step 1 — Goals */}
        {substep === 1 && (
          <>
            <div className="flex flex-col gap-tight">
              <h2 className="font-display text-h2 font-extrabold text-ink-900 m-0 leading-tight">
                Tes objectifs d'apprentissage
              </h2>
              <p className="font-body text-body text-ink-500 m-0">
                Sélectionne tout ce qui te correspond — plusieurs choix possibles.
              </p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-stack-xs">
              {GOALS.map(g => {
                const on = selectedGoals.includes(g.id);
                return (
                  <button
                    key={g.id}
                    onClick={() => toggleGoal(g.id)}
                    className={[
                      tileBase, 'relative',
                      on
                        ? 'bg-secondary-500 border-secondary-500 text-white shadow-sm'
                        : 'bg-white border-ink-100 text-ink-800 hover:border-secondary-300 hover:shadow-xs',
                    ].join(' ')}
                  >
                    <span className="text-lg shrink-0">{g.emoji}</span>
                    <span className="font-body text-body-sm font-medium leading-snug">{g.label}</span>
                    {on && <Check size={12} className="absolute top-2 right-2 opacity-80" />}
                  </button>
                );
              })}
            </div>

            {selectedGoals.length > 0 && (
              <p className="text-caption text-secondary-700 font-semibold m-0">
                {selectedGoals.length} objectif{selectedGoals.length > 1 ? 's' : ''} sélectionné{selectedGoals.length > 1 ? 's' : ''}
              </p>
            )}
          </>
        )}

        {/* Step 2 — Confirmation */}
        {substep === 2 && (
          <>
            <div className="flex flex-col gap-tight">
              <h2 className="font-display text-h2 font-extrabold text-ink-900 m-0 leading-tight">
                {firstName ? `Parfait, ${firstName} !` : 'Ton profil est prêt !'}
              </h2>
              <p className="font-body text-body text-ink-500 m-0">
                Voici un résumé avant de démarrer le positionnement.
              </p>
            </div>

            <div className="rounded-xl border border-ink-100 bg-ink-50 overflow-hidden">
              {[
                { key: 'Rôle',      val: ROLES.find(r => r.id === selectedRole)?.label ?? '—' },
                { key: 'Objectifs', val: selectedGoals.length > 0 ? selectedGoals.join(', ') : '—' },
              ].map(row => (
                <div key={row.key} className="flex justify-between items-center gap-stack px-5 py-3 border-b border-ink-100 last:border-b-0">
                  <span className="font-body text-body-sm font-semibold text-ink-500">{row.key}</span>
                  <span className="font-body text-body-sm text-ink-900 text-right">{row.val}</span>
                </div>
              ))}
            </div>

            <div className="rounded-xl border border-secondary-200 bg-gradient-to-br from-secondary-50 to-white p-4 flex items-start gap-stack-xs">
              <Sparkles size={18} className="text-secondary-500 shrink-0 mt-0.5" />
              <div className="flex flex-col gap-0.5">
                <span className="font-body text-body-sm font-bold text-ink-900">Parcours recommandé</span>
                <p className="font-body text-body-sm text-ink-500 m-0 leading-relaxed">{aiSuggestion}</p>
              </div>
            </div>
          </>
        )}
      </div>

      {/* Footer nav */}
      <div className="flex flex-col sm:flex-row justify-between items-stretch sm:items-center gap-stack-xs px-6 sm:px-8 py-5 border-t border-white/50 bg-white/40 backdrop-blur-glass-light">
        {substep === 0 ? (
          <span />
        ) : (
          <Button
            variant="secondary" size="sm"
            leadingIcon={<ChevronLeft size={14} />}
            onClick={() => setSubstep(s => Math.max(0, s - 1) as CSubstep)}
            className="sm:flex-none flex-1"
          >
            Retour
          </Button>
        )}

        <div className="flex items-center gap-stack-xs flex-1 sm:flex-none justify-between sm:justify-end">
          <span className="font-body text-caption text-ink-400 tabular-nums hidden sm:inline select-none">
            {substep + 1} / {LABELS.length}
          </span>
          {substep < 2 ? (
            <Button
              variant="warm"
              trailingIcon={<ChevronRight size={14} />}
              onClick={() => setSubstep(s => Math.min(2, s + 1) as CSubstep)}
              disabled={substep === 0 ? !canNext0 : !canNext1}
              className="flex-1 sm:flex-none"
            >
              Continuer
            </Button>
          ) : (
            <Button
              variant="warm"
              trailingIcon={<ArrowRight size={16} />}
              onClick={onDone}
              className="flex-1 sm:flex-none"
            >
              Commencer le positionnement
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}

/* ─── Variant switcher ────────────────────────────────────────────────────── */

type Variant = 'a' | 'b' | 'c';

const VARIANT_META: Record<Variant, { label: string; desc: string }> = {
  a: { label: 'Guide IA',  desc: 'Chat conversationnel' },
  b: { label: 'Focus',     desc: 'Plein écran, 1 question à la fois' },
  c: { label: 'Carte+',   desc: 'Carte améliorée, auto-avance' },
};

const VariantSwitcher: React.FC<{ current: Variant; onChange: (v: Variant) => void }> = ({ current, onChange }) => (
  <div
    className="fixed bottom-6 right-5 z-toast flex items-center gap-tight rounded-pill bg-white/90 backdrop-blur-glass-medium border border-white/60 shadow-lg px-2 py-1.5"
    role="group"
    aria-label="Changer de variante"
  >
    <span className="text-micro text-ink-400 px-2 shrink-0 select-none font-body">Variante</span>
    {(['a', 'b', 'c'] as Variant[]).map(v => (
      <button
        key={v}
        type="button"
        onClick={() => onChange(v)}
        aria-pressed={current === v}
        title={VARIANT_META[v].desc}
        className={[
          'rounded-pill px-3 py-1 text-caption font-semibold transition-all duration-200 min-h-[32px] font-body',
          'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500',
          current === v
            ? 'bg-secondary-500 text-white shadow-sm'
            : 'text-ink-500 hover:text-ink-900 hover:bg-ink-50',
        ].join(' ')}
      >
        {VARIANT_META[v].label}
      </button>
    ))}
  </div>
);

/* ─── Main wrapper ────────────────────────────────────────────────────────── */

export default function OnboardingPreview() {
  const [variant, setVariant] = useState<Variant>('a');
  const [done, setDone]       = useState(false);

  // Reset component state when variant switches
  const handleDone = () => setDone(true);

  return (
    <main className="relative min-h-[100dvh] overflow-x-hidden">
      <div className="fixed inset-0 -z-10 bg-gradient-page-ambient-warm" aria-hidden />
      <AmbientBlobs intensity="subtle" />

      <div className="relative z-base max-w-3xl mx-auto w-full px-4 sm:px-6 lg:px-10 pt-section pb-section flex flex-col gap-section-lg">

        {/* Brand bar */}
        <div className="flex items-center justify-between">
          <div className="w-24" />
          <a href="/dashboard" aria-label="The Learning Society" className="focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary-500 rounded-sm">
            <TlsLogo size={36} variant="color" withBubble />
          </a>
          <div className="w-24 flex justify-end">
            <a href="/onboarding" className="font-body text-caption text-ink-500 hover:text-ink-900 transition-colors duration-base focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500 rounded-sm min-h-touch flex items-center">
              Flux réel →
            </a>
          </div>
        </div>

        {/* Preview header */}
        <header className="flex flex-col gap-tight text-center">
          <p className="m-0 inline-flex items-center justify-center gap-stack-xs font-body text-caption font-semibold uppercase tracking-wider text-secondary-600">
            <Sparkles size={14} aria-hidden />
            Comparatif — Variante {variant.toUpperCase()}
          </p>
          <h1 className="m-0 font-display text-h2 font-extrabold tracking-display text-ink-900 leading-tight">
            {VARIANT_META[variant].label}
          </h1>
          <p className="m-0 font-body text-body text-ink-500 leading-relaxed">
            {VARIANT_META[variant].desc}
          </p>
        </header>

        {done ? (
          <div className="rounded-2xl bg-white/75 border border-white/60 p-8 text-center flex flex-col items-center gap-stack">
            <div className="w-14 h-14 rounded-xl bg-success-bg flex items-center justify-center">
              <Check size={28} className="text-success-fg" />
            </div>
            <p className="font-display text-h3 font-bold text-ink-900 m-0">
              Profil complété !
            </p>
            <p className="font-body text-body-sm text-ink-500 m-0">
              → En production : transition vers <code className="bg-ink-100 px-1.5 py-0.5 rounded text-primary-700">/onboarding/questionnaire</code>
            </p>
            <Button variant="secondary" onClick={() => setDone(false)}>
              Retester cette variante
            </Button>
          </div>
        ) : (
          /* key forces full remount on variant switch = clean state */
          <div key={variant}>
            {variant === 'a' && <VariantA onDone={handleDone} />}
            {variant === 'b' && <VariantB onDone={handleDone} />}
            {variant === 'c' && <VariantC onDone={handleDone} />}
          </div>
        )}

        {/* Progress bar — shows where we are in overall onboarding */}
        <div className="flex flex-col gap-tight">
          <div className="flex justify-between text-caption text-ink-400">
            <span>Étape 1 / 4 — Profil</span>
            <span>Positionnement, Paiement, Tutoriel →</span>
          </div>
          <ProgressBar value={25} max={100} fill="warm" size="sm" valueLabel={false} />
        </div>

      </div>

      <VariantSwitcher current={variant} onChange={v => { setVariant(v); setDone(false); }} />
    </main>
  );
}
