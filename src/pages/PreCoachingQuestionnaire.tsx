/**
 * Pre-Coaching Questionnaire
 *
 * Design exact d'après screenshots : "Préparez votre session"
 * 3 étapes verticales avec cercle icon + carte blanche + textarea
 * Bouton "Envoyer mes réponses" centré en bas
 */

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ChevronLeft,
  Target,
  Lightbulb,
  Compass,
  Send,
} from 'lucide-react';

/* ─── Step config ────────────────────────────────────────────────────────── */

const STEPS = [
  {
    id: 'objectifs',
    step: 'ÉTAPE 1',
    label: 'VOS OBJECTIFS',
    icon: <Target size={22} />,
    question: 'Quels sont vos objectifs principaux pour cette session de coaching ?',
    placeholder: 'Décrivez en détail vos attentes et ce que vous souhaitez accomplir...',
  },
  {
    id: 'defis',
    step: 'ÉTAPE 2',
    label: 'VOS DÉFIS',
    icon: <Lightbulb size={22} />,
    question: 'Quels défis ou obstacles rencontrez-vous actuellement ?',
    placeholder: 'Partagez les difficultés que vous rencontrez dans votre parcours...',
  },
  {
    id: 'sujets',
    step: 'ÉTAPE 3',
    label: 'SUJETS PRIORITAIRES',
    icon: <Compass size={22} />,
    question: 'Y a-t-il des sujets spécifiques que vous aimeriez aborder ?',
    placeholder: 'Listez les thématiques prioritaires que vous souhaitez traiter...',
  },
];

/* ─── Component ──────────────────────────────────────────────────────────── */

