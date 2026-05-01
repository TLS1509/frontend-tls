/**
 * Magazine Page
 *
 * Design d'après screenshots :
 * - Hero plein écran sombre (photo overlay) avec titre + date
 * - "Synthèse Exécutive" carte blanche
 * - "Sommaire du magazine" carte avec header orange + liste numérotée teal/orange
 */

import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ChevronRight,
  BookOpen,
  Download,
  ArrowRight,
  CalendarDays,
  FileText,
} from 'lucide-react';

/* ─── Mock data ──────────────────────────────────────────────────────────── */

const SOMMAIRE = [
  {
    num: '01',
    title: "L'IA générative redéfinit la conception pédagogique",
    pages: 'pp. 4–12',
    color: 'var(--tls-primary-500)',
  },
  {
    num: '02',
    title: 'Micro-learning et neurosciences : ce que la science dit vraiment',
    pages: 'pp. 14–22',
    color: 'var(--tls-orange-500)',
  },
  {
    num: '03',
    title: "Portrait : 10 formateurs qui transforment leur pratique avec l'IA",
    pages: 'pp. 24–30',
    color: 'var(--tls-orange-600)',
  },
  {
    num: '04',
    title: 'Outils du moment : comparatif des LMS nouvelle génération',
    pages: 'pp. 32–40',
    color: 'var(--tls-primary-600)',
  },
  {
    num: '05',
    title: 'Tendances 2026 : ce qui va changer dans la formation professionnelle',
    pages: 'pp. 42–50',
    color: 'var(--tls-orange-500)',
  },
  {
    num: '06',
    title: 'Tribune libre : quel futur pour le métier de formateur ?',
    pages: 'pp. 52–56',
    color: 'var(--tls-primary-500)',
  },
];

/* ─── Component ──────────────────────────────────────────────────────────── */

