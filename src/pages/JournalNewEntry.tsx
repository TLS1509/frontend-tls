/**
 * JournalNewEntry Page
 *
 * Design exact d'après screenshots :
 * - Header sticky : back arrow + "Nouvelle entrée" + date + word count + Publier
 * - Sélecteur de type : 4 cards (Réflexion Libre, Apprentissage, Session Coaching, Moment Eurêka)
 * - Chaque type a sa propre couleur, icône, question de réflexion, et placeholder
 * - "Besoin d'inspiration ?" pill
 * - Zone d'écriture : question colorée + input titre + textarea corps
 */

import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ArrowLeft,
  Sparkles,
  BookOpen,
  Target,
  Lightbulb,
  CheckCircle2,
  Wand2,
  Save,
  Clock,
} from 'lucide-react';

/* ─── Type config ────────────────────────────────────────────────────────── */

type EntryType = 'reflexion-libre' | 'apprentissage' | 'session-coaching' | 'moment-eureka';

interface TypeConfig {
  label: string;
  icon: React.ReactNode;
  color: string;         // border + checkmark + question color
  checkBg: string;       // checkmark circle bg
  cardBgTint: string;    // subtle tint on writing area
  question: string;
  bodyPlaceholder: string;
}

const TYPE_CONFIG: Record<EntryType, TypeConfig> = {
  'reflexion-libre': {
    label: 'Réflexion Libre',
    icon: <Sparkles size={28} strokeWidth={1.5} />,
    color: 'var(--tls-primary-500)',
    checkBg: 'var(--tls-primary-500)',
    cardBgTint: 'transparent',
    question: "Qu'est-ce qui occupe mon esprit aujourd'hui ?",
    bodyPlaceholder: 'Écrivez librement vos pensées, réflexions, découvertes du jour...',
  },
  'apprentissage': {
    label: 'Apprentissage',
    icon: <BookOpen size={28} strokeWidth={1.5} />,
    color: 'var(--tls-orange-500)',
    checkBg: 'var(--tls-orange-500)',
    cardBgTint: 'linear-gradient(135deg, var(--surface) 70%, var(--tls-orange-50) 100%)',
    question: "Qu'ai-je appris aujourd'hui ?",
    bodyPlaceholder: "Décrivez ce que vous avez découvert, compris ou expérimenté dans vos cours...",
  },
  'session-coaching': {
    label: 'Session Coaching',
    icon: <Target size={28} strokeWidth={1.5} />,
    color: 'var(--tls-orange-500)',
    checkBg: 'var(--tls-orange-500)',
    cardBgTint: 'linear-gradient(135deg, var(--surface) 70%, var(--tls-orange-50) 100%)',
    question: 'Quels insights ai-je tirés de ma session ?',
    bodyPlaceholder: 'Notez les prises de conscience, actions à mettre en place, objectifs clarifiés...',
  },
  'moment-eureka': {
    label: 'Moment Eurêka',
    icon: <Lightbulb size={28} strokeWidth={1.5} />,
    color: 'var(--tls-primary-500)',
    checkBg: 'var(--tls-primary-500)',
    cardBgTint: 'transparent',
    question: "Quelle idée m'a illuminé ?",
    bodyPlaceholder: "Capturez cette idée brillante avant qu'elle ne s'envole...",
  },
};

const TYPE_ORDER: EntryType[] = [
  'reflexion-libre',
  'apprentissage',
  'session-coaching',
  'moment-eureka',
];

const TODAY = new Date().toLocaleDateString('fr-FR', {
  weekday: 'long',
  day: 'numeric',
  month: 'long',
});

/* ─── Component ──────────────────────────────────────────────────────────── */

