import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/core/Button';
import { RankingCard } from '../components/learning/RankingCard';
import { Flame, Medal, Sparkles, Trophy, TrendingUp, Users, Zap, ArrowUp, Minus, ArrowDown, Star } from 'lucide-react';
import '../styles/static-pages.css';

const PODIUM_USERS = [
  { name: 'Sophie Martin',  points: 1240, streak: 18, initials: 'SM', rank: 1, level: 12, xp: 4820, badges: 9 },
  { name: 'Pierre Bernard', points: 1120, streak: 13, initials: 'PB', rank: 2, level: 11, xp: 4110, badges: 7 },
  { name: 'Nadia Ferreira', points: 980,  streak: 9,  initials: 'NF', rank: 3, level: 10, xp: 3540, badges: 6 },
];

const FULL_RANKING = [
  { rank: 4,  name: 'Julien Moreau',    initials: 'JM', points: 870, trend: 'up'   as const, level: 9,  xp: 3020, badges: 5, isCurrentUser: false },
  { rank: 5,  name: 'Amina Benali',     initials: 'AB', points: 820, trend: 'same' as const, level: 9,  xp: 2880, badges: 4, isCurrentUser: false },
  { rank: 6,  name: 'Thomas Dupont',    initials: 'TD', points: 760, trend: 'down' as const, level: 8,  xp: 2650, badges: 4, isCurrentUser: false },
  { rank: 7,  name: 'Claire Fontaine',  initials: 'CF', points: 710, trend: 'up'   as const, level: 8,  xp: 2480, badges: 3, isCurrentUser: false },
  { rank: 8,  name: 'Vous',             initials: 'VT', points: 680, trend: 'same' as const, level: 7,  xp: 2240, badges: 3, isCurrentUser: true  },
  { rank: 9,  name: 'Lucie Perrot',     initials: 'LP', points: 640, trend: 'up'   as const, level: 7,  xp: 2100, badges: 2, isCurrentUser: false },
  { rank: 10, name: 'Antoine Garnier',  initials: 'AG', points: 600, trend: 'down' as const, level: 6,  xp: 1980, badges: 2, isCurrentUser: false },
];

const AVATAR_PALETTE = [
  { bg: 'var(--tls-primary-100)',  color: 'var(--tls-primary-700)' },
  { bg: 'var(--tls-orange-100)',   color: 'var(--tls-orange-700)' },
  { bg: 'var(--tls-yellow-100)',   color: 'var(--tls-yellow-700)' },
  { bg: 'var(--tls-success-bg)',   color: 'var(--tls-success-fg)' },
  { bg: 'var(--tls-primary-100)',  color: 'var(--tls-primary-700)' },
];

const TREND_ICON: Record<'up' | 'same' | 'down', React.ReactNode> = {
  up:   <ArrowUp   size={11} style={{ color: 'var(--tls-success-fg)' }} />,
  same: <Minus     size={11} style={{ color: 'var(--text-muted)' }} />,
  down: <ArrowDown size={11} style={{ color: 'var(--tls-orange-600)' }} />,
};

const PODIUM = [
  {
    label: '1er',
    emoji: '🥇',
    gradient: 'linear-gradient(135deg, var(--tls-yellow-100) 0%, var(--tls-ink-0) 100%)',
    border: 'var(--tls-yellow-300)',
    accent: 'var(--tls-yellow-600)',
    accentBg: 'var(--tls-yellow-100)',
    shadow: 'var(--shadow-warm)',
  },
  {
    label: '2ème',
    emoji: '🥈',
    gradient: 'linear-gradient(135deg, var(--tls-ink-100) 0%, var(--tls-ink-0) 100%)',
    border: 'var(--tls-ink-300)',
    accent: 'var(--tls-ink-500)',
    accentBg: 'var(--tls-ink-100)',
    shadow: 'var(--shadow-sm)',
  },
  {
    label: '3ème',
    emoji: '🥉',
    gradient: 'linear-gradient(135deg, var(--tls-orange-100) 0%, var(--tls-ink-0) 100%)',
    border: 'var(--tls-orange-300)',
    accent: 'var(--tls-orange-600)',
    accentBg: 'var(--tls-orange-100)',
    shadow: 'var(--shadow-lg)',
  },
];

