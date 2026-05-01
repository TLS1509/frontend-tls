import React from 'react';

interface DashboardHeroV3SimpleProps {
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

export default function DashboardHeroV3Simple({
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
}: DashboardHeroV3SimpleProps) {
  
  return (
    <>
      <style>
        {`
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

          .hero-v3-title {
            animation: gentleFadeIn 0.7s ease-out;
          }

          .hero-v3-content {
            animation: gentleFadeIn 0.9s ease-out 0.2s both;
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
          maxWidth: '1000px',
          margin: '0 auto',
          padding: 'var(--space-8) var(--space-6)',
        }}
      >
        {/* ========== MAIN HERO CARD ========== */}
        <div 
          style={{ 
            background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.8) 0%, rgba(255, 255, 255, 0.6) 100%)',
            backdropFilter: 'blur(30px)',
            WebkitBackdropFilter: 'blur(30px)',
            borderRadius: 'var(--radius-2xl)',
            padding: 'var(--space-8)',
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
              background: 'radial-gradient(circle, rgba(85, 161, 180, 0.06) 0%, transparent 70%)',
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
              background: 'radial-gradient(circle, rgba(248, 176, 68, 0.05) 0%, transparent 70%)',
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
                paddingBottom: 'var(--space-2)',
                flexWrap: 'wrap',
                gap: 'var(--space-4)',
              }}
            >
              {/* Left: Title + Quote */}
              <div style={{ flex: '1', minWidth: '300px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)', paddingBottom: 'var(--space-2)' }}>
                  <h1 
                    style={{ 
                      fontFamily: 'var(--font-display)',
                      fontSize: 'var(--text-5xl)',
                      fontWeight: 'var(--font-weight-bold)',
                      lineHeight: 'var(--leading-tight)',
                      margin: 0,
                      background: 'var(--gradient-tls-text-cool)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      backgroundClip: 'text',
                    }}
                  >
                    Hello {userName}
                  </h1>
                  <span style={{ fontSize: 'var(--text-4xl)' }}>👋</span>
                </div>

                {/* Quote directement sous le titre */}
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

              {/* Right: Quick Stats Pills */}
              <div 
                style={{ 
                  display: 'flex',
                  gap: 'var(--space-2)',
                  flexWrap: 'wrap',
                }}
              >
                {/* Streak Pill - JAUNE */}
                <div 
                  className="stat-pill"
                  style={{ 
                    display: 'flex',
                    alignItems: 'center',
                    gap: 'var(--space-2)',
                    background: 'linear-gradient(135deg, rgba(248, 176, 68, 0.15) 0%, rgba(248, 176, 68, 0.08) 100%)',
                    padding: 'var(--space-2) var(--space-3)',
                    borderRadius: 'var(--radius-full)',
                    border: '1px solid rgba(248, 176, 68, 0.25)',
                  }}
                >
                  <span style={{ fontSize: 'var(--text-base)' }}>🔥</span>
                  <span 
                    style={{ 
                      fontFamily: 'var(--font-display)',
                      fontSize: 'var(--text-sm)',
                      fontWeight: 'var(--font-weight-bold)',
                      color: 'var(--foreground)',
                    }}
                  >
                    {userStats.currentStreak}
                  </span>
                  <span 
                    style={{ 
                      fontSize: 'var(--text-xs)',
                      color: 'var(--muted-foreground)',
                      fontFamily: 'var(--font-body)',
                    }}
                  >
                    jours
                  </span>
                </div>

                {/* Badges Pill - ORANGE */}
                <div 
                  className="stat-pill"
                  style={{ 
                    display: 'flex',
                    alignItems: 'center',
                    gap: 'var(--space-2)',
                    background: 'linear-gradient(135deg, rgba(237, 132, 58, 0.15) 0%, rgba(237, 132, 58, 0.08) 100%)',
                    padding: 'var(--space-2) var(--space-3)',
                    borderRadius: 'var(--radius-full)',
                    border: '1px solid rgba(237, 132, 58, 0.25)',
                  }}
                >
                  <span style={{ fontSize: 'var(--text-base)' }}>🏆</span>
                  <span 
                    style={{ 
                      fontFamily: 'var(--font-display)',
                      fontSize: 'var(--text-sm)',
                      fontWeight: 'var(--font-weight-bold)',
                      color: 'var(--foreground)',
                    }}
                  >
                    {userStats.totalBadges}
                  </span>
                  <span 
                    style={{ 
                      fontSize: 'var(--text-xs)',
                      color: 'var(--muted-foreground)',
                      fontFamily: 'var(--font-body)',
                    }}
                  >
                    badges
                  </span>
                </div>

                {/* Completion Pill - BLEU */}
                <div 
                  className="stat-pill"
                  style={{ 
                    display: 'flex',
                    alignItems: 'center',
                    gap: 'var(--space-2)',
                    background: 'linear-gradient(135deg, rgba(85, 161, 180, 0.15) 0%, rgba(85, 161, 180, 0.08) 100%)',
                    padding: 'var(--space-2) var(--space-3)',
                    borderRadius: 'var(--radius-full)',
                    border: '1px solid rgba(85, 161, 180, 0.25)',
                  }}
                >
                  <span style={{ fontSize: 'var(--text-base)' }}>📈</span>
                  <span 
                    style={{ 
                      fontFamily: 'var(--font-display)',
                      fontSize: 'var(--text-sm)',
                      fontWeight: 'var(--font-weight-bold)',
                      color: 'var(--foreground)',
                    }}
                  >
                    {userStats.completionRate}%
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
