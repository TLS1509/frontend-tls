/**
 * VideoTutorial — Lecteur de tutoriel vidéo
 *
 * Design d'après screenshot :
 * - Layout 2 colonnes : vidéo (gauche) + sidebar Chapitres (droite)
 * - Header minimal : ▶ Tutoriel vidéo + breadcrumb
 * - Grand titre bold + description + pills (catégorie / durée / auteur)
 * - Zone vidéo plein écran avec bouton play centré
 * - Sidebar : Chapitres avec timestamps + bouton "Retour veille"
 */

import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  ArrowLeft,
  Play,
  Clock,
  User,
  ChevronRight,
  Bookmark,
  BookmarkCheck,
} from "lucide-react";

/* ─── Data ────────────────────────────────────────────────────────────────── */

const CHAPITRES = [
  { time: "00:00", label: "Introduction" },
  { time: "01:30", label: "Cadrage du contexte" },
  { time: "03:10", label: "Cadre de prompt : les 5 étapes" },
  { time: "05:45", label: "Exemple pratique 1 : Rédaction" },
  { time: "08:15", label: "Exemple pratique 2 : Analyse" },
  { time: "10:20", label: "Validation et itération" },
  { time: "11:40", label: "Résumé et takeaways" },
];

const TUTORIALS: Record<string, {
  category: string;
  title: string;
  description: string;
  duration: string;
  author: string;
  chapitres: typeof CHAPITRES;
}> = {
  "2": {
    category: "PROMPT ENGINEERING",
    title: "Construire un prompt structuré en 5 étapes",
    description:
      "Séquence pratique orientée exécution : cadrage, exemples, validation et itération sur des cas réels de formation.",
    duration: "12 min",
    author: "Marie Dubois",
    chapitres: CHAPITRES,
  },
  "6": {
    category: "IA EN FORMATION",
    title: "Maîtriser l'IA pour la Formation Professionnelle",
    description:
      "Comment intégrer l'intelligence artificielle dans vos parcours de formation pour maximiser l'engagement et les résultats d'apprentissage.",
    duration: "15 min",
    author: "Pierre Leclerc",
    chapitres: [
      { time: "00:00", label: "Introduction" },
      { time: "02:00", label: "Panorama des outils IA" },
      { time: "05:30", label: "Intégration dans les parcours" },
      { time: "09:00", label: "Cas pratiques" },
      { time: "12:45", label: "Bonnes pratiques" },
      { time: "14:00", label: "Conclusion et ressources" },
    ],
  },
};

const DEFAULT_TUTORIAL = TUTORIALS["2"];

/* ─── Component ──────────────────────────────────────────────────────────── */