export const Magazine: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div
      style={{
        minHeight: '100vh',
        background: '#fff',
        fontFamily: 'var(--font-body)',
      }}
    >
      {/* ─ Full-bleed dark hero ─────────────────────────────────── */}
      <div
        style={{
          position: 'relative',
          minHeight: '480px',
          background: 'linear-gradient(160deg, #0a0a1a 0%, #1a1a2e 40%, #0f2a3d 70%, #1a3a4a 100%)',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          overflow: 'hidden',
        }}
      >
        {/* Decorative blobs */}
        <div
          style={{
            position: 'absolute',
            top: '-80px',
            right: '-80px',
            width: '400px',
            height: '400px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(85,161,180,0.18) 0%, transparent 70%)',
            pointerEvents: 'none',
          }}
        />
        <div
          style={{
            position: 'absolute',
            bottom: '-60px',
            left: '-60px',
            width: '350px',
            height: '350px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(237,132,58,0.12) 0%, transparent 70%)',
            pointerEvents: 'none',
          }}
        />

        {/* Breadcrumb */}
        <div
          style={{
            padding: 'var(--s-5) var(--s-8)',
            display: 'flex',
            alignItems: 'center',
            gap: 'var(--s-2)',
            fontSize: 'var(--t-sm)',
            color: 'rgba(255,255,255,0.6)',
            position: 'relative',
            zIndex: 2,
          }}
        >
          <span
            style={{ cursor: 'pointer', color: 'rgba(255,255,255,0.8)' }}
            onClick={() => navigate('/veille')}
          >
            Veille
          </span>
          <ChevronRight size={14} />
          <span style={{ color: 'rgba(255,255,255,0.9)', fontWeight: 500 }}>Magazine</span>
        </div>

        {/* Hero content */}
        <div
          style={{
            padding: 'var(--s-6) var(--s-8) var(--s-10)',
            position: 'relative',
            zIndex: 2,
          }}
        >
          {/* Magazine label */}
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 'var(--s-2)',
              padding: 'var(--s-1) var(--s-3-5)',
              borderRadius: 'var(--r-full)',
              background: 'rgba(255,255,255,0.12)',
              border: '1px solid rgba(255,255,255,0.2)',
              color: 'rgba(255,255,255,0.9)',
              fontSize: 'var(--t-caption)',
              fontWeight: 700,
              letterSpacing: '0.1em',
              marginBottom: 'var(--s-5)',
              backdropFilter: 'blur(8px)',
            }}
          >
            <BookOpen size={13} />
            MAGAZINE TLS · ÉDITION PRINTEMPS 2026
          </div>

          <h1
            style={{
              fontSize: 'clamp(2.25rem, 5vw, 3.5rem)',
              fontWeight: 900,
              color: 'var(--text-inverse)',
              margin: '0 0 var(--s-4)',
              letterSpacing: '-0.03em',
              lineHeight: 1.05,
              maxWidth: 'var(--container-narrow)',
            }}
          >
            L'IA au Cœur de la Formation
          </h1>
          <p
            style={{
              fontSize: 'var(--t-body)',
              color: 'rgba(255,255,255,0.7)',
              margin: '0 0 var(--s-5)',
              maxWidth: '540px',
              lineHeight: 1.6,
            }}
          >
            56 pages de recherches, portraits, analyses et tendances pour transformer vos
            pratiques pédagogiques en 2026.
          </p>

          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 'var(--s-5)',
            }}
          >
            <span
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 'var(--s-2)',
                color: 'rgba(255,255,255,0.6)',
                fontSize: 'var(--t-sm)',
              }}
            >
              <CalendarDays size={14} />
              Avril 2026
            </span>
            <span
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 'var(--s-2)',
                color: 'rgba(255,255,255,0.6)',
                fontSize: 'var(--t-sm)',
              }}
            >
              <FileText size={14} />
              56 pages
            </span>
          </div>
        </div>
      </div>

      {/* ─ Below hero ───────────────────────────────────────────── */}
      <div
        style={{
          maxWidth: 'var(--container-default)',
          margin: '0 auto',
          padding: 'var(--s-8) var(--s-6) var(--s-12)',
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: 'var(--s-6)',
          alignItems: 'start',
        }}
      >
        {/* ─ Synthèse Exécutive ──────────────────────────────── */}
        <div
          style={{
            background: '#fff',
            border: '1px solid rgba(0,0,0,0.08)',
            borderRadius: 'var(--r-2xl)',
            padding: 'var(--s-6)',
            boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 'var(--s-3)',
              marginBottom: 'var(--s-5)',
            }}
          >
            <div
              style={{
                width: '44px',
                height: '44px',
                borderRadius: 'var(--r-xl)',
                background: 'var(--tls-primary-50)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'var(--tls-primary-600)',
                flexShrink: 0,
              }}
            >
              <FileText size={20} />
            </div>
            <div>
              <div
                style={{
                  fontSize: 'var(--t-micro)',
                  fontWeight: 700,
                  color: 'var(--tls-primary-600)',
                  textTransform: 'uppercase',
                  letterSpacing: '0.08em',
                }}
              >
                Lecture rapide
              </div>
              <h2
                style={{
                  fontSize: 'var(--t-body)',
                  fontWeight: 800,
                  color: 'var(--text)',
                  margin: 0,
                }}
              >
                Synthèse Exécutive
              </h2>
            </div>
          </div>

          <p
            style={{
              fontSize: 'var(--t-sm)',
              color: 'var(--text-muted)',
              lineHeight: 1.7,
              margin: '0 0 var(--s-5)',
            }}
          >
            Ce numéro explore comment l'IA générative transforme concrètement le métier de
            formateur — de la conception des contenus à la personnalisation des parcours.
            Nos experts dressent un panorama complet des pratiques émergentes, soutenu par
            des données terrain et des témoignages de formateurs pionniers.
          </p>

          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: 'var(--s-2)',
              marginBottom: 'var(--s-5)',
            }}
          >
            {[
              '6 thématiques approfondies',
              '12 formateurs interviewés',
              '3 études de cas inédites',
              'Outils & ressources inclus',
            ].map((point, i) => (
              <div
                key={i}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 'var(--s-2)',
                  fontSize: 'var(--t-sm)',
                  color: 'var(--text)',
                }}
              >
                <div
                  style={{
                    width: '6px',
                    height: '6px',
                    borderRadius: '50%',
                    background: 'var(--tls-primary-500)',
                    flexShrink: 0,
                  }}
                />
                {point}
              </div>
            ))}
          </div>

          <button
            type="button"
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
            }}
            onMouseEnter={(e) => (e.currentTarget.style.background = 'var(--tls-primary-600)')}
            onMouseLeave={(e) => (e.currentTarget.style.background = 'var(--tls-primary-500)')}
          >
            <Download size={14} />
            Télécharger le PDF
          </button>
        </div>

        {/* ─ Sommaire du magazine ────────────────────────────── */}
        <div
          style={{
            borderRadius: 'var(--r-2xl)',
            overflow: 'hidden',
            border: '1px solid rgba(0,0,0,0.08)',
            boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
          }}
        >
          {/* Orange header */}
          <div
            style={{
              background: 'var(--tls-orange-500)',
              padding: 'var(--s-4) var(--s-5)',
              display: 'flex',
              alignItems: 'center',
              gap: 'var(--s-3)',
            }}
          >
            <BookOpen size={20} color="#fff" />
            <h2
              style={{
                fontSize: 'var(--t-body)',
                fontWeight: 800,
                color: 'var(--text-inverse)',
                margin: 0,
              }}
            >
              Sommaire du magazine
            </h2>
          </div>

          {/* Article list */}
          <div style={{ background: '#fff' }}>
            {SOMMAIRE.map((item, index) => (
              <div
                key={item.num}
                style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: 'var(--s-3)',
                  padding: 'var(--s-4) var(--s-5)',
                  borderBottom:
                    index < SOMMAIRE.length - 1 ? '1px solid rgba(0,0,0,0.06)' : 'none',
                  cursor: 'pointer',
                  transition: 'background 0.15s',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.background = 'var(--surface-muted)')}
                onMouseLeave={(e) => (e.currentTarget.style.background = '#fff')}
                onClick={() => navigate('/veille/magazine-article/1')}
              >
                {/* Number */}
                <span
                  style={{
                    fontSize: 'var(--t-h3)',
                    fontWeight: 900,
                    color: item.color,
                    lineHeight: 1,
                    minWidth: '32px',
                    flexShrink: 0,
                    fontVariantNumeric: 'tabular-nums',
                  }}
                >
                  {item.num}
                </span>

                {/* Text */}
                <div style={{ flex: 1, minWidth: 0 }}>
                  <p
                    style={{
                      fontSize: 'var(--t-sm)',
                      fontWeight: 600,
                      color: 'var(--text)',
                      margin: '0 0 var(--s-1)',
                      lineHeight: 1.4,
                    }}
                  >
                    {item.title}
                  </p>
                  <span
                    style={{
                      fontSize: 'var(--t-caption)',
                      color: 'var(--text-muted)',
                      fontStyle: 'italic',
                    }}
                  >
                    {item.pages}
                  </span>
                </div>

                <ArrowRight size={14} style={{ color: 'var(--text-muted)', flexShrink: 0, marginTop: '4px' }} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