export const JournalNewEntry: React.FC = () => {
  const navigate = useNavigate();
  const [selectedType, setSelectedType] = useState<EntryType>('reflexion-libre');
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');

  const wordCount = useMemo(() => {
    const text = `${title} ${body}`.trim();
    if (!text) return 0;
    return text.split(/\s+/).filter(Boolean).length;
  }, [title, body]);

  const cfg = TYPE_CONFIG[selectedType];

  return (
    <div
      style={{
        minHeight: '100vh',
        background: 'var(--bg)',
        fontFamily: 'var(--font-body)',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {/* ─ Top bar ──────────────────────────────────────────────────── */}
      <header
        style={{
          display: 'flex',
          alignItems: 'center',
          padding: 'var(--s-4) var(--s-6)',
          borderBottom: '1px solid var(--border)',
          background: 'var(--surface)',
          position: 'sticky',
          top: 0,
          zIndex: 10,
          gap: 'var(--s-3)',
        }}
      >
        {/* Back */}
        <button
          type="button"
          onClick={() => navigate('/journal')}
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '36px',
            height: '36px',
            borderRadius: 'var(--r-lg)',
            background: 'transparent',
            border: 'none',
            color: 'var(--text-muted)',
            cursor: 'pointer',
            flexShrink: 0,
          }}
          onMouseEnter={(e) => (e.currentTarget.style.background = 'var(--surface-muted)')}
          onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
        >
          <ArrowLeft size={20} />
        </button>

        {/* Title + date */}
        <div style={{ flex: 1, minWidth: 0 }}>
          <div
            style={{
              fontSize: 'var(--t-body)',
              fontWeight: 700,
              color: 'var(--text)',
              lineHeight: 1.2,
            }}
          >
            Nouvelle entrée
          </div>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 'var(--s-1)',
              color: 'var(--text-muted)',
              fontSize: 'var(--t-caption)',
            }}
          >
            <Clock size={12} />
            {TODAY}
          </div>
        </div>

        {/* Word count */}
        <span
          style={{
            fontSize: 'var(--t-caption)',
            color: 'var(--text-muted)',
            fontWeight: 500,
            flexShrink: 0,
          }}
        >
          {wordCount} mot{wordCount !== 1 ? 's' : ''}
        </span>

        {/* Publish button */}
        <button
          type="button"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 'var(--s-2)',
            padding: 'var(--s-2-5) var(--s-5)',
            borderRadius: 'var(--r-xl)',
            background: 'var(--tls-primary-500)',
            border: 'none',
            color: 'var(--text-inverse)',
            fontWeight: 700,
            fontSize: 'var(--t-sm)',
            cursor: 'pointer',
            fontFamily: 'var(--font-body)',
            transition: 'background var(--dur-2)',
            flexShrink: 0,
          }}
          onMouseEnter={(e) => (e.currentTarget.style.background = 'var(--tls-primary-600)')}
          onMouseLeave={(e) => (e.currentTarget.style.background = 'var(--tls-primary-500)')}
        >
          <Save size={15} />
          Publier
        </button>
      </header>

      {/* ─ Content ──────────────────────────────────────────────────── */}
      <main
        style={{
          flex: 1,
          maxWidth: 'var(--container-narrow)',
          width: '100%',
          margin: '0 auto',
          padding: 'var(--s-8) var(--s-6)',
        }}
      >
        {/* ─ Type selector ─────────────────────────────────────────── */}
        <div style={{ marginBottom: 'var(--s-6)' }}>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 'var(--s-2)',
              marginBottom: 'var(--s-4)',
            }}
          >
            <Wand2 size={16} style={{ color: 'var(--tls-primary-500)' }} />
            <span
              style={{
                fontSize: 'var(--t-sm)',
                fontWeight: 600,
                color: 'var(--text)',
              }}
            >
              Type d'entrée
            </span>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(4, 1fr)',
              gap: 'var(--s-3)',
            }}
          >
            {TYPE_ORDER.map((type) => {
              const tc = TYPE_CONFIG[type];
              const isSelected = selectedType === type;
              return (
                <button
                  key={type}
                  type="button"
                  onClick={() => setSelectedType(type)}
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'flex-start',
                    gap: 'var(--s-3)',
                    padding: 'var(--s-4)',
                    borderRadius: 'var(--r-xl)',
                    background: 'var(--surface)',
                    border: isSelected
                      ? `1.5px solid ${tc.color}`
                      : '1.5px solid var(--border)',
                    cursor: 'pointer',
                    position: 'relative',
                    transition: 'all var(--dur-2)',
                    fontFamily: 'var(--font-body)',
                    textAlign: 'left',
                    boxShadow: isSelected
                      ? 'var(--shadow-sm)'
                      : 'var(--shadow-xs)',
                  }}
                  onMouseEnter={(e) => {
                    if (!isSelected) e.currentTarget.style.borderColor = 'var(--border-strong)';
                  }}
                  onMouseLeave={(e) => {
                    if (!isSelected) e.currentTarget.style.borderColor = 'var(--border)';
                  }}
                >
                  {/* Checkmark badge */}
                  {isSelected && (
                    <div
                      style={{
                        position: 'absolute',
                        top: '10px',
                        right: '10px',
                        width: '22px',
                        height: '22px',
                        borderRadius: '50%',
                        background: tc.checkBg,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      <CheckCircle2 size={14} color="var(--on-color-text-main)" strokeWidth={2.5} />
                    </div>
                  )}

                  {/* Icon */}
                  <span style={{ color: isSelected ? tc.color : 'var(--text-muted)' }}>
                    {tc.icon}
                  </span>

                  {/* Label */}
                  <span
                    style={{
                      fontSize: 'var(--t-sm)',
                      fontWeight: isSelected ? 600 : 500,
                      color: isSelected ? 'var(--text)' : 'var(--text-muted)',
                      lineHeight: 1.3,
                    }}
                  >
                    {tc.label}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* ─ Inspiration button ─────────────────────────────────────── */}
        <div style={{ marginBottom: 'var(--s-6)' }}>
          <button
            type="button"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 'var(--s-2)',
              padding: 'var(--s-2) var(--s-4-5)',
              borderRadius: 'var(--r-full)',
              background: 'var(--tls-orange-50)',
              border: '1px solid var(--tls-orange-200)',
              color: 'var(--tls-orange-600)',
              fontSize: 'var(--t-sm)',
              fontWeight: 600,
              cursor: 'pointer',
              fontFamily: 'var(--font-body)',
              transition: 'all var(--dur-2)',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.background = 'var(--tls-orange-100)')}
            onMouseLeave={(e) => (e.currentTarget.style.background = 'var(--tls-orange-50)')}
          >
            <Sparkles size={15} />
            Besoin d'inspiration ?
          </button>
        </div>

        {/* ─ Writing area ──────────────────────────────────────────── */}
        <div
          style={{
            background: cfg.cardBgTint || 'var(--surface)',
            border: '1px solid var(--border)',
            borderRadius: 'var(--r-2xl)',
            padding: 'var(--s-7)',
            boxShadow: 'var(--shadow-sm)',
          }}
        >
          {/* Reflection question */}
          <div style={{ marginBottom: 'var(--s-6)' }}>
            <p
              style={{
                margin: '0 0 var(--s-1)',
                fontSize: 'var(--t-caption)',
                color: 'var(--text-muted)',
                fontWeight: 500,
              }}
            >
              Question de réflexion
            </p>
            <p
              style={{
                margin: 0,
                fontSize: 'var(--t-body)',
                fontWeight: 600,
                color: cfg.color,
                lineHeight: 1.4,
              }}
            >
              {cfg.question}
            </p>
          </div>

          {/* Divider */}
          <div
            style={{
              height: '1px',
              background: 'var(--border)',
              marginBottom: 'var(--s-5)',
            }}
          />

          {/* Title input */}
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Donnez un titre à votre entrée..."
            style={{
              width: '100%',
              border: 'none',
              outline: 'none',
              background: 'transparent',
              fontSize: '1.5rem',
              fontWeight: 600,
              color: 'var(--text)',
              fontFamily: 'var(--font-body)',
              marginBottom: 'var(--s-3)',
              boxSizing: 'border-box',
            }}
          />

          {/* Thin separator */}
          <div
            style={{
              height: '1px',
              background: 'var(--border)',
              marginBottom: 'var(--s-5)',
            }}
          />

          {/* Body textarea */}
          <textarea
            value={body}
            onChange={(e) => setBody(e.target.value)}
            placeholder={cfg.bodyPlaceholder}
            rows={12}
            style={{
              width: '100%',
              border: 'none',
              outline: 'none',
              background: 'transparent',
              fontSize: 'var(--t-body)',
              color: 'var(--text)',
              fontFamily: 'var(--font-body)',
              lineHeight: 1.7,
              resize: 'none',
              boxSizing: 'border-box',
            }}
          />
        </div>
      </main>
    </div>
  );
};