export const VideoTutorial: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [saved, setSaved] = useState(false);
  const [activeChapter, setActiveChapter] = useState(0);
  const [playing, setPlaying] = useState(false);

  const tuto = (id && TUTORIALS[id]) ? TUTORIALS[id] : DEFAULT_TUTORIAL;

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#fff",
        fontFamily: "var(--font-body)",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* ─ Minimal top breadcrumb ─────────────────────────────────── */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "var(--s-3) var(--s-6)",
          borderBottom: "1px solid var(--border)",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "var(--s-2)",
            fontSize: "var(--t-caption)",
            color: "var(--text-muted)",
          }}
        >
          <span
            onClick={() => navigate("/veille")}
            style={{
              cursor: "pointer",
              color: "var(--tls-primary-600)",
              fontWeight: 500,
              display: "inline-flex",
              alignItems: "center",
              gap: "4px",
            }}
          >
            <ArrowLeft size={13} />
            Veille
          </span>
          <ChevronRight size={13} />
          <span style={{ display: "inline-flex", alignItems: "center", gap: "5px" }}>
            <Play size={12} style={{ color: "var(--tls-orange-500)" }} />
            Tutoriel vidéo
          </span>
        </div>

        <button
          type="button"
          onClick={() => setSaved(!saved)}
          style={{
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            width: "36px",
            height: "36px",
            borderRadius: "var(--r-pill)",
            border: "1.5px solid var(--border)",
            background: "transparent",
            color: saved ? "var(--tls-primary-500)" : "var(--text-muted)",
            cursor: "pointer",
          }}
        >
          {saved ? <BookmarkCheck size={16} /> : <Bookmark size={16} />}
        </button>
      </div>

      {/* ─ Main layout : vidéo (gauche) + sidebar chapitres (droite) ── */}
      <div
        style={{
          flex: 1,
          display: "grid",
          gridTemplateColumns: "1fr 300px",
          minHeight: 0,
        }}
      >
        {/* ── Colonne gauche : titre + description + vidéo ─────────── */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            borderRight: "1px solid var(--border)",
          }}
        >
          {/* Header info */}
          <div style={{ padding: "var(--s-6) var(--s-8) var(--s-5)" }}>
            {/* Title */}
            <h1
              style={{
                fontSize: "clamp(1.5rem, 2.5vw, 2.25rem)",
                fontWeight: 900,
                color: "var(--text)",
                margin: "0 0 var(--s-3)",
                lineHeight: 1.15,
                letterSpacing: "-0.025em",
              }}
            >
              {tuto.title}
            </h1>

            {/* Description */}
            <p
              style={{
                fontSize: "var(--t-body)",
                color: "var(--text-muted)",
                lineHeight: 1.6,
                margin: "0 0 var(--s-4)",
                maxWidth: "640px",
              }}
            >
              {tuto.description}
            </p>

            {/* Pills row */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "var(--s-3)",
                flexWrap: "wrap",
              }}
            >
              <span
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  padding: "4px 12px",
                  borderRadius: "var(--r-pill)",
                  background: "var(--tls-primary-50)",
                  border: "1px solid rgba(85,161,180,0.25)",
                  color: "var(--tls-primary-700)",
                  fontSize: "11px",
                  fontWeight: 800,
                  letterSpacing: "0.07em",
                }}
              >
                {tuto.category}
              </span>
              <span
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "5px",
                  color: "var(--text-muted)",
                  fontSize: "var(--t-caption)",
                }}
              >
                <Clock size={13} />
                {tuto.duration}
              </span>
              <span
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "5px",
                  color: "var(--text-muted)",
                  fontSize: "var(--t-caption)",
                }}
              >
                <User size={13} />
                {tuto.author}
              </span>
            </div>
          </div>

          {/* Video area */}
          <div
            style={{
              flex: 1,
              background: "linear-gradient(160deg, #0f1623 0%, #1a2438 50%, #0d1a2e 100%)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              position: "relative",
              minHeight: "380px",
            }}
          >
            {/* Subtle texture overlay */}
            <div
              style={{
                position: "absolute",
                inset: 0,
                background:
                  "radial-gradient(ellipse at 30% 40%, rgba(85,161,180,0.12) 0%, transparent 60%), radial-gradient(ellipse at 70% 70%, rgba(237,132,58,0.08) 0%, transparent 50%)",
              }}
            />

            {/* Chapter indicator (top left) */}
            {activeChapter > 0 && (
              <div
                style={{
                  position: "absolute",
                  top: "var(--s-4)",
                  left: "var(--s-5)",
                  background: "rgba(0,0,0,0.55)",
                  backdropFilter: "blur(8px)",
                  color: "#fff",
                  fontSize: "12px",
                  fontWeight: 600,
                  padding: "4px 10px",
                  borderRadius: "6px",
                }}
              >
                {tuto.chapitres[activeChapter]?.label}
              </div>
            )}

            {/* Play button */}
            <button
              type="button"
              onClick={() => setPlaying(!playing)}
              style={{
                position: "relative",
                zIndex: 1,
                width: "72px",
                height: "72px",
                borderRadius: "50%",
                background: playing
                  ? "rgba(255,255,255,0.15)"
                  : "var(--tls-primary-500)",
                border: "none",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
                boxShadow: playing
                  ? "none"
                  : "0 0 0 12px rgba(85,161,180,0.18), 0 8px 32px rgba(85,161,180,0.4)",
                transition: "all 0.3s cubic-bezier(0.2,0,0,1)",
              }}
              onMouseEnter={(e) => {
                if (!playing) e.currentTarget.style.transform = "scale(1.08)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "scale(1)";
              }}
              aria-label={playing ? "Pause" : "Lire"}
            >
              {playing ? (
                <div
                  style={{
                    display: "flex",
                    gap: "5px",
                  }}
                >
                  <div
                    style={{
                      width: "4px",
                      height: "22px",
                      background: "#fff",
                      borderRadius: "2px",
                    }}
                  />
                  <div
                    style={{
                      width: "4px",
                      height: "22px",
                      background: "#fff",
                      borderRadius: "2px",
                    }}
                  />
                </div>
              ) : (
                <Play size={28} color="#fff" fill="#fff" style={{ marginLeft: "3px" }} />
              )}
            </button>

            {/* Duration badge */}
            <div
              style={{
                position: "absolute",
                bottom: "var(--s-4)",
                right: "var(--s-5)",
                background: "rgba(0,0,0,0.6)",
                backdropFilter: "blur(4px)",
                color: "#fff",
                fontSize: "13px",
                fontWeight: 700,
                padding: "3px 10px",
                borderRadius: "6px",
              }}
            >
              {tuto.duration}
            </div>
          </div>
        </div>

        {/* ── Colonne droite : sidebar Chapitres ───────────────────── */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            background: "var(--surface-muted)",
          }}
        >
          {/* Chapitres header */}
          <div
            style={{
              padding: "var(--s-5) var(--s-5) var(--s-3)",
              borderBottom: "1px solid var(--border)",
            }}
          >
            <span
              style={{
                fontSize: "var(--t-caption)",
                fontWeight: 800,
                color: "var(--text)",
                textTransform: "uppercase",
                letterSpacing: "0.08em",
              }}
            >
              Chapitres
            </span>
          </div>

          {/* Chapter list */}
          <div
            style={{
              flex: 1,
              overflowY: "auto",
              padding: "var(--s-2) 0",
            }}
          >
            {tuto.chapitres.map((ch, i) => {
              const isActive = activeChapter === i;
              return (
                <button
                  key={i}
                  type="button"
                  onClick={() => {
                    setActiveChapter(i);
                    setPlaying(true);
                  }}
                  style={{
                    display: "flex",
                    alignItems: "flex-start",
                    gap: "var(--s-3)",
                    width: "100%",
                    padding: "var(--s-3) var(--s-5)",
                    background: isActive ? "#fff" : "transparent",
                    border: "none",
                    borderLeft: isActive
                      ? "3px solid var(--tls-primary-500)"
                      : "3px solid transparent",
                    cursor: "pointer",
                    textAlign: "left",
                    fontFamily: "var(--font-body)",
                    transition: "all 0.15s",
                  }}
                  onMouseEnter={(e) => {
                    if (!isActive) e.currentTarget.style.background = "rgba(0,0,0,0.03)";
                  }}
                  onMouseLeave={(e) => {
                    if (!isActive) e.currentTarget.style.background = "transparent";
                  }}
                >
                  <span
                    style={{
                      fontSize: "12px",
                      fontWeight: 700,
                      color: isActive
                        ? "var(--tls-primary-600)"
                        : "var(--text-muted)",
                      minWidth: "36px",
                      fontVariantNumeric: "tabular-nums",
                      marginTop: "1px",
                      flexShrink: 0,
                    }}
                  >
                    {ch.time}
                  </span>
                  <span
                    style={{
                      fontSize: "var(--t-caption)",
                      fontWeight: isActive ? 700 : 500,
                      color: isActive ? "var(--text)" : "var(--text-muted)",
                      lineHeight: 1.4,
                    }}
                  >
                    {ch.label}
                  </span>
                  {isActive && (
                    <Play
                      size={12}
                      fill="var(--tls-primary-500)"
                      color="var(--tls-primary-500)"
                      style={{ flexShrink: 0, marginTop: "2px", marginLeft: "auto" }}
                    />
                  )}
                </button>
              );
            })}
          </div>

          {/* Retour veille */}
          <div
            style={{
              padding: "var(--s-4) var(--s-5)",
              borderTop: "1px solid var(--border)",
            }}
          >
            <button
              type="button"
              onClick={() => navigate("/veille")}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "6px",
                background: "none",
                border: "none",
                color: "var(--text-muted)",
                fontSize: "var(--t-caption)",
                fontWeight: 600,
                cursor: "pointer",
                fontFamily: "var(--font-body)",
                padding: 0,
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = "var(--tls-primary-600)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = "var(--text-muted)";
              }}
            >
              <ArrowLeft size={13} /> Retour veille
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
