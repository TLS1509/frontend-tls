import React from 'react';
import { Flame, Trophy, BookOpen, TrendingUp } from 'lucide-react';
import EmojiWaveGlass from './EmojiWaveGlass';

interface DashboardHeroV2FixedProps {
  userName?: string;
  descriptivePhrase?: string;
  dailyQuote?: string;
  statsLoading?: boolean;
  userStats?: {
    currentStreak: number;
    totalBadges: number;
    coursesInProgress: number;
    completionRate: number;
  };
}

export default function DashboardHeroV2Fixed({
  userName = 'Pierre-Armand',
  descriptivePhrase = 'Votre parcours d\'apprentissage commence ici.',
  dailyQuote = '"Espacer les sessions d\'apprentissage améliore la rétention à long terme." — Robert Bjork',
  statsLoading = false,
  userStats = {
    currentStreak: 7,
    totalBadges: 12,
    coursesInProgress: 3,
    completionRate: 68
  }
}: DashboardHeroV2FixedProps) {
  
  return (
    <>
      <style>
        {`
          @keyframes fadeSlideUp {
            0% {
              opacity: 0;
              transform: translateY(15px);
            }
            100% {
              opacity: 1;
              transform: translateY(0);
            }
          }

          @keyframes scaleIn {
            0% {
              opacity: 0;
              transform: scale(0.95);
            }
            100% {
              opacity: 1;
              transform: scale(1);
            }
          }

          @keyframes shimmerFlow {
            0% {
              background-position: -200% center;
            }
            100% {
              background-position: 200% center;
            }
          }

          .hero-title {
            animation: fadeSlideUp 0.6s ease-out;
          }

          .hero-phrase {
            animation: fadeSlideUp 0.8s ease-out 0.2s both;
          }

          .hero-quote {
            animation: fadeSlideUp 1s ease-out 0.4s both;
          }

          .hero-stat-card {
            animation: scaleIn 0.5s ease-out both;
          }

          .hero-stat-card:nth-child(1) {
            animation-delay: 0.5s;
          }

          .hero-stat-card:nth-child(2) {
            animation-delay: 0.6s;
          }

          .hero-stat-card:nth-child(3) {
            animation-delay: 0.7s;
          }

          .hero-stat-card:nth-child(4) {
            animation-delay: 0.8s;
          }

          .shimmer-effect {
            position: relative;
            overflow: hidden;
          }

          .shimmer-effect::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: linear-gradient(
              90deg,
              transparent 0%,
              rgba(255, 255, 255, 0.15) 50%,
              transparent 100%
            );
            background-size: 200% 100%;
            animation: shimmerFlow 3s linear infinite;
            pointer-events: none;
          }
        `}
      </style>

      <div 
        style={{ 
          maxWidth: '1000px',
          margin: '0 auto',
          padding: 'var(--space-8) var(--space-6)',
        }}
      >
        {/* ========== HEADER WITH GRADIENT TITLE ========== */}
        <div 
          className="hero-title"
          style={{ 
            display: 'flex', 
            flexDirection: 'column', 
            gap: 'var(--space-4)',
            marginBottom: 'var(--space-8)',
            alignItems: 'center',
            textAlign: 'center',
          }}
        >
          {/* Welcome Title */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-4)' }}>
            <h1 
              style={{ 
                fontFamily: 'var(--font-display)',
                fontSize: 'var(--text-4xl)',
                fontWeight: 'var(--font-weight-bold)',
                lineHeight: 'var(--leading-tight)',
                margin: 0,
                background: 'var(--gradient-tls-text-hero-light)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              Bienvenue {userName}
            </h1>
            <EmojiWaveGlass />
          </div>

          {/* Descriptive Phrase */}
          <h3 
            className="hero-phrase"
            style={{ 
              color: 'var(--muted-foreground)',
              fontSize: 'var(--text-xl)',
              lineHeight: 'var(--leading-relaxed)',
              fontFamily: 'var(--font-display)',
              margin: 0,
              fontWeight: 'var(--font-weight-medium)',
              maxWidth: '700px',
            }}
          >
            {statsLoading ? 'Chargement...' : descriptivePhrase}
          </h3>
        </div>

        {/* ========== STATS CARDS GRID ========== */}
        <div 
          style={{ 
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: 'var(--space-4)',
            marginBottom: 'var(--space-8)',
          }}
        >
          {/* Stat 1: Streak - BLEU TLS */}
          <div 
            className="hero-stat-card shimmer-effect"
            style={{ 
              background: 'linear-gradient(135deg, rgba(85, 161, 180, 0.1) 0%, rgba(85, 161, 180, 0.05) 100%)',
              backdropFilter: 'blur(20px)',
              WebkitBackdropFilter: 'blur(20px)',
              borderRadius: 'var(--radius-xl)',
              padding: 'var(--space-6)',
              border: '1px solid rgba(85, 161, 180, 0.2)',
              boxShadow: '0 4px 16px 0 rgba(85, 161, 180, 0.1)',
              transition: 'all var(--duration-base) var(--ease-out)',
              cursor: 'pointer',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-4px)';
              e.currentTarget.style.boxShadow = '0 8px 24px 0 rgba(85, 161, 180, 0.2)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 4px 16px 0 rgba(85, 161, 180, 0.1)';
            }}
          >
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 'var(--space-3)' }}>
              <div 
                style={{ 
                  width: '56px', 
                  height: '56px', 
                  background: 'var(--gradient-primary)',
                  borderRadius: 'var(--radius-xl)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: '0 4px 12px 0 rgba(85, 161, 180, 0.3)',
                }}
              >
                <Flame size={28} style={{ color: '#ffffff' }} />
              </div>
              
              <div style={{ textAlign: 'center' }}>
                <div 
                  style={{ 
                    fontSize: 'var(--text-4xl)', 
                    fontWeight: 'var(--font-weight-bold)',
                    fontFamily: 'var(--font-display)',
                    color: 'var(--foreground)',
                    lineHeight: '1',
                    marginBottom: 'var(--space-2)',
                  }}
                >
                  {userStats.currentStreak}
                </div>
                <div 
                  style={{ 
                    fontSize: 'var(--text-sm)', 
                    color: 'var(--muted-foreground)',
                    fontFamily: 'var(--font-body)',
                    fontWeight: 'var(--font-weight-medium)',
                  }}
                >
                  Jours consécutifs
                </div>
              </div>
            </div>
          </div>

          {/* Stat 2: Badges - ORANGE TLS */}
          <div 
            className="hero-stat-card shimmer-effect"
            style={{ 
              background: 'linear-gradient(135deg, rgba(237, 132, 58, 0.1) 0%, rgba(237, 132, 58, 0.05) 100%)',
              backdropFilter: 'blur(20px)',
              WebkitBackdropFilter: 'blur(20px)',
              borderRadius: 'var(--radius-xl)',
              padding: 'var(--space-6)',
              border: '1px solid rgba(237, 132, 58, 0.2)',
              boxShadow: '0 4px 16px 0 rgba(237, 132, 58, 0.1)',
              transition: 'all var(--duration-base) var(--ease-out)',
              cursor: 'pointer',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-4px)';
              e.currentTarget.style.boxShadow = '0 8px 24px 0 rgba(237, 132, 58, 0.2)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 4px 16px 0 rgba(237, 132, 58, 0.1)';
            }}
          >
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 'var(--space-3)' }}>
              <div 
                style={{ 
                  width: '56px', 
                  height: '56px', 
                  background: 'var(--gradient-secondary)',
                  borderRadius: 'var(--radius-xl)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: '0 4px 12px 0 rgba(237, 132, 58, 0.3)',
                }}
              >
                <Trophy size={28} style={{ color: '#ffffff' }} />
              </div>
              
              <div style={{ textAlign: 'center' }}>
                <div 
                  style={{ 
                    fontSize: 'var(--text-4xl)', 
                    fontWeight: 'var(--font-weight-bold)',
                    fontFamily: 'var(--font-display)',
                    color: 'var(--foreground)',
                    lineHeight: '1',
                    marginBottom: 'var(--space-2)',
                  }}
                >
                  {userStats.totalBadges}
                </div>
                <div 
                  style={{ 
                    fontSize: 'var(--text-sm)', 
                    color: 'var(--muted-foreground)',
                    fontFamily: 'var(--font-body)',
                    fontWeight: 'var(--font-weight-medium)',
                  }}
                >
                  Badges débloqués
                </div>
              </div>
            </div>
          </div>

          {/* Stat 3: Courses - JAUNE TLS */}
          <div 
            className="hero-stat-card shimmer-effect"
            style={{ 
              background: 'linear-gradient(135deg, rgba(248, 176, 68, 0.1) 0%, rgba(248, 176, 68, 0.05) 100%)',
              backdropFilter: 'blur(20px)',
              WebkitBackdropFilter: 'blur(20px)',
              borderRadius: 'var(--radius-xl)',
              padding: 'var(--space-6)',
              border: '1px solid rgba(248, 176, 68, 0.2)',
              boxShadow: '0 4px 16px 0 rgba(248, 176, 68, 0.1)',
              transition: 'all var(--duration-base) var(--ease-out)',
              cursor: 'pointer',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-4px)';
              e.currentTarget.style.boxShadow = '0 8px 24px 0 rgba(248, 176, 68, 0.2)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 4px 16px 0 rgba(248, 176, 68, 0.1)';
            }}
          >
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 'var(--space-3)' }}>
              <div 
                style={{ 
                  width: '56px', 
                  height: '56px', 
                  background: 'var(--gradient-accent-warm)',
                  borderRadius: 'var(--radius-xl)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: '0 4px 12px 0 rgba(248, 176, 68, 0.3)',
                }}
              >
                <BookOpen size={28} style={{ color: '#ffffff' }} />
              </div>
              
              <div style={{ textAlign: 'center' }}>
                <div 
                  style={{ 
                    fontSize: 'var(--text-4xl)', 
                    fontWeight: 'var(--font-weight-bold)',
                    fontFamily: 'var(--font-display)',
                    color: 'var(--foreground)',
                    lineHeight: '1',
                    marginBottom: 'var(--space-2)',
                  }}
                >
                  {userStats.coursesInProgress}
                </div>
                <div 
                  style={{ 
                    fontSize: 'var(--text-sm)', 
                    color: 'var(--muted-foreground)',
                    fontFamily: 'var(--font-body)',
                    fontWeight: 'var(--font-weight-medium)',
                  }}
                >
                  Cours en cours
                </div>
              </div>
            </div>
          </div>

          {/* Stat 4: Completion - BLEU TLS */}
          <div 
            className="hero-stat-card shimmer-effect"
            style={{ 
              background: 'linear-gradient(135deg, rgba(85, 161, 180, 0.1) 0%, rgba(85, 161, 180, 0.05) 100%)',
              backdropFilter: 'blur(20px)',
              WebkitBackdropFilter: 'blur(20px)',
              borderRadius: 'var(--radius-xl)',
              padding: 'var(--space-6)',
              border: '1px solid rgba(85, 161, 180, 0.2)',
              boxShadow: '0 4px 16px 0 rgba(85, 161, 180, 0.1)',
              transition: 'all var(--duration-base) var(--ease-out)',
              cursor: 'pointer',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-4px)';
              e.currentTarget.style.boxShadow = '0 8px 24px 0 rgba(85, 161, 180, 0.2)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 4px 16px 0 rgba(85, 161, 180, 0.1)';
            }}
          >
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 'var(--space-3)' }}>
              <div 
                style={{ 
                  width: '56px', 
                  height: '56px', 
                  background: 'var(--gradient-primary-ocean)',
                  borderRadius: 'var(--radius-xl)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: '0 4px 12px 0 rgba(85, 161, 180, 0.3)',
                }}
              >
                <TrendingUp size={28} style={{ color: '#ffffff' }} />
              </div>
              
              <div style={{ textAlign: 'center' }}>
                <div 
                  style={{ 
                    fontSize: 'var(--text-4xl)', 
                    fontWeight: 'var(--font-weight-bold)',
                    fontFamily: 'var(--font-display)',
                    color: 'var(--foreground)',
                    lineHeight: '1',
                    marginBottom: 'var(--space-2)',
                  }}
                >
                  {userStats.completionRate}%
                </div>
                <div 
                  style={{ 
                    fontSize: 'var(--text-sm)', 
                    color: 'var(--muted-foreground)',
                    fontFamily: 'var(--font-body)',
                    fontWeight: 'var(--font-weight-medium)',
                  }}
                >
                  Taux de complétion
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ========== QUOTE SECTION ========== */}
        <div 
          className="hero-quote"
          style={{ 
            background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.7) 0%, rgba(255, 255, 255, 0.5) 100%)',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            borderRadius: 'var(--radius-2xl)',
            padding: 'var(--space-6)',
            border: '1px solid rgba(255, 255, 255, 0.9)',
            boxShadow: '0 4px 16px 0 rgba(0, 0, 0, 0.04)',
            textAlign: 'center',
          }}
        >
          <p 
            style={{ 
              color: 'var(--muted-foreground)',
              fontSize: 'var(--text-base)',
              lineHeight: 'var(--leading-relaxed)',
              fontFamily: 'var(--font-body)',
              fontStyle: 'italic',
              margin: 0,
            }}
          >
            "{dailyQuote}"
          </p>
        </div>
      </div>
    </>
  );
}
