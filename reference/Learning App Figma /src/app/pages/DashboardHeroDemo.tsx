import React, { useState } from 'react';
import DashboardHeroV3Simple from '../components/DashboardHeroV3Simple';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export default function DashboardHeroDemo() {
  const [version, setVersion] = useState<'v1' | 'v3'>('v1');

  const userStats = {
    currentStreak: 7,
    totalBadges: 12,
    coursesInProgress: 3,
    completionRate: 68
  };

  const dailyQuote = "Espacer les sessions d'apprentissage améliore la rétention à long terme. — Robert Bjork";

  return (
    <div style={{ minHeight: '100vh', background: 'var(--background)' }}>
      {/* Version Selector */}
      <div 
        style={{ 
          position: 'fixed',
          top: 'var(--space-6)',
          right: 'var(--space-6)',
          background: 'rgba(255, 255, 255, 0.9)',
          backdropFilter: 'blur(20px)',
          borderRadius: 'var(--radius-2xl)',
          padding: 'var(--space-4)',
          boxShadow: '0 4px 16px 0 rgba(0, 0, 0, 0.1)',
          zIndex: 100,
          display: 'flex',
          gap: 'var(--space-3)',
          alignItems: 'center',
        }}
      >
        <button
          onClick={() => {
            setVersion(version === 'v1' ? 'v3' : 'v1');
          }}
          style={{
            background: 'var(--primary)',
            color: '#ffffff',
            border: 'none',
            borderRadius: 'var(--radius-lg)',
            width: '36px',
            height: '36px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            transition: 'all var(--duration-base)',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'scale(1.05)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'scale(1)';
          }}
        >
          <ChevronLeft size={20} />
        </button>

        <div 
          style={{ 
            fontFamily: 'var(--font-display)',
            fontSize: 'var(--text-base)',
            fontWeight: 'var(--font-weight-bold)',
            color: 'var(--foreground)',
            minWidth: '80px',
            textAlign: 'center',
          }}
        >
          {version === 'v1' && 'Version 1'}
          {version === 'v3' && 'Version 3'}
        </div>

        <button
          onClick={() => {
            setVersion(version === 'v1' ? 'v3' : 'v1');
          }}
          style={{
            background: 'var(--primary)',
            color: '#ffffff',
            border: 'none',
            borderRadius: 'var(--radius-lg)',
            width: '36px',
            height: '36px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            transition: 'all var(--duration-base)',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'scale(1.05)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'scale(1)';
          }}
        >
          <ChevronRight size={20} />
        </button>
      </div>

      {/* Hero Versions */}
      <div style={{ paddingTop: 'var(--space-8)' }}>
        {version === 'v1' && (
          <div 
            style={{ 
              maxWidth: '1000px',
              margin: '0 auto',
              padding: 'var(--space-12) var(--space-6)',
            }}
          >
            <div 
              style={{ 
                display: 'flex', 
                flexDirection: 'column', 
                gap: 'var(--space-2)',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)' }}>
                <h1 
                  style={{ 
                    fontFamily: 'var(--font-display)',
                    fontSize: 'var(--text-4xl)',
                    fontWeight: 'var(--font-weight-bold)',
                    lineHeight: 'var(--leading-tight)',
                    margin: 0,
                    background: 'var(--gradient-tls-text-cool)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                  }}
                >
                  Hello Pierre-Armand
                </h1>
                <span style={{ fontSize: 'var(--text-3xl)' }}>👋</span>
              </div>

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
        )}

        {version === 'v3' && (
          <DashboardHeroV3Simple
            userName="Pierre-Armand"
            dailyQuote={dailyQuote}
            userStats={userStats}
          />
        )}
      </div>

      {/* Description */}
      <div 
        style={{ 
          maxWidth: '1000px',
          margin: 'var(--space-10) auto',
          padding: '0 var(--space-6)',
        }}
      >
        <div 
          style={{ 
            background: 'rgba(255, 255, 255, 0.6)',
            backdropFilter: 'blur(20px)',
            borderRadius: 'var(--radius-2xl)',
            padding: 'var(--space-6)',
            border: '1px solid rgba(255, 255, 255, 0.8)',
          }}
        >
          <h2 
            style={{ 
              fontFamily: 'var(--font-display)',
              fontSize: 'var(--text-2xl)',
              fontWeight: 'var(--font-weight-bold)',
              color: 'var(--foreground)',
              marginBottom: 'var(--space-4)',
            }}
          >
            {version === 'v1' && '🎨 Version 1 : Simple et Épurée'}
            {version === 'v3' && '🎨 Version 3 : Hero Card avec Pills'}
          </h2>

          <div 
            style={{ 
              color: 'var(--muted-foreground)',
              fontSize: 'var(--text-base)',
              lineHeight: 'var(--leading-relaxed)',
              fontFamily: 'var(--font-body)',
            }}
          >
            {version === 'v1' && (
              <ul style={{ margin: 0, paddingLeft: 'var(--space-6)' }}>
                <li>Design ultra-minimaliste</li>
                <li>Gradient bleu TLS uniquement (bleu primaire → bleu clair)</li>
                <li>Emoji unicode 👋 simple</li>
                <li>Spacing réduit avec gap: var(--space-2)</li>
                <li>SANS phrase descriptive</li>
                <li>Quote remontée directement sous le titre</li>
                <li>Parfait pour maximum de focus sur le contenu</li>
              </ul>
            )}

            {version === 'v3' && (
              <ul style={{ margin: 0, paddingLeft: 'var(--space-6)' }}>
                <li>Hero card unique avec glassmorphism avancé</li>
                <li>Stats sous forme de pills ultra-compactes (Jaune, Orange, Bleu)</li>
                <li>Quote SANS card background - directement sous le titre</li>
                <li>Emoji unicode 👋 simple</li>
                <li>Gradient bleu TLS sur le titre (bleu primaire → bleu clair)</li>
                <li>Spacing minimal avec gap: var(--space-2)</li>
                <li>Layout 2 colonnes : Titre + Quote | Stats Pills</li>
                <li>Background gradients subtils pour la profondeur</li>
              </ul>
            )}
          </div>

          <div 
            style={{ 
              marginTop: 'var(--space-4)',
              padding: 'var(--space-4)',
              background: 'rgba(85, 161, 180, 0.05)',
              borderRadius: 'var(--radius-lg)',
              borderLeft: '3px solid var(--primary)',
            }}
          >
            <p 
              style={{ 
                fontFamily: 'var(--font-body)',
                fontSize: 'var(--text-sm)',
                color: 'var(--muted-foreground)',
                margin: 0,
              }}
            >
              <strong style={{ color: 'var(--foreground)' }}>Note :</strong> {' '}
              {version === 'v1' && 'Cette version minimaliste est idéale pour la page Design System.'}
              {version === 'v3' && 'Cette version est utilisée sur la page Dashboard principale de l\'application.'}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
