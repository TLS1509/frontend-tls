import { useState } from 'react';
import { LearnerPositioningModal } from '../components/assessment/LearnerPositioningModal';
import OptimizedSidebar from '../components/ui/optimized-sidebar';
import { Button } from '../components/common/Button';

interface PositioningDemoPageProps {
  onNavigate: (page: string) => void;
  onLogout?: () => void;
}

const DEMO_QUESTIONS = [
  {
    id: 'product-vision',
    title: 'Vision Produit',
    description: 'Définir et communiquer une vision produit claire et inspirante',
  },
  {
    id: 'user-research',
    title: 'Research Utilisateur',
    description: 'Mener des études utilisateurs et analyser les insights',
  },
  {
    id: 'roadmap',
    title: 'Roadmap Produit',
    description: 'Créer et maintenir une roadmap produit alignée avec la stratégie',
  },
  {
    id: 'stakeholder-management',
    title: 'Gestion des Stakeholders',
    description: 'Collaborer efficacement avec les parties prenantes',
  },
  {
    id: 'metrics',
    title: 'Métriques & Analytics',
    description: 'Définir et suivre les KPIs produit',
  },
];

export default function PositioningDemoPage({ onNavigate, onLogout }: PositioningDemoPageProps) {
  const [activeModal, setActiveModal] = useState<'floating' | 'progressive' | 'fullscreen' | null>(null);
  const [results, setResults] = useState<any>(null);

  const handleComplete = (modalResults: any) => {
    setResults(modalResults);
    console.log('Résultats du positionnement:', modalResults);
  };

  return (
    <div style={{ display: 'flex', height: '100vh', overflow: 'hidden' }}>
      <OptimizedSidebar
        currentPage="dashboard"
        onNavigate={onNavigate}
        onLogout={onLogout}
      />

      <main style={{
        flex: 1,
        overflowY: 'auto',
        background: 'linear-gradient(135deg, #E8F4F7 0%, #FFF4E6 100%)',
      }}>
        {/* Header */}
        <div style={{
          background: 'white',
          borderBottom: '1px solid rgba(0, 0, 0, 0.1)',
          padding: 'var(--space-8)',
          marginBottom: 'var(--space-8)',
        }}>
          <h1 style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'var(--text-4xl)',
            fontWeight: 'var(--font-weight-bold)',
            background: 'var(--gradient-brand)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            marginBottom: 'var(--space-2)',
          }}>
            Modals de Positionnement
          </h1>
          <p style={{
            fontFamily: 'var(--font-body)',
            fontSize: 'var(--text-lg)',
            color: 'var(--muted-foreground)',
          }}>
            Testez les 3 variantes du modal de positionnement apprenant
          </p>
        </div>

        {/* Content */}
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '0 var(--space-8) var(--space-8)',
        }}>
          {/* Variants Grid */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
            gap: 'var(--space-6)',
            marginBottom: 'var(--space-8)',
          }}>
            {/* Floating Variant */}
            <div style={{
              background: 'white',
              borderRadius: 'var(--radius-xl)',
              padding: 'var(--space-6)',
              border: '2px solid rgba(85, 161, 180, 0.2)',
              boxShadow: '0 4px 16px rgba(0, 0, 0, 0.08)',
            }}>
              <div style={{
                width: '60px',
                height: '60px',
                borderRadius: 'var(--radius-lg)',
                background: 'var(--gradient-primary)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: 'var(--space-4)',
                fontSize: '28px',
              }}>
                💎
              </div>
              <h3 style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'var(--text-xl)',
                fontWeight: 'var(--font-weight-bold)',
                color: 'var(--foreground)',
                marginBottom: 'var(--space-2)',
              }}>
                Floating Glass
              </h3>
              <p style={{
                fontFamily: 'var(--font-body)',
                fontSize: 'var(--text-sm)',
                color: 'var(--muted-foreground)',
                marginBottom: 'var(--space-4)',
                lineHeight: 1.6,
              }}>
                Modal centré avec effet glassmorphism, sélection par slider interactif
              </p>
              <Button
                variant="primary"
                size="md"
                fullWidth
                onClick={() => setActiveModal('floating')}
              >
                Tester Floating
              </Button>
            </div>

            {/* Progressive Variant */}
            <div style={{
              background: 'white',
              borderRadius: 'var(--radius-xl)',
              padding: 'var(--space-6)',
              border: '2px solid rgba(237, 132, 58, 0.2)',
              boxShadow: '0 4px 16px rgba(0, 0, 0, 0.08)',
            }}>
              <div style={{
                width: '60px',
                height: '60px',
                borderRadius: 'var(--radius-lg)',
                background: 'var(--gradient-secondary)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: 'var(--space-4)',
                fontSize: '28px',
              }}>
                📊
              </div>
              <h3 style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'var(--text-xl)',
                fontWeight: 'var(--font-weight-bold)',
                color: 'var(--foreground)',
                marginBottom: 'var(--space-2)',
              }}>
                Progressive Steps
              </h3>
              <p style={{
                fontFamily: 'var(--font-body)',
                fontSize: 'var(--text-sm)',
                color: 'var(--muted-foreground)',
                marginBottom: 'var(--space-4)',
                lineHeight: 1.6,
              }}>
                Questionnaire step-by-step avec progression visible et navigation fluide
              </p>
              <Button
                variant="secondary"
                size="md"
                fullWidth
                onClick={() => setActiveModal('progressive')}
              >
                Tester Progressive
              </Button>
            </div>

            {/* Fullscreen Variant */}
            <div style={{
              background: 'white',
              borderRadius: 'var(--radius-xl)',
              padding: 'var(--space-6)',
              border: '2px solid rgba(248, 176, 68, 0.2)',
              boxShadow: '0 4px 16px rgba(0, 0, 0, 0.08)',
            }}>
              <div style={{
                width: '60px',
                height: '60px',
                borderRadius: 'var(--radius-lg)',
                background: 'var(--gradient-warm)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: 'var(--space-4)',
                fontSize: '28px',
              }}>
                🎯
              </div>
              <h3 style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'var(--text-xl)',
                fontWeight: 'var(--font-weight-bold)',
                color: 'var(--foreground)',
                marginBottom: 'var(--space-2)',
              }}>
                Fullscreen Immersive
              </h3>
              <p style={{
                fontFamily: 'var(--font-body)',
                fontSize: 'var(--text-sm)',
                color: 'var(--muted-foreground)',
                marginBottom: 'var(--space-4)',
                lineHeight: 1.6,
              }}>
                Expérience plein écran immersive avec focus total sur l'évaluation
              </p>
              <Button
                variant="outline"
                size="md"
                fullWidth
                onClick={() => setActiveModal('fullscreen')}
              >
                Tester Fullscreen
              </Button>
            </div>
          </div>

          {/* Results */}
          {results && (
            <div style={{
              background: 'rgba(85, 161, 180, 0.05)',
              border: '2px solid rgba(85, 161, 180, 0.2)',
              borderRadius: 'var(--radius-xl)',
              padding: 'var(--space-6)',
            }}>
              <h3 style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'var(--text-xl)',
                fontWeight: 'var(--font-weight-bold)',
                color: 'var(--foreground)',
                marginBottom: 'var(--space-4)',
              }}>
                🎉 Résultats du positionnement
              </h3>
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
                gap: 'var(--space-4)',
              }}>
                {Object.entries(results).map(([key, value]) => {
                  const question = DEMO_QUESTIONS.find(q => q.id === key);
                  return (
                    <div
                      key={key}
                      style={{
                        background: 'white',
                        padding: 'var(--space-4)',
                        borderRadius: 'var(--radius-lg)',
                        border: '1px solid rgba(0, 0, 0, 0.1)',
                      }}
                    >
                      <p style={{
                        fontFamily: 'var(--font-body)',
                        fontSize: 'var(--text-sm)',
                        fontWeight: 'var(--font-weight-semibold)',
                        color: 'var(--foreground)',
                        marginBottom: 'var(--space-1)',
                      }}>
                        {question?.title || key}
                      </p>
                      <p style={{
                        fontFamily: 'var(--font-body)',
                        fontSize: 'var(--text-lg)',
                        fontWeight: 'var(--font-weight-bold)',
                        color: 'var(--primary)',
                      }}>
                        {value as string}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Info Box */}
          <div style={{
            marginTop: 'var(--space-8)',
            background: 'rgba(248, 176, 68, 0.05)',
            border: '1px solid rgba(248, 176, 68, 0.2)',
            borderRadius: 'var(--radius-xl)',
            padding: 'var(--space-6)',
          }}>
            <h4 style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'var(--text-base)',
              fontWeight: 'var(--font-weight-bold)',
              color: 'var(--foreground)',
              marginBottom: 'var(--space-3)',
            }}>
              ℹ️ À propos du positionnement
            </h4>
            <p style={{
              fontFamily: 'var(--font-body)',
              fontSize: 'var(--text-sm)',
              color: 'var(--muted-foreground)',
              lineHeight: 1.6,
            }}>
              Le système de positionnement permet d'évaluer le niveau de compétence de l'apprenant sur différentes thématiques.
              5 niveaux sont disponibles : <strong>Débutant, Novice, Intermédiaire, Avancé, Expert</strong>.
              <br /><br />
              <strong>Composant utilisé :</strong> <code style={{
                background: 'rgba(0, 0, 0, 0.05)',
                padding: '2px 6px',
                borderRadius: '4px',
                fontFamily: 'monospace',
              }}>LearnerPositioningModal</code>
              <br />
              <strong>Fichier :</strong> <code style={{
                background: 'rgba(0, 0, 0, 0.05)',
                padding: '2px 6px',
                borderRadius: '4px',
                fontFamily: 'monospace',
              }}>/src/app/components/assessment/LearnerPositioningModal.tsx</code>
            </p>
          </div>
        </div>
      </main>

      {/* Modals */}
      {activeModal && (
        <LearnerPositioningModal
          isOpen={true}
          onClose={() => setActiveModal(null)}
          onComplete={handleComplete}
          questions={DEMO_QUESTIONS}
          variant={activeModal}
        />
      )}
    </div>
  );
}
