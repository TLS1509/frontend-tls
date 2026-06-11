import React, { useState } from 'react';
import { 
  Ruler, Palette, Type, Box, Layers, Monitor, Tablet, Smartphone,
  ChevronDown, ChevronUp, Copy, Check, ArrowRight, Circle, Eye,
  Users, Map, PenLine, Sparkles, CheckCircle2, Award, TrendingUp, BookMarked
} from 'lucide-react';

/**
 * DASHBOARD DEV SPECS - PAGE DE DOCUMENTATION HANDOFF
 * 
 * Documentation technique complète du Dashboard "The Learning Society"
 * Pour implémentation 1:1 dans WordPress
 * 
 * Cette page documente:
 * - Variables CSS du design system
 * - Composants avec états (default/hover/active/focus)
 * - Spacing, typography, colors
 * - Breakpoints responsive
 * - Structure HTML/CSS
 */

interface SpecSectionProps {
  title: string;
  children: React.ReactNode;
  icon?: React.ReactNode;
  defaultOpen?: boolean;
}

const SpecSection: React.FC<SpecSectionProps> = ({ title, children, icon, defaultOpen = false }) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div style={{
      background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(255, 255, 255, 0.85) 100%)',
      backdropFilter: 'blur(20px)',
      WebkitBackdropFilter: 'blur(20px)',
      borderRadius: 'var(--radius-2xl)',
      border: '1px solid rgba(255, 255, 255, 0.8)',
      boxShadow: '0 4px 16px 0 rgba(0, 0, 0, 0.06)',
      marginBottom: 'var(--space-6)',
      overflow: 'hidden',
    }}>
      {/* Header */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        style={{
          width: '100%',
          padding: 'var(--space-6)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          background: 'transparent',
          border: 'none',
          cursor: 'pointer',
          transition: 'all var(--duration-base) var(--ease-out)',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-4)' }}>
          {icon && <div style={{ color: 'var(--primary)' }}>{icon}</div>}
          <h2 style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'var(--text-2xl)',
            fontWeight: 'var(--font-weight-bold)',
            color: 'var(--foreground)',
            margin: 0,
          }}>
            {title}
          </h2>
        </div>
        {isOpen ? <ChevronUp size={24} /> : <ChevronDown size={24} />}
      </button>

      {/* Content */}
      {isOpen && (
        <div style={{
          padding: '0 var(--space-6) var(--space-6) var(--space-6)',
          borderTop: '1px solid rgba(0, 0, 0, 0.05)',
        }}>
          {children}
        </div>
      )}
    </div>
  );
};

interface CodeBlockProps {
  code: string;
  language?: string;
}

const CodeBlock: React.FC<CodeBlockProps> = ({ code, language = 'css' }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div style={{
      position: 'relative',
      background: '#1e293b',
      borderRadius: 'var(--radius-lg)',
      padding: 'var(--space-4)',
      marginTop: 'var(--space-4)',
    }}>
      <button
        onClick={handleCopy}
        style={{
          position: 'absolute',
          top: 'var(--space-2)',
          right: 'var(--space-2)',
          background: copied ? 'var(--success)' : 'rgba(255, 255, 255, 0.1)',
          border: 'none',
          borderRadius: 'var(--radius-md)',
          padding: 'var(--space-2)',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          gap: 'var(--space-2)',
          color: 'white',
          fontSize: 'var(--text-xs)',
        }}
      >
        {copied ? <Check size={16} /> : <Copy size={16} />}
        {copied ? 'Copié!' : 'Copier'}
      </button>
      <pre style={{
        fontFamily: 'monospace',
        fontSize: 'var(--text-sm)',
        color: '#e2e8f0',
        margin: 0,
        overflowX: 'auto',
      }}>
        {code}
      </pre>
    </div>
  );
};

interface ColorSwatchProps {
  name: string;
  variable: string;
  hex: string;
}

const ColorSwatch: React.FC<ColorSwatchProps> = ({ name, variable, hex }) => {
  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      gap: 'var(--space-4)',
      padding: 'var(--space-3)',
      background: 'rgba(255, 255, 255, 0.5)',
      borderRadius: 'var(--radius-lg)',
      marginBottom: 'var(--space-2)',
    }}>
      <div style={{
        width: '48px',
        height: '48px',
        borderRadius: 'var(--radius-md)',
        background: hex,
        border: '2px solid rgba(0, 0, 0, 0.1)',
        flexShrink: 0,
      }} />
      <div style={{ flex: 1 }}>
        <div style={{
          fontFamily: 'var(--font-display)',
          fontSize: 'var(--text-base)',
          fontWeight: 'var(--font-weight-semibold)',
          color: 'var(--foreground)',
        }}>
          {name}
        </div>
        <div style={{
          fontFamily: 'monospace',
          fontSize: 'var(--text-sm)',
          color: 'var(--muted-foreground)',
        }}>
          var({variable}) • {hex}
        </div>
      </div>
    </div>
  );
};

