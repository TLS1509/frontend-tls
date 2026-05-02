/**
 * WeeklyNewsletter Page — "Actus de la semaine"
 *
 * Design d'après screenshots :
 * - Badge "SEMAINE #08" teal
 * - Grand titre "Actus de la semaine"
 * - Bloc éditorial avec grandes guillemets
 * - "Vidéo de la semaine" : thumbnail gauche + info droite
 * - "À la une" : grille 3 cartes teal/orange
 * - "Toutes les actus" : liste articles avec bookmark
 * - Section newsletter subscribe
 */

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ChevronRight,
  Play,
  Bookmark,
  BookmarkCheck,
  Mail,
  ArrowRight,
  TrendingUp,
  Clock,
  ExternalLink,
} from 'lucide-react';

/* ─── Mock data ──────────────────────────────────────────────────────────── */

const TOP_ARTICLES = [
  {
    id: 'a1',
    category: 'IA & Formation',
    title: "L'IA générative révolutionne la conception pédagogique",
    color: 'var(--tls-primary-500)',
    bg: 'var(--tls-primary-500)',
  },
  {
    id: 'a2',
    category: 'Tendances',
    title: 'Micro-learning : vers des sessions de 5 minutes ultra-ciblées',
    color: 'var(--tls-orange-500)',
    bg: 'var(--tls-orange-500)',
  },
  {
    id: 'a3',
    category: 'Technologie',
    title: 'Les LMS de nouvelle génération intègrent le coaching IA',
    color: 'var(--tls-primary-600)',
    bg: 'var(--tls-primary-600)',
  },
];

const ALL_ARTICLES = [
  {
    id: 'b1',
    date: '28 avril 2026',
    readTime: '4 min',
    title: "Comment mesurer l'impact réel d'une formation en entreprise ?",
    category: 'Évaluation',
  },
  {
    id: 'b2',
    date: '27 avril 2026',
    readTime: '6 min',
    title: 'Prompt engineering pour formateurs : les 10 techniques essentielles',
    category: 'IA Pratique',
  },
  {
    id: 'b3',
    date: '26 avril 2026',
    readTime: '3 min',
    title: "Le feedback immédiat comme levier d'apprentissage accéléré",
    category: 'Pédagogie',
  },
  {
    id: 'b4',
    date: '25 avril 2026',
    readTime: '5 min',
    title: 'Certification professionnelle : quel format pour quel objectif ?',
    category: 'Certification',
  },
];

/* ─── Component ──────────────────────────────────────────────────────────── */

