/**
 * Dossier — Sous-page dossier thématique
 *
 * Design identique à VeilleContent (Étude de Marché) :
 * - Breadcrumb "Veille & Apprentissage > Dossier"
 * - Icône BarChart teal + tag orange "DOSSIER"
 * - Grand titre + méta auteur/date/pages/téléchargements
 * - Callout orange "Résumé Exécutif" avec bordure gauche
 * - Layout 2 colonnes : sommaire sticky + contenu
 * - Points clés 2×2 cards oranges
 * - Données & Analyses grands chiffres + graphique placeholder
 * - Conclusion card teal gradient
 * - CTA téléchargement orange centré
 */

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
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
  ArrowLeft,
  Bookmark,
  BookmarkCheck,
  Share2,
} from "lucide-react";

/* ─── Data ───────────────────────────────────────────────────────────────── */

const SOMMAIRE = [
  { id: "s1", num: "01", title: "Contexte & enjeux 2026" },
  { id: "s2", num: "02", title: "Transformation par l'IA" },
  { id: "s3", num: "03", title: "Points clés & enseignements" },
  { id: "s4", num: "04", title: "Données & Analyses" },
  { id: "s5", num: "05", title: "Conclusions & recommandations" },
];

const POINTS_CLES = [
  {
    icon: <TrendingUp size={20} />,
    label: "Croissance de l'adoption",
    value: "+34%",
    desc: "d'organisations ayant intégré l'IA dans leurs parcours formation en 12 mois",
  },
  {
    icon: <Users size={20} />,
    label: "Formateurs impliqués",
    value: "78%",
    desc: "utilisent au moins 1 outil IA hebdomadairement dans leur pratique",
  },
  {
    icon: <Zap size={20} />,
    label: "Gain de productivité",
    value: "3.2×",
    desc: "plus rapide pour créer des contenus pédagogiques avec l'IA",
  },
  {
    icon: <Star size={20} />,
    label: "Engagement apprenant",
    value: "+41%",
    desc: "sur les parcours IA-augmentés vs parcours traditionnels",
  },
];

const BIG_STATS = [
  {
    value: "72%",
    label: "des DRH priorisent la formation IA",
    trend: "Top 3 priorités 2026",
    trendUp: true,
    color: "var(--tls-primary-500)",
  },
  {
    value: "3.2×",
    label: "gain productivité contenu",
    trend: "Mesuré sur 6 mois",
    trendUp: true,
    color: "var(--tls-orange-500)",
  },
  {
    value: "+41%",
    label: "engagement apprenant",
    trend: "Parcours IA-augmentés",
    trendUp: true,
    color: "var(--tls-primary-600)",
  },
  {
    value: "280%",
    label: "ROI moyen sur 18 mois",
    trend: "Organisations pionnières",
    trendUp: true,
    color: "var(--tls-orange-600)",
  },
];

/* ─── Component ──────────────────────────────────────────────────────────── */

