/**
 * Coaching Page
 *
 * Design exact d'après screenshots :
 * - Fond très clair (tls-primary-50)
 * - Titre + session prochaine + layout 2 colonnes (coach card + sessions passées)
 * - Couleurs : teal primaire + orange secondaire
 * - Aucun CSS hardcodé, tout en tokens TLS
 */

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  CalendarDays,
  Clock,
  UserRound,
  Mail,
  ExternalLink,
  Star,
  Video,
  FileText,
  Notebook,
  Calendar,
  Clock3,
  FileCheck,
  Plus,
  Trash2,
  CalendarClock,
} from 'lucide-react';

/* ─── Types ─────────────────────────────────────────────────────────────── */

interface PastSession {
  id: string;
  title: string;
  date: string;
  duration: string;
  notes: string;
  hasQuestionnaire: boolean;
  hasReport: boolean;
  hasJournalEntry: boolean;
}

/* ─── Data ───────────────────────────────────────────────────────────────── */

const coach = {
  name: 'Sophie Martin',
  initials: 'SM',
  role: 'Expert IA & Pédagogie',
  bio: "Spécialiste en IA générative et ingénierie pédagogique avec 10+ ans d'expérience dans la formation professionnelle.",
  specialties: ['IA Générative', 'Prompt Engineering', 'Design Pédagogique', 'Stratégie Formation'],
  email: 'sophie.martin@thelearningapp.io',
  linkedin: 'LinkedIn',
};

const upcomingSession = {
  title: 'Session de coaching IA',
  date: 'mer. 28 janv.',
  time: '14:00',
  duration: '1h',
  coachName: 'Sophie Martin',
};

const pastSessions: PastSession[] = [
  {
    id: 's1',
    title: 'Introduction au Prompt Engineering',
    date: '15 décembre 2024',
    duration: '1h',
    notes:
      'Excellent échange sur les fondamentaux du prompting. Points clés : structure ROLE-CONTEXT-TASK.',
    hasQuestionnaire: true,
    hasReport: true,
    hasJournalEntry: true,
  },
  {
    id: 's2',
    title: "Stratégie d'implémentation IA en formation",
    date: '8 décembre 2024',
    duration: '1h',
    notes:
      "Discussion approfondie sur comment intégrer l'IA dans mes formations existantes.",
    hasQuestionnaire: true,
    hasReport: true,
    hasJournalEntry: true,
  },
  {
    id: 's3',
    title: 'Session découverte - Objectifs et plan',
    date: '1 décembre 2024',
    duration: '45min',
    notes:
      'Première session très productive. Définition des objectifs et création du plan de formation personnalisé.',
    hasQuestionnaire: true,
    hasReport: true,
    hasJournalEntry: false,
  },
];

/* ─── Small action chip ─────────────────────────────────────────────────── */

interface ActionChipProps {
  icon: React.ReactNode;
  label: string;
  color: 'teal' | 'orange' | 'warm';
  onClick?: () => void;
}

const ACTION_COLORS = {
  teal: {
    bg: 'var(--tls-primary-50)',
    border: 'rgba(85,161,180,0.25)',
    text: 'var(--tls-primary-700)',
  },
  orange: {
    bg: 'var(--tls-orange-50)',
    border: 'rgba(237,132,58,0.25)',
    text: 'var(--tls-orange-700)',
  },
  warm: {
    bg: '#fff8ed',
    border: 'rgba(237,132,58,0.2)',
    text: '#b45309',
  },
};

const ActionChip: React.FC<ActionChipProps> = ({ icon, label, color, onClick }) => {
  const c = ACTION_COLORS[color];
  return (
    <button
      type="button"
      onClick={onClick}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '6px',
        padding: '6px 14px',
        borderRadius: 'var(--r-full)',
        background: c.bg,
        border: `1px solid ${c.border}`,
        color: c.text,
        fontSize: '13px',
        fontWeight: 600,
        cursor: 'pointer',
        fontFamily: 'var(--font-body)',
        transition: 'opacity var(--dur-2)',
        whiteSpace: 'nowrap',
      }}
      onMouseEnter={(e) => (e.currentTarget.style.opacity = '0.8')}
      onMouseLeave={(e) => (e.currentTarget.style.opacity = '1')}
    >
      {icon}
      {label}
    </button>
  );
};

