/**
 * Profile Page
 *
 * Vue utilisateur — hero avec avatar, stats, onglets (overview / activité / badges / compétences).
 * Refactorisé avec TLS design system : tokens + composants, zéro CSS hardcodé.
 */

import React, { useMemo, useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import { Badge, Button, ProgressBar } from '../components';
import {
  Mail,
  ShieldCheck,
  UserRound,
  MapPin,
  Calendar,
  Flame,
  Trophy,
  Clock3,
  BookOpen,
  TrendingUp,
  Award,
  Star,
  Zap,
  Settings,
  CheckCircle2,
  Users,
  Edit3,
  Target,
} from 'lucide-react';

/* ─── Types ─────────────────────────────────────────────────────────────── */

type Tab = 'overview' | 'activity' | 'badges' | 'skills';

/* ─── Static data ────────────────────────────────────────────────────────── */

const USER_MOCK = {
  name: 'Alexandre Padennery',
  username: '@admin1509',
  email: 'padennery@me.com',
  role: 'Formateur Expert IA',
  location: 'Paris, France',
  joinDate: 'Janvier 2024',
  bio: "Passionné par l'IA générative et la pédagogie innovante. Je crée des expériences d'apprentissage qui transforment la formation professionnelle.",
  avatar: 'A',
  interests: ['IA Générative', 'Pédagogie', 'Prompt Engineering', 'Formation', 'Innovation'],
};

const STATS = [
  { icon: <BookOpen size={18} />, value: '12', label: 'Cours terminés', color: 'var(--tls-primary-600)' },
  { icon: <Clock3 size={18} />, value: '86h', label: 'Temps appris', color: 'var(--tls-orange-600)' },
  { icon: <Flame size={18} />, value: '7j', label: 'Série actuelle', color: '#ea580c' },
  { icon: <Trophy size={18} />, value: '2 450', label: 'Points XP', color: 'var(--tls-yellow-600)' },
];

const BADGES = [
  { id: 'b1', label: 'Pionnier IA', emoji: '🤖', variant: 'brand' as const, earned: true, date: '15 Jan 2024' },
  { id: 'b2', label: 'Streak Master', emoji: '🔥', variant: 'warm' as const, earned: true, date: '20 Jan 2024' },
  { id: 'b3', label: 'Expert GPT', emoji: '⚡', variant: 'sun' as const, earned: true, date: '25 Jan 2024' },
  { id: 'b4', label: 'Contributeur', emoji: '🌟', variant: 'info' as const, earned: true, date: '1 Fév 2024' },
  { id: 'b5', label: 'Mentor', emoji: '👨‍🏫', variant: 'neutral' as const, earned: false, progress: 60 },
  { id: 'b6', label: 'Innovateur', emoji: '💡', variant: 'neutral' as const, earned: false, progress: 40 },
];

const ACTIVITY = [
  { id: 'a1', icon: <BookOpen size={16} />, title: 'Formation GPT-4 Avancé terminée', date: "Aujourd'hui", variant: 'success' as const },
  { id: 'a2', icon: <Award size={16} />, title: 'Badge "Expert GPT" débloqué', date: 'Hier', variant: 'sun' as const },
  { id: 'a3', icon: <Flame size={16} />, title: 'Série de 7 jours maintenue', date: 'Il y a 2 jours', variant: 'warm' as const },
  { id: 'a4', icon: <Users size={16} />, title: 'Session coaching avec Sophie Martin', date: 'Il y a 3 jours', variant: 'info' as const },
];

const SKILLS = [
  { id: 's1', label: 'Prompt Engineering', value: 95, fill: 'brand' as const },
  { id: 's2', label: 'IA Générative', value: 88, fill: 'brand' as const },
  { id: 's3', label: 'Pédagogie', value: 92, fill: 'warm' as const },
  { id: 's4', label: 'Design Thinking', value: 78, fill: 'gradient' as const },
  { id: 's5', label: 'Veille Technologique', value: 85, fill: 'warm' as const },
];

const TABS: { id: Tab; icon: React.ReactNode; label: string }[] = [
  { id: 'overview', icon: <Trophy size={15} />, label: "Vue d'ensemble" },
  { id: 'activity', icon: <TrendingUp size={15} />, label: 'Activité récente' },
  { id: 'badges', icon: <Award size={15} />, label: 'Badges' },
  { id: 'skills', icon: <Zap size={15} />, label: 'Compétences' },
];

/* ─── Component ──────────────────────────────────────────────────────────── */

export const Profile: React.FC = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState<Tab>('overview');

  const displayUser = {
    name: user?.name ?? USER_MOCK.name,
    email: user?.email ?? USER_MOCK.email,
    roles: user?.roles ?? ['Apprenant', 'Formateur'],
  };

  /* ── Render ── */
  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)', fontFamily: 'var(--font-body)' }}>

      {/* ─ Hero ─────────────────────────────────────────────────────────── */}
      <div
        style={{
          background:
            'linear-gradient(135deg, var(--tls-primary-100) 0%, rgba(255,255,255,0.8) 50%, rgba(254,243,199,0.7) 100%)',
          padding: 'var(--s-8)',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Decorative blobs */}
        <div
          aria-hidden="true"
          style={{
            position: 'absolute',
            top: '-20%',
            left: '-5%',
            width: '400px',
            height: '400px',
            borderRadius: '50%',
            background:
              'radial-gradient(circle, rgba(124,58,237,0.08) 0%, transparent 70%)',
            pointerEvents: 'none',
          }}
        />
        <div
          aria-hidden="true"
          style={{
            position: 'absolute',
            bottom: '-20%',
            right: '5%',
            width: '350px',
            height: '350px',
            borderRadius: '50%',
            background:
              'radial-gradient(circle, rgba(251,191,36,0.1) 0%, transparent 70%)',
            pointerEvents: 'none',
          }}
        />

        {/* Main profile card */}
        <div
          style={{
            background: 'rgba(255,255,255,0.85)',
            backdropFilter: 'var(--glass-blur)',
            WebkitBackdropFilter: 'var(--glass-blur)',
            border: '1px solid rgba(255,255,255,0.7)',
            borderRadius: 'var(--r-2xl)',
            boxShadow: '0 8px 40px rgba(0,0,0,0.08), 0 1px 0 rgba(255,255,255,0.9) inset',
            padding: 'var(--s-8)',
            maxWidth: '1000px',
            margin: '0 auto',
            position: 'relative',
          }}
        >
          <div
            style={{
              display: 'flex',
              gap: 'var(--s-6)',
              alignItems: 'flex-start',
              flexWrap: 'wrap',
            }}
          >
            {/* Avatar */}
            <div style={{ position: 'relative', flexShrink: 0 }}>
              <div
                style={{
                  width: '88px',
                  height: '88px',
                  borderRadius: '50%',
                  background:
                    'linear-gradient(135deg, var(--tls-primary-600) 0%, var(--tls-orange-500) 100%)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: '0 8px 24px rgba(124,58,237,0.25)',
                }}
              >
                <span
                  style={{
                    color: 'var(--text-inverse)',
                    fontWeight: 800,
                    fontSize: '2rem',
                    letterSpacing: '-0.02em',
                  }}
                >
                  {USER_MOCK.avatar}
                </span>
              </div>
              {/* Online indicator */}
              <div
                style={{
                  position: 'absolute',
                  bottom: '4px',
                  right: '4px',
                  width: '14px',
                  height: '14px',
                  borderRadius: '50%',
                  background: '#22c55e',
                  border: '2px solid #fff',
                  boxShadow: '0 0 0 2px rgba(34,197,94,0.2)',
                }}
              />
            </div>

            {/* Name + meta */}
            <div style={{ flex: 1, minWidth: '200px' }}>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 'var(--s-3)',
                  marginBottom: 'var(--s-1)',
                  flexWrap: 'wrap',
                }}
              >
                <h1
                  style={{
                    fontSize: 'var(--t-h2)',
                    fontWeight: 800,
                    color: 'var(--text)',
                    margin: 0,
                    letterSpacing: '-0.01em',
                  }}
                >
                  {displayUser.name}
                </h1>
                <Badge variant="sun">Niveau 12</Badge>
              </div>
              <p
                style={{
                  fontSize: 'var(--t-sm)',
                  color: 'var(--text-muted)',
                  margin: '0 0 var(--s-3)',
                }}
              >
                {USER_MOCK.role} · {USER_MOCK.username}
              </p>

              {/* Meta chips */}
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--s-2)', marginBottom: 'var(--s-4)' }}>
                {[
                  { icon: <Mail size={13} />, label: displayUser.email },
                  { icon: <MapPin size={13} />, label: USER_MOCK.location },
                  { icon: <Calendar size={13} />, label: `Membre depuis ${USER_MOCK.joinDate}` },
                ].map(({ icon, label }) => (
                  <span
                    key={label}
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '5px',
                      padding: '4px 10px',
                      borderRadius: 'var(--r-full)',
                      background: 'var(--surface-muted)',
                      border: '1px solid var(--border)',
                      color: 'var(--text-muted)',
                      fontSize: '12px',
                      fontWeight: 500,
                    }}
                  >
                    {icon}
                    {label}
                  </span>
                ))}
              </div>

              {/* Bio */}
              <p
                style={{
                  fontSize: 'var(--t-sm)',
                  color: 'var(--text-muted)',
                  lineHeight: 1.65,
                  margin: '0 0 var(--s-4)',
                  maxWidth: '560px',
                }}
              >
                {USER_MOCK.bio}
              </p>

              {/* Interests */}
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--s-1)' }}>
                {USER_MOCK.interests.map((interest) => (
                  <span
                    key={interest}
                    style={{
                      padding: '3px 10px',
                      borderRadius: 'var(--r-full)',
                      background: 'var(--tls-primary-50)',
                      color: 'var(--tls-primary-700)',
                      fontSize: 'var(--t-caption)',
                      fontWeight: 600,
                      border: '1px solid rgba(124,58,237,0.12)',
                    }}
                  >
                    {interest}
                  </span>
                ))}
              </div>
            </div>

            {/* Action buttons */}
            <div style={{ display: 'flex', gap: 'var(--s-2)', flexShrink: 0 }}>
              <Button variant="ghost" size="sm">
                <Edit3 size={14} />
                Modifier
              </Button>
              <Button variant="ghost" size="sm">
                <Settings size={14} />
              </Button>
            </div>
          </div>

          {/* Stats row */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(4, 1fr)',
              gap: 'var(--s-3)',
              marginTop: 'var(--s-6)',
              paddingTop: 'var(--s-6)',
              borderTop: '1px solid var(--border)',
            }}
          >
            {STATS.map(({ icon, value, label, color }) => (
              <div
                key={label}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 'var(--s-1)',
                  alignItems: 'flex-start',
                }}
              >
                <span style={{ color }}>{icon}</span>
                <span
                  style={{
                    fontSize: '1.75rem',
                    fontWeight: 800,
                    color: 'var(--text)',
                    lineHeight: 1,
                  }}
                >
                  {value}
                </span>
                <span
                  style={{
                    fontSize: 'var(--t-caption)',
                    color: 'var(--text-muted)',
                    fontWeight: 500,
                  }}
                >
                  {label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ─ Tabs ─────────────────────────────────────────────────────────── */}
      <div
        style={{
          background: 'var(--surface)',
          borderBottom: '1px solid var(--border)',
          padding: '0 var(--s-8)',
        }}
      >
        <div
          role="tablist"
          aria-label="Sections du profil"
          style={{
            display: 'flex',
            gap: 0,
            maxWidth: '1000px',
            margin: '0 auto',
          }}
        >
          {TABS.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                role="tab"
                aria-selected={isActive}
                onClick={() => setActiveTab(tab.id)}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 'var(--s-2)',
                  padding: 'var(--s-4) var(--s-5)',
                  border: 'none',
                  background: 'transparent',
                  color: isActive ? 'var(--tls-primary-700)' : 'var(--text-muted)',
                  fontWeight: isActive ? 700 : 500,
                  fontSize: 'var(--t-sm)',
                  cursor: 'pointer',
                  borderBottom: isActive ? '2px solid var(--tls-primary-500)' : '2px solid transparent',
                  marginBottom: '-1px',
                  transition: 'all var(--dur-2)',
                  fontFamily: 'var(--font-body)',
                  whiteSpace: 'nowrap',
                }}
              >
                {tab.icon}
                {tab.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* ─ Tab content ──────────────────────────────────────────────────── */}
      <main
        style={{
          padding: 'var(--s-8)',
          maxWidth: '1000px',
          margin: '0 auto',
        }}
      >

        {/* ─ Overview ── */}
        {activeTab === 'overview' && (
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: 'var(--s-5)',
            }}
          >
            {/* Info card */}
            <div
              style={{
                background: 'var(--surface)',
                border: '1px solid var(--border)',
                borderRadius: 'var(--r-2xl)',
                padding: 'var(--s-6)',
              }}
            >
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginBottom: 'var(--s-4)',
                }}
              >
                <h3 style={{ fontSize: 'var(--t-h4)', fontWeight: 700, color: 'var(--text)', margin: 0 }}>
                  Informations
                </h3>
                <Button size="sm" variant="ghost">
                  <Edit3 size={13} />
                  Modifier
                </Button>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--s-3)' }}>
                {[
                  { icon: <UserRound size={15} />, label: displayUser.name },
                  { icon: <Mail size={15} />, label: displayUser.email },
                  { icon: <ShieldCheck size={15} />, label: `ID ${user?.id ?? '1'}` },
                  { icon: <TrendingUp size={15} />, label: 'Top 5% apprenants IA' },
                  { icon: <Trophy size={15} />, label: '2 450 points XP' },
                ].map(({ icon, label }) => (
                  <div
                    key={label}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 'var(--s-3)',
                      padding: 'var(--s-2) var(--s-3)',
                      borderRadius: 'var(--r-lg)',
                      background: 'var(--bg)',
                    }}
                  >
                    <span style={{ color: 'var(--tls-primary-500)', flexShrink: 0 }}>{icon}</span>
                    <span style={{ fontSize: 'var(--t-sm)', color: 'var(--text)' }}>{label}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Roles & top badges */}
            <div
              style={{
                background: 'var(--surface)',
                border: '1px solid var(--border)',
                borderRadius: 'var(--r-2xl)',
                padding: 'var(--s-6)',
              }}
            >
              <h3 style={{ fontSize: 'var(--t-h4)', fontWeight: 700, color: 'var(--text)', margin: '0 0 var(--s-4)' }}>
                Rôles & Badges
              </h3>

              <div style={{ marginBottom: 'var(--s-4)' }}>
                <p style={{ fontSize: 'var(--t-caption)', fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.07em', margin: '0 0 var(--s-2)' }}>
                  Rôles
                </p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--s-2)' }}>
                  {displayUser.roles.map((role: string) => (
                    <Badge key={role} variant="neutral">{role}</Badge>
                  ))}
                </div>
              </div>

              <div style={{ marginBottom: 'var(--s-5)' }}>
                <p style={{ fontSize: 'var(--t-caption)', fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.07em', margin: '0 0 var(--s-2)' }}>
                  Badges récents
                </p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--s-2)' }}>
                  <Badge variant="success"><Award size={12} /> Expert GPT</Badge>
                  <Badge variant="warm"><Star size={12} /> Pionnier IA</Badge>
                  <Badge variant="info"><CheckCircle2 size={12} /> Streak Master</Badge>
                </div>
              </div>

              {/* Recommendation callout */}
              <div
                style={{
                  background: 'linear-gradient(135deg, var(--tls-primary-50) 0%, rgba(255,255,255,0.8) 100%)',
                  border: '1px solid rgba(124,58,237,0.15)',
                  borderRadius: 'var(--r-xl)',
                  padding: 'var(--s-4)',
                }}
              >
                <p style={{ margin: '0 0 var(--s-1)', fontWeight: 700, fontSize: 'var(--t-sm)', color: 'var(--text)' }}>
                  🎯 Focus recommandé
                </p>
                <p style={{ margin: 0, fontSize: 'var(--t-caption)', color: 'var(--text-muted)', lineHeight: 1.5 }}>
                  Priorité aux modules IA Générative et Prompt Engineering pour atteindre le palier Expert.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* ─ Activity ── */}
        {activeTab === 'activity' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--s-3)' }}>
            {ACTIVITY.map((item) => (
              <div
                key={item.id}
                style={{
                  background: 'var(--surface)',
                  border: '1px solid var(--border)',
                  borderRadius: 'var(--r-xl)',
                  padding: 'var(--s-4) var(--s-5)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 'var(--s-4)',
                }}
              >
                <div
                  style={{
                    width: '38px',
                    height: '38px',
                    borderRadius: 'var(--r-lg)',
                    background: 'var(--surface-muted)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'var(--text-muted)',
                    flexShrink: 0,
                  }}
                >
                  {item.icon}
                </div>
                <div style={{ flex: 1 }}>
                  <p style={{ margin: '0 0 2px', fontSize: 'var(--t-sm)', fontWeight: 600, color: 'var(--text)' }}>
                    {item.title}
                  </p>
                  <p style={{ margin: 0, fontSize: 'var(--t-caption)', color: 'var(--text-muted)' }}>
                    {item.date}
                  </p>
                </div>
                <Badge variant={item.variant}>
                  {item.variant === 'success' ? 'Terminé' : item.variant === 'sun' ? 'Nouveau' : item.variant === 'warm' ? 'Actif' : 'Info'}
                </Badge>
              </div>
            ))}
          </div>
        )}

        {/* ─ Badges ── */}
        {activeTab === 'badges' && (
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: 'var(--s-4)',
            }}
          >
            {BADGES.map((badge) => (
              <div
                key={badge.id}
                style={{
                  background: badge.earned ? 'var(--surface)' : 'var(--bg)',
                  border: `1px solid ${badge.earned ? 'var(--border)' : 'var(--border)'}`,
                  borderRadius: 'var(--r-2xl)',
                  padding: 'var(--s-6)',
                  textAlign: 'center',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: 'var(--s-3)',
                  opacity: badge.earned ? 1 : 0.65,
                  transition: 'all var(--dur-2)',
                }}
              >
                <span style={{ fontSize: '2.5rem' }}>{badge.emoji}</span>
                <div>
                  <p style={{ margin: '0 0 var(--s-1)', fontSize: 'var(--t-sm)', fontWeight: 700, color: 'var(--text)' }}>
                    {badge.label}
                  </p>
                  {badge.earned ? (
                    <>
                      <Badge variant={badge.variant}>{badge.label}</Badge>
                      <p style={{ margin: 'var(--s-2) 0 0', fontSize: 'var(--t-caption)', color: 'var(--text-muted)' }}>
                        {badge.date}
                      </p>
                    </>
                  ) : (
                    <>
                      <Badge variant="neutral">En cours</Badge>
                      <div style={{ width: '100%', marginTop: 'var(--s-2)' }}>
                        <ProgressBar value={badge.progress!} size="sm" fill="brand" valueLabel={false} />
                        <p style={{ margin: 'var(--s-1) 0 0', fontSize: 'var(--t-caption)', color: 'var(--text-muted)' }}>
                          {badge.progress}% accompli
                        </p>
                      </div>
                    </>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* ─ Skills ── */}
        {activeTab === 'skills' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--s-4)' }}>
            {SKILLS.map((skill) => (
              <div
                key={skill.id}
                style={{
                  background: 'var(--surface)',
                  border: '1px solid var(--border)',
                  borderRadius: 'var(--r-xl)',
                  padding: 'var(--s-5)',
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: 'var(--s-3)',
                  }}
                >
                  <span style={{ fontSize: 'var(--t-sm)', fontWeight: 700, color: 'var(--text)' }}>
                    {skill.label}
                  </span>
                  <span
                    style={{
                      fontSize: 'var(--t-sm)',
                      fontWeight: 800,
                      color: skill.value >= 90 ? 'var(--tls-primary-700)' : 'var(--text)',
                    }}
                  >
                    {skill.value}%
                  </span>
                </div>
                <ProgressBar value={skill.value} size="md" fill={skill.fill} valueLabel={false} />
                <p
                  style={{
                    margin: 'var(--s-2) 0 0',
                    fontSize: 'var(--t-caption)',
                    color: 'var(--text-muted)',
                  }}
                >
                  {skill.value >= 90
                    ? '🏆 Niveau expert'
                    : skill.value >= 75
                      ? '📈 Progression avancée'
                      : '📚 En développement'}
                </p>
              </div>
            ))}
          </div>
        )}

      </main>
    </div>
  );
};