export const WeeklyNewsletter: React.FC = () => {
  const navigate = useNavigate();
  const [savedArticles, setSavedArticles] = useState<Set<string>>(new Set());
  const [email, setEmail] = useState('');

  const toggleSave = (id: string) =>
    setSavedArticles((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });

  return (
    <div
      style={{
        minHeight: '100vh',
        background: 'var(--bg)',
        fontFamily: 'var(--font-body)',
      }}
    >
      {/* ─ Breadcrumb ───────────────────────────────────────────── */}
      <div
        style={{
          padding: 'var(--s-4) var(--s-8)',
          display: 'flex',
          alignItems: 'center',
          gap: 'var(--s-2)',
          fontSize: 'var(--t-sm)',
          color: 'var(--text-muted)',
          borderBottom: '1px solid var(--border)',
        }}
      >
        <span
          style={{ cursor: 'pointer', color: 'var(--tls-primary-600)' }}
          onClick={() => navigate('/veille')}
        >
          Veille
        </span>
        <ChevronRight size={14} />
        <span style={{ color: 'var(--text)', fontWeight: 500 }}>Actus de la semaine</span>
      </div>

      {/* ─ Page Content ─────────────────────────────────────────── */}
      <div
        style={{
          maxWidth: 'var(--container-default)',
          margin: '0 auto',
          padding: 'var(--s-8) var(--s-6) var(--s-12)',
        }}
      >
        {/* ─ Header ────────────────────────────────────────────── */}
        <div style={{ marginBottom: 'var(--s-8)' }}>
          {/* Week badge */}
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 'var(--s-2)',
              padding: 'var(--s-1-5) var(--s-4)',
              borderRadius: 'var(--r-full)',
              background: 'var(--tls-primary-500)',
              color: 'var(--text-inverse)',
              fontSize: 'var(--t-caption)',
              fontWeight: 800,
              letterSpacing: '0.08em',
              marginBottom: 'var(--s-4)',
            }}
          >
            <TrendingUp size={13} />
            SEMAINE #08
          </div>

          <h1
            style={{
              fontSize: 'clamp(2rem, 4vw, 3rem)',
              fontWeight: 800,
              color: 'var(--tls-primary-600)',
              margin: '0 0 var(--s-2)',
              letterSpacing: '-0.03em',
              lineHeight: 1.1,
            }}
          >
            Actus de la semaine
          </h1>
          <p style={{ margin: 0, fontSize: 'var(--t-sm)', color: 'var(--text-muted)' }}>
            Lundi 28 avril 2026 · 4 articles sélectionnés
          </p>
        </div>

        {/* ─ Éditorial ─────────────────────────────────────────── */}
        <div
          style={{
            background: 'var(--tls-primary-50)',
            border: '1px solid var(--tls-primary-200)',
            borderRadius: 'var(--r-2xl)',
            padding: 'var(--s-7)',
            marginBottom: 'var(--s-8)',
            position: 'relative',
          }}
        >
          {/* Big quote mark */}
          <div
            style={{
              fontSize: '80px',
              lineHeight: 0.8,
              color: 'var(--tls-primary-200)',
              fontFamily: 'Georgia, serif',
              marginBottom: 'var(--s-3)',
              userSelect: 'none',
            }}
          >
            "
          </div>
          <p
            style={{
              fontSize: 'var(--t-body)',
              fontStyle: 'italic',
              color: 'var(--text)',
              lineHeight: 1.7,
              margin: '0 0 var(--s-4)',
              fontWeight: 500,
            }}
          >
            Cette semaine, l'IA générative continue de remodeler les pratiques pédagogiques à
            une vitesse remarquable. Entre prompt engineering pour formateurs et micro-learning
            augmenté, le secteur s'adapte — et ceux qui expérimentent maintenant prendront
            une longueur d'avance décisive.
          </p>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 'var(--s-3)',
            }}
          >
            <div
              style={{
                width: '36px',
                height: '36px',
                borderRadius: '50%',
                background: 'var(--tls-primary-500)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'var(--text-inverse)',
                fontSize: 'var(--t-body-sm)',
                fontWeight: 700,
                flexShrink: 0,
              }}
            >
              TLS
            </div>
            <div>
              <div style={{ fontSize: 'var(--t-sm)', fontWeight: 700, color: 'var(--text)' }}>
                L'équipe éditoriale TLS
              </div>
              <div style={{ fontSize: 'var(--t-caption)', color: 'var(--text-muted)' }}>
                L'édito de la semaine
              </div>
            </div>
          </div>
        </div>

        {/* ─ Vidéo de la semaine ───────────────────────────────── */}
        <div style={{ marginBottom: 'var(--s-10)' }}>
          <h2
            style={{
              fontSize: 'var(--t-h3)',
              fontWeight: 800,
              color: 'var(--text)',
              margin: '0 0 var(--s-4)',
            }}
          >
            Vidéo de la semaine
          </h2>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              borderRadius: 'var(--r-2xl)',
              overflow: 'hidden',
              border: '1px solid var(--overlay-dark-md)',
              boxShadow: 'var(--shadow-md)',
            }}
          >
            {/* Left: video thumbnail */}
            <div
              style={{
                background: 'linear-gradient(135deg, var(--tls-ink-950) 0%, var(--tls-ink-900) 50%, var(--tls-ink-800) 100%)',
                minHeight: '200px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                position: 'relative',
                cursor: 'pointer',
              }}
              onClick={() => navigate('/veille/video-tutorial/1')}
            >
              <div
                style={{
                  width: '52px',
                  height: '52px',
                  borderRadius: '50%',
                  background: 'var(--overlay-white-md)',
                  border: '2px solid var(--overlay-white-lg)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  backdropFilter: 'blur(8px)',
                }}
              >
                <Play size={20} fill="var(--text-inverse)" color="var(--text-inverse)" style={{ marginLeft: '3px' }} />
              </div>
              <div
                style={{
                  position: 'absolute',
                  bottom: '12px',
                  right: '12px',
                  background: 'var(--overlay-black-md)',
                  color: 'var(--text-inverse)',
                  fontSize: 'var(--t-caption)',
                  fontWeight: 700,
                  padding: 'var(--s-1) var(--s-2)',
                  borderRadius: 'var(--r-lg)',
                }}
              >
                12:34
              </div>
            </div>

            {/* Right: info */}
            <div
              style={{
                background: 'var(--surface)',
                padding: 'var(--s-6)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
              }}
            >
              <div>
                <span
                  style={{
                    display: 'inline-block',
                    padding: 'var(--s-1) var(--s-3)',
                    borderRadius: 'var(--r-full)',
                    background: 'var(--tls-orange-50)',
                    color: 'var(--tls-orange-600)',
                    fontSize: 'var(--t-caption)',
                    fontWeight: 700,
                    marginBottom: 'var(--s-3)',
                  }}
                >
                  Tutoriel Vidéo
                </span>
                <h3
                  style={{
                    fontSize: 'var(--t-body)',
                    fontWeight: 700,
                    color: 'var(--text)',
                    margin: '0 0 var(--s-3)',
                    lineHeight: 1.4,
                  }}
                >
                  Construire un prompt structuré en 5 étapes
                </h3>
                <p
                  style={{
                    fontSize: 'var(--t-sm)',
                    color: 'var(--text-muted)',
                    margin: '0 0 var(--s-4)',
                    lineHeight: 1.5,
                  }}
                >
                  Séquence pratique orientée exécution : cadrage, exemples, validation et
                  itération sur des cas réels de formation.
                </p>
              </div>
              <button
                type="button"
                onClick={() => navigate('/veille/video-tutorial/1')}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 'var(--s-2)',
                  padding: 'var(--btn-padding-md-sm)',
                  borderRadius: 'var(--r-full)',
                  background: 'var(--tls-primary-500)',
                  border: 'none',
                  color: 'var(--text-inverse)',
                  fontWeight: 700,
                  fontSize: 'var(--t-sm)',
                  cursor: 'pointer',
                  fontFamily: 'var(--font-body)',
                  transition: 'background 0.2s',
                  alignSelf: 'flex-start',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.background = 'var(--tls-primary-600)')}
                onMouseLeave={(e) => (e.currentTarget.style.background = 'var(--tls-primary-500)')}
              >
                <Play size={14} fill="var(--text-inverse)" />
                Regarder maintenant
              </button>
            </div>
          </div>
        </div>

        {/* ─ À la une ──────────────────────────────────────────── */}
        <div style={{ marginBottom: 'var(--s-10)' }}>
          <h2
            style={{
              fontSize: 'var(--t-h3)',
              fontWeight: 800,
              color: 'var(--text)',
              margin: '0 0 var(--s-4)',
            }}
          >
            À la une
          </h2>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: 'var(--s-4)',
            }}
          >
            {TOP_ARTICLES.map((article) => (
              <div
                key={article.id}
                style={{
                  borderRadius: 'var(--r-2xl)',
                  overflow: 'hidden',
                  border: '1px solid var(--overlay-dark-md)',
                  boxShadow: 'var(--shadow-sm)',
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-3px)';
                  e.currentTarget.style.boxShadow = 'var(--shadow-md)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = 'var(--shadow-sm)';
                }}
                onClick={() => navigate('/veille/weekly-news/1')}
              >
                {/* Color header */}
                <div
                  style={{
                    height: '100px',
                    background: article.bg,
                    display: 'flex',
                    alignItems: 'flex-end',
                    padding: 'var(--s-3)',
                  }}
                >
                  <span
                    style={{
                      padding: 'var(--s-1) var(--s-2-5)',
                      borderRadius: 'var(--r-full)',
                      background: 'var(--overlay-white-xs)',
                      color: 'var(--text-inverse)',
                      fontSize: 'var(--t-micro)',
                      fontWeight: 700,
                      backdropFilter: 'blur(4px)',
                    }}
                  >
                    {article.category}
                  </span>
                </div>

                {/* Body */}
                <div style={{ padding: 'var(--s-4)', background: 'var(--surface)' }}>
                  <p
                    style={{
                      fontSize: 'var(--t-sm)',
                      fontWeight: 700,
                      color: 'var(--text)',
                      margin: '0 0 var(--s-3)',
                      lineHeight: 1.4,
                    }}
                  >
                    {article.title}
                  </p>
                  <span
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: 'var(--s-1)',
                      fontSize: 'var(--t-caption)',
                      color: 'var(--tls-primary-600)',
                      fontWeight: 600,
                    }}
                  >
                    Lire l'article <ArrowRight size={12} />
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ─ Toutes les actus ──────────────────────────────────── */}
        <div style={{ marginBottom: 'var(--s-10)' }}>
          <h2
            style={{
              fontSize: 'var(--t-h3)',
              fontWeight: 800,
              color: 'var(--text)',
              margin: '0 0 var(--s-4)',
            }}
          >
            Toutes les actus
          </h2>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--s-3)' }}>
            {ALL_ARTICLES.map((article) => {
              const isSaved = savedArticles.has(article.id);
              return (
                <div
                  key={article.id}
                  style={{
                    background: 'var(--surface)',
                    border: '1px solid var(--border)',
                    borderRadius: 'var(--r-xl)',
                    padding: 'var(--s-4) var(--s-5)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 'var(--s-4)',
                    boxShadow: 'var(--shadow-xs)',
                    cursor: 'pointer',
                    transition: 'all 0.15s',
                  }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.boxShadow = 'var(--shadow-md)')
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.boxShadow = 'var(--shadow-xs)')
                  }
                  onClick={() => navigate('/veille/weekly-news/1')}
                >
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 'var(--s-3)',
                        marginBottom: 'var(--s-1)',
                      }}
                    >
                      <span
                        style={{
                          fontSize: 'var(--t-micro)',
                          fontWeight: 700,
                          color: 'var(--tls-primary-600)',
                          textTransform: 'uppercase',
                          letterSpacing: '0.06em',
                        }}
                      >
                        {article.category}
                      </span>
                      <span
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: 'var(--s-1)',
                          fontSize: 'var(--t-caption)',
                          color: 'var(--text-muted)',
                        }}
                      >
                        <Clock size={11} />
                        {article.readTime}
                      </span>
                    </div>
                    <p
                      style={{
                        fontSize: 'var(--t-sm)',
                        fontWeight: 600,
                        color: 'var(--text)',
                        margin: '0 0 var(--s-1)',
                        lineHeight: 1.4,
                      }}
                    >
                      {article.title}
                    </p>
                    <span style={{ fontSize: 'var(--t-caption)', color: 'var(--text-muted)' }}>
                      {article.date}
                    </span>
                  </div>

                  {/* Actions */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--s-2)' }}>
                    <button
                      type="button"
                      onClick={(ev) => {
                        ev.stopPropagation();
                        toggleSave(article.id);
                      }}
                      style={{
                        width: '32px',
                        height: '32px',
                        borderRadius: 'var(--r-lg)',
                        background: isSaved ? 'var(--tls-primary-50)' : 'var(--surface-muted)',
                        border: isSaved
                          ? '1px solid var(--overlay-brand-xl)'
                          : '1px solid var(--border)',
                        color: isSaved ? 'var(--tls-primary-600)' : 'var(--text-muted)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        cursor: 'pointer',
                        flexShrink: 0,
                        transition: 'all 0.15s',
                      }}
                    >
                      {isSaved ? <BookmarkCheck size={14} /> : <Bookmark size={14} />}
                    </button>
                    <ArrowRight size={16} style={{ color: 'var(--tls-primary-400)', flexShrink: 0 }} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* ─ Newsletter subscribe ───────────────────────────────── */}
        <div
          style={{
            background: 'var(--tls-primary-500)',
            borderRadius: 'var(--r-2xl)',
            padding: 'var(--s-8)',
            textAlign: 'center',
          }}
        >
          <div
            style={{
              width: '52px',
              height: '52px',
              borderRadius: '50%',
              background: 'var(--overlay-white-xs)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto var(--s-4)',
            }}
          >
            <Mail size={24} color="var(--text-inverse)" />
          </div>
          <h3
            style={{
              fontSize: 'var(--t-h3)',
              fontWeight: 800,
              color: 'var(--text-inverse)',
              margin: '0 0 var(--s-2)',
            }}
          >
            Recevez les actus chaque lundi
          </h3>
          <p
            style={{
              fontSize: 'var(--t-sm)',
              color: 'var(--overlay-white-xl)',
              margin: '0 0 var(--s-5)',
            }}
          >
            La sélection hebdomadaire TLS directement dans votre boîte mail.
          </p>
          <div
            style={{
              display: 'flex',
              gap: 'var(--s-2)',
              maxWidth: '440px',
              margin: '0 auto',
            }}
          >
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="votre@email.com"
              style={{
                flex: 1,
                padding: 'var(--s-3) var(--s-4-5)',
                borderRadius: 'var(--r-full)',
                border: 'none',
                background: 'var(--glass-fill-premium)',
                fontSize: 'var(--t-sm)',
                color: 'var(--text)',
                outline: 'none',
                fontFamily: 'var(--font-body)',
              }}
            />
            <button
              type="button"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 'var(--s-2)',
                padding: 'var(--s-3) var(--s-6)',
                borderRadius: 'var(--r-full)',
                background: 'var(--tls-orange-500)',
                border: 'none',
                color: 'var(--text-inverse)',
                fontWeight: 700,
                fontSize: 'var(--t-sm)',
                cursor: 'pointer',
                fontFamily: 'var(--font-body)',
                whiteSpace: 'nowrap',
                transition: 'background 0.2s',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.background = 'var(--tls-orange-600)')}
              onMouseLeave={(e) => (e.currentTarget.style.background = 'var(--tls-orange-500)')}
            >
              <ExternalLink size={14} />
              S'abonner
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