/* ─── Section header ────────────────────────────────────────────────────── */

const SectionHeader: React.FC<{ icon: React.ReactNode; title: string; subtitle?: string }> = ({
  icon, title, subtitle,
}) => (
  <div style={{ display: 'flex', alignItems: 'flex-start', gap: 'var(--s-3)', marginBottom: 'var(--s-5)' }}>
    <div
      style={{
        width: '36px',
        height: '36px',
        borderRadius: '50%',
        background: 'var(--tls-primary-50)',
        border: '1.5px solid rgba(85,161,180,0.2)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'var(--tls-primary-600)',
        flexShrink: 0,
      }}
    >
      {icon}
    </div>
    <div>
      <h2 style={{ fontSize: 'var(--t-h3)', fontWeight: 700, color: 'var(--text)', margin: 0, lineHeight: 1.2 }}>
        {title}
      </h2>
      {subtitle && (
        <p style={{ margin: '2px 0 0', fontSize: 'var(--t-sm)', color: 'var(--text-muted)' }}>
          {subtitle}
        </p>
      )}
    </div>
  </div>
);

/* ─── Component ──────────────────────────────────────────────────────────── */

export const Coaching: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div
      style={{
        minHeight: '100vh',
        background: 'var(--bg)',
        fontFamily: 'var(--font-body)',
      }}
    >
      {/* ─ Hero header ─────────────────────────────────────────────── */}
      <section
        style={{
          background: 'linear-gradient(135deg, var(--tls-primary-700) 0%, var(--tls-primary-500) 55%, var(--tls-primary-400) 100%)',
          padding: 'var(--s-10) var(--s-8)',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Glow blob */}
        <div style={{ position: 'absolute', top: '-20%', right: '-5%', width: 400, height: 400, borderRadius: '50%', background: 'rgba(255,255,255,0.07)', filter: 'blur(50px)', pointerEvents: 'none' }} />

        <div style={{ maxWidth: '1100px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
          <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', flexWrap: 'wrap', gap: 'var(--s-6)' }}>
            <div>
              <p style={{ margin: '0 0 var(--s-1)', fontSize: 'var(--t-caption)', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.75)' }}>
                Accompagnement personnalisé
              </p>
              <h1 style={{ margin: '0 0 var(--s-3)', fontSize: 'clamp(1.75rem, 3vw, 2.5rem)', fontWeight: 800, color: '#fff', letterSpacing: '-0.02em' }}>
                Coaching 1-to-1
              </h1>
              {/* Stats pills */}
              <div style={{ display: 'flex', gap: 'var(--s-3)', flexWrap: 'wrap' }}>
                {[
                  { label: '3 sessions complétées', bg: 'rgba(255,255,255,0.15)', border: 'rgba(255,255,255,0.25)' },
                  { label: '2h45 de coaching', bg: 'rgba(255,255,255,0.12)', border: 'rgba(255,255,255,0.2)' },
                  { label: 'Sophie Martin · Expert IA', bg: 'rgba(255,255,255,0.12)', border: 'rgba(255,255,255,0.2)' },
                ].map((p) => (
                  <span key={p.label} style={{ display: 'inline-flex', alignItems: 'center', padding: '5px 14px', borderRadius: 'var(--r-pill)', background: p.bg, border: `1px solid ${p.border}`, color: 'rgba(255,255,255,0.9)', fontSize: 'var(--t-caption)', fontWeight: 600, backdropFilter: 'blur(8px)' }}>
                    {p.label}
                  </span>
                ))}
              </div>
            </div>
            <button
              type="button"
              onClick={() => navigate('/coaching/booking')}
              style={{
                display: 'inline-flex', alignItems: 'center', gap: 'var(--s-2)',
                padding: '11px 24px',
                borderRadius: 'var(--r-pill)',
                background: 'var(--tls-orange-500)',
                border: 'none', color: '#fff',
                fontWeight: 700, fontSize: 'var(--t-body-sm)',
                cursor: 'pointer', fontFamily: 'var(--font-body)',
                boxShadow: '0 4px 16px rgba(237,132,58,0.45)',
                transition: 'all var(--dur-2)',
                whiteSpace: 'nowrap',
              }}
              onMouseEnter={(e) => { e.currentTarget.style.background = 'var(--tls-orange-600)'; e.currentTarget.style.transform = 'translateY(-1px)'; }}
              onMouseLeave={(e) => { e.currentTarget.style.background = 'var(--tls-orange-500)'; e.currentTarget.style.transform = 'translateY(0)'; }}
            >
              <CalendarDays size={16} />
              Réserver une session
            </button>
          </div>
        </div>
      </section>

      <div style={{ maxWidth: '1100px', margin: '0 auto', padding: 'var(--s-8)' }}>

        {/* ─ Page content continued below ─ */}

        {/* ─ Upcoming session ──────────────────────────────────────── */}
        <section style={{ marginBottom: 'var(--s-8)' }}>
          <SectionHeader
            icon={<Calendar size={18} />}
            title="Prochaine session"
          />

          <div
            style={{
              background: '#fff',
              border: '1px solid rgba(0,0,0,0.08)',
              borderLeft: '4px solid var(--tls-primary-500)',
              borderRadius: 'var(--r-2xl)',
              padding: 'var(--s-6)',
              boxShadow: 'var(--shadow-md)',
              display: 'flex',
              flexDirection: 'column',
              gap: 'var(--s-4)',
            }}
          >
            {/* Card header */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div>
                <h3 style={{ fontSize: 'var(--t-h4)', fontWeight: 700, color: 'var(--text)', margin: '0 0 var(--s-2)' }}>
                  {upcomingSession.title}
                </h3>
                {/* Meta */}
                <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--s-2)', flexWrap: 'wrap' }}>
                  {[
                    { icon: <CalendarDays size={14} />, text: upcomingSession.date },
                    { icon: <Clock3 size={14} />, text: upcomingSession.time },
                    { icon: <Clock size={14} />, text: upcomingSession.duration },
                    { icon: <UserRound size={14} />, text: upcomingSession.coachName },
                  ].map(({ icon, text }, i, arr) => (
                    <React.Fragment key={text}>
                      <span
                        style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '4px',
                          color: 'var(--text-muted)',
                          fontSize: 'var(--t-sm)',
                        }}
                      >
                        <span style={{ color: 'var(--tls-primary-500)' }}>{icon}</span>
                        {text}
                      </span>
                      {i < arr.length - 1 && (
                        <span style={{ color: 'var(--border)', fontSize: '16px' }}>•</span>
                      )}
                    </React.Fragment>
                  ))}
                </div>
              </div>

              {/* Icon actions */}
              <div style={{ display: 'flex', gap: 'var(--s-2)', flexShrink: 0 }}>
                {[
                  { icon: <CalendarClock size={16} />, label: 'Reprogrammer' },
                  { icon: <Trash2 size={16} />, label: 'Annuler' },
                ].map(({ icon, label }) => (
                  <button
                    key={label}
                    title={label}
                    type="button"
                    style={{
                      width: '36px',
                      height: '36px',
                      borderRadius: 'var(--r-lg)',
                      background: 'var(--surface-muted)',
                      border: '1px solid var(--border)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: 'var(--text-muted)',
                      cursor: 'pointer',
                      transition: 'all var(--dur-2)',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = 'var(--surface)';
                      e.currentTarget.style.color = 'var(--text)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = 'var(--surface-muted)';
                      e.currentTarget.style.color = 'var(--text-muted)';
                    }}
                  >
                    {icon}
                  </button>
                ))}
              </div>
            </div>

            {/* CTA buttons */}
            <div style={{ display: 'flex', gap: 'var(--s-3)', flexWrap: 'wrap' }}>
              <button
                type="button"
                onClick={() => navigate('/coaching/pre-questionnaire')}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 'var(--s-2)',
                  padding: '9px 20px',
                  borderRadius: 'var(--r-full)',
                  background: 'transparent',
                  border: '1.5px solid var(--tls-primary-400)',
                  color: 'var(--tls-primary-600)',
                  fontWeight: 600,
                  fontSize: 'var(--t-sm)',
                  cursor: 'pointer',
                  fontFamily: 'var(--font-body)',
                  transition: 'all var(--dur-2)',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'var(--tls-primary-50)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'transparent';
                }}
              >
                <FileText size={15} />
                Préparer ma session
              </button>
              <button
                type="button"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 'var(--s-2)',
                  padding: '9px 20px',
                  borderRadius: 'var(--r-full)',
                  background: 'var(--tls-orange-500)',
                  border: 'none',
                  color: '#fff',
                  fontWeight: 700,
                  fontSize: 'var(--t-sm)',
                  cursor: 'pointer',
                  fontFamily: 'var(--font-body)',
                  boxShadow: '0 2px 8px rgba(237,132,58,0.3)',
                  transition: 'all var(--dur-2)',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'var(--tls-orange-600)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'var(--tls-orange-500)';
                }}
              >
                <Video size={15} />
                Rejoindre la session
              </button>
            </div>
          </div>
        </section>

        {/* ─ 2-column layout ───────────────────────────────────────── */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '320px 1fr',
            gap: 'var(--s-6)',
            alignItems: 'start',
          }}
        >
          {/* ── Coach card ─────────────────────────────────────────── */}
          <div
            style={{
              background: '#fff',
              border: '1px solid rgba(0,0,0,0.08)',
              borderRadius: 'var(--r-2xl)',
              padding: 'var(--s-7)',
              boxShadow: '0 2px 12px rgba(0,0,0,0.06)',
              position: 'sticky',
              top: 'var(--s-6)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              textAlign: 'center',
              gap: 'var(--s-4)',
            }}
          >
            {/* Avatar */}
            <div
              style={{
                width: '80px',
                height: '80px',
                borderRadius: '50%',
                background: 'var(--tls-primary-500)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
              }}
            >
              <span style={{ color: '#fff', fontWeight: 800, fontSize: '1.5rem' }}>
                {coach.initials}
              </span>
            </div>

            {/* Name + role */}
            <div>
              <h3 style={{ fontSize: 'var(--t-h3)', fontWeight: 700, color: 'var(--text)', margin: '0 0 4px' }}>
                {coach.name}
              </h3>
              <p style={{ fontSize: 'var(--t-sm)', color: 'var(--text-muted)', margin: 0 }}>
                {coach.role}
              </p>
            </div>

            {/* Bio */}
            <p style={{ fontSize: 'var(--t-sm)', color: 'var(--text-muted)', lineHeight: 1.6, margin: 0 }}>
              {coach.bio}
            </p>

            {/* Specialties */}
            <div style={{ width: '100%', textAlign: 'left' }}>
              <p
                style={{
                  fontSize: 'var(--t-caption)',
                  fontWeight: 700,
                  letterSpacing: '0.09em',
                  textTransform: 'uppercase',
                  color: 'var(--text-muted)',
                  margin: '0 0 var(--s-2)',
                }}
              >
                Spécialités
              </p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--s-1)' }}>
                {coach.specialties.map((s) => (
                  <span
                    key={s}
                    style={{
                      padding: '4px 12px',
                      borderRadius: 'var(--r-full)',
                      background: 'var(--tls-primary-50)',
                      color: 'var(--tls-primary-700)',
                      fontSize: 'var(--t-caption)',
                      fontWeight: 500,
                      border: '1px solid rgba(85,161,180,0.2)',
                    }}
                  >
                    {s}
                  </span>
                ))}
              </div>
            </div>

            {/* Contact */}
            <div style={{ width: '100%', textAlign: 'left' }}>
              <p
                style={{
                  fontSize: 'var(--t-caption)',
                  fontWeight: 700,
                  letterSpacing: '0.09em',
                  textTransform: 'uppercase',
                  color: 'var(--text-muted)',
                  margin: '0 0 var(--s-2)',
                }}
              >
                Contact
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--s-1)' }}>
                <a
                  href={`mailto:${coach.email}`}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 'var(--s-2)',
                    color: 'var(--text-muted)',
                    fontSize: 'var(--t-sm)',
                    textDecoration: 'none',
                    padding: '6px 0',
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--tls-primary-600)')}
                  onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-muted)')}
                >
                  <Mail size={15} />
                  {coach.email}
                </a>
                <a
                  href="#"
                  target="_blank"
                  rel="noreferrer"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 'var(--s-2)',
                    color: 'var(--text-muted)',
                    fontSize: 'var(--t-sm)',
                    textDecoration: 'none',
                    padding: '6px 0',
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--tls-primary-600)')}
                  onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-muted)')}
                >
                  <ExternalLink size={15} />
                  LinkedIn
                </a>
              </div>
            </div>
          </div>

          {/* ── Past sessions ───────────────────────────────────────── */}
          <div>
            <SectionHeader
              icon={<Clock size={18} />}
              title="Sessions passées"
              subtitle="Historique de vos sessions de coaching complétées"
            />

            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--s-4)' }}>
              {pastSessions.map((session) => (
                <div
                  key={session.id}
                  style={{
                    background: '#fff',
                    border: '1px solid rgba(0,0,0,0.08)',
                    borderRadius: 'var(--r-xl)',
                    padding: 'var(--s-5) var(--s-6)',
                    boxShadow: '0 1px 8px rgba(0,0,0,0.05)',
                  }}
                >
                  {/* Header */}
                  <h3
                    style={{
                      fontSize: 'var(--t-body)',
                      fontWeight: 700,
                      color: 'var(--text)',
                      margin: '0 0 var(--s-2)',
                    }}
                  >
                    {session.title}
                  </h3>

                  {/* Meta */}
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 'var(--s-3)',
                      marginBottom: 'var(--s-3)',
                    }}
                  >
                    <span
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '4px',
                        color: 'var(--text-muted)',
                        fontSize: 'var(--t-sm)',
                      }}
                    >
                      <CalendarDays size={13} style={{ color: 'var(--tls-primary-500)' }} />
                      {session.date}
                    </span>
                    <span
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '4px',
                        color: 'var(--text-muted)',
                        fontSize: 'var(--t-sm)',
                      }}
                    >
                      <Clock3 size={13} style={{ color: 'var(--tls-primary-500)' }} />
                      {session.duration}
                    </span>
                  </div>

                  {/* Notes */}
                  <p
                    style={{
                      fontSize: 'var(--t-sm)',
                      color: 'var(--text-muted)',
                      lineHeight: 1.6,
                      margin: '0 0 var(--s-4)',
                    }}
                  >
                    {session.notes}
                  </p>

                  {/* Action chips */}
                  <div style={{ display: 'flex', gap: 'var(--s-2)', flexWrap: 'wrap' }}>
                    {session.hasQuestionnaire && (
                      <ActionChip
                        icon={<FileCheck size={13} />}
                        label="Voir questionnaire"
                        color="teal"
                      />
                    )}
                    {session.hasReport && (
                      <ActionChip
                        icon={<FileText size={13} />}
                        label="Compte-rendu du coach"
                        color="orange"
                      />
                    )}
                    <ActionChip
                      icon={session.hasJournalEntry ? <Notebook size={13} /> : <Plus size={13} />}
                      label={session.hasJournalEntry ? 'Voir ma note' : 'Ajouter une note'}
                      color="warm"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
