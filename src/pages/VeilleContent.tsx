/**
 * VeilleContent Page — "Dossier / Étude de Marché"
 *
 * Design d'après screenshots :
 * - Breadcrumb "Veille > Étude de Marché"
 * - Grande icône + tag orange + titre massif
 * - Ligne méta : auteur, date, pages, téléchargements
 * - Callout orange "Résumé Exécutif"
 * - Layout 2 colonnes : sommaire sidebar + contenu principal
 * - "Points clés" grille 2x2 avec icônes orange
 * - "Données & Analyses" grands chiffres colorés
 * - Zone graphiques placeholder
 * - Conclusion carte teal
 * - CTA téléchargement orange centré
 */

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ChevronRight,
  BarChart2,
  UserRound,
  CalendarDays,
  FileText,
  Download,
  TrendingUp,
  Users,
  Zap,
  Star,
  CheckCircle2,
  BookOpen,
  ArrowUpRight,
  ArrowRight,
} from 'lucide-react';

/* ─── Data ───────────────────────────────────────────────────────────────── */

const SOMMAIRE = [
  { id: 's1', num: '01', title: 'État du marché 2026', anchor: 'marche' },
  { id: 's2', num: '02', title: "Adoption de l'IA par les formateurs", anchor: 'adoption' },
  { id: 's3', num: '03', title: 'Points clés & enseignements', anchor: 'points-cles' },
  { id: 's4', num: '04', title: 'Données & Analyses', anchor: 'donnees' },
  { id: 's5', num: '05', title: 'Conclusions & recommandations', anchor: 'conclusion' },
];

const POINTS_CLES = [
  {
    icon: <TrendingUp size={20} />,
    label: 'Croissance du marché',
    value: '+34%',
    desc: "d'adoption de l'IA en formation sur 12 mois",
  },
  {
    icon: <Users size={20} />,
    label: 'Formateurs impliqués',
    value: '78%',
    desc: 'utilisent au moins 1 outil IA hebdomadairement',
  },
  {
    icon: <Zap size={20} />,
    label: 'Gain de productivité',
    value: '3.2×',
    desc: 'plus rapide pour créer des contenus pédagogiques',
  },
  {
    icon: <Star size={20} />,
    label: 'Satisfaction apprenante',
    value: '+41%',
    desc: "d'engagement sur les parcours IA-augmentés",
  },
];

const BIG_STATS = [
  {
    value: '78%',
    label: "des formateurs utilisent l'IA",
    trend: '+12pts vs 2025',
    trendUp: true,
    color: 'var(--tls-primary-500)',
  },
  {
    value: '3.2×',
    label: 'gain productivité contenu',
    trend: 'Mesuré sur 6 mois',
    trendUp: true,
    color: 'var(--tls-orange-500)',
  },
  {
    value: '+41%',
    label: 'engagement apprenant',
    trend: 'Parcours IA-augmentés',
    trendUp: true,
    color: 'var(--tls-primary-600)',
  },
  {
    value: '12 h',
    label: 'économisées / semaine',
    trend: 'Par formateur en moyenne',
    trendUp: true,
    color: 'var(--tls-orange-600)',
  },
];

/* ─── Component ──────────────────────────────────────────────────────────── */

