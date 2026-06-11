import React from 'react';
import { Sparkles, TrendingUp } from 'lucide-react';

interface DashboardHeroV3Props {
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

export default function DashboardHeroV3({
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
}: DashboardHeroV3Props) {
  
  return (
    <>
      <style>
        {`
          @keyframes floatWave {
            0%, 100% { 
              transform: translateY(0px) rotate(0deg); 
            }
            25% { 
              transform: translateY(-5px) rotate(5deg); 
            }
            50% { 
              transform: translateY(-8px) rotate(0deg); 
            }
            75% { 
              transform: translateY(-5px) rotate(-5deg); 
            }
          }

          @keyframes gentleFadeIn {
            0% {
              opacity: 0;
              transform: translateY(20px);
            }
            100% {
              opacity: 1;
              transform: translateY(0);
            }
          }

          @keyframes gradientPulse {
            0%, 100% {
              background-size: 100% 100%;
            }
            50% {
              background-size: 150% 150%;
            }
          }

          .hero-v3-title {
            animation: gentleFadeIn 0.7s ease-out;
          }

          .hero-v3-content {
            animation: gentleFadeIn 0.9s ease-out 0.2s both;
          }

          .hero-v3-quote {
            animation: gentleFadeIn 1.1s ease-out 0.4s both;
          }

          .float-wave-emoji {
            animation: floatWave 4s ease-in-out infinite;
          }

          .stat-pill {
            transition: all var(--duration-base) var(--ease-out);
          }

          .stat-pill:hover {
            transform: scale(1.05);
          }
        `}
      </style>

      <div 
        style={{ 
          maxWidth: '1100px',
          margin: '0 auto',
          padding: 'var(--space-8) var(--space-6)',
        }}
      >
        {/* ========== MAIN HERO CARD ========== */}
        <div 
          style={{ 
            background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.7) 0%, rgba(255, 255, 255, 0.5) 100%)',
            backdropFilter: 'blur(30px)',
            WebkitBackdropFilter: 'blur(30px)',
            borderRadius: 'var(--radius-3xl)',
            padding: 'var(--space-10)',
            border: '1px solid rgba(255, 255, 255, 0.9)',
            boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.06)',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          {/* Subtle Background Gradient Effect */}
          <div 
            style={{ 
              position: 'absolute',
              top: '-50%',
              right: '-20%',
              width: '600px',
              height: '600px',
              background: 'radial-gradient(circle, rgba(85, 161, 180, 0.08) 0%, transparent 70%)',
              pointerEvents: 'none',
            }}
          />
          <div 
            style={{ 
              position: 'absolute',
              bottom: '-40%',
              left: '-15%',
              width: '500px',
              height: '500px',
              background: 'radial-gradient(circle, rgba(248, 176, 68, 0.06) 0%, transparent 70%)',
              pointerEvents: 'none',
            }}
          />

          {/* Content */}
          <div style={{ position: 'relative', zIndex: 1 }}>
            {/* ========== HEADER ROW ========== */}
            <div 
              className="hero-v3-title"
              style={{ 
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'flex-start',
                marginBottom: 'var(--space-8)',
                flexWrap: 'wrap',
                gap: 'var(--space-6)',
              }}
            >
              {/* Left: Title + Phrase */}
              <div style={{ flex: '1', minWidth: '300px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)', marginBottom: 'var(--space-4)' }}>
                  <h1 
                    style={{ 
                      fontFamily: 'var(--font-display)',
                      fontSize: 'var(--text-5xl)',
                      fontWeight: 'var(--font-weight-bold)',
                      lineHeight: 'var(--leading-tight)',
                      margin: 0,
                      background: 'var(--gradient-tls-text-hero-light)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      backgroundClip: 'text',
                    }}
                  >
                    Salut {userName}
                  </h1>
                  <span 
                    className="float-wave-emoji"
                    style={{ 
                      fontSize: 'var(--text-4xl)',
                      display: 'inline-block',
                    }}
                  >
                    🌊
                  </span>
                </div>

                <p 
                  style={{ 
                    color: 'var(--muted-foreground)',
                    fontSize: 'var(--text-lg)',
                    lineHeight: 'var(--leading-relaxed)',
                    fontFamily: 'var(--font-body)',
                    margin: 0,
                    fontWeight: 'var(--font-weight-normal)',
                  }}
                >
                  {statsLoading ? 'Chargement...' : descriptivePhrase}
                </p>
              </div>

              {/* Right: Quick Stats Pills */}
              <div 
                style={{ 
                  display: 'flex',
                  gap: 'var(--space-2)',
                  flexWrap: 'wrap',
                }}
              >
                {/* Streak Pill */}
                <div 
                  className="stat-pill"
                  style={{ 
                    display: 'flex',
                    alignItems: 'center',
                    gap: 'var(--space-2)',
                    background: 'linear-gradient(135deg, rgba(248, 176, 68, 0.15) 0%, rgba(248, 176, 68, 0.05) 100%)',
                    padding: 'var(--space-2) var(--space-4)',
                    borderRadius: 'var(--radius-full)',
                    border: '1px solid rgba(248, 176, 68, 0.2)',
                  }}
                >
                  <span style={{ fontSize: 'var(--text-lg)' }}>🔥</span>
                  <span 
                    style={{ 
                      fontFamily: 'var(--font-display)',
                      fontSize: 'var(--text-base)',
                      fontWeight: 'var(--font-weight-bold)',
                      color: 'var(--foreground)',
                    }}
                  >
                    {userStats.currentStreak}
                  </span>
                  <span 
                    style={{ 
                      fontSize: 'var(--text-sm)',
                      color: 'var(--muted-foreground)',
                      fontFamily: 'var(--font-body)',
                    }}
                  >
                    jours
                  </span>
                </div>

                {/* Badges Pill */}
                <div 
                  className="stat-pill"
                  style={{ 
                    display: 'flex',
                    alignItems: 'center',
                    gap: 'var(--space-2)',
                    background: 'linear-gradient(135deg, rgba(237, 132, 58, 0.15) 0%, rgba(237, 132, 58, 0.05) 100%)',
                    padding: 'var(--space-2) var(--space-4)',
                    borderRadius: 'var(--radius-full)',
                    border: '1px solid rgba(237, 132, 58, 0.2)',
                  }}
                >
                  <span style={{ fontSize: 'var(--text-lg)' }}>🏆</span>
                  <span 
                    style={{ 
                      fontFamily: 'var(--font-display)',
                      fontSize: 'var(--text-base)',
                      fontWeight: 'var(--font-weight-bold)',
                      color: 'var(--foreground)',
                    }}
                  >
                    {userStats.totalBadges}
                  </span>
                  <span 
                    style={{ 
                      fontSize: 'var(--text-sm)',
                      color: 'var(--muted-foreground)',
                      fontFamily: 'var(--font-body)',
                    }}
                  >
                    badges
                  </span>
                </div>

                {/* Completion Pill */}
                <div 
                  className="stat-pill"
                  style={{ 
                    display: 'flex',
                    alignItems: 'center',
                    gap: 'var(--space-2)',
                    background: 'linear-gradient(135deg, rgba(85, 161, 180, 0.15) 0%, rgba(85, 161, 180, 0.05) 100%)',
                    padding: 'var(--space-2) var(--space-4)',
                    borderRadius: 'var(--radius-full)',
                    border: '1px solid rgba(85, 161, 180, 0.2)',
                  }}
                >
                  <span style={{ fontSize: 'var(--text-lg)' }}>📈</span>
                  <span 
                    style={{ 
                      fontFamily: 'var(--font-display)',
                      fontSize: 'var(--text-base)',
                      fontWeight: 'var(--font-weight-bold)',
                      color: 'var(--foreground)',
                    }}
                  >
                    {userStats.completionRate}%
                  </span>
                </div>
              </div>
            </div>

            {/* ========== CONTENT ROW (Quote + Highlight) ========== */}
            <div 
              className="hero-v3-content"
              style={{ 
                display: 'grid',
                gridTemplateColumns: '1fr auto',
                gap: 'var(--space-6)',
                alignItems: 'center',
              }}
            >
              {/* Quote */}
              <div 
                style={{ 
                  background: 'linear-gradient(135deg, rgba(85, 161, 180, 0.04) 0%, rgba(248, 176, 68, 0.04) 100%)',
                  borderRadius: 'var(--radius-xl)',
                  padding: 'var(--space-5)',
                  borderLeft: '4px solid var(--primary)',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: 'var(--space-3)' }}>
                  <Sparkles 
                    size={20} 
                    style={{ 
                      color: 'var(--primary)',
                      marginTop: '2px',
                      flexShrink: 0,
                    }} 
                  />
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
                    {dailyQuote}
                  </p>
                </div>
              </div>

              {/* Highlight Badge */}
              <div 
                style={{ 
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: 'var(--space-2)',
                  background: 'var(--gradient-tls)',
                  padding: 'var(--space-5)',
                  borderRadius: 'var(--radius-2xl)',
                  minWidth: '140px',
                  boxShadow: '0 4px 16px 0 rgba(85, 161, 180, 0.15)',
                }}
              >
                <TrendingUp size={32} style={{ color: '#ffffff' }} />
                <div 
                  style={{ 
                    fontSize: 'var(--text-3xl)',
                    fontWeight: 'var(--font-weight-bold)',
                    fontFamily: 'var(--font-display)',
                    color: '#ffffff',
                    lineHeight: '1',
                  }}
                >
                  +{userStats.currentStreak * 2}
                </div>
                <div 
                  style={{ 
                    fontSize: 'var(--text-xs)',
                    color: 'rgba(255, 255, 255, 0.9)',
                    fontFamily: 'var(--font-body)',
                    textAlign: 'center',
                    fontWeight: 'var(--font-weight-medium)',
                  }}
                >
                  XP cette semaine
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