export const Dossier: React.FC = () => {
  const navigate = useNavigate();
  const [activeSommaire, setActiveSommaire] = useState("s1");
  const [saved, setSaved] = useState(false);

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#fff",
        fontFamily: "var(--font-body)",
      }}
    >
      {/* ─ Top action bar ─────────────────────────────────────────── */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "var(--s-4) var(--s-6)",
          borderBottom: "1px solid var(--border)",
        }}
      >
        {/* Breadcrumb */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "var(--s-2)",
            fontSize: "var(--t-sm)",
            color: "var(--text-muted)",
          }}
        >
          <span
            style={{ cursor: "pointer", color: "var(--tls-primary-600)", fontWeight: 500 }}
            onClick={() => navigate("/veille")}
          >
            <ArrowLeft size={13} style={{ display: "inline", marginRight: "4px", verticalAlign: "middle" }} />
            Veille &amp; Apprentissage
          </span>
          <ChevronRight size={14} />
          <span style={{ color: "var(--tls-orange-600)", fontWeight: 600 }}>Dossier</span>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: "var(--s-2)" }}>
          <button
            type="button"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              padding: "9px 20px",
              borderRadius: "var(--r-full)",
              border: "none",
              background: "var(--tls-orange-500)",
              color: 'var(--text-inverse)',
              fontSize: "var(--t-sm)",
              fontWeight: 700,
              cursor: "pointer",
              fontFamily: "var(--font-body)",
              boxShadow: "0 2px 8px rgba(237,132,58,0.3)",
            }}
          >
            <Download size={14} /> Télécharger PDF
          </button>
          <button
            type="button"
            onClick={() => setSaved(!saved)}
            style={{
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              width: "38px",
              height: "38px",
              borderRadius: "var(--r-full)",
              border: "1.5px solid var(--border)",
              background: "transparent",
              color: saved ? "var(--tls-primary-500)" : "var(--text-muted)",
              cursor: "pointer",
            }}
          >
            {saved ? <BookmarkCheck size={16} /> : <Bookmark size={16} />}
          </button>
          <button
            type="button"
            style={{
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              width: "38px",
              height: "38px",
              borderRadius: "var(--r-full)",
              border: "1.5px solid var(--border)",
              background: "transparent",
              color: "var(--text-muted)",
              cursor: "pointer",
            }}
          >
            <Share2 size={16} />
          </button>
        </div>
      </div>

      {/* ─ Hero header ──────────────────────────────────────────────── */}
      <div
        style={{
          background: "linear-gradient(160deg, var(--tls-primary-50) 0%, #fff 50%)",
          padding: "var(--s-10) var(--s-8) var(--s-8)",
        }}
      >
        <div style={{ maxWidth: "900px", margin: "0 auto" }}>
          {/* Icon + tag row */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "var(--s-3)",
              marginBottom: "var(--s-5)",
            }}
          >
            <div
              style={{
                width: "56px",
                height: "56px",
                borderRadius: "var(--r-2xl)",
                background: "rgba(237,132,58,0.12)",
                border: "1px solid rgba(237,132,58,0.25)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "var(--tls-orange-600)",
                flexShrink: 0,
              }}
            >
              <BarChart2 size={26} />
            </div>
            <span
              style={{
                display: "inline-flex",
                alignItems: "center",
                padding: "5px 14px",
                borderRadius: "var(--r-full)",
                background: "rgba(237,132,58,0.1)",
                border: "1px solid rgba(237,132,58,0.25)",
                color: "var(--tls-orange-600)",
                fontSize: "12px",
                fontWeight: 800,
                letterSpacing: "0.08em",
              }}
            >
              DOSSIER THÉMATIQUE
            </span>
          </div>

          {/* Title */}
          <h1
            style={{
              fontSize: "clamp(2rem, 4vw, 3rem)",
              fontWeight: 900,
              color: "var(--text)",
              margin: "0 0 var(--s-5)",
              letterSpacing: "-0.03em",
              lineHeight: 1.1,
              maxWidth: "760px",
            }}
          >
            Transformation IA des parcours de formation professionnelle
          </h1>

          {/* Meta row */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "var(--s-5)",
              flexWrap: "wrap",
            }}
          >
            {[
              { icon: <UserRound size={14} />, label: "The Learning Society" },
              { icon: <CalendarDays size={14} />, label: "15 janvier 2026" },
              { icon: <FileText size={14} />, label: "38 pages" },
              { icon: <Download size={14} />, label: "2 847 téléchargements" },
            ].map((meta, i) => (
              <div
                key={i}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "6px",
                  color: "var(--text-muted)",
                  fontSize: "var(--t-sm)",
                }}
              >
                {meta.icon}
                {meta.label}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ─ Résumé Exécutif callout ────────────────────────────────── */}
      <div style={{ maxWidth: "900px", margin: "0 auto", padding: "0 var(--s-8)" }}>
        <div
          style={{
            background: "linear-gradient(135deg, rgba(237,132,58,0.08) 0%, rgba(237,132,58,0.04) 100%)",
            border: "1.5px solid rgba(237,132,58,0.3)",
            borderLeft: "4px solid var(--tls-orange-500)",
            borderRadius: "var(--r-xl)",
            padding: "var(--s-5) var(--s-6)",
            margin: "var(--s-6) 0",
          }}
        >
          <div
            style={{
              fontSize: "11px",
              fontWeight: 800,
              color: "var(--tls-orange-600)",
              textTransform: "uppercase",
              letterSpacing: "0.1em",
              marginBottom: "var(--s-2)",
            }}
          >
            Résumé Exécutif
          </div>
          <p
            style={{
              fontSize: "var(--t-sm)",
              color: "var(--text)",
              lineHeight: 1.7,
              margin: 0,
              fontWeight: 500,
            }}
          >
            Ce dossier analyse en profondeur la transformation des parcours de formation sous l'impulsion
            de l'intelligence artificielle. Basé sur une étude menée auprès de 1 800 responsables formation
            et 12 000 apprenants dans 8 pays européens, il documente les pratiques émergentes, les freins
            identifiés et les leviers d'accélération pour les organisations qui souhaitent piloter cette
            transformation de façon structurée et mesurable.
          </p>
        </div>
      </div>

      {/* ─ 2-column layout ────────────────────────────────────────── */}
      <div
        style={{
          maxWidth: "900px",
          margin: "0 auto",
          padding: "0 var(--s-8) var(--s-12)",
          display: "grid",
          gridTemplateColumns: "220px 1fr",
          gap: "var(--s-8)",
          alignItems: "start",
        }}
      >
        {/* ─ Sidebar sommaire ─────────────────────────────────────── */}
        <aside style={{ position: "sticky", top: "24px" }}>
          <div
            style={{
              background: "#fff",
              border: "1px solid rgba(0,0,0,0.08)",
              borderRadius: "var(--r-2xl)",
              padding: "var(--s-4)",
              boxShadow: "0 2px 12px rgba(0,0,0,0.05)",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "var(--s-2)",
                marginBottom: "var(--s-3)",
                padding: "0 var(--s-2)",
              }}
            >
              <BookOpen size={14} style={{ color: "var(--tls-primary-500)" }} />
              <span
                style={{
                  fontSize: "11px",
                  fontWeight: 700,
                  color: "var(--tls-primary-600)",
                  textTransform: "uppercase",
                  letterSpacing: "0.08em",
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
                    display: "flex",
                    alignItems: "flex-start",
                    gap: "var(--s-2)",
                    padding: "var(--s-2)",
                    borderRadius: "var(--r-lg)",
                    cursor: "pointer",
                    background: isActive ? "var(--tls-primary-50)" : "transparent",
                    transition: "all 0.15s",
                    marginBottom: "var(--s-1)",
                  }}
                  onMouseEnter={(e) => {
                    if (!isActive) e.currentTarget.style.background = "var(--surface-muted)";
                  }}
                  onMouseLeave={(e) => {
                    if (!isActive) e.currentTarget.style.background = "transparent";
                  }}
                >
                  <span
                    style={{
                      fontSize: "11px",
                      fontWeight: 800,
                      color: isActive ? "var(--tls-primary-600)" : "var(--text-muted)",
                      minWidth: "20px",
                      fontVariantNumeric: "tabular-nums",
                      marginTop: "1px",
                    }}
                  >
                    {item.num}
                  </span>
                  <span
                    style={{
                      fontSize: "13px",
                      fontWeight: isActive ? 600 : 500,
                      color: isActive ? "var(--tls-primary-700)" : "var(--text)",
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

        {/* ─ Main content ────────────────────────────────────────── */}
        <main>
          {/* Section 1 */}
          <section style={{ marginBottom: "var(--s-10)" }}>
            <h2
              style={{
                fontSize: "var(--t-h3)",
                fontWeight: 800,
                color: "var(--text)",
                margin: "0 0 var(--s-4)",
                paddingBottom: "var(--s-3)",
                borderBottom: "2px solid var(--tls-primary-100)",
              }}
            >
              01 — Contexte &amp; enjeux 2026
            </h2>
            <p
              style={{
                fontSize: "var(--t-sm)",
                color: "var(--text-muted)",
                lineHeight: 1.75,
                margin: "0 0 var(--s-4)",
              }}
            >
              La transformation des organisations par l'IA générative est désormais un fait structurel, pas
              une tendance conjoncturelle. En 2026, 72% des DRH interrogés placent la montée en compétences
              IA dans leur top 3 des priorités stratégiques. Cette pression crée un besoin massif de refonte
              des dispositifs de formation : les parcours longs et standardisés cèdent la place à des modules
              courts, personnalisés et disponibles en flux continu.
            </p>
            <p
              style={{
                fontSize: "var(--t-sm)",
                color: "var(--text-muted)",
                lineHeight: 1.75,
                margin: 0,
              }}
            >
              Les équipes Formation &amp; Talent doivent non seulement former aux nouveaux outils, mais repenser
              fondamentalement leur rôle et leur valeur ajoutée dans l'organisation. Le formateur de demain
              est avant tout un architecte de parcours et un curateur d'expériences.
            </p>
          </section>

          {/* Section 2 */}
          <section style={{ marginBottom: "var(--s-10)" }}>
            <h2
              style={{
                fontSize: "var(--t-h3)",
                fontWeight: 800,
                color: "var(--text)",
                margin: "0 0 var(--s-4)",
                paddingBottom: "var(--s-3)",
                borderBottom: "2px solid var(--tls-primary-100)",
              }}
            >
              02 — Transformation par l'IA
            </h2>
            <p
              style={{
                fontSize: "var(--t-sm)",
                color: "var(--text-muted)",
                lineHeight: 1.75,
                margin: "0 0 var(--s-4)",
              }}
            >
              Notre enquête terrain révèle une polarisation nette entre les organisations qui ont engagé une
              transformation structurée et celles qui expérimentent encore de façon isolée. Les premières — 34%
              de notre panel — ont mis en place des cellules dédiées, des indicateurs de maturité IA et des
              budgets sanctuarisés.
            </p>
            <p
              style={{
                fontSize: "var(--t-sm)",
                color: "var(--text-muted)",
                lineHeight: 1.75,
                margin: 0,
              }}
            >
              Le facteur différenciant n'est pas technologique : c'est la gouvernance. Les organisations
              performantes ont systématiquement nommé un pilote formation IA avec un mandat clair et un accès
              direct au CODIR.
            </p>
          </section>

          {/* Section 3 — Points clés 2×2 */}
          <section style={{ marginBottom: "var(--s-10)" }}>
            <h2
              style={{
                fontSize: "var(--t-h3)",
                fontWeight: 800,
                color: "var(--text)",
                margin: "0 0 var(--s-5)",
                paddingBottom: "var(--s-3)",
                borderBottom: "2px solid var(--tls-primary-100)",
              }}
            >
              03 — Points clés &amp; enseignements
            </h2>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "var(--s-4)",
              }}
            >
              {POINTS_CLES.map((point, i) => (
                <div
                  key={i}
                  style={{
                    background: "rgba(237,132,58,0.05)",
                    border: "1px solid rgba(237,132,58,0.15)",
                    borderRadius: "var(--r-xl)",
                    padding: "var(--s-5)",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "var(--s-2)",
                      marginBottom: "var(--s-3)",
                    }}
                  >
                    <div
                      style={{
                        width: "36px",
                        height: "36px",
                        borderRadius: "var(--r-lg)",
                        background: "rgba(237,132,58,0.15)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        color: "var(--tls-orange-600)",
                        flexShrink: 0,
                      }}
                    >
                      {point.icon}
                    </div>
                    <span
                      style={{
                        fontSize: "12px",
                        fontWeight: 700,
                        color: "var(--tls-orange-600)",
                        textTransform: "uppercase",
                        letterSpacing: "0.06em",
                      }}
                    >
                      {point.label}
                    </span>
                  </div>
                  <div
                    style={{
                      fontSize: "2rem",
                      fontWeight: 900,
                      color: "var(--tls-orange-600)",
                      lineHeight: 1,
                      marginBottom: "var(--s-1)",
                    }}
                  >
                    {point.value}
                  </div>
                  <p
                    style={{
                      fontSize: "var(--t-sm)",
                      color: "var(--text-muted)",
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

          {/* Section 4 — Données & Analyses */}
          <section style={{ marginBottom: "var(--s-10)" }}>
            <h2
              style={{
                fontSize: "var(--t-h3)",
                fontWeight: 800,
                color: "var(--text)",
                margin: "0 0 var(--s-5)",
                paddingBottom: "var(--s-3)",
                borderBottom: "2px solid var(--tls-primary-100)",
              }}
            >
              04 — Données &amp; Analyses
            </h2>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(2, 1fr)",
                gap: "var(--s-4)",
                marginBottom: "var(--s-6)",
              }}
            >
              {BIG_STATS.map((stat, i) => (
                <div
                  key={i}
                  style={{
                    background: "#fff",
                    border: "1px solid rgba(0,0,0,0.07)",
                    borderRadius: "var(--r-xl)",
                    padding: "var(--s-5)",
                    boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
                    textAlign: "center",
                  }}
                >
                  <div
                    style={{
                      fontSize: "3rem",
                      fontWeight: 900,
                      color: stat.color,
                      lineHeight: 1,
                      marginBottom: "var(--s-2)",
                    }}
                  >
                    {stat.value}
                  </div>
                  <p
                    style={{
                      fontSize: "var(--t-sm)",
                      fontWeight: 600,
                      color: "var(--text)",
                      margin: "0 0 var(--s-2)",
                    }}
                  >
                    {stat.label}
                  </p>
                  <div
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "4px",
                      padding: "3px 10px",
                      borderRadius: "var(--r-full)",
                      background: stat.trendUp ? "rgba(34,197,94,0.1)" : "rgba(239,68,68,0.1)",
                      color: stat.trendUp ? "#16a34a" : "#dc2626",
                      fontSize: "12px",
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
                background: "var(--surface-muted)",
                border: "1px dashed rgba(0,0,0,0.15)",
                borderRadius: "var(--r-2xl)",
                height: "200px",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                color: "var(--text-muted)",
                gap: "var(--s-2)",
              }}
            >
              <BarChart2 size={36} style={{ opacity: 0.4 }} />
              <span style={{ fontSize: "var(--t-sm)", fontWeight: 500 }}>
                Graphique : Évolution de l'adoption IA en formation (2023–2026)
              </span>
            </div>
          </section>

          {/* Section 5 — Conclusion teal card */}
          <section style={{ marginBottom: "var(--s-8)" }}>
            <h2
              style={{
                fontSize: "var(--t-h3)",
                fontWeight: 800,
                color: "var(--text)",
                margin: "0 0 var(--s-5)",
                paddingBottom: "var(--s-3)",
                borderBottom: "2px solid var(--tls-primary-100)",
              }}
            >
              05 — Conclusions &amp; recommandations
            </h2>

            <div
              style={{
                background: "linear-gradient(135deg, var(--tls-primary-500) 0%, var(--tls-primary-600) 100%)",
                borderRadius: "var(--r-2xl)",
                padding: "var(--s-7)",
                color: 'var(--text-inverse)',
                marginBottom: "var(--s-5)",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "var(--s-2)",
                  marginBottom: "var(--s-4)",
                }}
              >
                <CheckCircle2 size={20} color="rgba(255,255,255,0.8)" />
                <span
                  style={{
                    fontSize: "12px",
                    fontWeight: 700,
                    color: "rgba(255,255,255,0.8)",
                    textTransform: "uppercase",
                    letterSpacing: "0.08em",
                  }}
                >
                  Conclusion principale
                </span>
              </div>
              <p
                style={{
                  fontSize: "var(--t-body)",
                  fontWeight: 600,
                  lineHeight: 1.6,
                  margin: "0 0 var(--s-5)",
                  color: 'var(--text-inverse)',
                }}
              >
                La transformation IA des parcours de formation n'est plus optionnelle. Les organisations
                qui agissent maintenant, avec méthode et gouvernance, bâtissent un avantage durable sur
                l'acquisition et la rétention des talents.
              </p>

              {[
                "Déployer un diagnostic de maturité IA pour votre organisation",
                "Former les managers de premier niveau avant les équipes",
                "Mettre en place des boucles de feedback hebdomadaires sur les usages IA",
              ].map((rec, i) => (
                <div
                  key={i}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "var(--s-2)",
                    marginBottom: "var(--s-2)",
                  }}
                >
                  <ArrowRight size={14} color="rgba(255,255,255,0.7)" style={{ flexShrink: 0 }} />
                  <span style={{ fontSize: "var(--t-sm)", color: "rgba(255,255,255,0.9)" }}>
                    {rec}
                  </span>
                </div>
              ))}
            </div>
          </section>
        </main>
      </div>

      {/* ─ Download CTA ─────────────────────────────────────────────── */}
      <div
        style={{
          maxWidth: "640px",
          margin: "0 auto",
          padding: "0 var(--s-8) var(--s-12)",
          textAlign: "center",
        }}
      >
        <div
          style={{
            background: "linear-gradient(135deg, rgba(237,132,58,0.08) 0%, rgba(237,132,58,0.04) 100%)",
            border: "1.5px solid rgba(237,132,58,0.25)",
            borderRadius: "var(--r-2xl)",
            padding: "var(--s-8)",
          }}
        >
          <div
            style={{
              width: "56px",
              height: "56px",
              borderRadius: "50%",
              background: "var(--tls-orange-500)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              margin: "0 auto var(--s-4)",
              boxShadow: "0 4px 16px rgba(237,132,58,0.3)",
            }}
          >
            <Download size={24} color="#fff" />
          </div>
          <h3
            style={{
              fontSize: "var(--t-h3)",
              fontWeight: 800,
              color: "var(--text)",
              margin: "0 0 var(--s-2)",
            }}
          >
            Télécharger le dossier complet
          </h3>
          <p
            style={{
              fontSize: "var(--t-sm)",
              color: "var(--text-muted)",
              margin: "0 0 var(--s-5)",
            }}
          >
            PDF de 38 pages · Données exclusives · Mise à jour janvier 2026
          </p>
          <button
            type="button"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "var(--s-2)",
              padding: "14px 32px",
              borderRadius: "var(--r-full)",
              background: "var(--tls-orange-500)",
              border: "none",
              color: 'var(--text-inverse)',
              fontWeight: 700,
              fontSize: "var(--t-body)",
              cursor: "pointer",
              fontFamily: "var(--font-body)",
              boxShadow: "0 4px 16px rgba(237,132,58,0.35)",
              transition: "all 0.2s",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.background = "var(--tls-orange-600)")}
            onMouseLeave={(e) => (e.currentTarget.style.background = "var(--tls-orange-500)")}
          >
            <Download size={18} />
            Télécharger le PDF gratuit
          </button>
        </div>
      </div>
    </div>
  );
};