export default function DashboardDevSpecsPage() {
  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(to bottom right, var(--primary-50), white, var(--accent-50))',
      padding: 'var(--space-12) var(--space-6)',
      position: 'relative',
    }}>
      {/* Back Button */}
      <button
        onClick={() => window.history.back()}
        style={{
          position: 'fixed',
          top: 'var(--space-6)',
          left: 'var(--space-6)',
          padding: 'var(--space-3) var(--space-5)',
          background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(255, 255, 255, 0.85) 100%)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          borderRadius: 'var(--radius-xl)',
          border: '1px solid rgba(255, 255, 255, 0.8)',
          boxShadow: '0 4px 16px 0 rgba(0, 0, 0, 0.06)',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          gap: 'var(--space-2)',
          fontFamily: 'var(--font-body)',
          fontSize: 'var(--text-sm)',
          fontWeight: 'var(--font-weight-semibold)',
          color: 'var(--foreground)',
          transition: 'all 200ms cubic-bezier(0, 0, 0.2, 1)',
          zIndex: 1000,
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = 'translateX(-4px)';
          e.currentTarget.style.boxShadow = '0 8px 24px 0 rgba(0, 0, 0, 0.08)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = 'translateX(0)';
          e.currentTarget.style.boxShadow = '0 4px 16px 0 rgba(0, 0, 0, 0.06)';
        }}
      >
        <ArrowRight size={16} style={{ transform: 'rotate(180deg)' }} />
        Retour
      </button>

      {/* Header */}
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto var(--space-12) auto',
        textAlign: 'center',
      }}>
        <h1 style={{
          fontFamily: 'var(--font-display)',
          fontSize: 'var(--text-6xl)',
          fontWeight: 'var(--font-weight-black)',
          background: 'var(--gradient-tls-text)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
          margin: '0 0 var(--space-4) 0',
        }}>
          Dashboard Dev Specs
        </h1>
        <p style={{
          fontFamily: 'var(--font-body)',
          fontSize: 'var(--text-xl)',
          color: 'var(--muted-foreground)',
          maxWidth: '800px',
          margin: '0 auto',
        }}>
          Documentation technique complète pour implémentation 1:1 dans WordPress
        </p>
      </div>

      {/* Content */}
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>

        {/* ========== 0. COMPONENT STATES SHOWCASE ========== */}
        <SpecSection title="0. Component States Showcase" icon={<Eye size={24} />} defaultOpen={true}>
          <p style={{ 
            fontFamily: 'var(--font-body)', 
            fontSize: 'var(--text-base)', 
            color: 'var(--muted-foreground)',
            marginBottom: 'var(--space-6)',
          }}>
            Exemples visuels interactifs de tous les composants du dashboard avec leurs états (default/hover/focus).
            Survolez les composants pour voir les transitions.
          </p>

          <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-lg)', fontWeight: 'var(--font-weight-semibold)', marginTop: 'var(--space-6)', marginBottom: 'var(--space-4)' }}>
            Action Card (Quick Actions)
          </h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: 'var(--space-4)', marginBottom: 'var(--space-8)' }}>
            {/* Action Card Example */}
            <div
              style={{
                background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.6) 0%, rgba(255, 255, 255, 0.4) 100%)',
                backdropFilter: 'blur(20px)',
                WebkitBackdropFilter: 'blur(20px)',
                borderRadius: 'var(--radius-2xl)',
                padding: 'var(--space-5)',
                border: '1px solid rgba(255, 255, 255, 0.8)',
                boxShadow: '0 4px 16px 0 rgba(0, 0, 0, 0.06)',
                display: 'flex',
                flexDirection: 'column',
                gap: 'var(--space-3)',
                alignItems: 'center',
                textAlign: 'center',
                minHeight: '160px',
                cursor: 'pointer',
                transition: 'all 300ms cubic-bezier(0, 0, 0.2, 1)',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'scale(1.05)';
                e.currentTarget.style.background = 'linear-gradient(135deg, rgba(255, 255, 255, 0.7) 0%, rgba(255, 255, 255, 0.5) 100%)';
                e.currentTarget.style.boxShadow = '0 8px 24px 0 rgba(85, 161, 180, 0.12)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'scale(1)';
                e.currentTarget.style.background = 'linear-gradient(135deg, rgba(255, 255, 255, 0.6) 0%, rgba(255, 255, 255, 0.4) 100%)';
                e.currentTarget.style.boxShadow = '0 4px 16px 0 rgba(0, 0, 0, 0.06)';
              }}
            >
              <div style={{
                width: '72px',
                height: '72px',
                borderRadius: '50%',
                background: 'rgba(85, 161, 180, 0.12)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
                <Users size={40} style={{ color: 'var(--primary)', strokeWidth: 2 }} />
              </div>
              <div style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-base)', fontWeight: 'var(--font-weight-bold)', color: 'var(--foreground)', lineHeight: 'var(--leading-tight)' }}>
                Coaching 1-to-1
              </div>
              <div style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--text-xs)', color: 'var(--muted-foreground)' }}>
                Réserver une session
              </div>
            </div>

            <div
              style={{
                background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.6) 0%, rgba(255, 255, 255, 0.4) 100%)',
                backdropFilter: 'blur(20px)',
                WebkitBackdropFilter: 'blur(20px)',
                borderRadius: 'var(--radius-2xl)',
                padding: 'var(--space-5)',
                border: '1px solid rgba(255, 255, 255, 0.8)',
                boxShadow: '0 4px 16px 0 rgba(0, 0, 0, 0.06)',
                display: 'flex',
                flexDirection: 'column',
                gap: 'var(--space-3)',
                alignItems: 'center',
                textAlign: 'center',
                minHeight: '160px',
                cursor: 'pointer',
                transition: 'all 300ms cubic-bezier(0, 0, 0.2, 1)',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'scale(1.05)';
                e.currentTarget.style.background = 'linear-gradient(135deg, rgba(255, 255, 255, 0.7) 0%, rgba(255, 255, 255, 0.5) 100%)';
                e.currentTarget.style.boxShadow = '0 8px 24px 0 rgba(237, 132, 58, 0.12)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'scale(1)';
                e.currentTarget.style.background = 'linear-gradient(135deg, rgba(255, 255, 255, 0.6) 0%, rgba(255, 255, 255, 0.4) 100%)';
                e.currentTarget.style.boxShadow = '0 4px 16px 0 rgba(0, 0, 0, 0.06)';
              }}
            >
              <div style={{
                width: '72px',
                height: '72px',
                borderRadius: '50%',
                background: 'rgba(237, 132, 58, 0.12)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
                <Map size={40} style={{ color: 'var(--secondary)', strokeWidth: 2 }} />
              </div>
              <div style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-base)', fontWeight: 'var(--font-weight-bold)', color: 'var(--foreground)', lineHeight: 'var(--leading-tight)' }}>
                Parcours
              </div>
              <div style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--text-xs)', color: 'var(--muted-foreground)' }}>
                Explorer les cours
              </div>
            </div>
          </div>

          <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-lg)', fontWeight: 'var(--font-weight-semibold)', marginTop: 'var(--space-6)', marginBottom: 'var(--space-4)' }}>
            Journal Prompt Card
          </h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 'var(--space-4)', marginBottom: 'var(--space-8)' }}>
            <div
              style={{
                background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.6) 0%, rgba(255, 255, 255, 0.4) 100%)',
                backdropFilter: 'blur(20px)',
                WebkitBackdropFilter: 'blur(20px)',
                borderRadius: 'var(--radius-2xl)',
                padding: 'var(--space-5)',
                border: '1px solid rgba(255, 255, 255, 0.8)',
                boxShadow: '0 4px 16px 0 rgba(0, 0, 0, 0.06)',
                display: 'flex',
                flexDirection: 'column',
                gap: 'var(--space-4)',
                alignItems: 'center',
                textAlign: 'center',
                cursor: 'pointer',
                transition: 'all 200ms cubic-bezier(0, 0, 0.2, 1)',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-4px)';
                e.currentTarget.style.background = 'linear-gradient(135deg, rgba(255, 255, 255, 0.7) 0%, rgba(255, 255, 255, 0.5) 100%)';
                e.currentTarget.style.boxShadow = '0 12px 32px 0 rgba(0, 0, 0, 0.08)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.background = 'linear-gradient(135deg, rgba(255, 255, 255, 0.6) 0%, rgba(255, 255, 255, 0.4) 100%)';
                e.currentTarget.style.boxShadow = '0 4px 16px 0 rgba(0, 0, 0, 0.06)';
              }}
            >
              <div style={{
                padding: 'var(--space-2-5) var(--space-5)',
                borderRadius: 'var(--radius-full)',
                fontFamily: 'var(--font-body)',
                fontSize: 'var(--text-xs)',
                fontWeight: 'var(--font-weight-semibold)',
                background: 'linear-gradient(135deg, rgba(85, 161, 180, 0.15) 0%, rgba(85, 161, 180, 0.08) 100%)',
                border: '1px solid rgba(85, 161, 180, 0.25)',
                color: 'var(--primary)',
              }}>
                Apprentissage
              </div>
              <BookMarked size={48} style={{ color: 'var(--primary)', strokeWidth: 1.5 }} />
              <div style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--text-base)', fontWeight: 'var(--font-weight-medium)', color: 'var(--foreground)', lineHeight: 'var(--leading-normal)' }}>
                Quelle a été ma plus grande découverte aujourd'hui ?
              </div>
            </div>
          </div>

          <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-lg)', fontWeight: 'var(--font-weight-semibold)', marginTop: 'var(--space-6)', marginBottom: 'var(--space-4)' }}>
            Activity Card
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)', marginBottom: 'var(--space-8)' }}>
            <div
              style={{
                background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.6) 0%, rgba(255, 255, 255, 0.4) 100%)',
                backdropFilter: 'blur(20px)',
                WebkitBackdropFilter: 'blur(20px)',
                borderRadius: 'var(--radius-2xl)',
                padding: 'var(--space-4)',
                border: '1px solid rgba(255, 255, 255, 0.8)',
                boxShadow: '0 4px 16px 0 rgba(0, 0, 0, 0.06)',
                display: 'flex',
                gap: 'var(--space-4)',
                alignItems: 'flex-start',
                cursor: 'pointer',
                transition: 'all 200ms cubic-bezier(0, 0, 0.2, 1)',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.background = 'linear-gradient(135deg, rgba(255, 255, 255, 0.7) 0%, rgba(255, 255, 255, 0.5) 100%)';
                e.currentTarget.style.boxShadow = '0 8px 24px 0 rgba(0, 0, 0, 0.08)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.background = 'linear-gradient(135deg, rgba(255, 255, 255, 0.6) 0%, rgba(255, 255, 255, 0.4) 100%)';
                e.currentTarget.style.boxShadow = '0 4px 16px 0 rgba(0, 0, 0, 0.06)';
              }}
            >
              <CheckCircle2 size={32} style={{ color: 'var(--success)', strokeWidth: 1.5, flexShrink: 0 }} />
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)', marginBottom: 'var(--space-1)' }}>
                  <div style={{
                    padding: 'var(--space-1) var(--space-2-5)',
                    borderRadius: 'var(--radius-full)',
                    background: 'var(--success-50)',
                    border: '1px solid rgba(157, 190, 186, 0.3)',
                    fontFamily: 'var(--font-body)',
                    fontSize: 'var(--text-xs)',
                    fontWeight: 'var(--font-weight-medium)',
                    color: 'var(--success)',
                  }}>
                    Apprentissage
                  </div>
                  <div style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--text-xs)', color: 'var(--muted-foreground)' }}>
                    Il y a 2 heures
                  </div>
                </div>
                <div style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-lg)', fontWeight: 'var(--font-weight-semibold)', color: 'var(--foreground)', lineHeight: 'var(--leading-tight)', marginBottom: 'var(--space-1)' }}>
                  Leçon terminée
                </div>
                <div style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--text-xs)', color: 'var(--muted-foreground)', marginBottom: 'var(--space-2)' }}>
                  Parcours: IA pour la Formation
                </div>
                <div style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--text-base)', color: 'var(--foreground)', lineHeight: 'var(--leading-normal)' }}>
                  Vous avez terminé la leçon 'Introduction au Machine Learning'
                </div>
              </div>
            </div>
          </div>

          <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-lg)', fontWeight: 'var(--font-weight-semibold)', marginTop: 'var(--space-6)', marginBottom: 'var(--space-4)' }}>
            Stat Pills (Hero Section)
          </h3>
          <div style={{ display: 'flex', gap: 'var(--space-3)', flexWrap: 'wrap', marginBottom: 'var(--space-8)' }}>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 'var(--space-2)',
                padding: 'var(--space-2) var(--space-3)',
                borderRadius: 'var(--radius-full)',
                background: 'linear-gradient(135deg, rgba(248, 176, 68, 0.15) 0%, rgba(248, 176, 68, 0.08) 100%)',
                border: '1px solid rgba(248, 176, 68, 0.25)',
                transition: 'transform 200ms cubic-bezier(0, 0, 0.2, 1)',
                cursor: 'pointer',
              }}
              onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
              onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
            >
              <span style={{ fontSize: '16px' }}>🔥</span>
              <span style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-sm)', fontWeight: 'var(--font-weight-bold)', color: 'var(--accent)' }}>7</span>
              <span style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--text-sm)', color: 'var(--accent)' }}>jours</span>
            </div>

            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 'var(--space-2)',
                padding: 'var(--space-2) var(--space-3)',
                borderRadius: 'var(--radius-full)',
                background: 'linear-gradient(135deg, rgba(237, 132, 58, 0.15) 0%, rgba(237, 132, 58, 0.08) 100%)',
                border: '1px solid rgba(237, 132, 58, 0.25)',
                transition: 'transform 200ms cubic-bezier(0, 0, 0.2, 1)',
                cursor: 'pointer',
              }}
              onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
              onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
            >
              <Award size={16} style={{ color: 'var(--secondary)', strokeWidth: 2 }} />
              <span style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-sm)', fontWeight: 'var(--font-weight-bold)', color: 'var(--secondary)' }}>12</span>
              <span style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--text-sm)', color: 'var(--secondary)' }}>badges</span>
            </div>

            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 'var(--space-2)',
                padding: 'var(--space-2) var(--space-3)',
                borderRadius: 'var(--radius-full)',
                background: 'linear-gradient(135deg, rgba(85, 161, 180, 0.15) 0%, rgba(85, 161, 180, 0.08) 100%)',
                border: '1px solid rgba(85, 161, 180, 0.25)',
                transition: 'transform 200ms cubic-bezier(0, 0, 0.2, 1)',
                cursor: 'pointer',
              }}
              onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
              onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
            >
              <TrendingUp size={16} style={{ color: 'var(--primary)', strokeWidth: 2 }} />
              <span style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-sm)', fontWeight: 'var(--font-weight-bold)', color: 'var(--primary)' }}>68%</span>
              <span style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--text-sm)', color: 'var(--primary)' }}>complété</span>
            </div>
          </div>
        </SpecSection>

        {/* ========== 1. CONTAINER & LAYOUT ========== */}
        <SpecSection title="1. Container & Layout Structure" icon={<Box size={24} />}>
          <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-lg)', fontWeight: 'var(--font-weight-semibold)', marginTop: 'var(--space-4)' }}>
            Container Principal
          </h3>
          <CodeBlock code={`/* Container principal - Centré */
.dashboard-container {
  max-width: 1000px;
  margin: 0 auto;
  padding: 0 var(--space-6); /* 24px */
}

/* Spacing entre sections */
.section-spacing {
  margin-bottom: var(--space-8); /* 32px */
}

/* Background Page */
.page-background {
  background: linear-gradient(to bottom right, var(--primary-50), white, var(--accent-50));
  padding-bottom: var(--space-12); /* 48px */
  min-height: 100vh;
}`} />

          <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-lg)', fontWeight: 'var(--font-weight-semibold)', marginTop: 'var(--space-6)' }}>
            Grid Layouts
          </h3>
          <CodeBlock code={`/* Actions Rapides - Grid 4 colonnes */
.quick-actions-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: var(--space-3); /* 12px */
  max-width: 800px;
  margin: 0 auto;
}

/* Journal Prompts - Grid 3 colonnes */
.journal-prompts-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: var(--space-3); /* 12px */
}

/* Activity Feed - Stack vertical */
.activity-feed {
  display: flex;
  flex-direction: column;
  gap: var(--space-3); /* 12px */
}`} />
        </SpecSection>

        {/* ========== 2. COLORS ========== */}
        <SpecSection title="2. Color System" icon={<Palette size={24} />}>
          <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-lg)', fontWeight: 'var(--font-weight-semibold)', marginBottom: 'var(--space-4)' }}>
            Couleurs Primaires TLS
          </h3>
          
          <ColorSwatch name="Primary Blue" variable="--primary" hex="#55A1B4" />
          <ColorSwatch name="Primary Hover" variable="--primary-hover" hex="#4A8FA1" />
          <ColorSwatch name="Primary Lighter" variable="--primary-lighter" hex="#E8F4F7" />
          
          <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-lg)', fontWeight: 'var(--font-weight-semibold)', marginTop: 'var(--space-6)', marginBottom: 'var(--space-4)' }}>
            Couleurs Secondaires
          </h3>
          
          <ColorSwatch name="Secondary Orange" variable="--secondary" hex="#ED843A" />
          <ColorSwatch name="Secondary Lighter" variable="--secondary-lighter" hex="#FFF4E6" />
          <ColorSwatch name="Accent Yellow" variable="--accent" hex="#F8B044" />
          <ColorSwatch name="Accent Lighter" variable="--accent-lighter" hex="#FFF9EE" />
          
          <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-lg)', fontWeight: 'var(--font-weight-semibold)', marginTop: 'var(--space-6)', marginBottom: 'var(--space-4)' }}>
            Couleurs Sémantiques
          </h3>
          
          <ColorSwatch name="Teal (Success)" variable="--teal" hex="#9dbeba" />
          <ColorSwatch name="Teal Lighter" variable="--teal-lighter" hex="#e8f2f0" />
          <ColorSwatch name="Neutral Dark" variable="--neutral-dark" hex="#252B37" />
          <ColorSwatch name="Muted Foreground" variable="--muted-foreground" hex="#6b7280" />

          <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-lg)', fontWeight: 'var(--font-weight-semibold)', marginTop: 'var(--space-6)' }}>
            Variables CSS à utiliser
          </h3>
          <CodeBlock code={`/* TOUJOURS utiliser les variables CSS */
color: var(--primary);          /* Bleu TLS */
color: var(--secondary);        /* Orange TLS */
color: var(--accent);           /* Jaune TLS */
color: var(--foreground);       /* Texte principal */
color: var(--muted-foreground); /* Texte secondaire */

background: var(--primary-lighter);   /* Fond bleu clair */
background: var(--secondary-lighter); /* Fond orange clair */
background: var(--accent-lighter);    /* Fond jaune clair */`} />
        </SpecSection>

        {/* ========== 3. TYPOGRAPHY ========== */}
        <SpecSection title="3. Typography System" icon={<Type size={24} />}>
          <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-lg)', fontWeight: 'var(--font-weight-semibold)', marginBottom: 'var(--space-4)' }}>
            Font Families
          </h3>
          <CodeBlock code={`/* Fonts Google */
@import url('https://fonts.googleapis.com/css2?family=League+Spartan:wght@200;300;400;500;600;700;800;900&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Nunito:wght@200;300;400;500;600;700;800;900&display=swap');

/* Variables */
--font-display: 'League Spartan', -apple-system, 'Helvetica Neue', Arial, sans-serif;
--font-body: 'Nunito', -apple-system, BlinkMacSystemFont, 'Segoe UI', system-ui, sans-serif;

/* Usage */
font-family: var(--font-display); /* Headings */
font-family: var(--font-body);    /* Body text */`} />

          <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-lg)', fontWeight: 'var(--font-weight-semibold)', marginTop: 'var(--space-6)' }}>
            Font Sizes
          </h3>
          <div style={{ marginTop: 'var(--space-4)' }}>
            <div style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-6xl)', marginBottom: 'var(--space-2)' }}>
              Hero Title (60px) - text-6xl
            </div>
            <div style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-5xl)', marginBottom: 'var(--space-2)' }}>
              H1 Heading (48px) - text-5xl
            </div>
            <div style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-4xl)', marginBottom: 'var(--space-2)' }}>
              H2 Heading (36px) - text-4xl
            </div>
            <div style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-3xl)', marginBottom: 'var(--space-2)' }}>
              H3 Heading (30px) - text-3xl
            </div>
            <div style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-2xl)', marginBottom: 'var(--space-2)' }}>
              H4 Heading (24px) - text-2xl
            </div>
            <div style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-xl)', marginBottom: 'var(--space-2)' }}>
              H5 Heading (20px) - text-xl
            </div>
            <div style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--text-lg)', marginBottom: 'var(--space-2)' }}>
              Large Body (18px) - text-lg
            </div>
            <div style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--text-base)', marginBottom: 'var(--space-2)' }}>
              Body Text (16px) - text-base
            </div>
            <div style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--text-sm)', marginBottom: 'var(--space-2)' }}>
              Small Text (14px) - text-sm
            </div>
            <div style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--text-xs)' }}>
              Extra Small (12px) - text-xs
            </div>
          </div>

          <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-lg)', fontWeight: 'var(--font-weight-semibold)', marginTop: 'var(--space-6)' }}>
            Font Weights
          </h3>
          <CodeBlock code={`/* Variables de poids */
--font-weight-light: 300;
--font-weight-normal: 400;
--font-weight-medium: 500;
--font-weight-semibold: 600;
--font-weight-bold: 700;
--font-weight-extrabold: 800;
--font-weight-black: 900;

/* Usage */
font-weight: var(--font-weight-bold);     /* Titres importants */
font-weight: var(--font-weight-semibold); /* Sous-titres */
font-weight: var(--font-weight-normal);   /* Texte body */`} />
        </SpecSection>

        {/* ========== 4. GLASSMORPHISM ========== */}
        <SpecSection title="4. Glassmorphism Cards" icon={<Layers size={24} />}>
          <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-lg)', fontWeight: 'var(--font-weight-semibold)', marginBottom: 'var(--space-4)' }}>
            Style Glass par défaut
          </h3>
          <CodeBlock code={`.glass-card {
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.6) 0%, rgba(255, 255, 255, 0.4) 100%);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border-radius: var(--radius-3xl); /* 32px */
  box-shadow: 0 4px 16px 0 rgba(0, 0, 0, 0.06), 0 1px 0 0 rgba(255, 255, 255, 0.8) inset;
  border: 1px solid rgba(255, 255, 255, 0.8);
}`} />

          <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-lg)', fontWeight: 'var(--font-weight-semibold)', marginTop: 'var(--space-6)' }}>
            États Hover
          </h3>
          <CodeBlock code={`.glass-card:hover {
  transform: translateY(-8px);
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.7) 0%, rgba(255, 255, 255, 0.5) 100%);
  box-shadow: 0 20px 60px 0 rgba(0, 0, 0, 0.08), 0 12px 32px 0 rgba(0, 0, 0, 0.04), 0 1px 0 0 rgba(255, 255, 255, 1) inset;
  backdrop-filter: blur(30px);
  border-color: rgba(255, 255, 255, 1);
  transition: all 200ms cubic-bezier(0, 0, 0.2, 1);
}

/* Hover avec glow coloré (ex: Orange) */
.glass-card-orange:hover {
  box-shadow: 0 20px 60px 0 rgba(237, 132, 58, 0.12), 
              0 12px 32px 0 rgba(237, 132, 58, 0.06), 
              0 1px 0 0 rgba(255, 255, 255, 1) inset;
}`} />

          <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-lg)', fontWeight: 'var(--font-weight-semibold)', marginTop: 'var(--space-6)' }}>
            Variantes de Hero Card
          </h3>
          <CodeBlock code={`.glass-card-hero {
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.8) 0%, rgba(255, 255, 255, 0.6) 100%);
  backdrop-filter: blur(30px);
  -webkit-backdrop-filter: blur(30px);
  border-radius: var(--radius-2xl); /* 24px */
  padding: var(--space-8); /* 32px */
  border: 1px solid rgba(255, 255, 255, 0.9);
  box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.06);
}`} />
        </SpecSection>

        {/* ========== 5. COMPONENTS ========== */}
        <SpecSection title="5. Component Specifications" icon={<Box size={24} />}>
          <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-lg)', fontWeight: 'var(--font-weight-semibold)', marginBottom: 'var(--space-4)' }}>
            Hero Section
          </h3>
          <CodeBlock code={`/* Hero Container */
.hero-section {
  max-width: 1000px;
  margin: 0 auto;
  padding: var(--space-8) var(--space-6); /* 32px 24px */
}

/* Hero Glass Card */
.hero-card {
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.8) 0%, rgba(255, 255, 255, 0.6) 100%);
  backdrop-filter: blur(30px);
  border-radius: var(--radius-2xl); /* 24px */
  padding: var(--space-8); /* 32px */
  border: 1px solid rgba(255, 255, 255, 0.9);
  box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.06);
}

/* Hero Title */
.hero-title {
  font-family: var(--font-display);
  font-size: var(--text-5xl); /* 48px */
  font-weight: var(--font-weight-bold); /* 700 */
  line-height: var(--leading-tight); /* 1.25 */
  background: var(--gradient-tls-text-cool);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

/* Stats Pills */
.stat-pill {
  display: flex;
  align-items: center;
  gap: var(--space-2); /* 8px */
  padding: var(--space-2) var(--space-3); /* 8px 12px */
  border-radius: var(--radius-full);
  transition: transform var(--duration-base) var(--ease-out);
}

.stat-pill:hover {
  transform: scale(1.05);
}

/* Streak Pill - Jaune */
.stat-pill-streak {
  background: linear-gradient(135deg, rgba(248, 176, 68, 0.15) 0%, rgba(248, 176, 68, 0.08) 100%);
  border: 1px solid rgba(248, 176, 68, 0.25);
}

/* Badges Pill - Orange */
.stat-pill-badges {
  background: linear-gradient(135deg, rgba(237, 132, 58, 0.15) 0%, rgba(237, 132, 58, 0.08) 100%);
  border: 1px solid rgba(237, 132, 58, 0.25);
}

/* Completion Pill - Bleu */
.stat-pill-completion {
  background: linear-gradient(135deg, rgba(85, 161, 180, 0.15) 0%, rgba(85, 161, 180, 0.08) 100%);
  border: 1px solid rgba(85, 161, 180, 0.25);
}`} />

          <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-lg)', fontWeight: 'var(--font-weight-semibold)', marginTop: 'var(--space-6)' }}>
            Action Cards (Quick Actions)
          </h3>
          <CodeBlock code={`/* Action Card */
.action-card {
  /* Glass style de base */
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.6) 0%, rgba(255, 255, 255, 0.4) 100%);
  backdrop-filter: blur(20px);
  border-radius: var(--radius-2xl); /* 24px */
  padding: var(--space-5); /* 20px */
  border: 1px solid rgba(255, 255, 255, 0.8);
  box-shadow: 0 4px 16px 0 rgba(0, 0, 0, 0.06);
  
  /* Layout */
  display: flex;
  flex-direction: column;
  gap: var(--space-3); /* 12px */
  align-items: center;
  text-align: center;
  min-height: 160px;
  
  cursor: pointer;
  transition: all 300ms cubic-bezier(0, 0, 0.2, 1);
}

/* Icon Circle */
.action-card-icon-circle {
  width: 72px;
  height: 72px;
  border-radius: 50%;
  background: rgba(var(--icon-color-rgb), 0.12); /* 12% opacity */
  display: flex;
  align-items: center;
  justify-content: center;
}

.action-card-icon {
  width: 40px;
  height: 40px;
  color: var(--icon-color);
  stroke-width: 2;
}

/* Title */
.action-card-title {
  font-family: var(--font-display);
  font-size: var(--text-base); /* 16px */
  font-weight: var(--font-weight-bold); /* 700 */
  color: var(--foreground);
  line-height: var(--leading-tight);
}

/* Description */
.action-card-description {
  font-family: var(--font-body);
  font-size: var(--text-xs); /* 12px */
  color: var(--muted-foreground);
}

/* Hover State */
.action-card:hover {
  transform: scale(1.05);
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.7) 0%, rgba(255, 255, 255, 0.5) 100%);
  box-shadow: 0 8px 24px 0 rgba(var(--icon-color-rgb), 0.12);
}`} />

          <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-lg)', fontWeight: 'var(--font-weight-semibold)', marginTop: 'var(--space-6)' }}>
            Continue Learning Card
          </h3>
          <CodeBlock code={`/* Continue Learning Card */
.continue-learning-card {
  /* Glass style */
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.6) 0%, rgba(255, 255, 255, 0.4) 100%);
  backdrop-filter: blur(20px);
  border-radius: var(--radius-3xl); /* 32px */
  padding: var(--space-8); /* 32px */
  border: 1px solid rgba(255, 255, 255, 0.8);
  box-shadow: 0 4px 16px 0 rgba(0, 0, 0, 0.06), 0 1px 0 0 rgba(255, 255, 255, 0.8) inset;
  
  position: relative;
  overflow: hidden;
  cursor: pointer;
  transition: all 200ms cubic-bezier(0, 0, 0.2, 1);
  
  /* Animation breathe */
  animation: breathe 4s ease-in-out infinite;
}

@keyframes breathe {
  0%, 100% {
    box-shadow: 0 4px 16px 0 rgba(0, 0, 0, 0.06), 0 1px 0 0 rgba(255, 255, 255, 0.8) inset;
  }
  50% {
    box-shadow: 0 8px 24px 0 rgba(237, 132, 58, 0.08), 0 1px 0 0 rgba(255, 255, 255, 0.8) inset;
  }
}

/* Background Glow */
.continue-learning-glow {
  position: absolute;
  inset: 0;
  background: radial-gradient(circle at 50% 0%, rgba(237, 132, 58, 0.06) 0%, transparent 70%);
  pointer-events: none;
  animation: pulseGlow 3s ease-in-out infinite;
}

@keyframes pulseGlow {
  0%, 100% { opacity: 0.06; }
  50% { opacity: 0.12; }
}

/* Course Title */
.continue-learning-title {
  font-family: var(--font-display);
  font-size: var(--text-2xl); /* 24px */
  font-weight: var(--font-weight-bold); /* 700 */
  color: var(--secondary); /* Orange */
  line-height: var(--leading-tight);
}

/* Current Step */
.continue-learning-step {
  font-family: var(--font-body);
  font-size: var(--text-base); /* 16px */
  color: var(--muted-foreground);
  line-height: var(--leading-normal);
}

/* Continue Button */
.continue-button {
  display: flex;
  align-items: center;
  gap: var(--space-3); /* 12px */
  padding: var(--space-3) var(--space-6); /* 12px 24px */
  background: var(--secondary);
  color: white;
  border: none;
  border-radius: var(--radius-xl); /* 16px */
  cursor: pointer;
  transition: all 300ms cubic-bezier(0, 0, 0.2, 1);
}

.continue-button:hover {
  transform: scale(1.05);
}

/* Progress Bar */
.progress-bar-container {
  background: rgba(0, 0, 0, 0.05);
  border-radius: var(--radius-full);
  height: 8px;
  overflow: hidden;
  margin-top: var(--space-6); /* 24px */
}

.progress-bar-fill {
  height: 100%;
  background: linear-gradient(90deg, var(--primary), var(--secondary), var(--accent));
  background-size: 200% 100%;
  border-radius: var(--radius-full);
  animation: gradientFlow 3s ease-in-out infinite;
  transition: width 300ms cubic-bezier(0, 0, 0.2, 1);
}

@keyframes gradientFlow {
  0%, 100% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
}

/* Hover State */
.continue-learning-card:hover {
  transform: translateY(-8px);
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.7) 0%, rgba(255, 255, 255, 0.5) 100%);
  box-shadow: 0 20px 60px 0 rgba(237, 132, 58, 0.08), 
              0 12px 32px 0 rgba(237, 132, 58, 0.04), 
              0 1px 0 0 rgba(255, 255, 255, 1) inset;
  backdrop-filter: blur(30px);
  border-color: rgba(255, 255, 255, 1);
  animation: none; /* Stop breathe on hover */
}`} />

          <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-lg)', fontWeight: 'var(--font-weight-semibold)', marginTop: 'var(--space-6)' }}>
            Journal Prompt Cards
          </h3>
          <CodeBlock code={`/* Journal Prompt Card */
.journal-prompt-card {
  /* Glass style */
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.6) 0%, rgba(255, 255, 255, 0.4) 100%);
  backdrop-filter: blur(20px);
  border-radius: var(--radius-2xl); /* 24px */
  padding: var(--space-5); /* 20px */
  border: 1px solid rgba(255, 255, 255, 0.8);
  box-shadow: 0 4px 16px 0 rgba(0, 0, 0, 0.06);
  
  /* Layout */
  display: flex;
  flex-direction: column;
  gap: var(--space-4); /* 16px - Gap fixe entre tous éléments */
  align-items: center;
  text-align: center;
  
  cursor: pointer;
  transition: all 200ms cubic-bezier(0, 0, 0.2, 1);
}

/* Badge */
.journal-prompt-badge {
  padding: var(--space-2-5) var(--space-5); /* 10px 20px */
  border-radius: var(--radius-full);
  font-family: var(--font-body);
  font-size: var(--text-xs); /* 12px */
  font-weight: var(--font-weight-semibold); /* 600 */
}

/* Icon */
.journal-prompt-icon {
  width: 48px;
  height: 48px;
  stroke-width: 1.5;
}

/* Question Text */
.journal-prompt-question {
  font-family: var(--font-body);
  font-size: var(--text-base); /* 16px */
  font-weight: var(--font-weight-medium); /* 500 */
  color: var(--foreground);
  line-height: var(--leading-normal); /* 1.5 */
}

/* Hover State */
.journal-prompt-card:hover {
  transform: translateY(-4px);
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.7) 0%, rgba(255, 255, 255, 0.5) 100%);
  box-shadow: 0 12px 32px 0 rgba(0, 0, 0, 0.08);
}`} />

          <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-lg)', fontWeight: 'var(--font-weight-semibold)', marginTop: 'var(--space-6)' }}>
            Activity Feed Cards
          </h3>
          <CodeBlock code={`/* Activity Card */
.activity-card {
  /* Glass style */
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.6) 0%, rgba(255, 255, 255, 0.4) 100%);
  backdrop-filter: blur(20px);
  border-radius: var(--radius-2xl); /* 24px */
  padding: var(--space-4); /* 16px - Compact */
  border: 1px solid rgba(255, 255, 255, 0.8);
  box-shadow: 0 4px 16px 0 rgba(0, 0, 0, 0.06);
  
  /* Layout */
  display: flex;
  flex-direction: row;
  gap: var(--space-4); /* 16px icon→content */
  align-items: flex-start;
  
  cursor: pointer;
  transition: all 200ms cubic-bezier(0, 0, 0.2, 1);
}

/* Icon */
.activity-card-icon {
  width: 32px;
  height: 32px;
  flex-shrink: 0;
  stroke-width: 1.5;
}

/* Title */
.activity-card-title {
  font-family: var(--font-display);
  font-size: var(--text-lg); /* 18px */
  font-weight: var(--font-weight-semibold); /* 600 */
  color: var(--foreground);
  line-height: var(--leading-tight);
}

/* Date/Meta */
.activity-card-date {
  font-family: var(--font-body);
  font-size: var(--text-xs); /* 12px */
  color: var(--muted-foreground);
  line-height: 1.4;
}

/* Description */
.activity-card-description {
  font-family: var(--font-body);
  font-size: var(--text-base); /* 16px */
  color: var(--foreground);
  line-height: var(--leading-normal);
  margin-top: var(--space-2); /* 8px gap avec meta */
}

/* Hover State */
.activity-card:hover {
  transform: translateY(-2px);
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.7) 0%, rgba(255, 255, 255, 0.5) 100%);
  box-shadow: 0 8px 24px 0 rgba(0, 0, 0, 0.08);
}`} />
        </SpecSection>

        {/* ========== 6. SPACING ========== */}
        <SpecSection title="6. Spacing System" icon={<Ruler size={24} />}>
          <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-lg)', fontWeight: 'var(--font-weight-semibold)', marginBottom: 'var(--space-4)' }}>
            Échelle d'espacement (8px base)
          </h3>
          <CodeBlock code={`/* Variables d'espacement */
--space-0: 0;
--space-0-5: 0.125rem;  /* 2px */
--space-1: 0.25rem;     /* 4px */
--space-1-5: 0.375rem;  /* 6px */
--space-2: 0.5rem;      /* 8px */
--space-2-5: 0.625rem;  /* 10px */
--space-3: 0.75rem;     /* 12px */
--space-3-5: 0.875rem;  /* 14px */
--space-4: 1rem;        /* 16px */
--space-5: 1.25rem;     /* 20px */
--space-6: 1.5rem;      /* 24px */
--space-8: 2rem;        /* 32px */
--space-10: 2.5rem;     /* 40px */
--space-12: 3rem;       /* 48px */
--space-16: 4rem;       /* 64px */
--space-20: 5rem;       /* 80px */
--space-24: 6rem;       /* 96px */
--space-32: 8rem;       /* 128px */`} />

          <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-lg)', fontWeight: 'var(--font-weight-semibold)', marginTop: 'var(--space-6)' }}>
            Spacing Patterns Dashboard
          </h3>
          <CodeBlock code={`/* Sections principales */
.section-spacing {
  margin-bottom: var(--space-8); /* 32px entre sections */
}

/* Container padding */
.container-padding {
  padding: 0 var(--space-6); /* 24px horizontal */
}

/* Card padding */
.card-padding-compact: var(--space-4);  /* 16px */
.card-padding-standard: var(--space-5); /* 20px */
.card-padding-large: var(--space-8);    /* 32px */

/* Gap entre éléments */
.gap-tight: var(--space-2);    /* 8px */
.gap-normal: var(--space-3);   /* 12px */
.gap-relaxed: var(--space-4);  /* 16px */
.gap-loose: var(--space-6);    /* 24px */`} />

          <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-lg)', fontWeight: 'var(--font-weight-semibold)', marginTop: 'var(--space-6)' }}>
            Card Padding System
          </h3>
          <CodeBlock code={`/* Horizontal Padding (left/right) */
--card-padding-x: 1.5rem;        /* 24px - Standard */
--card-padding-x-compact: 1rem;  /* 16px - Compact */
--card-padding-x-large: 2rem;    /* 32px - Large */

/* Vertical Padding (top/bottom) */
--card-padding-y: 1.5rem;        /* 24px - Standard */
--card-padding-y-compact: 1rem;  /* 16px - Compact */
--card-padding-y-large: 2rem;    /* 32px - Large */

/* Gap between card elements */
--card-gap: 1rem;                /* 16px - Standard */
--card-gap-sm: 0.75rem;          /* 12px - Small */
--card-gap-lg: 1.5rem;           /* 24px - Large */`} />
        </SpecSection>

        {/* ========== 7. BORDERS & RADIUS ========== */}
        <SpecSection title="7. Borders & Radius" icon={<Circle size={24} />}>
          <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-lg)', fontWeight: 'var(--font-weight-semibold)', marginBottom: 'var(--space-4)' }}>
            Border Radius
          </h3>
          <CodeBlock code={`/* Variables de radius */
--radius-none: 0;
--radius-sm: 0.375rem;   /* 6px */
--radius-md: 0.5rem;     /* 8px */
--radius-lg: 0.625rem;   /* 10px - Base radius */
--radius-xl: 1rem;       /* 16px */
--radius-2xl: 1.5rem;    /* 24px */
--radius-3xl: 2rem;      /* 32px */
--radius-full: 9999px;   /* Full circle/pill */

/* Usage par composant */
.action-card { border-radius: var(--radius-2xl); }      /* 24px */
.continue-learning { border-radius: var(--radius-3xl); } /* 32px */
.journal-prompt { border-radius: var(--radius-2xl); }   /* 24px */
.activity-card { border-radius: var(--radius-2xl); }    /* 24px */
.stat-pill { border-radius: var(--radius-full); }       /* Pill */
.button { border-radius: var(--radius-xl); }            /* 16px */`} />

          <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-lg)', fontWeight: 'var(--font-weight-semibold)', marginTop: 'var(--space-6)' }}>
            Borders
          </h3>
          <CodeBlock code={`/* Border widths */
--border-width: 1px;
--border-width-2: 2px;
--border-width-4: 4px;

/* Border colors */
--border: rgba(0, 0, 0, 0.1);        /* Default */
--border-hover: rgba(0, 0, 0, 0.2);   /* Hover state */

/* Glass borders */
border: 1px solid rgba(255, 255, 255, 0.8); /* Default glass */
border: 1px solid rgba(255, 255, 255, 1);   /* Hover glass */

/* Colored borders (for pills) */
border: 1px solid rgba(85, 161, 180, 0.25);  /* Bleu */
border: 1px solid rgba(237, 132, 58, 0.25);  /* Orange */
border: 1px solid rgba(248, 176, 68, 0.25);  /* Jaune */`} />
        </SpecSection>

        {/* ========== 8. RESPONSIVE ========== */}
        <SpecSection title="8. Responsive Breakpoints" icon={<Monitor size={24} />}>
          <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-lg)', fontWeight: 'var(--font-weight-semibold)', marginBottom: 'var(--space-4)' }}>
            Breakpoints
          </h3>
          <CodeBlock code={`/* Breakpoints Desktop-First */
@media (max-width: 1024px) { /* Tablet */ }
@media (max-width: 768px)  { /* Mobile Landscape */ }
@media (max-width: 640px)  { /* Mobile Portrait */ }

/* Usage TLS */
/* Desktop: 1000px+ (default) */
/* Tablet: 768px - 1023px */
/* Mobile: < 768px */`} />

          <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-lg)', fontWeight: 'var(--font-weight-semibold)', marginTop: 'var(--space-6)' }}>
            Responsive Grid Layouts
          </h3>
          <CodeBlock code={`/* Quick Actions Grid */
.quick-actions-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: var(--space-3);
}

@media (max-width: 1024px) {
  .quick-actions-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: var(--space-4);
  }
}

@media (max-width: 640px) {
  .quick-actions-grid {
    grid-template-columns: 1fr;
    gap: var(--space-4);
  }
}

/* Journal Prompts Grid */
.journal-prompts-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: var(--space-3);
}

@media (max-width: 1024px) {
  .journal-prompts-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 640px) {
  .journal-prompts-grid {
    grid-template-columns: 1fr;
  }
}`} />

          <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-lg)', fontWeight: 'var(--font-weight-semibold)', marginTop: 'var(--space-6)' }}>
            Responsive Typography
          </h3>
          <CodeBlock code={`/* Hero Title */
.hero-title {
  font-size: var(--text-5xl); /* 48px desktop */
}

@media (max-width: 1024px) {
  .hero-title {
    font-size: var(--text-4xl); /* 36px tablet */
  }
}

@media (max-width: 640px) {
  .hero-title {
    font-size: var(--text-3xl); /* 30px mobile */
  }
}

/* Card Title */
.card-title {
  font-size: var(--text-2xl); /* 24px desktop */
}

@media (max-width: 640px) {
  .card-title {
    font-size: var(--text-xl); /* 20px mobile */
  }
}`} />

          <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-lg)', fontWeight: 'var(--font-weight-semibold)', marginTop: 'var(--space-6)' }}>
            Responsive Spacing
          </h3>
          <CodeBlock code={`/* Container padding */
.container-padding {
  padding: 0 var(--space-6); /* 24px desktop */
}

@media (max-width: 640px) {
  .container-padding {
    padding: 0 var(--space-4); /* 16px mobile */
  }
}

/* Section spacing */
.section-spacing {
  margin-bottom: var(--space-8); /* 32px desktop */
}

@media (max-width: 640px) {
  .section-spacing {
    margin-bottom: var(--space-6); /* 24px mobile */
  }
}

/* Card padding */
.card-padding {
  padding: var(--space-8); /* 32px desktop */
}

@media (max-width: 640px) {
  .card-padding {
    padding: var(--space-5); /* 20px mobile */
  }
}`} />
        </SpecSection>

        {/* ========== 9. ANIMATIONS ========== */}
        <SpecSection title="9. Animations & Transitions" icon={<ArrowRight size={24} />}>
          <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-lg)', fontWeight: 'var(--font-weight-semibold)', marginBottom: 'var(--space-4)' }}>
            Timing Variables
          </h3>
          <CodeBlock code={`/* Duration */
--duration-fast: 150ms;
--duration-base: 200ms;
--duration-slow: 300ms;
--duration-slower: 500ms;

/* Timing Functions */
--ease-in: cubic-bezier(0.4, 0, 1, 1);
--ease-out: cubic-bezier(0, 0, 0.2, 1);
--ease-in-out: cubic-bezier(0.4, 0, 0.2, 1);
--ease-bounce: cubic-bezier(0.68, -0.55, 0.265, 1.55);

/* Usage */
transition: all var(--duration-base) var(--ease-out);`} />

          <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-lg)', fontWeight: 'var(--font-weight-semibold)', marginTop: 'var(--space-6)' }}>
            Keyframe Animations
          </h3>
          <CodeBlock code={`/* Breathe Animation - Continue Learning Card */
@keyframes breathe {
  0%, 100% {
    box-shadow: 0 4px 16px 0 rgba(0, 0, 0, 0.06), 
                0 1px 0 0 rgba(255, 255, 255, 0.8) inset;
  }
  50% {
    box-shadow: 0 8px 24px 0 rgba(237, 132, 58, 0.08), 
                0 1px 0 0 rgba(255, 255, 255, 0.8) inset;
  }
}

.continue-learning-card {
  animation: breathe 4s ease-in-out infinite;
}

/* Pulse Glow - Background Glow */
@keyframes pulseGlow {
  0%, 100% { opacity: 0.06; }
  50% { opacity: 0.12; }
}

.continue-learning-glow {
  animation: pulseGlow 3s ease-in-out infinite;
}

/* Gradient Flow - Progress Bar */
@keyframes gradientFlow {
  0%, 100% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
}

.progress-bar-fill {
  animation: gradientFlow 3s ease-in-out infinite;
}

/* Fade Slide In - Hero Content */
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

.hero-title {
  animation: gentleFadeIn 0.7s ease-out;
}

.hero-content {
  animation: gentleFadeIn 0.9s ease-out 0.2s both;
}`} />

          <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-lg)', fontWeight: 'var(--font-weight-semibold)', marginTop: 'var(--space-6)' }}>
            Hover Transitions
          </h3>
          <CodeBlock code={`/* Card hover lift */
.card {
  transition: all 200ms cubic-bezier(0, 0, 0.2, 1);
}

.card:hover {
  transform: translateY(-8px);
}

/* Card hover scale */
.action-card {
  transition: all 300ms cubic-bezier(0, 0, 0.2, 1);
}

.action-card:hover {
  transform: scale(1.05);
}

/* Button hover */
.button {
  transition: all 300ms cubic-bezier(0, 0, 0.2, 1);
}

.button:hover {
  transform: scale(1.05);
}

/* Stat pill hover */
.stat-pill {
  transition: transform 200ms cubic-bezier(0, 0, 0.2, 1);
}

.stat-pill:hover {
  transform: scale(1.05);
}`} />
        </SpecSection>

        {/* ========== 10. ICONS ========== */}
        <SpecSection title="10. Icon System" icon={<Layers size={24} />}>
          <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-lg)', fontWeight: 'var(--font-weight-semibold)', marginBottom: 'var(--space-4)' }}>
            Tailles d'icônes
          </h3>
          <CodeBlock code={`/* Icon Sizes */
.icon-xs  { width: 16px; height: 16px; }  /* w-4 h-4 */
.icon-sm  { width: 20px; height: 20px; }  /* w-5 h-5 */
.icon-md  { width: 24px; height: 24px; }  /* w-6 h-6 */
.icon-lg  { width: 32px; height: 32px; }  /* w-8 h-8 */
.icon-xl  { width: 40px; height: 40px; }  /* w-10 h-10 */
.icon-2xl { width: 48px; height: 48px; }  /* w-12 h-12 */
.icon-3xl { width: 56px; height: 56px; }  /* w-14 h-14 */

/* Usage par composant */
Hero Stats Pills: 16px (w-4)
Action Card Icon: 40px (w-10)
Journal Prompt Icon: 48px (w-12)
Activity Card Icon: 32px (w-8)
Button Icon: 20px (w-5)`} />

          <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-lg)', fontWeight: 'var(--font-weight-semibold)', marginTop: 'var(--space-6)' }}>
            Stroke Width
          </h3>
          <CodeBlock code={`/* Stroke Weights */
.icon-thin { stroke-width: 1; }
.icon-normal { stroke-width: 1.5; }  /* Default */
.icon-bold { stroke-width: 2; }
.icon-extra-bold { stroke-width: 2.5; }

/* Usage */
Plupart des icônes: stroke-width: 1.5
Action Card icons (emphasis): stroke-width: 2
Icons dans badges: stroke-width: 1.5`} />

          <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-lg)', fontWeight: 'var(--font-weight-semibold)', marginTop: 'var(--space-6)' }}>
            Library Lucide React
          </h3>
          <CodeBlock code={`/* Installation */
npm install lucide-react

/* Import */
import { Users, Map, PenLine, Sparkles, TrendingUp, 
         CheckCircle2, Award, ArrowRight, BookMarked } from 'lucide-react';

/* Usage */
<Users 
  className="w-10 h-10" 
  style={{ color: 'var(--primary)', strokeWidth: 1.5 }} 
/>

/* Icons Dashboard */
Users: Coaching
Map: Parcours
PenLine: Journal
Sparkles: Veille
CheckCircle2: Lesson completed
Award: Badge earned
TrendingUp: Streak
ArrowRight: Continue button
BookMarked: Learning reflection`} />
        </SpecSection>

        {/* ========== 11. SHADOWS ========== */}
        <SpecSection title="11. Shadow System" icon={<Layers size={24} />}>
          <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-lg)', fontWeight: 'var(--font-weight-semibold)', marginBottom: 'var(--space-4)' }}>
            Shadow Variables
          </h3>
          <CodeBlock code={`/* Shadow Scale */
--shadow-xs: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
--shadow-sm: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px -1px rgba(0, 0, 0, 0.1);
--shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.1);
--shadow-lg: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -4px rgba(0, 0, 0, 0.1);
--shadow-xl: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1);
--shadow-2xl: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
--shadow-inner: inset 0 2px 4px 0 rgba(0, 0, 0, 0.05);`} />

          <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-lg)', fontWeight: 'var(--font-weight-semibold)', marginTop: 'var(--space-6)' }}>
            Glass Card Shadows
          </h3>
          <CodeBlock code={`/* Default Glass Shadow */
box-shadow: 0 4px 16px 0 rgba(0, 0, 0, 0.06), 
            0 1px 0 0 rgba(255, 255, 255, 0.8) inset;

/* Hover Glass Shadow */
box-shadow: 0 20px 60px 0 rgba(0, 0, 0, 0.08), 
            0 12px 32px 0 rgba(0, 0, 0, 0.04), 
            0 1px 0 0 rgba(255, 255, 255, 1) inset;

/* Hero Card Shadow */
box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.06);

/* Hover with Colored Glow (Orange) */
box-shadow: 0 20px 60px 0 rgba(237, 132, 58, 0.12), 
            0 12px 32px 0 rgba(237, 132, 58, 0.06), 
            0 1px 0 0 rgba(255, 255, 255, 1) inset;

/* Hover with Colored Glow (Blue) */
box-shadow: 0 8px 24px 0 rgba(85, 161, 180, 0.12);`} />
        </SpecSection>

        {/* ========== 12. Z-INDEX ========== */}
        <SpecSection title="12. Z-Index Scale" icon={<Layers size={24} />}>
          <CodeBlock code={`/* Z-Index Variables */
--z-base: 0;
--z-dropdown: 1000;
--z-sticky: 1020;
--z-fixed: 1030;
--z-modal-backdrop: 1040;
--z-modal: 1050;
--z-popover: 1060;
--z-tooltip: 1070;

/* Usage Dashboard */
.background-blobs { z-index: 0; }
.sidebar { z-index: var(--z-sticky); }
.card-content { z-index: 1; }
.card-glow { z-index: 0; position: absolute; }
.stat-pill { z-index: 1; position: relative; }`} />
        </SpecSection>

        {/* ========== 13. ACCESSIBILITY ========== */}
        <SpecSection title="13. Accessibility (A11Y)" icon={<Monitor size={24} />}>
          <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-lg)', fontWeight: 'var(--font-weight-semibold)', marginBottom: 'var(--space-4)' }}>
            Focus States
          </h3>
          <CodeBlock code={`/* Focus ring pour accessibilité */
.card:focus,
.button:focus {
  outline: 2px solid var(--primary);
  outline-offset: 2px;
}

/* Focus visible uniquement au clavier */
.card:focus-visible,
.button:focus-visible {
  outline: 2px solid var(--primary);
  outline-offset: 2px;
}

.card:focus:not(:focus-visible),
.button:focus:not(:focus-visible) {
  outline: none;
}`} />

          <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-lg)', fontWeight: 'var(--font-weight-semibold)', marginTop: 'var(--space-6)' }}>
            Contrast Ratios
          </h3>
          <CodeBlock code={`/* WCAG AA Requirements */
Texte normal (< 18px): Ratio 4.5:1
Texte large (≥ 18px): Ratio 3:1

/* TLS Color Contrasts */
--foreground (#252B37) on white: 13.5:1 ✓ AAA
--muted-foreground (#6b7280) on white: 5.2:1 ✓ AA
--primary (#55A1B4) on white: 3.3:1 ⚠️ Large text only
--secondary (#ED843A) on white: 3.1:1 ⚠️ Large text only

/* Best Practices */
- Utiliser --foreground pour texte principal
- Utiliser --muted-foreground pour texte secondaire
- Ne pas utiliser couleurs brand seules pour petit texte
- Toujours avoir ratio 4.5:1+ pour texte < 18px`} />

          <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-lg)', fontWeight: 'var(--font-weight-semibold)', marginTop: 'var(--space-6)' }}>
            Semantic HTML
          </h3>
          <CodeBlock code={`/* Structure sémantique */
<main>
  <section aria-labelledby="hero-heading">
    <h1 id="hero-heading">Hello Pierre-Armand</h1>
  </section>
  
  <section aria-labelledby="quick-actions">
    <h2 id="quick-actions" class="sr-only">Actions rapides</h2>
    <div class="quick-actions-grid">
      <button aria-label="Réserver une session de coaching">
        <span aria-hidden="true">👥</span>
        Coaching 1-to-1
      </button>
    </div>
  </section>
</main>

/* Screen reader only class */
.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border-width: 0;
}`} />
        </SpecSection>

        {/* ========== 14. DEV SPECS - PIXEL PERFECT ========== */}
        <SpecSection title="14. Dev Specs - Pixel Perfect" icon={<Ruler size={24} />}>
          <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-lg)', fontWeight: 'var(--font-weight-semibold)', marginBottom: 'var(--space-4)' }}>
            Container & Widths
          </h3>
          <div style={{ background: 'rgba(0, 0, 0, 0.02)', padding: 'var(--space-4)', borderRadius: 'var(--radius-lg)', marginBottom: 'var(--space-4)' }}>
            <table style={{ width: '100%', fontFamily: 'var(--font-body)', fontSize: 'var(--text-sm)' }}>
              <tbody>
                <tr style={{ borderBottom: '1px solid rgba(0, 0, 0, 0.05)' }}>
                  <td style={{ padding: 'var(--space-2)', fontWeight: 'var(--font-weight-semibold)' }}>Container principal</td>
                  <td style={{ padding: 'var(--space-2)', color: 'var(--muted-foreground)' }}>max-width: 1000px</td>
                </tr>
                <tr style={{ borderBottom: '1px solid rgba(0, 0, 0, 0.05)' }}>
                  <td style={{ padding: 'var(--space-2)', fontWeight: 'var(--font-weight-semibold)' }}>Quick Actions Grid</td>
                  <td style={{ padding: 'var(--space-2)', color: 'var(--muted-foreground)' }}>max-width: 800px</td>
                </tr>
                <tr style={{ borderBottom: '1px solid rgba(0, 0, 0, 0.05)' }}>
                  <td style={{ padding: 'var(--space-2)', fontWeight: 'var(--font-weight-semibold)' }}>Padding horizontal</td>
                  <td style={{ padding: 'var(--space-2)', color: 'var(--muted-foreground)' }}>24px (var(--space-6))</td>
                </tr>
                <tr>
                  <td style={{ padding: 'var(--space-2)', fontWeight: 'var(--font-weight-semibold)' }}>Section spacing</td>
                  <td style={{ padding: 'var(--space-2)', color: 'var(--muted-foreground)' }}>32px (var(--space-8))</td>
                </tr>
              </tbody>
            </table>
          </div>

          <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-lg)', fontWeight: 'var(--font-weight-semibold)', marginTop: 'var(--space-6)', marginBottom: 'var(--space-4)' }}>
            Grid Systems
          </h3>
          <div style={{ background: 'rgba(0, 0, 0, 0.02)', padding: 'var(--space-4)', borderRadius: 'var(--radius-lg)', marginBottom: 'var(--space-4)' }}>
            <table style={{ width: '100%', fontFamily: 'var(--font-body)', fontSize: 'var(--text-sm)' }}>
              <tbody>
                <tr style={{ borderBottom: '1px solid rgba(0, 0, 0, 0.05)' }}>
                  <td style={{ padding: 'var(--space-2)', fontWeight: 'var(--font-weight-semibold)' }}>Quick Actions</td>
                  <td style={{ padding: 'var(--space-2)', color: 'var(--muted-foreground)' }}>4 colonnes • Gap: 12px</td>
                </tr>
                <tr style={{ borderBottom: '1px solid rgba(0, 0, 0, 0.05)' }}>
                  <td style={{ padding: 'var(--space-2)', fontWeight: 'var(--font-weight-semibold)' }}>Journal Prompts</td>
                  <td style={{ padding: 'var(--space-2)', color: 'var(--muted-foreground)' }}>3 colonnes • Gap: 12px</td>
                </tr>
                <tr>
                  <td style={{ padding: 'var(--space-2)', fontWeight: 'var(--font-weight-semibold)' }}>Activity Feed</td>
                  <td style={{ padding: 'var(--space-2)', color: 'var(--muted-foreground)' }}>1 colonne • Gap: 12px</td>
                </tr>
              </tbody>
            </table>
          </div>

          <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-lg)', fontWeight: 'var(--font-weight-semibold)', marginTop: 'var(--space-6)', marginBottom: 'var(--space-4)' }}>
            Component Sizes
          </h3>
          <div style={{ background: 'rgba(0, 0, 0, 0.02)', padding: 'var(--space-4)', borderRadius: 'var(--radius-lg)', marginBottom: 'var(--space-4)' }}>
            <table style={{ width: '100%', fontFamily: 'var(--font-body)', fontSize: 'var(--text-sm)' }}>
              <tbody>
                <tr style={{ borderBottom: '1px solid rgba(0, 0, 0, 0.05)' }}>
                  <td style={{ padding: 'var(--space-2)', fontWeight: 'var(--font-weight-semibold)' }}>Action Card Icon Circle</td>
                  <td style={{ padding: 'var(--space-2)', color: 'var(--muted-foreground)' }}>72px × 72px</td>
                </tr>
                <tr style={{ borderBottom: '1px solid rgba(0, 0, 0, 0.05)' }}>
                  <td style={{ padding: 'var(--space-2)', fontWeight: 'var(--font-weight-semibold)' }}>Action Card Icon</td>
                  <td style={{ padding: 'var(--space-2)', color: 'var(--muted-foreground)' }}>40px × 40px • stroke-width: 2</td>
                </tr>
                <tr style={{ borderBottom: '1px solid rgba(0, 0, 0, 0.05)' }}>
                  <td style={{ padding: 'var(--space-2)', fontWeight: 'var(--font-weight-semibold)' }}>Action Card Min Height</td>
                  <td style={{ padding: 'var(--space-2)', color: 'var(--muted-foreground)' }}>160px</td>
                </tr>
                <tr style={{ borderBottom: '1px solid rgba(0, 0, 0, 0.05)' }}>
                  <td style={{ padding: 'var(--space-2)', fontWeight: 'var(--font-weight-semibold)' }}>Journal Prompt Icon</td>
                  <td style={{ padding: 'var(--space-2)', color: 'var(--muted-foreground)' }}>48px × 48px • stroke-width: 1.5</td>
                </tr>
                <tr style={{ borderBottom: '1px solid rgba(0, 0, 0, 0.05)' }}>
                  <td style={{ padding: 'var(--space-2)', fontWeight: 'var(--font-weight-semibold)' }}>Activity Icon</td>
                  <td style={{ padding: 'var(--space-2)', color: 'var(--muted-foreground)' }}>32px × 32px • stroke-width: 1.5</td>
                </tr>
                <tr style={{ borderBottom: '1px solid rgba(0, 0, 0, 0.05)' }}>
                  <td style={{ padding: 'var(--space-2)', fontWeight: 'var(--font-weight-semibold)' }}>Stat Pill Icon</td>
                  <td style={{ padding: 'var(--space-2)', color: 'var(--muted-foreground)' }}>16px × 16px • stroke-width: 2</td>
                </tr>
                <tr>
                  <td style={{ padding: 'var(--space-2)', fontWeight: 'var(--font-weight-semibold)' }}>Progress Bar Height</td>
                  <td style={{ padding: 'var(--space-2)', color: 'var(--muted-foreground)' }}>8px</td>
                </tr>
              </tbody>
            </table>
          </div>

          <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-lg)', fontWeight: 'var(--font-weight-semibold)', marginTop: 'var(--space-6)', marginBottom: 'var(--space-4)' }}>
            Border Colors & Opacity
          </h3>
          <div style={{ background: 'rgba(0, 0, 0, 0.02)', padding: 'var(--space-4)', borderRadius: 'var(--radius-lg)', marginBottom: 'var(--space-4)' }}>
            <table style={{ width: '100%', fontFamily: 'var(--font-body)', fontSize: 'var(--text-sm)' }}>
              <tbody>
                <tr style={{ borderBottom: '1px solid rgba(0, 0, 0, 0.05)' }}>
                  <td style={{ padding: 'var(--space-2)', fontWeight: 'var(--font-weight-semibold)' }}>Glass Card Default</td>
                  <td style={{ padding: 'var(--space-2)', color: 'var(--muted-foreground)' }}>rgba(255, 255, 255, 0.8)</td>
                </tr>
                <tr style={{ borderBottom: '1px solid rgba(0, 0, 0, 0.05)' }}>
                  <td style={{ padding: 'var(--space-2)', fontWeight: 'var(--font-weight-semibold)' }}>Glass Card Hover</td>
                  <td style={{ padding: 'var(--space-2)', color: 'var(--muted-foreground)' }}>rgba(255, 255, 255, 1)</td>
                </tr>
                <tr style={{ borderBottom: '1px solid rgba(0, 0, 0, 0.05)' }}>
                  <td style={{ padding: 'var(--space-2)', fontWeight: 'var(--font-weight-semibold)' }}>Stat Pill Border (Blue)</td>
                  <td style={{ padding: 'var(--space-2)', color: 'var(--muted-foreground)' }}>rgba(85, 161, 180, 0.25)</td>
                </tr>
                <tr style={{ borderBottom: '1px solid rgba(0, 0, 0, 0.05)' }}>
                  <td style={{ padding: 'var(--space-2)', fontWeight: 'var(--font-weight-semibold)' }}>Stat Pill Border (Orange)</td>
                  <td style={{ padding: 'var(--space-2)', color: 'var(--muted-foreground)' }}>rgba(237, 132, 58, 0.25)</td>
                </tr>
                <tr>
                  <td style={{ padding: 'var(--space-2)', fontWeight: 'var(--font-weight-semibold)' }}>Stat Pill Border (Yellow)</td>
                  <td style={{ padding: 'var(--space-2)', color: 'var(--muted-foreground)' }}>rgba(248, 176, 68, 0.25)</td>
                </tr>
              </tbody>
            </table>
          </div>

          <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-lg)', fontWeight: 'var(--font-weight-semibold)', marginTop: 'var(--space-6)', marginBottom: 'var(--space-4)' }}>
            Vertical Margins Between Sections
          </h3>
          <div style={{ background: 'rgba(0, 0, 0, 0.02)', padding: 'var(--space-4)', borderRadius: 'var(--radius-lg)' }}>
            <table style={{ width: '100%', fontFamily: 'var(--font-body)', fontSize: 'var(--text-sm)' }}>
              <tbody>
                <tr style={{ borderBottom: '1px solid rgba(0, 0, 0, 0.05)' }}>
                  <td style={{ padding: 'var(--space-2)', fontWeight: 'var(--font-weight-semibold)' }}>Hero → Quick Actions</td>
                  <td style={{ padding: 'var(--space-2)', color: 'var(--muted-foreground)' }}>0px (pas de margin)</td>
                </tr>
                <tr style={{ borderBottom: '1px solid rgba(0, 0, 0, 0.05)' }}>
                  <td style={{ padding: 'var(--space-2)', fontWeight: 'var(--font-weight-semibold)' }}>Quick Actions → Continue Learning</td>
                  <td style={{ padding: 'var(--space-2)', color: 'var(--muted-foreground)' }}>32px (var(--space-8))</td>
                </tr>
                <tr style={{ borderBottom: '1px solid rgba(0, 0, 0, 0.05)' }}>
                  <td style={{ padding: 'var(--space-2)', fontWeight: 'var(--font-weight-semibold)' }}>Continue Learning → Journal</td>
                  <td style={{ padding: 'var(--space-2)', color: 'var(--muted-foreground)' }}>32px (var(--space-8))</td>
                </tr>
                <tr>
                  <td style={{ padding: 'var(--space-2)', fontWeight: 'var(--font-weight-semibold)' }}>Journal → Activity Feed</td>
                  <td style={{ padding: 'var(--space-2)', color: 'var(--muted-foreground)' }}>32px (var(--space-8))</td>
                </tr>
              </tbody>
            </table>
          </div>
        </SpecSection>

        {/* ========== 15. WORDPRESS INTEGRATION ========== */}
        <SpecSection title="15. WordPress Integration Tips" icon={<Monitor size={24} />}>
          <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-lg)', fontWeight: 'var(--font-weight-semibold)', marginBottom: 'var(--space-4)' }}>
            CSS Variables dans WordPress
          </h3>
          <CodeBlock code={`/* Charger dans functions.php ou theme style.css */
:root {
  /* Toutes les variables du design system */
  --primary: #55A1B4;
  --secondary: #ED843A;
  /* ... etc */
}

/* Ou via wp_enqueue_style */
function tls_enqueue_design_system() {
  wp_enqueue_style('tls-design-system', 
    get_template_directory_uri() . '/assets/css/design-system.css', 
    array(), 
    '1.0.0'
  );
}
add_action('wp_enqueue_scripts', 'tls_enqueue_design_system');`} />

          <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-lg)', fontWeight: 'var(--font-weight-semibold)', marginTop: 'var(--space-6)' }}>
            Gutenberg Blocks
          </h3>
          <CodeBlock code={`/* Créer des blocks custom pour chaque composant */

// Action Card Block
registerBlockType('tls/action-card', {
  title: 'TLS Action Card',
  icon: 'grid-view',
  category: 'tls-blocks',
  attributes: {
    icon: { type: 'string' },
    iconColor: { type: 'string', default: 'var(--primary)' },
    title: { type: 'string' },
    description: { type: 'string' }
  },
  edit: EditComponent,
  save: SaveComponent
});

/* Ou utiliser ACF Blocks */
acf_register_block_type([
  'name' => 'action-card',
  'title' => __('TLS Action Card'),
  'render_template' => 'template-parts/blocks/action-card.php',
  'category' => 'tls-blocks',
  'icon' => 'grid-view',
  'keywords' => ['card', 'action', 'tls']
]);`} />

          <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-lg)', fontWeight: 'var(--font-weight-semibold)', marginTop: 'var(--space-6)' }}>
            Dynamic Data
          </h3>
          <CodeBlock code={`/* PHP Template pour Dashboard */
<?php
$user_stats = get_user_stats(get_current_user_id());
$daily_quote = get_daily_quote();
?>

<div class="dashboard-container">
  <!-- Hero Section -->
  <section class="hero-section">
    <div class="hero-card">
      <h1 class="hero-title">
        Hello <?php echo esc_html($current_user->display_name); ?>
      </h1>
      <p class="hero-quote">
        "<?php echo esc_html($daily_quote->text); ?>" 
        — <?php echo esc_html($daily_quote->author); ?>
      </p>
      
      <!-- Stats Pills -->
      <div class="stat-pill stat-pill-streak">
        <span>🔥</span>
        <span><?php echo $user_stats['streak']; ?></span>
        <span>jours</span>
      </div>
    </div>
  </section>
  
  <!-- Continue Learning -->
  <?php if ($current_course = get_user_current_course()) : ?>
    <section class="continue-learning-section">
      <div class="continue-learning-card">
        <h2 class="continue-learning-title">
          <?php echo esc_html($current_course->title); ?>
        </h2>
        <p class="continue-learning-step">
          <?php echo esc_html($current_course->current_step); ?>
        </p>
        
        <!-- Progress Bar -->
        <div class="progress-bar-container">
          <div class="progress-bar-fill" 
               style="width: <?php echo $current_course->progress; ?>%">
          </div>
        </div>
      </div>
    </section>
  <?php endif; ?>
</div>`} />
        </SpecSection>

      </div>

      {/* Footer */}
      <div style={{
        maxWidth: '1200px',
        margin: 'var(--space-12) auto 0 auto',
        padding: 'var(--space-8)',
        textAlign: 'center',
        background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(255, 255, 255, 0.85) 100%)',
        backdropFilter: 'blur(20px)',
        borderRadius: 'var(--radius-2xl)',
        border: '1px solid rgba(255, 255, 255, 0.8)',
      }}>
        <p style={{
          fontFamily: 'var(--font-body)',
          fontSize: 'var(--text-base)',
          color: 'var(--muted-foreground)',
          margin: 0,
        }}>
          Documentation générée pour The Learning Society • v1.0
        </p>
        <p style={{
          fontFamily: 'var(--font-body)',
          fontSize: 'var(--text-sm)',
          color: 'var(--muted-foreground)',
          marginTop: 'var(--space-2)',
        }}>
          Pour toute question sur l'implémentation, référez-vous à <code style={{ 
            background: 'rgba(0, 0, 0, 0.05)', 
            padding: '2px 6px', 
            borderRadius: '4px',
            fontFamily: 'monospace',
          }}>/styles/globals.css</code>
        </p>
      </div>
    </div>
  );
}