export const PreCoachingQuestionnaire: React.FC = () => {
  const navigate = useNavigate();
  const [answers, setAnswers] = useState<Record<string, string>>({
    objectifs: '',
    defis: '',
    sujets: '',
  });

  const setAnswer = (id: string, value: string) =>
    setAnswers((prev) => ({ ...prev, [id]: value }));

  const isComplete = Object.values(answers).some((v) => v.trim().length > 0);

  const handleSubmit = () => {
    navigate('/coaching/pre-questionnaire/response');
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        background: '#fff',
        fontFamily: 'var(--font-body)',
        padding: 'var(--s-6) var(--s-8)',
      }}
    >
      <div style={{ maxWidth: 'var(--container-narrow)', margin: '0 auto' }}>

        {/* ─ Back button ─────────────────────────────────────────────── */}
        <div style={{ marginBottom: 'var(--s-8)' }}>
          <button
            type="button"
            onClick={() => navigate('/coaching')}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 'var(--s-1)',
              padding: 'var(--btn-padding-sm)',
              borderRadius: 'var(--r-full)',
              background: 'var(--surface)',
              border: '1px solid var(--border)',
              color: 'var(--text)',
              fontSize: 'var(--t-sm)',
              fontWeight: 500,
              cursor: 'pointer',
              fontFamily: 'var(--font-body)',
              transition: 'all var(--dur-2)',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.background = 'var(--surface-muted)')}
            onMouseLeave={(e) => (e.currentTarget.style.background = 'var(--surface)')}
          >
            <ChevronLeft size={16} />
            Retour
          </button>
        </div>

        {/* ─ Header ──────────────────────────────────────────────────── */}
        <div style={{ textAlign: 'center', marginBottom: 'var(--s-10)' }}>
          <h1
            style={{
              fontSize: 'clamp(1.75rem, 3vw, 2.25rem)',
              fontWeight: 800,
              color: 'var(--text)',
              margin: '0 0 var(--s-2)',
              letterSpacing: '-0.02em',
            }}
          >
            Préparez votre session
          </h1>
          <p style={{ fontSize: 'var(--t-body)', color: 'var(--text-muted)', margin: 0 }}>
            Répondez à ces 3 questions pour une session sur-mesure
          </p>
        </div>

        {/* ─ Steps ───────────────────────────────────────────────────── */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--s-5)' }}>
          {STEPS.map((step) => (
            <div
              key={step.id}
              style={{
                display: 'flex',
                gap: 'var(--s-4)',
                alignItems: 'flex-start',
              }}
            >
              {/* Circle icon */}
              <div
                style={{
                  width: '48px',
                  height: '48px',
                  borderRadius: '50%',
                  background: 'var(--surface-muted)',
                  border: '1.5px solid var(--border)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'var(--text-muted)',
                  flexShrink: 0,
                  marginTop: 'var(--s-4)',
                }}
              >
                {step.icon}
              </div>

              {/* Card */}
              <div
                style={{
                  flex: 1,
                  background: '#fff',
                  border: '1px solid rgba(0,0,0,0.09)',
                  borderRadius: 'var(--r-2xl)',
                  padding: 'var(--s-6)',
                  boxShadow: '0 2px 12px rgba(0,0,0,0.05)',
                }}
              >
                {/* Step label */}
                <p
                  style={{
                    margin: '0 0 var(--s-1)',
                    fontSize: 'var(--t-caption)',
                    fontWeight: 700,
                    color: 'var(--tls-primary-600)',
                    letterSpacing: '0.07em',
                    textTransform: 'uppercase',
                  }}
                >
                  {step.step} • {step.label}
                </p>

                {/* Question */}
                <p
                  style={{
                    margin: '0 0 var(--s-4)',
                    fontSize: 'var(--t-body)',
                    fontWeight: 700,
                    color: 'var(--text)',
                    lineHeight: 1.4,
                  }}
                >
                  {step.question}
                </p>

                {/* Textarea */}
                <textarea
                  rows={5}
                  value={answers[step.id]}
                  onChange={(e) => setAnswer(step.id, e.target.value)}
                  placeholder={step.placeholder}
                  style={{
                    width: '100%',
                    padding: 'var(--s-4)',
                    borderRadius: 'var(--r-xl)',
                    border: '1px solid var(--border)',
                    background: 'var(--surface-muted)',
                    color: 'var(--text)',
                    fontSize: 'var(--t-sm)',
                    lineHeight: 1.65,
                    resize: 'vertical',
                    outline: 'none',
                    fontFamily: 'var(--font-body)',
                    boxSizing: 'border-box',
                    transition: 'border-color var(--dur-2)',
                  }}
                  onFocus={(e) => (e.currentTarget.style.borderColor = 'var(--tls-primary-400)')}
                  onBlur={(e) => (e.currentTarget.style.borderColor = 'var(--border)')}
                />
              </div>
            </div>
          ))}
        </div>

        {/* ─ Submit button ────────────────────────────────────────────── */}
        <div style={{ textAlign: 'center', marginTop: 'var(--s-10)' }}>
          <button
            type="button"
            onClick={handleSubmit}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 'var(--s-2)',
              padding: 'var(--btn-padding-lg)',
              borderRadius: 'var(--r-full)',
              background: isComplete
                ? 'var(--tls-primary-500)'
                : 'rgba(85,161,180,0.35)',
              border: 'none',
              color: 'var(--text-inverse)',
              fontSize: 'var(--t-body)',
              fontWeight: 700,
              cursor: isComplete ? 'pointer' : 'not-allowed',
              fontFamily: 'var(--font-body)',
              transition: 'all var(--dur-2)',
              boxShadow: isComplete
                ? '0 4px 16px rgba(85,161,180,0.3)'
                : 'none',
            }}
            onMouseEnter={(e) => {
              if (isComplete) e.currentTarget.style.background = 'var(--tls-primary-600)';
            }}
            onMouseLeave={(e) => {
              if (isComplete) e.currentTarget.style.background = 'var(--tls-primary-500)';
            }}
          >
            <Send size={18} />
            Envoyer mes réponses
          </button>
        </div>

      </div>
    </div>
  );
};
