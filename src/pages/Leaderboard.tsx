import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/core/Button';
import { Flame, Medal, Sparkles, Trophy, TrendingUp, Users, Zap } from 'lucide-react';
import '../styles/static-pages.css';

const ranking = [
  { name: 'Sophie Martin',  points: 1240, streak: 18, initials: 'SM', rank: 1 },
  { name: 'Pierre Bernard', points: 1120, streak: 13, initials: 'PB', rank: 2 },
  { name: 'Nadia Ferreira', points: 980,  streak: 9,  initials: 'NF', rank: 3 },
];

const PODIUM = [
  {
    label: '1er',
    emoji: '🥇',
    gradient: 'linear-gradient(135deg, rgba(248,176,68,0.22) 0%, rgba(255,255,255,0.88) 100%)',
    border: 'rgba(248,176,68,0.35)',
    accent: 'var(--tls-yellow-600)',
    accentBg: 'rgba(248,176,68,0.12)',
    shadow: '0 8px 32px rgba(248,176,68,0.18), inset 0 1px 0 rgba(255,255,255,0.95)',
  },
  {
    label: '2ème',
    emoji: '🥈',
    gradient: 'linear-gradient(135deg, rgba(168,180,188,0.18) 0%, rgba(255,255,255,0.88) 100%)',
    border: 'rgba(168,180,188,0.35)',
    accent: 'var(--tls-ink-500)',
    accentBg: 'rgba(168,180,188,0.12)',
    shadow: '0 6px 24px rgba(168,180,188,0.18), inset 0 1px 0 rgba(255,255,255,0.95)',
  },
  {
    label: '3ème',
    emoji: '🥉',
    gradient: 'linear-gradient(135deg, rgba(200,130,72,0.16) 0%, rgba(255,255,255,0.88) 100%)',
    border: 'rgba(200,130,72,0.3)',
    accent: 'var(--tls-orange-600)',
    accentBg: 'rgba(200,130,72,0.1)',
    shadow: '0 4px 20px rgba(200,130,72,0.14), inset 0 1px 0 rgba(255,255,255,0.95)',
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
        <div className="tls-kpi" style={{ '--kpi-accent': 'var(--tls-primary-600)' } as React.CSSProperties}>
          <div className="tls-kpi-icon" style={{ background: 'var(--tls-primary-50)', color: 'var(--tls-primary-600)', marginBottom: 'var(--s-2)' }}>
            <Users size={20} />
          </div>
          <strong style={{ color: 'var(--tls-primary-700)' }}>3</strong>
          <span>Top contributeurs</span>
        </div>
        <div className="tls-kpi">
          <div className="tls-kpi-icon" style={{ background: 'rgba(237,132,58,0.1)', color: 'var(--tls-orange-600)', marginBottom: 'var(--s-2)' }}>
            <TrendingUp size={20} />
          </div>
          <strong style={{ color: 'var(--tls-orange-600)' }}>+12%</strong>
          <span>Engagement cette semaine</span>
        </div>
        <div className="tls-kpi">
          <div className="tls-kpi-icon" style={{ background: 'rgba(248,176,68,0.12)', color: 'var(--tls-yellow-600)', marginBottom: 'var(--s-2)' }}>
            <Flame size={20} />
          </div>
          <strong style={{ color: 'var(--tls-yellow-600)' }}>18j</strong>
          <span>Meilleur streak actuel</span>
        </div>
      </section>

      {/* Podium Cards */}
      <section className="tls-grid tls-grid--wide">
        {ranking.map((entry, index) => {
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

              {/* Streak pill */}
              <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--s-1-5)', padding: 'var(--s-2) var(--s-3)', borderRadius: 'var(--r-pill)', background: pod.accentBg, width: 'fit-content' }}>
                <Flame size={13} style={{ color: pod.accent }} />
                <span style={{ fontSize: 'var(--t-caption)', fontWeight: 600, color: pod.accent }}>
                  {entry.streak} jours de suite
                </span>
              </div>

              <Button size="sm" variant="secondary" style={{ alignSelf: 'flex-start' }}>
                <Medal size={13} /> Voir le profil
              </Button>
            </div>
          );
        })}
      </section>

      {/* Weekly goal */}
      <div style={{
        borderRadius: 'var(--r-2xl)',
        border: '1px solid rgba(85, 161, 180, 0.2)',
        background: 'linear-gradient(135deg, rgba(85,161,180,0.1) 0%, rgba(255,255,255,0.88) 100%)',
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