export const VeilleContent: React.FC = () => {
  const navigate = useNavigate();
  const [activeSommaire, setActiveSommaire] = useState('s1');

  return (
    <div
      style={{
        minHeight: '100vh',
        background: '#fff',
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
        <span style={{ color: 'var(--text)', fontWeight: 500 }}>Étude de Marché</span>
      </div>

      {/* ─ Hero header ──────────────────────────────────────────── */}
      <div
        style={{
          background: 'linear-gradient(160deg, var(--tls-primary-50) 0%, #fff 50%)',
          padding: 'var(--s-10) var(--s-8) var(--s-8)',
        }}
      >
        <div style={{ maxWidth: 'var(--container-default)', margin: '0 auto' }}>
          {/* Icon + tag row */}
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
                width: '56px',
                height: '56px',
                borderRadius: 'var(--r-2xl)',
                background: 'rgba(237,132,58,0.12)',
                border: '1px solid rgba(237,132,58,0.25)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'var(--tls-orange-600)',
                flexShrink: 0,
              }}
            >
              <BarChart2 size={26} />
            </div>
            <span
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                padding: 'var(--s-1) var(--s-3-5)',
                borderRadius: 'var(--r-full)',
                background: 'rgba(237,132,58,0.1)',
                border: '1px solid rgba(237,132,58,0.25)',
                color: 'var(--tls-orange-600)',
                fontSize: 'var(--t-caption)',
                fontWeight: 800,
                letterSpacing: '0.08em',
              }}
            >
              ÉTUDE DE MARCHÉ
            </span>
          </div>

          {/* Title */}
          <h1
            style={{
              fontSize: 'clamp(2rem, 4vw, 3rem)',
              fontWeight: 900,
              color: 'var(--text)',
              margin: '0 0 var(--s-5)',
              letterSpacing: '-0.03em',
              lineHeight: 1.1,
              maxWidth: 'var(--container-narrow)',
            }}
          >
            L'IA Générative dans la Formation Professionnelle
          </h1>

          {/* Meta row */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 'var(--s-5)',
              flexWrap: 'wrap',
            }}
          >
            {[
              { icon: <UserRound size={14} />, label: 'The Learning Society' },
              { icon: <CalendarDays size={14} />, label: '25 avril 2026' },
              { icon: <FileText size={14} />, label: '32 pages' },
              { icon: <Download size={14} />, label: '234 téléchargements' },
            ].map((meta, i) => (
              <div
                key={i}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 'var(--s-1-5)',
                  color: 'var(--text-muted)',
                  fontSize: 'var(--t-sm)',
                }}
              >
                {meta.icon}
                {meta.label}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ─ Orange Résumé Exécutif callout ───────────────────────── */}
      <div style={{ maxWidth: 'var(--container-default)', margin: '0 auto', padding: '0 var(--s-8)' }}>
        <div
          style={{
            background: 'linear-gradient(135deg, rgba(237,132,58,0.08) 0%, rgba(237,132,58,0.04) 100%)',
            border: '1.5px solid rgba(237,132,58,0.3)',
            borderLeft: '4px solid var(--tls-orange-500)',
            borderRadius: 'var(--r-xl)',
            padding: 'var(--s-5) var(--s-6)',
            margin: 'var(--s-6) 0',
          }}
        >
          <div
            style={{
              fontSize: 'var(--t-micro)',
              fontWeight: 800,
              color: 'var(--tls-orange-600)',
              textTransform: 'uppercase',
              letterSpacing: '0.1em',
              marginBottom: 'var(--s-2)',
            }}
          >
            Résumé Exécutif
          </div>
          <p
            style={{
              fontSize: 'var(--t-sm)',
              color: 'var(--text)',
              lineHeight: 1.7,
              margin: 0,
              fontWeight: 500,
            }}
          >
            Cette étude analyse l'impact de l'IA générative sur les pratiques pédagogiques en
            France. Basée sur 450 entretiens avec des formateurs professionnels, elle révèle une
            adoption accélérée (+34% en 12 mois), des gains de productivité significatifs (3,2×
            sur la création de contenu) et une amélioration mesurée de l'engagement apprenant.
            Les résistances identifiées concernent principalement l'évaluation de la qualité et
            la gestion des données personnelles.
          </p>
        </div>
      </div>

      {/* ─ 2-column layout ──────────────────────────────────────── */}
      <div
        style={{
          maxWidth: 'var(--container-default)',
          margin: '0 auto',
          padding: '0 var(--s-8) var(--s-12)',
          display: 'grid',
          gridTemplateColumns: '220px 1fr',
          gap: 'var(--s-8)',
          alignItems: 'start',
        }}
      >
        {/* ─ Sidebar sommaire (sticky) ─────────────────────────── */}
        <aside style={{ position: 'sticky', top: '24px' }}>
          <div
            style={{
              background: '#fff',
              border: '1px solid rgba(0,0,0,0.08)',
              borderRadius: 'var(--r-2xl)',
              padding: 'var(--s-4)',
              boxShadow: '0 2px 12px rgba(0,0,0,0.05)',
            }}
          >
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 'var(--s-2)',
                marginBottom: 'var(--s-3)',
                padding: '0 var(--s-2)',
              }}
            >
              <BookOpen size={14} style={{ color: 'var(--tls-primary-500)' }} />
              <span
                style={{
                  fontSize: 'var(--t-micro)',
                  fontWeight: 700,
                  color: 'var(--tls-primary-600)',
                  textTransform: 'uppercase',
                  letterSpacing: '0.08em',
                }}
              >
                Sommaire
              </span>
            </div>

            {SOMMAIRE.map((item) => {
              const isActive = activeSommaire === item.id;
              return (
                <div
                  key={item.id}
                  onClick={() => setActiveSommaire(item.id)}
                  style={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: 'var(--s-2)',
                    padding: 'var(--s-2) var(--s-2)',
                    borderRadius: 'var(--r-lg)',
                    cursor: 'pointer',
                    background: isActive ? 'var(--tls-primary-50)' : 'transparent',
                    transition: 'all 0.15s',
                    marginBottom: 'var(--s-1)',
                  }}
                  onMouseEnter={(e) => {
                    if (!isActive) e.currentTarget.style.background = 'var(--surface-muted)';
                  }}
                  onMouseLeave={(e) => {
                    if (!isActive) e.currentTarget.style.background = 'transparent';
                  }}
                >
                  <span
                    style={{
                      fontSize: 'var(--t-micro)',
                      fontWeight: 800,
                      color: isActive ? 'var(--tls-primary-600)' : 'var(--text-muted)',
                      minWidth: '20px',
                      fontVariantNumeric: 'tabular-nums',
                      marginTop: '1px',
                    }}
                  >
                    {item.num}
                  </span>
                  <span
                    style={{
                      fontSize: 'var(--t-caption)',
                      fontWeight: isActive ? 600 : 500,
                      color: isActive ? 'var(--tls-primary-700)' : 'var(--text)',
                      lineHeight: 1.4,
                    }}
                  >
                    {item.title}
                  </span>
                </div>
              );
            })}
          </div>
        </aside>

        {/* ─ Main content ──────────────────────────────────────── */}
        <main>
          {/* Section 1: État du marché */}
          <section style={{ marginBottom: 'var(--s-10)' }} id="marche">
            <h2
              style={{
                fontSize: 'var(--t-h3)',
                fontWeight: 800,
                color: 'var(--text)',
                margin: '0 0 var(--s-4)',
                paddingBottom: 'var(--s-3)',
                borderBottom: '2px solid var(--tls-primary-100)',
              }}
            >
              01 — État du marché 2026
            </h2>
            <p
              style={{
                fontSize: 'var(--t-sm)',
                color: 'var(--text-muted)',
                lineHeight: 1.75,
                margin: '0 0 var(--s-4)',
              }}
            >
              Le marché de la formation professionnelle en France traverse une mutation
              profonde sous l'impulsion de l'intelligence artificielle générative. Après une
              phase d'expérimentation timide en 2024, l'adoption s'est accélérée de façon
              spectaculaire : 78% des formateurs interrogés déclarent utiliser au moins un
              outil IA chaque semaine, contre 44% en 2025.
            </p>
            <p
              style={{
                fontSize: 'var(--t-sm)',
                color: 'var(--text-muted)',
                lineHeight: 1.75,
                margin: 0,
              }}
            >
              Les outils les plus utilisés restent les assistants de génération de contenu
              (ChatGPT, Claude, Gemini) suivis des plateformes spécialisées en e-learning
              augmenté. La conception de quiz, d'exercices et de supports visuels dominent
              les cas d'usage déclarés.
            </p>
          </section>

          {/* Section 2: Points clés — 2×2 grid */}
          <section style={{ marginBottom: 'var(--s-10)' }} id="points-cles">
            <h2
              style={{
                fontSize: 'var(--t-h3)',
                fontWeight: 800,
                color: 'var(--text)',
                margin: '0 0 var(--s-5)',
                paddingBottom: 'var(--s-3)',
                borderBottom: '2px solid var(--tls-primary-100)',
              }}
            >
              03 — Points clés & enseignements
            </h2>

            <div
              style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: 'var(--s-4)',
              }}
            >
              {POINTS_CLES.map((point, i) => (
                <div
                  key={i}
                  style={{
                    background: 'rgba(237,132,58,0.05)',
                    border: '1px solid rgba(237,132,58,0.15)',
                    borderRadius: 'var(--r-xl)',
                    padding: 'var(--s-5)',
                  }}
                >
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 'var(--s-2)',
                      marginBottom: 'var(--s-3)',
                    }}
                  >
                    <div
                      style={{
                        width: '36px',
                        height: '36px',
                        borderRadius: 'var(--r-lg)',
                        background: 'rgba(237,132,58,0.15)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: 'var(--tls-orange-600)',
                        flexShrink: 0,
                      }}
                    >
                      {point.icon}
                    </div>
                    <span
                      style={{
                        fontSize: 'var(--t-caption)',
                        fontWeight: 700,
                        color: 'var(--tls-orange-600)',
                        textTransform: 'uppercase',
                        letterSpacing: '0.06em',
                      }}
                    >
                      {point.label}
                    </span>
                  </div>
                  <div
                    style={{
                      fontSize: '2rem',
                      fontWeight: 900,
                      color: 'var(--tls-orange-600)',
                      lineHeight: 1,
                      marginBottom: 'var(--s-1)',
                    }}
                  >
                    {point.value}
                  </div>
                  <p
                    style={{
                      fontSize: 'var(--t-sm)',
                      color: 'var(--text-muted)',
                      margin: 0,
                      lineHeight: 1.5,
                    }}
                  >
                    {point.desc}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* Section 3: Données & Analyses — big numbers */}
          <section style={{ marginBottom: 'var(--s-10)' }} id="donnees">
            <h2
              style={{
                fontSize: 'var(--t-h3)',
                fontWeight: 800,
                color: 'var(--text)',
                margin: '0 0 var(--s-5)',
                paddingBottom: 'var(--s-3)',
                borderBottom: '2px solid var(--tls-primary-100)',
              }}
            >
              04 — Données & Analyses
            </h2>

            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(2, 1fr)',
                gap: 'var(--s-4)',
                marginBottom: 'var(--s-6)',
              }}
            >
              {BIG_STATS.map((stat, i) => (
                <div
                  key={i}
                  style={{
                    background: '#fff',
                    border: '1px solid rgba(0,0,0,0.07)',
                    borderRadius: 'var(--r-xl)',
                    padding: 'var(--s-5)',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
                    textAlign: 'center',
                  }}
                >
                  <div
                    style={{
                      fontSize: '3rem',
                      fontWeight: 900,
                      color: stat.color,
                      lineHeight: 1,
                      marginBottom: 'var(--s-2)',
                    }}
                  >
                    {stat.value}
                  </div>
                  <p
                    style={{
                      fontSize: 'var(--t-sm)',
                      fontWeight: 600,
                      color: 'var(--text)',
                      margin: '0 0 var(--s-2)',
                    }}
                  >
                    {stat.label}
                  </p>
                  <div
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '4px',
                      padding: 'var(--s-1) var(--s-2-5)',
                      borderRadius: 'var(--r-full)',
                      background: stat.trendUp
                        ? 'rgba(34,197,94,0.1)'
                        : 'rgba(239,68,68,0.1)',
                      color: stat.trendUp ? '#16a34a' : '#dc2626',
                      fontSize: 'var(--t-caption)',
                      fontWeight: 600,
                    }}
                  >
                    <ArrowUpRight size={12} />
                    {stat.trend}
                  </div>
                </div>
              ))}
            </div>

            {/* Chart placeholder */}
            <div
              style={{
                background: 'var(--surface-muted)',
                border: '1px dashed rgba(0,0,0,0.15)',
                borderRadius: 'var(--r-2xl)',
                height: '200px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'var(--text-muted)',
                gap: 'var(--s-2)',
              }}
            >
              <BarChart2 size={36} style={{ opacity: 0.4 }} />
              <span style={{ fontSize: 'var(--t-sm)', fontWeight: 500 }}>
                Graphique : Évolution de l'adoption IA (2024–2026)
              </span>
            </div>
          </section>

          {/* Section 4: Conclusion — teal card */}
          <section style={{ marginBottom: 'var(--s-8)' }} id="conclusion">
            <h2
              style={{
                fontSize: 'var(--t-h3)',
                fontWeight: 800,
                color: 'var(--text)',
                margin: '0 0 var(--s-5)',
                paddingBottom: 'var(--s-3)',
                borderBottom: '2px solid var(--tls-primary-100)',
              }}
            >
              05 — Conclusions & recommandations
            </h2>

            <div
              style={{
                background: 'linear-gradient(135deg, var(--tls-primary-500) 0%, var(--tls-primary-600) 100%)',
                borderRadius: 'var(--r-2xl)',
                padding: 'var(--s-7)',
                color: 'var(--text-inverse)',
                marginBottom: 'var(--s-5)',
              }}
            >
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 'var(--s-2)',
                  marginBottom: 'var(--s-4)',
                }}
              >
                <CheckCircle2 size={20} color="rgba(255,255,255,0.8)" />
                <span
                  style={{
                    fontSize: 'var(--t-caption)',
                    fontWeight: 700,
                    color: 'rgba(255,255,255,0.8)',
                    textTransform: 'uppercase',
                    letterSpacing: '0.08em',
                  }}
                >
                  Conclusion principale
                </span>
              </div>
              <p
                style={{
                  fontSize: 'var(--t-body)',
                  fontWeight: 600,
                  lineHeight: 1.6,
                  margin: '0 0 var(--s-5)',
                  color: 'var(--text-inverse)',
                }}
              >
                L'IA générative n'est plus un gadget mais un levier stratégique pour les
                formateurs. Ceux qui l'intègrent maintenant bénéficieront d'un avantage
                compétitif durable — en productivité, en personnalisation et en impact.
              </p>

              {/* Recommendations list */}
              {[
                "Commencer par 1 outil, maîtriser avant d'élargir",
                'Former les formateurs avant de former les apprenants',
                "Mesurer l'impact dès la première expérimentation",
              ].map((rec, i) => (
                <div
                  key={i}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 'var(--s-2)',
                    marginBottom: 'var(--s-2)',
                  }}
                >
                  <ArrowRight size={14} color="rgba(255,255,255,0.7)" style={{ flexShrink: 0 }} />
                  <span style={{ fontSize: 'var(--t-sm)', color: 'rgba(255,255,255,0.9)' }}>
                    {rec}
                  </span>
                </div>
              ))}
            </div>
          </section>
        </main>
      </div>

      {/* ─ Download CTA — centered orange card ─────────────────── */}
      <div
        style={{
          maxWidth: '640px',
          margin: '0 auto',
          padding: '0 var(--s-8) var(--s-12)',
          textAlign: 'center',
        }}
      >
        <div
          style={{
            background: 'linear-gradient(135deg, rgba(237,132,58,0.08) 0%, rgba(237,132,58,0.04) 100%)',
            border: '1.5px solid rgba(237,132,58,0.25)',
            borderRadius: 'var(--r-2xl)',
            padding: 'var(--s-8)',
          }}
        >
          <div
            style={{
              width: '56px',
              height: '56px',
              borderRadius: '50%',
              background: 'var(--tls-orange-500)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto var(--s-4)',
              boxShadow: '0 4px 16px rgba(237,132,58,0.3)',
            }}
          >
            <Download size={24} color="#fff" />
          </div>
          <h3
            style={{
              fontSize: 'var(--t-h3)',
              fontWeight: 800,
              color: 'var(--text)',
              margin: '0 0 var(--s-2)',
            }}
          >
            Télécharger le rapport complet
          </h3>
          <p
            style={{
              fontSize: 'var(--t-sm)',
              color: 'var(--text-muted)',
              margin: '0 0 var(--s-5)',
            }}
          >
            PDF de 32 pages · Données exclusives · Mise à jour avril 2026
          </p>
          <button
            type="button"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 'var(--s-2)',
              padding: '14px 32px',
              borderRadius: 'var(--r-full)',
              background: 'var(--tls-orange-500)',
              border: 'none',
              color: 'var(--text-inverse)',
              fontWeight: 700,
              fontSize: 'var(--t-body)',
              cursor: 'pointer',
              fontFamily: 'var(--font-body)',
              boxShadow: '0 4px 16px rgba(237,132,58,0.35)',
              transition: 'all 0.2s',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.background = 'var(--tls-orange-600)')}
            onMouseLeave={(e) => (e.currentTarget.style.background = 'var(--tls-orange-500)')}
          >
            <Download size={18} />
            Télécharger le PDF gratuit
          </button>
        </div>
      </div>
    </div>
  );
};