export const Leaderboard: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="tls-page">
      {/* Hero */}
      <section className="tls-editorial-hero">
        <span className="tls-editorial-eyebrow"><Trophy size={12} /> Progression communauté</span>
        <h1>Leaderboard</h1>
        <p className="tls-editorial-summary">Classement communautaire hebdomadaire — les apprenants les plus engagés mis à l'honneur.</p>
      </section>

      {/* KPI Row */}
      <section className="tls-kpi-row">
        <div className="tls-kpi">
          <div className="tls-kpi-icon" style={{ background: 'var(--tls-primary-50)', color: 'var(--tls-primary-600)' }}>
            <Users size={20} />
          </div>
          <h2 style={{ fontSize: 'var(--t-h2)', fontWeight: 800, margin: 0, color: 'var(--tls-primary-700)', letterSpacing: '-0.03em' }}>
            {PODIUM_USERS.length + FULL_RANKING.length}
          </h2>
          <span style={{ fontSize: 'var(--t-caption)', color: 'var(--text-muted)' }}>Participants</span>
        </div>
        <div className="tls-kpi">
          <div className="tls-kpi-icon" style={{ background: 'var(--tls-orange-50)', color: 'var(--tls-orange-600)' }}>
            <Trophy size={20} />
          </div>
          <h2 style={{ fontSize: 'var(--t-h2)', fontWeight: 800, margin: 0, color: 'var(--tls-orange-600)', letterSpacing: '-0.03em' }}>
            #8
          </h2>
          <span style={{ fontSize: 'var(--t-caption)', color: 'var(--text-muted)' }}>Votre classement</span>
        </div>
        <div className="tls-kpi">
          <div className="tls-kpi-icon" style={{ background: 'var(--tls-yellow-50)', color: 'var(--tls-yellow-600)' }}>
            <Zap size={20} />
          </div>
          <h2 style={{ fontSize: 'var(--t-h2)', fontWeight: 800, margin: 0, color: 'var(--tls-yellow-600)', letterSpacing: '-0.03em' }}>
            2 240
          </h2>
          <span style={{ fontSize: 'var(--t-caption)', color: 'var(--text-muted)' }}>Votre XP total</span>
        </div>
        <div className="tls-kpi">
          <div className="tls-kpi-icon" style={{ background: 'var(--tls-yellow-50)', color: 'var(--tls-yellow-600)' }}>
            <Flame size={20} />
          </div>
          <h2 style={{ fontSize: 'var(--t-h2)', fontWeight: 800, margin: 0, color: 'var(--tls-yellow-600)', letterSpacing: '-0.03em' }}>
            18j
          </h2>
          <span style={{ fontSize: 'var(--t-caption)', color: 'var(--text-muted)' }}>Meilleur streak</span>
        </div>
      </section>

      {/* Podium Cards */}
      <section className="tls-grid tls-grid--wide">
        {PODIUM_USERS.map((entry, index) => {
          const pod = PODIUM[index];
          return (
            <div
              key={entry.name}
              style={{
                borderRadius: 'var(--r-2xl)',
                border: `1px solid ${pod.border}`,
                background: pod.gradient,
                backdropFilter: 'var(--glass-blur-light)',
                WebkitBackdropFilter: 'var(--glass-blur-light)',
                boxShadow: pod.shadow,
                padding: 'var(--s-6)',
                display: 'flex',
                flexDirection: 'column',
                gap: 'var(--s-4)',
                position: 'relative' as const,
                overflow: 'hidden',
                transition: 'transform var(--dur-2), box-shadow var(--dur-2)',
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLDivElement).style.transform = 'translateY(-3px)';
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLDivElement).style.transform = 'translateY(0)';
              }}
            >
              {/* Rank badge */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span style={{
                  fontSize: '2rem',
                  lineHeight: 1,
                }}>
                  {pod.emoji}
                </span>
                <span style={{
                  padding: 'var(--s-1) var(--s-3)',
                  borderRadius: 'var(--r-pill)',
                  background: pod.accentBg,
                  color: pod.accent,
                  fontSize: 'var(--t-caption)',
                  fontWeight: 700,
                  border: `1px solid ${pod.border}`,
                }}>
                  {entry.points} pts
                </span>
              </div>

              {/* Avatar + name */}
              <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--s-3)' }}>
                <div style={{
                  width: 48,
                  height: 48,
                  borderRadius: '50%',
                  background: pod.accentBg,
                  border: `2px solid ${pod.border}`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: 'var(--t-body-sm)',
                  fontWeight: 800,
                  color: pod.accent,
                  flexShrink: 0,
                }}>
                  {entry.initials}
                </div>
                <div>
                  <p style={{ margin: 0, fontSize: 'var(--t-body)', fontWeight: 700, color: 'var(--text)' }}>
                    {entry.name}
                  </p>
                  <p style={{ margin: 0, fontSize: 'var(--t-caption)', color: 'var(--text-muted)' }}>
                    {pod.label} du classement
                  </p>
                </div>
              </div>

              {/* Stats row: streak + level */}
              <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--s-2)', flexWrap: 'wrap' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--s-1-5)', padding: 'var(--s-2) var(--s-3)', borderRadius: 'var(--r-pill)', background: pod.accentBg, width: 'fit-content' }}>
                  <Flame size={13} style={{ color: pod.accent }} />
                  <span style={{ fontSize: 'var(--t-caption)', fontWeight: 600, color: pod.accent }}>
                    {entry.streak}j streak
                  </span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--s-1-5)', padding: 'var(--s-2) var(--s-3)', borderRadius: 'var(--r-pill)', background: pod.accentBg, width: 'fit-content' }}>
                  <Star size={12} style={{ color: pod.accent }} />
                  <span style={{ fontSize: 'var(--t-caption)', fontWeight: 600, color: pod.accent }}>
                    Niv.&nbsp;{entry.level}
                  </span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--s-1-5)', padding: 'var(--s-2) var(--s-3)', borderRadius: 'var(--r-pill)', background: pod.accentBg, width: 'fit-content' }}>
                  <Zap size={12} style={{ color: pod.accent }} />
                  <span style={{ fontSize: 'var(--t-caption)', fontWeight: 600, color: pod.accent }}>
                    {entry.xp.toLocaleString()} XP
                  </span>
                </div>
              </div>

              <Button size="sm" variant="secondary" style={{ alignSelf: 'flex-start' }}>
                <Medal size={13} /> Voir le profil
              </Button>
            </div>
          );
        })}
      </section>

      {/* Full ranking list */}
      <section>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--s-3)' }}>
          {FULL_RANKING.map((entry) => (
            <RankingCard
              key={entry.rank}
              rank={entry.rank}
              name={entry.name}
              points={entry.points}
              streak={undefined}
              variant={entry.isCurrentUser ? 'brand' : 'neutral'}
              onViewProfile={() => navigate(`/profile/${entry.rank}`)}
            />
          ))}
        </div>
      </section>

      {/* Weekly goal */}
      <div style={{
        borderRadius: 'var(--r-2xl)',
        border: '1px solid var(--tls-primary-200)',
        background: 'linear-gradient(135deg, var(--tls-primary-50) 0%, var(--surface) 100%)',
        backdropFilter: 'var(--glass-blur-light)',
        WebkitBackdropFilter: 'var(--glass-blur-light)',
        padding: 'var(--s-6)',
        boxShadow: 'var(--shadow-sm), inset 0 1px 0 rgba(255,255,255,0.95)',
        display: 'flex',
        flexDirection: 'column' as const,
        gap: 'var(--s-4)',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--s-3)' }}>
          <div className="tls-kpi-icon" style={{ background: 'var(--tls-primary-50)', color: 'var(--tls-primary-600)' }}>
            <Zap size={20} />
          </div>
          <div>
            <h3 style={{ margin: 0, fontSize: 'var(--t-h4)', fontWeight: 700, color: 'var(--text)', display: 'flex', alignItems: 'center', gap: 'var(--s-2)' }}>
              <Sparkles size={16} style={{ color: 'var(--tls-primary-500)' }} />
              Objectif de la semaine
            </h3>
            <p style={{ margin: 0, fontSize: 'var(--t-body-sm)', color: 'var(--text-muted)' }}>
              Complétez 3 activités réflexives et 2 modules pour intégrer le top 3.
            </p>
          </div>
        </div>
        <div>
          <Button onClick={() => navigate('/learning-paths')}>Continuer mon parcours</Button>
        </div>
      </div>
    </div>
  );
};
